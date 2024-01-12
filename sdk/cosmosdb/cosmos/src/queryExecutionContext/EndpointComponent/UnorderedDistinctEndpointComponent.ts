// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { QueryOperationOptions, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";
import { RUConsumedManager } from "../../common";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

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
        if (this.hashedResults.has(hashedResult)) {
          return { result: undefined, headers };
        }
        this.hashedResults.add(hashedResult);
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
