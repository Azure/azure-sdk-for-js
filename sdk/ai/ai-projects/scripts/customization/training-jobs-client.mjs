// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { edit, importsOf, nameOf, parse } from "./modules.mjs";

const file = "aiProjectClient.ts";
const moduleName = "./classic/jobs/index.js";

function client(source) {
  return source.statements.find(
    (node) => ts.isClassDeclaration(node) && node.name?.text === "AIProjectClient",
  );
}

function assignment(statement, member) {
  if (!ts.isExpressionStatement(statement)) return undefined;
  const expression = statement.expression;
  return ts.isBinaryExpression(expression) &&
    expression.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    ts.isPropertyAccessExpression(expression.left) &&
    expression.left.expression.kind === ts.SyntaxKind.ThisKeyword &&
    expression.left.name.text === member
    ? expression.right
    : undefined;
}

function jobsFactory(value, context) {
  return (
    value &&
    ts.isCallExpression(value) &&
    ts.isIdentifier(value.expression) &&
    value.expression.text === "_getJobsOperations" &&
    value.arguments.length === 1 &&
    ts.isPropertyAccessExpression(value.arguments[0]) &&
    value.arguments[0].expression.kind === ts.SyntaxKind.ThisKeyword &&
    value.arguments[0].name.text === context
  );
}

export function isTrainingJobsInitialization(generated, customized) {
  return (
    jobsFactory(assignment(generated, "jobs"), "_client") &&
    jobsFactory(assignment(customized, "jobs"), "_azureScopeClient")
  );
}

/** Integrate only the reviewed, newly emitted Jobs group into the maintained client. */
export function wireTrainingJobsClient(baseText, customText, incomingText) {
  const previous = client(parse(baseText, file));
  const incomingSource = parse(incomingText, file);
  const incoming = client(incomingSource);
  const jobMember = incoming?.members.find((member) => nameOf(member.name) === "jobs");
  if (!jobMember || previous?.members.some((member) => nameOf(member.name) === "jobs")) {
    return { text: customText, diagnostics: [] };
  }

  const source = parse(customText, file);
  const customized = client(source);
  if (customized?.members.some((member) => nameOf(member.name) === "jobs")) {
    return { text: customText, diagnostics: [] };
  }

  const reject = (message) => ({
    text: customText,
    diagnostics: [{ file, declaration: "AIProjectClient.jobs", message }],
  });
  const incomingConstructor = incoming.members.find(ts.isConstructorDeclaration);
  const initializer = incomingConstructor?.body?.statements
    .map((statement) => assignment(statement, "jobs"))
    .find(Boolean);
  if (
    !ts.isPropertyDeclaration(jobMember) ||
    jobMember.questionToken ||
    jobMember.type?.getText(incomingSource) !== "JobsOperations" ||
    !jobsFactory(initializer, "_client")
  ) {
    return reject("Unrecognized generated Jobs group; review its type and initialization.");
  }

  const constructor = customized?.members.find(ts.isConstructorDeclaration);
  const contextAssignment = constructor?.body?.statements.find((statement) =>
    assignment(statement, "_azureScopeClient"),
  );
  if (!contextAssignment) {
    return reject("The maintained API client context is unavailable for Jobs initialization.");
  }

  const customImports = importsOf(source);
  const incomingImports = importsOf(incomingSource);
  const additions = [];
  for (const name of ["JobsOperations", "_getJobsOperations"]) {
    const generatedImport = incomingImports.find((entry) => entry.local === name);
    const customImport = customImports.find((entry) => entry.local === name);
    if (
      generatedImport?.module !== moduleName ||
      generatedImport.imported !== name ||
      (customImport && (customImport.module !== moduleName || customImport.imported !== name))
    ) {
      return reject(`Unrecognized or conflicting Jobs import: ${name}.`);
    }
    if (!customImport) {
      additions.push(
        `import ${name === "JobsOperations" ? "type " : ""}{ ${name} } from "${moduleName}";`,
      );
    }
  }

  const lastImport = source.statements.filter(ts.isImportDeclaration).at(-1);
  if (!lastImport) {
    return reject("The maintained client import scaffold is unavailable.");
  }
  const text = edit(customText, [
    {
      start: lastImport.end,
      end: lastImport.end,
      text: additions.length ? `\n${additions.join("\n")}` : "",
    },
    {
      start: contextAssignment.end,
      end: contextAssignment.end,
      text: "\n    this.jobs = _getJobsOperations(this._azureScopeClient);",
    },
    {
      start: constructor.end,
      end: constructor.end,
      text: "\n\n  /** The operation group for command training jobs. */\n  public readonly jobs: JobsOperations;",
    },
  ]);
  return { text, diagnostics: [] };
}
