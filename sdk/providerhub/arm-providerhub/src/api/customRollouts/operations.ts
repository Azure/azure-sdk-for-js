// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  CustomRollout,
  _CustomRolloutArrayResponseWithContinuation,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  customRolloutSerializer,
  customRolloutDeserializer,
  _customRolloutArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CustomRolloutsStopOptionalParams,
  CustomRolloutsListByProviderRegistrationOptionalParams,
  CustomRolloutsDeleteOptionalParams,
  CustomRolloutsCreateOrUpdateOptionalParams,
  CustomRolloutsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _stopSend(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: CustomRolloutsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/customRollouts/{rolloutName}/stop{?api%2Dversion}",
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

/** Stops or cancels the custom rollout, if in progress. */
export async function stop(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: CustomRolloutsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, providerNamespace, rolloutName, options);
  return _stopDeserialize(result);
}

export function _listByProviderRegistrationSend(
  context: Client,
  providerNamespace: string,
  options: CustomRolloutsListByProviderRegistrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/customRollouts{?api%2Dversion}",
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
): Promise<_CustomRolloutArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _customRolloutArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the custom rollouts for the given provider. */
export function listByProviderRegistration(
  context: Client,
  providerNamespace: string,
  options: CustomRolloutsListByProviderRegistrationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomRollout> {
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
  options: CustomRolloutsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/customRollouts/{rolloutName}{?api%2Dversion}",
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

/** Deletes the custom rollout resource. Custom rollout must be in terminal state. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: CustomRolloutsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, providerNamespace, rolloutName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  properties: CustomRollout,
  options: CustomRolloutsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/customRollouts/{rolloutName}{?api%2Dversion}",
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
    body: customRolloutSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomRollout> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customRolloutDeserializer(result.body);
}

/** Creates or updates the rollout details. */
export function createOrUpdate(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  properties: CustomRollout,
  options: CustomRolloutsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomRollout>, CustomRollout> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, providerNamespace, rolloutName, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<CustomRollout>, CustomRollout>;
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: CustomRolloutsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/customRollouts/{rolloutName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CustomRollout> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customRolloutDeserializer(result.body);
}

/** Gets the custom rollout details. */
export async function get(
  context: Client,
  providerNamespace: string,
  rolloutName: string,
  options: CustomRolloutsGetOptionalParams = { requestOptions: {} },
): Promise<CustomRollout> {
  const result = await _getSend(context, providerNamespace, rolloutName, options);
  return _getDeserialize(result);
}
