// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import * as rheaPromise from "./rhea-promise";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import { RequestResponseLink, createRequestResponseLink, sendRequest } from "./rpc";
import { defaultLock } from "./util/utils";

const Buffer = require("buffer/").Buffer;
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

/**
 * @class ManagementClient
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient {

  readonly managementLock: string = `${Constants.managementRequestKey}-${uuid()}`;
  /**
   * $management sender, receiver on the same session.
   */
  private _mgmtReqResLink?: RequestResponseLink;

  /**
   * @constructor
   * Instantiates the management client.
   * @param entityPath - The name/path of the entity (hub name) for which the management request needs to be made.
   */
  constructor(public entityPath: string) {
    this.entityPath = entityPath;
  }

  /**
   * Provides the eventhub runtime information.
   * @method getHubRuntimeInformation
   * @param {Connection} connection - The established amqp connection
   * @returns {Promise<EventHubRuntimeInformation>}
   */
  async getHubRuntimeInformation(connection: any): Promise<EventHubRuntimeInformation> {
    const info: any = await this._makeManagementRequest(connection, Constants.eventHub);
    const runtimeInfo: EventHubRuntimeInformation = {
      path: info.name,
      createdAt: new Date(info.created_at),
      partitionCount: info.partition_count,
      partitionIds: info.partition_ids,
      type: info.type
    };
    debug(`[%s] The hub runtime info is.`, connection.options.id, runtimeInfo);
    return runtimeInfo;
  }

  /**
   * Provides an array of partitionIds.
   * @method getPartitionIds
   * @param {Connection} connection - The established amqp connection
   * @returns {Promise<Array<string>>}
   */
  async getPartitionIds(connection: any): Promise<Array<string>> {
    const runtimeInfo = await this.getHubRuntimeInformation(connection);
    return runtimeInfo.partitionIds;
  }

  /**
   * Provides information about the specified partition.
   * @method getPartitionInformation
   * @param {Connection} connection - The established amqp connection
   * @param {(string|number)} partitionId Partition ID for which partition information is required.
   */
  async getPartitionInformation(connection: any, partitionId: string | number): Promise<EventHubPartitionRuntimeInformation> {
    if (!partitionId || (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number")) {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    const info: any = await this._makeManagementRequest(connection, Constants.partition, partitionId);
    const partitionInfo: EventHubPartitionRuntimeInformation = {
      beginningSequenceNumber: info.begin_sequence_number,
      hubPath: info.name,
      lastEnqueuedOffset: info.last_enqueued_offset,
      lastEnqueuedTimeUtc: new Date(info.last_enqueued_time_utc),
      lastSequenceNumber: info.last_enqueued_sequence_number,
      partitionId: info.partition,
      type: info.type
    };
    debug(`[%s] The partition info is: ${partitionInfo}.`, connection.options.id);
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
        this._mgmtReqResLink = undefined;
      }
    } catch (err) {
      const msg = `An error occurred while closing the management session: ${err}`;
      debug(msg);
      throw new Error(msg);
    }
  }

  private async _init(connection: any, endpoint: string, replyTo: string): Promise<void> {
    if (!this._mgmtReqResLink) {
      const rxopt: rheaPromise.ReceiverOptions = { source: { address: endpoint }, name: replyTo, target: { address: replyTo } };
      debug("Creating a session for $management endpoint");
      this._mgmtReqResLink = await createRequestResponseLink(connection, { target: { address: endpoint } }, rxopt);
      debug(`[${connection.options.id}] Created sender "${this._mgmtReqResLink.sender.name}" and receiver "${this._mgmtReqResLink.receiver.name}" links for $management endpoint.`);
    }
  }

  /**
   * @private
   * Helper method to make the management request
   * @param {Connection} connection - The established amqp connection
   * @param {string} type - The type of entity requested for. Valid values are "eventhub", "partition"
   * @param {string | number} [partitionId] - The partitionId. Required only when type is "partition".
   */
  private async _makeManagementRequest(connection: any, type: "eventhub" | "partition", partitionId?: string | number): Promise<any> {
    if (partitionId && typeof partitionId !== "string" && typeof partitionId !== "number") {
      throw new Error("'partitionId' is a required parameter and must be of type: 'string' | 'number'.");
    }
    try {
      const endpoint = Constants.management;
      const replyTo = uuid();
      const request: any = {
        body: Buffer.from(JSON.stringify([])),
        properties: {
          message_id: uuid(),
          reply_to: replyTo
        },
        application_properties: {
          operation: Constants.readOperation,
          name: this.entityPath as string,
          type: `${Constants.vendorString}:${type}`
        }
      };
      if (partitionId && type === Constants.partition) {
        request.application_properties.partition = partitionId;
      }
      await defaultLock.acquire(this.managementLock, () => { return this._init(connection, endpoint, replyTo); });
      return sendRequest(connection, this._mgmtReqResLink!, request);
    } catch (err) {
      debug(`An error occurred while making the request to $management endpoint: \n`, err);
      throw err;
    }
  }
}
