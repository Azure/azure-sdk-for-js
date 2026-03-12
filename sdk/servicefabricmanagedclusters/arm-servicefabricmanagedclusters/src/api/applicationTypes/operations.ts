// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext as Client } from "../index.js";
import type {
  ApplicationTypeResource,
  ApplicationTypeUpdateParameters,
  _ApplicationTypeResourceList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  applicationTypeResourceSerializer,
  applicationTypeResourceDeserializer,
  applicationTypeUpdateParametersSerializer,
  _applicationTypeResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApplicationTypesListOptionalParams,
  ApplicationTypesDeleteOptionalParams,
  ApplicationTypesUpdateOptionalParams,
  ApplicationTypesCreateOrUpdateOptionalParams,
  ApplicationTypesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ApplicationTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationTypeResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _applicationTypeResourceListDeserializer(result.body);
}

/** Gets all application type name resources created or in the process of being created in the Service Fabric managed cluster resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ApplicationTypesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationTypeResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-02-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  options: ApplicationTypesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
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

/** Delete a Service Fabric managed application type name resource with the specified name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  options: ApplicationTypesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, applicationTypeName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  parameters: ApplicationTypeUpdateParameters,
  options: ApplicationTypesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
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
    body: applicationTypeUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationTypeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applicationTypeResourceDeserializer(result.body);
}

/** Updates the tags of an application type resource of a given managed cluster. */
export async function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  parameters: ApplicationTypeUpdateParameters,
  options: ApplicationTypesUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationTypeResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    clusterName,
    applicationTypeName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  parameters: ApplicationTypeResource,
  options: ApplicationTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
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
    body: applicationTypeResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationTypeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applicationTypeResourceDeserializer(result.body);
}

/** Create or update a Service Fabric managed application type name resource with the specified name. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  parameters: ApplicationTypeResource,
  options: ApplicationTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationTypeResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    clusterName,
    applicationTypeName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  options: ApplicationTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationTypeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applicationTypeResourceDeserializer(result.body);
}

/** Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric managed cluster resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  options: ApplicationTypesGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationTypeResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    applicationTypeName,
    options,
  );
  return _getDeserialize(result);
}
