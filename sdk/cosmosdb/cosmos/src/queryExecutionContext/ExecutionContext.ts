// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../request/index.js";
import type { AsyncQuerySource } from "./AsyncQuerySource.js";

/** @hidden */
export interface ExecutionContext {
  /**
   * Returns true if more results are available.
   *
   * After `dispose()` is called, this must return false.
   */
  hasMoreResults(): boolean;

  /**
   * Fetches the next batch of results.
   *
   * @param diagnosticNode Diagnostic node for tracing and metrics.
   * @returns A promise that resolves to the next batch of results.
   * @throws After `dispose()` is called, must reject with an appropriate error.
   */
  fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<unknown>>;

  /**
   * Returns an AsyncGenerator that yields typed QueryPage objects.
   * This is the preferred internal execution primitive — transforms
   * compose over this stream rather than wrapping fetchMore() calls.
   *
   * Initially wraps fetchMore() for incremental adoption.
   * In a future major version, the relationship inverts:
   * pages() becomes the primitive and fetchMore() wraps it.
   *
   * @param diagnosticNode Diagnostic node for tracing and metrics.
   * @returns An AsyncGenerator yielding QueryPage objects.
   * @internal
   */
  pages?(diagnosticNode: DiagnosticNodeInternal): AsyncQuerySource;

  /**
   * Releases resources held by this execution context.
   *
   * **Lifecycle Contract:**
   * - Must be idempotent — safe to call multiple times without side effects
   * - After disposal, `hasMoreResults()` must return false
   * - After disposal, `fetchMore()` must reject
   * - Implementations must clean up any background operations, timers, or network requests
   * - Extensions (e.g., custom ExecutionContext implementations) must implement this
   *   to clean up their own resources before calling the parent dispose()
   */
  dispose(): void;
}

/** @hidden */
export const enum ExecutionContextState {
  Uninitialized = "uninitialized",
  Active = "active",
  Done = "done",
  Disposed = "disposed",
}
