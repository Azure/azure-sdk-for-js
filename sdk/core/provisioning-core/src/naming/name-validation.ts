// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shared resource-name checks for authoring and automatic naming.
 *
 * Literal names are checked against TypeSpec-defined length bounds and a regular
 * expression. Deployment-time expressions are preserved without inspection:
 * their final value is not available during authoring, and partial validation
 * cannot establish whether the deployed name will be valid.
 *
 * These checks neither rewrite explicit names nor check Azure name availability.
 */

import { isExpressionNode } from "../expression/ast-nodes.js";
import { isExpression, unwrapExpression } from "../expression/expressions.js";
import { DEFAULT_NAMING_RULES, type ResourceNamingRules } from "./naming-rules.js";

export interface ResourceNameValidationOptions {
  readonly generated?: boolean;
}

/**
 * Checks a literal string name against the unified resource rules.
 *
 * The pattern retains its JavaScript matching semantics, including missing
 * anchors, and the pattern and length bounds must pass. Terminal resource
 * constraints apply only to the final slash-separated segment. ARM name
 * structure is left to Bicep and Azure Resource Manager.
 *
 * Safe integer identifiers and deployment-time expressions are preserved without
 * applying string constraints.
 *
 * @returns Literal-name violations; empty for an accepted value.
 * @throws If naming metadata has invalid length bounds, or if
 * a pattern cannot be compiled as a JavaScript regex.
 */
function getResourceNameIssues(value: unknown, rules: ResourceNamingRules): readonly string[] {
  for (const bound of [rules.minLength, rules.maxLength]) {
    if (bound !== undefined && (!Number.isSafeInteger(bound) || bound < 0)) {
      throw new Error("Resource naming length bounds must be non-negative safe integers.");
    }
  }
  if (
    rules.minLength !== undefined &&
    rules.maxLength !== undefined &&
    rules.minLength > rules.maxLength
  ) {
    throw new Error("Resource naming minimum length exceeds its maximum length.");
  }
  const node = isExpression(value) ? unwrapExpression(value) : value;
  if (isExpressionNode(node)) return [];
  if (typeof value === "number" && Number.isSafeInteger(value)) {
    return [];
  }
  if (typeof value !== "string") {
    return ["Name must be a string, a safe integer, or an expression."];
  }

  const literal = value.split("/").at(-1)!;
  const issues: string[] = [];
  if (rules.minLength !== undefined && literal.length < rules.minLength) {
    issues.push(
      `Name must contain at least ${rules.minLength} characters (received ${literal.length}).`,
    );
  }
  if (rules.maxLength !== undefined && literal.length > rules.maxLength) {
    issues.push(
      `Name must contain at most ${rules.maxLength} characters (received ${literal.length}).`,
    );
  }
  const pattern = rules.pattern;
  if (pattern !== undefined && !new RegExp(pattern.regex).test(literal)) {
    issues.push(pattern.message ?? `Name must match ${pattern.regex}.`);
  }
  return issues;
}

/**
 * Applies throwing validation at resource construction, name assignment,
 * restoration, and naming-policy output boundaries.
 *
 * The resource type identifies the failing declaration in the error. When
 * rules are absent, the default convention only checks the input shape.
 *
 * @throws For invalid literal names or invalid metadata.
 */
export function assertValidResourceName(
  value: unknown,
  type: string,
  rules: ResourceNamingRules | undefined,
  options: ResourceNameValidationOptions = {},
): void {
  const issues = getResourceNameIssues(value, rules ?? DEFAULT_NAMING_RULES);
  const generated = options.generated ?? false;
  if (issues.length > 0) {
    throw new Error(
      `${generated ? "Cannot generate a compliant name" : "Invalid name"} for '${type}': ` +
        `${issues.join(" ")}${generated ? " Provide an explicit name or a compatible naming policy." : ""}`,
    );
  }
}
