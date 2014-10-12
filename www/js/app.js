var budgetTracker = angular.module('budgetTracker', ['ionic', 'config', 'simpleLogin', 'firebase.utils', 'budget.firebase'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LogInCtrl'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'templates/logout.html',
      controller: 'LogOutCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.categories', {
      url: '/categories',
      views: {
        'categories-tab': {
          templateUrl: 'templates/categories.html',
          controller: 'CategoriesCtrl'
        }
      },
      authRequired: true
    })
    .state('tabs.category', {
      url: '/category',
      views: {
        'categories-tab': {
          templateUrl: 'templates/category.html',
          authRequired: true,
          controller: 'CategoryCtrl'
        }
      }
    })
    .state('tabs.budget', {
      url: '/budget',
      views: {
        'budget-tab': {
          templateUrl: 'templates/budget.html',
          authRequired: true,
          controller: 'BudgetCtrl'
        }
      }
    });


   //$urlRouterProvider.otherwise('/tab/categories');
   $urlRouterProvider.otherwise('/login');

});