// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var Promise = require('bluebird');
var ArgumentError = require('azure-iot-common').errors.ArgumentError;
var ConnectionString = require('azure-iot-common').ConnectionString;

function EventHubClient() {}

EventHubClient.fromConnectionString = function (connectionString, path) {
  if (!connectionString) {
    throw new ArgumentError('Missing argument connectionString');
  }

  var cn = ConnectionString.parse(connectionString);
  if (!cn.EntityPath && !path) {
    throw new ArgumentError('Connection string doesn\'t have EntityPath, or missing argument path');
  }

  return new EventHubClient();
};

EventHubClient.prototype.open = function () {
  return Promise.resolve();
};

module.exports = EventHubClient;