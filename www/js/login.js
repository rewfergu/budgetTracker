budgetTracker.controller('LogInCtrl', function($scope, $rootScope, $state, simpleLogin, fbutil) {
  $scope.user = {
    email: localStorage.email || null,
    pass: localStorage.pass || null
  }
  $scope.confirm = null;
  $scope.createMode = false;

  $scope.login = function(userInfo, cb) {
    console.log("logging in...", userInfo.email, userInfo.pass);
       $scope.err = null;
       
       $scope.email = userInfo.email;
       localStorage.email = $scope.email;
       
       $scope.pass = userInfo.pass;
       localStorage.pass = $scope.pass;
       
       if ( !$scope.email ) {
          $scope.err = 'Please enter an email address';
       } else if( !$scope.pass ) {
          $scope.err = 'Please enter a password';
       } else {
          $scope.err = null;
          simpleLogin.login($scope.email, $scope.pass)
            .then(function(user) {
              $state.go('tabs.categories');
            }, function(err) {
              $scope.err = errMessage(err);
            });
       }
  };
});