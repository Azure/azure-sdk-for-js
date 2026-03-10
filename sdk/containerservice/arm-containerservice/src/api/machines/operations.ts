// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { Machine, _MachineListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  machineDeserializer,
  _machineListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { MachinesListOptionalParams, MachinesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: MachinesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/machines{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_MachineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _machineListResultDeserializer(result.body);
}

/** Gets a list of machines in the specified agent pool. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: MachinesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Machine> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, agentPoolName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  machineName: string,
  options: MachinesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/machines/{machineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Machine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return machineDeserializer(result.body);
}

/** Get a specific machine in the specified agent pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  machineName: string,
  options: MachinesGetOptionalParams = { requestOptions: {} },
): Promise<Machine> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    agentPoolName,
    machineName,
    options,
  );
  return _getDeserialize(result);
}
