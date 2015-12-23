// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventEmitter = require('events');
var util = require('util');

var errors = require('./errors.js');

function EventHubReceiver(amqpReceiverLink) {
  var self = this;

  EventEmitter.call(self);
  
  var onErrorReceived = function (err) {
    self.emit('errorReceived', errors.translate(err));
  };
  
  var onMessage = function (message) {
    self.emit('message', message);
  };
  
  self.on('newListener', function (event) {
    if (event === 'errorReceived') {
      amqpReceiverLink.on('errorReceived', onErrorReceived);
    }
    else if (event === 'message') {
      amqpReceiverLink.on('message', onMessage);
    }
  });
  
  self.on('removeListener', function (event) {
    if (event === 'errorReceived') {
      amqpReceiverLink.removeListener('errorReceived', onErrorReceived);
    }
    else if (event === 'message') {
      amqpReceiverLink.removeListener('message', onMessage);
    }
  });
}

util.inherits(EventHubReceiver, EventEmitter);

module.exports = EventHubReceiver;