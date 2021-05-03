// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Delivery, ReceiverOptions, Source } from "rhea-promise";
import { translateServiceBusError } from "../serviceBusError";
import { logger, receiverLogger } from "../log";
import { ReceiveMode } from "../models";
import { Receiver } from "rhea-promise";
import { OnError } from "./messageReceiver";
import { StreamingReceiverHelper } from "./streamingReceiverHelper";

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
  "Failed to fetch new messages as the limit for unsettled messages is reached. Please settle received messages using settlement methods(such as `completeMessage()`) on the receiver to receive the next message.";

/**
 * Returns the number of empty/filled slots in the Circular buffer of incoming deliveries
 * based on the capacity and size of the buffer.
 *
 * @internal
 */
export function incomingBufferProperties(
  receiver: Pick<Receiver, "session"> | undefined
): {
  numberOfEmptySlots: number; // 2048(total) - filled
  numberOfFilledSlots: number; // number of unsettled messages
} {
  const incomingDeliveries = receiver?.session?.incoming?.deliveries;
  let numberOfEmptySlots = 0;
  if (incomingDeliveries && incomingDeliveries.capacity - 1 > incomingDeliveries.size) {
    // Exmpty slots should have been `incomingDeliveries.capacity - 1 - incomingDeliveries.size`. Why -1?
    // - If the number of slots is set to (capacity - size),
    //   the number of unsettled messages that can be held in the buffer would equal to the "capacity".
    //   At that limiting point, service doesn't respond to the drain request for unpartitioned queues.
    //   Service team is tracking the issue.
    // -1 allows us to not fill up the buffer entirely, it fills up to 2047 if the capacity is 2048
    numberOfEmptySlots = incomingDeliveries.capacity - 1 - incomingDeliveries.size;
  }
  return {
    numberOfEmptySlots,
    numberOfFilledSlots: incomingDeliveries ? incomingDeliveries.size : 0
  };
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
    private streamingReceiverHelper: StreamingReceiverHelper,
    private receiveMode: ReceiveMode,
    private maxConcurrentCalls: number
  ) {}

  addCreditsInit() {
    const { receiver, logPrefix } = this._getCurrentReceiver();
    const emptySlots = incomingBufferProperties(receiver).numberOfEmptySlots;
    const creditsToAdd =
      this.receiveMode === "peekLock"
        ? Math.min(this.maxConcurrentCalls, emptySlots)
        : this.maxConcurrentCalls;
    this.streamingReceiverHelper.addCredit(creditsToAdd);
    logger.verbose(
      `${logPrefix} creditManager: added ${creditsToAdd} credits (initial); total credits = ${receiver?.credit}`
    );
  }
  /**
   * Upon receiving a new message, this method can be called to add credits to receive more messages.
   *
   * @internal
   */
  onReceive(_notifyError: OnError | undefined) {
    const { receiver, logPrefix } = this._getCurrentReceiver();
    if (this.receiveMode === "receiveAndDelete") {
      this.streamingReceiverHelper.addCredit(1);
      logger.verbose(
        `${logPrefix} creditManager: added 1 credits upon receiving a message; total credits = ${receiver?.credit}`
      );
      return;
    }

    const { numberOfEmptySlots } = incomingBufferProperties(receiver);
    if (receiver && numberOfEmptySlots > 0) {
      const possibleMaxCredits = Math.min(this.maxConcurrentCalls, numberOfEmptySlots);
      if (possibleMaxCredits > receiver.credit) {
        const creditsToAdd = possibleMaxCredits - receiver.credit;
        this.streamingReceiverHelper.addCredit(creditsToAdd);
        logger.verbose(
          `${logPrefix} creditManager: added ${creditsToAdd} credits upon receiving a message; total credits = ${receiver?.credit}`
        );
      }
      return;
    }

    // if (receiver) {
    // No empty slots left, so notify the user with an error
    // Commented out because we want to be consistent with other languages
    // notifyError?.({
    //   error: new ServiceBusError(
    //     UnsettledMessagesLimitExceededError,
    //     "UnsettledMessagesLimitExceeded" as ServiceBusErrorCode
    //   ),
    //   errorSource: "receive",
    //   entityPath: this.entityPath,
    //   fullyQualifiedNamespace: this.fullyQualifiedNamespace
    // });
    // } else {
    // receiver is not defined
    // SessionLockLost for sessions/onAMQPError for non-sessions will be notified in one of the listeners - nothing to do here
    // }
  }

  /**
   * Meant to be called after a message is settled with the receive link.
   * Replenishes the number of credits on the link to receive more messages.
   *
   * @internal
   */
  postProcessing() {
    const { receiver, logPrefix } = this._getCurrentReceiver();
    const { numberOfEmptySlots } = incomingBufferProperties(receiver);
    if (this.receiveMode === "peekLock") {
      if (receiver && numberOfEmptySlots > 0) {
        const possibleMaxCredits = Math.min(this.maxConcurrentCalls, numberOfEmptySlots);
        if (possibleMaxCredits > receiver.credit) {
          const creditsToAdd = possibleMaxCredits - receiver.credit;
          this.streamingReceiverHelper.addCredit(creditsToAdd);
          logger.verbose(
            `${logPrefix} creditManager: added ${creditsToAdd} credits after message settlement; total credits = ${receiver?.credit}`
          );
        }
      }
    }
  }
}
