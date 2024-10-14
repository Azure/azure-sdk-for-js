// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  loadBalancerPropertiesSerializer,
  LoadBalancer,
  _LoadBalancerListResult,
} from "../../models/models.js";
import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  LoadBalancersGetOptionalParams,
  LoadBalancersCreateOrUpdateOptionalParams,
  LoadBalancersDeleteOptionalParams,
  LoadBalancersListOptionalParams,
} from "../../models/options.js";

export function _loadBalancersGetSend(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  options: LoadBalancersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers/{loadBalancerName}",
      resourceUri,
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

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          addresses: result.body.properties?.["addresses"],
          serviceSelector: result.body.properties?.["serviceSelector"],
          advertiseMode: result.body.properties?.["advertiseMode"],
          bgpPeers: result.body.properties?.["bgpPeers"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a LoadBalancer */
export async function loadBalancersGet(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  options: LoadBalancersGetOptionalParams = { requestOptions: {} },
): Promise<LoadBalancer> {
  const result = await _loadBalancersGetSend(context, resourceUri, loadBalancerName, options);
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
      resourceUri,
      loadBalancerName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? resource.properties
          : loadBalancerPropertiesSerializer(resource.properties),
      },
    });
}

export async function _loadBalancersCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LoadBalancer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          addresses: result.body.properties?.["addresses"],
          serviceSelector: result.body.properties?.["serviceSelector"],
          advertiseMode: result.body.properties?.["advertiseMode"],
          bgpPeers: result.body.properties?.["bgpPeers"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a LoadBalancer */
export function loadBalancersCreateOrUpdate(
  context: Client,
  resourceUri: string,
  loadBalancerName: string,
  resource: LoadBalancer,
  options: LoadBalancersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LoadBalancer>, LoadBalancer> {
  return getLongRunningPoller(context, _loadBalancersCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _loadBalancersCreateOrUpdateSend(context, resourceUri, loadBalancerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LoadBalancer>, LoadBalancer>;
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
      resourceUri,
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
  const result = await _loadBalancersDeleteSend(context, resourceUri, loadBalancerName, options);
  return _loadBalancersDeleteDeserialize(result);
}

export function _loadBalancersListSend(
  context: Client,
  resourceUri: string,
  options: LoadBalancersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{resourceUri}/providers/Microsoft.KubernetesRuntime/loadBalancers", resourceUri)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _loadBalancersListDeserialize(
  result: PathUncheckedResponse,
): Promise<_LoadBalancerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        name: p["name"],
        type: p["type"],
        systemData: !p.systemData
          ? undefined
          : {
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              lastModifiedBy: p.systemData?.["lastModifiedBy"],
              lastModifiedByType: p.systemData?.["lastModifiedByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        properties: !p.properties
          ? undefined
          : {
              addresses: p.properties?.["addresses"],
              serviceSelector: p.properties?.["serviceSelector"],
              advertiseMode: p.properties?.["advertiseMode"],
              bgpPeers: p.properties?.["bgpPeers"],
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
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
