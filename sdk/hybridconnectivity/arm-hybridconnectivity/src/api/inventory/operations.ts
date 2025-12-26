// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import type { InventoryResource, _InventoryResourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  inventoryResourceDeserializer,
  _inventoryResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InventoryListBySolutionConfigurationOptionalParams,
  InventoryGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySolutionConfigurationSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: InventoryListBySolutionConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      "api%2Dversion": context.apiVersion,
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
  options: InventoryListBySolutionConfigurationOptionalParams = { requestOptions: {} },
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
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/inventory/{inventoryId}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      inventoryId: inventoryId,
      "api%2Dversion": context.apiVersion,
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
