// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext } from "../../api/redHatOpenShiftContext.js";
import { list, get } from "../../api/hcpOpenShiftVersions/operations.js";
import type {
  HcpOpenShiftVersionsListOptionalParams,
  HcpOpenShiftVersionsGetOptionalParams,
} from "../../api/hcpOpenShiftVersions/options.js";
import type { HcpOpenShiftVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HcpOpenShiftVersions operations. */
export interface HcpOpenShiftVersionsOperations {
  /** List HcpOpenShiftVersion resources by SubscriptionLocationResource */
  list: (
    location: string,
    options?: HcpOpenShiftVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<HcpOpenShiftVersion>;
  /** Get a HcpOpenShiftVersion */
  get: (
    location: string,
    hcpOpenShiftVersionName: string,
    options?: HcpOpenShiftVersionsGetOptionalParams,
  ) => Promise<HcpOpenShiftVersion>;
}

function _getHcpOpenShiftVersions(context: RedHatOpenShiftContext) {
  return {
    list: (location: string, options?: HcpOpenShiftVersionsListOptionalParams) =>
      list(context, location, options),
    get: (
      location: string,
      hcpOpenShiftVersionName: string,
      options?: HcpOpenShiftVersionsGetOptionalParams,
    ) => get(context, location, hcpOpenShiftVersionName, options),
  };
}

export function _getHcpOpenShiftVersionsOperations(
  context: RedHatOpenShiftContext,
): HcpOpenShiftVersionsOperations {
  return {
    ..._getHcpOpenShiftVersions(context),
  };
}
