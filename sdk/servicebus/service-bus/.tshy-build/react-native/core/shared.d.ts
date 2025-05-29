import type { Delivery, ReceiverOptions, Source } from "rhea-promise";
import type { ReceiveMode } from "../models.js";
/**
 * @internal
 */
export type ReceiverHandlers = Pick<ReceiverOptions, "onMessage" | "onError" | "onClose" | "onSessionError" | "onSessionClose" | "onSettled">;
/**
 * @internal
 */
export interface DeferredPromiseAndTimer {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
    timer: NodeJS.Timeout;
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
export declare function onMessageSettled(logPrefix: string, delivery: Delivery | undefined, deliveryDispositionMap: Map<number, DeferredPromiseAndTimer>): void;
/**
 * Creates the options that need to be specified while creating an AMQP receiver link.
 *
 * @internal
 */
export declare function createReceiverOptions(name: string, receiveMode: ReceiveMode, source: Source, clientId: string, handlers: ReceiverHandlers, timeoutInMs?: number): ReceiverOptions;
//# sourceMappingURL=shared.d.ts.map