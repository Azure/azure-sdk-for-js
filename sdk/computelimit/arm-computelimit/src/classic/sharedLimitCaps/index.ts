// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitContext } from "../../api/computeLimitContext.js";
import {
  setMemberCapOverrides,
  listBySubscriptionLocationResource,
  $delete,
  createOrUpdate,
  get,
} from "../../api/sharedLimitCaps/operations.js";
import {
  SharedLimitCapsSetMemberCapOverridesOptionalParams,
  SharedLimitCapsListBySubscriptionLocationResourceOptionalParams,
  SharedLimitCapsDeleteOptionalParams,
  SharedLimitCapsCreateOrUpdateOptionalParams,
  SharedLimitCapsGetOptionalParams,
} from "../../api/sharedLimitCaps/options.js";
import {
  SharedLimitCap,
  SetMemberCapOverridesRequest,
  SetMemberCapOverridesResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SharedLimitCaps operations. */
export interface SharedLimitCapsOperations {
  /**
   * Replaces the full set of per-member cap overrides for this shared limit
   * cap. The supplied array becomes the new complete set of overrides;
   * supplying an empty array clears all existing overrides.
   */
  setMemberCapOverrides: (
    location: string,
    vmFamilyName: string,
    body: SetMemberCapOverridesRequest,
    options?: SharedLimitCapsSetMemberCapOverridesOptionalParams,
  ) => Promise<SetMemberCapOverridesResult>;
  /** Lists all shared limit cap configurations visible to the caller's subscription. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: SharedLimitCapsListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<SharedLimitCap>;
  /** Deletes the shared limit cap configuration for a VM family. The caller's subscription is treated as the host subscription. */
  delete: (
    location: string,
    vmFamilyName: string,
    options?: SharedLimitCapsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces the shared limit cap configuration for a VM family. */
  createOrUpdate: (
    location: string,
    vmFamilyName: string,
    resource: SharedLimitCap,
    options?: SharedLimitCapsCreateOrUpdateOptionalParams,
  ) => Promise<SharedLimitCap>;
  /** Gets the shared limit cap configuration for a VM family, as visible to the caller's subscription. */
  get: (
    location: string,
    vmFamilyName: string,
    options?: SharedLimitCapsGetOptionalParams,
  ) => Promise<SharedLimitCap>;
}

function _getSharedLimitCaps(context: ComputeLimitContext) {
  return {
    setMemberCapOverrides: (
      location: string,
      vmFamilyName: string,
      body: SetMemberCapOverridesRequest,
      options?: SharedLimitCapsSetMemberCapOverridesOptionalParams,
    ) => setMemberCapOverrides(context, location, vmFamilyName, body, options),
    listBySubscriptionLocationResource: (
      location: string,
      options?: SharedLimitCapsListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    delete: (
      location: string,
      vmFamilyName: string,
      options?: SharedLimitCapsDeleteOptionalParams,
    ) => $delete(context, location, vmFamilyName, options),
    createOrUpdate: (
      location: string,
      vmFamilyName: string,
      resource: SharedLimitCap,
      options?: SharedLimitCapsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, location, vmFamilyName, resource, options),
    get: (location: string, vmFamilyName: string, options?: SharedLimitCapsGetOptionalParams) =>
      get(context, location, vmFamilyName, options),
  };
}

export function _getSharedLimitCapsOperations(
  context: ComputeLimitContext,
): SharedLimitCapsOperations {
  return {
    ..._getSharedLimitCaps(context),
  };
}
