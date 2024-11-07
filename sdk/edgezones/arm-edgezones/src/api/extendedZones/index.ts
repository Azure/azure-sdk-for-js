// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EdgeZonesContext as Client,
  ExtendedZonesGetOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesUnregisterOptionalParams,
} from "../index.js";
import {
  ExtendedZone,
  extendedZoneDeserializer,
  _ExtendedZoneListResult,
  _extendedZoneListResultDeserializer,
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

export function _extendedZonesGetSend(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}",
      subscriptionId,
      extendedZoneName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _extendedZonesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedZone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return extendedZoneDeserializer(result.body);
}

/** Gets an Azure Extended Zone for a subscription */
export async function extendedZonesGet(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesGetOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _extendedZonesGetSend(
    context,
    subscriptionId,
    extendedZoneName,
    options,
  );
  return _extendedZonesGetDeserialize(result);
}

export function _extendedZonesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: ExtendedZonesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _extendedZonesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExtendedZoneListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _extendedZoneListResultDeserializer(result.body);
}

/** Lists the Azure Extended Zones available to a subscription */
export function extendedZonesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: ExtendedZonesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExtendedZone> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _extendedZonesListBySubscriptionSend(context, subscriptionId, options),
    _extendedZonesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _extendedZonesRegisterSend(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesRegisterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/register",
      subscriptionId,
      extendedZoneName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _extendedZonesRegisterDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedZone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return extendedZoneDeserializer(result.body);
}

/** Registers a subscription for an Extended Zone */
export async function extendedZonesRegister(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesRegisterOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _extendedZonesRegisterSend(
    context,
    subscriptionId,
    extendedZoneName,
    options,
  );
  return _extendedZonesRegisterDeserialize(result);
}

export function _extendedZonesUnregisterSend(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesUnregisterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/unregister",
      subscriptionId,
      extendedZoneName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _extendedZonesUnregisterDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedZone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return extendedZoneDeserializer(result.body);
}

/** Unregisters a subscription for an Extended Zone */
export async function extendedZonesUnregister(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesUnregisterOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _extendedZonesUnregisterSend(
    context,
    subscriptionId,
    extendedZoneName,
    options,
  );
  return _extendedZonesUnregisterDeserialize(result);
}
