// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementContext } from "../../api/confluentManagementContext.js";
import { create, list } from "../../api/marketplaceAgreements/operations.js";
import {
  MarketplaceAgreementsCreateOptionalParams,
  MarketplaceAgreementsListOptionalParams,
} from "../../api/marketplaceAgreements/options.js";
import { ConfluentAgreementResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a MarketplaceAgreements operations. */
export interface MarketplaceAgreementsOperations {
  /** Create Confluent Marketplace agreement in the subscription. */
  create: (
    options?: MarketplaceAgreementsCreateOptionalParams,
  ) => Promise<ConfluentAgreementResource>;
  /** List Confluent marketplace agreements in the subscription. */
  list: (
    options?: MarketplaceAgreementsListOptionalParams,
  ) => PagedAsyncIterableIterator<ConfluentAgreementResource>;
}

function _getMarketplaceAgreements(context: ConfluentManagementContext) {
  return {
    create: (options?: MarketplaceAgreementsCreateOptionalParams) => create(context, options),
    list: (options?: MarketplaceAgreementsListOptionalParams) => list(context, options),
  };
}

export function _getMarketplaceAgreementsOperations(
  context: ConfluentManagementContext,
): MarketplaceAgreementsOperations {
  return {
    ..._getMarketplaceAgreements(context),
  };
}
