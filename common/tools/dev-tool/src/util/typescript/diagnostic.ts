// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import ts from "typescript";
import { EOL } from "os";

/**
 * The type of the emitter function.
 */
export type EmitError = (message: string, node: ts.Node, suggest?: string) => void;

/**
 * Create a diagnostic emitter for a given TypeScript source file.
 * @param sourceFile - the source file where node errors appear
 * @param onError - an optional error callback
 * @returns a function that, when called, will print a TypeScript error to console.error
 */
export function createDiagnosticEmitter(
  sourceFile: ts.SourceFile,
  onError?: (e: string) => void
): EmitError {
  const diagnosticHost = {
    getNewLine: () => EOL,
    getCanonicalFileName: (name: string) => name,
    getCurrentDirectory: () => process.cwd(),
  };

  return (message: string, node: ts.Node, suggest?: string) => {
    const [start, end] = [node.getStart(sourceFile), node.getEnd()];
    const diagnostic: ts.Diagnostic = {
      category: ts.DiagnosticCategory.Error,
      // I am intentionally lying to the compiler here to bypass the error code
      code: "-AZURE" as never,
      file: sourceFile,
      start,
      length: end - start,
      messageText: message,
    };

    if (suggest) {
      diagnostic.relatedInformation = [
        {
          category: ts.DiagnosticCategory.Message,
          code: 0,
          messageText: "Suggestion: " + suggest,
          file: undefined,
          start: undefined,
          length: undefined,
        },
      ];
    }

    const formatted = ts.formatDiagnosticsWithColorAndContext([diagnostic], diagnosticHost);

    console.error(formatted);

    onError?.(formatted);
  };
}
