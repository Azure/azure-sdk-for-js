// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  ManagedCluster,
  ManagedClusterServicePrincipalProfile,
  ManagedClusterAADProfile,
  TagsObject,
  _ManagedClusterListResult,
  ManagedClusterAccessProfile,
  CredentialResults,
  RunCommandRequest,
  RunCommandResult,
  _OutboundEnvironmentEndpointCollection,
  OutboundEnvironmentEndpoint,
  RebalanceLoadBalancersRequestBody,
  ManagedClusterUpgradeProfile,
  GuardrailsAvailableVersion,
  _GuardrailsAvailableVersionsList,
  SafeguardsAvailableVersion,
  _SafeguardsAvailableVersionsList,
  MeshRevisionProfile,
  _MeshRevisionProfileList,
  MeshUpgradeProfile,
  _MeshUpgradeProfileList,
  KubernetesVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedClusterSerializer,
  managedClusterDeserializer,
  managedClusterServicePrincipalProfileSerializer,
  managedClusterAADProfileSerializer,
  tagsObjectSerializer,
  _managedClusterListResultDeserializer,
  managedClusterAccessProfileDeserializer,
  credentialResultsDeserializer,
  runCommandRequestSerializer,
  runCommandResultDeserializer,
  _outboundEnvironmentEndpointCollectionDeserializer,
  rebalanceLoadBalancersRequestBodySerializer,
  managedClusterUpgradeProfileDeserializer,
  guardrailsAvailableVersionDeserializer,
  _guardrailsAvailableVersionsListDeserializer,
  safeguardsAvailableVersionDeserializer,
  _safeguardsAvailableVersionsListDeserializer,
  meshRevisionProfileDeserializer,
  _meshRevisionProfileListDeserializer,
  meshUpgradeProfileDeserializer,
  _meshUpgradeProfileListDeserializer,
  kubernetesVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedClustersListKubernetesVersionsOptionalParams,
  ManagedClustersListMeshUpgradeProfilesOptionalParams,
  ManagedClustersGetMeshUpgradeProfileOptionalParams,
  ManagedClustersListMeshRevisionProfilesOptionalParams,
  ManagedClustersGetMeshRevisionProfileOptionalParams,
  ManagedClustersListSafeguardsVersionsOptionalParams,
  ManagedClustersGetSafeguardsVersionsOptionalParams,
  ManagedClustersListGuardrailsVersionsOptionalParams,
  ManagedClustersGetGuardrailsVersionsOptionalParams,
  ManagedClustersGetUpgradeProfileOptionalParams,
  ManagedClustersRebalanceLoadBalancersOptionalParams,
  ManagedClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
  ManagedClustersGetCommandResultOptionalParams,
  ManagedClustersRunCommandOptionalParams,
  ManagedClustersStartOptionalParams,
  ManagedClustersStopOptionalParams,
  ManagedClustersRotateServiceAccountSigningKeysOptionalParams,
  ManagedClustersAbortLatestOperationOptionalParams,
  ManagedClustersRotateClusterCertificatesOptionalParams,
  ManagedClustersResetAADProfileOptionalParams,
  ManagedClustersResetServicePrincipalProfileOptionalParams,
  ManagedClustersListClusterMonitoringUserCredentialsOptionalParams,
  ManagedClustersListClusterUserCredentialsOptionalParams,
  ManagedClustersListClusterAdminCredentialsOptionalParams,
  ManagedClustersGetAccessProfileOptionalParams,
  ManagedClustersListOptionalParams,
  ManagedClustersListByResourceGroupOptionalParams,
  ManagedClustersDeleteOptionalParams,
  ManagedClustersUpdateTagsOptionalParams,
  ManagedClustersCreateOrUpdateOptionalParams,
  ManagedClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listKubernetesVersionsSend(
  context: Client,
  location: string,
  options: ManagedClustersListKubernetesVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/kubernetesVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listKubernetesVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<KubernetesVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return kubernetesVersionListResultDeserializer(result.body);
}

/** Contains extra metadata on the version, including supported patch versions, capabilities, available upgrades, and details on preview status of the version */
export async function listKubernetesVersions(
  context: Client,
  location: string,
  options: ManagedClustersListKubernetesVersionsOptionalParams = { requestOptions: {} },
): Promise<KubernetesVersionListResult> {
  const result = await _listKubernetesVersionsSend(context, location, options);
  return _listKubernetesVersionsDeserialize(result);
}

export function _listMeshUpgradeProfilesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListMeshUpgradeProfilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/meshUpgradeProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listMeshUpgradeProfilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_MeshUpgradeProfileList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _meshUpgradeProfileListDeserializer(result.body);
}

/** Lists available upgrades for all service meshes in a specific cluster. */
export function listMeshUpgradeProfiles(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListMeshUpgradeProfilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MeshUpgradeProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listMeshUpgradeProfilesSend(context, resourceGroupName, resourceName, options),
    _listMeshUpgradeProfilesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getMeshUpgradeProfileSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  mode: string,
  options: ManagedClustersGetMeshUpgradeProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/meshUpgradeProfiles/{mode}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      mode: mode,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getMeshUpgradeProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<MeshUpgradeProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return meshUpgradeProfileDeserializer(result.body);
}

/** Gets available upgrades for a service mesh in a cluster. */
export async function getMeshUpgradeProfile(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  mode: string,
  options: ManagedClustersGetMeshUpgradeProfileOptionalParams = { requestOptions: {} },
): Promise<MeshUpgradeProfile> {
  const result = await _getMeshUpgradeProfileSend(
    context,
    resourceGroupName,
    resourceName,
    mode,
    options,
  );
  return _getMeshUpgradeProfileDeserialize(result);
}

export function _listMeshRevisionProfilesSend(
  context: Client,
  location: string,
  options: ManagedClustersListMeshRevisionProfilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/meshRevisionProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listMeshRevisionProfilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_MeshRevisionProfileList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _meshRevisionProfileListDeserializer(result.body);
}

/** Contains extra metadata on each revision, including supported revisions, cluster compatibility and available upgrades */
export function listMeshRevisionProfiles(
  context: Client,
  location: string,
  options: ManagedClustersListMeshRevisionProfilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MeshRevisionProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listMeshRevisionProfilesSend(context, location, options),
    _listMeshRevisionProfilesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getMeshRevisionProfileSend(
  context: Client,
  location: string,
  mode: string,
  options: ManagedClustersGetMeshRevisionProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/meshRevisionProfiles/{mode}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      mode: mode,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getMeshRevisionProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<MeshRevisionProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return meshRevisionProfileDeserializer(result.body);
}

/** Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades */
export async function getMeshRevisionProfile(
  context: Client,
  location: string,
  mode: string,
  options: ManagedClustersGetMeshRevisionProfileOptionalParams = { requestOptions: {} },
): Promise<MeshRevisionProfile> {
  const result = await _getMeshRevisionProfileSend(context, location, mode, options);
  return _getMeshRevisionProfileDeserialize(result);
}

export function _listSafeguardsVersionsSend(
  context: Client,
  location: string,
  options: ManagedClustersListSafeguardsVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/safeguardsVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listSafeguardsVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SafeguardsAvailableVersionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _safeguardsAvailableVersionsListDeserializer(result.body);
}

/** Contains list of Safeguards version along with its support info and whether it is a default version. */
export function listSafeguardsVersions(
  context: Client,
  location: string,
  options: ManagedClustersListSafeguardsVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SafeguardsAvailableVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSafeguardsVersionsSend(context, location, options),
    _listSafeguardsVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getSafeguardsVersionsSend(
  context: Client,
  location: string,
  version: string,
  options: ManagedClustersGetSafeguardsVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/safeguardsVersions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getSafeguardsVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<SafeguardsAvailableVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return safeguardsAvailableVersionDeserializer(result.body);
}

/** Contains Safeguards version along with its support info and whether it is a default version. */
export async function getSafeguardsVersions(
  context: Client,
  location: string,
  version: string,
  options: ManagedClustersGetSafeguardsVersionsOptionalParams = { requestOptions: {} },
): Promise<SafeguardsAvailableVersion> {
  const result = await _getSafeguardsVersionsSend(context, location, version, options);
  return _getSafeguardsVersionsDeserialize(result);
}

export function _listGuardrailsVersionsSend(
  context: Client,
  location: string,
  options: ManagedClustersListGuardrailsVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/guardrailsVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listGuardrailsVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GuardrailsAvailableVersionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _guardrailsAvailableVersionsListDeserializer(result.body);
}

/** Contains list of Guardrails version along with its support info and whether it is a default version. */
export function listGuardrailsVersions(
  context: Client,
  location: string,
  options: ManagedClustersListGuardrailsVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GuardrailsAvailableVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listGuardrailsVersionsSend(context, location, options),
    _listGuardrailsVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getGuardrailsVersionsSend(
  context: Client,
  location: string,
  version: string,
  options: ManagedClustersGetGuardrailsVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/guardrailsVersions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getGuardrailsVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<GuardrailsAvailableVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return guardrailsAvailableVersionDeserializer(result.body);
}

/** Contains Guardrails version along with its support info and whether it is a default version. */
export async function getGuardrailsVersions(
  context: Client,
  location: string,
  version: string,
  options: ManagedClustersGetGuardrailsVersionsOptionalParams = { requestOptions: {} },
): Promise<GuardrailsAvailableVersion> {
  const result = await _getGuardrailsVersionsSend(context, location, version, options);
  return _getGuardrailsVersionsDeserialize(result);
}

export function _getUpgradeProfileSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersGetUpgradeProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeProfiles/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getUpgradeProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedClusterUpgradeProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterUpgradeProfileDeserializer(result.body);
}

/** Gets the upgrade profile of a managed cluster. */
export async function getUpgradeProfile(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersGetUpgradeProfileOptionalParams = { requestOptions: {} },
): Promise<ManagedClusterUpgradeProfile> {
  const result = await _getUpgradeProfileSend(context, resourceGroupName, resourceName, options);
  return _getUpgradeProfileDeserialize(result);
}

export function _rebalanceLoadBalancersSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: RebalanceLoadBalancersRequestBody,
  options: ManagedClustersRebalanceLoadBalancersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rebalanceLoadBalancers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: rebalanceLoadBalancersRequestBodySerializer(parameters),
  });
}

export async function _rebalanceLoadBalancersDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Rebalance nodes across specific load balancers. */
export function rebalanceLoadBalancers(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: RebalanceLoadBalancersRequestBody,
  options: ManagedClustersRebalanceLoadBalancersOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _rebalanceLoadBalancersDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rebalanceLoadBalancersSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listOutboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listOutboundNetworkDependenciesEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<_OutboundEnvironmentEndpointCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _outboundEnvironmentEndpointCollectionDeserializer(result.body);
}

/** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint. */
export function listOutboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OutboundEnvironmentEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listOutboundNetworkDependenciesEndpointsSend(
        context,
        resourceGroupName,
        resourceName,
        options,
      ),
    _listOutboundNetworkDependenciesEndpointsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getCommandResultSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  commandId: string,
  options: ManagedClustersGetCommandResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/commandResults/{commandId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      commandId: commandId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getCommandResultDeserialize(
  result: PathUncheckedResponse,
): Promise<RunCommandResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return runCommandResultDeserializer(result.body);
}

/** Gets the results of a command which has been run on the Managed Cluster. */
export async function getCommandResult(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  commandId: string,
  options: ManagedClustersGetCommandResultOptionalParams = { requestOptions: {} },
): Promise<RunCommandResult> {
  const result = await _getCommandResultSend(
    context,
    resourceGroupName,
    resourceName,
    commandId,
    options,
  );
  return _getCommandResultDeserialize(result);
}

export function _runCommandSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  requestPayload: RunCommandRequest,
  options: ManagedClustersRunCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runCommandRequestSerializer(requestPayload),
  });
}

export async function _runCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<RunCommandResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return runCommandResultDeserializer(result.body);
}

/** AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview). */
export function runCommand(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  requestPayload: RunCommandRequest,
  options: ManagedClustersRunCommandOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RunCommandResult>, RunCommandResult> {
  return getLongRunningPoller(context, _runCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runCommandSend(context, resourceGroupName, resourceName, requestPayload, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<RunCommandResult>, RunCommandResult>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster. */
export function start(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster. */
export function stop(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _rotateServiceAccountSigningKeysSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersRotateServiceAccountSigningKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _rotateServiceAccountSigningKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Rotates the service account signing keys of a managed cluster. */
export function rotateServiceAccountSigningKeys(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersRotateServiceAccountSigningKeysOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _rotateServiceAccountSigningKeysDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _rotateServiceAccountSigningKeysSend(context, resourceGroupName, resourceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _abortLatestOperationSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersAbortLatestOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/abort{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _abortLatestOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Aborts the currently running operation on the managed cluster. The Managed Cluster will be moved to a Canceling state and eventually to a Canceled state when cancellation finishes. If the operation completes before cancellation can take place, a 409 error code is returned. */
export function abortLatestOperation(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersAbortLatestOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _abortLatestOperationDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _abortLatestOperationSend(context, resourceGroupName, resourceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _rotateClusterCertificatesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersRotateClusterCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _rotateClusterCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates. */
export function rotateClusterCertificates(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersRotateClusterCertificatesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _rotateClusterCertificatesDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _rotateClusterCertificatesSend(context, resourceGroupName, resourceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _resetAADProfileSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: ManagedClusterAADProfile,
  options: ManagedClustersResetAADProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: managedClusterAADProfileSerializer(parameters),
  });
}

export async function _resetAADProfileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** **WARNING**: This API will be deprecated. Please see [AKS-managed Azure Active Directory integration](https://aka.ms/aks-managed-aad) to update your cluster with AKS-managed Azure AD. */
export function resetAADProfile(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: ManagedClusterAADProfile,
  options: ManagedClustersResetAADProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resetAADProfileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetAADProfileSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resetServicePrincipalProfileSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: ManagedClusterServicePrincipalProfile,
  options: ManagedClustersResetServicePrincipalProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: managedClusterServicePrincipalProfileSerializer(parameters),
  });
}

export async function _resetServicePrincipalProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** This action cannot be performed on a cluster that is not using a service principal */
export function resetServicePrincipalProfile(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: ManagedClusterServicePrincipalProfile,
  options: ManagedClustersResetServicePrincipalProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _resetServicePrincipalProfileDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _resetServicePrincipalProfileSend(
          context,
          resourceGroupName,
          resourceName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listClusterMonitoringUserCredentialsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListClusterMonitoringUserCredentialsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterMonitoringUserCredential{?api%2Dversion,server%2Dfqdn}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      "server%2Dfqdn": options?.serverFqdn,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listClusterMonitoringUserCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<CredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return credentialResultsDeserializer(result.body);
}

/** Lists the cluster monitoring user credentials of a managed cluster. */
export async function listClusterMonitoringUserCredentials(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListClusterMonitoringUserCredentialsOptionalParams = {
    requestOptions: {},
  },
): Promise<CredentialResults> {
  const result = await _listClusterMonitoringUserCredentialsSend(
    context,
    resourceGroupName,
    resourceName,
    options,
  );
  return _listClusterMonitoringUserCredentialsDeserialize(result);
}

export function _listClusterUserCredentialsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListClusterUserCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterUserCredential{?api%2Dversion,server%2Dfqdn,format}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      "server%2Dfqdn": options?.serverFqdn,
      format: options?.format,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listClusterUserCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<CredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return credentialResultsDeserializer(result.body);
}

/** Lists the user credentials of a managed cluster. */
export async function listClusterUserCredentials(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListClusterUserCredentialsOptionalParams = { requestOptions: {} },
): Promise<CredentialResults> {
  const result = await _listClusterUserCredentialsSend(
    context,
    resourceGroupName,
    resourceName,
    options,
  );
  return _listClusterUserCredentialsDeserialize(result);
}

export function _listClusterAdminCredentialsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListClusterAdminCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterAdminCredential{?api%2Dversion,server%2Dfqdn}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      "server%2Dfqdn": options?.serverFqdn,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listClusterAdminCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<CredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return credentialResultsDeserializer(result.body);
}

/** Lists the admin credentials of a managed cluster. */
export async function listClusterAdminCredentials(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersListClusterAdminCredentialsOptionalParams = { requestOptions: {} },
): Promise<CredentialResults> {
  const result = await _listClusterAdminCredentialsSend(
    context,
    resourceGroupName,
    resourceName,
    options,
  );
  return _listClusterAdminCredentialsDeserialize(result);
}

export function _getAccessProfileSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  roleName: string,
  options: ManagedClustersGetAccessProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/accessProfiles/{roleName}/listCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      roleName: roleName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAccessProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedClusterAccessProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterAccessProfileDeserializer(result.body);
}

/** **WARNING**: This API will be deprecated. Instead use [ListClusterUserCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusterusercredentials) or [ListClusterAdminCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusteradmincredentials) . */
export async function getAccessProfile(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  roleName: string,
  options: ManagedClustersGetAccessProfileOptionalParams = { requestOptions: {} },
): Promise<ManagedClusterAccessProfile> {
  const result = await _getAccessProfileSend(
    context,
    resourceGroupName,
    resourceName,
    roleName,
    options,
  );
  return _getAccessProfileDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ManagedClustersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<_ManagedClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedClusterListResultDeserializer(result.body);
}

/** Gets a list of managed clusters in the specified subscription. */
export function list(
  context: Client,
  options: ManagedClustersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ManagedClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedClusterListResultDeserializer(result.body);
}

/** Lists managed clusters in the specified subscription and resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ManagedClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}{?api%2Dversion,ignore%2Dpod%2Ddisruption%2Dbudget}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      "ignore%2Dpod%2Ddisruption%2Dbudget": options?.ignorePodDisruptionBudget,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a managed cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: TagsObject,
  options: ManagedClustersUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedCluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterDeserializer(result.body);
}

/** Updates tags on a managed cluster. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: TagsObject,
  options: ManagedClustersUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedCluster>, ManagedCluster> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: ManagedCluster,
  options: ManagedClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: managedClusterSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterDeserializer(result.body);
}

/** Creates or updates a managed cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: ManagedCluster,
  options: ManagedClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedCluster>, ManagedCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterDeserializer(result.body);
}

/** Gets a managed cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedClustersGetOptionalParams = { requestOptions: {} },
): Promise<ManagedCluster> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
