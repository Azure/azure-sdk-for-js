// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext as Client } from "../index.js";
import type { RulesEngine, _RulesEngineListResult } from "../../models/models.js";
import {
  rulesEngineSerializer,
  rulesEngineDeserializer,
  errorResponseDeserializer,
  _rulesEngineListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RulesEnginesListByFrontDoorOptionalParams,
  RulesEnginesDeleteOptionalParams,
  RulesEnginesCreateOrUpdateOptionalParams,
  RulesEnginesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByFrontDoorSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: RulesEnginesListByFrontDoorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

export async function _listByFrontDoorDeserialize(
  result: PathUncheckedResponse,
): Promise<_RulesEngineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _rulesEngineListResultDeserializer(result.body);
}

/** Lists all of the Rules Engine Configurations within a Front Door. */
export function listByFrontDoor(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: RulesEnginesListByFrontDoorOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RulesEngine> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFrontDoorSend(context, resourceGroupName, frontDoorName, options),
    _listByFrontDoorDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  rulesEngineName: string,
  options: RulesEnginesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines/{rulesEngineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      rulesEngineName: rulesEngineName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

/** Deletes an existing Rules Engine Configuration with the specified parameters. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  rulesEngineName: string,
  options: RulesEnginesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, frontDoorName, rulesEngineName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  rulesEngineName: string,
  rulesEngineParameters: RulesEngine,
  options: RulesEnginesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines/{rulesEngineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      rulesEngineName: rulesEngineName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: rulesEngineSerializer(rulesEngineParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RulesEngine> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return rulesEngineDeserializer(result.body);
}

/** Creates a new Rules Engine Configuration with the specified name within the specified Front Door. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  rulesEngineName: string,
  rulesEngineParameters: RulesEngine,
  options: RulesEnginesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RulesEngine>, RulesEngine> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        frontDoorName,
        rulesEngineName,
        rulesEngineParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<RulesEngine>, RulesEngine>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  rulesEngineName: string,
  options: RulesEnginesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/rulesEngines/{rulesEngineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      rulesEngineName: rulesEngineName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RulesEngine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return rulesEngineDeserializer(result.body);
}

/** Gets a Rules Engine Configuration with the specified name within the specified Front Door. */
export async function get(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  rulesEngineName: string,
  options: RulesEnginesGetOptionalParams = { requestOptions: {} },
): Promise<RulesEngine> {
  const result = await _getSend(
    context,
    resourceGroupName,
    frontDoorName,
    rulesEngineName,
    options,
  );
  return _getDeserialize(result);
}
