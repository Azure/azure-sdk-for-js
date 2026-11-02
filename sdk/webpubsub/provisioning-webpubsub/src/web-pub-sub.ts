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
  createUnionShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type CustomCertificatePropertiesInput,
  customCertificatePropertiesShape,
  type CustomCertificatePropertiesView,
  type CustomDomainPropertiesInput,
  customDomainPropertiesShape,
  type CustomDomainPropertiesView,
  type ManagedIdentityInput,
  managedIdentityShape,
  type ManagedIdentityView,
  type PersistentStoragePropertiesInput,
  persistentStoragePropertiesShape,
  type PersistentStoragePropertiesView,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type ReplicaPropertiesInput,
  replicaPropertiesShape,
  type ReplicaPropertiesView,
  type ResourceSkuInput,
  resourceSkuShape,
  type ResourceSkuView,
  type ServiceKind,
  type SharedPrivateLinkResourcePropertiesInput,
  sharedPrivateLinkResourcePropertiesShape,
  type SharedPrivateLinkResourcePropertiesView,
  type WebPubSubHubPropertiesInput,
  webPubSubHubPropertiesShape,
  type WebPubSubHubPropertiesView,
  type WebPubSubPropertiesInput,
  webPubSubPropertiesShape,
  type WebPubSubPropertiesView,
} from "./types.js";

const API_VERSION = "2025-12-01-preview";

export interface WebPubSubProps {
  /**
   * A class represent managed identities used for request and response
   */
  identity?: ManagedIdentityInput | undefined;
  /**
   * The kind of the service
   */
  kind?: ExpressionOrValue<ServiceKind> | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the resource.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * A class that describes the properties of the resource
   */
  properties?: WebPubSubPropertiesInput | undefined;
  /**
   * The billing information of the resource.
   */
  sku?: ResourceSkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CustomCertificateProps {
  /**
   * Custom certificate name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Custom certificate properties.
   */
  properties: CustomCertificatePropertiesInput;
}

/**
 * A custom certificate.
 */
export class CustomCertificate extends Resource<"Microsoft.SignalRService/webPubSub/customCertificates"> {
  static resourceType = "Microsoft.SignalRService/webPubSub/customCertificates" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cc",
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
          value: createDeferredShape(() => customCertificatePropertiesShape),
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
      | (CustomCertificateProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/customCertificates"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CustomCertificate.resourceType,
      apiVersion: CustomCertificate.apiVersion,
    };
  }

  constructor(
    context: WebPubSub,
    props:
      | (CustomCertificateProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CustomCertificate.buildResourceProps(props), options);
  }

  /**
   * Custom certificate name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Custom certificate properties.
   */
  get properties(): CustomCertificatePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CustomCertificatePropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface CustomDomainProps {
  /**
   * Custom domain name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of a custom domain.
   */
  properties: CustomDomainPropertiesInput;
}

/**
 * A custom domain
 */
export class CustomDomain extends Resource<"Microsoft.SignalRService/webPubSub/customDomains"> {
  static resourceType = "Microsoft.SignalRService/webPubSub/customDomains" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cd",
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
          value: createDeferredShape(() => customDomainPropertiesShape),
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
      (CustomDomainProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/customDomains"> & Record<string, unknown> {
    return {
      ...props,
      type: CustomDomain.resourceType,
      apiVersion: CustomDomain.apiVersion,
    };
  }

  constructor(
    context: WebPubSub,
    props:
      (CustomDomainProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CustomDomain.buildResourceProps(props), options);
  }

  /**
   * Custom domain name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of a custom domain.
   */
  get properties(): CustomDomainPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CustomDomainPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface HubProps {
  /**
   * The hub name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of a hub.
   */
  properties: WebPubSubHubPropertiesInput;
}

/**
 * A hub setting
 */
export class Hub extends Resource<"Microsoft.SignalRService/webPubSub/hubs"> {
  static resourceType = "Microsoft.SignalRService/webPubSub/hubs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "h",
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
          value: createDeferredShape(() => webPubSubHubPropertiesShape),
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
    props?: (HubProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/hubs"> & Record<string, unknown> {
    return {
      ...props,
      type: Hub.resourceType,
      apiVersion: Hub.apiVersion,
    };
  }

  constructor(
    context: WebPubSub,
    props: (HubProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Hub.buildResourceProps(props), options);
  }

  /**
   * The hub name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of a hub.
   */
  get properties(): WebPubSubHubPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WebPubSubHubPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface PersistentStorageProps {
  /**
   * Persistent storage name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of a persistent storage.
   */
  properties: PersistentStoragePropertiesInput;
}

/**
 * A persistent storage
 */
export class PersistentStorage extends Resource<"Microsoft.SignalRService/webPubSub/persistentStorages"> {
  static resourceType = "Microsoft.SignalRService/webPubSub/persistentStorages" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ps",
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
          value: createDeferredShape(() => persistentStoragePropertiesShape),
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
      | (PersistentStorageProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/persistentStorages"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PersistentStorage.resourceType,
      apiVersion: PersistentStorage.apiVersion,
    };
  }

  constructor(
    context: WebPubSub,
    props:
      | (PersistentStorageProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PersistentStorage.buildResourceProps(props), options);
  }

  /**
   * Persistent storage name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of a persistent storage.
   */
  get properties(): PersistentStoragePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PersistentStoragePropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface PrivateEndpointConnectionProps {
  /**
   * The name of the private endpoint connection associated with the Azure resource.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Private endpoint connection properties
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * A private endpoint connection to an azure resource
 */
export class PrivateEndpointConnection extends Resource<"Microsoft.SignalRService/webPubSub/privateEndpointConnections"> {
  static resourceType = "Microsoft.SignalRService/webPubSub/privateEndpointConnections" as const;
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
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpointConnection.resourceType,
      apiVersion: PrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: WebPubSub,
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * The name of the private endpoint connection associated with the Azure resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Private endpoint connection properties
   */
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ReplicaProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the replica.
   */
  name?: ExpressionOrValue<string> | undefined;
  properties?: ReplicaPropertiesInput | undefined;
  /**
   * The billing information of the resource.
   */
  sku?: ResourceSkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface WebPubSubReplicaSharedPrivateLinkProps {
  /**
   * The name of the shared private link resource.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Describes the properties of an existing Shared Private Link Resource
   */
  properties?: SharedPrivateLinkResourcePropertiesInput | undefined;
}

/**
 * Describes a Shared Private Link Resource
 */
export class WebPubSubReplicaSharedPrivateLink extends Resource<"Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources"> {
  static resourceType =
    "Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "splr",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[a-zA-Z][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sharedPrivateLinkResourcePropertiesShape),
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
      | (WebPubSubReplicaSharedPrivateLinkProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources"> &
    Record<string, unknown> {
    return {
      ...props,
      type: WebPubSubReplicaSharedPrivateLink.resourceType,
      apiVersion: WebPubSubReplicaSharedPrivateLink.apiVersion,
    };
  }

  constructor(
    context: Replica,
    props?:
      | (WebPubSubReplicaSharedPrivateLinkProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, WebPubSubReplicaSharedPrivateLink.buildResourceProps(props), options);
  }

  /**
   * The name of the shared private link resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Describes the properties of an existing Shared Private Link Resource
   */
  get properties(): SharedPrivateLinkResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SharedPrivateLinkResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A class represent a replica resource.
 */
export class Replica extends Resource<"Microsoft.SignalRService/webPubSub/replicas"> {
  static resourceType = "Microsoft.SignalRService/webPubSub/replicas" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "r",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[a-zA-Z][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$",
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
          value: createDeferredShape(() => replicaPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => resourceSkuShape) },
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
    props?: (ReplicaProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/replicas"> & Record<string, unknown> {
    return {
      ...props,
      type: Replica.resourceType,
      apiVersion: Replica.apiVersion,
    };
  }

  constructor(
    context: WebPubSub,
    props?: (ReplicaProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Replica.buildResourceProps(props), options);
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
   * The name of the replica.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  get properties(): ReplicaPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ReplicaPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The billing information of the resource.
   */
  get sku(): ResourceSkuView {
    return this.expr("sku") as any;
  }
  set sku(value: ResourceSkuInput | undefined) {
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

export interface WebPubSubSharedPrivateLinkProps {
  /**
   * The name of the shared private link resource.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Describes the properties of an existing Shared Private Link Resource
   */
  properties?: SharedPrivateLinkResourcePropertiesInput | undefined;
}

/**
 * Describes a Shared Private Link Resource
 */
export class WebPubSubSharedPrivateLink extends Resource<"Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources"> {
  static resourceType = "Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "splr",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[a-zA-Z][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sharedPrivateLinkResourcePropertiesShape),
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
      | (WebPubSubSharedPrivateLinkProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources"> &
    Record<string, unknown> {
    return {
      ...props,
      type: WebPubSubSharedPrivateLink.resourceType,
      apiVersion: WebPubSubSharedPrivateLink.apiVersion,
    };
  }

  constructor(
    context: WebPubSub,
    props?:
      | (WebPubSubSharedPrivateLinkProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, WebPubSubSharedPrivateLink.buildResourceProps(props), options);
  }

  /**
   * The name of the shared private link resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Describes the properties of an existing Shared Private Link Resource
   */
  get properties(): SharedPrivateLinkResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SharedPrivateLinkResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A class represent a resource.
 */
export class WebPubSub extends Resource<"Microsoft.SignalRService/webPubSub"> {
  static resourceType = "Microsoft.SignalRService/webPubSub" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "wps",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[a-zA-Z][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: { armPath: ["identity"], value: createDeferredShape(() => managedIdentityShape) },
        kind: { armPath: ["kind"], value: createUnionShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => webPubSubPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => resourceSkuShape) },
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
    props?: (WebPubSubProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.SignalRService/webPubSub"> & Record<string, unknown> {
    return {
      ...props,
      type: WebPubSub.resourceType,
      apiVersion: WebPubSub.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (WebPubSubProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, WebPubSub.buildResourceProps(props), options);
  }

  /**
   * A class represent managed identities used for request and response
   */
  get identity(): ManagedIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The kind of the service
   */
  get kind(): Expression<ServiceKind> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<ServiceKind> | undefined) {
    this.setProperty("kind", value);
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
   * The name of the resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * A class that describes the properties of the resource
   */
  get properties(): WebPubSubPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WebPubSubPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The billing information of the resource.
   */
  get sku(): ResourceSkuView {
    return this.expr("sku") as any;
  }
  set sku(value: ResourceSkuInput | undefined) {
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
