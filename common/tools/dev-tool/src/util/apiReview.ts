// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

type ExportConditions = Record<string, { types: string }>;

export function generateApiReview(packageRoot: string): { apiMd: string } {
  const packageJson = JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8"));
  const exportsMap: Record<string, ExportConditions> = packageJson.exports;

  const lines = [`# API review: \`${packageJson.name}\``, ""];

  lines.push("## Entry points", "", "| Export path | Conditions |", "| --- | --- |");
  for (const [exportPath, conditions] of Object.entries(exportsMap)) {
    const conditionList = Object.keys(conditions)
      .map((condition) => `\`${condition}\``)
      .join(", ");
    lines.push(`| \`${exportPath}\` | ${conditionList} |`);
  }
  lines.push("");

  for (const [exportPath, conditions] of Object.entries(exportsMap)) {
    const entryFile = path.join(packageRoot, conditions.import.types);
    lines.push(`## Export \`${exportPath}\``, "", "```ts", printExports(entryFile), "```", "");
  }

  return { apiMd: lines.join("\n") };
}

function printExports(entryFile: string): string {
  const program = ts.createProgram([entryFile], { skipLibCheck: true });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(entryFile)!;
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile)!;
  const printer = ts.createPrinter();

  const exportedSymbols = checker
    .getExportsOfModule(moduleSymbol)
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  const printed: string[] = [];
  for (const symbol of exportedSymbols) {
    for (const declaration of symbol.declarations ?? []) {
      const node = ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
      const [reviewNode] = ts.transform(node, [toReviewShape]).transformed;
      printed.push(printer.printNode(ts.EmitHint.Unspecified, reviewNode, node.getSourceFile()));
    }
  }
  return printed.join("\n\n");
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
 */
function toReviewShape(context: ts.TransformationContext): ts.Transformer<ts.Node> {
  const visit = (node: ts.Node): ts.Node | undefined => {
    if (isPrivateMember(node)) {
      return undefined;
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
