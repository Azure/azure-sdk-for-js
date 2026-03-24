// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "../index.js";
import type {
  CanceledSubscriptionId,
  SubscriptionName,
  RenamedSubscriptionId,
  EnabledSubscriptionId,
  AcceptOwnershipRequest,
  AcceptOwnershipStatusResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  canceledSubscriptionIdDeserializer,
  subscriptionNameSerializer,
  renamedSubscriptionIdDeserializer,
  enabledSubscriptionIdDeserializer,
  acceptOwnershipRequestSerializer,
  acceptOwnershipStatusResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionAcceptOwnershipStatusOptionalParams,
  SubscriptionAcceptOwnershipOptionalParams,
  SubscriptionEnableOptionalParams,
  SubscriptionRenameOptionalParams,
  SubscriptionCancelOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _acceptOwnershipStatusSend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionAcceptOwnershipStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/subscriptions/{subscriptionId}/acceptOwnershipStatus{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _acceptOwnershipStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<AcceptOwnershipStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return acceptOwnershipStatusResponseDeserializer(result.body);
}

/** Accept subscription ownership status. */
export async function acceptOwnershipStatus(
  context: Client,
  subscriptionId: string,
  options: SubscriptionAcceptOwnershipStatusOptionalParams = { requestOptions: {} },
): Promise<AcceptOwnershipStatusResponse> {
  const result = await _acceptOwnershipStatusSend(context, subscriptionId, options);
  return _acceptOwnershipStatusDeserialize(result);
}

export function _acceptOwnershipSend(
  context: Client,
  subscriptionId: string,
  body: AcceptOwnershipRequest,
  options: SubscriptionAcceptOwnershipOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/subscriptions/{subscriptionId}/acceptOwnership{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: acceptOwnershipRequestSerializer(body),
  });
}

export async function _acceptOwnershipDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Accept subscription ownership. */
export function acceptOwnership(
  context: Client,
  subscriptionId: string,
  body: AcceptOwnershipRequest,
  options: SubscriptionAcceptOwnershipOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _acceptOwnershipDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _acceptOwnershipSend(context, subscriptionId, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _enableSend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/enable{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _enableDeserialize(
  result: PathUncheckedResponse,
): Promise<EnabledSubscriptionId> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return enabledSubscriptionIdDeserializer(result.body);
}

/** The operation to enable a subscription */
export async function enable(
  context: Client,
  subscriptionId: string,
  options: SubscriptionEnableOptionalParams = { requestOptions: {} },
): Promise<EnabledSubscriptionId> {
  const result = await _enableSend(context, subscriptionId, options);
  return _enableDeserialize(result);
}

export function _renameSend(
  context: Client,
  subscriptionId: string,
  body: SubscriptionName,
  options: SubscriptionRenameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/rename{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: subscriptionNameSerializer(body),
  });
}

export async function _renameDeserialize(
  result: PathUncheckedResponse,
): Promise<RenamedSubscriptionId> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return renamedSubscriptionIdDeserializer(result.body);
}

/** The operation to rename a subscription */
export async function rename(
  context: Client,
  subscriptionId: string,
  body: SubscriptionName,
  options: SubscriptionRenameOptionalParams = { requestOptions: {} },
): Promise<RenamedSubscriptionId> {
  const result = await _renameSend(context, subscriptionId, body, options);
  return _renameDeserialize(result);
}

export function _cancelSend(
  context: Client,
  subscriptionId: string,
  options: SubscriptionCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscription/cancel{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<CanceledSubscriptionId> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return canceledSubscriptionIdDeserializer(result.body);
}

/** The operation to cancel a subscription */
export async function cancel(
  context: Client,
  subscriptionId: string,
  options: SubscriptionCancelOptionalParams = { requestOptions: {} },
): Promise<CanceledSubscriptionId> {
  const result = await _cancelSend(context, subscriptionId, options);
  return _cancelDeserialize(result);
}
