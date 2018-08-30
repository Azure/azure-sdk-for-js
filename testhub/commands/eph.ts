// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { CommandBuilder } from "yargs";
import {
  EventProcessorHost, OnReceivedMessage, PartitionContext, OnReceivedError
} from "azure-event-processor-host";
import { log, setCurrentCommand } from "../utils/util";
import { EventHubClient, EventPosition, EventData, Dictionary } from "azure-event-hubs";

export const command = "eph";

export const describe = "Starts an eph to receive messages.";

export const builder: CommandBuilder = {
  s: {
    alias: "storage-str",
    describe: "Azure storage connection string.",
    required: true,
    string: true
  },
  p: {
    alias: "host-prefix",
    describe: "EPH name prefix",
    string: true,
    required: true
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
  t: {
    alias: "hosts",
    describe: "Number of hosts",
    default: 1,
    number: true
  },
  d: {
    alias: "lease-duration",
    number: true,
    default: 30,
    describe: "Lease duration in seconds."
  },
  r: {
    alias: "lease-renew-interval",
    number: true,
    default: 10,
    describe: "Lease renew interval in seconds."
  },
  l: {
    alias: "lease-container-name",
    describe: "The name of the lease container",
    default: "my-container",
    string: true
  }
};

function validateArgs(argv: any) {
  if (!argv) {
    throw new Error(`argv cannot be null or undefined.`);
  }

  if (!argv.connStr && (!argv.key || !argv.keyName || !argv.address)) {
    throw new Error(`Either provide --conn-str OR (--address "sb://{yournamespace}.servicebus.windows.net" --key-name "<shared-access-key-name>" --key "<shared-access-key-value>")`);
  }

  if (!argv.storageStr) {
    throw new Error(`-s <storage connection string> is required.`);
  }
}

export async function handler(argv: any): Promise<void> {
  setCurrentCommand(command);
  const ephCache: Dictionary<EventProcessorHost> = {};
  try {
    validateArgs(argv);
    const consumerGroup = argv.consumer;
    const offset = argv.offset;
    let connectionString: string = argv.connStr;
    const storageStr: string = argv.storageStr;
    const hub: string = argv.hub;
    const ephCount: number = argv.hosts;
    const leaseContainerName = argv.leaseContainerName;
    const hostPrefix = argv.hostPrefix;
    const leaseDuration = argv.leaseDuration;
    const leaseRenewInterval = argv.leaseRenewInterval;

    if (!connectionString) {
      let address = argv.address;
      if (!address.endsWith("/")) address += "/";
      if (!address.startsWith("sb://")) address = "sb://" + address;
      connectionString = `Endpoint=${address};SharedAccessKeyName=${argv.keyName};SharedAccessKey=${argv.key}`;
    }

    const client = EventHubClient.createFromConnectionString(connectionString, hub);
    const ids = await client.getPartitionIds();
    await client.close();
    log("Total number of partitions: %d", ids.length);
    log("Creating %d EPH(s).", ephCount);
    for (let i = 0; i < ephCount; i++) {
      const hostName = `${hostPrefix}-${i + 1}`;
      ephCache[hostName] = EventProcessorHost.createFromConnectionString(hostName,
        storageStr,
        connectionString,
        {
          leaseDuration: leaseDuration,
          leaseRenewInterval: leaseRenewInterval,
          eventHubPath: hub,
          consumerGroup: consumerGroup,
          leasecontainerName: leaseContainerName,
          initialOffset: offset === "-1" ? EventPosition.fromOffset("-1") : undefined,
          onEphError: (error) => {
            log(">>>>>>> [%s] Error: %O", hostName, error);
          }
        });
    }
    const startedEphs: Array<Promise<void>> = [];
    for (let eph of Object.values(ephCache)) {
      // Message handler
      let count: number = 0;
      const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
        count++;
        // log("##### [%s] %d - Rx message from partition '%s'.", eph.hostName, count, context.partitionId);
        // Checkpointing every 1000th event
        if (count % 1000 === 0) {
          try {
            log("##### [%s] %d - Checkpointing message from partition '%s', with offset " +
              "'%s', sequenceNumber %d.", eph.hostName, count, context.partitionId, data.offset,
              data.sequenceNumber);
            log("***** [%s] EPH is currently receiving messages from partitions: %s, total number %d.",
              eph.hostName, eph.receivingFromPartitions.toString(), eph.receivingFromPartitions.length);
            await context.checkpoint();
            log("$$$$ [%s] Successfully checkpointed message number %d for partition '%s'",
              eph.hostName, count, context.partitionId);
          } catch (err) {
            log(">>>>>>> [%s] An error occurred while checkpointing msg number %d: %O",
              eph.hostName, count, err);
          }
        }
      };
      // Error handler
      const onError: OnReceivedError = (error) => {
        log(">>>>> [%s] Received Error: %O", eph.hostName, error);
      };
      log(">>>>>> Starting the EPH - %s", eph.hostName);
      startedEphs.push(eph.start(onMessage, onError));
    }

    await Promise.all(startedEphs);

    setInterval(() => {
      log("Performing the task every 60 seconds..");
      const ephs = Object.values(ephCache);
      log(">>> Total number of ephs: %d", ephs.length);
      for (let eph of ephs) {
        const partitions = eph.receivingFromPartitions;
        log("[%s] Currently receiving from partitions: %s", eph.hostName, partitions.toString());
        log("[%s] Number of partitions: %d", eph.hostName, partitions.length);
      }
    }, 60000);
  } catch (err) {
    throw err;
  }
}
