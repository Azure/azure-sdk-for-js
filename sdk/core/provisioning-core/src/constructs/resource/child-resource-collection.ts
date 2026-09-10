// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Loop } from "./resource.js";
import type { ResourceOptions, Resource, LoopedResource } from "./resource.js";
import { isResource, isLoopedResource, isLoopedResourceOf } from "./resource-utils.js";
import { PROXY_INDEX_REF, STATE_PARENT_INDEX, indexKey } from "./resource-proxy.js";
import type { ProvisioningComponent } from "../provisioning-component.js";
import type { ArrayAccessIndex } from "../../expression/ast-nodes.js";
import type { ResourceCtor } from "./resource-registry.js";

/**
 * A typed, read-only view over child resources of a specific ARM type.
 *
 * @remarks
 * The collection does not maintain its own list — it filters the parent
 * resource's `children` by ARM resource type. Creating a child via
 * {@link ChildResourceCollection.add}, or by constructing the child class
 * directly with the parent as context, are equivalent; either way the child
 * appears in the collection immediately.
 *
 * The collection is `Iterable`: iterating (or spreading) yields **every**
 * child declaration of this type — scalar `TChild` handles and
 * loop-expanded `LoopedResource<TChild>` declarations alike, as a union.
 * Filter as needed; the union is type-safe because a `LoopedResource<T>`
 * does not expose `T`'s ARM members (you must `.at(i)` first),
 * so the compiler forces you to discriminate before a scalar read.
 *
 * @example
 * ```typescript snippet:ignore
 * vault.secrets.add({ name: "s1", value: "v1" });
 * // or equivalently:
 * new Secret(vault, { name: "s1", value: "v1" });
 *
 * // loop-expanded children — pass a `Loop` as the first argument:
 * vault.secrets.add(loop, { name: loop.item, value: "v" });
 *
 * for (const s of vault.secrets) {
 *   if (isLoopedResource(s)) {
 *     s.at(0).properties; // looped — index in with .at(i)
 *   } else {
 *     s.properties; // scalar Secret
 *   }
 * }
 * ```
 */
export class ChildResourceCollection<
  TParent extends Resource,
  TChild extends Resource,
  TProps,
> implements Iterable<TChild | LoopedResource<TChild>> {
  #childClass: ResourceCtor<TChild>;
  #resourceType: string;
  /**
   * Canonical key of the parent's array index, when this collection is
   * scoped to a single element of a looped declaration (i.e. constructed
   * from `parent.at(i)`, whose proxy carries {@link PROXY_INDEX_REF}).
   * `undefined` for a scalar parent — in which case the collection matches
   * only children that likewise carry no recorded index.
   */
  #indexKey: string | undefined;

  constructor(
    public readonly parent: TParent,
    childClass: ResourceCtor<TChild>,
  ) {
    this.#childClass = childClass;
    this.#resourceType = childClass.resourceType;
    const parentIndex = (parent as unknown as Record<symbol, unknown>)[PROXY_INDEX_REF] as
      ArrayAccessIndex | undefined;
    this.#indexKey = indexKey(parentIndex);
  }

  /**
   * Add a child declaration to this collection.
   *
   * - `add(props, options?)` adds a single scalar child
   *   (`new Child(parent, props, options)`) and returns the `TChild` handle.
   * - `add(loop, props, options?)` adds a loop-expanded declaration
   *   (`Child.fromLoop(loop, parent, props, options)`) and returns the
   *   `LoopedResource<TChild>`; index into it with `.at(i)`.
   *
   * The two forms are distinguished by whether the first argument is a
   * {@link Loop} (resource props are never a `Loop`). `options` mirrors the
   * resource constructor's third argument (e.g. `{ condition }`).
   */
  add(props: TProps, options?: ResourceOptions): TChild;
  add(loop: Loop<unknown>, props: TProps, options?: ResourceOptions): LoopedResource<TChild>;
  add(
    loopOrProps: Loop<unknown> | TProps,
    propsOrOptions?: TProps | ResourceOptions,
    maybeOptions?: ResourceOptions,
  ): TChild | LoopedResource<TChild> {
    if (loopOrProps instanceof Loop) {
      return (
        this.#childClass as unknown as {
          fromLoop(
            loop: Loop<unknown>,
            context: TParent,
            props: TProps,
            options?: ResourceOptions,
          ): LoopedResource<TChild>;
        }
      ).fromLoop(loopOrProps, this.parent, propsOrOptions as TProps, maybeOptions);
    }
    return new this.#childClass(
      this.parent,
      loopOrProps,
      propsOrOptions as ResourceOptions | undefined,
    );
  }

  /**
   * Every child declaration of this type under the parent — scalar `TChild`
   * handles and loop-expanded `LoopedResource<TChild>` declarations, as a
   * union. Discriminate with `isLoopedResource` / `isResource`
   * (or `.filter(...)`) before a scalar read.
   */
  *[Symbol.iterator](): IterableIterator<TChild | LoopedResource<TChild>> {
    for (const child of this.#matchingChildren()) {
      if (isLoopedResource(child)) {
        if (isLoopedResourceOf(child, this.#childClass)) {
          yield child;
        }
        continue;
      }
      if (isResource(child) && child.type === this.#resourceType) {
        yield child.self as TChild;
      }
    }
  }

  /**
   * Number of child declarations of this type under the parent, counting
   * both scalar children and loop-expanded declarations. A looped
   * declaration counts as **one** — it is a single `[for … ]` declaration
   * whose deploy-time instance count is not known at authoring time.
   * Equivalent to `[...collection].length`.
   */
  get length(): number {
    let count = 0;
    for (const _child of this) count += 1;
    return count;
  }

  /**
   * The parent's children that belong to this collection — i.e. those
   * created under the same parent index. A scalar parent
   * (`#indexKey === undefined`) matches children with no recorded index; an
   * element-scoped collection (`parent.at(i)`) matches children stamped with
   * that same index. Yields raw `ProvisioningComponent`s (the parent's `children` may
   * hold non-resource components); resource kind / subclass / ARM-type
   * filtering is left to the callers, which narrow via brand guards.
   */
  *#matchingChildren(): Iterable<ProvisioningComponent> {
    for (const child of this.parent.children) {
      const childIndex = (child as unknown as { state?: Record<string, unknown> }).state?.[
        STATE_PARENT_INDEX
      ] as ArrayAccessIndex | undefined;
      if (indexKey(childIndex) !== this.#indexKey) continue;
      yield child;
    }
  }
}
