// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext as Client } from "../index.js";
import type {
  LatencyScorecard,
  Timeseries,
  TimeseriesType,
  LatencyScorecardAggregationInterval,
  TimeseriesAggregationInterval,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  latencyScorecardDeserializer,
  timeseriesDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReportsGetTimeseriesOptionalParams,
  ReportsGetLatencyScorecardsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getTimeseriesSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  experimentName: string,
  startDateTimeUTC: Date,
  endDateTimeUTC: Date,
  aggregationInterval: TimeseriesAggregationInterval,
  timeseriesType: TimeseriesType,
  options: ReportsGetTimeseriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}/timeseries{?api%2Dversion,startDateTimeUTC,endDateTimeUTC,aggregationInterval,timeseriesType,endpoint,country}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
      startDateTimeUTC: startDateTimeUTC.toISOString(),
      endDateTimeUTC: endDateTimeUTC.toISOString(),
      aggregationInterval: aggregationInterval,
      timeseriesType: timeseriesType,
      endpoint: options?.endpointParam,
      country: options?.country,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getTimeseriesDeserialize(
  result: PathUncheckedResponse,
): Promise<Timeseries> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return timeseriesDeserializer(result.body);
}

/** Gets a Timeseries for a given Experiment */
export async function getTimeseries(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  experimentName: string,
  startDateTimeUTC: Date,
  endDateTimeUTC: Date,
  aggregationInterval: TimeseriesAggregationInterval,
  timeseriesType: TimeseriesType,
  options: ReportsGetTimeseriesOptionalParams = { requestOptions: {} },
): Promise<Timeseries> {
  const result = await _getTimeseriesSend(
    context,
    resourceGroupName,
    profileName,
    experimentName,
    startDateTimeUTC,
    endDateTimeUTC,
    aggregationInterval,
    timeseriesType,
    options,
  );
  return _getTimeseriesDeserialize(result);
}

export function _getLatencyScorecardsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  experimentName: string,
  aggregationInterval: LatencyScorecardAggregationInterval,
  options: ReportsGetLatencyScorecardsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/Experiments/{experimentName}/latencyScorecard{?api%2Dversion,endDateTimeUTC,country,aggregationInterval}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      experimentName: experimentName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
      endDateTimeUTC: options?.endDateTimeUTC,
      country: options?.country,
      aggregationInterval: aggregationInterval,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getLatencyScorecardsDeserialize(
  result: PathUncheckedResponse,
): Promise<LatencyScorecard> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return latencyScorecardDeserializer(result.body);
}

/** Gets a Latency Scorecard for a given Experiment */
export async function getLatencyScorecards(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  experimentName: string,
  aggregationInterval: LatencyScorecardAggregationInterval,
  options: ReportsGetLatencyScorecardsOptionalParams = { requestOptions: {} },
): Promise<LatencyScorecard> {
  const result = await _getLatencyScorecardsSend(
    context,
    resourceGroupName,
    profileName,
    experimentName,
    aggregationInterval,
    options,
  );
  return _getLatencyScorecardsDeserialize(result);
}
