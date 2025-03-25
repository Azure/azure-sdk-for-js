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
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    if (response === undefined || response.result === undefined) {
      return { result: undefined, headers: response.headers };
    }
    for (const item of response.result) {
      if (this.emitRawOrderByPayload) {
        buffer.push(item);
      } else {
        buffer.push(item.payload);
      }
    }

    return { result: buffer, headers: response.headers };
  }
}
