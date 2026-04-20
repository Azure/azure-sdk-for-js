// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedServiceIdentityContext as Client } from "../index.js";
import type {
  FederatedIdentityCredential,
  _FederatedIdentityCredentialsListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  federatedIdentityCredentialSerializer,
  federatedIdentityCredentialDeserializer,
  _federatedIdentityCredentialsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FederatedIdentityCredentialsListOptionalParams,
  FederatedIdentityCredentialsDeleteOptionalParams,
  FederatedIdentityCredentialsCreateOrUpdateOptionalParams,
  FederatedIdentityCredentialsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: FederatedIdentityCredentialsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials{?api%2Dversion,%24top,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
      "%24top": options?.top,
      "%24skiptoken": options?.skiptoken,
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
): Promise<_FederatedIdentityCredentialsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _federatedIdentityCredentialsListResultDeserializer(result.body);
}

/** Lists all the federated identity credentials under the specified user assigned identity. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: FederatedIdentityCredentialsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FederatedIdentityCredential> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-31-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  federatedIdentityCredentialResourceName: string,
  options: FederatedIdentityCredentialsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials/{federatedIdentityCredentialResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      federatedIdentityCredentialResourceName: federatedIdentityCredentialResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the federated identity credential. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  federatedIdentityCredentialResourceName: string,
  options: FederatedIdentityCredentialsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    resourceName,
    federatedIdentityCredentialResourceName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  federatedIdentityCredentialResourceName: string,
  parameters: FederatedIdentityCredential,
  options: FederatedIdentityCredentialsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials/{federatedIdentityCredentialResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      federatedIdentityCredentialResourceName: federatedIdentityCredentialResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: federatedIdentityCredentialSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FederatedIdentityCredential> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return federatedIdentityCredentialDeserializer(result.body);
}

/** Create or update a federated identity credential under the specified user assigned identity. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  federatedIdentityCredentialResourceName: string,
  parameters: FederatedIdentityCredential,
  options: FederatedIdentityCredentialsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<FederatedIdentityCredential> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    federatedIdentityCredentialResourceName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  federatedIdentityCredentialResourceName: string,
  options: FederatedIdentityCredentialsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials/{federatedIdentityCredentialResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      federatedIdentityCredentialResourceName: federatedIdentityCredentialResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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
): Promise<FederatedIdentityCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return federatedIdentityCredentialDeserializer(result.body);
}

/** Gets the federated identity credential. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  federatedIdentityCredentialResourceName: string,
  options: FederatedIdentityCredentialsGetOptionalParams = { requestOptions: {} },
): Promise<FederatedIdentityCredential> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    federatedIdentityCredentialResourceName,
    options,
  );
  return _getDeserialize(result);
}
