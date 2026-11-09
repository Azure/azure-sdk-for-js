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
  createBooleanShape,
  createDeferredShape,
  createEnumShape,
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
  type ApplicationInsightsComponentAnalyticsItemPropertiesInput,
  applicationInsightsComponentAnalyticsItemPropertiesShape,
  type ApplicationInsightsComponentAnalyticsItemPropertiesView,
  type ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsInput,
  applicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsShape,
  type ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsView,
  type ApplicationInsightsComponentPropertiesInput,
  applicationInsightsComponentPropertiesShape,
  type ApplicationInsightsComponentPropertiesView,
  type FavoriteType,
  type ItemScope,
  type ItemType,
  type LinkedStorageAccountsPropertiesInput,
  linkedStorageAccountsPropertiesShape,
  type LinkedStorageAccountsPropertiesView,
  type StorageType,
} from "./types.js";

const API_VERSION_ANALYTICS_ITEMS = "2015-05-01";

const API_VERSION_COMPONENT_APIS = "2015-05-01";

const API_VERSION_COMPONENT_LINKED_STORAGE_ACCOUNT_API = "2020-03-01-preview";

const API_VERSION_COMPONENTS = "2020-02-02";

const API_VERSION_FAVORITES = "2015-05-01";

export interface ComponentProps {
  /**
   * Resource etag
   */
  etag?: ExpressionOrValue<string> | undefined;
  /**
   * The kind of application that this component refers to, used to customize UI. This value is a freeform string, values should typically be one of the following: web, ios, other, store, java, phone.
   */
  kind: ExpressionOrValue<string>;
  /**
   * Resource location
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Application Insights component resource.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties that define an Application Insights component resource.
   */
  properties?: ApplicationInsightsComponentPropertiesInput | undefined;
  /**
   * Resource tags
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface AnalyticsItemProps {
  /**
   * The content of this item
   */
  content?: ExpressionOrValue<string> | undefined;
  /**
   * Internally assigned unique id of the item definition.
   */
  Id?: ExpressionOrValue<string> | undefined;
  /**
   * The user-defined name of the item.
   */
  Name?: ExpressionOrValue<string> | undefined;
  /**
   * A set of properties that can be defined in the context of a specific item type. Each type may have its own properties.
   */
  properties?: ApplicationInsightsComponentAnalyticsItemPropertiesInput | undefined;
  /**
   * Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component.
   */
  Scope?: ExpressionOrValue<ItemScope> | undefined;
  /**
   * Enum indicating the type of the Analytics item.
   */
  Type?: ExpressionOrValue<ItemType> | undefined;
}

/**
 * Properties that define an Analytics item that is associated to an Application Insights component.
 */
export class AnalyticsItem extends Resource<"Microsoft.Insights/components/analyticsItems"> {
  static resourceType = "Microsoft.Insights/components/analyticsItems" as const;
  static apiVersion = API_VERSION_ANALYTICS_ITEMS;

  static {
    this.registerShape(
      createFlatModelShape({
        content: { armPath: ["Content"], value: createStringShape() },
        Id: { armPath: ["Id"], value: createStringShape() },
        Name: { armPath: ["Name"], value: createStringShape() },
        properties: {
          armPath: ["Properties"],
          value: createDeferredShape(
            () => applicationInsightsComponentAnalyticsItemPropertiesShape,
          ),
        },
        Scope: { armPath: ["Scope"], value: createUnionShape() },
        timeCreated: { armPath: ["TimeCreated"], value: createStringShape(), readOnly: true },
        timeModified: { armPath: ["TimeModified"], value: createStringShape(), readOnly: true },
        Type: { armPath: ["Type"], value: createUnionShape() },
        version: { armPath: ["Version"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
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
      | (AnalyticsItemProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/components/analyticsItems"> & Record<string, unknown> {
    return {
      ...props,
      type: AnalyticsItem.resourceType,
      apiVersion: AnalyticsItem.apiVersion,
      name: "item",
    };
  }

  constructor(
    context: Component,
    props?:
      | (AnalyticsItemProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, AnalyticsItem.buildResourceProps(props), options);
  }

  /**
   * The content of this item
   */
  get content(): Expression<string> {
    return this.expr("content");
  }
  set content(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("content", value);
  }

  /**
   * Internally assigned unique id of the item definition.
   */
  get Id(): Expression<string> {
    return this.expr("Id");
  }
  set Id(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("Id", value);
  }

  /**
   * The user-defined name of the item.
   */
  get Name(): Expression<string> {
    return this.expr("Name");
  }
  set Name(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("Name", value);
  }

  /**
   * A set of properties that can be defined in the context of a specific item type. Each type may
   * have its own properties.
   */
  get properties(): ApplicationInsightsComponentAnalyticsItemPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ApplicationInsightsComponentAnalyticsItemPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Enum indicating if this item definition is owned by a specific user or is shared between all
   * users with access to the Application Insights component.
   */
  get Scope(): Expression<ItemScope> {
    return this.expr("Scope");
  }
  set Scope(value: ExpressionOrValue<ItemScope> | undefined) {
    this.setProperty("Scope", value);
  }

  /**
   * Date and time in UTC when this item was created.
   */
  get timeCreated(): Expression<string> {
    return this.expr("timeCreated");
  }

  /**
   * Date and time in UTC of the last modification that was made to this item.
   */
  get timeModified(): Expression<string> {
    return this.expr("timeModified");
  }

  /**
   * Enum indicating the type of the Analytics item.
   */
  get Type(): Expression<ItemType> {
    return this.expr("Type");
  }
  set Type(value: ExpressionOrValue<ItemType> | undefined) {
    this.setProperty("Type", value);
  }

  /**
   * This instance's version of the data model. This can change as new features are added.
   */
  get version(): Expression<string> {
    return this.expr("version");
  }

  /**
   * The resource name.
   */
  get name(): Expression<"item"> {
    return this.expr("name");
  }
}

export interface ExportConfigurationProps {
  /**
   * The name of destination storage account.
   */
  destinationAccountId?: ExpressionOrValue<string> | undefined;
  /**
   * The SAS URL for the destination storage container. It must grant write permission.
   */
  destinationAddress?: ExpressionOrValue<string> | undefined;
  /**
   * The location ID of the destination storage container.
   */
  destinationStorageLocationId?: ExpressionOrValue<string> | undefined;
  /**
   * The subscription ID of the destination storage container.
   */
  destinationStorageSubscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * The Continuous Export destination type. This has to be 'Blob'.
   */
  destinationType?: ExpressionOrValue<string> | undefined;
  /**
   * Set to 'true' to create a Continuous Export configuration as enabled, otherwise set it to 'false'.
   */
  isEnabled?: ExpressionOrValue<string> | undefined;
  /**
   * Deprecated
   */
  notificationQueueEnabled?: ExpressionOrValue<string> | undefined;
  /**
   * Deprecated
   */
  notificationQueueUri?: ExpressionOrValue<string> | undefined;
  /**
   * The document types to be exported, as comma separated values. Allowed values include 'Requests', 'Event', 'Exceptions', 'Metrics', 'PageViews', 'PageViewPerformance', 'Rdd', 'PerformanceCounters', 'Availability', 'Messages'.
   */
  recordTypes?: ExpressionOrValue<string> | undefined;
  /**
   * The Continuous Export configuration ID. This is unique within a Application Insights component.
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * Properties that define a Continuous Export configuration.
 */
export class ExportConfiguration extends Resource<"Microsoft.Insights/components/exportconfiguration"> {
  static resourceType = "Microsoft.Insights/components/exportconfiguration" as const;
  static apiVersion = API_VERSION_COMPONENT_APIS;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "e",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        applicationName: {
          armPath: ["ApplicationName"],
          value: createStringShape(),
          readOnly: true,
        },
        containerName: { armPath: ["ContainerName"], value: createStringShape(), readOnly: true },
        destinationAccountId: { armPath: ["DestinationAccountId"], value: createStringShape() },
        destinationAddress: { armPath: ["DestinationAddress"], value: createStringShape() },
        destinationStorageLocationId: {
          armPath: ["DestinationStorageLocationId"],
          value: createStringShape(),
        },
        destinationStorageSubscriptionId: {
          armPath: ["DestinationStorageSubscriptionId"],
          value: createStringShape(),
        },
        destinationType: { armPath: ["DestinationType"], value: createStringShape() },
        exportId: { armPath: ["ExportId"], value: createStringShape(), readOnly: true },
        exportStatus: { armPath: ["ExportStatus"], value: createStringShape(), readOnly: true },
        instrumentationKey: {
          armPath: ["InstrumentationKey"],
          value: createStringShape(),
          readOnly: true,
        },
        isEnabled: { armPath: ["IsEnabled"], value: createStringShape() },
        isUserEnabled: { armPath: ["IsUserEnabled"], value: createStringShape(), readOnly: true },
        lastGapTime: { armPath: ["LastGapTime"], value: createStringShape(), readOnly: true },
        lastSuccessTime: {
          armPath: ["LastSuccessTime"],
          value: createStringShape(),
          readOnly: true,
        },
        lastUserUpdate: { armPath: ["LastUserUpdate"], value: createStringShape(), readOnly: true },
        notificationQueueEnabled: {
          armPath: ["NotificationQueueEnabled"],
          value: createStringShape(),
        },
        notificationQueueUri: { armPath: ["NotificationQueueUri"], value: createStringShape() },
        permanentErrorReason: {
          armPath: ["PermanentErrorReason"],
          value: createStringShape(),
          readOnly: true,
        },
        recordTypes: { armPath: ["RecordTypes"], value: createStringShape() },
        resourceGroup: { armPath: ["ResourceGroup"], value: createStringShape(), readOnly: true },
        storageName: { armPath: ["StorageName"], value: createStringShape(), readOnly: true },
        subscriptionId: { armPath: ["SubscriptionId"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
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
      | (ExportConfigurationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/components/exportconfiguration"> & Record<string, unknown> {
    return {
      ...props,
      type: ExportConfiguration.resourceType,
      apiVersion: ExportConfiguration.apiVersion,
    };
  }

  constructor(
    context: Component,
    props?:
      | (ExportConfigurationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ExportConfiguration.buildResourceProps(props), options);
  }

  /**
   * The name of the Application Insights component.
   */
  get applicationName(): Expression<string> {
    return this.expr("applicationName");
  }

  /**
   * The name of the destination storage container.
   */
  get containerName(): Expression<string> {
    return this.expr("containerName");
  }

  /**
   * The name of destination storage account.
   */
  get destinationAccountId(): Expression<string> {
    return this.expr("destinationAccountId");
  }
  set destinationAccountId(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("destinationAccountId", value);
  }

  /**
   * The SAS URL for the destination storage container. It must grant write permission.
   */
  get destinationAddress(): Expression<string> {
    return this.expr("destinationAddress");
  }
  set destinationAddress(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("destinationAddress", value);
  }

  /**
   * The location ID of the destination storage container.
   */
  get destinationStorageLocationId(): Expression<string> {
    return this.expr("destinationStorageLocationId");
  }
  set destinationStorageLocationId(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("destinationStorageLocationId", value);
  }

  /**
   * The subscription ID of the destination storage container.
   */
  get destinationStorageSubscriptionId(): Expression<string> {
    return this.expr("destinationStorageSubscriptionId");
  }
  set destinationStorageSubscriptionId(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("destinationStorageSubscriptionId", value);
  }

  /**
   * The Continuous Export destination type. This has to be 'Blob'.
   */
  get destinationType(): Expression<string> {
    return this.expr("destinationType");
  }
  set destinationType(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("destinationType", value);
  }

  /**
   * The unique ID of the export configuration inside an Application Insights component. It is auto
   * generated when the Continuous Export configuration is created.
   */
  get exportId(): Expression<string> {
    return this.expr("exportId");
  }

  /**
   * This indicates current Continuous Export configuration status. The possible values are
   * 'Preparing', 'Success', 'Failure'.
   */
  get exportStatus(): Expression<string> {
    return this.expr("exportStatus");
  }

  /**
   * The instrumentation key of the Application Insights component.
   */
  get instrumentationKey(): Expression<string> {
    return this.expr("instrumentationKey");
  }

  /**
   * Set to 'true' to create a Continuous Export configuration as enabled, otherwise set it to
   * 'false'.
   */
  get isEnabled(): Expression<string> {
    return this.expr("isEnabled");
  }
  set isEnabled(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("isEnabled", value);
  }

  /**
   * This will be 'true' if the Continuous Export configuration is enabled, otherwise it will be
   * 'false'.
   */
  get isUserEnabled(): Expression<string> {
    return this.expr("isUserEnabled");
  }

  /**
   * The last time the Continuous Export configuration started failing.
   */
  get lastGapTime(): Expression<string> {
    return this.expr("lastGapTime");
  }

  /**
   * The last time data was successfully delivered to the destination storage container for this
   * Continuous Export configuration.
   */
  get lastSuccessTime(): Expression<string> {
    return this.expr("lastSuccessTime");
  }

  /**
   * Last time the Continuous Export configuration was updated.
   */
  get lastUserUpdate(): Expression<string> {
    return this.expr("lastUserUpdate");
  }

  /**
   * Deprecated
   */
  get notificationQueueEnabled(): Expression<string> {
    return this.expr("notificationQueueEnabled");
  }
  set notificationQueueEnabled(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("notificationQueueEnabled", value);
  }

  /**
   * Deprecated
   */
  get notificationQueueUri(): Expression<string> {
    return this.expr("notificationQueueUri");
  }
  set notificationQueueUri(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("notificationQueueUri", value);
  }

  /**
   * This is the reason the Continuous Export configuration started failing. It can be
   * 'AzureStorageNotFound' or 'AzureStorageAccessDenied'.
   */
  get permanentErrorReason(): Expression<string> {
    return this.expr("permanentErrorReason");
  }

  /**
   * The document types to be exported, as comma separated values. Allowed values include
   * 'Requests', 'Event', 'Exceptions', 'Metrics', 'PageViews', 'PageViewPerformance', 'Rdd',
   * 'PerformanceCounters', 'Availability', 'Messages'.
   */
  get recordTypes(): Expression<string> {
    return this.expr("recordTypes");
  }
  set recordTypes(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("recordTypes", value);
  }

  /**
   * The resource group of the Application Insights component.
   */
  get resourceGroup(): Expression<string> {
    return this.expr("resourceGroup");
  }

  /**
   * The name of the destination storage account.
   */
  get storageName(): Expression<string> {
    return this.expr("storageName");
  }

  /**
   * The subscription of the Application Insights component.
   */
  get subscriptionId(): Expression<string> {
    return this.expr("subscriptionId");
  }

  /**
   * The Continuous Export configuration ID. This is unique within a Application Insights component.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }
}

export interface FavoriteProps {
  /**
   * Favorite category, as defined by the user at creation time.
   */
  category?: ExpressionOrValue<string> | undefined;
  /**
   * Configuration of this particular favorite, which are driven by the Azure portal UX. Configuration data is a string containing valid JSON
   */
  config?: ExpressionOrValue<string> | undefined;
  /**
   * Enum indicating if this favorite definition is owned by a specific user or is shared between all users with access to the Application Insights component.
   */
  favoriteType?: ExpressionOrValue<FavoriteType> | undefined;
  /**
   * Flag denoting wether or not this favorite was generated from a template.
   */
  isGeneratedFromTemplate?: ExpressionOrValue<boolean> | undefined;
  /**
   * The user-defined name of the favorite.
   */
  Name?: ExpressionOrValue<string> | undefined;
  /**
   * The source of the favorite definition.
   */
  sourceType?: ExpressionOrValue<string> | undefined;
  /**
   * A list of 0 or more tags that are associated with this favorite definition
   */
  tags?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * This instance's version of the data model. This can change as new features are added that can be marked favorite. Current examples include MetricsExplorer (ME) and Search.
   */
  version?: ExpressionOrValue<string> | undefined;
  /**
   * The Id of a specific favorite defined in the Application Insights component
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * Properties that define a favorite that is associated to an Application Insights component.
 */
export class Favorite extends Resource<"Microsoft.Insights/components/favorites"> {
  static resourceType = "Microsoft.Insights/components/favorites" as const;
  static apiVersion = API_VERSION_FAVORITES;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "f",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        category: { armPath: ["Category"], value: createStringShape() },
        config: { armPath: ["Config"], value: createStringShape() },
        favoriteId: { armPath: ["FavoriteId"], value: createStringShape(), readOnly: true },
        favoriteType: { armPath: ["FavoriteType"], value: createEnumShape() },
        isGeneratedFromTemplate: {
          armPath: ["IsGeneratedFromTemplate"],
          value: createBooleanShape(),
        },
        Name: { armPath: ["Name"], value: createStringShape() },
        sourceType: { armPath: ["SourceType"], value: createStringShape() },
        tags: { armPath: ["Tags"], value: createArrayShape(createStringShape()) },
        timeModified: { armPath: ["TimeModified"], value: createStringShape(), readOnly: true },
        userId: { armPath: ["UserId"], value: createStringShape(), readOnly: true },
        version: { armPath: ["Version"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
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
    props?: (FavoriteProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/components/favorites"> & Record<string, unknown> {
    return {
      ...props,
      type: Favorite.resourceType,
      apiVersion: Favorite.apiVersion,
    };
  }

  constructor(
    context: Component,
    props?: (FavoriteProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Favorite.buildResourceProps(props), options);
  }

  /**
   * Favorite category, as defined by the user at creation time.
   */
  get category(): Expression<string> {
    return this.expr("category");
  }
  set category(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("category", value);
  }

  /**
   * Configuration of this particular favorite, which are driven by the Azure portal UX.
   * Configuration data is a string containing valid JSON
   */
  get config(): Expression<string> {
    return this.expr("config");
  }
  set config(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("config", value);
  }

  /**
   * Internally assigned unique id of the favorite definition.
   */
  get favoriteId(): Expression<string> {
    return this.expr("favoriteId");
  }

  /**
   * Enum indicating if this favorite definition is owned by a specific user or is shared between
   * all users with access to the Application Insights component.
   */
  get favoriteType(): Expression<FavoriteType> {
    return this.expr("favoriteType");
  }
  set favoriteType(value: ExpressionOrValue<FavoriteType> | undefined) {
    this.setProperty("favoriteType", value);
  }

  /**
   * Flag denoting wether or not this favorite was generated from a template.
   */
  get isGeneratedFromTemplate(): Expression<boolean> {
    return this.expr("isGeneratedFromTemplate");
  }
  set isGeneratedFromTemplate(value: ExpressionOrValue<boolean> | undefined) {
    this.setProperty("isGeneratedFromTemplate", value);
  }

  /**
   * The user-defined name of the favorite.
   */
  get Name(): Expression<string> {
    return this.expr("Name");
  }
  set Name(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("Name", value);
  }

  /**
   * The source of the favorite definition.
   */
  get sourceType(): Expression<string> {
    return this.expr("sourceType");
  }
  set sourceType(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("sourceType", value);
  }

  /**
   * A list of 0 or more tags that are associated with this favorite definition
   */
  get tags(): InputArray<ExpressionOrValue<string>, string[]> {
    return this.expr("tags");
  }
  set tags(value: InputArray<ExpressionOrValue<string>, string[]> | undefined) {
    this.setProperty("tags", value);
  }

  /**
   * Date and time in UTC of the last modification that was made to this favorite definition.
   */
  get timeModified(): Expression<string> {
    return this.expr("timeModified");
  }

  /**
   * Unique user id of the specific user that owns this favorite.
   */
  get userId(): Expression<string> {
    return this.expr("userId");
  }

  /**
   * This instance's version of the data model. This can change as new features are added that can
   * be marked favorite. Current examples include MetricsExplorer (ME) and Search.
   */
  get version(): Expression<string> {
    return this.expr("version");
  }
  set version(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("version", value);
  }

  /**
   * The Id of a specific favorite defined in the Application Insights component
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }
}

export interface LinkedStorageAccountProps {
  /**
   * The type of the Application Insights component data source for the linked storage account.
   */
  name?: ExpressionOrValue<StorageType> | undefined;
  /**
   * The properties of the linked storage accounts.
   */
  properties?: LinkedStorageAccountsPropertiesInput | undefined;
}

/**
 * An Application Insights component linked storage accounts
 */
export class LinkedStorageAccount extends Resource<"Microsoft.Insights/components/linkedStorageAccounts"> {
  static resourceType = "Microsoft.Insights/components/linkedStorageAccounts" as const;
  static apiVersion = API_VERSION_COMPONENT_LINKED_STORAGE_ACCOUNT_API;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "lsa",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => linkedStorageAccountsPropertiesShape),
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
      | (LinkedStorageAccountProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/components/linkedStorageAccounts"> &
    Record<string, unknown> {
    return {
      ...props,
      type: LinkedStorageAccount.resourceType,
      apiVersion: LinkedStorageAccount.apiVersion,
    };
  }

  constructor(
    context: Component,
    props?:
      | (LinkedStorageAccountProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, LinkedStorageAccount.buildResourceProps(props), options);
  }

  /**
   * The type of the Application Insights component data source for the linked storage account.
   */
  get name(): Expression<StorageType> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<StorageType>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the linked storage accounts.
   */
  get properties(): LinkedStorageAccountsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LinkedStorageAccountsPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ApplicationInsightsComponentAnalyticsItemProps {
  /**
   * The content of this item
   */
  content?: ExpressionOrValue<string> | undefined;
  /**
   * Internally assigned unique id of the item definition.
   */
  Id?: ExpressionOrValue<string> | undefined;
  /**
   * The user-defined name of the item.
   */
  Name?: ExpressionOrValue<string> | undefined;
  /**
   * A set of properties that can be defined in the context of a specific item type. Each type may have its own properties.
   */
  properties?: ApplicationInsightsComponentAnalyticsItemPropertiesInput | undefined;
  /**
   * Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component.
   */
  Scope?: ExpressionOrValue<ItemScope> | undefined;
  /**
   * Enum indicating the type of the Analytics item.
   */
  Type?: ExpressionOrValue<ItemType> | undefined;
}

/**
 * Properties that define an Analytics item that is associated to an Application Insights component.
 */
export class ApplicationInsightsComponentAnalyticsItem extends Resource<"Microsoft.Insights/components/myanalyticsItems"> {
  static resourceType = "Microsoft.Insights/components/myanalyticsItems" as const;
  static apiVersion = API_VERSION_ANALYTICS_ITEMS;

  static {
    this.registerShape(
      createFlatModelShape({
        content: { armPath: ["Content"], value: createStringShape() },
        Id: { armPath: ["Id"], value: createStringShape() },
        Name: { armPath: ["Name"], value: createStringShape() },
        properties: {
          armPath: ["Properties"],
          value: createDeferredShape(
            () => applicationInsightsComponentAnalyticsItemPropertiesShape,
          ),
        },
        Scope: { armPath: ["Scope"], value: createUnionShape() },
        timeCreated: { armPath: ["TimeCreated"], value: createStringShape(), readOnly: true },
        timeModified: { armPath: ["TimeModified"], value: createStringShape(), readOnly: true },
        Type: { armPath: ["Type"], value: createUnionShape() },
        version: { armPath: ["Version"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
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
      | (ApplicationInsightsComponentAnalyticsItemProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/components/myanalyticsItems"> & Record<string, unknown> {
    return {
      ...props,
      type: ApplicationInsightsComponentAnalyticsItem.resourceType,
      apiVersion: ApplicationInsightsComponentAnalyticsItem.apiVersion,
      name: "item",
    };
  }

  constructor(
    context: Component,
    props?:
      | (ApplicationInsightsComponentAnalyticsItemProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ApplicationInsightsComponentAnalyticsItem.buildResourceProps(props), options);
  }

  /**
   * The content of this item
   */
  get content(): Expression<string> {
    return this.expr("content");
  }
  set content(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("content", value);
  }

  /**
   * Internally assigned unique id of the item definition.
   */
  get Id(): Expression<string> {
    return this.expr("Id");
  }
  set Id(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("Id", value);
  }

  /**
   * The user-defined name of the item.
   */
  get Name(): Expression<string> {
    return this.expr("Name");
  }
  set Name(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("Name", value);
  }

  /**
   * A set of properties that can be defined in the context of a specific item type. Each type may
   * have its own properties.
   */
  get properties(): ApplicationInsightsComponentAnalyticsItemPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ApplicationInsightsComponentAnalyticsItemPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Enum indicating if this item definition is owned by a specific user or is shared between all
   * users with access to the Application Insights component.
   */
  get Scope(): Expression<ItemScope> {
    return this.expr("Scope");
  }
  set Scope(value: ExpressionOrValue<ItemScope> | undefined) {
    this.setProperty("Scope", value);
  }

  /**
   * Date and time in UTC when this item was created.
   */
  get timeCreated(): Expression<string> {
    return this.expr("timeCreated");
  }

  /**
   * Date and time in UTC of the last modification that was made to this item.
   */
  get timeModified(): Expression<string> {
    return this.expr("timeModified");
  }

  /**
   * Enum indicating the type of the Analytics item.
   */
  get Type(): Expression<ItemType> {
    return this.expr("Type");
  }
  set Type(value: ExpressionOrValue<ItemType> | undefined) {
    this.setProperty("Type", value);
  }

  /**
   * This instance's version of the data model. This can change as new features are added.
   */
  get version(): Expression<string> {
    return this.expr("version");
  }

  /**
   * The resource name.
   */
  get name(): Expression<"item"> {
    return this.expr("name");
  }
}

export interface ProactiveDetectionConfigProps {
  /**
   * Custom email addresses for this rule notifications
   */
  customEmails?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * A flag that indicates whether this rule is enabled by the user
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The last time this rule was updated
   */
  lastUpdatedTime?: ExpressionOrValue<string> | undefined;
  /**
   * The rule name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Static definitions of the ProactiveDetection configuration rule (same values for all components).
   */
  ruleDefinitions?:
    ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsInput | undefined;
  /**
   * A flag that indicated whether notifications on this rule should be sent to subscription owners
   */
  sendEmailsToSubscriptionOwners?: ExpressionOrValue<boolean> | undefined;
}

/**
 * Properties that define a ProactiveDetection configuration.
 */
export class ProactiveDetectionConfig extends Resource<"Microsoft.Insights/components/ProactiveDetectionConfigs"> {
  static resourceType = "Microsoft.Insights/components/ProactiveDetectionConfigs" as const;
  static apiVersion = API_VERSION_COMPONENT_APIS;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "pdc",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        customEmails: { armPath: ["customEmails"], value: createArrayShape(createStringShape()) },
        enabled: { armPath: ["enabled"], value: createBooleanShape() },
        lastUpdatedTime: { armPath: ["lastUpdatedTime"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        ruleDefinitions: {
          armPath: ["ruleDefinitions"],
          value: createDeferredShape(
            () => applicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsShape,
          ),
        },
        sendEmailsToSubscriptionOwners: {
          armPath: ["sendEmailsToSubscriptionOwners"],
          value: createBooleanShape(),
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
      | (ProactiveDetectionConfigProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/components/ProactiveDetectionConfigs"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ProactiveDetectionConfig.resourceType,
      apiVersion: ProactiveDetectionConfig.apiVersion,
    };
  }

  constructor(
    context: Component,
    props?:
      | (ProactiveDetectionConfigProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ProactiveDetectionConfig.buildResourceProps(props), options);
  }

  /**
   * Custom email addresses for this rule notifications
   */
  get customEmails(): InputArray<ExpressionOrValue<string>, string[]> {
    return this.expr("customEmails");
  }
  set customEmails(value: InputArray<ExpressionOrValue<string>, string[]> | undefined) {
    this.setProperty("customEmails", value);
  }

  /**
   * A flag that indicates whether this rule is enabled by the user
   */
  get enabled(): Expression<boolean> {
    return this.expr("enabled");
  }
  set enabled(value: ExpressionOrValue<boolean> | undefined) {
    this.setProperty("enabled", value);
  }

  /**
   * The last time this rule was updated
   */
  get lastUpdatedTime(): Expression<string> {
    return this.expr("lastUpdatedTime");
  }
  set lastUpdatedTime(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("lastUpdatedTime", value);
  }

  /**
   * The rule name
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Static definitions of the ProactiveDetection configuration rule (same values for all
   * components).
   */
  get ruleDefinitions(): ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsView {
    return this.expr("ruleDefinitions") as any;
  }
  set ruleDefinitions(
    value:
      ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsInput | undefined,
  ) {
    this.setProperty("ruleDefinitions", value);
  }

  /**
   * A flag that indicated whether notifications on this rule should be sent to subscription owners
   */
  get sendEmailsToSubscriptionOwners(): Expression<boolean> {
    return this.expr("sendEmailsToSubscriptionOwners");
  }
  set sendEmailsToSubscriptionOwners(value: ExpressionOrValue<boolean> | undefined) {
    this.setProperty("sendEmailsToSubscriptionOwners", value);
  }
}

/**
 * An Application Insights component definition.
 */
export class Component extends Resource<"Microsoft.Insights/components"> {
  static resourceType = "Microsoft.Insights/components" as const;
  static apiVersion = API_VERSION_COMPONENTS;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "appi",
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape() },
        kind: { armPath: ["kind"], value: createStringShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => applicationInsightsComponentPropertiesShape),
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
    props?: (ComponentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Insights/components"> & Record<string, unknown> {
    return {
      ...props,
      type: Component.resourceType,
      apiVersion: Component.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props: (ComponentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Component.buildResourceProps(props), options);
  }

  /**
   * Resource etag
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }
  set etag(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("etag", value);
  }

  /**
   * The kind of application that this component refers to, used to customize UI. This value is a
   * freeform string, values should typically be one of the following: web, ios, other, store, java,
   * phone.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<string>) {
    this.setProperty("kind", value);
  }

  /**
   * Resource location
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the Application Insights component resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties that define an Application Insights component resource.
   */
  get properties(): ApplicationInsightsComponentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ApplicationInsightsComponentPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
