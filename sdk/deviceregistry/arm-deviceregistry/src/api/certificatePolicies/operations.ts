// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext as Client } from "../index.js";
import type {
  CertificatePolicy,
  CertificatePolicyUpdate,
  _CertificatePolicyListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  certificatePolicySerializer,
  certificatePolicyDeserializer,
  certificatePolicyUpdateSerializer,
  _certificatePolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CertificatePoliciesListByCertificateAuthorityOptionalParams,
  CertificatePoliciesUpdateOptionalParams,
  CertificatePoliciesDeleteOptionalParams,
  CertificatePoliciesCreateOrReplaceOptionalParams,
  CertificatePoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByCertificateAuthoritySend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificatePoliciesListByCertificateAuthorityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}/certificatePolicies{?api%2Dversion}",
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

export async function _listByCertificateAuthorityDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificatePolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _certificatePolicyListResultDeserializer(result.body);
}

/** List CertificatePolicy resources by CertificateAuthority */
export function listByCertificateAuthority(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  options: CertificatePoliciesListByCertificateAuthorityOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificatePolicy> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByCertificateAuthoritySend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        options,
      ),
    _listByCertificateAuthorityDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  properties: CertificatePolicyUpdate,
  options: CertificatePoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}/certificatePolicies/{certificatePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      certificatePolicyName: certificatePolicyName,
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
    body: certificatePolicyUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificatePolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificatePolicyDeserializer(result.body);
}

/** Update a CertificatePolicy */
export function update(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  properties: CertificatePolicyUpdate,
  options: CertificatePoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CertificatePolicy>, CertificatePolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        certificatePolicyName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<CertificatePolicy>, CertificatePolicy>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  options: CertificatePoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}/certificatePolicies/{certificatePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      certificatePolicyName: certificatePolicyName,
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

/** Delete a CertificatePolicy */
export function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  options: CertificatePoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        certificatePolicyName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  resource: CertificatePolicy,
  options: CertificatePoliciesCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}/certificatePolicies/{certificatePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      certificatePolicyName: certificatePolicyName,
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
    body: certificatePolicySerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificatePolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificatePolicyDeserializer(result.body);
}

/** Create a CertificatePolicy */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  resource: CertificatePolicy,
  options: CertificatePoliciesCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CertificatePolicy>, CertificatePolicy> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        namespaceName,
        certificateAuthorityName,
        certificatePolicyName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01",
  }) as PollerLike<OperationState<CertificatePolicy>, CertificatePolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  options: CertificatePoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/certificateAuthorities/{certificateAuthorityName}/certificatePolicies/{certificatePolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      certificateAuthorityName: certificateAuthorityName,
      certificatePolicyName: certificatePolicyName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CertificatePolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificatePolicyDeserializer(result.body);
}

/** Get a CertificatePolicy */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  certificateAuthorityName: string,
  certificatePolicyName: string,
  options: CertificatePoliciesGetOptionalParams = { requestOptions: {} },
): Promise<CertificatePolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    namespaceName,
    certificateAuthorityName,
    certificatePolicyName,
    options,
  );
  return _getDeserialize(result);
}
