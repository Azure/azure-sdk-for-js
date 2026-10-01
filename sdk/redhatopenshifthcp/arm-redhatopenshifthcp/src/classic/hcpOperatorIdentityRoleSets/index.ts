// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext } from "../../api/redHatOpenShiftContext.js";
import { get, list } from "../../api/hcpOperatorIdentityRoleSets/operations.js";
import type {
  HcpOperatorIdentityRoleSetsGetOptionalParams,
  HcpOperatorIdentityRoleSetsListOptionalParams,
} from "../../api/hcpOperatorIdentityRoleSets/options.js";
import type { HcpOperatorIdentityRoleSet } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HcpOperatorIdentityRoleSets operations. */
export interface HcpOperatorIdentityRoleSetsOperations {
  /** Get a HcpOperatorIdentityRoleSet */
  get: (
    location: string,
    hcpOperatorIdentityRoleSetName: string,
    options?: HcpOperatorIdentityRoleSetsGetOptionalParams,
  ) => Promise<HcpOperatorIdentityRoleSet>;
  /** List HcpOperatorIdentityRoleSet resources by SubscriptionLocationResource */
  list: (
    location: string,
    options?: HcpOperatorIdentityRoleSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<HcpOperatorIdentityRoleSet>;
}

function _getHcpOperatorIdentityRoleSets(context: RedHatOpenShiftContext) {
  return {
    get: (
      location: string,
      hcpOperatorIdentityRoleSetName: string,
      options?: HcpOperatorIdentityRoleSetsGetOptionalParams,
    ) => get(context, location, hcpOperatorIdentityRoleSetName, options),
    list: (location: string, options?: HcpOperatorIdentityRoleSetsListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getHcpOperatorIdentityRoleSetsOperations(
  context: RedHatOpenShiftContext,
): HcpOperatorIdentityRoleSetsOperations {
  return {
    ..._getHcpOperatorIdentityRoleSets(context),
  };
}
