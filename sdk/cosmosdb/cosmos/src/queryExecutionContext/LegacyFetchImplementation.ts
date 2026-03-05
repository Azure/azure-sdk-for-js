// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders, getInitialHeader } from "./headerUtils.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { ParallelQueryResult } from "./parallelQueryResult.js";

/**
 * Legacy fetch implementation for when enableQueryControl is false
 * @hidden
 */
export class LegacyFetchImplementation {
  constructor(
    private endpoint: ExecutionContext,
    private pageSize: number,
  ) {}

  async fetchMore(
    diagnosticNode: DiagnosticNodeInternal,
    fetchBuffer: any[],
  ): Promise<Response<unknown>> {
    // Initialize headers fresh for each fetchMore call
    const fetchMoreRespHeaders = getInitialHeader();

    try {
      // Keep fetching until we have enough items or no more results
      while (fetchBuffer.length < this.pageSize && this.endpoint.hasMoreResults()) {
        const response = await this.endpoint.fetchMore(diagnosticNode);
        mergeHeaders(fetchMoreRespHeaders, response.headers);

        // Pipeline trust boundary: endpoint returns ParallelQueryResult in Response<unknown>
        const pipelineResult = response?.result as ParallelQueryResult | undefined;
        if (
          !response ||
          !pipelineResult ||
          !pipelineResult.buffer ||
          pipelineResult.buffer.length === 0
        ) {
          if (fetchBuffer.length > 0) {
            const copiedFetchBuffer = [...fetchBuffer];
            fetchBuffer.length = 0; // Clear array in place
            return { result: copiedFetchBuffer, headers: fetchMoreRespHeaders };
          } else {
            return { result: undefined, headers: fetchMoreRespHeaders };
          }
        }
        fetchBuffer.push(...pipelineResult.buffer);
      }

      // Return collected items up to pageSize
      if (fetchBuffer.length > 0) {
        const temp = fetchBuffer.slice(0, this.pageSize);
        fetchBuffer.splice(0, this.pageSize); // Remove items in place
        return { result: temp, headers: fetchMoreRespHeaders };
      } else {
        return { result: undefined, headers: fetchMoreRespHeaders };
      }
    } catch (err: any) {
      mergeHeaders(fetchMoreRespHeaders, err.headers);
      err.headers = fetchMoreRespHeaders;
      throw err;
    }
  }

  /**
   * Releases resources held by this fetch implementation.
   * Propagates disposal to the underlying endpoint execution context.
   */
  public dispose(): void {
    this.endpoint.dispose();
  }
}
