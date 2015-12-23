// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventEmitter = require('events');
var util = require('util');

var errors = require('./errors.js');

/**
 * Instantiate a new receiver from the AMQP `ReceiverLink`. Used by `EventHubClient`.
 *
 * Receivers emit two events of note:
 * - `message`: Emits an AMQP message when one is received from the hub
 *    - `message.body` should contain contents (it will automatically parse JSON payloads)
 *    - `message.annotations.value` contains the message x-headers (see https://github.com/Azure/amqpnetlite/wiki/Azure-Service-Bus-Event-Hubs for details on message annotation properties from EH).
 * - `errorReceived`: Emits an error from the AMQP library when it receives one from the server.
 *
 * @param amqpReceiverLink
 * @constructor
 */
function EventHubReceiver(amqpReceiverLink) {
  var self = this;

  EventEmitter.call(self);

  self._receiverLink = amqpReceiverLink;

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

/**
 * "Unlink" this receiver, closing the link and resolving when that operation is complete. Leaves the underlying connection/session open.
 *
 * @method close
 *
 * @return {Promise}
 */
EventHubReceiver.prototype.close = function() {
  var self = this;
  return self._receiverLink.detach().then(function () {
    self.removeAllListeners();
    self._receiverLink = null;
  });
};

module.exports = EventHubReceiver;