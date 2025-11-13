// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders } from "./headerUtils.js";
import type { PipelinedQueryExecutionContext } from "./pipelinedQueryExecutionContext.js";

/**
 * Legacy fetch implementation for when enableQueryControl is false
 * @hidden
 */
export class LegacyFetchImplementation {
  constructor(
    private context: PipelinedQueryExecutionContext,
  ) { }

  async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    const context = this.context;
    try {
      // Keep fetching until we have enough items or no more results
      while (context.fetchBuffer.length < context.pageSize && context.endpoint.hasMoreResults()) {
        const response = await context.endpoint.fetchMore(diagnosticNode);
        mergeHeaders(context.fetchMoreRespHeaders, response.headers);

        if (
          !response ||
          !response.result ||
          !response.result.buffer ||
          response.result.buffer.length === 0
        ) {
          if (context.fetchBuffer.length > 0) {
            const temp = context.fetchBuffer;
            context.fetchBuffer = [];
            return { result: temp, headers: context.fetchMoreRespHeaders };
          } else {
            return { result: undefined, headers: context.fetchMoreRespHeaders };
          }
        }
        context.fetchBuffer.push(...response.result.buffer);
      }

      // Return collected items up to pageSize
      if (context.fetchBuffer.length > 0) {
        const temp = context.fetchBuffer.slice(0, context.pageSize);
        context.fetchBuffer = context.fetchBuffer.slice(context.pageSize);
        return { result: temp, headers: context.fetchMoreRespHeaders };
      } else {
        return { result: undefined, headers: context.fetchMoreRespHeaders };
      }
    } catch (err: any) {
      mergeHeaders(context.fetchMoreRespHeaders, err.headers);
      err.headers = context.fetchMoreRespHeaders;
      throw err;
    }
  }
}
