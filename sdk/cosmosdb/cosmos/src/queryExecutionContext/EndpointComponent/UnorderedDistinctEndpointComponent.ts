// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { ParallelQueryResult } from "../parallelQueryResult.js";
import { createParallelQueryResult } from "../parallelQueryResult.js";
import { getInitialHeader } from "../headerUtils.js";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private _disposed = false;
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

  public hasMoreResults(): boolean {
    const result = this.executionContext.hasMoreResults();
    return result;
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<unknown>> {
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);

    if (!response) {
      const result = createParallelQueryResult([], new Map(), {}, undefined);
      return { result, headers: getInitialHeader() };
    }

    // Pipeline trust boundary: upstream returns ParallelQueryResult in Response<unknown>
    const pipelineResult = response.result as ParallelQueryResult | undefined;
    if (
      pipelineResult === undefined ||
      !Array.isArray(pipelineResult.buffer) ||
      pipelineResult.buffer.length === 0
    ) {
      const result = createParallelQueryResult([], new Map(), {}, undefined);
      return { result, headers: response.headers };
    }

    const parallelResult = pipelineResult;
    const dataToProcess: any[] = parallelResult.buffer;

    for (const item of dataToProcess) {
      if (item) {
        const hashedResult = await hashObject(item);
        if (!this.hashedResults.has(hashedResult)) {
          buffer.push(item);
          this.hashedResults.add(hashedResult);
        }
      }
    }
    const result = createParallelQueryResult(buffer, new Map(), undefined, undefined);
    return { result, headers: response.headers };
  }

  /**
   * Releases resources held by this execution context.
   * Propagates disposal down the component chain and clears the hashed results set.
   */
  public dispose(): void {
    if (this._disposed) return;
    this._disposed = true;
    this.executionContext.dispose();
    this.hashedResults.clear();
  }
}
