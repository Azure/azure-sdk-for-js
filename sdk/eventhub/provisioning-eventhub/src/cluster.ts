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
} from "./types.js";

const API_VERSION = "2026-01-01";

export interface ClusterProps {
  /**
   * Resource location.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Event Hubs Cluster.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Event Hubs Cluster properties supplied in responses in List or Get operations.
   */
  properties?: ClusterPropertiesInput | undefined;
  /**
   * Properties of the cluster SKU.
   */
  sku?: ClusterSkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Single Event Hubs Cluster resource in List or Get operations.
 */
export class Cluster extends Resource<"Microsoft.EventHub/clusters"> {
  static resourceType = "Microsoft.EventHub/clusters" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    minLength: 6,
    maxLength: 50,
    pattern: {
      regex: "",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
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
  ): ResourceProps<"Microsoft.EventHub/clusters"> & Record<string, unknown> {
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
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * The name of the Event Hubs Cluster.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Event Hubs Cluster properties supplied in responses in List or Get operations.
   */
  get properties(): ClusterPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ClusterPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Properties of the cluster SKU.
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
