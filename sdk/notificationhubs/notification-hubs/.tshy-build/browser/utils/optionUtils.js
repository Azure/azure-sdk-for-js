// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { objectHasProperty } from "@azure/core-util";
/**
 * Determines whether the options are of type BroadcastSendNotificationOptions.
 * @param options - The options to test if BroadcastSendNotificationOptions.
 * @returns true if BroadcastSendNotificationOptions otherwise false.
 */
export function isBroadcastSendNotificationOptions(options) {
    return objectHasProperty(options, "enableTestSend");
}
/**
 * Determines whether the options are of type SendNotificationOptions.
 * @param options - The options to test if SendNotificationOptions.
 * @returns true if SendNotificationOptions otherwise false.
 */
export function isSendNotificationOptions(options) {
    return (objectHasProperty(options, "tagExpression") || objectHasProperty(options, "enableTestSend"));
}
/**
 * Determines whether the options are of type DirectSendNotificationOptions.
 * @param options - The options to test if DirectSendNotificationOptions.
 * @returns true if DirectSendNotificationOptions otherwise false.
 */
export function isDirectSendNotificationOptions(options) {
    return objectHasProperty(options, "deviceHandle");
}
//# sourceMappingURL=optionUtils.js.map