// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext, ExecutionContextNextItemOptions } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";;

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  private hashedLastResult: string;
  constructor(private executionContext: ExecutionContext) { }

  public async nextItem(
    options: ExecutionContextNextItemOptions,
  ): Promise<Response<any>> {
    try {
      const { headers, result } = await this.executionContext.nextItem({
        diagnosticNode: options.diagnosticNode,
        operationOptions: options.operationOptions,
        ruConsumed: options.ruConsumed,
      });
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
        err.fetchedResults = undefined;
      }
      throw err;
    }
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }
}
