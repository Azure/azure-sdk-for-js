// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventData = require("./eventdata");
var Promise = require('bluebird');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * @class EventHubReceiver
 * @classdesc Constructs an {@linkcode EventHubReceiver} object
 */
var EventHubReceiver = function (amqpClient, endpoint) {
	this.amqpClient = amqpClient;
	this.endpoint = endpoint;
};

util.inherits(EventHubReceiver, EventEmitter);

// On receiver message received
EventHubReceiver.MessageReceived = 'messageReceived';

// On receive error
EventHubReceiver.Error = 'error';

/* Notes: 	StartReceive shall handle retries
 *			onError shall be emitted after the retries have been exhausted 
 *			EventHubReceiver shall support redirect 
 */

/**
 * The [StartReceive]{@linkcode EventHubReceiver#StartReceive} method starts
 * receiving events from the event hub for the specified partition.
 * @param   startTime    The startTime to use as filter for the events being received.
 */
EventHubReceiver.prototype.StartReceive = function(startTime) {
  var self = this;
  return new Promise(function(resolve, reject) {
	self.amqpClient.createReceiver(self.endpoint).then(function (amqpReceiver) {
		amqpReceiver.on('message', function (message) {
			var eventData = new EventData(message.body, message.annotations.value);
			self.emit(EventHubReceiver.MessageReceived, eventData);
		});
		amqpReceiver.on('errorReceived', function(rx_err) {
			self.emit(EventHubReceiver.Error, rx_err);
		});
	});
	resolve();
  });
};

/**
 * The [StartReceiveFromOffset]{@linkcode EventHubReceiver#StartReceiveFromOffset} method starts
 * receiving events from the event hub, while filtering events starting at a certian offset.
 * @param   startOffset    The start offset to use as filter for the events being received.
 */
EventHubReceiver.prototype.StartReceiveFromOffset = function(startOffset) {
  var self = this;
  return new Promise(function(resolve, reject) {
	self.amqpClient.createReceiver(self.endpoint).then(function (amqpReceiver) {
		amqpReceiver.on('message', function (message) {
			var eventData = new EventData(message.body, message.annotations.value);
			self.emit(EventHubReceiver.MessageReceived, eventData);
		});
		amqpReceiver.on('errorReceived', function(rx_err) {
			self.emit(EventHubReceiver.Error, rx_err);
		});
	});
	resolve();
  });
};

module.exports = EventHubReceiver;
