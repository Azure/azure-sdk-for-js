// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Step 3: prints the document as Markdown, blocks separated by a blank line.

import type { Block, DiffLine, Inline } from "./model.ts";
import { codeText } from "./model.ts";

export function renderMarkdown(blocks: Block[]): string {
  return `${blocks.map(renderBlock).join("\n\n")}\n`;
}

function renderBlock(block: Block): string {
  switch (block.kind) {
    case "heading":
      return `${"#".repeat(block.level)} ${renderInline(block.content)}`;
    case "paragraph":
      return renderInline(block.content);
    case "table":
      return [
        block.headers,
        block.headers.map(() => "---"),
        ...block.rows.map((row) => row.map(renderInline)),
      ]
        .map((cells) => `| ${cells.join(" | ")} |`)
        .join("\n");
    case "list":
      return block.items.map((item) => `- ${renderInline(item)}`).join("\n");
    case "code":
      return fence(block.language, block.chunks.map(codeText).join("\n\n"));
    case "diff":
      return fence(
        "diff",
        block.items.map((item) => item.map(renderDiffLine).join("\n")).join("\n\n"),
      );
  }
}

function renderInline(content: Inline[]): string {
  return content.map((part) => (part.kind === "code" ? `\`${part.text}\`` : part.text)).join("");
}

const diffPrefixes = { same: " ", added: "+", removed: "-" };

function renderDiffLine({ change, text }: DiffLine): string {
  return change === "elided" ? "@@" : `${diffPrefixes[change]}${text}`;
}

function fence(language: string, body: string): string {
  return `\`\`\`${language}\n${body}\n\`\`\``;
}
