// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DrillResource,
  drillResourceDeserializer,
  _DrillResourceListResult,
  _drillResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { DrillResourcesListOptionalParams, DrillResourcesGetOptionalParams } from "./options.js";
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
  options: DrillResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillResources{?api%2Dversion,%24skipToken,%24top}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      "%24skipToken": options?.skipToken,
      "%24top": options?.top,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DrillResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _drillResourceListResultDeserializer(result.body);
}

/** List DrillResource resources by Drill */
export function list(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  options: DrillResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DrillResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, drillName, options),
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
  drillResourceName: string,
  options: DrillResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillResources/{drillResourceName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      drillResourceName: drillResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DrillResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return drillResourceDeserializer(result.body);
}

/** Get a DrillResource */
export async function get(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  drillResourceName: string,
  options: DrillResourcesGetOptionalParams = { requestOptions: {} },
): Promise<DrillResource> {
  const result = await _getSend(context, serviceGroupName, drillName, drillResourceName, options);
  return _getDeserialize(result);
}
