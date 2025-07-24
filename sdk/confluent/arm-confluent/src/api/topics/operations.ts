// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext as Client } from "../index.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  errorResponseDeserializer,
  TopicRecord,
  topicRecordSerializer,
  topicRecordDeserializer,
  _ListTopicsSuccessResponse,
  _listTopicsSuccessResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TopicsListOptionalParams,
  TopicsDeleteOptionalParams,
  TopicsCreateOptionalParams,
  TopicsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: TopicsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics{?api%2Dversion,pageSize,pageToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListTopicsSuccessResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _listTopicsSuccessResponseDeserializer(result.body);
}

/** Lists of all the topics in a clusters */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: TopicsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TopicRecord> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, resourceGroupName, organizationName, environmentId, clusterId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  topicName: string,
  options: TopicsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      topicName: topicName,
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
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete confluent topic by name */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  topicName: string,
  options: TopicsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        clusterId,
        topicName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  topicName: string,
  options: TopicsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      topicName: topicName,
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
    body: !options["body"] ? options["body"] : topicRecordSerializer(options["body"]),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<TopicRecord> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return topicRecordDeserializer(result.body);
}

/** Create confluent topics by Name */
export async function create(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  topicName: string,
  options: TopicsCreateOptionalParams = { requestOptions: {} },
): Promise<TopicRecord> {
  const result = await _createSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    topicName,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  topicName: string,
  options: TopicsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}/topics/{topicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      topicName: topicName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TopicRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return topicRecordDeserializer(result.body);
}

/** Get confluent topic by Name */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  topicName: string,
  options: TopicsGetOptionalParams = { requestOptions: {} },
): Promise<TopicRecord> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    topicName,
    options,
  );
  return _getDeserialize(result);
}
