// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";

/** @hidden */
export class OrderByEndpointComponent implements ExecutionContext {
  /**
   * Represents an endpoint in handling an order by query. For each processed orderby
   * result it returns 'payload' item of the result
   *
   * @param executionContext - Underlying Execution Context
   * @hidden
   */
  constructor(
    private executionContext: ExecutionContext,
    private emitRawOrderByPayload: boolean = false,
  ) {}
  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const buffer: any[] = [];
    const orderByItemsArray: any[][] = []; // Store order by items for each item

    const response = await this.executionContext.fetchMore(diagnosticNode);
    if (
      response === undefined ||
      response.result === undefined ||
      response.result.buffer === undefined
    ) {
      return { result: undefined, headers: response.headers };
    }

    const rawBuffer = response.result.buffer;

    // Process buffer items and collect order by items for each item
    for (let i = 0; i < rawBuffer.length; i++) {
      const item = rawBuffer[i];

      if (this.emitRawOrderByPayload) {
        buffer.push(item);
      } else {
        buffer.push(item.payload);
      }
      orderByItemsArray.push(item.orderByItems);
    }

    // Preserve the response structure with buffer, partitionKeyRangeMap, and all order by items
    return {
      result: {
        buffer: buffer,
        partitionKeyRangeMap: response.result.partitionKeyRangeMap,
        // Pass all order by items - pipeline will determine which one to use based on page boundaries
        ...(orderByItemsArray.length > 0 && { orderByItemsArray: orderByItemsArray }),
      },
      headers: response.headers,
    };
  }
}
