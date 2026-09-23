// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Deserializes raw JSON (produced by `@azure/provisioning-core/serialization`) back into
 * live CDK `Stack` data structures.
 */

import { createOutput, type OutputValue } from "../../constructs/output.js";
import { createParameter } from "../../constructs/parameter.js";
import { createVariable, type VariableValue } from "../../constructs/variable.js";
import {
  createIndexedResourceProxy,
  unwrapResourceHandle,
} from "../../constructs/resource/resource-proxy.js";
import { isLoopedResource } from "../../constructs/resource/resource-utils.js";
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
import { symbolicValueExpressionNode } from "../../expression/ast-nodes.js";
import { resolveResource } from "../../constructs/resource/resource-registry.js";
import { type ProvisioningComponent } from "../../constructs/provisioning-component.js";

import {
  isPrimitiveTypeName,
  type ExpressionNode,
  type InfraNode,
  type ResourceDeclarationNode,
  type SerializationDocument,
  type VariableDeclarationNode,
} from "../contract/index.js";

import {
  deserializeDependsOnExpression,
  deserializeExpression,
  requireResourceHandle,
  type DeserializationSymbolMap,
} from "./expression.js";
import { raiseState } from "./lower.js";
import { collectDependenciesForDeclaration } from "../utils.js";

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Options for {@link deserialize}.
 *
 * Controls whether unmatched `(type, apiVersion)` pairs fall back
 * to the highest registered version for the type (`strict: false`,
 * the default) or return a base `Resource` (`strict: true`).
 */
export interface DeserializeOptions {
  readonly strict?: boolean;
}

/**
 * Reconstructs authored stacks from a serialized provisioning document.
 *
 * The input must contain at least one infrastructure file. Unsupported module
 * declarations are rejected rather than silently discarded. A successful
 * deserialize/serialize cycle preserves deployment semantics and expressions.
 */
export function deserialize(raw: string, options?: DeserializeOptions): readonly Stack[] {
  const doc = JSON.parse(raw) as SerializationDocument;
  if (doc.infras.length === 0) throw new Error("Empty SerializationDocument");
  if (doc.infras.some((infra) => Object.keys(infra.modules ?? {}).length > 0)) {
    throw new Error("Module deserialization is not supported.");
  }

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
  processDeclarations(file, rootStack, symbols, options);
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
    if (p.valueType.kind !== "primitive-type" || !isPrimitiveTypeName(p.valueType.name)) {
      throw new Error(`Parameter "${p.bicepIdentifier}" has an unsupported non-primitive type.`);
    }
    const type = p.valueType.name;
    const sym = createParameter(stackHandle, p.bicepIdentifier, type, {
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

function processDeclarations(
  file: InfraNode,
  stackHandle: Stack,
  symbols: DeserializationSymbolMap,
  options: DeserializeOptions | undefined,
): void {
  type IndexedDeclaration =
    | { readonly kind: "resource"; readonly node: ResourceDeclarationNode }
    | { readonly kind: "variable"; readonly node: VariableDeclarationNode };
  const declarations = new Map<string, IndexedDeclaration>();

  function registerDeclaration(declaration: IndexedDeclaration): void {
    const { node } = declaration;
    assertSymbolAvailable(symbols, node.bicepIdentifier);
    const previous = declarations.get(node.bicepIdentifier);
    if (previous !== undefined) {
      const category =
        previous.kind === "resource" && declaration.kind === "resource"
          ? "resource"
          : "declaration";
      throw new Error(`Duplicate ${category} identifier "${node.bicepIdentifier}".`);
    }
    declarations.set(node.bicepIdentifier, declaration);
  }

  for (const node of Object.values(file.variables ?? {})) {
    registerDeclaration({ kind: "variable", node });
  }
  for (const node of Object.values(file.resources ?? {})) {
    registerDeclaration({ kind: "resource", node });
  }

  const pending: {
    declaration: IndexedDeclaration;
    dependencies: Iterator<string>;
  }[] = [];
  const active = new Map<string, number>();

  function pushDeclaration(declaration: IndexedDeclaration): void {
    const { node } = declaration;
    const identifiers = collectDependenciesForDeclaration(node);
    active.set(node.bicepIdentifier, pending.length);
    pending.push({ declaration, dependencies: identifiers.values() });
  }

  for (const declaration of declarations.values()) {
    if (symbols.has(declaration.node.bicepIdentifier)) continue;
    pushDeclaration(declaration);

    while (pending.length > 0) {
      const frame = pending[pending.length - 1]!;
      const dependency = frame.dependencies.next();
      if (!dependency.done) {
        if (symbols.has(dependency.value)) continue;
        const target = declarations.get(dependency.value);
        if (target === undefined) continue;
        const cycleStart = active.get(dependency.value);
        if (cycleStart !== undefined) {
          const cycle = pending.slice(cycleStart).map((entry) => entry.declaration);
          const category = cycle.every((entry) => entry.kind === "resource")
            ? "Resource"
            : "Declaration";
          const path = [...cycle.map((entry) => entry.node.bicepIdentifier), dependency.value]
            .map((identifier) => `"${identifier}"`)
            .join(" -> ");
          throw new Error(`${category} dependency cycle detected: ${path}.`);
        }
        pushDeclaration(target);
        continue;
      }

      constructDeclaration(frame.declaration);
      active.delete(frame.declaration.node.bicepIdentifier);
      pending.pop();
    }
  }

  function constructDeclaration(declaration: IndexedDeclaration): void {
    if (declaration.kind === "resource") {
      symbols.set(
        declaration.node.bicepIdentifier,
        createResource(declaration.node, stackHandle, symbols, options),
      );
      return;
    }
    const { node } = declaration;
    const sym = createVariable(
      stackHandle,
      node.bicepIdentifier,
      deserializeExpression(node.value, symbols) as VariableValue,
      {
        ...(node.decorators?.description !== undefined
          ? { description: node.decorators.description }
          : {}),
        ...(node.decorators?.export ? { export: true } : {}),
      },
    );
    symbols.set(node.bicepIdentifier, sym);
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
  let context: ProvisioningComponent = defaultScope;
  const parentNode = body["parent"];
  const scopeNode = body["scope"];
  if (
    parentNode !== undefined &&
    parentNode.kind !== "identifier" &&
    parentNode.kind !== "array-access"
  ) {
    throw new Error(`Resource "${res.bicepIdentifier}" has an invalid "parent" reference.`);
  }
  if (!res.existing && scopeNode !== undefined && scopeNode.kind !== "identifier") {
    throw new Error(`Resource "${res.bicepIdentifier}" has an invalid "scope" reference.`);
  }
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
    const scopeResource = requireResourceHandle(
      scopeNode.id,
      symbols,
      res.bicepIdentifier,
      "scope",
    );
    if (isLoopedResource(scopeResource)) {
      throw new Error(
        `Resource "${res.bicepIdentifier}" references resource collection ` +
          `"${scopeNode.id}" in "scope"; expected a single resource.`,
      );
    }
    context = scopeResource;
  }

  let existingScope: ScopeExpression | undefined;
  if (res.existing && scopeNode !== undefined && scopeNode.kind !== "identifier") {
    const scope = deserializeExpression(scopeNode, symbols);
    if (!isExpression(scope)) {
      throw new Error(
        `Resource "${res.bicepIdentifier}" has an invalid "scope" value: ` +
          `expected an expression, received "${scopeNode.kind}".`,
      );
    }
    existingScope = scope;
  }

  // Collect non-reserved properties
  const RESERVED = new Set(["name", "parent", "scope", "dependsOn"]);
  const wireProps: Record<string, unknown> = Object.create(null);
  for (const [key, valNode] of Object.entries(body)) {
    if (!RESERVED.has(key)) {
      Object.defineProperty(wireProps, key, {
        value: deserializeExpression(valNode, symbols),
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
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

  if (authoring?.condition !== undefined) {
    const state = unwrapResourceHandle(handle) as unknown as Record<string, unknown>;
    state.condition = authoring.condition;
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
  return fileName.replace(/\.bicep$/, "");
}
