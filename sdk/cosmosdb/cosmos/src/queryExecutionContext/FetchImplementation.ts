// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../request/index.js";

/**
 * @hidden
 * @deprecated QueryControl semantics are now the default.
 * This interface will be removed in a future major version.
 */
export interface FetchImplementation {
  fetchMore(diagnosticNode: DiagnosticNodeInternal, fetchBuffer: unknown[]): Promise<Response<unknown>>;
  dispose(): void;
}
