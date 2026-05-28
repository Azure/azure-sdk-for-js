// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { listByOffer, get } from "../../api/skus/operations.js";
import { SkusListByOfferOptionalParams, SkusGetOptionalParams } from "../../api/skus/options.js";
import { Sku } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** List Skus available for a offer within the HCI Cluster. */
  listByOffer: (
    resourceGroupName: string,
    clusterName: string,
    publisherName: string,
    offerName: string,
    options?: SkusListByOfferOptionalParams,
  ) => PagedAsyncIterableIterator<Sku>;
  /** Get SKU resource details within a offer of HCI Cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    publisherName: string,
    offerName: string,
    skuName: string,
    options?: SkusGetOptionalParams,
  ) => Promise<Sku>;
}

function _getSkus(context: AzureStackHCIContext) {
  return {
    listByOffer: (
      resourceGroupName: string,
      clusterName: string,
      publisherName: string,
      offerName: string,
      options?: SkusListByOfferOptionalParams,
    ) => listByOffer(context, resourceGroupName, clusterName, publisherName, offerName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      publisherName: string,
      offerName: string,
      skuName: string,
      options?: SkusGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, publisherName, offerName, skuName, options),
  };
}

export function _getSkusOperations(context: AzureStackHCIContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
