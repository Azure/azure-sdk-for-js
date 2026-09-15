// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProvisioningComponent } from "./provisioning-component.js";
import type { ExpressionOrValue } from "../expression/expressions.js";
import type { NamingPolicy } from "../naming/naming-policy.js";
import { DefaultNamingPolicy } from "../naming/naming-policy.js";
import { OutputCollection } from "./output.js";
import { ParameterCollection } from "./parameter.js";
import { VariableCollection } from "./variable.js";
import {
  getLoopedResources as runGetLoopedResources,
  getResources as runGetResources,
  getResource as runGetResource,
  type QueryOptions,
} from "./resource/resource-query.js";
import {
  createLoopedResource,
  type Loop,
  type LoopedResource,
  type Resource,
  type ResourceOptions,
} from "./resource/resource.js";
import type { ResourceCtor } from "./resource/resource-registry.js";
import type { TargetScope } from "../serialization/contract/index.js";

// ---------------------------------------------------------------------------
// Stack — class-based API for creating stacks
// ---------------------------------------------------------------------------

export interface StackOptions {
  readonly targetScope?: TargetScope | undefined;
  readonly location?: ExpressionOrValue<string> | undefined;
  readonly tags?: Record<string, ExpressionOrValue<string>> | undefined;
  readonly namingPolicy?: NamingPolicy | undefined;
}

/**
 * A Stack defines a deployment unit.
 *
 * @remarks
 * Each stack produces one or more Bicep files — resources at different
 * scopes (subscription vs. resource group) are split into separate files
 * linked by module references.
 *
 * Resources register themselves by passing the stack (or a child component)
 * as their first constructor argument. `Stack.add()` is available as a
 * convenience for creating child components with the stack as parent.
 *
 * The `targetScope` option controls the Bicep target scope. Default is
 * `"subscription"`, which requires explicit `ResourceGroup` instances.
 * Set `"resourceGroup"` to deploy resources directly into an existing
 * resource group.
 *
 * Every stack registers itself in `Stack.roots` for collection by tools
 * like the playground and CLI.
 *
 * @example
 * ```typescript snippet:ignore
 * import { Stack, ResourceGroup } from "@azure/provisioning-core";
 * import { KeyVault } from "@azure/provisioning-keyvault";
 *
 * const stack = new Stack("my-app");
 * const rg = new ResourceGroup(stack, "eastus");
 * const vault = new KeyVault(rg, { tenantId: "..." });
 * ```
 */
export class Stack extends ProvisioningComponent {
  readonly name: string;
  readonly targetScope: TargetScope;
  readonly parameters: ParameterCollection = new ParameterCollection();
  readonly variables: VariableCollection = new VariableCollection();
  readonly outputs: OutputCollection = new OutputCollection();

  // --- Static root stack registry ---

  static #roots: Stack[] = [];

  /** All root stacks created since the last call to `Stack.clearRoots()`. */
  static get roots(): readonly Stack[] {
    return Stack.#roots;
  }

  /**
   * Returns all root stacks and clears the registry. Useful for collecting
   * all stacks after executing user code (e.g. in the playground or CLI).
   */
  static clearRoots(): Stack[] {
    return Stack.#roots.splice(0, Stack.#roots.length);
  }

  /** Create a root stack. */
  constructor(name: string, options?: StackOptions) {
    super();
    const opts = options ?? {};
    this.name = name;
    this.targetScope = opts.targetScope ?? "subscription";
    Stack.#roots.push(this);
    this._localDeploymentContext = {
      location: opts.location,
      tags: opts.tags,
      namingPolicy: opts.namingPolicy ?? new DefaultNamingPolicy({ workload: name }),
    };
  }

  // --- Query ---
  // Query the resources in this stack. Exposed on `Stack` (not `ProvisioningComponent`)
  // because "all resources in the stack" is unambiguous, whereas
  // `resource.getResources()` — which excludes the resource itself —
  // would be confusing. For multiple stacks, use
  // `stacks.flatMap(s => s.getResources(...))`.

  /**
   * The scalar resources in this stack. With no `type`, returns
   * every scalar resource; pass a resource class to filter and narrow to
   * that subclass. Returns a plain array — use native `.filter` / `.find` /
   * `.map` for anything further.
   *
   * By default walks the whole tree; pass `{ recursive: false }` to consider
   * only the stack's direct children.
   */
  getResources(options?: QueryOptions): Resource[];
  getResources<T extends Resource>(type: ResourceCtor<T>, options?: QueryOptions): T[];
  getResources(
    typeOrOptions?: ResourceCtor<Resource> | QueryOptions,
    maybeOptions?: QueryOptions,
  ): Resource[] {
    return runGetResources(this, typeOrOptions as never, maybeOptions);
  }

  /**
   * Find the **first** scalar resource of `type` whose literal name equals
   * `name`, or `undefined` if none matches.
   *
   * @remarks
   * Returns the first match in tree order. ARM names are unique only *per
   * resource type within a scope*, so a stack MAY legitimately contain more
   * than one resource of the same `type` and `name` (e.g. across different
   * resource groups) — this returns whichever is found first. Use
   * `getResources(type)` and filter yourself if you need all matches.
   *
   * Only scalar resources are searched, and names that do not resolve to a
   * string literal are never matched. Pass `{ recursive: false }` to search
   * only the stack's direct children.
   */
  getResource<T extends Resource>(
    type: ResourceCtor<T>,
    name: string,
    options?: QueryOptions,
  ): T | undefined {
    return runGetResource(this, type, name, options);
  }

  /**
   * Create a child under this stack (with the stack as its parent context),
   * as a convenience for `new Ctor(stack, ...args)`.
   *
   * Constructs a single child instance and returns it.
   */
  add<T extends new (context: ProvisioningComponent, ...args: any[]) => ProvisioningComponent>(
    ctor: T,
    ...args: ConstructorParameters<T> extends [any, ...infer Rest] ? Rest : never
  ): InstanceType<T>;
  add(
    ctor: new (context: ProvisioningComponent, ...args: any[]) => ProvisioningComponent,
    ...rest: any[]
  ): ProvisioningComponent {
    return new ctor(this.self, ...rest);
  }
}

/** @internal */
export function getLoopedResources(
  stack: Stack,
  options?: QueryOptions,
): LoopedResource<Resource>[];
/** @internal */
export function getLoopedResources<T extends Resource>(
  stack: Stack,
  type: ResourceCtor<T>,
  options?: QueryOptions,
): LoopedResource<T>[];
export function getLoopedResources(
  stack: Stack,
  typeOrOptions?: ResourceCtor<Resource> | QueryOptions,
  maybeOptions?: QueryOptions,
): LoopedResource<Resource>[] {
  return runGetLoopedResources(stack, typeOrOptions as never, maybeOptions);
}

/** @internal */
export function addLoopedResource<T extends Resource, P>(
  stack: Stack,
  ctor: new (context: Stack, props: P, options?: ResourceOptions) => T,
  loop: Loop<unknown>,
  ...rest: undefined extends P
    ? [props?: P, options?: ResourceOptions]
    : [props: P, options?: ResourceOptions]
): LoopedResource<T> {
  return createLoopedResource(ctor, loop, stack.self, ...rest);
}
