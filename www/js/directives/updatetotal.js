'use strict';

budgetTracker.directive('updatetotal', function (format) {
    return function postLink(scope, element, attrs) {
        var updateTotal = function() {
            var income = format.toDollarVal(attrs.income),
                fixed = format.toDollarVal(attrs.fixed),
                variable = format.toDollarVal(scope.budget.info['variable-expenses']),
                newVal = format.subtract(income, format.add(fixed, variable));

            element.text(format.toDollarString(newVal));
        }
        //scope.$watch("budget.info['variable-expenses']", updateTotal);
    };
  });
