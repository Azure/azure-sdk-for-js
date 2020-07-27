import { Delivery } from "rhea-promise";
import { translate } from "@azure/core-amqp";
import * as log from "../log";

/**
 * @internal
 * @ignore
 */
export interface PromiseLike {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  timer: NodeJS.Timer;
}

/**
 * @internal
 * @ignore
 */
export function sharedOnSettled(
  connectionId: string,
  delivery: Delivery | undefined,
  deliveryDispositionMap: Map<number, PromiseLike>
) {
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
      const promise = deliveryDispositionMap.get(id) as PromiseLike;
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
