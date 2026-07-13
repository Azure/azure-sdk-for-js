// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  DevCenterEncryptionSet,
  EncryptionSetUpdate,
  _EncryptionSetListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  devCenterEncryptionSetSerializer,
  devCenterEncryptionSetDeserializer,
  encryptionSetUpdateSerializer,
  _encryptionSetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EncryptionSetsListOptionalParams,
  EncryptionSetsDeleteOptionalParams,
  EncryptionSetsUpdateOptionalParams,
  EncryptionSetsCreateOrUpdateOptionalParams,
  EncryptionSetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: EncryptionSetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24top": options?.top,
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
): Promise<_EncryptionSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _encryptionSetListResultDeserializer(result.body);
}

/** Lists all encryption sets in the devcenter. */
export function list(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  options: EncryptionSetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevCenterEncryptionSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, devCenterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  options: EncryptionSetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets/{encryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      encryptionSetName: encryptionSetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

/** Deletes a devcenter encryption set. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  options: EncryptionSetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, devCenterName, encryptionSetName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  body: EncryptionSetUpdate,
  options: EncryptionSetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets/{encryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      encryptionSetName: encryptionSetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: encryptionSetUpdateSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DevCenterEncryptionSet> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return devCenterEncryptionSetDeserializer(result.body);
}

/** Partially updates a devcenter encryption set. */
export function update(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  body: EncryptionSetUpdate,
  options: EncryptionSetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, devCenterName, encryptionSetName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  body: DevCenterEncryptionSet,
  options: EncryptionSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets/{encryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      encryptionSetName: encryptionSetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: devCenterEncryptionSetSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DevCenterEncryptionSet> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return devCenterEncryptionSetDeserializer(result.body);
}

/** Creates or updates a devcenter encryption set resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  body: DevCenterEncryptionSet,
  options: EncryptionSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        devCenterName,
        encryptionSetName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<DevCenterEncryptionSet>, DevCenterEncryptionSet>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  options: EncryptionSetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets/{encryptionSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      encryptionSetName: encryptionSetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<DevCenterEncryptionSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return devCenterEncryptionSetDeserializer(result.body);
}

/** Gets a devcenter encryption set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  encryptionSetName: string,
  options: EncryptionSetsGetOptionalParams = { requestOptions: {} },
): Promise<DevCenterEncryptionSet> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    encryptionSetName,
    options,
  );
  return _getDeserialize(result);
}
