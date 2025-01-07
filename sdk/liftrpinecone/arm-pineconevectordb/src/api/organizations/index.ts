// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VectorDbContext as Client,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsGetOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsUpdateOptionalParams,
} from "../index.js";
import {
  OrganizationResource,
  organizationResourceSerializer,
  organizationResourceDeserializer,
  OrganizationResourceUpdate,
  organizationResourceUpdateSerializer,
  _OrganizationResourceListResult,
  _organizationResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _organizationsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Pinecone.VectorDb/organizations/{organizationname}",
      subscriptionId,
      resourceGroupName,
      organizationname,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _organizationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return organizationResourceDeserializer(result.body);
}

/** Get a OrganizationResource */
export async function organizationsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsGetOptionalParams = { requestOptions: {} },
): Promise<OrganizationResource> {
  const result = await _organizationsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    organizationname,
    options,
  );
  return _organizationsGetDeserialize(result);
}

export function _organizationsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  resource: OrganizationResource,
  options: OrganizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Pinecone.VectorDb/organizations/{organizationname}",
      subscriptionId,
      resourceGroupName,
      organizationname,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: organizationResourceSerializer(resource),
    });
}

export async function _organizationsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return organizationResourceDeserializer(result.body);
}

/** Create a OrganizationResource */
export function organizationsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  resource: OrganizationResource,
  options: OrganizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OrganizationResource>, OrganizationResource> {
  return getLongRunningPoller(context, _organizationsCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _organizationsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        organizationname,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
}

export function _organizationsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  properties: OrganizationResourceUpdate,
  options: OrganizationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Pinecone.VectorDb/organizations/{organizationname}",
      subscriptionId,
      resourceGroupName,
      organizationname,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: organizationResourceUpdateSerializer(properties),
    });
}

export async function _organizationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return organizationResourceDeserializer(result.body);
}

/** Update a OrganizationResource */
export async function organizationsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  properties: OrganizationResourceUpdate,
  options: OrganizationsUpdateOptionalParams = { requestOptions: {} },
): Promise<OrganizationResource> {
  const result = await _organizationsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    organizationname,
    properties,
    options,
  );
  return _organizationsUpdateDeserialize(result);
}

export function _organizationsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Pinecone.VectorDb/organizations/{organizationname}",
      subscriptionId,
      resourceGroupName,
      organizationname,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _organizationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a OrganizationResource */
export function organizationsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  organizationname: string,
  options: OrganizationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _organizationsDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _organizationsDeleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        organizationname,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _organizationsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: OrganizationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Pinecone.VectorDb/organizations",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _organizationsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_OrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _organizationResourceListResultDeserializer(result.body);
}

/** List OrganizationResource resources by resource group */
export function organizationsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: OrganizationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _organizationsListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _organizationsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _organizationsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: OrganizationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Pinecone.VectorDb/organizations",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _organizationsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_OrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _organizationResourceListResultDeserializer(result.body);
}

/** List OrganizationResource resources by subscription ID */
export function organizationsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: OrganizationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _organizationsListBySubscriptionSend(context, subscriptionId, options),
    _organizationsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
