// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Stack } from "../../../constructs/stack.js";
import { collectResourceDeclarations } from "../../../constructs/resource/resource-query.js";
import { buildStackDeclarations } from "../../ast/declaration-builder.js";
import { createSymbolMap } from "../../symbol-map.js";
import type { InfraNode } from "../../ast/index.js";
import { collectAuthoredResourceContexts, validateResourceAncestry } from "./authored-context.js";
import { planDeploymentFiles } from "./deployment-planning.js";
import { BicepNamer, RESOURCE_NAME_OVERRIDES } from "./bicep-namer.js";
import {
  prepareDeploymentFiles,
  type BicepAst,
  type PreparedBicepFile,
} from "./file-preparation.js";
import { wireDeploymentFiles } from "./reference-wiring.js";

export function toInfraNode(file: PreparedBicepFile): InfraNode {
  const { ast } = file;
  return {
    fileName: file.fileName,
    targetScope: file.targetScope,
    ...(ast.resources.size === 0 ? {} : { resources: Object.fromEntries(ast.resources) }),
    ...(ast.parameters.size === 0 ? {} : { parameters: Object.fromEntries(ast.parameters) }),
    ...(ast.variables.size === 0 ? {} : { variables: Object.fromEntries(ast.variables) }),
    ...(ast.outputs.size === 0 ? {} : { outputs: Object.fromEntries(ast.outputs) }),
    ...(ast.modules.size === 0 ? {} : { modules: Object.fromEntries(ast.modules) }),
  };
}

/** Builds enriched declaration ASTs, then plans and wires deployment files. */
export function buildBicepFiles(stack: Stack): readonly InfraNode[] {
  const resources = collectResourceDeclarations(stack);
  validateResourceAncestry(stack, resources);
  const symbols = createSymbolMap(resources, stack, RESOURCE_NAME_OVERRIDES);
  const declarations = buildStackDeclarations(stack, resources, symbols);
  const stackAst: BicepAst = {
    targetScope: stack.targetScope,
    resources: new Map(Object.entries(declarations.resources ?? {})),
    parameters: new Map(Object.entries(declarations.parameters ?? {})),
    variables: new Map(Object.entries(declarations.variables ?? {})),
    outputs: new Map(Object.entries(declarations.outputs ?? {})),
    modules: new Map(),
  };
  const namer = new BicepNamer(stackAst);
  const resourceContexts = collectAuthoredResourceContexts(resources, symbols);
  const layout = planDeploymentFiles(stackAst, resourceContexts);
  const prepared = prepareDeploymentFiles(stack.name, stackAst, resourceContexts, layout, namer);
  if (prepared.modules.length > 0) {
    wireDeploymentFiles(stack.name, prepared);
  }
  return [toInfraNode(prepared.entry), ...prepared.modules.map(({ file }) => toInfraNode(file))];
}
