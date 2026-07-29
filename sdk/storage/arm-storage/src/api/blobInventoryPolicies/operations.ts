// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type {
  BlobInventoryPolicy,
  BlobInventoryPolicyName,
  _ListBlobInventoryPolicy,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudErrorDeserializer,
  blobInventoryPolicySerializer,
  blobInventoryPolicyDeserializer,
  _listBlobInventoryPolicyDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BlobInventoryPoliciesListOptionalParams,
  BlobInventoryPoliciesDeleteOptionalParams,
  BlobInventoryPoliciesCreateOrUpdateOptionalParams,
  BlobInventoryPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobInventoryPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies{?api%2Dversion}",
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
): Promise<_ListBlobInventoryPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _listBlobInventoryPolicyDeserializer(result.body);
}

/** Gets the blob inventory policy associated with the specified storage account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BlobInventoryPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BlobInventoryPolicy> {
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
  blobInventoryPolicyName: BlobInventoryPolicyName,
  options: BlobInventoryPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies/{blobInventoryPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobInventoryPolicyName: blobInventoryPolicyName,
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the blob inventory policy associated with the specified storage account. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobInventoryPolicyName: BlobInventoryPolicyName,
  options: BlobInventoryPoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    blobInventoryPolicyName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobInventoryPolicyName: BlobInventoryPolicyName,
  properties: BlobInventoryPolicy,
  options: BlobInventoryPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies/{blobInventoryPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobInventoryPolicyName: blobInventoryPolicyName,
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
    body: blobInventoryPolicySerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobInventoryPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return blobInventoryPolicyDeserializer(result.body);
}

/** Sets the blob inventory policy to the specified storage account. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobInventoryPolicyName: BlobInventoryPolicyName,
  properties: BlobInventoryPolicy,
  options: BlobInventoryPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<BlobInventoryPolicy> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    blobInventoryPolicyName,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobInventoryPolicyName: BlobInventoryPolicyName,
  options: BlobInventoryPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/inventoryPolicies/{blobInventoryPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      blobInventoryPolicyName: blobInventoryPolicyName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BlobInventoryPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return blobInventoryPolicyDeserializer(result.body);
}

/** Gets the blob inventory policy associated with the specified storage account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  blobInventoryPolicyName: BlobInventoryPolicyName,
  options: BlobInventoryPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<BlobInventoryPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    blobInventoryPolicyName,
    options,
  );
  return _getDeserialize(result);
}
