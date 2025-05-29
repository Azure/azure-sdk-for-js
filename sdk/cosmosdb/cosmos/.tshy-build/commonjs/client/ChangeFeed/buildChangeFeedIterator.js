"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildChangeFeedIterator = buildChangeFeedIterator;
const index_js_1 = require("../../routing/index.js");
const ChangeFeedStartFrom_js_1 = require("./ChangeFeedStartFrom.js");
const ChangeFeedStartFromBeginning_js_1 = require("./ChangeFeedStartFromBeginning.js");
const ChangeFeedStartFromContinuation_js_1 = require("./ChangeFeedStartFromContinuation.js");
const ChangeFeedStartFromNow_js_1 = require("./ChangeFeedStartFromNow.js");
const ChangeFeedStartFromTime_js_1 = require("./ChangeFeedStartFromTime.js");
const ChangeFeedEnums_js_1 = require("./ChangeFeedEnums.js");
const ChangeFeedForPartitionKey_js_1 = require("./ChangeFeedForPartitionKey.js");
const index_js_2 = require("../../request/index.js");
const ChangeFeedForEpkRange_js_1 = require("./ChangeFeedForEpkRange.js");
const index_js_3 = require("../../common/index.js");
const changeFeedUtils_js_1 = require("./changeFeedUtils.js");
const typeChecks_js_1 = require("../../utils/typeChecks.js");
async function buildChangeFeedIterator(cfOptions, clientContext, container, partitionKeyRangeCache) {
    const url = container.url;
    const path = (0, index_js_3.getPathFromLink)(url, index_js_3.ResourceType.item);
    const id = (0, index_js_3.getIdFromLink)(url);
    let changeFeedStartFrom = cfOptions.changeFeedStartFrom;
    if (changeFeedStartFrom === undefined) {
        changeFeedStartFrom = ChangeFeedStartFrom_js_1.ChangeFeedStartFrom.Now();
    }
    if (changeFeedStartFrom instanceof ChangeFeedStartFromContinuation_js_1.ChangeFeedStartFromContinuation) {
        const continuationToken = changeFeedStartFrom.getCfResourceJson();
        const resourceType = changeFeedStartFrom.getResourceType();
        const internalCfOptions = (0, changeFeedUtils_js_1.buildInternalChangeFeedOptions)(cfOptions, changeFeedStartFrom.getCfResource());
        if (resourceType === ChangeFeedEnums_js_1.ChangeFeedResourceType.PartitionKey &&
            (0, typeChecks_js_1.isPartitionKey)(continuationToken.partitionKey)) {
            return new ChangeFeedForPartitionKey_js_1.ChangeFeedForPartitionKey(clientContext, container, id, path, continuationToken.partitionKey, internalCfOptions);
        }
        else if (resourceType === ChangeFeedEnums_js_1.ChangeFeedResourceType.FeedRange) {
            return new ChangeFeedForEpkRange_js_1.ChangeFeedForEpkRange(clientContext, container, partitionKeyRangeCache, id, path, url, internalCfOptions, undefined);
        }
        else {
            throw new index_js_2.ErrorResponse("Invalid continuation token.");
        }
    }
    else if (changeFeedStartFrom instanceof ChangeFeedStartFromNow_js_1.ChangeFeedStartFromNow ||
        changeFeedStartFrom instanceof ChangeFeedStartFromTime_js_1.ChangeFeedStartFromTime ||
        changeFeedStartFrom instanceof ChangeFeedStartFromBeginning_js_1.ChangeFeedStartFromBeginning) {
        const startFromNow = changeFeedStartFrom instanceof ChangeFeedStartFromNow_js_1.ChangeFeedStartFromNow ? true : false;
        const startTime = startFromNow ? undefined : (0, changeFeedUtils_js_1.fetchStartTime)(changeFeedStartFrom);
        const internalCfOptions = (0, changeFeedUtils_js_1.buildInternalChangeFeedOptions)(cfOptions, undefined, startTime, startFromNow);
        const cfResource = changeFeedStartFrom.getCfResource();
        if ((0, typeChecks_js_1.isPartitionKey)(cfResource)) {
            const partitionKey = cfResource;
            const partitionKeyDefinition = await container.getPartitionKeyDefinition();
            if (partitionKeyDefinition !== undefined &&
                (0, typeChecks_js_1.isPrefixPartitionKey)(partitionKey, partitionKeyDefinition.resource)) {
                const effectiveEPKRange = await (0, changeFeedUtils_js_1.getEPKRangeForPrefixPartitionKey)(partitionKey);
                return new ChangeFeedForEpkRange_js_1.ChangeFeedForEpkRange(clientContext, container, partitionKeyRangeCache, id, path, url, internalCfOptions, effectiveEPKRange);
            }
            return new ChangeFeedForPartitionKey_js_1.ChangeFeedForPartitionKey(clientContext, container, id, path, cfResource, internalCfOptions);
        }
        else {
            let internalCfResource;
            if (cfResource === undefined) {
                internalCfResource = new index_js_1.QueryRange(index_js_3.Constants.EffectivePartitionKeyConstants.MinimumInclusiveEffectivePartitionKey, index_js_3.Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey, true, false);
            }
            else if ((0, changeFeedUtils_js_1.isEpkRange)(cfResource)) {
                internalCfResource = new index_js_1.QueryRange(cfResource.minInclusive, cfResource.maxExclusive, true, false);
            }
            else {
                throw new index_js_2.ErrorResponse("Invalid feed range.");
            }
            return new ChangeFeedForEpkRange_js_1.ChangeFeedForEpkRange(clientContext, container, partitionKeyRangeCache, id, path, url, internalCfOptions, internalCfResource);
        }
    }
    else {
        throw new index_js_2.ErrorResponse("Invalid change feed start location.");
    }
}
//# sourceMappingURL=buildChangeFeedIterator.js.map