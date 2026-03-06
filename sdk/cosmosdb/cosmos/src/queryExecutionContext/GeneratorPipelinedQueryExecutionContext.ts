// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response } from "../request/index.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { ExecutionContext } from "./ExecutionContext.js";
import type { PipelineTransform } from "./PipelineTransform.js";
import type { AsyncQuerySource } from "./AsyncQuerySource.js";
import type { QueryPage } from "./QueryPage.js";
import { fromQueryPage } from "./parallelQueryResult.js";
import { composeTransforms } from "./transforms/composeTransforms.js";
import { getInitialHeader } from "./headerUtils.js";
import { CosmosQueryError } from "./Exceptions/CosmosQueryError.js";
import { CosmosErrorCode } from "./Exceptions/CosmosErrorCode.js";

/**
 * Generator-based pipeline orchestrator that replaces the class-chain approach
 * used by {@link PipelinedQueryExecutionContext}.
 *
 * Takes a base ExecutionContext (which provides `pages()`) and an array of
 * composable PipelineTransform functions. The transforms are composed
 * left-to-right over the base generator to form the full query pipeline.
 *
 * @internal
 */
export class GeneratorPipelinedQueryExecutionContext implements ExecutionContext {
  private pipeline: AsyncQuerySource | undefined;
  private _hasMore = true;
  private _disposed = false;

  constructor(
    private readonly baseContext: ExecutionContext,
    private readonly transforms: PipelineTransform[],
    private readonly diagnosticNode: DiagnosticNodeInternal,
  ) {}

  public hasMoreResults(): boolean {
    if (this._disposed) return false;
    return this._hasMore;
  }

  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<unknown>> {
    if (this._disposed) {
      throw new CosmosQueryError(
        "Cannot call fetchMore on a disposed execution context",
        CosmosErrorCode.ContextDisposed,
      );
    }

    const pipeline = this.ensurePipeline(diagnosticNode);
    const { value, done } = await pipeline.next();

    if (done || value === undefined) {
      this._hasMore = false;
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }

    this._hasMore = value.hasMore;
    return fromQueryPage(value);
  }

  public pages(diagnosticNode: DiagnosticNodeInternal): AsyncQuerySource {
    return this.ensurePipeline(diagnosticNode);
  }

  public dispose(): void {
    if (this._disposed) return;
    this._disposed = true;
    this._hasMore = false;

    // Trigger generator cleanup if the pipeline was started
    if (this.pipeline) {
      // Fire-and-forget: generator return is async but we don't need to await it
      void this.pipeline.return(undefined as unknown as void);
    }

    this.baseContext.dispose();
  }

  /**
   * Lazily builds and caches the composed pipeline.
   * Falls back to wrapping fetchMore() if the base context doesn't implement pages().
   */
  private ensurePipeline(diagnosticNode: DiagnosticNodeInternal): AsyncQuerySource {
    if (this.pipeline) return this.pipeline;

    const baseSource = this.baseContext.pages
      ? this.baseContext.pages(diagnosticNode)
      : this.wrapFetchMore(diagnosticNode);

    if (this.transforms.length === 0) {
      this.pipeline = baseSource;
    } else {
      const composed = composeTransforms(...this.transforms);
      this.pipeline = composed(baseSource);
    }

    return this.pipeline;
  }

  /**
   * Wraps a legacy fetchMore()-only ExecutionContext as an AsyncGenerator<QueryPage>.
   * Used as a fallback when the base context doesn't implement pages().
   */
  private async *wrapFetchMore(
    diagnosticNode: DiagnosticNodeInternal,
  ): AsyncGenerator<QueryPage, void, undefined> {
    while (this.baseContext.hasMoreResults()) {
      const response = await this.baseContext.fetchMore(diagnosticNode);
      const items = Array.isArray(response.result) ? response.result : [];
      yield {
        items,
        headers: response.headers,
        partitionKeyRangeMap: new Map(),
        hasMore: this.baseContext.hasMoreResults(),
      };
    }
  }
}
