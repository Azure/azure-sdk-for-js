// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PartitionContext } from "./partitionContext";
import {
  EventData, MessagingError, EventPosition, TokenProvider, ClientOptionsBase
} from "azure-event-hubs";
import { CheckpointManager } from "./checkpointManager";
import { LeaseManager } from "./leaseManager";

/**
 * @ignore
 */
export enum CloseReason {
  leaseLost = "LeaseLost",
  shutdown = "ShutDown"
}

/**
 * Provides information about internal errors that occur while managing partitions or leases for
 * the partitions.
 * @interface EPHDiagnosticInfo
 */
export interface EPHDiagnosticInfo {
  /**
   * @property {string} hostName The name of the host that experienced the error. Allows
   * distinguishing the error source if multiple hosts in a single process.
   */
  hostName: string;
  /**
   * @property {string} partitionId The partitionId that experienced the error. Allows
   * distinguishing the error source if multiple hosts in a single process.
   */
  partitionId: string;
  /**
   * @property {string} action A short string that indicates what general activity threw the
   * error.
   */
  action: string;
  /**
   * @property {any} error The error that was thrown.
   */
  error: any;
}

/**
 * Describes the error handler signature to receive notifcation for general errors.
 *
 * Errors which occur while processing events from a particular EventHub partition are delivered
 * to the `onError` handler provided in the `start()` method. This handler is called on
 * occasions when an error occurs while managing partitions or leases for the partitions.
 * @function
 */
export type OnEphError = (error: EPHDiagnosticInfo) => void;

/**
 * Describes the message handler signature for messages received from an EventHub.
 * @function
 */
export type OnReceivedMessage = (context: PartitionContext, eventData: EventData) => void;

/**
 * Describes the message handler signature for errors that occur while receiving messages from an
 * EventHub.
 * @function
 */
export type OnReceivedError = (error: MessagingError | Error) => void;

/**
 * Describes the optional parameters that can be provided for creating an EventProcessorHost while
 * creating from the given token provider
 * @interface FromTokenProviderOptions
 */
export interface FromTokenProviderOptions extends ClientOptionsBase {
  /**
   * @property {EventPosition} initialOffset This is only used when then receiver is being created
   * for the very first time and there is no checkpoint data in the blob. For this option to be
   * effective please make sure to provide a new hostName that was not used previously.
   */
  initialOffset?: EventPosition;
  /**
   * @property {string} [consumerGroup] The name of the consumer group within the Event Hub. Default
   * value: **`"$default"`**.
   */
  consumerGroup?: string;
  /**
   * @property {string} [leasecontainerName] Azure Storage container name for use by built-in
   * lease and checkpoint manager.
   */
  leasecontainerName?: string;
  /**
   * @property {string} [storageBlobPrefix] Prefix used when naming blobs within the storage
   * container.
   */
  storageBlobPrefix?: string;
  /**
   * @property {OnEphError} [onEphError] Error handler that can be provided to receive notifcation
   * for general errors.
   *
   * Errors which occur while processing events from a particular EventHub partition are delivered
   * to the `onError` handler provided in the `start()` method. This handler is called on
   * occasions when an error occurs while managing partitions or leases for the partitions.
   */
  onEphError?: OnEphError;
  /**
   * @property {number} [leaseRenewInterval] The sleep interval **`in seconds`** between scans.
   * Default: **`10` seconds**.
   *
   * Allows a lease manager implementation to specify to PartitionManager how often it should
   * scan leases and renew them. In order to redistribute leases in a timely fashion after a host
   * ceases operating, we recommend a relatively short interval, such as ten seconds. Obviously it
   * should be less than half of the lease length, to prevent accidental expiration.
   */
  leaseRenewInterval?: number;
  /**
   * @property {number} [leaseDuration] Duration of a lease **`in seconds`** before it expires
   * unless renewed. Default: **`30` seconds**, Min Value: **`15` seconds**,
   * Max value: **`60` seconds**.
   */
  leaseDuration?: number;
  /**
   * @property {number} [checkpointTimeout] The timeout for checkpoint operations **`in seconds`**.
   * Default: **`120` seconds**.
   */
  checkpointTimeout?: number;
  /**
   * @property {number} [startupScanDelay] The delay time **`in seconds`** between the first scan
   * for available partitions and the second. This is part of a startup optimization which allows
   * individual hosts to become visible to other hosts, and thereby get a more accurate count
   * of the number of hosts in the system, before they try to estimate how many partitions they
   * should own. Default: **`30` seconds**.
   */
  startupScanDelay?: number;
  /**
   * @property {number} [fastScanInterval] There are two possible interval times between scans for
   * available partitions, fast and slow. The fast (short) interval **`in seconds`** is used after
   * a scan in which lease stealing has occurred, to promote quicker rebalancing.
   * Default: **`3` seconds**.
   */
  fastScanInterval?: number;
  /**
   * @property {number} [slowScanInterval] The slow (long) interval **`in seconds`** is used
   * after a scan in which lease stealing did not occur, to reduce unnecessary scanning when
   * the system is in steady state. Default: **`5` seconds**.
   */
  slowScanInterval?: number;
}

/**
 * Describes the optional parameters that can be provided for creating an EventProcessorHost while
 * creating from the eventhub connection string.
 * @interface FromConnectionStringOptions
 */
export interface FromConnectionStringOptions extends FromTokenProviderOptions {
  /**
   * @property {string} [eventHubPath] The name of the EventHub. This is optional if the
   * EventHub connection string contains ENTITY_PATH=hub-name else an Error will be thrown.
   */
  eventHubPath?: string;
}

/**
 * Describes the optional parameters that can be provided for creating an EventProcessorHost.
 * @interface EventProcessorHostOptions
 */
export interface EventProcessorHostOptions extends FromConnectionStringOptions {
  /**
   * @property {string} [eventHubConnectionString] Connection string for the Event Hub to receive
   * from. Example: "Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;
   * SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key".
   */
  eventHubConnectionString?: string;
  /**
   * @property {string} [storageConnectionString] Connection string to Azure Storage account used
   * for leases and checkpointing. Example "DefaultEndpointsProtocol=https;AccountName=<account-name>;
   * AccountKey=<account-key>;EndpointSuffix=core.windows.net"
   */
  storageConnectionString?: string;
  /**
   * @property {CheckpointManager} [checkpointManager] A manager to manage checkpoints.
   * Default: **`AzureStorageCheckpointLeaseManager`**.
   */
  checkpointManager?: CheckpointManager;
  /**
   * @property {LeaseManager} [LeaseManager] A manager to manage leases. Default:
   * **`AzureStorageCheckpointLeaseManager`**.
   */
  leaseManager?: LeaseManager;
  /**
   * @property {TokenProvider} [tokenProvider] An instance of the token provider interface that
   * provides the token for authentication. Default value: **`SasTokenProvider`**.
   */
  tokenProvider?: TokenProvider;
}
