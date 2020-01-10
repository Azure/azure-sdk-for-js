// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common";
import { QueryMetrics } from "../queryMetrics/queryMetrics";

export interface CosmosHeaders {
  [key: string]: any;
}

/** @hidden */
// TODO: docs
export function getRequestChargeIfAny(headers: CosmosHeaders | number): number {
  if (typeof headers === "number") {
    return headers;
  } else if (typeof headers === "string") {
    return parseFloat(headers);
  }

  if (headers) {
    const rc = headers[Constants.HttpHeaders.RequestCharge];
    if (rc) {
      return parseFloat(rc as string);
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

/**
 * @ignore
 */
export function getInitialHeader(): CosmosHeaders {
  const headers: CosmosHeaders = {};
  headers[Constants.HttpHeaders.RequestCharge] = 0;
  headers[Constants.HttpHeaders.QueryMetrics] = {};
  return headers;
}

/**
 * @ignore
 * @param headers
 * @param toBeMergedHeaders
 */
// TODO: The name of this method isn't very accurate to what it does
export function mergeHeaders(headers: CosmosHeaders, toBeMergedHeaders: CosmosHeaders) {
  if (headers[Constants.HttpHeaders.RequestCharge] === undefined) {
    headers[Constants.HttpHeaders.RequestCharge] = 0;
  }

  if (headers[Constants.HttpHeaders.QueryMetrics] === undefined) {
    headers[Constants.HttpHeaders.QueryMetrics] = QueryMetrics.zero;
  }

  if (!toBeMergedHeaders) {
    return;
  }

  headers[Constants.HttpHeaders.RequestCharge] += getRequestChargeIfAny(toBeMergedHeaders);
  if (toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed]) {
    headers[Constants.HttpHeaders.IsRUPerMinuteUsed] =
      toBeMergedHeaders[Constants.HttpHeaders.IsRUPerMinuteUsed];
  }

  if (Constants.HttpHeaders.QueryMetrics in toBeMergedHeaders) {
    const headerQueryMetrics = headers[Constants.HttpHeaders.QueryMetrics];
    const toBeMergedHeaderQueryMetrics = toBeMergedHeaders[Constants.HttpHeaders.QueryMetrics];

    for (const partitionId in toBeMergedHeaderQueryMetrics) {
      if (partitionId in headerQueryMetrics) {
        const combinedQueryMetrics = headerQueryMetrics[partitionId].add([
          toBeMergedHeaderQueryMetrics[partitionId]
        ]);
        headerQueryMetrics[partitionId] = combinedQueryMetrics;
      } else {
        headerQueryMetrics[partitionId] = toBeMergedHeaderQueryMetrics[partitionId];
      }
    }
  }
}
