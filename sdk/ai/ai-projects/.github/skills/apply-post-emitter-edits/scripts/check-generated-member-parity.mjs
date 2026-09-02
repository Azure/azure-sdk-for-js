// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { planModelRemovals } from "./sync-generated-model-removals.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const packageRoot = path.resolve(path.dirname(scriptPath), "../../../..");

const symbolRenames = {
  "api/agents/operations.ts": {
    _createAgentSend: "_createSend",
    _updateAgentSend: "_updateSend",
  },
  "api/agents/options.ts": {
    AgentsCreateAgentOptionalParams: "AgentsCreateOptionalParams",
    AgentsUpdateAgentOptionalParams: "AgentsUpdateOptionalParams",
  },
};

const preservedSourceFiles = ["index.ts", "models/index.ts", "models/models.ts"];

function propertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return undefined;
}

function parseSource(source, fileName) {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function collectInterfaces(sourceFile) {
  const interfaces = new Map();
  for (const statement of sourceFile.statements) {
    if (!ts.isInterfaceDeclaration(statement)) {
      continue;
    }

    const members = new Set();
    for (const member of statement.members) {
      if (member.name) {
        const name = propertyName(member.name);
        if (name) {
          members.add(name);
        }
      }
    }
    interfaces.set(statement.name.text, members);
  }
  return interfaces;
}

function collectExportedNames(sourceFile) {
  const names = new Set();
  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement) && statement.exportClause) {
      if (ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) {
          names.add(element.name.text);
        }
      } else if (ts.isNamespaceExport(statement.exportClause)) {
        names.add(statement.exportClause.name.text);
      }
      continue;
    }

    const isExported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) {
      continue;
    }

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) {
          names.add(declaration.name.text);
        }
      }
    } else if (statement.name && ts.isIdentifier(statement.name)) {
      names.add(statement.name.text);
    }
  }
  return names;
}

function collectSendBodyProperties(sourceFile) {
  const functions = new Map();
  for (const statement of sourceFile.statements) {
    if (!ts.isFunctionDeclaration(statement) || !statement.name || !statement.body) {
      continue;
    }

    const functionName = statement.name.text;
    if (!functionName.endsWith("Send")) {
      continue;
    }

    const properties = new Set();
    function visit(node) {
      if (
        ts.isPropertyAssignment(node) &&
        propertyName(node.name) === "body" &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        for (const property of node.initializer.properties) {
          if (property.name) {
            const name = propertyName(property.name);
            if (name) {
              properties.add(name);
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(statement.body);
    functions.set(functionName, properties);
  }
  return functions;
}

function addedValues(previous, current) {
  return [...current].filter((value) => !previous.has(value));
}

export function findMissingPreservedExports({ previousSource, currentSource, file }) {
  const previousFile = parseSource(previousSource, `previous-src/${file}`);
  const currentFile = parseSource(currentSource, `src/${file}`);
  const previousExports = collectExportedNames(previousFile);
  const currentExports = collectExportedNames(currentFile);

  return [...previousExports]
    .filter((name) => !currentExports.has(name))
    .map((name) => ({ file, name }));
}

export function findIndexInvariantViolations(source) {
  const sourceFile = parseSource(source, "src/index.ts");
  const violations = [];
  const imports = new Map();

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !statement.importClause?.namedBindings ||
      !ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      continue;
    }
    for (const element of statement.importClause.namedBindings.elements) {
      imports.set(element.name.text, {
        source: statement.moduleSpecifier.text,
        typeOnly: statement.importClause.isTypeOnly || element.isTypeOnly,
      });
    }
  }

  if (source.includes("./restorePollerHelpers.js")) {
    violations.push("must not reference nonexistent src/restorePollerHelpers.ts");
  }
  for (const name of ["PageSettings", "PagedAsyncIterableIterator"]) {
    const imported = imports.get(name);
    if (imported?.source !== "@azure/core-paging" || !imported.typeOnly) {
      violations.push(`${name} must be imported as a type from @azure/core-paging`);
    }
  }
  const continuablePage = imports.get("ContinuablePage");
  if (
    continuablePage?.source !== "./static-helpers/pagingHelpers.js" ||
    !continuablePage.typeOnly
  ) {
    violations.push(
      "ContinuablePage must be imported as a type from ./static-helpers/pagingHelpers.js",
    );
  }
  return violations;
}

export function findMissingAdditions({ previousGenerated, currentGenerated, currentSource, file }) {
  const previousFile = parseSource(previousGenerated, `previous-generated/${file}`);
  const currentFile = parseSource(currentGenerated, `generated/${file}`);
  const sourceFile = parseSource(currentSource, `src/${file}`);
  const renames = symbolRenames[file] ?? {};
  const missing = [];

  const previousInterfaces = collectInterfaces(previousFile);
  const currentInterfaces = collectInterfaces(currentFile);
  const sourceInterfaces = collectInterfaces(sourceFile);
  for (const [generatedName, currentMembers] of currentInterfaces) {
    const previousMembers = previousInterfaces.get(generatedName);
    if (!previousMembers) {
      continue;
    }

    const sourceName = renames[generatedName] ?? generatedName;
    const sourceMembers = sourceInterfaces.get(sourceName) ?? new Set();
    for (const member of addedValues(previousMembers, currentMembers)) {
      if (!sourceMembers.has(member)) {
        missing.push({ file, kind: "interface member", generatedName, sourceName, member });
      }
    }
  }

  const previousFunctions = collectSendBodyProperties(previousFile);
  const currentFunctions = collectSendBodyProperties(currentFile);
  const sourceFunctions = collectSendBodyProperties(sourceFile);
  for (const [generatedName, currentProperties] of currentFunctions) {
    const previousProperties = previousFunctions.get(generatedName);
    if (!previousProperties) {
      continue;
    }

    const sourceName = renames[generatedName] ?? generatedName;
    const sourceProperties = sourceFunctions.get(sourceName) ?? new Set();
    for (const member of addedValues(previousProperties, currentProperties)) {
      if (!sourceProperties.has(member)) {
        missing.push({ file, kind: "request body property", generatedName, sourceName, member });
      }
    }
  }

  return missing;
}

function runGit(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
}

function parseArguments(argv) {
  const options = { baseRef: "HEAD", files: [] };
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    const value = argv[index + 1];
    if (argument === "--base-ref" && value) {
      options.baseRef = value;
      index++;
    } else if (argument === "--generated-ref" && value) {
      options.generatedRef = value;
      index++;
    } else if (argument === "--source-ref" && value) {
      options.sourceRef = value;
      index++;
    } else if (argument === "--current-ref" && value) {
      options.generatedRef = value;
      options.sourceRef = value;
      index++;
    } else if (argument === "--file" && value) {
      options.files.push(value.replaceAll("\\", "/"));
      index++;
    } else {
      throw new Error(`Unknown or incomplete argument: ${argument}`);
    }
  }
  return options;
}

function readVersion(repoRoot, packageRelative, directory, file, ref) {
  const relativePath = `${packageRelative}/${directory}/${file}`;
  if (ref) {
    try {
      return runGit(repoRoot, ["show", `${ref}:${relativePath}`]);
    } catch {
      return undefined;
    }
  }

  const filePath = path.join(packageRoot, directory, ...file.split("/"));
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : undefined;
}

function changedGeneratedFiles(repoRoot, packageRelative, options) {
  if (options.files.length > 0) {
    return options.files;
  }

  const generatedPath = `${packageRelative}/generated`;
  const args = options.generatedRef
    ? ["diff", "--name-only", options.baseRef, options.generatedRef, "--", generatedPath]
    : ["diff", "--name-only", options.baseRef, "--", generatedPath];
  const prefix = `${generatedPath}/`;
  return runGit(repoRoot, args)
    .split(/\r?\n/)
    .filter((file) => file.startsWith(prefix) && /\.[cm]?ts$/.test(file))
    .map((file) => file.slice(prefix.length));
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  const repoRoot = runGit(packageRoot, ["rev-parse", "--show-toplevel"]).trim();
  const packageRelative = path.relative(repoRoot, packageRoot).replaceAll("\\", "/");
  const generatedFiles = changedGeneratedFiles(repoRoot, packageRelative, options);
  const missingAdditions = [];

  for (const file of generatedFiles) {
    const previousGenerated = readVersion(
      repoRoot,
      packageRelative,
      "generated",
      file,
      options.baseRef,
    );
    const currentGenerated = readVersion(
      repoRoot,
      packageRelative,
      "generated",
      file,
      options.generatedRef,
    );
    const currentSource = readVersion(repoRoot, packageRelative, "src", file, options.sourceRef);
    if (!previousGenerated || !currentGenerated || !currentSource) {
      continue;
    }

    missingAdditions.push(
      ...findMissingAdditions({ previousGenerated, currentGenerated, currentSource, file }),
    );
  }

  const sourceFiles =
    options.files.length > 0
      ? preservedSourceFiles.filter((file) => options.files.includes(file))
      : preservedSourceFiles;
  const previousGeneratedModels = readVersion(
    repoRoot,
    packageRelative,
    "generated",
    "models/models.ts",
    options.baseRef,
  );
  const currentGeneratedModels = readVersion(
    repoRoot,
    packageRelative,
    "generated",
    "models/models.ts",
    options.generatedRef,
  );
  const previousSourceModels = readVersion(
    repoRoot,
    packageRelative,
    "src",
    "models/models.ts",
    options.baseRef,
  );
  const allowedModelRemovals =
    previousGeneratedModels && currentGeneratedModels && previousSourceModels
      ? new Set(
          planModelRemovals({
            previousGenerated: previousGeneratedModels,
            currentGenerated: currentGeneratedModels,
            previousSource: previousSourceModels,
          }).sourceNames,
        )
      : new Set();
  const missingPreservedExports = [];
  for (const file of sourceFiles) {
    const previousSource = readVersion(repoRoot, packageRelative, "src", file, options.baseRef);
    if (!previousSource) {
      continue;
    }

    const currentSource =
      readVersion(repoRoot, packageRelative, "src", file, options.sourceRef) ?? "";
    missingPreservedExports.push(
      ...findMissingPreservedExports({ previousSource, currentSource, file }).filter(
        (item) => !allowedModelRemovals.has(item.name),
      ),
    );
  }

  const currentIndex = readVersion(repoRoot, packageRelative, "src", "index.ts", options.sourceRef);
  const indexInvariantViolations = currentIndex ? findIndexInvariantViolations(currentIndex) : [];

  if (missingAdditions.length > 0) {
    console.error("New generated members are missing from customized src:");
    for (const item of missingAdditions) {
      const rename = item.generatedName === item.sourceName ? "" : ` (${item.generatedName})`;
      console.error(
        `  src/${item.file}: ${item.sourceName}${rename} missing ${item.kind} '${item.member}'`,
      );
    }
  }

  if (missingPreservedExports.length > 0) {
    console.error("Previously exported customized symbols are missing from src:");
    for (const item of missingPreservedExports) {
      console.error(`  src/${item.file}: missing export '${item.name}'`);
    }
  }

  if (indexInvariantViolations.length > 0) {
    console.error("Customized src/index.ts invariants failed:");
    for (const violation of indexInvariantViolations) {
      console.error(`  ${violation}`);
    }
  }

  if (
    missingAdditions.length > 0 ||
    missingPreservedExports.length > 0 ||
    indexInvariantViolations.length > 0
  ) {
    process.exitCode = 1;
    return;
  }

  console.log(
    `Customization parity passed for ${generatedFiles.length} changed generated file(s); ` +
      `preserved exports in ${sourceFiles.length} customized source file(s), allowing ` +
      `${allowedModelRemovals.size} generated-backed model removal(s).`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  main();
}
