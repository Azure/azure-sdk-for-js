// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BillingContainersGetOptionalParams,
  BillingContainersListBySubscriptionOptionalParams,
  DeviceRegistryManagementContext as Client,
} from "../index.js";
import {
  BillingContainer,
  billingContainerDeserializer,
  errorResponseDeserializer,
  _BillingContainerListResult,
  _billingContainerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _billingContainersListBySubscriptionSend(
  context: Client,
  options: BillingContainersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/billingContainers",
      context.subscriptionId,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _billingContainersListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _billingContainerListResultDeserializer(result.body);
}

/** List BillingContainer resources by subscription ID */
export function billingContainersListBySubscription(
  context: Client,
  options: BillingContainersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BillingContainer> {
  return buildPagedAsyncIterator(
    context,
    () => _billingContainersListBySubscriptionSend(context, options),
    _billingContainersListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _billingContainersGetSend(
  context: Client,
  billingContainerName: string,
  options: BillingContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/billingContainers/{billingContainerName}",
      context.subscriptionId,
      billingContainerName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _billingContainersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return billingContainerDeserializer(result.body);
}

/** Get a BillingContainer */
export async function billingContainersGet(
  context: Client,
  billingContainerName: string,
  options: BillingContainersGetOptionalParams = { requestOptions: {} },
): Promise<BillingContainer> {
  const result = await _billingContainersGetSend(context, billingContainerName, options);
  return _billingContainersGetDeserialize(result);
}
