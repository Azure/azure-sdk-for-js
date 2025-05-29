"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSendMessageRequest = generateSendMessageRequest;
exports.generateOptOutRequest = generateOptOutRequest;
const uuid_js_1 = require("./uuid.js");
function generateSendMessageRequest(smsRequest, options = {}) {
    var _a, _b;
    const _smsSendOptions = {
        enableDeliveryReport: (_a = options.enableDeliveryReport) !== null && _a !== void 0 ? _a : false,
    };
    if (options.tag) {
        _smsSendOptions["tag"] = options.tag;
    }
    return {
        from: smsRequest.from,
        smsRecipients: smsRequest.to.map((phoneNumberStr) => {
            return {
                to: phoneNumberStr,
                repeatabilityFirstSent: new Date(Date.now()).toUTCString(),
                repeatabilityRequestId: uuid_js_1.Uuid.generateUuid(),
            };
        }),
        message: smsRequest.message,
        smsSendOptions: Object.assign({ enableDeliveryReport: (_b = options.enableDeliveryReport) !== null && _b !== void 0 ? _b : false }, (options.tag && { tag: options.tag })),
    };
}
function generateOptOutRequest(from, to) {
    return {
        from: from,
        recipients: to.map((phoneNumberStr) => {
            return {
                to: phoneNumberStr,
            };
        }),
    };
}
//# sourceMappingURL=smsUtils.js.map