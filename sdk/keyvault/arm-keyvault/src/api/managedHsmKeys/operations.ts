// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type {
  ManagedHsmKey,
  ManagedHsmKeyCreateParameters,
  _ManagedHsmKeyListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  managedHsmKeyDeserializer,
  managedHsmKeyCreateParametersSerializer,
  _managedHsmKeyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedHsmKeysListVersionsOptionalParams,
  ManagedHsmKeysGetVersionOptionalParams,
  ManagedHsmKeysListOptionalParams,
  ManagedHsmKeysCreateIfNotExistOptionalParams,
  ManagedHsmKeysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listVersionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  options: ManagedHsmKeysListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/keys/{keyName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
): Promise<_ManagedHsmKeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _managedHsmKeyListResultDeserializer(result.body);
}

/** Lists the keys in the specified managed HSM. */
export function listVersions(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  options: ManagedHsmKeysListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedHsmKey> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, resourceGroupName, name, keyName, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getVersionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  keyVersion: string,
  options: ManagedHsmKeysGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/keys/{keyName}/versions/{keyVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedHsmKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return managedHsmKeyDeserializer(result.body);
}

/** Gets the specified version of the specified key in the specified managed HSM. */
export async function getVersion(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  keyVersion: string,
  options: ManagedHsmKeysGetVersionOptionalParams = { requestOptions: {} },
): Promise<ManagedHsmKey> {
  const result = await _getVersionSend(
    context,
    resourceGroupName,
    name,
    keyName,
    keyVersion,
    options,
  );
  return _getVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedHsmKeysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/keys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedHsmKeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _managedHsmKeyListResultDeserializer(result.body);
}

/** Lists the keys in the specified managed HSM. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedHsmKeysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedHsmKey> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _createIfNotExistSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  parameters: ManagedHsmKeyCreateParameters,
  options: ManagedHsmKeysCreateIfNotExistOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
    body: managedHsmKeyCreateParametersSerializer(parameters),
  });
}

export async function _createIfNotExistDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedHsmKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return managedHsmKeyDeserializer(result.body);
}

/** Creates the first version of a new key if it does not exist. If it already exists, then the existing key is returned without any write operations being performed. This API does not create subsequent versions, and does not update existing keys. */
export async function createIfNotExist(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  parameters: ManagedHsmKeyCreateParameters,
  options: ManagedHsmKeysCreateIfNotExistOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedHsmKey> {
  const result = await _createIfNotExistSend(
    context,
    resourceGroupName,
    name,
    keyName,
    parameters,
    options,
  );
  return _createIfNotExistDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  options: ManagedHsmKeysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/keys/{keyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedHsmKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return managedHsmKeyDeserializer(result.body);
}

/** Gets the current version of the specified key from the specified managed HSM. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  keyName: string,
  options: ManagedHsmKeysGetOptionalParams = { requestOptions: {} },
): Promise<ManagedHsmKey> {
  const result = await _getSend(context, resourceGroupName, name, keyName, options);
  return _getDeserialize(result);
}
