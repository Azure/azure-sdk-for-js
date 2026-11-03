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
  type ClusterResourcePropertiesInput,
  clusterResourcePropertiesShape,
  type ClusterResourcePropertiesView,
  type DataCenterResourcePropertiesInput,
  dataCenterResourcePropertiesShape,
  type DataCenterResourcePropertiesView,
  type ManagedCassandraManagedServiceIdentityInput,
  managedCassandraManagedServiceIdentityShape,
  type ManagedCassandraManagedServiceIdentityView,
} from "./types.js";

const API_VERSION = "2026-03-15";

export interface ClusterResourceProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedCassandraManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Managed Cassandra cluster name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of a managed Cassandra cluster.
   */
  properties?: ClusterResourcePropertiesInput | undefined;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface DataCenterProps {
  /**
   * Data center name in a managed Cassandra cluster.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of a managed Cassandra data center.
   */
  properties?: DataCenterResourcePropertiesInput | undefined;
}

/**
 * A managed Cassandra data center.
 */
export class DataCenter extends Resource<"Microsoft.DocumentDB/cassandraClusters/dataCenters"> {
  static resourceType = "Microsoft.DocumentDB/cassandraClusters/dataCenters" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "dc",
    minLength: 1,
    maxLength: 100,
    pattern: {
      regex: "^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => dataCenterResourcePropertiesShape),
        },
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
    props?: (DataCenterProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/cassandraClusters/dataCenters"> & Record<string, unknown> {
    return {
      ...props,
      type: DataCenter.resourceType,
      apiVersion: DataCenter.apiVersion,
    };
  }

  constructor(
    context: ClusterResource,
    props?: (DataCenterProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DataCenter.buildResourceProps(props), options);
  }

  /**
   * Data center name in a managed Cassandra cluster.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of a managed Cassandra data center.
   */
  get properties(): DataCenterResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DataCenterResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Representation of a managed Cassandra cluster.
 */
export class ClusterResource extends Resource<"Microsoft.DocumentDB/cassandraClusters"> {
  static resourceType = "Microsoft.DocumentDB/cassandraClusters" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cc",
    minLength: 1,
    maxLength: 100,
    pattern: {
      regex: "^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedCassandraManagedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => clusterResourcePropertiesShape),
        },
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
    props?:
      (ClusterResourceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/cassandraClusters"> & Record<string, unknown> {
    return {
      ...props,
      type: ClusterResource.resourceType,
      apiVersion: ClusterResource.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      (ClusterResourceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ClusterResource.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedCassandraManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedCassandraManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Managed Cassandra cluster name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of a managed Cassandra cluster.
   */
  get properties(): ClusterResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ClusterResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include
   * \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
