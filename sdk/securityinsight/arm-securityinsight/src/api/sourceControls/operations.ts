// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type {
  SourceControl,
  _SourceControlList,
  RepositoryAccessProperties,
  Warning,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  sourceControlSerializer,
  sourceControlDeserializer,
  _sourceControlListDeserializer,
  repositoryAccessPropertiesSerializer,
  warningDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SourceControlsDeleteOptionalParams,
  SourceControlsListOptionalParams,
  SourceControlsCreateOptionalParams,
  SourceControlsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sourceControlId: string,
  repositoryAccess: RepositoryAccessProperties,
  options: SourceControlsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols/{sourceControlId}/delete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      sourceControlId: sourceControlId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: repositoryAccessPropertiesSerializer(repositoryAccess),
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<Warning> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return warningDeserializer(result.body);
}

/** Delete a source control. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sourceControlId: string,
  repositoryAccess: RepositoryAccessProperties,
  options: SourceControlsDeleteOptionalParams = { requestOptions: {} },
): Promise<Warning> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    sourceControlId,
    repositoryAccess,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SourceControlsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_SourceControlList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _sourceControlListDeserializer(result.body);
}

/** Gets all source controls, without source control items. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SourceControlsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SourceControl> {
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

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sourceControlId: string,
  sourceControl: SourceControl,
  options: SourceControlsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols/{sourceControlId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      sourceControlId: sourceControlId,
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
    body: sourceControlSerializer(sourceControl),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SourceControl> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sourceControlDeserializer(result.body);
}

/** Creates a source control. */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sourceControlId: string,
  sourceControl: SourceControl,
  options: SourceControlsCreateOptionalParams = { requestOptions: {} },
): Promise<SourceControl> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    sourceControlId,
    sourceControl,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sourceControlId: string,
  options: SourceControlsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/sourcecontrols/{sourceControlId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      sourceControlId: sourceControlId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SourceControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sourceControlDeserializer(result.body);
}

/** Gets a source control byt its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sourceControlId: string,
  options: SourceControlsGetOptionalParams = { requestOptions: {} },
): Promise<SourceControl> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    sourceControlId,
    options,
  );
  return _getDeserialize(result);
}
