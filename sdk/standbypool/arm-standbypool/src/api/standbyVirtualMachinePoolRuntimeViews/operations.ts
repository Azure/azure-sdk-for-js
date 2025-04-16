// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  StandbyVirtualMachinePoolRuntimeViewResource,
  standbyVirtualMachinePoolRuntimeViewResourceDeserializer,
  _StandbyVirtualMachinePoolRuntimeViewResourceListResult,
  _standbyVirtualMachinePoolRuntimeViewResourceListResultDeserializer,
} from "../../models/models.js";
import {
  StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByStandbyPoolSend(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}/runtimeViews{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyVirtualMachinePoolName: standbyVirtualMachinePoolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByStandbyPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyVirtualMachinePoolRuntimeViewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _standbyVirtualMachinePoolRuntimeViewResourceListResultDeserializer(result.body);
}

/** List StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource */
export function listByStandbyPool(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinePoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyVirtualMachinePoolRuntimeViewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStandbyPoolSend(context, resourceGroupName, standbyVirtualMachinePoolName, options),
    _listByStandbyPoolDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  runtimeView: string,
  options: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}/runtimeViews/{runtimeView}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyVirtualMachinePoolName: standbyVirtualMachinePoolName,
      runtimeView: runtimeView,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyVirtualMachinePoolRuntimeViewResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return standbyVirtualMachinePoolRuntimeViewResourceDeserializer(result.body);
}

/** Get a StandbyVirtualMachinePoolRuntimeViewResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  runtimeView: string,
  options: StandbyVirtualMachinePoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<StandbyVirtualMachinePoolRuntimeViewResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    standbyVirtualMachinePoolName,
    runtimeView,
    options,
  );
  return _getDeserialize(result);
}
