budgetTracker.controller('BudgetCtrl', function($scope, $rootScope, $location, $filter, $ionicScrollDelegate, $state, fbutil, budget, syncData, requireUser) {
    requireUser().catch(function(err){
      console.log('not logged in');
      $state.go('login');
    });

    $scope.info = fbutil.syncObject('info');
    $scope.transactions = null;
    $scope.categories = null;
    $scope.fixedExpenses = fbutil.syncObject('fixed-expenses');
    $scope.categories = fbutil.syncObject('categories');
    // console.log($scope.fixedExpenses);
    // console.log($scope.info);
    $scope.fixedExpenseStatus = false;
    $scope.categoryStatus = false;
    $scope.editStatus = false;
    $scope.resetStatus = false;

    $scope.editVal = {
      name: '',
      val: '',
      location: null,
      id: ''
    };

    $scope.resetVal = {
      name: '',
      val: '',
      location: null,
      id: ''
    };

    // define an edit mode, so we only have to use one edit form
    $scope.editMode = '';

    $scope.confirmReset = function() {
      $scope.editMode = "Reset Budget";
      $scope.editStatus = true;
      $scope.resetStatus = true;
      $scope.editVal.name = "Type the word 'reset.'";
      $scope.editVal.val = '';
    }

    $scope.editOffset = function(data) {
      var message = prompt(data);
      message = parseInt(message);
      console.log(message);
      if (typeof message === 'number' && message >= 0) {
        $scope.info.$update({'offset': message});
      } else {
        alert('you messed up the entry');
      }

      return false;
    }

    $scope.fixedExpenseToggle = function() {
      $scope.fixedExpenseStatus = !$scope.fixedExpenseStatus;
      return $scope.fixedExpenseStatus;
    };

    $scope.categoryToggle = function() {
      $scope.categoryStatus = !$scope.categoryStatus;
      return $scope.categoryStatus;
    }

    $scope.edit = function(location, name) {
      $ionicScrollDelegate.scrollTop();
      location.$loaded().then(function(){
        $scope.editStatus = true;
        $scope.editMode = 'Edit Info';
        console.log(location);
        $scope.editVal.location = location;
        $scope.editVal.name = name;
        $scope.editVal.val = location[name].toString();

        var inputField = document.getElementById('valueEdit');
        var dollars = $scope.editVal.val.slice(0,-2);
        var cents = $scope.editVal.val.slice(-2);
        if ($scope.editVal.val.length === 1) {
          inputField.value = '00.0' + cents;
        } else if ($scope.editVal.val.length === 2) {
          inputField.value = '00.' + cents;
        } else {
          inputField.value = dollars + '.' + cents;
        }
          console.log(inputField.value);
      });
    };
    
    $scope.editExpenses = function(location, id) {
      $scope.editStatus = true;
      $scope.editMode = 'Edit Expense';
      console.log(location);
      $scope.editVal.location = location;
      $scope.editVal.name = location[id].name;
      $scope.editVal.val = location[id].total.toString();
      $scope.editVal.id = id;

      var inputField = document.getElementById('valueEdit');
      var dollars = $scope.editVal.val.slice(0,-2);
      var cents = $scope.editVal.val.slice(-2);
      if ($scope.editVal.val.length === 1) {
        inputField.value = '00.0' + cents;
      } else if ($scope.editVal.val.length === 2) {
        inputField.value = '00.' + cents;
      } else {
        inputField.value = dollars + '.' + cents;
      }
      console.log(inputField.value);
    };

    $scope.editCategories = function(location, id) {
      console.log(id);

      $scope.editStatus = true;
      $scope.editMode = 'Edit Category';
      console.log(location);
      $scope.editVal.location = location;
      $scope.editVal.name = location[id].name;
      $scope.editVal.val = location[id].budget.toString();
      $scope.editVal.id = id;

      var inputField = document.getElementById('valueEdit');
      var dollars = $scope.editVal.val.slice(0,-2);
      var cents = $scope.editVal.val.slice(-2);
      if ($scope.editVal.val.length === 1) {
        inputField.value = '00.0' + cents;
      } else if ($scope.editVal.val.length === 2) {
        inputField.value = '00.' + cents;
      } else {
        inputField.value = dollars + '.' + cents;
      }
      console.log(inputField.value);
    };

    $scope.saveValues = function() {
      if ($scope.editMode === 'Edit Info') {
        $scope.editVal.location[$scope.editVal.name] = $scope.editVal.val;
        $scope.editVal.location.$save();
        $scope.editVal = $scope.resetVal;
        $scope.editStatus = false;
      } else if ($scope.editMode === 'Edit Expense') {
        $scope.editVal.location[$scope.editVal.id].total = $scope.editVal.val;
        $scope.editVal.location[$scope.editVal.id].name = $scope.editVal.name;
        $scope.editVal.location.$save();
        $scope.editVal = {
          name: '',
          val: 0,
          location: null,
          id: ''
        };
        $scope.editStatus = false;
      } else if ($scope.editMode === 'Edit Category') {
        $scope.editVal.location[$scope.editVal.id].budget = $scope.editVal.val;
        $scope.editVal.location[$scope.editVal.id].name = $scope.editVal.name;
        $scope.editVal.location.$save();
        $scope.editVal = {
          name: '',
          val: 0,
          location: null,
          id: ''
        };
        $scope.editStatus = false;

      } else if ($scope.editMode === 'Reset Budget') {
          if ($scope.editVal.val ==  'reset') {
            $scope.editStatus = false;
            $scope.resetStatus = false;
            $scope.resetBudget();
          }
      }
    };

    $scope.resetBudget = function() {
      $scope.transactions = syncData('transactions');
      $scope.transactions.$remove();

      $scope.info['variable-expenses'] = 0;
      $scope.info.$save();

      $scope.categories = fbutil.syncArray('categories');
      $scope.categories.$loaded().then(function(){
        console.log('categories loaded');
        for (var i = 0; i < $scope.categories.length; i++) {
          console.log($scope.categories[i].total);
          $scope.categories[i].total = 0;
          $scope.categories.$save(i);
        }
        console.log($scope.categories);
      });
      
      console.log('budget has been reset');
    };

    $scope.cancelValues = function() {
      $scope.editStatus = false;
      $scope.resetStatus = false;
      var inputField = document.getElementById('valueEdit');
      inputField.value = '';
      $scope.editVal = {
        name: '',
        val: '',
        location: null,
        id: ''
      }
    };
});