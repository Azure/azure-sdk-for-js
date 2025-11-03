// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type { Key, KeyCreateParameters, _KeyListResult } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  keyDeserializer,
  keyCreateParametersSerializer,
  _keyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  KeysListVersionsOptionalParams,
  KeysGetVersionOptionalParams,
  KeysListOptionalParams,
  KeysCreateIfNotExistOptionalParams,
  KeysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listVersionsSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  options: KeysListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/keys/{keyName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      keyName: keyName,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_KeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _keyListResultDeserializer(result.body);
}

/** Lists the keys in the specified key vault. */
export function listVersions(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  options: KeysListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Key> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, resourceGroupName, vaultName, keyName, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getVersionSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  keyVersion: string,
  options: KeysGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/keys/{keyName}/versions/{keyVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      keyName: keyName,
      keyVersion: keyVersion,
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

export async function _getVersionDeserialize(result: PathUncheckedResponse): Promise<Key> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return keyDeserializer(result.body);
}

/** Gets the specified version of the specified key in the specified key vault. */
export async function getVersion(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  keyVersion: string,
  options: KeysGetVersionOptionalParams = { requestOptions: {} },
): Promise<Key> {
  const result = await _getVersionSend(
    context,
    resourceGroupName,
    vaultName,
    keyName,
    keyVersion,
    options,
  );
  return _getVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: KeysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/keys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_KeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _keyListResultDeserializer(result.body);
}

/** Lists the keys in the specified key vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: KeysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Key> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _createIfNotExistSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  parameters: KeyCreateParameters,
  options: KeysCreateIfNotExistOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      keyName: keyName,
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
    body: keyCreateParametersSerializer(parameters),
  });
}

export async function _createIfNotExistDeserialize(result: PathUncheckedResponse): Promise<Key> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return keyDeserializer(result.body);
}

/** Creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys. */
export async function createIfNotExist(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  parameters: KeyCreateParameters,
  options: KeysCreateIfNotExistOptionalParams = { requestOptions: {} },
): Promise<Key> {
  const result = await _createIfNotExistSend(
    context,
    resourceGroupName,
    vaultName,
    keyName,
    parameters,
    options,
  );
  return _createIfNotExistDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  options: KeysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      keyName: keyName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Key> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return keyDeserializer(result.body);
}

/** Gets the current version of the specified key from the specified key vault. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  keyName: string,
  options: KeysGetOptionalParams = { requestOptions: {} },
): Promise<Key> {
  const result = await _getSend(context, resourceGroupName, vaultName, keyName, options);
  return _getDeserialize(result);
}
