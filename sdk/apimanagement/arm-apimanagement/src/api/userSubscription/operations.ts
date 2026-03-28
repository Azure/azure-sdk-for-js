// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { SubscriptionContract, _SubscriptionCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  subscriptionContractDeserializer,
  _subscriptionCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UserSubscriptionListOptionalParams,
  UserSubscriptionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserSubscriptionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}/subscriptions{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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
): Promise<_SubscriptionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _subscriptionCollectionDeserializer(result.body);
}

/** Lists the collection of subscriptions of the specified user. */
export function list(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserSubscriptionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubscriptionContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serviceName, userId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  sid: string,
  options: UserSubscriptionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}/subscriptions/{sid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      sid: sid,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<SubscriptionContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionContractDeserializer(result.body);
}

/** Gets the specified Subscription entity associated with a particular user. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  sid: string,
  options: UserSubscriptionGetOptionalParams = { requestOptions: {} },
): Promise<SubscriptionContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, userId, sid, options);
  return _getDeserialize(result);
}
