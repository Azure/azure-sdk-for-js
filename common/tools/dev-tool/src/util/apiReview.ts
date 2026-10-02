// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { structuredPatch } from "diff";
import semver from "semver";
import ts from "typescript";
import { loadPnpmWorkspaceCatalogs, resolveCatalogVersion } from "./pnpm.ts";

// generateApiReview runs in three steps:
// 1. buildReview reads the package's built declaration files into a Review (the API surface).
// 2. layoutReview turns the Review into a format-neutral document (Block[]).
// 3. renderMarkdown prints the document. Only this step knows the output format.

type ExportConditions = Record<string, { types: string }>;

interface Review {
  name: string;
  version: string;
  entryPoints: { path: string; conditions: string[] }[];
  dependencies: Dependency[];
  references: NamedImports[];
  exportSections: ExportSection[];
  identicalConditions: string[];
  conditionDiffs: ConditionDiff[];
}

interface ConditionDiff {
  condition: string;
  // One list of diff lines per changed declaration.
  exports: { path: string; items: DiffLine[][] }[];
}

interface DiffLine {
  change: "same" | "added" | "removed" | "elided";
  text: string;
}

/**
 * A declaration's TypeScript text. A group nests its children between an `open` and a `close`
 * line, such as a module object: `export declare namespace fn {` ... `}`.
 */
type Code = string | { open: string; children: Code[]; close: string };

interface NamedImports {
  module: string;
  names: string[];
}

interface Declaration {
  name: string;
  code: Code;
}

interface ExportSection {
  path: string;
  declarations: Declaration[];
  reExports: NamedImports[];
  differsFromRoot: Code[];
  alsoExportedFrom: { path: string; names: string[] }[];
}

/**
 * How references inside printed declarations appear in the review.
 */
interface ReferenceNames {
  /** The exported name a reference prints as, when it differs from the source. */
  rewritten(node: ts.Node): string | undefined;
  /** The name of a package-local declaration that no export path exposes. */
  forgotten(identifier: ts.Identifier): string | undefined;
}

// Non-ESM conditions, in the order the review lists them.
const runtimeConditions = ["require", "browser", "react-native", "workerd"];
const conditionOrder = ["import", ...runtimeConditions];

interface Dependency {
  name: string;
  specifier?: string;
  resolved?: string;
  hashed: string;
  type: DependencyType;
}

// Dependencies table columns, in order. A column renders only when the rows have that field.
const dependencyColumns: [field: keyof Dependency, header: string][] = [
  ["name", "Package"],
  ["specifier", "Version specifier"],
  ["resolved", "Resolved version"],
  ["hashed", "Hashed version"],
  ["type", "Type"],
];

type DependencyType = "runtime" | "peer";

const dependencyFields: [field: string, type: DependencyType][] = [
  ["dependencies", "runtime"],
  ["peerDependencies", "peer"],
];

// Bump when the api.md format changes. Baseline and target reviews must use the same parser.
const parserVersion = "1.0.0";

/**
 * The contents of api.metadata.yml. Only `apiMdSha256` identifies the reviewed API surface.
 */
export interface ApiReviewMetadata {
  apiMdSha256: string;
  packageVersion: string;
  parserVersion: string;
  typescriptVersion: string;
}

export async function generateApiReview(packageRoot: string): Promise<{
  apiMd: string;
  metadata: ApiReviewMetadata;
}> {
  const review = await buildReview(packageRoot);
  return {
    apiMd: renderMarkdown(layoutReview(review)),
    metadata: {
      apiMdSha256: hashApiMd(review),
      packageVersion: review.version,
      parserVersion,
      typescriptVersion: ts.version,
    },
  };
}

/**
 * Hashes api.md as rendered from a copy of the review in which dependencies keep only their
 * hashed version, so the Version specifier and Resolved version columns aren't hashed.
 */
function hashApiMd(review: Review): string {
  const hashInput: Review = {
    ...review,
    // [{ name: "tslib", specifier: "catalog:", resolved: "^2.8.1", hashed: "2", type: "runtime" }]
    //   -> [{ name: "tslib", hashed: "2", type: "runtime" }]
    dependencies: review.dependencies.map(({ name, hashed, type }) => ({ name, hashed, type })),
  };
  return createHash("sha256")
    .update(renderMarkdown(layoutReview(hashInput)))
    .digest("hex");
}

/**
 * Resolves `catalog:` and `workspace:^` specifiers to what `pnpm pack` publishes.
 */
async function resolveSpecifier(
  packageRoot: string,
  name: string,
  specifier: string,
): Promise<string> {
  if (specifier.startsWith("catalog:")) {
    await loadPnpmWorkspaceCatalogs();
    return resolveCatalogVersion(name, specifier);
  }
  if (specifier === "workspace:^") {
    const installed = path.join(packageRoot, "node_modules", name, "package.json");
    return `^${JSON.parse(await readFile(installed, "utf8")).version}`;
  }
  return specifier;
}

/**
 * Reduces a range to its major version (`^1.9.0` becomes `1`, `^0.4.2` becomes `0.4`) so routine
 * bumps keep the hash. Exact prereleases and non-semver specifiers stay verbatim.
 */
function compatibleVersion(specifier: string): string {
  if (semver.prerelease(specifier)) {
    return specifier;
  }
  const minimum = semver.validRange(specifier) ? semver.minVersion(specifier) : null;
  if (!minimum) {
    return specifier;
  }
  return minimum.major === 0 ? `0.${minimum.minor}` : `${minimum.major}`;
}

async function buildReview(packageRoot: string): Promise<Review> {
  const packageJson = JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8"));
  const exportEntries = Object.entries<ExportConditions>(packageJson.exports)
    .filter(([exportPath]) => exportPath !== "./package.json")
    .sort(([a], [b]) => a.localeCompare(b, "en"));

  const exportFiles = (condition: string): { path: string; file: string }[] =>
    exportEntries.map(([exportPath, conditions]) => ({
      path: exportPath,
      file: path.join(packageRoot, conditions[condition].types),
    }));

  const { references, sections } = buildExportSections(
    packageRoot,
    "import",
    exportFiles("import"),
  );
  const presentConditions = runtimeConditions.filter((condition) =>
    exportEntries.some(([, conditions]) => condition in conditions),
  );
  const { identicalConditions, conditionDiffs } = compareConditions(
    sections,
    presentConditions.map((condition) => ({
      condition,
      sections: buildExportSections(packageRoot, condition, exportFiles(condition)).sections,
    })),
  );

  return {
    name: packageJson.name,
    version: packageJson.version,
    entryPoints: exportEntries.map(([exportPath, conditions]) => ({
      path: exportPath,
      conditions: Object.keys(conditions).sort(
        (a, b) => conditionOrder.indexOf(a) - conditionOrder.indexOf(b),
      ),
    })),
    // { dependencies: { tslib: "catalog:" }, peerDependencies: { pg: ">=8.0.0" } }
    //   -> [{ name: "pg", specifier: ">=8.0.0", resolved: ">=8.0.0", hashed: "8", type: "peer" },
    //       { name: "tslib", specifier: "catalog:", resolved: "^2.8.1", hashed: "2", type: "runtime" }]
    dependencies: await Promise.all(
      dependencyFields
        .flatMap(([field, type]) =>
          Object.entries<string>(packageJson[field] ?? {}).map(([name, specifier]) => ({
            name,
            specifier,
            type,
          })),
        )
        .sort((a, b) => a.name.localeCompare(b.name, "en"))
        .map(async (dependency) => {
          const resolved = await resolveSpecifier(
            packageRoot,
            dependency.name,
            dependency.specifier,
          );
          return { ...dependency, resolved, hashed: compatibleVersion(resolved) };
        }),
    ),
    references,
    exportSections: sections,
    identicalConditions,
    conditionDiffs,
  };
}

/**
 * Compares each condition's view with the ESM view, item by item.
 */
function compareConditions(
  esmSections: ExportSection[],
  views: { condition: string; sections: ExportSection[] }[],
): { identicalConditions: string[]; conditionDiffs: ConditionDiff[] } {
  const identicalConditions: string[] = [];
  const conditionDiffs: ConditionDiff[] = [];
  for (const { condition, sections } of views) {
    if (isDeepStrictEqual(sections, esmSections)) {
      identicalConditions.push(condition);
      continue;
    }
    conditionDiffs.push({
      condition,
      exports: esmSections
        .map((esmSection, index) => ({
          path: esmSection.path,
          items: diffItems(esmSection.declarations, sections[index].declarations),
        }))
        .filter((changed) => changed.items.length),
    });
  }
  return { identicalConditions, conditionDiffs };
}

/**
 * Diffs two views of an export section by declaration name, sorted by name.
 */
// ESM [{ name: "A", code: a }, { name: "B", code: b }] vs browser [{ name: "B", code: b2 }, { name: "C", code: c }]
//   -> [lines("removed", a), diffItem(b, b2), lines("added", c)]
function diffItems(esm: Declaration[], other: Declaration[]): DiffLine[][] {
  const textByName = (declarations: Declaration[]): Map<string, string> =>
    new Map(declarations.map((declaration) => [declaration.name, codeText(declaration.code)]));
  const esmByName = textByName(esm);
  const otherByName = textByName(other);
  const names = [...new Set([...esmByName.keys(), ...otherByName.keys()])].sort((a, b) =>
    a.localeCompare(b, "en"),
  );
  return names.flatMap((name) => {
    const before = esmByName.get(name);
    const after = otherByName.get(name);
    if (before === after) {
      return [];
    }
    if (after === undefined) {
      return [lines("removed", before!)];
    }
    if (before === undefined) {
      return [lines("added", after)];
    }
    return [diffItem(before, after)];
  });
}

function lines(change: DiffLine["change"], text: string): DiffLine[] {
  return text.split("\n").map((line) => ({ change, text: line }));
}

/**
 * Diffs one declaration, always keeping its first line (the header) and marking omitted lines as
 * elided.
 */
function diffItem(before: string, after: string): DiffLine[] {
  const { hunks } = structuredPatch("", "", `${before}\n`, `${after}\n`, "", "", { context: 2 });
  const beforeLines = before.split("\n");
  const elided: DiffLine = { change: "elided", text: "" };
  const result: DiffLine[] = [];
  let shownThrough = 0;
  if (hunks[0].oldStart > 1) {
    result.push({ change: "same", text: beforeLines[0] });
    shownThrough = 1;
  }
  for (const hunk of hunks) {
    if (hunk.oldStart > shownThrough + 1) {
      result.push(elided);
    }
    // structuredPatch prefixes each line with " ", "-" or "+".
    result.push(
      ...hunk.lines.map((line): DiffLine => ({
        change: line[0] === "+" ? "added" : line[0] === "-" ? "removed" : "same",
        text: line.slice(1),
      })),
    );
    shownThrough = hunk.oldStart + hunk.oldLines - 1;
  }
  if (shownThrough < beforeLines.length) {
    result.push(elided);
  }
  return result;
}

// Layout: turns a Review into a format-neutral document. This is the last step that knows about
// API reviews. Phase 2 (renderMarkdown) only knows the document model.

/**
 * A format-neutral document block. A renderer prints these without knowing about TypeScript or
 * API reviews, so a different renderer (HTML, for example) could replace renderMarkdown.
 */
type Block =
  | { kind: "heading"; level: number; content: Inline[] }
  | { kind: "paragraph"; content: Inline[] }
  | { kind: "table"; headers: string[]; rows: Inline[][][] }
  | { kind: "list"; items: Inline[][] }
  // Code chunks are separated by a blank line.
  | { kind: "code"; language: string; chunks: Code[] }
  // One list of lines per changed item; items are separated by a blank line.
  | { kind: "diff"; items: DiffLine[][] };

type Inline = { kind: "text"; text: string } | { kind: "code"; text: string };

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

function layoutReview(review: Review): Block[] {
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
  for (const { condition, exports } of review.conditionDiffs) {
    blocks.push(heading(3, inlineCode(condition)));
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

// "text" -> "text"
// { open: "ns {", children: ["a", "b"], close: "}" } -> "ns {\n    a\n\n    b\n}"
// The plain-text form of code, used both to diff declarations and to render code blocks.
function codeText(code: Code): string {
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

// Phase 2: prints the document as Markdown, blocks separated by a blank line.

function renderMarkdown(blocks: Block[]): string {
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

const compilerHost = createLibCachingHost({ skipLibCheck: true });

/**
 * `import` and `require` resolve like Node.js (the module format comes from the nearest
 * package.json); other conditions resolve like a bundler that targets that condition.
 * Every view gets the package's own `@types/node`, because declarations shared across targets
 * (and some browser builds) reference Node.js built-in modules.
 */
function compilerOptionsFor(condition: string, packageRoot: string): ts.CompilerOptions {
  const shared: ts.CompilerOptions = {
    // assertComplete relies on diagnostics for the package's own declaration files.
    skipDefaultLibCheck: true,
    types: ["node"],
    typeRoots: [path.join(packageRoot, "node_modules", "@types")],
  };
  return condition === "import" || condition === "require"
    ? {
        ...shared,
        module: ts.ModuleKind.NodeNext,
        moduleResolution: ts.ModuleResolutionKind.NodeNext,
      }
    : {
        ...shared,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        customConditions: [condition],
      };
}

// Cannot find module (2307, 2792), no exported member (2305, 2614, 2694, 2724), and cannot find
// type definition (2688). Other diagnostics are ignored: the review doesn't type-check.
const resolutionErrorCodes = new Set([2307, 2792, 2305, 2614, 2694, 2724, 2688]);

/**
 * Throws when the review would be silently incomplete: implementation files in the program, or
 * modules and names that don't resolve (they would otherwise quietly become unresolved types).
 */
function assertComplete(program: ts.Program, condition: string, packageRoot: string): void {
  const packageFiles = program
    .getSourceFiles()
    .filter(
      (file) =>
        !program.isSourceFileFromExternalLibrary(file) && !program.isSourceFileDefaultLibrary(file),
    );

  for (const file of packageFiles) {
    if (!file.isDeclarationFile) {
      throw new Error(
        `[${condition}] ${path.relative(packageRoot, file.fileName)}: Implementation file is part of the review program`,
      );
    }
  }
  for (const file of packageFiles) {
    const unresolved = program
      .getSemanticDiagnostics(file)
      .find((diagnostic) => resolutionErrorCodes.has(diagnostic.code));
    if (unresolved) {
      throw new Error(
        `[${condition}] ${path.relative(packageRoot, file.fileName)}: ${ts.flattenDiagnosticMessageText(unresolved.messageText, " ")}`,
      );
    }
  }
}

/**
 * Parsing TypeScript's default lib files dominates program creation, so parse them once per
 * process and share them across programs (as the language service's DocumentRegistry does).
 */
function createLibCachingHost(options: ts.CompilerOptions): ts.CompilerHost {
  const host = ts.createCompilerHost(options);
  const libDirectory = path.dirname(ts.getDefaultLibFilePath(options));
  const libFiles = new Map<string, ts.SourceFile | undefined>();
  const getSourceFile = host.getSourceFile;
  host.getSourceFile = (fileName, languageVersion, ...rest) => {
    if (path.dirname(fileName) !== libDirectory) {
      return getSourceFile(fileName, languageVersion, ...rest);
    }
    const key = `${fileName}:${JSON.stringify(languageVersion)}`;
    if (!libFiles.has(key)) {
      libFiles.set(key, getSourceFile(fileName, languageVersion, ...rest));
    }
    return libFiles.get(key);
  };
  return host;
}

/**
 * Prints each declaration under the first export path (`.` first, then by path) that exposes it.
 * Later paths list it by name under "Also exported from". A new declaration that reuses a root
 * export's name goes under "Differs from".
 */
function buildExportSections(
  packageRoot: string,
  condition: string,
  exportFiles: { path: string; file: string }[],
): {
  references: NamedImports[];
  sections: ExportSection[];
} {
  const program = ts.createProgram(
    exportFiles.map((exportFile) => exportFile.file),
    compilerOptionsFor(condition, packageRoot),
    compilerHost,
  );
  assertComplete(program, condition, packageRoot);
  const checker = program.getTypeChecker();
  const printer = ts.createPrinter();
  const shownUnder = new Map<ts.Symbol, string>();
  const rootNames = new Set<string>();
  const references = new Map<string, Set<string>>();

  const resolveAlias = (symbol: ts.Symbol): ts.Symbol =>
    symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;

  const exportsOf = (moduleSymbol: ts.Symbol): ts.Symbol[] =>
    checker.getExportsOfModule(moduleSymbol).sort((a, b) => a.name.localeCompare(b.name, "en"));

  // `export * as fn from "./fn.js"` and `import * as fn ...; export { fn }` export a whole module.
  const isModuleObject = (symbol: ts.Symbol): boolean =>
    symbol.declarations?.some(ts.isSourceFile) ?? false;

  const exportsByFile = exportFiles.map(({ file }) =>
    exportsOf(checker.getSymbolAtLocation(program.getSourceFile(file)!)!),
  );

  // Everything reachable through an export path, including members of exported module objects.
  const exposed = new Set<ts.Symbol>();
  const expose = (symbols: ts.Symbol[]): void => {
    for (const symbol of symbols.map(resolveAlias)) {
      if (!exposed.has(symbol)) {
        exposed.add(symbol);
        if (isModuleObject(symbol)) {
          expose(exportsOf(symbol));
        }
      }
    }
  };
  expose(exportsByFile.flat());

  // A module object is a group: `export declare namespace <name> {`, its exports, `}`.
  const printModuleObject = (name: string, moduleSymbol: ts.Symbol): Code => ({
    open: `export declare namespace ${name} {`,
    children: exportsOf(moduleSymbol).map((member) => {
      const target = resolveAlias(member);
      return isModuleObject(target)
        ? printModuleObject(member.name, target)
        : printDeclarations(target, member.name, printer, referenceNames).join("\n\n");
    }),
    close: "}",
  });

  const referenceNames: ReferenceNames = {
    rewritten: (node) => {
      const reference = resolveReference(program, node);
      if (reference?.module) {
        references.set(
          reference.module,
          (references.get(reference.module) ?? new Set()).add(reference.name),
        );
      }
      return reference?.name;
    },
    forgotten: (identifier) => {
      const symbol = checker.getSymbolAtLocation(identifier);
      const target = symbol && resolveAlias(symbol);
      const parent = target?.declarations?.[0]?.parent;
      if (!target || !parent || !ts.isSourceFile(parent) || exposed.has(target)) {
        return undefined;
      }
      return program.isSourceFileFromExternalLibrary(parent) ||
        program.isSourceFileDefaultLibrary(parent)
        ? undefined
        : target.name;
    },
  };

  const sections = exportFiles.map(({ path: exportPath }, index) => {
    const isRoot = index === 0;
    const exportedSymbols = exportsByFile[index];

    const declarations: Declaration[] = [];
    const reExports: { module: string; name: string }[] = [];
    const differsFromRoot: Code[] = [];
    const alsoExported: { path: string; name: string }[] = [];
    for (const exportedSymbol of exportedSymbols) {
      if (isRoot) {
        rootNames.add(exportedSymbol.name);
      }
      const symbol = resolveAlias(exportedSymbol);
      const earlierPath = shownUnder.get(symbol);
      if (earlierPath !== undefined) {
        alsoExported.push({ path: earlierPath, name: exportedSymbol.name });
        continue;
      }
      shownUnder.set(symbol, exportPath);
      const reExport = externalImport(program, exportedSymbol);
      if (reExport) {
        reExports.push(reExport);
        continue;
      }
      const printed = isModuleObject(symbol)
        ? printModuleObject(exportedSymbol.name, symbol)
        : printDeclarations(symbol, exportedSymbol.name, printer, referenceNames).join("\n\n");
      if (!isRoot && rootNames.has(exportedSymbol.name)) {
        differsFromRoot.push(printed);
      } else {
        declarations.push({ name: exportedSymbol.name, code: printed });
      }
    }
    return {
      path: exportPath,
      declarations,
      // [{ module: "a", name: "X" }, { module: "a", name: "Y" }, { module: "b", name: "Z" }]
      //   -> [{ module: "a", names: ["X", "Y"] }, { module: "b", names: ["Z"] }]
      reExports: [...Map.groupBy(reExports, (reExport) => reExport.module)].map(
        ([module, entries]) => ({ module, names: entries.map((entry) => entry.name) }),
      ),
      differsFromRoot,
      // [{ path: ".", name: "X" }, { path: ".", name: "Y" }, { path: "./models", name: "Z" }]
      //   -> [{ path: ".", names: ["X", "Y"] }, { path: "./models", names: ["Z"] }]
      alsoExportedFrom: [...Map.groupBy(alsoExported, (entry) => entry.path)].map(
        ([earlier, entries]) => ({ path: earlier, names: entries.map((entry) => entry.name) }),
      ),
    };
  });

  return {
    // Map { "b" => Set { "Z" }, "a" => Set { "Y", "X" } }
    //   -> [{ module: "a", names: ["X", "Y"] }, { module: "b", names: ["Z"] }]
    references: [...references]
      .map(([module, names]) => ({
        module,
        names: [...names].sort((a, b) => a.localeCompare(b, "en")),
      }))
      .sort((a, b) => a.module.localeCompare(b.module, "en")),
    sections,
  };
}

/**
 * Returns the external module and exported name for an alias created by a package-local
 * `import { X } from "dep"` or `export { X } from "dep"`, following local re-export hops.
 */
function externalImport(
  program: ts.Program,
  symbol: ts.Symbol,
): { module: string; name: string } | undefined {
  const checker = program.getTypeChecker();
  let current: ts.Symbol | undefined = symbol;
  while (current && current.flags & ts.SymbolFlags.Alias) {
    const declaration = current.declarations?.[0];
    const next = checker.getImmediateAliasedSymbol(current);
    if (!declaration || !(ts.isImportSpecifier(declaration) || ts.isExportSpecifier(declaration))) {
      return undefined;
    }
    if (isExternal(program, next)) {
      const moduleSpecifier = ts.isImportSpecifier(declaration)
        ? declaration.parent.parent.parent.moduleSpecifier
        : declaration.parent.parent.moduleSpecifier;
      return {
        module: (moduleSpecifier as ts.StringLiteral).text,
        name: (declaration.propertyName ?? declaration.name).text,
      };
    }
    current = next;
  }
  return undefined;
}

function isExternal(program: ts.Program, symbol: ts.Symbol | undefined): boolean {
  const file = symbol?.declarations?.[0]?.getSourceFile();
  return file !== undefined && program.isSourceFileFromExternalLibrary(file);
}

/**
 * Resolves how a type reference prints: its exported name, plus the module it comes from when
 * the reference is external. Handles `X` (from `import { X }`), `ns.X` (from `import * as ns`),
 * and `import("m").X`.
 */
function resolveReference(
  program: ts.Program,
  node: ts.Node,
): { name: string; module?: string } | undefined {
  const checker = program.getTypeChecker();
  if (ts.isIdentifier(node)) {
    const symbol = checker.getSymbolAtLocation(node);
    return symbol && externalImport(program, symbol);
  }
  if (ts.isQualifiedName(node) || ts.isPropertyAccessExpression(node)) {
    const left = ts.isQualifiedName(node) ? node.left : node.expression;
    const right = ts.isQualifiedName(node) ? node.right : node.name;
    const namespace = ts.isIdentifier(left)
      ? checker.getSymbolAtLocation(left)?.declarations?.[0]
      : undefined;
    if (
      namespace &&
      ts.isNamespaceImport(namespace) &&
      isExternal(program, checker.getSymbolAtLocation(right))
    ) {
      const moduleSpecifier = namespace.parent.parent.moduleSpecifier as ts.StringLiteral;
      return { module: moduleSpecifier.text, name: right.text };
    }
    return undefined;
  }
  if (
    ts.isImportTypeNode(node) &&
    node.qualifier &&
    ts.isIdentifier(node.qualifier) &&
    ts.isLiteralTypeNode(node.argument) &&
    ts.isStringLiteral(node.argument.literal)
  ) {
    const name = node.qualifier.text;
    return isExternal(program, checker.getSymbolAtLocation(node.qualifier))
      ? { module: node.argument.literal.text, name }
      : { name };
  }
  return undefined;
}

function printDeclarations(
  symbol: ts.Symbol,
  publicName: string,
  printer: ts.Printer,
  referenceNames: ReferenceNames,
): string[] {
  return (symbol.declarations ?? []).map((declaration) => {
    const node = ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
    const declaredName = ts.getNameOfDeclaration(declaration);

    // Like API Extractor's ae-forgotten-export, warn on the member (or the declaration itself)
    // that uses a declaration no export path exposes.
    const members: readonly ts.Node[] =
      ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) ? node.members : [];
    const forgotten = new Map<ts.Node, string[]>([
      [node, forgottenNamesIn(node, referenceNames, new Set(members))],
      ...members.map((member): [ts.Node, string[]] => [
        member,
        forgottenNamesIn(member, referenceNames),
      ]),
    ]);

    const [reviewNode] = ts.transform(node, [
      (context) =>
        toReviewShape(context, declaredName, publicName, referenceNames.rewritten, forgotten),
    ]).transformed;
    return printer.printNode(ts.EmitHint.Unspecified, reviewNode, node.getSourceFile());
  });
}

function forgottenNamesIn(
  node: ts.Node,
  referenceNames: ReferenceNames,
  skip: ReadonlySet<ts.Node> = new Set(),
): string[] {
  const names = new Set<string>();
  const walk = (child: ts.Node): void => {
    if (skip.has(child)) {
      return;
    }
    const name = ts.isIdentifier(child) ? referenceNames.forgotten(child) : undefined;
    if (name) {
      names.add(name);
    }
    ts.forEachChild(child, walk);
  };
  walk(node);
  return [...names];
}

const statusTags = new Set(["alpha", "beta", "internal", "deprecated"]);

function isPrivateMember(node: ts.Node): boolean {
  if (!ts.isClassElement(node)) {
    return false;
  }
  const hasPrivateModifier =
    ts.canHaveModifiers(node) &&
    ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword);
  return (
    Boolean(hasPrivateModifier) || (node.name !== undefined && ts.isPrivateIdentifier(node.name))
  );
}

/**
 * Drops comments (keeping status tags as `// @tag`), private class members, and `declare` on classes.
 * Renames the declaration to its public export name and references to their exported names.
 */
function toReviewShape(
  context: ts.TransformationContext,
  declaredName: ts.Node | undefined,
  publicName: string,
  referenceName: (node: ts.Node) => string | undefined,
  forgotten: ReadonlyMap<ts.Node, string[]>,
): ts.Transformer<ts.Node> {
  let printed: ts.Node | undefined;
  const visit = (node: ts.Node): ts.Node | undefined => {
    if (isPrivateMember(node)) {
      return undefined;
    }
    // A default export keeps its declared name: `export default function createClient(...)`.
    if (node === declaredName && publicName !== "default") {
      return context.factory.createIdentifier(publicName);
    }
    const name = referenceName(node);
    if (name) {
      return ts.isImportTypeNode(node)
        ? context.factory.createTypeReferenceNode(
            name,
            ts.visitNodes(node.typeArguments, visit, ts.isTypeNode),
          )
        : context.factory.createIdentifier(name);
    }
    let result = ts.visitEachChild(node, visit, context);
    if (ts.isClassDeclaration(result)) {
      result = context.factory.updateClassDeclaration(
        result,
        result.modifiers?.filter((modifier) => modifier.kind !== ts.SyntaxKind.DeclareKeyword),
        result.name,
        result.typeParameters,
        result.heritageClauses,
        result.members,
      );
    }
    // The printed statement shows how the export path exposes it (a named or default export),
    // whatever `export`/`default` modifiers (or none) its own file used.
    if (node === printed && ts.canHaveModifiers(result)) {
      const kept = (ts.getModifiers(result) ?? []).filter(
        (modifier) =>
          modifier.kind !== ts.SyntaxKind.ExportKeyword &&
          modifier.kind !== ts.SyntaxKind.DefaultKeyword,
      );
      const exportModifiers =
        publicName === "default"
          ? ([ts.SyntaxKind.ExportKeyword, ts.SyntaxKind.DefaultKeyword] as const)
          : ([ts.SyntaxKind.ExportKeyword] as const);
      result = context.factory.replaceModifiers(result, [
        ...exportModifiers.map((kind) => context.factory.createModifier(kind)),
        ...kept,
      ]);
    }
    ts.setEmitFlags(result, ts.EmitFlags.NoComments);
    for (const name of forgotten.get(node) ?? []) {
      ts.addSyntheticLeadingComment(
        result,
        ts.SyntaxKind.SingleLineCommentTrivia,
        ` Warning: (arh-forgotten-export: ${name})`,
        true,
      );
    }
    // getJSDocTags also reports a variable statement's tags on its declarations; print them once,
    // on the statement.
    const tags = ts.isVariableDeclaration(node) ? [] : ts.getJSDocTags(node);
    for (const tag of tags) {
      if (statusTags.has(tag.tagName.text)) {
        ts.addSyntheticLeadingComment(
          result,
          ts.SyntaxKind.SingleLineCommentTrivia,
          ` @${tag.tagName.text}`,
          true,
        );
      }
    }
    return result;
  };
  return (node) => {
    printed = node;
    return visit(node)!;
  };
}
