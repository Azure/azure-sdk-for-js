// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders } from "./headerUtils.js";
import type { BaseContinuationTokenManager } from "./ContinuationTokenManager/BaseContinuationTokenManager.js";
import { ContinuationTokenManagerFactory } from "./ContinuationTokenManager/ContinuationTokenManagerFactory.js";
import { Constants } from "../common/index.js";
import type { PipelinedQueryExecutionContext } from "./pipelinedQueryExecutionContext.js";

/**
 * Query control enabled fetch implementation with continuation token support
 * @hidden
 */
export class QueryControlFetchImplementation {
  // Required fields for query control - not optional
  private readonly continuationTokenManager: BaseContinuationTokenManager;
  private readonly querySupportsTokens: boolean;

  constructor(
    private context: PipelinedQueryExecutionContext,
    collectionLink: string,
    continuationToken: string | undefined,
    isOrderByQuery: boolean,
    querySupportsTokens: boolean,
  ) {
    this.querySupportsTokens = querySupportsTokens;
    
    // Initialize continuation token manager immediately for query control
    this.continuationTokenManager = ContinuationTokenManagerFactory.create(
      collectionLink,
      continuationToken,
      isOrderByQuery,
    );
  }

  async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    // Use continuation token logic for supported queries when query control is enabled
    // Otherwise use simplified buffer-only logic
    if (this.querySupportsTokens) {
      return this._handleQueryFetch(diagnosticNode);
    } else {
      return this._handleSimpleBufferFetch(diagnosticNode);
    }
  }

  private async _handleSimpleBufferFetch(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<Response<any>> {
    const context = this.context;
    
    // Return buffered data if available
    if (context.fetchBuffer.length > 0) {
      const temp = context.fetchBuffer.slice(0, context.pageSize);
      context.fetchBuffer = context.fetchBuffer.slice(context.pageSize);
      return { result: temp, headers: context.fetchMoreRespHeaders };
    }

    // Fetch new data from endpoint
    const response = await context.endpoint.fetchMore(diagnosticNode);
    mergeHeaders(context.fetchMoreRespHeaders, response.headers);

    if (!response?.result?.buffer?.length) {
      return context.createEmptyResult(response?.headers);
    }

    // Buffer new data and return up to pageSize
    context.fetchBuffer = response.result.buffer;
    const temp = context.fetchBuffer.slice(0, context.pageSize);
    context.fetchBuffer = context.fetchBuffer.slice(context.pageSize);

    return { result: temp, headers: context.fetchMoreRespHeaders };
  }

  private async _handleQueryFetch(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    const context = this.context;
    
    if (context.fetchBuffer.length > 0) {
      const { endIndex, continuationToken } = this.continuationTokenManager.paginateResults(
        context.pageSize,
        false,
      );
      const temp = context.fetchBuffer.slice(0, endIndex);
      context.fetchBuffer = context.fetchBuffer.slice(endIndex);
      this._setContinuationTokenInHeaders(continuationToken);

      return { result: temp, headers: context.fetchMoreRespHeaders };
    }

    // Fetch new data from endpoint
    context.fetchBuffer = [];
    const response = await context.endpoint.fetchMore(diagnosticNode);
    mergeHeaders(context.fetchMoreRespHeaders, response.headers);

    if (!response?.result?.buffer || response.result.buffer.length === 0) {
      const { continuationToken } = this.continuationTokenManager.paginateResults(
        context.pageSize,
        true, // isResponseEmpty = true
        response?.result, // Pass response data for processing
      );
      this._setContinuationTokenInHeaders(continuationToken);
      return context.createEmptyResult(context.fetchMoreRespHeaders);
    }

    context.fetchBuffer = response.result.buffer;
    const { endIndex, continuationToken } = this.continuationTokenManager.paginateResults(
      context.pageSize,
      false, // isResponseEmpty = false
      response.result, // Pass response data for processing
    );

    const temp = context.fetchBuffer.slice(0, endIndex);
    context.fetchBuffer = context.fetchBuffer.slice(endIndex);
    this._setContinuationTokenInHeaders(continuationToken);

    return { result: temp, headers: context.fetchMoreRespHeaders };
  }

  private _setContinuationTokenInHeaders(continuationToken?: string): void {
    const context = this.context;
    if (continuationToken) {
      Object.assign(context.fetchMoreRespHeaders, {
        [Constants.HttpHeaders.Continuation]: continuationToken,
      });
    }
  }
}
