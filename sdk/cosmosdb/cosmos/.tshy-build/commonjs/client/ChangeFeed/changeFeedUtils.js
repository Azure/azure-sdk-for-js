"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChangeFeedIteratorOptions = validateChangeFeedIteratorOptions;
exports.extractOverlappingRanges = extractOverlappingRanges;
exports.isEpkRange = isEpkRange;
exports.buildInternalChangeFeedOptions = buildInternalChangeFeedOptions;
exports.fetchStartTime = fetchStartTime;
exports.isNullOrEmpty = isNullOrEmpty;
exports.getEPKRangeForPrefixPartitionKey = getEPKRangeForPrefixPartitionKey;
exports.getEffectivePartitionKeyForMultiHashPartitioning = getEffectivePartitionKeyForMultiHashPartitioning;
exports.decryptChangeFeedResponse = decryptChangeFeedResponse;
const index_js_1 = require("../../request/index.js");
const typeChecks_js_1 = require("../../utils/typeChecks.js");
const ChangeFeedStartFromBeginning_js_1 = require("./ChangeFeedStartFromBeginning.js");
const index_js_2 = require("../../common/index.js");
const ChangeFeedStartFromTime_js_1 = require("./ChangeFeedStartFromTime.js");
const index_js_3 = require("../../routing/index.js");
const FeedRange_js_1 = require("./FeedRange.js");
const v2_js_1 = require("../../utils/hashing/v2.js");
const ChangeFeedMode_js_1 = require("./ChangeFeedMode.js");
/**
 * @hidden
 * Validates the change feed options passed by the user
 */
function validateChangeFeedIteratorOptions(options) {
    if (!isChangeFeedIteratorOptions(options)) {
        throw new index_js_1.ErrorResponse("Invalid Changefeed Iterator Options.");
    }
    if ((options === null || options === void 0 ? void 0 : options.maxItemCount) && typeof (options === null || options === void 0 ? void 0 : options.maxItemCount) !== "number") {
        throw new index_js_1.ErrorResponse("maxItemCount must be number");
    }
    if ((options === null || options === void 0 ? void 0 : options.maxItemCount) !== undefined && (options === null || options === void 0 ? void 0 : options.maxItemCount) < 1) {
        throw new index_js_1.ErrorResponse("maxItemCount must be a positive number");
    }
}
function isChangeFeedIteratorOptions(options) {
    if (typeof options !== "object") {
        return false;
    }
    if (Object.keys(options).length === 0 && JSON.stringify(options) === "{}") {
        return true;
    }
    return options && !((0, typeChecks_js_1.isPrimitivePartitionKeyValue)(options) || Array.isArray(options));
}
/**
 * @hidden
 * Checks if pkRange entirely covers the given overLapping range or there is only partial overlap.
 *
 * If no complete overlap, exact range which overlaps is retured which is used to set minEpk and maxEpk headers while quering change feed.
 */
async function extractOverlappingRanges(epkRange, overLappingRange) {
    if (overLappingRange.minInclusive >= epkRange.min &&
        overLappingRange.maxExclusive <= epkRange.max) {
        return [undefined, undefined];
    }
    else if (overLappingRange.minInclusive <= epkRange.min &&
        overLappingRange.maxExclusive >= epkRange.max) {
        return [epkRange.min, epkRange.max];
    }
    // Right Side of overlapping range is covered
    else if (overLappingRange.minInclusive <= epkRange.min &&
        overLappingRange.maxExclusive <= epkRange.max &&
        overLappingRange.maxExclusive >= epkRange.min) {
        return [epkRange.min, overLappingRange.maxExclusive];
    }
    // Left Side of overlapping range is covered
    else {
        return [overLappingRange.minInclusive, epkRange.max];
    }
}
/**
 * @hidden
 * Checks if the object is a valid EpkRange
 */
function isEpkRange(obj) {
    return (obj instanceof FeedRange_js_1.FeedRangeInternal &&
        typeof obj.minInclusive === "string" &&
        typeof obj.maxExclusive === "string" &&
        obj.minInclusive >=
            index_js_2.Constants.EffectivePartitionKeyConstants.MinimumInclusiveEffectivePartitionKey &&
        obj.maxExclusive <=
            index_js_2.Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey &&
        obj.maxExclusive > obj.minInclusive);
}
/**
 * @hidden
 */
function buildInternalChangeFeedOptions(options, continuationToken, startTime, startFromNow) {
    const internalCfOptions = {};
    internalCfOptions.maxItemCount = options === null || options === void 0 ? void 0 : options.maxItemCount;
    internalCfOptions.sessionToken = options === null || options === void 0 ? void 0 : options.sessionToken;
    internalCfOptions.continuationToken = continuationToken;
    internalCfOptions.changeFeedMode = options === null || options === void 0 ? void 0 : options.changeFeedMode;
    // Default option of changefeed is to start from now.
    if (startFromNow) {
        internalCfOptions.startFromNow = true;
    }
    else {
        internalCfOptions.startTime = startTime;
    }
    return internalCfOptions;
}
/**
 * @hidden
 */
function fetchStartTime(changeFeedStartFrom) {
    if (changeFeedStartFrom instanceof ChangeFeedStartFromBeginning_js_1.ChangeFeedStartFromBeginning) {
        return undefined;
    }
    else if (changeFeedStartFrom instanceof ChangeFeedStartFromTime_js_1.ChangeFeedStartFromTime) {
        return changeFeedStartFrom.getStartTime();
    }
}
/**
 * @hidden
 */
function isNullOrEmpty(text) {
    return text === null || text === undefined || text.trim() === "";
}
/**
 * @hidden
 */
async function getEPKRangeForPrefixPartitionKey(internalPartitionKey) {
    const minEPK = getEffectivePartitionKeyForMultiHashPartitioning(internalPartitionKey);
    const maxEPK = minEPK + index_js_2.Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey;
    return new index_js_3.QueryRange(minEPK, maxEPK, true, false);
}
/**
 * @hidden
 */
function getEffectivePartitionKeyForMultiHashPartitioning(partitionKeyInternal) {
    const hashArray = partitionKeyInternal.map((item) => (0, v2_js_1.hashV2PartitionKey)([item]));
    return hashArray.join("");
}
/**
 * @hidden
 */
async function decryptChangeFeedResponse(result, diagnosticNode, changeFeedMode, encryptionProcessor) {
    let count = 0;
    diagnosticNode.beginEncryptionDiagnostics(index_js_2.Constants.Encryption.DiagnosticsDecryptOperation);
    for (let item of result.result) {
        if (changeFeedMode === ChangeFeedMode_js_1.ChangeFeedMode.AllVersionsAndDeletes) {
            if ("current" in item && item.current !== null) {
                const { body, propertiesDecryptedCount } = await encryptionProcessor.decrypt(item.current);
                item.current = body;
                count += propertiesDecryptedCount;
            }
            if ("previous" in item && item.previous !== null) {
                const { body, propertiesDecryptedCount } = await encryptionProcessor.decrypt(item.previous);
                item.previous = body;
                count += propertiesDecryptedCount;
            }
        }
        else {
            const { body, propertiesDecryptedCount } = await encryptionProcessor.decrypt(item);
            item = body;
            count += propertiesDecryptedCount;
        }
    }
    diagnosticNode.endEncryptionDiagnostics(index_js_2.Constants.Encryption.DiagnosticsDecryptOperation, count);
}
//# sourceMappingURL=changeFeedUtils.js.map