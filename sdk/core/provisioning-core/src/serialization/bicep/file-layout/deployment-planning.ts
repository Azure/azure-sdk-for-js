// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceGroup } from "../../../constructs/built-in-resources/resource-group.js";
import type { ExpressionNode, TargetScope } from "../../ast/index.js";
import { getResourceBody } from "../../ast/resource-utils.js";
import type { AuthoredResourceContext } from "./authored-context.js";
import { groupArmResourcesByRoot, getTargetScope } from "./deployment-resource-utils.js";
import type { BicepAst } from "./file-preparation.js";

export interface DeploymentFilePlan {
  readonly boundary: string | undefined;
  readonly resources: Set<string>;
  readonly authoredResourceGroup: string | undefined;
  readonly moduleScope: ExpressionNode | undefined;
  readonly targetScope: TargetScope;
}

export interface DeploymentLayout {
  readonly entryPlan: DeploymentFilePlan;
  readonly deployments: readonly DeploymentFilePlan[];
  readonly pureExistingResources: ReadonlySet<string>;
  readonly existingResourceToAuthoredResourceGroup: ReadonlyMap<string, string | undefined>;
  readonly existingResourcesWithExplicitScope: ReadonlySet<string>;
}

export function planDeploymentFiles(
  stackAst: BicepAst,
  authoredContexts: ReadonlyMap<string, AuthoredResourceContext>,
): DeploymentLayout {
  const entryPlan: DeploymentFilePlan = {
    boundary: undefined,
    resources: new Set(),
    authoredResourceGroup: undefined,
    moduleScope: undefined,
    targetScope: stackAst.targetScope,
  };
  const armResourcesByRoot = groupArmResourcesByRoot(stackAst.resources, authoredContexts);

  const deployments: DeploymentFilePlan[] = [];
  const pureExistingResources = new Set<string>();
  const existingResourceToAuthoredResourceGroup = new Map<string, string | undefined>();
  const existingResourcesWithExplicitScope = new Set<string>();
  for (const [root, treeResources] of armResourcesByRoot) {
    const resource = stackAst.resources.get(root)!;
    const rootContext = authoredContexts.get(root)!;
    const authoredResourceGroup = rootContext.authoredParent;
    const moduleScope =
      rootContext.scopeOrigin === "pass-through-explicit"
        ? authoredResourceGroup === undefined
          ? undefined
          : { kind: "identifier" as const, id: authoredResourceGroup }
        : getResourceBody(resource.value).value.scope;
    if (
      resource.type === ResourceGroup.resourceType ||
      (stackAst.targetScope === "subscription" && moduleScope === undefined)
    ) {
      for (const name of treeResources) entryPlan.resources.add(name);
    } else if ([...treeResources].every((name) => stackAst.resources.get(name)!.existing)) {
      for (const name of treeResources) {
        pureExistingResources.add(name);
        existingResourceToAuthoredResourceGroup.set(name, authoredResourceGroup);
        for (
          let ancestor: string | undefined = name;
          ancestor !== undefined && ancestor !== authoredResourceGroup;
          ancestor = authoredContexts.get(ancestor)!.authoredParent
        ) {
          const origin = authoredContexts.get(ancestor)!.scopeOrigin;
          if (origin === "existing-explicit" || origin === "pass-through-explicit") {
            existingResourcesWithExplicitScope.add(name);
            break;
          }
        }
      }
    } else {
      deployments.push({
        boundary: root,
        resources: treeResources,
        authoredResourceGroup,
        moduleScope,
        targetScope:
          rootContext.scopeOrigin === "resourceGroup" ||
          (rootContext.scopeOrigin === "pass-through-explicit" &&
            authoredResourceGroup !== undefined)
            ? "resourceGroup"
            : getTargetScope(moduleScope, stackAst.targetScope),
      });
    }
  }
  return {
    entryPlan,
    deployments,
    pureExistingResources,
    existingResourceToAuthoredResourceGroup,
    existingResourcesWithExplicitScope,
  };
}
