import type { Receiver } from "rhea-promise";
/**
 * Wraps the receiver with some higher level operations for managing state
 * like credits, draining, etc...
 *
 * @internal
 */
export declare class ReceiverHelper {
    private _getCurrentReceiver;
    private _isSuspended;
    constructor(_getCurrentReceiver: () => {
        receiver: Receiver | undefined;
        logPrefix: string;
    });
    private _getCurrentReceiverOrError;
    /**
     * Adds credits to the receiver, respecting any state that
     * indicates the receiver is closed or should not continue
     * to receive more messages.
     *
     * @param credits - Number of credits to add.
     * or `stopReceivingMessages` has been called.
     */
    addCredit(credits: number): void;
    /**
     * Drains the credits for the receiver and prevents the `receiverHelper.addCredit()` method from adding credits.
     * Call `resume()` to enable the `addCredit()` method.
     */
    suspend(): Promise<void>;
    /**
     * Resets tracking so `addCredit` works again by toggling the `_isSuspended` flag.
     */
    resume(): void;
    isSuspended(): boolean;
    /**
     * Initiates a drain for the current receiver and resolves when
     * the drain has completed.
     *
     * NOTE: This method returns immediately if the receiver is not valid or if there
     * are no pending credits on the receiver (ie: `receiver.credit === 0`).
     */
    drain(): Promise<void>;
    private _isValidReceiver;
}
//# sourceMappingURL=receiverHelper.d.ts.map