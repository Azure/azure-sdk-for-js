// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Receiver, ReceiverEvents } from "rhea-promise";
import * as log from "../log";

/**
 * Wraps the receiver with some higher level operations for managing state
 * like credits, draining, etc...
 *
 * @internal
 * @ignore
 */
export class ReceiverHelper {
  private _isSuspended: boolean = false;

  constructor(private _getCurrentReceiver: () => Receiver | undefined) {}

  /**
   * Adds credits to the receiver, respecting any state that
   * indicates the receiver is closed or should not continue
   * to receive more messages.
   *
   * @param credits Number of credits to add.
   * @returns true if credits were added, false if there is no current receiver instance
   * or `stopReceivingMessages` has been called.
   */
  addCredit(credits: number): boolean {
    const receiver = this._getCurrentReceiver();

    if (!this.canReceiveMessages()) {
      return false;
    }

    if (receiver != null) {
      receiver.addCredit(credits);
    }

    return true;
  }

  /**
   * Drains the credits for the receiver and prevents the `receiverHelper.addCredit()` method from adding credits.
   * Call `resume()` to enable the `addCredit()` method.
   */
  async suspend(): Promise<void> {
    const receiver = this._getCurrentReceiver();

    this._isSuspended = true;

    if (!this._isValidReceiver(receiver)) {
      return;
    }

    log.receiver(
      `[${receiver.name}] User has requested to stop receiving new messages, attempting to drain the credits.`
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
    const receiver = this._getCurrentReceiver();
    return !this._isSuspended && this._isValidReceiver(receiver);
  }

  /**
   * Initiates a drain for the current receiver and resolves when
   * the drain has completed.
   */
  async drain(): Promise<void> {
    const receiver = this._getCurrentReceiver();

    if (!this._isValidReceiver(receiver)) {
      return;
    }

    log.receiver(`[${receiver.name}] Receiver is starting drain.`);

    const drainPromise = new Promise<void>((resolve) => {
      receiver.once(ReceiverEvents.receiverDrained, () => {
        log.receiver(`[${receiver.name}] Receiver has been drained.`);
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
