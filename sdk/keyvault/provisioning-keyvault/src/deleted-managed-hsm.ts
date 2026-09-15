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
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import { type DeletedManagedHsmProperties, deletedManagedHsmPropertiesShape } from "./types.js";

const API_VERSION = "2026-03-01-preview";

export interface DeletedManagedHsmProps {
  /**
   * The name of the deleted managed HSM.
   */
  name?: ExpressionOrValue<string> | undefined;
}

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
          target: createDeferredShape(() => deletedManagedHsmPropertiesShape),
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
  ): ResourceProps<"Microsoft.KeyVault/locations/deletedManagedHSMs"> & Record<string, unknown> {
    return {
      type: DeletedManagedHsm.resourceType,
      apiVersion: DeletedManagedHsm.apiVersion,
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
    super(context, DeletedManagedHsm.buildResourceProps(props), options);
  }

  /**
   * The name of the deleted managed HSM.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the deleted managed HSM
   */
  get properties(): Expression<DeletedManagedHsmProperties> {
    return this.expr("properties") as any;
  }
}
