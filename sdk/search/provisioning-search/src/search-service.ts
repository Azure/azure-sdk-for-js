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
  type IdentityInput,
  identityShape,
  type IdentityView,
  type NetworkSecurityPerimeterConfigurationProperties,
  networkSecurityPerimeterConfigurationPropertiesShape,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type SearchServicePropertiesInput,
  searchServicePropertiesShape,
  type SearchServicePropertiesView,
  type SharedPrivateLinkResourcePropertiesInput,
  sharedPrivateLinkResourcePropertiesShape,
  type SharedPrivateLinkResourcePropertiesView,
  type SkuInput,
  skuShape,
  type SkuView,
} from "./types.js";

const API_VERSION = "2025-05-01";

export interface SearchServiceProps {
  /**
   * The identity of the resource.
   */
  identity?: IdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Azure AI Search service associated with the specified resource group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the search service.
   */
  properties?: SearchServicePropertiesInput | undefined;
  /**
   * The SKU of the search service, which determines price tier and capacity limits. This property is required when creating a new search service.
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Network security perimeter (NSP) configuration resource
 */
export class NetworkSecurityPerimeterConfiguration extends Resource<"Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations"> {
  static resourceType =
    "Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "nspc",
    minLength: 38,
    maxLength: 100,
    pattern: {
      regex: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}\\.[a-z][a-z0-9]*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => networkSecurityPerimeterConfigurationPropertiesShape),
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
  ): ResourceProps<"Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: NetworkSecurityPerimeterConfiguration.resourceType,
      apiVersion: NetworkSecurityPerimeterConfiguration.apiVersion,
    };
  }

  constructor(
    context: SearchService,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, NetworkSecurityPerimeterConfiguration.buildResourceProps(props), options);
  }

  /**
   * The name of the resource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Network security configuration properties.
   */
  get properties(): Expression<NetworkSecurityPerimeterConfigurationProperties> {
    return this.expr("properties") as any;
  }
}

export interface PrivateEndpointConnectionProps {
  /**
   * The name of the private endpoint connection to the Azure AI Search service with the specified resource group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Describes the properties of an existing private endpoint connection to the Azure AI Search service.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * Describes an existing private endpoint connection to the Azure AI Search service.
 */
export class PrivateEndpointConnection extends Resource<"Microsoft.Search/searchServices/privateEndpointConnections"> {
  static resourceType = "Microsoft.Search/searchServices/privateEndpointConnections" as const;
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
  ): ResourceProps<"Microsoft.Search/searchServices/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpointConnection.resourceType,
      apiVersion: PrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: SearchService,
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * The name of the private endpoint connection to the Azure AI Search service with the specified
   * resource group.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Describes the properties of an existing private endpoint connection to the Azure AI Search
   * service.
   */
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SharedPrivateLinkResourceProps {
  /**
   * The name of the shared private link resource managed by the Azure AI Search service within the specified resource group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Describes the properties of a shared private link resource managed by the Azure AI Search service.
   */
  properties?: SharedPrivateLinkResourcePropertiesInput | undefined;
}

/**
 * Describes a shared private link resource managed by the Azure AI Search service.
 */
export class SharedPrivateLinkResource extends Resource<"Microsoft.Search/searchServices/sharedPrivateLinkResources"> {
  static resourceType = "Microsoft.Search/searchServices/sharedPrivateLinkResources" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "splr",
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
      | (SharedPrivateLinkResourceProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Search/searchServices/sharedPrivateLinkResources"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SharedPrivateLinkResource.resourceType,
      apiVersion: SharedPrivateLinkResource.apiVersion,
    };
  }

  constructor(
    context: SearchService,
    props?:
      | (SharedPrivateLinkResourceProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SharedPrivateLinkResource.buildResourceProps(props), options);
  }

  /**
   * The name of the shared private link resource managed by the Azure AI Search service within the
   * specified resource group.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Describes the properties of a shared private link resource managed by the Azure AI Search
   * service.
   */
  get properties(): SharedPrivateLinkResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SharedPrivateLinkResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Describes an Azure AI Search service and its current state.
 */
export class SearchService extends Resource<"Microsoft.Search/searchServices"> {
  static resourceType = "Microsoft.Search/searchServices" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "srch",
    pattern: {
      regex: "^(?=.{2,60}$)[a-z0-9][a-z0-9]+(-[a-z0-9]+)*$",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: { armPath: ["identity"], value: createDeferredShape(() => identityShape) },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => searchServicePropertiesShape),
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
    props?:
      (SearchServiceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Search/searchServices"> & Record<string, unknown> {
    return {
      ...props,
      type: SearchService.resourceType,
      apiVersion: SearchService.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      (SearchServiceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SearchService.buildResourceProps(props), options);
  }

  /**
   * The identity of the resource.
   */
  get identity(): IdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: IdentityInput | undefined) {
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
   * The name of the Azure AI Search service associated with the specified resource group.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the search service.
   */
  get properties(): SearchServicePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SearchServicePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The SKU of the search service, which determines price tier and capacity limits. This property
   * is required when creating a new search service.
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput | undefined) {
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
