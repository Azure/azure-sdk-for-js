// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  AdministratorMicrosoftEntra,
  AdministratorMicrosoftEntraAdd,
  _AdministratorMicrosoftEntraList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  administratorMicrosoftEntraDeserializer,
  administratorMicrosoftEntraAddSerializer,
  _administratorMicrosoftEntraListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AdministratorsMicrosoftEntraListByServerOptionalParams,
  AdministratorsMicrosoftEntraDeleteOptionalParams,
  AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams,
  AdministratorsMicrosoftEntraGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AdministratorsMicrosoftEntraListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_AdministratorMicrosoftEntraList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _administratorMicrosoftEntraListDeserializer(result.body);
}

/** List all server administrators associated to a Microsoft Entra principal. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AdministratorsMicrosoftEntraListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AdministratorMicrosoftEntra> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  objectId: string,
  options: AdministratorsMicrosoftEntraDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators/{objectId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      objectId: objectId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an existing server administrator associated to a Microsoft Entra principal. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  objectId: string,
  options: AdministratorsMicrosoftEntraDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serverName, objectId, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  objectId: string,
  parameters: AdministratorMicrosoftEntraAdd,
  options: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators/{objectId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      objectId: objectId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: administratorMicrosoftEntraAddSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AdministratorMicrosoftEntra> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return administratorMicrosoftEntraDeserializer(result.body);
}

/** Creates a new server administrator associated to a Microsoft Entra principal. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  objectId: string,
  parameters: AdministratorMicrosoftEntraAdd,
  options: AdministratorsMicrosoftEntraCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AdministratorMicrosoftEntra>, AdministratorMicrosoftEntra> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, serverName, objectId, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<AdministratorMicrosoftEntra>, AdministratorMicrosoftEntra>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  objectId: string,
  options: AdministratorsMicrosoftEntraGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators/{objectId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      objectId: objectId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AdministratorMicrosoftEntra> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return administratorMicrosoftEntraDeserializer(result.body);
}

/** Gets information about a server administrator associated to a Microsoft Entra principal. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  objectId: string,
  options: AdministratorsMicrosoftEntraGetOptionalParams = { requestOptions: {} },
): Promise<AdministratorMicrosoftEntra> {
  const result = await _getSend(context, resourceGroupName, serverName, objectId, options);
  return _getDeserialize(result);
}
