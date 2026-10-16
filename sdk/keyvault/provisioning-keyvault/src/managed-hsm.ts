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
  type ManagedHsmKeyProperties,
  type ManagedHsmKeyPropertiesInput,
  managedHsmKeyPropertiesShape,
  type ManagedHsmKeyPropertiesView,
  type ManagedHsmPropertiesInput,
  managedHsmPropertiesShape,
  type ManagedHsmPropertiesView,
  type ManagedHsmSkuInput,
  managedHsmSkuShape,
  type ManagedHsmSkuView,
  type ManagedServiceIdentityInput,
  managedServiceIdentityShape,
  type ManagedServiceIdentityView,
  type MhsmPrivateEndpointConnectionPropertiesInput,
  mhsmPrivateEndpointConnectionPropertiesShape,
  type MhsmPrivateEndpointConnectionPropertiesView,
} from "./types.js";

const API_VERSION = "2026-02-01";

export interface ManagedHsmProps {
  /**
   * Managed service identity
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the managed HSM Pool.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the managed HSM
   */
  properties?: ManagedHsmPropertiesInput | undefined;
  /**
   * SKU details
   */
  sku?: ManagedHsmSkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ManagedHsmKeyProps {
  /**
   * The name of the key to be created. The value you provide may be copied globally for the purpose of running the service. The value provided should not include personally identifiable or sensitive information.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the key to be created.
   */
  properties: ManagedHsmKeyPropertiesInput;
  /**
   * The tags that will be assigned to the key.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * The key resource.
 */
export class KeyVaultManagedHsmKey extends Resource<"Microsoft.KeyVault/managedHSMs/keys/versions"> {
  static resourceType = "Microsoft.KeyVault/managedHSMs/keys/versions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "v",
    minLength: 1,
    maxLength: 24,
    validCharacters: {
      uppercase: true,
      hyphens: false,
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
          value: createDeferredShape(() => managedHsmKeyPropertiesShape),
          readOnly: true,
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()), readOnly: true },
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
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs/keys/versions"> & Record<string, unknown> {
    return {
      ...props,
      type: KeyVaultManagedHsmKey.resourceType,
      apiVersion: KeyVaultManagedHsmKey.apiVersion,
    };
  }

  constructor(
    context: ManagedHsmKey,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, KeyVaultManagedHsmKey.buildResourceProps(props), options);
  }

  /**
   * The name of the key to be created. The value you provide may be copied globally for the purpose
   * of running the service. The value provided should not include personally identifiable or
   * sensitive information.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the key.
   */
  get properties(): Expression<ManagedHsmKeyProperties> {
    return this.expr("properties") as any;
  }

  /**
   * Resource tags
   */
  get tags(): Expression<Record<string, string>> {
    return this.expr("tags");
  }
}

/**
 * The key resource.
 */
export class ManagedHsmKey extends Resource<"Microsoft.KeyVault/managedHSMs/keys"> {
  static resourceType = "Microsoft.KeyVault/managedHSMs/keys" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "k",
    minLength: 1,
    maxLength: 24,
    validCharacters: {
      uppercase: true,
      hyphens: false,
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
          value: createDeferredShape(() => managedHsmKeyPropertiesShape),
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
    props?:
      (ManagedHsmKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs/keys"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedHsmKey.resourceType,
      apiVersion: ManagedHsmKey.apiVersion,
    };
  }

  constructor(
    context: ManagedHsm,
    props:
      (ManagedHsmKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedHsmKey.buildResourceProps(props), options);
  }

  /**
   * The name of the key to be created. The value you provide may be copied globally for the purpose
   * of running the service. The value provided should not include personally identifiable or
   * sensitive information.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the key to be created.
   */
  get properties(): ManagedHsmKeyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedHsmKeyPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * The tags that will be assigned to the key.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface ManagedHsmPrivateEndpointConnectionProps {
  /**
   * Modified whenever there is a change in the state of private endpoint connection.
   */
  etag?: ExpressionOrValue<string> | undefined;
  /**
   * Managed service identity
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the private endpoint connection associated with the managed hsm pool.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: MhsmPrivateEndpointConnectionPropertiesInput | undefined;
  /**
   * SKU details
   */
  sku?: ManagedHsmSkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Private endpoint connection resource.
 */
export class ManagedHsmPrivateEndpointConnection extends Resource<"Microsoft.KeyVault/managedHSMs/privateEndpointConnections"> {
  static resourceType = "Microsoft.KeyVault/managedHSMs/privateEndpointConnections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "pec",
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
        etag: { armPath: ["etag"], value: createStringShape() },
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => mhsmPrivateEndpointConnectionPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => managedHsmSkuShape) },
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
    props?:
      | (ManagedHsmPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedHsmPrivateEndpointConnection.resourceType,
      apiVersion: ManagedHsmPrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: ManagedHsm,
    props?:
      | (ManagedHsmPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedHsmPrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * Modified whenever there is a change in the state of private endpoint connection.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }
  set etag(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("etag", value);
  }

  /**
   * Managed service identity
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Name of the private endpoint connection associated with the managed hsm pool.
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
  get properties(): MhsmPrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: MhsmPrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * SKU details
   */
  get sku(): ManagedHsmSkuView {
    return this.expr("sku") as any;
  }
  set sku(value: ManagedHsmSkuInput | undefined) {
    this.setProperty("sku", value);
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

/**
 * Resource information with extended details.
 */
export class ManagedHsm extends Resource<"Microsoft.KeyVault/managedHSMs"> {
  static resourceType = "Microsoft.KeyVault/managedHSMs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mhsm",
    minLength: 3,
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
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedHsmPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => managedHsmSkuShape) },
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
    props?: (ManagedHsmProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedHsm.resourceType,
      apiVersion: ManagedHsm.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (ManagedHsmProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedHsm.buildResourceProps(props), options);
  }

  /**
   * Managed service identity
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * The name of the managed HSM Pool.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the managed HSM
   */
  get properties(): ManagedHsmPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedHsmPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * SKU details
   */
  get sku(): ManagedHsmSkuView {
    return this.expr("sku") as any;
  }
  set sku(value: ManagedHsmSkuInput | undefined) {
    this.setProperty("sku", value);
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
