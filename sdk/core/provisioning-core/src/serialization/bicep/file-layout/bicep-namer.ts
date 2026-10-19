// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { sanitizeIdentifier } from "../../identifiers.js";
import { walkDeclarationExpressions } from "../../ast/expression-walker.js";
import type { ExpressionReference } from "../../ast/expression-rewriter.js";
import type { BicepAst } from "./file-preparation.js";

// Deliberately limited to built-in names likely to collide with resource symbols.
export const RESOURCE_NAME_OVERRIDES: ReadonlyMap<string, string> = new Map([
  ["resourceGroup", "rg"],
  ["subscription", "subscriptionResource"],
  ["managementGroup", "managementGroupResource"],
  ["tenant", "tenantResource"],
  ["deployment", "deploymentResource"],
  ["environment", "environmentResource"],
  ["reference", "referenceResource"],
  ["guid", "guidResource"],
  ["format", "formatResource"],
  ["range", "rangeResource"],
]);

function collectLoopBindings(ast: BicepAst): ReadonlySet<string> {
  const loopBindings = new Set<string>();
  for (const declaration of [
    ...ast.resources.values(),
    ...ast.parameters.values(),
    ...ast.variables.values(),
    ...ast.outputs.values(),
    ...ast.modules.values(),
  ]) {
    walkDeclarationExpressions(declaration, (node) => {
      if (node.kind === "for-expression") {
        loopBindings.add(node.itemVariable);
        if (node.indexVariable !== undefined) {
          loopBindings.add(node.indexVariable);
        }
      }
    });
  }
  return loopBindings;
}

export class BicepNamer {
  readonly #usedNames: Set<string>;
  readonly #usedOutputNames = new Set<string>();

  constructor(ast: BicepAst) {
    this.#usedNames = new Set([...RESOURCE_NAME_OVERRIDES.keys(), ...collectLoopBindings(ast)]);
    for (const declarations of [ast.parameters, ast.variables, ast.resources, ast.modules]) {
      for (const declaration of declarations.values()) {
        this.#usedNames.add(declaration.bicepIdentifier);
      }
    }
    for (const name of ast.outputs.keys()) this.#usedOutputNames.add(name);
  }

  moduleName(rootIdentifier: string, fileName: string): string {
    return createUniqueName(
      `${rootIdentifier}Module`,
      sanitizeIdentifier(fileName.replace(/\.bicep$/u, ""), "file"),
      this.#usedNames,
    );
  }

  parameterName(reference: ExpressionReference): string {
    return createUniqueName(buildRefParamName(reference), reference.identifier, this.#usedNames);
  }

  outputName(
    reference: ExpressionReference,
    preferredName: string = buildRefParamName(reference),
  ): string {
    return createUniqueName(preferredName, reference.identifier, this.#usedOutputNames);
  }
}

function buildRefParamName(reference: ExpressionReference): string {
  const segments = reference.path.map((segment) => {
    if (typeof segment === "number") return String(segment);
    const name = sanitizeIdentifier(segment);
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
  let modifiers = "";
  let current = reference.expression;
  let depth = 0;
  while (current.kind === "property-access" || current.kind === "array-access") {
    if (current.nullish) modifiers += `Safe${depth}`;
    if (current.kind === "array-access" && current.fromEnd) {
      modifiers += `FromEnd${depth}`;
    }
    current = current.base;
    depth++;
  }
  return reference.identifier + segments.join("") + modifiers;
}

function createUniqueName(name: string, alias: string, usedNames: Set<string>): string {
  if (!usedNames.has(name)) {
    usedNames.add(name);
    return name;
  }

  const stem = `${alias}${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  if (!usedNames.has(stem)) {
    usedNames.add(stem);
    return stem;
  }

  let counter = 2;
  while (usedNames.has(`${stem}${counter}`)) {
    counter += 1;
  }

  const uniqueName = `${stem}${counter}`;

  usedNames.add(uniqueName);
  return uniqueName;
}
