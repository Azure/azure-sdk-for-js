// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var uuid = require('uuid');
var amqp10 = require('amqp10');
var ConnectionConfig = require('../lib/config.js');

var EventHubClient = require('../lib/client.js');
var MessagingEntityNotFoundError = require('../lib/errors.js').MessagingEntityNotFoundError;
var ArgumentOutOfRangeError = require('../lib/errors.js').ArgumentOutOfRangeError;

function sendAnEvent(partitionId, msgId, cbErr) {
  var config = new ConnectionConfig(process.env.EVENTHUB_CONNECTION_STRING, process.env.EVENTHUB_PATH);
  var amqpClient = new amqp10.Client(amqp10.Policy.EventHub);
  return amqpClient.connect(config.saslPlainUri())
    .then(function () {
      return amqpClient.createSender(config.path + '/Partitions/' + partitionId);
    })
    .then(function (sender) {
      var msg = { testId: msgId };
      sender.on('errorReceived', cbErr);
      return sender.send(msg);
    });
}

describe('EventHubReceiver', function () {
  var client;

  beforeEach('create the client', function () {
    client = EventHubClient.fromConnectionString(process.env.EVENTHUB_CONNECTION_STRING, process.env.EVENTHUB_PATH);
  });

  afterEach('close the connection', function () {
    return client.close();
  });

  this.timeout(15000);

  describe('.event:errorReceived', function () {
    it('fires with MessagingEntityNotFoundError when the consumer group doesn\'t exist', function (done) {
      client.createReceiver('bad', '0')
        .then(function (receiver) {
          receiver.on('errorReceived', function (err) {
            err.should.be.instanceOf(MessagingEntityNotFoundError);
            done();
          });
        });
    });
  
    it('fires with ArgumentOutOfRangeError when the partition ID doesn\'t exist', function (done) {
      client.createReceiver('$Default', 'bad')
        .then(function (receiver) {
          receiver.on('errorReceived', function (err) {
            err.should.be.instanceOf(ArgumentOutOfRangeError);
            done();
          });
        });
    });
  });

  describe('.event:message', function () {
    it('fires when an event is received', function (done) {
      client.createReceiver('$Default', '0')
        .then(function (receiver) {
          var id = uuid.v4();
          receiver.on('errorReceived', done);
          receiver.on('message', function (message) {
            if (message.body && message.body.testId === id) done();
          });
          sendAnEvent('0', id, done);
        });
    });
  });
});