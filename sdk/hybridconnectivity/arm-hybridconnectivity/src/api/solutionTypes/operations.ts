// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SolutionTypeResource,
  solutionTypeResourceDeserializer,
  _SolutionTypeResourceListResult,
  _solutionTypeResourceListResultDeserializer,
} from "../../models/models.js";
import {
  SolutionTypesListBySubscriptionOptionalParams,
  SolutionTypesListByResourceGroupOptionalParams,
  SolutionTypesGetOptionalParams,
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

export function _solutionTypesListBySubscriptionSend(
  context: Client,
  options: SolutionTypesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridConnectivity/solutionTypes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _solutionTypesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SolutionTypeResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _solutionTypeResourceListResultDeserializer(result.body);
}

/** List SolutionTypeResource resources by subscription ID */
export function solutionTypesListBySubscription(
  context: Client,
  options: SolutionTypesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SolutionTypeResource> {
  return buildPagedAsyncIterator(
    context,
    () => _solutionTypesListBySubscriptionSend(context, options),
    _solutionTypesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _solutionTypesListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SolutionTypesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/solutionTypes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _solutionTypesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SolutionTypeResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _solutionTypeResourceListResultDeserializer(result.body);
}

/** List SolutionTypeResource resources by resource group */
export function solutionTypesListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SolutionTypesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SolutionTypeResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _solutionTypesListByResourceGroupSend(
        context,
        resourceGroupName,
        options,
      ),
    _solutionTypesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _solutionTypesGetSend(
  context: Client,
  resourceGroupName: string,
  solutionType: string,
  options: SolutionTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridConnectivity/solutionTypes/{solutionType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionType: solutionType,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _solutionTypesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionTypeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionTypeResourceDeserializer(result.body);
}

/** Get a SolutionTypeResource */
export async function solutionTypesGet(
  context: Client,
  resourceGroupName: string,
  solutionType: string,
  options: SolutionTypesGetOptionalParams = { requestOptions: {} },
): Promise<SolutionTypeResource> {
  const result = await _solutionTypesGetSend(
    context,
    resourceGroupName,
    solutionType,
    options,
  );
  return _solutionTypesGetDeserialize(result);
}
