// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext as Client } from "../index.js";
import type {
  OperationResource,
  _DeletedVaultList,
  DeletedVault,
  DeletedVaultUndeleteInput,
} from "../../models/models.js";
import {
  operationResourceDeserializer,
  cloudErrorDeserializer,
  errorResponseDeserializer,
  _deletedVaultListDeserializer,
  deletedVaultDeserializer,
  deletedVaultUndeleteInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeletedVaultsGetOperationStatusOptionalParams,
  DeletedVaultsUndeleteOptionalParams,
  DeletedVaultsGetOptionalParams,
  DeletedVaultsListBySubscriptionIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationStatusSend(
  context: Client,
  location: string,
  deletedVaultName: string,
  operationId: string,
  options: DeletedVaultsGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults/{deletedVaultName}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      deletedVaultName: deletedVaultName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return operationResourceDeserializer(result.body);
}

/** Get the operation status of a deleted vault. */
export async function getOperationStatus(
  context: Client,
  location: string,
  deletedVaultName: string,
  operationId: string,
  options: DeletedVaultsGetOperationStatusOptionalParams = {
    requestOptions: {},
  },
): Promise<OperationResource> {
  const result = await _getOperationStatusSend(
    context,
    location,
    deletedVaultName,
    operationId,
    options,
  );
  return _getOperationStatusDeserialize(result);
}

export function _undeleteSend(
  context: Client,
  location: string,
  deletedVaultName: string,
  body: DeletedVaultUndeleteInput,
  options: DeletedVaultsUndeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults/{deletedVaultName}/undelete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      deletedVaultName: deletedVaultName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: deletedVaultUndeleteInputSerializer(body),
  });
}

export async function _undeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Start undelete of a deleted vault. */
export function undelete(
  context: Client,
  location: string,
  deletedVaultName: string,
  body: DeletedVaultUndeleteInput,
  options: DeletedVaultsUndeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _undeleteDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _undeleteSend(context, location, deletedVaultName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  location: string,
  deletedVaultName: string,
  options: DeletedVaultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults/{deletedVaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      deletedVaultName: deletedVaultName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeletedVault> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return deletedVaultDeserializer(result.body);
}

/** Get a specific deleted vault. */
export async function get(
  context: Client,
  location: string,
  deletedVaultName: string,
  options: DeletedVaultsGetOptionalParams = { requestOptions: {} },
): Promise<DeletedVault> {
  const result = await _getSend(context, location, deletedVaultName, options);
  return _getDeserialize(result);
}

export function _listBySubscriptionIdSend(
  context: Client,
  location: string,
  options: DeletedVaultsListBySubscriptionIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/deletedVaults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedVaultList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _deletedVaultListDeserializer(result.body);
}

/** List deleted vaults in a subscription. */
export function listBySubscriptionId(
  context: Client,
  location: string,
  options: DeletedVaultsListBySubscriptionIdOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DeletedVault> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdSend(context, location, options),
    _listBySubscriptionIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
