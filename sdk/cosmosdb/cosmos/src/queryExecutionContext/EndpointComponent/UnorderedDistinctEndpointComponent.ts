// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { QueryRangeMapping } from "../QueryRangeMapping.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    if (
      response === undefined ||
      response.result === undefined ||
      !Array.isArray(response.result.buffer) ||
      response.result.buffer.length === 0
    ) {
      const result = createParallelQueryResult(
        [],
        new Map(),
        {},
        undefined
      );
      
      return { result, headers: response.headers };
    }

    // New structure: { result: { buffer: bufferedResults, partitionKeyRangeMap: ..., updatedContinuationRanges: ... } }
    const parallelResult = response.result as ParallelQueryResult;
    const dataToProcess: any[] = parallelResult.buffer;
    const partitionKeyRangeMap = parallelResult.partitionKeyRangeMap;
    const updatedContinuationRanges = parallelResult.updatedContinuationRanges;
    const orderByItems = parallelResult.orderByItems;

    for (const item of dataToProcess) {
      if (item) {
        const hashedResult = await hashObject(item);
        if (!this.hashedResults.has(hashedResult)) {
          buffer.push(item);
          this.hashedResults.add(hashedResult);
        }
      }
    }

    // Return in the new structure format using the utility function
    const result = createParallelQueryResult(
      buffer,
      partitionKeyRangeMap,
      updatedContinuationRanges,
      orderByItems
    );

    return { result, headers: response.headers };
  }
}
