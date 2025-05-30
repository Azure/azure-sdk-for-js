/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Publisher,
  PublishersListByClusterOptionalParams,
  PublishersGetOptionalParams,
  PublishersGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Publishers. */
export interface Publishers {
  /**
   * List Publishers available for the HCI Cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param options The options parameters.
   */
  listByCluster(
    resourceGroupName: string,
    clusterName: string,
    options?: PublishersListByClusterOptionalParams,
  ): PagedAsyncIterableIterator<Publisher>;
  /**
   * Get Publisher resource details of HCI Cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param publisherName The name of the publisher available within HCI cluster.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    clusterName: string,
    publisherName: string,
    options?: PublishersGetOptionalParams,
  ): Promise<PublishersGetResponse>;
}
