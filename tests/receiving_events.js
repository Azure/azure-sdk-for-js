// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
chai.should();

var Receiver = require('../lib/receiver.js');
var EventHubClient = require('../lib/client.js');
var MessagingEntityNotFoundError = require('../lib/errors.js').MessagingEntityNotFoundError;
var ArgumentOutOfRangeError = require('../lib/errors.js').ArgumentOutOfRangeError;

describe('EventHubClient', function () {
  this.timeout(15000);

  describe('#createReceiver', function () {
    it('returns a Receiver', function () {
      var client = EventHubClient.fromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING, process.env.EVENT_HUB_PATH);
      var receiver = client.createReceiver('$Default', '0');
      return receiver.should.eventually.be.instanceOf(Receiver);
    });
  });
});

describe('EventHubReceiver', function () {
  var client;

  this.timeout(15000);
  
  beforeEach('create the client', function () {
    client = EventHubClient.fromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING, process.env.EVENT_HUB_PATH);
  });

  afterEach('close the connection', function () {
    return client.close();
  });

  it('emits MessagingEntityNotFoundError when the consumer group doesn\'t exist', function (done) {
    client.createReceiver('bad', '0')
      .then(function (receiver) {
        receiver.on('errorReceived', function (err) {
          err.should.be.instanceOf(MessagingEntityNotFoundError);
          done();
        });
      });
  });

  it('emits ArgumentOutOfRangeError when the partition ID doesn\'t exist', function (done) {
    client.createReceiver('$Default', 'bad')
      .then(function (receiver) {
        receiver.on('errorReceived', function (err) {
          err.should.be.instanceOf(ArgumentOutOfRangeError);
          done();
        });
      });
  });
});