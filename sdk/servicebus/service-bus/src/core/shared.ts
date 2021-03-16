// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Delivery, ReceiverOptions, Source } from "rhea-promise";
import { ServiceBusError, translateServiceBusError } from "../serviceBusError";
import { receiverLogger } from "../log";
import { ReceiveMode } from "../models";
import { Receiver } from "rhea-promise";
import { OnError } from "./messageReceiver";
import { ReceiverHelper } from "./receiverHelper";
import { delay } from "@azure/core-amqp";

/**
 * @internal
 */
export type ReceiverHandlers = Pick<
  ReceiverOptions,
  "onMessage" | "onError" | "onClose" | "onSessionError" | "onSessionClose" | "onSettled"
>;

/**
 * @internal
 */
export interface DeferredPromiseAndTimer {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  timer: NodeJS.Timer;
}

/**
 * This is the shared onSettled handler for all of the receiver implementations.
 *
 * The sequence is basically:
 * 1. User calls `await <ServiceBusMessage instance>.complete()`     (or other settlement methods)
 * 2. This creates a `Promise` that gets stored in the _deliveryDispositionMap
 * 3. When the service acknowledges the settlement this method gets called for that message.
 * 4. We resolve() the promise from the _deliveryDispositionMap.
 * 5. User's code after the settlement continues.
 *
 * @internal
 */
export function onMessageSettled(
  logPrefix: string,
  delivery: Delivery | undefined,
  deliveryDispositionMap: Map<number, DeferredPromiseAndTimer>
): void {
  if (delivery) {
    const id = delivery.id;
    const state = delivery.remote_state;
    const settled = delivery.remote_settled;
    receiverLogger.verbose(
      "%s Delivery with id %d, remote_settled: %s, remote_state: %o has been " + "received.",
      logPrefix,
      id,
      settled,
      state && state.error ? state.error : state
    );
    if (settled && deliveryDispositionMap.has(id)) {
      const promise = deliveryDispositionMap.get(id) as DeferredPromiseAndTimer;
      clearTimeout(promise.timer);
      receiverLogger.verbose(
        "%s Found the delivery with id %d in the map and cleared the timer.",
        logPrefix,
        id
      );
      const deleteResult = deliveryDispositionMap.delete(id);
      receiverLogger.verbose(
        "%s Successfully deleted the delivery with id %d from the map.",
        logPrefix,
        id,
        deleteResult
      );
      if (state && state.error && (state.error.condition || state.error.description)) {
        const error = translateServiceBusError(state.error);
        return promise.reject(error);
      }

      return promise.resolve();
    }
  }
}

/**
 * Creates the options that need to be specified while creating an AMQP receiver link.
 *
 * @internal
 */
export function createReceiverOptions(
  name: string,
  receiveMode: ReceiveMode,
  source: Source,
  handlers: ReceiverHandlers
): ReceiverOptions {
  const rcvrOptions: ReceiverOptions = {
    name,
    // "autoaccept" being true in the "receiveAndDelete" mode sets the "settled" flag to true on the deliveries
    // which helps in clearing the circular buffer(size=2048) as it is needed to receive messages after 2048 of them are received.
    autoaccept: receiveMode === "receiveAndDelete" ? true : false,
    // receiveAndDelete -> first(0), peekLock -> second (1)
    rcv_settle_mode: receiveMode === "receiveAndDelete" ? 0 : 1,
    // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
    snd_settle_mode: receiveMode === "receiveAndDelete" ? 1 : 0,
    source,
    credit_window: 0,
    ...handlers
  };

  return rcvrOptions;
}

export const UnsettledMessagesLimitExceededError =
  "Failed to fetch new messages as the limit for unsettled messages is reached. Please settle received messages using settlement methods on the receiver to receive the next message.";

/**
 * Returns the number of empty slots in the Circular buffer of incoming deliveries
 * based on the capacity and size of the buffer.
 *
 * @internal
 */
export function numberOfEmptyIncomingSlots(
  receiver: Pick<Receiver, "session"> | undefined
): number {
  const incomingDeliveries = receiver?.session?.incoming?.deliveries;
  return incomingDeliveries ? incomingDeliveries.capacity - incomingDeliveries.size : 0;
}

/**
 * Provides helper methods to manage the credits on the link for the
 * streaming messages scenarios.
 * (Used by both sessions(MessageSession) and non-sessions(StreamingReceiver))
 *
 * @internal
 */
export class StreamingReceiverCreditManager {
  constructor(
    private _getCurrentReceiver: () => { receiver: Receiver | undefined; logPrefix: string },
    private receiverHelper: ReceiverHelper,
    private receiveMode: ReceiveMode,
    private entityPath: string,
    private fullyQualifiedNamespace: string
  ) {}

  addCreditsInit(maxConcurrentCalls: number) {
    const emptySlots = numberOfEmptyIncomingSlots(this._getCurrentReceiver().receiver);
    this.receiverHelper.addCredit(
      this.receiveMode === "peekLock"
        ? Math.min(maxConcurrentCalls, emptySlots <= 1 ? 0 : emptySlots - 1)
        : maxConcurrentCalls
    );
    // TODO: Add log message
  }
  /**
   * Upon receiving a new message, this method can be called to add a credit to receive one more message.
   * If no empty slots, calls the onError callback with the `UnsettledMessagesLimitExceeded` error to
   * let users know about the excess unsettled messages.
   *
   * @internal
   */
  onReceive(notifyError: OnError | undefined) {
    const receiver = this._getCurrentReceiver().receiver;
    if (this.receiveMode === "receiveAndDelete" || numberOfEmptyIncomingSlots(receiver) > 1) {
      this.receiverHelper.addCredit(1);
    } else if (receiver) {
      notifyError?.({
        error: new ServiceBusError(
          UnsettledMessagesLimitExceededError,
          "UnsettledMessagesLimitExceeded"
        ),
        errorSource: "receive",
        entityPath: this.entityPath,
        fullyQualifiedNamespace: this.fullyQualifiedNamespace
      });
    } else {
      // Link doesn't exist
      // SessionLockLost for sessions/onAMQPError for non-sessions will be notified in one of the listeners
      // So, not notifying here
      // TODO: Validate above
    }
  }

  /**
   * After processing the message, if no empty slots,
   * - keeps checking if the link has more empty slots in a loop with a delay of 1 sec,
   * - adds a credit if there are empty slots.
   *
   * @internal
   */
  async postProcessing() {
    const receiver = this._getCurrentReceiver().receiver;
    if (this.receiveMode === "peekLock" && numberOfEmptyIncomingSlots(receiver) <= 1) {
      // Wait for the user to clear the deliveries before adding more credits
      while (receiver?.isOpen() && numberOfEmptyIncomingSlots(receiver) <= 1) {
        // TODO: check for canReceiveMessages too to exit from the loop
        await delay(1000); // TODO: Not have hard-coded 1000ms as delay - move it to constants maybe
      }
      // TODO: Instead of adding one credit, make it maxConcurrentCalls
      // Example:
      //   - Suppose maxConcurrentCalls=1000 and the user is not settling the messages
      //   - After 2048 messages, 1000 while loops are running(for all the processMessage callbacks) so that they can do their part of adding a credit
      //   - Instead, replenish with maxConcurrentCalls with a single while loop and end the rest of the processMessage callbacks
      this.receiverHelper.addCredit(1);
    }
  }
}
