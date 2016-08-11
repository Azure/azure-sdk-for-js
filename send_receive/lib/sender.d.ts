// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Promise = require('bluebird');

import { EventEmitter } from 'events';

declare class EventHubSender extends EventEmitter {
    // TODO: When moving to amqp10 v3 use already available typings
    constructor(amqpSenderLink: any);
    send(message: any, partitionKey?: string): Promise<void>;
    close(): Promise<void>;
}

export = EventHubSender;
