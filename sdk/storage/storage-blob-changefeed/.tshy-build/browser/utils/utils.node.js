// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AvroReadableFromStream } from "@azure/storage-internal-avro";
/**
 * Read body from downloading operation methods to string.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, needed for Node.js environment
 */
export async function bodyToString(response, length) {
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
export function streamToAvroReadable(readableStream) {
    return new AvroReadableFromStream(readableStream);
}
//# sourceMappingURL=utils.node.js.map