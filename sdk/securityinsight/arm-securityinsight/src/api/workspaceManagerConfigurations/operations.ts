// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type {
  WorkspaceManagerConfiguration,
  _WorkspaceManagerConfigurationList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspaceManagerConfigurationSerializer,
  workspaceManagerConfigurationDeserializer,
  _workspaceManagerConfigurationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceManagerConfigurationsListOptionalParams,
  WorkspaceManagerConfigurationsDeleteOptionalParams,
  WorkspaceManagerConfigurationsCreateOrUpdateOptionalParams,
  WorkspaceManagerConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceManagerConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerConfigurations{?api%2Dversion,%24orderby,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_WorkspaceManagerConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _workspaceManagerConfigurationListDeserializer(result.body);
}

/** Gets all workspace manager configurations for a Sentinel workspace. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: WorkspaceManagerConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkspaceManagerConfiguration> {
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
  workspaceManagerConfigurationName: string,
  options: WorkspaceManagerConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerConfigurations/{workspaceManagerConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerConfigurationName: workspaceManagerConfigurationName,
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a workspace manager configuration */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerConfigurationName: string,
  options: WorkspaceManagerConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerConfigurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerConfigurationName: string,
  workspaceManagerConfiguration: WorkspaceManagerConfiguration,
  options: WorkspaceManagerConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerConfigurations/{workspaceManagerConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerConfigurationName: workspaceManagerConfigurationName,
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
    body: workspaceManagerConfigurationSerializer(workspaceManagerConfiguration),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceManagerConfiguration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceManagerConfigurationDeserializer(result.body);
}

/** Creates or updates a workspace manager configuration. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerConfigurationName: string,
  workspaceManagerConfiguration: WorkspaceManagerConfiguration,
  options: WorkspaceManagerConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<WorkspaceManagerConfiguration> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerConfigurationName,
    workspaceManagerConfiguration,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerConfigurationName: string,
  options: WorkspaceManagerConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerConfigurations/{workspaceManagerConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerConfigurationName: workspaceManagerConfigurationName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspaceManagerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workspaceManagerConfigurationDeserializer(result.body);
}

/** Gets a workspace manager configuration */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerConfigurationName: string,
  options: WorkspaceManagerConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<WorkspaceManagerConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
