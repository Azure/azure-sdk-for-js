// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Step 2: turns a Review into a format-neutral document. This is the last step that knows about
// API reviews; renderMarkdown only knows the document model.

import type { Block, Dependency, ExportSection, Inline, NamedImports, Review } from "./model.ts";

// Dependencies table columns, in order. A column renders only when the rows have that field.
const dependencyColumns: [field: keyof Dependency, header: string][] = [
  ["name", "Package"],
  ["specifier", "Version specifier"],
  ["resolved", "Resolved version"],
  ["hashed", "Hashed version"],
  ["type", "Type"],
];

const plain = (text: string): Inline => ({ kind: "text", text });
const inlineCode = (text: string): Inline => ({ kind: "code", text });
const heading = (level: number, ...content: Inline[]): Block => ({
  kind: "heading",
  level,
  content,
});
const paragraph = (...content: Inline[]): Block => ({ kind: "paragraph", content });

// ([inlineCode("a"), inlineCode("b")], ", ") -> [inlineCode("a"), plain(", "), inlineCode("b")]
function joinInline(parts: Inline[], separator: string): Inline[] {
  return parts.flatMap((part, index) => (index ? [plain(separator), part] : [part]));
}

export function layoutReview(review: Review): Block[] {
  return [
    heading(1, plain("API review: "), inlineCode(review.name)),
    ...layoutEntryPoints(review),
    ...layoutDependencies(review),
    ...layoutReferences(review),
    ...review.exportSections.flatMap((section, _, [root]) =>
      layoutExportSection(section, root.path),
    ),
    ...layoutRuntimeDifferences(review),
  ];
}

function layoutEntryPoints(review: Review): Block[] {
  return [
    heading(2, plain("Entry points")),
    {
      kind: "table",
      headers: ["Export path", "Conditions"],
      rows: review.entryPoints.map((entry) => [
        [inlineCode(entry.path)],
        joinInline(entry.conditions.map(inlineCode), ", "),
      ]),
    },
  ];
}

function layoutDependencies(review: Review): Block[] {
  if (!review.dependencies.length) {
    return [];
  }
  const columns = dependencyColumns.filter(([field]) =>
    review.dependencies.some((dependency) => dependency[field] !== undefined),
  );
  return [
    heading(2, plain("Dependencies")),
    paragraph(plain("Only Hashed version is part of the review hash.")),
    {
      kind: "table",
      headers: columns.map(([, header]) => header),
      rows: review.dependencies.map((dependency) =>
        columns.map(([field]) => [
          field === "type" ? plain(dependency.type) : inlineCode(dependency[field] ?? ""),
        ]),
      ),
    },
  ];
}

function layoutReferences(review: Review): Block[] {
  if (!review.references.length) {
    return [];
  }
  return [
    heading(2, plain("References")),
    {
      kind: "code",
      language: "ts",
      chunks: [
        review.references.map((imports) => formatNamedImports("import", imports)).join("\n"),
      ],
    },
  ];
}

function layoutExportSection(section: ExportSection, rootPath: string): Block[] {
  const blocks = [heading(2, plain("Export "), inlineCode(section.path))];
  if (section.declarations.length || section.reExports.length) {
    if (section.path !== rootPath) {
      blocks.push(heading(3, plain("Not exported from "), inlineCode(rootPath)));
    }
    const reExports = section.reExports
      .map((reExport) => formatNamedImports("export", reExport))
      .join("\n");
    blocks.push({
      kind: "code",
      language: "ts",
      chunks: [
        ...section.declarations.map((declaration) => declaration.code),
        ...(reExports ? [reExports] : []),
      ],
    });
  }
  if (section.differsFromRoot.length) {
    blocks.push(
      heading(3, plain("Differs from "), inlineCode(rootPath)),
      paragraph(
        plain("Same name as an Export "),
        inlineCode(rootPath),
        plain(" export, but a different declaration."),
      ),
      { kind: "code", language: "ts", chunks: section.differsFromRoot },
    );
  }
  for (const earlier of section.alsoExportedFrom) {
    blocks.push(
      heading(3, plain("Also exported from "), inlineCode(earlier.path)),
      paragraph(plain("Definitions are shown under Export "), inlineCode(earlier.path), plain(".")),
      { kind: "list", items: earlier.names.map((name) => [inlineCode(name)]) },
    );
  }
  return blocks;
}

function layoutRuntimeDifferences(review: Review): Block[] {
  const blocks: Block[] = [];
  if (review.identicalConditions.length) {
    blocks.push(
      paragraph(
        plain("Identical to the ESM view: "),
        ...joinInline(review.identicalConditions.map(inlineCode), ", "),
        plain("."),
      ),
    );
  }
  for (const { condition, references, exports } of review.conditionDiffs) {
    blocks.push(heading(3, inlineCode(condition)));
    if (references.length) {
      blocks.push(heading(4, plain("References")), {
        kind: "diff",
        items: [
          references.flatMap(({ change, reference }) =>
            formatNamedImports("import", reference)
              .split("\n")
              .map((text) => ({ change, text })),
          ),
        ],
      });
    }
    for (const changed of exports) {
      blocks.push(heading(4, plain("Export "), inlineCode(changed.path)), {
        kind: "diff",
        items: changed.items,
      });
    }
  }
  return blocks.length ? [heading(2, plain("Runtime differences")), ...blocks] : [];
}

// ("import", { module: "m", names: ["A"] })      -> 'import { A } from "m";'
// ("export", { module: "m", names: ["A", "B"] }) -> 'export {\n    A,\n    B,\n} from "m";'
function formatNamedImports(keyword: "import" | "export", { module, names }: NamedImports): string {
  const list =
    names.length === 1
      ? `{ ${names[0]} }`
      : `{\n${names.map((name) => `    ${name},`).join("\n")}\n}`;
  return `${keyword} ${list} from "${module}";`;
}
