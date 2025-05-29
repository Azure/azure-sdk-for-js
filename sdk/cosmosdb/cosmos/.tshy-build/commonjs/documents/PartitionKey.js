"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionKeyBuilder = void 0;
const PartitionKeyInternal_js_1 = require("./PartitionKeyInternal.js");
/**
 * Builder class for building PartitionKey.
 */
class PartitionKeyBuilder {
    constructor() {
        this.values = [];
    }
    addValue(value) {
        this.values.push(value);
        return this;
    }
    addNullValue() {
        this.values.push(PartitionKeyInternal_js_1.NullPartitionKeyLiteral);
        return this;
    }
    addNoneValue() {
        this.values.push(PartitionKeyInternal_js_1.NonePartitionKeyLiteral);
        return this;
    }
    build() {
        return [...this.values];
    }
}
exports.PartitionKeyBuilder = PartitionKeyBuilder;
//# sourceMappingURL=PartitionKey.js.map