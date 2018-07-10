// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { CommandBuilder } from "yargs";
import { EventHubClient, EventData, delay } from "../../client/lib";

export const command = "send";

export const describe = "Sends messages to an eventhub.";

export const builder: CommandBuilder = {
  b: {
    alias: "msg-group",
    describe: "Number of events to group/batch.",
    default: 1,
    number: true
  },
  t: {
    alias: "msg-count",
    describe: "Number of events to send in one iteration.",
    default: 1000,
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
  w: {
    alias: "wait",
    describe: "Number of seconds to sleep.",
    default: 0,
    number: true
  },
  i: {
    alias: "iterations",
    describe: "Number of iterations to repeat the process of sending messages. For sending " +
      "messages forever, provide a value less than 1.",
    number: true,
    default: 1
  }
};

function validateArgs(argv: any): void {
  if (!argv) {
    throw new Error(`argv cannot be null or undefined.`);
  }

  if (!argv.connStr && (!argv.key || !argv.keyName || !argv.address)) {
    throw new Error(`Either provide --conn-str OR (--address "sb://{yournamespace}.servicebus.` +
      `windows.net" --key-name "<shared-access-key-name>" --key "<shared-access-key-value>")`);
  }
}

export async function handler(argv: any): Promise<void> {
  validateArgs(argv);
  let connectionString = argv.connStr;
  if (!connectionString) {
    let address = argv.address;
    if (!address.endsWith("/")) address += "/";
    if (!address.startsWith("sb://")) address = "sb://" + address;
    connectionString = `Endpoint=${address};SharedAccessKeyName=${argv.keyName};SharedAccessKey=${argv.key}`;
  }
  const msgCount = argv.msgCount;
  const msgGroup = argv.msgGroup;
  const msgSize = argv.msgSize;
  const partitionId = argv.partitionId;
  const iterations = argv.iterations;
  const wait = argv.wait;
  const clientPool = argv.clientPool;
  const iterationValue = iterations < 1 ? Infinity : iterations;
  console.log("client pool                  - %d", clientPool);
  console.log("msg count                    - %d", msgCount);
  console.log("msg group (batch size)       - %d", msgGroup);
  console.log("msg size                     - %d", msgSize);
  console.log("iterations                   - %s", iterationValue);
  console.log("wait time between iterations - %d", wait);
  let clients: EventHubClient[] = [];
  for (let c = 0; c < clientPool; c++) {
    if (partitionId != undefined) {
      console.log("[Client-%d] Sending messages to partitionId '%s'.", c, partitionId);
    } else {
      console.log("[Client-%d] Sending messages in a round robin fashion to all the partitions.", c);
    }
    clients.push(EventHubClient.createFromConnectionString(connectionString, argv.hub));
  }

  clients.forEach(async (client: EventHubClient, index: number) => {
    try {
      const msgBody = Buffer.from("Z".repeat(msgSize));
      const obj: EventData = { body: msgBody };
      let datas: EventData[] = [];
      let count = 0;
      if (msgGroup > 1) { // send batch
        for (count = 0; count < msgGroup; count++) {
          datas.push(obj);
        }
      }
      const msgToSend: EventData | EventData[] = datas.length ? datas : obj;
      for (let i = 0; i < iterationValue; i++) {
        const startTime = Date.now();
        for (let j = 0; j < msgCount; j++) {
          await sendMessage(client, index, msgToSend, partitionId);
          console.log("[Client-%d] [iteration-%d] message number %d.", index, i, j + 1);
        }
        const totalTime = (Date.now() - startTime) / 1000;
        const totalMsgs = msgCount * msgGroup;
        console.log("[Client-%d] [iteration-%d] total time in seconds: %d, number of messages sent: %d, messages sent/second: %d, size (in bytes) of each message: %d.", index, i,
          totalTime, totalMsgs, totalMsgs / totalTime, msgGroup * msgBody.length);
        if (wait > 0) {
          if (i + 1 < iterationValue) {
            console.log("[Client-%d] #################### Waiting for %d seconds, before starting iteration: %d ########################", index, wait, i + 1);
            await delay(wait * 1000);
          } else {
            console.log("[Client-%d] #################### All iterations complete ########################", index);
          }
        }
      }
    } catch (err) {
      throw err;
    }
  });
}

async function sendMessage(client: EventHubClient, index: number, data: EventData | EventData[], partitionId?: string): Promise<any> {
  if (Array.isArray(data)) {
    return await client.sendBatch(data, partitionId);
    console.log("[Client-%d] Number of messages sent in a batch: ", index, (data as EventData[]).length);
  } else {
    return await client.send(data, partitionId);
  }
}
