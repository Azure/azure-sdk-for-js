// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

function EventHubReceiver(amqpReceiverLink) {
  this._link = amqpReceiverLink;
}

module.exports = EventHubReceiver;