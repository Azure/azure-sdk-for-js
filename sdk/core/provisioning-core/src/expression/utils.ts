// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExpressionNode, TargetScope } from "../serialization/ast/index.js";
import type { ExpressionNode as CoreExpressionNode } from "./ast-nodes.js";

/** Identifies the standard scope functions without evaluating their arguments. */
export function getScopeFunctionTarget(
  scope: ExpressionNode | CoreExpressionNode | undefined,
): TargetScope | undefined {
  const target =
    scope?.kind === "function-call"
      ? scope.target
      : scope?.kind === "fn-call"
        ? scope.operator
        : undefined;
  if (typeof target !== "string") return undefined;
  switch (target.replace(/^az\./u, "")) {
    case "tenant":
      return "tenant";
    case "managementGroup":
      return "managementGroup";
    case "subscription":
      return "subscription";
    case "resourceGroup":
      return "resourceGroup";
    default:
      return undefined;
  }
}
