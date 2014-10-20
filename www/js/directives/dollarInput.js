budgetTracker.directive('dollarInput', function() {
    return function(scope, element, attrs) {
      var processValue = function() {
          var dollars = scope.newTransaction.value.slice(0,-2);
          var cents = scope.newTransaction.value.slice(-2);
          if (scope.newTransaction.value.length === 1) {
            element[0].value = '00.0' + cents;
          } else if (scope.newTransaction.value.length === 2) {
            element[0].value = '00.' + cents;
          } else {
            element[0].value = dollars + '.' + cents;
          }
        };

      element.on('keydown', function(event){
        var currentKey = String.fromCharCode(event.keyCode);
        console.log('current key: ' + currentKey);
	        
        // check for backspace key
        if (event.keyCode !== 8) {
          // check for 0-9 keys only
          switch(event.keyCode) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              scope.newTransaction.value += currentKey;
              processValue();
              break;
            default:
              console.log('invalid submission');
          }
	      } else {
          // backspace key is go
          scope.newTransaction.value = scope.newTransaction.value.slice(0,-1);
          processValue();
	      }
        
        event.preventDefault();
      });
      
      element.on('keyup', function(event){
        console.log(scope.newTransaction.value);
        scope.$digest();
      });
      
    // end return  
    }
  // end directive  
  });


budgetTracker.directive('dollarEdit', function() {
    return function(scope, element, attrs) {

      var processValue = function() {
          console.log(scope.editVal.val);
          var dollars = scope.editVal.val.slice(0,-2);
          var cents = scope.editVal.val.slice(-2);
          if (scope.editVal.val.length === 1) {
            element[0].value = '00.0' + cents;
          } else if (scope.editVal.val.length === 2) {
            element[0].value = '00.' + cents;
          } else {
            element[0].value = dollars + '.' + cents;
          }
        };

      element.on('keydown', function(event){
        var currentKey = String.fromCharCode(event.keyCode);
        console.log('current key: ' + currentKey);

        // check for backspace key
        if (event.keyCode !== 8) {
          // check for 0-9 keys only
          switch(event.keyCode) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              scope.editVal.val += currentKey;
              processValue();
              break;
            default:
              console.log('invalid submission');
          }
        } else {
          // backspace key is go
          scope.editVal.val = scope.editVal.val.slice(0,-1);
          processValue();
        }
        
        event.preventDefault();
      });
      
      element.on('keyup', function(event){
        console.log(scope.editVal.val);
        scope.$digest();
      });
      
    // end return  
    }
  // end directive  
  });