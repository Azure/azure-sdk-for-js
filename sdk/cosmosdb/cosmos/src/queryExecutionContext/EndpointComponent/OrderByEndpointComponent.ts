// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";

/** @hidden */
export class OrderByEndpointComponent implements ExecutionContext {
  /**
   * Represents an endpoint in handling an order by query. For each processed orderby
   * result it returns 'payload' item of the result
   *
   * @param executionContext - Underlying Execution Context
   * @hidden
   */
  constructor(private executionContext: ExecutionContext) {}
  /**
   * Execute a provided function on the next element in the OrderByEndpointComponent.
   */
  public async nextItem(): Promise<Response<any>> {
    const { result: item, headers } = await this.executionContext.nextItem();
    return {
      result: item !== undefined ? item.payload : undefined,
      headers,
    };
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }
}
