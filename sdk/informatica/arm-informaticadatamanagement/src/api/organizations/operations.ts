// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InformaticaDataManagementContext as Client } from "../index.js";
import type {
  InformaticaOrganizationResource,
  InformaticaOrganizationResourceUpdate,
  _InformaticaOrganizationResourceListResult,
  ServerlessMetadataResponse,
  InformaticaServerlessRuntimeResourceList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  informaticaOrganizationResourceSerializer,
  informaticaOrganizationResourceDeserializer,
  informaticaOrganizationResourceUpdateSerializer,
  _informaticaOrganizationResourceListResultDeserializer,
  serverlessMetadataResponseDeserializer,
  informaticaServerlessRuntimeResourceListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OrganizationsGetAllServerlessRuntimesOptionalParams,
  OrganizationsGetServerlessMetadataOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getAllServerlessRuntimesSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsGetAllServerlessRuntimesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/getAllServerlessRuntimes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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

export async function _getAllServerlessRuntimesDeserialize(
  result: PathUncheckedResponse,
): Promise<InformaticaServerlessRuntimeResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaServerlessRuntimeResourceListDeserializer(result.body);
}

/** Gets all serverless runtime resources in a given informatica organization resource. */
export async function getAllServerlessRuntimes(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsGetAllServerlessRuntimesOptionalParams = { requestOptions: {} },
): Promise<InformaticaServerlessRuntimeResourceList> {
  const result = await _getAllServerlessRuntimesSend(
    context,
    resourceGroupName,
    organizationName,
    options,
  );
  return _getAllServerlessRuntimesDeserialize(result);
}

export function _getServerlessMetadataSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsGetServerlessMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}/getServerlessMetadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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

export async function _getServerlessMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerlessMetadataResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverlessMetadataResponseDeserializer(result.body);
}

/** Gets Metadata of the serverless runtime environment. */
export async function getServerlessMetadata(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsGetServerlessMetadataOptionalParams = { requestOptions: {} },
): Promise<ServerlessMetadataResponse> {
  const result = await _getServerlessMetadataSend(
    context,
    resourceGroupName,
    organizationName,
    options,
  );
  return _getServerlessMetadataDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: OrganizationsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Informatica.DataManagement/organizations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InformaticaOrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _informaticaOrganizationResourceListResultDeserializer(result.body);
}

/** List InformaticaOrganizationResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: OrganizationsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InformaticaOrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-27" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: OrganizationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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
): Promise<_InformaticaOrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _informaticaOrganizationResourceListResultDeserializer(result.body);
}

/** List InformaticaOrganizationResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: OrganizationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InformaticaOrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-27" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a InformaticaOrganizationResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, organizationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-27",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  properties: InformaticaOrganizationResourceUpdate,
  options: OrganizationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: informaticaOrganizationResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<InformaticaOrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaOrganizationResourceDeserializer(result.body);
}

/** Update a InformaticaOrganizationResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  properties: InformaticaOrganizationResourceUpdate,
  options: OrganizationsUpdateOptionalParams = { requestOptions: {} },
): Promise<InformaticaOrganizationResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    organizationName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  resource: InformaticaOrganizationResource,
  options: OrganizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: informaticaOrganizationResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InformaticaOrganizationResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaOrganizationResourceDeserializer(result.body);
}

/** Create a InformaticaOrganizationResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  resource: InformaticaOrganizationResource,
  options: OrganizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InformaticaOrganizationResource>, InformaticaOrganizationResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, organizationName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-27",
  }) as PollerLike<
    OperationState<InformaticaOrganizationResource>,
    InformaticaOrganizationResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Informatica.DataManagement/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion ?? "2025-11-27",
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
): Promise<InformaticaOrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return informaticaOrganizationResourceDeserializer(result.body);
}

/** Get a InformaticaOrganizationResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationsGetOptionalParams = { requestOptions: {} },
): Promise<InformaticaOrganizationResource> {
  const result = await _getSend(context, resourceGroupName, organizationName, options);
  return _getDeserialize(result);
}
