// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

type ExportConditions = Record<string, { types: string }>;

interface Review {
  name: string;
  entryPoints: { path: string; conditions: string[] }[];
  exportSections: { path: string; declarations: string[] }[];
}

export function generateApiReview(packageRoot: string): { apiMd: string } {
  return { apiMd: renderApiMd(buildReview(packageRoot)) };
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

${exportSections.join("\n")}`;
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
