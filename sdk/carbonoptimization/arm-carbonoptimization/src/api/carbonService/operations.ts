// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CarbonOptimizationManagementContext as Client } from "../index.js";
import type {
  QueryFilterUnion,
  CarbonEmissionDataListResult,
  CarbonEmissionDataUnion,
  CarbonEmissionDataAvailableDateRange,
  BillingAccountQueryFilterUnion,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  queryFilterUnionSerializer,
  carbonEmissionDataListResultDeserializer,
  carbonEmissionDataAvailableDateRangeDeserializer,
  billingAccountQueryFilterUnionSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CarbonServiceQueryCarbonEmissionReportsByBillingAccountOptionalParams,
  CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  CarbonServiceQueryCarbonEmissionReportsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _queryCarbonEmissionReportsByBillingAccountSend(
  context: Client,
  scope: string,
  queryParameters: BillingAccountQueryFilterUnion,
  options: CarbonServiceQueryCarbonEmissionReportsByBillingAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Carbon/carbonEmissionReports{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingAccountQueryFilterUnionSerializer(queryParameters),
  });
}

export async function _queryCarbonEmissionReportsByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<CarbonEmissionDataListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return carbonEmissionDataListResultDeserializer(result.body);
}

/** API for Carbon Emissions Reports scoped to a billing account. */
export async function queryCarbonEmissionReportsByBillingAccount(
  context: Client,
  scope: string,
  queryParameters: BillingAccountQueryFilterUnion,
  options: CarbonServiceQueryCarbonEmissionReportsByBillingAccountOptionalParams = {
    requestOptions: {},
  },
): Promise<CarbonEmissionDataListResult> {
  const result = await _queryCarbonEmissionReportsByBillingAccountSend(
    context,
    scope,
    queryParameters,
    options,
  );
  return _queryCarbonEmissionReportsByBillingAccountDeserialize(result);
}

export function _queryCarbonEmissionDataAvailableDateRangeSend(
  context: Client,
  options: CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Carbon/queryCarbonEmissionDataAvailableDateRange{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _queryCarbonEmissionDataAvailableDateRangeDeserialize(
  result: PathUncheckedResponse,
): Promise<CarbonEmissionDataAvailableDateRange> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
  options: CarbonServiceQueryCarbonEmissionReportsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Carbon/carbonEmissionReports{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryFilterUnionSerializer(queryParameters),
  });
}

export async function _queryCarbonEmissionReportsDeserialize(
  result: PathUncheckedResponse,
): Promise<CarbonEmissionDataListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return carbonEmissionDataListResultDeserializer(result.body);
}

/** API for Carbon Emissions Reports */
export function queryCarbonEmissionReports(
  context: Client,
  queryParameters: QueryFilterUnion,
  options: CarbonServiceQueryCarbonEmissionReportsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CarbonEmissionDataUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _queryCarbonEmissionReportsSend(context, queryParameters, options),
    _queryCarbonEmissionReportsDeserialize,
    ["200"],
    { itemName: "value", apiVersion: context.apiVersion ?? "2026-05-01-preview" },
  );
}
