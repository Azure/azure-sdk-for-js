// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KubernetesRuntimeContext as Client,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersGetOptionalParams,
  LoadBalancersListOptionalParams,
} from "../index.js";
import {
  LoadBalancer,
  loadBalancerSerializer,
  loadBalancerDeserializer,
  _LoadBalancerListResult,
  _loadBalancerListResultDeserializer,
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

export function _loadBalancersGetSend(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  options: LoadBalancersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers/{loadBalancerName}",
      { value: resourceUri, allowReserved: true },
      loadBalancerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _loadBalancersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<LoadBalancer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return loadBalancerDeserializer(result.body);
}

/** Get a LoadBalancer */
export async function loadBalancersGet(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  options: LoadBalancersGetOptionalParams = { requestOptions: {} },
): Promise<LoadBalancer> {
  const result = await _loadBalancersGetSend(
    context,
    resourceUri,
    loadBalancerName,
    options,
  );
  return _loadBalancersGetDeserialize(result);
}

export function _loadBalancersCreateOrUpdateSend(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  resource: LoadBalancer,
  options: LoadBalancersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers/{loadBalancerName}",
      { value: resourceUri, allowReserved: true },
      loadBalancerName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: loadBalancerSerializer(resource),
    });
}

export async function _loadBalancersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LoadBalancer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return loadBalancerDeserializer(result.body);
}

/** Create a LoadBalancer */
export function loadBalancersCreateOrUpdate(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  resource: LoadBalancer,
  options: LoadBalancersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LoadBalancer>, LoadBalancer> {
  return getLongRunningPoller(
    context,
    _loadBalancersCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _loadBalancersCreateOrUpdateSend(
          context,
          resourceUri,
          loadBalancerName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
}

export function _loadBalancersDeleteSend(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  options: LoadBalancersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers/{loadBalancerName}",
      { value: resourceUri, allowReserved: true },
      loadBalancerName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _loadBalancersDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a LoadBalancer */
export async function loadBalancersDelete(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  options: LoadBalancersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _loadBalancersDeleteSend(
    context,
    resourceUri,
    loadBalancerName,
    options,
  );
  return _loadBalancersDeleteDeserialize(result);
}

export function _loadBalancersListSend(
  context: Client,
  resourceUri: string,
  options: LoadBalancersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers",
      { value: resourceUri, allowReserved: true },
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _loadBalancersListDeserialize(
  result: PathUncheckedResponse,
): Promise<_LoadBalancerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _loadBalancerListResultDeserializer(result.body);
}

/** List LoadBalancer resources by parent */
export function loadBalancersList(
  context: Client,
  resourceUri: string,
  options: LoadBalancersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LoadBalancer> {
  return buildPagedAsyncIterator(
    context,
    () => _loadBalancersListSend(context, resourceUri, options),
    _loadBalancersListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
