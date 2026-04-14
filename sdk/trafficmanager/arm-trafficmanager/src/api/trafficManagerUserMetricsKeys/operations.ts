// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext as Client } from "../index.js";
import type { DeleteOperationResult, UserMetricsModel } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  deleteOperationResultDeserializer,
  userMetricsModelDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TrafficManagerUserMetricsKeysDeleteOptionalParams,
  TrafficManagerUserMetricsKeysCreateOrUpdateOptionalParams,
  TrafficManagerUserMetricsKeysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  options: TrafficManagerUserMetricsKeysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/trafficManagerUserMetricsKeys/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return deleteOperationResultDeserializer(result.body);
}

/** Delete a subscription-level key used for Real User Metrics collection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: TrafficManagerUserMetricsKeysDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteOperationResult> {
  const result = await _$deleteSend(context, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  options: TrafficManagerUserMetricsKeysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/trafficManagerUserMetricsKeys/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<UserMetricsModel> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return userMetricsModelDeserializer(result.body);
}

/** Create or update a subscription-level key used for Real User Metrics collection. */
export async function createOrUpdate(
  context: Client,
  options: TrafficManagerUserMetricsKeysCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<UserMetricsModel> {
  const result = await _createOrUpdateSend(context, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  options: TrafficManagerUserMetricsKeysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/trafficManagerUserMetricsKeys/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<UserMetricsModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return userMetricsModelDeserializer(result.body);
}

/** Get the subscription-level key used for Real User Metrics collection. */
export async function get(
  context: Client,
  options: TrafficManagerUserMetricsKeysGetOptionalParams = { requestOptions: {} },
): Promise<UserMetricsModel> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
