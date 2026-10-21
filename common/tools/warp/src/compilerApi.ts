// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as path from "node:path";
import { API } from "typescript/async";
import type { SourceFile } from "typescript/ast";

export function nativePath(fileName: string): string {
  return path.resolve(fileName).split(path.sep).join("/");
}

export async function withCompilerApi<T>(
  api: API | undefined,
  action: (api: API) => Promise<T>,
): Promise<T> {
  if (api) return action(api);
  const owned = new API();
  try {
    return await action(owned);
  } finally {
    await owned.close();
  }
}

export async function withSourceFile<T>(
  fileName: string,
  content: string,
  action: (sourceFile: SourceFile) => T,
  api?: API,
): Promise<T> {
  return withCompilerApi(api, async (client) => {
    const lease = await client.createSourceFile(nativePath(fileName), content);
    try {
      return action(lease.sourceFile);
    } finally {
      await lease.dispose();
    }
  });
}
