// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectedCacheContext as Client,
  EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams,
  EnterpriseMccCacheNodesOperationsDeleteOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  EnterpriseMccCacheNodesOperationsGetOptionalParams,
  EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams,
  EnterpriseMccCacheNodesOperationsUpdateOptionalParams,
} from "../index.js";
import {
  EnterpriseMccCacheNodeResource,
  enterpriseMccCacheNodeResourceSerializer,
  enterpriseMccCacheNodeResourceDeserializer,
  ConnectedCachePatchResource,
  connectedCachePatchResourceSerializer,
  _EnterpriseMccCacheNodeResourceListResult,
  _enterpriseMccCacheNodeResourceListResultDeserializer,
  MccCacheNodeInstallDetails,
  mccCacheNodeInstallDetailsDeserializer,
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

export function _enterpriseMccCacheNodesOperationsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCacheNodesOperationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterpriseMccCacheNodeResourceDeserializer(result.body);
}

/** This api gets ispCacheNode resource information */
export async function enterpriseMccCacheNodesOperationsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<EnterpriseMccCacheNodeResource> {
  const result = await _enterpriseMccCacheNodesOperationsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _enterpriseMccCacheNodesOperationsGetDeserialize(result);
}

export function _enterpriseMccCacheNodesOperationsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  resource: EnterpriseMccCacheNodeResource,
  options: EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: enterpriseMccCacheNodeResourceSerializer(resource),
    });
}

export async function _enterpriseMccCacheNodesOperationsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCacheNodeResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterpriseMccCacheNodeResourceDeserializer(result.body);
}

/** This api creates an ispCacheNode with the specified create parameters */
export function enterpriseMccCacheNodesOperationsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  resource: EnterpriseMccCacheNodeResource,
  options: EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<EnterpriseMccCacheNodeResource>,
  EnterpriseMccCacheNodeResource
> {
  return getLongRunningPoller(
    context,
    _enterpriseMccCacheNodesOperationsCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _enterpriseMccCacheNodesOperationsCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          cacheNodeResourceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<EnterpriseMccCacheNodeResource>,
    EnterpriseMccCacheNodeResource
  >;
}

export function _enterpriseMccCacheNodesOperationsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseMccCacheNodesOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: connectedCachePatchResourceSerializer(properties),
    });
}

export async function _enterpriseMccCacheNodesOperationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return enterpriseMccCacheNodeResourceDeserializer(result.body);
}

/** This api updates an existing ispCacheNode resource */
export async function enterpriseMccCacheNodesOperationsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseMccCacheNodesOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<EnterpriseMccCacheNodeResource> {
  const result = await _enterpriseMccCacheNodesOperationsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    properties,
    options,
  );
  return _enterpriseMccCacheNodesOperationsUpdateDeserialize(result);
}

export function _enterpriseMccCacheNodesOperationsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCacheNodesOperationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** This api deletes an existing ispCacheNode resource */
export function enterpriseMccCacheNodesOperationsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _enterpriseMccCacheNodesOperationsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _enterpriseMccCacheNodesOperationsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          cacheNodeResourceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnterpriseMccCacheNodeResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _enterpriseMccCacheNodeResourceListResultDeserializer(result.body);
}

/** This api retrieves information about all ispCacheNode resources under the given subscription and resource group */
export function enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResource(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnterpriseMccCacheNodeResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceSend(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    _enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}/getCacheNodeInstallDetails",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeInstallDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return mccCacheNodeInstallDetailsDeserializer(result.body);
}

/** This api gets secrets of the ispCacheNode resource install details */
export async function enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetails(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<MccCacheNodeInstallDetails> {
  const result =
    await _enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsSend(
      context,
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
      options,
    );
  return _enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsDeserialize(
    result,
  );
}
