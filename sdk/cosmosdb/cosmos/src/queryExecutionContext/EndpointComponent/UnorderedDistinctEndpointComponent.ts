// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Response } from "../../request";
import { ExecutionContext, ExecutionContextOptions } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";
// import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";
// import { RUConsumedManager } from "../../common";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

  public async nextItem(options: ExecutionContextOptions): Promise<Response<any>> {
    try {
      const { headers, result } = await this.executionContext.nextItem({
        diagnosticNode: options.diagnosticNode,
        operationOptions: options.operationOptions,
        ruConsumed: options.ruConsumed,
      });
      if (result) {
        const hashedResult = await hashObject(result);
        if (this.hashedResults.has(hashedResult)) {
          return { result: undefined, headers };
        }
        this.hashedResults.add(hashedResult);
      }
      return { result, headers };
    } catch (err) {
      if (err.code === RUCapPerOperationExceededErrorCode) {
        err.fetchedResults = undefined;
      }
      throw err;
    }
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }
}
