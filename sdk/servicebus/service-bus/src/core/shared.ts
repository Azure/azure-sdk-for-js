// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Delivery } from "rhea-promise";
import { translate } from "@azure/core-amqp";
import * as log from "../log";

/**
 * @internal
 * @ignore
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
 * @ignore
 */
export function onMessageSettled(
  connectionId: string,
  delivery: Delivery | undefined,
  deliveryDispositionMap: Map<number, DeferredPromiseAndTimer>
): void {
  if (delivery) {
    const id = delivery.id;
    const state = delivery.remote_state;
    const settled = delivery.remote_settled;
    log.receiver(
      "[%s] Delivery with id %d, remote_settled: %s, remote_state: %o has been " + "received.",
      connectionId,
      id,
      settled,
      state && state.error ? state.error : state
    );
    if (settled && deliveryDispositionMap.has(id)) {
      const promise = deliveryDispositionMap.get(id) as DeferredPromiseAndTimer;
      clearTimeout(promise.timer);
      log.receiver(
        "[%s] Found the delivery with id %d in the map and cleared the timer.",
        connectionId,
        id
      );
      const deleteResult = deliveryDispositionMap.delete(id);
      log.receiver(
        "[%s] Successfully deleted the delivery with id %d from the map.",
        connectionId,
        id,
        deleteResult
      );
      if (state && state.error && (state.error.condition || state.error.description)) {
        const error = translate(state.error);
        return promise.reject(error);
      }

      return promise.resolve();
    }
  }
}
