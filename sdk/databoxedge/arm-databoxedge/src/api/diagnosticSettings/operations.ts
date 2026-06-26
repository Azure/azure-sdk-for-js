// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  DiagnosticProactiveLogCollectionSettings,
  diagnosticProactiveLogCollectionSettingsSerializer,
  diagnosticProactiveLogCollectionSettingsDeserializer,
  DiagnosticRemoteSupportSettings,
  diagnosticRemoteSupportSettingsSerializer,
  diagnosticRemoteSupportSettingsDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams,
  DiagnosticSettingsGetDiagnosticRemoteSupportSettingsOptionalParams,
  DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams,
  DiagnosticSettingsGetDiagnosticProactiveLogCollectionSettingsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _updateDiagnosticRemoteSupportSettingsSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
  options: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/diagnosticRemoteSupportSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      body: diagnosticRemoteSupportSettingsSerializer(diagnosticRemoteSupportSettings),
    });
}

export async function _updateDiagnosticRemoteSupportSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticRemoteSupportSettings> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticRemoteSupportSettingsDeserializer(result.body);
}

/** Updates the diagnostic remote support settings on a Data Box Edge/Data Box Gateway device. */
export function updateDiagnosticRemoteSupportSettings(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  diagnosticRemoteSupportSettings: DiagnosticRemoteSupportSettings,
  options: DiagnosticSettingsUpdateDiagnosticRemoteSupportSettingsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DiagnosticRemoteSupportSettings>, DiagnosticRemoteSupportSettings> {
  return getLongRunningPoller(
    context,
    _updateDiagnosticRemoteSupportSettingsDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateDiagnosticRemoteSupportSettingsSend(
          context,
          deviceName,
          resourceGroupName,
          diagnosticRemoteSupportSettings,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2023-12-01",
    },
  ) as PollerLike<OperationState<DiagnosticRemoteSupportSettings>, DiagnosticRemoteSupportSettings>;
}

export function _getDiagnosticRemoteSupportSettingsSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DiagnosticSettingsGetDiagnosticRemoteSupportSettingsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/diagnosticRemoteSupportSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getDiagnosticRemoteSupportSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticRemoteSupportSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticRemoteSupportSettingsDeserializer(result.body);
}

/** Gets the diagnostic remote support settings of the specified Data Box Edge/Data Box Gateway device. */
export async function getDiagnosticRemoteSupportSettings(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DiagnosticSettingsGetDiagnosticRemoteSupportSettingsOptionalParams = {
    requestOptions: {},
  },
): Promise<DiagnosticRemoteSupportSettings> {
  const result = await _getDiagnosticRemoteSupportSettingsSend(
    context,
    deviceName,
    resourceGroupName,
    options,
  );
  return _getDiagnosticRemoteSupportSettingsDeserialize(result);
}

export function _updateDiagnosticProactiveLogCollectionSettingsSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
  options: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/diagnosticProactiveLogCollectionSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      body: diagnosticProactiveLogCollectionSettingsSerializer(proactiveLogCollectionSettings),
    });
}

export async function _updateDiagnosticProactiveLogCollectionSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticProactiveLogCollectionSettings> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticProactiveLogCollectionSettingsDeserializer(result.body);
}

/** Updates the proactive log collection settings on a Data Box Edge/Data Box Gateway device. */
export function updateDiagnosticProactiveLogCollectionSettings(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  proactiveLogCollectionSettings: DiagnosticProactiveLogCollectionSettings,
  options: DiagnosticSettingsUpdateDiagnosticProactiveLogCollectionSettingsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<DiagnosticProactiveLogCollectionSettings>,
  DiagnosticProactiveLogCollectionSettings
> {
  return getLongRunningPoller(
    context,
    _updateDiagnosticProactiveLogCollectionSettingsDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateDiagnosticProactiveLogCollectionSettingsSend(
          context,
          deviceName,
          resourceGroupName,
          proactiveLogCollectionSettings,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2023-12-01",
    },
  ) as PollerLike<
    OperationState<DiagnosticProactiveLogCollectionSettings>,
    DiagnosticProactiveLogCollectionSettings
  >;
}

export function _getDiagnosticProactiveLogCollectionSettingsSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DiagnosticSettingsGetDiagnosticProactiveLogCollectionSettingsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/diagnosticProactiveLogCollectionSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getDiagnosticProactiveLogCollectionSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiagnosticProactiveLogCollectionSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return diagnosticProactiveLogCollectionSettingsDeserializer(result.body);
}

/** Gets the proactive log collection settings of the specified Data Box Edge/Data Box Gateway device. */
export async function getDiagnosticProactiveLogCollectionSettings(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: DiagnosticSettingsGetDiagnosticProactiveLogCollectionSettingsOptionalParams = {
    requestOptions: {},
  },
): Promise<DiagnosticProactiveLogCollectionSettings> {
  const result = await _getDiagnosticProactiveLogCollectionSettingsSend(
    context,
    deviceName,
    resourceGroupName,
    options,
  );
  return _getDiagnosticProactiveLogCollectionSettingsDeserialize(result);
}
