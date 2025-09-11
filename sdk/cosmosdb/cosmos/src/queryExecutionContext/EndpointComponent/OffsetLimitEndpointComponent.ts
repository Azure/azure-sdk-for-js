// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";
import { calculateOffsetLimitForPartitionRanges } from "../PartitionRangeUtils.js";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private offset: number,
    private limit: number,
  ) {}

  public hasMoreResults(): boolean {
    return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const aggregateHeaders = getInitialHeader();
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    mergeHeaders(aggregateHeaders, response.headers);
    if (
      response === undefined ||
      response.result === undefined ||
      !Array.isArray(response.result.buffer) ||
      response.result.buffer.length === 0
    ) {
      const result = createParallelQueryResult([], new Map(), {}, undefined);

      return { result, headers: response.headers };
    }

    const parallelResult = response.result as ParallelQueryResult;
    const dataToProcess: any[] = parallelResult.buffer;
    const partitionKeyRangeMap = parallelResult.partitionKeyRangeMap;
    const updatedContinuationRanges = parallelResult.updatedContinuationRanges;
    const orderByItems = parallelResult.orderByItems;

    const initialOffset = this.offset;
    const initialLimit = this.limit;

    for (const item of dataToProcess) {
      if (this.offset > 0) {
        this.offset--;
      } else if (this.limit > 0) {
        buffer.push(item);
        this.limit--;
      }
    }

    // Process offset/limit logic and update partition key range map
    // Note: Pass initial offset/limit values (not current state) to calculateOffsetLimitForPartitionRanges
    // This function updates partition metadata while the loop above processes actual data items
    const updatedPartitionKeyRangeMap = calculateOffsetLimitForPartitionRanges(
      partitionKeyRangeMap,
      initialOffset,
      initialLimit,
    );

    // Return in the new structure format using the utility function
    const result = createParallelQueryResult(
      buffer,
      updatedPartitionKeyRangeMap,
      updatedContinuationRanges,
      orderByItems,
    );

    return {
      result,
      headers: aggregateHeaders,
    };
  }
}
