// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { setAuthorizationHeader } from "../auth";
import { Constants, HTTPMethod, jsonStringifyAndEscapeNonASCII, ResourceType } from "../common";
import { CosmosClientOptions } from "../CosmosClientOptions";
import { PartitionKeyInternal } from "../documents";
import { CosmosHeaders } from "../queryExecutionContext";
import { FeedOptions, RequestOptions } from "./index";
import { defaultLogger } from "../common/logger";
// ----------------------------------------------------------------------------
// Utility methods
//

/** @hidden */
function javaScriptFriendlyJSONStringify(s: unknown): string {
  // two line terminators (Line separator and Paragraph separator) are not needed to be escaped in JSON
  // but are needed to be escaped in JavaScript.
  return JSON.stringify(s)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** @hidden */
export function bodyFromData(data: Buffer | string | Record<string, unknown>): string {
  if (typeof data === "object") {
    return javaScriptFriendlyJSONStringify(data);
  }
  return data;
}

/**
 * @hidden
 */
interface GetHeadersOptions {
  clientOptions: CosmosClientOptions;
  defaultHeaders: CosmosHeaders;
  verb: HTTPMethod;
  path: string;
  resourceId: string;
  resourceType: ResourceType;
  options: RequestOptions & FeedOptions;
  partitionKeyRangeId?: string;
  useMultipleWriteLocations?: boolean;
  partitionKey?: PartitionKeyInternal;
}

const JsonContentType = "application/json";

/**
 * @hidden
 */
export async function getHeaders({
  clientOptions,
  defaultHeaders,
  verb,
  path,
  resourceId,
  resourceType,
  options = {},
  partitionKeyRangeId,
  useMultipleWriteLocations,
  partitionKey,
}: GetHeadersOptions): Promise<CosmosHeaders> {
  const headers: CosmosHeaders = {
    [Constants.HttpHeaders.ResponseContinuationTokenLimitInKB]: 1,
    [Constants.HttpHeaders.EnableCrossPartitionQuery]: true,
    ...defaultHeaders,
  };

  if (useMultipleWriteLocations) {
    headers[Constants.HttpHeaders.ALLOW_MULTIPLE_WRITES] = true;
  }

  if (options.continuationTokenLimitInKB) {
    headers[Constants.HttpHeaders.ResponseContinuationTokenLimitInKB] =
      options.continuationTokenLimitInKB;
  }
  if (options.continuationToken) {
    headers[Constants.HttpHeaders.Continuation] = options.continuationToken;
  } else if (options.continuation) {
    headers[Constants.HttpHeaders.Continuation] = options.continuation;
  }

  if (options.preTriggerInclude) {
    headers[Constants.HttpHeaders.PreTriggerInclude] =
      options.preTriggerInclude.constructor === Array
        ? (options.preTriggerInclude as string[]).join(",")
        : (options.preTriggerInclude as string);
  }

  if (options.postTriggerInclude) {
    headers[Constants.HttpHeaders.PostTriggerInclude] =
      options.postTriggerInclude.constructor === Array
        ? (options.postTriggerInclude as string[]).join(",")
        : (options.postTriggerInclude as string);
  }

  if (options.offerType) {
    headers[Constants.HttpHeaders.OfferType] = options.offerType;
  }

  if (options.offerThroughput) {
    headers[Constants.HttpHeaders.OfferThroughput] = options.offerThroughput;
  }

  if (options.maxItemCount) {
    headers[Constants.HttpHeaders.PageSize] = options.maxItemCount;
  }

  if (options.accessCondition) {
    if (options.accessCondition.type === "IfMatch") {
      headers[Constants.HttpHeaders.IfMatch] = options.accessCondition.condition;
    } else {
      headers[Constants.HttpHeaders.IfNoneMatch] = options.accessCondition.condition;
    }
  }

  if (options.useIncrementalFeed) {
    headers[Constants.HttpHeaders.A_IM] = "Incremental Feed";
  }

  if (options.indexingDirective) {
    headers[Constants.HttpHeaders.IndexingDirective] = options.indexingDirective;
  }

  if (options.consistencyLevel) {
    headers[Constants.HttpHeaders.ConsistencyLevel] = options.consistencyLevel;
  }

  if (options.maxIntegratedCacheStalenessInMs && resourceType === ResourceType.item) {
    if (typeof options.maxIntegratedCacheStalenessInMs === "number") {
      headers[Constants.HttpHeaders.DedicatedGatewayPerRequestCacheStaleness] =
        options.maxIntegratedCacheStalenessInMs.toString();
    } else {
      defaultLogger.error(
        `RangeError: maxIntegratedCacheStalenessInMs "${options.maxIntegratedCacheStalenessInMs}" is not a valid parameter.`
      );
      headers[Constants.HttpHeaders.DedicatedGatewayPerRequestCacheStaleness] = "null";
    }
  }

  if (options.resourceTokenExpirySeconds) {
    headers[Constants.HttpHeaders.ResourceTokenExpiry] = options.resourceTokenExpirySeconds;
  }

  if (options.sessionToken) {
    headers[Constants.HttpHeaders.SessionToken] = options.sessionToken;
  }

  if (options.enableScanInQuery) {
    headers[Constants.HttpHeaders.EnableScanInQuery] = options.enableScanInQuery;
  }

  if (options.populateQuotaInfo) {
    headers[Constants.HttpHeaders.PopulateQuotaInfo] = options.populateQuotaInfo;
  }

  if (options.populateQueryMetrics) {
    headers[Constants.HttpHeaders.PopulateQueryMetrics] = options.populateQueryMetrics;
  }

  if (options.maxDegreeOfParallelism !== undefined) {
    headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] = true;
  }

  if (options.populateQuotaInfo) {
    headers[Constants.HttpHeaders.PopulateQuotaInfo] = true;
  }

  if (partitionKey !== undefined && !headers[Constants.HttpHeaders.PartitionKey]) {
    headers[Constants.HttpHeaders.PartitionKey] = jsonStringifyAndEscapeNonASCII(partitionKey);
  }

  if (clientOptions.key || clientOptions.tokenProvider) {
    headers[Constants.HttpHeaders.XDate] = new Date().toUTCString();
  }

  if (verb === HTTPMethod.post || verb === HTTPMethod.put) {
    if (!headers[Constants.HttpHeaders.ContentType]) {
      headers[Constants.HttpHeaders.ContentType] = JsonContentType;
    }
  }

  if (!headers[Constants.HttpHeaders.Accept]) {
    headers[Constants.HttpHeaders.Accept] = JsonContentType;
  }

  if (partitionKeyRangeId !== undefined) {
    headers[Constants.HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
  }

  if (options.enableScriptLogging) {
    headers[Constants.HttpHeaders.EnableScriptLogging] = options.enableScriptLogging;
  }

  if (options.disableRUPerMinuteUsage) {
    headers[Constants.HttpHeaders.DisableRUPerMinuteUsage] = true;
  }

  if (options.populateIndexMetrics) {
    headers[Constants.HttpHeaders.PopulateIndexMetrics] = options.populateIndexMetrics;
  }

  if (
    clientOptions.key ||
    clientOptions.resourceTokens ||
    clientOptions.tokenProvider ||
    clientOptions.permissionFeed
  ) {
    await setAuthorizationHeader(clientOptions, verb, path, resourceId, resourceType, headers);
  }
  return headers;
}
