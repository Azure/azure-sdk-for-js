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

  var cn = ConnectionString.parse(connectionString);
  if (!cn.EntityPath && !path) {
    throw new ArgumentError('Connection string doesn\'t have EntityPath, or missing argument path');
  }
  
  var endpoint = cn.Endpoint || ''; 
  var host = (endpoint.match('sb://([^/]*)') || [])[1];
  
  var config = {
    host: host
  };
  
  Type_ = Type_ || EventHubClient;

  return new Type_(config);
};

EventHubClient.prototype.open = function () {
  return Promise.resolve();
};

module.exports = EventHubClient;