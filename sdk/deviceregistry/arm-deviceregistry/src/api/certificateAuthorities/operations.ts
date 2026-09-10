// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext as Client } from "../index.js";
import type {
  CertificateAuthority,
  CertificateAuthorityUpdate,
  _CertificateAuthorityListResult,
  ActivateCertificateAuthorityRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  certificateAuthoritySerializer,
  certificateAuthorityDeserializer,
  certificateAuthorityUpdateSerializer,
  _certificateAuthorityListResultDeserializer,
  activateCertificateAuthorityRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CertificateAuthoritiesRevokeAndRotateOptionalParams,
  CertificateAuthoritiesActivateOptionalParams,
  CertificateAuthoritiesListByNamespaceOptionalParams,
  CertificateAuthoritiesUpdateOptionalParams,
  CertificateAuthoritiesDeleteOptionalParams,
  CertificateAuthoritiesCreateOrReplaceOptionalParams,
  CertificateAuthoritiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revokeAndRotateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificateAuthoritiesRevokeAndRotateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}/revokeAndRotate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeAndRotateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Revokes a Certificate Authority of type `ICA` and issuer type `Microsoft`. If the Certificate Authority is an invalid type, the API responds with HTTP 400. */
export function revokeAndRotate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificateAuthoritiesRevokeAndRotateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _revokeAndRotateDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _revokeAndRotateSend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _activateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  body: ActivateCertificateAuthorityRequest,
  options: CertificateAuthoritiesActivateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}/activate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: activateCertificateAuthorityRequestSerializer(body),
  });
}

export async function _activateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Activates a Certificate Authority of type `ICA` and issuer type `External`. If the Certificate Authority is an invalid type, the API responds with HTTP 400. */
export function activate(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  body: ActivateCertificateAuthorityRequest,
  options: CertificateAuthoritiesActivateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _activateDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _activateSend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByNamespaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: CertificateAuthoritiesListByNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _listByNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateAuthorityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _certificateAuthorityListResultDeserializer(result.body);
}

/** List CertificateAuthority resources by Namespace */
export function listByNamespace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: CertificateAuthoritiesListByNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateAuthority> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNamespaceSend(context, resourceGroupName, namespaceName, options),
    _listByNamespaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  properties: CertificateAuthorityUpdate,
  options: CertificateAuthoritiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificateAuthorityUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateAuthority> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificateAuthorityDeserializer(result.body);
}

/** Update a CertificateAuthority */
export function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  properties: CertificateAuthorityUpdate,
  options: CertificateAuthoritiesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CertificateAuthority>, CertificateAuthority> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<CertificateAuthority>, CertificateAuthority>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificateAuthoritiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a CertificateAuthority */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificateAuthoritiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, namespaceName, certificateAuthorityName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  resource: CertificateAuthority,
  options: CertificateAuthoritiesCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificateAuthoritySerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateAuthority> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificateAuthorityDeserializer(result.body);
}

/** Create a CertificateAuthority */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  resource: CertificateAuthority,
  options: CertificateAuthoritiesCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CertificateAuthority>, CertificateAuthority> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<CertificateAuthority>, CertificateAuthority>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificateAuthoritiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
): Promise<CertificateAuthority> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificateAuthorityDeserializer(result.body);
}

/** Get a CertificateAuthority */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificateAuthoritiesGetOptionalParams = { requestOptions: {} },
): Promise<CertificateAuthority> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    certificateAuthorityName,
    options,
  );
  return _getDeserialize(result);
}
