// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext as Client } from "../index.js";
import type {
  CheckNameResult,
  Cluster,
  _LanguageExtensionsList,
  LanguageExtension,
  CalloutPolicy,
  ClusterUpdate,
  _ClusterListResult,
  ClusterMigrateRequest,
  _FollowerDatabaseListResultGet,
  FollowerDatabaseDefinitionGet,
  _FollowerDatabaseListResult,
  FollowerDatabaseDefinition,
  DiagnoseVirtualNetworkResult,
  _ListResourceSkusResult,
  AzureResourceSku,
  _OutboundNetworkDependenciesEndpointListResult,
  OutboundNetworkDependenciesEndpoint,
  _CalloutPoliciesList,
  CalloutPolicyToRemove,
  _SkuDescriptionList,
  SkuDescription,
  ClusterCheckNameRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameResultDeserializer,
  clusterSerializer,
  clusterDeserializer,
  _languageExtensionsListSerializer,
  _languageExtensionsListDeserializer,
  clusterUpdateSerializer,
  _clusterListResultDeserializer,
  clusterMigrateRequestSerializer,
  _followerDatabaseListResultGetDeserializer,
  _followerDatabaseListResultDeserializer,
  followerDatabaseDefinitionSerializer,
  diagnoseVirtualNetworkResultDeserializer,
  _listResourceSkusResultDeserializer,
  _outboundNetworkDependenciesEndpointListResultDeserializer,
  _calloutPoliciesListSerializer,
  _calloutPoliciesListDeserializer,
  calloutPolicyToRemoveSerializer,
  _skuDescriptionListDeserializer,
  clusterCheckNameRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClustersCheckNameAvailabilityOptionalParams,
  ClustersListSkusOptionalParams,
  ClustersRemoveLanguageExtensionsOptionalParams,
  ClustersAddLanguageExtensionsOptionalParams,
  ClustersListLanguageExtensionsOptionalParams,
  ClustersListCalloutPoliciesOptionalParams,
  ClustersRemoveCalloutPolicyOptionalParams,
  ClustersAddCalloutPoliciesOptionalParams,
  ClustersListOutboundNetworkDependenciesEndpointsOptionalParams,
  ClustersListSkusByResourceOptionalParams,
  ClustersDiagnoseVirtualNetworkOptionalParams,
  ClustersDetachFollowerDatabasesOptionalParams,
  ClustersListFollowerDatabasesOptionalParams,
  ClustersListFollowerDatabasesGetOptionalParams,
  ClustersMigrateOptionalParams,
  ClustersStartOptionalParams,
  ClustersStopOptionalParams,
  ClustersListOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  location: string,
  clusterName: ClusterCheckNameRequest,
  options: ClustersCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: clusterCheckNameRequestSerializer(clusterName),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameResultDeserializer(result.body);
}

/** Checks that the cluster name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  location: string,
  clusterName: ClusterCheckNameRequest,
  options: ClustersCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameResult> {
  const result = await _checkNameAvailabilitySend(context, location, clusterName, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSkusSend(
  context: Client,
  options: ClustersListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuDescriptionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _skuDescriptionListDeserializer(result.body);
}

/** Lists eligible SKUs for Kusto resource provider. */
export function listSkus(
  context: Client,
  options: ClustersListSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkuDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listSkusSend(context, options),
    _listSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _removeLanguageExtensionsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  languageExtensionsToRemove: _LanguageExtensionsList,
  options: ClustersRemoveLanguageExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/removeLanguageExtensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: _languageExtensionsListSerializer(languageExtensionsToRemove),
  });
}

export async function _removeLanguageExtensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Remove a list of language extensions that can run within KQL queries. */
export function removeLanguageExtensions(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  languageExtensionsToRemove: _LanguageExtensionsList,
  options: ClustersRemoveLanguageExtensionsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _removeLanguageExtensionsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _removeLanguageExtensionsSend(
          context,
          resourceGroupName,
          clusterName,
          languageExtensionsToRemove,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-14",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _addLanguageExtensionsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  languageExtensionsToAdd: _LanguageExtensionsList,
  options: ClustersAddLanguageExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/addLanguageExtensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: _languageExtensionsListSerializer(languageExtensionsToAdd),
  });
}

export async function _addLanguageExtensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Add a list of language extensions that can run within KQL queries. */
export function addLanguageExtensions(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  languageExtensionsToAdd: _LanguageExtensionsList,
  options: ClustersAddLanguageExtensionsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _addLanguageExtensionsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addLanguageExtensionsSend(
        context,
        resourceGroupName,
        clusterName,
        languageExtensionsToAdd,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listLanguageExtensionsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListLanguageExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listLanguageExtensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listLanguageExtensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_LanguageExtensionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _languageExtensionsListDeserializer(result.body);
}

/** Returns a list of language extensions that can run within KQL queries. */
export function listLanguageExtensions(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListLanguageExtensionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LanguageExtension> {
  return buildPagedAsyncIterator(
    context,
    () => _listLanguageExtensionsSend(context, resourceGroupName, clusterName, options),
    _listLanguageExtensionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _listCalloutPoliciesSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListCalloutPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listCalloutPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listCalloutPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CalloutPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _calloutPoliciesListDeserializer(result.body);
}

/** Returns the allowed callout policies for the specified service. */
export function listCalloutPolicies(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListCalloutPoliciesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CalloutPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listCalloutPoliciesSend(context, resourceGroupName, clusterName, options),
    _listCalloutPoliciesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _removeCalloutPolicySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  calloutPolicy: CalloutPolicyToRemove,
  options: ClustersRemoveCalloutPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/removeCalloutPolicy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: calloutPolicyToRemoveSerializer(calloutPolicy),
  });
}

export async function _removeCalloutPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Removes callout policy for engine services. */
export function removeCalloutPolicy(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  calloutPolicy: CalloutPolicyToRemove,
  options: ClustersRemoveCalloutPolicyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _removeCalloutPolicyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _removeCalloutPolicySend(context, resourceGroupName, clusterName, calloutPolicy, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _addCalloutPoliciesSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  calloutPolicies: _CalloutPoliciesList,
  options: ClustersAddCalloutPoliciesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/addCalloutPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: _calloutPoliciesListSerializer(calloutPolicies),
  });
}

export async function _addCalloutPoliciesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Adds a list of callout policies for engine services. */
export function addCalloutPolicies(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  calloutPolicies: _CalloutPoliciesList,
  options: ClustersAddCalloutPoliciesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _addCalloutPoliciesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addCalloutPoliciesSend(context, resourceGroupName, clusterName, calloutPolicies, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listOutboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListOutboundNetworkDependenciesEndpointsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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
): Promise<_OutboundNetworkDependenciesEndpointListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _outboundNetworkDependenciesEndpointListResultDeserializer(result.body);
}

/** Gets the network endpoints of all outbound dependencies of a Kusto cluster */
export function listOutboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListOutboundNetworkDependenciesEndpointsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OutboundNetworkDependenciesEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listOutboundNetworkDependenciesEndpointsSend(
        context,
        resourceGroupName,
        clusterName,
        options,
      ),
    _listOutboundNetworkDependenciesEndpointsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _listSkusByResourceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListSkusByResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listSkusByResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListResourceSkusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _listResourceSkusResultDeserializer(result.body);
}

/** Returns the SKUs available for the provided resource. */
export function listSkusByResource(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListSkusByResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureResourceSku> {
  return buildPagedAsyncIterator(
    context,
    () => _listSkusByResourceSend(context, resourceGroupName, clusterName, options),
    _listSkusByResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _diagnoseVirtualNetworkSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDiagnoseVirtualNetworkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/diagnoseVirtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _diagnoseVirtualNetworkDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnoseVirtualNetworkResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return diagnoseVirtualNetworkResultDeserializer(result.body);
}

/** Diagnoses network connectivity status for external resources on which the service is dependent on. */
export function diagnoseVirtualNetwork(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDiagnoseVirtualNetworkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiagnoseVirtualNetworkResult>, DiagnoseVirtualNetworkResult> {
  return getLongRunningPoller(context, _diagnoseVirtualNetworkDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _diagnoseVirtualNetworkSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<DiagnoseVirtualNetworkResult>, DiagnoseVirtualNetworkResult>;
}

export function _detachFollowerDatabasesSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  followerDatabaseToRemove: FollowerDatabaseDefinition,
  options: ClustersDetachFollowerDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/detachFollowerDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: followerDatabaseDefinitionSerializer(followerDatabaseToRemove),
  });
}

export async function _detachFollowerDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Detaches all followers of a database owned by this cluster. */
export function detachFollowerDatabases(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  followerDatabaseToRemove: FollowerDatabaseDefinition,
  options: ClustersDetachFollowerDatabasesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _detachFollowerDatabasesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _detachFollowerDatabasesSend(
        context,
        resourceGroupName,
        clusterName,
        followerDatabaseToRemove,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listFollowerDatabasesSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListFollowerDatabasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listFollowerDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listFollowerDatabasesDeserialize(
  result: PathUncheckedResponse,
): Promise<_FollowerDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _followerDatabaseListResultDeserializer(result.body);
}

/** Returns a list of databases that are owned by this cluster and were followed by another cluster. */
export function listFollowerDatabases(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListFollowerDatabasesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FollowerDatabaseDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listFollowerDatabasesSend(context, resourceGroupName, clusterName, options),
    _listFollowerDatabasesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _listFollowerDatabasesGetSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListFollowerDatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/listFollowerDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listFollowerDatabasesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<_FollowerDatabaseListResultGet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _followerDatabaseListResultGetDeserializer(result.body);
}

/** Returns a list of databases that are owned by this cluster and were followed by another cluster. */
export function listFollowerDatabasesGet(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersListFollowerDatabasesGetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FollowerDatabaseDefinitionGet> {
  return buildPagedAsyncIterator(
    context,
    () => _listFollowerDatabasesGetSend(context, resourceGroupName, clusterName, options),
    _listFollowerDatabasesGetDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _migrateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterMigrateRequest: ClusterMigrateRequest,
  options: ClustersMigrateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/migrate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: clusterMigrateRequestSerializer(clusterMigrateRequest),
  });
}

export async function _migrateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Migrate data from a Kusto cluster to another cluster. */
export function migrate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterMigrateRequest: ClusterMigrateRequest,
  options: ClustersMigrateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _migrateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateSend(context, resourceGroupName, clusterName, clusterMigrateRequest, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Starts a Kusto cluster. */
export function start(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Stops a Kusto cluster. */
export function stop(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: ClustersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Kusto/clusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterListResultDeserializer(result.body);
}

/** Lists all Kusto clusters within a subscription. */
export function list(
  context: Client,
  options: ClustersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Cluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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
): Promise<_ClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterListResultDeserializer(result.body);
}

/** Lists all Kusto clusters within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Cluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a Kusto cluster. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ClusterUpdate,
  options: ClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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
    body: clusterUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Update a Kusto cluster. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ClusterUpdate,
  options: ClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: Cluster,
  options: ClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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
    body: clusterSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Create or update a Kusto cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: Cluster,
  options: ClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Gets a Kusto cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersGetOptionalParams = { requestOptions: {} },
): Promise<Cluster> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
