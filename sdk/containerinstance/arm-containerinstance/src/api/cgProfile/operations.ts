// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext as Client } from "../index.js";
import type {
  ContainerGroupProfile,
  _ContainerGroupProfileListResult,
  ContainerGroupProfilePatch,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  errorResponseDeserializer,
  containerGroupProfileSerializer,
  containerGroupProfileDeserializer,
  _containerGroupProfileListResultDeserializer,
  containerGroupProfilePatchSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CGProfileDeleteOptionalParams,
  CGProfileUpdateOptionalParams,
  CGProfileCreateOrUpdateOptionalParams,
  CGProfileGetOptionalParams,
  CGProfileListAllRevisionsOptionalParams,
  CGProfileGetByRevisionNumberOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  options: CGProfileDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupProfileName: containerGroupProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

/** Deletes a container group profile. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  options: CGProfileDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, containerGroupProfileName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  properties: ContainerGroupProfilePatch,
  options: CGProfileUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupProfileName: containerGroupProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: containerGroupProfilePatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerGroupProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupProfileDeserializer(result.body);
}

/** Update a specified container group profile. */
export async function update(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  properties: ContainerGroupProfilePatch,
  options: CGProfileUpdateOptionalParams = { requestOptions: {} },
): Promise<ContainerGroupProfile> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    containerGroupProfileName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  containerGroupProfile: ContainerGroupProfile,
  options: CGProfileCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupProfileName: containerGroupProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: containerGroupProfileSerializer(containerGroupProfile),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerGroupProfile> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupProfileDeserializer(result.body);
}

/** Create a CGProfile if it doesn't exist or update an existing CGProfile. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  containerGroupProfile: ContainerGroupProfile,
  options: CGProfileCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ContainerGroupProfile> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    containerGroupProfileName,
    containerGroupProfile,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  options: CGProfileGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupProfileName: containerGroupProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerGroupProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupProfileDeserializer(result.body);
}

/** Get the properties of the specified container group profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  options: CGProfileGetOptionalParams = { requestOptions: {} },
): Promise<ContainerGroupProfile> {
  const result = await _getSend(context, resourceGroupName, containerGroupProfileName, options);
  return _getDeserialize(result);
}

export function _listAllRevisionsSend(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  options: CGProfileListAllRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}/revisions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupProfileName: containerGroupProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

export async function _listAllRevisionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerGroupProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _containerGroupProfileListResultDeserializer(result.body);
}

/** Get a list of all the revisions of the specified container group profile in the given subscription and resource group. This operation returns properties of each revision of the specified container group profile including containers, image registry credentials, restart policy, IP address type, OS type volumes, revision number, etc. */
export function listAllRevisions(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  options: CGProfileListAllRevisionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerGroupProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllRevisionsSend(context, resourceGroupName, containerGroupProfileName, options),
    _listAllRevisionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-01-preview",
    },
  );
}

export function _getByRevisionNumberSend(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  revisionNumber: string,
  options: CGProfileGetByRevisionNumberOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroupProfiles/{containerGroupProfileName}/revisions/{revisionNumber}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupProfileName: containerGroupProfileName,
      revisionNumber: revisionNumber,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

export async function _getByRevisionNumberDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerGroupProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupProfileDeserializer(result.body);
}

/** Gets the properties of the specified revision of the container group profile in the given subscription and resource group. The operation returns the properties of container group profile including containers, image registry credentials, restart policy, IP address type, OS type, volumes, current revision number, etc. */
export async function getByRevisionNumber(
  context: Client,
  resourceGroupName: string,
  containerGroupProfileName: string,
  revisionNumber: string,
  options: CGProfileGetByRevisionNumberOptionalParams = { requestOptions: {} },
): Promise<ContainerGroupProfile> {
  const result = await _getByRevisionNumberSend(
    context,
    resourceGroupName,
    containerGroupProfileName,
    revisionNumber,
    options,
  );
  return _getByRevisionNumberDeserialize(result);
}
