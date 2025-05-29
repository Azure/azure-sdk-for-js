"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyFromData = bodyFromData;
exports.getHeaders = getHeaders;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const auth_js_1 = require("../auth.js");
const index_js_1 = require("../common/index.js");
const index_js_2 = require("./index.js");
const logger_js_1 = require("../common/logger.js");
const index_js_3 = require("../client/ChangeFeed/index.js");
// ----------------------------------------------------------------------------
// Utility methods
//
/** @hidden */
function javaScriptFriendlyJSONStringify(s) {
    // two line terminators (Line separator and Paragraph separator) are not needed to be escaped in JSON
    // but are needed to be escaped in JavaScript.
    return JSON.stringify(s)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
/** @hidden */
function bodyFromData(data) {
    if (typeof data === "object") {
        return javaScriptFriendlyJSONStringify(data);
    }
    return data;
}
const JsonContentType = "application/json";
/**
 * @hidden
 */
async function getHeaders({ clientOptions, defaultHeaders, verb, path, resourceId, resourceType, options = {}, operationType, partitionKeyRangeId, useMultipleWriteLocations, partitionKey, }) {
    const headers = Object.assign({ [index_js_1.Constants.HttpHeaders.ResponseContinuationTokenLimitInKB]: 1, [index_js_1.Constants.HttpHeaders.EnableCrossPartitionQuery]: true }, defaultHeaders);
    // Adding SDKSupportedCapabilities header to hint that SDK supports partition merge
    headers[index_js_1.Constants.HttpHeaders.SDKSupportedCapabilities] = index_js_1.SDKSupportedCapabilities.PartitionMerge;
    if (useMultipleWriteLocations) {
        headers[index_js_1.Constants.HttpHeaders.ALLOW_MULTIPLE_WRITES] = true;
    }
    if (options.continuationTokenLimitInKB) {
        headers[index_js_1.Constants.HttpHeaders.ResponseContinuationTokenLimitInKB] =
            options.continuationTokenLimitInKB;
    }
    if (options.continuationToken) {
        headers[index_js_1.Constants.HttpHeaders.Continuation] = options.continuationToken;
    }
    else if (options.continuation) {
        headers[index_js_1.Constants.HttpHeaders.Continuation] = options.continuation;
    }
    if (options.preTriggerInclude) {
        headers[index_js_1.Constants.HttpHeaders.PreTriggerInclude] =
            options.preTriggerInclude.constructor === Array
                ? options.preTriggerInclude.join(",")
                : options.preTriggerInclude;
    }
    if (options.postTriggerInclude) {
        headers[index_js_1.Constants.HttpHeaders.PostTriggerInclude] =
            options.postTriggerInclude.constructor === Array
                ? options.postTriggerInclude.join(",")
                : options.postTriggerInclude;
    }
    if (options.offerType) {
        headers[index_js_1.Constants.HttpHeaders.OfferType] = options.offerType;
    }
    if (options.offerThroughput) {
        headers[index_js_1.Constants.HttpHeaders.OfferThroughput] = options.offerThroughput;
    }
    if (options.maxItemCount) {
        headers[index_js_1.Constants.HttpHeaders.PageSize] = options.maxItemCount;
    }
    if (options.accessCondition) {
        if (options.accessCondition.type === "IfMatch") {
            headers[index_js_1.Constants.HttpHeaders.IfMatch] = options.accessCondition.condition;
        }
        else {
            headers[index_js_1.Constants.HttpHeaders.IfNoneMatch] = options.accessCondition.condition;
        }
    }
    if (options.useAllVersionsAndDeletesFeed) {
        // headers required for reading feed in allVersionsAndDeletes mode
        headers[index_js_1.Constants.HttpHeaders.A_IM] = index_js_3.ChangeFeedMode.AllVersionsAndDeletes;
        headers[index_js_1.Constants.HttpHeaders.ChangeFeedWireFormatVersion] =
            index_js_1.Constants.AllVersionsAndDeletesChangeFeedWireFormatVersion;
    }
    if (options.useIncrementalFeed || options.useLatestVersionFeed) {
        headers[index_js_1.Constants.HttpHeaders.A_IM] = index_js_3.ChangeFeedMode.LatestVersion;
    }
    if (options.indexingDirective) {
        headers[index_js_1.Constants.HttpHeaders.IndexingDirective] = options.indexingDirective;
    }
    if (options.consistencyLevel) {
        headers[index_js_1.Constants.HttpHeaders.ConsistencyLevel] = options.consistencyLevel;
    }
    if (options.priorityLevel) {
        headers[index_js_1.Constants.HttpHeaders.PriorityLevel] = options.priorityLevel;
    }
    if (options.throughputBucket) {
        headers[index_js_1.Constants.HttpHeaders.ThroughputBucket] = options.throughputBucket;
    }
    if (options.maxIntegratedCacheStalenessInMs && resourceType === index_js_1.ResourceType.item) {
        if (typeof options.maxIntegratedCacheStalenessInMs === "number") {
            headers[index_js_1.Constants.HttpHeaders.DedicatedGatewayPerRequestCacheStaleness] =
                options.maxIntegratedCacheStalenessInMs.toString();
        }
        else {
            logger_js_1.defaultLogger.error(`RangeError: maxIntegratedCacheStalenessInMs "${options.maxIntegratedCacheStalenessInMs}" is not a valid parameter.`);
            headers[index_js_1.Constants.HttpHeaders.DedicatedGatewayPerRequestCacheStaleness] = "null";
        }
    }
    if (options.bypassIntegratedCache) {
        headers[index_js_1.Constants.HttpHeaders.DedicatedGatewayPerRequestBypassCache] =
            options.bypassIntegratedCache.toString();
    }
    if (options.resourceTokenExpirySeconds) {
        headers[index_js_1.Constants.HttpHeaders.ResourceTokenExpiry] = options.resourceTokenExpirySeconds;
    }
    if (options.sessionToken) {
        headers[index_js_1.Constants.HttpHeaders.SessionToken] = options.sessionToken;
    }
    if (options.enableScanInQuery) {
        headers[index_js_1.Constants.HttpHeaders.EnableScanInQuery] = options.enableScanInQuery;
    }
    if (options.populateQuotaInfo) {
        headers[index_js_1.Constants.HttpHeaders.PopulateQuotaInfo] = options.populateQuotaInfo;
    }
    if (options.populateQueryMetrics) {
        headers[index_js_1.Constants.HttpHeaders.PopulateQueryMetrics] = options.populateQueryMetrics;
    }
    if (options.maxDegreeOfParallelism !== undefined &&
        options.maxDegreeOfParallelism !== 0 &&
        options.maxDegreeOfParallelism !== 1) {
        headers[index_js_1.Constants.HttpHeaders.ParallelizeCrossPartitionQuery] = true;
    }
    if (options.populateQuotaInfo) {
        headers[index_js_1.Constants.HttpHeaders.PopulateQuotaInfo] = true;
    }
    if (partitionKey !== undefined && !headers[index_js_1.Constants.HttpHeaders.PartitionKey]) {
        headers[index_js_1.Constants.HttpHeaders.PartitionKey] = (0, index_js_1.jsonStringifyAndEscapeNonASCII)(partitionKey);
    }
    if (clientOptions.key || clientOptions.tokenProvider) {
        headers[index_js_1.Constants.HttpHeaders.XDate] = new Date().toUTCString();
    }
    if (verb === index_js_1.HTTPMethod.post || verb === index_js_1.HTTPMethod.put) {
        if (!headers[index_js_1.Constants.HttpHeaders.ContentType]) {
            headers[index_js_1.Constants.HttpHeaders.ContentType] = JsonContentType;
        }
    }
    if (!headers[index_js_1.Constants.HttpHeaders.Accept]) {
        headers[index_js_1.Constants.HttpHeaders.Accept] = JsonContentType;
    }
    if (partitionKeyRangeId !== undefined) {
        headers[index_js_1.Constants.HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
    }
    if (options.enableScriptLogging) {
        headers[index_js_1.Constants.HttpHeaders.EnableScriptLogging] = options.enableScriptLogging;
    }
    if (options.disableRUPerMinuteUsage) {
        headers[index_js_1.Constants.HttpHeaders.DisableRUPerMinuteUsage] = true;
    }
    if (options.populateIndexMetrics) {
        headers[index_js_1.Constants.HttpHeaders.PopulateIndexMetrics] = options.populateIndexMetrics;
    }
    if (clientOptions.clientEncryptionOptions) {
        headers[index_js_1.Constants.HttpHeaders.IsClientEncryptedHeader] = true;
        if (options.containerRid) {
            headers[index_js_1.Constants.HttpHeaders.IntendedCollectionHeader] = options.containerRid;
        }
    }
    if (clientOptions.key ||
        clientOptions.resourceTokens ||
        clientOptions.tokenProvider ||
        clientOptions.permissionFeed) {
        await (0, auth_js_1.setAuthorizationHeader)(clientOptions, verb, path, resourceId, resourceType, headers);
    }
    if (resourceType === index_js_1.ResourceType.item &&
        Object.prototype.hasOwnProperty.call(options, "contentResponseOnWriteEnabled") &&
        !options.contentResponseOnWriteEnabled) {
        if (operationType === index_js_1.OperationType.Batch) {
            headers[index_js_1.Constants.HttpHeaders.Prefer] = index_js_1.Constants.HttpHeaders.PreferReturnMinimal;
        }
        else {
            throw new index_js_2.ErrorResponse("Currently `contentResponseOnWriteEnabled` option is only supported for batch and bulk operations.");
        }
    }
    return headers;
}
//# sourceMappingURL=request.js.map