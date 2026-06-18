// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { listByCluster, get } from "../../api/publishers/operations.js";
import {
  PublishersListByClusterOptionalParams,
  PublishersGetOptionalParams,
} from "../../api/publishers/options.js";
import { Publisher } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Publishers operations. */
export interface PublishersOperations {
  /** List Publishers available for the HCI Cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: PublishersListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<Publisher>;
  /** Get Publisher resource details of HCI Cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    publisherName: string,
    options?: PublishersGetOptionalParams,
  ) => Promise<Publisher>;
}

function _getPublishers(context: AzureStackHCIContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: PublishersListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      publisherName: string,
      options?: PublishersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, publisherName, options),
  };
}

export function _getPublishersOperations(context: AzureStackHCIContext): PublishersOperations {
  return {
    ..._getPublishers(context),
  };
}
