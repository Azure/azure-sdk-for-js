// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EnrichedThread } from "./types.ts";

/** Renders enriched threads as a flat chronological markdown document. */
export function renderMarkdown(threads: EnrichedThread[], since: string, until: string): string {
  const lines: string[] = [];

  lines.push("# Architecture Review Feedback Catalog");
  lines.push("");
  lines.push("Extracted from pull request review comments on `review/*.api.md` files");
  lines.push(`in the Azure SDK for JavaScript repository (**${since}** to **${until}**).`);
  lines.push("");
  lines.push(
    `**${threads.length} review threads** across ${uniquePRCount(threads)} pull requests.`,
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // Sort by PR number, then by first comment date
  const sorted = [...threads].sort((a, b) => {
    if (a.pr !== b.pr) return a.pr - b.pr;
    const aDate = a.comments[0]?.createdAt ?? "";
    const bDate = b.comments[0]?.createdAt ?? "";
    return aDate.localeCompare(bDate);
  });

  for (const thread of sorted) {
    // Code context
    lines.push("````diff");
    lines.push(thread.highlightedHunk);
    lines.push("````");
    lines.push("");

    // Thread comments
    for (const comment of thread.comments) {
      const body = comment.body.replace(/\n{3,}/g, "\n\n");
      lines.push(`**${comment.author}:**`);
      lines.push("");
      lines.push(body);
      lines.push("");
    }

    // Links
    const status = thread.isResolved ? "✅ Resolved" : "⏳ Unresolved";
    lines.push(
      `> ${status} · [Thread](${thread.threadUrl}) · [PR #${thread.pr}](https://github.com/Azure/azure-sdk-for-js/pull/${thread.pr}) · \`${thread.path}\``,
    );
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
}

function uniquePRCount(threads: EnrichedThread[]): number {
  return new Set(threads.map((t) => t.pr)).size;
}
