// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Response } from "../../request";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";
import { ExecutionContext, ExecutionContextOptions } from "../ExecutionContext";
import { getInitialHeader, mergeHeaders } from "../headerUtils";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private offset: number,
    private limit: number,
  ) {}

  public async nextItem(options: ExecutionContextOptions): Promise<Response<any>> {
    const aggregateHeaders = getInitialHeader();
    try {
      while (this.offset > 0) {
        // Grab next item but ignore the result. We only need the headers
        const { headers } = await this.executionContext.nextItem({
          diagnosticNode: options.diagnosticNode,
          operationOptions: options.operationOptions,
          ruConsumed: options.ruConsumed,
        });
        this.offset--;
        mergeHeaders(aggregateHeaders, headers);
      }
      if (this.limit > 0) {
        const { result, headers } = await this.executionContext.nextItem({
          diagnosticNode: options.diagnosticNode,
          operationOptions: options.operationOptions,
          ruConsumed: options.ruConsumed,
        });
        this.limit--;
        mergeHeaders(aggregateHeaders, headers);
        return { result, headers: aggregateHeaders };
      }
    } catch (err) {
      if (err.code === RUCapPerOperationExceededErrorCode) {
        err.fetchedResults = undefined;
      }
      throw err;
    }
    // If both limit and offset are 0, return nothing
    return {
      result: undefined,
      headers: getInitialHeader(),
    };
  }

  public hasMoreResults(): boolean {
    return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
  }
}
