// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var uuid = require('uuid');
var amqp10 = require('amqp10');
var Promise = require('bluebird');
var makeConfig = require('./config.js');
var ArgumentError = require('azure-iot-common').errors.ArgumentError;
var MessagingEntityNotFoundError = require('../lib/errors.js').MessagingEntityNotFoundError;

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
      body: [],
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

    var rxopt = { attach: { target: { address: replyTo } } };

    this.open()
      .then(function () {    
        return Promise.all([
          this._amqp.createReceiver(endpoint, rxopt),
          this._amqp.createSender(endpoint)
        ]);
      }.bind(this))
      .spread(function (receiver, sender) {
        receiver.on('errorReceived', reject);
        sender.on('errorReceived', reject);

        receiver.on('message', function (msg) {
          var code = msg.applicationProperties.value['status-code'];
          var desc = msg.applicationProperties.value['status-description'];
          if (code === 200) {
            resolve(msg.body.partition_ids);
          }
          else if (code === 404) {
            reject(new MessagingEntityNotFoundError(desc));
          }
        });

        return sender.send(request);
      });
  }.bind(this));
};

EventHubClient.prototype.createReceiver = function createReceiver(consumerGroup, partitionId) {
  return this.open()
    .then(function() {
      return Promise.reject(new MessagingEntityNotFoundError(consumerGroup + ':' + partitionId));
    });
};

module.exports = EventHubClient;