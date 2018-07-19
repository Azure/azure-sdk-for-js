// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { CommandBuilder } from "yargs";
import { EventHubClient, EventPosition, EventData, delay } from "../../client/lib";
import { log } from "../utils/util";
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
    alias: "wait",
    describe: "Time in seconds to wait before sending the next message.",
    default: 5,
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

const cache: { [x: string]: EventData } = {};

export async function handler(argv: any): Promise<void> {
  try {
    validateArgs(argv);
    const partitionId: string = argv.partitionId;
    const consumerGroup: string = argv.consumer;
    const waitTime: number = argv.wait;
    console.log("consumer group            - %s", consumerGroup);
    console.log("partitionId               - %s", partitionId);
    console.log("wait time (seconds)       - %d", waitTime);
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
    log("Started receiving messages from time : '%s'.", new Date(now).toString());
    await delay(3000);
    setInterval(async () => {
      const nextIterationAt = Date.now() + (waitTime * 1000);
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
      log("Next message will be sent around %s", new Date(nextIterationAt).toString());
    }, waitTime * 1000);
  } catch (err) {
    return Promise.reject(err);
  }
}

const CtrlC = require("death");
CtrlC((signal, err) => {
  console.log("\nstats:");
  console.log("---------------------");
  console.log(" messageId | message ");
  console.log("---------------------");
  console.log("%o", cache);
  console.log("---------------------");
  process.exit();
});
