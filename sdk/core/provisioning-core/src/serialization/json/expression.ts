// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  accessExpressionNode,
  arrayAccessExpressionNode,
  functionCallExpressionNode,
  identifierExpressionNode,
  instanceFunctionCallExpressionNode,
  isExpressionNode,
  propertyAccessExpressionNode,
  type ArrayAccessIndex,
  type ArrayAccessExpressionNode,
  type BinaryExpressionNode,
  type ExpressionNode as CoreExpressionNode,
  type IdentifierExpressionNode,
  type PropertyAccessExpressionNode,
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
import {
  type LoopedResource,
  type Resource,
  type ResourceDeclaration,
} from "../../constructs/resource/resource.js";
import type {
  ArrayValue,
  BinaryOperationExpression,
  ExpressionNode,
  FunctionCallExpression,
  ObjectValue,
  TernaryOperationExpression,
  UnaryOperationExpression,
} from "../contract/index.js";
import type { ParameterMetadata } from "../../constructs/parameter.js";
import type { VariableMetadata } from "../../constructs/variable.js";

export type SerializableValue =
  | CoreExpressionNode
  | Expression<unknown>
  | string
  | number
  | boolean
  | null
  | readonly SerializableValue[]
  | {
      readonly [key: string]: SerializableValue | undefined;
    };

export type SerializationSymbolMap = Map<
  ResourceDeclaration | CoreExpressionNode | ParameterMetadata | VariableMetadata,
  string
>;

type SymbolValue = Expression<unknown> | Resource | LoopedResource<Resource>;
export type DeserializationSymbolMap = Map<string, SymbolValue>;

// ---------------------------------------------------------------------------
// ARM property-access lowering
// ---------------------------------------------------------------------------

/**
 * Expands armPath stamps along a core property-access chain, replacing each
 * stamped property with its ARM path relative to the lowered base. Empty
 * paths fall back to the original property name. Generated accesses carry
 * no stamps; unchanged nodes retain their identity.
 *
 * Recursion stops at non-property-access nodes and leaves their children
 * untouched. serializeExpression traverses those children and invokes this
 * helper as it reaches them; this is not a whole-expression lowering pass.
 */
export function lowerArmPropertyAccessChain(node: CoreExpressionNode): CoreExpressionNode {
  if (node.kind !== "property-access") return node;

  const loweredBase = lowerArmPropertyAccessChain(node.base);
  if (node.armPath !== undefined) {
    const path = node.armPath.length > 0 ? node.armPath : [node.property];
    let current: CoreExpressionNode = loweredBase;
    for (const segment of path) {
      // A flattened optional property may be absent at any wire-path segment.
      current = accessExpressionNode(current, segment, {
        nullish: node.nullish,
      });
    }
    return current;
  }
  if (loweredBase === node.base) return node;
  return { ...node, base: loweredBase };
}

// ---------------------------------------------------------------------------
// Expression serialization: CDK value -> AST
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

function serializeSymbolicPath(path: string): ExpressionNode {
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

function serializePlainObject(
  value: { readonly [key: string]: SerializableValue | undefined },
  symbolMap: SerializationSymbolMap,
): ObjectValue {
  return {
    kind: "object",
    value: serializeDefinedObjectEntries(value, symbolMap),
  };
}

export function serializeDefinedObjectEntries(
  value: { readonly [key: string]: SerializableValue | undefined },
  symbolMap: SerializationSymbolMap,
): Record<string, ExpressionNode> {
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, propertyValue]) =>
      propertyValue === undefined ? [] : [[key, serializeExpression(propertyValue, symbolMap)]],
    ),
  );
}

function serializeArray(
  value: readonly SerializableValue[],
  symbolMap: SerializationSymbolMap,
): ArrayValue {
  return {
    kind: "array",
    items: value.map((item) => serializeExpression(item, symbolMap)),
  };
}

function isSerializableObject(
  value: SerializableValue,
): value is { readonly [key: string]: SerializableValue | undefined } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function serializeIdentifierExpression(
  value: IdentifierExpressionNode,
  symbolMap: SerializationSymbolMap,
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

function serializeMemberAccessExpression(
  value: PropertyAccessExpressionNode | ArrayAccessExpressionNode,
  symbolMap: SerializationSymbolMap,
): ExpressionNode {
  const base = serializeExpression(value.base, symbolMap);

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
    index: serializeExpression(value.index as SerializableValue, symbolMap),
    nullish: value.nullish,
    fromEnd: value.fromEnd,
  };
}

export function serializeExpression(
  value: SerializableValue,
  symbolMap: SerializationSymbolMap = new Map(),
): ExpressionNode {
  if (isExpression(value)) {
    return serializeExpression(unwrapExpression(value) as SerializableValue, symbolMap);
  }

  // Lower the current property-access chain. Recursive serialization below
  // visits other child expressions, lowering their property chains in turn.
  if (value !== null && typeof value === "object" && isExpressionNode(value)) {
    const lowered = lowerArmPropertyAccessChain(value as CoreExpressionNode);
    if (lowered !== value) {
      return serializeExpression(lowered as SerializableValue, symbolMap);
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
    return serializeArray(value, symbolMap);
  }

  if (isExpressionNode(value)) {
    switch (value.kind) {
      case "binary":
        return {
          kind: "binary-operation",
          operator: value.operator,
          left: serializeExpression(value.left as SerializableValue, symbolMap),
          right: serializeExpression(value.right as SerializableValue, symbolMap),
        };

      case "unary":
        return {
          kind: "unary-operation",
          operator: value.operator,
          argument: serializeExpression(value.argument as SerializableValue, symbolMap),
        };

      case "ternary":
        return {
          kind: "ternary-operation",
          condition: serializeExpression(value.condition as SerializableValue, symbolMap),
          trueValue: serializeExpression(value.trueValue as SerializableValue, symbolMap),
          falseValue: serializeExpression(value.falseValue as SerializableValue, symbolMap),
        };

      case "fn-call":
        return {
          kind: "function-call",
          target: value.operator,
          args: value.args.map((argument) =>
            serializeExpression(argument as SerializableValue, symbolMap),
          ),
        };

      case "instance-function-call":
        return {
          kind: "instance-function-call",
          base: serializeExpression(value.base as SerializableValue, symbolMap),
          name: value.name,
          args: value.args.map((argument) =>
            serializeExpression(argument as SerializableValue, symbolMap),
          ),
        };

      case "interpolated-string":
        return {
          kind: "interpolated-string",
          segments: value.segments.map((segment) =>
            serializeExpression(segment as SerializableValue, symbolMap),
          ),
        };

      case "identifier":
        return serializeIdentifierExpression(value, symbolMap);

      case "property-access":
      case "array-access":
        return serializeMemberAccessExpression(value, symbolMap);

      case "symbolic-value": {
        const identifier = symbolMap.get(value);
        return identifier === undefined
          ? serializeSymbolicPath(value.path)
          : { kind: "identifier", id: identifier };
      }
    }
  }

  if (isSerializableObject(value)) {
    return serializePlainObject(value, symbolMap);
  }

  throw new Error(`Unsupported serialization input.`);
}

// ---------------------------------------------------------------------------
// Resource-reference validation
// ---------------------------------------------------------------------------

export function requireResourceHandle(
  targetIdentifier: string,
  symbols: DeserializationSymbolMap,
  resourceIdentifier: string,
  field: "parent" | "scope" | "dependsOn",
): Resource | LoopedResource<Resource> {
  const handle = symbols.get(targetIdentifier);
  if (handle === undefined) {
    throw new Error(
      `Resource "${resourceIdentifier}" references unknown resource ` +
        `"${targetIdentifier}" in "${field}".`,
    );
  }
  if (!isResource(handle) && !isLoopedResource(handle)) {
    throw new Error(
      `Resource "${resourceIdentifier}" references non-resource symbol ` +
        `"${targetIdentifier}" in "${field}".`,
    );
  }
  return handle;
}

export function deserializeDependsOnExpression(
  node: ExpressionNode,
  symbols: DeserializationSymbolMap,
  resourceIdentifier: string,
): readonly ResourceDeclaration[] {
  if (node.kind !== "array") {
    throw new Error(
      `Resource "${resourceIdentifier}" has an invalid "dependsOn" value; expected an array.`,
    );
  }

  return node.items.map((item) => {
    if (item.kind !== "identifier") {
      throw new Error(
        `Resource "${resourceIdentifier}" has an invalid "dependsOn" reference; expected a resource identifier.`,
      );
    }
    return requireResourceHandle(item.id, symbols, resourceIdentifier, "dependsOn");
  });
}

// ---------------------------------------------------------------------------
// Expression deserialization: AST -> CDK value
// ---------------------------------------------------------------------------

export function deserializeExpression(
  node: ExpressionNode,
  symbols: DeserializationSymbolMap,
): unknown {
  // TODO(#330): Legacy `contextual-variable` shim. The JS side no longer
  // produces this kind (it emits the composed `property-access` over a
  // zero-arg `function-call` form), but the .NET `ModelReaderWriter`
  // still emits it on re-serialization. Accept it on input by lowering
  // to the composed form, then fall through. Delete this whole block
  // (and any cast it requires) once .NET stops emitting it.
  const legacyKind = (node as { kind: string }).kind;
  if (legacyKind === "contextual-variable") {
    const legacy = node as unknown as {
      kind: "contextual-variable";
      context: string;
      property: string;
    };
    return wrapExpression(
      propertyAccessExpressionNode(functionCallExpressionNode(legacy.context, []), legacy.property),
    );
  }

  switch (node.kind) {
    case "string":
      return node.value;
    case "integer":
      return parseInt(node.value, 10);
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
          node.args.map((a) => deserializeExpression(a, symbols)),
        ),
      );

    case "instance-function-call": {
      const base = deserializeExpression(node.base, symbols);
      const baseNode = isExpression(base)
        ? unwrapExpression(base as Expression<unknown>)
        : identifierExpressionNode(isResource(base) ? base : String(base));
      return wrapExpression(
        instanceFunctionCallExpressionNode(
          baseNode,
          node.name,
          node.args.map((a) => deserializeExpression(a, symbols)),
        ),
      );
    }

    case "property-access": {
      const base = deserializeExpression(node.base, symbols);
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
      const base = deserializeExpression(node.base, symbols);
      // Preserve non-literal indexes as expressions so `sym[<expr>]` round-
      // trips faithfully. Literal integer/string indexes lower to native
      // JS number/string values as before.
      let idx: ArrayAccessIndex;
      if (node.index.kind === "integer") {
        idx = parseInt(node.index.value, 10);
      } else if (node.index.kind === "string") {
        idx = node.index.value;
      } else {
        const deserializedIndex = deserializeExpression(node.index, symbols);
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
          value: deserializeExpression(value, symbols),
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }
      return obj;
    }

    case "array":
      return node.items.map((item) => deserializeExpression(item, symbols));

    case "binary-operation": {
      const operation = node as BinaryOperationExpression;
      return wrapExpression({
        kind: "binary",
        operator: operation.operator,
        left: deserializeExpression(operation.left, symbols),
        right: deserializeExpression(operation.right, symbols),
      } as BinaryExpressionNode as CoreExpressionNode);
    }

    case "unary-operation": {
      const operation = node as UnaryOperationExpression;
      return wrapExpression({
        kind: "unary",
        operator: operation.operator,
        argument: deserializeExpression(operation.argument, symbols),
      } as UnaryExpressionNode as CoreExpressionNode);
    }

    case "ternary-operation": {
      const operation = node as TernaryOperationExpression;
      return wrapExpression({
        kind: "ternary",
        condition: deserializeExpression(operation.condition, symbols),
        trueValue: deserializeExpression(operation.trueValue, symbols),
        falseValue: deserializeExpression(operation.falseValue, symbols),
      } as TernaryExpressionNode as CoreExpressionNode);
    }

    case "interpolated-string": {
      return wrapExpression({
        kind: "interpolated-string",
        segments: node.segments.map((segment) => deserializeExpression(segment, symbols)),
      } as CoreExpressionNode);
    }

    default:
      throw new Error(`Unsupported expression node kind: ${node.kind}`);
  }
}
