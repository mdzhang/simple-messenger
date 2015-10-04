simpleMessengerApp.controller('listMessages',
['$scope', '$http', 'DataManager', function($scope, $http, DataManager) {

  $scope.messages = [];
  $scope.note = null;

  $scope.createMessage = function() {
    if (!$scope.note.length) {
      // TODO: error banner
      return;
    }

    DataManager.methods.messages.create({ note: $scope.note }, function(err, message) {
      if (err) {
        console.log(err);
      }

      console.info('created message: ', message);
    });
  };

  var _init = function() {
    DataManager.observe('messages', function(err, messages) {
      $scope.messages = messages;
    });
  };

  _init();
}]);