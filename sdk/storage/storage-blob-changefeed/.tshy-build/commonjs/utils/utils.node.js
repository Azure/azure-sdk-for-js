"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyToString = bodyToString;
exports.streamToAvroReadable = streamToAvroReadable;
const storage_internal_avro_1 = require("@azure/storage-internal-avro");
/**
 * Read body from downloading operation methods to string.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, needed for Node.js environment
 */
async function bodyToString(response, length) {
    return new Promise((resolve, reject) => {
        response.readableStreamBody.on("readable", () => {
            const chunk = response.readableStreamBody.read(length);
            if (chunk) {
                resolve(chunk.toString());
            }
        });
        response.readableStreamBody.on("error", reject);
        response.readableStreamBody.on("end", () => {
            resolve("");
        });
    });
}
function streamToAvroReadable(readableStream) {
    return new storage_internal_avro_1.AvroReadableFromStream(readableStream);
}
//# sourceMappingURL=utils.node.js.map