"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventDataAdapter = createEventDataAdapter;
/**
 * A function that constructs an event data adapter. That adapter can be used
 * with `@azure/schema-registry-avro` to encode and decode body in event data.
 *
 * @param params - parameters to create the event data
 * @returns An event data adapter that can produce and consume event data
 */
function createEventDataAdapter(params = {}) {
    return {
        produce: ({ data: body, contentType }) => {
            return Object.assign(Object.assign({}, params), { body,
                contentType });
        },
        consume: (message) => {
            const { body, contentType } = message;
            if (body === undefined) {
                throw new Error("Expected the body field to be defined");
            }
            if (contentType === undefined) {
                throw new Error("Expected the contentType field to be defined");
            }
            return {
                /**
                 * If the raw response was parsed as JSON, we need to convert it to a Uint8Array,
                 * otherwise, leave the payload as is.
                 */
                data: typeof body === "object" ? Uint8Array.from(Object.values(body)) : body,
                contentType,
            };
        },
    };
}
//# sourceMappingURL=eventDataAdapter.js.map