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
  type LocationProperties,
  locationPropertiesShape,
  type RestorableDatabaseAccountProperties,
  restorableDatabaseAccountPropertiesShape,
} from "./types.js";

const API_VERSION = "2026-03-15";

/**
 * A Azure Cosmos DB restorable database account.
 */
export class RestorableDatabaseAccount extends Resource<"Microsoft.DocumentDB/locations/restorableDatabaseAccounts"> {
  static resourceType = "Microsoft.DocumentDB/locations/restorableDatabaseAccounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rda",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => restorableDatabaseAccountPropertiesShape),
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
  ): ResourceProps<"Microsoft.DocumentDB/locations/restorableDatabaseAccounts"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RestorableDatabaseAccount.resourceType,
      apiVersion: RestorableDatabaseAccount.apiVersion,
    };
  }

  constructor(
    context: Location,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RestorableDatabaseAccount.buildResourceProps(props), options);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The instanceId GUID of a restorable database account.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of a restorable database account.
   */
  get properties(): Expression<RestorableDatabaseAccountProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * Cosmos DB location get result
 */
export class Location extends Resource<"Microsoft.DocumentDB/locations"> {
  static resourceType = "Microsoft.DocumentDB/locations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "l",
    pattern: {
      regex: "",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => locationPropertiesShape),
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
  ): ResourceProps<"Microsoft.DocumentDB/locations"> & Record<string, unknown> {
    return {
      ...props,
      type: Location.resourceType,
      apiVersion: Location.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, Location.buildResourceProps(props), options);
  }

  /**
   * Cosmos DB region, with spaces between words and each word capitalized.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Cosmos DB location metadata
   */
  get properties(): Expression<LocationProperties> {
    return this.expr("properties") as any;
  }
}
