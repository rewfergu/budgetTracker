budgetTracker.controller('CategoryCtrl', function($scope, $state, syncData, simpleLogin, requireUser, budget) {
	requireUser().catch(function(err){
		console.log('not logged in');
      	$state.go('login');
	});


  $scope.currentCategory = budget.currentCategory;
  $scope.transactions = syncData('transactions/' + budget.currentCategory).$asObject();
  //console.log($scope.transactions);
});