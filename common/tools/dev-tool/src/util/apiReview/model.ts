// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// The data that flows between the steps of generateApiReview: buildReview produces a Review,
// layoutReview turns it into document Blocks, and renderMarkdown prints them.

export interface Review {
  name: string;
  version: string;
  entryPoints: { path: string; conditions: string[] }[];
  dependencies: Dependency[];
  references: NamedImports[];
  exportSections: ExportSection[];
  identicalConditions: string[];
  conditionDiffs: ConditionDiff[];
}

export interface ConditionDiff {
  condition: string;
  references: { change: "added" | "removed"; reference: NamedImports }[];
  // One list of diff lines per changed declaration.
  exports: { path: string; items: DiffLine[][] }[];
}

export interface DiffLine {
  change: "same" | "added" | "removed" | "elided";
  text: string;
}

/**
 * A declaration's TypeScript text. A group nests its children between an `open` and a `close`
 * line, such as a module object: `export declare namespace fn {` ... `}`.
 */
export type Code = string | { open: string; children: Code[]; close: string };

export interface NamedImports {
  module: string;
  names: string[];
}

export interface Declaration {
  name: string;
  code: Code;
}

export interface ExportSection {
  path: string;
  declarations: Declaration[];
  reExports: NamedImports[];
  differsFromRoot: Code[];
  alsoExportedFrom: { path: string; names: string[] }[];
}

export interface Dependency {
  name: string;
  specifier?: string;
  resolved?: string;
  hashed: string;
  type: DependencyType;
}

export type DependencyType = "runtime" | "peer";

/**
 * A format-neutral document block. A renderer prints these without knowing about TypeScript or
 * API reviews, so a different renderer (HTML, for example) could replace renderMarkdown.
 */
export type Block =
  | { kind: "heading"; level: number; content: Inline[] }
  | { kind: "paragraph"; content: Inline[] }
  | { kind: "table"; headers: string[]; rows: Inline[][][] }
  | { kind: "list"; items: Inline[][] }
  // Code chunks are separated by a blank line.
  | { kind: "code"; language: string; chunks: Code[] }
  // One list of lines per changed item; items are separated by a blank line.
  | { kind: "diff"; items: DiffLine[][] };

export type Inline = { kind: "text"; text: string } | { kind: "code"; text: string };

// "text" -> "text"
// { open: "ns {", children: ["a", "b"], close: "}" } -> "ns {\n    a\n\n    b\n}"
// The plain-text form of code, used both to diff declarations and to render code blocks.
export function codeText(code: Code): string {
  if (typeof code === "string") {
    return code;
  }
  // Indent every non-empty line (blank lines between children stay empty).
  const body = code.children
    .map(codeText)
    .join("\n\n")
    .replace(/^(?=.)/gm, "    ");
  return `${code.open}\n${body}\n${code.close}`;
}
