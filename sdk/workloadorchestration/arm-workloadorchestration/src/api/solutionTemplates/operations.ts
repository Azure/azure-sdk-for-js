// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  VersionParameter,
  versionParameterSerializer,
  SolutionTemplateVersion,
  solutionTemplateVersionDeserializer,
  SolutionTemplate,
  solutionTemplateSerializer,
  solutionTemplateDeserializer,
  SolutionTemplateUpdate,
  solutionTemplateUpdateSerializer,
  SolutionTemplateVersionWithUpdateType,
  solutionTemplateVersionWithUpdateTypeSerializer,
  _SolutionTemplateListResult,
  _solutionTemplateListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SolutionTemplatesListBySubscriptionOptionalParams,
  SolutionTemplatesListByResourceGroupOptionalParams,
  SolutionTemplatesDeleteOptionalParams,
  SolutionTemplatesRemoveVersionOptionalParams,
  SolutionTemplatesCreateVersionOptionalParams,
  SolutionTemplatesUpdateOptionalParams,
  SolutionTemplatesCreateOrUpdateOptionalParams,
  SolutionTemplatesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: SolutionTemplatesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/solutionTemplates{?api%2Dversion}",
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
): Promise<_SolutionTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _solutionTemplateListResultDeserializer(result.body);
}

/** List by subscription */
export function listBySubscription(
  context: Client,
  options: SolutionTemplatesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SolutionTemplate> {
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
  options: SolutionTemplatesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates{?api%2Dversion}",
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
): Promise<_SolutionTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _solutionTemplateListResultDeserializer(result.body);
}

/** List by specified resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SolutionTemplatesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SolutionTemplate> {
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
  solutionTemplateName: string,
  options: SolutionTemplatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      "api%2Dversion": context.apiVersion,
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

/** Delete a Solution Template Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  options: SolutionTemplatesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, solutionTemplateName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _removeVersionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  body: VersionParameter,
  options: SolutionTemplatesRemoveVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/removeVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: versionParameterSerializer(body),
  });
}

export async function _removeVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Remove Solution Template Version Resource */
export function removeVersion(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  body: VersionParameter,
  options: SolutionTemplatesRemoveVersionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _removeVersionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _removeVersionSend(context, resourceGroupName, solutionTemplateName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createVersionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  body: SolutionTemplateVersionWithUpdateType,
  options: SolutionTemplatesCreateVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/createVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
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
    body: solutionTemplateVersionWithUpdateTypeSerializer(body),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionTemplateVersion> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionTemplateVersionDeserializer(result.body);
}

/** Create a Solution Template Version Resource */
export function createVersion(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  body: SolutionTemplateVersionWithUpdateType,
  options: SolutionTemplatesCreateVersionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SolutionTemplateVersion>, SolutionTemplateVersion> {
  return getLongRunningPoller(context, _createVersionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createVersionSend(context, resourceGroupName, solutionTemplateName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SolutionTemplateVersion>, SolutionTemplateVersion>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  properties: SolutionTemplateUpdate,
  options: SolutionTemplatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
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
    body: solutionTemplateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SolutionTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionTemplateDeserializer(result.body);
}

/** update a Solution Template Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  properties: SolutionTemplateUpdate,
  options: SolutionTemplatesUpdateOptionalParams = { requestOptions: {} },
): Promise<SolutionTemplate> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    solutionTemplateName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  resource: SolutionTemplate,
  options: SolutionTemplatesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
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
    body: solutionTemplateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionTemplate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionTemplateDeserializer(result.body);
}

/** Create or update a Solution Template Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  resource: SolutionTemplate,
  options: SolutionTemplatesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SolutionTemplate>, SolutionTemplate> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, solutionTemplateName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SolutionTemplate>, SolutionTemplate>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  options: SolutionTemplatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SolutionTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionTemplateDeserializer(result.body);
}

/** Get a Solution Template Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  options: SolutionTemplatesGetOptionalParams = { requestOptions: {} },
): Promise<SolutionTemplate> {
  const result = await _getSend(context, resourceGroupName, solutionTemplateName, options);
  return _getDeserialize(result);
}
