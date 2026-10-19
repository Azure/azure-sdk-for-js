// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { posix as path } from "node:path";
import { collectDependenciesForDeclaration } from "../../ast/declaration-dependencies.js";
import { moduleOutputExpression } from "../../ast/expression-builder.js";
import {
  rewriteDeclarationExpressions,
  rewriteExpressionReferences,
  type ExpressionReference,
  type ExpressionReferenceResolver,
} from "../../ast/expression-rewriter.js";
import type { DeclarationNode, ExpressionNode, ParameterDeclarationNode } from "../../ast/index.js";
import { resolveFileDependencies } from "./file-dependencies.js";
import type { BicepAst, PreparedDeploymentFiles, PreparedModule } from "./file-preparation.js";
import { getResourceBody, updateResourceBody } from "../../ast/resource-utils.js";

function relativeImportPath(from: string, to: string): string {
  const relative = path.relative(path.dirname(from), to);
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function rewriteFileReferences(ast: BicepAst, resolve: ExpressionReferenceResolver): void {
  const rewrite = (expression: ExpressionNode): ExpressionNode =>
    rewriteExpressionReferences(expression, resolve);
  for (const [name, resource] of ast.resources) {
    ast.resources.set(name, rewriteDeclarationExpressions(resource, rewrite));
  }
  for (const [name, variable] of ast.variables) {
    ast.variables.set(name, rewriteDeclarationExpressions(variable, rewrite));
  }
  for (const [name, output] of ast.outputs) {
    ast.outputs.set(name, rewriteDeclarationExpressions(output, rewrite));
  }
  for (const [name, parameter] of ast.parameters) {
    ast.parameters.set(name, rewriteDeclarationExpressions(parameter, rewrite));
  }
  for (const [name, module] of ast.modules) {
    ast.modules.set(name, rewriteDeclarationExpressions(module, rewrite));
  }
}

function prepareModuleOutput(
  reference: ExpressionReference,
  prepared: PreparedDeploymentFiles,
  ownerByResource: ReadonlyMap<string, PreparedModule>,
  preferredName?: string,
): ExpressionNode {
  const { stackAst, entryAssignedResources, entryExistingResourceCandidates } = prepared;
  if (!stackAst.resources.has(reference.identifier)) {
    throw new Error(`Unknown resource reference "${reference.identifier}".`);
  }
  const owner = ownerByResource.get(reference.identifier);
  if (owner === undefined) {
    if (
      !entryAssignedResources.has(reference.identifier) &&
      !entryExistingResourceCandidates.has(reference.identifier)
    ) {
      throw new Error(`Missing deployment owner for "${reference.identifier}".`);
    }
    return reference.expression;
  }
  const key = JSON.stringify(reference.expression);
  let outputName = owner.outputNames.get(key);
  if (outputName === undefined) {
    outputName = owner.namer.outputName(reference, preferredName);
    owner.file.ast.outputs.set(outputName, {
      bicepIdentifier: outputName,
      valueType: { kind: "primitive-type", name: "any" },
      value: reference.expression,
    });
    owner.outputNames.set(key, outputName);
  }
  return moduleOutputExpression(owner.moduleName, outputName);
}

export function wireDeploymentFiles(stackName: string, prepared: PreparedDeploymentFiles): void {
  const { stackAst, entry, entryAssignedResources, modules, entryExistingResourceCandidates } =
    prepared;
  const entryAst = entry.ast;
  const ownerByResource = new Map<string, PreparedModule>();
  for (const owner of modules) {
    for (const resource of owner.assignedResources) {
      ownerByResource.set(resource, owner);
    }
  }

  for (const owner of modules) {
    const { file, assignedResources, moduleScope, moduleName, namer } = owner;
    const { ast } = file;
    const moduleDependencies = new Set<string>();
    for (const name of assignedResources) {
      const node = ast.resources.get(name)!;
      const dependencies = getResourceBody(node.value).value.dependsOn;
      if (dependencies === undefined) continue;
      if (dependencies.kind !== "array") {
        throw new Error(`Invalid dependsOn for resource "${name}".`);
      }
      const local: ExpressionNode[] = [];
      for (const dependency of dependencies.items) {
        if (dependency.kind !== "identifier") {
          throw new Error(`Invalid dependsOn target for resource "${name}".`);
        }
        const identifier = dependency.id;
        if (!stackAst.resources.has(identifier)) {
          throw new Error(`Dependency is outside Stack "${stackName}".`);
        }
        const target = ownerByResource.get(identifier);
        if (target !== undefined && target !== owner) {
          moduleDependencies.add(target.moduleName);
        } else if (target === undefined && entryAssignedResources.has(identifier)) {
          moduleDependencies.add(identifier);
        } else {
          local.push({ kind: "identifier", id: identifier });
        }
      }
      ast.resources.set(name, {
        ...node,
        value: updateResourceBody(node.value, (body) => {
          const { dependsOn: _dependsOn, ...rest } = body.value;
          return {
            ...body,
            value: {
              ...rest,
              ...(local.length === 0 ? {} : { dependsOn: { kind: "array", items: local } }),
            },
          };
        }),
      });
    }
    const parameterAssignments = new Map<string, ExpressionNode>(
      [...ast.parameters.values()].map((parameter) => [
        parameter.bicepIdentifier,
        { kind: "identifier", id: parameter.bicepIdentifier },
      ]),
    );
    const generatedParameters = new Map<string, ParameterDeclarationNode>();
    const parameterNames = new Map<string, string>();
    rewriteFileReferences(ast, (reference) => {
      if (
        reference.path.length === 0 ||
        ast.resources.has(reference.identifier) ||
        !stackAst.resources.has(reference.identifier)
      ) {
        return undefined;
      }
      const key = JSON.stringify(reference.expression);
      let parameterName = parameterNames.get(key);
      if (parameterName === undefined) {
        parameterName = namer.parameterName(reference);
        parameterNames.set(key, parameterName);
        generatedParameters.set(parameterName, {
          bicepIdentifier: parameterName,
          valueType: { kind: "primitive-type", name: "any" },
        });
        parameterAssignments.set(
          parameterName,
          prepareModuleOutput(reference, prepared, ownerByResource, parameterName),
        );
      }
      return { kind: "identifier", id: parameterName };
    });
    for (const [name, parameter] of generatedParameters) {
      ast.parameters.set(name, parameter);
    }
    entryAst.modules.set(moduleName, {
      bicepIdentifier: moduleName,
      path: relativeImportPath(entry.fileName, file.fileName),
      value: {
        kind: "object",
        value: {
          name: { kind: "string", value: moduleName },
          ...(moduleScope === undefined ? {} : { scope: moduleScope }),
          ...(parameterAssignments.size === 0
            ? {}
            : {
                params: {
                  kind: "object",
                  value: Object.fromEntries(parameterAssignments),
                },
              }),
          ...(moduleDependencies.size === 0
            ? {}
            : {
                dependsOn: {
                  kind: "array",
                  items: [...moduleDependencies].map((id) => ({
                    kind: "identifier",
                    id,
                  })),
                },
              }),
        },
      },
    });
  }
  resolveFileDependencies(entryAst, stackAst, entryExistingResourceCandidates);
  for (const [name, resource] of entryAst.resources) {
    const dependencies = getResourceBody(resource.value).value.dependsOn;
    if (dependencies === undefined) continue;
    if (dependencies.kind !== "array") {
      throw new Error(`Invalid dependsOn for resource "${name}".`);
    }
    const identifiers = new Set<string>();
    for (const dependency of dependencies.items) {
      if (dependency.kind !== "identifier") {
        throw new Error(`Invalid dependsOn target for resource "${name}".`);
      }
      if (!stackAst.resources.has(dependency.id)) {
        throw new Error(`Dependency is outside Stack "${stackName}".`);
      }
      identifiers.add(ownerByResource.get(dependency.id)?.moduleName ?? dependency.id);
    }
    entryAst.resources.set(name, {
      ...resource,
      value: updateResourceBody(resource.value, (body) => ({
        ...body,
        value: {
          ...body.value,
          dependsOn: {
            kind: "array",
            items: [...identifiers].map((id) => ({
              kind: "identifier",
              id,
            })),
          },
        },
      })),
    });
  }
  rewriteFileReferences(entryAst, (reference) => {
    if (
      reference.path.length === 0 ||
      entryAst.resources.has(reference.identifier) ||
      !stackAst.resources.has(reference.identifier)
    ) {
      return undefined;
    }
    return prepareModuleOutput(reference, prepared, ownerByResource);
  });
  const entryDeclarations = new Map<string, DeclarationNode>([
    ...entryAst.resources,
    ...entryAst.parameters,
    ...entryAst.variables,
    ...entryAst.modules,
  ]);
  for (const [name, module] of entryAst.modules) {
    if (
      collectDependenciesForDeclaration(module, {
        recursive: true,
        declarations: entryDeclarations,
      }).has(name)
    ) {
      throw new Error(`Cyclic module dependency involving "${name}" in Stack "${stackName}".`);
    }
  }
}
