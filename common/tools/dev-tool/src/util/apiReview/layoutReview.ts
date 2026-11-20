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
    ...layoutUnresolvedReferences(review),
    ...layoutReferences(review),
    ...layoutForgottenDeclarations(review),
    ...layoutSupplementalDeclarations("Module and global augmentations", review.augmentations),
    ...layoutSupplementalDeclarations("Type-only wildcard exports", review.typeOnlyExports),
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
    ...(review.legacyTypeFields.length || review.versionedEntryPoints.length
      ? [
          heading(3, plain("Legacy TypeScript entry points")),
          ...(review.legacyTypeFields.length
            ? [
                paragraph(
                  plain("Root declaration fields: "),
                  ...joinInline(review.legacyTypeFields.map(inlineCode), ", "),
                  plain("."),
                ),
              ]
            : []),
          ...(review.versionedEntryPoints.length
            ? [
                {
                  kind: "table" as const,
                  headers: ["TypeScript versions", "Export path"],
                  rows: review.versionedEntryPoints.map((entry) => [
                    [inlineCode(entry.versions)],
                    [inlineCode(entry.path)],
                  ]),
                },
              ]
            : []),
        ]
      : []),
  ];
}

function layoutSupplementalDeclarations(
  title: string,
  declarations: Review["augmentations"],
): Block[] {
  return declarations.length
    ? [
        heading(2, plain(title)),
        {
          kind: "code",
          language: "ts",
          chunks: declarations.map((declaration) => declaration.code),
        },
      ]
    : [];
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

function layoutUnresolvedReferences(review: Review): Block[] {
  if (!review.unresolvedReferences.length) {
    return [];
  }
  return [
    heading(2, plain("Unresolved references")),
    {
      kind: "table",
      headers: ["Condition", "File", "Problem"],
      rows: review.unresolvedReferences.map(({ condition, file, problem }) => [
        [inlineCode(condition)],
        [inlineCode(file)],
        [plain(problem)],
      ]),
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

function layoutForgottenDeclarations(review: Review): Block[] {
  if (!review.forgottenDeclarations.length) {
    return [];
  }
  return [
    heading(2, plain("Referenced unexported declarations")),
    paragraph(plain("These declarations are not exported but are used in public signatures.")),
    {
      kind: "code",
      language: "ts",
      chunks: review.forgottenDeclarations.map((declaration) => declaration.code),
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
      {
        kind: "code",
        language: "ts",
        chunks: section.differsFromRoot.map((declaration) => declaration.code),
      },
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
  for (const {
    condition,
    references,
    forgottenDeclarations,
    augmentations,
    typeOnlyExports,
    exports,
  } of review.conditionDiffs) {
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
    if (forgottenDeclarations.length) {
      blocks.push(heading(4, plain("Referenced unexported declarations")), {
        kind: "diff",
        items: forgottenDeclarations,
      });
    }
    if (augmentations.length) {
      blocks.push(heading(4, plain("Module and global augmentations")), {
        kind: "diff",
        items: augmentations,
      });
    }
    if (typeOnlyExports.length) {
      blocks.push(heading(4, plain("Type-only wildcard exports")), {
        kind: "diff",
        items: typeOnlyExports,
      });
    }
    for (const changed of exports) {
      const items = [...changed.items];
      if (changed.reExports.length) {
        items.push(
          changed.reExports.flatMap(({ change, reference }) =>
            formatNamedImports("export", reference)
              .split("\n")
              .map((text) => ({ change, text })),
          ),
        );
      }
      blocks.push(heading(4, plain("Export "), inlineCode(changed.path)), {
        kind: "diff",
        items,
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
