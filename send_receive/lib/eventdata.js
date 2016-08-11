// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

/**
 * @class EventData
 * @classdesc Constructs a {@linkcode EventData} object.
 * @param {String}  body   The event payload as a byte array.
 */
function EventData(body, systemProperties, properties) {
  Object.defineProperties(this, {
    'partitionKey': {
      get: function () {
        if (this.systemProperties) {
          return this.systemProperties["x-opt-partition-key"];
        } else {
          return null;
        }
      }
    },
    'body': {
      value: body,
      writable: false
    },
    'enqueuedTimeUtc': {
      get: function () {
        if (this.systemProperties) {
          return this.systemProperties["x-opt-enqueued-time"];
        } else {
          return null;
        }
      }
    },
    'offset': {
      get: function () {
        if (this.systemProperties) {
          return this.systemProperties["x-opt-offset"];
        } else {
          return "";
        }
      }
    },
    'properties': {
      value: properties,
      writable: true
    },
    'sequenceNumber': {
      get: function () {
        if (this.systemProperties) {
          return this.systemProperties["x-opt-sequence-number"];
        } else {
          return 0;
        }
      }
    },
    'systemProperties': {
      value: systemProperties,
      writable: false
    }
  });
}

EventData.fromAmqpMessage = function (msg) {
  return new EventData(msg.body, msg.messageAnnotations, msg.properties);
};

module.exports = EventData;
