// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  DatabaseSecurityAlertPolicy,
  SecurityAlertPolicyName,
  _DatabaseSecurityAlertListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseSecurityAlertPolicySerializer,
  databaseSecurityAlertPolicyDeserializer,
  _databaseSecurityAlertListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
  DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  DatabaseSecurityAlertPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/securityAlertPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseSecurityAlertListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseSecurityAlertListResultDeserializer(result.body);
}

/** Gets a list of database's security alert policies. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseSecurityAlertPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseSend(context, resourceGroupName, serverName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  parameters: DatabaseSecurityAlertPolicy,
  options: DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/securityAlertPolicies/{securityAlertPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      securityAlertPolicyName: securityAlertPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseSecurityAlertPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseSecurityAlertPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseSecurityAlertPolicyDeserializer(result.body);
}

/** Creates or updates a database's security alert policy. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  parameters: DatabaseSecurityAlertPolicy,
  options: DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DatabaseSecurityAlertPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    securityAlertPolicyName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  options: DatabaseSecurityAlertPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/securityAlertPolicies/{securityAlertPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      securityAlertPolicyName: securityAlertPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<DatabaseSecurityAlertPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseSecurityAlertPolicyDeserializer(result.body);
}

/** Gets a database's security alert policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  securityAlertPolicyName: SecurityAlertPolicyName,
  options: DatabaseSecurityAlertPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseSecurityAlertPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    securityAlertPolicyName,
    options,
  );
  return _getDeserialize(result);
}
