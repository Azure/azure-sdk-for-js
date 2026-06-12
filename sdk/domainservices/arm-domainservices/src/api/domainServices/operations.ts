// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainServicesResourceProviderContext as Client } from "../index.js";
import type {
  DomainService,
  _DomainServiceListResult,
  UnsuspendDomainServiceResponse,
} from "../../models/models.js";
import {
  domainServiceSerializer,
  domainServiceDeserializer,
  cloudErrorDeserializer,
  _domainServiceListResultDeserializer,
  unsuspendDomainServiceResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DomainServicesUnsuspendOptionalParams,
  DomainServicesListOptionalParams,
  DomainServicesListByResourceGroupOptionalParams,
  DomainServicesDeleteOptionalParams,
  DomainServicesUpdateOptionalParams,
  DomainServicesCreateOrUpdateOptionalParams,
  DomainServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _unsuspendSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: DomainServicesUnsuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}/unsuspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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

export async function _unsuspendDeserialize(
  result: PathUncheckedResponse,
): Promise<UnsuspendDomainServiceResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return unsuspendDomainServiceResponseDeserializer(result.body);
}

/** Unsuspend a suspended Domain Service resource. */
export async function unsuspend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: DomainServicesUnsuspendOptionalParams = { requestOptions: {} },
): Promise<UnsuspendDomainServiceResponse> {
  const result = await _unsuspendSend(context, resourceGroupName, domainServiceName, options);
  return _unsuspendDeserialize(result);
}

export function _listSend(
  context: Client,
  options: DomainServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AAD/domainServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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
): Promise<_DomainServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _domainServiceListResultDeserializer(result.body);
}

/** The List Domain Services in Subscription operation lists all the domain services available under the given subscription (and across all resource groups within that subscription). */
export function list(
  context: Client,
  options: DomainServicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DomainService> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DomainServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DomainServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _domainServiceListResultDeserializer(result.body);
}

/** The List Domain Services in Resource Group operation lists all the domain services available under the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DomainServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DomainService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: DomainServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The Delete Domain Service operation deletes an existing Domain Service. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: DomainServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, domainServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  domainService: DomainService,
  options: DomainServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainServiceSerializer(domainService),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DomainService> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return domainServiceDeserializer(result.body);
}

/** The Update Domain Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body. */
export function update(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  domainService: DomainService,
  options: DomainServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DomainService>, DomainService> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, domainServiceName, domainService, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01-preview",
  }) as PollerLike<OperationState<DomainService>, DomainService>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  domainService: DomainService,
  options: DomainServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainServiceSerializer(domainService),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return domainServiceDeserializer(result.body);
}

/** The Create Domain Service operation creates a new domain service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  domainService: DomainService,
  options: DomainServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DomainService>, DomainService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, domainServiceName, domainService, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01-preview",
  }) as PollerLike<OperationState<DomainService>, DomainService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: DomainServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DomainService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return domainServiceDeserializer(result.body);
}

/** The Get Domain Service operation retrieves a json representation of the Domain Service. */
export async function get(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: DomainServicesGetOptionalParams = { requestOptions: {} },
): Promise<DomainService> {
  const result = await _getSend(context, resourceGroupName, domainServiceName, options);
  return _getDeserialize(result);
}
