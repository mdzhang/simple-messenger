simpleMessengerApp.controller('listMessages', ['$scope', '$http', function($scope, $http) {
  $scope.messages = [];
  $scope.note = null;

  $scope.createMessage = function() {
    if (!$scope.note.length) {
      // TODO: error banner
      return;
    }

    $http.post('/api/messages/create', { note: $scope.note })
      .success(function(message) {
        $scope.messages.push(message);
      })
      .error(function(e) {
        console.error(e);
      });
  };

  var _getMessages = function() {
    $http.get('/api/messages/list')
      .success(function(messages) {
        $scope.messages = messages;
      })
      .error(function(e) {
        console.error(e);
      });
  };

  var _init = function() {
    _getMessages();
  };

  _init();
}]);