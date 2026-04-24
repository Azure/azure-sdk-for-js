// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext as Client } from "../index.js";
import type {
  ApplicationTypeVersionResource,
  _ApplicationTypeVersionResourceList,
} from "../../models/models.js";
import {
  errorModelDeserializer,
  applicationTypeVersionResourceSerializer,
  applicationTypeVersionResourceDeserializer,
  _applicationTypeVersionResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApplicationTypeVersionsListOptionalParams,
  ApplicationTypeVersionsDeleteOptionalParams,
  ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ApplicationTypeVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  options: ApplicationTypeVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_ApplicationTypeVersionResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return _applicationTypeVersionResourceListDeserializer(result.body);
}

/** Gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  options: ApplicationTypeVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationTypeVersionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, applicationTypeName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  version: string,
  options: ApplicationTypeVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Service Fabric application type version resource with the specified name. */
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
  version: string,
  options: ApplicationTypeVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, applicationTypeName, version, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  version: string,
  parameters: ApplicationTypeVersionResource,
  options: ApplicationTypeVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationTypeVersionResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationTypeVersionResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return applicationTypeVersionResourceDeserializer(result.body);
}

/** Create or update a Service Fabric application type version resource with the specified name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  version: string,
  parameters: ApplicationTypeVersionResource,
  options: ApplicationTypeVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApplicationTypeVersionResource>, ApplicationTypeVersionResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        applicationTypeName,
        version,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<ApplicationTypeVersionResource>, ApplicationTypeVersionResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  version: string,
  options: ApplicationTypeVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      applicationTypeName: applicationTypeName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<ApplicationTypeVersionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return applicationTypeVersionResourceDeserializer(result.body);
}

/** Get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  applicationTypeName: string,
  version: string,
  options: ApplicationTypeVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationTypeVersionResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    applicationTypeName,
    version,
    options,
  );
  return _getDeserialize(result);
}
