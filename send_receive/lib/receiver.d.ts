// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventEmitter } from 'events';
import Promise = require('bluebird');
import { Message } from 'azure-iot-common';

declare class EventHubReceiver extends EventEmitter {
    // TODO: When upgrading to amqp10 v3 use already existing typings
    constructor(amqpReceiverLink: any);
    close(): Promise<void>;

    // List of all the events that the receiver can emmit
    on(type: 'message', func: (message: Message) => void): this;
    on(type: 'errorReceived', func: (err: Error) => void): this;
    // Required last overload, though which shouldn't be called during normal operation
    on(type: string, func: Function): this;
}

export = EventHubReceiver;
