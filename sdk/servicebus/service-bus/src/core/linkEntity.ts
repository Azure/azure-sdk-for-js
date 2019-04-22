// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { defaultLock } from "@azure/amqp-common";
import { ClientEntityContext } from "../clientEntityContext";
import * as log from "../log";
import { Sender, Receiver } from "rhea-promise";
import { getUniqueName } from "../util/utils";

/**
 * @internal
 * Options passed to the constructor of LinkEntity
 */
export interface LinkEntityOptions {
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
 * @internal
 * Describes the base class for entities like MessageSender, MessageReceiver and Management client.
 * @class ClientEntity
 */
export class LinkEntity {
  /**
   * @property {string} id The unique name for the entity in the format:
   * `${name of the entity}-${guid}`.
   */
  name: string;
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
   * @property {boolean} isConnecting Indicates whether the link is in the process of connecting
   * (establishing) itself. Default value: `false`.
   */
  isConnecting: boolean = false;
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
   * @param {ClientEntityContext} context The connection context.
   * @param {LinkEntityOptions} [options] Options that can be provided while creating the LinkEntity.
   */
  constructor(name: string, context: ClientEntityContext, options?: LinkEntityOptions) {
    if (!options) options = {};
    this._context = context;
    this.address = options.address || "";
    this.audience = options.audience || "";
    this.name = getUniqueName(name);
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
    log.link(
      "[%s] Acquiring cbs lock: '%s' for creating the cbs session while creating the %s: " +
        "'%s' with address: '%s'.",
      this._context.namespace.connectionId,
      this._context.namespace.cbsSession.cbsLock,
      this._type,
      this.name,
      this.address
    );
    await defaultLock.acquire(this._context.namespace.cbsSession.cbsLock, () => {
      return this._context.namespace.cbsSession.init();
    });
    const tokenObject = await this._context.namespace.tokenProvider.getToken(this.audience);
    log.link(
      "[%s] %s: calling negotiateClaim for audience '%s'.",
      this._context.namespace.connectionId,
      this._type,
      this.audience
    );
    // Acquire the lock to negotiate the CBS claim.
    log.link(
      "[%s] Acquiring cbs lock: '%s' for cbs auth for %s: '%s' with address '%s'.",
      this._context.namespace.connectionId,
      this._context.namespace.negotiateClaimLock,
      this._type,
      this.name,
      this.address
    );
    await defaultLock.acquire(this._context.namespace.negotiateClaimLock, () => {
      return this._context.namespace.cbsSession.negotiateClaim(this.audience, tokenObject);
    });
    log.link(
      "[%s] Negotiated claim for %s '%s' with with address: %s",
      this._context.namespace.connectionId,
      this._type,
      this.name,
      this.address
    );
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
    const tokenRenewalMarginInSeconds = this._context.namespace.tokenProvider
      .tokenRenewalMarginInSeconds;
    const nextRenewalTimeout = (tokenValidTimeInSeconds - tokenRenewalMarginInSeconds) * 1000;
    this._tokenRenewalTimer = setTimeout(async () => {
      try {
        await this._negotiateClaim(true);
      } catch (err) {
        // TODO: May be add some retries over here before emitting the error.
        log.error(
          "[%s] %s '%s' with address %s, an error occurred while renewing the token: %O",
          this._context.namespace.connectionId,
          this._type,
          this.name,
          this.address,
          err
        );
      }
    }, nextRenewalTimeout);
    log.link(
      "[%s] %s '%s' with address %s, has next token renewal in %d seconds @(%s).",
      this._context.namespace.connectionId,
      this._type,
      this.name,
      this.address,
      nextRenewalTimeout / 1000,
      new Date(Date.now() + nextRenewalTimeout).toString()
    );
  }

  /**
   * Closes the Sender|Receiver link and it's underlying session and also removes it from the
   * internal map.
   *
   * @param {Sender | Receiver} [link] The Sender or Receiver link that needs to be closed and
   * removed.
   */
  protected async _closeLink(link?: Sender | Receiver): Promise<void> {
    clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
    if (link) {
      try {
        // This should take care of closing the link and it's underlying session. This should also
        // remove them from the internal map.
        await link.close();
        log.link(
          "[%s] %s '%s' with address '%s' closed.",
          this._context.namespace.connectionId,
          this._type,
          this.name,
          this.address
        );
      } catch (err) {
        log.error(
          "[%s] An error occurred while closing the %s '%s': %O",
          this._context.namespace.connectionId,
          this._type,
          this.name,
          this.address,
          err
        );
      }
    }
  }

  /**
   * Provides the current type of the ClientEntity.
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
