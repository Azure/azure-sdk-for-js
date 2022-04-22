// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConnectionContext } from "../connectionContext";
import { receiverLogger as logger } from "../log";
import { ServiceBusMessageImpl } from "../serviceBusMessage";
import { calculateRenewAfterDuration } from "../util/utils";
import { LinkEntity } from "./linkEntity";
import { OnErrorNoContext } from "./messageReceiver";

/**
 * @internal
 */
export type RenewableMessageProperties = Readonly<
  Pick<ServiceBusMessageImpl, "lockToken" | "messageId">
> &
  // updated when we renew the lock
  Pick<ServiceBusMessageImpl, "lockedUntilUtc">;

/**
 * @internal
 */
type MinimalLink = Pick<LinkEntity<any>, "name" | "logPrefix" | "entityPath">;

/**
 * Tracks locks for messages, renewing until a configurable duration.
 *
 * @internal
 */
export class LockRenewer {
  /**
   * A map of link names to individual maps for each
   * link that map a message ID to its auto-renewal timer.
   */
  private _messageRenewLockTimers: Map<string, Map<string, NodeJS.Timer | undefined>> = new Map<
    string,
    Map<string, NodeJS.Timer | undefined>
  >();

  // just here for make unit testing a bit easier.
  private _calculateRenewAfterDuration: typeof calculateRenewAfterDuration;

  constructor(
    private _context: Pick<ConnectionContext, "getManagementClient">,
    private _maxAutoRenewDurationInMs: number
  ) {
    this._calculateRenewAfterDuration = calculateRenewAfterDuration;
  }

  /**
   * Creates an AutoLockRenewer.
   *
   * @param linkEntity - Your link entity instance (probably 'this')
   * @param context - The connection context for your link entity (probably 'this._context')
   * @param options - The ReceiveOptions passed through to your message receiver.
   * @returns if the lock mode is peek lock (or if is unspecified, thus defaulting to peekLock)
   * and the options.maxAutoLockRenewalDurationInMs is greater than 0..Otherwise, returns undefined.
   */
  static create(
    context: Pick<ConnectionContext, "getManagementClient">,
    maxAutoRenewLockDurationInMs: number,
    receiveMode: "peekLock" | "receiveAndDelete"
  ): LockRenewer | undefined {
    if (receiveMode !== "peekLock") {
      return undefined;
    }

    if (maxAutoRenewLockDurationInMs <= 0) {
      return undefined;
    }

    return new LockRenewer(context, maxAutoRenewLockDurationInMs);
  }

  /**
   * Cancels all pending lock renewals for messages on given link and removes all entries from our internal cache.
   */
  stopAll(linkEntity: MinimalLink): void {
    logger.verbose(
      `${linkEntity.logPrefix} Clearing message renew lock timers for all the active messages.`
    );

    const messagesForLink = this._messageRenewLockTimers.get(linkEntity.name);

    if (messagesForLink == null) {
      return;
    }

    for (const messageId of messagesForLink.keys()) {
      this._stopAndRemoveById(linkEntity, messagesForLink, messageId);
    }

    this._messageRenewLockTimers.delete(linkEntity.name);
  }

  /**
   * Stops lock renewal for a single message.
   *
   * @param bMessage - The message whose lock renewal we will stop.
   */
  stop(linkEntity: MinimalLink, bMessage: RenewableMessageProperties): void {
    const messageId = bMessage.messageId as string;

    const messagesForLink = this._messageRenewLockTimers.get(linkEntity.name);

    if (messagesForLink == null) {
      return;
    }

    this._stopAndRemoveById(linkEntity, messagesForLink, messageId);
  }

  /**
   * Starts lock renewal for a single message.
   *
   * @param bMessage - The message whose lock renewal we will start.
   */
  start(
    linkEntity: MinimalLink,
    bMessage: RenewableMessageProperties,
    onError: OnErrorNoContext
  ): void {
    try {
      const logPrefix = linkEntity.logPrefix;

      if (bMessage.lockToken == null) {
        throw new Error(
          `Can't start auto lock renewal for message with message id '${bMessage.messageId}' since it does not have a lock token.`
        );
      }

      const lockToken = bMessage.lockToken;
      const linkMessageMap = this._getOrCreateMapForLink(linkEntity);
      // - We need to renew locks before they expire by looking at bMessage.lockedUntilUtc.
      // - This autorenewal needs to happen **NO MORE** than maxAutoRenewDurationInMs
      // - We should be able to clear the renewal timer when the user's message handler
      // is done (whether it succeeds or fails).
      // Setting the messageId with undefined value in the linkMessageMap because we
      // track state by checking the presence of messageId in the map. It is removed from the map
      // when an attempt is made to settle the message (either by the user or by the sdk) OR
      // when the execution of user's message handler completes.
      linkMessageMap.set(bMessage.messageId as string, undefined);

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
        const renewalNeededToMaintainLock =
          // if the lock expires _after_ our max auto-renew duration there's no reason to
          // spin up an auto-renewer - it's already held for the duration.
          new Date(totalAutoLockRenewDuration) > bMessage.lockedUntilUtc!;

        // once we've exceeded the max amount of time we'll renew we can stop.
        const haventExceededMaxLockRenewalTime = Date.now() < totalAutoLockRenewDuration;

        if (renewalNeededToMaintainLock && haventExceededMaxLockRenewalTime) {
          if (linkMessageMap.has(bMessage.messageId as string)) {
            // TODO: We can run into problems with clock skew between the client and the server.
            // It would be better to calculate the duration based on the "lockDuration" property
            // of the queue. However, we do not have the management plane of the client ready for
            // now. Hence we rely on the lockedUntilUtc property on the message set by ServiceBus.
            const amount = this._calculateRenewAfterDuration(bMessage.lockedUntilUtc!);

            logger.verbose(
              `${logPrefix} Sleeping for ${amount} milliseconds while renewing the lock for message with id '${bMessage.messageId}'`
            );
            // Setting the value of the messageId to the actual timer. This will be cleared when
            // an attempt is made to settle the message (either by the user or by the sdk) OR
            // when the execution of user's message handler completes.
            const autoRenewTimer = setTimeout(async () => {
              try {
                logger.verbose(
                  `${logPrefix} Attempting to renew the lock for message with id '${bMessage.messageId}'.`
                );

                bMessage.lockedUntilUtc = await this._context
                  .getManagementClient(linkEntity.entityPath)
                  .renewLock(lockToken, {
                    associatedLinkName: linkEntity.name,
                  });
                logger.verbose(
                  `${logPrefix} Successfully renewed the lock for message with id '${bMessage.messageId}'. Starting next auto-lock-renew cycle for message.`
                );

                autoRenewLockTask();
              } catch (err: any) {
                logger.logError(
                  err,
                  `${logPrefix} An error occurred while auto renewing the message lock '${bMessage.lockToken}' for message with id '${bMessage.messageId}'`
                );
                onError(err);
              }
            }, amount);

            // Prevent the active Timer from keeping the Node.js event loop active.
            if (typeof autoRenewTimer.unref === "function") {
              autoRenewTimer.unref();
            }

            linkMessageMap.set(bMessage.messageId as string, autoRenewTimer);
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

          this.stop(linkEntity, bMessage);
        }
      };

      // start
      autoRenewLockTask();
    } catch (err: any) {
      onError(err);
    }
  }

  private _getOrCreateMapForLink(linkEntity: MinimalLink): Map<string, NodeJS.Timer | undefined> {
    if (!this._messageRenewLockTimers.has(linkEntity.name)) {
      this._messageRenewLockTimers.set(
        linkEntity.name,
        new Map<string, NodeJS.Timer | undefined>()
      );
    }

    return this._messageRenewLockTimers.get(linkEntity.name)!;
  }

  private _stopAndRemoveById(
    linkEntity: MinimalLink,
    linkMessageMap: Map<string, NodeJS.Timer | undefined>,
    messageId: string | undefined
  ): void {
    if (messageId == null) {
      throw new Error("Failed to stop auto lock renewal - no message ID");
    }

    // TODO: messageId doesn't actually need to be unique. Perhaps we should use lockToken
    // instead?
    if (linkMessageMap.has(messageId)) {
      clearTimeout(linkMessageMap.get(messageId) as NodeJS.Timer);
      logger.verbose(
        `${linkEntity.logPrefix} Cleared the message renew lock timer for message with id '${messageId}'.`
      );
      linkMessageMap.delete(messageId);
    }
  }
}
