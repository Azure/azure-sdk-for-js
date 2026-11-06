// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  ChangeDataCaptureDestination,
  _ChangeDataCaptureDestinationListResult,
  ActivateChangeDataCaptureIdentityRequest,
  ActivateChangeDataCaptureIdentityResult,
  ChangeDataCaptureDestinationCreateOrUpdate,
  ChangeDataCaptureDestinationForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  changeDataCaptureDestinationDeserializer,
  _changeDataCaptureDestinationListResultDeserializer,
  activateChangeDataCaptureIdentityRequestSerializer,
  activateChangeDataCaptureIdentityResultDeserializer,
  changeDataCaptureDestinationCreateOrUpdateSerializer,
  changeDataCaptureDestinationForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChangeDataCaptureDestinationsActivateIdentityOptionalParams,
  ChangeDataCaptureDestinationsListOptionalParams,
  ChangeDataCaptureDestinationsDeleteOptionalParams,
  ChangeDataCaptureDestinationsUpdateOptionalParams,
  ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams,
  ChangeDataCaptureDestinationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _activateIdentitySend(
  context: Client,
  resourceGroupName: string,
  ifMatch: string,
  clusterName: string,
  destinationName: string,
  body: ActivateChangeDataCaptureIdentityRequest,
  options: ChangeDataCaptureDestinationsActivateIdentityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/activateIdentity{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: activateChangeDataCaptureIdentityRequestSerializer(body),
  });
}

export async function _activateIdentityDeserialize(
  result: PathUncheckedResponse,
): Promise<ActivateChangeDataCaptureIdentityResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return activateChangeDataCaptureIdentityResultDeserializer(result.body);
}

/** Atomically activates a validated identity assignment for this destination. If-Match is evaluated against the destination entity tag. Activating the already-active assignment succeeds idempotently. */
export function activateIdentity(
  context: Client,
  resourceGroupName: string,
  ifMatch: string,
  clusterName: string,
  destinationName: string,
  body: ActivateChangeDataCaptureIdentityRequest,
  options: ChangeDataCaptureDestinationsActivateIdentityOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ActivateChangeDataCaptureIdentityResult>,
  ActivateChangeDataCaptureIdentityResult
> {
  return getLongRunningPoller(context, _activateIdentityDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _activateIdentitySend(
        context,
        resourceGroupName,
        ifMatch,
        clusterName,
        destinationName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<
    OperationState<ActivateChangeDataCaptureIdentityResult>,
    ActivateChangeDataCaptureIdentityResult
  >;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureDestinationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations{?api%2Dversion}",
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
): Promise<_ChangeDataCaptureDestinationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _changeDataCaptureDestinationListResultDeserializer(result.body);
}

/** Lists change data capture destinations in a HorizonDB cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ChangeDataCaptureDestinationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChangeDataCaptureDestination> {
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
  destinationName: string,
  options: ChangeDataCaptureDestinationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
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

/** Deletes a change data capture destination after all referencing configurations and identity assignments have been removed. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  options: ChangeDataCaptureDestinationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, destinationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
  options: ChangeDataCaptureDestinationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
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
    body: changeDataCaptureDestinationForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureDestination> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureDestinationDeserializer(result.body);
}

/** Updates mutable change data capture destination properties. Omitted properties preserve their current values. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  properties: ChangeDataCaptureDestinationForPatchUpdateUpdate,
  options: ChangeDataCaptureDestinationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, destinationName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  resource: ChangeDataCaptureDestinationCreateOrUpdate,
  options: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
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
    body: changeDataCaptureDestinationCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureDestination> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureDestinationDeserializer(result.body);
}

/** Creates or replaces a Microsoft Fabric change data capture destination. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  resource: ChangeDataCaptureDestinationCreateOrUpdate,
  options: ChangeDataCaptureDestinationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<ChangeDataCaptureDestination>, ChangeDataCaptureDestination>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  options: ChangeDataCaptureDestinationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
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
): Promise<ChangeDataCaptureDestination> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return changeDataCaptureDestinationDeserializer(result.body);
}

/** Gets a change data capture destination. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  options: ChangeDataCaptureDestinationsGetOptionalParams = { requestOptions: {} },
): Promise<ChangeDataCaptureDestination> {
  const result = await _getSend(context, resourceGroupName, clusterName, destinationName, options);
  return _getDeserialize(result);
}
