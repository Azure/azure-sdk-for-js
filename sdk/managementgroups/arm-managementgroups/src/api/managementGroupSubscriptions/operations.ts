// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext as Client } from "../index.js";
import type {
  SubscriptionUnderManagementGroup,
  _ListSubscriptionUnderManagementGroup,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  subscriptionUnderManagementGroupDeserializer,
  _listSubscriptionUnderManagementGroupDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams,
  ManagementGroupSubscriptionsDeleteOptionalParams,
  ManagementGroupSubscriptionsCreateOptionalParams,
  ManagementGroupSubscriptionsGetSubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSubscriptionsUnderManagementGroupSend(
  context: Client,
  groupId: string,
  options: ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions{?api%2Dversion,%24skiptoken}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      "%24skiptoken": options?.skiptoken,
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

export async function _getSubscriptionsUnderManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListSubscriptionUnderManagementGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _listSubscriptionUnderManagementGroupDeserializer(result.body);
}

/** Retrieves details about all subscriptions which are associated with the management group. */
export function getSubscriptionsUnderManagementGroup(
  context: Client,
  groupId: string,
  options: ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SubscriptionUnderManagementGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _getSubscriptionsUnderManagementGroupSend(context, groupId, options),
    _getSubscriptionsUnderManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  groupId: string,
  subscriptionId: string,
  options: ManagementGroupSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions/{subscriptionId}{?api%2Dversion}",
    {
      groupId: groupId,
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** De-associates subscription from the management group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  groupId: string,
  subscriptionId: string,
  options: ManagementGroupSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, groupId, subscriptionId, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  groupId: string,
  subscriptionId: string,
  options: ManagementGroupSubscriptionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions/{subscriptionId}{?api%2Dversion}",
    {
      groupId: groupId,
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionUnderManagementGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionUnderManagementGroupDeserializer(result.body);
}

/** Associates existing subscription with the management group. */
export async function create(
  context: Client,
  groupId: string,
  subscriptionId: string,
  options: ManagementGroupSubscriptionsCreateOptionalParams = { requestOptions: {} },
): Promise<SubscriptionUnderManagementGroup> {
  const result = await _createSend(context, groupId, subscriptionId, options);
  return _createDeserialize(result);
}

export function _getSubscriptionSend(
  context: Client,
  groupId: string,
  subscriptionId: string,
  options: ManagementGroupSubscriptionsGetSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/subscriptions/{subscriptionId}{?api%2Dversion}",
    {
      groupId: groupId,
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.cacheControl !== undefined
        ? { "cache-control": options?.cacheControl ?? "no-cache" }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionUnderManagementGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionUnderManagementGroupDeserializer(result.body);
}

/** Retrieves details about given subscription which is associated with the management group. */
export async function getSubscription(
  context: Client,
  groupId: string,
  subscriptionId: string,
  options: ManagementGroupSubscriptionsGetSubscriptionOptionalParams = { requestOptions: {} },
): Promise<SubscriptionUnderManagementGroup> {
  const result = await _getSubscriptionSend(context, groupId, subscriptionId, options);
  return _getSubscriptionDeserialize(result);
}
