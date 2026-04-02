// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type { RaiPolicy } from "../../models/models.js";
import {
  errorResponseDeserializer,
  raiPolicySerializer,
  raiPolicyDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionRaiPolicyDeleteOptionalParams,
  SubscriptionRaiPolicyCreateOrUpdateOptionalParams,
  SubscriptionRaiPolicyGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  raiPolicyName: string,
  options: SubscriptionRaiPolicyDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiPolicy/{raiPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      raiPolicyName: raiPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified Content Filters associated with the subscription. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  raiPolicyName: string,
  options: SubscriptionRaiPolicyDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, raiPolicyName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  raiPolicyName: string,
  raiPolicy: RaiPolicy,
  options: SubscriptionRaiPolicyCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiPolicy/{raiPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      raiPolicyName: raiPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: raiPolicySerializer(raiPolicy),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return raiPolicyDeserializer(result.body);
}

/** Update the state of specified Content Filters associated with the subscription. */
export async function createOrUpdate(
  context: Client,
  raiPolicyName: string,
  raiPolicy: RaiPolicy,
  options: SubscriptionRaiPolicyCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RaiPolicy> {
  const result = await _createOrUpdateSend(context, raiPolicyName, raiPolicy, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  raiPolicyName: string,
  options: SubscriptionRaiPolicyGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiPolicy/{raiPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      raiPolicyName: raiPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RaiPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return raiPolicyDeserializer(result.body);
}

/** Gets the specified Content Filters associated with the Subscription. */
export async function get(
  context: Client,
  raiPolicyName: string,
  options: SubscriptionRaiPolicyGetOptionalParams = { requestOptions: {} },
): Promise<RaiPolicy> {
  const result = await _getSend(context, raiPolicyName, options);
  return _getDeserialize(result);
}
