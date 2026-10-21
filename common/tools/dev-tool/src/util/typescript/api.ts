// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SourceFile } from "typescript/ast";
import { API } from "typescript/sync";

/**
 * A native TypeScript API client shared by everything running at the same time, so overlapping
 * operations reuse one compiler process instead of spawning one each.
 */
let shared: { api: API; users: number } | undefined;

/**
 * Runs an operation with a TypeScript API client and closes the client once no operation is using
 * it. Everything the client hands out (programs, snapshots, retained source files) is only valid
 * until then, so dispose of each of them before the operation returns.
 *
 * @param operation - receives the client
 * @returns the operation's result
 */
export async function withTypeScriptApi<T>(operation: (api: API) => T | Promise<T>): Promise<T> {
  const session = (shared ??= { api: new API(), users: 0 });
  session.users++;
  try {
    return await operation(session.api);
  } finally {
    if (--session.users === 0) {
      if (shared === session) {
        shared = undefined;
      }
      session.api.close();
    }
  }
}

/**
 * Parses text as a source file and disposes of the retained file afterwards.
 *
 * @param api - the TypeScript API client
 * @param fileName - the name that determines the script kind (`.ts`, `.js`, ...) and appears in diagnostics
 * @param text - the source text
 * @param operation - receives the parsed file, which must not be used after the operation returns
 * @returns the operation's result
 */
export function withSourceFile<T>(
  api: API,
  fileName: string,
  text: string,
  operation: (sourceFile: SourceFile) => T,
): T {
  const retained = api.createSourceFile(fileName, text);
  try {
    return operation(retained.sourceFile);
  } finally {
    retained.dispose();
  }
}
