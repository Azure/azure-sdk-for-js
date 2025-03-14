// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesContext as Client } from "../index.js";
import {
  ExtendedZone,
  extendedZoneDeserializer,
  errorResponseDeserializer,
  _ExtendedZoneListResult,
  _extendedZoneListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  ExtendedZonesUnregisterOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesGetOptionalParams,
} from "./options.js";

export function _unregisterSend(
  context: Client,
  extendedZoneName: string,
  options: ExtendedZonesUnregisterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/unregister{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      extendedZoneName: extendedZoneName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _unregisterDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedZone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return extendedZoneDeserializer(result.body);
}

/** Unregisters a subscription for an Extended Zone */
export async function unregister(
  context: Client,
  extendedZoneName: string,
  options: ExtendedZonesUnregisterOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _unregisterSend(context, extendedZoneName, options);
  return _unregisterDeserialize(result);
}

export function _registerSend(
  context: Client,
  extendedZoneName: string,
  options: ExtendedZonesRegisterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/register{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      extendedZoneName: extendedZoneName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _registerDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedZone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return extendedZoneDeserializer(result.body);
}

/** Registers a subscription for an Extended Zone */
export async function register(
  context: Client,
  extendedZoneName: string,
  options: ExtendedZonesRegisterOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _registerSend(context, extendedZoneName, options);
  return _registerDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ExtendedZonesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExtendedZoneListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _extendedZoneListResultDeserializer(result.body);
}

/** Lists the Azure Extended Zones available to a subscription */
export function listBySubscription(
  context: Client,
  options: ExtendedZonesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExtendedZone> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  extendedZoneName: string,
  options: ExtendedZonesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      extendedZoneName: extendedZoneName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ExtendedZone> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return extendedZoneDeserializer(result.body);
}

/** Gets an Azure Extended Zone for a subscription */
export async function get(
  context: Client,
  extendedZoneName: string,
  options: ExtendedZonesGetOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _getSend(context, extendedZoneName, options);
  return _getDeserialize(result);
}
