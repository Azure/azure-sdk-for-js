// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ChildResourceCollection,
  createDeferredShape,
  createFlatModelShape,
  type ExistingResourceProps,
  type Expression,
  type ExpressionOrValue,
  type InputRecord,
  type ProvisioningComponent,
  Resource,
  type ResourceNamingRules,
  type ResourceOptions,
  type ResourceProps,
} from "@azure/provisioning-core";
import {
  type KeyVaultManagedHsmKeyPropertiesInput,
  KeyVaultManagedHsmKeyPropertiesShape,
  type KeyVaultManagedHsmKeyPropertiesView,
  type ManagedHsmKeyPropertiesReadonly,
  ManagedHsmKeyPropertiesReadonlyShape,
  type ManagedHsmPropertiesInput,
  ManagedHsmPropertiesShape,
  type ManagedHsmPropertiesView,
  type ManagedHsmSkuInput,
  ManagedHsmSkuShape,
  type ManagedHsmSkuView,
  type ManagedServiceIdentityInput,
  ManagedServiceIdentityShape,
  type ManagedServiceIdentityView,
  type MHSMPrivateEndpointConnectionPropertiesInput,
  MHSMPrivateEndpointConnectionPropertiesShape,
  type MHSMPrivateEndpointConnectionPropertiesView,
} from "./types.js";

const API_VERSION = "2026-03-01-preview";

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

export interface ManagedHSMKeyProps {
  /**
   * The name of the key to be created. The value you provide may be copied globally for the purpose of running the service. The value provided should not include personally identifiable or sensitive information.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the key to be created.
   */
  properties: KeyVaultManagedHsmKeyPropertiesInput;
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
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => ManagedHsmKeyPropertiesReadonlyShape),
          readOnly: true,
        },
        tags: { armPath: ["tags"], readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via
   * `KeyVaultManagedHsmKey.fromLoop(...)`, whose subclass constructor never
   * runs) so both paths apply identical prop shaping — including the fixed
   * singleton `name`.
   *
   * @param props - Existing managed HSM key version identity.
   */
  protected static buildResourceProps(
    props: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs/keys/versions"> & Record<string, unknown> {
    return {
      ...props,
      type: KeyVaultManagedHsmKey.resourceType,
      apiVersion: KeyVaultManagedHsmKey.apiVersion,
      existing: true,
    };
  }

  constructor(
    context: ManagedHSMKey,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, KeyVaultManagedHsmKey.buildResourceProps(props), options);
  }

  /**
   * The name of the key to be created. The value you provide may be copied
   * globally for the purpose of running the service. The value provided should
   * not include personally identifiable or sensitive information.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }

  /**
   * The properties of the key.
   */
  get properties(): Expression<ManagedHsmKeyPropertiesReadonly> {
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
export class ManagedHSMKey extends Resource<"Microsoft.KeyVault/managedHSMs/keys"> {
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
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => KeyVaultManagedHsmKeyPropertiesShape),
        },
        tags: { armPath: ["tags"] },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `ManagedHSMKey.fromLoop(...)`,
   * whose subclass constructor never runs) so both paths apply identical prop
   * shaping — including the fixed singleton `name`.
   *
   * @param {(ManagedHSMKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?:
      (ManagedHSMKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs/keys"> & Record<string, unknown> {
    return {
      type: ManagedHSMKey.resourceType,
      apiVersion: ManagedHSMKey.apiVersion,
      existing: props?.existing,
      ...(props?.existing === true
        ? (props as any)
        : {
            name: props?.name,
            properties: props?.properties,
            tags: props?.tags,
          }),
    };
  }

  constructor(
    context: ManagedHsm,
    props:
      (ManagedHSMKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedHSMKey.buildResourceProps(props), options);
  }

  /**
   * The key resource.
   */
  get keyVaultManagedHsmKeys(): ChildResourceCollection<
    ManagedHSMKey,
    KeyVaultManagedHsmKey,
    ExistingResourceProps & { existing: true }
  > {
    return new ChildResourceCollection<
      ManagedHSMKey,
      KeyVaultManagedHsmKey,
      ExistingResourceProps & { existing: true }
    >(this, KeyVaultManagedHsmKey);
  }

  /**
   * The name of the key to be created. The value you provide may be copied
   * globally for the purpose of running the service. The value provided should
   * not include personally identifiable or sensitive information.
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
  get properties(): KeyVaultManagedHsmKeyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: KeyVaultManagedHsmKeyPropertiesInput) {
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

export interface ManagedHSMPrivateEndpointConnectionProps {
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
  properties?: MHSMPrivateEndpointConnectionPropertiesInput | undefined;
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
export class ManagedHSMPrivateEndpointConnection extends Resource<"Microsoft.KeyVault/managedHSMs/privateEndpointConnections"> {
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
        etag: { armPath: ["etag"] },
        identity: {
          armPath: ["identity"],
          target: createDeferredShape(() => ManagedServiceIdentityShape),
        },
        location: { armPath: ["location"] },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => MHSMPrivateEndpointConnectionPropertiesShape),
        },
        sku: { armPath: ["sku"], target: createDeferredShape(() => ManagedHsmSkuShape) },
        tags: { armPath: ["tags"] },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via
   * `ManagedHSMPrivateEndpointConnection.fromLoop(...)`, whose subclass
   * constructor never runs) so both paths apply identical prop shaping —
   * including the fixed singleton `name`.
   *
   * @param {(ManagedHSMPrivateEndpointConnectionProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?:
      | (ManagedHSMPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      type: ManagedHSMPrivateEndpointConnection.resourceType,
      apiVersion: ManagedHSMPrivateEndpointConnection.apiVersion,
      existing: props?.existing,
      ...(props?.existing === true
        ? (props as any)
        : {
            etag: props?.etag,
            identity: props?.identity,
            location: props?.location,
            name: props?.name,
            properties: props?.properties,
            sku: props?.sku,
            tags: props?.tags,
          }),
    };
  }

  constructor(
    context: ManagedHsm,
    props?:
      | (ManagedHSMPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedHSMPrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * Modified whenever there is a change in the state of private endpoint
   * connection.
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
   * Name of the private endpoint connection associated with the managed hsm
   * pool.
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
  get properties(): MHSMPrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: MHSMPrivateEndpointConnectionPropertiesInput | undefined) {
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
          target: createDeferredShape(() => ManagedServiceIdentityShape),
        },
        location: { armPath: ["location"] },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => ManagedHsmPropertiesShape),
        },
        sku: { armPath: ["sku"], target: createDeferredShape(() => ManagedHsmSkuShape) },
        tags: { armPath: ["tags"] },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `ManagedHsm.fromLoop(...)`, whose
   * subclass constructor never runs) so both paths apply identical prop shaping
   * — including the fixed singleton `name`.
   *
   * @param {(ManagedHsmProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?: (ManagedHsmProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/managedHSMs"> & Record<string, unknown> {
    return {
      type: ManagedHsm.resourceType,
      apiVersion: ManagedHsm.apiVersion,
      existing: props?.existing,
      ...(props?.existing === true
        ? (props as any)
        : {
            identity: props?.identity,
            location: props?.location,
            name: props?.name,
            properties: props?.properties,
            sku: props?.sku,
            tags: props?.tags,
          }),
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
   * The key resource.
   */
  get managedHsmKeys(): ChildResourceCollection<ManagedHsm, ManagedHSMKey, ManagedHSMKeyProps> {
    return new ChildResourceCollection<ManagedHsm, ManagedHSMKey, ManagedHSMKeyProps>(
      this,
      ManagedHSMKey,
    );
  }

  /**
   * Private endpoint connection resource.
   */
  get managedHsmPrivateEndpointConnections(): ChildResourceCollection<
    ManagedHsm,
    ManagedHSMPrivateEndpointConnection,
    ManagedHSMPrivateEndpointConnectionProps
  > {
    return new ChildResourceCollection<
      ManagedHsm,
      ManagedHSMPrivateEndpointConnection,
      ManagedHSMPrivateEndpointConnectionProps
    >(this, ManagedHSMPrivateEndpointConnection);
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
