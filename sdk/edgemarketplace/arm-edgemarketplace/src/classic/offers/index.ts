// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeMarketplaceContext } from "../../api/edgeMarketplaceContext.js";
import {
  listBySubscription,
  getAccessToken,
  generateAccessToken,
  list,
  get,
} from "../../api/offers/operations.js";
import type {
  OffersListBySubscriptionOptionalParams,
  OffersGetAccessTokenOptionalParams,
  OffersGenerateAccessTokenOptionalParams,
  OffersListOptionalParams,
  OffersGetOptionalParams,
} from "../../api/offers/options.js";
import type {
  Offer,
  AccessTokenRequest,
  DiskAccessToken,
  AccessTokenReadRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Offers operations. */
export interface OffersOperations {
  /** List Offer resources by subscription ID */
  listBySubscription: (
    options?: OffersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Offer>;
  /** get access token. */
  getAccessToken: (
    resourceUri: string,
    offerId: string,
    body: AccessTokenReadRequest,
    options?: OffersGetAccessTokenOptionalParams,
  ) => Promise<DiskAccessToken>;
  /** A long-running resource action. */
  generateAccessToken: (
    resourceUri: string,
    offerId: string,
    body: AccessTokenRequest,
    options?: OffersGenerateAccessTokenOptionalParams,
  ) => PollerLike<OperationState<DiskAccessToken>, DiskAccessToken>;
  /** List Offer resources by parent */
  list: (
    resourceUri: string,
    options?: OffersListOptionalParams,
  ) => PagedAsyncIterableIterator<Offer>;
  /** Get a Offer */
  get: (resourceUri: string, offerId: string, options?: OffersGetOptionalParams) => Promise<Offer>;
}

function _getOffers(context: EdgeMarketplaceContext) {
  return {
    listBySubscription: (options?: OffersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    getAccessToken: (
      resourceUri: string,
      offerId: string,
      body: AccessTokenReadRequest,
      options?: OffersGetAccessTokenOptionalParams,
    ) => getAccessToken(context, resourceUri, offerId, body, options),
    generateAccessToken: (
      resourceUri: string,
      offerId: string,
      body: AccessTokenRequest,
      options?: OffersGenerateAccessTokenOptionalParams,
    ) => generateAccessToken(context, resourceUri, offerId, body, options),
    list: (resourceUri: string, options?: OffersListOptionalParams) =>
      list(context, resourceUri, options),
    get: (resourceUri: string, offerId: string, options?: OffersGetOptionalParams) =>
      get(context, resourceUri, offerId, options),
  };
}

export function _getOffersOperations(context: EdgeMarketplaceContext): OffersOperations {
  return {
    ..._getOffers(context),
  };
}
