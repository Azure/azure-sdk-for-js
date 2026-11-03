// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  ChangeDataCaptureCapability,
  _ChangeDataCaptureCapabilityListResult,
  ChangeDataCaptureCapabilityCreateOrUpdate,
  ChangeDataCaptureCapabilityForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  changeDataCaptureCapabilityDeserializer,
  _changeDataCaptureCapabilityListResultDeserializer,
  changeDataCaptureCapabilityCreateOrUpdateSerializer,
  changeDataCaptureCapabilityForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChangeDataCaptureCapabilitiesListOptionalParams,
  ChangeDataCaptureCapabilitiesDeleteOptionalParams,
  ChangeDataCaptureCapabilitiesUpdateOptionalParams,
  ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams,
  ChangeDataCaptureCapabilitiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureCapabilitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_ChangeDataCaptureCapabilityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _changeDataCaptureCapabilityListResultDeserializer(result.body);
}

/** Lists the optional singleton change data capture capability for a cluster. The result contains zero or one item. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureCapabilitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChangeDataCaptureCapability> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureCapabilitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

/** Deletes the change data capture capability after all change data capture destinations and configurations have been removed. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureCapabilitiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
  options: ChangeDataCaptureCapabilitiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: changeDataCaptureCapabilityForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureCapability> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureCapabilityDeserializer(result.body);
}

/** Updates mutable change data capture capability properties. Omitted properties preserve their current values. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: ChangeDataCaptureCapabilityForPatchUpdateUpdate,
  options: ChangeDataCaptureCapabilitiesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: ChangeDataCaptureCapabilityCreateOrUpdate,
  options: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: changeDataCaptureCapabilityCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureCapability> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureCapabilityDeserializer(result.body);
}

/** Creates or replaces the singleton change data capture capability and reconciles shared engine prerequisites. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: ChangeDataCaptureCapabilityCreateOrUpdate,
  options: ChangeDataCaptureCapabilitiesCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, clusterName, resource, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ChangeDataCaptureCapability>, ChangeDataCaptureCapability>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureCapabilitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<ChangeDataCaptureCapability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureCapabilityDeserializer(result.body);
}

/** Gets the singleton change data capture capability for a HorizonDB cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureCapabilitiesGetOptionalParams = { requestOptions: {} },
): Promise<ChangeDataCaptureCapability> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
