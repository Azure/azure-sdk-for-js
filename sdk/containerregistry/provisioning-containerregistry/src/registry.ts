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
  type CacheRulePropertiesInput,
  cacheRulePropertiesShape,
  type CacheRulePropertiesView,
  type ConnectedRegistryPropertiesInput,
  connectedRegistryPropertiesShape,
  type ConnectedRegistryPropertiesView,
  type CredentialSetPropertiesInput,
  credentialSetPropertiesShape,
  type CredentialSetPropertiesView,
  type IdentityPropertiesInput,
  identityPropertiesShape,
  type IdentityPropertiesView,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type PrivateLinkResourceProperties,
  privateLinkResourcePropertiesShape,
  type RegistryPropertiesInput,
  registryPropertiesShape,
  type RegistryPropertiesView,
  type ReplicationPropertiesInput,
  replicationPropertiesShape,
  type ReplicationPropertiesView,
  type ScopeMapPropertiesInput,
  scopeMapPropertiesShape,
  type ScopeMapPropertiesView,
  type SkuInput,
  skuShape,
  type SkuView,
  type TokenPropertiesInput,
  tokenPropertiesShape,
  type TokenPropertiesView,
  type WebhookPropertiesInput,
  webhookPropertiesShape,
  type WebhookPropertiesView,
} from "./types.js";

const API_VERSION = "2025-11-01";

export interface RegistryProps {
  /**
   * The identity of the container registry.
   */
  identity?: IdentityPropertiesInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the container registry.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the container registry.
   */
  properties?: RegistryPropertiesInput | undefined;
  /**
   * The SKU of the container registry.
   */
  sku: SkuInput;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CacheRuleProps {
  /**
   * The name of the cache rule.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the cache rule.
   */
  properties?: CacheRulePropertiesInput | undefined;
}

/**
 * An object that represents a cache rule for a container registry.
 */
export class CacheRule extends Resource<"Microsoft.ContainerRegistry/registries/cacheRules"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/cacheRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cr",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9-]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => cacheRulePropertiesShape),
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
    props?: (CacheRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/cacheRules"> & Record<string, unknown> {
    return {
      ...props,
      type: CacheRule.resourceType,
      apiVersion: CacheRule.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?: (CacheRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CacheRule.buildResourceProps(props), options);
  }

  /**
   * The name of the cache rule.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the cache rule.
   */
  get properties(): CacheRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CacheRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ConnectedRegistryProps {
  /**
   * The name of the connected registry.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the connected registry.
   */
  properties?: ConnectedRegistryPropertiesInput | undefined;
}

/**
 * An object that represents a connected registry for a container registry.
 */
export class ConnectedRegistry extends Resource<"Microsoft.ContainerRegistry/registries/connectedRegistries"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/connectedRegistries" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cr",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => connectedRegistryPropertiesShape),
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
      | (ConnectedRegistryProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/connectedRegistries"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ConnectedRegistry.resourceType,
      apiVersion: ConnectedRegistry.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?:
      | (ConnectedRegistryProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ConnectedRegistry.buildResourceProps(props), options);
  }

  /**
   * The name of the connected registry.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the connected registry.
   */
  get properties(): ConnectedRegistryPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ConnectedRegistryPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface CredentialSetProps {
  /**
   * Identities associated with the resource. This is used to access the KeyVault secrets.
   */
  identity?: IdentityPropertiesInput | undefined;
  /**
   * The name of the credential set.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the credential set.
   */
  properties?: CredentialSetPropertiesInput | undefined;
}

/**
 * An object that represents a credential set resource for a container registry.
 */
export class CredentialSet extends Resource<"Microsoft.ContainerRegistry/registries/credentialSets"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/credentialSets" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cs",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9-]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => identityPropertiesShape),
        },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => credentialSetPropertiesShape),
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
      (CredentialSetProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/credentialSets"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CredentialSet.resourceType,
      apiVersion: CredentialSet.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?:
      (CredentialSetProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CredentialSet.buildResourceProps(props), options);
  }

  /**
   * Identities associated with the resource. This is used to access the KeyVault secrets.
   */
  get identity(): IdentityPropertiesView {
    return this.expr("identity") as any;
  }
  set identity(value: IdentityPropertiesInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The name of the credential set.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the credential set.
   */
  get properties(): CredentialSetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CredentialSetPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface PrivateEndpointConnectionProps {
  /**
   * The name of the private endpoint connection.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of a private endpoint connection.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * An object that represents a private endpoint connection for a container registry.
 */
export class PrivateEndpointConnection extends Resource<"Microsoft.ContainerRegistry/registries/privateEndpointConnections"> {
  static resourceType =
    "Microsoft.ContainerRegistry/registries/privateEndpointConnections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "pec",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
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
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpointConnection.resourceType,
      apiVersion: PrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * The name of the private endpoint connection.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of a private endpoint connection.
   */
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A private link resource.
 */
export class PrivateLinkResource extends Resource<"Microsoft.ContainerRegistry/registries/privateLinkResources"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/privateLinkResources" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "plr",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateLinkResourcePropertiesShape),
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
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/privateLinkResources"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateLinkResource.resourceType,
      apiVersion: PrivateLinkResource.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, PrivateLinkResource.buildResourceProps(props), options);
  }

  /**
   * The name of the private link resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * A resource that supports private link capabilities.
   */
  get properties(): Expression<PrivateLinkResourceProperties> {
    return this.expr("properties") as any;
  }
}

export interface ReplicationProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the replication.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the replication.
   */
  properties?: ReplicationPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An object that represents a replication for a container registry.
 */
export class Replication extends Resource<"Microsoft.ContainerRegistry/registries/replications"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/replications" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "r",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => replicationPropertiesShape),
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
      (ReplicationProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/replications"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Replication.resourceType,
      apiVersion: Replication.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?:
      (ReplicationProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Replication.buildResourceProps(props), options);
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
   * The name of the replication.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the replication.
   */
  get properties(): ReplicationPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ReplicationPropertiesInput | undefined) {
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

export interface ScopeMapProps {
  /**
   * The name of the scope map.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the scope map.
   */
  properties?: ScopeMapPropertiesInput | undefined;
}

/**
 * An object that represents a scope map for a container registry.
 */
export class ScopeMap extends Resource<"Microsoft.ContainerRegistry/registries/scopeMaps"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/scopeMaps" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sm",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9-_]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => scopeMapPropertiesShape),
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
    props?: (ScopeMapProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/scopeMaps"> & Record<string, unknown> {
    return {
      ...props,
      type: ScopeMap.resourceType,
      apiVersion: ScopeMap.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?: (ScopeMapProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ScopeMap.buildResourceProps(props), options);
  }

  /**
   * The name of the scope map.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the scope map.
   */
  get properties(): ScopeMapPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ScopeMapPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface TokenProps {
  /**
   * The name of the token.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the token.
   */
  properties?: TokenPropertiesInput | undefined;
}

/**
 * An object that represents a token for a container registry.
 */
export class Token extends Resource<"Microsoft.ContainerRegistry/registries/tokens"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/tokens" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9-]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => tokenPropertiesShape),
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
    props?: (TokenProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/tokens"> & Record<string, unknown> {
    return {
      ...props,
      type: Token.resourceType,
      apiVersion: Token.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?: (TokenProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Token.buildResourceProps(props), options);
  }

  /**
   * The name of the token.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the token.
   */
  get properties(): TokenPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TokenPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface WebhookProps {
  /**
   * The location of the webhook. This cannot be changed after the resource is created.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the webhook.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties that the webhook will be created with.
   */
  properties?: WebhookPropertiesInput | undefined;
  /**
   * The tags for the webhook.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An object that represents a webhook for a container registry.
 */
export class Webhook extends Resource<"Microsoft.ContainerRegistry/registries/webhooks"> {
  static resourceType = "Microsoft.ContainerRegistry/registries/webhooks" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "w",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => webhookPropertiesShape),
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
    props?: (WebhookProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries/webhooks"> & Record<string, unknown> {
    return {
      ...props,
      type: Webhook.resourceType,
      apiVersion: Webhook.apiVersion,
    };
  }

  constructor(
    context: Registry,
    props?: (WebhookProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Webhook.buildResourceProps(props), options);
  }

  /**
   * The location of the webhook. This cannot be changed after the resource is created.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the webhook.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties that the webhook will be created with.
   */
  get properties(): WebhookPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WebhookPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The tags for the webhook.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An object that represents a container registry.
 */
export class Registry extends Resource<"Microsoft.ContainerRegistry/registries"> {
  static resourceType = "Microsoft.ContainerRegistry/registries" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cr",
    minLength: 5,
    maxLength: 50,
    pattern: {
      regex: "^[a-zA-Z0-9]*$",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => identityPropertiesShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => registryPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
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
    props?: (RegistryProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.ContainerRegistry/registries"> & Record<string, unknown> {
    return {
      ...props,
      type: Registry.resourceType,
      apiVersion: Registry.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: (RegistryProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Registry.buildResourceProps(props), options);
  }

  /**
   * The identity of the container registry.
   */
  get identity(): IdentityPropertiesView {
    return this.expr("identity") as any;
  }
  set identity(value: IdentityPropertiesInput | undefined) {
    this.setProperty("identity", value);
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
   * The name of the container registry.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the container registry.
   */
  get properties(): RegistryPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: RegistryPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The SKU of the container registry.
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput) {
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
