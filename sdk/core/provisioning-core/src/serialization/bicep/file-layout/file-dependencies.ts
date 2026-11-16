// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { collectDependenciesForDeclaration } from "../../ast/declaration-dependencies.js";
import type { DeclarationNode, ResourceDeclarationNode } from "../../ast/index.js";
import type { BicepAst } from "./file-preparation.js";

export function resolveFileDependencies(
  ast: BicepAst,
  stackAst: BicepAst,
  lookups: ReadonlyMap<string, ResourceDeclarationNode>,
): void {
  const declarations = new Map<string, DeclarationNode>([
    ...stackAst.variables,
    ...stackAst.parameters,
    ...lookups,
    ...ast.resources,
  ]);
  const references = collectDependenciesForDeclaration(
    [...ast.resources.values(), ...ast.outputs.values(), ...ast.modules.values()],
    { recursive: true, declarations },
  );
  const selectedResources = new Map([...lookups, ...ast.resources]);
  const includedResources = new Set(ast.resources.keys());
  ast.resources.clear();
  for (const name of stackAst.resources.keys()) {
    const resource = selectedResources.get(name);
    if (resource !== undefined && (includedResources.has(name) || references.has(name))) {
      ast.resources.set(name, resource);
    }
  }
  ast.variables.clear();
  for (const [name, variable] of stackAst.variables) {
    if (references.has(name)) ast.variables.set(name, variable);
  }
  ast.parameters.clear();
  for (const [name, parameter] of stackAst.parameters) {
    if (references.has(name)) ast.parameters.set(name, parameter);
  }
}
