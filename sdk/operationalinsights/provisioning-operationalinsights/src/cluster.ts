// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type ExistingResourceProps,
  type Expression,
  type ExpressionOrValue,
  type ProvisioningComponent,
  Resource,
  type ResourceOptions,
} from "@azure/provisioning-core";
import {
  createDeferredShape,
  createFlatModelShape,
  createRecordShape,
  createStringShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type ClusterPropertiesInput,
  clusterPropertiesShape,
  type ClusterPropertiesView,
  type ClusterSkuInput,
  clusterSkuShape,
  type ClusterSkuView,
  type ManagedServiceIdentityInput,
  managedServiceIdentityShape,
  type ManagedServiceIdentityView,
} from "./types.js";

const API_VERSION = "2026-03-01";

export interface ClusterProps {
  /**
   * The managed service identities assigned to this resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Log Analytics Cluster.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Log Analytics cluster properties.
   */
  properties?: ClusterPropertiesInput | undefined;
  /**
   * The sku properties.
   */
  sku?: ClusterSkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * The top level Log Analytics cluster resource container.
 */
export class Cluster extends Resource<"Microsoft.OperationalInsights/clusters"> {
  static resourceType = "Microsoft.OperationalInsights/clusters" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    pattern: {
      regex: "",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => clusterPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => clusterSkuShape) },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (ClusterProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/clusters"> & Record<string, unknown> {
    return {
      ...props,
      type: Cluster.resourceType,
      apiVersion: Cluster.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (ClusterProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Cluster.buildResourceProps(props), options);
  }

  /**
   * The managed service identities assigned to this resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * Name of the Log Analytics Cluster.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Log Analytics cluster properties.
   */
  get properties(): ClusterPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ClusterPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The sku properties.
   */
  get sku(): ClusterSkuView {
    return this.expr("sku") as any;
  }
  set sku(value: ClusterSkuInput | undefined) {
    this.setProperty("sku", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
