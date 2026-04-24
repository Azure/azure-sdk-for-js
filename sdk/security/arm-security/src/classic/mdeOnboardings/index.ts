// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/mdeOnboardings/operations.js";
import type {
  MdeOnboardingsListOptionalParams,
  MdeOnboardingsGetOptionalParams,
} from "../../api/mdeOnboardings/options.js";
import type { MdeOnboardingData } from "../../models/mdeOnboardingAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MdeOnboardings operations. */
export interface MdeOnboardingsOperations {
  /** The configuration or data needed to onboard the machine to MDE */
  list: (
    options?: MdeOnboardingsListOptionalParams,
  ) => PagedAsyncIterableIterator<MdeOnboardingData>;
  /** The default configuration or data needed to onboard the machine to MDE */
  get: (options?: MdeOnboardingsGetOptionalParams) => Promise<MdeOnboardingData>;
}

function _getMdeOnboardings(context: SecurityCenterContext) {
  return {
    list: (options?: MdeOnboardingsListOptionalParams) => list(context, options),
    get: (options?: MdeOnboardingsGetOptionalParams) => get(context, options),
  };
}

export function _getMdeOnboardingsOperations(
  context: SecurityCenterContext,
): MdeOnboardingsOperations {
  return {
    ..._getMdeOnboardings(context),
  };
}
