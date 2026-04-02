// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  AgentApplication,
  _AgentApplicationResourceArmPaginatedResult,
  AgentReferenceResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  agentApplicationSerializer,
  agentApplicationDeserializer,
  _agentApplicationResourceArmPaginatedResultDeserializer,
  agentReferenceResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgentApplicationsDisableOptionalParams,
  AgentApplicationsEnableOptionalParams,
  AgentApplicationsListAgentsOptionalParams,
  AgentApplicationsListOptionalParams,
  AgentApplicationsDeleteOptionalParams,
  AgentApplicationsCreateOrUpdateOptionalParams,
  AgentApplicationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _disableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disables an Agent Application. */
export async function disable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsDisableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    name,
    options,
  );
  return _disableDeserialize(result);
}

export function _enableSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}/enable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _enableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enables an Agent Application. */
export async function enable(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsEnableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    name,
    options,
  );
  return _enableDeserialize(result);
}

export function _listAgentsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsListAgentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}/listAgents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAgentsDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentReferenceResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return agentReferenceResourceArmPaginatedResultDeserializer(result.body);
}

/** Lists agents for an Agent Application. */
export async function listAgents(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsListAgentsOptionalParams = { requestOptions: {} },
): Promise<AgentReferenceResourceArmPaginatedResult> {
  const result = await _listAgentsSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    name,
    options,
  );
  return _listAgentsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  options: AgentApplicationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications{?api%2Dversion,count,%24skip,%24skipToken,names*,searchText,orderBy,orderByAsc}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
      count: options?.count,
      "%24skip": options?.skip,
      "%24skipToken": options?.skipToken,
      names: !options?.names
        ? options?.names
        : options?.names.map((p: any) => {
            return p;
          }),
      searchText: options?.searchText,
      orderBy: options?.orderBy,
      orderByAsc: options?.orderByAsc,
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
): Promise<_AgentApplicationResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _agentApplicationResourceArmPaginatedResultDeserializer(result.body);
}

/** Lists Agent Applications in the project. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  options: AgentApplicationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentApplication> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, projectName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Agent Application. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, projectName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  body: AgentApplication,
  options: AgentApplicationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: agentApplicationSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentApplication> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return agentApplicationDeserializer(result.body);
}

/** Creates or updates an Agent Application (asynchronous). */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  body: AgentApplication,
  options: AgentApplicationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentApplication>, AgentApplication> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        projectName,
        name,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<AgentApplication>, AgentApplication>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AgentApplication> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return agentApplicationDeserializer(result.body);
}

/** Gets an Agent Application by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  name: string,
  options: AgentApplicationsGetOptionalParams = { requestOptions: {} },
): Promise<AgentApplication> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    name,
    options,
  );
  return _getDeserialize(result);
}
