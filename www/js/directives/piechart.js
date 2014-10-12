'use strict';

budgetTracker.directive('piechart', function () {
  function link(scope, element, attrs){
    scope.$watch(function(){ return scope.cat.total }, function(){
      var total = scope.cat.budget,
          value = scope.cat.total,
          name = attrs.name,
          slice = ((value/total * 2) + 1.5) * Math.PI,
          color = "#fff",
          lineWeight = 2,
          startAngle = 1.5 * Math.PI,
          endAngle = slice,
          counterClockwise = false,
          canvas = document.createElement('canvas'),
          context,
          centerX,
          centerY,
          radius;

        element[0].innerHTML = '';

        canvas.id = name;
        canvas.width = window.devicePixelRatio * 20;
        canvas.height = window.devicePixelRatio * 20;

        context = canvas.getContext('2d');
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        radius = centerY - lineWeight;

          
        // create pie slice
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle, counterClockwise);
        context.lineTo(centerX, centerY);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        // create outline around whole pie
        context.moveTo(canvas.width-lineWeight, (canvas.height-lineWeight)/2);
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, (2 * Math.PI), counterClockwise);
        context.closePath();

        // add line weight and color
        context.lineWidth = lineWeight;
        context.strokeStyle = color;
        context.stroke();

        //var stack = document.getElementsByClassName('categoryLink');
        //stack[scope.$index].appendChild(canvas);
        element.append(canvas);
      });
  }

  return {
    link: link
  };
});
























/*
budgetTracker.directive('piechart', function () {
    return function(scope, element, attrs) {
      // adjust percentage to pie size
      // console.log(scope.cat.name);
      // console.log(scope.cat.budget);
      // console.log(scope.cat.total);
      // console.log(scope.health[scope.$index]);
      
      var slice = scope.cat.total / scope.cat.budget;
      //console.log(slice);
      slice = ((slice * 2) + 1.5) * Math.PI;
      //console.log(slice);
      var color = "#fff",
          lineWeight = 2,
          startAngle = 1.5 * Math.PI,
          endAngle = slice,
          canvas = document.createElement('canvas');

      canvas.id = scope.cat.name;
      canvas.width = window.devicePixelRatio * 20;
      canvas.height = window.devicePixelRatio * 20;

      var context = canvas.getContext('2d'),
          centerX = canvas.width / 2,
          centerY = canvas.height / 2,
          radius = centerY - lineWeight,
          counterClockwise = false;
        
      // create pie slice
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, startAngle, endAngle, counterClockwise);
      context.lineTo(centerX, centerY);
      context.closePath();
      context.fillStyle = color;
      context.fill();

      // create outline around whole pie
      context.moveTo(canvas.width-lineWeight, (canvas.height-lineWeight)/2);
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, (2 * Math.PI), counterClockwise);
      context.closePath();

      // add line weight and color
      context.lineWidth = lineWeight;
      context.strokeStyle = color;
      context.stroke();

      //var stack = document.getElementsByClassName('categoryLink');
      //stack[scope.$index].appendChild(canvas);
      element.append(canvas)
  	}
});
*/