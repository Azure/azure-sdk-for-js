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
  exportSections: { path: string; declarations: string[] }[];
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
  const exportsMap: Record<string, ExportConditions> = packageJson.exports;

  return {
    name: packageJson.name,
    entryPoints: Object.entries(exportsMap).map(([exportPath, conditions]) => ({
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
    exportSections: Object.entries(exportsMap).map(([exportPath, conditions]) => ({
      path: exportPath,
      declarations: printExports(path.join(packageRoot, conditions.import.types)),
    })),
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
  const exportSections = review.exportSections.map(
    (section) => `## Export \`${section.path}\`

\`\`\`ts
${section.declarations.join("\n\n")}
\`\`\`
`,
  );

  return `# API review: \`${review.name}\`

## Entry points

| Export path | Conditions |
| --- | --- |
${entryPointRows.join("\n")}

${dependenciesSection}${exportSections.join("\n")}`;
}

function printExports(entryFile: string): string[] {
  const program = ts.createProgram([entryFile], { skipLibCheck: true });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(entryFile)!;
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile)!;
  const printer = ts.createPrinter();

  const exportedSymbols = checker
    .getExportsOfModule(moduleSymbol)
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  const printed: string[] = [];
  for (const exportedSymbol of exportedSymbols) {
    const symbol =
      exportedSymbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exportedSymbol)
        : exportedSymbol;
    for (const declaration of symbol.declarations ?? []) {
      const node = ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
      const declaredName = ts.getNameOfDeclaration(declaration);
      const [reviewNode] = ts.transform(node, [
        (context) => toReviewShape(context, declaredName, exportedSymbol.name),
      ]).transformed;
      printed.push(printer.printNode(ts.EmitHint.Unspecified, reviewNode, node.getSourceFile()));
    }
  }
  return printed;
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
