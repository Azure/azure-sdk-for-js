// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CarbonOptimizationManagementContext } from "../../api/carbonOptimizationManagementContext.js";
import {
  QueryFilterUnion,
  CarbonEmissionDataListResult,
  CarbonEmissionDataAvailableDateRange,
} from "../../models/models.js";
import {
  CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  CarbonServiceQueryCarbonEmissionReportsOptionalParams,
} from "../../api/carbonService/options.js";
import {
  queryCarbonEmissionDataAvailableDateRange,
  queryCarbonEmissionReports,
} from "../../api/carbonService/operations.js";

/** Interface representing a CarbonService operations. */
export interface CarbonServiceOperations {
  /** API for query carbon emission data available date range */
  queryCarbonEmissionDataAvailableDateRange: (
    options?: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  ) => Promise<CarbonEmissionDataAvailableDateRange>;
  /** API for Carbon Emissions Reports */
  queryCarbonEmissionReports: (
    queryParameters: QueryFilterUnion,
    options?: CarbonServiceQueryCarbonEmissionReportsOptionalParams,
  ) => Promise<CarbonEmissionDataListResult>;
}

function _getCarbonService(context: CarbonOptimizationManagementContext) {
  return {
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
