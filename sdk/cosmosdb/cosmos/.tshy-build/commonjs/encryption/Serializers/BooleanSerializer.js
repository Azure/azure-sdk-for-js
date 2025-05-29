"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanSerializer = void 0;
class BooleanSerializer {
    serialize(value) {
        const numValue = value ? 1 : 0;
        const buffer = Buffer.alloc(8);
        buffer.writeBigInt64LE(BigInt(numValue), 0);
        return buffer;
    }
    deserialize(bytes) {
        if (!bytes || bytes.length < 1) {
            throw new Error("Invalid byte array for deserialization");
        }
        return !!bytes[0];
    }
}
exports.BooleanSerializer = BooleanSerializer;
//# sourceMappingURL=BooleanSerializer.js.map