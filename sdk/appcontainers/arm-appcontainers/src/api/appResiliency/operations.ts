// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  AppResiliency,
  appResiliencySerializer,
  appResiliencyDeserializer,
  _AppResiliencyCollection,
  _appResiliencyCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AppResiliencyListOptionalParams,
  AppResiliencyDeleteOptionalParams,
  AppResiliencyUpdateOptionalParams,
  AppResiliencyCreateOrUpdateOptionalParams,
  AppResiliencyGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  appName: string,
  options: AppResiliencyListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{appName}/resiliencyPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appName: appName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AppResiliencyCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _appResiliencyCollectionDeserializer(result.body);
}

/** List container app resiliency policies. */
export function list(
  context: Client,
  resourceGroupName: string,
  appName: string,
  options: AppResiliencyListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppResiliency> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, appName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  options: AppResiliencyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{appName}/resiliencyPolicies/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appName: appName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete container app resiliency policy. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  options: AppResiliencyDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, appName, name, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  resiliencyEnvelope: AppResiliency,
  options: AppResiliencyUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{appName}/resiliencyPolicies/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appName: appName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: appResiliencySerializer(resiliencyEnvelope),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AppResiliency> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return appResiliencyDeserializer(result.body);
}

/** Update container app resiliency policy. */
export async function update(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  resiliencyEnvelope: AppResiliency,
  options: AppResiliencyUpdateOptionalParams = { requestOptions: {} },
): Promise<AppResiliency> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    appName,
    name,
    resiliencyEnvelope,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  resiliencyEnvelope: AppResiliency,
  options: AppResiliencyCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{appName}/resiliencyPolicies/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appName: appName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: appResiliencySerializer(resiliencyEnvelope),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppResiliency> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return appResiliencyDeserializer(result.body);
}

/** Create or update container app resiliency policy. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  resiliencyEnvelope: AppResiliency,
  options: AppResiliencyCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AppResiliency> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    appName,
    name,
    resiliencyEnvelope,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  options: AppResiliencyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{appName}/resiliencyPolicies/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appName: appName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AppResiliency> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return appResiliencyDeserializer(result.body);
}

/** Get container app resiliency policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  appName: string,
  name: string,
  options: AppResiliencyGetOptionalParams = { requestOptions: {} },
): Promise<AppResiliency> {
  const result = await _getSend(context, resourceGroupName, appName, name, options);
  return _getDeserialize(result);
}
