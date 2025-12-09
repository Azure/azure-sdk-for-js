// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { mergeHeaders, getInitialHeader } from "./headerUtils.js";
import type { BaseContinuationTokenManager } from "./ContinuationTokenManager/BaseContinuationTokenManager.js";
import { ContinuationTokenManagerFactory } from "./ContinuationTokenManager/ContinuationTokenManagerFactory.js";
import { Constants } from "../common/index.js";
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
    private pageSize: number,
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
    fetchBuffer: any[],
  ): Promise<Response<any>> {
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
  ): Promise<Response<any>> {
    // Return buffered data if available
    if (fetchBuffer.length > 0) {
      const temp = fetchBuffer.slice(0, this.pageSize);
      fetchBuffer.splice(0, this.pageSize); // Remove items in place
      return { result: temp, headers: fetchMoreRespHeaders };
    }

    // Fetch new data from endpoint
    const response = await this.endpoint.fetchMore!(diagnosticNode);
    mergeHeaders(fetchMoreRespHeaders, response.headers);

    if (!response?.result?.buffer?.length) {
      return this._createEmptyResult(response?.headers);
    }

    // Buffer new data and return up to pageSize
    fetchBuffer.length = 0; // Clear existing items
    fetchBuffer.push(...response.result.buffer); // Add new items
    const temp = fetchBuffer.slice(0, this.pageSize);
    fetchBuffer.splice(0, this.pageSize); // Remove returned items in place

    return { result: temp, headers: fetchMoreRespHeaders };
  }

  private async _handleQueryFetch(
    diagnosticNode: DiagnosticNodeInternal,
    fetchBuffer: any[],
    fetchMoreRespHeaders: Record<string, any>,
  ): Promise<Response<any>> {
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
    const response = await this.endpoint.fetchMore!(diagnosticNode);
    mergeHeaders(fetchMoreRespHeaders, response.headers);

    if (!response?.result?.buffer || response.result.buffer.length === 0) {
      const { continuationToken } = this.continuationTokenManager.paginateResults(
        this.pageSize,
        true, // isResponseEmpty = true
        response?.result, // Pass response data for processing
      );
      this._setContinuationTokenInHeaders(continuationToken, fetchMoreRespHeaders);
      return this._createEmptyResult(fetchMoreRespHeaders);
    }

    fetchBuffer.push(...response.result.buffer); // Add new items to existing buffer
    const { endIndex, continuationToken } = this.continuationTokenManager.paginateResults(
      this.pageSize,
      false, // isResponseEmpty = false
      response.result, // Pass response data for processing
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

  private _createEmptyResult(headers?: any): Response<any> {
    const hdrs = headers || getInitialHeader();
    return { result: [], headers: hdrs };
  }
}
