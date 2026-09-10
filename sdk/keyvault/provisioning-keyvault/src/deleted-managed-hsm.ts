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
import { type DeletedManagedHsmProperties, DeletedManagedHsmPropertiesShape } from "./types.js";

const API_VERSION = "2026-03-01-preview";

/**
 * Concrete proxy resource types can be created by aliasing this type using a specific property type.
 */
export class DeletedManagedHsm extends Resource<"Microsoft.KeyVault/locations/deletedManagedHSMs"> {
  static resourceType = "Microsoft.KeyVault/locations/deletedManagedHSMs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "dmh",
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
          target: createDeferredShape(() => DeletedManagedHsmPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `DeletedManagedHsm.fromLoop(...)`,
   * whose subclass constructor never runs) so both paths apply identical prop
   * shaping — including the fixed singleton `name`.
   *
   * @param props - Existing deleted managed HSM identity.
   */
  protected static buildResourceProps(
    props: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.KeyVault/locations/deletedManagedHSMs"> & Record<string, unknown> {
    return {
      ...props,
      type: DeletedManagedHsm.resourceType,
      apiVersion: DeletedManagedHsm.apiVersion,
      existing: true,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, DeletedManagedHsm.buildResourceProps(props), options);
  }

  /**
   * The name of the deleted managed HSM.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }

  /**
   * Properties of the deleted managed HSM
   */
  get properties(): Expression<DeletedManagedHsmProperties> {
    return this.expr("properties") as any;
  }
}
