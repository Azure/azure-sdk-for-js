// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';
var Promise = require('bluebird');
var EventHubClient = require('azure-event-hubs').Client;

var connectionString = '[Event Hubs Connection String]';
var eventHubPath = '[Event Hub Path]';

var sendEvent = function (eventBody) {
  return function (sender) {
    sender.send(eventBody);
  };
};

var printError = function (err) {
  console.error(err.message);
};

var printEvent = function (ehEvent) {
  console.log('Event Received: ');
  console.log(JSON.stringify(ehEvent.body));
  console.log('');
};

var client = EventHubClient.fromConnectionString(connectionString, eventHubPath);

client.open()
      .then(client.getPartitionIds.bind(client))
      .then(function (partitionIds) {
        partitionIds.forEach(function (partitionId) {
          client.createReceiver('$Default', partitionId).then(function(receiver) {
            receiver.on('errorReceived', printError);
            receiver.on('message', printEvent);
          });
        });
        return Promise.resolve(partitionIds[0]);
      })
      .then(client.createSender.bind(client))
      .then(sendEvent('foo'))
      .catch(printError);