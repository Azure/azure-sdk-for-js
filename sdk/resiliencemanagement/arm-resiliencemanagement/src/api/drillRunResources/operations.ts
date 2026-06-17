// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DrillRunResource,
  drillRunResourceDeserializer,
  _DrillRunResourceListResult,
  _drillRunResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DrillRunResourcesListOptionalParams,
  DrillRunResourcesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/drillRunResources{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DrillRunResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _drillRunResourceListResultDeserializer(result.body);
}

/** List DrillRunResource resources by DrillRun */
export function list(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  drillRunName: string,
  options: DrillRunResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DrillRunResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, drillName, drillRunName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  drillRunName: string,
  drillRunResourceName: string,
  options: DrillRunResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/drillRunResources/{drillRunResourceName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillRunName: drillRunName,
      drillRunResourceName: drillRunResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DrillRunResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return drillRunResourceDeserializer(result.body);
}

/** Get a DrillRunResource */
export async function get(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  drillRunName: string,
  drillRunResourceName: string,
  options: DrillRunResourcesGetOptionalParams = { requestOptions: {} },
): Promise<DrillRunResource> {
  const result = await _getSend(
    context,
    serviceGroupName,
    drillName,
    drillRunName,
    drillRunResourceName,
    options,
  );
  return _getDeserialize(result);
}
