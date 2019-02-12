// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CommandBuilder } from "yargs";
import { EventHubClient, EventPosition, EventData } from "@azure/event-hubs";
import { log, setCurrentCommand } from "../utils/util";

export const command = "receive";

export const describe = "Receives messages from an eventhub.";

const logFrequency = 60000;

export const builder: CommandBuilder = {
  d: {
    alias: "duration",
    describe: "The value must be in seconds. Receive messages for the specified duration. Useful for benchmark testing.",
    number: true
  },
  p: {
    alias: "partitions",
    describe: "Comma seperated partition IDs.",
    default: "0",
    string: true,
    coerce: ((arg: any) => {
      if (typeof arg === "string")
        return arg.split(",").map((x) => { return x.trim() });
      else
        return arg;
    })
  },
  g: {
    alias: "consumer",
    describe: "Consumer group name",
    default: "$default",
    string: true
  },
  o: {
    alias: "offset",
    describe: "Starting offset",
    default: "-1",
    string: true
  },
  f: {
    alias: "full-event-data",
    describe: "Display the complete EventData object.",
    default: false,
    boolean: true
  }
};

interface CountEntry {
  currCount: number;
  prevCount: number;
  prevTimestamp: number;
  currTimestamp: number;
  timer?: NodeJS.Timer;
}


export const partitionCount: { [x: string]: CountEntry } = {};

export const uberStartTime = Date.now();

export let startTime: number;

function validateArgs(argv: any) {
  if (!argv) {
    throw new Error(`argv cannot be null or undefined.`);
  }

  if (!argv.connStr && (!argv.key || !argv.keyName || !argv.address)) {
    throw new Error(`Either provide --conn-str OR (--address "sb://{yournamespace}.servicebus.windows.net" --key-name "<shared-access-key-name>" --key "<shared-access-key-value>")`);
  }
}

export async function handler(argv: any): Promise<void> {
  setCurrentCommand(command);

  try {
    validateArgs(argv);
    let partitionIds = argv.partitions;
    const consumerGroup = argv.consumer;
    const offset = argv.offset;
    const duration = argv.duration;
    let client: EventHubClient;
    let connectionString = argv.connStr;
    if (!connectionString) {
      let address = argv.address;
      if (!address.endsWith("/")) address += "/";
      if (!address.startsWith("sb://")) address = "sb://" + address;
      connectionString = `Endpoint=${address};SharedAccessKeyName=${argv.keyName};SharedAccessKey=${argv.key}`;
    }
    client = EventHubClient.createFromConnectionString(connectionString, argv.hub);
    if (!partitionIds) {
      partitionIds = await client.getPartitionIds();
    }
    log("PartitionIds in the eventhub '%s' are: ", argv.hub, partitionIds);
    startTime = Date.now();
    log("Start time for receiving messages is: %s", startTime);
    if (duration) {
      log(">>>>>>>>>>>> Performance benchmark mode. <<<<<<<<<<<<<<<<");
      log("Will be receiving messages only from partition: '0'.");
      log(`Created Receiver for partition: "0" in consumer group: "${consumerGroup}" in event hub "${argv.hub}".`);
      let datas = await client.receiveBatch("0", 500000, duration, { consumerGroup: consumerGroup, eventPosition: EventPosition.fromOffset(offset, true) });
      log(`Received ${datas.length} messages in ${duration} seconds @ ${Math.floor(datas.length / duration)} messages/second.`);
    } else {
      for (let id of partitionIds) {
        log(`Created Receiver: for partition: "${id}" in consumer group: "${consumerGroup}" in event hub "${argv.hub}".`);
        const initialTS = Date.now();
        partitionCount[id] = { prevCount: 0, currCount: 0, timer: undefined, prevTimestamp: initialTS, currTimestamp: initialTS };
        const messageRate = () => {
          const prevCount = partitionCount[id].prevCount;
          const currCount = partitionCount[id].currCount;
          const currTimestamp = partitionCount[id].currTimestamp;
          let duration = (currTimestamp - startTime) / 1000;
          if (prevCount !== currCount) {
            partitionCount[id].prevCount = currCount;
            partitionCount[id].prevTimestamp = currTimestamp;
          } else {
            duration = (partitionCount[id].prevTimestamp - startTime) / 1000;
            log("No new messages have been received since '%s'.", new Date(partitionCount[id].prevTimestamp).toISOString());
          }
          log(`Received ${currCount} messages from partition "${id}" in ${duration} seconds ` +
            `@ ${Math.floor(currCount / duration)} messages/second.`);
        };
        const onMessage = (m: EventData) => {
          const ts = Date.now();
          if (m.sequenceNumber && m.sequenceNumber !== partitionCount[id].currCount) {
            log(`missed a message: seq: ${m.sequenceNumber}, count: ${partitionCount[id].currCount}`);
          }
          partitionCount[id].currCount += 1;
          partitionCount[id].currTimestamp = ts;
          if (partitionCount[id].timer == undefined) {
            partitionCount[id].prevTimestamp = ts;
            partitionCount[id].timer = setInterval(messageRate, logFrequency);
          }
          if (argv.fullEventData) {
            log("Corresponding EventData object: %o", m);
          }
        };
        const onError = (err: any) => {
          if (partitionCount[id].timer != undefined) {
            clearInterval(partitionCount[id].timer as NodeJS.Timer);
            partitionCount[id].timer = undefined;
          }
          log("^^^^^^^^^^ An error occured with the receiver: %o", err);
        };
        client.receive(id, onMessage, onError, { consumerGroup: consumerGroup, eventPosition: EventPosition.fromOffset(offset, true) });
      }
    }
    log("Started receiving messages from offset: '%s'.", offset);
  } catch (err) {
    return Promise.reject(err);
  }
}
