// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ExtendedDatabaseBlobAuditingPolicy,
  extendedDatabaseBlobAuditingPolicySerializer,
  extendedDatabaseBlobAuditingPolicyDeserializer,
  _ExtendedDatabaseBlobAuditingPolicyListResult,
  _extendedDatabaseBlobAuditingPolicyListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
  ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extendedAuditingSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExtendedDatabaseBlobAuditingPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _extendedDatabaseBlobAuditingPolicyListResultDeserializer(result.body);
}

/** Lists extended auditing settings of a database. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExtendedDatabaseBlobAuditingPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseSend(context, resourceGroupName, serverName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  parameters: ExtendedDatabaseBlobAuditingPolicy,
  options: ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extendedAuditingSettings/{blobAuditingPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      blobAuditingPolicyName: "default",
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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
      body: extendedDatabaseBlobAuditingPolicySerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedDatabaseBlobAuditingPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return extendedDatabaseBlobAuditingPolicyDeserializer(result.body);
}

/** Creates or updates an extended database's blob auditing policy. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  parameters: ExtendedDatabaseBlobAuditingPolicy,
  options: ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ExtendedDatabaseBlobAuditingPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
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
  options: ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extendedAuditingSettings/{blobAuditingPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      blobAuditingPolicyName: "default",
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedDatabaseBlobAuditingPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return extendedDatabaseBlobAuditingPolicyDeserializer(result.body);
}

/** Gets an extended database's blob auditing policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  options: ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ExtendedDatabaseBlobAuditingPolicy> {
  const result = await _getSend(context, resourceGroupName, serverName, databaseName, options);
  return _getDeserialize(result);
}
