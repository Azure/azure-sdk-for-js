// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import type { Response } from "../../request";
import type { ExecutionContext } from "../ExecutionContext";

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
   * Execute a provided function on the next element in the OrderByEndpointComponent.
   */
  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    const { result: item, headers } = await this.executionContext.nextItem(diagnosticNode);
    if (this.emitRawOrderByPayload) {
      return {
        result: item !== undefined ? item : undefined,
        headers,
      };
    } else {
      return {
        result: item !== undefined ? item.payload : undefined,
        headers,
      };
    }
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }
}
