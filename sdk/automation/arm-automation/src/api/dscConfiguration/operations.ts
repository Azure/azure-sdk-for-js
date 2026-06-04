// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  DscConfiguration,
  DscConfigurationCreateOrUpdateParameters,
  _DscConfigurationListResult,
  DscConfigurationGetContentResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dscConfigurationDeserializer,
  dscConfigurationCreateOrUpdateParametersSerializer,
  dscConfigurationUpdateParametersSerializer,
  _dscConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DscConfigurationGetContentOptionalParams,
  DscConfigurationListByAutomationAccountOptionalParams,
  DscConfigurationDeleteOptionalParams,
  DscConfigurationUpdateOptionalParams,
  DscConfigurationCreateOrUpdateOptionalParams,
  DscConfigurationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getContentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationGetContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}/content{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "text/powershell", ...options.requestOptions?.headers },
  });
}

export async function _getContentDeserialize(
  result: PathUncheckedResponse,
): Promise<DscConfigurationGetContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Retrieve the configuration script identified by configuration name. */
export async function getContent(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationGetContentOptionalParams = { requestOptions: {} },
): Promise<DscConfigurationGetContentResponse> {
  const result = await _getContentSend(
    context,
    resourceGroupName,
    automationAccountName,
    configurationName,
    options,
  );
  return _getContentDeserialize(result);
}

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: DscConfigurationListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations{?api%2Dversion,%24filter,%24skip,%24top,%24inlinecount}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
      "%24skip": options?.skip,
      "%24top": options?.top,
      "%24inlinecount": options?.inlinecount,
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

export async function _listByAutomationAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_DscConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dscConfigurationListResultDeserializer(result.body);
}

/** Retrieve a list of configurations. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: DscConfigurationListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DscConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAutomationAccountSend(context, resourceGroupName, automationAccountName, options),
    _listByAutomationAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

/** Delete the dsc configuration identified by configuration name. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    configurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.parameters
      ? options?.parameters
      : dscConfigurationUpdateParametersSerializer(options?.parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DscConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscConfigurationDeserializer(result.body);
}

/** Create the configuration identified by configuration name. */
export async function update(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationUpdateOptionalParams = { requestOptions: {} },
): Promise<DscConfiguration> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    automationAccountName,
    configurationName,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  parameters: DscConfigurationCreateOrUpdateParameters,
  options: DscConfigurationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      configurationName: configurationName,
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
    body: dscConfigurationCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DscConfiguration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscConfigurationDeserializer(result.body);
}

/** Create the configuration identified by configuration name. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  parameters: DscConfigurationCreateOrUpdateParameters,
  options: DscConfigurationCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DscConfiguration> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    automationAccountName,
    configurationName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      configurationName: configurationName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DscConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscConfigurationDeserializer(result.body);
}

/** Retrieve the configuration identified by configuration name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  configurationName: string,
  options: DscConfigurationGetOptionalParams = { requestOptions: {} },
): Promise<DscConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    configurationName,
    options,
  );
  return _getDeserialize(result);
}
