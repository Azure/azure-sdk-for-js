// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

declare interface EventData {
    partitionKey?: string;
    // string or decoded json of that string
    body: any;
    enqueuedTimeUtc?: Date;
    offset: string;
    properties?: EventData.Dictionary<any>;
    sequenceNumber: number;
    systemProperties?: EventData.Dictionary<any>;
}

declare namespace EventData {
    export interface Dictionary<T> {
        [key: string]: T;
    }
    // TODO: When upgrading to amqp10 v3 use existing typings
    export function fromAmqpMessage(msg: any): EventData;
}

export = EventData;
