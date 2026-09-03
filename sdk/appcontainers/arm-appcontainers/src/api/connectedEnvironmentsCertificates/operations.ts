// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Certificate,
  certificateSerializer,
  certificateDeserializer,
  CertificatePatch,
  certificatePatchSerializer,
  _CertificateCollection,
  _certificateCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectedEnvironmentsCertificatesListOptionalParams,
  ConnectedEnvironmentsCertificatesDeleteOptionalParams,
  ConnectedEnvironmentsCertificatesUpdateOptionalParams,
  ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsCertificatesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsCertificatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<_CertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _certificateCollectionDeserializer(result.body);
}

/** Get the Certificates in a given connected environment. */
export function list(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsCertificatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Certificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, connectedEnvironmentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  options: ConnectedEnvironmentsCertificatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

/** Deletes the specified Certificate. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  options: ConnectedEnvironmentsCertificatesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, connectedEnvironmentName, certificateName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  certificateEnvelope: CertificatePatch,
  options: ConnectedEnvironmentsCertificatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificatePatchSerializer(certificateEnvelope),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Certificate> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Patches a certificate. Currently only patching of tags is supported */
export function update(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  certificateEnvelope: CertificatePatch,
  options: ConnectedEnvironmentsCertificatesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Certificate>, Certificate> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        certificateEnvelope,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<Certificate>, Certificate>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  options: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.certificateEnvelope
      ? options?.certificateEnvelope
      : certificateSerializer(options?.certificateEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Certificate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Create or Update a Certificate. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  options: ConnectedEnvironmentsCertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Certificate>, Certificate> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        certificateName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<Certificate>, Certificate>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  options: ConnectedEnvironmentsCertificatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Certificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Get the specified Certificate. */
export async function get(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  certificateName: string,
  options: ConnectedEnvironmentsCertificatesGetOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _getSend(
    context,
    resourceGroupName,
    connectedEnvironmentName,
    certificateName,
    options,
  );
  return _getDeserialize(result);
}
