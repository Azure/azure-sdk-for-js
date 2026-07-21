// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  TagsResource,
  tagsResourceSerializer,
  tagsResourceDeserializer,
  TagsPatchResource,
  tagsPatchResourceSerializer,
  TagValue,
  tagValueDeserializer,
  TagDetails,
  tagDetailsDeserializer,
  _TagsListResult,
  _tagsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TagsOperationsListOptionalParams,
  TagsOperationsDeleteOptionalParams,
  TagsOperationsCreateOrUpdateOptionalParams,
  TagsOperationsCreateOrUpdateValueOptionalParams,
  TagsOperationsDeleteValueOptionalParams,
  TagsOperationsDeleteAtScopeOptionalParams,
  TagsOperationsUpdateAtScopeOptionalParams,
  TagsOperationsCreateOrUpdateAtScopeOptionalParams,
  TagsOperationsGetAtScopeOptionalParams,
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
  options: TagsOperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/tagNames{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_TagsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _tagsListResultDeserializer(result.body);
}

/** This operation performs a union of predefined tags, resource tags, resource group tags and subscription tags, and returns a summary of usage for each tag name and value under the given subscription. In case of a large number of tags, this operation may return a previously cached result. */
export function list(
  context: Client,
  options: TagsOperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagDetails> {
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
  tagName: string,
  options: TagsOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/tagNames/{tagName}{?api%2Dversion}",
    {
      tagName: tagName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This operation allows deleting a name from the list of predefined tag names for the given subscription. The name being deleted must not be in use as a tag name for any resource. All predefined values for the given name must have already been deleted. */
export async function $delete(
  context: Client,
  tagName: string,
  options: TagsOperationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, tagName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  tagName: string,
  options: TagsOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/tagNames/{tagName}{?api%2Dversion}",
    {
      tagName: tagName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TagDetails> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return tagDetailsDeserializer(result.body);
}

/** This operation allows adding a name to the list of predefined tag names for the given subscription. A tag name can have a maximum of 512 characters and is case-insensitive. Tag names cannot have the following prefixes which are reserved for Azure use: 'microsoft', 'azure', 'windows'. */
export async function createOrUpdate(
  context: Client,
  tagName: string,
  options: TagsOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<TagDetails> {
  const result = await _createOrUpdateSend(context, tagName, options);
  return _createOrUpdateDeserialize(result);
}

export function _createOrUpdateValueSend(
  context: Client,
  tagName: string,
  tagValue: string,
  options: TagsOperationsCreateOrUpdateValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/tagNames/{tagName}/tagValues/{tagValue}{?api%2Dversion}",
    {
      tagName: tagName,
      tagValue: tagValue,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createOrUpdateValueDeserialize(
  result: PathUncheckedResponse,
): Promise<TagValue> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return tagValueDeserializer(result.body);
}

/** This operation allows adding a value to the list of predefined values for an existing predefined tag name. A tag value can have a maximum of 256 characters. */
export async function createOrUpdateValue(
  context: Client,
  tagName: string,
  tagValue: string,
  options: TagsOperationsCreateOrUpdateValueOptionalParams = { requestOptions: {} },
): Promise<TagValue> {
  const result = await _createOrUpdateValueSend(context, tagName, tagValue, options);
  return _createOrUpdateValueDeserialize(result);
}

export function _deleteValueSend(
  context: Client,
  tagName: string,
  tagValue: string,
  options: TagsOperationsDeleteValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/tagNames/{tagName}/tagValues/{tagValue}{?api%2Dversion}",
    {
      tagName: tagName,
      tagValue: tagValue,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteValueDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This operation allows deleting a value from the list of predefined values for an existing predefined tag name. The value being deleted must not be in use as a tag value for the given tag name for any resource. */
export async function deleteValue(
  context: Client,
  tagName: string,
  tagValue: string,
  options: TagsOperationsDeleteValueOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteValueSend(context, tagName, tagValue, options);
  return _deleteValueDeserialize(result);
}

export function _deleteAtScopeSend(
  context: Client,
  scope: string,
  options: TagsOperationsDeleteAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/tags/default{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtScopeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the entire set of tags on a resource or subscription. */
export function deleteAtScope(
  context: Client,
  scope: string,
  options: TagsOperationsDeleteAtScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteAtScopeDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteAtScopeSend(context, scope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateAtScopeSend(
  context: Client,
  scope: string,
  parameters: TagsPatchResource,
  options: TagsOperationsUpdateAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/tags/default{?api%2Dversion}",
    {
      scope: scope,
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
    body: tagsPatchResourceSerializer(parameters),
  });
}

export async function _updateAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<TagsResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return tagsResourceDeserializer(result.body);
}

/** This operation allows replacing, merging or selectively deleting tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags at the end of the operation. The 'replace' option replaces the entire set of existing tags with a new set. The 'merge' option allows adding tags with new names and updating the values of tags with existing names. The 'delete' option allows selectively deleting tags based on given names or name/value pairs. */
export function updateAtScope(
  context: Client,
  scope: string,
  parameters: TagsPatchResource,
  options: TagsOperationsUpdateAtScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TagsResource>, TagsResource> {
  return getLongRunningPoller(context, _updateAtScopeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateAtScopeSend(context, scope, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<TagsResource>, TagsResource>;
}

export function _createOrUpdateAtScopeSend(
  context: Client,
  scope: string,
  parameters: TagsResource,
  options: TagsOperationsCreateOrUpdateAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/tags/default{?api%2Dversion}",
    {
      scope: scope,
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
    body: tagsResourceSerializer(parameters),
  });
}

export async function _createOrUpdateAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<TagsResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return tagsResourceDeserializer(result.body);
}

/** This operation allows adding or replacing the entire set of tags on the specified resource or subscription. The specified entity can have a maximum of 50 tags. */
export function createOrUpdateAtScope(
  context: Client,
  scope: string,
  parameters: TagsResource,
  options: TagsOperationsCreateOrUpdateAtScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TagsResource>, TagsResource> {
  return getLongRunningPoller(context, _createOrUpdateAtScopeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateAtScopeSend(context, scope, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<TagsResource>, TagsResource>;
}

export function _getAtScopeSend(
  context: Client,
  scope: string,
  options: TagsOperationsGetAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/tags/default{?api%2Dversion}",
    {
      scope: scope,
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

export async function _getAtScopeDeserialize(result: PathUncheckedResponse): Promise<TagsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return tagsResourceDeserializer(result.body);
}

/** Gets the entire set of tags on a resource or subscription. */
export async function getAtScope(
  context: Client,
  scope: string,
  options: TagsOperationsGetAtScopeOptionalParams = { requestOptions: {} },
): Promise<TagsResource> {
  const result = await _getAtScopeSend(context, scope, options);
  return _getAtScopeDeserialize(result);
}
