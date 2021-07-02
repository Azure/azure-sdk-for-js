import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ComputeOperationValue, OperationsListOptionalParams } from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Operations. */
export interface Operations {
  /**
   * Gets a list of compute operations.
   * @param options The options parameters.
   */
  list(
    options?: OperationsListOptionalParams
  ): PagedAsyncIterableIterator<ComputeOperationValue>;
}
