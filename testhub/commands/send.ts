// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { CommandBuilder } from "yargs";
import { EventHubClient, EventData } from "../../client/lib";

export const command = "send";

export const describe = "Sends messages to an eventhub.";

export const builder: CommandBuilder = {
  b: {
    alias: "msg-count",
    describe: "Number of events to send.",
    default: 1,
    number: true
  },
  s: {
    alias: "msg-size",
    describe: "size in bytes for each event.",
    default: 256,
    number: true
  },
  p: {
    alias: "partition-id",
    describe: "The partitionId that the sender should send the event to.",
    string: true,
  },
  r: {
    alias: "repeat",
    describe: "Number of times to repeat the send command",
    number: true,
    default: 1
  }
};

function validateArgs(argv: any): void {
  if (!argv) {
    throw new Error(`argv cannot be null or undefined.`);
  }

  if (!argv.connStr && (!argv.key || !argv.keyName || !argv.address)) {
    throw new Error(`Either provide --conn-str OR (--address "sb://{yournamespace}.servicebus.windows.net" --key-name "<shared-access-key-name>" --key "<shared-access-key-value>")`);
  }
}

export async function handler(argv: any): Promise<void> {
  try {
    validateArgs(argv);
    let client: EventHubClient;
    let connectionString = argv.connStr;
    if (!connectionString) {
      let address = argv.address;
      if (!address.endsWith("/")) address += "/";
      if (!address.startsWith("sb://")) address = "sb://" + address;
      connectionString = `Endpoint=${address};SharedAccessKeyName=${argv.keyName};SharedAccessKey=${argv.key}`;
    }
    client = EventHubClient.createFromConnectionString(connectionString, argv.hub);
    const duration = argv.duration;
    const msgCount = argv.msgCount;
    const msgSize = argv.msgSize;
    const partitionId = argv.partitionId;
    const repeat = argv.repeat;
    const msgBody = Buffer.from("Z".repeat(msgSize));
    const obj: EventData = { body: msgBody };
    if (duration) {
      console.log(">>>>>>>>>>>> Performance benchmark mode. <<<<<<<<<<<<<<<<");
      console.log("Will be sending messages by default to partition '0' or to a partition you specify via the -p switch.");
      let counter = 0;
      for (let i = 0; i < repeat; i++) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Repeat iteration: %d @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", i);
        console.log("Will be sending messages for %d seconds.", duration);
        const durationMS = duration * 1000;
        const startTime = Date.now();
        while ((Date.now() - startTime) < durationMS) {
          await client.send(obj, (partitionId || "0"));
          counter++;
          console.log("[Sender] sent the message, count: %d.", counter);
        }
        console.log(">>>> Sent %d messages in %d seconds @ %d messages/second.", counter, duration, Math.floor(counter / duration));
      }
    } else if (msgCount > 1) {
      let datas: EventData[] = [];
      let count = 0;
      for (let i = 0; i < msgCount; i++) {
        datas.push(obj);
        count++;
      }
      for (let i = 0; i < repeat; i++) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Repeat iteration: %d @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", i);
        console.log(`Created a batch message where ${datas.length} messages are grouped together and the size of each message is: ${msgBody.length}.`);
        await client.sendBatch(datas, partitionId);
        console.log("[Sender] Number of messages sent in a batch: ", count);
      }
    } else {
      for (let i = 0; i < repeat; i++) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Repeat iteration: %d @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", i);
        console.log(`Created the message of specified size: ${msgBody.length}.`);
        await client.send(obj, partitionId);
        console.log("[Sender] sent the message.");
      }
    }
  } catch (err) {
    throw err;
  }
}
