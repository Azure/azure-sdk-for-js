// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class NumberSerializer {
    deserialize(bytes) {
        if (!bytes || bytes.length < 8) {
            throw new Error("Invalid byte array for deserialization");
        }
        const num = Number(bytes.readBigInt64LE(0));
        return num;
    }
    serialize(value) {
        const newValue = BigInt(value);
        const buffer = Buffer.alloc(8);
        buffer.writeBigInt64LE(newValue, 0);
        return buffer;
    }
}
//# sourceMappingURL=NumberSerializer.js.map