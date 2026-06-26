// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Scenario,
  scenarioSerializer,
  scenarioDeserializer,
  _ScenarioListResult,
  _scenarioListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ScenariosListAllOptionalParams,
  ScenariosDeleteOptionalParams,
  ScenariosCreateOrUpdateOptionalParams,
  ScenariosGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listAllSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ScenariosListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScenarioListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _scenarioListResultDeserializer(result.body);
}

/** Get a list of scenarios. */
export function listAll(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ScenariosListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Scenario> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, resourceGroupName, workspaceName, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenariosDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

/** Delete a scenario. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenariosDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    scenarioName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  resource: Scenario,
  options: ScenariosCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: scenarioSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Scenario> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scenarioDeserializer(result.body);
}

/** Create or update a scenario. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  resource: Scenario,
  options: ScenariosCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Scenario> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    workspaceName,
    scenarioName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenariosGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Scenario> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scenarioDeserializer(result.body);
}

/** Get a scenario. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenariosGetOptionalParams = { requestOptions: {} },
): Promise<Scenario> {
  const result = await _getSend(context, resourceGroupName, workspaceName, scenarioName, options);
  return _getDeserialize(result);
}
