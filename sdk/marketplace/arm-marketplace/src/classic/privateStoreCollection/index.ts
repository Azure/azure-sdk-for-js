// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext } from "../../api/marketplaceContext.js";
import {
  post,
  disableApproveAllItems,
  approveAllItems,
  transferOffers,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateStoreCollection/operations.js";
import type {
  PrivateStoreCollectionPostOptionalParams,
  PrivateStoreCollectionDisableApproveAllItemsOptionalParams,
  PrivateStoreCollectionApproveAllItemsOptionalParams,
  PrivateStoreCollectionTransferOffersOptionalParams,
  PrivateStoreCollectionListOptionalParams,
  PrivateStoreCollectionDeleteOptionalParams,
  PrivateStoreCollectionCreateOrUpdateOptionalParams,
  PrivateStoreCollectionGetOptionalParams,
} from "../../api/privateStoreCollection/options.js";
import type { Collection, CollectionsList, TransferOffersResponse } from "../../models/models.js";

/** Interface representing a PrivateStoreCollection operations. */
export interface PrivateStoreCollectionOperations {
  /** Delete Private store collection. This is a workaround. */
  post: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionPostOptionalParams,
  ) => Promise<void>;
  /** Disable approve all items for the collection. */
  disableApproveAllItems: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionDisableApproveAllItemsOptionalParams,
  ) => Promise<Collection>;
  /** Delete all existing offers from the collection and enable approve all items. */
  approveAllItems: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionApproveAllItemsOptionalParams,
  ) => Promise<Collection>;
  /** transferring offers (copy or move) from source collection to target collection(s) */
  transferOffers: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionTransferOffersOptionalParams,
  ) => Promise<TransferOffersResponse>;
  /** Gets private store collections list */
  list: (
    privateStoreId: string,
    options?: PrivateStoreCollectionListOptionalParams,
  ) => Promise<CollectionsList>;
  /** Delete a collection from the given private store. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update private store collection */
  createOrUpdate: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionCreateOrUpdateOptionalParams,
  ) => Promise<Collection>;
  /** Gets private store collection */
  get: (
    privateStoreId: string,
    collectionId: string,
    options?: PrivateStoreCollectionGetOptionalParams,
  ) => Promise<Collection>;
}

function _getPrivateStoreCollection(context: MarketplaceContext) {
  return {
    post: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionPostOptionalParams,
    ) => post(context, privateStoreId, collectionId, options),
    disableApproveAllItems: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionDisableApproveAllItemsOptionalParams,
    ) => disableApproveAllItems(context, privateStoreId, collectionId, options),
    approveAllItems: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionApproveAllItemsOptionalParams,
    ) => approveAllItems(context, privateStoreId, collectionId, options),
    transferOffers: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionTransferOffersOptionalParams,
    ) => transferOffers(context, privateStoreId, collectionId, options),
    list: (privateStoreId: string, options?: PrivateStoreCollectionListOptionalParams) =>
      list(context, privateStoreId, options),
    delete: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionDeleteOptionalParams,
    ) => $delete(context, privateStoreId, collectionId, options),
    createOrUpdate: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, privateStoreId, collectionId, options),
    get: (
      privateStoreId: string,
      collectionId: string,
      options?: PrivateStoreCollectionGetOptionalParams,
    ) => get(context, privateStoreId, collectionId, options),
  };
}

export function _getPrivateStoreCollectionOperations(
  context: MarketplaceContext,
): PrivateStoreCollectionOperations {
  return {
    ..._getPrivateStoreCollection(context),
  };
}
