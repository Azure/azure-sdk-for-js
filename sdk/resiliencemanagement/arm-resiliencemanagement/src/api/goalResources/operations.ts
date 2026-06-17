// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GoalResource,
  goalResourceDeserializer,
  _GoalResourceListResult,
  _goalResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GoalResourcesListOptionalParams, GoalResourcesGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/goalResources{?api%2Dversion,%24skipToken,%24top}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
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
): Promise<_GoalResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _goalResourceListResultDeserializer(result.body);
}

/** List GoalResource resources by GoalAssignment */
export function list(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GoalResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, goalAssignmentName, options),
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
  goalAssignmentName: string,
  goalResourceName: string,
  options: GoalResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/goalResources/{goalResourceName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
      goalResourceName: goalResourceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GoalResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return goalResourceDeserializer(result.body);
}

/** Get a GoalResource */
export async function get(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  goalResourceName: string,
  options: GoalResourcesGetOptionalParams = { requestOptions: {} },
): Promise<GoalResource> {
  const result = await _getSend(
    context,
    serviceGroupName,
    goalAssignmentName,
    goalResourceName,
    options,
  );
  return _getDeserialize(result);
}
