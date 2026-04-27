// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type { HealthReport, _HealthReportsList } from "../../models/healthReportsAPI/models.js";
import {
  healthReportDeserializer,
  _healthReportsListDeserializer,
} from "../../models/healthReportsAPI/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { HealthReportsListOptionalParams, HealthReportsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: HealthReportsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/healthReports{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2023-05-01-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_HealthReportsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _healthReportsListDeserializer(result.body);
}

/** Get a list of all health reports inside a scope. Valid scopes are: subscription (format: 'subscriptions/{subscriptionId}'), or security connector (format: 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName})' */
export function list(
  context: Client,
  scope: string,
  options: HealthReportsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HealthReport> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-05-01-preview" },
  );
}

export function _getSend(
  context: Client,
  resourceId: string,
  healthReportName: string,
  options: HealthReportsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/healthReports/{healthReportName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      healthReportName: healthReportName,
      "api%2Dversion": "2023-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HealthReport> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return healthReportDeserializer(result.body);
}

/** Get health report of resource */
export async function get(
  context: Client,
  resourceId: string,
  healthReportName: string,
  options: HealthReportsGetOptionalParams = { requestOptions: {} },
): Promise<HealthReport> {
  const result = await _getSend(context, resourceId, healthReportName, options);
  return _getDeserialize(result);
}
