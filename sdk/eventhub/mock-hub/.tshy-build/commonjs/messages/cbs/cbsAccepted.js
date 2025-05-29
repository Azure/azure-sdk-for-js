"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCbsAccepted = createCbsAccepted;
const tslib_1 = require("tslib");
const rhea_1 = tslib_1.__importDefault(require("rhea"));
function createCbsAccepted(options = {}) {
    const amqpMessage = {
        body: undefined,
        application_properties: {
            "status-code": rhea_1.default.types.wrap_int(202),
            "status-description": "Accepted",
        },
    };
    if (options.toLinkName) {
        amqpMessage.to = options.toLinkName;
    }
    if (options.correlationId) {
        amqpMessage.correlation_id = options.correlationId;
    }
    return amqpMessage;
}
//# sourceMappingURL=cbsAccepted.js.map