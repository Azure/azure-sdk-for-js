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
  type InstancePoolOperationProperties,
  instancePoolOperationPropertiesShape,
  type InstancePoolPropertiesInput,
  instancePoolPropertiesShape,
  type InstancePoolPropertiesView,
  type SkuInput,
  skuShape,
  type SkuView,
} from "./types.js";

const API_VERSION = "2025-01-01";

export interface InstancePoolProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the instance pool to be retrieved.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: InstancePoolPropertiesInput | undefined;
  /**
   * The name and tier of the SKU.
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * A instance pool operation.
 */
export class InstancePoolOperation extends Resource<"Microsoft.Sql/instancePools/operations"> {
  static resourceType = "Microsoft.Sql/instancePools/operations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "o",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => instancePoolOperationPropertiesShape),
          readOnly: true,
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
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/instancePools/operations"> & Record<string, unknown> {
    return {
      ...props,
      type: InstancePoolOperation.resourceType,
      apiVersion: InstancePoolOperation.apiVersion,
    };
  }

  constructor(
    context: InstancePool,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, InstancePoolOperation.buildResourceProps(props), options);
  }

  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<InstancePoolOperationProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * An Azure SQL instance pool.
 */
export class InstancePool extends Resource<"Microsoft.Sql/instancePools"> {
  static resourceType = "Microsoft.Sql/instancePools" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ip",
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
          value: createDeferredShape(() => instancePoolPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
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
      (InstancePoolProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/instancePools"> & Record<string, unknown> {
    return {
      ...props,
      type: InstancePool.resourceType,
      apiVersion: InstancePool.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      (InstancePoolProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, InstancePool.buildResourceProps(props), options);
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
   * The name of the instance pool to be retrieved.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): InstancePoolPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: InstancePoolPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The name and tier of the SKU.
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput | undefined) {
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
