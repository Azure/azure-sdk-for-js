// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

  public hasMoreResults(): boolean {
    const result = this.executionContext.hasMoreResults();
    // console.log("=== UnorderedDistinctEndpointComponent hasMoreResults DEBUG ===");
    // console.log("Underlying execution context type:", this.executionContext.constructor.name);
    // console.log("hasMoreResults result:", result);
    // console.log("hashedResults size:", this.hashedResults.size);
    // console.log("=== END UnorderedDistinctEndpointComponent hasMoreResults DEBUG ===");
    return result;
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    // console.log("=== UnorderedDistinctEndpointComponent fetchMore DEBUG ===");
    // console.log("Starting fetchMore, hashedResults size:", this.hashedResults.size);

    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);

    // console.log("Response from underlying context:");
    // console.log("- response defined:", !!response);
    // console.log("- response.result defined:", !!response?.result);
    // console.log("- response.result.buffer is array:", Array.isArray(response?.result?.buffer));
    // console.log("- response.result.buffer length:", response?.result?.buffer?.length || 0);
    // console.log("- response.result.partitionKeyRangeMap:", response?.result?.partitionKeyRangeMap);

    if (
      response === undefined ||
      response.result === undefined ||
      !Array.isArray(response.result.buffer) ||
      response.result.buffer.length === 0
    ) {
      // console.log("No valid data, returning empty result");
      const result = createParallelQueryResult([], new Map(), {}, undefined);
      // console.log("=== END UnorderedDistinctEndpointComponent fetchMore (empty) DEBUG ===");
      return { result, headers: response.headers };
    }

    const parallelResult = response.result as ParallelQueryResult;
    const dataToProcess: any[] = parallelResult.buffer;

    // console.log("Processing", dataToProcess.length, "items");

    for (const item of dataToProcess) {
      if (item) {
        const hashedResult = await hashObject(item);
        if (!this.hashedResults.has(hashedResult)) {
          buffer.push(item);
          this.hashedResults.add(hashedResult);
        }
      }
    }

    // console.log("After deduplication:");
    // console.log("- unique items in buffer:", buffer.length);
    // console.log("- total hashedResults size:", this.hashedResults.size);
    // console.log("- returning empty partitionKeyRangeMap: new Map()");

    // Return in the new structure format using the utility function
    const result = createParallelQueryResult(
      buffer,
      new Map(), // THIS IS THE ISSUE - should preserve original map!
      undefined,
      undefined,
    );

    // console.log("=== END UnorderedDistinctEndpointComponent fetchMore DEBUG ===");
    return { result, headers: response.headers };
  }
}
