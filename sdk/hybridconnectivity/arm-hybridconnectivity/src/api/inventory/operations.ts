// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  InventoryResource,
  inventoryResourceDeserializer,
  _InventoryResourceListResult,
  _inventoryResourceListResultDeserializer,
} from "../../models/models.js";
import {
  InventoryListBySolutionConfigurationOptionalParams,
  InventoryGetOptionalParams,
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

export function _listBySolutionConfigurationSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: InventoryListBySolutionConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory{?api-version}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      "api-version": context.apiVersion,
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

export async function _listBySolutionConfigurationDeserialize(
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
export function listBySolutionConfiguration(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: InventoryListBySolutionConfigurationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<InventoryResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySolutionConfigurationSend(context, resourceUri, solutionConfiguration, options),
    _listBySolutionConfigurationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  inventoryId: string,
  options: InventoryGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory/{inventoryId}{?api-version}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      inventoryId: inventoryId,
      "api-version": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InventoryResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return inventoryResourceDeserializer(result.body);
}

/** Get a InventoryResource */
export async function get(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  inventoryId: string,
  options: InventoryGetOptionalParams = { requestOptions: {} },
): Promise<InventoryResource> {
  const result = await _getSend(context, resourceUri, solutionConfiguration, inventoryId, options);
  return _getDeserialize(result);
}
