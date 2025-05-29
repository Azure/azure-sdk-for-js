"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessageSettled = onMessageSettled;
exports.createReceiverOptions = createReceiverOptions;
const serviceBusError_js_1 = require("../serviceBusError.js");
const log_js_1 = require("../log.js");
const core_amqp_1 = require("@azure/core-amqp");
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
function onMessageSettled(logPrefix, delivery, deliveryDispositionMap) {
    if (delivery) {
        const id = delivery.id;
        const state = delivery.remote_state;
        const settled = delivery.remote_settled;
        log_js_1.receiverLogger.verbose("%s Delivery with id %d, remote_settled: %s, remote_state: %o has been " + "received.", logPrefix, id, settled, state && state.error ? state.error : state);
        if (settled && deliveryDispositionMap.has(id)) {
            const promise = deliveryDispositionMap.get(id);
            clearTimeout(promise.timer);
            log_js_1.receiverLogger.verbose("%s Found the delivery with id %d in the map and cleared the timer.", logPrefix, id);
            const deleteResult = deliveryDispositionMap.delete(id);
            log_js_1.receiverLogger.verbose("%s Successfully deleted the delivery with id %d from the map.", logPrefix, id, deleteResult);
            if (state && state.error && (state.error.condition || state.error.description)) {
                const error = (0, serviceBusError_js_1.translateServiceBusError)(state.error);
                return promise.reject(error);
            }
            return promise.resolve();
        }
    }
}
// Placed in Service Bus for now and can be promoted to core-amqp if also useful for Event Hubs in the future.
const timeoutName = `${core_amqp_1.Constants.vendorString}:timeout`;
/**
 * Creates the options that need to be specified while creating an AMQP receiver link.
 *
 * @internal
 */
function createReceiverOptions(name, receiveMode, source, clientId, handlers, timeoutInMs) {
    const properties = timeoutInMs !== undefined
        ? { [core_amqp_1.Constants.receiverIdentifierName]: clientId, [timeoutName]: timeoutInMs }
        : { [core_amqp_1.Constants.receiverIdentifierName]: clientId };
    const rcvrOptions = Object.assign({ name, 
        // "autoaccept" being true in the "receiveAndDelete" mode sets the "settled" flag to true on the deliveries
        // which helps in clearing the circular buffer(size=2048) as it is needed to receive messages after 2048 of them are received.
        autoaccept: receiveMode === "receiveAndDelete" ? true : false, 
        // receiveAndDelete -> first(0), peekLock -> second (1)
        rcv_settle_mode: receiveMode === "receiveAndDelete" ? 0 : 1, 
        // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
        snd_settle_mode: receiveMode === "receiveAndDelete" ? 1 : 0, source, target: clientId, credit_window: 0, properties }, handlers);
    return rcvrOptions;
}
//# sourceMappingURL=shared.js.map