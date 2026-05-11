// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  listBySubscription,
  update,
  createOrUpdate,
  get,
} from "../../api/quotaTiers/operations.js";
import type {
  QuotaTiersListBySubscriptionOptionalParams,
  QuotaTiersUpdateOptionalParams,
  QuotaTiersCreateOrUpdateOptionalParams,
  QuotaTiersGetOptionalParams,
} from "../../api/quotaTiers/options.js";
import type { QuotaTier } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a QuotaTiers operations. */
export interface QuotaTiersOperations {
  /** Returns all the resources of a particular type belonging to a subscription. */
  listBySubscription: (
    options?: QuotaTiersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaTier>;
  /** Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information. */
  update: (
    defaultParam: string,
    tier: QuotaTier,
    options?: QuotaTiersUpdateOptionalParams,
  ) => Promise<QuotaTier>;
  /** Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information. */
  createOrUpdate: (
    defaultParam: string,
    tier: QuotaTier,
    options?: QuotaTiersCreateOrUpdateOptionalParams,
  ) => Promise<QuotaTier>;
  /** Gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information. */
  get: (defaultParam: string, options?: QuotaTiersGetOptionalParams) => Promise<QuotaTier>;
}

function _getQuotaTiers(context: CognitiveServicesManagementContext) {
  return {
    listBySubscription: (options?: QuotaTiersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    update: (defaultParam: string, tier: QuotaTier, options?: QuotaTiersUpdateOptionalParams) =>
      update(context, defaultParam, tier, options),
    createOrUpdate: (
      defaultParam: string,
      tier: QuotaTier,
      options?: QuotaTiersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, defaultParam, tier, options),
    get: (defaultParam: string, options?: QuotaTiersGetOptionalParams) =>
      get(context, defaultParam, options),
  };
}

export function _getQuotaTiersOperations(
  context: CognitiveServicesManagementContext,
): QuotaTiersOperations {
  return {
    ..._getQuotaTiers(context),
  };
}
