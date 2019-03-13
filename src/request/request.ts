import { AuthOptions, setAuthorizationHeader } from "../auth";
import { Constants, HTTPMethod, jsonStringifyAndEscapeNonASCII, ResourceType } from "../common";
import { CosmosHeaders } from "../queryExecutionContext";
import { FeedOptions, MediaOptions, RequestOptions } from "./index";

// ----------------------------------------------------------------------------
// Utility methods
//

/** @hidden */
function javaScriptFriendlyJSONStringify(s: object) {
  // two line terminators (Line separator and Paragraph separator) are not needed to be escaped in JSON
  // but are needed to be escaped in JavaScript.
  return JSON.stringify(s)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** @hidden */
export function bodyFromData(data: Buffer | string | object) {
  if (typeof data === "object") {
    return javaScriptFriendlyJSONStringify(data);
  }
  return data;
}

export async function getHeaders(
  authOptions: AuthOptions,
  defaultHeaders: CosmosHeaders,
  verb: HTTPMethod,
  path: string,
  resourceId: string,
  resourceType: ResourceType,
  options: RequestOptions | FeedOptions | MediaOptions,
  partitionKeyRangeId?: string,
  useMultipleWriteLocations?: boolean
): Promise<CosmosHeaders> {
  const headers: CosmosHeaders = { ...defaultHeaders };
  const opts: RequestOptions & FeedOptions & MediaOptions = (options || {}) as any; // TODO: this is dirty

  if (useMultipleWriteLocations) {
    headers[Constants.HttpHeaders.ALLOW_MULTIPLE_WRITES] = true;
  }

  if (opts.continuation) {
    headers[Constants.HttpHeaders.Continuation] = opts.continuation;
  }

  if (opts.preTriggerInclude) {
    headers[Constants.HttpHeaders.PreTriggerInclude] =
      opts.preTriggerInclude.constructor === Array
        ? (opts.preTriggerInclude as string[]).join(",")
        : (opts.preTriggerInclude as string);
  }

  if (opts.postTriggerInclude) {
    headers[Constants.HttpHeaders.PostTriggerInclude] =
      opts.postTriggerInclude.constructor === Array
        ? (opts.postTriggerInclude as string[]).join(",")
        : (opts.postTriggerInclude as string);
  }

  if (opts.offerType) {
    headers[Constants.HttpHeaders.OfferType] = opts.offerType;
  }

  if (opts.offerThroughput) {
    headers[Constants.HttpHeaders.OfferThroughput] = opts.offerThroughput;
  }

  if (opts.maxItemCount) {
    headers[Constants.HttpHeaders.PageSize] = opts.maxItemCount;
  }

  if (opts.accessCondition) {
    if (opts.accessCondition.type === "IfMatch") {
      headers[Constants.HttpHeaders.IfMatch] = opts.accessCondition.condition;
    } else {
      headers[Constants.HttpHeaders.IfNoneMatch] = opts.accessCondition.condition;
    }
  }

  if (opts.useIncrementalFeed) {
    headers[Constants.HttpHeaders.A_IM] = "Incremental Feed";
  }

  if (opts.indexingDirective) {
    headers[Constants.HttpHeaders.IndexingDirective] = opts.indexingDirective;
  }

  if (opts.consistencyLevel) {
    headers[Constants.HttpHeaders.ConsistencyLevel] = opts.consistencyLevel;
  }

  if (opts.resourceTokenExpirySeconds) {
    headers[Constants.HttpHeaders.ResourceTokenExpiry] = opts.resourceTokenExpirySeconds;
  }

  if (opts.sessionToken) {
    headers[Constants.HttpHeaders.SessionToken] = opts.sessionToken;
  }

  if (opts.enableScanInQuery) {
    headers[Constants.HttpHeaders.EnableScanInQuery] = opts.enableScanInQuery;
  }

  if (opts.enableCrossPartitionQuery) {
    headers[Constants.HttpHeaders.EnableCrossPartitionQuery] = opts.enableCrossPartitionQuery;
  }

  if (opts.populateQuotaInfo) {
    headers[Constants.HttpHeaders.PopulateQuotaInfo] = opts.populateQuotaInfo;
  }

  if (opts.populateQueryMetrics) {
    headers[Constants.HttpHeaders.PopulateQueryMetrics] = opts.populateQueryMetrics;
  }

  if (opts.maxDegreeOfParallelism !== undefined) {
    headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] = true;
  }

  if (opts.populateQuotaInfo) {
    headers[Constants.HttpHeaders.PopulateQuotaInfo] = true;
  }

  if (opts.partitionKey !== undefined) {
    let partitionKey: string[] | string = opts.partitionKey;
    if (partitionKey === null || !Array.isArray(partitionKey)) {
      partitionKey = [partitionKey as string];
    }
    headers[Constants.HttpHeaders.PartitionKey] = jsonStringifyAndEscapeNonASCII(partitionKey);
  }

  if (authOptions.masterKey || authOptions.key || authOptions.tokenProvider) {
    headers[Constants.HttpHeaders.XDate] = new Date().toUTCString();
  }

  if (verb === HTTPMethod.post || verb === HTTPMethod.put) {
    if (!headers[Constants.HttpHeaders.ContentType]) {
      headers[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.Json;
    }
  }

  if (!headers[Constants.HttpHeaders.Accept]) {
    headers[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Json;
  }

  if (partitionKeyRangeId !== undefined) {
    headers[Constants.HttpHeaders.PartitionKeyRangeID] = partitionKeyRangeId;
  }

  if (opts.enableScriptLogging) {
    headers[Constants.HttpHeaders.EnableScriptLogging] = opts.enableScriptLogging;
  }

  if (opts.offerEnableRUPerMinuteThroughput) {
    headers[Constants.HttpHeaders.OfferIsRUPerMinuteThroughputEnabled] = true;
  }

  if (opts.disableRUPerMinuteUsage) {
    headers[Constants.HttpHeaders.DisableRUPerMinuteUsage] = true;
  }
  if (
    authOptions.masterKey ||
    authOptions.key ||
    authOptions.resourceTokens ||
    authOptions.tokenProvider ||
    authOptions.permissionFeed
  ) {
    await setAuthorizationHeader(authOptions, verb, path, resourceId, resourceType, headers);
  }
  return headers;
}
