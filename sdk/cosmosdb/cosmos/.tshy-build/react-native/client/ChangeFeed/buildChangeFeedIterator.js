import { QueryRange } from "../../routing/index.js";
import { ChangeFeedStartFrom } from "./ChangeFeedStartFrom.js";
import { ChangeFeedStartFromBeginning } from "./ChangeFeedStartFromBeginning.js";
import { ChangeFeedStartFromContinuation } from "./ChangeFeedStartFromContinuation.js";
import { ChangeFeedStartFromNow } from "./ChangeFeedStartFromNow.js";
import { ChangeFeedStartFromTime } from "./ChangeFeedStartFromTime.js";
import { ChangeFeedResourceType } from "./ChangeFeedEnums.js";
import { ChangeFeedForPartitionKey } from "./ChangeFeedForPartitionKey.js";
import { ErrorResponse } from "../../request/index.js";
import { ChangeFeedForEpkRange } from "./ChangeFeedForEpkRange.js";
import { getIdFromLink, getPathFromLink, ResourceType, Constants } from "../../common/index.js";
import { buildInternalChangeFeedOptions, fetchStartTime, isEpkRange, getEPKRangeForPrefixPartitionKey, } from "./changeFeedUtils.js";
import { isPrefixPartitionKey, isPartitionKey } from "../../utils/typeChecks.js";
export async function buildChangeFeedIterator(cfOptions, clientContext, container, partitionKeyRangeCache) {
    const url = container.url;
    const path = getPathFromLink(url, ResourceType.item);
    const id = getIdFromLink(url);
    let changeFeedStartFrom = cfOptions.changeFeedStartFrom;
    if (changeFeedStartFrom === undefined) {
        changeFeedStartFrom = ChangeFeedStartFrom.Now();
    }
    if (changeFeedStartFrom instanceof ChangeFeedStartFromContinuation) {
        const continuationToken = changeFeedStartFrom.getCfResourceJson();
        const resourceType = changeFeedStartFrom.getResourceType();
        const internalCfOptions = buildInternalChangeFeedOptions(cfOptions, changeFeedStartFrom.getCfResource());
        if (resourceType === ChangeFeedResourceType.PartitionKey &&
            isPartitionKey(continuationToken.partitionKey)) {
            return new ChangeFeedForPartitionKey(clientContext, container, id, path, continuationToken.partitionKey, internalCfOptions);
        }
        else if (resourceType === ChangeFeedResourceType.FeedRange) {
            return new ChangeFeedForEpkRange(clientContext, container, partitionKeyRangeCache, id, path, url, internalCfOptions, undefined);
        }
        else {
            throw new ErrorResponse("Invalid continuation token.");
        }
    }
    else if (changeFeedStartFrom instanceof ChangeFeedStartFromNow ||
        changeFeedStartFrom instanceof ChangeFeedStartFromTime ||
        changeFeedStartFrom instanceof ChangeFeedStartFromBeginning) {
        const startFromNow = changeFeedStartFrom instanceof ChangeFeedStartFromNow ? true : false;
        const startTime = startFromNow ? undefined : fetchStartTime(changeFeedStartFrom);
        const internalCfOptions = buildInternalChangeFeedOptions(cfOptions, undefined, startTime, startFromNow);
        const cfResource = changeFeedStartFrom.getCfResource();
        if (isPartitionKey(cfResource)) {
            const partitionKey = cfResource;
            const partitionKeyDefinition = await container.getPartitionKeyDefinition();
            if (partitionKeyDefinition !== undefined &&
                isPrefixPartitionKey(partitionKey, partitionKeyDefinition.resource)) {
                const effectiveEPKRange = await getEPKRangeForPrefixPartitionKey(partitionKey);
                return new ChangeFeedForEpkRange(clientContext, container, partitionKeyRangeCache, id, path, url, internalCfOptions, effectiveEPKRange);
            }
            return new ChangeFeedForPartitionKey(clientContext, container, id, path, cfResource, internalCfOptions);
        }
        else {
            let internalCfResource;
            if (cfResource === undefined) {
                internalCfResource = new QueryRange(Constants.EffectivePartitionKeyConstants.MinimumInclusiveEffectivePartitionKey, Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey, true, false);
            }
            else if (isEpkRange(cfResource)) {
                internalCfResource = new QueryRange(cfResource.minInclusive, cfResource.maxExclusive, true, false);
            }
            else {
                throw new ErrorResponse("Invalid feed range.");
            }
            return new ChangeFeedForEpkRange(clientContext, container, partitionKeyRangeCache, id, path, url, internalCfOptions, internalCfResource);
        }
    }
    else {
        throw new ErrorResponse("Invalid change feed start location.");
    }
}
//# sourceMappingURL=buildChangeFeedIterator.js.map