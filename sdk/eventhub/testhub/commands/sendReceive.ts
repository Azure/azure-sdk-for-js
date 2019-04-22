// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommandBuilder } from "yargs";
import { EventHubClient, EventPosition, EventData, delay } from "@azure/event-hubs";
import { log, setCurrentCommand, randomNumberFromInterval } from "../utils/util";
import * as uuid from "uuid/v4";

export const command = "send-receive";

export const describe = "Sends a message to an event hub partition and receives the message " +
  "from that eventhub partition, thus verifying that the sent message was received successfully.";

export const builder: CommandBuilder = {
  p: {
    alias: "partitionId",
    describe: "The partition id to send the message and receive from.",
    default: "0",
    string: true
  },
  g: {
    alias: "consumer",
    describe: "Consumer group name.",
    default: "$default",
    string: true
  },
  w: {
    alias: "maxwait",
    describe: "Max time in seconds to wait before sending the next message. " +
      "A random number between 5 and the provided number",
    default: 2000,
    number: true
  },
};


function validateArgs(argv: any) {
  if (!argv) {
    throw new Error(`argv cannot be null or undefined.`);
  }

  if (!argv.connStr && (!argv.key || !argv.keyName || !argv.address)) {
    throw new Error(`Either provide --conn-str OR (--address "sb://{yournamespace}.servicebus.windows.net" --key-name "<shared-access-key-name>" --key "<shared-access-key-value>")`);
  }
}

export const cache: { [x: string]: EventData } = {};

export const minWaitTime = 5;

export async function handler(argv: any): Promise<void> {
  setCurrentCommand(command);
  try {
    validateArgs(argv);
    const partitionId: string = argv.partitionId;
    const consumerGroup: string = argv.consumer;
    const maxWaitTime: number = argv.maxwait;
    console.log("consumer group                - %s", consumerGroup);
    console.log("partitionId                   - %s", partitionId);
    console.log("max wait time (seconds)       - %d", maxWaitTime);
    let client1: EventHubClient;
    let client2: EventHubClient;
    let connectionString = argv.connStr;
    if (!connectionString) {
      let address = argv.address;
      if (!address.endsWith("/")) address += "/";
      if (!address.startsWith("sb://")) address = "sb://" + address;
      connectionString = `Endpoint=${address};SharedAccessKeyName=${argv.keyName};SharedAccessKey=${argv.key}`;
    }
    client1 = EventHubClient.createFromConnectionString(connectionString, argv.hub);
    client2 = EventHubClient.createFromConnectionString(connectionString, argv.hub);
    log(`Created Receiver: for partition: "${partitionId}" in consumer group: "${consumerGroup}" in event hub "${argv.hub}".`);
    log(`Created Sender: for partition: "${partitionId}" in event hub "${argv.hub}".`);
    const onMessage = (m: EventData) => {
      const mid = m.properties!.message_id as string;
      const num = m.sequenceNumber;
      if (mid && !cache[mid]) {
        const msg = `Error message with seq num ${num} and id '${mid}' not found in cache..`;
        log(">>>> %o", new Error(msg));
      } else {
        log("Received message with seq num %d and id '%s' and it is present in cache.", num, mid);
        delete cache[mid];
      }
    };
    const onError = (err: any) => {
      log("^^^^^^^^^^ An error occured with the receiver: %o", err);
    };
    const now = Date.now();
    client1.receive(partitionId, onMessage, onError, { consumerGroup: consumerGroup, eventPosition: EventPosition.fromEnqueuedTime(now) });
    log("Started receiving messages from enqueued time : '%s'.", new Date(now).toString());
    await delay(3000);
    while (true) {
      const waitTime = randomNumberFromInterval(minWaitTime, maxWaitTime) * 1000;
      const nextIterationAt = Date.now() + waitTime;
      const messageId = uuid();
      const m: EventData = {
        body: "Hello World Event Hub " + new Date().toString(),
        properties: {
          message_id: messageId
        }
      };
      if (cache[messageId]) {
        log("Looks like message with id '%s' is already present in the cache %o", messageId, cache);
      }
      cache[messageId] = m;
      try {
        const delivery = await client2.send(m, partitionId);
        log("Sent message with id '%s'. Delivery id '%d', tag '%s'.",
          messageId, delivery.id, delivery.tag.toString());
      } catch (err) {
        log("An error occurred while sending the message with id '%s', %o", messageId, err);
      }
      log("Sleeping for %d seconds. Next message will be sent around %s",
        waitTime / 1000, new Date(nextIterationAt).toString());
      try {
        await delay(waitTime);
      } catch (err) {
        log("An error occurred while sleeping for %d milliseconds, %o", waitTime, err);
      }
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
