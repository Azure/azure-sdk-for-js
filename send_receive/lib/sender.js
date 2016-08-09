// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var errors = require('./errors.js');

/**
 * Instantiates a new sender from the AMQP `SenderLink`. Used by `EventHubClient`.
 *
 * Senders emit one event of note:
 * - `errorReceived`: Emits an error from the AMQP library when it receives one from the server.
 *
 * @param amqpSenderLink
 * @constructor
 */
function EventHubSender(amqpSenderLink) {
  var self = this;
  self._senderLink = amqpSenderLink;

  EventEmitter.call(self);

  var onErrorReceived = function (err) {
    self.emit('errorReceived', errors.translate(err));
  };

  self.on('newListener', function (event) {
    if (event === 'errorReceived') {
      self._senderLink.on('errorReceived', onErrorReceived);
    }
  });

  self.on('removeListener', function (event) {
    if (event === 'errorReceived') {
      self._senderLink.removeListener('errorReceived', onErrorReceived);
    }
  });
}

util.inherits(EventHubSender, EventEmitter);

/**
 * Sends the given message, with the given options on this link
 *
 * @method send
 * @param {*} message                   Message to send.  Will be sent as UTF8-encoded JSON string.
 * @param {string} [partitionKey]       Partition key - sent as x-opt-partition-key, and will hash to a partition ID.
 *
 * @return {Promise}
 */
EventHubSender.prototype.send = function (message, partitionKey) {
  var options = null;
  if (partitionKey) {
    options = {annotations: {'x-opt-partition-key': partitionKey}};
  }
  return this._senderLink.send(message, options);
};

/**
 * "Unlink" this sender, closing the link and resolving when that operation is complete. Leaves the underlying connection/session open.
 *
 * @method close
 *
 * @return {Promise}
 */
EventHubSender.prototype.close = function() {
  var self = this;
  return self._senderLink.detach().then(function () {
    self.removeAllListeners();
    self._senderLink = null;
  });
};

module.exports = EventHubSender;
