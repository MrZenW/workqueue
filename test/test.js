"use strict";

var workqueue = require('../index.js').create({

	workMax:10,//default 1000

});


var i=0;
while(i<10000){
	i++;
	(function(){
		var _i = i;

		workqueue.queue(function(done){
			console.log(arguments,_i,workqueue._queueNowRun);
			// done();

			setTimeout(done,_i%1000)
		})
	})();
}

i=0;
while(false && i<10000){
	i++;
	(function(){
		var _i = i;

		workqueue.queue(function(done){
			console.log(arguments,_i,workqueue._queueNowRun);
			// done();
			setTimeout(done,1000)
		})
	})();
}