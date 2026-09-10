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
  type KeyPropertiesReadonly,
  KeyPropertiesReadonlyShape,
  type KeyVaultKeyPropertiesInput,
  KeyVaultKeyPropertiesShape,
  type KeyVaultKeyPropertiesView,
  type PrivateEndpointConnectionPropertiesInput,
  PrivateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type SecretPropertiesInput,
  SecretPropertiesShape,
  type SecretPropertiesView,
  type VaultAccessPolicyPropertiesInput,
  VaultAccessPolicyPropertiesShape,
  type VaultAccessPolicyPropertiesView,
  type VaultPropertiesInput,
  VaultPropertiesShape,
  type VaultPropertiesView,
} from "./types.js";

const API_VERSION = "2026-03-01-preview";

export interface KeyVaultProps {
  /**
   * The supported Azure location where the key vault should be created.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the vault.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the vault
   */
  properties: VaultPropertiesInput;
  /**
   * The tags that will be assigned to the key vault.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface AccessPolicyProps {
  /**
   * The resource name of the access policy.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the access policy
   */
  properties: VaultAccessPolicyPropertiesInput;
}

/**
 * Parameters for updating the access policy in a vault
 */
export class AccessPolicy extends Resource<"Microsoft.KeyVault/vaults/accessPolicies"> {
  static resourceType = "Microsoft.KeyVault/vaults/accessPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ap",
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
        location: { armPath: ["location"], readOnly: true },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => VaultAccessPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `AccessPolicy.fromLoop(...)`,
   * whose subclass constructor never runs) so both paths apply identical prop
   * shaping — including the fixed singleton `name`.
   *
   * @param {(AccessPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?:
      (AccessPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/accessPolicies"> & Record<string, unknown> {
    return {
      type: AccessPolicy.resourceType,
      apiVersion: AccessPolicy.apiVersion,
      existing: props?.existing,
      ...(props?.existing === true
        ? (props as any)
        : {
            name: props?.name,
            properties: props?.properties,
          }),
    };
  }

  constructor(
    context: KeyVault,
    props:
      (AccessPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, AccessPolicy.buildResourceProps(props), options);
  }

  /**
   * The resource type of the access policy.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The resource name of the access policy.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the access policy
   */
  get properties(): VaultAccessPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: VaultAccessPolicyPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface VaultKeyProps {
  /**
   * The name of the key to be retrieved.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the key to be created.
   */
  properties: KeyVaultKeyPropertiesInput;
  /**
   * The tags that will be assigned to the key.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * The key resource.
 */
export class Version extends Resource<"Microsoft.KeyVault/vaults/keys/versions"> {
  static resourceType = "Microsoft.KeyVault/vaults/keys/versions" as const;
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
        location: { armPath: ["location"], readOnly: true },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => KeyPropertiesReadonlyShape),
          readOnly: true,
        },
        tags: { armPath: ["tags"], readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `Version.fromLoop(...)`, whose
   * subclass constructor never runs) so both paths apply identical prop shaping
   * — including the fixed singleton `name`.
   *
   * @param props - Existing key version identity.
   */
  protected static buildResourceProps(
    props: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.KeyVault/vaults/keys/versions"> & Record<string, unknown> {
    return {
      ...props,
      type: Version.resourceType,
      apiVersion: Version.apiVersion,
      existing: true,
    };
  }

  constructor(
    context: VaultKey,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, Version.buildResourceProps(props), options);
  }

  /**
   * The supported Azure location where the managed HSM Pool should be created.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the key to be retrieved.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }

  /**
   * The properties of the key.
   */
  get properties(): Expression<KeyPropertiesReadonly> {
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
export class VaultKey extends Resource<"Microsoft.KeyVault/vaults/keys"> {
  static resourceType = "Microsoft.KeyVault/vaults/keys" as const;
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
        location: { armPath: ["location"], readOnly: true },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => KeyVaultKeyPropertiesShape),
        },
        tags: { armPath: ["tags"] },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `VaultKey.fromLoop(...)`, whose
   * subclass constructor never runs) so both paths apply identical prop shaping
   * — including the fixed singleton `name`.
   *
   * @param {(VaultKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?: (VaultKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/keys"> & Record<string, unknown> {
    return {
      type: VaultKey.resourceType,
      apiVersion: VaultKey.apiVersion,
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
    context: KeyVault,
    props: (VaultKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, VaultKey.buildResourceProps(props), options);
  }

  /**
   * The key resource.
   */
  get versions(): ChildResourceCollection<
    VaultKey,
    Version,
    ExistingResourceProps & { existing: true }
  > {
    return new ChildResourceCollection<
      VaultKey,
      Version,
      ExistingResourceProps & { existing: true }
    >(this, Version);
  }

  /**
   * The supported Azure location where the managed HSM Pool should be created.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the key to be retrieved.
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
  get properties(): KeyVaultKeyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: KeyVaultKeyPropertiesInput) {
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

export interface VaultPrivateEndpointConnectionProps {
  /**
   * Modified whenever there is a change in the state of private endpoint connection.
   */
  etag?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the private endpoint connection associated with the key vault.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * Private endpoint connection resource.
 */
export class VaultPrivateEndpointConnection extends Resource<"Microsoft.KeyVault/vaults/privateEndpointConnections"> {
  static resourceType = "Microsoft.KeyVault/vaults/privateEndpointConnections" as const;
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
        location: { armPath: ["location"], readOnly: true },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => PrivateEndpointConnectionPropertiesShape),
        },
        tags: { armPath: ["tags"], readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via
   * `VaultPrivateEndpointConnection.fromLoop(...)`, whose subclass constructor
   * never runs) so both paths apply identical prop shaping — including the
   * fixed singleton `name`.
   *
   * @param {(VaultPrivateEndpointConnectionProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?:
      | (VaultPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      type: VaultPrivateEndpointConnection.resourceType,
      apiVersion: VaultPrivateEndpointConnection.apiVersion,
      existing: props?.existing,
      ...(props?.existing === true
        ? (props as any)
        : {
            etag: props?.etag,
            name: props?.name,
            properties: props?.properties,
          }),
    };
  }

  constructor(
    context: KeyVault,
    props?:
      | (VaultPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, VaultPrivateEndpointConnection.buildResourceProps(props), options);
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
   * Azure location of the key vault resource.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * Name of the private endpoint connection associated with the key vault.
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
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Tags assigned to the key vault resource.
   */
  get tags(): Expression<Record<string, string>> {
    return this.expr("tags");
  }
}

export interface SecretProps {
  /**
   * The name of the secret.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the secret
   */
  properties: SecretPropertiesInput;
  /**
   * The tags that will be assigned to the secret.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Resource information with extended details.
 */
export class Secret extends Resource<"Microsoft.KeyVault/vaults/secrets"> {
  static resourceType = "Microsoft.KeyVault/vaults/secrets" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
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
        location: { armPath: ["location"], readOnly: true },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => SecretPropertiesShape),
        },
        tags: { armPath: ["tags"] },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `Secret.fromLoop(...)`, whose
   * subclass constructor never runs) so both paths apply identical prop shaping
   * — including the fixed singleton `name`.
   *
   * @param {(SecretProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?: (SecretProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/secrets"> & Record<string, unknown> {
    return {
      type: Secret.resourceType,
      apiVersion: Secret.apiVersion,
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
    context: KeyVault,
    props: (SecretProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Secret.buildResourceProps(props), options);
  }

  /**
   * Azure location of the key vault resource.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the secret.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the secret
   */
  get properties(): SecretPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SecretPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * The tags that will be assigned to the secret.
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
export class KeyVault extends Resource<"Microsoft.KeyVault/vaults"> {
  static resourceType = "Microsoft.KeyVault/vaults" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "kv",
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
        location: { armPath: ["location"] },
        name: { armPath: ["name"] },
        properties: {
          armPath: ["properties"],
          target: createDeferredShape(() => VaultPropertiesShape),
        },
        tags: { armPath: ["tags"] },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Shared by the scalar
   * constructor and by `LoopedResource` (via `KeyVault.fromLoop(...)`, whose
   * subclass constructor never runs) so both paths apply identical prop shaping
   * — including the fixed singleton `name`.
   *
   * @param {(KeyVaultProps & { existing?: false }) | (ExistingResourceProps & { existing: true })} [props]
   */
  protected static buildResourceProps(
    props?: (KeyVaultProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults"> & Record<string, unknown> {
    return {
      type: KeyVault.resourceType,
      apiVersion: KeyVault.apiVersion,
      existing: props?.existing,
      ...(props?.existing === true
        ? (props as any)
        : {
            location: props?.location,
            name: props?.name,
            properties: props?.properties,
            tags: props?.tags,
          }),
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: (KeyVaultProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, KeyVault.buildResourceProps(props), options);
  }

  /**
   * Parameters for updating the access policy in a vault
   */
  get accessPolicies(): ChildResourceCollection<KeyVault, AccessPolicy, AccessPolicyProps> {
    return new ChildResourceCollection<KeyVault, AccessPolicy, AccessPolicyProps>(
      this,
      AccessPolicy,
    );
  }

  /**
   * The key resource.
   */
  get vaultKeys(): ChildResourceCollection<KeyVault, VaultKey, VaultKeyProps> {
    return new ChildResourceCollection<KeyVault, VaultKey, VaultKeyProps>(this, VaultKey);
  }

  /**
   * Private endpoint connection resource.
   */
  get vaultPrivateEndpointConnections(): ChildResourceCollection<
    KeyVault,
    VaultPrivateEndpointConnection,
    VaultPrivateEndpointConnectionProps
  > {
    return new ChildResourceCollection<
      KeyVault,
      VaultPrivateEndpointConnection,
      VaultPrivateEndpointConnectionProps
    >(this, VaultPrivateEndpointConnection);
  }

  /**
   * Resource information with extended details.
   */
  get secrets(): ChildResourceCollection<KeyVault, Secret, SecretProps> {
    return new ChildResourceCollection<KeyVault, Secret, SecretProps>(this, Secret);
  }

  /**
   * The supported Azure location where the key vault should be created.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
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
  get properties(): VaultPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: VaultPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * The tags that will be assigned to the key vault.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
