// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const scriptPath = fileURLToPath(import.meta.url);
const packageRoot = path.resolve(path.dirname(scriptPath), "../../../..");

function parseSource(source, fileName) {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function declarationEntries(statement) {
  if (
    (ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isEnumDeclaration(statement)) &&
    statement.name
  ) {
    return [{ statement, node: statement, nameNodes: [statement.name] }];
  }

  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations
      .filter((declaration) => ts.isIdentifier(declaration.name))
      .map((declaration) => ({
        statement,
        node: declaration,
        declaration,
        nameNodes: [declaration.name],
      }));
  }

  return [];
}

function isExported(statement) {
  return statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
}

function collectDeclarationGraph(source, fileName) {
  const compilerOptions = { noLib: true, target: ts.ScriptTarget.Latest };
  const sourceFile = parseSource(source, fileName);
  const host = ts.createCompilerHost(compilerOptions);
  host.getSourceFile = (requestedFileName) =>
    requestedFileName === fileName ? sourceFile : undefined;
  host.fileExists = (requestedFileName) => requestedFileName === fileName;
  host.readFile = (requestedFileName) => (requestedFileName === fileName ? source : undefined);
  const checker = ts.createProgram([fileName], compilerOptions, host).getTypeChecker();
  const entries = sourceFile.statements
    .flatMap((statement) => declarationEntries(statement))
    .map((entry) => ({
      ...entry,
      names: entry.nameNodes.map((name) => name.text),
      exported: isExported(entry.statement),
    }));
  const topLevelSymbols = new Map();
  for (const entry of entries) {
    for (const nameNode of entry.nameNodes) {
      const symbol = checker.getSymbolAtLocation(nameNode);
      if (symbol) {
        topLevelSymbols.set(symbol, nameNode.text);
      }
    }
  }

  for (const entry of entries) {
    const references = new Set();
    function visit(node) {
      if (ts.isIdentifier(node)) {
        const referencedName = topLevelSymbols.get(checker.getSymbolAtLocation(node));
        if (referencedName) {
          references.add(referencedName);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(entry.node);
    for (const name of entry.names) {
      references.delete(name);
    }
    entry.references = references;
  }

  const exportedNames = new Set(
    entries.filter((entry) => entry.exported).flatMap((entry) => entry.names),
  );
  return { sourceFile, entries, exportedNames };
}

export function planModelRemovals({ previousGenerated, currentGenerated, previousSource }) {
  const previousGeneratedGraph = collectDeclarationGraph(
    previousGenerated,
    "previous-generated/models/models.ts",
  );
  const currentGeneratedGraph = collectDeclarationGraph(
    currentGenerated,
    "generated/models/models.ts",
  );
  const sourceGraph = collectDeclarationGraph(previousSource, "previous-src/models/models.ts");
  const generatedRemovedNames = new Set(
    [...previousGeneratedGraph.exportedNames].filter(
      (name) => !currentGeneratedGraph.exportedNames.has(name),
    ),
  );
  const plannedEntries = new Set();
  const plannedNames = new Set();

  function addEntry(entry) {
    plannedEntries.add(entry);
    for (const name of entry.names) {
      plannedNames.add(name);
    }
  }

  for (const entry of sourceGraph.entries) {
    if (entry.names.some((name) => generatedRemovedNames.has(name))) {
      addEntry(entry);
    }
  }

  let changed = true;
  while (changed) {
    changed = false;

    for (const entry of sourceGraph.entries) {
      if (
        plannedEntries.has(entry) ||
        entry.names.some((name) => currentGeneratedGraph.exportedNames.has(name))
      ) {
        continue;
      }

      const dependsOnRemoval = [...entry.references].some((name) => plannedNames.has(name));
      if (dependsOnRemoval) {
        addEntry(entry);
        changed = true;
      }
    }
  }

  const sourceNames = sourceGraph.entries
    .filter((entry) => plannedEntries.has(entry))
    .flatMap((entry) => entry.names);
  return { generatedRemovedNames, sourceNames };
}

function applyEdits(source, edits) {
  return [...edits]
    .sort((left, right) => right.start - left.start)
    .reduce(
      (result, edit) => result.slice(0, edit.start) + edit.text + result.slice(edit.end),
      source,
    );
}

export function removeModelDeclarations(source, namesToRemove) {
  const graph = collectDeclarationGraph(source, "src/models/models.ts");
  const edits = [];
  const variableRemovals = new Map();

  for (const entry of graph.entries) {
    if (!entry.names.some((name) => namesToRemove.has(name))) {
      continue;
    }

    if (entry.declaration) {
      const declarations = variableRemovals.get(entry.statement) ?? new Set();
      declarations.add(entry.declaration);
      variableRemovals.set(entry.statement, declarations);
      continue;
    }

    edits.push({
      start: entry.statement.getFullStart(),
      end: entry.statement.getEnd(),
      text: "",
    });
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  for (const [statement, declarationsToRemove] of variableRemovals) {
    const keptDeclarations = statement.declarationList.declarations.filter(
      (declaration) => !declarationsToRemove.has(declaration),
    );
    if (keptDeclarations.length === 0) {
      edits.push({
        start: statement.getFullStart(),
        end: statement.getEnd(),
        text: "",
      });
      continue;
    }

    const nextDeclarationList = ts.factory.updateVariableDeclarationList(
      statement.declarationList,
      keptDeclarations,
    );
    edits.push({
      start: statement.declarationList.getStart(graph.sourceFile),
      end: statement.declarationList.getEnd(),
      text: printer.printNode(ts.EmitHint.Unspecified, nextDeclarationList, graph.sourceFile),
    });
  }

  return applyEdits(source, edits);
}

export function collectModelExports(source) {
  return collectDeclarationGraph(source, "src/models/models.ts").exportedNames;
}

export function filterModelReexports(source, moduleName, availableNames, fileName) {
  const sourceFile = parseSource(source, fileName);
  const edits = [];

  for (const statement of sourceFile.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      !statement.moduleSpecifier ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.moduleSpecifier.text !== moduleName ||
      !statement.exportClause ||
      !ts.isNamedExports(statement.exportClause)
    ) {
      continue;
    }

    const kept = statement.exportClause.elements.filter((element) =>
      availableNames.has((element.propertyName ?? element.name).text),
    );
    if (kept.length === statement.exportClause.elements.length) {
      continue;
    }

    if (kept.length === 0) {
      edits.push({ start: statement.getFullStart(), end: statement.getEnd(), text: "" });
      continue;
    }

    const exportClause = `{
${kept.map((element) => `  ${element.getText(sourceFile)},`).join("\n")}
}`;
    edits.push({
      start: statement.exportClause.getStart(sourceFile),
      end: statement.exportClause.getEnd(),
      text: exportClause,
    });
  }

  return applyEdits(source, edits);
}

function runGit(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
}

function parseArguments(argv) {
  const options = { baseRef: "HEAD", write: false };
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === "--base-ref" && argv[index + 1]) {
      options.baseRef = argv[++index];
    } else if (argument === "--write") {
      options.write = true;
    } else {
      throw new Error(`Unknown or incomplete argument: ${argument}`);
    }
  }
  return options;
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  const repoRoot = runGit(packageRoot, ["rev-parse", "--show-toplevel"]).trim();
  const packageRelative = path.relative(repoRoot, packageRoot).replaceAll("\\", "/");
  const fromBase = (directory, file) =>
    runGit(repoRoot, ["show", `${options.baseRef}:${packageRelative}/${directory}/${file}`]);
  const readPackageFile = (directory, file) =>
    readFileSync(path.join(packageRoot, directory, ...file.split("/")), "utf8");

  const previousGenerated = fromBase("generated", "models/models.ts");
  const currentGenerated = readPackageFile("generated", "models/models.ts");
  const previousSource = fromBase("src", "models/models.ts");
  const currentModels = readPackageFile("src", "models/models.ts");
  const plan = planModelRemovals({ previousGenerated, currentGenerated, previousSource });
  const namesToRemove = new Set(plan.sourceNames);
  const nextModels = removeModelDeclarations(currentModels, namesToRemove);
  const availableNames = collectModelExports(nextModels);
  const currentModelsIndex = readPackageFile("src", "models/index.ts");
  const nextModelsIndex = filterModelReexports(
    currentModelsIndex,
    "./models.js",
    availableNames,
    "src/models/index.ts",
  );
  const currentIndex = readPackageFile("src", "index.ts");
  const nextIndex = filterModelReexports(
    currentIndex,
    "./models/index.js",
    availableNames,
    "src/index.ts",
  );
  const updates = [
    ["src/models/models.ts", currentModels, nextModels],
    ["src/models/index.ts", currentModelsIndex, nextModelsIndex],
    ["src/index.ts", currentIndex, nextIndex],
  ].filter(([, current, next]) => current !== next);

  console.log(
    `Generated removed ${plan.generatedRemovedNames.size} model declaration(s); ` +
      `${plan.sourceNames.length} customized declaration(s) belong to that removal.`,
  );
  if (updates.length === 0) {
    console.log("Generated model removals are synchronized in src.");
    return;
  }

  if (!options.write) {
    console.error(
      `Generated model removals are not synchronized in: ${updates.map(([file]) => file).join(", ")}`,
    );
    process.exitCode = 1;
    return;
  }

  for (const [file, , next] of updates) {
    writeFileSync(path.join(packageRoot, ...file.split("/")), next, "utf8");
    console.log(`Updated ${file}`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  main();
}
