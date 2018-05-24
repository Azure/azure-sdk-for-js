// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import * as rheaPromise from "./rhea-promise";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import { RequestResponseLink, createRequestResponseLink, sendRequest } from "./rpc";
import { defaultLock } from "./util/utils";
import { Message } from ".";
import { ConnectionContext } from "./connectionContext";
import { ClientEntity } from "./clientEntity";
import { translate } from "./errors";

const debug = debugModule("azure:event-hubs:management");

export interface EventHubRuntimeInformation {
  /**
   * @property {string} path - The name of the event hub.
   */
  path: string;
  /**
   * @property {Date} createdAt - The date and time the hub was created in UTC.
   */
  createdAt: Date;
  /**
   * @property {number} partitionCount - The number of partitions in the event hub.
   */
  partitionCount: number;
  /**
   * @property {string[]} partitionIds - The slice of string partition identifiers.
   */
  partitionIds: string[];
  /**
   * @property {string} type - The type of entity.
   */
  type: "com.microsoft:eventhub";
}

export interface EventHubPartitionRuntimeInformation {
  /**
   * @property {string} hubPath - The name of the eventhub.
   */
  hubPath: string;
  /**
   * @property {string} partitionId - Identifier of the partition within the eventhub.
   */
  partitionId: string;
  /**
   * @property {number} beginningSequenceNumber - The starting sequence number of the partition's message log.
   */
  beginningSequenceNumber: number;
  /**
   * @property {number} lastSequenceNumber - The last sequence number of the partition's message log.
   */
  lastSequenceNumber: number;
  /**
   * @property {string} lastEnqueuedOffset - The offset of the last enqueued message in the partition's message log.
   */
  lastEnqueuedOffset: string;
  /**
   * @property {Date} lastEnqueuedTimeUtc - The time of the last enqueued message in the partition's message log in UTC.
   */
  lastEnqueuedTimeUtc: Date;
  /**
   * @property {string} type - The type of entity.
   */
  type: "com.microsoft:partition";
}

export interface ManagementClientOptions {
  address?: string;
  audience?: string;
}

/**
 * @class ManagementClient
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient extends ClientEntity {

  readonly managementLock: string = `${Constants.managementRequestKey}-${uuid()}`;
  /**
   * @property {string} entityPath - The name/path of the entity (hub name) for which the management
   * request needs to be made.
   */
  entityPath: string;
  /**
   * @property {string} replyTo The reply to Guid for the management client.
   */
  replyTo: string = uuid();
  /**
   * $management sender, receiver on the same session.
   * @private
   */
  private _mgmtReqResLink?: RequestResponseLink;

  /**
   * @constructor
   * Instantiates the management client.
   * @param {BaseConnectionContext} context The connection context.
   * @param {string} [address] The address for the management endpoint. For IotHub it will be
   * `/messages/events/$management`.
   */
  constructor(context: ConnectionContext, options?: ManagementClientOptions) {
    super(context, {
      address: options && options.address ? options.address : Constants.management,
      audience: options && options.audience ? options.audience : `${context.config.endpoint}${context.config.entityPath!}/$management`
    });
    this._context = context;
    this.entityPath = context.config.entityPath as string;
  }

  /**
   * Provides the eventhub runtime information.
   * @param {Connection} connection - The established amqp connection
   * @returns {Promise<EventHubRuntimeInformation>}
   */
  async getHubRuntimeInformation(): Promise<EventHubRuntimeInformation> {
    const info: any = await this._makeManagementRequest(Constants.eventHub);
    const runtimeInfo: EventHubRuntimeInformation = {
      path: info.name,
      createdAt: new Date(info.created_at),
      partitionCount: info.partition_count,
      partitionIds: info.partition_ids,
      type: info.type
    };
    debug("[%s] The hub runtime info is: %O", this._context.connectionId, runtimeInfo);
    return runtimeInfo;
  }

  /**
   * Provides an array of partitionIds.
   * @param {Connection} connection - The established amqp connection
   * @returns {Promise<Array<string>>}
   */
  async getPartitionIds(): Promise<Array<string>> {
    const runtimeInfo = await this.getHubRuntimeInformation();
    return runtimeInfo.partitionIds;
  }

  /**
   * Provides information about the specified partition.
   * @param {Connection} connection - The established amqp connection
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   */
  async getPartitionInformation(partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    const info: any = await this._makeManagementRequest(Constants.partition, partitionId);
    const partitionInfo: EventHubPartitionRuntimeInformation = {
      beginningSequenceNumber: info.begin_sequence_number,
      hubPath: info.name,
      lastEnqueuedOffset: info.last_enqueued_offset,
      lastEnqueuedTimeUtc: new Date(info.last_enqueued_time_utc),
      lastSequenceNumber: info.last_enqueued_sequence_number,
      partitionId: info.partition,
      type: info.type
    };
    debug("[%s] The partition info is: %O.", this._context.connectionId, partitionInfo);
    return partitionInfo;
  }

  /**
   * Closes the AMQP management session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @return {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._mgmtReqResLink) {
        await rheaPromise.closeSession(this._mgmtReqResLink.session);
        debug("Successfully closed the management session.");
        this._session = undefined;
        this._mgmtReqResLink = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
      }
    } catch (err) {
      const msg = `An error occurred while closing the management session: ${err}`;
      debug(msg);
      throw new Error(msg);
    }
  }

  private async _init(): Promise<void> {
    if (!this._mgmtReqResLink) {
      await this._negotiateClaim();
      const rxopt: rheaPromise.ReceiverOptions = {
        source: { address: this.address },
        name: this.replyTo,
        target: { address: this.replyTo }
      };
      const sropt: rheaPromise.SenderOptions = { target: { address: this.address } };
      debug("Creating a session for $management endpoint");
      this._mgmtReqResLink = await createRequestResponseLink(this._context.connection, sropt, rxopt);
      this._session = this._mgmtReqResLink.session;
      debug("[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
        this._context.connectionId, this._mgmtReqResLink.sender.name, this._mgmtReqResLink.receiver.name);
      await this._ensureTokenRenewal();
    }
  }

  /**
   * @private
   * Helper method to make the management request
   * @param {Connection} connection - The established amqp connection
   * @param {string} type - The type of entity requested for. Valid values are "eventhub", "partition"
   * @param {string | number} [partitionId] - The partitionId. Required only when type is "partition".
   */
  private async _makeManagementRequest(type: "eventhub" | "partition", partitionId?: string | number): Promise<any> {
    if (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    try {
      const request: Message = {
        body: Buffer.from(JSON.stringify([])),
        message_id: uuid(),
        reply_to: this.replyTo,
        application_properties: {
          operation: Constants.readOperation,
          name: this.entityPath as string,
          type: `${Constants.vendorString}:${type}`
        }
      };
      if (partitionId && type === Constants.partition) {
        request.application_properties!.partition = partitionId;
      }
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });
      return sendRequest(this._context.connection, this._mgmtReqResLink!, request);
    } catch (err) {
      err = translate(err);
      debug("An error occurred while making the request to $management endpoint: %O", err);
      throw err;
    }
  }
}
