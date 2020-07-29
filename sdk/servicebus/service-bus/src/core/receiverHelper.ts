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
  private _stopReceivingMessages: boolean = false;

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
  public addCredit(credits: number): boolean {
    const receiver = this._getCurrentReceiver();

    if (this._stopReceivingMessages || receiver == null) {
      return false;
    }

    receiver.addCredit(credits);
    return true;
  }

  /**
   * Prevents us from receiving any further messages.
   */
  public async stopReceivingMessages(): Promise<void> {
    const receiver = this._getCurrentReceiver();

    if (receiver == null) {
      return;
    }

    log.receiver(
      `[${receiver.name}] User has requested to stop receiving new messages, attempting to drain the credits.`
    );
    this._stopReceivingMessages = true;

    return this.drain();
  }

  /**
   * Initiates a drain for the current receiver and resolves when
   * the drain has completed.
   */
  public async drain(): Promise<void> {
    const receiver = this._getCurrentReceiver();

    if (receiver == null) {
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
}
