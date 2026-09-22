// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  DscNodeConfiguration,
  DscNodeConfigurationCreateOrUpdateParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dscNodeConfigurationDeserializer,
  dscNodeConfigurationCreateOrUpdateParametersSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DscNodeConfigurationOperationsDeleteOptionalParams,
  DscNodeConfigurationOperationsCreateOrUpdateOptionalParams,
  DscNodeConfigurationOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeConfigurationName: nodeConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the Dsc node configurations by node configuration. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationOperationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    nodeConfigurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  parameters: DscNodeConfigurationCreateOrUpdateParameters,
  options: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeConfigurationName: nodeConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dscNodeConfigurationCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DscNodeConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscNodeConfigurationDeserializer(result.body);
}

/** Create the node configuration identified by node configuration name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  parameters: DscNodeConfigurationCreateOrUpdateParameters,
  options: DscNodeConfigurationOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        automationAccountName,
        nodeConfigurationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-10-23",
  }) as PollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeConfigurationName: nodeConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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
): Promise<DscNodeConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscNodeConfigurationDeserializer(result.body);
}

/** Retrieve the Dsc node configurations by node configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationOperationsGetOptionalParams = { requestOptions: {} },
): Promise<DscNodeConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    nodeConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
