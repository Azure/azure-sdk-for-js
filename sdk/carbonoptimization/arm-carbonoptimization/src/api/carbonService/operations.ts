// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CarbonContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  queryFilterUnionSerializer,
  QueryFilterUnion,
  CarbonEmissionDataListResult,
  carbonEmissionDataListResultDeserializer,
  CarbonEmissionDataAvailableDateRange,
  carbonEmissionDataAvailableDateRangeDeserializer,
} from "../../models/models.js";
import {
  CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  CarbonServiceQueryCarbonEmissionReportsOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _queryCarbonEmissionDataAvailableDateRangeSend(
  context: Client,
  options: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Carbon/queryCarbonEmissionDataAvailableDateRange{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _queryCarbonEmissionDataAvailableDateRangeDeserialize(
  result: PathUncheckedResponse,
): Promise<CarbonEmissionDataAvailableDateRange> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return carbonEmissionDataAvailableDateRangeDeserializer(result.body);
}

/** API for query carbon emission data available date range */
export async function queryCarbonEmissionDataAvailableDateRange(
  context: Client,
  options: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams = {
    requestOptions: {},
  },
): Promise<CarbonEmissionDataAvailableDateRange> {
  const result = await _queryCarbonEmissionDataAvailableDateRangeSend(context, options);
  return _queryCarbonEmissionDataAvailableDateRangeDeserialize(result);
}

export function _queryCarbonEmissionReportsSend(
  context: Client,
  queryParameters: QueryFilterUnion,
  options: CarbonServiceQueryCarbonEmissionReportsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Carbon/carbonEmissionReports{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: queryFilterUnionSerializer(queryParameters),
  });
}

export async function _queryCarbonEmissionReportsDeserialize(
  result: PathUncheckedResponse,
): Promise<CarbonEmissionDataListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return carbonEmissionDataListResultDeserializer(result.body);
}

/** API for Carbon Emissions Reports */
export async function queryCarbonEmissionReports(
  context: Client,
  queryParameters: QueryFilterUnion,
  options: CarbonServiceQueryCarbonEmissionReportsOptionalParams = {
    requestOptions: {},
  },
): Promise<CarbonEmissionDataListResult> {
  const result = await _queryCarbonEmissionReportsSend(context, queryParameters, options);
  return _queryCarbonEmissionReportsDeserialize(result);
}
