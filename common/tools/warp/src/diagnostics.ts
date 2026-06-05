// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as ts from "typescript";
import type { CompileResult } from "./compiler.ts";

/**
 * Map a ts.DiagnosticCategory to a human-readable label.
 * Shared between sequential formatting and worker-thread formatting.
 */
export function diagnosticCategoryLabel(category: ts.DiagnosticCategory): string {
  switch (category) {
    case ts.DiagnosticCategory.Error:
      return "error";
    case ts.DiagnosticCategory.Warning:
      return "warning";
    case ts.DiagnosticCategory.Suggestion:
      return "suggestion";
    case ts.DiagnosticCategory.Message:
      return "message";
    default:
      return "unknown";
  }
}

/**
 * Format a single ts.Diagnostic into a prefixed string.
 * Reusable from both the main thread and worker threads.
 */
export function formatSingleDiagnostic(diag: ts.Diagnostic, prefix: string): string {
  const category = diagnosticCategoryLabel(diag.category);
  const message = ts.flattenDiagnosticMessageText(diag.messageText, "\n");

  if (diag.file && diag.start !== undefined) {
    const { line, character } = diag.file.getLineAndCharacterOfPosition(diag.start);
    return `${prefix} ${diag.file.fileName}(${line + 1},${character + 1}): ${category} TS${diag.code}: ${message}`;
  }
  return `${prefix} ${category} TS${diag.code}: ${message}`;
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
