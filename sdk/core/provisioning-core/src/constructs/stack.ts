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
  getResources as runGetResources,
  getLoopedResources as runGetLoopedResources,
  getResource as runGetResource,
  type QueryOptions,
} from "./resource/resource-query.js";
import { Loop } from "./resource/resource.js";
import type { LoopedResource, Resource } from "./resource/resource.js";
import type { ResourceCtor } from "./resource/resource-registry.js";

import type { TargetScope } from "../bicep.js";

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
 * ```typescript
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
   * The scalar (un-looped) resources in this stack. With no `type`, returns
   * every scalar resource; pass a resource class to filter and narrow to
   * that subclass. Returns a plain array — use native `.filter` / `.find` /
   * `.map` for anything further.
   *
   * By default walks the whole tree; pass `{ recursive: false }` to consider
   * only the stack's direct children. Loop-expanded declarations
   * (`Ctor.fromLoop(...)`) are excluded — use `getLoopedResources` for those.
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
   * The loop-expanded resource declarations (`Ctor.fromLoop(...)`) in this
   * stack. With no `type`, returns every looped declaration; pass a resource
   * class to filter and narrow. Each element is a `LoopedResource<T>` — a
   * looped read is Bicep `sym[i].prop`, not `sym.prop`.
   *
   * By default walks the whole tree; pass `{ recursive: false }` to consider
   * only the stack's direct children.
   */
  getLoopedResources(options?: QueryOptions): LoopedResource<Resource>[];
  getLoopedResources<T extends Resource>(
    type: ResourceCtor<T>,
    options?: QueryOptions,
  ): LoopedResource<T>[];
  getLoopedResources(
    typeOrOptions?: ResourceCtor<Resource> | QueryOptions,
    maybeOptions?: QueryOptions,
  ): LoopedResource<Resource>[] {
    return runGetLoopedResources(this, typeOrOptions as never, maybeOptions);
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
   * Scalar-only: a loop-expanded declaration's name is a per-iteration
   * expression, never a string literal, so it is never matched. Pass
   * `{ recursive: false }` to search only the stack's direct children.
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
   * - `add(ctor, ...args)` constructs a single scalar instance and returns it.
   * - `add(ctor, loop, ...args)` constructs a loop-expanded declaration
   *   (`Ctor.fromLoop(loop, stack, ...args)`) and returns the
   *   `LoopedResource<InstanceType<T>>`; index into it with `.at(i)`.
   *
   * The two forms are distinguished by whether the argument after `ctor` is
   * a {@link Loop} (resource props are never a `Loop`). The looped form is
   * only available for resource classes.
   */
  add<T extends new (context: ProvisioningComponent, ...args: any[]) => ProvisioningComponent>(
    ctor: T,
    ...args: ConstructorParameters<T> extends [any, ...infer Rest] ? Rest : never
  ): InstanceType<T>;
  add<T extends new (context: ProvisioningComponent, ...args: any[]) => Resource>(
    ctor: T,
    loop: Loop<unknown>,
    ...args: ConstructorParameters<T> extends [any, ...infer Rest] ? Rest : never
  ): LoopedResource<InstanceType<T>>;
  add(
    ctor: new (context: ProvisioningComponent, ...args: any[]) => ProvisioningComponent,
    ...rest: any[]
  ): ProvisioningComponent | LoopedResource<Resource> {
    if (rest[0] instanceof Loop) {
      const [loop, ...args] = rest;
      return (
        ctor as unknown as {
          fromLoop(
            loop: Loop<unknown>,
            context: ProvisioningComponent,
            ...args: any[]
          ): LoopedResource<Resource>;
        }
      ).fromLoop(loop, this.self, ...args);
    }
    return new ctor(this.self, ...rest);
  }
}
