"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMessageContent = isMessageContent;
function isMessageContent(message) {
    const castMessage = message;
    return castMessage.data !== undefined && castMessage.contentType !== undefined;
}
//# sourceMappingURL=utility.js.map