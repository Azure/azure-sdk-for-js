// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { listByCluster, listByPublisher, get } from "../../api/offers/operations.js";
import {
  OffersListByClusterOptionalParams,
  OffersListByPublisherOptionalParams,
  OffersGetOptionalParams,
} from "../../api/offers/options.js";
import { Offer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Offers operations. */
export interface OffersOperations {
  /** List Offers available across publishers for the HCI Cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: OffersListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<Offer>;
  /** List Offers available for a publisher within the HCI Cluster. */
  listByPublisher: (
    resourceGroupName: string,
    clusterName: string,
    publisherName: string,
    options?: OffersListByPublisherOptionalParams,
  ) => PagedAsyncIterableIterator<Offer>;
  /** Get Offer resource details within a publisher of HCI Cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    publisherName: string,
    offerName: string,
    options?: OffersGetOptionalParams,
  ) => Promise<Offer>;
}

function _getOffers(context: AzureStackHCIContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: OffersListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    listByPublisher: (
      resourceGroupName: string,
      clusterName: string,
      publisherName: string,
      options?: OffersListByPublisherOptionalParams,
    ) => listByPublisher(context, resourceGroupName, clusterName, publisherName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      publisherName: string,
      offerName: string,
      options?: OffersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, publisherName, offerName, options),
  };
}

export function _getOffersOperations(context: AzureStackHCIContext): OffersOperations {
  return {
    ..._getOffers(context),
  };
}
