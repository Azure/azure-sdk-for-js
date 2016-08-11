// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Promise = require('bluebird');

import ConnectionConfig = require('./config');
import Receiver = require('./receiver');
import Sender = require('./sender');

declare namespace EventHubClient {
    interface ReceiverOptions {
        startAfterTime?: Date | number;
        startAfterOffset?: string;
        customFilter?: string;
    }
    type PartitionId = string | number;
}

declare class EventHubClient {
    constructor(config: ConnectionConfig);
    open(): Promise<void>;
    close(): Promise<void>;
    getPartitionIds(): Promise<EventHubClient.PartitionId[]>;
    createReceiver(consumerGroup: string, partitionId: EventHubClient.PartitionId, options: EventHubClient.ReceiverOptions): Promise<Receiver>;
    createSender(partitionId: EventHubClient.PartitionId): Promise<Sender>;

    static fromConnectionString(connectionString: string, path: string): EventHubClient;
}

export = EventHubClient;
