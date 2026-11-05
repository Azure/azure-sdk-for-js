// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext as Client } from "../index.js";
import type {
  LogicApp,
  WorkflowEnvelope,
  _WorkflowEnvelopeCollection,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  logicAppSerializer,
  logicAppDeserializer,
  workflowEnvelopeDeserializer,
  _workflowEnvelopeCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LogicAppsListWorkflowsOptionalParams,
  LogicAppsGetWorkflowOptionalParams,
  LogicAppsListWorkflowsConnectionsOptionalParams,
  LogicAppsDeleteOptionalParams,
  LogicAppsCreateOrUpdateOptionalParams,
  LogicAppsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listWorkflowsSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsListWorkflowsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}/workflows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      logicAppName: logicAppName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listWorkflowsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowEnvelopeCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _workflowEnvelopeCollectionDeserializer(result.body);
}

/** List the workflows for a logic app. */
export function listWorkflows(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsListWorkflowsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowEnvelope> {
  return buildPagedAsyncIterator(
    context,
    () => _listWorkflowsSend(context, resourceGroupName, containerAppName, logicAppName, options),
    _listWorkflowsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _getWorkflowSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  workflowName: string,
  options: LogicAppsGetWorkflowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}/workflows/{workflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      logicAppName: logicAppName,
      workflowName: workflowName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getWorkflowDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workflowEnvelopeDeserializer(result.body);
}

/** Get workflow information by its name */
export async function getWorkflow(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  workflowName: string,
  options: LogicAppsGetWorkflowOptionalParams = { requestOptions: {} },
): Promise<WorkflowEnvelope> {
  const result = await _getWorkflowSend(
    context,
    resourceGroupName,
    containerAppName,
    logicAppName,
    workflowName,
    options,
  );
  return _getWorkflowDeserialize(result);
}

export function _listWorkflowsConnectionsSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsListWorkflowsConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}/listWorkflowsConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      logicAppName: logicAppName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listWorkflowsConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowEnvelope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workflowEnvelopeDeserializer(result.body);
}

/** Gets logic app's connections. */
export async function listWorkflowsConnections(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsListWorkflowsConnectionsOptionalParams = { requestOptions: {} },
): Promise<WorkflowEnvelope> {
  const result = await _listWorkflowsConnectionsSend(
    context,
    resourceGroupName,
    containerAppName,
    logicAppName,
    options,
  );
  return _listWorkflowsConnectionsDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      logicAppName: logicAppName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

/** Deletes a Logic App extension resource */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    containerAppName,
    logicAppName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      logicAppName: logicAppName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.resource ? options?.resource : logicAppSerializer(options?.resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<LogicApp> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logicAppDeserializer(result.body);
}

/** Create or update a Logic App extension resource */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<LogicApp> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    containerAppName,
    logicAppName,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/providers/Microsoft.App/logicApps/{logicAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      logicAppName: logicAppName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LogicApp> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logicAppDeserializer(result.body);
}

/** Gets a logic app extension resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  logicAppName: string,
  options: LogicAppsGetOptionalParams = { requestOptions: {} },
): Promise<LogicApp> {
  const result = await _getSend(
    context,
    resourceGroupName,
    containerAppName,
    logicAppName,
    options,
  );
  return _getDeserialize(result);
}
