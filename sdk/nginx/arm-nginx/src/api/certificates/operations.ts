// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext as Client } from "../index.js";
import type { NginxCertificate, _NginxCertificateListResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  nginxCertificateSerializer,
  nginxCertificateDeserializer,
  _nginxCertificateListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CertificatesListOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: CertificatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/certificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NginxCertificateListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _nginxCertificateListResponseDeserializer(result.body);
}

/** List all certificates of given NGINX deployment */
export function list(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: CertificatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NginxCertificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, deploymentName, options),
    _listDeserialize,
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
  deploymentName: string,
  certificateName: string,
  options: CertificatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a certificate from the NGINX deployment */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  certificateName: string,
  options: CertificatesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, deploymentName, certificateName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  certificateName: string,
  options: CertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"] ? options["body"] : nginxCertificateSerializer(options["body"]),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NginxCertificate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nginxCertificateDeserializer(result.body);
}

/** Create or update the NGINX certificates for given NGINX deployment */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  certificateName: string,
  options: CertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NginxCertificate>, NginxCertificate> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, deploymentName, certificateName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<NginxCertificate>, NginxCertificate>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  certificateName: string,
  options: CertificatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      certificateName: certificateName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NginxCertificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nginxCertificateDeserializer(result.body);
}

/** Get a certificate of given NGINX deployment */
export async function get(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  certificateName: string,
  options: CertificatesGetOptionalParams = { requestOptions: {} },
): Promise<NginxCertificate> {
  const result = await _getSend(
    context,
    resourceGroupName,
    deploymentName,
    certificateName,
    options,
  );
  return _getDeserialize(result);
}
