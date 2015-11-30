'use strict';

angular.module('lexicon.services')
  .service('lexSendReceiveService', ['jsonRpc', function(jsonRpc) {
    jsonRpc.connect('/api/sf');

    this.getUserProjects = function getUserProjects(username, password, callback) {
      jsonRpc.call('sr_get_userProjects', [username, password], callback);
    };

    this.saveCredentials = function saveCredentials(srProject, username, password, callback) {
      jsonRpc.call('sr_save_credentials', [srProject, username, password], callback);
    };
  }])

  ;
