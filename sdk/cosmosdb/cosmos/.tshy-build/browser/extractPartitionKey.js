import { createClientLogger } from "@azure/logger";
import { parsePath } from "./common/index.js";
import { convertToInternalPartitionKey, NonePartitionKeyLiteral, NullPartitionKeyLiteral, } from "./documents/index.js";
import { DEFAULT_PARTITION_KEY_PATH } from "./common/partitionKeys.js";
import { readPartitionKeyDefinition } from "./client/ClientUtils.js";
const logger = createClientLogger("extractPartitionKey");
/**
 * Function to extract PartitionKey based on {@link PartitionKeyDefinition}
 * from an object.
 * Retuns
 * 1. PartitionKeyInternal[] if extraction is successful.
 * 2. undefined if either {@link partitionKeyDefinition} is not well formed
 * or an unsupported partitionkey type is encountered.
 * @hidden
 */
export function extractPartitionKeys(document, partitionKeyDefinition) {
    if (partitionKeyDefinition &&
        partitionKeyDefinition.paths &&
        partitionKeyDefinition.paths.length > 0) {
        if (partitionKeyDefinition.systemKey === true) {
            return [];
        }
        if (partitionKeyDefinition.paths.length === 1 &&
            partitionKeyDefinition.paths[0] === DEFAULT_PARTITION_KEY_PATH) {
            return [extractPartitionKey(DEFAULT_PARTITION_KEY_PATH, document)];
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
    const pathParts = parsePath(path);
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
    else if (obj === NullPartitionKeyLiteral) {
        return NullPartitionKeyLiteral;
    }
    else if (obj === undefined || JSON.stringify(obj) === JSON.stringify(NonePartitionKeyLiteral)) {
        return NonePartitionKeyLiteral;
    }
    return undefined;
}
/**
 * @hidden
 */
export function undefinedPartitionKey(partitionKeyDefinition) {
    if (partitionKeyDefinition === null || partitionKeyDefinition === void 0 ? void 0 : partitionKeyDefinition.systemKey) {
        return [];
    }
    else {
        return partitionKeyDefinition === null || partitionKeyDefinition === void 0 ? void 0 : partitionKeyDefinition.paths.map(() => NonePartitionKeyLiteral);
    }
}
/**
 * @hidden
 */
export async function setPartitionKeyIfUndefined(diagnosticNode, container, partitionKey) {
    if (partitionKey === undefined) {
        const partitionKeyDefinition = await readPartitionKeyDefinition(diagnosticNode, container);
        partitionKey = undefinedPartitionKey(partitionKeyDefinition);
    }
    return convertToInternalPartitionKey(partitionKey);
}
//# sourceMappingURL=extractPartitionKey.js.map