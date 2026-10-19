// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isExpressionNode, type ExpressionNode } from "../../expression/ast-nodes.js";
import { ResourceGroup } from "../built-in-resources/resource-group.js";
import { unwrapResourceHandle } from "./resource-proxy.js";
import { isResourceDeclaration } from "./resource-utils.js";
import type { ResourceDeclaration } from "./resource.js";

/** Finds the nearest resource parent, excluding resource-group containment. */
export function getArmParent(resource: ResourceDeclaration): ResourceDeclaration | undefined {
  for (let parent = resource.parent; parent !== undefined; parent = parent.parent) {
    if (isResourceDeclaration(parent)) {
      return parent.type === ResourceGroup.resourceType ? undefined : parent.self;
    }
  }
  return undefined;
}

/** Finds the resource group containing the authored resource. */
export function getResourceGroupAncestor(
  resource: ResourceDeclaration,
): ResourceDeclaration | undefined {
  for (let current = resource.parent; current !== undefined; current = current.parent) {
    if (isResourceDeclaration(current) && current.type === ResourceGroup.resourceType) {
      return current.self;
    }
  }
  return undefined;
}

/** Reads an authored scope node without creating a resource-property reference. */
export function getResourceScope(resource: ResourceDeclaration): ExpressionNode | undefined {
  const scope: unknown = Reflect.get(unwrapResourceHandle(resource), "scope");
  if (scope === undefined) return undefined;
  if (!isExpressionNode(scope)) {
    throw new Error(`Invalid authored scope for resource "${resource.type}".`);
  }
  return scope;
}
