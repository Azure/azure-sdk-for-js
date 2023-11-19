// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RUConsumed } from "../../common";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { OperationOptions, Response } from "../../request";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";
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
  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: OperationOptions,
    ruConsumed?: RUConsumed
  ): Promise<Response<any>> {
    try {
      const { result: item, headers } = await this.executionContext.nextItem(
        diagnosticNode,
        operationOptions,
        ruConsumed
      );
      return {
        result: item !== undefined ? item.payload : undefined,
        headers,
      };
    } catch (err) {
      if (err.code === RUCapPerOperationExceededErrorCode) {
        err.body.fetchedSoFarResults = undefined;
      }
      throw err;
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
