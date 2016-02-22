// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var uuid = require('uuid');
var amqp10 = require('amqp10');
var ConnectionConfig = require('../lib/config.js');

var EventHubClient = require('../lib/client.js');
var ArgumentOutOfRangeError = require('../lib/errors.js').ArgumentOutOfRangeError;

function receiveAnEvent(partitionId, msgId, done, cbErr) {
  var config = new ConnectionConfig(process.env.EVENTHUB_CONNECTION_STRING, process.env.EVENTHUB_PATH);
  var amqpClient = new amqp10.Client(amqp10.Policy.EventHub);
  return amqpClient.connect(config.saslPlainUri)
    .then(function () {
      var justBeforeNow = Date.now() - (1000 * 5); // 5 seconds ago
      var filterOptions = {
        attach: { source: { filter: {
          'apache.org:selector-filter:string': amqp10.translator(
            ['described', ['symbol', 'apache.org:selector-filter:string'], ['string', "amqp.annotation.x-opt-enqueuedtimeutc > " + justBeforeNow]])
        } } }
      };
      return amqpClient.createReceiver(config.path + '/ConsumerGroups/$Default/Partitions/' + partitionId, filterOptions);
    })
    .then(function (receiver) {
      receiver.on('errorReceived', cbErr);
      receiver.on('message', function(message) {
        if (message.body && message.body.testId === msgId) {
          amqpClient.disconnect();
          done();
        }
      });
    });
}

describe('EventHubSender', function () {
  var client;

  beforeEach('create the client', function () {
    client = EventHubClient.fromConnectionString(process.env.EVENTHUB_CONNECTION_STRING, process.env.EVENTHUB_PATH);
  });

  afterEach('close the connection', function () {
    return client.close();
  });

  this.timeout(15000);

  describe('.event:errorReceived', function () {
    it('fires with ArgumentOutOfRangeError when the partition ID doesn\'t exist', function (done) {
      client.createSender('$Default', 'bad')
        .then(function (sender) {
          sender.on('errorReceived', function (err) {
            err.should.be.instanceOf(ArgumentOutOfRangeError);
            done();
          });
        });
    });
  });

  describe('send', function () {
    it('should send a message', function (done) {
      client.createSender('0')
        .then(function (sender) {
          var id = uuid.v4();
          receiveAnEvent('0', id, done, done)
            .then(function() {
              sender.on('errorReceived', done);
              sender.send({ testId: id });
            });
        });
    });
  });
});
