import { AuthOptions, setAuthorizationHeader } from "../auth";
import { Constants, HTTPMethod, jsonStringifyAndEscapeNonASCII, ResourceType } from "../common";
import { CosmosHeaders } from "../queryExecutionContext";
import { FeedOptions, RequestOptions } from "./index";

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

interface GetHeadersOptions {
  authOptions: AuthOptions;
  defaultHeaders: CosmosHeaders;
  verb: HTTPMethod;
  path: string;
  resourceId: string;
  resourceType: ResourceType;
  options: RequestOptions & FeedOptions;
  partitionKeyRangeId?: string;
  useMultipleWriteLocations?: boolean;
}

export async function getHeaders({
  authOptions,
  defaultHeaders,
  verb,
  path,
  resourceId,
  resourceType,
  options,
  partitionKeyRangeId,
  useMultipleWriteLocations
}: GetHeadersOptions): Promise<CosmosHeaders> {
  const headers: CosmosHeaders = { ...defaultHeaders };

  if (useMultipleWriteLocations) {
    headers[Constants.HttpHeaders.ALLOW_MULTIPLE_WRITES] = true;
  }

  if (options.continuation) {
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

  if (options.resourceTokenExpirySeconds) {
    headers[Constants.HttpHeaders.ResourceTokenExpiry] = options.resourceTokenExpirySeconds;
  }

  if (options.sessionToken) {
    headers[Constants.HttpHeaders.SessionToken] = options.sessionToken;
  }

  if (options.enableScanInQuery) {
    headers[Constants.HttpHeaders.EnableScanInQuery] = options.enableScanInQuery;
  }

  if (options.enableCrossPartitionQuery) {
    headers[Constants.HttpHeaders.EnableCrossPartitionQuery] = options.enableCrossPartitionQuery;
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

  if (options.partitionKey !== undefined) {
    if (options.partitionKey === null || !Array.isArray(options.partitionKey)) {
      options.partitionKey = [options.partitionKey as string];
    }
    headers[Constants.HttpHeaders.PartitionKey] = jsonStringifyAndEscapeNonASCII(options.partitionKey);
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

  if (options.enableScriptLogging) {
    headers[Constants.HttpHeaders.EnableScriptLogging] = options.enableScriptLogging;
  }

  if (options.disableRUPerMinuteUsage) {
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
