// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TypeMarker } from "./enums/TypeMarker.js";
import { CosmosEncryptedNumberType } from "./CosmosEncryptedNumber.js";
/**
 * Represents a builder class for building encrypted parameters in parametrized query.
 */
export class EncryptionQueryBuilder {
    constructor(query) {
        this.query = query;
        this.parameters = [];
    }
    /**
     * Adds parameter to query
     */
    addParameter(name, value, path) {
        if (value === null) {
            this.parameters.push({ name: name, value: null, path: path });
            return;
        }
        switch (true) {
            case typeof value === "boolean":
                this.parameters.push({
                    name,
                    value,
                    type: TypeMarker.Boolean,
                    path,
                });
                break;
            case typeof value === "string":
                this.parameters.push({
                    name,
                    value,
                    type: TypeMarker.String,
                    path,
                });
                break;
            case value instanceof Date: {
                const date = value.toISOString();
                this.parameters.push({
                    name: name,
                    value: date,
                    type: TypeMarker.String,
                    path: path,
                });
                break;
            }
            case isCosmosEncryptedNumber(value): {
                const num = value.value;
                if (value.numberType === CosmosEncryptedNumberType.Integer) {
                    this.parameters.push({
                        name,
                        value: num,
                        type: TypeMarker.Long,
                        path,
                    });
                }
                else if (value.numberType === CosmosEncryptedNumberType.Float) {
                    this.parameters.push({
                        name,
                        value: num,
                        type: TypeMarker.Double,
                        path,
                    });
                }
                break;
            }
            case Array.isArray(value):
                this.parameters.push({ name, value, path });
                break;
            case typeof value === "object":
                this.parameters.push({ name, value, path });
                break;
            default:
                throw new Error(`Unsupported parameter type for parameter "${name}": ${typeof value}`);
        }
    }
    /** Adds unencrypted parameter to query */
    addUnencryptedParameter(name, value, path) {
        this.parameters.push({ name: name, value: value, path: path });
    }
    /*
     * @internal
     */
    toEncryptionSqlQuerySpec() {
        return {
            query: this.query,
            parameters: this.parameters,
        };
    }
}
function isCosmosEncryptedNumber(val) {
    return (val !== null &&
        typeof val === "object" &&
        typeof val.value === "number" &&
        typeof val.numberType === "string" &&
        (val.numberType === CosmosEncryptedNumberType.Integer ||
            val.numberType === CosmosEncryptedNumberType.Float));
}
//# sourceMappingURL=EncryptionQueryBuilder.js.map