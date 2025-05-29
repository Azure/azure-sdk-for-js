"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPartitionKeys = extractPartitionKeys;
exports.undefinedPartitionKey = undefinedPartitionKey;
exports.setPartitionKeyIfUndefined = setPartitionKeyIfUndefined;
const logger_1 = require("@azure/logger");
const index_js_1 = require("./common/index.js");
const index_js_2 = require("./documents/index.js");
const partitionKeys_js_1 = require("./common/partitionKeys.js");
const ClientUtils_js_1 = require("./client/ClientUtils.js");
const logger = (0, logger_1.createClientLogger)("extractPartitionKey");
/**
 * Function to extract PartitionKey based on {@link PartitionKeyDefinition}
 * from an object.
 * Retuns
 * 1. PartitionKeyInternal[] if extraction is successful.
 * 2. undefined if either {@link partitionKeyDefinition} is not well formed
 * or an unsupported partitionkey type is encountered.
 * @hidden
 */
function extractPartitionKeys(document, partitionKeyDefinition) {
    if (partitionKeyDefinition &&
        partitionKeyDefinition.paths &&
        partitionKeyDefinition.paths.length > 0) {
        if (partitionKeyDefinition.systemKey === true) {
            return [];
        }
        if (partitionKeyDefinition.paths.length === 1 &&
            partitionKeyDefinition.paths[0] === partitionKeys_js_1.DEFAULT_PARTITION_KEY_PATH) {
            return [extractPartitionKey(partitionKeys_js_1.DEFAULT_PARTITION_KEY_PATH, document)];
        }
        const partitionKeys = [];
        partitionKeyDefinition.paths.forEach((path) => {
            const obj = extractPartitionKey(path, document);
            if (obj === undefined) {
                logger.warning("Unsupported PartitionKey found.");
                return undefined;
            }
            partitionKeys.push(obj);
        });
        return partitionKeys;
    }
    logger.error("Unexpected Partition Key Definition Found.");
    return undefined;
}
function extractPartitionKey(path, obj) {
    const pathParts = (0, index_js_1.parsePath)(path);
    for (const part of pathParts) {
        if (typeof obj === "object" && obj !== null && part in obj) {
            obj = obj[part];
        }
        else {
            obj = undefined;
            break;
        }
    }
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
        return obj;
    }
    else if (obj === index_js_2.NullPartitionKeyLiteral) {
        return index_js_2.NullPartitionKeyLiteral;
    }
    else if (obj === undefined || JSON.stringify(obj) === JSON.stringify(index_js_2.NonePartitionKeyLiteral)) {
        return index_js_2.NonePartitionKeyLiteral;
    }
    return undefined;
}
/**
 * @hidden
 */
function undefinedPartitionKey(partitionKeyDefinition) {
    if (partitionKeyDefinition === null || partitionKeyDefinition === void 0 ? void 0 : partitionKeyDefinition.systemKey) {
        return [];
    }
    else {
        return partitionKeyDefinition === null || partitionKeyDefinition === void 0 ? void 0 : partitionKeyDefinition.paths.map(() => index_js_2.NonePartitionKeyLiteral);
    }
}
/**
 * @hidden
 */
async function setPartitionKeyIfUndefined(diagnosticNode, container, partitionKey) {
    if (partitionKey === undefined) {
        const partitionKeyDefinition = await (0, ClientUtils_js_1.readPartitionKeyDefinition)(diagnosticNode, container);
        partitionKey = undefinedPartitionKey(partitionKeyDefinition);
    }
    return (0, index_js_2.convertToInternalPartitionKey)(partitionKey);
}
//# sourceMappingURL=extractPartitionKey.js.map