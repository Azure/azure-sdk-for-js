// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Promise = require('bluebird');

import { EventEmitter } from 'events';

declare class EventHubSender extends EventEmitter {
    // TODO: When moving to amqp10 v3 use already available typings
    constructor(amqpSenderLink: any);
    send(message: any, partitionKey?: string): Promise<void>;
    close(): Promise<void>;

    // List of all the events that the receiver can emmit
    on(type: 'errorReceived', func: (err: Error) => void): this;
    // Required last overload, though which shouldn't be called during normal operation
    on(type: string, func: Function): this;
}

export = EventHubSender;
