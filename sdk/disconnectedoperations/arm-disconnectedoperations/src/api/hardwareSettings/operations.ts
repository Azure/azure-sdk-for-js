// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeContext as Client } from "../index.js";
import type { _HardwareSettingListResult, HardwareSetting } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _hardwareSettingListResultDeserializer,
  hardwareSettingSerializer,
  hardwareSettingDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HardwareSettingsDeleteOptionalParams,
  HardwareSettingsCreateOrUpdateOptionalParams,
  HardwareSettingsGetOptionalParams,
  HardwareSettingsListByParentOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hardwareSettingName: string,
  options: HardwareSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings/{hardwareSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      hardwareSettingName: hardwareSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
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

/** Delete hardware settings */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  hardwareSettingName: string,
  options: HardwareSettingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, name, hardwareSettingName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hardwareSettingName: string,
  resource: HardwareSetting,
  options: HardwareSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings/{hardwareSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      hardwareSettingName: hardwareSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hardwareSettingSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HardwareSetting> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return hardwareSettingDeserializer(result.body);
}

/** Create or update hardware settings */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  hardwareSettingName: string,
  resource: HardwareSetting,
  options: HardwareSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HardwareSetting>, HardwareSetting> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, name, hardwareSettingName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-15",
  }) as PollerLike<OperationState<HardwareSetting>, HardwareSetting>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  hardwareSettingName: string,
  options: HardwareSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings/{hardwareSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      hardwareSettingName: hardwareSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HardwareSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return hardwareSettingDeserializer(result.body);
}

/** Get the hardware settings resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  hardwareSettingName: string,
  options: HardwareSettingsGetOptionalParams = { requestOptions: {} },
): Promise<HardwareSetting> {
  const result = await _getSend(context, resourceGroupName, name, hardwareSettingName, options);
  return _getDeserialize(result);
}

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: HardwareSettingsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/disconnectedOperations/{name}/hardwareSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_HardwareSettingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _hardwareSettingListResultDeserializer(result.body);
}

/** List by parent */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: HardwareSettingsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HardwareSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, name, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-15" },
  );
}
