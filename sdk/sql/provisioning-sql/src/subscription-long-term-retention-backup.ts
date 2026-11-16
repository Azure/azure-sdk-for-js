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
  type LongTermRetentionBackupProperties,
  longTermRetentionBackupPropertiesShape,
} from "./types.js";

const API_VERSION = "2025-01-01";

/**
 * A long term retention backup.
 */
export class SubscriptionLongTermRetentionBackup extends Resource<"Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups"> {
  static resourceType =
    "Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ltrb",
    nameSegments: 4,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => longTermRetentionBackupPropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/locations/longTermRetentionServers/longTermRetentionDatabases/longTermRetentionBackups"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SubscriptionLongTermRetentionBackup.resourceType,
      apiVersion: SubscriptionLongTermRetentionBackup.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SubscriptionLongTermRetentionBackup.buildResourceProps(props), options);
  }

  /**
   * The backup name.
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
  get properties(): Expression<LongTermRetentionBackupProperties> {
    return this.expr("properties") as any;
  }
}
