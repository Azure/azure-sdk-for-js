// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ParameterMetadata } from "../../constructs/parameter.js";
import type { VariableMetadata } from "../../constructs/variable.js";
import type { OutputMetadata } from "../../constructs/output.js";
import type { Stack } from "../../constructs/stack.js";
import type { Resource, ResourceDeclaration } from "../../constructs/resource/resource.js";
import {
  STATE_PARENT_INDEX,
  unwrapResourceHandle,
} from "../../constructs/resource/resource-proxy.js";
import { definedProps } from "../../util.js";
import { getShape } from "../../shape/shape-registry.js";
import { isExpression } from "../../expression/expressions.js";
import { isExpressionNode } from "../../expression/ast-nodes.js";
import { isResource, isLoopedResource } from "../../constructs/resource/resource-utils.js";
import type {
  DeclarableBodyNode,
  DecoratorsNode,
  ExpressionNode,
  InfraNode,
  OutputDeclarationNode,
  ParameterDeclarationNode,
  ResourceDeclarationNode,
  VariableDeclarationNode,
} from "./index.js";
import type { DeclarationSymbolMap } from "../symbol-map.js";
import {
  getArmParent,
  getResourceGroupAncestor,
  getResourceScope,
} from "../../constructs/resource/resource-relationships.js";
import { convertToArmObject } from "../arm-object-conversion.js";
import {
  buildExpressionProperties,
  buildExpression,
  type ExpressionNodeInput,
} from "./expression-builder.js";

const RESOURCE_RESERVED_KEYS = new Set<string>([
  "apiVersion",
  "existing",
  "id",
  "name",
  "scope",
  "type",
  "condition",
  "dependsOn",
  STATE_PARENT_INDEX,
]);

function hasNestedResourceHandle(value: unknown): boolean {
  if (isExpression(value) || isExpressionNode(value)) {
    return false;
  }

  if (isResource(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasNestedResourceHandle(item));
  }

  if (typeof value === "object" && value !== null) {
    return Object.values(value).some((item) => hasNestedResourceHandle(item));
  }

  return false;
}

function buildResourceProperties(
  resource: ResourceDeclaration,
  symbolMap: DeclarationSymbolMap,
): Record<string, ExpressionNode> {
  const rawResource = unwrapResourceHandle(resource as unknown as Resource);
  const properties: Record<string, ExpressionNode> = {
    name: buildExpression(rawResource.name, symbolMap),
  };

  const armParent = getArmParent(resource);
  if (armParent !== undefined) {
    const parentId = symbolMap.get(armParent);

    if (parentId === undefined) {
      throw new Error(`Missing parent symbol for resource type ${rawResource.type}.`);
    }

    const parentNode: ExpressionNode = { kind: "identifier", id: parentId };
    // Explicit parent index recorded by `Resource`'s constructor when a
    // child is created with `parent.at(i)` / `parent.current()` as its
    // context. When the child is created under a looped parent without an
    // explicit index (only reachable by unwrapping the raw handle out of a
    // `LoopedResource` — not part of the user-facing API), we emit
    // `parent: parentSym` unchanged; Bicep rejects the resulting
    // `parent: parents` (an array) at validation, producing a loud failure
    // instead of a silently-guessed index variable.
    const parentIndex = (rawResource as unknown as Record<string, unknown>)[STATE_PARENT_INDEX];

    if (parentIndex !== undefined) {
      properties.parent = {
        kind: "array-access",
        base: parentNode,
        index: buildExpression(parentIndex as ExpressionNodeInput, symbolMap),
        nullish: false,
        fromEnd: false,
      };
    } else {
      properties.parent = parentNode;
    }
  }

  // Existing resources may carry an explicit scope expression for cross-RG
  // / cross-sub / cross-MG / cross-tenant lookups. Read from state directly;
  // non-existing resources never have `scope` on state.
  const scopeValue = getResourceScope(resource);
  if (scopeValue !== undefined) {
    properties.scope = buildExpression(scopeValue, symbolMap);
  } else if (armParent === undefined) {
    const rgAncestor = getResourceGroupAncestor(resource);
    if (rgAncestor !== undefined) {
      const groupId = symbolMap.get(rgAncestor);
      if (groupId === undefined) {
        throw new Error("Resource group not found in symbol map.");
      }
      properties.scope = {
        kind: "identifier",
        id: groupId,
      };
    }
  }

  const dependsOn = (rawResource as unknown as Record<string, unknown>)["dependsOn"] as
    readonly ResourceDeclaration[] | undefined;
  if (dependsOn !== undefined) {
    properties.dependsOn = {
      kind: "array",
      items: dependsOn.map((dependency) => {
        const identifier = symbolMap.get(dependency);
        if (identifier === undefined) {
          throw new Error(
            "Dependency not found in symbol map. Ensure it belongs to the same stack.",
          );
        }
        return { kind: "identifier", id: identifier };
      }),
    };
  }

  // Build the per-resource custom property bag first, applying ARM-
  // shape lowering (rename/flatten/encode) when a shape is
  // registered for `(type, apiVersion)`. The registry resolves
  // discriminated variants from the instance state. No-op when no
  // shape is registered for this resource type.
  const descriptor =
    typeof rawResource.type === "string" && typeof rawResource.apiVersion === "string"
      ? getShape(
          rawResource.type,
          rawResource.apiVersion,
          rawResource as unknown as Record<string, unknown>,
        )
      : undefined;

  const userProps: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rawResource)) {
    if (rawResource.existing) continue;
    if (value === undefined || RESOURCE_RESERVED_KEYS.has(key) || hasNestedResourceHandle(value)) {
      continue;
    }
    userProps[key] = value;
  }

  const loweredUserProps = descriptor ? convertToArmObject(userProps, descriptor) : userProps;

  for (const key of Object.keys(loweredUserProps).sort()) {
    properties[key] = buildExpression(loweredUserProps[key] as ExpressionNodeInput, symbolMap);
  }

  return properties;
}

export function buildResourceDeclaration(
  resource: ResourceDeclaration,
  symbolMap: DeclarationSymbolMap,
): [string, ResourceDeclarationNode] {
  const resourceId = symbolMap.get(resource);

  if (resourceId === undefined) {
    throw new Error(`Missing synthesized symbol for resource type ${resource.type}.`);
  }

  const properties = buildResourceProperties(resource, symbolMap);
  const rawResource = unwrapResourceHandle(resource as unknown as Resource) as unknown as Record<
    string,
    unknown
  >;

  const condition =
    rawResource["condition"] !== undefined
      ? buildExpression(rawResource["condition"] as ExpressionNodeInput, symbolMap)
      : undefined;

  // Loop metadata lives on `LoopedResource.loop` — a public field on the
  // wrapper subclass. Scalar `Resource` instances don't have one.
  const loopCtx = isLoopedResource(resource) ? resource.loop : undefined;

  // Build decorators for the resource (currently only batchSize from forEach)
  const batchSize = loopCtx?.batchSize;
  const decorators = batchSize !== undefined ? { batchSize } : undefined;

  // Wrap `value` in `if-condition` / `for-expression` when the resource is
  // guarded / looped. Bicep source order is `for` outer, `if` inner —
  // `[for item in coll: if (cond) { ... }]` — so wrap if-condition first,
  // then for-expression around it.
  let wireValue: DeclarableBodyNode = { kind: "object", value: properties };
  if (condition !== undefined) {
    wireValue = { kind: "if-condition", condition, body: wireValue };
  }
  if (loopCtx !== undefined) {
    wireValue = {
      kind: "for-expression",
      itemVariable: loopCtx.itemVariable,
      ...(loopCtx.indexVariable !== undefined ? { indexVariable: loopCtx.indexVariable } : {}),
      collection: buildExpression(loopCtx.collection as ExpressionNodeInput, symbolMap),
      body: wireValue,
    };
  }

  const node: ResourceDeclarationNode = {
    bicepIdentifier: resourceId,
    type: resource.type,
    apiVersion: resource.apiVersion,
    existing: resource.existing ?? false,
    value: wireValue,
    ...(decorators !== undefined ? { decorators } : {}),
  };

  return [resourceId, node];
}

function buildDecorators(
  decl: ParameterMetadata | VariableMetadata | OutputMetadata,
  symbolMap: DeclarationSymbolMap,
): DecoratorsNode | undefined {
  const d: Record<string, unknown> = {};

  if (decl.description !== undefined) d.description = decl.description;
  if ("secure" in decl && decl.secure) d.secure = true;
  if ("minValue" in decl && decl.minValue !== undefined) {
    d.minValue = decl.minValue;
  }
  if ("maxValue" in decl && decl.maxValue !== undefined) {
    d.maxValue = decl.maxValue;
  }
  if ("minLength" in decl && decl.minLength !== undefined) {
    d.minLength = decl.minLength;
  }
  if ("maxLength" in decl && decl.maxLength !== undefined) {
    d.maxLength = decl.maxLength;
  }
  if ("metadata" in decl && decl.metadata !== undefined) {
    d.metadata = buildExpressionProperties(
      decl.metadata as {
        readonly [key: string]: ExpressionNodeInput | undefined;
      },
      symbolMap,
    );
  }
  if ("allowed" in decl && decl.allowed !== undefined) {
    d.allowed = decl.allowed.map((v) => buildExpression(v as ExpressionNodeInput, symbolMap));
  }
  if ("discriminator" in decl && decl.discriminator !== undefined) {
    d.discriminator = decl.discriminator;
  }
  if ("sealed" in decl && decl.sealed) d.sealed = true;
  if ("export" in decl && decl.export) d.export = true;

  return Object.keys(d).length > 0 ? (d as DecoratorsNode) : undefined;
}

export function buildParameterDeclarations(
  stack: Stack,
  symbolMap: DeclarationSymbolMap,
): Record<string, ParameterDeclarationNode> | undefined {
  if (stack.parameters.size === 0) return undefined;
  return Object.fromEntries(
    stack.parameters.listMetadata().map((p) => {
      const identifier = symbolMap.get(p)!;
      const node: ParameterDeclarationNode = definedProps({
        bicepIdentifier: identifier,
        valueType: { kind: "primitive-type" as const, name: p.type },
        defaultValue:
          p.defaultValue !== undefined
            ? buildExpression(p.defaultValue as ExpressionNodeInput, symbolMap)
            : undefined,
        decorators: buildDecorators(p, symbolMap),
      });
      return [identifier, node];
    }),
  );
}

export function buildVariableDeclarations(
  stack: Stack,
  symbolMap: DeclarationSymbolMap,
): Record<string, VariableDeclarationNode> | undefined {
  if (stack.variables.size === 0) return undefined;
  return Object.fromEntries(
    stack.variables.listMetadata().map((v) => {
      const identifier = symbolMap.get(v)!;
      const node: VariableDeclarationNode = definedProps({
        bicepIdentifier: identifier,
        value: buildExpression(v.value as ExpressionNodeInput, symbolMap),
        decorators: buildDecorators(v, symbolMap),
      });
      return [identifier, node];
    }),
  );
}

export function buildOutputDeclarations(
  stack: Stack,
  symbolMap: DeclarationSymbolMap,
): Record<string, OutputDeclarationNode> | undefined {
  if (stack.outputs.size === 0) return undefined;
  return Object.fromEntries(
    stack.outputs.list().map((o) => {
      let value: ExpressionNode;
      if (isResource(o.value)) {
        const symbol = symbolMap.get(o.value);
        if (symbol === undefined) {
          throw new Error(`Resource not found in symbol map. Ensure it belongs to the same stack.`);
        }

        value = { kind: "identifier", id: symbol };
      } else {
        value = buildExpression(o.value as ExpressionNodeInput, symbolMap);
      }

      const node: OutputDeclarationNode = definedProps({
        bicepIdentifier: o.name,
        valueType: { kind: "primitive-type" as const, name: o.type },
        value,
        decorators: buildDecorators(o, symbolMap),
      });
      return [o.name, node];
    }),
  );
}

export function buildStackDeclarations(
  stack: Stack,
  resources: readonly ResourceDeclaration[],
  symbols: DeclarationSymbolMap,
): Pick<InfraNode, "parameters" | "variables" | "resources" | "outputs"> {
  return definedProps({
    parameters: buildParameterDeclarations(stack, symbols),
    variables: buildVariableDeclarations(stack, symbols),
    resources:
      resources.length === 0
        ? undefined
        : Object.fromEntries(
            resources.map((resource) => buildResourceDeclaration(resource, symbols)),
          ),
    outputs: buildOutputDeclarations(stack, symbols),
  });
}
