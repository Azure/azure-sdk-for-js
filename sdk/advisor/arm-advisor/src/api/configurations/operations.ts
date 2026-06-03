// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext as Client } from "../index.js";
import type {
  _ConfigurationListResult,
  ConfigData,
  ConfigurationName,
} from "../../models/models.js";
import {
  armErrorResponseDeserializer,
  _configurationListResultDeserializer,
  configDataSerializer,
  configDataDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationsCreateInResourceGroupOptionalParams,
  ConfigurationsListByResourceGroupOptionalParams,
  ConfigurationsCreateInSubscriptionOptionalParams,
  ConfigurationsListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createInResourceGroupSend(
  context: Client,
  configurationName: ConfigurationName,
  resourceGroup: string,
  configContract: ConfigData,
  options: ConfigurationsCreateInResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Advisor/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      configurationName: configurationName,
      resourceGroup: resourceGroup,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configDataSerializer(configContract),
  });
}

export async function _createInResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigData> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configDataDeserializer(result.body);
}

/** Create/Overwrite Azure Advisor configuration. */
export async function createInResourceGroup(
  context: Client,
  configurationName: ConfigurationName,
  resourceGroup: string,
  configContract: ConfigData,
  options: ConfigurationsCreateInResourceGroupOptionalParams = { requestOptions: {} },
): Promise<ConfigData> {
  const result = await _createInResourceGroupSend(
    context,
    configurationName,
    resourceGroup,
    configContract,
    options,
  );
  return _createInResourceGroupDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroup: string,
  options: ConfigurationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Advisor/configurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroup: resourceGroup,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _configurationListResultDeserializer(result.body);
}

/** Retrieve Azure Advisor configurations. */
export function listByResourceGroup(
  context: Client,
  resourceGroup: string,
  options: ConfigurationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigData> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroup, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _createInSubscriptionSend(
  context: Client,
  configurationName: ConfigurationName,
  configContract: ConfigData,
  options: ConfigurationsCreateInSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configDataSerializer(configContract),
  });
}

export async function _createInSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigData> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configDataDeserializer(result.body);
}

/** Create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups. */
export async function createInSubscription(
  context: Client,
  configurationName: ConfigurationName,
  configContract: ConfigData,
  options: ConfigurationsCreateInSubscriptionOptionalParams = { requestOptions: {} },
): Promise<ConfigData> {
  const result = await _createInSubscriptionSend(
    context,
    configurationName,
    configContract,
    options,
  );
  return _createInSubscriptionDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ConfigurationsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/configurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _configurationListResultDeserializer(result.body);
}

/** Retrieve Azure Advisor configurations and also retrieve configurations of contained resource groups. */
export function listBySubscription(
  context: Client,
  options: ConfigurationsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigData> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}
