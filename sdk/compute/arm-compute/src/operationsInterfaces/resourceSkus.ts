import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ResourceSku, ResourceSkusListOptionalParams } from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ResourceSkus. */
export interface ResourceSkus {
  /**
   * Gets the list of Microsoft.Compute SKUs available for your Subscription.
   * @param options The options parameters.
   */
  list(
    options?: ResourceSkusListOptionalParams
  ): PagedAsyncIterableIterator<ResourceSku>;
}
