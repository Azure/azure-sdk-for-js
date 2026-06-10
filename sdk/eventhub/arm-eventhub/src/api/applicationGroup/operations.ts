// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext as Client } from "../index.js";
import type { ApplicationGroup, _ApplicationGroupListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  applicationGroupSerializer,
  applicationGroupDeserializer,
  _applicationGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApplicationGroupListByNamespaceOptionalParams,
  ApplicationGroupDeleteOptionalParams,
  ApplicationGroupCreateOrUpdateApplicationGroupOptionalParams,
  ApplicationGroupGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByNamespaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: ApplicationGroupListByNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _listByNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _applicationGroupListResultDeserializer(result.body);
}

/** Gets a list of application groups for a Namespace. */
export function listByNamespace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: ApplicationGroupListByNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNamespaceSend(context, resourceGroupName, namespaceName, options),
    _listByNamespaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  applicationGroupName: string,
  options: ApplicationGroupDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups/{applicationGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      applicationGroupName: applicationGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

/** Deletes an ApplicationGroup for a Namespace. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  applicationGroupName: string,
  options: ApplicationGroupDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    namespaceName,
    applicationGroupName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateApplicationGroupSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  applicationGroupName: string,
  parameters: ApplicationGroup,
  options: ApplicationGroupCreateOrUpdateApplicationGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups/{applicationGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      applicationGroupName: applicationGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationGroupSerializer(parameters),
  });
}

export async function _createOrUpdateApplicationGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return applicationGroupDeserializer(result.body);
}

/** Creates or updates an ApplicationGroup for a Namespace. */
export async function createOrUpdateApplicationGroup(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  applicationGroupName: string,
  parameters: ApplicationGroup,
  options: ApplicationGroupCreateOrUpdateApplicationGroupOptionalParams = { requestOptions: {} },
): Promise<ApplicationGroup> {
  const result = await _createOrUpdateApplicationGroupSend(
    context,
    resourceGroupName,
    namespaceName,
    applicationGroupName,
    parameters,
    options,
  );
  return _createOrUpdateApplicationGroupDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  applicationGroupName: string,
  options: ApplicationGroupGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups/{applicationGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      applicationGroupName: applicationGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ApplicationGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return applicationGroupDeserializer(result.body);
}

/** Gets an ApplicationGroup for a Namespace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  applicationGroupName: string,
  options: ApplicationGroupGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    applicationGroupName,
    options,
  );
  return _getDeserialize(result);
}
