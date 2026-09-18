// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Deserializes raw JSON (produced by `@azure/provisioning-core/serialization`) back into
 * live CDK `Stack` data structures.
 */

import { createOutput, type OutputValue } from "../../constructs/output.js";
import { createParameter } from "../../constructs/parameter.js";
import { createVariable, type VariableValue } from "../../constructs/variable.js";
import { createIndexedResourceProxy, deref } from "../../constructs/resource/resource-proxy.js";
import {
  createLoopedResource,
  Loop,
  type LoopedResource,
  Resource,
  type ResourceOptions,
  type ScopeExpression,
} from "../../constructs/resource/resource.js";
import { Stack } from "../../constructs/stack.js";
import { wrapExpression, isExpression, type Expression } from "../../expression/expressions.js";
import { namingRequiredPolicy } from "../../naming/naming-policy.js";
import { getShape } from "../../shape/shape-registry.js";
import {
  identifierExpressionNode,
  symbolicValueExpressionNode,
} from "../../expression/ast-nodes.js";
import { isResource } from "../../constructs/resource/resource-utils.js";
import {
  resolveResource,
  type ResolveOptions,
} from "../../constructs/resource/resource-registry.js";
import { type ProvisioningComponent } from "../../constructs/provisioning-component.js";

import {
  isPrimitiveTypeName,
  type ExpressionNode,
  type InfraNode,
  type ResourceDeclarationNode,
  type SerializationDocument,
} from "../contract/index.js";

import {
  deserializeDependsOnExpression,
  deserializeExpression,
  requireResourceHandle,
  type DeserializationSymbolMap,
} from "./expression.js";
import { raiseState } from "./lower.js";
import { orderResourceEntries } from "./resource-order.js";

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Options for {@link deserialize}.
 *
 * Currently forwards {@link ResolveOptions} to the resource registry,
 * controlling whether unmatched `(type, apiVersion)` pairs fall back
 * to the highest registered version for the type (`strict: false`,
 * the default) or return a base `Resource` (`strict: true`).
 */
export interface DeserializeOptions extends ResolveOptions {}

export function deserialize(raw: string, options?: DeserializeOptions): readonly Stack[] {
  const doc = JSON.parse(raw) as SerializationDocument;
  if (doc.infras.length === 0) throw new Error("Empty SerializationDocument");

  return constructStacks(doc.infras, options);
}

// ---------------------------------------------------------------------------
// Type aliases
// ---------------------------------------------------------------------------

interface LoopAuthoringContext {
  readonly collection: unknown;
  readonly itemVariable: string;
  readonly indexVariable?: string;
  readonly batchSize?: number;
}

interface ResourceAuthoringContext {
  readonly condition?: Expression<boolean>;
  readonly loop?: LoopAuthoringContext;
}

// ---------------------------------------------------------------------------
// Construction: InfraNode → CDK objects
// ---------------------------------------------------------------------------

function constructStacks(
  files: readonly InfraNode[],
  options: DeserializeOptions | undefined,
): Stack[] {
  return files.map((file) => constructStack(file, options));
}

function constructStack(file: InfraNode, options: DeserializeOptions | undefined): Stack {
  const rootStack = new Stack(stemName(file.fileName), {
    targetScope: file.targetScope ?? "resourceGroup",
    namingPolicy: namingRequiredPolicy,
  });

  // Map stack-local identifiers to expression handles and resource declarations.
  const symbols: DeserializationSymbolMap = new Map();

  processParams(file, rootStack, symbols);
  processVariables(file, rootStack, symbols);

  processResources(file, rootStack, symbols, options);
  processOutputs(file, rootStack, symbols);

  return rootStack;
}

// ---------------------------------------------------------------------------
// Declaration processing
// ---------------------------------------------------------------------------

function assertSymbolAvailable(symbols: DeserializationSymbolMap, identifier: string): void {
  if (symbols.has(identifier)) {
    throw new Error(`Duplicate declaration identifier "${identifier}".`);
  }
}

function processParams(
  file: InfraNode,
  stackHandle: Stack,
  symbols: DeserializationSymbolMap,
): void {
  for (const [, p] of Object.entries(file.parameters ?? {})) {
    assertSymbolAvailable(symbols, p.bicepIdentifier);
    const type =
      p.valueType.kind === "primitive-type"
        ? p.valueType.name === "any"
          ? "string"
          : p.valueType.name
        : "string";
    const sym = createParameter(stackHandle, p.bicepIdentifier, type as "string", {
      ...(p.decorators?.description !== undefined ? { description: p.decorators.description } : {}),
      ...(p.decorators?.secure ? { secure: true } : {}),
      ...(p.defaultValue !== undefined
        ? {
            defaultValue: deserializeExpression(p.defaultValue, new Map()) as string,
          }
        : {}),
      ...(p.decorators?.allowed?.length
        ? {
            allowed: p.decorators.allowed.map((a) =>
              deserializeExpression(a, new Map()),
            ) as unknown as readonly string[],
          }
        : {}),
      ...(p.decorators?.minValue !== undefined ? { minValue: p.decorators.minValue } : {}),
      ...(p.decorators?.maxValue !== undefined ? { maxValue: p.decorators.maxValue } : {}),
      ...(p.decorators?.minLength !== undefined ? { minLength: p.decorators.minLength } : {}),
      ...(p.decorators?.maxLength !== undefined ? { maxLength: p.decorators.maxLength } : {}),
      ...(p.decorators?.metadata !== undefined
        ? {
            metadata: Object.fromEntries(
              Object.entries(p.decorators.metadata).map(([k, v]) => [
                k,
                deserializeExpression(v, new Map()),
              ]),
            ) as Record<string, unknown>,
          }
        : {}),
      ...(p.decorators?.discriminator !== undefined
        ? { discriminator: p.decorators.discriminator }
        : {}),
      ...(p.decorators?.sealed ? { sealed: true } : {}),
    });
    symbols.set(p.bicepIdentifier, sym);
  }
}

function processVariables(
  file: InfraNode,
  stackHandle: Stack,
  symbols: DeserializationSymbolMap,
): void {
  for (const [, v] of Object.entries(file.variables ?? {})) {
    assertSymbolAvailable(symbols, v.bicepIdentifier);
    const sym = createVariable(
      stackHandle,
      v.bicepIdentifier,
      deserializeExpression(v.value, symbols) as VariableValue,
      {
        ...(v.decorators?.description !== undefined
          ? { description: v.decorators.description }
          : {}),
        ...(v.decorators?.export ? { export: true } : {}),
      },
    );
    symbols.set(v.bicepIdentifier, sym);
  }
}

function processResources(
  file: InfraNode,
  scopeHandle: Stack | Resource,
  symbols: DeserializationSymbolMap,
  options: DeserializeOptions | undefined,
): void {
  const entries = Object.entries(file.resources ?? {});
  for (const [, node] of orderResourceEntries(entries)) {
    assertSymbolAvailable(symbols, node.bicepIdentifier);
    const resource = createResource(node, scopeHandle, symbols, options);
    symbols.set(node.bicepIdentifier, resource);
  }
}

function processOutputs(
  file: InfraNode,
  stackHandle: Stack,
  symbols: DeserializationSymbolMap,
): void {
  for (const [, o] of Object.entries(file.outputs ?? {})) {
    if (o.valueType.kind !== "primitive-type") {
      throw new Error(
        `Cannot deserialize output "${o.bicepIdentifier}" with non-primitive type "${o.valueType.kind}".`,
      );
    }
    if (!isPrimitiveTypeName(o.valueType.name)) {
      throw new Error(
        `Cannot deserialize output "${o.bicepIdentifier}" with unknown primitive type "${o.valueType.name}".`,
      );
    }
    const val = deserializeExpression(o.value, symbols) as OutputValue;
    createOutput(stackHandle, o.bicepIdentifier, o.valueType.name, val as OutputValue, {
      ...(o.decorators?.description !== undefined ? { description: o.decorators.description } : {}),
      ...(o.decorators?.secure ? { secure: true } : {}),
      ...(o.decorators?.minValue !== undefined ? { minValue: o.decorators.minValue } : {}),
      ...(o.decorators?.maxValue !== undefined ? { maxValue: o.decorators.maxValue } : {}),
      ...(o.decorators?.minLength !== undefined ? { minLength: o.decorators.minLength } : {}),
      ...(o.decorators?.maxLength !== undefined ? { maxLength: o.decorators.maxLength } : {}),
      ...(o.decorators?.metadata !== undefined
        ? {
            metadata: Object.fromEntries(
              Object.entries(o.decorators.metadata).map(([k, v]) => [
                k,
                deserializeExpression(v, symbols),
              ]),
            ) as Record<string, unknown>,
          }
        : {}),
      ...(o.decorators?.discriminator !== undefined
        ? { discriminator: o.decorators.discriminator }
        : {}),
      ...(o.decorators?.sealed ? { sealed: true } : {}),
    });
  }
}

// ---------------------------------------------------------------------------
// Resource construction
// ---------------------------------------------------------------------------

function createResource(
  res: ResourceDeclarationNode,
  defaultScope: Stack | Resource,
  symbols: DeserializationSymbolMap,
  options: DeserializeOptions | undefined,
): Resource | LoopedResource<Resource> {
  // `res.value` is the wire body. Valid shapes are:
  //   1. object
  //   2. if-condition(object)
  //   3. for-expression(object)
  //   4. for-expression(if-condition(object))
  // Anything else (bare wrappers, if-outer-for-inner, multi-if, multi-for,
  // nested for-for, if-for-if, etc.) is malformed and rejected here.
  let wireBody: ExpressionNode = res.value;
  let loopWrapper:
    | {
        itemVariable: string;
        indexVariable?: string;
        collection: ExpressionNode;
      }
    | undefined;
  let conditionNode: ExpressionNode | undefined;

  if (wireBody.kind === "for-expression") {
    loopWrapper = {
      itemVariable: wireBody.itemVariable,
      ...(wireBody.indexVariable !== undefined ? { indexVariable: wireBody.indexVariable } : {}),
      collection: wireBody.collection,
    };
    wireBody = wireBody.body;
  }
  if (wireBody.kind === "if-condition") {
    conditionNode = wireBody.condition;
    wireBody = wireBody.body;
  }
  if (wireBody.kind !== "object") {
    throw new Error(
      `Invalid wire shape for resource "${res.bicepIdentifier}": ` +
        `\`value\` must be an \`object\`, optionally wrapped in ` +
        `\`if-condition\` and/or an outer \`for-expression\` (Bicep source ` +
        `order: \`for\` outer, \`if\` inner). Innermost node after peeling ` +
        `at most one \`for-expression\` and one \`if-condition\` is ` +
        `\`${wireBody.kind}\`.`,
    );
  }

  const scopedSymbols = loopWrapper === undefined ? symbols : new Map(symbols);
  const loopAuthoring: LoopAuthoringContext | undefined =
    loopWrapper !== undefined
      ? {
          collection: deserializeExpression(loopWrapper.collection, symbols),
          itemVariable: loopWrapper.itemVariable,
          ...(loopWrapper.indexVariable !== undefined
            ? { indexVariable: loopWrapper.indexVariable }
            : {}),
          ...(res.decorators?.batchSize !== undefined
            ? { batchSize: res.decorators.batchSize }
            : {}),
        }
      : undefined;

  if (loopWrapper !== undefined) {
    scopedSymbols.set(
      loopWrapper.itemVariable,
      wrapExpression(symbolicValueExpressionNode(loopWrapper.itemVariable)),
    );
    if (loopWrapper.indexVariable !== undefined) {
      scopedSymbols.set(
        loopWrapper.indexVariable,
        wrapExpression(symbolicValueExpressionNode(loopWrapper.indexVariable)),
      );
    }
  }

  const authoring: ResourceAuthoringContext = {
    ...(conditionNode !== undefined
      ? {
          condition: deserializeExpression(conditionNode, scopedSymbols) as Expression<boolean>,
        }
      : {}),
    ...(loopAuthoring !== undefined ? { loop: loopAuthoring } : {}),
  };

  return buildResource(
    res,
    objBody(res.value) ?? {},
    defaultScope,
    scopedSymbols,
    options,
    authoring,
  );
}

function buildResource(
  res: ResourceDeclarationNode,
  body: Record<string, ExpressionNode>,
  defaultScope: Stack | Resource,
  symbols: DeserializationSymbolMap,
  options: DeserializeOptions | undefined,
  authoring?: ResourceAuthoringContext,
): Resource | LoopedResource<Resource> {
  // Determine ProvisioningComponent parent. Prefer `parent:` (explicit nesting);
  // otherwise an identifier-form `scope:` is the extension-resource shape
  // and the symbolic name points at the ProvisioningComponent-tree parent. The renderer
  // will re-derive `parent:` vs `scope:` from ARM type matching on the
  // round-trip.
  let context: ProvisioningComponent = defaultScope;
  const parentNode = body["parent"];
  const scopeNode = body["scope"];
  let reparentedToRg = false;
  if (parentNode?.kind === "identifier") {
    context = requireResourceHandle(parentNode.id, symbols, res.bicepIdentifier, "parent");
  } else if (parentNode?.kind === "array-access") {
    // `parent: parentSym[<index>]` — the serializer emitted this because
    // the authoring code created the child under `parents.at(i)` /
    // `parents.current()`. To round-trip the shape, reconstruct the
    // indexed proxy so the base `Resource` ctor stashes
    // `state.parentIndex` from the same index expression. Passing the
    // raw parent here would erase the array-access — the child would
    // re-serialize as `parent: parentSym` and lose the index.
    const baseNode = parentNode.base;
    if (baseNode.kind === "identifier") {
      const rawParent = requireResourceHandle(baseNode.id, symbols, res.bicepIdentifier, "parent");
      const indexValue = deserializeExpression(parentNode.index, symbols);
      context = createIndexedResourceProxy(
        rawParent,
        indexValue as number,
      ) as unknown as ProvisioningComponent;
    } else {
      throw new Error(`Resource "${res.bicepIdentifier}" has an invalid "parent" reference.`);
    }
  } else if (scopeNode?.kind === "identifier") {
    context = requireResourceHandle(scopeNode.id, symbols, res.bicepIdentifier, "scope");
  } else if (
    scopeNode?.kind === "function-call" &&
    scopeNode.target === "resourceGroup" &&
    scopeNode.args.length === 1
  ) {
    // A resource carrying `scope: resourceGroup('rg-name')` is the
    // split-signal form emitted by serialize() for resources (deployable or
    // `existing`) whose nearest ProvisioningComponent ancestor is a ResourceGroup. On
    // deserialize, find the in-file ResourceGroup handle with that name and
    // use it as the ProvisioningComponent parent so the round-trip re-emits the same
    // split signal. If no in-file ResourceGroup matches, this is a genuine
    // external cross-RG lookup (only meaningful for `existing` resources)
    // and is captured as an explicit `scope` below.
    const arg = scopeNode.args[0];
    if (arg?.kind === "string") {
      for (const handle of symbols.values()) {
        if (
          isResource(handle) &&
          handle.type === "Microsoft.Resources/resourceGroups" &&
          deref(handle.name) === arg.value
        ) {
          context = handle as ProvisioningComponent;
          reparentedToRg = true;
          break;
        }
      }
    }
  }

  // Existing resources may carry a non-identifier `scope:` for cross-scope
  // lookups (e.g. `scope: resourceGroup('shared')`) that does NOT resolve to
  // an in-file ResourceGroup. Capture it as an expression to thread into the
  // new resource's `scope` props field. A scope that DID resolve to an
  // in-file ResourceGroup (reparented above) is the synthetic split-signal
  // and must not be re-captured as an explicit scope.
  let existingScope: ScopeExpression | undefined;
  if (
    res.existing &&
    !reparentedToRg &&
    scopeNode !== undefined &&
    scopeNode.kind !== "identifier"
  ) {
    const val = deserializeExpression(scopeNode, symbols);
    existingScope = (
      isExpression(val)
        ? (val as Expression<unknown>)
        : wrapExpression(identifierExpressionNode(String(val)))
    ) as ScopeExpression;
  }

  // Collect non-reserved properties
  const RESERVED = new Set(["name", "parent", "scope", "dependsOn"]);
  const wireProps: Record<string, unknown> = {};
  for (const [key, valNode] of Object.entries(body)) {
    if (!RESERVED.has(key)) wireProps[key] = deserializeExpression(valNode, symbols);
  }

  // Raise wire-shape props into JS-shape when a descriptor is
  // registered for this resource type + apiVersion. No-op otherwise —
  // the resource stays in wire shape, which round-trips correctly
  // because re-serialization also skips lowering when no descriptor
  // is attached.
  const nameNode = body["name"];
  const resourceName =
    nameNode === undefined ? "unknown" : (deserializeExpression(nameNode, symbols) as string);
  const wireState = { name: resourceName, ...wireProps };
  const descriptor = getShape(res.type, res.apiVersion, wireState, {
    strict: options?.strict ?? false,
    valueKeyedBy: "arm",
  });
  const props = descriptor ? raiseState(wireProps, descriptor) : wireProps;

  const baseProps: Record<string, unknown> = {
    type: res.type,
    apiVersion: res.apiVersion,
    name: resourceName,
    ...(res.existing ? { existing: true } : {}),
    ...(existingScope !== undefined ? { scope: existingScope } : {}),
    ...props,
  };

  const resourceOptions: ResourceOptions = {
    ...(authoring?.condition !== undefined ? { condition: authoring.condition } : {}),
    ...(body.dependsOn !== undefined
      ? {
          dependsOn: deserializeDependsOnExpression(body.dependsOn, symbols, res.bicepIdentifier),
        }
      : {}),
  };

  // Look up a registered class for this (type, apiVersion). If one
  // exists, construct it directly so the resulting handle has the right
  // prototype, instance fields, and `instanceof` identity. The class
  // constructor sets `type` and
  // `apiVersion` itself, so strip them before forwarding. Fall back to
  // base `Resource` when no class is registered (unknown type or
  // tree-shaken/missing class module). The `{ name }` lookup state lets
  // the registry pick the right variant for ARM-discriminated types
  // (e.g. `Microsoft.ApiManagement/service/portalsettings` keyed by
  // singleton name). By default the registry does a best-effort match
  // — an unknown apiVersion falls back to the highest registered
  // version for the same `(type, channel)`. Callers can pass
  // `{ strict: true }` on `deserialize` to require an
  // exact `(type, apiVersion)` match instead.
  const Ctor = resolveResource(res.type, res.apiVersion, wireState, options);

  let handle: Resource | LoopedResource<Resource>;
  if (authoring?.loop !== undefined) {
    // Looped path: construct a `LoopedResource` directly. Build a fresh
    // `Loop` from the peeled wire metadata; `Resource.fromLoop` reads
    // `.collection`, `.itemVariable`, `.indexRequested`, `.indexVariable`,
    // and `.batchSize` off it. Passing the itemVariable/indexVariable
    // explicitly keeps the wire name (rather than the "item"/"i" default)
    // and, since supplying `{ indexVariable }` counts as a request,
    // preserves the index binding on re-serialize.
    const loopInstance = new Loop(authoring.loop.collection as unknown as unknown[], {
      itemVariable: authoring.loop.itemVariable,
      ...(authoring.loop.indexVariable !== undefined
        ? { indexVariable: authoring.loop.indexVariable }
        : {}),
      ...(authoring.loop.batchSize !== undefined ? { batchSize: authoring.loop.batchSize } : {}),
    });
    // Base `Resource` is the fallback when no subclass is registered.
    // `LoopedResource`'s ctor accepts type/apiVersion from `userProps`
    // when the ctor's own statics are undefined (as they are on base
    // `Resource`), so this path threads the wire values through
    // `baseProps`.
    const CtorToUse = Ctor ?? Resource;
    handle = createLoopedResource(
      CtorToUse as new (
        context: ProvisioningComponent,
        props: unknown,
        options?: ResourceOptions,
      ) => Resource,
      loopInstance,
      context,
      baseProps,
      resourceOptions,
    );
  } else if (Ctor === undefined) {
    handle = new Resource(context, baseProps as any, resourceOptions);
  } else {
    const { type: _t, apiVersion: _v, ...classProps } = baseProps;
    handle = new Ctor(context, classProps, resourceOptions);
  }

  return handle;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function objBody(node: ExpressionNode): Record<string, ExpressionNode> | undefined {
  if (node.kind === "object") return node.value;
  if (node.kind === "if-condition") return objBody(node.body);
  if (node.kind === "for-expression") return objBody(node.body);
  return undefined;
}

function stemName(fileName: string): string {
  const withoutExt = fileName.replace(/\.bicep$/, "");
  const parts = withoutExt.split("/");
  return parts.length >= 2 ? parts[0]! : (parts[parts.length - 1] ?? withoutExt);
}
