// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EnrichedThread } from "./types.ts";

/**
 * Renders enriched threads as JSONL (one JSON object per line).
 * Each line is a self-contained JSON object suitable for loading
 * into pandas, feeding into embeddings, or processing with jq.
 */
export function renderJsonl(threads: EnrichedThread[]): string {
  return threads
    .map((thread) =>
      JSON.stringify({
        pr: thread.pr,
        path: thread.path,
        isResolved: thread.isResolved,
        isOutdated: thread.isOutdated,
        targetLine: thread.targetLine,
        diffHunk: thread.diffHunk,
        highlightedHunk: thread.highlightedHunk,
        threadUrl: thread.threadUrl,
        line: thread.line,
        originalLine: thread.originalLine,
        comments: thread.comments.map((c) => ({
          author: c.author,
          body: c.body,
          createdAt: c.createdAt,
          url: c.url,
        })),
      }),
    )
    .join("\n");
}
