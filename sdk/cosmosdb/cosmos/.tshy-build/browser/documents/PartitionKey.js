// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { NonePartitionKeyLiteral, NullPartitionKeyLiteral } from "./PartitionKeyInternal.js";
/**
 * Builder class for building PartitionKey.
 */
export class PartitionKeyBuilder {
    constructor() {
        this.values = [];
    }
    addValue(value) {
        this.values.push(value);
        return this;
    }
    addNullValue() {
        this.values.push(NullPartitionKeyLiteral);
        return this;
    }
    addNoneValue() {
        this.values.push(NonePartitionKeyLiteral);
        return this;
    }
    build() {
        return [...this.values];
    }
}
//# sourceMappingURL=PartitionKey.js.map