// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var uuid = require('uuid');
var amqp10 = require('amqp10');
var Promise = require('bluebird');
var Receiver = require('./receiver.js');
var Sender = require('./sender.js');
var ConnectionConfig = require('./config.js');
var ArgumentError = require('azure-iot-common').errors.ArgumentError;
var MessagingEntityNotFoundError = require('./errors.js').MessagingEntityNotFoundError;

/**
 * Instantiate a client pointing to the Event Hub given by this configuration.
 *
 * @param {ConnectionConfig} config
 * @constructor
 */
function EventHubClient(config) {
  var makeError = function (prop) {
    return new ArgumentError('config is missing property ' + prop);
  };

  ['host', 'path', 'keyName', 'key'].forEach(function (prop) {
    if (!config[prop]) throw makeError(prop);
  });

  this._config = config;
  this._amqp = new amqp10.Client(amqp10.Policy.merge({
    senderLink: {
      attach: {
        maxMessageSize: 262144
      }
    },
    receiverLink: {
      attach: {
        maxMessageSize: 0 // means infinity
      },
      decoder: function(body) {
        var bodyStr = null;

        if (body instanceof Buffer) {
          bodyStr = body.toString();
        } else if (typeof body === 'string') {
          bodyStr = body;
        } else {
          return body;
        }

        try {
          return JSON.parse(bodyStr);
        } catch (e) {
          return body;
        }
      }
    }
  }, amqp10.Policy.EventHub));
  this._connectPromise = null;
}

/**
 * Static factory method for convenience.
 *
 * @method fromConnectionString
 * @param {string} connectionString - Connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
 * @param {string} path - Event Hub path of the form 'my-event-hub-name'
 * @returns {EventHubClient}
 */
EventHubClient.fromConnectionString = function (connectionString, path) {
  if (!connectionString) {
    throw new ArgumentError('Missing argument connectionString');
  }

  var config = new ConnectionConfig(connectionString, path);
  if (!config.path) {
    throw new ArgumentError('Connection string doesn\'t have EntityPath, or missing argument path');
  }

  return new EventHubClient(config);
};

/**
 * Opens the AMQP connection to the Event Hub for this client, returning a promise that will be resolved when the connection is completed.
 *
 * @method open
 *
 * @returns {Promise}
 */
EventHubClient.prototype.open = function () {
  var self = this;
  if (!this._connectPromise) {
    if (!this._config.isIotHub) {
      this._connectPromise = this._amqp.connect(this._config.saslPlainUri);
    } else {
      this._connectPromise = new Promise(function (resolve, reject) {
        self._amqp.connect(self._config.saslPlainUri)
          .then(function () {
            var rxOptions = { attach: { target: { address: 'rx-name' } } };
            return self._amqp.createReceiver(self._config.path, rxOptions);
          })
          .then(function (receiver) {
            receiver.on('errorReceived', function (rx_err) {
              if (rx_err.condition === 'amqp:link:redirect') {
                var res = rx_err.errorInfo.address.match('amqps://([^/]*)/([^/]*)');
                self._config.path = res[2];
                self._config.saslPlainUri = 'amqps://' +
                            encodeURIComponent(self._config.keyName) + ':' +
                            encodeURIComponent(self._config.key) + '@' +
                            rx_err.errorInfo.hostname;
                self._amqp.disconnect()
                  .then(function () {
                    self._amqp = new amqp10.Client(amqp10.Policy.EventHub);
                    return self._amqp.connect(self._config.saslPlainUri);
                  })
                  .then(function () {
                    resolve();
                  });
              }
              else {
                reject(new Error('error receiving reply from Event Hub management endpoint: ' + rx_err.description));
              }
            });
            receiver.on('attach', resolve);
          });
      });
    }
  }

  return this._connectPromise;
};

/**
 * Closes the AMQP connection to the Event Hub for this client, returning a promise that will be resolved when disconnection is completed.
 *
 * @method close
 *
 * @returns {Promise}
 */
EventHubClient.prototype.close = function () {
  this._connectPromise = null;
  return this._amqp.disconnect();
};

/**
 * Gets the partition IDs for the Event Hub for this client.
 *
 * @method getPartitionIds
 *
 * @returns {Promise} with array of partition IDs.
 */
EventHubClient.prototype.getPartitionIds = function () {
  return new Promise(function (resolve, reject) {
    var endpoint = '$management';
    var replyTo = uuid.v4();

    var request = {
      body: [],
      properties: {
        messageId: uuid.v4(),
        replyTo: replyTo
      },
      applicationProperties: {
        operation: "READ",
        name: this._config.path,
        type: "com.microsoft:eventhub"
      }
    };

    var rxopt = { attach: { target: { address: replyTo } } };

    this.open()
      .then(function () {
        return Promise.all([
          this._amqp.createReceiver(endpoint, rxopt),
          this._amqp.createSender(endpoint)
        ]);
      }.bind(this))
      .spread(function (receiver, sender) {
        receiver.on('errorReceived', reject);
        sender.on('errorReceived', reject);

        receiver.on('message', function (msg) {
          var code = msg.applicationProperties['status-code'];
          var desc = msg.applicationProperties['status-description'];
          if (code === 200) {
            resolve(msg.body.partition_ids);
          }
          else if (code === 404) {
            reject(new MessagingEntityNotFoundError(desc));
          }
        });

        return sender.send(request);
      });
  }.bind(this));
};

/**
 * Creates a receiver for the given event hub, consumer group, and partition.
 * Receivers are event emitters, watch for 'message' and 'errorReceived' events.
 *
 * @method createReceiver
 * @param {string} consumerGroup                      Consumer group from which to receive.
 * @param {(string|Number)} partitionId               Partition ID from which to receive.
 * @param {*} [options]                               Options for how you'd like to connect. Only one can be specified.
 * @param {(Date|Number)} options.startAfterTime      Only receive messages enqueued after the given time.
 * @param {string} options.startAfterOffset           Only receive messages after the given offset.
 * @param {string} options.customFilter               If you want more fine-grained control of the filtering.
 *      See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
 *
 * @return {Promise}
 */
EventHubClient.prototype.createReceiver = function createReceiver(consumerGroup, partitionId, options) {
  var self = this;
  return this.open()
    .then(function () {
      var endpoint = '/' + self._config.path +
        '/ConsumerGroups/' + consumerGroup +
        '/Partitions/' + partitionId;
      var filter = null;
      if (options) {
        var filterClause = null;
        if (options.startAfterTime) {
          var time = (options.startAfterTime instanceof Date) ? options.startAfterTime.getTime() : options.startAfterTime;
          filterClause = "amqp.annotation.x-opt-enqueuedtimeutc > '" + time + "'";
        } else if (options.startAfterOffset) {
          filterClause = "amqp.annotation.x-opt-offset > '" + options.startAfterOffset + "'";
        } else if (options.customFilter) {
          filterClause = options.customFilter;
        }

        if (filterClause) {
          filter = {
            attach: { source: { filter: {
              'apache.org:selector-filter:string': amqp10.translator(
                ['described', ['symbol', 'apache.org:selector-filter:string'], ['string', filterClause]])
            } } }
          };
        }
      }

      return self._amqp.createReceiver(endpoint, filter);
    })
    .then(function (amqpReceiver) {
      return new Receiver(amqpReceiver);
    });
};

/**
 * Creates a sender to the given event hub, and optionally to a given partition.
 * Senders are event emitters, watch for 'errorReceived' events.
 *
 * @method createSender
 * @param {(string|Number)} [partitionId]                 Partition ID to which it will send (optional).
 *
 * @return {Promise}
 */
EventHubClient.prototype.createSender = function createSender(partitionId) {
  var self = this;
  return this.open()
    .then(function () {
      var endpoint = '/' + self._config.path;
      if (partitionId) {
        endpoint += '/Partitions/' + partitionId;
      }
      return self._amqp.createSender(endpoint);
    })
    .then(function (amqpSender) {
      return new Sender(amqpSender);
    });
};

module.exports = EventHubClient;