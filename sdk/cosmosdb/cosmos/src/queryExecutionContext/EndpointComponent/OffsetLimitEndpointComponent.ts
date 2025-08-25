// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { FeedOptions } from "../../request/index.js";
import type { ContinuationTokenManager } from "../ContinuationTokenManager.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  private continuationTokenManager: ContinuationTokenManager | undefined;

  constructor(
    private executionContext: ExecutionContext,
    private offset: number,
    private limit: number,
    options?: FeedOptions,
  ) {
    // Get the continuation token manager from options if available
    this.continuationTokenManager = (options as any)?.continuationTokenManager;

    // Check continuation token for offset/limit values during initialization
    if (options?.continuationToken) {
      try {
        const parsedToken = JSON.parse(options.continuationToken);    
        // Use continuation token values if available, otherwise keep provided values
        if (parsedToken.offset) {
          this.offset = parsedToken.offset;
        }
        if (parsedToken.limit) {
          this.limit = parsedToken.limit;
        }
      } catch {
        // If parsing fails, use the provided offset/limit values from query plan
      }
    }
  }

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
      response.result === undefined
    ) {
      return { result: undefined, headers: response.headers };
    }
    
    const initialOffset = this.offset;
    const initialLimit = this.limit;

    for (const item of response.result) {
      if (this.offset > 0) {
        this.offset--;
      } else if (this.limit > 0) {
        buffer.push(item);
        this.limit--;
      }
    }

    // Process offset/limit logic and update partition key range map
    this.processOffsetLimitWithContinuationToken(
      initialOffset,
      initialLimit,
      response.result.length,
    );

    return {
      result: buffer,
      headers: aggregateHeaders
    };
  }

  /**
   * Processes offset/limit logic using the continuation token manager 
   * and updates partition key range map
   */
  private processOffsetLimitWithContinuationToken(
    initialOffset: number,
    initialLimit: number,
    bufferLength: number,
  ): void {
    // Use continuation token manager to process offset/limit logic and update partition key range map
    if (this.continuationTokenManager) {      
      this.continuationTokenManager.processOffsetLimitAndUpdateRangeMap(
        initialOffset,
        this.offset,
        initialLimit,
        this.limit,
        bufferLength
      );
    }
  }
}
