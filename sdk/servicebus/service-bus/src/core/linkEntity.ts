// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Constants,
  TokenType,
  defaultCancellableLock,
  RequestResponseLink,
  StandardAbortMessage,
  isSasTokenProvider,
} from "@azure/core-amqp";
import { AccessToken } from "@azure/core-auth";
import { ConnectionContext } from "../connectionContext";
import {
  AwaitableSender,
  AwaitableSenderOptions,
  generate_uuid,
  Receiver,
  ReceiverOptions,
  SenderOptions,
} from "rhea-promise";
import { getUniqueName } from "../util/utils";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { ServiceBusLogger } from "../log";
import { ServiceBusError } from "../serviceBusError";

/**
 * @internal
 * Options passed to the constructor of LinkEntity
 */
export interface LinkEntityOptions {
  /**
   * The client entity address in one of the following forms:
   */
  address?: string;
  /**
   * The client entity token audience in one of the following forms:
   */
  audience?: string;
}

/**
 * A simple grouping of the sender and receiver options. Only used
 * with the ManagementClient today.
 *
 * @internal
 */
export interface RequestResponseLinkOptions {
  senderOptions: SenderOptions;
  receiverOptions: ReceiverOptions;
  name?: string;
}

/**
 * @internal
 */
export type NonSessionReceiverType =
  | "batching" // batching receiver
  | "streaming"; // streaming receiver

/**
 * @internal
 */
export type ReceiverType = NonSessionReceiverType | "session"; // message session

/**
 * @internal
 */
type LinkOptionsT<LinkT extends Receiver | AwaitableSender | RequestResponseLink> =
  LinkT extends Receiver
    ? ReceiverOptions
    : LinkT extends AwaitableSender
    ? AwaitableSenderOptions
    : LinkT extends RequestResponseLink
    ? RequestResponseLinkOptions
    : never;

/**
 * @internal
 */
type LinkTypeT<LinkT extends Receiver | AwaitableSender | RequestResponseLink> =
  LinkT extends Receiver
    ? ReceiverType
    : LinkT extends AwaitableSender
    ? "sender" // sender
    : LinkT extends RequestResponseLink
    ? "mgmt" // management link
    : never;

/**
 * @internal
 * Describes the base class for entities like MessageSender, MessageReceiver and Management client.
 */
export abstract class LinkEntity<LinkT extends Receiver | AwaitableSender | RequestResponseLink> {
  /**
   * The unique name for the entity in the format:
   * `${name of the entity}-${guid}`.
   */
  name: string;
  /**
   * The client entity address in one of the following forms:
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
   * The client entity token audience in one of the following forms:
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
   * Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   */
  protected _context: ConnectionContext;
  /**
   * The token renewal timer that keeps track of when
   * the Client Entity is due for token renewal.
   */
  private _tokenRenewalTimer?: NodeJS.Timer;
  /**
   * Indicates token timeout
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

  public get logPrefix(): string {
    return this._logPrefix;
  }

  /**
   * Indicates that close() has been called on this link and
   * that it should not be allowed to reopen.
   */
  private _wasClosedPermanently: boolean = false;

  /**
   * A lock that ensures that opening and closing this
   * link properly cooperate.
   */
  private _openLock: string = generate_uuid();

  /**
   * Creates a new ClientEntity instance.
   * @param baseName - The base name to use for the link. A unique ID will be appended to this.
   * @param entityPath - The entity path (ex: 'your-queue')
   * @param context - The connection context.
   * @param options - Options that can be provided while creating the LinkEntity.
   */
  constructor(
    public readonly baseName: string,
    public readonly entityPath: string,
    context: ConnectionContext,
    private _linkType: LinkTypeT<LinkT>,
    private _logger: ServiceBusLogger,
    options?: LinkEntityOptions
  ) {
    if (!options) options = {};
    this._context = context;
    this.address = options.address || "";
    this.audience = options.audience || "";
    this.name = getUniqueName(baseName);
    this._logPrefix = `[${context.connectionId}|${this._linkType}:${this.name}]`;
  }

  /**
   * Determines whether the AMQP link is open. If open then returns true else returns false.
   */
  isOpen(): boolean {
    const result: boolean = this._link ? this._link.isOpen() : false;
    this._logger.verbose(`${this._logPrefix} is open? ${result}`);
    return result;
  }

  /**
   * Initializes this LinkEntity, setting this._link with the result of  `createRheaLink`, which
   * is implemented by child classes.
   *
   * @returns A Promise that resolves when the link has been properly initialized
   * @throws `AbortError` if the link has been closed via 'close'
   */
  async initLink(options: LinkOptionsT<LinkT>, abortSignal?: AbortSignalLike): Promise<void> {
    // we'll check that the connection isn't in the process of recycling (and if so, wait for it to complete)
    await this._context.readyToOpenLink();

    this._logger.verbose(
      `${this._logPrefix} Attempting to acquire lock token ${this._openLock} for initializing link`
    );
    return defaultCancellableLock.acquire(
      this._openLock,
      () => {
        this._logger.verbose(
          `${this._logPrefix} Lock ${this._openLock} acquired for initializing link`
        );
        return this._initLinkImpl(options, abortSignal);
      },
      {
        abortSignal: abortSignal,
        timeoutInMs: Constants.defaultOperationTimeoutInMs,
      }
    );
  }

  private async _initLinkImpl(
    options: LinkOptionsT<LinkT>,
    abortSignal?: AbortSignalLike
  ): Promise<void> {
    const checkAborted = (): void => {
      if (abortSignal?.aborted) {
        throw new AbortError(StandardAbortMessage);
      }
    };

    const connectionId = this._context.connectionId;
    checkAborted();

    if (options.name) {
      this.name = options.name;
      this._logPrefix = `[${connectionId}|${this._linkType}:${this.name}]`;
    }

    if (this._wasClosedPermanently) {
      this._logger.verbose(`${this._logPrefix} Link has been permanently closed. Not reopening.`);
      throw new AbortError(`Link has been permanently closed. Not reopening.`);
    }

    if (this.isOpen()) {
      this._logger.verbose(`${this._logPrefix} Link is already open. Returning.`);
      return;
    }

    this._logger.verbose(
      `${this._logPrefix} Is not open and is not currently connecting. Opening.`
    );

    try {
      await this._negotiateClaim({
        abortSignal,
        setTokenRenewal: false,
        timeoutInMs: Constants.defaultOperationTimeoutInMs,
      });

      checkAborted();
      this.checkIfConnectionReady();

      this._logger.verbose(`${this._logPrefix} Creating with options %O`, options);
      this._link = await this.createRheaLink(options);
      checkAborted();

      this._ensureTokenRenewal();

      this._logger.verbose(`${this._logPrefix} Link has been created.`);
    } catch (err) {
      this._logger.logError(err, `${this._logPrefix} Error thrown when creating the link`);
      await this.closeLinkImpl();
      throw err;
    }
  }

  /**
   * Clears token renewal for current link, removes current LinkEntity instance from cache,
   * and closes the underlying AMQP link.
   * Once closed, this instance of LinkEntity is not meant to be re-used.
   */
  async close(): Promise<void> {
    // Set the flag to indicate that this instance of LinkEntity is not meant to be re-used.
    this._wasClosedPermanently = true;

    this._logger.verbose(`${this.logPrefix} permanently closing this link.`);

    this.removeLinkFromContext();

    await this.closeLink();
    this._logger.verbose(`${this.logPrefix} permanently closed this link.`);
  }

  /**
   * NOTE: This method should be implemented by any child classes to actually create the underlying
   * Rhea link (AwaitableSender or Receiver or RequestResponseLink)
   *
   */
  protected abstract createRheaLink(_options: LinkOptionsT<LinkT>): Promise<LinkT>;

  /**
   * Clears this link from context's link cache.
   */
  protected abstract removeLinkFromContext(): void;

  /**
   * Closes the internally held rhea link, stops the token renewal timer and sets
   * the this._link field to undefined.
   */
  protected closeLink(): Promise<void> {
    this._logger.verbose(
      `${this._logPrefix} Attempting to acquire lock token ${this._openLock} for closing link`
    );
    return defaultCancellableLock.acquire(
      this._openLock,
      () => {
        this._logger.verbose(`${this._logPrefix} Lock ${this._openLock} acquired for closing link`);
        return this.closeLinkImpl();
      },
      { abortSignal: undefined, timeoutInMs: undefined }
    );
  }

  private async closeLinkImpl(): Promise<void> {
    this._logger.verbose(`${this._logPrefix} closeLinkImpl() called`);

    clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
    this._tokenRenewalTimer = undefined;

    if (this._link) {
      try {
        const link = this._link;
        this._link = undefined;

        // This should take care of closing the link and it's underlying session. This should also
        // remove them from the internal map.
        await link.close();
        this._logger.verbose(`${this._logPrefix} closed.`);
      } catch (err) {
        this._logger.logError(err, `${this._logPrefix} An error occurred while closing the link`);
      }
    }
  }

  /**
   * Provides the current type of the ClientEntity.
   * @returns The entity type.
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
   * @param setTokenRenewal - Set the token renewal timer. Default false.
   */
  private async _negotiateClaim({
    abortSignal,
    setTokenRenewal,
    timeoutInMs,
  }: {
    setTokenRenewal: boolean;
    abortSignal: AbortSignalLike | undefined;
    timeoutInMs: number;
  }): Promise<void> {
    this._logger.verbose(`${this._logPrefix} negotiateclaim() has been called`);

    // Wait for the connectionContext to be ready to open the link.
    this.checkIfConnectionReady();

    // Acquire the lock and establish a cbs session if it does not exist on the connection.
    // Although node.js is single threaded, we need a locking mechanism to ensure that a
    // race condition does not happen while creating a shared resource (in this case the
    // cbs session, since we want to have exactly 1 cbs session per connection).
    this._logger.verbose(
      "%s Acquiring cbs lock: '%s' for creating the cbs session while creating the %s: " +
        "'%s' with address: '%s'.",
      this.logPrefix,
      this._context.cbsSession.cbsLock,
      this._type,
      this.name,
      this.address
    );

    const startTime = Date.now();
    if (!this._context.cbsSession.isOpen()) {
      await defaultCancellableLock.acquire(
        this._context.cbsSession.cbsLock,
        () => {
          this.checkIfConnectionReady();
          return this._context.cbsSession.init({ abortSignal, timeoutInMs });
        },
        {
          abortSignal,
          timeoutInMs: timeoutInMs - (Date.now() - startTime),
        }
      );
    }

    let tokenObject: AccessToken;
    let tokenType: TokenType;
    if (isSasTokenProvider(this._context.tokenCredential)) {
      tokenObject = this._context.tokenCredential.getToken(this.audience);
      tokenType = TokenType.CbsTokenTypeSas;

      // renew sas token in every 45 minutes
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
    this._logger.verbose(
      "%s %s: calling negotiateClaim for audience '%s'.",
      this.logPrefix,
      this._type,
      this.audience
    );
    // Acquire the lock to negotiate the CBS claim.
    this._logger.verbose(
      "%s Acquiring cbs lock: '%s' for cbs auth for %s: '%s' with address '%s'.",
      this.logPrefix,
      this._context.negotiateClaimLock,
      this._type,
      this.name,
      this.address
    );
    if (!tokenObject) {
      throw new Error("Token cannot be null");
    }
    await defaultCancellableLock.acquire(
      this._context.negotiateClaimLock,
      () => {
        this.checkIfConnectionReady();
        return this._context.cbsSession.negotiateClaim(
          this.audience,
          tokenObject.token,
          tokenType,
          {
            abortSignal,
            timeoutInMs: timeoutInMs - (Date.now() - startTime),
          }
        );
      },
      {
        abortSignal,
        timeoutInMs: timeoutInMs - (Date.now() - startTime),
      }
    );
    this._logger.verbose(
      "%s Negotiated claim for %s '%s' with with address: %s",
      this.logPrefix,
      this._type,
      this.name,
      this.address
    );
    if (setTokenRenewal) {
      this._ensureTokenRenewal();
    }
  }

  /**
   * Checks to see if the connection is in a "reopening" state. If it is
   * we need to _not_ use it otherwise we'll trigger some race conditions
   * within rhea (for instance, errors about _process not being defined).
   */
  private checkIfConnectionReady(): void {
    if (!this._context.isConnectionClosing()) {
      return;
    }

    this._logger.verbose(
      `${this._logPrefix} Connection is reopening, aborting link initialization.`
    );
    const err = new ServiceBusError(
      "Connection is reopening, aborting link initialization.",
      "GeneralError"
    );
    err.retryable = true;
    throw err;
  }

  /**
   * Ensures that the token is renewed within the predefined renewal margin.
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
        await this._negotiateClaim({
          setTokenRenewal: true,
          abortSignal: undefined,
          timeoutInMs: Constants.defaultOperationTimeoutInMs,
        });
      } catch (err) {
        this._logger.logError(
          err,
          "%s %s '%s' with address %s, an error occurred while renewing the token",
          this.logPrefix,
          this._type,
          this.name,
          this.address
        );
      }
    }, this._tokenTimeout);
    this._logger.verbose(
      "%s %s '%s' with address %s, has next token renewal in %d milliseconds @(%s).",
      this.logPrefix,
      this._type,
      this.name,
      this.address,
      this._tokenTimeout,
      new Date(Date.now() + this._tokenTimeout).toString()
    );
  }
}
