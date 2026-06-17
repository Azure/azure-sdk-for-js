// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  RecoveryJobResource,
  recoveryJobResourceDeserializer,
  _RecoveryJobResourceListResult,
  _recoveryJobResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RecoveryJobResourcesListOptionalParams,
  RecoveryJobResourcesGetOptionalParams,
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
  recoveryPlanName: string,
  recoveryJobName: string,
  options: RecoveryJobResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/recoveryJobResources{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryJobName: recoveryJobName,
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
): Promise<_RecoveryJobResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _recoveryJobResourceListResultDeserializer(result.body);
}

/** List RecoveryJobResource resources by RecoveryJob */
export function list(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  options: RecoveryJobResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryJobResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, recoveryPlanName, recoveryJobName, options),
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
  recoveryPlanName: string,
  recoveryJobName: string,
  recoveryJobResourceName: string,
  options: RecoveryJobResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/recoveryJobResources/{recoveryJobResourceName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryJobName: recoveryJobName,
      recoveryJobResourceName: recoveryJobResourceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RecoveryJobResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoveryJobResourceDeserializer(result.body);
}

/** Get a RecoveryJobResource */
export async function get(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  recoveryJobResourceName: string,
  options: RecoveryJobResourcesGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryJobResource> {
  const result = await _getSend(
    context,
    serviceGroupName,
    recoveryPlanName,
    recoveryJobName,
    recoveryJobResourceName,
    options,
  );
  return _getDeserialize(result);
}
