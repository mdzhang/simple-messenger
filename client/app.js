var simpleMessengerApp = angular.module('simpleMessengerApp', ['ui.router', 'templates']);

simpleMessengerApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.when('/', '/messages/list');
  // $urlRouterProvider.otherwise

  $stateProvider
    .state('/messages/list', {
      url: '/messages/list',
      templateUrl: 'listMessages.html'
    })
      .state('/messages/create', {
        url: '/messages/create',
        templateUrl: 'createMessage.html'
      });
}]);