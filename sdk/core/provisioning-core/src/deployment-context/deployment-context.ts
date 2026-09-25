// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExpressionOrValue } from "../expression/expressions.js";
import type { NamingPolicy } from "../naming/naming-policy.js";

/**
 * Inherited environment that flows down the component tree.
 *
 * @remarks
 * Each node may attach a local contribution via `ProvisioningComponent._localDeploymentContext`
 * (today, only `Stack` and `ResourceGroup` do). When a `Resource` reads the
 * effective context, the framework walks ancestors and resolves each field:
 *
 * - `location`: nearest ancestor with a value wins.
 * - `namingPolicy`: nearest ancestor with a value wins.
 * - `tags`: flat-merged across **all** ancestors; innermost wins on key conflict.
 *
 * Per-resource Bicep `scope:` is not part of this — a resource's deployment
 * scope is determined by which file or module it lands in, which in turn is
 * determined by the ProvisioningComponent tree (the nearest `ResourceGroup`/`Stack` ancestor).
 *
 * The same interface describes both a node's local contribution and the
 * fully-resolved view returned by `ProvisioningComponent.deploymentContext`.
 */
export interface DeploymentContext {
  readonly location?: ExpressionOrValue<string> | undefined;
  readonly tags?: Record<string, ExpressionOrValue<string>> | undefined;
  readonly namingPolicy?: NamingPolicy | undefined;
}
