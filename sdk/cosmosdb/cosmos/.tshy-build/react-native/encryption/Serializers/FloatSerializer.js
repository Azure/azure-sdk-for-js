// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class FloatSerializer {
    deserialize(bytes) {
        if (!bytes || bytes.length < 8) {
            throw new Error("Invalid byte array for deserialization");
        }
        const res = bytes.readDoubleLE(0);
        return res;
    }
    serialize(value) {
        if (!Number.isFinite(value)) {
            throw new Error("Value is out of range");
        }
        const buffer = Buffer.alloc(8);
        buffer.writeDoubleLE(value, 0);
        return buffer;
    }
}
//# sourceMappingURL=FloatSerializer.js.map