// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceGroup } from "../../../constructs/built-in-resources/resource-group.js";
import type { ExpressionNode, ResourceDeclarationNode, TargetScope } from "../../ast/index.js";
import { getResourceArmParentIdentifier, updateResourceBody } from "../../ast/resource-utils.js";
import { getScopeFunctionTarget } from "../../../expression/utils.js";
import type { AuthoredResourceContext } from "./authored-context.js";
import type { BicepAst } from "./file-preparation.js";

export function groupArmResourcesByRoot(
  resources: ReadonlyMap<string, ResourceDeclarationNode>,
  authoredContexts: ReadonlyMap<string, AuthoredResourceContext>,
): Map<string, Set<string>> {
  const armRootByResource = new Map<string, string>();
  function getArmTreeRoot(name: string): string {
    const cached = armRootByResource.get(name);
    if (cached !== undefined) return cached;
    const parent = authoredContexts.get(name)!.authoredParent;
    const root =
      parent === undefined || resources.get(parent)!.type === ResourceGroup.resourceType
        ? name
        : getArmTreeRoot(parent);
    armRootByResource.set(name, root);
    return root;
  }

  const armResourcesByRoot = new Map<string, Set<string>>();
  for (const name of resources.keys()) {
    const root = getArmTreeRoot(name);
    const treeResources = armResourcesByRoot.get(root) ?? new Set<string>();
    treeResources.add(name);
    armResourcesByRoot.set(root, treeResources);
  }
  return armResourcesByRoot;
}

export function hasArmParent(
  name: string,
  resources: ReadonlyMap<string, ResourceDeclarationNode>,
  authoredContexts: ReadonlyMap<string, AuthoredResourceContext>,
): boolean {
  const parent = authoredContexts.get(name)!.authoredParent;
  return parent !== undefined && resources.get(parent)!.type !== ResourceGroup.resourceType;
}

export function getTargetScope(
  scope: ExpressionNode | undefined,
  fallback: TargetScope,
): TargetScope {
  if (scope === undefined) return fallback;
  if (scope.kind !== "function-call" || typeof scope.target !== "string") {
    throw new Error("Unsupported authored deployment scope expression.");
  }
  const target = getScopeFunctionTarget(scope);
  if (target !== undefined) {
    return target;
  }
  throw new Error(`Unsupported deployment scope function "${scope.target}".`);
}

export function normalizeExtensionScopes(stackAst: BicepAst): void {
  // JSON builders preserve ARM parent metadata; Bicep uses scope for extensions.
  for (const [name, resource] of stackAst.resources) {
    const armParentIdentifier = getResourceArmParentIdentifier(resource);
    const armParent =
      armParentIdentifier === undefined ? undefined : stackAst.resources.get(armParentIdentifier);
    if (armParentIdentifier !== undefined && armParent === undefined) {
      throw new Error(`Missing ARM parent "${armParentIdentifier}" for resource "${name}".`);
    }
    if (armParent !== undefined && !resource.type.startsWith(`${armParent.type}/`)) {
      stackAst.resources.set(name, {
        ...resource,
        value: updateResourceBody(resource.value, (body) => {
          const { parent: target, ...rest } = body.value;
          if (target === undefined) {
            throw new Error(`Missing extension target for "${name}".`);
          }
          return { ...body, value: { scope: target, ...rest } };
        }),
      });
    }
  }
}
