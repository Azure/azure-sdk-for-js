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
  createStringShape,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type InstanceFailoverGroupPropertiesInput,
  instanceFailoverGroupPropertiesShape,
  type InstanceFailoverGroupPropertiesView,
} from "./types.js";

const API_VERSION = "2025-01-01";

export interface InstanceFailoverGroupProps {
  /**
   * The name of the failover group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: InstanceFailoverGroupPropertiesInput | undefined;
}

/**
 * An instance failover group.
 */
export class InstanceFailoverGroup extends Resource<"Microsoft.Sql/locations/instanceFailoverGroups"> {
  static resourceType = "Microsoft.Sql/locations/instanceFailoverGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ifg",
    nameSegments: 2,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => instanceFailoverGroupPropertiesShape),
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
    props?:
      | (InstanceFailoverGroupProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/locations/instanceFailoverGroups"> & Record<string, unknown> {
    return {
      ...props,
      type: InstanceFailoverGroup.resourceType,
      apiVersion: InstanceFailoverGroup.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      | (InstanceFailoverGroupProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, InstanceFailoverGroup.buildResourceProps(props), options);
  }

  /**
   * The name of the failover group.
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
  get properties(): InstanceFailoverGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: InstanceFailoverGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}
