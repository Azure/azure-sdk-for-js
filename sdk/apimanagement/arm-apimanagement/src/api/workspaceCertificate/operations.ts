// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  CertificateContract,
  CertificateCreateOrUpdateParameters,
  _CertificateCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  certificateContractDeserializer,
  certificateCreateOrUpdateParametersSerializer,
  _certificateCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceCertificateRefreshSecretOptionalParams,
  WorkspaceCertificateListByWorkspaceOptionalParams,
  WorkspaceCertificateDeleteOptionalParams,
  WorkspaceCertificateCreateOrUpdateOptionalParams,
  WorkspaceCertificateGetEntityTagOptionalParams,
  WorkspaceCertificateGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _refreshSecretSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  options: WorkspaceCertificateRefreshSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/certificates/{certificateId}/refreshSecret{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      certificateId: certificateId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _refreshSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return certificateContractDeserializer(result.body);
}

/** From KeyVault, Refresh the certificate being used for authentication with the backend. */
export async function refreshSecret(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  options: WorkspaceCertificateRefreshSecretOptionalParams = { requestOptions: {} },
): Promise<CertificateContract> {
  const result = await _refreshSecretSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    certificateId,
    options,
  );
  return _refreshSecretDeserialize(result);
}

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  options: WorkspaceCertificateListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/certificates{?api%2Dversion,%24filter,%24top,%24skip,isKeyVaultRefreshFailed}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      isKeyVaultRefreshFailed: options?.isKeyVaultRefreshFailed,
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

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _certificateCollectionDeserializer(result.body);
}

/** Lists a collection of all certificates in the specified workspace. */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  options: WorkspaceCertificateListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, serviceName, workspaceId, options),
    _listByWorkspaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  ifMatch: string,
  options: WorkspaceCertificateDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/certificates/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      certificateId: certificateId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes specific certificate. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  ifMatch: string,
  options: WorkspaceCertificateDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    certificateId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  parameters: CertificateCreateOrUpdateParameters,
  options: WorkspaceCertificateCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/certificates/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      certificateId: certificateId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: certificateCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return certificateContractDeserializer(result.body);
}

/** Creates or updates the certificate being used for authentication with the backend. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  parameters: CertificateCreateOrUpdateParameters,
  options: WorkspaceCertificateCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CertificateContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    certificateId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  options: WorkspaceCertificateGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/certificates/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      certificateId: certificateId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state (Etag) version of the certificate specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  options: WorkspaceCertificateGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    certificateId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  options: WorkspaceCertificateGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/certificates/{certificateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      certificateId: certificateId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CertificateContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return certificateContractDeserializer(result.body);
}

/** Gets the details of the certificate specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  certificateId: string,
  options: WorkspaceCertificateGetOptionalParams = { requestOptions: {} },
): Promise<CertificateContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceId,
    certificateId,
    options,
  );
  return _getDeserialize(result);
}
