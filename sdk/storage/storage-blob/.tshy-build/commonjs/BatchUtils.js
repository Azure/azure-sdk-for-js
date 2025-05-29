"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyAsText = getBodyAsText;
exports.utf8ByteLength = utf8ByteLength;
const utils_js_1 = require("./utils/utils.js");
const constants_js_1 = require("./utils/constants.js");
async function getBodyAsText(batchResponse) {
    let buffer = Buffer.alloc(constants_js_1.BATCH_MAX_PAYLOAD_IN_BYTES);
    const responseLength = await (0, utils_js_1.streamToBuffer2)(batchResponse.readableStreamBody, buffer);
    // Slice the buffer to trim the empty ending.
    buffer = buffer.slice(0, responseLength);
    return buffer.toString();
}
function utf8ByteLength(str) {
    return Buffer.byteLength(str);
}
//# sourceMappingURL=BatchUtils.js.map