// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext as Client } from "../index.js";
import type {
  ContainerAppsFunction,
  _ContainerAppsFunctionCollection,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  containerAppsFunctionDeserializer,
  _containerAppsFunctionCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContainerAppsFunctionsListOptionalParams,
  ContainerAppsFunctionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsFunctionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/functions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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
): Promise<_ContainerAppsFunctionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerAppsFunctionCollectionDeserializer(result.body);
}

/** Lists the functions available in the latest revision of a Container App. */
export function list(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsFunctionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerAppsFunction> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, containerAppName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  functionName: string,
  options: ContainerAppsFunctionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/functions/{functionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      functionName: functionName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerAppsFunction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppsFunctionDeserializer(result.body);
}

/** Gets the details of a specific function from the latest Container App revision. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  functionName: string,
  options: ContainerAppsFunctionsGetOptionalParams = { requestOptions: {} },
): Promise<ContainerAppsFunction> {
  const result = await _getSend(
    context,
    resourceGroupName,
    containerAppName,
    functionName,
    options,
  );
  return _getDeserialize(result);
}
