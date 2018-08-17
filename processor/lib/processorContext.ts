// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventHubClient, ReceiveHandler, EventPosition } from "azure-event-hubs";
import { PartitionContext } from "./partitionContext";
import { LeaseManager, BlobLeaseManager } from "./blobLeaseManager";
import { EventProcessorOptions } from "./eventProcessorHost";
import { validateType, Dictionary } from "./util/utils";
import { BlobService } from "./blobService";
import { AzureBlob } from "./azureBlob";

export interface ProcessorContext {
  hostName: string;
  consumerGroup: string;
  storageConnectionString: string;
  eventHubClient: EventHubClient;
  leaseManager: LeaseManager;
  autoCheckpoint: boolean;
  leasecontainerName: string;
  contextByPartition: Dictionary<PartitionContext>;
  receiverByPartition: Dictionary<ReceiveHandler>;
  blobReferenceByPartition: Dictionary<AzureBlob>
  initialOffset?: EventPosition;
  storageBlobPrefix?: string;
  composedBlobPrefix: string;
  blobService: BlobService;
}

export namespace ProcessorContext {

  export function create(hostName: string, storageConnectionString: string,
    eventHubClient: EventHubClient, options?: EventProcessorOptions): ProcessorContext {
    if (!options) options = {};
    validateType("hostName", hostName, true, "string");
    validateType("storageConnectionString", storageConnectionString, true, "string");
    validateType("eventHubClient", eventHubClient, true, "object");
    validateType("options", options, true, "object");
    validateType("options.autoCheckpoint", options.autoCheckpoint, false, "boolean");
    validateType("options.consumerGroup", options.consumerGroup, false, "string");
    validateType("options.leaseManager", options.leaseManager, false, "object");
    validateType("options.leasecontainerName", options.leasecontainerName, false, "string");
    validateType("options.initialOffset", options.initialOffset, false, "object");
    validateType("options.storageBlobPrefix", options.storageBlobPrefix, false, "string");

    const context: ProcessorContext = {
      hostName: hostName,
      storageConnectionString: storageConnectionString,
      eventHubClient: eventHubClient,
      contextByPartition: {},
      receiverByPartition: {},
      blobReferenceByPartition: {},
      consumerGroup: options.consumerGroup || "$default",
      leaseManager: options.leaseManager || new BlobLeaseManager(hostName),
      autoCheckpoint: options.autoCheckpoint || false,
      leasecontainerName: options.leasecontainerName || hostName,
      initialOffset: options.initialOffset,
      storageBlobPrefix: options.storageBlobPrefix,
      composedBlobPrefix: options.storageBlobPrefix
        ? `${options.storageBlobPrefix.trim()}${options.consumerGroup}/`
        : `${options.consumerGroup}/`,
      blobService: BlobService.create(hostName, storageConnectionString)
    };

    return context;
  }
}
