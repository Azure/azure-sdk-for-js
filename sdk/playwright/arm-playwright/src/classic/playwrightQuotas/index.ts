// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementContext } from "../../api/playwrightManagementContext.js";
import { listBySubscription, get } from "../../api/playwrightQuotas/operations.js";
import {
  PlaywrightQuotasListBySubscriptionOptionalParams,
  PlaywrightQuotasGetOptionalParams,
} from "../../api/playwrightQuotas/options.js";
import { PlaywrightQuota, QuotaName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PlaywrightQuotas operations. */
export interface PlaywrightQuotasOperations {
  /** Lists Playwright quota resources for a given subscription ID. */
  listBySubscription: (
    location: string,
    options?: PlaywrightQuotasListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PlaywrightQuota>;
  /** Gets a subscription-level location-based Playwright quota resource by name. */
  get: (
    location: string,
    playwrightQuotaName: QuotaName,
    options?: PlaywrightQuotasGetOptionalParams,
  ) => Promise<PlaywrightQuota>;
}

function _getPlaywrightQuotas(context: PlaywrightManagementContext) {
  return {
    listBySubscription: (
      location: string,
      options?: PlaywrightQuotasListBySubscriptionOptionalParams,
    ) => listBySubscription(context, location, options),
    get: (
      location: string,
      playwrightQuotaName: QuotaName,
      options?: PlaywrightQuotasGetOptionalParams,
    ) => get(context, location, playwrightQuotaName, options),
  };
}

export function _getPlaywrightQuotasOperations(
  context: PlaywrightManagementContext,
): PlaywrightQuotasOperations {
  return {
    ..._getPlaywrightQuotas(context),
  };
}
