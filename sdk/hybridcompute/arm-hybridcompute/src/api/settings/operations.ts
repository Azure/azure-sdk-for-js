// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext as Client } from "../index.js";
import type { Settings } from "../../models/models.js";
import {
  errorResponseDeserializer,
  settingsSerializer,
  settingsDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SettingsPatchOptionalParams,
  SettingsUpdateOptionalParams,
  SettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  baseProvider: string,
  baseResourceType: string,
  baseResourceName: string,
  settingsResourceName: string,
  parameters: Settings,
  options: SettingsPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{baseProvider}/{baseResourceType}/{baseResourceName}/providers/Microsoft.HybridCompute/settings/{settingsResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      baseProvider: baseProvider,
      baseResourceType: baseResourceType,
      baseResourceName: baseResourceName,
      settingsResourceName: settingsResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-06-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: settingsSerializer(parameters),
  });
}

export async function _patchDeserialize(result: PathUncheckedResponse): Promise<Settings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return settingsDeserializer(result.body);
}

/** Update the base Settings of the target resource. */
export async function patch(
  context: Client,
  resourceGroupName: string,
  baseProvider: string,
  baseResourceType: string,
  baseResourceName: string,
  settingsResourceName: string,
  parameters: Settings,
  options: SettingsPatchOptionalParams = { requestOptions: {} },
): Promise<Settings> {
  const result = await _patchSend(
    context,
    resourceGroupName,
    baseProvider,
    baseResourceType,
    baseResourceName,
    settingsResourceName,
    parameters,
    options,
  );
  return _patchDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  baseProvider: string,
  baseResourceType: string,
  baseResourceName: string,
  settingsResourceName: string,
  parameters: Settings,
  options: SettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{baseProvider}/{baseResourceType}/{baseResourceName}/providers/Microsoft.HybridCompute/settings/{settingsResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      baseProvider: baseProvider,
      baseResourceType: baseResourceType,
      baseResourceName: baseResourceName,
      settingsResourceName: settingsResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-06-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: settingsSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Settings> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return settingsDeserializer(result.body);
}

/** Updates the base Settings of the target resource. */
export async function update(
  context: Client,
  resourceGroupName: string,
  baseProvider: string,
  baseResourceType: string,
  baseResourceName: string,
  settingsResourceName: string,
  parameters: Settings,
  options: SettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<Settings> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    baseProvider,
    baseResourceType,
    baseResourceName,
    settingsResourceName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  baseProvider: string,
  baseResourceType: string,
  baseResourceName: string,
  settingsResourceName: string,
  options: SettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{baseProvider}/{baseResourceType}/{baseResourceName}/providers/Microsoft.HybridCompute/settings/{settingsResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      baseProvider: baseProvider,
      baseResourceType: baseResourceType,
      baseResourceName: baseResourceName,
      settingsResourceName: settingsResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-06-16-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Settings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return settingsDeserializer(result.body);
}

/** Returns the base Settings for the target resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  baseProvider: string,
  baseResourceType: string,
  baseResourceName: string,
  settingsResourceName: string,
  options: SettingsGetOptionalParams = { requestOptions: {} },
): Promise<Settings> {
  const result = await _getSend(
    context,
    resourceGroupName,
    baseProvider,
    baseResourceType,
    baseResourceName,
    settingsResourceName,
    options,
  );
  return _getDeserialize(result);
}
