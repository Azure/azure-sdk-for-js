// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventEmitter = require('events');
var util = require('util');

var errors = require('./errors.js');

function EventHubReceiver(amqpReceiverLink) {
  var self = this;

  self._link = amqpReceiverLink;

  EventEmitter.call(self);
  
  var onErrorReceived = function (err) {
    self.emit('errorReceived', errors.translate(err));
  };
  
  self.on('newListener', function (event) {
    if (event === 'errorReceived') {
      amqpReceiverLink.on('errorReceived', onErrorReceived);
    }
  });
  
  self.on('removeListener', function (event) {
    if (event === 'errorReceived') {
      amqpReceiverLink.removeListener('errorReceived', onErrorReceived);
    }
  });
}

util.inherits(EventHubReceiver, EventEmitter);

module.exports = EventHubReceiver;