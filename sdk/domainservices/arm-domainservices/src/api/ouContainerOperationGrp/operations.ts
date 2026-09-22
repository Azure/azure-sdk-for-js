// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainServicesResourceProviderContext as Client } from "../index.js";
import type { OuContainer, ContainerAccount, _OuContainerListResult } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  ouContainerDeserializer,
  containerAccountSerializer,
  _ouContainerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OuContainerOperationGrpListOptionalParams,
  OuContainerOperationGrpDeleteOptionalParams,
  OuContainerOperationGrpUpdateOptionalParams,
  OuContainerOperationGrpCreateOptionalParams,
  OuContainerOperationGrpGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: OuContainerOperationGrpListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}/ouContainer{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_OuContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _ouContainerListResultDeserializer(result.body);
}

/** The List of OuContainers in DomainService instance. */
export function list(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  options: OuContainerOperationGrpListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OuContainer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, domainServiceName, options),
    _listDeserialize,
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
  ouContainerName: string,
  options: OuContainerOperationGrpDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}/ouContainer/{ouContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      ouContainerName: ouContainerName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The Delete OuContainer operation deletes specified OuContainer. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  ouContainerName: string,
  options: OuContainerOperationGrpDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, domainServiceName, ouContainerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  ouContainerName: string,
  containerAccount: ContainerAccount,
  options: OuContainerOperationGrpUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}/ouContainer/{ouContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      ouContainerName: ouContainerName,
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
    body: containerAccountSerializer(containerAccount),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<OuContainer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return ouContainerDeserializer(result.body);
}

/** The Update OuContainer operation can be used to update the existing OuContainers. */
export function update(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  ouContainerName: string,
  containerAccount: ContainerAccount,
  options: OuContainerOperationGrpUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OuContainer>, OuContainer> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01-preview",
  }) as PollerLike<OperationState<OuContainer>, OuContainer>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  ouContainerName: string,
  containerAccount: ContainerAccount,
  options: OuContainerOperationGrpCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}/ouContainer/{ouContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      ouContainerName: ouContainerName,
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
    body: containerAccountSerializer(containerAccount),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<OuContainer> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return ouContainerDeserializer(result.body);
}

/** The Create OuContainer operation creates a new OuContainer under the specified Domain Service instance. */
export function create(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  ouContainerName: string,
  containerAccount: ContainerAccount,
  options: OuContainerOperationGrpCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OuContainer>, OuContainer> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        domainServiceName,
        ouContainerName,
        containerAccount,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01-preview",
  }) as PollerLike<OperationState<OuContainer>, OuContainer>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  ouContainerName: string,
  options: OuContainerOperationGrpGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AAD/domainServices/{domainServiceName}/ouContainer/{ouContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainServiceName: domainServiceName,
      ouContainerName: ouContainerName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OuContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return ouContainerDeserializer(result.body);
}

/** Get OuContainer in DomainService instance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  domainServiceName: string,
  ouContainerName: string,
  options: OuContainerOperationGrpGetOptionalParams = { requestOptions: {} },
): Promise<OuContainer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    domainServiceName,
    ouContainerName,
    options,
  );
  return _getDeserialize(result);
}
