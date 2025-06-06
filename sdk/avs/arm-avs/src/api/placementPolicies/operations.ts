// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _PlacementPoliciesList,
  _placementPoliciesListDeserializer,
  PlacementPolicy,
  placementPolicySerializer,
  placementPolicyDeserializer,
  PlacementPolicyUpdate,
  placementPolicyUpdateSerializer,
} from "../../models/models.js";
import {
  PlacementPoliciesDeleteOptionalParams,
  PlacementPoliciesUpdateOptionalParams,
  PlacementPoliciesCreateOrUpdateOptionalParams,
  PlacementPoliciesGetOptionalParams,
  PlacementPoliciesListOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
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
import { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  options: PlacementPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      clusterName: clusterName,
      placementPolicyName: placementPolicyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a PlacementPolicy */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  options: PlacementPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        placementPolicyName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  placementPolicyUpdate: PlacementPolicyUpdate,
  options: PlacementPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      clusterName: clusterName,
      placementPolicyName: placementPolicyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: placementPolicyUpdateSerializer(placementPolicyUpdate),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PlacementPolicy> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return placementPolicyDeserializer(result.body);
}

/** Update a PlacementPolicy */
export function update(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  placementPolicyUpdate: PlacementPolicyUpdate,
  options: PlacementPoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PlacementPolicy>, PlacementPolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        placementPolicyName,
        placementPolicyUpdate,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<PlacementPolicy>, PlacementPolicy>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  placementPolicy: PlacementPolicy,
  options: PlacementPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      clusterName: clusterName,
      placementPolicyName: placementPolicyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: placementPolicySerializer(placementPolicy),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PlacementPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return placementPolicyDeserializer(result.body);
}

/** Create a PlacementPolicy */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  placementPolicy: PlacementPolicy,
  options: PlacementPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PlacementPolicy>, PlacementPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        placementPolicyName,
        placementPolicy,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<PlacementPolicy>, PlacementPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  options: PlacementPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies/{placementPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      clusterName: clusterName,
      placementPolicyName: placementPolicyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PlacementPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return placementPolicyDeserializer(result.body);
}

/** Get a PlacementPolicy */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  placementPolicyName: string,
  options: PlacementPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<PlacementPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    privateCloudName,
    clusterName,
    placementPolicyName,
    options,
  );
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  options: PlacementPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/clusters/{clusterName}/placementPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PlacementPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _placementPoliciesListDeserializer(result.body);
}

/** List PlacementPolicy resources by Cluster */
export function list(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  clusterName: string,
  options: PlacementPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PlacementPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, privateCloudName, clusterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
