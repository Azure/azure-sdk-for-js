// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import { ClientEntityContext } from "./clientEntityContext";
import { defaultLock } from "./amqp-common";
const debug = debugModule("azure:service-bus:clientEntity");

export interface LinkEntityOptions {
  /**
   * @property {string | number} [partitionId] The partitionId associated with the client entity.
   */
  partitionId?: string | number;
  /**
   * @property {string} address The client entity address in one of the following forms:
   */
  address?: string;
  /**
   * @property {string} audience The client entity token audience in one of the following forms:
   */
  audience?: string;
}

/**
 * Describes the base class for entities like MessageSender, MessageReceiver and Management client.
 * @class ClientEntity
 */
export class LinkEntity {
  /**
   * @property {string} [id] The unique name for the entity in the format:
   * `${name of the entity}-${guid}`.
   */
  id: string;
  /**
   * @property {string} address The client entity address in one of the following forms:
   *
   * **Sender**
   * - `"<queue-name>"`.
   * - `"<topic-name>"`.
   *
   * **Receiver**
   * - `"<queue-name>"`.
   * - `"<topic-name>"`.
   *
   * **ManagementClient**
   * -`"$management"`.
   */
  address: string;
  /**
   * @property {string} audience The client entity token audience in one of the following forms:
   *
   * **Sender**
   * - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
   * - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
   *
   * **Receiver**
   * - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
   * - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
   *
   * **ManagementClient**
   * - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
   * - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
   */
  audience: string;
  /**
   * @property {ClientEntityContext} _context Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   * @protected
   */
  protected _context: ClientEntityContext;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when
   * the Client Entity is due for token renewal.
   * @protected
   */
  protected _tokenRenewalTimer?: NodeJS.Timer;
  /**
   * Creates a new ClientEntity instance.
   * @constructor
   * @param {string} name The name of the entity.
   * @param {ClientEntityContext} context The connection context.
   * @param {LinkEntityOptions} [options] Options that can be provided while creating the LinkEntity.
   */
  constructor(name: string, context: ClientEntityContext, options?: LinkEntityOptions) {
    if (!options) options = {};
    this._context = context;
    this.address = options.address || "";
    this.audience = options.audience || "";
    this.id = `${name}/${uuid()}`;
  }
  /**
   * Provides the current type of the ClientEntity.
   * @return {string} The entity type.
   */
  get type(): string {
    let result = "LinkEntity";
    if ((this as any).constructor && (this as any).constructor.name) {
      result = (this as any).constructor.name;
    }
    return result;
  }

  /**
   * Negotiates the cbs claim for the ClientEntity.
   * @protected
   * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
   * @return {Promise<void>} Promise<void>
   */
  protected async _negotiateClaim(setTokenRenewal?: boolean): Promise<void> {
    // Acquire the lock and establish a cbs session if it does not exist on the connection.
    // Although node.js is single threaded, we need a locking mechanism to ensure that a
    // race condition does not happen while creating a shared resource (in this case the
    // cbs session, since we want to have exactly 1 cbs session per connection).
    debug("[%s] Acquiring cbs lock: '%s' for creating the cbs session while creating the %s: " +
      "'%s' with address: '%s'.", this._context.namespace.connectionId,
      this._context.namespace.cbsSession!.cbsLock,
      this.type, this.id, this.address);
    await defaultLock.acquire(this._context.namespace.cbsSession!.cbsLock,
      () => { return this._context.namespace.cbsSession!.init(); });
    const tokenObject = await this._context.namespace.tokenProvider.getToken(this.audience);
    if (!this._context.namespace.connection) {
      this._context.namespace.connection = this._context.namespace.cbsSession!.connection;
      this._context.namespace.connectionId = this._context.namespace.cbsSession!.connection!.id;
    }
    debug("[%s] %s: calling negotiateClaim for audience '%s'.",
      this._context.namespace.connectionId, this.type, this.audience);
    // Acquire the lock to negotiate the CBS claim.
    debug("[%s] Acquiring cbs lock: '%s' for cbs auth for %s: '%s' with address '%s'.",
      this._context.namespace.connectionId, this._context.namespace.negotiateClaimLock,
      this.type, this.id, this.address);
    await defaultLock.acquire(this._context.namespace.negotiateClaimLock, () => {
      return this._context.namespace.cbsSession!.negotiateClaim(this.audience, tokenObject);
    });
    debug("[%s] Negotiated claim for %s '%s' with with address: %s",
      this._context.namespace.connectionId, this.type, this.id, this.address);
    if (setTokenRenewal) {
      await this._ensureTokenRenewal();
    }
  }

  /**
   * Ensures that the token is renewed within the predefined renewal margin.
   * @protected
   * @returns {void}
   */
  protected async _ensureTokenRenewal(): Promise<void> {
    const tokenValidTimeInSeconds = this._context.namespace.tokenProvider.tokenValidTimeInSeconds;
    const tokenRenewalMarginInSeconds = this._context.namespace.tokenProvider.tokenRenewalMarginInSeconds;
    const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
    this._tokenRenewalTimer = setTimeout(async () => {
      try {
        await this._negotiateClaim(true);
      } catch (err) {
        // TODO: May be add some retries over here before emitting the error.
        debug("[%s] %s '%s' with address %s, an error occurred while renewing the token: %O",
          this._context.namespace.connectionId, this.type, this.id, this.address, err);
      }
    }, nextRenewalTimeout);
    debug("[%s] %s '%s' with address %s, has next token renewal in %d seconds @(%s).",
      this._context.namespace.connectionId, this.type, this.id, this.address, nextRenewalTimeout / 1000,
      new Date(Date.now() + nextRenewalTimeout).toString());
  }
}
