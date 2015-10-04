simpleMessengerApp.service('DataManager', ['$http', function($http) {
  var DataManager = (function() {

    function DataManager() {
      // init logic
    }

    var observers = {}; // type => array of callback functions
    var cache = {}; // type => array of objects
    var requests = {}; // request url string => boolean if req in progress

    var notify = DataManager.prototype.notify = function(type) {
      _.each(observers[type], function(cb) {
        cb(null, cache[type]);
      });
    };

    var updateAndNotify = function(type, err, data, action) {
      action = action || 'replace';

      var results = cache[type];

      switch (action) {
        case 'add':
          results.push(data);
          break;
        case 'replace':
          results = data;
          break;
        default:
          break;
      }

      cache[type] = results;

      notify(type);
    };

    var observe = DataManager.prototype.observe = function(type, cb) {
      if (!observers[type]) {
        observers[type] = [];
      }

      if (!cache[type]) {
        cache[type] = [];

        if (methods[type]) {
          if (methods[type].list) {
            methods[type].list();
          }

          if (methods[type].poll) {
            methods[type].poll();
          }
        }
      }

      observers[type].push(cb);
    };

    var request = function(method, url, data, cb) {
      if (method === 'GET' && requests[url]) {
        return;
      }

      data = data || {};
      cb = cb || angular.noop;

      var params = {
        method: method,
        url: url,
        data: data
      };

      if (method === 'GET') {
        requests[url] = true;
      }

      $http(params)
        .success(function(results) {
          requests[url] = false;
          cb(null, results);
        })
        .error(function(e) {
          requests[url] = false;
          console.error('DataManager request failed', params, e);
          cb(e);
        });
    };

    var methods = DataManager.prototype.methods = {};

    methods.messages = {
      list: function() {
        request('GET', '/api/messages/list', null, function(err, messages) {
          updateAndNotify('messages', err, messages);
        });
      },
      poll: function() {
        request('GET', '/api/messages/poll', null, function(err, message) {
          updateAndNotify('messages', err, message, 'add');
          // once the server responds to the poll, start it again
          methods.messages.poll();
        });
      },
      create: function(data, cb) {
        request('POST', '/api/messages/create', data, function(err, message) {
          // let the poll handle this
        });
      }
    };

    return DataManager;
  })();

  return new DataManager();
}]);