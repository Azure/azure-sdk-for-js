// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import * as rheaPromise from "./rhea-promise";
import * as Constants from "./util/constants";
import * as debugModule from "debug";
import { RequestResponseLink, createRequestResponseLink, sendRequest, open } from "./rpc";
import { defaultLock } from "./util/utils";
import { AmqpMessage } from ".";
import { ConnectionContext } from "./connectionContext";

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
export class ManagementClient {

  readonly managementLock: string = `${Constants.managementRequestKey}-${uuid()}`;
  /**
   * @property {string} entityPath - The name/path of the entity (hub name) for which the management
   * request needs to be made.
   */
  entityPath: string;
  /**
   * @property {string} address The Management client address: `"$management"`.
   */
  address: string;
  /**
   * @property {string} replyTo The reply to Guid for the management client.
   */
  replyTo: string = uuid();
  /**
   * @property {string} audience The Management client token audience in the following format:
   * - "sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"
   * @private
   */
  audience: string;
  /**
   * $management sender, receiver on the same session.
   * @private
   */
  private _mgmtReqResLink?: RequestResponseLink;
  /**
   * @property {BaseConnectionContext} _context Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   * @private
   */
  private _context: ConnectionContext;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when the EventHub Sender is
   * due for token renewal.
   * @private
   */
  private _tokenRenewalTimer?: NodeJS.Timer;
  /**
   * @constructor
   * Instantiates the management client.
   * @param {BaseConnectionContext} context The connection context.
   * @param {string} [address] The address for the management endpoint. For IotHub it will be
   * `/messages/events/$management`.
   */
  constructor(context: ConnectionContext, options?: ManagementClientOptions) {
    if (!options) options = {};
    this._context = context;
    this.entityPath = context.config.entityPath as string;
    this.address = options.address || Constants.management;
    this.audience = options.audience || context.config.endpoint;
  }

  /**
   * Provides the eventhub runtime information.
   * @method getHubRuntimeInformation
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
   * @method getPartitionIds
   * @param {Connection} connection - The established amqp connection
   * @returns {Promise<Array<string>>}
   */
  async getPartitionIds(): Promise<Array<string>> {
    const runtimeInfo = await this.getHubRuntimeInformation();
    return runtimeInfo.partitionIds;
  }

  /**
   * Provides information about the specified partition.
   * @method getPartitionInformation
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
    if (!this._context.connection) {
      debug("[%s] Management client for EventHub establishing an AMQP connection.",
        this._context.connectionId);
      await defaultLock.acquire(this._context.connectionLock, () => { return open(this._context); });
    }

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
      debug("[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
        this._context.connectionId, this._mgmtReqResLink.sender.name, this._mgmtReqResLink.receiver.name);
      await this._ensureTokenRenewal();
    }
  }

  /**
   * Negotiates the cbs claim for the EventHub Sender.
   * @private
   * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
   * @return {Promise<void>} Promise<void>
   */
  private async _negotiateClaim(setTokenRenewal?: boolean): Promise<void> {
    debug("[%s] Acquiring lock: '%s' for creating the cbs session while creating the management client.",
      this._context.connectionId, this._context.cbsSession.cbsLock);
    await defaultLock.acquire(this._context.cbsSession.cbsLock,
      () => { return this._context.cbsSession.init(this._context.connection); });
    const tokenObject = await this._context.tokenProvider.getToken(this.audience);
    debug("[%s] EH Sender: calling negotiateClaim for audience '%s'.",
      this._context.connectionId, this.audience);
    // Acquire the lock to negotiate the CBS claim.
    debug("[%s] Acquiring lock: '%s' for cbs auth for management client.",
      this._context.connectionId, this._context.negotiateClaimLock);
    await defaultLock.acquire(this._context.negotiateClaimLock, () => {
      return this._context.cbsSession.negotiateClaim(this.audience,
        this._context.connection, tokenObject);
    });
    debug("[%s] Negotiated claim for management client.", this._context.connectionId);
    if (setTokenRenewal) {
      await this._ensureTokenRenewal();
    }
  }

  /**
   * Ensures that the token is renewed within the predefined renewal margin.
   * @private
   * @returns {void}
   */
  private async _ensureTokenRenewal(): Promise<void> {
    const tokenValidTimeInSeconds = this._context.tokenProvider.tokenValidTimeInSeconds;
    const tokenRenewalMarginInSeconds = this._context.tokenProvider.tokenRenewalMarginInSeconds;
    const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
    this._tokenRenewalTimer = setTimeout(async () => {
      try {
        await this._negotiateClaim(true);
      } catch (err) {
        // TODO: May be add some retries over here before emitting the error.
        debug("[%s] Management client, an error occurred while renewing the token: %O",
          this._context.connectionId, err);
      }
    }, nextRenewalTimeout);
    debug("[%s] Management client, has next token renewal in %d seconds @(%s).",
      this._context.connectionId, nextRenewalTimeout / 1000,
      new Date(Date.now() + nextRenewalTimeout).toString());
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
      const request: AmqpMessage = {
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
      debug("An error occurred while making the request to $management endpoint: %O", err);
      throw err;
    }
  }
}
