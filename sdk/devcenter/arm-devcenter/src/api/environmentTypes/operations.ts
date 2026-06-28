// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  EnvironmentType,
  EnvironmentTypeUpdate,
  _EnvironmentTypeListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  environmentTypeSerializer,
  environmentTypeDeserializer,
  environmentTypeUpdateSerializer,
  _environmentTypeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EnvironmentTypesListByDevCenterOptionalParams,
  EnvironmentTypesDeleteOptionalParams,
  EnvironmentTypesUpdateOptionalParams,
  EnvironmentTypesCreateOrUpdateOptionalParams,
  EnvironmentTypesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDevCenterSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: EnvironmentTypesListByDevCenterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/environmentTypes{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listByDevCenterDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnvironmentTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _environmentTypeListResultDeserializer(result.body);
}

/** Lists environment types for the devcenter. */
export function listByDevCenter(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: EnvironmentTypesListByDevCenterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnvironmentType> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDevCenterSend(context, resourceGroupName, devCenterName, options),
    _listByDevCenterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  options: EnvironmentTypesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an environment type. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  options: EnvironmentTypesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    devCenterName,
    environmentTypeName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  body: EnvironmentTypeUpdate,
  options: EnvironmentTypesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: environmentTypeUpdateSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<EnvironmentType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return environmentTypeDeserializer(result.body);
}

/** Partially updates an environment type. */
export async function update(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  body: EnvironmentTypeUpdate,
  options: EnvironmentTypesUpdateOptionalParams = { requestOptions: {} },
): Promise<EnvironmentType> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    devCenterName,
    environmentTypeName,
    body,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  body: EnvironmentType,
  options: EnvironmentTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: environmentTypeSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnvironmentType> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return environmentTypeDeserializer(result.body);
}

/** Creates or updates an environment type. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  body: EnvironmentType,
  options: EnvironmentTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<EnvironmentType> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    devCenterName,
    environmentTypeName,
    body,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  options: EnvironmentTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/environmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EnvironmentType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return environmentTypeDeserializer(result.body);
}

/** Gets an environment type. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  environmentTypeName: string,
  options: EnvironmentTypesGetOptionalParams = { requestOptions: {} },
): Promise<EnvironmentType> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    environmentTypeName,
    options,
  );
  return _getDeserialize(result);
}
