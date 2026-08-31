// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

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
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
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
  const files = changedGeneratedFiles(repoRoot, packageRelative, options);
  const missing = [];

  for (const file of files) {
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
    const currentSource = readVersion(
      repoRoot,
      packageRelative,
      "src",
      file,
      options.sourceRef,
    );
    if (!previousGenerated || !currentGenerated || !currentSource) {
      continue;
    }

    missing.push(
      ...findMissingAdditions({ previousGenerated, currentGenerated, currentSource, file }),
    );
  }

  if (missing.length > 0) {
    console.error("New generated members are missing from customized src:");
    for (const item of missing) {
      const rename = item.generatedName === item.sourceName ? "" : ` (${item.generatedName})`;
      console.error(
        `  src/${item.file}: ${item.sourceName}${rename} missing ${item.kind} '${item.member}'`,
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Customization member parity passed for ${files.length} generated file(s).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  main();
}