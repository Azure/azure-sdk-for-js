// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {
  EventHubClient, ReceiveHandler, EventPosition, TokenProvider, DefaultDataTransformer,
  EventHubRuntimeInformation, EventHubPartitionRuntimeInformation, ConnectionConfig
} from "azure-event-hubs";
import { PartitionContext } from "./partitionContext";
import { LeaseManager } from "./leaseManager";
import { EventProcessorHostOptions, OnEphError } from "./modelTypes";
import { validateType, Dictionary } from "./util/utils";
import { BlobService } from "./blobService";
import { AzureBlob } from "./azureBlob";
import { AzureStorageCheckpointLeaseManager } from "./azureStorageCheckpointLeaseManager";
import { CheckpointManager } from "./checkpointManager";
import {
  maxLeaseDurationInSeconds, minLeaseDurationInSeconds, defaultLeaseRenewIntervalInSeconds,
  defaultLeaseDurationInSeconds, defaultConsumerGroup, defaultStartupScanDelayInSeconds,
  defaultFastScanIntervalInSeconds, defaultSlowScanIntervalInSeconds,
  defaultCheckpointTimeoutInSeconds
} from './util/constants';

/**
 * @ignore
 */
export interface BaseHostContext {
  hostName: string;
  consumerGroup: string;
  eventHubPath: string;
  leasecontainerName: string;
  eventHubConnectionString: string;
  connectionConfig: ConnectionConfig;
  onEphError: OnEphError;
  leaseRenewInterval: number;
  leaseDuration: number;
  storageConnectionString?: string;
  tokenProvider?: TokenProvider;
  initialOffset?: EventPosition;
  storageBlobPrefix?: string;
  blobService?: BlobService;
  partitionIds: string[];
  contextByPartition: Dictionary<PartitionContext>;
  receiverByPartition: Dictionary<ReceiveHandler>;
  blobReferenceByPartition: Dictionary<AzureBlob>;
  composedBlobPrefix: string;
  startupScanDelay?: number;
  fastScanInterval?: number;
  slowScanInterval?: number;
  checkpointTimeout?: number;
}

/**
 * @ignore
 */
export interface HostContext extends BaseHostContext {
  leaseManager: LeaseManager;
  checkpointManager: CheckpointManager;
  getEventHubClient(): EventHubClient;
  getHubRuntimeInformation(): Promise<EventHubRuntimeInformation>;
  getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation>;
  getPartitionIds(): Promise<string[]>;
}

/**
 * @ignore
 */
export namespace HostContext {

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

  function _eitherStorageConnectionStringOrCheckpointLeaseManager(options: EventProcessorHostOptions): void {
    validateType("options", options, true, "object");
    const checkpointManager = options.checkpointManager;
    const leaseManager = options.leaseManager;
    const storageConnectionString = options.storageConnectionString;
    if (storageConnectionString) {
      if (checkpointManager || leaseManager) {
        throw new Error("Either provide ('checkpointManager' and 'leaseManager') or " +
          "provide 'storageConnectionString'.");
      }
    } else if (!(checkpointManager && leaseManager)) {
      throw new Error("Either provide ('checkpointManager' and 'leaseManager') or " +
        "provide 'storageConnectionString'.");
    }
  }

  function _eitherLeaseManagerOrleaseDurationAndRenewal(options: EventProcessorHostOptions): void {
    validateType("options", options, true, "object");
    const leaseManager = options.leaseManager;
    const leaseDuration = options.leaseDuration;
    const leaseRenewInterval = options.leaseRenewInterval;
    if (leaseManager) {
      if (leaseDuration || leaseRenewInterval) {
        throw new Error("Either provide ('leaseDuration' and 'leaseRenewInterval') or " +
          "provide 'leaseManager'.");
      }
    } else if (!(leaseDuration && leaseRenewInterval)) {
      throw new Error("Either provide ('leaseDuration' and 'leaseRenewInterval') or " +
        "provide 'leaseManager'.");
    }
  }

  function _create(hostName: string, options: EventProcessorHostOptions): BaseHostContext {
    validateType("hostName", hostName, true, "string");
    validateType("options", options, true, "object");
    validateType("options.eventHubPath", options.eventHubPath, true, "string");
    validateType("options.eventHubConnectionString", options.eventHubConnectionString, true, "string");
    validateType("options.storageConnectionString", options.storageConnectionString, false, "string");
    validateType("options.initialOffset", options.initialOffset, false, "object");
    validateType("options.consumerGroup", options.consumerGroup, false, "string");
    validateType("options.leasecontainerName", options.leasecontainerName, false, "string");
    validateType("options.storageBlobPrefix", options.storageBlobPrefix, false, "string");
    validateType("options.onEphError", options.onEphError, false, "function");
    validateType("options.leaseRenewInterval", options.leaseRenewInterval, false, "number");
    validateType("options.leaseDuration", options.leaseDuration, false, "number");
    _eitherStorageConnectionStringOrCheckpointLeaseManager(options);
    _eitherLeaseManagerOrleaseDurationAndRenewal(options);

    const onEphErrorFunc: OnEphError = () => {
      // do nothing
    };

    // set defaults
    if (!options.consumerGroup) options.consumerGroup = defaultConsumerGroup;
    if (!options.leasecontainerName) options.leasecontainerName = hostName;
    if (!options.leaseRenewInterval) options.leaseRenewInterval = defaultLeaseRenewIntervalInSeconds;
    if (!options.leaseDuration) options.leaseDuration = defaultLeaseDurationInSeconds;
    if (!options.onEphError) options.onEphError = onEphErrorFunc;
    if (!options.dataTransformer) options.dataTransformer = new DefaultDataTransformer();
    if (!options.startupScanDelay) options.startupScanDelay = defaultStartupScanDelayInSeconds;
    if (!options.fastScanInterval) options.fastScanInterval = defaultFastScanIntervalInSeconds;
    if (!options.slowScanInterval) options.slowScanInterval = defaultSlowScanIntervalInSeconds;
    if (!options.checkpointTimeout) options.checkpointTimeout = defaultCheckpointTimeoutInSeconds;

    const config = ConnectionConfig.create(options.eventHubConnectionString!, options.eventHubPath);
    const context: BaseHostContext = {
      hostName: hostName,
      eventHubConnectionString: options.eventHubConnectionString!,
      connectionConfig: config,
      eventHubPath: options.eventHubPath!,
      tokenProvider: options.tokenProvider,
      contextByPartition: {},
      receiverByPartition: {},
      blobReferenceByPartition: {},
      partitionIds: [],
      consumerGroup: options.consumerGroup,
      leasecontainerName: options.leasecontainerName,
      leaseRenewInterval: options.leaseRenewInterval,
      leaseDuration: options.leaseDuration,
      initialOffset: options.initialOffset,
      storageBlobPrefix: options.storageBlobPrefix,
      composedBlobPrefix: options.storageBlobPrefix
        ? `${options.storageBlobPrefix.trim()}${options.consumerGroup}/`
        : `${options.consumerGroup}/`,
      onEphError: options.onEphError,
      startupScanDelay: options.startupScanDelay,
      fastScanInterval: options.fastScanInterval,
      slowScanInterval: options.slowScanInterval,
      checkpointTimeout: options.checkpointTimeout
    };

    if (options.storageConnectionString) {
      context.storageConnectionString = options.storageConnectionString;
      context.blobService = BlobService.create(hostName, options.storageConnectionString);
    }

    _validateLeaseDurationAndRenewInterval(context.leaseDuration, context.leaseRenewInterval);
    _validateLeaseContainerName(context.leasecontainerName);
    return context;
  }

  export function create(hostName: string, options: EventProcessorHostOptions): HostContext {
    const ctxt = _create(hostName, options);
    const checkpointLeaseManager = new AzureStorageCheckpointLeaseManager(ctxt);
    (ctxt as HostContext).leaseManager = options.leaseManager || checkpointLeaseManager;
    (ctxt as HostContext).checkpointManager = options.checkpointManager || checkpointLeaseManager;
    (ctxt as HostContext).getEventHubClient = () => {
      if (ctxt.tokenProvider) {
        return EventHubClient.createFromTokenProvider(ctxt.connectionConfig.host,
          ctxt.eventHubPath, ctxt.tokenProvider);
      } else {
        return EventHubClient.createFromConnectionString(ctxt.eventHubConnectionString, ctxt.eventHubPath);
      }
    };
    (ctxt as HostContext).getHubRuntimeInformation = async () => {
      const client = (ctxt as HostContext).getEventHubClient();
      const result = await client.getHubRuntimeInformation();
      client.close().catch(/* do nothing */);
      return result;
    };
    (ctxt as HostContext).getPartitionInformation = async (id: string) => {
      const client = (ctxt as HostContext).getEventHubClient();
      const result = await client.getPartitionInformation(id);
      client.close().catch(/* do nothing */);
      return result;
    };
    (ctxt as HostContext).getPartitionIds = async () => {
      if (!ctxt.partitionIds.length) {
        const client = (ctxt as HostContext).getEventHubClient();
        ctxt.partitionIds = await client.getPartitionIds();
        client.close().catch(/* do nothing */);
      }
      return ctxt.partitionIds;
    };
    return (ctxt as HostContext);
  }
}
