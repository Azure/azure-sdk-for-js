// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectedCacheContext as Client,
  EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  EnterpriseMccCustomersDeleteOptionalParams,
  EnterpriseMccCustomersGetOptionalParams,
  EnterpriseMccCustomersListByResourceGroupOptionalParams,
  EnterpriseMccCustomersListBySubscriptionOptionalParams,
  EnterpriseMccCustomersUpdateOptionalParams,
} from "../index.js";
import {
  ConnectedCachePatchResource,
  connectedCachePatchResourceSerializer,
  EnterpriseMccCustomerResource,
  enterpriseMccCustomerResourceSerializer,
  enterpriseMccCustomerResourceDeserializer,
  _EnterpriseMccCustomerResourceListResult,
  _enterpriseMccCustomerResourceListResultDeserializer,
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

export function _enterpriseMccCustomersGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCustomersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCustomersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCustomerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterpriseMccCustomerResourceDeserializer(result.body);
}

/** Gets the enterprise mcc customer resource information using this get call */
export async function enterpriseMccCustomersGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCustomersGetOptionalParams = { requestOptions: {} },
): Promise<EnterpriseMccCustomerResource> {
  const result = await _enterpriseMccCustomersGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    options,
  );
  return _enterpriseMccCustomersGetDeserialize(result);
}

export function _enterpriseMccCustomersCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: EnterpriseMccCustomerResource,
  options: EnterpriseMccCustomersCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: enterpriseMccCustomerResourceSerializer(resource),
    });
}

export async function _enterpriseMccCustomersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCustomerResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterpriseMccCustomerResourceDeserializer(result.body);
}

/** This api creates an enterprise mcc customer with the specified create parameters */
export function enterpriseMccCustomersCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: EnterpriseMccCustomerResource,
  options: EnterpriseMccCustomersCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<EnterpriseMccCustomerResource>,
  EnterpriseMccCustomerResource
> {
  return getLongRunningPoller(
    context,
    _enterpriseMccCustomersCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _enterpriseMccCustomersCreateOrUpdateSend(
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
    OperationState<EnterpriseMccCustomerResource>,
    EnterpriseMccCustomerResource
  >;
}

export function _enterpriseMccCustomersUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseMccCustomersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: connectedCachePatchResourceSerializer(properties),
    });
}

export async function _enterpriseMccCustomersUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCustomerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterpriseMccCustomerResourceDeserializer(result.body);
}

/** This api updates an existing enterprise mcc customer resource */
export async function enterpriseMccCustomersUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseMccCustomersUpdateOptionalParams = { requestOptions: {} },
): Promise<EnterpriseMccCustomerResource> {
  const result = await _enterpriseMccCustomersUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    properties,
    options,
  );
  return _enterpriseMccCustomersUpdateDeserialize(result);
}

export function _enterpriseMccCustomersDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCustomersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCustomersDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** This api deletes an existing enterprise mcc customer resource */
export function enterpriseMccCustomersDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCustomersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _enterpriseMccCustomersDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _enterpriseMccCustomersDeleteSend(
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

export function _enterpriseMccCustomersListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: EnterpriseMccCustomersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCustomersListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnterpriseMccCustomerResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _enterpriseMccCustomerResourceListResultDeserializer(result.body);
}

/** This api gets the information about all enterprise mcc customer resources under the given subscription and resource group */
export function enterpriseMccCustomersListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: EnterpriseMccCustomersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnterpriseMccCustomerResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _enterpriseMccCustomersListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _enterpriseMccCustomersListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _enterpriseMccCustomersListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: EnterpriseMccCustomersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCustomersListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnterpriseMccCustomerResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _enterpriseMccCustomerResourceListResultDeserializer(result.body);
}

/** This api gets information about all enterpriseMccCustomer resources under the given subscription */
export function enterpriseMccCustomersListBySubscription(
  context: Client,
  subscriptionId: string,
  options: EnterpriseMccCustomersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnterpriseMccCustomerResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _enterpriseMccCustomersListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _enterpriseMccCustomersListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
