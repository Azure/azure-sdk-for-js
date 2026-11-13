// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isResourceDeclaration } from "../../../constructs/resource/resource-utils.js";
import type { Stack } from "../../../constructs/stack.js";
import type { ProvisioningComponent } from "../../../constructs/provisioning-component.js";
import type { ResourceDeclaration } from "../../../constructs/resource/resource.js";
import {
  getArmParent,
  getResourceGroupAncestor,
  getResourceScope,
} from "../../../constructs/resource/resource-relationships.js";
import type { DeclarationSymbolMap } from "../../symbol-map.js";
import { getScopeFunctionTarget } from "../../../expression/utils.js";

export interface AuthoredResourceContext {
  /** Nearest authored resource ancestor, including resource groups. */
  readonly authoredParent: string | undefined;
  /** Existing-explicit lookups affect placement; pass-through-explicit scopes only affect emitted bodies. */
  readonly scopeOrigin: "existing-explicit" | "pass-through-explicit" | "resourceGroup" | "none";
}

/** Distinguishes pass-through declaration data from supported existing lookups. */
function usesPassThroughExplicitScope(resource: ResourceDeclaration): boolean {
  const scope = getResourceScope(resource);
  return (
    scope !== undefined &&
    (resource.existing !== true || getScopeFunctionTarget(scope) === undefined)
  );
}

export function validateResourceAncestry(
  stack: Stack,
  resources: readonly ResourceDeclaration[],
): void {
  const resourceSet = new Set(resources);
  for (const resource of resources) {
    const ancestors = new Set<ProvisioningComponent>([resource.self]);
    for (let parent = resource.parent; parent !== undefined; parent = parent.parent) {
      if (ancestors.has(parent.self)) {
        throw new Error(`Cyclic resource attachment in Stack "${stack.name}".`);
      }
      ancestors.add(parent.self);
      if (isResourceDeclaration(parent) && !resourceSet.has(parent.self)) {
        throw new Error(`Resource "${resource.type}" has a parent outside Stack "${stack.name}".`);
      }
    }
  }
}

export function collectAuthoredResourceContexts(
  resources: readonly ResourceDeclaration[],
  symbols: DeclarationSymbolMap,
): ReadonlyMap<string, AuthoredResourceContext> {
  const resourceContexts = new Map<string, AuthoredResourceContext>();
  for (const resource of resources) {
    const identifier = symbols.get(resource);
    if (identifier === undefined) {
      throw new Error(`Missing symbol for resource type "${resource.type}".`);
    }
    let authoredParent: string | undefined;
    for (let parent = resource.parent; parent !== undefined; parent = parent.parent) {
      if (!isResourceDeclaration(parent)) continue;
      authoredParent = symbols.get(parent.self);
      if (authoredParent === undefined) {
        throw new Error(`Missing authored parent symbol for resource "${identifier}".`);
      }
      break;
    }
    resourceContexts.set(identifier, {
      authoredParent,
      scopeOrigin: usesPassThroughExplicitScope(resource)
        ? "pass-through-explicit"
        : getResourceScope(resource) !== undefined
          ? "existing-explicit"
          : getArmParent(resource) === undefined && getResourceGroupAncestor(resource) !== undefined
            ? "resourceGroup"
            : "none",
    });
  }
  return resourceContexts;
}
