"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBroadcastSendNotificationOptions = isBroadcastSendNotificationOptions;
exports.isSendNotificationOptions = isSendNotificationOptions;
exports.isDirectSendNotificationOptions = isDirectSendNotificationOptions;
const core_util_1 = require("@azure/core-util");
/**
 * Determines whether the options are of type BroadcastSendNotificationOptions.
 * @param options - The options to test if BroadcastSendNotificationOptions.
 * @returns true if BroadcastSendNotificationOptions otherwise false.
 */
function isBroadcastSendNotificationOptions(options) {
    return (0, core_util_1.objectHasProperty)(options, "enableTestSend");
}
/**
 * Determines whether the options are of type SendNotificationOptions.
 * @param options - The options to test if SendNotificationOptions.
 * @returns true if SendNotificationOptions otherwise false.
 */
function isSendNotificationOptions(options) {
    return ((0, core_util_1.objectHasProperty)(options, "tagExpression") || (0, core_util_1.objectHasProperty)(options, "enableTestSend"));
}
/**
 * Determines whether the options are of type DirectSendNotificationOptions.
 * @param options - The options to test if DirectSendNotificationOptions.
 * @returns true if DirectSendNotificationOptions otherwise false.
 */
function isDirectSendNotificationOptions(options) {
    return (0, core_util_1.objectHasProperty)(options, "deviceHandle");
}
//# sourceMappingURL=optionUtils.js.map