// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders, getInitialHeader } from "./headerUtils.js";
import { ContinuationTokenManager } from "./ContinuationTokenManager/ContinuationTokenManager.js";
import { Constants } from "../common/index.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { ParallelQueryResult } from "./parallelQueryResult.js";
import type { FetchImplementation } from "./FetchImplementation.js";

/**
 * Query control enabled fetch implementation with continuation token support
 * @hidden
 */
export class QueryControlFetchImplementation implements FetchImplementation {
  // Required fields for query control - not optional
  private readonly continuationTokenManager: ContinuationTokenManager;
  private readonly querySupportsTokens: boolean;

  constructor(
    private endpoint: ExecutionContext,
    private pageSize: number,
    collectionLink: string,
    continuationToken: string | undefined,
    isOrderByQuery: boolean,
    querySupportsTokens: boolean,
  ) {
    this.querySupportsTokens = querySupportsTokens;

    // Initialize continuation token manager immediately for query control
    this.continuationTokenManager = new ContinuationTokenManager(
      collectionLink,
      isOrderByQuery,
      continuationToken,
    );
  }

  async fetchMore(
    diagnosticNode: DiagnosticNodeInternal,
    fetchBuffer: any[],
  ): Promise<Response<unknown>> {
    // Initialize headers fresh for each fetchMore call
    const fetchMoreRespHeaders = getInitialHeader();

    // Use continuation token logic for supported queries when query control is enabled
    // Otherwise use simplified buffer-only logic
    if (this.querySupportsTokens) {
      return this._handleQueryFetch(diagnosticNode, fetchBuffer, fetchMoreRespHeaders);
    } else {
      return this._handleSimpleBufferFetch(diagnosticNode, fetchBuffer, fetchMoreRespHeaders);
    }
  }

  private async _handleSimpleBufferFetch(
    diagnosticNode: DiagnosticNodeInternal,
    fetchBuffer: any[],
    fetchMoreRespHeaders: Record<string, any>,
  ): Promise<Response<unknown>> {
    if (fetchBuffer.length > 0) {
      const temp = fetchBuffer.slice(0, this.pageSize);
      fetchBuffer.splice(0, this.pageSize); // Remove items in place
      return { result: temp, headers: fetchMoreRespHeaders };
    }

    // Fetch new data from endpoint
    const response = await this.endpoint.fetchMore(diagnosticNode);
    mergeHeaders(fetchMoreRespHeaders, response.headers);

    // Pipeline trust boundary: endpoint returns ParallelQueryResult in Response<unknown>
    const pipelineResult = response?.result as ParallelQueryResult | undefined;
    if (!pipelineResult?.buffer?.length) {
      return this._createEmptyResult(response?.headers);
    }

    // Buffer new data and return up to pageSize
    fetchBuffer.length = 0; // Clear existing items
    fetchBuffer.push(...pipelineResult.buffer); // Add new items
    const temp = fetchBuffer.slice(0, this.pageSize);
    fetchBuffer.splice(0, this.pageSize); // Remove returned items in place

    return { result: temp, headers: fetchMoreRespHeaders };
  }

  private async _handleQueryFetch(
    diagnosticNode: DiagnosticNodeInternal,
    fetchBuffer: any[],
    fetchMoreRespHeaders: Record<string, any>,
  ): Promise<Response<unknown>> {
    if (fetchBuffer.length > 0) {
      const { endIndex, continuationToken } = this.continuationTokenManager.paginateResults(
        this.pageSize,
        false,
      );
      const temp = fetchBuffer.slice(0, endIndex);
      fetchBuffer.splice(0, endIndex); // Remove returned items in place
      this._setContinuationTokenInHeaders(continuationToken, fetchMoreRespHeaders);

      return { result: temp, headers: fetchMoreRespHeaders };
    }

    // Fetch new data from endpoint
    fetchBuffer.length = 0; // Clear existing items in place
    const response = await this.endpoint.fetchMore(diagnosticNode);
    mergeHeaders(fetchMoreRespHeaders, response.headers);

    // Pipeline trust boundary: endpoint returns ParallelQueryResult in Response<unknown>
    const pipelineResult = response?.result as ParallelQueryResult | undefined;
    if (!pipelineResult?.buffer || pipelineResult.buffer.length === 0) {
      const { continuationToken } = this.continuationTokenManager.paginateResults(
        this.pageSize,
        true, // isResponseEmpty = true
        pipelineResult, // Pass response data for processing
      );
      this._setContinuationTokenInHeaders(continuationToken, fetchMoreRespHeaders);
      return this._createEmptyResult(fetchMoreRespHeaders);
    }

    fetchBuffer.push(...pipelineResult.buffer); // Add new items to existing buffer
    const { endIndex, continuationToken } = this.continuationTokenManager.paginateResults(
      this.pageSize,
      false, // isResponseEmpty = false
      pipelineResult, // Pass response data for processing
    );

    const temp = fetchBuffer.slice(0, endIndex);
    fetchBuffer.splice(0, endIndex); // Remove returned items in place
    this._setContinuationTokenInHeaders(continuationToken, fetchMoreRespHeaders);

    return { result: temp, headers: fetchMoreRespHeaders };
  }

  private _setContinuationTokenInHeaders(
    continuationToken: string | undefined,
    fetchMoreRespHeaders: Record<string, any>,
  ): void {
    if (continuationToken) {
      Object.assign(fetchMoreRespHeaders, {
        [Constants.HttpHeaders.Continuation]: continuationToken,
      });
    }
  }

  private _createEmptyResult(headers?: any): Response<unknown> {
    const hdrs = headers || getInitialHeader();
    return { result: [], headers: hdrs };
  }

  /**
   * Releases resources held by this fetch implementation.
   * Propagates disposal to the underlying endpoint execution context.
   */
  public dispose(): void {
    this.endpoint.dispose();
  }
}
