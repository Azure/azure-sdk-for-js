// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext as Client } from "../index.js";
import type {
  ServiceResource,
  ServiceUpdateParameters,
  _ServiceResourceList,
  RestartReplicaRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serviceResourceSerializer,
  serviceResourceDeserializer,
  serviceUpdateParametersSerializer,
  _serviceResourceListDeserializer,
  restartReplicaRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServicesRestartReplicaOptionalParams,
  ServicesListByApplicationsOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _restartReplicaSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  parameters: RestartReplicaRequest,
  options: ServicesRestartReplicaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}/restartReplica{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: restartReplicaRequestSerializer(parameters),
  });
}

export async function _restartReplicaDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** A long-running resource action. */
export function restartReplica(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  parameters: RestartReplicaRequest,
  options: ServicesRestartReplicaOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartReplicaDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartReplicaSend(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByApplicationsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ServicesListByApplicationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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

export async function _listByApplicationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServiceResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _serviceResourceListDeserializer(result.body);
}

/** Gets all service resources created or in the process of being created in the Service Fabric managed application resource. */
export function listByApplications(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  options: ServicesListByApplicationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByApplicationsSend(context, resourceGroupName, clusterName, applicationName, options),
    _listByApplicationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Service Fabric managed service resource with the specified name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, applicationName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  parameters: ServiceUpdateParameters,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serviceResourceDeserializer(result.body);
}

/** Updates the tags of a service resource of a given managed cluster. */
export async function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  parameters: ServiceUpdateParameters,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): Promise<ServiceResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    clusterName,
    applicationName,
    serviceName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  parameters: ServiceResource,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serviceResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serviceResourceDeserializer(result.body);
}

/** Create or update a Service Fabric managed service resource with the specified name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  parameters: ServiceResource,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServiceResource>, ServiceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        applicationName,
        serviceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01",
  }) as PollerLike<OperationState<ServiceResource>, ServiceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationName: applicationName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serviceResourceDeserializer(result.body);
}

/** Get a Service Fabric service resource created or in the process of being created in the Service Fabric managed application resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationName: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): Promise<ServiceResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    applicationName,
    serviceName,
    options,
  );
  return _getDeserialize(result);
}
