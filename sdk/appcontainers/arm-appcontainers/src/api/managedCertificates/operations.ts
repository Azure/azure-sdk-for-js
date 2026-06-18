// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ManagedCertificate,
  managedCertificateSerializer,
  managedCertificateDeserializer,
  ManagedCertificatePatch,
  managedCertificatePatchSerializer,
  _ManagedCertificateCollection,
  _managedCertificateCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ManagedCertificatesListOptionalParams,
  ManagedCertificatesDeleteOptionalParams,
  ManagedCertificatesUpdateOptionalParams,
  ManagedCertificatesCreateOrUpdateOptionalParams,
  ManagedCertificatesGetOptionalParams,
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
  environmentName: string,
  options: ManagedCertificatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<_ManagedCertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _managedCertificateCollectionDeserializer(result.body);
}

/** Get the Managed Certificates in a given managed environment. */
export function list(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedCertificatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedCertificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, environmentName, options),
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
  environmentName: string,
  managedCertificateName: string,
  options: ManagedCertificatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      managedCertificateName: managedCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified Managed Certificate. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  managedCertificateName: string,
  options: ManagedCertificatesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    environmentName,
    managedCertificateName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  managedCertificateName: string,
  managedCertificateEnvelope: ManagedCertificatePatch,
  options: ManagedCertificatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      managedCertificateName: managedCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
      body: managedCertificatePatchSerializer(managedCertificateEnvelope),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedCertificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedCertificateDeserializer(result.body);
}

/** Patches a managed certificate. Oly patching of tags is supported */
export async function update(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  managedCertificateName: string,
  managedCertificateEnvelope: ManagedCertificatePatch,
  options: ManagedCertificatesUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagedCertificate> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    environmentName,
    managedCertificateName,
    managedCertificateEnvelope,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  managedCertificateName: string,
  options: ManagedCertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      managedCertificateName: managedCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
      body: !options?.managedCertificateEnvelope
        ? options?.managedCertificateEnvelope
        : managedCertificateSerializer(options?.managedCertificateEnvelope),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedCertificate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedCertificateDeserializer(result.body);
}

/** Create or Update a Managed Certificate. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  managedCertificateName: string,
  options: ManagedCertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedCertificate>, ManagedCertificate> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        environmentName,
        managedCertificateName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ManagedCertificate>, ManagedCertificate>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  managedCertificateName: string,
  options: ManagedCertificatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      managedCertificateName: managedCertificateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedCertificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedCertificateDeserializer(result.body);
}

/** Get the specified Managed Certificate. */
export async function get(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  managedCertificateName: string,
  options: ManagedCertificatesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedCertificate> {
  const result = await _getSend(
    context,
    resourceGroupName,
    environmentName,
    managedCertificateName,
    options,
  );
  return _getDeserialize(result);
}
