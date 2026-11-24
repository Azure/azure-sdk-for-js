// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type ExpressionNode,
  type ModuleDeclarationNode,
  type OutputDeclarationNode,
  type ParameterDeclarationNode,
  type ResourceDeclarationNode,
  type TargetScope,
  type VariableDeclarationNode,
} from "../../ast/index.js";
import { removeResourceScope } from "../../ast/resource-utils.js";
import type { AuthoredResourceContext } from "./authored-context.js";
import { hasArmParent, normalizeExtensionScopes } from "./deployment-resource-utils.js";
import { BicepNamer } from "./bicep-namer.js";
import type { DeploymentFilePlan, DeploymentLayout } from "./deployment-planning.js";
import { resolveFileDependencies } from "./file-dependencies.js";
import { joinFilePath } from "./file-paths.js";

export interface BicepAst {
  readonly targetScope: TargetScope;
  readonly resources: Map<string, ResourceDeclarationNode>;
  readonly parameters: Map<string, ParameterDeclarationNode>;
  readonly variables: Map<string, VariableDeclarationNode>;
  readonly outputs: Map<string, OutputDeclarationNode>;
  readonly modules: Map<string, ModuleDeclarationNode>;
}

export interface PreparedBicepFile {
  readonly fileName: string;
  readonly targetScope: TargetScope;
  readonly ast: BicepAst;
}

export interface PreparedModule {
  readonly file: PreparedBicepFile;
  readonly assignedResources: ReadonlySet<string>;
  readonly moduleScope: ExpressionNode | undefined;
  readonly moduleName: string;
  readonly namer: BicepNamer;
  readonly outputNames: Map<string, string>;
}

export interface PreparedDeploymentFiles {
  readonly stackAst: BicepAst;
  readonly entry: PreparedBicepFile;
  readonly entryAssignedResources: ReadonlySet<string>;
  readonly modules: readonly PreparedModule[];
  readonly entryExistingResourceCandidates: ReadonlyMap<string, ResourceDeclarationNode>;
}

function createFile(
  fileName: string,
  targetScope: TargetScope,
  selectedResources: ReadonlySet<string>,
  stackAst: BicepAst,
  includeOutputs: boolean,
): PreparedBicepFile {
  const ast: BicepAst = {
    targetScope,
    resources: new Map(),
    parameters: new Map(),
    variables: new Map(),
    modules: new Map(),
    outputs: new Map(includeOutputs ? stackAst.outputs : []),
  };
  for (const [name, resource] of stackAst.resources) {
    if (selectedResources.has(name)) ast.resources.set(name, resource);
  }
  return { fileName, targetScope, ast };
}

function resourceFileName(stackName: string, name: string): string {
  return joinFilePath(stackName, `${name}.bicep`);
}

/**
 * Candidate rules:
 * - Only pure existing resources, without deployment-file ownership.
 * - Entry: all pure existing resources.
 * - Other files: same authored RG or inherited Stack scope, with no explicit root scope.
 * - Do not copy existing references with explicit scope (own or inherited) into
 *   modules for explicitly scoped authored RGs; relative scope expressions may change meaning.
 *
 * Dependency selection includes only the candidates actually needed.
 */
function getExistingResourceCandidatesForPlan(
  plan: DeploymentFilePlan,
  stackAst: BicepAst,
  authoredContexts: ReadonlyMap<string, AuthoredResourceContext>,
  layout: DeploymentLayout,
): Map<string, ResourceDeclarationNode> {
  const {
    entryPlan,
    pureExistingResources,
    existingResourceToAuthoredResourceGroup,
    existingResourcesWithExplicitScope,
  } = layout;
  const result = new Map<string, ResourceDeclarationNode>();
  for (const [name, resource] of stackAst.resources) {
    if (!pureExistingResources.has(name)) continue;
    if (plan !== entryPlan) {
      let passThroughExplicitScope = false;
      for (
        let ancestor: string | undefined = name;
        ancestor !== undefined;
        ancestor = authoredContexts.get(ancestor)!.authoredParent
      ) {
        if (authoredContexts.get(ancestor)!.scopeOrigin === "pass-through-explicit") {
          passThroughExplicitScope = true;
          break;
        }
      }
      if (passThroughExplicitScope) continue;
    }
    // Do not relocate relative lookups across authored deployment boundaries.
    if (
      plan !== entryPlan &&
      (existingResourceToAuthoredResourceGroup.get(name) !== plan.authoredResourceGroup ||
        (plan.boundary !== undefined &&
          authoredContexts.get(plan.boundary)!.scopeOrigin === "existing-explicit") ||
        (plan.authoredResourceGroup === undefined && plan.moduleScope !== undefined) ||
        (existingResourcesWithExplicitScope.has(name) &&
          plan.authoredResourceGroup !== undefined &&
          authoredContexts.get(plan.authoredResourceGroup)!.scopeOrigin === "existing-explicit"))
    ) {
      continue;
    }
    let node = resource;
    if (
      plan !== entryPlan &&
      !existingResourcesWithExplicitScope.has(name) &&
      !hasArmParent(name, stackAst.resources, authoredContexts)
    ) {
      node = removeResourceScope(node);
    }
    result.set(name, node);
  }
  return result;
}

export function prepareDeploymentFiles(
  stackName: string,
  stackAst: BicepAst,
  authoredContexts: ReadonlyMap<string, AuthoredResourceContext>,
  layout: DeploymentLayout,
  stackNamer: BicepNamer,
): PreparedDeploymentFiles {
  const { entryPlan, deployments, pureExistingResources } = layout;
  const entryResources = entryPlan.resources;
  normalizeExtensionScopes(stackAst);

  if (deployments.length === 0) {
    const selectedResources = entryResources.size === 0 ? pureExistingResources : entryResources;
    const entry = createFile(
      `${stackName}.bicep`,
      stackAst.targetScope,
      selectedResources,
      stackAst,
      true,
    );
    const entryExistingResourceCandidates = getExistingResourceCandidatesForPlan(
      entryPlan,
      stackAst,
      authoredContexts,
      layout,
    );
    resolveFileDependencies(entry.ast, stackAst, entryExistingResourceCandidates);
    return {
      stackAst,
      entry,
      entryAssignedResources: new Set(entryResources),
      modules: [],
      entryExistingResourceCandidates,
    };
  }

  if (
    entryResources.size === 0 &&
    deployments.every(
      (plan) => plan.moduleScope === undefined && plan.targetScope === stackAst.targetScope,
    )
  ) {
    const firstTree = deployments[0]!;
    const mergedResources = new Set(deployments.flatMap((plan) => [...plan.resources]));
    const entry = createFile(
      resourceFileName(stackName, firstTree.boundary!),
      stackAst.targetScope,
      mergedResources,
      stackAst,
      true,
    );
    const entryExistingResourceCandidates = getExistingResourceCandidatesForPlan(
      firstTree,
      stackAst,
      authoredContexts,
      layout,
    );
    resolveFileDependencies(entry.ast, stackAst, entryExistingResourceCandidates);
    return {
      stackAst,
      entry,
      entryAssignedResources: mergedResources,
      modules: [],
      entryExistingResourceCandidates,
    };
  }

  const modules = deployments.map((plan): PreparedModule => {
    const boundaryIdentifier = plan.boundary!;
    const file = createFile(
      resourceFileName(stackName, boundaryIdentifier),
      plan.targetScope,
      plan.resources,
      stackAst,
      false,
    );
    for (const name of plan.resources) {
      if (authoredContexts.get(name)!.scopeOrigin === "pass-through-explicit") {
        continue;
      }
      if (name !== plan.boundary && hasArmParent(name, stackAst.resources, authoredContexts)) {
        continue;
      }
      const node = file.ast.resources.get(name)!;
      file.ast.resources.set(name, removeResourceScope(node));
    }
    resolveFileDependencies(
      file.ast,
      stackAst,
      getExistingResourceCandidatesForPlan(plan, stackAst, authoredContexts, layout),
    );
    return {
      file,
      assignedResources: new Set(plan.resources),
      moduleScope: plan.moduleScope,
      moduleName: stackNamer.moduleName(boundaryIdentifier, file.fileName),
      namer: new BicepNamer(file.ast),
      outputNames: new Map<string, string>(),
    };
  });
  const entry = createFile(
    `${stackName}.bicep`,
    stackAst.targetScope,
    entryResources,
    stackAst,
    true,
  );
  const entryExistingResourceCandidates = getExistingResourceCandidatesForPlan(
    entryPlan,
    stackAst,
    authoredContexts,
    layout,
  );
  resolveFileDependencies(entry.ast, stackAst, entryExistingResourceCandidates);
  return {
    stackAst,
    entry,
    entryAssignedResources: new Set(entryResources),
    modules,
    entryExistingResourceCandidates,
  };
}
