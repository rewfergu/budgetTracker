budgetTracker.controller('LogOutCtrl', function($scope, $rootScope, $state,  simpleLogin, fbutil) {
  simpleLogin.logout();
  $rootScope.user = null;
});