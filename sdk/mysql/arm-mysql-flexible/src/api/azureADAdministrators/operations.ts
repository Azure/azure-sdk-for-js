// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  AzureADAdministrator,
  AdministratorName,
  _AdministratorListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  azureADAdministratorSerializer,
  azureADAdministratorDeserializer,
  _administratorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AzureADAdministratorsListByServerOptionalParams,
  AzureADAdministratorsDeleteOptionalParams,
  AzureADAdministratorsCreateOrUpdateOptionalParams,
  AzureADAdministratorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AzureADAdministratorsListByServerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators{?api%2Dversion}",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_AdministratorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _administratorListResultDeserializer(result.body);
}

/** List all the AAD administrators in a given server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: AzureADAdministratorsListByServerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AzureADAdministrator> {
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
  administratorName: AdministratorName,
  options: AzureADAdministratorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators/{administratorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      administratorName: administratorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an Azure AD Administrator. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  administratorName: AdministratorName,
  options: AzureADAdministratorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serverName, administratorName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  administratorName: AdministratorName,
  parameters: AzureADAdministrator,
  options: AzureADAdministratorsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators/{administratorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      administratorName: administratorName,
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
    body: azureADAdministratorSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureADAdministrator> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return azureADAdministratorDeserializer(result.body);
}

/** Creates or updates an existing Azure Active Directory administrator. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  administratorName: AdministratorName,
  parameters: AzureADAdministrator,
  options: AzureADAdministratorsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AzureADAdministrator>, AzureADAdministrator> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        administratorName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AzureADAdministrator>, AzureADAdministrator>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  administratorName: AdministratorName,
  options: AzureADAdministratorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators/{administratorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      administratorName: administratorName,
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
): Promise<AzureADAdministrator> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return azureADAdministratorDeserializer(result.body);
}

/** Gets information about an azure ad administrator. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  administratorName: AdministratorName,
  options: AzureADAdministratorsGetOptionalParams = { requestOptions: {} },
): Promise<AzureADAdministrator> {
  const result = await _getSend(context, resourceGroupName, serverName, administratorName, options);
  return _getDeserialize(result);
}
