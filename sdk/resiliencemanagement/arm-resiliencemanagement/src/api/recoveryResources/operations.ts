// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  RecoveryResource,
  recoveryResourceDeserializer,
  _RecoveryResourceListResult,
  _recoveryResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RecoveryResourcesListOptionalParams,
  RecoveryResourcesGetOptionalParams,
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
  options: RecoveryResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryResources{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
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
): Promise<_RecoveryResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _recoveryResourceListResultDeserializer(result.body);
}

/** List RecoveryResource resources by RecoveryPlan */
export function list(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  options: RecoveryResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, recoveryPlanName, options),
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
  recoveryResourceName: string,
  options: RecoveryResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryResources/{recoveryResourceName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryResourceName: recoveryResourceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RecoveryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recoveryResourceDeserializer(result.body);
}

/** Get a RecoveryResource */
export async function get(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryResourceName: string,
  options: RecoveryResourcesGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryResource> {
  const result = await _getSend(
    context,
    serviceGroupName,
    recoveryPlanName,
    recoveryResourceName,
    options,
  );
  return _getDeserialize(result);
}
