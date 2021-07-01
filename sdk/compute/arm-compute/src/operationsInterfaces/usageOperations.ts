import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Usage, UsageOperationsListOptionalParams } from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a UsageOperations. */
export interface UsageOperations {
  /**
   * Gets, for the specified location, the current compute resource usage information as well as the
   * limits for compute resources under the subscription.
   * @param location The location for which resource usage is queried.
   * @param options The options parameters.
   */
  list(
    location: string,
    options?: UsageOperationsListOptionalParams
  ): PagedAsyncIterableIterator<Usage>;
}
