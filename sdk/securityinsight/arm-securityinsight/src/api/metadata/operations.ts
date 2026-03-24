// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { MetadataModel, MetadataPatch, _MetadataList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  metadataModelSerializer,
  metadataModelDeserializer,
  metadataPatchSerializer,
  _metadataListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetadataListOptionalParams,
  MetadataDeleteOptionalParams,
  MetadataUpdateOptionalParams,
  MetadataCreateOptionalParams,
  MetadataGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: MetadataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata{?api%2Dversion,%24filter,%24orderby,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_MetadataList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _metadataListDeserializer(result.body);
}

/** List of all metadata */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: MetadataListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetadataModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  options: MetadataDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      metadataName: metadataName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Metadata. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  options: MetadataDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    metadataName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  metadataPatch: MetadataPatch,
  options: MetadataUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      metadataName: metadataName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: metadataPatchSerializer(metadataPatch),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MetadataModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return metadataModelDeserializer(result.body);
}

/** Update an existing Metadata. */
export async function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  metadataPatch: MetadataPatch,
  options: MetadataUpdateOptionalParams = { requestOptions: {} },
): Promise<MetadataModel> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    workspaceName,
    metadataName,
    metadataPatch,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  metadata: MetadataModel,
  options: MetadataCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      metadataName: metadataName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: metadataModelSerializer(metadata),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<MetadataModel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return metadataModelDeserializer(result.body);
}

/** Create a Metadata. */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  metadata: MetadataModel,
  options: MetadataCreateOptionalParams = { requestOptions: {} },
): Promise<MetadataModel> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    metadataName,
    metadata,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  options: MetadataGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/metadata/{metadataName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      metadataName: metadataName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MetadataModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return metadataModelDeserializer(result.body);
}

/** Get a Metadata. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  metadataName: string,
  options: MetadataGetOptionalParams = { requestOptions: {} },
): Promise<MetadataModel> {
  const result = await _getSend(context, resourceGroupName, workspaceName, metadataName, options);
  return _getDeserialize(result);
}
