/**
 * User: 	zenboss
 * GitHub:  zenboss
 * Date:    2015-07-03
 * Time:    15:58
 * Email:   zenyes@gmail.com
 */
"use strict";

var _innerNextTick = setImmediate;

var workqueue = function(opt){
    var self = this;
    opt = opt||{};
    if(!!opt.workMax)self.setWorkMax(opt.workMax);
    self._queueArray = [];
    self._queueNowRun = 0;

};
workqueue.create = function(opt){
    return new workqueue(opt);
};
workqueue.prototype.setQueueMax = workqueue.prototype.setWorkMax = function(maxnum){
    this._workMax = parseInt(maxnum)||1000;
};

workqueue.prototype.queue = function(workFn){
    var self = this;
    if('function' == typeof workFn){
        self._queueArray.push(workFn);//将函数放入全局队列
        self._doQueue();
    }

};
workqueue.prototype._doQueue = function(){
    var self = this;
    _innerNextTick(function(){
        if(self._queueNowRun<self._workMax){
            self._queueNowRun++;
            var workFn = self._queueArray.pop();

            if(!!workFn){
                workFn(function(){
                    self._queueNowRun--;
                    self._doQueue();
                });
            }else{
                self._queueNowRun--;
            }

        }
    });
    
};

module.exports = workqueue;