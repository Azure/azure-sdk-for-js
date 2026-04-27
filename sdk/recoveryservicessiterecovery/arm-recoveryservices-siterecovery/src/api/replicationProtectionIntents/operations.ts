// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  ReplicationProtectionIntent,
  CreateProtectionIntentInput,
  _ReplicationProtectionIntentCollection,
} from "../../models/models.js";
import {
  replicationProtectionIntentDeserializer,
  createProtectionIntentInputSerializer,
  _replicationProtectionIntentCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationProtectionIntentsListOptionalParams,
  ReplicationProtectionIntentsCreateOptionalParams,
  ReplicationProtectionIntentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionIntentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationProtectionIntents{?api%2Dversion,skipToken,takeToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      skipToken: options?.skipToken,
      takeToken: options?.takeToken,
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
): Promise<_ReplicationProtectionIntentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _replicationProtectionIntentCollectionDeserializer(result.body);
}

/** Gets the list of ASR replication protection intent objects in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionIntentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReplicationProtectionIntent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  intentObjectName: string,
  input: CreateProtectionIntentInput,
  options: ReplicationProtectionIntentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationProtectionIntents/{intentObjectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      intentObjectName: intentObjectName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: createProtectionIntentInputSerializer(input),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionIntent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectionIntentDeserializer(result.body);
}

/** The operation to create an ASR replication protection intent item. */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  intentObjectName: string,
  input: CreateProtectionIntentInput,
  options: ReplicationProtectionIntentsCreateOptionalParams = { requestOptions: {} },
): Promise<ReplicationProtectionIntent> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceName,
    intentObjectName,
    input,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  intentObjectName: string,
  options: ReplicationProtectionIntentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationProtectionIntents/{intentObjectName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      intentObjectName: intentObjectName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<ReplicationProtectionIntent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectionIntentDeserializer(result.body);
}

/** Gets the details of an ASR replication protection intent. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  intentObjectName: string,
  options: ReplicationProtectionIntentsGetOptionalParams = { requestOptions: {} },
): Promise<ReplicationProtectionIntent> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    intentObjectName,
    options,
  );
  return _getDeserialize(result);
}
