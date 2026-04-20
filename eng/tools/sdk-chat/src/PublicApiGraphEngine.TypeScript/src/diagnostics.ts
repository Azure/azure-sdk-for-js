// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Structured diagnostic emitter for stderr.
 *
 * Emits one JSON object per line so the C# host can parse structured fields
 * (code, target, message, severity) instead of treating every stderr line as
 * a generic SDKWARN.
 */

export interface StderrDiagnostic {
    readonly code: string;
    readonly message: string;
    readonly severity: "info" | "warning" | "error";
    readonly target?: string;
}

/**
 * Writes a single structured diagnostic as a JSON line to stderr.
 */
export function emitDiagnostic(diagnostic: StderrDiagnostic): void {
    process.stderr.write(JSON.stringify(diagnostic) + "\n");
}
