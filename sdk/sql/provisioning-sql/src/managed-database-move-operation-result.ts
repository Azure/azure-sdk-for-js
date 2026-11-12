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
  type ManagedDatabaseMoveOperationResultProperties,
  managedDatabaseMoveOperationResultPropertiesShape,
} from "./types.js";

const API_VERSION = "2025-01-01";

/**
 * A managed database move operation.
 */
export class ManagedDatabaseMoveOperationResult extends Resource<"Microsoft.Sql/locations/managedDatabaseMoveOperationResults"> {
  static resourceType = "Microsoft.Sql/locations/managedDatabaseMoveOperationResults" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mdmor",
    nameSegments: 2,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedDatabaseMoveOperationResultPropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/locations/managedDatabaseMoveOperationResults"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseMoveOperationResult.resourceType,
      apiVersion: ManagedDatabaseMoveOperationResult.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseMoveOperationResult.buildResourceProps(props), options);
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
  get properties(): Expression<ManagedDatabaseMoveOperationResultProperties> {
    return this.expr("properties") as any;
  }
}
