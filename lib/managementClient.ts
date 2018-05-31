// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import * as debugModule from "debug";
import { Message, ReceiverOptions, SenderOptions } from "./rhea-promise";
import { defaultLock, translate, Constants, RequestResponseLink } from "./amqp-common";
import { ConnectionContext } from "./connectionContext";
import { ClientEntity } from "./clientEntity";

const debug = debugModule("azure:service-bus:management");

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
   * Closes the AMQP management session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @return {Promise<void>}
   */
  async close(): Promise<void> {
    try {
      if (this._isMgmtRequestResponseLinkOpen()) {
        await this._mgmtReqResLink!.close();
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

  /**
   * @private
   * Helper method to make the management request
   * @param {Connection} connection - The established amqp connection
   * @param {string} type - The type of entity requested for. Valid values are "eventhub", "partition"
   * @param {string | number} [partitionId] - The partitionId. Required only when type is "partition".
   */
  async _makeManagementRequest(type: "eventhub" | "partition", partitionId?: string | number): Promise<any> {
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
      return await this._mgmtReqResLink!.sendRequest(request);
    } catch (err) {
      err = translate(err);
      debug("An error occurred while making the request to $management endpoint: %O", err);
      throw err;
    }
  }

  private async _init(): Promise<void> {
    if (this._isMgmtRequestResponseLinkOpen()) {
      await this._negotiateClaim();
      const rxopt: ReceiverOptions = {
        source: { address: this.address },
        name: this.replyTo,
        target: { address: this.replyTo }
      };
      const sropt: SenderOptions = { target: { address: this.address } };
      debug("Creating a session for $management endpoint");
      this._mgmtReqResLink = await RequestResponseLink.create(this._context.connection!, sropt, rxopt);
      debug("[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
        this._context.connectionId, this._mgmtReqResLink.sender.name, this._mgmtReqResLink.receiver.name);
      await this._ensureTokenRenewal();
    }
  }

  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }
}
