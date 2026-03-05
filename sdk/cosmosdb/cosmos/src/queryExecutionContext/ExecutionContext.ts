// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../request/index.js";

/** @hidden */
export interface ExecutionContext {
  /** Returns true if more results are available. */
  hasMoreResults(): boolean;

  /** Fetches the next batch of results. */
  fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<unknown>>;

  /**
   * Releases resources held by this execution context.
   * Idempotent — safe to call multiple times.
   * After dispose(), hasMoreResults() returns false and fetchMore() rejects.
   */
  dispose(): void;
}
