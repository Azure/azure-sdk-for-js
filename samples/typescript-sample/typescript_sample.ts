// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// This sample has the same behavior as simple_eventhubs_client.js, but is written in Typescript

import Promise = require('bluebird');

import { Client as EventHubClient, Sender as EventHubSender, Receiver as EventHubReceiver, Message } from 'azure-event-hubs';

// The Event Hubs SDK can also be used with an Azure IoT Hub connection string.
// In that case, the eventHubPath variable is not used and can be left undefined.
const connectionString = '[Event Hubs Connection String]';
const eventHubPath = '[Event Hub Path]';

function sendEvent(eventBody: string): (_: EventHubSender) => Promise<void> {
    return (sender: EventHubSender) => {
        console.log('Sending Event: ' + eventBody);
        return sender.send(eventBody);
    };
}

function printError(err: Error): void {
    console.error(err.message);
}

function printEvent(ehEvent: Message): void {
    console.log('Event Received: ');
    console.log(JSON.stringify(ehEvent.body));
    console.log('');
}

let client = EventHubClient.fromConnectionString(connectionString, eventHubPath);
let receiveAfterTime = Date.now() - 5000;

client.open()
      .then(client.getPartitionIds.bind(client))
      .then(
        (partitionIds: EventHubClient.PartitionId[]) =>
            Promise.map(partitionIds, (partitionId) =>
                client.createReceiver('$Default', partitionId, { startAfterTime : receiveAfterTime})
                      .then((receiver: EventHubReceiver) => {
                          receiver.on('errorReceived', printError);
                          receiver.on('message', printEvent);
                      })))
      .then(() => client.createSender())
      .then(sendEvent('foo'))
      .catch(printError);
