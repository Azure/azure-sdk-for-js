// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { RequestResponseLink, defaultLock, translate, Constants, SendRequestOptions } from "@azure/core-amqp";
import { Message, EventContext, SenderEvents, ReceiverEvents, SenderOptions, ReceiverOptions } from "rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import * as log from "./log";
import { RetryOptions } from "./eventHubClient";
import { AbortSignalLike } from "@azure/abort-controller";
/**
 * Describes the runtime information of an Event Hub.
 * @interface HubRuntimeInformation
 */
export interface EventHubProperties {
  /**
   * @property The name of the event hub.
   */
  path: string;
  /**
   * @property The date and time the hub was created in UTC.
   */
  createdAt: Date;
  /**
   * @property The slice of string partition identifiers.
   */
  partitionIds: string[];
}

/**
 * Describes the runtime information of an EventHub Partition.
 * @interface PartitionProperties
 */
export interface PartitionProperties {
  /**
   * @property The name of the Event Hub.
   */
  eventHubPath: string;
  /**
   * @property Identifier of the partition within the Event Hub.
   */
  partitionId: string;
  /**
   * @property The starting sequence number of the partition's message log.
   */
  beginningSequenceNumber: number;
  /**
   * @property The last sequence number of the partition's message log.
   */
  lastEnqueuedSequenceNumber: number;
  /**
   * @property The offset of the last enqueued message in the partition's message log.
   */
  lastEnqueuedOffset: string;
  /**
   * @property The time of the last enqueued message in the partition's message log in UTC.
   */
  lastEnqueuedTimeUtc: Date;
}

/**
 * @internal
 * @ignore
 */
export interface ManagementClientOptions {
  address?: string;
  audience?: string;
}

/**
 * @class ManagementClient
 * @internal
 * @ignore
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient extends LinkEntity {
  readonly managementLock: string = `${Constants.managementRequestKey}-${uuid()}`;
  /**
   * @property entityPath - The name/path of the entity (hub name) for which the management
   * request needs to be made.
   */
  entityPath: string;
  /**
   * @property replyTo The reply to Guid for the management client.
   */
  replyTo: string = uuid();
  /**
   * $management sender, receiver on the same session.
   * @private
   */
  private _mgmtReqResLink?: RequestResponseLink;

  /**
   * Instantiates the management client.
   * @constructor
   * @ignore
   * @param context The connection context.
   * @param [address] The address for the management endpoint. For IotHub it will be
   * `/messages/events/$management`.
   */
  constructor(context: ConnectionContext, options?: ManagementClientOptions) {
    super(context, {
      address: options && options.address ? options.address : Constants.management,
      audience: options && options.audience ? options.audience : context.config.getManagementAudience()
    });
    this._context = context;
    this.entityPath = context.config.entityPath as string;
  }

  /**
   * Provides the eventhub runtime information.
   * @ignore
   * @param connection - The established amqp connection
   * @returns
   */
  async getHubRuntimeInformation(options?: {
    retryOptions?: RetryOptions;
    abortSignal?: AbortSignalLike;
  }): Promise<EventHubProperties> {
    if (!options) {
      options = {};
    }
    const request: Message = {
      body: Buffer.from(JSON.stringify([])),
      message_id: uuid(),
      reply_to: this.replyTo,
      application_properties: {
        operation: Constants.readOperation,
        name: this.entityPath as string,
        type: `${Constants.vendorString}:${Constants.eventHub}`
      }
    };

    const info: any = await this._makeManagementRequest(request, {
      ...options,
      requestName: "getHubRuntimeInformation"
    });
    const runtimeInfo: EventHubProperties = {
      path: info.name,
      createdAt: new Date(info.created_at),
      partitionIds: info.partition_ids
    };
    log.mgmt("[%s] The hub runtime info is: %O", this._context.connectionId, runtimeInfo);
    return runtimeInfo;
  }

  /**
   * Provides an array of partitionIds.
   * @ignore
   * @param connection - The established amqp connection
   * @returns
   */
  async getPartitionIds(): Promise<Array<string>> {
    const runtimeInfo = await this.getHubRuntimeInformation();
    return runtimeInfo.partitionIds;
  }

  /**
   * Provides information about the specified partition.
   * @ignore
   * @param connection - The established amqp connection
   * @param partitionId Partition ID for which partition information is required.
   */
  async getPartitionProperties(
    partitionId: string,
    options?: { retryOptions?: RetryOptions; abortSignal?: AbortSignalLike }
  ): Promise<PartitionProperties> {
    if (!options) {
      options = {};
    }
    const request: Message = {
      body: Buffer.from(JSON.stringify([])),
      message_id: uuid(),
      reply_to: this.replyTo,
      application_properties: {
        operation: Constants.readOperation,
        name: this.entityPath as string,
        type: `${Constants.vendorString}:${Constants.partition}`,
        partition: `${partitionId}`
      }
    };

    const info: any = await this._makeManagementRequest(request, {
      ...options,
      requestName: "getPartitionInformation"
    });
    const partitionInfo: PartitionProperties = {
      beginningSequenceNumber: info.begin_sequence_number,
      eventHubPath: info.name,
      lastEnqueuedOffset: info.last_enqueued_offset,
      lastEnqueuedTimeUtc: new Date(info.last_enqueued_time_utc),
      lastEnqueuedSequenceNumber: info.last_enqueued_sequence_number,
      partitionId: info.partition
    };
    log.mgmt("[%s] The partition info is: %O.", this._context.connectionId, partitionInfo);
    return partitionInfo;
  }

  /**
   * Closes the AMQP management session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @ignore
   * @returns
   */
  async close(): Promise<void> {
    try {
      if (this._isMgmtRequestResponseLinkOpen()) {
        const mgmtLink = this._mgmtReqResLink;
        this._mgmtReqResLink = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        await mgmtLink!.close();
        log.mgmt("Successfully closed the management session.");
      }
    } catch (err) {
      const msg = `An error occurred while closing the management session: ${err}`;
      log.error(msg);
      throw new Error(msg);
    }
  }

  private async _init(): Promise<void> {
    try {
      if (!this._isMgmtRequestResponseLinkOpen()) {
        await this._negotiateClaim();
        const rxopt: ReceiverOptions = {
          source: { address: this.address },
          name: this.replyTo,
          target: { address: this.replyTo },
          onSessionError: (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.session!.error!);
            log.error(
              "[%s] An error occurred on the session for request/response links for " + "$management: %O",
              id,
              ehError
            );
          }
        };
        const sropt: SenderOptions = { target: { address: this.address } };
        log.mgmt(
          "[%s] Creating sender/receiver links on a session for $management endpoint with " +
            "srOpts: %o, receiverOpts: %O.",
          this._context.connectionId,
          sropt,
          rxopt
        );
        this._mgmtReqResLink = await RequestResponseLink.create(this._context.connection, sropt, rxopt);
        this._mgmtReqResLink.sender.on(SenderEvents.senderError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.sender!.error!);
          log.error("[%s] An error occurred on the $management sender link.. %O", id, ehError);
        });
        this._mgmtReqResLink.receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.receiver!.error!);
          log.error("[%s] An error occurred on the $management receiver link.. %O", id, ehError);
        });
        log.mgmt(
          "[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
          this._context.connectionId,
          this._mgmtReqResLink.sender.name,
          this._mgmtReqResLink.receiver.name
        );
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      log.error("[%s] An error occured while establishing the $management links: %O", this._context.connectionId, err);
      throw err;
    }
  }

  /**
   * @private
   * Helper method to make the management request
   * @param request The AMQP message to send
   * @param options The options to use when sending a request over a $management link
   */
  private async _makeManagementRequest(
    request: Message,
    options?: { retryOptions?: RetryOptions; timeout?: number; abortSignal?: AbortSignalLike; requestName?: string }
  ): Promise<any> {
    try {
      log.mgmt("[%s] Acquiring lock to get the management req res link.", this._context.connectionId);
      await defaultLock.acquire(this.managementLock, () => {
        return this._init();
      });

      if (!options) {
        options = {};
      }

      const sendRequestOptions: SendRequestOptions = {
        times: options.retryOptions && options.retryOptions.retryCount,
        abortSignal: options.abortSignal,
        requestName: options.requestName,
        delayInSeconds:
          options.retryOptions && options.retryOptions.retryInterval
            ? options.retryOptions.retryInterval / 1000
            : undefined
      };
      return (await this._mgmtReqResLink!.sendRequest(request, sendRequestOptions)).body;
    } catch (err) {
      err = translate(err);
      log.error("An error occurred while making the request to $management endpoint: %O", err);
      throw err;
    }
  }

  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }
}
