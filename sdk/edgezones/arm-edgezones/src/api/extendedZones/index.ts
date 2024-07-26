// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ExtendedZone, _ExtendedZoneListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  EdgeZonesContext as Client,
  ExtendedZonesGet200Response,
  ExtendedZonesGetDefaultResponse,
  ExtendedZonesListBySubscription200Response,
  ExtendedZonesListBySubscriptionDefaultResponse,
  ExtendedZonesRegister200Response,
  ExtendedZonesRegisterDefaultResponse,
  ExtendedZonesUnregister200Response,
  ExtendedZonesUnregisterDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  ExtendedZonesGetOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesUnregisterOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesGetOptionalParams = { requestOptions: {} },
): StreamableMethod<ExtendedZonesGet200Response | ExtendedZonesGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}",
      subscriptionId,
      extendedZoneName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: ExtendedZonesGet200Response | ExtendedZonesGetDefaultResponse,
): Promise<ExtendedZone> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          registrationState: result.body.properties?.["registrationState"],
          displayName: result.body.properties?.["displayName"],
          regionalDisplayName: result.body.properties?.["regionalDisplayName"],
          regionType: result.body.properties?.["regionType"],
          regionCategory: result.body.properties?.["regionCategory"],
          geography: result.body.properties?.["geography"],
          geographyGroup: result.body.properties?.["geographyGroup"],
          longitude: result.body.properties?.["longitude"],
          latitude: result.body.properties?.["latitude"],
          homeLocation: result.body.properties?.["homeLocation"],
        },
  };
}

/** Gets an Azure Extended Zone for a subscription */
export async function get(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesGetOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _getSend(context, subscriptionId, extendedZoneName, options);
  return _getDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: ExtendedZonesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  ExtendedZonesListBySubscription200Response | ExtendedZonesListBySubscriptionDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listBySubscriptionDeserialize(
  result:
    | ExtendedZonesListBySubscription200Response
    | ExtendedZonesListBySubscriptionDefaultResponse,
): Promise<_ExtendedZoneListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
      return {
        id: p["id"],
        name: p["name"],
        type: p["type"],
        systemData: !p.systemData
          ? undefined
          : {
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              lastModifiedBy: p.systemData?.["lastModifiedBy"],
              lastModifiedByType: p.systemData?.["lastModifiedByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        properties: !p.properties
          ? undefined
          : {
              provisioningState: p.properties?.["provisioningState"],
              registrationState: p.properties?.["registrationState"],
              displayName: p.properties?.["displayName"],
              regionalDisplayName: p.properties?.["regionalDisplayName"],
              regionType: p.properties?.["regionType"],
              regionCategory: p.properties?.["regionCategory"],
              geography: p.properties?.["geography"],
              geographyGroup: p.properties?.["geographyGroup"],
              longitude: p.properties?.["longitude"],
              latitude: p.properties?.["latitude"],
              homeLocation: p.properties?.["homeLocation"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** Lists the Azure Extended Zones available to a subscription */
export function listBySubscription(
  context: Client,
  subscriptionId: string,
  options: ExtendedZonesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExtendedZone> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, subscriptionId, options),
    _listBySubscriptionDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _registerSend(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesRegisterOptionalParams = { requestOptions: {} },
): StreamableMethod<ExtendedZonesRegister200Response | ExtendedZonesRegisterDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/register",
      subscriptionId,
      extendedZoneName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _registerDeserialize(
  result: ExtendedZonesRegister200Response | ExtendedZonesRegisterDefaultResponse,
): Promise<ExtendedZone> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          registrationState: result.body.properties?.["registrationState"],
          displayName: result.body.properties?.["displayName"],
          regionalDisplayName: result.body.properties?.["regionalDisplayName"],
          regionType: result.body.properties?.["regionType"],
          regionCategory: result.body.properties?.["regionCategory"],
          geography: result.body.properties?.["geography"],
          geographyGroup: result.body.properties?.["geographyGroup"],
          longitude: result.body.properties?.["longitude"],
          latitude: result.body.properties?.["latitude"],
          homeLocation: result.body.properties?.["homeLocation"],
        },
  };
}

/** Registers a subscription for an Extended Zone */
export async function register(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesRegisterOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _registerSend(context, subscriptionId, extendedZoneName, options);
  return _registerDeserialize(result);
}

export function _unregisterSend(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesUnregisterOptionalParams = { requestOptions: {} },
): StreamableMethod<ExtendedZonesUnregister200Response | ExtendedZonesUnregisterDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeZones/extendedZones/{extendedZoneName}/unregister",
      subscriptionId,
      extendedZoneName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _unregisterDeserialize(
  result: ExtendedZonesUnregister200Response | ExtendedZonesUnregisterDefaultResponse,
): Promise<ExtendedZone> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          registrationState: result.body.properties?.["registrationState"],
          displayName: result.body.properties?.["displayName"],
          regionalDisplayName: result.body.properties?.["regionalDisplayName"],
          regionType: result.body.properties?.["regionType"],
          regionCategory: result.body.properties?.["regionCategory"],
          geography: result.body.properties?.["geography"],
          geographyGroup: result.body.properties?.["geographyGroup"],
          longitude: result.body.properties?.["longitude"],
          latitude: result.body.properties?.["latitude"],
          homeLocation: result.body.properties?.["homeLocation"],
        },
  };
}

/** Unregisters a subscription for an Extended Zone */
export async function unregister(
  context: Client,
  subscriptionId: string,
  extendedZoneName: string,
  options: ExtendedZonesUnregisterOptionalParams = { requestOptions: {} },
): Promise<ExtendedZone> {
  const result = await _unregisterSend(context, subscriptionId, extendedZoneName, options);
  return _unregisterDeserialize(result);
}
