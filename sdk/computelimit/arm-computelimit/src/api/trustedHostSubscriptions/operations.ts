// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext as Client } from "../index.js";
import type {
  TrustedHostSubscription,
  _TrustedHostSubscriptionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  trustedHostSubscriptionSerializer,
  trustedHostSubscriptionDeserializer,
  _trustedHostSubscriptionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TrustedHostSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  TrustedHostSubscriptionsDeleteOptionalParams,
  TrustedHostSubscriptionsGetOptionalParams,
  TrustedHostSubscriptionsCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: TrustedHostSubscriptionsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/trustedHostSubscriptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-31",
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

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TrustedHostSubscriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _trustedHostSubscriptionListResultDeserializer(result.body);
}
/** Lists all host subscriptions that the guest subscription trusts in a location. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: TrustedHostSubscriptionsListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<TrustedHostSubscription> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionLocationResourceSend(context, location, options),
    _listBySubscriptionLocationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-31" },
  );
}

export function _$deleteSend(
  context: Client,
  location: string,
  hostSubscriptionId: string,
  options: TrustedHostSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/trustedHostSubscriptions/{hostSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      hostSubscriptionId: hostSubscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-31",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Removes a host subscription from the guest subscription's list of trusted hosts. */
export async function $delete(
  context: Client,
  location: string,
  hostSubscriptionId: string,
  options: TrustedHostSubscriptionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, location, hostSubscriptionId, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  hostSubscriptionId: string,
  options: TrustedHostSubscriptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/trustedHostSubscriptions/{hostSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      hostSubscriptionId: hostSubscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-31",
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
): Promise<TrustedHostSubscription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return trustedHostSubscriptionDeserializer(result.body);
}
/** Gets a host subscription that the guest subscription trusts. */
export async function get(
  context: Client,
  location: string,
  hostSubscriptionId: string,
  options: TrustedHostSubscriptionsGetOptionalParams = { requestOptions: {} },
): Promise<TrustedHostSubscription> {
  const result = await _getSend(context, location, hostSubscriptionId, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  location: string,
  hostSubscriptionId: string,
  resource: TrustedHostSubscription,
  options: TrustedHostSubscriptionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/trustedHostSubscriptions/{hostSubscriptionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      hostSubscriptionId: hostSubscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-31",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: trustedHostSubscriptionSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<TrustedHostSubscription> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return trustedHostSubscriptionDeserializer(result.body);
}
/**
 * Adds a host subscription to the guest subscription's list of trusted hosts. A guest
 * subscription can trust multiple host subscriptions; this only establishes trust and
 * does not check the guest in to the host. Guest-to-host association is determined at
 * check-in time, where a subscription can be a guest of at most one host per region.
 */
export async function create(
  context: Client,
  location: string,
  hostSubscriptionId: string,
  resource: TrustedHostSubscription,
  options: TrustedHostSubscriptionsCreateOptionalParams = { requestOptions: {} },
): Promise<TrustedHostSubscription> {
  const result = await _createSend(context, location, hostSubscriptionId, resource, options);
  return _createDeserialize(result);
}
