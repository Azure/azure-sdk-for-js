// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  EncryptionScope,
  encryptionScopeSerializer,
  encryptionScopeDeserializer,
  _EncryptionScopeListResult,
  _encryptionScopeListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EncryptionScopesListOptionalParams,
  EncryptionScopesPatchOptionalParams,
  EncryptionScopesPutOptionalParams,
  EncryptionScopesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: EncryptionScopesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes{?api%2Dversion,%24maxpagesize,%24filter,%24include}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      "%24maxpagesize": options?.maxpagesize,
      "%24filter": options?.filter,
      "%24include": options?.include,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_EncryptionScopeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _encryptionScopeListResultDeserializer(result.body);
}

/** Lists all the encryption scopes available under the specified storage account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: EncryptionScopesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EncryptionScope> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  encryptionScopeName: string,
  encryptionScope: EncryptionScope,
  options: EncryptionScopesPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      encryptionScopeName: encryptionScopeName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: encryptionScopeSerializer(encryptionScope),
    });
}

export async function _patchDeserialize(result: PathUncheckedResponse): Promise<EncryptionScope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return encryptionScopeDeserializer(result.body);
}

/** Update encryption scope properties as specified in the request body. Update fails if the specified encryption scope does not already exist. */
export async function patch(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  encryptionScopeName: string,
  encryptionScope: EncryptionScope,
  options: EncryptionScopesPatchOptionalParams = { requestOptions: {} },
): Promise<EncryptionScope> {
  const result = await _patchSend(
    context,
    resourceGroupName,
    accountName,
    encryptionScopeName,
    encryptionScope,
    options,
  );
  return _patchDeserialize(result);
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  encryptionScopeName: string,
  encryptionScope: EncryptionScope,
  options: EncryptionScopesPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      encryptionScopeName: encryptionScopeName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
      body: encryptionScopeSerializer(encryptionScope),
    });
}

export async function _putDeserialize(result: PathUncheckedResponse): Promise<EncryptionScope> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return encryptionScopeDeserializer(result.body);
}

/** Synchronously creates or updates an encryption scope under the specified storage account. If an encryption scope is already created and a subsequent request is issued with different properties, the encryption scope properties will be updated per the specified request. */
export async function put(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  encryptionScopeName: string,
  encryptionScope: EncryptionScope,
  options: EncryptionScopesPutOptionalParams = { requestOptions: {} },
): Promise<EncryptionScope> {
  const result = await _putSend(
    context,
    resourceGroupName,
    accountName,
    encryptionScopeName,
    encryptionScope,
    options,
  );
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  encryptionScopeName: string,
  options: EncryptionScopesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/encryptionScopes/{encryptionScopeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      encryptionScopeName: encryptionScopeName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EncryptionScope> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return encryptionScopeDeserializer(result.body);
}

/** Returns the properties for the specified encryption scope. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  encryptionScopeName: string,
  options: EncryptionScopesGetOptionalParams = { requestOptions: {} },
): Promise<EncryptionScope> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    encryptionScopeName,
    options,
  );
  return _getDeserialize(result);
}
