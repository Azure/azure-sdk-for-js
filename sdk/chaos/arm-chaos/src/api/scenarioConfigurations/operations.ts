// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext as Client } from "../index.js";
import type {
  ScenarioConfiguration,
  _ScenarioConfigurationListResult,
  Validation,
  PermissionsFix,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  scenarioConfigurationSerializer,
  scenarioConfigurationDeserializer,
  _scenarioConfigurationListResultDeserializer,
  validationDeserializer,
  fixResourcePermissionsRequestSerializer,
  permissionsFixDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScenarioConfigurationsFixResourcePermissionsOptionalParams,
  ScenarioConfigurationsValidateOptionalParams,
  ScenarioConfigurationsExecuteOptionalParams,
  ScenarioConfigurationsListAllOptionalParams,
  ScenarioConfigurationsDeleteOptionalParams,
  ScenarioConfigurationsCreateOrUpdateOptionalParams,
  ScenarioConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _fixResourcePermissionsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsFixResourcePermissionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/configurations/{scenarioConfigurationName}/fixResourcePermissions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      scenarioConfigurationName: scenarioConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["body"]
      ? options["body"]
      : fixResourcePermissionsRequestSerializer(options["body"]),
  });
}

export async function _fixResourcePermissionsDeserialize(
  result: PathUncheckedResponse,
): Promise<PermissionsFix> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return permissionsFixDeserializer(result.body);
}

/** Fixes resource permissions for the given scenario configuration. */
export function fixResourcePermissions(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsFixResourcePermissionsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PermissionsFix>, PermissionsFix> {
  return getLongRunningPoller(context, _fixResourcePermissionsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fixResourcePermissionsSend(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<PermissionsFix>, PermissionsFix>;
}

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/configurations/{scenarioConfigurationName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      scenarioConfigurationName: scenarioConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _validateDeserialize(result: PathUncheckedResponse): Promise<Validation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validationDeserializer(result.body);
}

/** Validate the given scenario configuration. */
export function validate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsValidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Validation>, Validation> {
  return getLongRunningPoller(context, _validateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateSend(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<Validation>, Validation>;
}

export function _executeSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/configurations/{scenarioConfigurationName}/execute{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      scenarioConfigurationName: scenarioConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _executeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Execute the scenario execution with the given scenario configuration. */
export async function execute(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsExecuteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _executeSend(
    context,
    resourceGroupName,
    workspaceName,
    scenarioName,
    scenarioConfigurationName,
    options,
  );
  return _executeDeserialize(result);
}

export function _listAllSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenarioConfigurationsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/configurations{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScenarioConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _scenarioConfigurationListResultDeserializer(result.body);
}

/** Get a list of scenario definitions. */
export function listAll(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenarioConfigurationsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScenarioConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, resourceGroupName, workspaceName, scenarioName, options),
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
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/configurations/{scenarioConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      scenarioConfigurationName: scenarioConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

/** Delete a scenario definition. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  resource: ScenarioConfiguration,
  options: ScenarioConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/configurations/{scenarioConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      scenarioConfigurationName: scenarioConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scenarioConfigurationSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ScenarioConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return scenarioConfigurationDeserializer(result.body);
}

/** Create or update a scenario definition. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  resource: ScenarioConfiguration,
  options: ScenarioConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ScenarioConfiguration>, ScenarioConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<ScenarioConfiguration>, ScenarioConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/configurations/{scenarioConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      scenarioConfigurationName: scenarioConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<ScenarioConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return scenarioConfigurationDeserializer(result.body);
}

/** Get a scenario definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  scenarioConfigurationName: string,
  options: ScenarioConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<ScenarioConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    scenarioName,
    scenarioConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
