// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Step 1: reads a package's built declaration files and package.json into a Review.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { structuredPatch } from "diff";
import semver from "semver";
import type {
  Declaration,
  ExportSpecifier,
  Identifier,
  ImportDeclaration,
  ImportSpecifier,
  Node,
  PathKey,
  StringLiteral,
} from "typescript/ast";
import { SyntaxKind, getNameOfDeclaration } from "typescript/ast";
import {
  isExportSpecifier,
  isIdentifier,
  isImportClause,
  isImportSpecifier,
  isImportTypeNode,
  isLiteralTypeNode,
  isNamespaceImport,
  isPropertyAccessExpression,
  isQualifiedName,
  isSourceFile,
  isStringLiteral,
  isVariableDeclaration,
} from "typescript/ast/is";
import { ModuleKind, ModuleResolutionKind, SymbolFlags } from "typescript/sync";
import type {
  API,
  Checker,
  Program,
  Project,
  RawCompilerOptions,
  Symbol as CompilerSymbol,
} from "typescript/sync";
import { loadPnpmWorkspaceCatalogs, resolveCatalogVersion } from "../pnpm.ts";
import { withTypeScriptApi } from "../typescript/api.ts";
import { flattenDiagnosticMessage } from "../typescript/diagnostic.ts";
import type {
  Code,
  ConditionDiff,
  Declaration as ReviewDeclaration,
  DependencyType,
  DiffLine,
  ExportSection,
  NamedImports,
  Review,
} from "./model.ts";
import { codeText } from "./model.ts";
import type { ReferenceNames } from "./printDeclarations.ts";
import { isPrivateMember, printDeclarations } from "./printDeclarations.ts";

type ExportConditions = Record<string, { types: string }>;

// Non-ESM conditions, in the order the review lists them.
const runtimeConditions = ["require", "browser", "react-native", "workerd"];
const conditionOrder = ["import", ...runtimeConditions];

const dependencyFields: [field: string, type: DependencyType][] = [
  ["dependencies", "runtime"],
  ["peerDependencies", "peer"],
];

/**
 * Resolves `catalog:` and `workspace:^` specifiers to what `pnpm pack` publishes.
 */
async function resolveSpecifier(
  packageRoot: string,
  name: string,
  specifier: string,
): Promise<string> {
  if (specifier.startsWith("catalog:")) {
    const catalogs = await loadPnpmWorkspaceCatalogs(packageRoot);
    return resolveCatalogVersion(name, specifier, catalogs);
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

export async function buildReview(packageRoot: string): Promise<Review> {
  return withTypeScriptApi((api) => buildReviewWith(api, packageRoot));
}

async function buildReviewWith(api: API, packageRoot: string): Promise<Review> {
  const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));
  const exportEntries = Object.entries<ExportConditions>(packageJson.exports)
    .filter(([exportPath]) => exportPath !== "./package.json")
    .sort(([a], [b]) => a.localeCompare(b, "en"));

  const exportFiles = (condition: string): { path: string; file: string }[] =>
    exportEntries.map(([exportPath, conditions]) => ({
      path: exportPath,
      file: path.join(packageRoot, conditions[condition].types),
    }));

  const { references, sections } = buildExportSections(
    api,
    packageRoot,
    "import",
    exportFiles("import"),
  );
  const presentConditions = runtimeConditions.filter((condition) =>
    exportEntries.some(([, conditions]) => condition in conditions),
  );
  const { identicalConditions, conditionDiffs } = compareConditions(
    { references, sections },
    presentConditions.map((condition) => ({
      condition,
      ...buildExportSections(api, packageRoot, condition, exportFiles(condition)),
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
  esm: { references: NamedImports[]; sections: ExportSection[] },
  views: { condition: string; references: NamedImports[]; sections: ExportSection[] }[],
): { identicalConditions: string[]; conditionDiffs: ConditionDiff[] } {
  const identicalConditions: string[] = [];
  const conditionDiffs: ConditionDiff[] = [];
  for (const { condition, references, sections } of views) {
    if (isDeepStrictEqual({ references, sections }, esm)) {
      identicalConditions.push(condition);
      continue;
    }
    conditionDiffs.push({
      condition,
      // ESM [{ module: "node", names: ["Foo"] }] vs browser [{ module: "browser", names: ["Foo"] }]
      //   -> [{ change: "removed", reference: ...node }, { change: "added", reference: ...browser }]
      references: [
        ...esm.references
          .filter((reference) => !references.some((other) => isDeepStrictEqual(reference, other)))
          .map((reference) => ({ change: "removed" as const, reference })),
        ...references
          .filter(
            (reference) => !esm.references.some((other) => isDeepStrictEqual(reference, other)),
          )
          .map((reference) => ({ change: "added" as const, reference })),
      ],
      exports: esm.sections
        .map((esmSection, index) => ({
          path: esmSection.path,
          items: diffItems(esmSection.declarations, sections[index].declarations),
          reExports: [
            ...esmSection.reExports
              .filter(
                (reference) =>
                  !sections[index].reExports.some((other) => isDeepStrictEqual(reference, other)),
              )
              .map((reference) => ({ change: "removed" as const, reference })),
            ...sections[index].reExports
              .filter(
                (reference) =>
                  !esmSection.reExports.some((other) => isDeepStrictEqual(reference, other)),
              )
              .map((reference) => ({ change: "added" as const, reference })),
          ],
        }))
        .filter((changed) => changed.items.length || changed.reExports.length),
    });
  }
  return { identicalConditions, conditionDiffs };
}

/**
 * Diffs two views of an export section by declaration name, sorted by name.
 */
// ESM [{ name: "A", code: a }, { name: "B", code: b }] vs browser [{ name: "B", code: b2 }, { name: "C", code: c }]
//   -> [lines("removed", a), diffItem(b, b2), lines("added", c)]
function diffItems(esm: ReviewDeclaration[], other: ReviewDeclaration[]): DiffLine[][] {
  const textByName = (declarations: ReviewDeclaration[]): Map<string, string> =>
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

/**
 * `import` and `require` resolve like Node.js (the module format comes from the nearest
 * package.json); other conditions resolve like a bundler that targets that condition.
 * Every view gets the package's own `@types/node`, because declarations shared across targets
 * (and some browser builds) reference Node.js built-in modules.
 */
function compilerOptionsFor(condition: string, packageRoot: string): RawCompilerOptions {
  const shared: RawCompilerOptions = {
    // assertComplete relies on diagnostics for the package's own declaration files.
    skipDefaultLibCheck: true,
    types: ["node"],
    typeRoots: [path.join(packageRoot, "node_modules", "@types")],
  };
  return condition === "import" || condition === "require"
    ? {
        ...shared,
        module: ModuleKind.NodeNext,
        moduleResolution: ModuleResolutionKind.NodeNext,
      }
    : {
        ...shared,
        module: ModuleKind.ESNext,
        moduleResolution: ModuleResolutionKind.Bundler,
        customConditions: [condition],
      };
}

// Cannot find module (2307, 2792), no exported member (2305, 2614, 2694, 2724), and cannot find
// type definition (2688). Other diagnostics are ignored: the review doesn't type-check.
const resolutionErrorCodes = new Set([2307, 2792, 2305, 2614, 2694, 2724, 2688]);

/**
 * The compiler objects of one program: the program itself, its project and its type checker, and
 * what has been looked up in them so far. Every lookup is a request to the compiler process, so
 * the answers are kept.
 */
interface CompilerContext {
  api: API;
  program: Program;
  project: Project;
  checker: Checker;
  symbolsAtLocation: Map<Node, CompilerSymbol | undefined>;
  aliasTargets: Map<number, CompilerSymbol>;
  externalImports: Map<number, ExternalImport | undefined>;
  /** Whether each file is an external library (`true`) or the package's own file (`false`). */
  libraryFiles: Map<PathKey, { external: boolean; defaultLibrary: boolean }>;
}

/**
 * Throws when the review would be silently incomplete: implementation files in the program, or
 * modules and names that don't resolve (they would otherwise quietly become unresolved types).
 */
function assertComplete(context: CompilerContext, condition: string, packageRoot: string): void {
  const { program } = context;
  const packageFiles = program.getSourceFileNames().filter((fileName) => {
    const metadata = program.getSourceFileMetadata(fileName);
    return metadata && !metadata.isFromExternalLibrary && !metadata.isDefaultLibrary;
  });
  const relativeName = (fileName: string): string =>
    path.relative(packageRoot, fileName).split(path.sep).join("/");

  for (const fileName of packageFiles) {
    if (!program.getSourceFile(fileName)!.isDeclarationFile) {
      throw new Error(
        `[${condition}] ${relativeName(fileName)}: Implementation file is part of the review program`,
      );
    }
  }
  for (const fileName of packageFiles) {
    const unresolved = program
      .getSemanticDiagnostics(fileName)
      .find((diagnostic) => resolutionErrorCodes.has(diagnostic.code));
    if (unresolved) {
      throw new Error(
        `[${condition}] ${relativeName(fileName)}: ${flattenDiagnosticMessage(unresolved, " ")}`,
      );
    }
  }
}

/**
 * Returns the symbol a name refers to. Names are looked up together by {@link prefetchSymbols}.
 */
function symbolAt(context: CompilerContext, node: Node): CompilerSymbol | undefined {
  if (!context.symbolsAtLocation.has(node)) {
    context.symbolsAtLocation.set(node, context.checker.getSymbolAtLocation(node));
  }
  return context.symbolsAtLocation.get(node);
}

/**
 * Looks up the symbols of all the names under a node with one request, instead of one per name.
 */
function prefetchSymbols(context: CompilerContext, root: Node): void {
  const names: Node[] = [];
  const walk = (node: Node): void => {
    if (
      (node.kind === SyntaxKind.Identifier ||
        node.kind === SyntaxKind.QualifiedName ||
        node.kind === SyntaxKind.PropertyAccessExpression) &&
      !context.symbolsAtLocation.has(node)
    ) {
      names.push(node);
    }
    node.forEachChild(walk);
  };
  walk(root);
  if (names.length > 0) {
    const symbols = context.checker.getSymbolAtLocation(names);
    names.forEach((name, index) => context.symbolsAtLocation.set(name, symbols[index]));
  }
}

function resolveAlias(context: CompilerContext, symbol: CompilerSymbol): CompilerSymbol {
  if (!(symbol.flags & SymbolFlags.Alias)) {
    return symbol;
  }
  let target = context.aliasTargets.get(symbol.id);
  if (!target) {
    target = context.checker.getAliasedSymbol(symbol);
    context.aliasTargets.set(symbol.id, target);
  }
  return target;
}

/**
 * Symbols refer to their declarations by handle. This gets the declaration nodes.
 */
function declarationsOf(context: CompilerContext, symbol: CompilerSymbol): Declaration[] {
  return (symbol.declarations ?? []).map((handle) => handle.resolve(context.project)!);
}

/**
 * Where a symbol is declared tells whether it belongs to an external library or the default lib.
 */
function declaredIn(
  context: CompilerContext,
  symbol: CompilerSymbol | undefined,
): { external: boolean; defaultLibrary: boolean } | undefined {
  const handle = symbol?.declarations?.[0];
  return handle && fileKind(context, handle.path);
}

function fileKind(
  context: CompilerContext,
  filePath: PathKey,
): { external: boolean; defaultLibrary: boolean } {
  let kind = context.libraryFiles.get(filePath);
  if (!kind) {
    const metadata = context.program.getSourceFileMetadataByPath(filePath);
    kind = {
      external: metadata?.isFromExternalLibrary === true,
      defaultLibrary: metadata?.isDefaultLibrary === true,
    };
    context.libraryFiles.set(filePath, kind);
  }
  return kind;
}

function isExternal(context: CompilerContext, symbol: CompilerSymbol | undefined): boolean {
  return declaredIn(context, symbol)?.external ?? false;
}

// `export * as fn from "./fn.js"` and `import * as fn ...; export { fn }` export a whole module.
function isModuleObject(symbol: CompilerSymbol): boolean {
  return symbol.declarations?.some((handle) => handle.kind === SyntaxKind.SourceFile) ?? false;
}

function exportsOf(context: CompilerContext, moduleSymbol: CompilerSymbol): CompilerSymbol[] {
  return [...context.checker.getExportsOfModule(moduleSymbol)].sort((a, b) =>
    a.name.localeCompare(b.name, "en"),
  );
}

function isTypeOnlyExport(context: CompilerContext, symbol: CompilerSymbol): boolean {
  let current: CompilerSymbol | undefined = symbol;
  while (current && current.flags & SymbolFlags.Alias) {
    const declaration = declarationsOf(context, current)[0];
    if (declaration) {
      // The parents of a specifier are its list of named imports or exports, and the clause or
      // declaration the list belongs to.
      if (isExportSpecifier(declaration)) {
        if (
          declaration.isTypeOnly ||
          (declaration.parent.parent as { isTypeOnly?: boolean }).isTypeOnly
        ) {
          return true;
        }
      } else if (
        isImportSpecifier(declaration) &&
        (declaration.isTypeOnly || isTypeOnlyImportClause(declaration.parent.parent))
      ) {
        return true;
      }
    }
    current = context.checker.getImmediateAliasedSymbol(current);
  }
  return false;
}

function isTypeOnlyImportClause(node: Node): boolean {
  return isImportClause(node) && node.phaseModifier === SyntaxKind.TypeKeyword;
}

/**
 * Prints each declaration under the first export path (`.` first, then by path) that exposes it.
 * Later paths list it by name under "Also exported from". A new declaration that reuses a root
 * export's name goes under "Differs from".
 */
function buildExportSections(
  api: API,
  packageRoot: string,
  condition: string,
  exportFiles: { path: string; file: string }[],
): {
  references: NamedImports[];
  sections: ExportSection[];
} {
  const program = api.createProgram(
    exportFiles.map((exportFile) => exportFile.file),
    compilerOptionsFor(condition, packageRoot),
  );
  try {
    const project = program.getProject();
    const context: CompilerContext = {
      api,
      program,
      project,
      checker: project.checker,
      symbolsAtLocation: new Map(),
      aliasTargets: new Map(),
      externalImports: new Map(),
      libraryFiles: new Map(),
    };
    assertComplete(context, condition, packageRoot);
    return buildSections(context, exportFiles);
  } finally {
    program.dispose();
  }
}

function buildSections(
  context: CompilerContext,
  exportFiles: { path: string; file: string }[],
): {
  references: NamedImports[];
  sections: ExportSection[];
} {
  const { api, checker } = context;
  const shownUnder = new Map<number, string>();
  const rootNames = new Set<string>();
  const references = new Map<string, Map<string, string>>();

  const exportsByFile = exportFiles.map(({ file }) =>
    exportsOf(context, checker.getSymbolOfSourceFile(file)!),
  );

  // A local symbol keeps the public name used by its first export path.
  // AddPolicyOptions -> AddPipelineOptions, both at the declaration and its usages.
  const localNames = new Map<number, string>();
  for (const exported of exportsByFile.flat()) {
    const symbol = resolveAlias(context, exported);
    if (exported.name !== "default" && !isExternal(context, symbol) && !localNames.has(symbol.id)) {
      localNames.set(symbol.id, exported.name);
    }
  }

  // Everything reachable through an export path, including members of exported module objects.
  const exposed = new Map<number, CompilerSymbol>();
  const expose = (symbols: CompilerSymbol[]): void => {
    for (const symbol of symbols.map((symbol) => resolveAlias(context, symbol))) {
      if (!exposed.has(symbol.id)) {
        exposed.set(symbol.id, symbol);
        if (isModuleObject(symbol)) {
          expose(exportsOf(context, symbol));
        }
      }
    }
  };
  expose(exportsByFile.flat());

  const collectReferences = (node: Node): void => {
    if (isPrivateMember(node)) {
      return;
    }
    const reference = resolveReference(context, node);
    if (reference?.module) {
      references.set(
        reference.module,
        (references.get(reference.module) ?? new Map()).set(
          reference.name,
          reference.preferredName ?? reference.name,
        ),
      );
    }
    if (reference) {
      if (isImportTypeNode(node)) {
        node.typeArguments?.forEach(collectReferences);
      }
      return;
    }
    node.forEachChild(collectReferences);
  };
  for (const symbol of exposed.values()) {
    if (isExternal(context, symbol) || isModuleObject(symbol)) {
      continue;
    }
    for (const declaration of declarationsOf(context, symbol)) {
      const node = isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
      prefetchSymbols(context, node);
      collectReferences(node);
    }
  }

  const usedNames = new Set(
    exportsByFile
      .flat()
      .filter((symbol) => !isExternal(context, resolveAlias(context, symbol)))
      .map((symbol) => symbol.name),
  );
  const importedNames = new Set([...references.values()].flatMap((names) => [...names.values()]));
  const aliases = new Map<string, Map<string, string>>();
  // { "azure": ["ClientOptions"], "openai": ["ClientOptions"] }
  //   -> imports ["ClientOptions", "ClientOptions as ClientOptions_2"], with matching usage names.
  const namedReferences = [...references]
    .sort(([a], [b]) => a.localeCompare(b, "en"))
    .map(([module, names]) => {
      const moduleAliases = new Map<string, string>();
      aliases.set(module, moduleAliases);
      return {
        module,
        names: [...names]
          .sort(([a], [b]) => a.localeCompare(b, "en"))
          .map(([name, preferredName]) => {
            let alias = preferredName;
            let suffix = 2;
            while (usedNames.has(alias) || (alias !== preferredName && importedNames.has(alias))) {
              alias = `${preferredName}_${suffix++}`;
            }
            usedNames.add(alias);
            moduleAliases.set(name, alias);
            return alias === name ? name : `${name} as ${alias}`;
          }),
      };
    });

  // A module object is a group: `export declare namespace <name> {`, its exports, `}`.
  const printModuleObject = (name: string, moduleSymbol: CompilerSymbol): Code => ({
    open: `export declare namespace ${name} {`,
    children: exportsOf(context, moduleSymbol).map((member) => {
      const target = resolveAlias(context, member);
      return isModuleObject(target)
        ? printModuleObject(member.name, target)
        : printSymbol(target, member.name);
    }),
    close: "}",
  });

  const referenceNames: ReferenceNames = {
    rewritten: (node) => {
      const reference = resolveReference(context, node);
      if (reference?.module) {
        return aliases.get(reference.module)!.get(reference.name)!;
      }
      const localReference = isImportTypeNode(node)
        ? node.qualifier
        : isIdentifier(node) || isQualifiedName(node) || isPropertyAccessExpression(node)
          ? node
          : undefined;
      const symbol = localReference && symbolAt(context, localReference);
      return (symbol && localNames.get(resolveAlias(context, symbol).id)) ?? reference?.name;
    },
    forgotten: (identifier) => {
      const symbol = symbolAt(context, identifier);
      const target = symbol && resolveAlias(context, symbol);
      const handle = target?.declarations?.[0];
      if (!target || !handle) {
        return undefined;
      }
      const parent = handle.resolve(context.project)?.parent;
      if (!parent || !isSourceFile(parent) || exposed.has(target.id)) {
        return undefined;
      }
      const kind = fileKind(context, parent.path);
      return kind.external || kind.defaultLibrary ? undefined : target.name;
    },
  };

  const printSymbol = (symbol: CompilerSymbol, publicName: string): string => {
    const declarations = declarationsOf(context, symbol);
    for (const declaration of declarations) {
      prefetchSymbols(
        context,
        isVariableDeclaration(declaration) ? declaration.parent.parent : declaration,
      );
    }
    return printDeclarations(api, declarations, publicName, referenceNames).join("\n\n");
  };

  const sections = exportFiles.map(({ path: exportPath }, index) => {
    const isRoot = index === 0;
    const exportedSymbols = exportsByFile[index];

    const declarations: ReviewDeclaration[] = [];
    const reExports: { module: string; name: string }[] = [];
    const differsFromRoot: Code[] = [];
    const alsoExported: { path: string; name: string }[] = [];
    for (const exportedSymbol of exportedSymbols) {
      if (isRoot) {
        rootNames.add(exportedSymbol.name);
      }
      const symbol = resolveAlias(context, exportedSymbol);
      const earlierPath = shownUnder.get(symbol.id);
      if (earlierPath !== undefined) {
        alsoExported.push({ path: earlierPath, name: exportedSymbol.name });
        continue;
      }
      shownUnder.set(symbol.id, exportPath);
      const typeOnly = isTypeOnlyExport(context, exportedSymbol);
      const reExport = externalImport(context, exportedSymbol);
      if (reExport) {
        const exportedName =
          reExport.importedName === reExport.exportedName
            ? reExport.importedName
            : `${reExport.importedName} as ${reExport.exportedName}`;
        reExports.push({
          module: reExport.module,
          name: typeOnly ? `type ${exportedName}` : exportedName,
        });
        continue;
      }
      let printed = isModuleObject(symbol)
        ? printModuleObject(exportedSymbol.name, symbol)
        : printSymbol(symbol, exportedSymbol.name);
      if (typeOnly && symbol.flags & SymbolFlags.Value) {
        printed =
          typeof printed === "string"
            ? `// type-only export\n${printed}`
            : { ...printed, open: `// type-only export\n${printed.open}` };
      }
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
    references: namedReferences,
    sections,
  };
}

interface ExternalImport {
  module: string;
  importedName: string;
  exportedName: string;
  preferredName?: string;
}

/**
 * Returns the external module, the name exported by that module, and the public name exposed by
 * this package for named or default imports/re-exports, following local hops.
 */
function externalImport(
  context: CompilerContext,
  symbol: CompilerSymbol,
): ExternalImport | undefined {
  if (!context.externalImports.has(symbol.id)) {
    context.externalImports.set(symbol.id, findExternalImport(context, symbol));
  }
  return context.externalImports.get(symbol.id);
}

function findExternalImport(
  context: CompilerContext,
  symbol: CompilerSymbol,
): ExternalImport | undefined {
  const { checker } = context;
  const exportedName = symbol.name;
  let current: CompilerSymbol | undefined = symbol;
  while (current && current.flags & SymbolFlags.Alias) {
    const handle = current.declarations?.[0];
    const next = checker.getImmediateAliasedSymbol(current);
    if (
      !handle ||
      !(
        handle.kind === SyntaxKind.ImportSpecifier ||
        handle.kind === SyntaxKind.ExportSpecifier ||
        handle.kind === SyntaxKind.ImportClause
      )
    ) {
      return undefined;
    }
    if (isExternal(context, next)) {
      const declaration = handle.resolve(context.project)!;
      // The parents of a specifier are its list of named imports or exports, the clause or
      // declaration the list belongs to, and for imports the declaration the clause belongs to.
      const moduleSpecifier = isImportClause(declaration)
        ? (declaration.parent as ImportDeclaration).moduleSpecifier
        : isImportSpecifier(declaration)
          ? (declaration.parent.parent.parent as ImportDeclaration).moduleSpecifier
          : (declaration.parent.parent as ImportDeclaration).moduleSpecifier;
      const declaredName = getNameOfDeclaration(
        declarationsOf(context, checker.getAliasedSymbol(current))[0],
      );
      const specifier = isImportClause(declaration)
        ? undefined
        : (declaration as ImportSpecifier | ExportSpecifier);
      return {
        module: (moduleSpecifier as StringLiteral).text,
        importedName: specifier ? (specifier.propertyName ?? specifier.name).text : "default",
        exportedName,
        preferredName: specifier
          ? undefined
          : declaredName && isIdentifier(declaredName)
            ? declaredName.text
            : exportedName,
      };
    }
    current = next;
  }
  return undefined;
}

/**
 * Resolves how a type reference prints: its exported name, plus the module it comes from when
 * the reference is external. Handles `X` (from `import { X }`), `ns.X` (from `import * as ns`),
 * default imports, and `import("m").X`.
 */
function resolveReference(
  context: CompilerContext,
  node: Node,
): { name: string; module?: string; preferredName?: string } | undefined {
  if (isIdentifier(node)) {
    const symbol = symbolAt(context, node);
    const external = symbol && externalImport(context, symbol);
    return (
      external && {
        module: external.module,
        name: external.importedName,
        preferredName: external.preferredName,
      }
    );
  }
  if (isQualifiedName(node) || isPropertyAccessExpression(node)) {
    const left = isQualifiedName(node) ? node.left : node.expression;
    const right = isQualifiedName(node) ? node.right : node.name;
    const leftSymbol = isIdentifier(left) ? symbolAt(context, left) : undefined;
    const namespace = leftSymbol && declarationsOf(context, leftSymbol)[0];
    if (
      namespace &&
      isNamespaceImport(namespace) &&
      isExternal(context, symbolAt(context, right))
    ) {
      // The parents of a namespace import are its import clause and the import declaration.
      const moduleSpecifier = (namespace.parent.parent as ImportDeclaration)
        .moduleSpecifier as StringLiteral;
      return { module: moduleSpecifier.text, name: right.text };
    }
    return undefined;
  }
  if (
    isImportTypeNode(node) &&
    node.qualifier &&
    isIdentifier(node.qualifier) &&
    isLiteralTypeNode(node.argument) &&
    isStringLiteral(node.argument.literal)
  ) {
    const name = (node.qualifier as Identifier).text;
    return isExternal(context, symbolAt(context, node.qualifier))
      ? { module: (node.argument.literal as StringLiteral).text, name }
      : { name };
  }
  return undefined;
}
