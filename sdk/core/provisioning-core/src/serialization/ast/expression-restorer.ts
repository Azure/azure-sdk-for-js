// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  arrayAccessExpressionNode,
  functionCallExpressionNode,
  identifierExpressionNode,
  instanceFunctionCallExpressionNode,
  propertyAccessExpressionNode,
  type ArrayAccessIndex,
  type BinaryExpressionNode,
  type ExpressionNode as CoreExpressionNode,
  type TernaryExpressionNode,
  type UnaryExpressionNode,
} from "../../expression/ast-nodes.js";
import {
  isExpression,
  unwrapExpression,
  wrapExpression,
  type Expression,
} from "../../expression/expressions.js";
import { isResource, isLoopedResource } from "../../constructs/resource/resource-utils.js";
import type { LoopedResource, Resource } from "../../constructs/resource/resource.js";
import type {
  BinaryOperationExpression,
  ExpressionNode,
  TernaryOperationExpression,
  UnaryOperationExpression,
} from "./index.js";

type SymbolValue = Expression<unknown> | Resource | LoopedResource<Resource>;
export type DeclarationReferenceMap = Map<string, SymbolValue>;

// ---------------------------------------------------------------------------
// Expression restoration: AST -> CDK value
// ---------------------------------------------------------------------------

export function restoreExpression(node: ExpressionNode, symbols: DeclarationReferenceMap): unknown {
  switch (node.kind) {
    case "string":
      return node.value;
    case "integer": {
      const value = parseInt(node.value, 10);
      if (!Number.isSafeInteger(value)) {
        throw new Error(`Cannot deserialize unsafe integer literal "${node.value}".`);
      }
      return value;
    }
    case "boolean":
      return node.value;
    case "null":
      return null;

    case "identifier": {
      const sym = symbols.get(node.id);
      if (sym !== undefined) return sym;
      return wrapExpression(identifierExpressionNode(node.id));
    }

    case "function-call":
      if (typeof node.target !== "string") {
        throw new Error("Cannot deserialize function call with an expression target.");
      }
      return wrapExpression(
        functionCallExpressionNode(
          node.target,
          node.args.map((a) => restoreExpression(a, symbols)),
        ),
      );

    case "instance-function-call": {
      const base = restoreExpression(node.base, symbols);
      const baseNode = isExpression(base)
        ? unwrapExpression(base as Expression<unknown>)
        : identifierExpressionNode(isResource(base) ? base : String(base));
      return wrapExpression(
        instanceFunctionCallExpressionNode(
          baseNode,
          node.name,
          node.args.map((a) => restoreExpression(a, symbols)),
        ),
      );
    }

    case "property-access": {
      const base = restoreExpression(node.base, symbols);
      if (isResource(base)) {
        if (node.nullish) {
          return wrapExpression(
            propertyAccessExpressionNode(identifierExpressionNode(base), node.property, {
              nullish: node.nullish,
            }),
          );
        }
        return (base as unknown as Record<string, unknown>)[node.property];
      }
      if (isExpression(base)) {
        const inner = unwrapExpression(base as Expression<unknown>);
        return wrapExpression(
          propertyAccessExpressionNode(inner, node.property, {
            nullish: node.nullish,
          }),
        );
      }
      return wrapExpression(
        propertyAccessExpressionNode(identifierExpressionNode(String(base)), node.property, {
          nullish: node.nullish,
        }),
      );
    }

    case "array-access": {
      const base = restoreExpression(node.base, symbols);
      // Preserve non-literal indexes as expressions so `sym[<expr>]` round-
      // trips faithfully. Literal integer/string indexes lower to native
      // JS number/string values as before.
      let idx: ArrayAccessIndex;
      if (node.index.kind === "integer") {
        idx = parseInt(node.index.value, 10);
      } else if (node.index.kind === "string") {
        idx = node.index.value;
      } else {
        const deserializedIndex = restoreExpression(node.index, symbols);
        idx = isExpression(deserializedIndex)
          ? unwrapExpression(deserializedIndex as Expression<unknown>)
          : (deserializedIndex as ArrayAccessIndex);
      }
      if (isResource(base)) {
        if (node.nullish || node.fromEnd) {
          return wrapExpression(
            arrayAccessExpressionNode(identifierExpressionNode(base), idx, {
              nullish: node.nullish,
              fromEnd: node.fromEnd,
            }),
          );
        }
        return (base as unknown as Record<string, unknown>)[String(idx)];
      }
      if (isLoopedResource(base)) {
        // `sym[idx]` on a looped declaration. Carry the handle itself as the
        // identifier id (not `String(base)`, which would stringify to
        // "[object Object]") so re-serialize maps it back to the resource's
        // symbol. The resulting expression proxy lets an outer `.prop` chain
        // (e.g. `looped.at(0).id`) render as `sym[idx].prop`.
        return wrapExpression(
          arrayAccessExpressionNode(identifierExpressionNode(base as unknown as Resource), idx, {
            nullish: node.nullish,
            fromEnd: node.fromEnd,
          }),
        );
      }
      if (isExpression(base)) {
        const inner = unwrapExpression(base as Expression<unknown>);
        return wrapExpression(
          arrayAccessExpressionNode(inner, idx, {
            nullish: node.nullish,
            fromEnd: node.fromEnd,
          }),
        );
      }
      return wrapExpression(
        arrayAccessExpressionNode(identifierExpressionNode(String(base)), idx, {
          nullish: node.nullish,
          fromEnd: node.fromEnd,
        }),
      );
    }

    case "object": {
      const obj: Record<string, unknown> = Object.create(null);
      for (const [key, value] of Object.entries(node.value)) {
        Object.defineProperty(obj, key, {
          value: restoreExpression(value, symbols),
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }
      return obj;
    }

    case "array":
      return node.items.map((item) => restoreExpression(item, symbols));

    case "binary-operation": {
      const operation = node as BinaryOperationExpression;
      return wrapExpression({
        kind: "binary",
        operator: operation.operator,
        left: restoreExpression(operation.left, symbols),
        right: restoreExpression(operation.right, symbols),
      } as BinaryExpressionNode as CoreExpressionNode);
    }

    case "unary-operation": {
      const operation = node as UnaryOperationExpression;
      return wrapExpression({
        kind: "unary",
        operator: operation.operator,
        argument: restoreExpression(operation.argument, symbols),
      } as UnaryExpressionNode as CoreExpressionNode);
    }

    case "ternary-operation": {
      const operation = node as TernaryOperationExpression;
      return wrapExpression({
        kind: "ternary",
        condition: restoreExpression(operation.condition, symbols),
        trueValue: restoreExpression(operation.trueValue, symbols),
        falseValue: restoreExpression(operation.falseValue, symbols),
      } as TernaryExpressionNode as CoreExpressionNode);
    }

    case "interpolated-string": {
      return wrapExpression({
        kind: "interpolated-string",
        segments: node.segments.map((segment) => restoreExpression(segment, symbols)),
      } as CoreExpressionNode);
    }

    default:
      throw new Error(`Unsupported expression node kind: ${node.kind}`);
  }
}
