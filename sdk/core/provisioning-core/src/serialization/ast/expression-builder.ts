// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  accessExpressionNode,
  isExpressionNode,
  type ArrayAccessExpressionNode,
  type ExpressionNode as CoreExpressionNode,
  type IdentifierExpressionNode,
  type PropertyAccessExpressionNode,
} from "../../expression/ast-nodes.js";
import { isExpression, unwrapExpression, type Expression } from "../../expression/expressions.js";
import type { DeclarationSymbolMap } from "../symbol-map.js";
import type { ArrayValue, ExpressionNode, FunctionCallExpression, ObjectValue } from "./index.js";

export type ExpressionNodeInput =
  | CoreExpressionNode
  | Expression<unknown>
  | string
  | number
  | boolean
  | null
  | readonly ExpressionNodeInput[]
  | {
      readonly [key: string]: ExpressionNodeInput | undefined;
    };

// ---------------------------------------------------------------------------
// ARM property path expansion
// ---------------------------------------------------------------------------

/**
 * Expands armPath stamps along a core property-access chain, replacing each
 * stamped property with its ARM path relative to the expanded base. Empty
 * paths fall back to the original property name. Generated accesses carry
 * no stamps; unchanged nodes retain their identity.
 *
 * Recursion stops at non-property-access nodes and leaves their children
 * untouched. buildExpression traverses those children and invokes this
 * helper as it reaches them.
 */
function expandArmPropertyPaths(node: CoreExpressionNode): CoreExpressionNode {
  if (node.kind !== "property-access") return node;

  const expandedBase = expandArmPropertyPaths(node.base);
  if (node.armPath !== undefined) {
    const path = node.armPath.length > 0 ? node.armPath : [node.property];
    let current: CoreExpressionNode = expandedBase;
    for (const segment of path) {
      // A flattened optional property may be absent at any wire-path segment.
      current = accessExpressionNode(current, segment, {
        nullish: node.nullish,
      });
    }
    return current;
  }
  if (expandedBase === node.base) return node;
  return { ...node, base: expandedBase };
}

// ---------------------------------------------------------------------------
// Expression building: CDK value -> AST
// ---------------------------------------------------------------------------

function splitSymbolicPath(path: string): string[] {
  const parts: string[] = [];
  let current = "";
  let depth = 0;

  for (const character of path) {
    if (character === "." && depth === 0) {
      if (current.length > 0) {
        parts.push(current);
        current = "";
      }
      continue;
    }

    if (character === "(") {
      depth += 1;
    } else if (character === ")") {
      depth -= 1;
    }

    current += character;
  }

  if (current.length > 0) {
    parts.push(current);
  }

  return parts;
}

function buildSymbolicPath(path: string): ExpressionNode {
  const parts = splitSymbolicPath(path);
  let current: ExpressionNode | undefined;

  for (const part of parts) {
    if (part.endsWith("()")) {
      const target = part.slice(0, -2);
      const callNode: FunctionCallExpression = {
        kind: "function-call",
        target,
        args: [],
      };

      current =
        current === undefined
          ? callNode
          : {
              kind: "instance-function-call",
              base: current,
              name: target,
              args: [],
            };
      continue;
    }

    current =
      current === undefined
        ? {
            kind: "identifier",
            id: part,
          }
        : {
            kind: "property-access",
            base: current,
            property: part,
            nullish: false,
          };
  }

  if (current === undefined) {
    throw new Error(`Cannot serialize empty symbolic path.`);
  }

  return current;
}

function buildPlainObject(
  value: { readonly [key: string]: ExpressionNodeInput | undefined },
  symbolMap: DeclarationSymbolMap,
): ObjectValue {
  return {
    kind: "object",
    value: buildExpressionProperties(value, symbolMap),
  };
}

/** Builds a property map of expression nodes, omitting undefined values. */
export function buildExpressionProperties(
  value: { readonly [key: string]: ExpressionNodeInput | undefined },
  symbolMap: DeclarationSymbolMap,
): Record<string, ExpressionNode> {
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, propertyValue]) =>
      propertyValue === undefined ? [] : [[key, buildExpression(propertyValue, symbolMap)]],
    ),
  );
}

function buildArray(
  value: readonly ExpressionNodeInput[],
  symbolMap: DeclarationSymbolMap,
): ArrayValue {
  return {
    kind: "array",
    items: value.map((item) => buildExpression(item, symbolMap)),
  };
}

function isSerializableObject(
  value: ExpressionNodeInput,
): value is { readonly [key: string]: ExpressionNodeInput | undefined } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function buildIdentifierExpression(
  value: IdentifierExpressionNode,
  symbolMap: DeclarationSymbolMap,
): ExpressionNode {
  if (typeof value.id === "string") {
    return {
      kind: "identifier",
      id: value.id,
    };
  }

  const identifier = symbolMap.get(value.id);

  if (identifier === undefined) {
    throw new Error(`Missing synthesized symbol for referenced resource type ${value.id.type}.`);
  }

  return {
    kind: "identifier",
    id: identifier,
  };
}

function isBicepIdentifierSegment(segment: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/u.test(segment);
}

function buildMemberAccessExpression(
  value: PropertyAccessExpressionNode | ArrayAccessExpressionNode,
  symbolMap: DeclarationSymbolMap,
): ExpressionNode {
  const base = buildExpression(value.base, symbolMap);

  if (value.kind === "property-access") {
    return {
      kind: "property-access",
      base,
      property: value.property,
      nullish: value.nullish,
    };
  }

  if (typeof value.index === "number") {
    return {
      kind: "array-access",
      base,
      index: {
        kind: "integer",
        value: String(value.index),
      },
      nullish: value.nullish,
      fromEnd: value.fromEnd,
    };
  }

  if (typeof value.index === "string") {
    if (value.fromEnd) {
      throw new Error("Reverse indexing requires an integer index, not a string.");
    }
    return isBicepIdentifierSegment(value.index)
      ? {
          kind: "property-access",
          base,
          property: value.index,
          nullish: value.nullish,
        }
      : {
          kind: "array-access",
          base,
          index: {
            kind: "string",
            value: value.index,
          },
          nullish: value.nullish,
          fromEnd: value.fromEnd,
        };
  }

  // Expression-shaped index (e.g. a loop's `.index` symbolic value or any
  // `Expression<number>` proxy). Recursively serialize into the wire
  // array-access's `index` slot.
  return {
    kind: "array-access",
    base,
    index: buildExpression(value.index as ExpressionNodeInput, symbolMap),
    nullish: value.nullish,
    fromEnd: value.fromEnd,
  };
}

export function moduleOutputExpression(moduleName: string, outputName: string): ExpressionNode {
  return {
    kind: "property-access",
    base: {
      kind: "property-access",
      base: { kind: "identifier", id: moduleName },
      property: "outputs",
      nullish: false,
    },
    property: outputName,
    nullish: false,
  };
}

export function buildExpression(
  value: ExpressionNodeInput,
  symbolMap: DeclarationSymbolMap = new Map(),
): ExpressionNode {
  if (isExpression(value)) {
    return buildExpression(unwrapExpression(value) as ExpressionNodeInput, symbolMap);
  }

  // Expand the current property paths; recursion below visits other expressions.
  if (value !== null && typeof value === "object" && isExpressionNode(value)) {
    const expanded = expandArmPropertyPaths(value as CoreExpressionNode);
    if (expanded !== value) {
      return buildExpression(expanded as ExpressionNodeInput, symbolMap);
    }
  }

  if (typeof value === "string") {
    return {
      kind: "string",
      value,
    };
  }

  if (typeof value === "number") {
    if (!Number.isInteger(value)) {
      throw new Error(`Bicep serialization currently only supports integer numbers.`);
    }
    if (!Number.isSafeInteger(value)) {
      throw new Error(`Bicep serialization currently only supports safe integer numbers.`);
    }

    return {
      kind: "integer",
      value: String(value),
    };
  }

  if (typeof value === "boolean") {
    return {
      kind: "boolean",
      value,
    };
  }

  if (value === null) {
    return {
      kind: "null",
      value: null,
    };
  }

  if (Array.isArray(value)) {
    return buildArray(value, symbolMap);
  }

  if (isExpressionNode(value)) {
    switch (value.kind) {
      case "binary":
        return {
          kind: "binary-operation",
          operator: value.operator,
          left: buildExpression(value.left as ExpressionNodeInput, symbolMap),
          right: buildExpression(value.right as ExpressionNodeInput, symbolMap),
        };

      case "unary":
        return {
          kind: "unary-operation",
          operator: value.operator,
          argument: buildExpression(value.argument as ExpressionNodeInput, symbolMap),
        };

      case "ternary":
        return {
          kind: "ternary-operation",
          condition: buildExpression(value.condition as ExpressionNodeInput, symbolMap),
          trueValue: buildExpression(value.trueValue as ExpressionNodeInput, symbolMap),
          falseValue: buildExpression(value.falseValue as ExpressionNodeInput, symbolMap),
        };

      case "fn-call":
        return {
          kind: "function-call",
          target: value.operator,
          args: value.args.map((argument) =>
            buildExpression(argument as ExpressionNodeInput, symbolMap),
          ),
        };

      case "instance-function-call":
        return {
          kind: "instance-function-call",
          base: buildExpression(value.base as ExpressionNodeInput, symbolMap),
          name: value.name,
          args: value.args.map((argument) =>
            buildExpression(argument as ExpressionNodeInput, symbolMap),
          ),
        };

      case "interpolated-string":
        return {
          kind: "interpolated-string",
          segments: value.segments.map((segment) =>
            buildExpression(segment as ExpressionNodeInput, symbolMap),
          ),
        };

      case "identifier":
        return buildIdentifierExpression(value, symbolMap);

      case "property-access":
      case "array-access":
        return buildMemberAccessExpression(value, symbolMap);

      case "symbolic-value": {
        const identifier = symbolMap.get(value);
        return identifier === undefined
          ? buildSymbolicPath(value.path)
          : { kind: "identifier", id: identifier };
      }
    }
  }

  if (isSerializableObject(value)) {
    return buildPlainObject(value, symbolMap);
  }

  throw new Error(`Unsupported serialization input.`);
}
