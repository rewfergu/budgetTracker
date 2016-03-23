budgetTracker.controller('CategoriesCtrl', function($scope, $rootScope, $state, fbutil, simpleLogin, requireUser, budget) {
  requireUser().catch(function(err){
      console.log('not logged in');
      $state.go('login');
  });

  $scope.budget = fbutil.syncObject('categories');
  $scope.info = fbutil.syncObject('info');

  var inputField = document.getElementById('transactionInput');

  $scope.currentCategory = null;
  $scope.editStatus = false;

  $scope.newTransaction = {
  	category: '',
  	value: '',
  	location: '',
  	notes: '',
  	date: Date.now()
  };

  $scope.addTransaction = function(name, total) {
  	$scope.editStatus = true;
  	$scope.newTransaction.category = name;
  	$scope.currentCategory = fbutil.syncArray('transactions/' + name);
  	$scope.newTransaction.date = Date.now();
  	budget.categoryTotal = total;
  	navigator.geolocation.getCurrentPosition(function (position) {
		var currentLocation = position.coords.latitude + ', ' + position.coords.longitude;
	    $scope.$apply(function(){
	  		$scope.newTransaction.location = currentLocation;
	  	});
    });
  }

  $scope.saveTransaction = function() {
  	// convert entered data into a number we can use
  	$scope.newTransaction.value = $scope.newTransaction.value/1;
  	console.log('Item value: ' + $scope.newTransaction.value);
  	console.log('Category total: ' + budget.categoryTotal);


  	// append this info to the transaction list
  	$scope.currentCategory.$add($scope.newTransaction);

  	// add the current value to the category total
  	var tempTotalCategory = budget.categoryTotal + $scope.newTransaction.value;

  	// update the category total
  	$scope.budget[$scope.newTransaction.category].total = tempTotalCategory;
  	$scope.budget.$save();

  	// update the expense total
  	$scope.info['variable-expenses'] += $scope.newTransaction.value;
  	$scope.info.$save();

  	$scope.editStatus = false;
    $scope.inputFocus = false;
    inputField.value = '';
  	$scope.newTransaction = {
	  	name: '',
	  	value: '',
	  	date: 0,
	  	total: ''
    };
  }

  $scope.cancelTransaction = function() {
  	$scope.editStatus = false;
    $scope.inputFocus = false;
    inputField.value = '';
  	$scope.newTransaction = {
	  	name: '',
	  	value: '',
	  	date: 0,
	  	total: ''
	};
  }

  $scope.selectCategory = function(cat, budgetTotal, total) {
    budget.currentCategory = cat;
    budget.categoryBudget = budgetTotal;
    budget.categoryTotal = total;
    $state.go('tabs.category');
  }
});
