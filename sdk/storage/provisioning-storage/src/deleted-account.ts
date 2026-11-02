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
import { type DeletedAccountProperties, deletedAccountPropertiesShape } from "./types.js";

const API_VERSION = "2026-04-01";

/**
 * Deleted storage account
 */
export class DeletedAccount extends Resource<"Microsoft.Storage/locations/deletedAccounts"> {
  static resourceType = "Microsoft.Storage/locations/deletedAccounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "da",
    minLength: 3,
    maxLength: 24,
    pattern: {
      regex: "",
    },
    nameSegments: 2,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => deletedAccountPropertiesShape),
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
  ): ResourceProps<"Microsoft.Storage/locations/deletedAccounts"> & Record<string, unknown> {
    return {
      ...props,
      type: DeletedAccount.resourceType,
      apiVersion: DeletedAccount.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, DeletedAccount.buildResourceProps(props), options);
  }

  /**
   * Name of the deleted storage account.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the deleted account.
   */
  get properties(): Expression<DeletedAccountProperties> {
    return this.expr("properties") as any;
  }
}
