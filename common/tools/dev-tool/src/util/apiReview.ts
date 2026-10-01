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
  exportSections: ExportSection[];
}

interface ExportSection {
  path: string;
  declarations: string[];
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

  return {
    name: packageJson.name,
    entryPoints: exportEntries.map(([exportPath, conditions]) => ({
      path: exportPath,
      conditions: Object.keys(conditions),
    })),
    dependencies: dependencyFields
      .flatMap(([field, type]) =>
        Object.entries<string>(packageJson[field] ?? {}).map(([name, version]) => ({
          name,
          version,
          type,
        })),
      )
      .sort((a, b) => a.name.localeCompare(b.name, "en")),
    exportSections: buildExportSections(
      exportEntries.map(([exportPath, conditions]) => ({
        path: exportPath,
        file: path.join(packageRoot, conditions.import.types),
      })),
    ),
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
  const rootPath = review.exportSections[0]?.path;
  const exportSections = review.exportSections.map((section) =>
    renderExportSection(section, rootPath),
  );

  return `# API review: \`${review.name}\`

## Entry points

| Export path | Conditions |
| --- | --- |
${entryPointRows.join("\n")}

${dependenciesSection}${exportSections.join("\n")}`;
}

function renderExportSection(section: ExportSection, rootPath: string | undefined): string {
  const blocks = [`## Export \`${section.path}\``];
  if (section.declarations.length) {
    if (section.path !== rootPath) {
      blocks.push(`### Not exported from \`${rootPath}\``);
    }
    blocks.push(`\`\`\`ts\n${section.declarations.join("\n\n")}\n\`\`\``);
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
 * Later paths list it by name under "Also exported from".
 */
function buildExportSections(exportFiles: { path: string; file: string }[]): ExportSection[] {
  const program = ts.createProgram(
    exportFiles.map((exportFile) => exportFile.file),
    compilerOptions,
    compilerHost,
  );
  const checker = program.getTypeChecker();
  const printer = ts.createPrinter();
  const shownUnder = new Map<ts.Symbol, string>();

  return exportFiles.map(({ path: exportPath, file }) => {
    const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(file)!)!;
    const exportedSymbols = checker
      .getExportsOfModule(moduleSymbol)
      .sort((a, b) => a.name.localeCompare(b.name, "en"));

    const declarations: string[] = [];
    const alsoExportedFrom = new Map<string, string[]>();
    for (const exportedSymbol of exportedSymbols) {
      const symbol =
        exportedSymbol.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(exportedSymbol)
          : exportedSymbol;
      const earlierPath = shownUnder.get(symbol);
      if (earlierPath !== undefined) {
        alsoExportedFrom.set(earlierPath, [
          ...(alsoExportedFrom.get(earlierPath) ?? []),
          exportedSymbol.name,
        ]);
        continue;
      }
      shownUnder.set(symbol, exportPath);
      declarations.push(...printDeclarations(symbol, exportedSymbol.name, printer));
    }
    return {
      path: exportPath,
      declarations,
      alsoExportedFrom: [...alsoExportedFrom].map(([earlier, names]) => ({
        path: earlier,
        names,
      })),
    };
  });
}

function printDeclarations(symbol: ts.Symbol, publicName: string, printer: ts.Printer): string[] {
  return (symbol.declarations ?? []).map((declaration) => {
    const node = ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
    const declaredName = ts.getNameOfDeclaration(declaration);
    const [reviewNode] = ts.transform(node, [
      (context) => toReviewShape(context, declaredName, publicName),
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
 * Renames the declaration to its public export name.
 */
function toReviewShape(
  context: ts.TransformationContext,
  declaredName: ts.Node | undefined,
  publicName: string,
): ts.Transformer<ts.Node> {
  const visit = (node: ts.Node): ts.Node | undefined => {
    if (isPrivateMember(node)) {
      return undefined;
    }
    if (node === declaredName) {
      return context.factory.createIdentifier(publicName);
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
