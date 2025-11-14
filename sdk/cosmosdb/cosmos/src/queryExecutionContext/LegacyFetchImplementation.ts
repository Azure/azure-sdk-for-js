// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders, getInitialHeader } from "./headerUtils.js";
import type { ExecutionContext } from "./ExecutionContext.js";

/**
 * Legacy fetch implementation for when enableQueryControl is false
 * @hidden
 */
export class LegacyFetchImplementation {
  private fetchMoreRespHeaders: Record<string, any>;

  constructor(
    private endpoint: ExecutionContext,
    private pageSize: number,
  ) { }

  async fetchMore(
    diagnosticNode: DiagnosticNodeInternal,
    fetchBuffer: any[],
  ): Promise<Response<any>> {
    // Initialize headers fresh for each fetchMore call
    this.fetchMoreRespHeaders = getInitialHeader();

    try {
      // Keep fetching until we have enough items or no more results
      while (fetchBuffer.length < this.pageSize && this.endpoint.hasMoreResults()) {
        const response = await this.endpoint.fetchMore!(diagnosticNode);
        mergeHeaders(this.fetchMoreRespHeaders, response.headers);

        if (
          !response ||
          !response.result ||
          !response.result.buffer ||
          response.result.buffer.length === 0
        ) {
          if (fetchBuffer.length > 0) {
            const temp = [...fetchBuffer];
            fetchBuffer.length = 0; // Clear array in place
            return { result: temp, headers: this.fetchMoreRespHeaders };
          } else {
            return { result: undefined, headers: this.fetchMoreRespHeaders };
          }
        }
        fetchBuffer.push(...response.result.buffer);
      }

      // Return collected items up to pageSize
      if (fetchBuffer.length > 0) {
        const temp = fetchBuffer.slice(0, this.pageSize);
        fetchBuffer.splice(0, this.pageSize); // Remove items in place
        return { result: temp, headers: this.fetchMoreRespHeaders };
      } else {
        return { result: undefined, headers: this.fetchMoreRespHeaders };
      }
    } catch (err: any) {
      mergeHeaders(this.fetchMoreRespHeaders, err.headers);
      err.headers = this.fetchMoreRespHeaders;
      throw err;
    }
  }
}
