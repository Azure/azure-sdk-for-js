// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AccessToken,
  Constants,
  SharedKeyCredential,
  TokenType,
  defaultLock
} from "@azure/core-amqp";
import { ClientEntityContext } from "../clientEntityContext";
import * as log from "../log";
import { AwaitableSender, Receiver } from "rhea-promise";
import { getUniqueName } from "../util/utils";

/**
 * @internal
 * @ignore
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
 * @ignore
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
   */
  protected _context: ClientEntityContext;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when
   * the Client Entity is due for token renewal.
   */
  protected _tokenRenewalTimer?: NodeJS.Timer;
  /**
   * @property _tokenTimeout Indicates token timeout
   */
  protected _tokenTimeout?: number;
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
   * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
   * @return {Promise<void>} Promise<void>
   */
  protected async _negotiateClaim(setTokenRenewal?: boolean): Promise<void> {
    // Wait for the connectionContext to be ready to open the link.
    await this._context.namespace.readyToOpenLink();
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
    let tokenObject: AccessToken;
    let tokenType: TokenType;
    if (this._context.namespace.tokenCredential instanceof SharedKeyCredential) {
      tokenObject = this._context.namespace.tokenCredential.getToken(this.audience);
      tokenType = TokenType.CbsTokenTypeSas;
      // renew sas token in every 45 minutess
      this._tokenTimeout = (3600 - 900) * 1000;
    } else {
      const aadToken = await this._context.namespace.tokenCredential.getToken(
        Constants.aadServiceBusScope
      );
      if (!aadToken) {
        throw new Error(`Failed to get token from the provided "TokenCredential" object`);
      }
      tokenObject = aadToken;
      tokenType = TokenType.CbsTokenTypeJwt;
      this._tokenTimeout = tokenObject.expiresOnTimestamp - Date.now() - 2 * 60 * 1000;
    }
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
    if (!tokenObject) {
      throw new Error("Token cannot be null");
    }
    await defaultLock.acquire(this._context.namespace.negotiateClaimLock, () => {
      return this._context.namespace.cbsSession.negotiateClaim(
        this.audience,
        tokenObject,
        tokenType
      );
    });
    log.link(
      "[%s] Negotiated claim for %s '%s' with with address: %s",
      this._context.namespace.connectionId,
      this._type,
      this.name,
      this.address
    );
    if (setTokenRenewal) {
      this._ensureTokenRenewal();
    }
  }

  /**
   * Ensures that the token is renewed within the predefined renewal margin.
   * @returns {void}
   */
  protected _ensureTokenRenewal(): void {
    if (!this._tokenTimeout) {
      return;
    }
    // Clear the existing token renewal timer.
    // This scenario can happen if the connection goes down and is brought back up
    // before the `nextRenewalTimeout` was reached.
    if (this._tokenRenewalTimer) {
      clearTimeout(this._tokenRenewalTimer);
    }
    this._tokenRenewalTimer = setTimeout(async () => {
      try {
        await this._negotiateClaim(true);
      } catch (err) {
        log.error(
          "[%s] %s '%s' with address %s, an error occurred while renewing the token: %O",
          this._context.namespace.connectionId,
          this._type,
          this.name,
          this.address,
          err
        );
      }
    }, this._tokenTimeout);
    log.link(
      "[%s] %s '%s' with address %s, has next token renewal in %d milliseconds @(%s).",
      this._context.namespace.connectionId,
      this._type,
      this.name,
      this.address,
      this._tokenTimeout,
      new Date(Date.now() + this._tokenTimeout).toString()
    );
  }

  /**
   * Closes the Sender|Receiver link and it's underlying session and also removes it from the
   * internal map.
   *
   * @param {Sender | Receiver} [link] The Sender or Receiver link that needs to be closed and
   * removed.
   */
  protected async _closeLink(link?: AwaitableSender | Receiver): Promise<void> {
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
