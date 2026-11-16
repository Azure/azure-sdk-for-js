// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext as Client } from "../index.js";
import type { UpgradePreferences } from "../../models/models.js";
import {
  errorResponseDeserializer,
  upgradePreferencesSerializer,
  upgradePreferencesDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UpgradePreferencesOperationsUpgradeNowOptionalParams,
  UpgradePreferencesOperationsCreateOrUpdateOptionalParams,
  UpgradePreferencesOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _upgradeNowSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: UpgradePreferencesOperationsUpgradeNowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/upgradePreferences/default/upgradeNow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _upgradeNowDeserialize(
  result: PathUncheckedResponse,
): Promise<UpgradePreferences | void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (!result.body) {
    return;
  }

  return upgradePreferencesDeserializer(result.body);
}
/** Starts an immediate eight-hour upgrade override when an upgrade is pending. */
export async function upgradeNow(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: UpgradePreferencesOperationsUpgradeNowOptionalParams = { requestOptions: {} },
): Promise<UpgradePreferences | void> {
  const result = await _upgradeNowSend(context, resourceGroupName, clusterName, options);
  return _upgradeNowDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: UpgradePreferences,
  options: UpgradePreferencesOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/upgradePreferences/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: upgradePreferencesSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<UpgradePreferences> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return upgradePreferencesDeserializer(result.body);
}
/** Creates or updates the upgrade preferences for an Event Hubs Dedicated cluster. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: UpgradePreferences,
  options: UpgradePreferencesOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<UpgradePreferences> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    clusterName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: UpgradePreferencesOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/upgradePreferences/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<UpgradePreferences> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return upgradePreferencesDeserializer(result.body);
}
/** Gets the upgrade preferences for an Event Hubs Dedicated cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: UpgradePreferencesOperationsGetOptionalParams = { requestOptions: {} },
): Promise<UpgradePreferences> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
