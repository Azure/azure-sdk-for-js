// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  ResourceGroup,
  resourceGroupSerializer,
  resourceGroupDeserializer,
  ResourceGroupPatchable,
  resourceGroupPatchableSerializer,
  _ResourceGroupListResult,
  _resourceGroupListResultDeserializer,
  ExportTemplateRequest,
  exportTemplateRequestSerializer,
  ResourceGroupExportResult,
  resourceGroupExportResultDeserializer,
  ResourceGroupsCheckExistenceResponse,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ResourceGroupsExportTemplateOptionalParams,
  ResourceGroupsListOptionalParams,
  ResourceGroupsDeleteOptionalParams,
  ResourceGroupsUpdateOptionalParams,
  ResourceGroupsCreateOrUpdateOptionalParams,
  ResourceGroupsCheckExistenceOptionalParams,
  ResourceGroupsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _exportTemplateSend(
  context: Client,
  resourceGroupName: string,
  parameters: ExportTemplateRequest,
  options: ResourceGroupsExportTemplateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/exportTemplate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: exportTemplateRequestSerializer(parameters),
  });
}

export async function _exportTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGroupExportResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return resourceGroupExportResultDeserializer(result.body);
}

/** Captures the specified resource group as a template. */
export function exportTemplate(
  context: Client,
  resourceGroupName: string,
  parameters: ExportTemplateRequest,
  options: ResourceGroupsExportTemplateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceGroupExportResult>, ResourceGroupExportResult> {
  return getLongRunningPoller(context, _exportTemplateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _exportTemplateSend(context, resourceGroupName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<ResourceGroupExportResult>, ResourceGroupExportResult>;
}

export function _listSend(
  context: Client,
  options: ResourceGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_ResourceGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _resourceGroupListResultDeserializer(result.body);
}

/** Gets all the resource groups for a subscription. */
export function list(
  context: Client,
  options: ResourceGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  options: ResourceGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}{?api%2Dversion,forceDeletionTypes}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      forceDeletionTypes: options?.forceDeletionTypes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  options: ResourceGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  parameters: ResourceGroupPatchable,
  options: ResourceGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceGroupPatchableSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ResourceGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return resourceGroupDeserializer(result.body);
}

/** Resource groups can be updated through a simple PATCH operation to a group address. The format of the request is the same as that for creating a resource group. If a field is unspecified, the current value is retained. */
export async function update(
  context: Client,
  resourceGroupName: string,
  parameters: ResourceGroupPatchable,
  options: ResourceGroupsUpdateOptionalParams = { requestOptions: {} },
): Promise<ResourceGroup> {
  const result = await _updateSend(context, resourceGroupName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  parameters: ResourceGroup,
  options: ResourceGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGroup> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return resourceGroupDeserializer(result.body);
}

/** Creates or updates a resource group. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  parameters: ResourceGroup,
  options: ResourceGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ResourceGroup> {
  const result = await _createOrUpdateSend(context, resourceGroupName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  options: ResourceGroupsCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceGroupsCheckExistenceResponse> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return { body: result.status.startsWith("2") };
}

/** Checks whether a resource group exists. */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  options: ResourceGroupsCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<ResourceGroupsCheckExistenceResponse> {
  const result = await _checkExistenceSend(context, resourceGroupName, options);
  return _checkExistenceDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  options: ResourceGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ResourceGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return resourceGroupDeserializer(result.body);
}

/** Gets a resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  options: ResourceGroupsGetOptionalParams = { requestOptions: {} },
): Promise<ResourceGroup> {
  const result = await _getSend(context, resourceGroupName, options);
  return _getDeserialize(result);
}
