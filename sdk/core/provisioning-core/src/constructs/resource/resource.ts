// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProvisioningComponent } from "../provisioning-component.js";
import {
  unwrapExpression,
  wrapExpression,
  type Expression,
  type ExpressionOrValue,
} from "../../expression/expressions.js";
import type { ExpressionNode } from "../../expression/ast-nodes.js";
import { symbolicValueExpressionNode } from "../../expression/ast-nodes.js";
import type { PropertySegment } from "../../types.js";
import type { ResourceNamingRules } from "../../naming/naming-rules.js";
import { namingRequiredPolicy, resolveResourceName } from "../../naming/naming-policy.js";
import {
  RAW_RESOURCE_HANDLE,
  RESOURCE_BRAND,
  RESOURCE_DECLARATION_BRAND,
  LOOPED_RESOURCE_BRAND,
  PROXY_INDEX_REF,
  INDEXED_PROXY_TARGET,
  STATE_PARENT_INDEX,
  createIndexedResourceProxy,
  createResourceMemberProxy,
  createResourceProxy,
  normalizeAssignedValue,
  unwrapResourceHandle,
} from "./resource-proxy.js";
import { isResourceDeclaration } from "./resource-utils.js";
import type { FlatModelShape } from "../../shape/shape.js";
import { getShape, registerShape as registerShapeInRegistry } from "../../shape/shape-registry.js";
import {
  registerResource as registerResourceInRegistry,
  type ResourceCtor,
} from "./resource-registry.js";
import type { FlatVariantSelector } from "./resource-type-registry.js";

// ---------------------------------------------------------------------------
// Resource types
// ---------------------------------------------------------------------------

/**
 * A Bicep `scope:` expression. Used on `existing` resource references for
 * cross-RG / cross-subscription / cross-MG / cross-tenant lookups, and on
 * modules to set the nested deployment scope.
 *
 * Typed as `Expression<unknown>` because the natural producers are the
 * scope-function helpers in `fn` (`fn.resourceGroup(...)`,
 * `fn.subscription(...)`, `fn.managementGroup(...)`, `fn.tenant()`), all
 * of which return `Expression<TScope>` proxies. Narrowing further isn't
 * worthwhile today since the set of acceptable scope-producing
 * expressions isn't closed and Bicep validates the actual call shape
 * downstream.
 */
// TODO: further narrow to allowed expression if possible?
export type ScopeExpression = Expression<unknown>;

/**
 * Internal representation used to construct resource handle objects.
 * The proxy converts these into the public Resource shape.
 */
export interface ResourceState<TType extends string = string> {
  name: ExpressionOrValue<string>;
  readonly type: TType;
  readonly apiVersion: string;
  readonly existing?: boolean | undefined;
  /**
   * Optional Bicep `scope:` expression. Currently emitted only on `existing`
   * resource references (e.g. `scope: resourceGroup('shared')` for a
   * cross-RG lookup). Future scope-hoisted resource types may emit it on
   * deployable resources too — for example, deploying a
   * `Microsoft.Management/managementGroups` from a subscription-targeted
   * file requires `scope: tenant()`. See `docs/bicep/scope.md` section 2.2.
   *
   * For ordinary deployable resources this field is `undefined` — their
   * deployment scope is determined by the file's `targetScope` (or by the
   * containing `ResourceGroup` / module the resource lives in).
   *
   * Stored as a raw `ExpressionNode` (the user-facing `ScopeExpression`
   * proxy is unwrapped at the constructor boundary, matching the
   * "`state` holds normalized raw nodes" invariant that
   * `normalizeAssignedValue` maintains for every other field).
   */
  readonly scope?: ExpressionNode | undefined;
  readonly condition?: ExpressionOrValue<boolean> | undefined;
}

/**
 * Public-facing props for a reference to an existing (pre-deployed) Azure
 * resource. This is strictly narrower than the deployable resource props —
 * Bicep `existing` declarations only accept `name` and optional `scope:`.
 *
 * Read-side access on the returned resource handle is unrestricted —
 * `kv.properties.vaultUri`, `sa.id`, etc. all work and compile to symbolic
 * references that ARM resolves at deployment time.
 *
 * Symbolic parent/extension scopes are expressed by passing the parent
 * resource as the ProvisioningComponent `context` argument to the resource constructor
 * (with `{ existing: true }`), not via this `scope` field.
 */
export interface ExistingResourceProps {
  /** Required. The actual Azure name of the existing resource. */
  readonly name: ExpressionOrValue<string>;

  /**
   * Optional. The scope at which to look up the resource. Used when the
   * resource lives outside the current deployment's scope (different RG,
   * subscription, management group, or tenant).
   *
   * Pass a scope-function call expression (e.g. `resourceGroup("name")`,
   * `subscription()`, `managementGroup("mg")`, `tenant()`).
   */
  readonly scope?: ScopeExpression;
}

/**
 * `ExistingResourceProps` for singleton child resources — `name` is omitted
 * because singleton children have a fixed name (e.g. `"default"`).
 */
export type SingletonExistingResourceProps = Omit<ExistingResourceProps, "name">;

/**
 * Internal props accepted by the base `Resource` constructor. A loose
 * superset of both the deployable and existing public shapes — the runtime
 * constructor branches on `props.existing` to decide which fields are
 * honored. Generated CDK resource classes expose a discriminated union
 * `(Deployable & { existing?: false }) | (Existing & { existing: true })`;
 * passing `{ ...existingProps, existing: true }` selects the existing arm and
 * emits a Bicep `existing` reference instead of a new declaration.
 */
export interface ResourceProps<TType extends string> {
  readonly name?: ExpressionOrValue<string> | undefined;
  readonly apiVersion: string;
  readonly type: TType;

  readonly existing?: boolean;

  /**
   * Optional Bicep `scope:` value for an existing resource reference.
   * Only honored when `existing === true`. Ignored on deployable resources
   * (non-existing resources have no per-resource scope in Bicep).
   */
  readonly scope?: ScopeExpression;
}

/**
 * Optional third-argument bag passed to every resource constructor. Holds
 * authoring flags that affect how the resource declaration is emitted but are
 * not ARM-modeled properties of the resource body.
 *
 * Fields:
 * - `condition` — an `if(...)` guard on the declaration. A boolean
 *   expression (typically produced by `fn.eq`, `fn.and`, etc.) or a
 *   plain `boolean`. Bind it to a `const` to reuse the same predicate
 *   across multiple resources.
 *
 * `existing` is deliberately **not** an option — it is the discriminant of
 * the generated props union (`{ existing?: false } | { existing: true }`)
 * and lives on `props`. Routing it through options too would allow
 * contradictory settings between the two channels.
 *
 * `namingRules` is deliberately **not** an option either — it is
 * per-resource-type metadata declared as a `protected static namingRules`
 * field on each concrete `Resource` subclass and consumed by the base
 * constructor reflectively, so it stays off the user-facing surface.
 *
 */
export interface ResourceOptions {
  readonly condition?: ExpressionOrValue<boolean>;
  readonly dependsOn?: readonly ResourceDeclaration[];
}

/**
 * Shared base for resource declaration implementations.
 *
 * @remarks
 *
 * Both represent one Bicep resource declaration in the component tree and
 * share the same declaration-level state layout: identity fields
 * (`type`, `apiVersion`, `existing`), the `if(...)` guard (`condition`),
 * the optional cross-scope reference (`scope`), and the raw prop bag that
 * becomes the resource body.
 *
 * This class owns the common declaration state layout, raw-handle escape
 * hatch, and identity accessors. Subclasses supply their construction and
 * access behavior.
 */
export abstract class ResourceDeclaration<
  TType extends string = string,
> extends ProvisioningComponent {
  /**
   * Brand marker for cross-realm `isResourceDeclaration()` checks. Uses
   * `Symbol.for` so it survives multiple copies of `@azure/provisioning-core`.
   * Inherited by every resource declaration implementation.
   */
  readonly [RESOURCE_DECLARATION_BRAND] = true as const;

  // Not `readonly`: the ctor writes `this.state = data` once. TypeScript
  // forbids subclass writes to a `readonly` parent field, so the
  // immutability is a runtime contract (never reassigned after ctor)
  // rather than a static one.
  protected state!: ResourceState<TType> & Record<string, unknown>;

  /**
   * Base constructor for every Bicep resource declaration.
   *
   * @remarks
   *
   * Responsibilities:
   * 1. Register in the component tree (`super(context)`).
   * 2. Enforce a deployment context ancestor.
   * 3. Unwrap `context` if it's an indexed proxy from `.at(i)` /
   *    `parent.at(loop.index)`, and stash `parentIndex` on `state` so the
   *    serializer can emit `parent: parentSym[index]` on the child.
   * 4. Inherit `condition` from the immediate parent resource
   *    declaration when the caller doesn't supply one (Bicep requires
   *    children of a conditional resource to share the same guard).
   * 5. Populate `state` — existing arm records only identity fields;
   *    deployable arm runs the naming policy and applies
   *    `DeploymentContext` defaults for `location` / `tags` per the
   *    shape descriptor.
   *
   * Subclasses supply the last mile, including their public handle behavior.
   *
   * @param namingRules - per-resource-type constraints for the naming
   *   policy. `Resource` reads this reflectively off the concrete subclass
   *   constructor; internal declaration implementations receive it from
   *   the concrete resource constructor they represent.
   */
  constructor(
    context: ProvisioningComponent,
    props: ResourceProps<TType> & Record<string, unknown>,
    options?: ResourceOptions,
    namingRules?: ResourceNamingRules,
  ) {
    super(context);

    if (!this.hasDeploymentContext()) {
      throw new Error("Resource declaration must have a parent deployment context.");
    }

    // If `context` is an indexed proxy returned by
    // `LoopedResource.at(i)`, unwrap `this.parent`
    // back to the raw parent so tree walks and symbol-map lookups continue
    // to work, and capture the index so the serializer can emit
    // `parent: parentSym[index]` on this child. The `ProvisioningComponent` constructor
    // already pushed `this` into the correct children array (indexed proxy
    // passes `.children` through to the raw parent's array), so nothing to
    // fix up there.
    //
    // The index is recorded on the child's state (not the parent's) because
    // siblings can have different indices — `new Child(p.at(0), …)` and
    // `new Child(p.at(1), …)` both resolve `.parent` to the same raw parent,
    // so the index that distinguishes them must be per-child.
    const indexRef = (context as unknown as Record<symbol, unknown>)[PROXY_INDEX_REF];
    let parentIndex: unknown = undefined;
    if (indexRef !== undefined) {
      const rawParent = (context as unknown as Record<symbol, unknown>)[INDEXED_PROXY_TARGET] as
        ProvisioningComponent | undefined;
      if (rawParent !== undefined) {
        (this as unknown as { parent: ProvisioningComponent | undefined }).parent = rawParent;
      }
      parentIndex = indexRef;
    }

    // `existing` lives on `props` (it's the discriminant of the generated
    // `{ existing?: false } | { existing: true }` union). `condition` is
    // routed through `options`.
    //
    // Bicep requires a child of a conditional resource to itself be
    // conditional on the same expression. When no explicit `condition` is
    // supplied, inherit the immediate parent resource declaration's
    // condition so the emitted template stays valid — child authoring
    // shouldn't have to redundantly restate the parent's guard.
    const isExisting = props.existing === true;
    const parent = this.parent;
    const inheritedCondition = isResourceDeclaration(parent)
      ? (parent.self as unknown as { state: Record<string, unknown> }).state["condition"]
      : undefined;
    const condition =
      options?.condition ?? (inheritedCondition as ExpressionOrValue<boolean> | undefined);
    const dependsOn = options?.dependsOn;

    let data: ResourceState<TType> & Record<string, unknown>;
    if (isExisting) {
      // Existing arm: only name + optional scope land in state. Any other
      // keys on the props object are ignored — the deserialize path may pass
      // them through, but they're never emitted on an `existing` resource.
      if (props.name === undefined) {
        throw new Error(`Resource ${props.type} marked as 'existing' but no 'name' was provided.`);
      }
      data = {
        name: props.name,
        type: props.type,
        apiVersion: props.apiVersion,
        existing: true,
        scope: props.scope === undefined ? undefined : unwrapExpression(props.scope),
        condition,
        dependsOn,
      };
      if (parentIndex !== undefined) {
        data[STATE_PARENT_INDEX] = parentIndex;
      }
    } else {
      // Deployable arm: name flows through the naming policy; the keys
      // handled explicitly here are stripped from the props bag, and
      // every remaining key is copied verbatim into state as a user-
      // authored property.
      const {
        name: _name,
        type: _type,
        apiVersion: _apiVersion,
        existing: _existing,
        scope: _scope,
        ...userProps
      } = props as ResourceProps<TType> & Record<string, unknown>;
      const ctx = this.deploymentContext;
      data = {
        name: resolveResourceName(
          ctx.namingPolicy ?? namingRequiredPolicy,
          props.name,
          props.type,
          namingRules,
        ),
        type: props.type,
        apiVersion: props.apiVersion,
        condition,
        dependsOn,
        ...userProps,
      };

      if (parentIndex !== undefined) {
        data[STATE_PARENT_INDEX] = parentIndex;
      }

      // Apply DeploymentContext defaults for `location` and `tags`, gated
      // on the shape descriptor declaring those properties as writable.
      // The TypeSpec model is the source of truth: a field marked
      // readonly in the ARM contract (e.g. `location` on most child
      // resources) is server-set, so propagating an inherited value
      // would produce an invalid PUT body. Both fields are user-wins:
      // if the user supplied a value, the inherited value is ignored
      // entirely (no merge for tags either — explicit user tags fully
      // replace inherited tags).
      const shape = getShape(props.type, props.apiVersion, data);
      if (shape !== undefined) {
        const locationShape = shape.byJsName["location"];
        if (
          locationShape !== undefined &&
          locationShape.readOnly !== true &&
          data["location"] === undefined &&
          ctx.location !== undefined
        ) {
          data["location"] = ctx.location;
        }
        const tagsShape = shape.byJsName["tags"];
        if (
          tagsShape !== undefined &&
          tagsShape.readOnly !== true &&
          data["tags"] === undefined &&
          ctx.tags !== undefined &&
          Object.keys(ctx.tags).length > 0
        ) {
          data["tags"] = { ...ctx.tags };
        }
      }
    }

    this.state = data;
  }

  /**
   * Core-internal escape hatch: exposes the raw `state` backing object to
   * the proxy layer (`resource-proxy.ts`) so it can read/unwrap the
   * declaration's data across module boundaries. Keyed by the
   * module-scoped {@link RAW_RESOURCE_HANDLE} symbol, which is **not**
   * exported from `@azure/provisioning-core`, so package consumers can't name it.
   *
   * `protected` (not `private`) because the accessors that read it use
   * `Reflect.get` / structural casts that bypass TS visibility anyway;
   * the modifier just keeps it off the public type surface. It can't be a
   * `#private` field because the proxy layer lives in a different class.
   *
   * @internal
   */
  protected get [RAW_RESOURCE_HANDLE](): ResourceState<TType> & Record<string, unknown> {
    return this.state;
  }

  get type(): TType {
    return this.state.type;
  }

  get apiVersion(): string {
    return this.state.apiVersion;
  }

  get existing(): boolean | undefined {
    return this.state.existing;
  }

  get condition(): ExpressionOrValue<boolean> | undefined {
    return this.state.condition;
  }

  get dependsOn(): readonly ResourceDeclaration[] | undefined {
    return this.state.dependsOn as readonly ResourceDeclaration[] | undefined;
  }

  protected expr<TValue>(...path: readonly PropertySegment[]): Expression<TValue> & TValue {
    return createResourceMemberProxy(
      {
        resource: this as unknown as Resource,
        root: unwrapResourceHandle(this as unknown as Resource) as unknown as Record<
          string,
          unknown
        >,
      },
      path,
    );
  }

  protected setProperty(key: string, value: unknown): void {
    this.state[key] = normalizeAssignedValue(value, this as unknown as Resource);
  }
}

/**
 * Base class for all Azure resources.
 *
 * @remarks
 * Resources are fully initialized at construction time. Pass a parent
 * `ProvisioningComponent` (typically a `Stack` or `ResourceGroup`) as the first
 * argument — the resource registers itself in the tree automatically.
 *
 * Properties use expression-backed proxies: reading `resource.name`
 * returns an `Expression` that compiles to a Bicep symbolic reference,
 * not a plain string. Use `this.expr()` in subclasses to create
 * property getters and `this.setProperty()` for setters.
 *
 * @example
 * ```typescript snippet:ignore
 * import { ResourceGroup } from "@azure/provisioning-core";
 * import { StorageAccount } from "@azure/provisioning-storage";
 *
 * const rg = new ResourceGroup(stack, "eastus");
 * const storage = new StorageAccount(rg, { sku: { name: "Standard_LRS" } });
 *
 * // storage.name is an Expression, not a string
 * // storage.id compiles to resourceId(...)
 * ```
 */
export class Resource<TType extends string = string> extends ResourceDeclaration<TType> {
  /**
   * Brand marker for cross-realm `isResource()` checks.
   * Uses `Symbol.for` so it survives multiple copies of `@azure/provisioning-core`.
   */
  readonly [RESOURCE_BRAND] = true as const;

  /**
   * Register a {@link FlatModelShape} for this resource class's
   * `(resourceType, apiVersion)` pair. Intended to be invoked from a
   * `static {}` initializer in generated subclasses so the registration
   * happens at module load.
   *
   * The static method reads `resourceType` and `apiVersion` off `this`
   * (the subclass that called it), so callers don't repeat the literals.
   */
  static registerShape(
    this: { readonly resourceType: string; readonly apiVersion: string },
    shape: FlatModelShape,
    variantSelector?: FlatVariantSelector,
  ): void {
    registerShapeInRegistry(this.resourceType, this.apiVersion, shape, variantSelector);
  }

  /**
   * Register this class with the global resource registry so the
   * deserializer can reconstruct instances of it (instead of falling
   * back to base `Resource`) for matching `(resourceType, apiVersion)`
   * pairs. Intended to be invoked from a `static {}` initializer in
   * generated classes alongside {@link Resource.registerShape}.
   *
   * Pass an ordered discriminator path for concrete resource variants. A
   * singleton is one segment (`name=signin`); model-discriminated resources
   * may use `kind` or several nested segments. Omit for ordinary resources.
   */
  protected static register(this: ResourceCtor, variantSelector?: FlatVariantSelector): void {
    registerResourceInRegistry(this, variantSelector);
  }

  /**
   * Assemble the base-`Resource` constructor payload (the second `super(...)`
   * argument) from the user-facing props. This is a **static "virtual"**:
   * it runs before an instance exists (to compute the `super` argument), so
   * it can't be an instance method — but it still dispatches through the
   * calling constructor, so a subclass's override wins.
   *
   * Every emitter-generated resource overrides this to inject its fixed
   * identity (`type` / `apiVersion`), the singleton `name`, and its explicit
   * writable-field copy. Both ordinary construction and internal resource
   * reconstruction funnel through this method so prop shaping remains
   * consistent.
   *
   * This base default is the fallback used when the wrapped constructor is
   * base `Resource` itself — the deserialize path for an unregistered
   * `(type, apiVersion)` pair, where `type` / `apiVersion` are threaded in
   * through `props` rather than read off statics. Keeping the default here
   * guarantees the method is always present for internal reconstruction.
   */
  protected static buildResourceProps(
    props?: unknown,
  ): ResourceProps<string> & Record<string, unknown> {
    const p = (props as Record<string, unknown> | undefined) ?? {};
    return {
      ...p,
      type:
        (p["type"] as string | undefined) ??
        (this as unknown as { resourceType?: string }).resourceType,
      apiVersion:
        (p["apiVersion"] as string | undefined) ??
        (this as unknown as { apiVersion?: string }).apiVersion,
    } as ResourceProps<string> & Record<string, unknown>;
  }

  /**
   * Per-resource-type naming constraints, consumed by the active
   * {@link NamingPolicy} when a resource is created without an explicit
   * `name`. Generated CDK subclasses override this with a concrete value;
   * the base default of `undefined` yields `MOST_RESTRICTIVE` behavior.
   *
   * This is type metadata, not user input, so it is kept off the public
   * props surface and read reflectively in the constructor via
   * `this.constructor` rather than being threaded through `ResourceProps`.
   */
  protected static namingRules?: ResourceNamingRules;

  protected _selfProxy: this | undefined;

  constructor(
    context: ProvisioningComponent,
    props: ResourceProps<TType> & Record<string, unknown>,
    options?: ResourceOptions,
  ) {
    super(
      context,
      props,
      options,
      // Naming rules live as a `protected static namingRules` field on
      // each concrete resource subclass, not on the public props bag.
      // Read reflectively off `new.target` (the most-derived class being
      // instantiated) — `this.constructor` would work too but TS forbids
      // touching `this` before `super()`. Static inheritance falls back
      // to `Resource`'s `undefined` default when a subclass omits the
      // field (e.g. singleton children). `resolveResourceName` (called
      // inside `ResourceDeclaration`) treats `undefined` as
      // `MOST_RESTRICTIVE`.
      (new.target as typeof Resource).namingRules,
    );

    const proxy = createResourceProxy(this as this & Resource<TType>);
    this._selfProxy = proxy;

    // Tricky part for the proxy implementation:
    // ProvisioningComponent constructor pushed `this` (bare instance) into parent.children
    // before the proxy existed. Swap it for the proxy so external consumers
    // see proxy-backed handles (with property access, etc.) when iterating.
    const idx = context.children.indexOf(this);
    if (idx >= 0) context.children[idx] = proxy;

    return proxy;
  }

  override get self(): this {
    return this._selfProxy ?? this;
  }

  /**
   * The Azure resource name as a Bicep symbolic-reference expression.
   *
   * The value is established at construction time (either user-supplied
   * via `props.name` or filled in by the naming policy) and stored on
   * `state.name`. The setter routes through `setProperty` so post-
   * construction edits flow through the same proxy/expression machinery
   * as any other property — useful when working with a base `Resource`
   * reference and re-binding the name dynamically. Singleton subclasses
   * override this getter to narrow the return type to the literal
   * `Expression<"<singletonName>">`; non-singleton subclasses inherit
   * this accessor pair as-is.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  get id(): Expression<string> {
    return this.expr("id");
  }
}

// ---------------------------------------------------------------------------
// Loop
// ---------------------------------------------------------------------------

/**
 * Metadata describing a Bicep `[for … in …]` loop and the concrete
 * variable names used inside it. Stored publicly on {@link LoopedResource.loop}
 * once a looped resource declaration has been created.
 */
export interface LoopContext {
  readonly collection: unknown;
  readonly itemVariable: string;
  readonly indexVariable?: string;
  readonly batchSize?: number;
}

/**
 * Options accepted by `new Loop(collection, options?)`. All fields are
 * optional overrides; the constructor supplies defaults. Derived from
 * {@link LoopContext} so there is exactly one source of truth for the
 * shape of loop metadata.
 */
export type LoopOptions = Partial<Omit<LoopContext, "collection">>;

/**
 * Describes a Bicep `[for item in collection: ...]` loop as a plain data
 * object. Construct one and pass it to
 * `Ctor.fromLoop(loop, context, props, options?)` (e.g.
 * `StorageAccount.fromLoop(...)`) to expand a resource declaration into a
 * resource-copy loop.
 *
 * The item and index variable names default to `item` / `i`. Bicep
 * for-expressions bind their loop variables only within their own body,
 * so two sibling `[for item in xs: …]` / `[for item in ys: …]` in the
 * same file do **not** collide — each `item` is scoped to its own
 * expression. If you nest a `Loop` inside another loop's body (rare),
 * pass `{ itemVariable, indexVariable }` explicitly on the inner one to
 * disambiguate. `batchSize` on the loop renders as `@batchSize(n)` on
 * the resource that consumes it.
 *
 * The `indexVariable` name is always materialized on read (never
 * `undefined`), but whether the wire actually **records** it — and
 * therefore whether the renderer emits the `[for (item, i) in …]` tuple
 * binding — is decided by whether anyone accessed `loop.index` (or the
 * caller supplied `{ indexVariable }` explicitly). A loop whose body
 * never mentions an index emits a bare `[for item in xs: …]`.
 *
 * `Loop` instances are pure data — creating one has no side effect.
 */
export class Loop<T> {
  readonly collection: ExpressionOrValue<T[]>;
  readonly itemVariable: string;
  readonly item: Expression<T>;
  readonly batchSize?: number;

  // The default name assigned to `indexVariable` on first materialization,
  // if the caller neither passed `{ indexVariable }` nor accessed `.index`.
  readonly #defaultIndexVariable: string;
  #indexVariable: string | undefined;
  #indexExpr: Expression<number> | undefined;
  #indexRequested = false;

  constructor(collection: ExpressionOrValue<T[]>, options?: LoopOptions) {
    this.collection = collection;

    this.itemVariable = options?.itemVariable ?? "item";
    this.#defaultIndexVariable = "i";

    if (options?.indexVariable !== undefined) {
      // Explicit option counts as a request — the wire and renderer must
      // honor the caller's chosen name whether or not they read `.index`.
      this.#indexVariable = options.indexVariable;
      this.#indexRequested = true;
    }
    if (options?.batchSize !== undefined) {
      this.batchSize = options.batchSize;
    }

    this.item = wrapExpression(symbolicValueExpressionNode(this.itemVariable)) as Expression<T>;
  }

  /**
   * Name of the loop's index variable. Always defined — reading it
   * materializes the default (`i`) if the caller neither passed
   * `{ indexVariable }` nor accessed `.index` yet.
   *
   * Reading `.indexVariable` also marks the index as requested (same as
   * reading `.index`), because a caller who wants the variable name is
   * almost certainly going to use it. If the wire-omit optimization
   * (bare `[for item in …]` with no index binding) matters, callers
   * should gate on `.indexRequested` first before touching this getter.
   */
  get indexVariable(): string {
    this.#indexRequested = true;
    if (this.#indexVariable === undefined) {
      this.#indexVariable = this.#defaultIndexVariable;
    }
    return this.#indexVariable;
  }

  /**
   * Expression referencing the current iteration's index. Reading this the
   * first time marks the index as requested, which causes the wire to
   * include `indexVariable` on the `for-expression` node and the renderer
   * to emit `[for (item, i) in …]`. Callers who never touch `.index` get
   * the cleaner index-less form.
   */
  get index(): Expression<number> {
    this.#indexRequested = true;
    if (this.#indexExpr === undefined) {
      const name = this.indexVariable;
      this.#indexExpr = wrapExpression(symbolicValueExpressionNode(name)) as Expression<number>;
    }
    return this.#indexExpr;
  }

  /**
   * Framework-internal signal used by `Resource.fromLoop` to decide
   * whether the wire should include the index binding. `true` when the
   * caller either supplied `{ indexVariable }` explicitly or has accessed
   * `.index` / `.indexVariable` at least once. Not exported from
   * `@azure/provisioning-core`.
   *
   * @internal
   */
  get indexRequested(): boolean {
    return this.#indexRequested;
  }
}

// ---------------------------------------------------------------------------
// LoopedResource<T> — a Bicep for-expanded resource declaration as a real
// ProvisioningComponent in the tree, sitting alongside scalar `Resource` under the same
// `ResourceDeclaration` base.
// ---------------------------------------------------------------------------

/**
 * A `LoopedResource<T>` represents a single Bicep resource declaration
 * expanded across a loop (`[for x in xs: {...}]`). It is a real
 * `ProvisioningComponent` in the tree — one node per emitted declaration — and
 * exposes indexed access into individual iterations via
 * {@link LoopedResource.at}.
 *
 * @remarks
 *
 * Property access on a `LoopedResource` is deliberately not exposed at
 * the type level: pick an index (`at`) to obtain a proxy that emits
 * `sym[i].prop`. This mirrors Bicep's requirement that individual
 * iterations be accessed by index.
 *
 * `.at(i)` returns the concrete resource type `T`. The returned proxy
 * exposes the essential ARM surface — the property getters/setters that
 * funnel through `this.expr(...)` (`.id`, `.name`, `.sku`,
 * `.properties.*`, …) rooted at `sym[i]` — as well as the child
 * accessors (`keyVault.secrets`, singleton getter/setters), which are
 * derived from the parent's `children` scoped to element `i`. To attach
 * per-iteration children, parent them to `parent.at(loop.index)` — e.g.
 * `Child.fromLoop(loop, parent.at(loop.index), ...)`.
 *
 * Projection over the loop (Bicep `map(sym, x => body)`) is tracked as
 * a follow-up effort — see the "lambda + fn.map" issue.
 */
export class LoopedResource<T extends Resource = Resource> extends ResourceDeclaration<T["type"]> {
  /**
   * Cross-realm brand — same technique as the scalar `RESOURCE_BRAND`.
   * Use {@link isLoopedResource} instead of `instanceof`
   * when multiple copies of `@azure/provisioning-core` may be loaded.
   */
  readonly [LOOPED_RESOURCE_BRAND] = true as const;

  /** Metadata describing the loop that produced this declaration. */
  readonly loop: LoopContext;

  readonly #wrappedCtor: new (
    context: ProvisioningComponent,
    props: unknown,
    options?: ResourceOptions,
  ) => T;

  private constructor(
    context: ProvisioningComponent,
    wrappedCtor: new (
      context: ProvisioningComponent,
      props: unknown,
      options?: ResourceOptions,
    ) => T,
    userProps: unknown,
    loop: Loop<unknown>,
    options?: ResourceOptions,
  ) {
    // The subclass constructor never runs for a looped row — only this
    // shared `ResourceDeclaration` ctor does. To keep the scalar and
    // looped construction paths from drifting, shape the props bag through
    // the SAME static the scalar ctor uses: every `Resource` (sub)class
    // inherits or overrides `buildResourceProps`, which returns the exact
    // `super()` payload the scalar ctor passes — including the fixed `name`
    // for singletons and any other prop shaping. (This is what fixes looped
    // singletons losing their fixed `name`.)
    //
    // It is always present: base `Resource` — the deserialize fallback ctor
    // for an unregistered `(type, apiVersion)` pair — supplies a default
    // that threads `type` / `apiVersion` in from `userProps`. So there's no
    // existence branch here.
    const props = (
      wrappedCtor as unknown as {
        buildResourceProps: (props: unknown) => ResourceProps<T["type"]> & Record<string, unknown>;
      }
    ).buildResourceProps.call(wrappedCtor, userProps);
    super(
      context,
      props,
      options,
      (wrappedCtor as unknown as { namingRules?: ResourceNamingRules }).namingRules,
    );
    this.#wrappedCtor = wrappedCtor;
    // Snapshot the loop metadata at declaration time. `indexVariable` is
    // recorded only if the index was requested by now — either the caller
    // supplied `{ indexVariable }` or read `loop.index` / `loop.indexVariable`
    // before this declaration. Reading `loop.index` (e.g. via
    // `parent.at(loop.index)`) marks the live loop so descendant
    // declarations (which snapshot the same loop afterwards) pick up the
    // binding, while this declaration's own for-expression stays index-less.
    this.loop = {
      collection: loop.collection,
      itemVariable: loop.itemVariable,
      ...(loop.indexRequested ? { indexVariable: loop.indexVariable } : {}),
      ...(loop.batchSize !== undefined ? { batchSize: loop.batchSize } : {}),
    };
  }

  /**
   * The concrete `Resource` subclass this looped declaration wraps.
   * Used by query machinery to answer "which subclass is this looped
   * resource" — the analogue of `instanceof T` for `LoopedResource<T>`.
   *
   * This is always the full subclass the user constructed via
   * `Xxx.fromLoop(...)` — query identity matches on that class, and it is
   * the prototype the `.at(i)` proxy uses to resolve ARM accessors.
   */
  get wrappedCtor(): new (
    context: ProvisioningComponent,
    props: unknown,
    options?: ResourceOptions,
  ) => T {
    return this.#wrappedCtor;
  }

  /**
   * Reference the element at `index`. Emits `sym[index].<...>` for
   * subsequent property access.
   *
   * Returns the concrete resource type `T`. At runtime an indexed proxy is
   * spliced over the full class prototype (`#wrappedCtor.prototype`):
   * prototype getters that funnel through `this.expr(...)` (`.id`, `.name`,
   * `.properties.*`, …) resolve rooted at `sym[index]`. A child created with
   * `parent.at(i)` is stamped with that index for serialization.
   */
  at(index: ExpressionOrValue<number>): T {
    // `this` is a `ResourceDeclaration`; the handle derives the subclass
    // prototype from `this.wrappedCtor`. The explicit type argument pins
    // the return type, which TypeScript can't otherwise resolve from the
    // deferred polymorphic `this`.
    return createIndexedResourceProxy<LoopedResource<T>>(this, index);
  }
}

/** @internal */
export function createLoopedResource<T extends Resource, C extends ProvisioningComponent, P>(
  wrappedCtor: new (context: C, props: P, options?: ResourceOptions) => T,
  loop: Loop<unknown>,
  context: C,
  ...rest: undefined extends P
    ? [props?: P, options?: ResourceOptions]
    : [props: P, options?: ResourceOptions]
): LoopedResource<T> {
  const [userProps, options] = rest as [P?, ResourceOptions?];
  // `LoopedResource`'s ctor is private; access via cast because this module
  // owns both the declaration and its internal construction boundary.
  const LoopedCtor = LoopedResource as unknown as new <U extends Resource>(
    context: ProvisioningComponent,
    wrappedCtor: new (
      context: ProvisioningComponent,
      props: unknown,
      options?: ResourceOptions,
    ) => U,
    userProps: unknown,
    loop: Loop<unknown>,
    options?: ResourceOptions,
  ) => LoopedResource<U>;
  return new LoopedCtor(
    context,
    wrappedCtor as new (
      context: ProvisioningComponent,
      props: unknown,
      options?: ResourceOptions,
    ) => T,
    userProps,
    loop,
    options,
  );
}
