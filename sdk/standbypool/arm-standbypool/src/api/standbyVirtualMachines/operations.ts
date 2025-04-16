// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  StandbyVirtualMachineResource,
  standbyVirtualMachineResourceDeserializer,
  _StandbyVirtualMachineResourceListResult,
  _standbyVirtualMachineResourceListResultDeserializer,
} from "../../models/models.js";
import {
  StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams,
  StandbyVirtualMachinesGetOptionalParams,
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

export function _listByStandbyVirtualMachinePoolResourceSend(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}/standbyVirtualMachines{?api%2Dversion}",
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

export async function _listByStandbyVirtualMachinePoolResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyVirtualMachineResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _standbyVirtualMachineResourceListResultDeserializer(result.body);
}

/** List StandbyVirtualMachineResource resources by StandbyVirtualMachinePoolResource */
export function listByStandbyVirtualMachinePoolResource(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  options: StandbyVirtualMachinesListByStandbyVirtualMachinePoolResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyVirtualMachineResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStandbyVirtualMachinePoolResourceSend(
        context,
        resourceGroupName,
        standbyVirtualMachinePoolName,
        options,
      ),
    _listByStandbyVirtualMachinePoolResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  standbyVirtualMachineName: string,
  options: StandbyVirtualMachinesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyVirtualMachinePools/{standbyVirtualMachinePoolName}/standbyVirtualMachines/{standbyVirtualMachineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyVirtualMachinePoolName: standbyVirtualMachinePoolName,
      standbyVirtualMachineName: standbyVirtualMachineName,
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
): Promise<StandbyVirtualMachineResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return standbyVirtualMachineResourceDeserializer(result.body);
}

/** Get a StandbyVirtualMachineResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  standbyVirtualMachinePoolName: string,
  standbyVirtualMachineName: string,
  options: StandbyVirtualMachinesGetOptionalParams = { requestOptions: {} },
): Promise<StandbyVirtualMachineResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    standbyVirtualMachinePoolName,
    standbyVirtualMachineName,
    options,
  );
  return _getDeserialize(result);
}
