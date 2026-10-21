// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiagnosticCategory, formatDiagnostics as formatNativeDiagnostics } from "typescript/async";
import type { Diagnostic } from "typescript/async";
import type { CompileResult } from "./compiler.ts";

/**
 * Map a native diagnostic category to a human-readable label.
 */
export function diagnosticCategoryLabel(category: number): string {
  switch (category) {
    case DiagnosticCategory.Error:
      return "error";
    case DiagnosticCategory.Warning:
      return "warning";
    case DiagnosticCategory.Suggestion:
      return "suggestion";
    case DiagnosticCategory.Message:
      return "message";
    default:
      return "unknown";
  }
}

/**
 * Preserve native message chains, positions, and related information.
 */
export function formatSingleDiagnostic(diag: Diagnostic, prefix: string): string {
  return formatNativeDiagnostics([diag], {
    getCurrentDirectory: () => process.cwd(),
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => "\n",
  })
    .trimEnd()
    .split("\n")
    .map((line) => `${prefix} ${line}`)
    .join("\n");
}

/**
 * Format diagnostics from multiple targets with [target] prefix.
 * Serialises diagnostics by target so output is grouped and readable.
 */
export function formatDiagnostics(results: CompileResult[]): string {
  const lines: string[] = [];

  for (const result of results) {
    if (result.diagnostics.length === 0) continue;

    const prefix = `[${result.target.name}]`;
    for (const diag of result.diagnostics) {
      lines.push(formatSingleDiagnostic(diag, prefix));
    }
  }

  return lines.join("\n");
}
