// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import semver from "semver";
import ts from "typescript";

type ExportConditions = Record<string, { types: string }>;

interface Review {
  name: string;
  entryPoints: { path: string; conditions: string[] }[];
  dependencies: { name: string; version: string; type: DependencyType }[];
  references: NamedImports[];
  exportSections: ExportSection[];
}

interface NamedImports {
  module: string;
  names: string[];
}

interface ExportSection {
  path: string;
  declarations: string[];
  reExports: NamedImports[];
  differsFromRoot: string[];
  alsoExportedFrom: { path: string; names: string[] }[];
}

type DependencyType = "runtime" | "peer";

const dependencyFields: [field: string, type: DependencyType][] = [
  ["dependencies", "runtime"],
  ["peerDependencies", "peer"],
];

export function generateApiReview(packageRoot: string): {
  apiMd: string;
  metadata: { apiMdSha256: string };
} {
  const review = buildReview(packageRoot);
  return { apiMd: renderApiMd(review), metadata: { apiMdSha256: hashApiMd(review) } };
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
  const exportEntries = Object.entries<ExportConditions>(packageJson.exports).filter(
    ([exportPath]) => exportPath !== "./package.json",
  );

  const { references, sections } = buildExportSections(
    exportEntries.map(([exportPath, conditions]) => ({
      path: exportPath,
      file: path.join(packageRoot, conditions.import.types),
    })),
  );

  return {
    name: packageJson.name,
    entryPoints: exportEntries.map(([exportPath, conditions]) => ({
      path: exportPath,
      conditions: Object.keys(conditions),
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
  };
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

  return `# API review: \`${review.name}\`

## Entry points

| Export path | Conditions |
| --- | --- |
${entryPointRows.join("\n")}

${dependenciesSection}${referencesSection}${exportSections.join("\n")}`;
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
      section.declarations.join("\n\n"),
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

const compilerOptions: ts.CompilerOptions = { skipLibCheck: true };
const compilerHost = createLibCachingHost(compilerOptions);

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
 * Prints each declaration under the first export path (in package.json order) that exposes it.
 * Later paths list it by name under "Also exported from". A new declaration that reuses a root
 * export's name goes under "Differs from".
 */
function buildExportSections(exportFiles: { path: string; file: string }[]): {
  references: NamedImports[];
  sections: ExportSection[];
} {
  const program = ts.createProgram(
    exportFiles.map((exportFile) => exportFile.file),
    compilerOptions,
    compilerHost,
  );
  const checker = program.getTypeChecker();
  const printer = ts.createPrinter();
  const shownUnder = new Map<ts.Symbol, string>();
  const rootNames = new Set<string>();
  const references = new Map<string, Set<string>>();

  const externalName = (identifier: ts.Identifier): string | undefined => {
    const symbol = checker.getSymbolAtLocation(identifier);
    const external = symbol && externalImport(program, symbol);
    if (!external) {
      return undefined;
    }
    references.set(
      external.module,
      (references.get(external.module) ?? new Set()).add(external.name),
    );
    return external.name;
  };

  const sections = exportFiles.map(({ path: exportPath, file }, index) => {
    const isRoot = index === 0;
    const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(file)!)!;
    const exportedSymbols = checker
      .getExportsOfModule(moduleSymbol)
      .sort((a, b) => a.name.localeCompare(b.name, "en"));

    const declarations: string[] = [];
    const reExports: { module: string; name: string }[] = [];
    const differsFromRoot: string[] = [];
    const alsoExported: { path: string; name: string }[] = [];
    for (const exportedSymbol of exportedSymbols) {
      if (isRoot) {
        rootNames.add(exportedSymbol.name);
      }
      const symbol =
        exportedSymbol.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(exportedSymbol)
          : exportedSymbol;
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
      const printed = printDeclarations(symbol, exportedSymbol.name, printer, externalName);
      if (!isRoot && rootNames.has(exportedSymbol.name)) {
        differsFromRoot.push(...printed);
      } else {
        declarations.push(...printed);
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
 * `import { X } from "dep"` or `export { X } from "dep"`.
 */
function externalImport(
  program: ts.Program,
  symbol: ts.Symbol,
): { module: string; name: string } | undefined {
  const declaration = symbol.declarations?.[0];
  if (!declaration || !(ts.isImportSpecifier(declaration) || ts.isExportSpecifier(declaration))) {
    return undefined;
  }
  const target = program.getTypeChecker().getAliasedSymbol(symbol);
  const targetFile = target.declarations?.[0]?.getSourceFile();
  if (!targetFile || !program.isSourceFileFromExternalLibrary(targetFile)) {
    return undefined;
  }
  const moduleSpecifier = ts.isImportSpecifier(declaration)
    ? declaration.parent.parent.parent.moduleSpecifier
    : declaration.parent.parent.moduleSpecifier;
  return {
    module: (moduleSpecifier as ts.StringLiteral).text,
    name: (declaration.propertyName ?? declaration.name).text,
  };
}

function printDeclarations(
  symbol: ts.Symbol,
  publicName: string,
  printer: ts.Printer,
  externalName: (identifier: ts.Identifier) => string | undefined,
): string[] {
  return (symbol.declarations ?? []).map((declaration) => {
    const node = ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
    const declaredName = ts.getNameOfDeclaration(declaration);
    const [reviewNode] = ts.transform(node, [
      (context) => toReviewShape(context, declaredName, publicName, externalName),
    ]).transformed;
    return printer.printNode(ts.EmitHint.Unspecified, reviewNode, node.getSourceFile());
  });
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
 * Renames the declaration to its public export name and external references to their exported names.
 */
function toReviewShape(
  context: ts.TransformationContext,
  declaredName: ts.Node | undefined,
  publicName: string,
  externalName: (identifier: ts.Identifier) => string | undefined,
): ts.Transformer<ts.Node> {
  const visit = (node: ts.Node): ts.Node | undefined => {
    if (isPrivateMember(node)) {
      return undefined;
    }
    if (node === declaredName) {
      return context.factory.createIdentifier(publicName);
    }
    if (ts.isIdentifier(node)) {
      const name = externalName(node);
      return name ? context.factory.createIdentifier(name) : node;
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
