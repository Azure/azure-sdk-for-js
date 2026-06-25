// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitContext } from "../../api/computeLimitContext.js";
import {
  listByParent,
  $delete,
  createOrUpdate,
  get,
} from "../../api/memberCapOverrides/operations.js";
import {
  MemberCapOverridesListByParentOptionalParams,
  MemberCapOverridesDeleteOptionalParams,
  MemberCapOverridesCreateOrUpdateOptionalParams,
  MemberCapOverridesGetOptionalParams,
} from "../../api/memberCapOverrides/options.js";
import { MemberCapOverride } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MemberCapOverrides operations. */
export interface MemberCapOverridesOperations {
  /** Lists all per-member cap overrides configured under a SharedLimitCap. */
  listByParent: (
    location: string,
    vmFamilyName: string,
    options?: MemberCapOverridesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<MemberCapOverride>;
  /** Removes the per-member cap override for a member subscription. */
  delete: (
    location: string,
    vmFamilyName: string,
    memberSubscriptionId: string,
    options?: MemberCapOverridesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces the cap override for a single member subscription. */
  createOrUpdate: (
    location: string,
    vmFamilyName: string,
    memberSubscriptionId: string,
    resource: MemberCapOverride,
    options?: MemberCapOverridesCreateOrUpdateOptionalParams,
  ) => Promise<MemberCapOverride>;
  /** Gets the cap override configured for a single member subscription. */
  get: (
    location: string,
    vmFamilyName: string,
    memberSubscriptionId: string,
    options?: MemberCapOverridesGetOptionalParams,
  ) => Promise<MemberCapOverride>;
}

function _getMemberCapOverrides(context: ComputeLimitContext) {
  return {
    listByParent: (
      location: string,
      vmFamilyName: string,
      options?: MemberCapOverridesListByParentOptionalParams,
    ) => listByParent(context, location, vmFamilyName, options),
    delete: (
      location: string,
      vmFamilyName: string,
      memberSubscriptionId: string,
      options?: MemberCapOverridesDeleteOptionalParams,
    ) => $delete(context, location, vmFamilyName, memberSubscriptionId, options),
    createOrUpdate: (
      location: string,
      vmFamilyName: string,
      memberSubscriptionId: string,
      resource: MemberCapOverride,
      options?: MemberCapOverridesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, location, vmFamilyName, memberSubscriptionId, resource, options),
    get: (
      location: string,
      vmFamilyName: string,
      memberSubscriptionId: string,
      options?: MemberCapOverridesGetOptionalParams,
    ) => get(context, location, vmFamilyName, memberSubscriptionId, options),
  };
}

export function _getMemberCapOverridesOperations(
  context: ComputeLimitContext,
): MemberCapOverridesOperations {
  return {
    ..._getMemberCapOverrides(context),
  };
}
