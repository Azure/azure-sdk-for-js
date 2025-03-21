// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HybridConnectivityManagementAPIContext as Client,
  InventoryGetOptionalParams,
  InventoryListBySolutionConfigurationOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  InventoryResource,
  inventoryResourceDeserializer,
  _InventoryResourceListResult,
  _inventoryResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _inventoryListBySolutionConfigurationSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: InventoryListBySolutionConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory",
      { value: resourceUri, allowReserved: true },
      solutionConfiguration,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _inventoryListBySolutionConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<_InventoryResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _inventoryResourceListResultDeserializer(result.body);
}

/** List InventoryResource resources by SolutionConfiguration */
export function inventoryListBySolutionConfiguration(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: InventoryListBySolutionConfigurationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<InventoryResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _inventoryListBySolutionConfigurationSend(
        context,
        resourceUri,
        solutionConfiguration,
        options,
      ),
    _inventoryListBySolutionConfigurationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _inventoryGetSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  inventoryId: string,
  options: InventoryGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory/{inventoryId}",
      { value: resourceUri, allowReserved: true },
      solutionConfiguration,
      inventoryId,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _inventoryGetDeserialize(
  result: PathUncheckedResponse,
): Promise<InventoryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return inventoryResourceDeserializer(result.body);
}

/** Get a InventoryResource */
export async function inventoryGet(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  inventoryId: string,
  options: InventoryGetOptionalParams = { requestOptions: {} },
): Promise<InventoryResource> {
  const result = await _inventoryGetSend(
    context,
    resourceUri,
    solutionConfiguration,
    inventoryId,
    options,
  );
  return _inventoryGetDeserialize(result);
}
