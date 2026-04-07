// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ExtendedDatabaseBlobAuditingPolicy,
  _ExtendedDatabaseBlobAuditingPolicyListResult,
  BlobAuditingPolicyName,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  extendedDatabaseBlobAuditingPolicySerializer,
  extendedDatabaseBlobAuditingPolicyDeserializer,
  _extendedDatabaseBlobAuditingPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOptionalParams,
  ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
): Promise<_ExtendedDatabaseBlobAuditingPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

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
  blobAuditingPolicyName: BlobAuditingPolicyName,
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
      blobAuditingPolicyName: blobAuditingPolicyName,
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
    body: extendedDatabaseBlobAuditingPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedDatabaseBlobAuditingPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

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
  blobAuditingPolicyName: BlobAuditingPolicyName,
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
    blobAuditingPolicyName,
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
  blobAuditingPolicyName: BlobAuditingPolicyName,
  options: ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extendedAuditingSettings/{blobAuditingPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      blobAuditingPolicyName: blobAuditingPolicyName,
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
): Promise<ExtendedDatabaseBlobAuditingPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

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
  blobAuditingPolicyName: BlobAuditingPolicyName,
  options: ExtendedDatabaseBlobAuditingPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ExtendedDatabaseBlobAuditingPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    blobAuditingPolicyName,
    options,
  );
  return _getDeserialize(result);
}
