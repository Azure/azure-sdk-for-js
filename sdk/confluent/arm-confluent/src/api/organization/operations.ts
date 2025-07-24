// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext as Client } from "../index.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  APIKeyRecord,
  apiKeyRecordDeserializer,
  OrganizationResource,
  organizationResourceSerializer,
  organizationResourceDeserializer,
  organizationResourceUpdateSerializer,
  _OrganizationResourceListResult,
  _organizationResourceListResultDeserializer,
  ListAccessRequestModel,
  listAccessRequestModelSerializer,
  ListRegionsSuccessResponse,
  listRegionsSuccessResponseDeserializer,
  SCEnvironmentRecord,
  scEnvironmentRecordDeserializer,
  _GetEnvironmentsResponse,
  _getEnvironmentsResponseDeserializer,
  _ListSchemaRegistryClustersResponse,
  _listSchemaRegistryClustersResponseDeserializer,
  SchemaRegistryClusterRecord,
  schemaRegistryClusterRecordDeserializer,
  SCClusterRecord,
  scClusterRecordDeserializer,
  _ListClustersSuccessResponse,
  _listClustersSuccessResponseDeserializer,
  CreateAPIKeyModel,
  createAPIKeyModelSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  OrganizationCreateApiKeyOptionalParams,
  OrganizationListClustersOptionalParams,
  OrganizationGetClusterByIdOptionalParams,
  OrganizationGetSchemaRegistryClusterByIdOptionalParams,
  OrganizationListSchemaRegistryClustersOptionalParams,
  OrganizationListEnvironmentsOptionalParams,
  OrganizationGetEnvironmentByIdOptionalParams,
  OrganizationListRegionsOptionalParams,
  OrganizationListBySubscriptionOptionalParams,
  OrganizationListByResourceGroupOptionalParams,
  OrganizationDeleteOptionalParams,
  OrganizationUpdateOptionalParams,
  OrganizationCreateOptionalParams,
  OrganizationGetOptionalParams,
  OrganizationDeleteClusterAPIKeyOptionalParams,
  OrganizationGetClusterAPIKeyOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _createApiKeySend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  body: CreateAPIKeyModel,
  options: OrganizationCreateApiKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/createAPIKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createAPIKeyModelSerializer(body),
  });
}

export async function _createApiKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<APIKeyRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return apiKeyRecordDeserializer(result.body);
}

/** Creates API key for a schema registry Cluster ID or Kafka Cluster ID under a environment */
export async function createApiKey(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  body: CreateAPIKeyModel,
  options: OrganizationCreateApiKeyOptionalParams = { requestOptions: {} },
): Promise<APIKeyRecord> {
  const result = await _createApiKeySend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    body,
    options,
  );
  return _createApiKeyDeserialize(result);
}

export function _listClustersSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: OrganizationListClustersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters{?api%2Dversion,pageSize,pageToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      "api%2Dversion": context.apiVersion,
      pageSize: options?.pageSize,
      pageToken: options?.pageToken,
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

export async function _listClustersDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListClustersSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _listClustersSuccessResponseDeserializer(result.body);
}

/** Lists of all the clusters in a environment */
export function listClusters(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: OrganizationListClustersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SCClusterRecord> {
  return buildPagedAsyncIterator(
    context,
    () => _listClustersSend(context, resourceGroupName, organizationName, environmentId, options),
    _listClustersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getClusterByIdSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: OrganizationGetClusterByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
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

export async function _getClusterByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<SCClusterRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return scClusterRecordDeserializer(result.body);
}

/** Get cluster by Id */
export async function getClusterById(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: OrganizationGetClusterByIdOptionalParams = { requestOptions: {} },
): Promise<SCClusterRecord> {
  const result = await _getClusterByIdSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    options,
  );
  return _getClusterByIdDeserialize(result);
}

export function _getSchemaRegistryClusterByIdSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: OrganizationGetSchemaRegistryClusterByIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/schemaRegistryClusters/{clusterId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
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

export async function _getSchemaRegistryClusterByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaRegistryClusterRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return schemaRegistryClusterRecordDeserializer(result.body);
}

/** Get schema registry cluster by Id */
export async function getSchemaRegistryClusterById(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: OrganizationGetSchemaRegistryClusterByIdOptionalParams = {
    requestOptions: {},
  },
): Promise<SchemaRegistryClusterRecord> {
  const result = await _getSchemaRegistryClusterByIdSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    options,
  );
  return _getSchemaRegistryClusterByIdDeserialize(result);
}

export function _listSchemaRegistryClustersSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: OrganizationListSchemaRegistryClustersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/schemaRegistryClusters{?api%2Dversion,pageSize,pageToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      "api%2Dversion": context.apiVersion,
      pageSize: options?.pageSize,
      pageToken: options?.pageToken,
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

export async function _listSchemaRegistryClustersDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListSchemaRegistryClustersResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _listSchemaRegistryClustersResponseDeserializer(result.body);
}

/** Get schema registry clusters */
export function listSchemaRegistryClusters(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: OrganizationListSchemaRegistryClustersOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SchemaRegistryClusterRecord> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSchemaRegistryClustersSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        options,
      ),
    _listSchemaRegistryClustersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listEnvironmentsSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationListEnvironmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments{?api%2Dversion,pageSize,pageToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
      pageSize: options?.pageSize,
      pageToken: options?.pageToken,
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

export async function _listEnvironmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GetEnvironmentsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _getEnvironmentsResponseDeserializer(result.body);
}

/** Lists of all the environments in a organization */
export function listEnvironments(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationListEnvironmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SCEnvironmentRecord> {
  return buildPagedAsyncIterator(
    context,
    () => _listEnvironmentsSend(context, resourceGroupName, organizationName, options),
    _listEnvironmentsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getEnvironmentByIdSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: OrganizationGetEnvironmentByIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
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

export async function _getEnvironmentByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<SCEnvironmentRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return scEnvironmentRecordDeserializer(result.body);
}

/** Get Environment details by environment Id */
export async function getEnvironmentById(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  options: OrganizationGetEnvironmentByIdOptionalParams = {
    requestOptions: {},
  },
): Promise<SCEnvironmentRecord> {
  const result = await _getEnvironmentByIdSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    options,
  );
  return _getEnvironmentByIdDeserialize(result);
}

export function _listRegionsSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: OrganizationListRegionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/listRegions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: listAccessRequestModelSerializer(body),
  });
}

export async function _listRegionsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListRegionsSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return listRegionsSuccessResponseDeserializer(result.body);
}

/** cloud provider regions available for creating Schema Registry clusters. */
export async function listRegions(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  body: ListAccessRequestModel,
  options: OrganizationListRegionsOptionalParams = { requestOptions: {} },
): Promise<ListRegionsSuccessResponse> {
  const result = await _listRegionsSend(
    context,
    resourceGroupName,
    organizationName,
    body,
    options,
  );
  return _listRegionsDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: OrganizationListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Confluent/organizations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_OrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _organizationResourceListResultDeserializer(result.body);
}

/** List all organizations under the specified subscription. */
export function listBySubscription(
  context: Client,
  options: OrganizationListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: OrganizationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_OrganizationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _organizationResourceListResultDeserializer(result.body);
}

/** List all Organizations under the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: OrganizationListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OrganizationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
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
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete Organization resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, organizationName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
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
    body: !options["body"]
      ? options["body"]
      : organizationResourceUpdateSerializer(options["body"]),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Update Organization resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationUpdateOptionalParams = { requestOptions: {} },
): Promise<OrganizationResource> {
  const result = await _updateSend(context, resourceGroupName, organizationName, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
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
    body: !options["body"] ? options["body"] : organizationResourceSerializer(options["body"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Create Organization resource */
export function create(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OrganizationResource>, OrganizationResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceGroupName, organizationName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<OrganizationResource>, OrganizationResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<OrganizationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return organizationResourceDeserializer(result.body);
}

/** Get the properties of a specific Organization resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  options: OrganizationGetOptionalParams = { requestOptions: {} },
): Promise<OrganizationResource> {
  const result = await _getSend(context, resourceGroupName, organizationName, options);
  return _getDeserialize(result);
}

export function _deleteClusterAPIKeySend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  apiKeyId: string,
  options: OrganizationDeleteClusterAPIKeyOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/apiKeys/{apiKeyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      apiKeyId: apiKeyId,
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

export async function _deleteClusterAPIKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes API key of a kafka or schema registry cluster */
export async function deleteClusterAPIKey(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  apiKeyId: string,
  options: OrganizationDeleteClusterAPIKeyOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteClusterAPIKeySend(
    context,
    resourceGroupName,
    organizationName,
    apiKeyId,
    options,
  );
  return _deleteClusterAPIKeyDeserialize(result);
}

export function _getClusterAPIKeySend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  apiKeyId: string,
  options: OrganizationGetClusterAPIKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/apiKeys/{apiKeyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      apiKeyId: apiKeyId,
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

export async function _getClusterAPIKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<APIKeyRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return apiKeyRecordDeserializer(result.body);
}

/** Get API key details of a kafka or schema registry cluster */
export async function getClusterAPIKey(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  apiKeyId: string,
  options: OrganizationGetClusterAPIKeyOptionalParams = { requestOptions: {} },
): Promise<APIKeyRecord> {
  const result = await _getClusterAPIKeySend(
    context,
    resourceGroupName,
    organizationName,
    apiKeyId,
    options,
  );
  return _getClusterAPIKeyDeserialize(result);
}
