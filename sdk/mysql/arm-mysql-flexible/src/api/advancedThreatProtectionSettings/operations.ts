// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  AdvancedThreatProtection,
  AdvancedThreatProtectionName,
  AdvancedThreatProtectionForUpdate,
  _AdvancedThreatProtectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  advancedThreatProtectionSerializer,
  advancedThreatProtectionDeserializer,
  advancedThreatProtectionForUpdateSerializer,
  _advancedThreatProtectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AdvancedThreatProtectionSettingsListOptionalParams,
  AdvancedThreatProtectionSettingsUpdateOptionalParams,
  AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  AdvancedThreatProtectionSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AdvancedThreatProtectionSettingsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AdvancedThreatProtectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _advancedThreatProtectionListResultDeserializer(result.body);
}

/** Gets a list of server's Advanced Threat Protection states. */
export function list(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AdvancedThreatProtectionSettingsListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AdvancedThreatProtection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serverName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: AdvancedThreatProtectionForUpdate,
  options: AdvancedThreatProtectionSettingsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      advancedThreatProtectionName: advancedThreatProtectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: advancedThreatProtectionForUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvancedThreatProtection> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return advancedThreatProtectionDeserializer(result.body);
}

/** Updates a server's Advanced Threat Protection state. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: AdvancedThreatProtectionForUpdate,
  options: AdvancedThreatProtectionSettingsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection>;
}

export function _updatePutSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: AdvancedThreatProtection,
  options: AdvancedThreatProtectionSettingsUpdatePutOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      advancedThreatProtectionName: advancedThreatProtectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: advancedThreatProtectionSerializer(parameters),
  });
}

export async function _updatePutDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvancedThreatProtection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return advancedThreatProtectionDeserializer(result.body);
}

/** Updates a server's Advanced Threat Protection state. */
export function updatePut(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  parameters: AdvancedThreatProtection,
  options: AdvancedThreatProtectionSettingsUpdatePutOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection> {
  return getLongRunningPoller(context, _updatePutDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updatePutSend(
        context,
        resourceGroupName,
        serverName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AdvancedThreatProtection>, AdvancedThreatProtection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: AdvancedThreatProtectionSettingsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      advancedThreatProtectionName: advancedThreatProtectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvancedThreatProtection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return advancedThreatProtectionDeserializer(result.body);
}

/** Get a server's Advanced Threat Protection state */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advancedThreatProtectionName: AdvancedThreatProtectionName,
  options: AdvancedThreatProtectionSettingsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<AdvancedThreatProtection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    advancedThreatProtectionName,
    options,
  );
  return _getDeserialize(result);
}
