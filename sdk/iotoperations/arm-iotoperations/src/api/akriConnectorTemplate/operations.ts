// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTOperationsContext as Client } from "../index.js";
import type {
  AkriConnectorTemplateResource,
  _AkriConnectorTemplateResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  akriConnectorTemplateResourceSerializer,
  akriConnectorTemplateResourceDeserializer,
  _akriConnectorTemplateResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AkriConnectorTemplateListByInstanceResourceOptionalParams,
  AkriConnectorTemplateDeleteOptionalParams,
  AkriConnectorTemplateCreateOrUpdateOptionalParams,
  AkriConnectorTemplateGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByInstanceResourceSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  options: AkriConnectorTemplateListByInstanceResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/akriConnectorTemplates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
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

export async function _listByInstanceResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_AkriConnectorTemplateResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _akriConnectorTemplateResourceListResultDeserializer(result.body);
}

/** List AkriConnectorTemplateResource resources by InstanceResource */
export function listByInstanceResource(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  options: AkriConnectorTemplateListByInstanceResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AkriConnectorTemplateResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstanceResourceSend(context, resourceGroupName, instanceName, options),
    _listByInstanceResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  akriConnectorTemplateName: string,
  options: AkriConnectorTemplateDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/akriConnectorTemplates/{akriConnectorTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      akriConnectorTemplateName: akriConnectorTemplateName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a AkriConnectorTemplateResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  akriConnectorTemplateName: string,
  options: AkriConnectorTemplateDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, instanceName, akriConnectorTemplateName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  akriConnectorTemplateName: string,
  resource: AkriConnectorTemplateResource,
  options: AkriConnectorTemplateCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/akriConnectorTemplates/{akriConnectorTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      akriConnectorTemplateName: akriConnectorTemplateName,
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
    body: akriConnectorTemplateResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AkriConnectorTemplateResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return akriConnectorTemplateResourceDeserializer(result.body);
}

/** Create a AkriConnectorTemplateResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  akriConnectorTemplateName: string,
  resource: AkriConnectorTemplateResource,
  options: AkriConnectorTemplateCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AkriConnectorTemplateResource>, AkriConnectorTemplateResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        instanceName,
        akriConnectorTemplateName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<AkriConnectorTemplateResource>, AkriConnectorTemplateResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  akriConnectorTemplateName: string,
  options: AkriConnectorTemplateGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}/akriConnectorTemplates/{akriConnectorTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instanceName: instanceName,
      akriConnectorTemplateName: akriConnectorTemplateName,
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
): Promise<AkriConnectorTemplateResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return akriConnectorTemplateResourceDeserializer(result.body);
}

/** Get a AkriConnectorTemplateResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  instanceName: string,
  akriConnectorTemplateName: string,
  options: AkriConnectorTemplateGetOptionalParams = { requestOptions: {} },
): Promise<AkriConnectorTemplateResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    instanceName,
    akriConnectorTemplateName,
    options,
  );
  return _getDeserialize(result);
}
