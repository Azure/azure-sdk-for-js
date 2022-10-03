// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AwaitableSender, Receiver } from "rhea-promise";
import { Constants, TokenType, defaultCancellableLock, isSasTokenProvider } from "@azure/core-amqp";
import { AbortSignalLike } from "@azure/abort-controller";
import { AccessToken } from "@azure/core-auth";
import { ConnectionContext } from "./connectionContext";
import { getRetryAttemptTimeoutInMs } from "./util/retries";
import { logger } from "./log";
import { v4 as uuid } from "uuid";

/**
 * @internal
 */
export interface LinkEntityOptions {
  /**
   * The unique name for the entity. If not provided then a guid will be
   * assigned.
   */
  name?: string;
  /**
   * The partitionId associated with the link entity.
   */
  partitionId?: string;
  /**
   * The link entity address in one of the following forms:
   */
  address?: string;
  /**
   * The link entity token audience in one of the following forms:
   */
  audience?: string;
}

/**
 * Describes the base class for entities like EventHub Sender, Receiver and Management link.
 * @internal
 */
export class LinkEntity {
  /**
   * The unique name for the entity (mostly a guid).
   */
  name: string;
  /**
   * The link entity address in one of the following forms:
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
   * The link entity token audience in one of the following forms:
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
   * The partitionId associated with the link entity.
   */
  partitionId?: string;
  /**
   * Indicates whether the link is in the process of connecting
   * (establishing) itself. Default value: `false`.
   */
  isConnecting: boolean = false;
  /**
   * Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   */
  protected _context: ConnectionContext;
  /**
   * The token renewal timer that keeps track of when
   * the Link Entity is due for token renewal.
   */
  protected _tokenRenewalTimer?: NodeJS.Timer;
  /**
   * Indicates token timeout in milliseconds
   */
  protected _tokenTimeoutInMs?: number;
  /**
   * Creates a new LinkEntity instance.
   * @param context - The connection context.
   * @param options - Options that can be provided while creating the LinkEntity.
   */
  constructor(context: ConnectionContext, options?: LinkEntityOptions) {
    if (!options) options = {};
    this._context = context;
    this.address = options.address || "";
    this.audience = options.audience || "";
    this.name = `${options.name}-${uuid()}`;
    this.partitionId = options.partitionId;
  }

  /**
   * Negotiates cbs claim for the LinkEntity.
   * @returns Promise<void>
   */
  protected async _negotiateClaim({
    abortSignal,
    setTokenRenewal,
    timeoutInMs,
  }: {
    setTokenRenewal: boolean | undefined;
    abortSignal: AbortSignalLike | undefined;
    timeoutInMs: number;
  }): Promise<void> {
    // Acquire the lock and establish a cbs session if it does not exist on the connection.
    // Although node.js is single threaded, we need a locking mechanism to ensure that a
    // race condition does not happen while creating a shared resource (in this case the
    // cbs session, since we want to have exactly 1 cbs session per connection).
    logger.verbose(
      "[%s] Acquiring cbs lock: '%s' for creating the cbs session while creating the %s: " +
        "'%s' with address: '%s'.",
      this._context.connectionId,
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
          return this._context.cbsSession.init({
            abortSignal,
            timeoutInMs: timeoutInMs - (Date.now() - startTime),
          });
        },
        {
          abortSignal,
          timeoutInMs,
        }
      );
    }
    let tokenObject: AccessToken;
    let tokenType: TokenType;
    if (isSasTokenProvider(this._context.tokenCredential)) {
      tokenObject = this._context.tokenCredential.getToken(this.audience);
      tokenType = TokenType.CbsTokenTypeSas;

      // renew sas token in every 45 minutess
      this._tokenTimeoutInMs = (3600 - 900) * 1000;
    } else {
      const aadToken = await this._context.tokenCredential.getToken(Constants.aadEventHubsScope);
      if (!aadToken) {
        throw new Error(`Failed to get token from the provided "TokenCredential" object`);
      }
      tokenObject = aadToken;
      tokenType = TokenType.CbsTokenTypeJwt;
      this._tokenTimeoutInMs = tokenObject.expiresOnTimestamp - Date.now() - 2 * 60 * 1000;
    }

    logger.verbose(
      "[%s] %s: calling negotiateClaim for audience '%s'.",
      this._context.connectionId,
      this._type,
      this.audience
    );
    // Acquire the lock to negotiate the CBS claim.
    logger.verbose(
      "[%s] Acquiring cbs lock: '%s' for cbs auth for %s: '%s' with address '%s'.",
      this._context.connectionId,
      this._context.negotiateClaimLock,
      this._type,
      this.name,
      this.address
    );
    await defaultCancellableLock.acquire(
      this._context.negotiateClaimLock,
      () => {
        return this._context.cbsSession.negotiateClaim(
          this.audience,
          tokenObject.token,
          tokenType,
          { abortSignal, timeoutInMs: timeoutInMs - (Date.now() - startTime) }
        );
      },
      {
        abortSignal,
        timeoutInMs: timeoutInMs - (Date.now() - startTime),
      }
    );
    logger.verbose(
      "[%s] Negotiated claim for %s '%s' with with address: %s",
      this._context.connectionId,
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
   */
  protected _ensureTokenRenewal(): void {
    if (!this._tokenTimeoutInMs) {
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
          timeoutInMs: getRetryAttemptTimeoutInMs(undefined),
        });
      } catch (err: any) {
        logger.verbose(
          "[%s] %s '%s' with address %s, an error occurred while renewing the token: %O",
          this._context.connectionId,
          this._type,
          this.name,
          this.address,
          err
        );
      }
    }, this._tokenTimeoutInMs);
    logger.verbose(
      "[%s] %s '%s' with address %s, has next token renewal in %d milliseconds @(%s).",
      this._context.connectionId,
      this._type,
      this.name,
      this.address,
      this._tokenTimeoutInMs,
      new Date(Date.now() + this._tokenTimeoutInMs).toString()
    );
  }

  /**
   * Closes the Sender|Receiver link and it's underlying session and also removes it from the
   * internal map.
   * @param link - The Sender or Receiver link that needs to be closed and
   * removed.
   */
  protected async _closeLink(link?: AwaitableSender | Receiver): Promise<void> {
    clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
    if (link) {
      try {
        // Closing the link and its underlying session if the link is open. This should also
        // remove them from the internal map.
        await link.close();
        logger.verbose(
          "[%s] %s '%s' with address '%s' closed.",
          this._context.connectionId,
          this._type,
          this.name,
          this.address
        );
      } catch (err: any) {
        logger.verbose(
          "[%s] An error occurred while closing the %s '%s' with address '%s': %O",
          this._context.connectionId,
          this._type,
          this.name,
          this.address,
          err
        );
      }
    }
  }

  /**
   * Provides the current type of the LinkEntity.
   * @returns The entity type.
   */
  private get _type(): string {
    let result = "LinkEntity";
    if ((this as any).constructor && (this as any).constructor.name) {
      result = (this as any).constructor.name;
    }
    return result;
  }
}
