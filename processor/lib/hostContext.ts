// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {
  EventHubClient, EventPosition, TokenProvider, DefaultDataTransformer,
  EventHubRuntimeInformation, EventHubPartitionRuntimeInformation, ConnectionConfig
} from "@azure/event-hubs";
import { LeaseManager } from "./leaseManager";
import { PumpManager } from "./pumpManager";
import { PartitionManager } from "./partitionManager";
import { PartitionScanner } from "./partitionScanner";
import { BlobService } from "./blobService";
import { AzureBlob } from "./azureBlob";
import { AzureStorageCheckpointLeaseManager } from "./azureStorageCheckpointLeaseManager";
import { CheckpointManager } from "./checkpointManager";
import { validateType, Dictionary } from "./util/utils";
import { PartitionContext } from "./partitionContext";
import { BaseLease } from "./baseLease";
import { PartitionPump } from "./partitionPump";
import {
  EventProcessorHostOptions, OnEphError, OnReceivedMessage, OnReceivedError
} from "./modelTypes";
import {
  maxLeaseDurationInSeconds, minLeaseDurationInSeconds, defaultLeaseRenewIntervalInSeconds,
  defaultLeaseDurationInSeconds, defaultConsumerGroup, defaultStartupScanDelayInSeconds,
  defaultFastScanIntervalInSeconds, defaultSlowScanIntervalInSeconds, packageInfo, userAgentPrefix,
} from "./util/constants";

/**
 * @ignore
 */
export interface BaseHostContext {
  hostName: string;
  consumerGroup: string;
  eventHubPath: string;
  storageContainerName?: string;
  eventHubConnectionString: string;
  connectionConfig: ConnectionConfig;
  onEphError: OnEphError;
  leaseRenewInterval: number;
  leaseDuration: number;
  partitionIds: string[];
  blobReferenceByPartition: Dictionary<AzureBlob>;
  storageConnectionString?: string;
  tokenProvider?: TokenProvider;
  initialOffset?: EventPosition;
  storageBlobPrefix?: string;
  blobService?: BlobService;
  composedBlobPrefix: string;
  onMessage?: OnReceivedMessage;
  onError?: OnReceivedError;
  startupScanDelay?: number;
  fastScanInterval?: number;
  slowScanInterval?: number;
  pumps: Map<string, PartitionPump>;
  userAgent: string;
  withHost(msg: string): string;
  withHostAndPartition(partition: string | { partitionId: string }, msg: string): string;
}

/**
 * @ignore
 */
export interface HostContextWithCheckpointLeaseManager extends BaseHostContext {
  leaseManager: LeaseManager;
  checkpointManager: CheckpointManager;
  getEventHubClient(): EventHubClient;
  getHubRuntimeInformation(): Promise<EventHubRuntimeInformation>;
  getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation>;
  getPartitionIds(): Promise<string[]>;
}

export interface HostContextWithPumpManager extends HostContextWithCheckpointLeaseManager {
  pumpManager: PumpManager;
}

export interface HostContext extends HostContextWithPumpManager {
  partitionManager: PartitionManager;
  partitionScanner: PartitionScanner;
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

  function _validatestorageContainerName(name: string): void {
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

  function _createBase(hostName: string, options: EventProcessorHostOptions): BaseHostContext {
    validateType("hostName", hostName, true, "string");

    const onEphErrorFunc: OnEphError = () => {
      // do nothing
    };
    const config = ConnectionConfig.create(options.eventHubConnectionString!, options.eventHubPath);

    // set defaults
    if (!options.consumerGroup) options.consumerGroup = defaultConsumerGroup;
    if (!options.eventHubPath) options.eventHubPath = config.entityPath;
    if (!options.leaseRenewInterval) options.leaseRenewInterval = defaultLeaseRenewIntervalInSeconds;
    if (!options.leaseDuration) options.leaseDuration = defaultLeaseDurationInSeconds;
    if (!options.onEphError) options.onEphError = onEphErrorFunc;
    if (!options.dataTransformer) options.dataTransformer = new DefaultDataTransformer();
    if (!options.startupScanDelay) options.startupScanDelay = defaultStartupScanDelayInSeconds;
    if (!options.fastScanInterval) options.fastScanInterval = defaultFastScanIntervalInSeconds;
    if (!options.slowScanInterval) options.slowScanInterval = defaultSlowScanIntervalInSeconds;

    validateType("options", options, true, "object");
    validateType("options.eventHubPath", options.eventHubPath, true, "string");
    validateType("options.eventHubConnectionString", options.eventHubConnectionString, true, "string");
    validateType("options.storageConnectionString", options.storageConnectionString, false, "string");
    validateType("options.initialOffset", options.initialOffset, false, "object");
    validateType("options.consumerGroup", options.consumerGroup, false, "string");
    validateType("options.storageContainerName", options.storageContainerName, false, "string");
    validateType("options.storageBlobPrefix", options.storageBlobPrefix, false, "string");
    validateType("options.onEphError", options.onEphError, false, "function");
    validateType("options.leaseRenewInterval", options.leaseRenewInterval, false, "number");
    validateType("options.leaseDuration", options.leaseDuration, false, "number");
    _eitherStorageConnectionStringOrCheckpointLeaseManager(options);
    _eitherLeaseManagerOrleaseDurationAndRenewal(options);


    const context: BaseHostContext = {
      hostName: hostName,
      eventHubConnectionString: options.eventHubConnectionString!,
      connectionConfig: config,
      eventHubPath: options.eventHubPath!,
      tokenProvider: options.tokenProvider,
      blobReferenceByPartition: {},
      partitionIds: [],
      pumps: new Map<string, PartitionPump>(),
      consumerGroup: options.consumerGroup,
      storageContainerName: options.storageContainerName,
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
      userAgent: getUserAgent(options),
      withHost: (msg: string) => {
        return `[${hostName}] ${msg}`;
      },
      withHostAndPartition: (partition: string | PartitionContext | BaseLease, msg: string) => {
        let id: string = "N/A";
        if (typeof partition === "string") {
          id = partition;
        } else if (typeof partition === "object") {
          id = partition.partitionId;
        }
        return `[${hostName}] [${id}] ${msg}`;
      }
    };

    if (options.storageConnectionString) {
      context.storageConnectionString = options.storageConnectionString;
      context.blobService = BlobService.create(hostName, options.storageConnectionString);
    }

    _validateLeaseDurationAndRenewInterval(context.leaseDuration, context.leaseRenewInterval);
    if (context.storageContainerName) _validatestorageContainerName(context.storageContainerName);
    return context;
  }

  function _createWithCheckpointLeaseManager(hostName: string,
    options: EventProcessorHostOptions): HostContextWithCheckpointLeaseManager {
    const ctxt = _createBase(hostName, options) as HostContextWithCheckpointLeaseManager;
    const checkpointLeaseManager = new AzureStorageCheckpointLeaseManager(ctxt);
    ctxt.leaseManager = options.leaseManager || checkpointLeaseManager;
    ctxt.checkpointManager = options.checkpointManager || checkpointLeaseManager;
    ctxt.getEventHubClient = () => {
      if (ctxt.tokenProvider) {
        return EventHubClient.createFromTokenProvider(ctxt.connectionConfig.host,
          ctxt.eventHubPath, ctxt.tokenProvider, { userAgent: ctxt.userAgent });
      } else {
        return EventHubClient.createFromConnectionString(
          ctxt.eventHubConnectionString, ctxt.eventHubPath, { userAgent: ctxt.userAgent });
      }
    };
    ctxt.getHubRuntimeInformation = async () => {
      const client = ctxt.getEventHubClient();
      const result = await client.getHubRuntimeInformation();
      client.close().catch(/* do nothing */);
      return result;
    };
    ctxt.getPartitionInformation = async (id: string | number) => {
      const client = ctxt.getEventHubClient();
      const result = await client.getPartitionInformation(id);
      client.close().catch(/* do nothing */);
      return result;
    };
    ctxt.getPartitionIds = async () => {
      if (!ctxt.partitionIds.length) {
        const client = ctxt.getEventHubClient();
        ctxt.partitionIds = await client.getPartitionIds();
        client.close().catch(/* do nothing */);
      }
      return ctxt.partitionIds;
    };
    return ctxt;
  }

  function _createWithPumpManager(hostName: string, options: EventProcessorHostOptions): HostContextWithPumpManager {
    const context = _createWithCheckpointLeaseManager(hostName, options) as HostContextWithPumpManager;
    context.pumpManager = new PumpManager(context);
    return context;
  }

  /**
   * @ignore
   */
  export function getUserAgent(options: EventProcessorHostOptions): string {
    const userAgentForEPH = `${userAgentPrefix}=${packageInfo.version}`;
    const finalUserAgent = options.userAgent ? `${userAgentForEPH},${options.userAgent}` : userAgentForEPH;
    return finalUserAgent;
  }

  /**
   * @ignore
   */
  export function create(hostName: string, options: EventProcessorHostOptions): HostContext {
    const context = _createWithPumpManager(hostName, options);
    const hostContext = context as HostContext;
    hostContext.partitionManager = new PartitionManager(context);
    hostContext.partitionScanner = new PartitionScanner(context);
    return hostContext;
  }
}
