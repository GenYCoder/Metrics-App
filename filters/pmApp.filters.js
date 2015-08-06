angular.module("pmApp.filters",[])
	.filter("range", function(){
		return function(val, min, max){
			for(var i = min; i <= max; i++){
				val.push(i);
			}
			return val.reverse();
			
		}
	})