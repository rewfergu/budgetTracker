'use strict';

budgetTracker.directive('colorgrade', function () {
    function link(scope, element, attrs){
    	scope.$watch(function(){ return scope.cat.total }, function(value){
    		var total = scope.cat.total;
	    	var budget = scope.cat.budget;
	    	var colorGrade = parseInt((budget - total) / budget * 100, 10);
    		if (total <= budget) {
	          element[0].style.backgroundColor = 'hsl(' + colorGrade + ', 20%, 60%)';
	        } else {
	          element[0].style.backgroundColor = 'hsl(0, 20%, 60%)';
	        }
    	});
    }

    return {
    	link: link
    };
  });