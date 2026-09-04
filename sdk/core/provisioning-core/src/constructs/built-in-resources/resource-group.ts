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
import type { ExistingResourceProps } from "../resource/resource.js";
import { Resource } from "../resource/resource.js";
import { createFlatModelShape } from "../../shape/shape.js";

export const resourceGroupNamingRules: ResourceNamingRules = {
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
        name: { armPath: ["name"] },
        location: { armPath: ["location"] },
        tags: { armPath: ["tags"] },
        managedBy: { armPath: ["managedBy"] },
      }),
    );
    this.register();
  }

  constructor(
    context: ProvisioningComponent,
    props:
      (ResourceGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ) {
    super(context, {
      type: ResourceGroup.resourceType,
      apiVersion: ResourceGroup.apiVersion,
      name: props.name,
      existing: props.existing,
      ...(props.existing === true
        ? (props as any)
        : {
            location: props.location,
            tags: props.tags,
            managedBy: props.managedBy,
          }),
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

  /**
   * Create a reference to an existing ResourceGroup (not managed by this stack).
   * Inherited from `Resource.existing` — accepts `{ name, scope? }`.
   */

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
  }

  add<T extends new (context: ProvisioningComponent, ...args: any[]) => ProvisioningComponent>(
    ctor: T,
    ...args: ConstructorParameters<T> extends [any, ...infer Rest] ? Rest : never
  ): InstanceType<T> {
    return new ctor(this.self, ...args) as InstanceType<T>;
  }
}
