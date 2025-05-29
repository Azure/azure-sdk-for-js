"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBufferToMessages = convertBufferToMessages;
const tslib_1 = require("tslib");
const rhea_1 = tslib_1.__importDefault(require("rhea"));
/**
 * Converts `Buffer`s received from `onMessage` events to an array of messages.
 */
function convertBufferToMessages(buf) {
    var _a;
    const amqpMessage = rhea_1.default.message.decode(buf);
    if (!((_a = amqpMessage.body) === null || _a === void 0 ? void 0 : _a.content)) {
        return [amqpMessage];
    }
    if (Array.isArray(amqpMessage.body.content)) {
        return amqpMessage.body.content.map((content) => {
            return rhea_1.default.message.decode(content);
        });
    }
    return [rhea_1.default.message.decode(amqpMessage.body.content)];
}
//# sourceMappingURL=convertBufferToMessage.js.map