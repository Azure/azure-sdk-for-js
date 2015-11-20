// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var uuid = require('uuid');
var amqp10 = require('amqp10');
var Promise = require('bluebird');
var ArgumentError = require('azure-iot-common').errors.ArgumentError;
var makeConfig = require('./config.js');

function EventHubClient(config) {
  var makeError = function (prop) {
    return new ArgumentError('config is missing property ' + prop);
  };

  ['host', 'path', 'keyName', 'key'].forEach(function (prop) {
    if (!config[prop]) throw makeError(prop);
  });
  
  this._config = config;
  this._amqp = new amqp10.Client(amqp10.Policy.EventHub);
  this._connectPromise = null;
}

EventHubClient.fromConnectionString = function (connectionString, path) {
  if (!connectionString) {
    throw new ArgumentError('Missing argument connectionString');
  }
  
  var config = makeConfig(connectionString, path);
  if (!config.path) {
    throw new ArgumentError('Connection string doesn\'t have EntityPath, or missing argument path');
  }

  return new EventHubClient(config);
};

EventHubClient.prototype.open = function () {
  var uri = 'amqps://' +
    encodeURIComponent(this._config.keyName) + ':' +
    encodeURIComponent(this._config.key) + '@' +
    this._config.host;

  if (!this._connectPromise) {
    this._connectPromise = this._amqp.connect(uri);
  }
  
  return this._connectPromise;
};

EventHubClient.prototype.getPartitionIds = function () {
  return new Promise(function (resolve, reject) {
    var endpoint = '$management';
    var replyTo = uuid.v4();

    var request = {
      body: 'stub',
      properties: {
        messageId: uuid.v4(),
        replyTo: replyTo
      },
      applicationProperties: {
        operation: "READ",
        name: this._config.path,
        type: "com.microsoft:eventhub"
      }
    };

    var rxopt = {
      attach: {
        target: {
          address: replyTo
        }
      }
    };

    this.open()
      .then(function () {    
        return this._amqp.createReceiver(endpoint, rxopt);
      }.bind(this))
      .then(function (receiver) {
        receiver.on('errorReceived', function (err) {
          reject(new Error('error receiving from Event Hub $management endpoint: ' + err));
        });
        receiver.on('message', function (msg) {
          resolve(msg.body.partition_ids);
        });
        return this._amqp.createSender(endpoint);
      }.bind(this))
      .then(function (sender) {
        sender.on('errorReceived', function (err) {
          reject(new Error('error sending to Event Hub $management endpoint: ' + err));
        });
        return sender.send(request);
      });
  }.bind(this));
};

module.exports = EventHubClient;