/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { WikiContract, ProductWikisListOptionalParams } from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ProductWikis. */
export interface ProductWikis {
  /**
   * Gets the details of the Wiki for a Product specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param productId Product identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductWikisListOptionalParams,
  ): PagedAsyncIterableIterator<WikiContract>;
}
