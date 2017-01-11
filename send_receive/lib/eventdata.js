// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

/**
 * @class EventData
 * @classdesc Constructs a {@linkcode EventData} object.
 * @param {String}  body                    The event payload as a byte array.
 * @param {String}  annotations             The message annotations associated with event.
 * @param {String}  properties              The properties associated with event.
 * @param {String}  applicationProperties   The application properties associated with event.
 */
function EventData(body, annotations, properties, applicationProperties) {
  Object.defineProperties(this, {
    'partitionKey': {
      get: function () {
        if (this.annotations) {
          return this.annotations["x-opt-partition-key"];
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
        if (this.annotations) {
          return this.annotations["x-opt-enqueued-time"];
        } else {
          return null;
        }
      }
    },
    'offset': {
      get: function () {
        if (this.annotations) {
          return this.annotations["x-opt-offset"];
        } else {
          return "";
        }
      }
    },
    'properties': {
      value: properties,
      writable: true
    },
    'applicationProperties': {
      value: applicationProperties,
      writable: true
    },
    'sequenceNumber': {
      get: function () {
        if (this.annotations) {
          return this.annotations["x-opt-sequence-number"];
        } else {
          return 0;
        }
      }
    },
    'annotations': {
      value: annotations,
      writable: false
    },
    'systemProperties': {
      value: properties,
      writable: false
    }
  });
}

EventData.fromAmqpMessage = function (msg) {
  return new EventData(msg.body, msg.messageAnnotations, msg.properties, msg.applicationProperties);
};

module.exports = EventData;
