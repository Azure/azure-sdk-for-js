// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

/**
 * @class EventData
 * @classdesc Constructs a {@linkcode EventData} object.
 * @param {String}  bytes    The event payload as a byte array. 
 */
function EventData(bytes, systemProperties) {
  Object.defineProperties(this, {
    'PartitionKey':{
      value: "",
      writable: false
    },
    'Bytes':{
      value: bytes,
      writable: false
    },
    'EnqueuedTimeUtc':{
      value: null,
      writable: false
    },
    'Offset':{
      value: "",
      writable: false
    },
    'Properties':{
      value: null,
      writable: true
    },
    'SequenceNumber':{
      value: 0,
      writable: false
    },
    'SystemProperties':{
      value: systemProperties,
      writable: false
    }
  });
}

module.exports = EventData;
