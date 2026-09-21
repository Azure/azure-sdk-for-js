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
import { type DeletedVaultProperties, deletedVaultPropertiesShape } from "./types.js";

const API_VERSION = "2026-02-01";

export interface DeletedVaultProps {
  /**
   * The name of the vault.
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * Deleted vault information with extended details.
 */
export class DeletedVault extends Resource<"Microsoft.KeyVault/locations/deletedVaults"> {
  static resourceType = "Microsoft.KeyVault/locations/deletedVaults" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "dv",
    minLength: 1,
    maxLength: 24,
    validCharacters: {
      uppercase: true,
      hyphens: true,
      underscores: false,
      periods: false,
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => deletedVaultPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by ordinary construction and internal
   * resource reconstruction so both paths apply identical prop shaping, including the fixed
   * singleton `name`.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.KeyVault/locations/deletedVaults"> & Record<string, unknown> {
    return {
      type: DeletedVault.resourceType,
      apiVersion: DeletedVault.apiVersion,
      existing: props?.existing,
      ...(props?.existing === true
        ? (props as any)
        : {
            name: props?.name,
          }),
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, DeletedVault.buildResourceProps(props), options);
  }

  /**
   * The name of the vault.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the vault
   */
  get properties(): Expression<DeletedVaultProperties> {
    return this.expr("properties") as any;
  }
}
