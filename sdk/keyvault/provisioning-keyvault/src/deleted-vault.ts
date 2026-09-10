// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createDeferredShape,
  createFlatModelShape,
  type ExistingResourceProps,
  type Expression,
  type ProvisioningComponent,
  Resource,
  type ResourceNamingRules,
  type ResourceOptions,
  type ResourceProps,
} from "@azure/provisioning-core";
import { type DeletedVaultProperties, DeletedVaultPropertiesShape } from "./types.js";

const API_VERSION = "2026-03-01-preview";

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
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => DeletedVaultPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `DeletedVault.fromLoop(...)`,
   * whose subclass constructor never runs) so both paths apply identical prop
   * shaping — including the fixed singleton `name`.
   *
   * @param props - Existing deleted vault identity.
   */
  protected static buildResourceProps(
    props: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.KeyVault/locations/deletedVaults"> & Record<string, unknown> {
    return {
      ...props,
      type: DeletedVault.resourceType,
      apiVersion: DeletedVault.apiVersion,
      existing: true,
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

  /**
   * Properties of the vault
   */
  get properties(): Expression<DeletedVaultProperties> {
    return this.expr("properties") as any;
  }
}
