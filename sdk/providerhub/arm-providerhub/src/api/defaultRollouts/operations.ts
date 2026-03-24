// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  DefaultRollout,
  _DefaultRolloutArrayResponseWithContinuation,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  defaultRolloutSerializer,
  defaultRolloutDeserializer,
  _defaultRolloutArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DefaultRolloutsStopOptionalParams,
  DefaultRolloutsListByProviderRegistrationOptionalParams,
  DefaultRolloutsDeleteOptionalParams,
  DefaultRolloutsCreateOrUpdateOptionalParams,
  DefaultRolloutsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _stopSend(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: DefaultRolloutsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/defaultRollouts/{rolloutName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      rolloutName: rolloutName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stops or cancels the rollout, if in progress. */
export async function stop(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: DefaultRolloutsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, providerNamespace, rolloutName, options);
  return _stopDeserialize(result);
}

export function _listByProviderRegistrationSend(
  context: Client,
  providerNamespace: string,
  options: DefaultRolloutsListByProviderRegistrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/defaultRollouts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listByProviderRegistrationDeserialize(
  result: PathUncheckedResponse,
): Promise<_DefaultRolloutArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _defaultRolloutArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the rollouts for the given provider. */
export function listByProviderRegistration(
  context: Client,
  providerNamespace: string,
  options: DefaultRolloutsListByProviderRegistrationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DefaultRollout> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProviderRegistrationSend(context, providerNamespace, options),
    _listByProviderRegistrationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: DefaultRolloutsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/defaultRollouts/{rolloutName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      rolloutName: rolloutName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the rollout resource. Rollout must be in terminal state. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: DefaultRolloutsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, providerNamespace, rolloutName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  properties: DefaultRollout,
  options: DefaultRolloutsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/defaultRollouts/{rolloutName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      rolloutName: rolloutName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: defaultRolloutSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DefaultRollout> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return defaultRolloutDeserializer(result.body);
}

/** Creates or updates the rollout details. */
export function createOrUpdate(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  properties: DefaultRollout,
  options: DefaultRolloutsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DefaultRollout>, DefaultRollout> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, providerNamespace, rolloutName, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<DefaultRollout>, DefaultRollout>;
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: DefaultRolloutsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/defaultRollouts/{rolloutName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      rolloutName: rolloutName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DefaultRollout> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return defaultRolloutDeserializer(result.body);
}

/** Gets the default rollout details. */
export async function get(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: DefaultRolloutsGetOptionalParams = { requestOptions: {} },
): Promise<DefaultRollout> {
  const result = await _getSend(context, providerNamespace, rolloutName, options);
  return _getDeserialize(result);
}
