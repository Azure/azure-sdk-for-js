// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Step 1: reads a package's built declaration files and package.json into a Review.

import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { structuredPatch } from "diff";
import semver from "semver";
import ts from "typescript";
import { loadPnpmWorkspaceCatalogs, resolveCatalogVersion } from "../pnpm.ts";
import type {
  Code,
  ConditionDiff,
  Declaration,
  DependencyType,
  DiffLine,
  ExportSection,
  NamedImports,
  Review,
} from "./model.ts";
import { codeText } from "./model.ts";

type ExportConditions = Record<string, { types: string }>;

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
    { references, sections },
    presentConditions.map((condition) => ({
      condition,
      ...buildExportSections(packageRoot, condition, exportFiles(condition)),
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
  const references = new Map<string, Map<string, string>>();

  const resolveAlias = (symbol: ts.Symbol): ts.Symbol =>
    symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;

  const isTypeOnlyExport = (symbol: ts.Symbol): boolean => {
    let current: ts.Symbol | undefined = symbol;
    while (current && current.flags & ts.SymbolFlags.Alias) {
      const declaration = current.declarations?.[0];
      if (
        declaration &&
        ((ts.isExportSpecifier(declaration) &&
          (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly)) ||
          (ts.isImportSpecifier(declaration) &&
            (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly)))
      ) {
        return true;
      }
      current = checker.getImmediateAliasedSymbol(current);
    }
    return false;
  };

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

  const collectReferences = (node: ts.Node): void => {
    if (isPrivateMember(node)) {
      return;
    }
    const reference = resolveReference(program, node);
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
      if (ts.isImportTypeNode(node)) {
        node.typeArguments?.forEach(collectReferences);
      }
      return;
    }
    ts.forEachChild(node, collectReferences);
  };
  for (const symbol of exposed) {
    if (isExternal(program, symbol) || isModuleObject(symbol)) {
      continue;
    }
    for (const declaration of symbol.declarations ?? []) {
      collectReferences(
        ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration,
      );
    }
  }

  const usedNames = new Set(
    exportsByFile
      .flat()
      .filter((symbol) => !isExternal(program, resolveAlias(symbol)))
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
        return aliases.get(reference.module)!.get(reference.name)!;
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
      const typeOnly = isTypeOnlyExport(exportedSymbol);
      const reExport = externalImport(program, exportedSymbol);
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
        : printDeclarations(symbol, exportedSymbol.name, printer, referenceNames).join("\n\n");
      if (typeOnly && symbol.flags & ts.SymbolFlags.Value) {
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

/**
 * Returns the external module, the name exported by that module, and the public name exposed by
 * this package for named or default imports/re-exports, following local hops.
 */
function externalImport(
  program: ts.Program,
  symbol: ts.Symbol,
):
  | { module: string; importedName: string; exportedName: string; preferredName?: string }
  | undefined {
  const checker = program.getTypeChecker();
  const exportedName = symbol.name;
  let current: ts.Symbol | undefined = symbol;
  while (current && current.flags & ts.SymbolFlags.Alias) {
    const declaration = current.declarations?.[0];
    const next = checker.getImmediateAliasedSymbol(current);
    if (
      !declaration ||
      !(
        ts.isImportSpecifier(declaration) ||
        ts.isExportSpecifier(declaration) ||
        ts.isImportClause(declaration)
      )
    ) {
      return undefined;
    }
    if (isExternal(program, next)) {
      const moduleSpecifier = ts.isImportClause(declaration)
        ? declaration.parent.moduleSpecifier
        : ts.isImportSpecifier(declaration)
          ? declaration.parent.parent.parent.moduleSpecifier
          : declaration.parent.parent.moduleSpecifier;
      const declaredName = ts.getNameOfDeclaration(
        checker.getAliasedSymbol(current).declarations?.[0],
      );
      return {
        module: (moduleSpecifier as ts.StringLiteral).text,
        importedName: ts.isImportClause(declaration)
          ? "default"
          : (declaration.propertyName ?? declaration.name).text,
        exportedName,
        preferredName: ts.isImportClause(declaration)
          ? declaredName && ts.isIdentifier(declaredName)
            ? declaredName.text
            : exportedName
          : undefined,
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
 * default imports, and `import("m").X`.
 */
function resolveReference(
  program: ts.Program,
  node: ts.Node,
): { name: string; module?: string; preferredName?: string } | undefined {
  const checker = program.getTypeChecker();
  if (ts.isIdentifier(node)) {
    const symbol = checker.getSymbolAtLocation(node);
    const external = symbol && externalImport(program, symbol);
    return (
      external && {
        module: external.module,
        name: external.importedName,
        preferredName: external.preferredName,
      }
    );
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
