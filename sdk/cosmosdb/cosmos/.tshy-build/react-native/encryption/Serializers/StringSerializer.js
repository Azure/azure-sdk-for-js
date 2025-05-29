// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class StringSerializer {
    deserialize(bytes) {
        return bytes.toString(StringSerializer.characterEncoding);
    }
    serialize(value) {
        return Buffer.from(value, StringSerializer.characterEncoding);
    }
}
StringSerializer.characterEncoding = "utf-8";
//# sourceMappingURL=StringSerializer.js.map