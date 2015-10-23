// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var amqp10 = require('amqp10');
var Promise = require('bluebird');

var EventHubData = require('./eventdata');
var EventHubReceiver = require("./eventhubreceiver");

var managementEndpoint = '$management';

function parseEventHubConnString(connString)
{
  var config = {
    host: '',
    eventHubName: '',
    keyName: '',
    key: ''
  };

  var configArray = connString.split(';');
  configArray.forEach(function(element) {
    var res = element.match("Endpoint=sb://([^/]*)");
    if (res != null) {
        config.host = res[1];
    }
    res = element.match("SharedAccessKeyName=(.*)");
    if (res != null) {
        config.keyName = res[1];
    }
    res = element.match("SharedAccessKey=(.*)");
    if (res != null) {
        config.key = res[1];
    }
    res = element.match("EntityPath=(.*)");
    if (res != null) {
        config.eventHubName = res[1];
    }
  });
  return config;
}

/**
 * @class EventHubClient
 * @classdesc Constructs a {@linkcode EventHubClient} object with the given connection string
 * @param {String}  connString    The EventHub connection string
 * @param {String}  path          The EventHub path. Optional.
 */
function EventHubClient(connString, path) {
  this.config = parseEventHubConnString(connString);

  if (!this.config.eventHubName || this.config.eventHubName.length == 0)
  {
    throw new Error('No event hub name specified');
  }

  this.uri = 'amqps://' +
    encodeURIComponent(this.config.keyName) + ':' +
    encodeURIComponent(this.config.key) + '@' +
    this.config.host;

  this.amqpClient = new amqp10.Client(amqp10.Policy.EventHub);
};

/**
 * The [Send]{@linkcode EventHubClient#Send} method sends one Event to the Event Hub.
 */
EventHubClient.prototype.Send = function(event) {
  
  /* This code has to be reworked so that it uses the same amqpClient, there is no need to have 2 clients and thus 2 connecitons open */
  var self = this;
  var endpoint = '/' + this.config.eventHubName;
  return new Promise(function(resolve, reject) {
    self.amqpClient.connect(self.uri).then(function() {
      self.amqpClient.createSender(endpoint).then(function(sender) {
        sender.on('errorReceived', function (tx_err) {
          throw new Error('error sending request to Event Hub management endpoint.');
        });
        var request = { body: event.Bytes, properties: { messageId: '424242' } };
        sender.send(request);
        resolve();
      });
    });
  });
}

/**
 * The [SendBatch]{@linkcode EventHubClient#SendBatch} method sends a batch of Events to the Event Hub.
 */
EventHubClient.prototype.SendBatch = function(events) {
    /* Not implemented yet */ 
}

/**
 * The [GetPartitionIds]{@linkcode EventHubClient#GetPartitionIds} method gets the partition Ids for an EventHub.
 */
EventHubClient.prototype.GetPartitionIds = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    var ehName = self.config.eventHubName;
    var rxName = 'eventhubclient-rx';
    var rxOptions = { attach: { target: { address: rxName } } };
  
    self.amqpClient.connect(self.uri).then(function() {
      /* create a sender to send the request to the $management endpoint */
      self.amqpClient.createSender(managementEndpoint).then(function(sender) {
        sender.on('errorReceived', function (tx_err) {
          throw new Error('error sending request to Event Hub management endpoint.');
        });
        var request = { body: "stub", properties: { messageId: '424242', replyTo: rxName }, applicationProperties: { operation: "READ", name: ehName, type: "com.microsoft:eventhub" } };
        return sender.send(request);
      });
      /* create a receiver for the management endpoint to receive the partition count */
      self.amqpClient.createReceiver(managementEndpoint, rxOptions).then(function(receiver) {
        receiver.on('errorReceived', function (rx_err) {
          throw new Error('error receiving reply from Event Hub management endpoint.');
        });
        receiver.on('message', function (msg) {
          return resolve(msg.body.partition_ids);
        });
      });
    });
  });
}

/**
 * The [CreateReceiver]{@linkcode EventHubClient#CreateReceiver} method creates a new 
 * {@linkcode EventHubReceiver} instance.
 * @param {String}  consumerGroup  The consumer group to use for the new receiver.
 * @param {String}  partitionId    The partition Id to use for the new receiver.
 */
EventHubClient.prototype.CreateReceiver = function(consumerGroup, partitionId) {
	return new EventHubReceiver(this.amqpClient, '/' + this.config.eventHubName + '/ConsumerGroups/' + consumerGroup + '/Partitions/' + partitionId);
};

module.exports = EventHubClient;
