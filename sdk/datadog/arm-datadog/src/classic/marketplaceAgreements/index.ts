// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { createOrUpdate, list } from "../../api/marketplaceAgreements/operations.js";
import {
  MarketplaceAgreementsCreateOrUpdateOptionalParams,
  MarketplaceAgreementsListOptionalParams,
} from "../../api/marketplaceAgreements/options.js";
import { DatadogAgreementResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MarketplaceAgreements operations. */
export interface MarketplaceAgreementsOperations {
  /** Create Datadog marketplace agreement in the subscription. */
  createOrUpdate: (
    options?: MarketplaceAgreementsCreateOrUpdateOptionalParams,
  ) => Promise<DatadogAgreementResource>;
  /** List Datadog marketplace agreements in the subscription. */
  list: (
    options?: MarketplaceAgreementsListOptionalParams,
  ) => PagedAsyncIterableIterator<DatadogAgreementResource>;
}

function _getMarketplaceAgreements(context: MicrosoftDatadogContext) {
  return {
    createOrUpdate: (options?: MarketplaceAgreementsCreateOrUpdateOptionalParams) =>
      createOrUpdate(context, options),
    list: (options?: MarketplaceAgreementsListOptionalParams) => list(context, options),
  };
}

export function _getMarketplaceAgreementsOperations(
  context: MicrosoftDatadogContext,
): MarketplaceAgreementsOperations {
  return {
    ..._getMarketplaceAgreements(context),
  };
}
