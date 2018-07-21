// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import { defaultLock } from "./amqp-common";
import { ConnectionContext } from "./connectionContext";
import { Sender, Receiver } from "./rhea-promise";
const debug = debugModule("azure:event-hubs:linkEntity");

export interface LinkEntityOptions {
  /**
   * @property {string} [name] The unique name for the entity. If not provided then a guid will be
   * assigned.
   */
  name?: string;
  /**
   * @property {string | number} [partitionId] The partitionId associated with the link entity.
   */
  partitionId?: string | number;
  /**
   * @property {string} address The link entity address in one of the following forms:
   */
  address?: string;
  /**
   * @property {string} audience The link entity token audience in one of the following forms:
   */
  audience?: string;
}

/**
 * Describes the base class for entities like EventHub Sender, Receiver and Management link.
 * @class LinkEntity
 */
export class LinkEntity {
  /**
   * @property {string} [name] The unique name for the entity (mostly a guid).
   */
  name: string;
  /**
   * @property {string} address The link entity address in one of the following forms:
   *
   * **Sender**
   * - `"<hubName>"`
   * - `"<hubName>/Partitions/<partitionId>"`.
   *
   * **Receiver**
   * - `"<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
   *
   * **ManagementClient**
   * -`"$management"`.
   */
  address: string;
  /**
   * @property {string} audience The link entity token audience in one of the following forms:
   *
   * **Sender**
   * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
   * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
   *
   * **Receiver**
   * - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
   *
   * **ManagementClient**
   * - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
   */
  audience: string;
  /**
   * @property {string | number} [partitionId] The partitionId associated with the link entity.
   */
  partitionId?: string | number;
  /**
   * @property {ConnectionContext} _context Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   * @protected
   */
  protected _context: ConnectionContext;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when
   * the Link Entity is due for token renewal.
   * @protected
   */
  protected _tokenRenewalTimer?: NodeJS.Timer;
  /**
   * Creates a new LinkEntity instance.
   * @constructor
   * @param {ConnectionContext} context The connection context.
   * @param {LinkEntityOptions} [options] Options that can be provided while creating the LinkEntity.
   */
  constructor(context: ConnectionContext, options?: LinkEntityOptions) {
    if (!options) options = {};
    this._context = context;
    this.address = options.address || "";
    this.audience = options.audience || "";
    this.name = options.name || uuid();
    this.partitionId = options.partitionId;
  }

  /**
   * Negotiates cbs claim for the LinkEntity.
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
      "'%s' with address: '%s'.", this._context.connectionId, this._context.cbsSession.cbsLock,
      this._type, this.name, this.address);
    await defaultLock.acquire(this._context.cbsSession.cbsLock,
      () => { return this._context.cbsSession.init(); });
    const tokenObject = await this._context.tokenProvider.getToken(this.audience);
    debug("[%s] %s: calling negotiateClaim for audience '%s'.",
      this._context.connectionId, this._type, this.audience);
    // Acquire the lock to negotiate the CBS claim.
    debug("[%s] Acquiring cbs lock: '%s' for cbs auth for %s: '%s' with address '%s'.",
      this._context.connectionId, this._context.negotiateClaimLock, this._type, this.name, this.address);
    await defaultLock.acquire(this._context.negotiateClaimLock, () => {
      return this._context.cbsSession.negotiateClaim(this.audience, tokenObject);
    });
    debug("[%s] Negotiated claim for %s '%s' with with address: %s",
      this._context.connectionId, this._type, this.name, this.address);
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
    const tokenValidTimeInSeconds = this._context.tokenProvider.tokenValidTimeInSeconds;
    const tokenRenewalMarginInSeconds = this._context.tokenProvider.tokenRenewalMarginInSeconds;
    const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
    this._tokenRenewalTimer = setTimeout(async () => {
      try {
        await this._negotiateClaim(true);
      } catch (err) {
        debug("[%s] %s '%s' with address %s, an error occurred while renewing the token: %O",
          this._context.connectionId, this._type, this.name, this.address, err);
      }
    }, nextRenewalTimeout);
    debug("[%s] %s '%s' with address %s, has next token renewal in %d seconds @(%s).",
      this._context.connectionId, this._type, this.name, this.address, nextRenewalTimeout / 1000,
      new Date(Date.now() + nextRenewalTimeout).toString());
  }

  /**
   * Closes the Sender|Receiver link and it's underlying session and also removes it from the
   * internal map.
   * @param {Sender | Receiver} [link] The Sender or Receiver link that needs to be closed and
   * removed.
   */
  protected async _closeLink(link?: Sender | Receiver): Promise<void> {
    clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
    if (link) {
      try {
        await link.close();
        debug("[%s] %s '%s' with address '%s' closed.", this._context.connectionId, this._type,
          this.name, this.address);
      } catch (err) {
        debug("[%s] An error occurred while closing the %s '%s' with address '%s': %O",
          this._context.connectionId, this._type, this.name, this.address, err);
      }
      // TODO: Let us wait for rhea to do this correctly for us.
      // link.remove();
      // debug("[%s] %s '%s' with address '%s' and it's session have been removed from " +
      //   "internal map.", this._context.connectionId, this._type, this.name, this.address);
    }
  }

  /**
   * Provides the current type of the LinkEntity.
   * @return {string} The entity type.
   */
  private get _type(): string {
    let result = "LinkEntity";
    if ((this as any).constructor && (this as any).constructor.name) {
      result = (this as any).constructor.name;
    }
    return result;
  }
}
