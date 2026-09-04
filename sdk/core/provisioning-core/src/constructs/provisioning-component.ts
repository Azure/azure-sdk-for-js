// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentContext } from "../deployment-context/deployment-context.js";
import type { ExpressionOrValue } from "../expression/expressions.js";

export type ProvisioningComponentConstructor<
  TComponent extends ProvisioningComponent = ProvisioningComponent,
> = abstract new (...args: any[]) => TComponent;

/**
 * Base class for all tree nodes in the library object model.
 *
 * @remarks
 * Both `Stack` and `Resource` extend `ProvisioningComponent`. It provides parent-child
 * tree tracking and deployment context lookup — walking up the tree to find
 * the nearest context set by a `Stack` or `ResourceGroup`.
 *
 * Subclass `ProvisioningComponent` directly to create reusable groupings of resources
 * that don't correspond to an ARM resource. For ARM resources, extend
 * `Resource` instead.
 *
 * @example
 * ```typescript snippet:ignore
 * import { ProvisioningComponent } from "@azure/provisioning-core";
 * import { KeyVault } from "@azure/provisioning-keyvault";
 * import { StorageAccount } from "@azure/provisioning-storage";
 *
 * class DataTier extends ProvisioningComponent {
 *   readonly vault: KeyVault;
 *   readonly storage: StorageAccount;
 *
 *   constructor(parent: ProvisioningComponent, tenantId: string) {
 *     super(parent);
 *     this.vault = new KeyVault(parent, { tenantId });
 *     this.storage = new StorageAccount(parent, {});
 *   }
 * }
 * ```
 */
export class ProvisioningComponent {
  readonly parent: ProvisioningComponent | undefined;
  readonly children: ProvisioningComponent[] = [];
  /**
   * The contribution this node makes to the inherited deployment context.
   * Resolved field-by-field by walking ancestors in `deploymentContext`.
   */
  protected _localDeploymentContext: DeploymentContext | undefined;

  constructor(parent?: ProvisioningComponent) {
    this.parent = parent;
    parent?.children.push(this);
  }

  /**
   * The effective deployment context **inherited from ancestors**, resolved
   * by walking up the parent chain (this node's own local contribution is
   * intentionally excluded — a node's contribution flows to its descendants,
   * not to itself). Each field is resolved per its own rule:
   *
   * - `location`: nearest ancestor with a value wins.
   * - `namingPolicy`: nearest ancestor with a value wins.
   * - `tags`: flat-merged across all ancestors; innermost wins on key conflict.
   *
   * Returns an object whose fields may all be `undefined` if no ancestor
   * contributed anything.
   */
  get deploymentContext(): DeploymentContext {
    let location: DeploymentContext["location"];
    let namingPolicy: DeploymentContext["namingPolicy"];
    let locationSet = false;
    let namingSet = false;
    const tagFrames: Array<Record<string, ExpressionOrValue<string>>> = [];

    for (
      let current: ProvisioningComponent | undefined = this.parent;
      current;
      current = current.parent
    ) {
      const local = current._localDeploymentContext;
      if (local === undefined) continue;
      if (!locationSet && local.location !== undefined) {
        location = local.location;
        locationSet = true;
      }
      if (!namingSet && local.namingPolicy !== undefined) {
        namingPolicy = local.namingPolicy;
        namingSet = true;
      }
      if (local.tags !== undefined) tagFrames.push(local.tags);
    }

    let tags: DeploymentContext["tags"];
    // Merge root → leaf so the nearest ancestor (frame 0) wins on conflict.
    for (let i = tagFrames.length - 1; i >= 0; i--) {
      tags = { ...tags, ...tagFrames[i] };
    }

    return { location, tags, namingPolicy };
  }

  /**
   * Returns `true` if any ancestor has attached a local deployment context
   * contribution. Used by `Resource` to enforce that resources sit inside
   * a `Stack` tree. (This node's own contribution is intentionally not
   * considered — a node inherits context from ancestors, not from itself.)
   */
  protected hasDeploymentContext(): boolean {
    for (
      let current: ProvisioningComponent | undefined = this.parent;
      current;
      current = current.parent
    ) {
      if (current._localDeploymentContext !== undefined) return true;
    }
    return false;
  }

  /**
   * Public identity for this node.
   *
   * @remarks
   * Plain components return themselves. Resources override this to return
   * their proxy-backed handle so APIs can get the right instance to use to
   * reference to the resource and so on.
   */
  get self(): this {
    return this;
  }

  /**
   * Applies a callback to every descendant component/resource that matches the
   * given constructor, including `this` when it matches.
   */
  transform(callback: (component: ProvisioningComponent) => void): this;
  transform<TComponent extends ProvisioningComponent>(
    ctor: ProvisioningComponentConstructor<TComponent>,
    callback: (component: TComponent) => void,
  ): this;
  transform<TComponent extends ProvisioningComponent>(
    ctorOrCallback:
      ProvisioningComponentConstructor<TComponent> | ((component: ProvisioningComponent) => void),
    callback?: (component: TComponent) => void,
  ): this {
    const ctor = callback
      ? (ctorOrCallback as ProvisioningComponentConstructor<TComponent>)
      : undefined;
    const cb = (callback ?? ctorOrCallback) as (c: ProvisioningComponent) => void;

    this.visit((component) => {
      const target = component.self;
      if (!ctor || target instanceof ctor) {
        cb(target);
      }
    });

    return this;
  }

  /**
   * Depth-first visit of this node and all descendants.
   * Return `false` from the callback to skip visiting that node's children.
   */
  visit(callback: (component: ProvisioningComponent) => boolean | void): void {
    if (callback(this) === false) return;
    for (const child of this.children) {
      child.visit(callback);
    }
  }

  isChildOf(component: ProvisioningComponent): boolean {
    let current = this.parent;
    while (current) {
      if (current === component) return true;
      current = current.parent;
    }
    return false;
  }

  /**
   * Detach a direct child from this component. Used by generated singleton
   * setters/registrars to swap a previously attached singleton out of the
   * tree before installing a replacement. No-op when `child` is not a
   * direct child.
   */
  removeChild(child: ProvisioningComponent): void {
    const idx = this.children.indexOf(child);
    if (idx >= 0) this.children.splice(idx, 1);
  }
}
