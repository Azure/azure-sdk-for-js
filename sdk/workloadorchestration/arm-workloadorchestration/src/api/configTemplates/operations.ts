// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type {
  VersionParameter,
  RemoveVersionResponse,
  ConfigTemplate,
  ConfigTemplateUpdate,
  HierarchySelector,
  ConfigTemplateVersionWithUpdateType,
  ConfigTemplateVersion,
  _ConfigTemplateListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  versionParameterSerializer,
  removeVersionResponseDeserializer,
  configTemplateSerializer,
  configTemplateDeserializer,
  configTemplateUpdateSerializer,
  hierarchySelectorSerializer,
  configTemplateVersionWithUpdateTypeSerializer,
  configTemplateVersionDeserializer,
  _configTemplateListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigTemplatesListBySubscriptionOptionalParams,
  ConfigTemplatesListByResourceGroupOptionalParams,
  ConfigTemplatesDeleteOptionalParams,
  ConfigTemplatesRemoveVersionOptionalParams,
  ConfigTemplatesCreateVersionOptionalParams,
  ConfigTemplatesUnLinkFromHierarchiesOptionalParams,
  ConfigTemplatesLinkToHierarchiesOptionalParams,
  ConfigTemplatesUpdateOptionalParams,
  ConfigTemplatesCreateOrUpdateOptionalParams,
  ConfigTemplatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ConfigTemplatesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/configTemplates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<_ConfigTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _configTemplateListResultDeserializer(result.body);
}

/** List by subscription */
export function listBySubscription(
  context: Client,
  options: ConfigTemplatesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ConfigTemplatesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<_ConfigTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _configTemplateListResultDeserializer(result.body);
}

/** List by specified resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ConfigTemplatesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

/** Delete a Config Template Resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplatesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, configTemplateName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _removeVersionSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: VersionParameter,
  options: ConfigTemplatesRemoveVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/removeVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: versionParameterSerializer(body),
  });
}

export async function _removeVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemoveVersionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return removeVersionResponseDeserializer(result.body);
}

/** Remove Config Template Version Resource */
export async function removeVersion(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: VersionParameter,
  options: ConfigTemplatesRemoveVersionOptionalParams = { requestOptions: {} },
): Promise<RemoveVersionResponse> {
  const result = await _removeVersionSend(
    context,
    resourceGroupName,
    configTemplateName,
    body,
    options,
  );
  return _removeVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: ConfigTemplateVersionWithUpdateType,
  options: ConfigTemplatesCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/createVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configTemplateVersionWithUpdateTypeSerializer(body),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigTemplateVersion> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateVersionDeserializer(result.body);
}

/** Create or update a Config Template Version Resource with the specified UpdateType */
export function createVersion(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: ConfigTemplateVersionWithUpdateType,
  options: ConfigTemplatesCreateVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConfigTemplateVersion>, ConfigTemplateVersion> {
  return getLongRunningPoller(context, _createVersionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createVersionSend(context, resourceGroupName, configTemplateName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<ConfigTemplateVersion>, ConfigTemplateVersion>;
}

export function _unLinkFromHierarchiesSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: HierarchySelector,
  options: ConfigTemplatesUnLinkFromHierarchiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/unLinkFromHierarchies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: hierarchySelectorSerializer(body),
  });
}

export async function _unLinkFromHierarchiesDeserialize(
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

/** Remove a Config Template from a particular hierarchy node */
export function unLinkFromHierarchies(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: HierarchySelector,
  options: ConfigTemplatesUnLinkFromHierarchiesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _unLinkFromHierarchiesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unLinkFromHierarchiesSend(context, resourceGroupName, configTemplateName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _linkToHierarchiesSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: HierarchySelector,
  options: ConfigTemplatesLinkToHierarchiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/linkToHierarchies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: hierarchySelectorSerializer(body),
  });
}

export async function _linkToHierarchiesDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Apply a Config Template to a particular hierarchy node */
export function linkToHierarchies(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  body: HierarchySelector,
  options: ConfigTemplatesLinkToHierarchiesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _linkToHierarchiesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkToHierarchiesSend(context, resourceGroupName, configTemplateName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  properties: ConfigTemplateUpdate,
  options: ConfigTemplatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configTemplateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ConfigTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateDeserializer(result.body);
}

/** update a Config Template Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  properties: ConfigTemplateUpdate,
  options: ConfigTemplatesUpdateOptionalParams = { requestOptions: {} },
): Promise<ConfigTemplate> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    configTemplateName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  resource: ConfigTemplate,
  options: ConfigTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configTemplateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigTemplate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateDeserializer(result.body);
}

/** Create or update a Config Template Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  resource: ConfigTemplate,
  options: ConfigTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConfigTemplate>, ConfigTemplate> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, configTemplateName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<ConfigTemplate>, ConfigTemplate>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConfigTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateDeserializer(result.body);
}

/** Get a Config Template Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplatesGetOptionalParams = { requestOptions: {} },
): Promise<ConfigTemplate> {
  const result = await _getSend(context, resourceGroupName, configTemplateName, options);
  return _getDeserialize(result);
}
