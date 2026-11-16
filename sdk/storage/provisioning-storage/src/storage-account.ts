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
  createArrayShape,
  createDeferredShape,
  createFlatModelShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type InputArray,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
  type SingletonExistingResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type AdvancedPlatformMetricsRulePropertiesInput,
  advancedPlatformMetricsRulePropertiesShape,
  type AdvancedPlatformMetricsRulePropertiesView,
  type AdvancedPlatformMetricsRuleType,
  type BlobInventoryPolicyName,
  type BlobInventoryPolicyPropertiesInput,
  blobInventoryPolicyPropertiesShape,
  type BlobInventoryPolicyPropertiesView,
  type BlobServicePropertiesPropertiesInput,
  blobServicePropertiesPropertiesShape,
  type BlobServicePropertiesPropertiesView,
  type ContainerPropertiesInput,
  containerPropertiesShape,
  type ContainerPropertiesView,
  type EncryptionScopePropertiesInput,
  encryptionScopePropertiesShape,
  type EncryptionScopePropertiesView,
  type ExtendedLocationInput,
  extendedLocationShape,
  type ExtendedLocationView,
  type FileServicePropertiesPropertiesInput,
  fileServicePropertiesPropertiesShape,
  type FileServicePropertiesPropertiesView,
  type FileServiceUsageProperties,
  fileServiceUsagePropertiesShape,
  type FileSharePropertiesInput,
  fileSharePropertiesShape,
  type FileSharePropertiesView,
  type IdentityInput,
  identityShape,
  type IdentityView,
  type ImmutabilityPolicyPropertyInput,
  immutabilityPolicyPropertyShape,
  type ImmutabilityPolicyPropertyView,
  type Kind,
  type LocalUserPropertiesInput,
  localUserPropertiesShape,
  type LocalUserPropertiesView,
  type ManagementPolicyName,
  type ManagementPolicyPropertiesInput,
  managementPolicyPropertiesShape,
  type ManagementPolicyPropertiesView,
  type MigrationName,
  type NetworkSecurityPerimeterConfigurationProperties,
  networkSecurityPerimeterConfigurationPropertiesShape,
  type ObjectReplicationPolicyPropertiesInput,
  objectReplicationPolicyPropertiesShape,
  type ObjectReplicationPolicyPropertiesView,
  type PlacementInput,
  placementShape,
  type PlacementView,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type QueuePropertiesInput,
  queuePropertiesShape,
  type QueuePropertiesView,
  type QueueServicePropertiesPropertiesInput,
  queueServicePropertiesPropertiesShape,
  type QueueServicePropertiesPropertiesView,
  type Sku,
  type SkuInput,
  skuShape,
  type SkuView,
  type StorageAccountMigrationProperties,
  storageAccountMigrationPropertiesShape,
  type StorageAccountPropertiesInput,
  storageAccountPropertiesShape,
  type StorageAccountPropertiesView,
  type StorageConnectorPropertiesInput,
  storageConnectorPropertiesShape,
  type StorageConnectorPropertiesView,
  type StorageDataSharePropertiesInput,
  storageDataSharePropertiesShape,
  type StorageDataSharePropertiesView,
  type StorageTaskAssignmentPropertiesInput,
  storageTaskAssignmentPropertiesShape,
  type StorageTaskAssignmentPropertiesView,
  type TablePropertiesInput,
  tablePropertiesShape,
  type TablePropertiesView,
  type TableServicePropertiesPropertiesInput,
  tableServicePropertiesPropertiesShape,
  type TableServicePropertiesPropertiesView,
} from "./types.js";

const API_VERSION = "2026-04-01";

export interface StorageAccountProps {
  /**
   * Optional. Set the extended location of the resource. If not set, the storage account will be created in Azure main region. Otherwise it will be created in the specified extended location
   */
  extendedLocation?: ExtendedLocationInput | undefined;
  /**
   * The identity of the resource.
   */
  identity?: IdentityInput | undefined;
  /**
   * Required. Indicates the type of storage account.
   */
  kind: ExpressionOrValue<Kind>;
  /**
   * Required. Gets or sets the location of the resource. This will be one of the supported and registered Azure Geo Regions (e.g. West US, East US, Southeast Asia, etc.). The geo region of a resource cannot be changed once it is created, but if an identical geo region is specified on update, the request will succeed.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the storage account within the specified resource group. Storage account names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Gets or sets the zonal placement details for the storage account.
   */
  placement?: PlacementInput | undefined;
  /**
   * The parameters used to create the storage account.
   */
  properties?: StorageAccountPropertiesInput | undefined;
  /**
   * Required. Gets or sets the SKU name.
   */
  sku: SkuInput;
  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used for viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key with a length no greater than 128 characters and a value with a length no greater than 256 characters.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Optional. Gets or sets the pinned logical availability zone for the storage account.
   */
  zones?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * The parameters or status associated with an ongoing or enqueued storage account migration in order to update its current SKU or region.
 */
export class AccountMigration extends Resource<"Microsoft.Storage/storageAccounts/accountMigrations"> {
  static resourceType = "Microsoft.Storage/storageAccounts/accountMigrations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "am",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => storageAccountMigrationPropertiesShape),
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
  ): ResourceProps<"Microsoft.Storage/storageAccounts/accountMigrations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: AccountMigration.resourceType,
      apiVersion: AccountMigration.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, AccountMigration.buildResourceProps(props), options);
  }

  /**
   * The name of the Storage Account Migration. It should always be 'default'
   */
  get name(): Expression<MigrationName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<MigrationName>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of a storage account’s ongoing or enqueued migration.
   */
  get properties(): Expression<StorageAccountMigrationProperties> {
    return this.expr("properties") as any;
  }
}

export interface AdvancedPlatformMetricProps {
  /**
   * The type of the advanced platform metrics rule.
   */
  name?: ExpressionOrValue<AdvancedPlatformMetricsRuleType> | undefined;
  /**
   * Returns the advanced platform metrics rule.
   */
  properties?: AdvancedPlatformMetricsRulePropertiesInput | undefined;
}

/**
 * The advanced platform metrics rule for the storage account.
 */
export class AdvancedPlatformMetric extends Resource<"Microsoft.Storage/storageAccounts/advancedPlatformMetrics"> {
  static resourceType = "Microsoft.Storage/storageAccounts/advancedPlatformMetrics" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "apm",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => advancedPlatformMetricsRulePropertiesShape),
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
      | (AdvancedPlatformMetricProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/advancedPlatformMetrics"> &
    Record<string, unknown> {
    return {
      ...props,
      type: AdvancedPlatformMetric.resourceType,
      apiVersion: AdvancedPlatformMetric.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (AdvancedPlatformMetricProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, AdvancedPlatformMetric.buildResourceProps(props), options);
  }

  /**
   * The type of the advanced platform metrics rule.
   */
  get name(): Expression<AdvancedPlatformMetricsRuleType> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<AdvancedPlatformMetricsRuleType>) {
    this.setProperty("name", value);
  }

  /**
   * Returns the advanced platform metrics rule.
   */
  get properties(): AdvancedPlatformMetricsRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AdvancedPlatformMetricsRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface BlobServiceProps {
  /**
   * The properties of a storage account’s Blob service.
   */
  properties?: BlobServicePropertiesPropertiesInput | undefined;
}

export interface ContainerProps {
  /**
   * The name of the blob container within the specified storage account. Blob container names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the blob container.
   */
  properties?: ContainerPropertiesInput | undefined;
}

export interface ImmutabilityPolicyProps {
  /**
   * The properties of an ImmutabilityPolicy of a blob container.
   */
  properties: ImmutabilityPolicyPropertyInput;
}

/**
 * The ImmutabilityPolicy property of a blob container, including Id, resource name, resource type, Etag.
 */
export class ImmutabilityPolicy extends Resource<"Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies"> {
  static resourceType =
    "Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => immutabilityPolicyPropertyShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ImmutabilityPolicyProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ImmutabilityPolicy.resourceType,
      apiVersion: ImmutabilityPolicy.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: Container,
    props:
      | (ImmutabilityPolicyProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ImmutabilityPolicy.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * The properties of an ImmutabilityPolicy of a blob container.
   */
  get properties(): ImmutabilityPolicyPropertyView {
    return this.expr("properties") as any;
  }
  set properties(value: ImmutabilityPolicyPropertyInput) {
    this.setProperty("properties", value);
  }
}

/**
 * Properties of the blob container, including Id, resource name, resource type, Etag.
 */
export class Container extends Resource<"Microsoft.Storage/storageAccounts/blobServices/containers"> {
  static resourceType = "Microsoft.Storage/storageAccounts/blobServices/containers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => containerPropertiesShape),
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
    props?: (ContainerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/blobServices/containers"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Container.resourceType,
      apiVersion: Container.apiVersion,
    };
  }

  constructor(
    context: BlobService,
    props?: (ContainerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Container.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the blob container within the specified storage account. Blob container names must
   * be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only.
   * Every dash (-) character must be immediately preceded and followed by a letter or number.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the blob container.
   */
  get properties(): ContainerPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ContainerPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * The properties of a storage account’s Blob service.
 */
export class BlobService extends Resource<"Microsoft.Storage/storageAccounts/blobServices"> {
  static resourceType = "Microsoft.Storage/storageAccounts/blobServices" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => blobServicePropertiesPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape), readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (BlobServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/blobServices"> & Record<string, unknown> {
    return {
      ...props,
      type: BlobService.resourceType,
      apiVersion: BlobService.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (BlobServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, BlobService.buildResourceProps(props), options);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * The properties of a storage account’s Blob service.
   */
  get properties(): BlobServicePropertiesPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: BlobServicePropertiesPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Sku name and tier.
   */
  get sku(): Expression<Sku> {
    return this.expr("sku") as any;
  }
}

export interface ConnectorProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Storage Connector.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the Storage Connector.
   */
  properties: StorageConnectorPropertiesInput;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * A Connector is a tracked ARM resource modeled as a sub-resource of a Storage Account.
 */
export class Connector extends Resource<"Microsoft.Storage/storageAccounts/connectors"> {
  static resourceType = "Microsoft.Storage/storageAccounts/connectors" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[a-z0-9](?!.*--)[a-z0-9-]{1,61}[a-z0-9]$",
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
          value: createDeferredShape(() => storageConnectorPropertiesShape),
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
    props?: (ConnectorProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/connectors"> & Record<string, unknown> {
    return {
      ...props,
      type: Connector.resourceType,
      apiVersion: Connector.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props: (ConnectorProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Connector.buildResourceProps(props), options);
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
   * The name of the Storage Connector.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the Storage Connector.
   */
  get properties(): StorageConnectorPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: StorageConnectorPropertiesInput) {
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

export interface DataShareProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Storage DataShare.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the Storage DataShare.
   */
  properties: StorageDataSharePropertiesInput;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * A DataShare is a tracked ARM resource modeled as a sub-resource of a Storage Account.
 */
export class DataShare extends Resource<"Microsoft.Storage/storageAccounts/dataShares"> {
  static resourceType = "Microsoft.Storage/storageAccounts/dataShares" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ds",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[a-z0-9](?!.*--)[a-z0-9-]{1,61}[a-z0-9]$",
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
          value: createDeferredShape(() => storageDataSharePropertiesShape),
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
    props?: (DataShareProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/dataShares"> & Record<string, unknown> {
    return {
      ...props,
      type: DataShare.resourceType,
      apiVersion: DataShare.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props: (DataShareProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DataShare.buildResourceProps(props), options);
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
   * The name of the Storage DataShare.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the Storage DataShare.
   */
  get properties(): StorageDataSharePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: StorageDataSharePropertiesInput) {
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

export interface EncryptionScopeProps {
  /**
   * The name of the encryption scope within the specified storage account. Encryption scope names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the encryption scope.
   */
  properties?: EncryptionScopePropertiesInput | undefined;
}

/**
 * The Encryption Scope resource.
 */
export class EncryptionScope extends Resource<"Microsoft.Storage/storageAccounts/encryptionScopes"> {
  static resourceType = "Microsoft.Storage/storageAccounts/encryptionScopes" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "es",
    minLength: 3,
    maxLength: 63,
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
          value: createDeferredShape(() => encryptionScopePropertiesShape),
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
      (EncryptionScopeProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/encryptionScopes"> & Record<string, unknown> {
    return {
      ...props,
      type: EncryptionScope.resourceType,
      apiVersion: EncryptionScope.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      (EncryptionScopeProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, EncryptionScope.buildResourceProps(props), options);
  }

  /**
   * The name of the encryption scope within the specified storage account. Encryption scope names
   * must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-)
   * only. Every dash (-) character must be immediately preceded and followed by a letter or number.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the encryption scope.
   */
  get properties(): EncryptionScopePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: EncryptionScopePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface FileServiceProps {
  /**
   * The properties of File services in storage account.
   */
  properties?: FileServicePropertiesPropertiesInput | undefined;
}

export interface ShareProps {
  /**
   * The name of the file share within the specified storage account. File share names must be between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only. Every dash (-) character must be immediately preceded and followed by a letter or number.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the file share.
   */
  properties?: FileSharePropertiesInput | undefined;
}

/**
 * Properties of the file share, including Id, resource name, resource type, Etag.
 */
export class Share extends Resource<"Microsoft.Storage/storageAccounts/fileServices/shares"> {
  static resourceType = "Microsoft.Storage/storageAccounts/fileServices/shares" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => fileSharePropertiesShape),
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
    props?: (ShareProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/fileServices/shares"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Share.resourceType,
      apiVersion: Share.apiVersion,
    };
  }

  constructor(
    context: FileService,
    props?: (ShareProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Share.buildResourceProps(props), options);
  }

  /**
   * Resource Etag.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }

  /**
   * The name of the file share within the specified storage account. File share names must be
   * between 3 and 63 characters in length and use numbers, lower-case letters and dash (-) only.
   * Every dash (-) character must be immediately preceded and followed by a letter or number.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the file share.
   */
  get properties(): FileSharePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: FileSharePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * The usage of file service in storage account.
 */
export class Usage extends Resource<"Microsoft.Storage/storageAccounts/fileServices/usages"> {
  static resourceType = "Microsoft.Storage/storageAccounts/fileServices/usages" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => fileServiceUsagePropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: SingletonExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Storage/storageAccounts/fileServices/usages"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Usage.resourceType,
      apiVersion: Usage.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: FileService,
    props: SingletonExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, Usage.buildResourceProps(props), options);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * File service usage in storage account including account limits, file share limits and constants
   * used in recommendations and bursting formula.
   */
  get properties(): Expression<FileServiceUsageProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * The properties of File services in storage account.
 */
export class FileService extends Resource<"Microsoft.Storage/storageAccounts/fileServices"> {
  static resourceType = "Microsoft.Storage/storageAccounts/fileServices" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => fileServicePropertiesPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape), readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (FileServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/fileServices"> & Record<string, unknown> {
    return {
      ...props,
      type: FileService.resourceType,
      apiVersion: FileService.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (FileServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, FileService.buildResourceProps(props), options);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * The properties of File services in storage account.
   */
  get properties(): FileServicePropertiesPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: FileServicePropertiesPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Sku name and tier.
   */
  get sku(): Expression<Sku> {
    return this.expr("sku") as any;
  }
}

export interface InventoryPolicyProps {
  /**
   * The name of the storage account blob inventory policy. It should always be 'default'
   */
  name?: ExpressionOrValue<BlobInventoryPolicyName> | undefined;
  /**
   * Returns the storage account blob inventory policy rules.
   */
  properties?: BlobInventoryPolicyPropertiesInput | undefined;
}

/**
 * The storage account blob inventory policy.
 */
export class InventoryPolicy extends Resource<"Microsoft.Storage/storageAccounts/inventoryPolicies"> {
  static resourceType = "Microsoft.Storage/storageAccounts/inventoryPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ip",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => blobInventoryPolicyPropertiesShape),
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
      (InventoryPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/inventoryPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: InventoryPolicy.resourceType,
      apiVersion: InventoryPolicy.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      (InventoryPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, InventoryPolicy.buildResourceProps(props), options);
  }

  /**
   * The name of the storage account blob inventory policy. It should always be 'default'
   */
  get name(): Expression<BlobInventoryPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<BlobInventoryPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Returns the storage account blob inventory policy rules.
   */
  get properties(): BlobInventoryPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: BlobInventoryPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface LocalUserProps {
  /**
   * The name of local user. The username must contain lowercase letters and numbers only. It must be unique only within the storage account.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Storage account local user properties.
   */
  properties?: LocalUserPropertiesInput | undefined;
}

/**
 * The local user associated with the storage accounts.
 */
export class LocalUser extends Resource<"Microsoft.Storage/storageAccounts/localUsers"> {
  static resourceType = "Microsoft.Storage/storageAccounts/localUsers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "lu",
    minLength: 3,
    maxLength: 64,
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
          value: createDeferredShape(() => localUserPropertiesShape),
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
    props?: (LocalUserProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/localUsers"> & Record<string, unknown> {
    return {
      ...props,
      type: LocalUser.resourceType,
      apiVersion: LocalUser.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?: (LocalUserProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, LocalUser.buildResourceProps(props), options);
  }

  /**
   * The name of local user. The username must contain lowercase letters and numbers only. It must
   * be unique only within the storage account.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Storage account local user properties.
   */
  get properties(): LocalUserPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LocalUserPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagementPolicyProps {
  /**
   * The name of the Storage Account Management Policy. It should always be 'default'
   */
  name?: ExpressionOrValue<ManagementPolicyName> | undefined;
  /**
   * Returns the Storage Account Data Policies Rules.
   */
  properties?: ManagementPolicyPropertiesInput | undefined;
}

/**
 * The Get Storage Account ManagementPolicies operation response.
 */
export class ManagementPolicy extends Resource<"Microsoft.Storage/storageAccounts/managementPolicies"> {
  static resourceType = "Microsoft.Storage/storageAccounts/managementPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mp",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managementPolicyPropertiesShape),
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
      (ManagementPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/managementPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagementPolicy.resourceType,
      apiVersion: ManagementPolicy.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      (ManagementPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagementPolicy.buildResourceProps(props), options);
  }

  /**
   * The name of the Storage Account Management Policy. It should always be 'default'
   */
  get name(): Expression<ManagementPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ManagementPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Returns the Storage Account Data Policies Rules.
   */
  get properties(): ManagementPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagementPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * The Network Security Perimeter configuration resource.
 */
export class NetworkSecurityPerimeterConfiguration extends Resource<"Microsoft.Storage/storageAccounts/networkSecurityPerimeterConfigurations"> {
  static resourceType =
    "Microsoft.Storage/storageAccounts/networkSecurityPerimeterConfigurations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "nspc",
    pattern: {
      regex: "^.*$",
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
  ): ResourceProps<"Microsoft.Storage/storageAccounts/networkSecurityPerimeterConfigurations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: NetworkSecurityPerimeterConfiguration.resourceType,
      apiVersion: NetworkSecurityPerimeterConfiguration.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, NetworkSecurityPerimeterConfiguration.buildResourceProps(props), options);
  }

  /**
   * The name for Network Security Perimeter configuration
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the Network Security Perimeter Configuration
   */
  get properties(): Expression<NetworkSecurityPerimeterConfigurationProperties> {
    return this.expr("properties") as any;
  }
}

export interface ObjectReplicationPolicyProps {
  /**
   * For the destination account, provide the value 'default'. Configure the policy on the destination account first. For the source account, provide the value of the policy ID that is returned when you download the policy that was defined on the destination account. The policy is downloaded as a JSON file.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Returns the Storage Account Object Replication Policy.
   */
  properties?: ObjectReplicationPolicyPropertiesInput | undefined;
}

/**
 * The replication policy between two storage accounts. Multiple rules can be defined in one policy.
 */
export class ObjectReplicationPolicy extends Resource<"Microsoft.Storage/storageAccounts/objectReplicationPolicies"> {
  static resourceType = "Microsoft.Storage/storageAccounts/objectReplicationPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "orp",
    minLength: 1,
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
          value: createDeferredShape(() => objectReplicationPolicyPropertiesShape),
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
      | (ObjectReplicationPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/objectReplicationPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ObjectReplicationPolicy.resourceType,
      apiVersion: ObjectReplicationPolicy.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (ObjectReplicationPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ObjectReplicationPolicy.buildResourceProps(props), options);
  }

  /**
   * For the destination account, provide the value 'default'. Configure the policy on the
   * destination account first. For the source account, provide the value of the policy ID that is
   * returned when you download the policy that was defined on the destination account. The policy
   * is downloaded as a JSON file.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Returns the Storage Account Object Replication Policy.
   */
  get properties(): ObjectReplicationPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ObjectReplicationPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface PrivateEndpointConnectionProps {
  /**
   * The name of the private endpoint connection associated with the Azure resource
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * The Private Endpoint Connection resource.
 */
export class PrivateEndpointConnection extends Resource<"Microsoft.Storage/storageAccounts/privateEndpointConnections"> {
  static resourceType = "Microsoft.Storage/storageAccounts/privateEndpointConnections" as const;
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
  ): ResourceProps<"Microsoft.Storage/storageAccounts/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpointConnection.resourceType,
      apiVersion: PrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * The name of the private endpoint connection associated with the Azure resource
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
}

export interface QueueServiceProps {
  /**
   * The properties of a storage account’s Queue service.
   */
  properties?: QueueServicePropertiesPropertiesInput | undefined;
}

export interface QueueProps {
  /**
   * A queue name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of lowercase alphanumeric and dash(-) characters only, it should begin and end with an alphanumeric character and it cannot have two consecutive dash(-) characters.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Queue resource properties.
   */
  properties?: QueuePropertiesInput | undefined;
}

/**
 * Concrete proxy resource types can be created by aliasing this type using a specific property type.
 */
export class Queue extends Resource<"Microsoft.Storage/storageAccounts/queueServices/queues"> {
  static resourceType = "Microsoft.Storage/storageAccounts/queueServices/queues" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "q",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[a-z0-9]([a-z0-9]|(-(?!-))){1,61}[a-z0-9]$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => queuePropertiesShape),
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
    props?: (QueueProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/queueServices/queues"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Queue.resourceType,
      apiVersion: Queue.apiVersion,
    };
  }

  constructor(
    context: QueueService,
    props?: (QueueProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Queue.buildResourceProps(props), options);
  }

  /**
   * A queue name must be unique within a storage account and must be between 3 and 63
   * characters.The name must comprise of lowercase alphanumeric and dash(-) characters only, it
   * should begin and end with an alphanumeric character and it cannot have two consecutive dash(-)
   * characters.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Queue resource properties.
   */
  get properties(): QueuePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: QueuePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * The properties of a storage account’s Queue service.
 */
export class QueueService extends Resource<"Microsoft.Storage/storageAccounts/queueServices"> {
  static resourceType = "Microsoft.Storage/storageAccounts/queueServices" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => queueServicePropertiesPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (QueueServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/queueServices"> & Record<string, unknown> {
    return {
      ...props,
      type: QueueService.resourceType,
      apiVersion: QueueService.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (QueueServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, QueueService.buildResourceProps(props), options);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * The properties of a storage account’s Queue service.
   */
  get properties(): QueueServicePropertiesPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: QueueServicePropertiesPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface StorageTaskAssignmentProps {
  /**
   * The name of the storage task assignment within the specified resource group. Storage task assignment names must be between 3 and 24 characters in length and use numbers and lower-case letters only.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties of the storage task assignment.
   */
  properties?: StorageTaskAssignmentPropertiesInput | undefined;
}

/**
 * The storage task assignment.
 */
export class StorageTaskAssignment extends Resource<"Microsoft.Storage/storageAccounts/storageTaskAssignments"> {
  static resourceType = "Microsoft.Storage/storageAccounts/storageTaskAssignments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sta",
    minLength: 3,
    maxLength: 24,
    pattern: {
      regex: "^[a-z][a-z0-9]{2,23}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => storageTaskAssignmentPropertiesShape),
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
      | (StorageTaskAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/storageTaskAssignments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: StorageTaskAssignment.resourceType,
      apiVersion: StorageTaskAssignment.apiVersion,
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (StorageTaskAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, StorageTaskAssignment.buildResourceProps(props), options);
  }

  /**
   * The name of the storage task assignment within the specified resource group. Storage task
   * assignment names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties of the storage task assignment.
   */
  get properties(): StorageTaskAssignmentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: StorageTaskAssignmentPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface TableServiceProps {
  /**
   * The properties of a storage account’s Table service.
   */
  properties?: TableServicePropertiesPropertiesInput | undefined;
}

export interface TableProps {
  /**
   * A table name must be unique within a storage account and must be between 3 and 63 characters.The name must comprise of only alphanumeric characters and it cannot begin with a numeric character.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Table resource properties.
   */
  properties?: TablePropertiesInput | undefined;
}

/**
 * Properties of the table, including Id, resource name, resource type.
 */
export class Table extends Resource<"Microsoft.Storage/storageAccounts/tableServices/tables"> {
  static resourceType = "Microsoft.Storage/storageAccounts/tableServices/tables" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    minLength: 3,
    maxLength: 63,
    pattern: {
      regex: "^[A-Za-z][A-Za-z0-9]{2,62}$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => tablePropertiesShape),
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
    props?: (TableProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/tableServices/tables"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Table.resourceType,
      apiVersion: Table.apiVersion,
    };
  }

  constructor(
    context: TableService,
    props?: (TableProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Table.buildResourceProps(props), options);
  }

  /**
   * A table name must be unique within a storage account and must be between 3 and 63
   * characters.The name must comprise of only alphanumeric characters and it cannot begin with a
   * numeric character.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Table resource properties.
   */
  get properties(): TablePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TablePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * The properties of a storage account’s Table service.
 */
export class TableService extends Resource<"Microsoft.Storage/storageAccounts/tableServices"> {
  static resourceType = "Microsoft.Storage/storageAccounts/tableServices" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => tableServicePropertiesPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (TableServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts/tableServices"> & Record<string, unknown> {
    return {
      ...props,
      type: TableService.resourceType,
      apiVersion: TableService.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: StorageAccount,
    props?:
      | (TableServiceProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, TableService.buildResourceProps(props), options);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * The properties of a storage account’s Table service.
   */
  get properties(): TableServicePropertiesPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TableServicePropertiesPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * The storage account.
 */
export class StorageAccount extends Resource<"Microsoft.Storage/storageAccounts"> {
  static resourceType = "Microsoft.Storage/storageAccounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "st",
    minLength: 3,
    maxLength: 24,
    pattern: {
      regex: "^[a-z0-9]+$",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        extendedLocation: {
          armPath: ["extendedLocation"],
          value: createDeferredShape(() => extendedLocationShape),
        },
        identity: { armPath: ["identity"], value: createDeferredShape(() => identityShape) },
        kind: { armPath: ["kind"], value: createUnionShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        placement: { armPath: ["placement"], value: createDeferredShape(() => placementShape) },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => storageAccountPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
        zones: { armPath: ["zones"], value: createArrayShape(createStringShape()) },
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
      (StorageAccountProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Storage/storageAccounts"> & Record<string, unknown> {
    return {
      ...props,
      type: StorageAccount.resourceType,
      apiVersion: StorageAccount.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props:
      (StorageAccountProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, StorageAccount.buildResourceProps(props), options);
  }

  /**
   * Optional. Set the extended location of the resource. If not set, the storage account will be
   * created in Azure main region. Otherwise it will be created in the specified extended location
   */
  get extendedLocation(): ExtendedLocationView {
    return this.expr("extendedLocation") as any;
  }
  set extendedLocation(value: ExtendedLocationInput | undefined) {
    this.setProperty("extendedLocation", value);
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
   * Required. Indicates the type of storage account.
   */
  get kind(): Expression<Kind> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<Kind>) {
    this.setProperty("kind", value);
  }

  /**
   * Required. Gets or sets the location of the resource. This will be one of the supported and
   * registered Azure Geo Regions (e.g. West US, East US, Southeast Asia, etc.). The geo region of a
   * resource cannot be changed once it is created, but if an identical geo region is specified on
   * update, the request will succeed.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the storage account within the specified resource group. Storage account names must
   * be between 3 and 24 characters in length and use numbers and lower-case letters only.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Optional. Gets or sets the zonal placement details for the storage account.
   */
  get placement(): PlacementView {
    return this.expr("placement") as any;
  }
  set placement(value: PlacementInput | undefined) {
    this.setProperty("placement", value);
  }

  /**
   * The parameters used to create the storage account.
   */
  get properties(): StorageAccountPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: StorageAccountPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Required. Gets or sets the SKU name.
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput) {
    this.setProperty("sku", value);
  }

  /**
   * Gets or sets a list of key value pairs that describe the resource. These tags can be used for
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key with a length no greater than 128 characters
   * and a value with a length no greater than 256 characters.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }

  /**
   * Optional. Gets or sets the pinned logical availability zone for the storage account.
   */
  get zones(): InputArray<ExpressionOrValue<string>, string[]> {
    return this.expr("zones");
  }
  set zones(value: InputArray<ExpressionOrValue<string>, string[]> | undefined) {
    this.setProperty("zones", value);
  }
}
