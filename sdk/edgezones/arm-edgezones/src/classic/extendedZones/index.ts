// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesContext } from "../../api/edgeZonesContext.js";
import {
  unregister,
  register,
  listBySubscription,
  get,
  ExtendedZonesUnregisterOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesGetOptionalParams,
} from "../../api/extendedZones/index.js";
import { ExtendedZone } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtendedZones operations. */
export interface ExtendedZonesOperations {
  /** Unregisters a subscription for an Extended Zone */
  unregister: (
    extendedZoneName: string,
    options?: ExtendedZonesUnregisterOptionalParams,
  ) => Promise<ExtendedZone>;
  /** Registers a subscription for an Extended Zone */
  register: (
    extendedZoneName: string,
    options?: ExtendedZonesRegisterOptionalParams,
  ) => Promise<ExtendedZone>;
  /** Lists the Azure Extended Zones available to a subscription */
  listBySubscription: (
    options?: ExtendedZonesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ExtendedZone>;
  /** Gets an Azure Extended Zone for a subscription */
  get: (
    extendedZoneName: string,
    options?: ExtendedZonesGetOptionalParams,
  ) => Promise<ExtendedZone>;
}

function _getExtendedZones(context: EdgeZonesContext) {
  return {
    unregister: (
      extendedZoneName: string,
      options?: ExtendedZonesUnregisterOptionalParams,
    ) => unregister(context, extendedZoneName, options),
    register: (
      extendedZoneName: string,
      options?: ExtendedZonesRegisterOptionalParams,
    ) => register(context, extendedZoneName, options),
    listBySubscription: (
      options?: ExtendedZonesListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    get: (extendedZoneName: string, options?: ExtendedZonesGetOptionalParams) =>
      get(context, extendedZoneName, options),
  };
}

export function _getExtendedZonesOperations(
  context: EdgeZonesContext,
): ExtendedZonesOperations {
  return {
    ..._getExtendedZones(context),
  };
}
