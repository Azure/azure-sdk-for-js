// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { structuredPatch } from "diff";
import semver from "semver";
import ts from "typescript";

type ExportConditions = Record<string, { types: string }>;

interface Review {
  name: string;
  version: string;
  entryPoints: { path: string; conditions: string[] }[];
  dependencies: { name: string; version: string; type: DependencyType }[];
  references: NamedImports[];
  exportSections: ExportSection[];
  identicalConditions: string[];
  conditionDiffs: ConditionDiff[];
}

interface ConditionDiff {
  condition: string;
  exports: { path: string; items: string[] }[];
}

interface NamedImports {
  module: string;
  names: string[];
}

interface Declaration {
  name: string;
  text: string;
}

interface ExportSection {
  path: string;
  declarations: Declaration[];
  reExports: NamedImports[];
  differsFromRoot: string[];
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

export function generateApiReview(packageRoot: string): {
  apiMd: string;
  metadata: ApiReviewMetadata;
} {
  const review = buildReview(packageRoot);
  return {
    apiMd: renderApiMd(review),
    metadata: {
      apiMdSha256: hashApiMd(review),
      packageVersion: review.version,
      parserVersion,
      typescriptVersion: ts.version,
    },
  };
}

/**
 * Hashes the rendered review with dependency versions reduced by `compatibleVersion`.
 */
function hashApiMd(review: Review): string {
  const hashedReview: Review = {
    ...review,
    dependencies: review.dependencies.map((dependency) => ({
      ...dependency,
      version: compatibleVersion(dependency.version),
    })),
  };
  return createHash("sha256").update(renderApiMd(hashedReview)).digest("hex");
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

function buildReview(packageRoot: string): Review {
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
    // { dependencies: { tslib: "^2.8.1" }, peerDependencies: { pg: ">=8.0.0" } }
    //   -> [{ name: "pg", version: ">=8.0.0", type: "peer" }, { name: "tslib", version: "^2.8.1", type: "runtime" }]
    dependencies: dependencyFields
      .flatMap(([field, type]) =>
        Object.entries<string>(packageJson[field] ?? {}).map(([name, version]) => ({
          name,
          version,
          type,
        })),
      )
      .sort((a, b) => a.name.localeCompare(b.name, "en")),
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
// ESM [{ name: "A", text: a }, { name: "B", text: b }] vs browser [{ name: "B", text: b2 }, { name: "C", text: c }]
//   -> ["-a", diffItem(b, b2), "+c"]
function diffItems(esm: Declaration[], other: Declaration[]): string[] {
  const esmByName = new Map(esm.map((declaration) => [declaration.name, declaration.text]));
  const otherByName = new Map(other.map((declaration) => [declaration.name, declaration.text]));
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
      return [prefixLines("-", before!)];
    }
    if (before === undefined) {
      return [prefixLines("+", after)];
    }
    return [diffItem(before, after)];
  });
}

function prefixLines(prefix: string, text: string): string {
  return text
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

/**
 * Renders a unified diff of one declaration that always keeps its first line (the header) and
 * marks omitted lines with `@@`.
 */
function diffItem(before: string, after: string): string {
  const { hunks } = structuredPatch("", "", `${before}\n`, `${after}\n`, "", "", { context: 2 });
  const beforeLines = before.split("\n");
  const lines: string[] = [];
  let shownThrough = 0;
  if (hunks[0].oldStart > 1) {
    lines.push(` ${beforeLines[0]}`);
    shownThrough = 1;
  }
  for (const hunk of hunks) {
    if (hunk.oldStart > shownThrough + 1) {
      lines.push("@@");
    }
    lines.push(...hunk.lines);
    shownThrough = hunk.oldStart + hunk.oldLines - 1;
  }
  if (shownThrough < beforeLines.length) {
    lines.push("@@");
  }
  return lines.join("\n");
}

function renderApiMd(review: Review): string {
  const entryPointRows = review.entryPoints.map(
    (entry) => `| \`${entry.path}\` | ${entry.conditions.map((c) => `\`${c}\``).join(", ")} |`,
  );
  const dependencyRows = review.dependencies.map(
    (dependency) => `| \`${dependency.name}\` | \`${dependency.version}\` | ${dependency.type} |`,
  );
  const dependenciesSection = dependencyRows.length
    ? `## Dependencies

Specifiers are verbatim from package.json. The review hash covers dependency names and major versions only.

| Package | Version | Type |
| --- | --- | --- |
${dependencyRows.join("\n")}

`
    : "";
  const referencesSection = review.references.length
    ? `## References

\`\`\`ts
${review.references.map((imports) => formatNamedImports("import", imports)).join("\n")}
\`\`\`

`
    : "";
  const rootPath = review.exportSections[0]?.path;
  const exportSections = review.exportSections.map((section) =>
    renderExportSection(section, rootPath),
  );
  const runtimeBlocks: string[] = [];
  if (review.identicalConditions.length) {
    runtimeBlocks.push(
      `Identical to the ESM view: ${review.identicalConditions.map((c) => `\`${c}\``).join(", ")}.`,
    );
  }
  for (const { condition, exports } of review.conditionDiffs) {
    runtimeBlocks.push(`### \`${condition}\``);
    for (const changed of exports) {
      runtimeBlocks.push(
        `#### Export \`${changed.path}\``,
        `\`\`\`diff\n${changed.items.join("\n\n")}\n\`\`\``,
      );
    }
  }
  const runtimeDifferencesSection = runtimeBlocks.length
    ? `\n## Runtime differences\n\n${runtimeBlocks.join("\n\n")}\n`
    : "";

  return `# API review: \`${review.name}\`

## Entry points

| Export path | Conditions |
| --- | --- |
${entryPointRows.join("\n")}

${dependenciesSection}${referencesSection}${exportSections.join("\n")}${runtimeDifferencesSection}`;
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

function renderExportSection(section: ExportSection, rootPath: string | undefined): string {
  const blocks = [`## Export \`${section.path}\``];
  if (section.declarations.length || section.reExports.length) {
    if (section.path !== rootPath) {
      blocks.push(`### Not exported from \`${rootPath}\``);
    }
    const code = [
      section.declarations.map((declaration) => declaration.text).join("\n\n"),
      section.reExports.map((reExport) => formatNamedImports("export", reExport)).join("\n"),
    ];
    blocks.push(`\`\`\`ts\n${code.filter(Boolean).join("\n\n")}\n\`\`\``);
  }
  if (section.differsFromRoot.length) {
    blocks.push(
      `### Differs from \`${rootPath}\``,
      `Same name as an Export \`${rootPath}\` export, but a different declaration.`,
      `\`\`\`ts\n${section.differsFromRoot.join("\n\n")}\n\`\`\``,
    );
  }
  for (const earlier of section.alsoExportedFrom) {
    blocks.push(
      `### Also exported from \`${earlier.path}\``,
      `Definitions are shown under Export \`${earlier.path}\`.`,
      earlier.names.map((name) => `- \`${name}\``).join("\n"),
    );
  }
  return `${blocks.join("\n\n")}\n`;
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
  const fail = (file: ts.SourceFile, problem: string): never => {
    throw new Error(`[${condition}] ${path.relative(packageRoot, file.fileName)}: ${problem}`);
  };
  const packageFiles = program
    .getSourceFiles()
    .filter(
      (file) =>
        !program.isSourceFileFromExternalLibrary(file) && !program.isSourceFileDefaultLibrary(file),
    );

  for (const file of packageFiles) {
    if (!file.isDeclarationFile) {
      fail(file, "Implementation file is part of the review program");
    }
  }
  for (const file of packageFiles) {
    const unresolved = program
      .getSemanticDiagnostics(file)
      .find((diagnostic) => resolutionErrorCodes.has(diagnostic.code));
    if (unresolved) {
      fail(file, ts.flattenDiagnosticMessageText(unresolved.messageText, " "));
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

  const exportsByFile = exportFiles.map(({ file }) =>
    checker
      .getExportsOfModule(checker.getSymbolAtLocation(program.getSourceFile(file)!)!)
      .sort((a, b) => a.name.localeCompare(b.name, "en")),
  );
  const exposed = new Set(exportsByFile.flat().map(resolveAlias));

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
    const differsFromRoot: string[] = [];
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
      const printed = printDeclarations(symbol, exportedSymbol.name, printer, referenceNames);
      if (!isRoot && rootNames.has(exportedSymbol.name)) {
        differsFromRoot.push(...printed);
      } else {
        declarations.push({ name: exportedSymbol.name, text: printed.join("\n\n") });
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
  const visit = (node: ts.Node): ts.Node | undefined => {
    if (isPrivateMember(node)) {
      return undefined;
    }
    if (node === declaredName) {
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
    ts.setEmitFlags(result, ts.EmitFlags.NoComments);
    for (const name of forgotten.get(node) ?? []) {
      ts.addSyntheticLeadingComment(
        result,
        ts.SyntaxKind.SingleLineCommentTrivia,
        ` Warning: (arh-forgotten-export: ${name})`,
        true,
      );
    }
    for (const tag of ts.getJSDocTags(node)) {
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
  return (node) => visit(node)!;
}
