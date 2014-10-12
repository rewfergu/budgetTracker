'use strict';

budgetTracker.factory('budget', function ($location, $rootScope) {
    var budget,
        currentCategory = '',
        currentVal = 0,
        currentLocation = '',
        user = '',
        currentTime = '',
        categoryTotal = 0,
        categoryBudget = 0;

    // Public API here
    return {
      budget: budget,
      currentCategory: currentCategory,
      currentVal: currentVal,
      currentLocation: currentLocation,
      user: user,
      currentTime: currentTime,
      categoryTotal: categoryTotal,
      categoryBudget: categoryBudget,
    };
});