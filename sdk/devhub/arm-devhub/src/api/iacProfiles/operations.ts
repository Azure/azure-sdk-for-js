// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  IacProfile,
  iacProfileSerializer,
  iacProfileDeserializer,
  TagsObject,
  tagsObjectSerializer,
  _IacProfileListResult,
  _iacProfileListResultDeserializer,
  ExportTemplateRequest,
  exportTemplateRequestSerializer,
  PrLinkResponse,
  prLinkResponseDeserializer,
  ScaleTemplateRequest,
  scaleTemplateRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IacProfilesSyncOptionalParams,
  IacProfilesScaleOptionalParams,
  IacProfilesExportOptionalParams,
  IacProfilesListOptionalParams,
  IacProfilesListByResourceGroupOptionalParams,
  IacProfilesDeleteOptionalParams,
  IacProfilesUpdateTagsOptionalParams,
  IacProfilesCreateOrUpdateOptionalParams,
  IacProfilesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _syncSend(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  options: IacProfilesSyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles/{iacProfileName}/sync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iacProfileName: iacProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _syncDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Sync template */
export async function sync(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  options: IacProfilesSyncOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _syncSend(context, resourceGroupName, iacProfileName, options);
  return _syncDeserialize(result);
}

export function _scaleSend(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: ScaleTemplateRequest,
  options: IacProfilesScaleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles/{iacProfileName}/scale{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iacProfileName: iacProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scaleTemplateRequestSerializer(parameters),
  });
}

export async function _scaleDeserialize(result: PathUncheckedResponse): Promise<PrLinkResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return prLinkResponseDeserializer(result.body);
}

/** Scale by template */
export async function scale(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: ScaleTemplateRequest,
  options: IacProfilesScaleOptionalParams = { requestOptions: {} },
): Promise<PrLinkResponse> {
  const result = await _scaleSend(context, resourceGroupName, iacProfileName, parameters, options);
  return _scaleDeserialize(result);
}

export function _$exportSend(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: ExportTemplateRequest,
  options: IacProfilesExportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles/{iacProfileName}/export{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iacProfileName: iacProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _$exportDeserialize(result: PathUncheckedResponse): Promise<PrLinkResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return prLinkResponseDeserializer(result.body);
}

/** Export a template */
export async function $export(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: ExportTemplateRequest,
  options: IacProfilesExportOptionalParams = { requestOptions: {} },
): Promise<PrLinkResponse> {
  const result = await _$exportSend(
    context,
    resourceGroupName,
    iacProfileName,
    parameters,
    options,
  );
  return _$exportDeserialize(result);
}

export function _listSend(
  context: Client,
  options: IacProfilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/iacProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<_IacProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _iacProfileListResultDeserializer(result.body);
}

/** Gets a list of IacProfiles associated with the specified subscription. */
export function list(
  context: Client,
  options: IacProfilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IacProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: IacProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<_IacProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _iacProfileListResultDeserializer(result.body);
}

/** Gets a list of iacProfiles within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: IacProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IacProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  options: IacProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles/{iacProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iacProfileName: iacProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a IacProfile */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  options: IacProfilesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, iacProfileName, options);
  return _$deleteDeserialize(result);
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: TagsObject,
  options: IacProfilesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles/{iacProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iacProfileName: iacProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(result: PathUncheckedResponse): Promise<IacProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return iacProfileDeserializer(result.body);
}

/** Updates tags on a IacProfile. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: TagsObject,
  options: IacProfilesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<IacProfile> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    iacProfileName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: IacProfile,
  options: IacProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles/{iacProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iacProfileName: iacProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: iacProfileSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IacProfile> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return iacProfileDeserializer(result.body);
}

/** Creates or updates a IacProfile */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  parameters: IacProfile,
  options: IacProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<IacProfile> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    iacProfileName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  options: IacProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevHub/iacProfiles/{iacProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iacProfileName: iacProfileName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IacProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return iacProfileDeserializer(result.body);
}

/** Gets a IacProfile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  iacProfileName: string,
  options: IacProfilesGetOptionalParams = { requestOptions: {} },
): Promise<IacProfile> {
  const result = await _getSend(context, resourceGroupName, iacProfileName, options);
  return _getDeserialize(result);
}
