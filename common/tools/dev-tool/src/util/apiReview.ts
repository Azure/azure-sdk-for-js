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
  const printer = ts.createPrinter({ removeComments: true });

  const exportedSymbols = checker
    .getExportsOfModule(moduleSymbol)
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  const printed: string[] = [];
  for (const symbol of exportedSymbols) {
    for (const declaration of symbol.declarations ?? []) {
      const node = ts.isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
      printed.push(printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile()));
    }
  }
  return printed.join("\n\n");
}
