// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReportsGetTimeseriesOptionalParams extends OperationOptions {
  /** The specific endpoint */
  endpointParam?: string;
  /** The country associated with the Timeseries. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html */
  country?: string;
}

/** Optional parameters. */
export interface ReportsGetLatencyScorecardsOptionalParams extends OperationOptions {
  /** The end DateTime of the Latency Scorecard in UTC */
  endDateTimeUTC?: string;
  /** The country associated with the Latency Scorecard. Values are country ISO codes as specified here- https://www.iso.org/iso-3166-country-codes.html */
  country?: string;
}
