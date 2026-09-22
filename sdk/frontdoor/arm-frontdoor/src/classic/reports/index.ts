// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import { getTimeseries, getLatencyScorecards } from "../../api/reports/operations.js";
import type {
  ReportsGetTimeseriesOptionalParams,
  ReportsGetLatencyScorecardsOptionalParams,
} from "../../api/reports/options.js";
import type {
  LatencyScorecard,
  Timeseries,
  TimeseriesType,
  LatencyScorecardAggregationInterval,
  TimeseriesAggregationInterval,
} from "../../models/models.js";

/** Interface representing a Reports operations. */
export interface ReportsOperations {
  /** Gets a Timeseries for a given Experiment */
  getTimeseries: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    startDateTimeUTC: Date,
    endDateTimeUTC: Date,
    aggregationInterval: TimeseriesAggregationInterval,
    timeseriesType: TimeseriesType,
    options?: ReportsGetTimeseriesOptionalParams,
  ) => Promise<Timeseries>;
  /** Gets a Latency Scorecard for a given Experiment */
  getLatencyScorecards: (
    resourceGroupName: string,
    profileName: string,
    experimentName: string,
    aggregationInterval: LatencyScorecardAggregationInterval,
    options?: ReportsGetLatencyScorecardsOptionalParams,
  ) => Promise<LatencyScorecard>;
}

function _getReports(context: FrontDoorManagementContext) {
  return {
    getTimeseries: (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      startDateTimeUTC: Date,
      endDateTimeUTC: Date,
      aggregationInterval: TimeseriesAggregationInterval,
      timeseriesType: TimeseriesType,
      options?: ReportsGetTimeseriesOptionalParams,
    ) =>
      getTimeseries(
        context,
        resourceGroupName,
        profileName,
        experimentName,
        startDateTimeUTC,
        endDateTimeUTC,
        aggregationInterval,
        timeseriesType,
        options,
      ),
    getLatencyScorecards: (
      resourceGroupName: string,
      profileName: string,
      experimentName: string,
      aggregationInterval: LatencyScorecardAggregationInterval,
      options?: ReportsGetLatencyScorecardsOptionalParams,
    ) =>
      getLatencyScorecards(
        context,
        resourceGroupName,
        profileName,
        experimentName,
        aggregationInterval,
        options,
      ),
  };
}

export function _getReportsOperations(context: FrontDoorManagementContext): ReportsOperations {
  return {
    ..._getReports(context),
  };
}
