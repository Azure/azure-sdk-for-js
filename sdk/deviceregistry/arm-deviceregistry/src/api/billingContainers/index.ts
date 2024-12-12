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

export function _billingContainersGetSend(
  context: Client,
  subscriptionId: string,
  billingContainerName: string,
  options: BillingContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/billingContainers/{billingContainerName}",
      subscriptionId,
      billingContainerName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _billingContainersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return billingContainerDeserializer(result.body);
}

/** Get a BillingContainer */
export async function billingContainersGet(
  context: Client,
  subscriptionId: string,
  billingContainerName: string,
  options: BillingContainersGetOptionalParams = { requestOptions: {} },
): Promise<BillingContainer> {
  const result = await _billingContainersGetSend(
    context,
    subscriptionId,
    billingContainerName,
    options,
  );
  return _billingContainersGetDeserialize(result);
}

export function _billingContainersListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: BillingContainersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/billingContainers",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _billingContainersListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingContainerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _billingContainerListResultDeserializer(result.body);
}

/** List BillingContainer resources by subscription ID */
export function billingContainersListBySubscription(
  context: Client,
  subscriptionId: string,
  options: BillingContainersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BillingContainer> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _billingContainersListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _billingContainersListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
