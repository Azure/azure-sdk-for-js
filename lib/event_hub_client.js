// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var Promise = require('bluebird');
var ArgumentError = require('azure-iot-common').errors.ArgumentError;
var ConnectionString = require('azure-iot-common').ConnectionString;

function EventHubClient(config) {
  if (!config.host) throw new ArgumentError('Argument config is missing property host');
}

EventHubClient.fromConnectionString = function (connectionString, path, Type_) {
  if (!connectionString) {
    throw new ArgumentError('Missing argument connectionString');
  }
  
  var config = makeConfig(connectionString, path);
  if (!config.path) {
    throw new ArgumentError('Connection string doesn\'t have EntityPath, or missing argument path');
  }

  Type_ = Type_ || EventHubClient;

  return new Type_(config);
};

EventHubClient.prototype.open = function () {
  return Promise.resolve();
};

function makeConfig(connectionString, path) {
  var cn = ConnectionString.parse(connectionString);
  var endpoint = cn.Endpoint || ''; 
  
  return {
    host: (endpoint.match('sb://([^/]*)') || [])[1],
    path: cn.EntityPath || path
  };
}

module.exports = EventHubClient;