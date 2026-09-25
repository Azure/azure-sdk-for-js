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
  type KeyProperties,
  type KeyPropertiesInput,
  keyPropertiesShape,
  type KeyPropertiesView,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type SecretPropertiesInput,
  secretPropertiesShape,
  type SecretPropertiesView,
  type VaultAccessPolicyPropertiesInput,
  vaultAccessPolicyPropertiesShape,
  type VaultAccessPolicyPropertiesView,
  type VaultPropertiesInput,
  vaultPropertiesShape,
  type VaultPropertiesView,
} from "./types.js";

const API_VERSION = "2026-02-01";

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
  name?: ExpressionOrValue<"add" | "replace" | "remove"> | undefined;
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
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => vaultAccessPolicyPropertiesShape),
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
      (AccessPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/accessPolicies"> & Record<string, unknown> {
    return {
      ...props,
      type: AccessPolicy.resourceType,
      apiVersion: AccessPolicy.apiVersion,
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
  get name(): Expression<"add" | "replace" | "remove"> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<"add" | "replace" | "remove">) {
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
  properties: KeyPropertiesInput;
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
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => keyPropertiesShape),
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
  ): ResourceProps<"Microsoft.KeyVault/vaults/keys/versions"> & Record<string, unknown> {
    return {
      ...props,
      type: Version.resourceType,
      apiVersion: Version.apiVersion,
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
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the key.
   */
  get properties(): Expression<KeyProperties> {
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
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => keyPropertiesShape),
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
    props?: (VaultKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/keys"> & Record<string, unknown> {
    return {
      ...props,
      type: VaultKey.resourceType,
      apiVersion: VaultKey.apiVersion,
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
  get properties(): KeyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: KeyPropertiesInput) {
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
        etag: { armPath: ["etag"], value: createStringShape() },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
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
    props?:
      | (VaultPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: VaultPrivateEndpointConnection.resourceType,
      apiVersion: VaultPrivateEndpointConnection.apiVersion,
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
   * Modified whenever there is a change in the state of private endpoint connection.
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
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => secretPropertiesShape),
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
    props?: (SecretProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults/secrets"> & Record<string, unknown> {
    return {
      ...props,
      type: Secret.resourceType,
      apiVersion: Secret.apiVersion,
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
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => vaultPropertiesShape),
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
    props?: (KeyVaultProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.KeyVault/vaults"> & Record<string, unknown> {
    return {
      ...props,
      type: KeyVault.resourceType,
      apiVersion: KeyVault.apiVersion,
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
