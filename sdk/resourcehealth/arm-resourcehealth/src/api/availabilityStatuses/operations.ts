// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AvailabilityStatus,
  availabilityStatusDeserializer,
  _AvailabilityStatusListResult,
  _availabilityStatusListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AvailabilityStatusesListByResourceGroupOptionalParams,
  AvailabilityStatusesListOptionalParams,
  AvailabilityStatusesListBySubscriptionIdOptionalParams,
  AvailabilityStatusesGetByResourceOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AvailabilityStatusesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceHealth/availabilityStatuses{?api%2Dversion,%24filter,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvailabilityStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _availabilityStatusListResultDeserializer(result.body);
}

/** Lists the current availability status for all the resources in the resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AvailabilityStatusesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailabilityStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: AvailabilityStatusesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ResourceHealth/availabilityStatuses{?api%2Dversion,%24filter,%24expand}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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
): Promise<_AvailabilityStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _availabilityStatusListResultDeserializer(result.body);
}

/** Lists all historical availability transitions and impacting events for a single resource. */
export function list(
  context: Client,
  resourceUri: string,
  options: AvailabilityStatusesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailabilityStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listBySubscriptionIdSend(
  context: Client,
  options: AvailabilityStatusesListBySubscriptionIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceHealth/availabilityStatuses{?api%2Dversion,%24filter,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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

export async function _listBySubscriptionIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvailabilityStatusListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _availabilityStatusListResultDeserializer(result.body);
}

/** Lists the current availability status for all the resources in the subscription. */
export function listBySubscriptionId(
  context: Client,
  options: AvailabilityStatusesListBySubscriptionIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailabilityStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdSend(context, options),
    _listBySubscriptionIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getByResourceSend(
  context: Client,
  resourceUri: string,
  options: AvailabilityStatusesGetByResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.ResourceHealth/availabilityStatuses/current{?api%2Dversion,%24filter,%24expand}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
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

export async function _getByResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailabilityStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return availabilityStatusDeserializer(result.body);
}

/** Gets current availability status for a single resource */
export async function getByResource(
  context: Client,
  resourceUri: string,
  options: AvailabilityStatusesGetByResourceOptionalParams = { requestOptions: {} },
): Promise<AvailabilityStatus> {
  const result = await _getByResourceSend(context, resourceUri, options);
  return _getByResourceDeserialize(result);
}
