// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import {
  Message, EventContext, SenderEvents, ReceiverEvents, SenderOptions, ReceiverOptions
} from "rhea-promise";
import { defaultLock, translate, Constants, RequestResponseLink } from "@azure/amqp-common";
import { ClientEntityContext } from "./clientEntityContext";
import { LinkEntity } from "./linkEntity";
import * as log from "./log";

export interface ManagementClientOptions {
  address?: string;
  audience?: string;
}

/**
 * @class ManagementClient
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient extends LinkEntity {

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
   * @param {ClientEntityContext} context The client entity context.
   * @param {string} [address] The address for the management endpoint. For IotHub it will be
   * `/messages/events/$management`.
   */
  constructor(context: ClientEntityContext, options?: ManagementClientOptions) {
    super(context, {
      name: `${context.entityPath}/$management`,
      address: options && options.address ? options.address : Constants.management,
      audience: options && options.audience ? options.audience :
        `${context.namespace.config.endpoint}${context.entityPath}/$management`
    });
    this._context = context;
    this.entityPath = context.namespace.config.entityPath as string;
  }

  /**
   * Closes the AMQP management session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @return {Promise<void>}
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

  /**
   * Helper method to make the management request
   * @param {Connection} connection - The established amqp connection
   * @param {string} type - The type of entity requested for. Valid values are "eventhub", "partition"
   * @param {string | number} [partitionId] - The partitionId. Required only when type is "partition".
   */
  async _makeManagementRequest(type: "eventhub" | "partition", partitionId?: string | number): Promise<any> {
    if (partitionId != undefined && (typeof partitionId !== "string" && typeof partitionId !== "number")) {
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
      if (partitionId != undefined && type === Constants.partition) {
        request.application_properties!.partition = `${partitionId}`;
      }
      log.mgmt("[%s] Acquiring lock to get the management req res link.",
        this._context.namespace.connectionId);
      await defaultLock.acquire(this.managementLock, () => { return this._init(); });
      return (await this._mgmtReqResLink!.sendRequest(request)).body;
    } catch (err) {
      err = translate(err);
      log.error("An error occurred while making the request to $management endpoint: %O", err);
      throw err;
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
            log.error("[%s] An error occurred on the session for request/response links for " +
              "$management: %O", id, ehError);
          }
        };
        const sropt: SenderOptions = { target: { address: this.address } };
        log.mgmt("[%s] Creating sender/receiver links on a session for $management endpoint.",
          this._context.namespace.connectionId);
        this._mgmtReqResLink =
          await RequestResponseLink.create(this._context.namespace.connection, sropt, rxopt);
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
        log.mgmt("[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
          this._context.namespace.connectionId, this._mgmtReqResLink.sender.name,
          this._mgmtReqResLink.receiver.name);
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      log.error("[%s] An error occured while establishing the $management links: %O",
        this._context.namespace.connectionId, err);
      throw err;
    }
  }

  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }
}
