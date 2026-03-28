// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  OperationResultContract,
  DeployConfigurationParameters,
  SaveConfigurationParameter,
  TenantConfigurationSyncStateContract,
  ConfigurationIdName,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationResultContractDeserializer,
  deployConfigurationParametersSerializer,
  saveConfigurationParameterSerializer,
  tenantConfigurationSyncStateContractDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TenantConfigurationGetSyncStateOptionalParams,
  TenantConfigurationValidateOptionalParams,
  TenantConfigurationSaveOptionalParams,
  TenantConfigurationDeployOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSyncStateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  options: TenantConfigurationGetSyncStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/syncState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getSyncStateDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantConfigurationSyncStateContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return tenantConfigurationSyncStateContractDeserializer(result.body);
}

/** Gets the status of the most recent synchronization between the configuration database and the Git repository. */
export async function getSyncState(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  options: TenantConfigurationGetSyncStateOptionalParams = { requestOptions: {} },
): Promise<TenantConfigurationSyncStateContract> {
  const result = await _getSyncStateSend(
    context,
    resourceGroupName,
    serviceName,
    configurationName,
    options,
  );
  return _getSyncStateDeserialize(result);
}

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  parameters: DeployConfigurationParameters,
  options: TenantConfigurationValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deployConfigurationParametersSerializer(parameters),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationResultContract> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationResultContractDeserializer(result.body);
}

/** This operation validates the changes in the specified Git branch. This is a long running operation and could take several minutes to complete. */
export function validate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  parameters: DeployConfigurationParameters,
  options: TenantConfigurationValidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationResultContract>, OperationResultContract> {
  return getLongRunningPoller(context, _validateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateSend(
        context,
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
}

export function _saveSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  parameters: SaveConfigurationParameter,
  options: TenantConfigurationSaveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/save{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: saveConfigurationParameterSerializer(parameters),
  });
}

export async function _saveDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationResultContract> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationResultContractDeserializer(result.body);
}

/** This operation creates a commit with the current configuration snapshot to the specified branch in the repository. This is a long running operation and could take several minutes to complete. */
export function save(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  parameters: SaveConfigurationParameter,
  options: TenantConfigurationSaveOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationResultContract>, OperationResultContract> {
  return getLongRunningPoller(context, _saveDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _saveSend(context, resourceGroupName, serviceName, configurationName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
}

export function _deploySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  parameters: DeployConfigurationParameters,
  options: TenantConfigurationDeployOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/deploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deployConfigurationParametersSerializer(parameters),
  });
}

export async function _deployDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationResultContract> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationResultContractDeserializer(result.body);
}

/** This operation applies changes from the specified Git branch to the configuration database. This is a long running operation and could take several minutes to complete. */
export function deploy(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  configurationName: ConfigurationIdName,
  parameters: DeployConfigurationParameters,
  options: TenantConfigurationDeployOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationResultContract>, OperationResultContract> {
  return getLongRunningPoller(context, _deployDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deploySend(context, resourceGroupName, serviceName, configurationName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
}
