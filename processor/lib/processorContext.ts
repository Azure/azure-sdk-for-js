// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventHubClient, ReceiveHandler, EventPosition } from "azure-event-hubs";
import { PartitionContext } from "./partitionContext";
import { LeaseManager } from "./leaseManager";
import { EventProcessorOptions, OnEphError } from "./eventProcessorHost";
import { validateType, Dictionary } from "./util/utils";
import { BlobService } from "./blobService";
import { AzureBlob } from "./azureBlob";
import { AzureStorageCheckpointLeaseManager, LeaseManagerOptions } from "./azureStorageCheckpointLeaseManager";
import { CheckpointManager } from "./checkpointManager";
import { maxLeaseDurationInSeconds, minLeaseDurationInSeconds } from './util/constants';

/**
 * @ignore
 */
export interface BaseProcessorContext {
  hostName: string;
  consumerGroup: string;
  storageConnectionString: string;
  eventHubClient: EventHubClient;
  leasecontainerName: string;
  contextByPartition: Dictionary<PartitionContext>;
  receiverByPartition: Dictionary<ReceiveHandler>;
  blobReferenceByPartition: Dictionary<AzureBlob>;
  composedBlobPrefix: string;
  blobService: BlobService;
  onEphError: OnEphError;
  leaseRenewInterval: number;
  leaseDuration: number;
  initialOffset?: EventPosition;
  storageBlobPrefix?: string;
}

/**
 * @ignore
 */
export interface ProcessorContext extends BaseProcessorContext {
  leaseManager: LeaseManager;
  checkpointManager: CheckpointManager;
}

/**
 * @ignore
 */
export namespace ProcessorContext {

  function _validateLeaseDurationAndRenewInterval(duration: number, interval: number): void {
    validateType("leaseDuration", duration, true, "number");
    validateType("leaseRenewInterval", interval, true, "number");

    if (duration <= interval) {
      throw new Error(`Lease duration ${duration} needs to be greater than lease ` +
        `renew interval ${interval}.`);
    }

    if (duration > maxLeaseDurationInSeconds || duration < minLeaseDurationInSeconds) {
      throw new Error(`Lease duration needs to be between ${minLeaseDurationInSeconds} ` +
        `seconds and ${maxLeaseDurationInSeconds} seconds. The given value is: ${duration} seconds.`);
    }
  }

  function _validateLeaseContainerName(name: string): void {
    if (!name || name.match(/^[a-z0-9](([a-z0-9\-[^\-])){1,61}[a-z0-9]$/ig) === null) {
      throw new Error(`Azure Storage lease container name "${name}" is invalid. Please check ` +
        `naming conventions at https://msdn.microsoft.com/en-us/library/azure/dd135715.aspx`);
    }
  }

  function _create(hostName: string, storageConnectionString: string,
    eventHubClient: EventHubClient, options?: EventProcessorOptions): BaseProcessorContext {
    if (!options) options = {};
    validateType("hostName", hostName, true, "string");
    validateType("storageConnectionString", storageConnectionString, true, "string");
    validateType("eventHubClient", eventHubClient, true, "object");
    validateType("options", options, true, "object");
    validateType("options.consumerGroup", options.consumerGroup, false, "string");
    validateType("options.leasecontainerName", options.leasecontainerName, false, "string");
    validateType("options.initialOffset", options.initialOffset, false, "object");
    validateType("options.storageBlobPrefix", options.storageBlobPrefix, false, "string");
    validateType("options.onEphError", options.onEphError, false, "function");
    validateType("options.leaseRenewInterval", options.leaseRenewInterval, false, "number");
    validateType("options.leaseDuration", options.leaseDuration, false, "number");

    const onEphErrorFunc: OnEphError = () => {
      // do nothing
    };
    const context: BaseProcessorContext = {
      hostName: hostName,
      storageConnectionString: storageConnectionString,
      eventHubClient: eventHubClient,
      blobService: BlobService.create(hostName, storageConnectionString),
      contextByPartition: {},
      receiverByPartition: {},
      blobReferenceByPartition: {},
      consumerGroup: options.consumerGroup || "$default",
      leasecontainerName: options.leasecontainerName || hostName,
      leaseRenewInterval: options.leaseRenewInterval || 10,
      leaseDuration: options.leaseDuration || 30,
      initialOffset: options.initialOffset,
      storageBlobPrefix: options.storageBlobPrefix,
      composedBlobPrefix: options.storageBlobPrefix
        ? `${options.storageBlobPrefix.trim()}${options.consumerGroup}/`
        : `${options.consumerGroup}/`,
      onEphError: options.onEphError || onEphErrorFunc
    };
    _validateLeaseDurationAndRenewInterval(context.leaseDuration, context.leaseRenewInterval);
    _validateLeaseContainerName(context.leasecontainerName);
    return context;
  }

  export function create(hostName: string, storageConnectionString: string,
    eventHubClient: EventHubClient, options?: EventProcessorOptions): ProcessorContext {
    if (!options) options = {};
    validateType("options.leaseManager", options.leaseManager, false, "object");
    validateType("options.checkpointManager", options.checkpointManager, false, "object");

    const ctxt = _create(hostName, storageConnectionString, eventHubClient, options);
    const lmo: LeaseManagerOptions = {
      leaseDuration: ctxt.leaseDuration,
      leaseRenewInterval: ctxt.leaseRenewInterval
    };
    const checkpointLeaseManager = new AzureStorageCheckpointLeaseManager(ctxt, lmo);
    (ctxt as ProcessorContext).leaseManager = options.leaseManager || checkpointLeaseManager;
    (ctxt as ProcessorContext).checkpointManager = options.checkpointManager || checkpointLeaseManager;

    return (ctxt as ProcessorContext);
  }
}
