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
  createRecordShape,
  createStringShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type FleetResourcePropertiesInput,
  fleetResourcePropertiesShape,
  type FleetResourcePropertiesView,
  type FleetspaceAccountPropertiesInput,
  fleetspaceAccountPropertiesShape,
  type FleetspaceAccountPropertiesView,
  type FleetspacePropertiesInput,
  fleetspacePropertiesShape,
  type FleetspacePropertiesView,
} from "./types.js";

const API_VERSION = "2026-03-15";

export interface FleetProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB fleet name. Needs to be unique under a subscription.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB fleet resource.
   */
  properties?: FleetResourcePropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface FleetspaceProps {
  /**
   * Cosmos DB fleetspace name. Needs to be unique under a fleet.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB Fleetspace.
   */
  properties?: FleetspacePropertiesInput | undefined;
}

export interface FleetspaceAccountProps {
  /**
   * Cosmos DB fleetspace account name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * An Azure Cosmos DB Global Database Account which is part of a Fleetspace Account.
   */
  properties?: FleetspaceAccountPropertiesInput | undefined;
}

/**
 * An Azure Cosmos DB Fleetspace Account
 */
export class FleetspaceAccount extends Resource<"Microsoft.DocumentDB/fleets/fleetspaces/fleetspaceAccounts"> {
  static resourceType = "Microsoft.DocumentDB/fleets/fleetspaces/fleetspaceAccounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "fa",
    minLength: 3,
    maxLength: 50,
    pattern: {
      regex: "^[a-z0-9]+(-[a-z0-9]+)*",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => fleetspaceAccountPropertiesShape),
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
      | (FleetspaceAccountProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/fleets/fleetspaces/fleetspaceAccounts"> &
    Record<string, unknown> {
    return {
      ...props,
      type: FleetspaceAccount.resourceType,
      apiVersion: FleetspaceAccount.apiVersion,
    };
  }

  constructor(
    context: Fleetspace,
    props?:
      | (FleetspaceAccountProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, FleetspaceAccount.buildResourceProps(props), options);
  }

  /**
   * Cosmos DB fleetspace account name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * An Azure Cosmos DB Global Database Account which is part of a Fleetspace Account.
   */
  get properties(): FleetspaceAccountPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: FleetspaceAccountPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * An Azure Cosmos DB Fleetspace.
 */
export class Fleetspace extends Resource<"Microsoft.DocumentDB/fleets/fleetspaces"> {
  static resourceType = "Microsoft.DocumentDB/fleets/fleetspaces" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "f",
    minLength: 3,
    maxLength: 50,
    pattern: {
      regex: "^[a-z0-9]+(-[a-z0-9]+)*",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => fleetspacePropertiesShape),
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
    props?: (FleetspaceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/fleets/fleetspaces"> & Record<string, unknown> {
    return {
      ...props,
      type: Fleetspace.resourceType,
      apiVersion: Fleetspace.apiVersion,
    };
  }

  constructor(
    context: Fleet,
    props?: (FleetspaceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Fleetspace.buildResourceProps(props), options);
  }

  /**
   * Cosmos DB fleetspace name. Needs to be unique under a fleet.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to update Azure Cosmos DB Fleetspace.
   */
  get properties(): FleetspacePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: FleetspacePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * An Azure Cosmos DB FleetResource.
 */
export class Fleet extends Resource<"Microsoft.DocumentDB/fleets"> {
  static resourceType = "Microsoft.DocumentDB/fleets" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "f",
    minLength: 3,
    maxLength: 50,
    pattern: {
      regex: "^[a-z0-9]+(-[a-z0-9]+)*",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => fleetResourcePropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
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
    props?: (FleetProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/fleets"> & Record<string, unknown> {
    return {
      ...props,
      type: Fleet.resourceType,
      apiVersion: Fleet.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (FleetProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Fleet.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB fleet name. Needs to be unique under a subscription.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to update Azure Cosmos DB fleet resource.
   */
  get properties(): FleetResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: FleetResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
