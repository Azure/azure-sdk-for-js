// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type { Secret, _SecretListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  secretSerializer,
  secretDeserializer,
  _secretListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecretsListByProfileOptionalParams,
  SecretsDeleteOptionalParams,
  SecretsCreateOptionalParams,
  SecretsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByProfileSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: SecretsListByProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listByProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecretListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _secretListResultDeserializer(result.body);
}

/** Lists existing AzureFrontDoor secrets. */
export function listByProfile(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: SecretsListByProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Secret> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProfileSend(context, resourceGroupName, profileName, options),
    _listByProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  secretName: string,
  options: SecretsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets/{secretName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      secretName: secretName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing Secret within profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  secretName: string,
  options: SecretsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, secretName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  secretName: string,
  secret: Secret,
  options: SecretsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets/{secretName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      secretName: secretName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: secretSerializer(secret),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Secret> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return secretDeserializer(result.body);
}

/** Creates a new Secret within the specified profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  secretName: string,
  secret: Secret,
  options: SecretsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Secret>, Secret> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, secretName, secret, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Secret>, Secret>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  secretName: string,
  options: SecretsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets/{secretName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      secretName: secretName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Secret> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return secretDeserializer(result.body);
}

/** Gets an existing Secret within a profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  secretName: string,
  options: SecretsGetOptionalParams = { requestOptions: {} },
): Promise<Secret> {
  const result = await _getSend(context, resourceGroupName, profileName, secretName, options);
  return _getDeserialize(result);
}
