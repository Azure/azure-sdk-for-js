// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  VirtualNetworkProfile,
  CustomDnsSuffixConfiguration,
  AseV3NetworkingConfiguration,
  WorkerPoolResource,
  _WorkerPoolCollection,
  _ResourceMetricDefinitionCollection,
  ResourceMetricDefinition,
  _SkuInfoCollection,
  SkuInfo,
  _UsageCollection,
  Usage,
  AppServiceEnvironmentResource,
  AppServiceEnvironmentPatchResource,
  _AppServiceEnvironmentCollection,
  _StampCapacityCollection,
  StampCapacity,
  _WebAppCollection,
  Site,
  HostingEnvironmentDiagnostics,
  _InboundEnvironmentEndpointCollection,
  InboundEnvironmentEndpoint,
  Operation,
  _OutboundEnvironmentEndpointCollection,
  OutboundEnvironmentEndpoint,
  PrivateLinkResourcesWrapper,
  _AppServicePlanCollection,
  AppServicePlan,
  _CsmUsageQuotaCollection,
  CsmUsageQuota,
  AddressResponse,
  RemotePrivateEndpointConnectionARMResource,
  _PrivateEndpointConnectionCollection,
  AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationResponse,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  virtualNetworkProfileSerializer,
  customDnsSuffixConfigurationSerializer,
  customDnsSuffixConfigurationDeserializer,
  aseV3NetworkingConfigurationSerializer,
  aseV3NetworkingConfigurationDeserializer,
  workerPoolResourceSerializer,
  workerPoolResourceDeserializer,
  _workerPoolCollectionDeserializer,
  _resourceMetricDefinitionCollectionDeserializer,
  _skuInfoCollectionDeserializer,
  _usageCollectionDeserializer,
  appServiceEnvironmentResourceSerializer,
  appServiceEnvironmentResourceDeserializer,
  appServiceEnvironmentPatchResourceSerializer,
  _appServiceEnvironmentCollectionDeserializer,
  _stampCapacityCollectionDeserializer,
  _webAppCollectionDeserializer,
  hostingEnvironmentDiagnosticsDeserializer,
  _inboundEnvironmentEndpointCollectionDeserializer,
  _outboundEnvironmentEndpointCollectionDeserializer,
  privateLinkResourcesWrapperDeserializer,
  _appServicePlanCollectionDeserializer,
  _csmUsageQuotaCollectionDeserializer,
  addressResponseDeserializer,
  remotePrivateEndpointConnectionARMResourceSerializer,
  remotePrivateEndpointConnectionARMResourceDeserializer,
  _privateEndpointConnectionCollectionDeserializer,
  hostingEnvironmentDiagnosticsArrayDeserializer,
  operationArrayDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AppServiceEnvironmentsListPrivateEndpointConnectionListOptionalParams,
  AppServiceEnvironmentsDeletePrivateEndpointConnectionOptionalParams,
  AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionOptionalParams,
  AppServiceEnvironmentsGetPrivateEndpointConnectionOptionalParams,
  AppServiceEnvironmentsListMultiRoleUsagesOptionalParams,
  AppServiceEnvironmentsListMultiRolePoolSkusOptionalParams,
  AppServiceEnvironmentsListMultiRoleMetricDefinitionsOptionalParams,
  AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitionsOptionalParams,
  AppServiceEnvironmentsListMultiRolePoolsOptionalParams,
  AppServiceEnvironmentsUpdateMultiRolePoolOptionalParams,
  AppServiceEnvironmentsCreateOrUpdateMultiRolePoolOptionalParams,
  AppServiceEnvironmentsGetMultiRolePoolOptionalParams,
  AppServiceEnvironmentsUpdateAseNetworkingConfigurationOptionalParams,
  AppServiceEnvironmentsGetAseV3NetworkingConfigurationOptionalParams,
  AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationOptionalParams,
  AppServiceEnvironmentsUpdateAseCustomDnsSuffixConfigurationOptionalParams,
  AppServiceEnvironmentsGetAseCustomDnsSuffixConfigurationOptionalParams,
  AppServiceEnvironmentsGetVipInfoOptionalParams,
  AppServiceEnvironmentsListUsagesOptionalParams,
  AppServiceEnvironmentsListSuspendOptionalParams,
  AppServiceEnvironmentsListWebAppsOptionalParams,
  AppServiceEnvironmentsListAppServicePlansOptionalParams,
  AppServiceEnvironmentsListResumeOptionalParams,
  AppServiceEnvironmentsRebootOptionalParams,
  AppServiceEnvironmentsGetPrivateLinkResourcesOptionalParams,
  AppServiceEnvironmentsListOutboundNetworkDependenciesEndpointsOptionalParams,
  AppServiceEnvironmentsListOperationsOptionalParams,
  AppServiceEnvironmentsUpgradeOptionalParams,
  AppServiceEnvironmentsTestUpgradeAvailableNotificationOptionalParams,
  AppServiceEnvironmentsListInboundNetworkDependenciesEndpointsOptionalParams,
  AppServiceEnvironmentsGetDiagnosticsItemOptionalParams,
  AppServiceEnvironmentsListDiagnosticsOptionalParams,
  AppServiceEnvironmentsListChangeVnetOptionalParams,
  AppServiceEnvironmentsListCapacitiesOptionalParams,
  AppServiceEnvironmentsListOptionalParams,
  AppServiceEnvironmentsListByResourceGroupOptionalParams,
  AppServiceEnvironmentsDeleteOptionalParams,
  AppServiceEnvironmentsUpdateOptionalParams,
  AppServiceEnvironmentsCreateOrUpdateOptionalParams,
  AppServiceEnvironmentsGetOptionalParams,
  AppServiceEnvironmentsListWebWorkerUsagesOptionalParams,
  AppServiceEnvironmentsListWorkerPoolSkusOptionalParams,
  AppServiceEnvironmentsListWebWorkerMetricDefinitionsOptionalParams,
  AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitionsOptionalParams,
  AppServiceEnvironmentsListWorkerPoolsOptionalParams,
  AppServiceEnvironmentsUpdateWorkerPoolOptionalParams,
  AppServiceEnvironmentsCreateOrUpdateWorkerPoolOptionalParams,
  AppServiceEnvironmentsGetWorkerPoolOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPrivateEndpointConnectionListSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListPrivateEndpointConnectionListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listPrivateEndpointConnectionListDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionCollectionDeserializer(result.body);
}

/** Description for Gets the list of private endpoints associated with a hosting environment */
export function listPrivateEndpointConnectionList(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListPrivateEndpointConnectionListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RemotePrivateEndpointConnectionARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateEndpointConnectionListSend(context, resourceGroupName, name, options),
    _listPrivateEndpointConnectionListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deletePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: AppServiceEnvironmentsDeletePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _deletePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Deletes a private endpoint connection */
export function deletePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: AppServiceEnvironmentsDeletePrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deletePrivateEndpointConnectionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deletePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _approveOrRejectPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remotePrivateEndpointConnectionARMResourceSerializer(privateEndpointWrapper),
  });
}

export async function _approveOrRejectPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Approves or rejects a private endpoint connection */
export function approveOrRejectPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: AppServiceEnvironmentsApproveOrRejectPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<RemotePrivateEndpointConnectionARMResource>,
  RemotePrivateEndpointConnectionARMResource
> {
  return getLongRunningPoller(
    context,
    _approveOrRejectPrivateEndpointConnectionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _approveOrRejectPrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          privateEndpointWrapper,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<
    OperationState<RemotePrivateEndpointConnectionARMResource>,
    RemotePrivateEndpointConnectionARMResource
  >;
}

export function _getPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: AppServiceEnvironmentsGetPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Gets a private endpoint connection */
export async function getPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: AppServiceEnvironmentsGetPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const result = await _getPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    name,
    privateEndpointConnectionName,
    options,
  );
  return _getPrivateEndpointConnectionDeserialize(result);
}

export function _listMultiRoleUsagesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRoleUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listMultiRoleUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsageCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _usageCollectionDeserializer(result.body);
}

/** Description for Get usage metrics for a multi-role pool of an App Service Environment. */
export function listMultiRoleUsages(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRoleUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listMultiRoleUsagesSend(context, resourceGroupName, name, options),
    _listMultiRoleUsagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listMultiRolePoolSkusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRolePoolSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listMultiRolePoolSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _skuInfoCollectionDeserializer(result.body);
}

/** Description for Get available SKUs for scaling a multi-role pool. */
export function listMultiRolePoolSkus(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRolePoolSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkuInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listMultiRolePoolSkusSend(context, resourceGroupName, name, options),
    _listMultiRolePoolSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listMultiRoleMetricDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRoleMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/metricdefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listMultiRoleMetricDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceMetricDefinitionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _resourceMetricDefinitionCollectionDeserializer(result.body);
}

/** Description for Get metric definitions for a multi-role pool of an App Service Environment. */
export function listMultiRoleMetricDefinitions(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRoleMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceMetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listMultiRoleMetricDefinitionsSend(context, resourceGroupName, name, options),
    _listMultiRoleMetricDefinitionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listMultiRolePoolInstanceMetricDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  instance: string,
  options: AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/instances/{instance}/metricdefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      instance: instance,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listMultiRolePoolInstanceMetricDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceMetricDefinitionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _resourceMetricDefinitionCollectionDeserializer(result.body);
}

/** Description for Get metric definitions for a specific instance of a multi-role pool of an App Service Environment. */
export function listMultiRolePoolInstanceMetricDefinitions(
  context: Client,
  resourceGroupName: string,
  name: string,
  instance: string,
  options: AppServiceEnvironmentsListMultiRolePoolInstanceMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceMetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listMultiRolePoolInstanceMetricDefinitionsSend(
        context,
        resourceGroupName,
        name,
        instance,
        options,
      ),
    _listMultiRolePoolInstanceMetricDefinitionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listMultiRolePoolsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRolePoolsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listMultiRolePoolsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkerPoolCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _workerPoolCollectionDeserializer(result.body);
}

/** Description for Get all multi-role pools. */
export function listMultiRolePools(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListMultiRolePoolsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkerPoolResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listMultiRolePoolsSend(context, resourceGroupName, name, options),
    _listMultiRolePoolsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _updateMultiRolePoolSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  multiRolePoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsUpdateMultiRolePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workerPoolResourceSerializer(multiRolePoolEnvelope),
  });
}

export async function _updateMultiRolePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkerPoolResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workerPoolResourceDeserializer(result.body);
}

/** Description for Create or update a multi-role pool. */
export async function updateMultiRolePool(
  context: Client,
  resourceGroupName: string,
  name: string,
  multiRolePoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsUpdateMultiRolePoolOptionalParams = { requestOptions: {} },
): Promise<WorkerPoolResource> {
  const result = await _updateMultiRolePoolSend(
    context,
    resourceGroupName,
    name,
    multiRolePoolEnvelope,
    options,
  );
  return _updateMultiRolePoolDeserialize(result);
}

export function _createOrUpdateMultiRolePoolSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  multiRolePoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsCreateOrUpdateMultiRolePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workerPoolResourceSerializer(multiRolePoolEnvelope),
  });
}

export async function _createOrUpdateMultiRolePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkerPoolResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workerPoolResourceDeserializer(result.body);
}

/** Description for Create or update a multi-role pool. */
export function createOrUpdateMultiRolePool(
  context: Client,
  resourceGroupName: string,
  name: string,
  multiRolePoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsCreateOrUpdateMultiRolePoolOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkerPoolResource>, WorkerPoolResource> {
  return getLongRunningPoller(
    context,
    _createOrUpdateMultiRolePoolDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateMultiRolePoolSend(
          context,
          resourceGroupName,
          name,
          multiRolePoolEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<WorkerPoolResource>, WorkerPoolResource>;
}

export function _getMultiRolePoolSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetMultiRolePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getMultiRolePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkerPoolResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workerPoolResourceDeserializer(result.body);
}

/** Description for Get properties of a multi-role pool. */
export async function getMultiRolePool(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetMultiRolePoolOptionalParams = { requestOptions: {} },
): Promise<WorkerPoolResource> {
  const result = await _getMultiRolePoolSend(context, resourceGroupName, name, options);
  return _getMultiRolePoolDeserialize(result);
}

export function _updateAseNetworkingConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  aseNetworkingConfiguration: AseV3NetworkingConfiguration,
  options: AppServiceEnvironmentsUpdateAseNetworkingConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/configurations/networking{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aseV3NetworkingConfigurationSerializer(aseNetworkingConfiguration),
  });
}

export async function _updateAseNetworkingConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<AseV3NetworkingConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return aseV3NetworkingConfigurationDeserializer(result.body);
}

/** Description for Update networking configuration of an App Service Environment */
export async function updateAseNetworkingConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  aseNetworkingConfiguration: AseV3NetworkingConfiguration,
  options: AppServiceEnvironmentsUpdateAseNetworkingConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<AseV3NetworkingConfiguration> {
  const result = await _updateAseNetworkingConfigurationSend(
    context,
    resourceGroupName,
    name,
    aseNetworkingConfiguration,
    options,
  );
  return _updateAseNetworkingConfigurationDeserialize(result);
}

export function _getAseV3NetworkingConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetAseV3NetworkingConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/configurations/networking{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getAseV3NetworkingConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<AseV3NetworkingConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return aseV3NetworkingConfigurationDeserializer(result.body);
}

/** Description for Get networking configuration of an App Service Environment */
export async function getAseV3NetworkingConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetAseV3NetworkingConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<AseV3NetworkingConfiguration> {
  const result = await _getAseV3NetworkingConfigurationSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _getAseV3NetworkingConfigurationDeserialize(result);
}

export function _deleteAseCustomDnsSuffixConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/configurations/customdnssuffix{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _deleteAseCustomDnsSuffixConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationResponse> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Delete Custom Dns Suffix configuration of an App Service Environment */
export async function deleteAseCustomDnsSuffixConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationResponse> {
  const result = await _deleteAseCustomDnsSuffixConfigurationSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _deleteAseCustomDnsSuffixConfigurationDeserialize(result);
}

export function _updateAseCustomDnsSuffixConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  customDnsSuffixConfiguration: CustomDnsSuffixConfiguration,
  options: AppServiceEnvironmentsUpdateAseCustomDnsSuffixConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/configurations/customdnssuffix{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: customDnsSuffixConfigurationSerializer(customDnsSuffixConfiguration),
  });
}

export async function _updateAseCustomDnsSuffixConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomDnsSuffixConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return customDnsSuffixConfigurationDeserializer(result.body);
}

/** Update Custom Dns Suffix configuration of an App Service Environment */
export async function updateAseCustomDnsSuffixConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  customDnsSuffixConfiguration: CustomDnsSuffixConfiguration,
  options: AppServiceEnvironmentsUpdateAseCustomDnsSuffixConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<CustomDnsSuffixConfiguration> {
  const result = await _updateAseCustomDnsSuffixConfigurationSend(
    context,
    resourceGroupName,
    name,
    customDnsSuffixConfiguration,
    options,
  );
  return _updateAseCustomDnsSuffixConfigurationDeserialize(result);
}

export function _getAseCustomDnsSuffixConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetAseCustomDnsSuffixConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/configurations/customdnssuffix{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getAseCustomDnsSuffixConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomDnsSuffixConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return customDnsSuffixConfigurationDeserializer(result.body);
}

/** Get Custom Dns Suffix configuration of an App Service Environment */
export async function getAseCustomDnsSuffixConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetAseCustomDnsSuffixConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<CustomDnsSuffixConfiguration> {
  const result = await _getAseCustomDnsSuffixConfigurationSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _getAseCustomDnsSuffixConfigurationDeserialize(result);
}

export function _getVipInfoSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetVipInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/capacities/virtualip{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getVipInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<AddressResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return addressResponseDeserializer(result.body);
}

/** Description for Get IP addresses assigned to an App Service Environment. */
export async function getVipInfo(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetVipInfoOptionalParams = { requestOptions: {} },
): Promise<AddressResponse> {
  const result = await _getVipInfoSend(context, resourceGroupName, name, options);
  return _getVipInfoDeserialize(result);
}

export function _listUsagesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/usages{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
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

export async function _listUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmUsageQuotaCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _csmUsageQuotaCollectionDeserializer(result.body);
}

/** Description for Get global usage metrics of an App Service Environment. */
export function listUsages(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmUsageQuota> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsagesSend(context, resourceGroupName, name, options),
    _listUsagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listSuspendSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/suspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listSuspendDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppCollection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Suspend an App Service Environment. */
export function listSuspend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListSuspendOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _listSuspendSend(context, resourceGroupName, name, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _listSuspendDeserialize,
    ["200", "202", "201"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listWebAppsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListWebAppsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/sites{?api%2Dversion,propertiesToInclude}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      propertiesToInclude: options?.propertiesToInclude,
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

export async function _listWebAppsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Get all apps in an App Service Environment. */
export function listWebApps(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListWebAppsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  return buildPagedAsyncIterator(
    context,
    () => _listWebAppsSend(context, resourceGroupName, name, options),
    _listWebAppsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listAppServicePlansSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListAppServicePlansOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/serverfarms{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listAppServicePlansDeserialize(
  result: PathUncheckedResponse,
): Promise<_AppServicePlanCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _appServicePlanCollectionDeserializer(result.body);
}

/** Description for Get all App Service plans in an App Service Environment. */
export function listAppServicePlans(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListAppServicePlansOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServicePlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listAppServicePlansSend(context, resourceGroupName, name, options),
    _listAppServicePlansDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listResumeSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listResumeDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppCollection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Resume an App Service Environment. */
export function listResume(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListResumeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _listResumeSend(context, resourceGroupName, name, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _listResumeDeserialize,
    ["200", "202", "201"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _rebootSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsRebootOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/reboot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _rebootDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Reboot all machines in an App Service Environment. */
export async function reboot(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsRebootOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _rebootSend(context, resourceGroupName, name, options);
  return _rebootDeserialize(result);
}

export function _getPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourcesWrapper> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourcesWrapperDeserializer(result.body);
}

/** Description for Gets the private link resources */
export async function getPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResourcesWrapper> {
  const result = await _getPrivateLinkResourcesSend(context, resourceGroupName, name, options);
  return _getPrivateLinkResourcesDeserialize(result);
}

export function _listOutboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _outboundEnvironmentEndpointCollectionDeserializer(result.body);
}

/** Description for Get the network endpoints of all outbound dependencies of an App Service Environment. */
export function listOutboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OutboundEnvironmentEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listOutboundNetworkDependenciesEndpointsSend(context, resourceGroupName, name, options),
    _listOutboundNetworkDependenciesEndpointsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listOperationsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/operations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<Operation[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return operationArrayDeserializer(result.body);
}

/** Description for List all currently running operations on the App Service Environment. */
export async function listOperations(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListOperationsOptionalParams = { requestOptions: {} },
): Promise<Operation[]> {
  const result = await _listOperationsSend(context, resourceGroupName, name, options);
  return _listOperationsDeserialize(result);
}

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _upgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Initiate an upgrade of an App Service Environment if one is available. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _upgradeSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _testUpgradeAvailableNotificationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsTestUpgradeAvailableNotificationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/testUpgradeAvailableNotification{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _testUpgradeAvailableNotificationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Send a test notification that an upgrade is available for this App Service Environment. */
export async function testUpgradeAvailableNotification(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsTestUpgradeAvailableNotificationOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _testUpgradeAvailableNotificationSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _testUpgradeAvailableNotificationDeserialize(result);
}

export function _listInboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListInboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/inboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listInboundNetworkDependenciesEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<_InboundEnvironmentEndpointCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _inboundEnvironmentEndpointCollectionDeserializer(result.body);
}

/** Description for Get the network endpoints of all inbound dependencies of an App Service Environment. */
export function listInboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListInboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<InboundEnvironmentEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listInboundNetworkDependenciesEndpointsSend(context, resourceGroupName, name, options),
    _listInboundNetworkDependenciesEndpointsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getDiagnosticsItemSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  diagnosticsName: string,
  options: AppServiceEnvironmentsGetDiagnosticsItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/hostingEnvironments/{name}/diagnostics/{diagnosticsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      diagnosticsName: diagnosticsName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDiagnosticsItemDeserialize(
  result: PathUncheckedResponse,
): Promise<HostingEnvironmentDiagnostics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostingEnvironmentDiagnosticsDeserializer(result.body);
}

/** Description for Get a diagnostics item for an App Service Environment. */
export async function getDiagnosticsItem(
  context: Client,
  resourceGroupName: string,
  name: string,
  diagnosticsName: string,
  options: AppServiceEnvironmentsGetDiagnosticsItemOptionalParams = { requestOptions: {} },
): Promise<HostingEnvironmentDiagnostics> {
  const result = await _getDiagnosticsItemSend(
    context,
    resourceGroupName,
    name,
    diagnosticsName,
    options,
  );
  return _getDiagnosticsItemDeserialize(result);
}

export function _listDiagnosticsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListDiagnosticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/diagnostics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listDiagnosticsDeserialize(
  result: PathUncheckedResponse,
): Promise<HostingEnvironmentDiagnostics[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return hostingEnvironmentDiagnosticsArrayDeserializer(result.body);
}

/** Description for Get diagnostic information for an App Service Environment. */
export async function listDiagnostics(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListDiagnosticsOptionalParams = { requestOptions: {} },
): Promise<HostingEnvironmentDiagnostics[]> {
  const result = await _listDiagnosticsSend(context, resourceGroupName, name, options);
  return _listDiagnosticsDeserialize(result);
}

export function _listChangeVnetSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetInfo: VirtualNetworkProfile,
  options: AppServiceEnvironmentsListChangeVnetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/changeVirtualNetwork{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkProfileSerializer(vnetInfo),
  });
}

export async function _listChangeVnetDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppCollection> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Move an App Service Environment to a different VNET. */
export function listChangeVnet(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetInfo: VirtualNetworkProfile,
  options: AppServiceEnvironmentsListChangeVnetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listChangeVnetSend(context, resourceGroupName, name, vnetInfo, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _listChangeVnetDeserialize,
    ["200", "202", "201"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listCapacitiesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListCapacitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/capacities/compute{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listCapacitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<_StampCapacityCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _stampCapacityCollectionDeserializer(result.body);
}

/** Description for Get the used, available, and total worker capacity an App Service Environment. */
export function listCapacities(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListCapacitiesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StampCapacity> {
  return buildPagedAsyncIterator(
    context,
    () => _listCapacitiesSend(context, resourceGroupName, name, options),
    _listCapacitiesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  options: AppServiceEnvironmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/hostingEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<_AppServiceEnvironmentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _appServiceEnvironmentCollectionDeserializer(result.body);
}

/** Description for Get all App Service Environments for a subscription. */
export function list(
  context: Client,
  options: AppServiceEnvironmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServiceEnvironmentResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AppServiceEnvironmentsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<_AppServiceEnvironmentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _appServiceEnvironmentCollectionDeserializer(result.body);
}

/** Description for Get all App Service Environments in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AppServiceEnvironmentsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServiceEnvironmentResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}{?api%2Dversion,forceDelete}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      forceDelete: options?.forceDelete,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Description for Delete an App Service Environment. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostingEnvironmentEnvelope: AppServiceEnvironmentPatchResource,
  options: AppServiceEnvironmentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServiceEnvironmentPatchResourceSerializer(hostingEnvironmentEnvelope),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceEnvironmentResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return appServiceEnvironmentResourceDeserializer(result.body);
}

/** Description for Create or update an App Service Environment. */
export async function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostingEnvironmentEnvelope: AppServiceEnvironmentPatchResource,
  options: AppServiceEnvironmentsUpdateOptionalParams = { requestOptions: {} },
): Promise<AppServiceEnvironmentResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    name,
    hostingEnvironmentEnvelope,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostingEnvironmentEnvelope: AppServiceEnvironmentResource,
  options: AppServiceEnvironmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServiceEnvironmentResourceSerializer(hostingEnvironmentEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceEnvironmentResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return appServiceEnvironmentResourceDeserializer(result.body);
}

/** Description for Create or update an App Service Environment. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  hostingEnvironmentEnvelope: AppServiceEnvironmentResource,
  options: AppServiceEnvironmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AppServiceEnvironmentResource>, AppServiceEnvironmentResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, name, hostingEnvironmentEnvelope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<AppServiceEnvironmentResource>, AppServiceEnvironmentResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceEnvironmentResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return appServiceEnvironmentResourceDeserializer(result.body);
}

/** Description for Get the properties of an App Service Environment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsGetOptionalParams = { requestOptions: {} },
): Promise<AppServiceEnvironmentResource> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}

export function _listWebWorkerUsagesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsListWebWorkerUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerPoolName: workerPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listWebWorkerUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsageCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _usageCollectionDeserializer(result.body);
}

/** Description for Get usage metrics for a worker pool of an App Service Environment. */
export function listWebWorkerUsages(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsListWebWorkerUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listWebWorkerUsagesSend(context, resourceGroupName, name, workerPoolName, options),
    _listWebWorkerUsagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listWorkerPoolSkusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsListWorkerPoolSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerPoolName: workerPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listWorkerPoolSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_SkuInfoCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _skuInfoCollectionDeserializer(result.body);
}

/** Description for Get available SKUs for scaling a worker pool. */
export function listWorkerPoolSkus(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsListWorkerPoolSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SkuInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listWorkerPoolSkusSend(context, resourceGroupName, name, workerPoolName, options),
    _listWorkerPoolSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listWebWorkerMetricDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsListWebWorkerMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/metricdefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerPoolName: workerPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listWebWorkerMetricDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceMetricDefinitionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _resourceMetricDefinitionCollectionDeserializer(result.body);
}

/** Description for Get metric definitions for a worker pool of an App Service Environment. */
export function listWebWorkerMetricDefinitions(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsListWebWorkerMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceMetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listWebWorkerMetricDefinitionsSend(
        context,
        resourceGroupName,
        name,
        workerPoolName,
        options,
      ),
    _listWebWorkerMetricDefinitionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listWorkerPoolInstanceMetricDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  instance: string,
  options: AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/instances/{instance}/metricdefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerPoolName: workerPoolName,
      instance: instance,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listWorkerPoolInstanceMetricDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceMetricDefinitionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _resourceMetricDefinitionCollectionDeserializer(result.body);
}

/** Description for Get metric definitions for a specific instance of a worker pool of an App Service Environment. */
export function listWorkerPoolInstanceMetricDefinitions(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  instance: string,
  options: AppServiceEnvironmentsListWorkerPoolInstanceMetricDefinitionsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceMetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listWorkerPoolInstanceMetricDefinitionsSend(
        context,
        resourceGroupName,
        name,
        workerPoolName,
        instance,
        options,
      ),
    _listWorkerPoolInstanceMetricDefinitionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listWorkerPoolsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListWorkerPoolsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listWorkerPoolsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkerPoolCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _workerPoolCollectionDeserializer(result.body);
}

/** Description for Get all worker pools of an App Service Environment. */
export function listWorkerPools(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceEnvironmentsListWorkerPoolsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkerPoolResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listWorkerPoolsSend(context, resourceGroupName, name, options),
    _listWorkerPoolsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _updateWorkerPoolSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  workerPoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsUpdateWorkerPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerPoolName: workerPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workerPoolResourceSerializer(workerPoolEnvelope),
  });
}

export async function _updateWorkerPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkerPoolResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workerPoolResourceDeserializer(result.body);
}

/** Description for Create or update a worker pool. */
export async function updateWorkerPool(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  workerPoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsUpdateWorkerPoolOptionalParams = { requestOptions: {} },
): Promise<WorkerPoolResource> {
  const result = await _updateWorkerPoolSend(
    context,
    resourceGroupName,
    name,
    workerPoolName,
    workerPoolEnvelope,
    options,
  );
  return _updateWorkerPoolDeserialize(result);
}

export function _createOrUpdateWorkerPoolSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  workerPoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsCreateOrUpdateWorkerPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerPoolName: workerPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workerPoolResourceSerializer(workerPoolEnvelope),
  });
}

export async function _createOrUpdateWorkerPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkerPoolResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workerPoolResourceDeserializer(result.body);
}

/** Description for Create or update a worker pool. */
export function createOrUpdateWorkerPool(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  workerPoolEnvelope: WorkerPoolResource,
  options: AppServiceEnvironmentsCreateOrUpdateWorkerPoolOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkerPoolResource>, WorkerPoolResource> {
  return getLongRunningPoller(
    context,
    _createOrUpdateWorkerPoolDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateWorkerPoolSend(
          context,
          resourceGroupName,
          name,
          workerPoolName,
          workerPoolEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<WorkerPoolResource>, WorkerPoolResource>;
}

export function _getWorkerPoolSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsGetWorkerPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerPoolName: workerPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getWorkerPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkerPoolResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return workerPoolResourceDeserializer(result.body);
}

/** Description for Get properties of a worker pool. */
export async function getWorkerPool(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerPoolName: string,
  options: AppServiceEnvironmentsGetWorkerPoolOptionalParams = { requestOptions: {} },
): Promise<WorkerPoolResource> {
  const result = await _getWorkerPoolSend(
    context,
    resourceGroupName,
    name,
    workerPoolName,
    options,
  );
  return _getWorkerPoolDeserialize(result);
}
