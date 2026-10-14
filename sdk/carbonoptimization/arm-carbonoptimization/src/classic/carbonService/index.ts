// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CarbonOptimizationManagementContext } from "../../api/carbonOptimizationManagementContext.js";
import {
  queryCarbonEmissionReportsByBillingAccount,
  queryCarbonEmissionDataAvailableDateRange,
  queryCarbonEmissionReports,
} from "../../api/carbonService/operations.js";
import type {
  CarbonServiceQueryCarbonEmissionReportsByBillingAccountOptionalParams,
  CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  CarbonServiceQueryCarbonEmissionReportsOptionalParams,
} from "../../api/carbonService/options.js";
import type {
  QueryFilterUnion,
  CarbonEmissionDataListResult,
  CarbonEmissionDataUnion,
  CarbonEmissionDataAvailableDateRange,
  BillingAccountQueryFilterUnion,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CarbonService operations. */
export interface CarbonServiceOperations {
  /** API for Carbon Emissions Reports scoped to a billing account. */
  queryCarbonEmissionReportsByBillingAccount: (
    scope: string,
    queryParameters: BillingAccountQueryFilterUnion,
    options?: CarbonServiceQueryCarbonEmissionReportsByBillingAccountOptionalParams,
  ) => Promise<CarbonEmissionDataListResult>;
  /** API for query carbon emission data available date range */
  queryCarbonEmissionDataAvailableDateRange: (
    options?: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  ) => Promise<CarbonEmissionDataAvailableDateRange>;
  /** API for Carbon Emissions Reports */
  queryCarbonEmissionReports: (
    queryParameters: QueryFilterUnion,
    options?: CarbonServiceQueryCarbonEmissionReportsOptionalParams,
  ) => PagedAsyncIterableIterator<CarbonEmissionDataUnion>;
}

function _getCarbonService(context: CarbonOptimizationManagementContext) {
  return {
    queryCarbonEmissionReportsByBillingAccount: (
      scope: string,
      queryParameters: BillingAccountQueryFilterUnion,
      options?: CarbonServiceQueryCarbonEmissionReportsByBillingAccountOptionalParams,
    ) => queryCarbonEmissionReportsByBillingAccount(context, scope, queryParameters, options),
    queryCarbonEmissionDataAvailableDateRange: (
      options?: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
    ) => queryCarbonEmissionDataAvailableDateRange(context, options),
    queryCarbonEmissionReports: (
      queryParameters: QueryFilterUnion,
      options?: CarbonServiceQueryCarbonEmissionReportsOptionalParams,
    ) => queryCarbonEmissionReports(context, queryParameters, options),
  };
}

export function _getCarbonServiceOperations(
  context: CarbonOptimizationManagementContext,
): CarbonServiceOperations {
  return {
    ..._getCarbonService(context),
  };
}
