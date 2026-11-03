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
  type ServerTrustGroupPropertiesInput,
  serverTrustGroupPropertiesShape,
  type ServerTrustGroupPropertiesView,
} from "./types.js";

const API_VERSION = "2025-01-01";

export interface ServerTrustGroupProps {
  /**
   * The name of the server trust group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerTrustGroupPropertiesInput | undefined;
}

/**
 * A server trust group.
 */
export class ServerTrustGroup extends Resource<"Microsoft.Sql/locations/serverTrustGroups"> {
  static resourceType = "Microsoft.Sql/locations/serverTrustGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "stg",
    nameSegments: 2,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverTrustGroupPropertiesShape),
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
      (ServerTrustGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/locations/serverTrustGroups"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerTrustGroup.resourceType,
      apiVersion: ServerTrustGroup.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      (ServerTrustGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerTrustGroup.buildResourceProps(props), options);
  }

  /**
   * The name of the server trust group.
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
  get properties(): ServerTrustGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerTrustGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}
