// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext as Client } from "../index.js";
import type { KeyValue } from "../../models/models.js";
import {
  errorResponseDeserializer,
  keyValueSerializer,
  keyValueDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  KeyValuesDeleteOptionalParams,
  KeyValuesCreateOrUpdateOptionalParams,
  KeyValuesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  keyValueName: string,
  options: KeyValuesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/keyValues/{keyValueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      keyValueName: keyValueName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  keyValueName: string,
  options: KeyValuesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, configStoreName, keyValueName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  keyValueName: string,
  keyValueParameters: KeyValue,
  options: KeyValuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/keyValues/{keyValueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      keyValueName: keyValueName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: keyValueSerializer(keyValueParameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<KeyValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return keyValueDeserializer(result.body);
}

/** Creates a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  keyValueName: string,
  keyValueParameters: KeyValue,
  options: KeyValuesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<KeyValue> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    configStoreName,
    keyValueName,
    keyValueParameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  keyValueName: string,
  options: KeyValuesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/keyValues/{keyValueName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      keyValueName: keyValueName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<KeyValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return keyValueDeserializer(result.body);
}

/** Gets the properties of the specified key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. */
export async function get(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  keyValueName: string,
  options: KeyValuesGetOptionalParams = { requestOptions: {} },
): Promise<KeyValue> {
  const result = await _getSend(context, resourceGroupName, configStoreName, keyValueName, options);
  return _getDeserialize(result);
}
