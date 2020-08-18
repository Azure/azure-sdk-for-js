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
import { ConnectionContext } from "../connectionContext";
import * as log from "../log";
import {
  AwaitableSender,
  AwaitableSenderOptions,
  Receiver,
  ReceiverOptions,
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

/**
 * A simple grouping of the sender and receiver options. Only used
 * with the ManagementClient today.
 *
 * @internal
 * @ignore
 */
export interface RequestResponseLinkOptions {
  senderOptions: SenderOptions;
  receiverOptions: ReceiverOptions;
  name?: string;
}

/**
 * @internal
 * @ignore
 */
export type ReceiverType =
  | "br" // batching receiver
  | "sr" // streaming receiver;
  | "ms"; // message session

/**
 * @internal
 * @ignore
 */
type LinkOptionsT<
  LinkT extends Receiver | AwaitableSender | RequestResponseLink
> = LinkT extends Receiver
  ? ReceiverOptions
  : LinkT extends AwaitableSender
  ? AwaitableSenderOptions
  : LinkT extends RequestResponseLink
  ? RequestResponseLinkOptions
  : never;

/**
 * @internal
 * @ignore
 */
type LinkTypeT<
  LinkT extends Receiver | AwaitableSender | RequestResponseLink
> = LinkT extends Receiver
  ? ReceiverType
  : LinkT extends AwaitableSender
  ? "s" // sender
  : LinkT extends RequestResponseLink
  ? "m" // management link
  : never;

/**
 * @internal
 * @ignore
 * Describes the base class for entities like MessageSender, MessageReceiver and Management client.
 */
export abstract class LinkEntity<LinkT extends Receiver | AwaitableSender | RequestResponseLink> {
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
   * @property _context Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   */
  protected _context: ConnectionContext;
  /**
   * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when
   * the Client Entity is due for token renewal.
   */
  private _tokenRenewalTimer?: NodeJS.Timer;
  /**
   * @property _tokenTimeout Indicates token timeout
   */
  protected _tokenTimeout?: number;

  /**
   * The actual rhea link (of type Receiver or AwaitableSender) or RequestResponseLink
   */
  private _link?: LinkT;

  /**
   * The log prefix for any log messages.
   */
  private _logPrefix: string;

  private _logger: typeof log.error;

  /**
   * Indicates that close() has been called on this link and
   * that it should not be allowed to reopen.
   */
  private _wasClosedPermanently: boolean = false;

  private _isConnecting: boolean = false;

  /**
   * Creates a new ClientEntity instance.
   * @constructor
   * @param context The connection context.
   * @param options Options that can be provided while creating the LinkEntity.
   */
  constructor(
    name: string,
    context: ConnectionContext,
    private _linkType: LinkTypeT<LinkT>,
    options?: LinkEntityOptions
  ) {
    if (!options) options = {};
    this._context = context;
    this.address = options.address || "";
    this.audience = options.audience || "";
    this.name = getUniqueName(name);
    this._logPrefix = `[${context.connectionId}|${this._linkType}:${this.name}|a:${this.address}]`;

    this._logger = LinkEntity.getLogger(this._linkType);
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
   * Indicates that a link initialization is in process.
   */
  get isConnecting(): boolean {
    return this._isConnecting;
  }

  /**
   * Initializes this LinkEntity, setting this._link with the result of  `createRheaLink`, which
   * is implemented by child classes.
   *
   * @returns A Promise that resolves when the link has been properly initialized
   */
  async initLink(options: LinkOptionsT<LinkT>, abortSignal?: AbortSignalLike): Promise<void> {
    const checkAborted = (): void => {
      if (abortSignal?.aborted) {
        throw new AbortError(StandardAbortMessage);
      }
    };

    const connectionId = this._context.connectionId;
    checkAborted();

    if (options.name) {
      this.name = options.name;
      this._logPrefix = `[${connectionId}|${this._linkType}:${this.name}|a:${this.address}]`;
    }

    if (this._wasClosedPermanently) {
      log.error(`${this._logPrefix} Link has been closed. Not reopening.`);
      return;
    }

    if (this.isOpen()) {
      log.error(`${this._logPrefix} Link is already open. Returning.`);
      return;
    }

    if (this.isConnecting) {
      log.error(`${this._logPrefix} Link is currently opening. Returning.`);
      return;
    }

    log.error(`${this._logPrefix} Is not open and is not currently connecting. Opening.`);

    this._isConnecting = true;

    try {
      await this._negotiateClaim();
      checkAborted();

      this._logger(`${this._logPrefix} Creating with options %O`, options);
      this._link = await this.createRheaLink(options);
      checkAborted();

      if (this._wasClosedPermanently) {
        // the user attempted to close while we were still initializing the link. Abort
        // the current operation. This also makes it so the operation is non-retryable.
        log.error(`${this._logPrefix} Link closed while it was initializing.`);
        throw new AbortError("Link closed while initializing.");
      }

      this._ensureTokenRenewal();

      this._logger(`${this._logPrefix} Link has been created.`);
    } catch (err) {
      await this.closeLink();
      throw err;
    } finally {
      this._isConnecting = false;
    }
  }

  /**
   * Clears token remewal for current link, removes current LinkEntity instance from cache,
   * and closes the underlying AMQP link.
   * Once closed, this instance of LinkEntity is not meant to be re-used.
   */
  async close(): Promise<void> {
    // Set the flag to indicate that this instance of LinkEntity is not meant to be re-used.
    this._wasClosedPermanently = true;

    log.error(
      "[%s] Closing the %s for entity '%s'.",
      this._context.connectionId,
      this._type,
      this.address
    );

    // Remove the underlying AMQP link from the cache
    switch (this._linkType) {
      case "s": {
        delete this._context.senders[this.name];
        break;
      }
      case "br":
      case "sr": {
        delete this._context.messageReceivers[this.name];
        break;
      }
      case "ms": {
        delete this._context.messageSessions[this.name];
        break;
      }
    }

    log.error(
      "[%s] Deleted the %s '%s' from the client cache.",
      this._context.connectionId,
      this._type,
      this.name
    );

    await this.closeLink();
  }

  /**
   * NOTE: This method should be implemented by any child classes to actually create the underlying
   * Rhea link (AwaitableSender or Receiver or RequestResponseLink)
   *
   * @param _options
   */
  protected abstract createRheaLink(_options: LinkOptionsT<LinkT>): Promise<LinkT>;

  /**
   * Closes the internally held rhea link, stops the token renewal timer and sets
   * the this._link field to undefined.
   */
  protected async closeLink(): Promise<void> {
    this._logger(`${this._logPrefix} closeLink() called`);

    clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
    this._tokenRenewalTimer = undefined;

    if (this._link) {
      try {
        const link = this._link;
        this._link = undefined;

        // This should take care of closing the link and it's underlying session. This should also
        // remove them from the internal map.
        await link.close();

        this._logger(`${this._logPrefix} closed.`);
      } catch (err) {
        log.error(`${this._logPrefix} An error occurred while closing the link.: %O`, err);
      }
    }
  }

  private static getLogger(
    linkType: LinkTypeT<Receiver> | LinkTypeT<AwaitableSender> | LinkTypeT<RequestResponseLink>
  ): typeof log.error {
    switch (linkType) {
      case "m": {
        return log.mgmt;
      }
      case "s": {
        return log.sender;
      }
      case "br": {
        return log.batching;
      }
      case "sr": {
        return log.streaming;
      }
      case "ms": {
        return log.messageSession;
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

  protected get wasClosedPermanently(): boolean {
    return this._wasClosedPermanently;
  }

  protected get link(): LinkT | undefined {
    return this._link;
  }

  /**
   * Negotiates the cbs claim for the ClientEntity.
   * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
   * @return {Promise<void>} Promise<void>
   */
  private async _negotiateClaim(setTokenRenewal?: boolean): Promise<void> {
    // Wait for the connectionContext to be ready to open the link.
    await this._context.readyToOpenLink();
    // Acquire the lock and establish a cbs session if it does not exist on the connection.
    // Although node.js is single threaded, we need a locking mechanism to ensure that a
    // race condition does not happen while creating a shared resource (in this case the
    // cbs session, since we want to have exactly 1 cbs session per connection).
    this._logger(
      "[%s] Acquiring cbs lock: '%s' for creating the cbs session while creating the %s: " +
        "'%s' with address: '%s'.",
      this._context.connectionId,
      this._context.cbsSession.cbsLock,
      this._type,
      this.name,
      this.address
    );
    await defaultLock.acquire(this._context.cbsSession.cbsLock, () => {
      return this._context.cbsSession.init();
    });
    let tokenObject: AccessToken;
    let tokenType: TokenType;
    if (this._context.tokenCredential instanceof SharedKeyCredential) {
      tokenObject = this._context.tokenCredential.getToken(this.audience);
      tokenType = TokenType.CbsTokenTypeSas;
      // renew sas token in every 45 minutess
      this._tokenTimeout = (3600 - 900) * 1000;
    } else {
      const aadToken = await this._context.tokenCredential.getToken(Constants.aadServiceBusScope);
      if (!aadToken) {
        throw new Error(`Failed to get token from the provided "TokenCredential" object`);
      }
      tokenObject = aadToken;
      tokenType = TokenType.CbsTokenTypeJwt;
      this._tokenTimeout = tokenObject.expiresOnTimestamp - Date.now() - 2 * 60 * 1000;
    }
    this._logger(
      "[%s] %s: calling negotiateClaim for audience '%s'.",
      this._context.connectionId,
      this._type,
      this.audience
    );
    // Acquire the lock to negotiate the CBS claim.
    this._logger(
      "[%s] Acquiring cbs lock: '%s' for cbs auth for %s: '%s' with address '%s'.",
      this._context.connectionId,
      this._context.negotiateClaimLock,
      this._type,
      this.name,
      this.address
    );
    if (!tokenObject) {
      throw new Error("Token cannot be null");
    }
    await defaultLock.acquire(this._context.negotiateClaimLock, () => {
      return this._context.cbsSession.negotiateClaim(this.audience, tokenObject, tokenType);
    });
    this._logger(
      "[%s] Negotiated claim for %s '%s' with with address: %s",
      this._context.connectionId,
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
  private _ensureTokenRenewal(): void {
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
          this._context.connectionId,
          this._type,
          this.name,
          this.address,
          err
        );
      }
    }, this._tokenTimeout);
    this._logger(
      "[%s] %s '%s' with address %s, has next token renewal in %d milliseconds @(%s).",
      this._context.connectionId,
      this._type,
      this.name,
      this.address,
      this._tokenTimeout,
      new Date(Date.now() + this._tokenTimeout).toString()
    );
  }
}
