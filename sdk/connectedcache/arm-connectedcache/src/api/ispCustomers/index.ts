// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectedCacheContext as Client,
  IspCustomersCreateOrUpdateOptionalParams,
  IspCustomersDeleteOptionalParams,
  IspCustomersGetOptionalParams,
  IspCustomersListByResourceGroupOptionalParams,
  IspCustomersListBySubscriptionOptionalParams,
  IspCustomersUpdateOptionalParams,
} from "../index.js";
import {
  ConnectedCachePatchResource,
  connectedCachePatchResourceSerializer,
  IspCustomerResource,
  ispCustomerResourceSerializer,
  ispCustomerResourceDeserializer,
  _IspCustomerResourceListResult,
  _ispCustomerResourceListResultDeserializer,
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

export function _ispCustomersGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCustomersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCustomersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<IspCustomerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ispCustomerResourceDeserializer(result.body);
}

/** Gets the ispCustomer resource information using this get call */
export async function ispCustomersGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCustomersGetOptionalParams = { requestOptions: {} },
): Promise<IspCustomerResource> {
  const result = await _ispCustomersGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    options,
  );
  return _ispCustomersGetDeserialize(result);
}

export function _ispCustomersCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: IspCustomerResource,
  options: IspCustomersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: ispCustomerResourceSerializer(resource),
    });
}

export async function _ispCustomersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IspCustomerResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ispCustomerResourceDeserializer(result.body);
}

/** This api creates an ispCustomer with the specified create parameters */
export function ispCustomersCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: IspCustomerResource,
  options: IspCustomersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IspCustomerResource>, IspCustomerResource> {
  return getLongRunningPoller(
    context,
    _ispCustomersCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _ispCustomersCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<IspCustomerResource>, IspCustomerResource>;
}

export function _ispCustomersUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: IspCustomersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: connectedCachePatchResourceSerializer(properties),
    });
}

export async function _ispCustomersUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IspCustomerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ispCustomerResourceDeserializer(result.body);
}

/** This api updates an existing ispCustomer resource */
export async function ispCustomersUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: IspCustomersUpdateOptionalParams = { requestOptions: {} },
): Promise<IspCustomerResource> {
  const result = await _ispCustomersUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    properties,
    options,
  );
  return _ispCustomersUpdateDeserialize(result);
}

export function _ispCustomersDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCustomersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCustomersDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** This api deletes an existing ispCustomer resource */
export function ispCustomersDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCustomersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _ispCustomersDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _ispCustomersDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _ispCustomersListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: IspCustomersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCustomersListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_IspCustomerResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _ispCustomerResourceListResultDeserializer(result.body);
}

/** This api gets the information about all ispCustomer resources under the given subscription and resource group */
export function ispCustomersListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: IspCustomersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<IspCustomerResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _ispCustomersListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _ispCustomersListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _ispCustomersListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: IspCustomersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ConnectedCache/ispCustomers",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCustomersListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_IspCustomerResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _ispCustomerResourceListResultDeserializer(result.body);
}

/** This api gets information about all ispCustomer resources under the given subscription */
export function ispCustomersListBySubscription(
  context: Client,
  subscriptionId: string,
  options: IspCustomersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<IspCustomerResource> {
  return buildPagedAsyncIterator(
    context,
    () => _ispCustomersListBySubscriptionSend(context, subscriptionId, options),
    _ispCustomersListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
