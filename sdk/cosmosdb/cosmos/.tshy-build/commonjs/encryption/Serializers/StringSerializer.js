"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringSerializer = void 0;
class StringSerializer {
    deserialize(bytes) {
        return bytes.toString(StringSerializer.characterEncoding);
    }
    serialize(value) {
        return Buffer.from(value, StringSerializer.characterEncoding);
    }
}
exports.StringSerializer = StringSerializer;
StringSerializer.characterEncoding = "utf-8";
//# sourceMappingURL=StringSerializer.js.map