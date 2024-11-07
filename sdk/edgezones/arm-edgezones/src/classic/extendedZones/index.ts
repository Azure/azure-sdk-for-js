// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesContext } from "../../api/edgeZonesContext.js";
import {
  extendedZonesGet,
  extendedZonesListBySubscription,
  extendedZonesRegister,
  extendedZonesUnregister,
} from "../../api/extendedZones/index.js";
import {
  ExtendedZonesGetOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesUnregisterOptionalParams,
} from "../../api/options.js";
import { ExtendedZone } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtendedZones operations. */
export interface ExtendedZonesOperations {
  /** Gets an Azure Extended Zone for a subscription */
  get: (
    extendedZoneName: string,
    options?: ExtendedZonesGetOptionalParams,
  ) => Promise<ExtendedZone>;
  /** Lists the Azure Extended Zones available to a subscription */
  listBySubscription: (
    options?: ExtendedZonesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ExtendedZone>;
  /** Registers a subscription for an Extended Zone */
  register: (
    extendedZoneName: string,
    options?: ExtendedZonesRegisterOptionalParams,
  ) => Promise<ExtendedZone>;
  /** Unregisters a subscription for an Extended Zone */
  unregister: (
    extendedZoneName: string,
    options?: ExtendedZonesUnregisterOptionalParams,
  ) => Promise<ExtendedZone>;
}

export function getExtendedZones(
  context: EdgeZonesContext,
  subscriptionId: string,
) {
  return {
    get: (extendedZoneName: string, options?: ExtendedZonesGetOptionalParams) =>
      extendedZonesGet(context, subscriptionId, extendedZoneName, options),
    listBySubscription: (
      options?: ExtendedZonesListBySubscriptionOptionalParams,
    ) => extendedZonesListBySubscription(context, subscriptionId, options),
    register: (
      extendedZoneName: string,
      options?: ExtendedZonesRegisterOptionalParams,
    ) =>
      extendedZonesRegister(context, subscriptionId, extendedZoneName, options),
    unregister: (
      extendedZoneName: string,
      options?: ExtendedZonesUnregisterOptionalParams,
    ) =>
      extendedZonesUnregister(
        context,
        subscriptionId,
        extendedZoneName,
        options,
      ),
  };
}

export function getExtendedZonesOperations(
  context: EdgeZonesContext,
  subscriptionId: string,
): ExtendedZonesOperations {
  return {
    ...getExtendedZones(context, subscriptionId),
  };
}
