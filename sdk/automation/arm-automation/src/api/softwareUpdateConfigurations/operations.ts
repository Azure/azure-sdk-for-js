// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  SoftwareUpdateConfiguration,
  SoftwareUpdateConfigurationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  softwareUpdateConfigurationSerializer,
  softwareUpdateConfigurationDeserializer,
  softwareUpdateConfigurationListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SoftwareUpdateConfigurationsListOptionalParams,
  SoftwareUpdateConfigurationsDeleteOptionalParams,
  SoftwareUpdateConfigurationsCreateOptionalParams,
  SoftwareUpdateConfigurationsGetByNameOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: SoftwareUpdateConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftwareUpdateConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softwareUpdateConfigurationListResultDeserializer(result.body);
}

/** Get all software update configurations for the account. */
export async function list(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: SoftwareUpdateConfigurationsListOptionalParams = { requestOptions: {} },
): Promise<SoftwareUpdateConfigurationListResult> {
  const result = await _listSend(context, resourceGroupName, automationAccountName, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationName: string,
  options: SoftwareUpdateConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations/{softwareUpdateConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      softwareUpdateConfigurationName: softwareUpdateConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
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

/** delete a specific software update configuration. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationName: string,
  options: SoftwareUpdateConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    softwareUpdateConfigurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationName: string,
  parameters: SoftwareUpdateConfiguration,
  options: SoftwareUpdateConfigurationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations/{softwareUpdateConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      softwareUpdateConfigurationName: softwareUpdateConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: softwareUpdateConfigurationSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftwareUpdateConfiguration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softwareUpdateConfigurationDeserializer(result.body);
}

/** Create a new software update configuration with the name given in the URI. */
export async function create(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationName: string,
  parameters: SoftwareUpdateConfiguration,
  options: SoftwareUpdateConfigurationsCreateOptionalParams = { requestOptions: {} },
): Promise<SoftwareUpdateConfiguration> {
  const result = await _createSend(
    context,
    resourceGroupName,
    automationAccountName,
    softwareUpdateConfigurationName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getByNameSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationName: string,
  options: SoftwareUpdateConfigurationsGetByNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurations/{softwareUpdateConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      softwareUpdateConfigurationName: softwareUpdateConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getByNameDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftwareUpdateConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softwareUpdateConfigurationDeserializer(result.body);
}

/** Get a single software update configuration by name. */
export async function getByName(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationName: string,
  options: SoftwareUpdateConfigurationsGetByNameOptionalParams = { requestOptions: {} },
): Promise<SoftwareUpdateConfiguration> {
  const result = await _getByNameSend(
    context,
    resourceGroupName,
    automationAccountName,
    softwareUpdateConfigurationName,
    options,
  );
  return _getByNameDeserialize(result);
}
