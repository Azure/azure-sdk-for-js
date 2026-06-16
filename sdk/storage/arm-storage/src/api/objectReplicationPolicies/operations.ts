// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type { ObjectReplicationPolicy, _ObjectReplicationPolicies } from "../../models/models.js";
import {
  errorResponseDeserializer,
  objectReplicationPolicySerializer,
  objectReplicationPolicyDeserializer,
  _objectReplicationPoliciesDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ObjectReplicationPoliciesListOptionalParams,
  ObjectReplicationPoliciesDeleteOptionalParams,
  ObjectReplicationPoliciesCreateOrUpdateOptionalParams,
  ObjectReplicationPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ObjectReplicationPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ObjectReplicationPolicies> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _objectReplicationPoliciesDeserializer(result.body);
}

/** List the object replication policies associated with the storage account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ObjectReplicationPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ObjectReplicationPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  objectReplicationPolicyId: string,
  options: ObjectReplicationPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies/{objectReplicationPolicyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      objectReplicationPolicyId: objectReplicationPolicyId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the object replication policy associated with the specified storage account. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  objectReplicationPolicyId: string,
  options: ObjectReplicationPoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  objectReplicationPolicyId: string,
  properties: ObjectReplicationPolicy,
  options: ObjectReplicationPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies/{objectReplicationPolicyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      objectReplicationPolicyId: objectReplicationPolicyId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: objectReplicationPolicySerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ObjectReplicationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return objectReplicationPolicyDeserializer(result.body);
}

/** Create or update the object replication policy of the storage account. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  objectReplicationPolicyId: string,
  properties: ObjectReplicationPolicy,
  options: ObjectReplicationPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ObjectReplicationPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  objectReplicationPolicyId: string,
  options: ObjectReplicationPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/objectReplicationPolicies/{objectReplicationPolicyId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      objectReplicationPolicyId: objectReplicationPolicyId,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
): Promise<ObjectReplicationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return objectReplicationPolicyDeserializer(result.body);
}

/** Get the object replication policy of the storage account by policy ID. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  objectReplicationPolicyId: string,
  options: ObjectReplicationPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ObjectReplicationPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
    options,
  );
  return _getDeserialize(result);
}
