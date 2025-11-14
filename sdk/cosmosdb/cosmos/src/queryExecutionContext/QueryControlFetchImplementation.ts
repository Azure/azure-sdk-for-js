// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders, getInitialHeader } from "./headerUtils.js";
import type { BaseContinuationTokenManager } from "./ContinuationTokenManager/BaseContinuationTokenManager.js";
import { ContinuationTokenManagerFactory } from "./ContinuationTokenManager/ContinuationTokenManagerFactory.js";
import { Constants } from "../common/index.js";
import type { FetchContext } from "./FetchInterfaces.js";
import type { ExecutionContext } from "./ExecutionContext.js";

/**
 * Query control enabled fetch implementation with continuation token support
 * @hidden
 */
export class QueryControlFetchImplementation {
  // Required fields for query control - not optional
  private readonly continuationTokenManager: BaseContinuationTokenManager;
  private readonly querySupportsTokens: boolean;

  constructor(
    private endpoint: ExecutionContext,
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

  async fetchMore(
    diagnosticNode: DiagnosticNodeInternal,
    context: FetchContext,
  ): Promise<Response<any>> {
    // Use continuation token logic for supported queries when query control is enabled
    // Otherwise use simplified buffer-only logic
    if (this.querySupportsTokens) {
      return this._handleQueryFetch(diagnosticNode, context);
    } else {
      return this._handleSimpleBufferFetch(diagnosticNode, context);
    }
  }

  private async _handleSimpleBufferFetch(
    diagnosticNode: DiagnosticNodeInternal,
    context: FetchContext,
  ): Promise<Response<any>> {
    // Return buffered data if available
    if (context.fetchBuffer.length > 0) {
      const temp = context.fetchBuffer.slice(0, context.pageSize);
      context.fetchBuffer.splice(0, context.pageSize); // Remove items in place
      return { result: temp, headers: context.fetchMoreRespHeaders };
    }

    // Fetch new data from endpoint
    const response = await this.endpoint.fetchMore!(diagnosticNode);
    mergeHeaders(context.fetchMoreRespHeaders, response.headers);

    if (!response?.result?.buffer?.length) {
      return this._createEmptyResult(response?.headers);
    }

    // Buffer new data and return up to pageSize
    context.fetchBuffer.length = 0; // Clear existing items
    context.fetchBuffer.push(...response.result.buffer); // Add new items
    const temp = context.fetchBuffer.slice(0, context.pageSize);
    context.fetchBuffer.splice(0, context.pageSize); // Remove returned items in place

    return { result: temp, headers: context.fetchMoreRespHeaders };
  }

  private async _handleQueryFetch(
    diagnosticNode: DiagnosticNodeInternal,
    context: FetchContext,
  ): Promise<Response<any>> {
    if (context.fetchBuffer.length > 0) {
      const { endIndex, continuationToken } = this.continuationTokenManager.paginateResults(
        context.pageSize,
        false,
      );
      const temp = context.fetchBuffer.slice(0, endIndex);
      context.fetchBuffer.splice(0, endIndex); // Remove returned items in place
      this._setContinuationTokenInHeaders(continuationToken, context);

      return { result: temp, headers: context.fetchMoreRespHeaders };
    }

    // Fetch new data from endpoint
    context.fetchBuffer.length = 0; // Clear existing items in place
    const response = await this.endpoint.fetchMore!(diagnosticNode);
    mergeHeaders(context.fetchMoreRespHeaders, response.headers);

    if (!response?.result?.buffer || response.result.buffer.length === 0) {
      const { continuationToken } = this.continuationTokenManager.paginateResults(
        context.pageSize,
        true, // isResponseEmpty = true
        response?.result, // Pass response data for processing
      );
      this._setContinuationTokenInHeaders(continuationToken, context);
      return this._createEmptyResult(context.fetchMoreRespHeaders);
    }

    context.fetchBuffer.push(...response.result.buffer); // Add new items to existing buffer
    const { endIndex, continuationToken } = this.continuationTokenManager.paginateResults(
      context.pageSize,
      false, // isResponseEmpty = false
      response.result, // Pass response data for processing
    );

    const temp = context.fetchBuffer.slice(0, endIndex);
    context.fetchBuffer.splice(0, endIndex); // Remove returned items in place
    this._setContinuationTokenInHeaders(continuationToken, context);

    return { result: temp, headers: context.fetchMoreRespHeaders };
  }

  private _setContinuationTokenInHeaders(
    continuationToken: string | undefined,
    context: FetchContext,
  ): void {
    if (continuationToken) {
      Object.assign(context.fetchMoreRespHeaders, {
        [Constants.HttpHeaders.Continuation]: continuationToken,
      });
    }
  }

  private _createEmptyResult(headers?: any): Response<any> {
    const hdrs = headers || getInitialHeader();
    return { result: [], headers: hdrs };
  }
}
