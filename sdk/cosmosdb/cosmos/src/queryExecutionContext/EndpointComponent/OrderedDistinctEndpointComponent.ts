// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { QueryOperationOptions, RUConsumedManager, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  private hashedLastResult: string;
  constructor(private executionContext: ExecutionContext) {}

  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager
  ): Promise<Response<any>> {
    try {
      const { headers, result } = await this.executionContext.nextItem(
        diagnosticNode,
        operationOptions,
        ruConsumedManager
      );
      if (result) {
        const hashedResult = await hashObject(result);
        if (hashedResult === this.hashedLastResult) {
          return { result: undefined, headers };
        }
        this.hashedLastResult = hashedResult;
      }
      return { result, headers };
    } catch (err) {
      if (err.code === RUCapPerOperationExceededErrorCode) {
        err.body.fetchedSoFarResults = undefined;
      }
      throw err;
    }
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }
}
