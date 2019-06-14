;
'use strict';
(function WorkQueueModuleSpace() {
  var _innerNextTick;
  if ('function' === typeof setImmediate) {
    _innerNextTick = setImmediate;
  } else {
    _innerNextTick = function (cb) {
      setTimtoue(cb, 0);
    }
  }

  function WorkQueue (opt) {
    var self = this;
    opt = opt || {};
    if (!!opt.workMax) self.setWorkMax(opt.workMax);
    self._queueArray = [];
    self._queueNowRun = 0;

  };
  WorkQueue.create = function (opt) {
    return new WorkQueue(opt);
  };
  WorkQueue.prototype.setQueueMax = WorkQueue.prototype.setWorkMax = function (maxnum) {
    this._workMax = parseInt(maxnum) || 1000;
  };

  WorkQueue.prototype.queue = function (workFn) {
    var self = this;
    if ('function' == typeof workFn) {
      self._queueArray.push(workFn);
      self._doQueue();
    }

  };
  WorkQueue.prototype._doQueue = function () {
    var self = this;
    _innerNextTick(function () {
      if (self._queueNowRun < self._workMax) {
        self._queueNowRun++;
        var workFn = self._queueArray.pop();

        if (!!workFn) {
          workFn(function () {
            self._queueNowRun--;
            self._doQueue();
          });
        } else {
          self._queueNowRun--;
        }

      }
    });
  };

  if ('object' === typeof module) module.exports = WorkQueue;
  if ('object' === typeof window) window.Varbox = WorkQueue;
  if ('object' === typeof self) self.Varbox = WorkQueue;
})();
