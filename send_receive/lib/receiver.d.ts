// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventEmitter } from 'events';
import Promise = require('bluebird');

declare class EventHubReceiver extends EventEmitter {
    // TODO: When upgrading to amqp10 v3 use already existing typings
    constructor(amqpReceiverLink: any);
    close(): Promise<void>;
}

export = EventHubReceiver;