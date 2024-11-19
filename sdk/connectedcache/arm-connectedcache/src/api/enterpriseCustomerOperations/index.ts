// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectedCacheContext as Client,
  EnterpriseCustomerOperationsCreateOrUpdateOptionalParams,
  EnterpriseCustomerOperationsDeleteOptionalParams,
  EnterpriseCustomerOperationsGetOptionalParams,
  EnterpriseCustomerOperationsListByResourceGroupOptionalParams,
  EnterpriseCustomerOperationsListBySubscriptionOptionalParams,
  EnterpriseCustomerOperationsUpdateOptionalParams,
} from "../index.js";
import {
  ConnectedCachePatchResource,
  connectedCachePatchResourceSerializer,
  EnterprisePreviewResource,
  enterprisePreviewResourceSerializer,
  enterprisePreviewResourceDeserializer,
  _EnterprisePreviewResourceListResult,
  _enterprisePreviewResourceListResultDeserializer,
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

export function _enterpriseCustomerOperationsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseCustomerOperationsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseCustomerOperationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterprisePreviewResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterprisePreviewResourceDeserializer(result.body);
}

/** Retrieves the properties of a Enterprise customer */
export async function enterpriseCustomerOperationsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseCustomerOperationsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<EnterprisePreviewResource> {
  const result = await _enterpriseCustomerOperationsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    options,
  );
  return _enterpriseCustomerOperationsGetDeserialize(result);
}

export function _enterpriseCustomerOperationsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: EnterprisePreviewResource,
  options: EnterpriseCustomerOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: enterprisePreviewResourceSerializer(resource),
    });
}

export async function _enterpriseCustomerOperationsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterprisePreviewResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterprisePreviewResourceDeserializer(result.body);
}

/** Creates a cacheNodes with the specified create parameters */
export function enterpriseCustomerOperationsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: EnterprisePreviewResource,
  options: EnterpriseCustomerOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<EnterprisePreviewResource>,
  EnterprisePreviewResource
> {
  return getLongRunningPoller(
    context,
    _enterpriseCustomerOperationsCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _enterpriseCustomerOperationsCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<EnterprisePreviewResource>,
    EnterprisePreviewResource
  >;
}

export function _enterpriseCustomerOperationsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseCustomerOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: connectedCachePatchResourceSerializer(properties),
    });
}

export async function _enterpriseCustomerOperationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterprisePreviewResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterprisePreviewResourceDeserializer(result.body);
}

/** updates an existing enterpriseCustomers */
export async function enterpriseCustomerOperationsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseCustomerOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<EnterprisePreviewResource> {
  const result = await _enterpriseCustomerOperationsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    properties,
    options,
  );
  return _enterpriseCustomerOperationsUpdateDeserialize(result);
}

export function _enterpriseCustomerOperationsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseCustomerOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseCustomerOperationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes an existing customer Enterprise resource */
export async function enterpriseCustomerOperationsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseCustomerOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _enterpriseCustomerOperationsDeleteSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    options,
  );
  return _enterpriseCustomerOperationsDeleteDeserialize(result);
}

export function _enterpriseCustomerOperationsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: EnterpriseCustomerOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseCustomers",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseCustomerOperationsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnterprisePreviewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _enterprisePreviewResourceListResultDeserializer(result.body);
}

/** Retrieves the properties of all ConnectedCache enterpriseCustomers */
export function enterpriseCustomerOperationsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: EnterpriseCustomerOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnterprisePreviewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _enterpriseCustomerOperationsListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _enterpriseCustomerOperationsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _enterpriseCustomerOperationsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: EnterpriseCustomerOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ConnectedCache/enterpriseCustomers",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseCustomerOperationsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnterprisePreviewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _enterprisePreviewResourceListResultDeserializer(result.body);
}

/** Retrieves the properties of all ConnectedCaches */
export function enterpriseCustomerOperationsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: EnterpriseCustomerOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnterprisePreviewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _enterpriseCustomerOperationsListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _enterpriseCustomerOperationsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
