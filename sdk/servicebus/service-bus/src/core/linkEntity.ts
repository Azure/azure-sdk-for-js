// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AccessToken,
  Constants,
  SharedKeyCredential,
  TokenType,
  defaultLock,
  RequestResponseLink
} from "@azure/core-amqp";
import { ClientEntityContext } from "../clientEntityContext";
import * as log from "../log";
import {
  AwaitableSender,
  AwaitableSenderOptions,
  Receiver,
  ReceiverOptions,
  ReceiverOptionsWithSession,
  SenderOptions
} from "rhea-promise";
import { getUniqueName, StandardAbortMessage } from "../util/utils";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";

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

export interface RequestResponseLinkOptions {
  senderOptions: SenderOptions;
  receiverOptions: ReceiverOptions;
  name: string;
}

type LinkOptionsT<
  LinkT extends Receiver | AwaitableSender | RequestResponseLink
> = LinkT extends Receiver
  ? ReceiverOptionsWithSession
  : LinkT extends AwaitableSender
  ? AwaitableSenderOptions
  : LinkT extends RequestResponseLink
  ? RequestResponseLinkOptions
  : never;

/**
 * @internal
 * @ignore
 * Describes the base class for entities like MessageSender, MessageReceiver and Management client.
 * @class ClientEntity
 */
export class LinkEntity<LinkT extends Receiver | AwaitableSender | RequestResponseLink> {
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
   * The actual rhea link (of type Receiver or AwaitableSender)
   */
  private _link?: LinkT;

  /**
   * The log prefix for any log messages.
   */
  private _logPrefix: string;

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
    this._logPrefix = `[${context.namespace.connection.id}|l:${this.name}|a:${this.address}]`;
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
   * Closes the internally held rhea link, stops the token renewal timer and sets
   * the this._link field to undefined.
   *
   * @param originator Indicates the original caller.
   * - "close" closes the link permanently, setting _wasCloseInitiated which
   * prevents it from being reinitializing.
   * - "detach" closes the link but does not permanently close the LinkEntity. It can be reinitialized.
   */
  async _closeLink(originator: "close" | "detach"): Promise<void> {
    if (originator === "close") {
      this._wasCloseInitiated = true;
    }

    clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);

    if (this._link) {
      try {
        // This should take care of closing the link and it's underlying session. This should also
        // remove them from the internal map.
        await this._link.close();
        this._link = undefined;

        log.link(`${this._logPrefix} closed by ${originator}.`);
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

  /**
   * Determines whether the AMQP link is open. If open then returns true else returns false.
   * @return {boolean} boolean
   */
  isOpen(): boolean {
    const result: boolean = this._link ? this._link.isOpen() : false;
    log.error(`${this._logPrefix} is open? ${result}`);
    return result;
  }

  /**
   * Indicates that closeLink() has been called on this link.
   */
  private _wasCloseInitiated: boolean = false;

  protected get wasCloseInitiated(): boolean {
    return this._wasCloseInitiated;
  }

  /**
   * Indicates that a link initialization is in process.
   */
  public get isConnecting(): boolean {
    return this._isConnecting;
  }

  private _isConnecting: boolean = false;

  /**
   * NOTE: This method should be implemented by any child classes to actually create the underlying
   * Rhea link (AwaitableSender vs Receiver)
   *
   * @param _options
   */
  protected createRheaLink(_options: LinkOptionsT<LinkT>): Promise<LinkT> {
    throw new Error("UNIMPLEMENTED");
  }

  /**
   * Initializes this LinkEntity as a receiver link, updating this._receiver
   * with a valid rhea Receiver if one is not already set or if it's not open.
   *
   * @param abortSignal
   * @param options
   * @returns undefined if the link is already open or the object has been close()'d.
   */
  async initLink(options: LinkOptionsT<LinkT>, abortSignal?: AbortSignalLike): Promise<void> {
    const checkAborted = (): void => {
      if (abortSignal?.aborted) {
        throw new AbortError(StandardAbortMessage);
      }
    };

    const connectionId = this._context.namespace.connectionId;
    checkAborted();

    if (options.name) {
      this.name = options.name;
      this._logPrefix = `[${connectionId}|r:${this.name}|a:${this.address}]`;
    }

    const logPrefix = `[${connectionId}|r:${this.name}|a:${this.address}]`;

    if (this._wasCloseInitiated) {
      log.error(`${logPrefix} Link has been closed by user. Not reopening.`);
      return;
    }

    if (this.isOpen()) {
      log.error(`${logPrefix} Link is already open. Returning.`);
      return;
    }

    if (this.isConnecting) {
      log.error(`${logPrefix} Link is currently opening. Returning.`);
      return;
    }

    log.error(`${logPrefix} Is not open and is not currently connecting. Opening.`);

    this._isConnecting = true;

    try {
      await this._negotiateClaim();
      checkAborted();

      log.error(`${logPrefix} Creating with options %O`, options);

      this._link = await this.createRheaLink(options);

      if (abortSignal?.aborted) {
        log.error(`${logPrefix} created but abortSignal was set. Closing and aborting.`);
        await this._link.close();
        this._link = undefined;
        throw new AbortError(StandardAbortMessage);
      }
    } finally {
      this._isConnecting = false;
    }
  }

  protected get link(): LinkT | undefined {
    return this._link;
  }
}
