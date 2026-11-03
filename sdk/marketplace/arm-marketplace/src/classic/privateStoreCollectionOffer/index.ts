// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext } from "../../api/marketplaceContext.js";
import {
  post,
  upsertOfferWithMultiContext,
  contextsView,
  list,
  $delete,
  createOrUpdate,
  get,
  listByContexts,
} from "../../api/privateStoreCollectionOffer/operations.js";
import type {
  PrivateStoreCollectionOfferPostOptionalParams,
  PrivateStoreCollectionOfferUpsertOfferWithMultiContextOptionalParams,
  PrivateStoreCollectionOfferContextsViewOptionalParams,
  PrivateStoreCollectionOfferListOptionalParams,
  PrivateStoreCollectionOfferDeleteOptionalParams,
  PrivateStoreCollectionOfferCreateOrUpdateOptionalParams,
  PrivateStoreCollectionOfferGetOptionalParams,
  PrivateStoreCollectionOfferListByContextsOptionalParams,
} from "../../api/privateStoreCollectionOffer/options.js";
import type { CollectionOffersByContext, Offer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateStoreCollectionOffer operations. */
export interface PrivateStoreCollectionOfferOperations {
  /** Delete Private store offer. This is a workaround. */
  post: (
    privateStoreId: string,
    collectionId: string,
    offerId: string,
    options?: PrivateStoreCollectionOfferPostOptionalParams,
  ) => Promise<void>;
  /** Upsert an offer with multiple context details. */
  upsertOfferWithMultiContext: (
    privateStoreId: string,
    collectionId: string,
    offerId: string,
    options?: PrivateStoreCollectionOfferUpsertOfferWithMultiContextOptionalParams,
  ) => Promise<Offer>;
  /** Retrieve offer information with plans under required contexts restrictions. */
  contextsView: (
    privateStoreId: string,
    collectionId: string,
    offerId: string,
    options?: PrivateStoreCollectionOfferContextsViewOptionalParams,
  ) => Promise<Offer>;
  /** Get a list of all private offers in the given private store and collection */
  list: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionOfferListOptionalParams,
  ) => PagedAsyncIterableIterator<Offer>;
  /** Deletes an offer from the given collection of private store. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    privateStoreId: string,
    collectionId: string,
    offerId: string,
    options?: PrivateStoreCollectionOfferDeleteOptionalParams,
  ) => Promise<void>;
  /** Update or add an offer to a specific collection of the private store. */
  createOrUpdate: (
    privateStoreId: string,
    collectionId: string,
    offerId: string,
    payload: Offer,
    options?: PrivateStoreCollectionOfferCreateOrUpdateOptionalParams,
  ) => Promise<Offer>;
  /** Gets information about a specific offer. */
  get: (
    privateStoreId: string,
    collectionId: string,
    offerId: string,
    options?: PrivateStoreCollectionOfferGetOptionalParams,
  ) => Promise<Offer>;
  /** Get a list of all offers in the given collection according to the required contexts. */
  listByContexts: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionOfferListByContextsOptionalParams,
  ) => PagedAsyncIterableIterator<CollectionOffersByContext>;
}

function _getPrivateStoreCollectionOffer(context: MarketplaceContext) {
  return {
    post: (
      privateStoreId: string,
      collectionId: string,
      offerId: string,
      options?: PrivateStoreCollectionOfferPostOptionalParams,
    ) => post(context, privateStoreId, collectionId, offerId, options),
    upsertOfferWithMultiContext: (
      privateStoreId: string,
      collectionId: string,
      offerId: string,
      options?: PrivateStoreCollectionOfferUpsertOfferWithMultiContextOptionalParams,
    ) => upsertOfferWithMultiContext(context, privateStoreId, collectionId, offerId, options),
    contextsView: (
      privateStoreId: string,
      collectionId: string,
      offerId: string,
      options?: PrivateStoreCollectionOfferContextsViewOptionalParams,
    ) => contextsView(context, privateStoreId, collectionId, offerId, options),
    list: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionOfferListOptionalParams,
    ) => list(context, privateStoreId, collectionId, options),
    delete: (
      privateStoreId: string,
      collectionId: string,
      offerId: string,
      options?: PrivateStoreCollectionOfferDeleteOptionalParams,
    ) => $delete(context, privateStoreId, collectionId, offerId, options),
    createOrUpdate: (
      privateStoreId: string,
      collectionId: string,
      offerId: string,
      payload: Offer,
      options?: PrivateStoreCollectionOfferCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, privateStoreId, collectionId, offerId, payload, options),
    get: (
      privateStoreId: string,
      collectionId: string,
      offerId: string,
      options?: PrivateStoreCollectionOfferGetOptionalParams,
    ) => get(context, privateStoreId, collectionId, offerId, options),
    listByContexts: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionOfferListByContextsOptionalParams,
    ) => listByContexts(context, privateStoreId, collectionId, options),
  };
}

export function _getPrivateStoreCollectionOfferOperations(
  context: MarketplaceContext,
): PrivateStoreCollectionOfferOperations {
  return {
    ..._getPrivateStoreCollectionOffer(context),
  };
}
