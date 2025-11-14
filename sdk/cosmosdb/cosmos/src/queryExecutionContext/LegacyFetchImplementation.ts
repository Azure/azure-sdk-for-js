// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders } from "./headerUtils.js";
import type { FetchContext } from "./FetchInterfaces.js";
import type { ExecutionContext } from "./ExecutionContext.js";

/**
 * Legacy fetch implementation for when enableQueryControl is false
 * @hidden
 */
export class LegacyFetchImplementation {
  constructor(private endpoint: ExecutionContext) {}

  async fetchMore(
    diagnosticNode: DiagnosticNodeInternal,
    context: FetchContext,
  ): Promise<Response<any>> {
    try {
      // Keep fetching until we have enough items or no more results
      while (context.fetchBuffer.length < context.pageSize && this.endpoint.hasMoreResults()) {
        const response = await this.endpoint.fetchMore!(diagnosticNode);
        mergeHeaders(context.fetchMoreRespHeaders, response.headers);

        if (
          !response ||
          !response.result ||
          !response.result.buffer ||
          response.result.buffer.length === 0
        ) {
          if (context.fetchBuffer.length > 0) {
            const temp = [...context.fetchBuffer];
            context.fetchBuffer.length = 0; // Clear array in place
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
        context.fetchBuffer.splice(0, context.pageSize); // Remove items in place
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
