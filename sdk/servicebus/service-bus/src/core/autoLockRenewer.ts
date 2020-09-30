// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionContext } from "../connectionContext";
import { logger } from "../log";
import { InternalReceiveMode, ServiceBusMessageImpl } from "../serviceBusMessage";
import { logError } from "../util/errors";
import { calculateRenewAfterDuration } from "../util/utils";
import { LinkEntity } from "./linkEntity";
import { ReceiveOptions } from "./messageReceiver";

/**
 * @internal
 * @ignore
 */
export type RenewableMessageProperties = Pick<
  ServiceBusMessageImpl,
  "lockToken" | "messageId" | "lockedUntilUtc"
>;

/**
 * Tracks locks for messages, renewing until a configurable duration.
 *
 * @internal
 * @ignore
 */
export class AutoLockRenewer {
  /**
   * @property {Map<string, Function>} _messageRenewLockTimers Maintains a map of messages for which
   * the lock is automatically renewed.
   */
  private _messageRenewLockTimers: Map<string, NodeJS.Timer | undefined> = new Map<
    string,
    NodeJS.Timer | undefined
  >();

  constructor(
    private _linkEntity: Pick<LinkEntity<any>, "name" | "logPrefix" | "entityPath">,
    private _context: Pick<ConnectionContext, "getManagementClient">,
    private _maxAutoRenewDurationInMs: number
  ) {}

  /**
   * Creates an AutoLockRenewer.
   *
   * @param linkEntity Your link entity instance (probably 'this')
   * @param context The connection context for your link entity (probably 'this._context')
   * @param options The ReceiveOptions passed through to your message receiver.
   * @returns if the lock mode is peek lock (or if is unspecified, thus defaulting to peekLock)
   * and the options.maxAutoRenewLockDurationInMs is > 0..Otherwise, returns undefined.
   */
  static create(
    linkEntity: Pick<LinkEntity<any>, "name" | "logPrefix" | "entityPath">,
    context: Pick<ConnectionContext, "getManagementClient">,
    options?: Pick<ReceiveOptions, "receiveMode" | "maxAutoRenewLockDurationInMs">
  ) {
    if (options?.receiveMode === InternalReceiveMode.receiveAndDelete) {
      return undefined;
    }

    const maxAutoRenewDurationInMs =
      options?.maxAutoRenewLockDurationInMs != null
        ? options.maxAutoRenewLockDurationInMs
        : 300 * 1000;

    if (maxAutoRenewDurationInMs <= 0) {
      return undefined;
    }

    return new AutoLockRenewer(linkEntity, context, maxAutoRenewDurationInMs);
  }

  /**
   * Cancels all pending lock renewals and removes all entries from our internal cache.
   */
  stopAll() {
    logger.verbose(
      `${this._linkEntity.logPrefix} Clearing message renew lock timers for all the active messages.`
    );

    for (const messageId of this._messageRenewLockTimers.keys()) {
      this._stopAndRemoveById(messageId);
    }
  }

  /**
   * Stops lock renewal for a single message.
   *
   * @param bMessage The message whose lock renewal we will stop.
   */
  stop(bMessage: RenewableMessageProperties) {
    const messageId = bMessage.messageId as string;
    this._stopAndRemoveById(messageId);
  }

  /**
   * Starts lock renewal for a single message.
   *
   * @param bMessage The message whose lock renewal we will start.
   */
  start(bMessage: RenewableMessageProperties) {
    const logPrefix = this._linkEntity.logPrefix;

    if (bMessage.lockToken == null) {
      throw new Error(
        `Can't start auto lock renewal for message ${bMessage.messageId} since it does not have a lock token.`
      );
    }

    const lockToken = bMessage.lockToken;
    // - We need to renew locks before they expire by looking at bMessage.lockedUntilUtc.
    // - This autorenewal needs to happen **NO MORE** than maxAutoRenewDurationInMs
    // - We should be able to clear the renewal timer when the user's message handler
    // is done (whether it succeeds or fails).
    // Setting the messageId with undefined value in the _messageRenewockTimers Map because we
    // track state by checking the presence of messageId in the map. It is removed from the map
    // when an attempt is made to settle the message (either by the user or by the sdk) OR
    // when the execution of user's message handler completes.
    this._messageRenewLockTimers.set(bMessage.messageId as string, undefined);
    logger.verbose(
      `${logPrefix} message with id '${
        bMessage.messageId
      }' is locked until ${bMessage.lockedUntilUtc!.toString()}.`
    );
    const totalAutoLockRenewDuration = Date.now() + this._maxAutoRenewDurationInMs;
    logger.verbose(
      `${logPrefix} Total autolockrenew duration for message with id '${
        bMessage.messageId
      }' is: ${new Date(totalAutoLockRenewDuration).toString()}`
    );
    const autoRenewLockTask = (): void => {
      if (
        new Date(totalAutoLockRenewDuration) > bMessage.lockedUntilUtc! &&
        Date.now() < totalAutoLockRenewDuration
      ) {
        if (this._messageRenewLockTimers.has(bMessage.messageId as string)) {
          // TODO: We can run into problems with clock skew between the client and the server.
          // It would be better to calculate the duration based on the "lockDuration" property
          // of the queue. However, we do not have the management plane of the client ready for
          // now. Hence we rely on the lockedUntilUtc property on the message set by ServiceBus.
          const amount = calculateRenewAfterDuration(bMessage.lockedUntilUtc!);
          logger.verbose(
            `${logPrefix} Sleeping for %d milliseconds while renewing the lock for message with id '${bMessage.messageId}' is: ${amount}`
          );
          // Setting the value of the messageId to the actual timer. This will be cleared when
          // an attempt is made to settle the message (either by the user or by the sdk) OR
          // when the execution of user's message handler completes.
          this._messageRenewLockTimers.set(
            bMessage.messageId as string,
            setTimeout(async () => {
              try {
                logger.verbose(
                  `${logPrefix} Attempting to renew the lock for message with id '${bMessage.messageId}'.`
                );
                bMessage.lockedUntilUtc = await this._context
                  .getManagementClient(this._linkEntity.entityPath)
                  .renewLock(lockToken, {
                    associatedLinkName: this._linkEntity.name
                  });
                logger.verbose(
                  `${logPrefix} Successfully renewed the lock for message with id '${bMessage.messageId}'. Starting next auto-lock-renew cycle for message.`
                );
                autoRenewLockTask();
              } catch (err) {
                logError(
                  err,
                  `${logPrefix} An error occured while auto renewing the message lock '${bMessage.lockToken}' for message with id '${bMessage.messageId}'`
                );
                throw err;
              }
            }, amount)
          );
        } else {
          logger.verbose(
            `${logPrefix} Looks like the message lock renew timer has already been cleared for message with id '${bMessage.messageId}'.`
          );
        }
      } else {
        logger.verbose(
          `${logPrefix} Current time ${new Date()} exceeds the total autolockrenew duration ${new Date(
            totalAutoLockRenewDuration
          )} for message with messageId '${
            bMessage.messageId
          }'. Hence we will stop the autoLockRenewTask.`
        );

        this.stop(bMessage);
      }
    };
    // start
    autoRenewLockTask();
  }

  private _stopAndRemoveById(messageId: string | undefined): void {
    if (messageId == null) {
      throw new Error("Failed to stop auto lock renewal - no message ID");
    }

    // TODO: messageId doesn't actually need to be unique. Perhaps we should use lockToken
    // instead?
    if (this._messageRenewLockTimers.has(messageId)) {
      clearTimeout(this._messageRenewLockTimers.get(messageId) as NodeJS.Timer);
      logger.verbose(
        `${this._linkEntity.logPrefix} Cleared the message renew lock timer for message with id '${messageId}'.`
      );
      this._messageRenewLockTimers.delete(messageId);
    }
  }
}
