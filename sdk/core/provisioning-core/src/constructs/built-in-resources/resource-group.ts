// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProvisioningComponent } from "../provisioning-component.js";
import * as fn from "../../fn.js";
import {
  type Expression,
  type ExpressionOrValue,
  type InputRecord,
} from "../../expression/expressions.js";
import type { ResourceNamingRules } from "../../naming/naming-rules.js";
import { deref } from "../resource/resource-proxy.js";
import type {
  ExistingResourceProps,
  ResourceOptions,
  ResourceProps,
} from "../resource/resource.js";
import { Resource } from "../resource/resource.js";
import { isResourceDeclaration } from "../resource/resource-utils.js";
import { Stack } from "../stack.js";
import { createFlatModelShape, createRecordShape, createStringShape } from "../../shape/shape.js";

const resourceGroupNamingRules: ResourceNamingRules = {
  abbreviation: "rg",
  minLength: 1,
  maxLength: 90,
  validCharacters: {
    uppercase: true,
    hyphens: true,
    underscores: true,
    periods: true,
  },
  scope: "subscription",
};

export interface ResourceGroupProps {
  name?: ExpressionOrValue<string> | undefined;
  location: ExpressionOrValue<string>;
  tags?: Record<string, ExpressionOrValue<string>>;
  managedBy?: ExpressionOrValue<string>;
}

/**
 * An Azure resource group that establishes a deployment boundary.
 *
 * @remarks
 * Resources created with a `ResourceGroup` as their parent inherit its
 * location, tags, and naming policy, and deploy at resource-group scope
 * in the generated Bicep.
 *
 * The parent may be a Stack or an ordinary component, with no resource
 * declarations in its ancestry. New groups require a subscription-scoped Stack.
 * Existing groups may be referenced from other Stack scopes with an appropriate
 * lookup scope.
 *
 * @example
 * ```typescript snippet:ignore
 * import { Stack, ResourceGroup } from "@azure/provisioning-core";
 * import { KeyVault } from "@azure/provisioning-keyvault";
 *
 * const stack = new Stack("my-app");
 * const rg = new ResourceGroup(stack, { location: "eastus" });
 * const vault = new KeyVault(rg, {
 *   properties: { tenantId: "...", sku: { family: "A", name: "standard" } },
 * });
 * ```
 */
export class ResourceGroup extends Resource<"Microsoft.Resources/resourceGroups"> {
  static readonly resourceType = "Microsoft.Resources/resourceGroups" as const;
  static readonly apiVersion = "2024-03-01";

  protected static namingRules = resourceGroupNamingRules;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        location: { armPath: ["location"], value: createStringShape() },
        tags: {
          armPath: ["tags"],
          value: createRecordShape(createStringShape()),
        },
        managedBy: { armPath: ["managedBy"], value: createStringShape() },
      }),
    );
    this.register();
  }

  protected static override validate(
    context: ProvisioningComponent,
    props: ResourceProps<string> & Record<string, unknown>,
    _options?: ResourceOptions,
    _namingRules?: ResourceNamingRules,
  ): void {
    let ancestor: ProvisioningComponent | undefined = context;
    while (ancestor !== undefined && !(ancestor instanceof Stack)) {
      if (isResourceDeclaration(ancestor)) {
        throw new Error(
          "ResourceGroup cannot be nested beneath a resource declaration, directly or through components.",
        );
      }
      ancestor = ancestor.parent;
    }
    if (props.existing !== true) {
      if (!(ancestor instanceof Stack)) {
        throw new Error(
          'A new ResourceGroup requires a containing Stack with targetScope "subscription".',
        );
      }
      if (ancestor.targetScope !== "subscription") {
        throw new Error(
          `A new ResourceGroup requires Stack targetScope "subscription", but Stack "${ancestor.name}" targets "${ancestor.targetScope}".`,
        );
      }
    }
  }

  constructor(
    context: ProvisioningComponent,
    props:
      (ResourceGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ) {
    super(context, {
      ...props,
      type: ResourceGroup.resourceType,
      apiVersion: ResourceGroup.apiVersion,
    });

    this._localDeploymentContext = {
      // Resources inside this RG deploy at RG scope, so the canonical
      // default is the Bicep runtime expression `resourceGroup().location`
      // (i.e. the actual location of whichever RG hosts the deployment).
      // This is correct whether the RG is authored locally or referenced
      // as `existing`.
      location: fn.resourceGroup().location,
      tags: deref(this.tags),
    };
  }

  /** The resource group's location as an expression. */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  get managedBy(): Expression<string> {
    return this.expr("managedBy");
  }
  set managedBy(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("managedBy", value);
  }

  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined {
    return this.state.tags === undefined
      ? undefined
      : (this.expr("tags") as InputRecord<ExpressionOrValue<string>, Record<string, string>>);
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
    this._localDeploymentContext = {
      ...this._localDeploymentContext,
      tags: deref(this.tags),
    };
  }

  add<T extends new (context: ProvisioningComponent, ...args: any[]) => ProvisioningComponent>(
    ctor: T,
    ...args: ConstructorParameters<T> extends [any, ...infer Rest] ? Rest : never
  ): InstanceType<T> {
    return new ctor(this.self, ...args) as InstanceType<T>;
  }
}
