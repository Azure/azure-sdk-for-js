// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Receiver, ReceiverEvents } from "rhea-promise";
import { receiverLogger as logger } from "../log";
import { ServiceBusError } from "../serviceBusError";

/**
 * Wraps the receiver with some higher level operations for managing state
 * like credits, draining, etc...
 *
 * @internal
 */
export class ReceiverHelper {
  private _isSuspended: boolean = false;

  constructor(
    private _getCurrentReceiver: () => { receiver: Receiver | undefined; logPrefix: string }
  ) {}

  /**
   * Adds credits to the receiver, respecting any state that
   * indicates the receiver is closed or should not continue
   * to receive more messages.
   *
   * @param credits - Number of credits to add.
   * @returns true if credits were added, false if there is no current receiver instance
   * or `stopReceivingMessages` has been called.
   */
  addCredit(credits: number): boolean {
    const { receiver, logPrefix } = this._getCurrentReceiver();

    if (!this.canReceiveMessages()) {
      logger.verbose(
        `${logPrefix} Asked to add ${credits} credits but the receiver is not able to receive messages`
      );
      return false;
    }

    if (!this._isValidReceiver(receiver)) {
      // this is a retryable error (they can recreate a receiver and do this again)
      throw new ServiceBusError(
        "Can't add credits to the receiver. Link will be reinitialized.",
        "GeneralError"
      );
    }

    if (receiver != null) {
      logger.verbose(`${logPrefix} Adding ${credits} credits`);
      receiver.addCredit(credits);
    }

    return true;
  }

  /**
   * Drains the credits for the receiver and prevents the `receiverHelper.addCredit()` method from adding credits.
   * Call `resume()` to enable the `addCredit()` method.
   */
  async suspend(): Promise<void> {
    const { receiver, logPrefix } = this._getCurrentReceiver();

    this._isSuspended = true;

    if (!this._isValidReceiver(receiver)) {
      return;
    }

    logger.verbose(
      `${logPrefix} User has requested to stop receiving new messages, attempting to drain.`
    );
    return this.drain();
  }

  /**
   * Resets tracking so `addCredit` works again.
   */
  resume(): void {
    this._isSuspended = false;
  }

  /**
   * Whether the receiver can receive messages.
   *
   * This checks if the the caller has decided to disable adding
   * credits via 'suspend' as well as whether the receiver itself is
   * still open.
   */
  canReceiveMessages(): boolean {
    const { receiver } = this._getCurrentReceiver();
    return !this._isSuspended && this._isValidReceiver(receiver);
  }

  /**
   * Initiates a drain for the current receiver and resolves when
   * the drain has completed.
   */
  async drain(): Promise<void> {
    const { receiver, logPrefix } = this._getCurrentReceiver();

    if (!this._isValidReceiver(receiver)) {
      return;
    }

    logger.verbose(
      `${logPrefix} Receiver is starting drain. Remaining credits; ${receiver.credit}`
    );

    const drainPromise = new Promise<void>((resolve) => {
      receiver.once(ReceiverEvents.receiverDrained, () => {
        logger.verbose(`${logPrefix} Receiver has been drained.`);
        receiver.drain = false;
        resolve();
      });

      receiver.drain = true;
      // this is not actually adding another credit - it'll just
      // cause the drain call to start.
      receiver.addCredit(1);
    });

    return drainPromise;
  }

  private _isValidReceiver(receiver: Receiver | undefined): receiver is Receiver {
    return receiver != null && receiver.isOpen();
  }
}
