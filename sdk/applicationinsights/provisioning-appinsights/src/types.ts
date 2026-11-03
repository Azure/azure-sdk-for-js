// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createAnyShape,
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createEnumShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringShape,
  createUnionShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * Enum indicating if this favorite definition is owned by a specific user or is shared between all users with access to the Application Insights component.
 */
export type FavoriteType = "shared" | "user";

/**
 * The kind of WebTest that this web test watches. Choices are ping, multistep and standard.
 */
export type WebTestKind = "ping" | "multistep" | "standard";

/**
 * A set of properties that can be defined in the context of a specific item type. Each type may have its own properties.
 */
export interface ApplicationInsightsComponentAnalyticsItemProperties {
  /**
   * A function alias, used when the type of the item is Function
   */
  functionAlias?: string;
}

/**
 * Input type for A set of properties that can be defined in the context of a specific item type. Each type may have its own properties.
 */
export interface ApplicationInsightsComponentAnalyticsItemPropertiesInput extends InputOf<ApplicationInsightsComponentAnalyticsItemProperties> {
  /**
   * A function alias, used when the type of the item is Function
   */
  functionAlias?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for A set of properties that can be defined in the context of a specific item type. Each type may have its own properties.
 */
export type ApplicationInsightsComponentAnalyticsItemPropertiesView =
  ApplicationInsightsComponentAnalyticsItemPropertiesInput;

export const applicationInsightsComponentAnalyticsItemPropertiesShape: FlatModelShape =
  createFlatModelShape({
    functionAlias: { armPath: ["functionAlias"], value: createStringShape() },
  });

/**
 * Static definitions of the ProactiveDetection configuration rule (same values for all components).
 */
export interface ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions {
  /**
   * The rule description
   */
  description?: string;
  /**
   * The rule name as it is displayed in UI
   */
  displayName?: string;
  /**
   * URL which displays additional info about the proactive detection rule
   */
  helpUrl?: string;
  /**
   * A flag indicating whether the rule is enabled by default
   */
  isEnabledByDefault?: boolean;
  /**
   * A flag indicating whether the rule is hidden (from the UI)
   */
  isHidden?: boolean;
  /**
   * A flag indicating whether the rule is in preview
   */
  isInPreview?: boolean;
  /**
   * The rule name
   */
  name?: string;
  /**
   * A flag indicating whether email notifications are supported for detections for this rule
   */
  supportsEmailNotifications?: boolean;
}

/**
 * Input type for Static definitions of the ProactiveDetection configuration rule (same values for all components).
 */
export interface ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsInput extends InputOf<ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions> {
  /**
   * The rule description
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The rule name as it is displayed in UI
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * URL which displays additional info about the proactive detection rule
   */
  helpUrl?: ExpressionOrValue<string> | undefined;
  /**
   * A flag indicating whether the rule is enabled by default
   */
  isEnabledByDefault?: ExpressionOrValue<boolean> | undefined;
  /**
   * A flag indicating whether the rule is hidden (from the UI)
   */
  isHidden?: ExpressionOrValue<boolean> | undefined;
  /**
   * A flag indicating whether the rule is in preview
   */
  isInPreview?: ExpressionOrValue<boolean> | undefined;
  /**
   * The rule name
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * A flag indicating whether email notifications are supported for detections for this rule
   */
  supportsEmailNotifications?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Static definitions of the ProactiveDetection configuration rule (same values for all components).
 */
export type ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsView =
  ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsInput;

export const applicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsShape: FlatModelShape =
  createFlatModelShape({
    description: { armPath: ["Description"], value: createStringShape() },
    displayName: { armPath: ["DisplayName"], value: createStringShape() },
    helpUrl: { armPath: ["HelpUrl"], value: createStringShape() },
    isEnabledByDefault: { armPath: ["IsEnabledByDefault"], value: createBooleanShape() },
    isHidden: { armPath: ["IsHidden"], value: createBooleanShape() },
    isInPreview: { armPath: ["IsInPreview"], value: createBooleanShape() },
    name: { armPath: ["Name"], value: createStringShape() },
    supportsEmailNotifications: {
      armPath: ["SupportsEmailNotifications"],
      value: createBooleanShape(),
    },
  });

/**
 * Properties that define an Application Insights component resource.
 */
export interface ApplicationInsightsComponentProperties {
  /**
   * Application Insights Unique ID for your Application.
   */
  appId?: string;
  /**
   * Type of application being monitored.
   */
  applicationType: ApplicationType;
  /**
   * The unique ID of your application. This field mirrors the 'Name' field and cannot be changed.
   */
  applicationId?: string;
  /**
   * Application Insights component connection string.
   */
  connectionString?: string;
  /**
   * Creation Date for the Application Insights component, in ISO 8601 format.
   */
  creationDate?: Date;
  /**
   * Disable IP masking.
   */
  disableIpMasking?: boolean;
  /**
   * Disable Non-AAD based Auth.
   */
  disableLocalAuth?: boolean;
  /**
   * Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API.
   */
  flowType?: FlowType;
  /**
   * Force users to create their own storage account for profiler and debugger.
   */
  forceCustomerStorageForProfiler?: boolean;
  /**
   * The unique application ID created when a new application is added to HockeyApp, used for communications with HockeyApp.
   */
  hockeyAppId?: string;
  /**
   * Token used to authenticate communications with between Application Insights and HockeyApp.
   */
  hockeyAppToken?: string;
  /**
   * Purge data immediately after 30 days.
   */
  immediatePurgeDataOn30Days?: boolean;
  /**
   * Indicates the flow of the ingestion.
   */
  ingestionMode?: IngestionMode;
  /**
   * Application Insights Instrumentation key. A read-only value that applications can use to identify the destination for all telemetry sent to Azure Application Insights. This value will be supplied upon construction of each new Application Insights component.
   */
  instrumentationKey?: string;
  /**
   * The date which the component got migrated to LA, in ISO 8601 format.
   */
  laMigrationDate?: Date;
  /**
   * Application name.
   */
  name?: string;
  /**
   * List of linked private link scope resources.
   */
  privateLinkScopedResources?: PrivateLinkScopedResource[];
  /**
   * Current state of this component: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed.
   */
  provisioningState?: string;
  /**
   * The network access type for accessing Application Insights ingestion.
   */
  publicNetworkAccessForIngestion?: PublicNetworkAccessType;
  /**
   * The network access type for accessing Application Insights query.
   */
  publicNetworkAccessForQuery?: PublicNetworkAccessType;
  /**
   * Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'.
   */
  requestSource?: RequestSource;
  /**
   * Retention period in days.
   */
  retentionInDays?: number;
  /**
   * Percentage of the data produced by the application being monitored that is being sampled for Application Insights telemetry.
   */
  samplingPercentage?: number;
  /**
   * Azure Tenant Id.
   */
  tenantId?: string;
  /**
   * Resource Id of the log analytics workspace which the data will be ingested to. This property is required to create an application with this API version. Applications from older versions will not have this property.
   */
  workspaceResourceId?: string;
}

/**
 * Input type for Properties that define an Application Insights component resource.
 */
export interface ApplicationInsightsComponentPropertiesInput extends InputOf<ApplicationInsightsComponentProperties> {
  /**
   * Type of application being monitored.
   */
  applicationType: ExpressionOrValue<ApplicationType>;
  /**
   * Disable IP masking.
   */
  disableIpMasking?: ExpressionOrValue<boolean> | undefined;
  /**
   * Disable Non-AAD based Auth.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API.
   */
  flowType?: ExpressionOrValue<FlowType> | undefined;
  /**
   * Force users to create their own storage account for profiler and debugger.
   */
  forceCustomerStorageForProfiler?: ExpressionOrValue<boolean> | undefined;
  /**
   * The unique application ID created when a new application is added to HockeyApp, used for communications with HockeyApp.
   */
  hockeyAppId?: ExpressionOrValue<string> | undefined;
  /**
   * Purge data immediately after 30 days.
   */
  immediatePurgeDataOn30Days?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates the flow of the ingestion.
   */
  ingestionMode?: ExpressionOrValue<IngestionMode> | undefined;
  /**
   * The network access type for accessing Application Insights ingestion.
   */
  publicNetworkAccessForIngestion?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * The network access type for accessing Application Insights query.
   */
  publicNetworkAccessForQuery?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'.
   */
  requestSource?: ExpressionOrValue<RequestSource> | undefined;
  /**
   * Retention period in days.
   */
  retentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Percentage of the data produced by the application being monitored that is being sampled for Application Insights telemetry.
   */
  samplingPercentage?: ExpressionOrValue<number> | undefined;
  /**
   * Resource Id of the log analytics workspace which the data will be ingested to. This property is required to create an application with this API version. Applications from older versions will not have this property.
   */
  workspaceResourceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties that define an Application Insights component resource.
 */
export interface ApplicationInsightsComponentPropertiesView extends InputOf<ApplicationInsightsComponentProperties> {
  /**
   * Read-only output: Application Insights Unique ID for your Application.
   */
  readonly appId?: Expression<string> | undefined;
  /**
   * Type of application being monitored.
   */
  applicationType: ExpressionOrValue<ApplicationType>;
  /**
   * Read-only output: The unique ID of your application. This field mirrors the 'Name' field and cannot be changed.
   */
  readonly applicationId?: Expression<string> | undefined;
  /**
   * Read-only output: Application Insights component connection string.
   */
  readonly connectionString?: Expression<string> | undefined;
  /**
   * Read-only output: Creation Date for the Application Insights component, in ISO 8601 format.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * Disable IP masking.
   */
  disableIpMasking?: ExpressionOrValue<boolean> | undefined;
  /**
   * Disable Non-AAD based Auth.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API.
   */
  flowType?: ExpressionOrValue<FlowType> | undefined;
  /**
   * Force users to create their own storage account for profiler and debugger.
   */
  forceCustomerStorageForProfiler?: ExpressionOrValue<boolean> | undefined;
  /**
   * The unique application ID created when a new application is added to HockeyApp, used for communications with HockeyApp.
   */
  hockeyAppId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Token used to authenticate communications with between Application Insights and HockeyApp.
   */
  readonly hockeyAppToken?: Expression<string> | undefined;
  /**
   * Purge data immediately after 30 days.
   */
  immediatePurgeDataOn30Days?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates the flow of the ingestion.
   */
  ingestionMode?: ExpressionOrValue<IngestionMode> | undefined;
  /**
   * Read-only output: Application Insights Instrumentation key. A read-only value that applications can use to identify the destination for all telemetry sent to Azure Application Insights. This value will be supplied upon construction of each new Application Insights component.
   */
  readonly instrumentationKey?: Expression<string> | undefined;
  /**
   * Read-only output: The date which the component got migrated to LA, in ISO 8601 format.
   */
  readonly laMigrationDate?: Expression<Date> | undefined;
  /**
   * Read-only output: Application name.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: List of linked private link scope resources.
   */
  readonly privateLinkScopedResources?: Expression<PrivateLinkScopedResource[]> | undefined;
  /**
   * Read-only output: Current state of this component: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * The network access type for accessing Application Insights ingestion.
   */
  publicNetworkAccessForIngestion?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * The network access type for accessing Application Insights query.
   */
  publicNetworkAccessForQuery?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'.
   */
  requestSource?: ExpressionOrValue<RequestSource> | undefined;
  /**
   * Retention period in days.
   */
  retentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Percentage of the data produced by the application being monitored that is being sampled for Application Insights telemetry.
   */
  samplingPercentage?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Azure Tenant Id.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * Resource Id of the log analytics workspace which the data will be ingested to. This property is required to create an application with this API version. Applications from older versions will not have this property.
   */
  workspaceResourceId?: ExpressionOrValue<string> | undefined;
}

export const applicationInsightsComponentPropertiesShape: FlatModelShape = createFlatModelShape({
  appId: { armPath: ["AppId"], value: createStringShape(), readOnly: true },
  applicationType: { armPath: ["Application_Type"], value: createUnionShape() },
  applicationId: { armPath: ["ApplicationId"], value: createStringShape(), readOnly: true },
  connectionString: { armPath: ["ConnectionString"], value: createStringShape(), readOnly: true },
  creationDate: {
    armPath: ["CreationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  disableIpMasking: { armPath: ["DisableIpMasking"], value: createBooleanShape() },
  disableLocalAuth: { armPath: ["DisableLocalAuth"], value: createBooleanShape() },
  flowType: { armPath: ["Flow_Type"], value: createUnionShape() },
  forceCustomerStorageForProfiler: {
    armPath: ["ForceCustomerStorageForProfiler"],
    value: createBooleanShape(),
  },
  hockeyAppId: { armPath: ["HockeyAppId"], value: createStringShape() },
  hockeyAppToken: { armPath: ["HockeyAppToken"], value: createStringShape(), readOnly: true },
  immediatePurgeDataOn30Days: {
    armPath: ["ImmediatePurgeDataOn30Days"],
    value: createBooleanShape(),
  },
  ingestionMode: { armPath: ["IngestionMode"], value: createUnionShape() },
  instrumentationKey: {
    armPath: ["InstrumentationKey"],
    value: createStringShape(),
    readOnly: true,
  },
  laMigrationDate: {
    armPath: ["LaMigrationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  name: { armPath: ["Name"], value: createStringShape(), readOnly: true },
  privateLinkScopedResources: {
    armPath: ["PrivateLinkScopedResources"],
    value: createArrayShape(createDeferredShape(() => privateLinkScopedResourceShape)),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  publicNetworkAccessForIngestion: {
    armPath: ["publicNetworkAccessForIngestion"],
    value: createUnionShape(),
  },
  publicNetworkAccessForQuery: {
    armPath: ["publicNetworkAccessForQuery"],
    value: createUnionShape(),
  },
  requestSource: { armPath: ["Request_Source"], value: createUnionShape() },
  retentionInDays: { armPath: ["RetentionInDays"], value: createNumberShape() },
  samplingPercentage: { armPath: ["SamplingPercentage"], value: createNumberShape() },
  tenantId: { armPath: ["TenantId"], value: createStringShape(), readOnly: true },
  workspaceResourceId: { armPath: ["WorkspaceResourceId"], value: createStringShape() },
});

/**
 * A header to add to the WebTest.
 */
export interface HeaderField {
  /**
   * The name of the header.
   */
  headerFieldName?: string;
  /**
   * The value of the header.
   */
  headerFieldValue?: string;
}

/**
 * Input type for A header to add to the WebTest.
 */
export interface HeaderFieldInput extends InputOf<HeaderField> {
  /**
   * The name of the header.
   */
  headerFieldName?: ExpressionOrValue<string> | undefined;
  /**
   * The value of the header.
   */
  headerFieldValue?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for A header to add to the WebTest.
 */
export type HeaderFieldView = HeaderFieldInput;

export const headerFieldShape: FlatModelShape = createFlatModelShape({
  headerFieldName: { armPath: ["key"], value: createStringShape() },
  headerFieldValue: { armPath: ["value"], value: createStringShape() },
});

/**
 * An Application Insights component linked storage account
 */
export interface LinkedStorageAccountsProperties {
  /**
   * Linked storage account resource ID
   */
  linkedStorageAccount?: string;
}

/**
 * Input type for An Application Insights component linked storage account
 */
export interface LinkedStorageAccountsPropertiesInput extends InputOf<LinkedStorageAccountsProperties> {
  /**
   * Linked storage account resource ID
   */
  linkedStorageAccount?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for An Application Insights component linked storage account
 */
export type LinkedStorageAccountsPropertiesView = LinkedStorageAccountsPropertiesInput;

export const linkedStorageAccountsPropertiesShape: FlatModelShape = createFlatModelShape({
  linkedStorageAccount: { armPath: ["linkedStorageAccount"], value: createStringShape() },
});

/**
 * The private link scope resource reference.
 */
export interface PrivateLinkScopedResource {
  /**
   * The full resource Id of the private link scope resource.
   */
  resourceId?: string;
  /**
   * The private link scope unique Identifier.
   */
  scopeId?: string;
}

/**
 * Input type for The private link scope resource reference.
 */
export interface PrivateLinkScopedResourceInput extends InputOf<PrivateLinkScopedResource> {}

/**
 * View type for The private link scope resource reference.
 */
export interface PrivateLinkScopedResourceView extends InputOf<PrivateLinkScopedResource> {
  /**
   * Read-only output: The full resource Id of the private link scope resource.
   */
  readonly resourceId?: Expression<string> | undefined;
  /**
   * Read-only output: The private link scope unique Identifier.
   */
  readonly scopeId?: Expression<string> | undefined;
}

export const privateLinkScopedResourceShape: FlatModelShape = createFlatModelShape({
  resourceId: { armPath: ["ResourceId"], value: createStringShape(), readOnly: true },
  scopeId: { armPath: ["ScopeId"], value: createStringShape(), readOnly: true },
});

/**
 * User assigned identity properties
 */
export interface UserAssignedIdentity {
  /**
   * The client ID of the assigned identity.
   */
  clientId?: string;
  /**
   * The principal ID of the assigned identity.
   */
  principalId?: string;
}

/**
 * Input type for User assigned identity properties
 */
export interface UserAssignedIdentityInput extends InputOf<UserAssignedIdentity> {}

/**
 * View type for User assigned identity properties
 */
export interface UserAssignedIdentityView extends InputOf<UserAssignedIdentity> {
  /**
   * Read-only output: The client ID of the assigned identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal ID of the assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userAssignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * Geo-physical location to run a WebTest from. You must specify one or more locations for the test to run from.
 */
export interface WebTestGeolocation {
  /**
   * Location ID for the WebTest to run from.
   */
  location?: string;
}

/**
 * Input type for Geo-physical location to run a WebTest from. You must specify one or more locations for the test to run from.
 */
export interface WebTestGeolocationInput extends InputOf<WebTestGeolocation> {
  /**
   * Location ID for the WebTest to run from.
   */
  location?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Geo-physical location to run a WebTest from. You must specify one or more locations for the test to run from.
 */
export type WebTestGeolocationView = WebTestGeolocationInput;

export const webTestGeolocationShape: FlatModelShape = createFlatModelShape({
  location: { armPath: ["Id"], value: createStringShape() },
});

/**
 * Metadata describing a web test for an Azure resource.
 */
export interface WebTestProperties {
  /**
   * An XML configuration specification for a WebTest.
   */
  configuration?: WebTestPropertiesConfiguration;
  /**
   * User defined description for this WebTest.
   */
  description?: string;
  /**
   * Is the test actively being monitored.
   */
  enabled?: boolean;
  /**
   * Interval in seconds between test runs for this WebTest. Default value is 300.
   */
  frequency?: number;
  /**
   * The kind of web test this is, valid choices are ping, multistep and standard.
   */
  webTestKind: WebTestKind;
  /**
   * A list of where to physically run the tests from to give global coverage for accessibility of your application.
   */
  locations: WebTestGeolocation[];
  /**
   * User defined name if this WebTest.
   */
  webTestName: string;
  /**
   * Current state of this component, whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed.
   */
  provisioningState?: string;
  /**
   * The collection of request properties
   */
  request?: WebTestPropertiesRequest;
  /**
   * Allow for retries should this WebTest fail.
   */
  retryEnabled?: boolean;
  /**
   * Unique ID of this WebTest. This is typically the same value as the Name field.
   */
  syntheticMonitorId: string;
  /**
   * Seconds until this WebTest will timeout and fail. Default value is 30.
   */
  timeout?: number;
  /**
   * The collection of validation rule properties
   */
  validationRules?: WebTestPropertiesValidationRules;
}

/**
 * Input type for Metadata describing a web test for an Azure resource.
 */
export interface WebTestPropertiesInput extends InputOf<WebTestProperties> {
  /**
   * An XML configuration specification for a WebTest.
   */
  configuration?: WebTestPropertiesConfigurationInput | undefined;
  /**
   * User defined description for this WebTest.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Is the test actively being monitored.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Interval in seconds between test runs for this WebTest. Default value is 300.
   */
  frequency?: ExpressionOrValue<number> | undefined;
  /**
   * The kind of web test this is, valid choices are ping, multistep and standard.
   */
  webTestKind: ExpressionOrValue<WebTestKind>;
  /**
   * A list of where to physically run the tests from to give global coverage for accessibility of your application.
   */
  locations: InputArray<WebTestGeolocationInput, WebTestGeolocation[]>;
  /**
   * User defined name if this WebTest.
   */
  webTestName: ExpressionOrValue<string>;
  /**
   * The collection of request properties
   */
  request?: WebTestPropertiesRequestInput | undefined;
  /**
   * Allow for retries should this WebTest fail.
   */
  retryEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Unique ID of this WebTest. This is typically the same value as the Name field.
   */
  syntheticMonitorId: ExpressionOrValue<string>;
  /**
   * Seconds until this WebTest will timeout and fail. Default value is 30.
   */
  timeout?: ExpressionOrValue<number> | undefined;
  /**
   * The collection of validation rule properties
   */
  validationRules?: WebTestPropertiesValidationRulesInput | undefined;
}

/**
 * View type for Metadata describing a web test for an Azure resource.
 */
export interface WebTestPropertiesView extends InputOf<WebTestProperties> {
  /**
   * An XML configuration specification for a WebTest.
   */
  configuration?: WebTestPropertiesConfigurationView | undefined;
  /**
   * User defined description for this WebTest.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Is the test actively being monitored.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Interval in seconds between test runs for this WebTest. Default value is 300.
   */
  frequency?: ExpressionOrValue<number> | undefined;
  /**
   * The kind of web test this is, valid choices are ping, multistep and standard.
   */
  webTestKind: ExpressionOrValue<WebTestKind>;
  /**
   * A list of where to physically run the tests from to give global coverage for accessibility of your application.
   */
  locations: InputArray<WebTestGeolocationView, WebTestGeolocation[]>;
  /**
   * User defined name if this WebTest.
   */
  webTestName: ExpressionOrValue<string>;
  /**
   * Read-only output: Current state of this component, whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * The collection of request properties
   */
  request?: WebTestPropertiesRequestView | undefined;
  /**
   * Allow for retries should this WebTest fail.
   */
  retryEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Unique ID of this WebTest. This is typically the same value as the Name field.
   */
  syntheticMonitorId: ExpressionOrValue<string>;
  /**
   * Seconds until this WebTest will timeout and fail. Default value is 30.
   */
  timeout?: ExpressionOrValue<number> | undefined;
  /**
   * The collection of validation rule properties
   */
  validationRules?: WebTestPropertiesValidationRulesView | undefined;
}

export const webTestPropertiesShape: FlatModelShape = createFlatModelShape({
  configuration: {
    armPath: ["Configuration"],
    value: createDeferredShape(() => webTestPropertiesConfigurationShape),
  },
  description: { armPath: ["Description"], value: createStringShape() },
  enabled: { armPath: ["Enabled"], value: createBooleanShape() },
  frequency: { armPath: ["Frequency"], value: createNumberShape() },
  webTestKind: { armPath: ["Kind"], value: createEnumShape() },
  locations: {
    armPath: ["Locations"],
    value: createArrayShape(createDeferredShape(() => webTestGeolocationShape)),
  },
  webTestName: { armPath: ["Name"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  request: {
    armPath: ["Request"],
    value: createDeferredShape(() => webTestPropertiesRequestShape),
  },
  retryEnabled: { armPath: ["RetryEnabled"], value: createBooleanShape() },
  syntheticMonitorId: { armPath: ["SyntheticMonitorId"], value: createStringShape() },
  timeout: { armPath: ["Timeout"], value: createNumberShape() },
  validationRules: {
    armPath: ["ValidationRules"],
    value: createDeferredShape(() => webTestPropertiesValidationRulesShape),
  },
});

/**
 * An XML configuration specification for a WebTest.
 */
export interface WebTestPropertiesConfiguration {
  /**
   * The XML specification of a WebTest to run against an application.
   */
  webTest?: string;
}

/**
 * Input type for An XML configuration specification for a WebTest.
 */
export interface WebTestPropertiesConfigurationInput extends InputOf<WebTestPropertiesConfiguration> {
  /**
   * The XML specification of a WebTest to run against an application.
   */
  webTest?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for An XML configuration specification for a WebTest.
 */
export type WebTestPropertiesConfigurationView = WebTestPropertiesConfigurationInput;

export const webTestPropertiesConfigurationShape: FlatModelShape = createFlatModelShape({
  webTest: { armPath: ["WebTest"], value: createStringShape() },
});

/**
 * The collection of request properties
 */
export interface WebTestPropertiesRequest {
  /**
   * Follow redirects for this web test.
   */
  followRedirects?: boolean;
  /**
   * List of headers and their values to add to the WebTest call.
   */
  headers?: HeaderField[];
  /**
   * Http verb to use for this web test.
   */
  httpVerb?: string;
  /**
   * Parse Dependent request for this WebTest.
   */
  parseDependentRequests?: boolean;
  /**
   * Base64 encoded string body to send with this web test.
   */
  requestBody?: string;
  /**
   * Url location to test.
   */
  requestUrl?: string;
}

/**
 * Input type for The collection of request properties
 */
export interface WebTestPropertiesRequestInput extends InputOf<WebTestPropertiesRequest> {
  /**
   * Follow redirects for this web test.
   */
  followRedirects?: ExpressionOrValue<boolean> | undefined;
  /**
   * List of headers and their values to add to the WebTest call.
   */
  headers?: InputArray<HeaderFieldInput, HeaderField[]> | undefined;
  /**
   * Http verb to use for this web test.
   */
  httpVerb?: ExpressionOrValue<string> | undefined;
  /**
   * Parse Dependent request for this WebTest.
   */
  parseDependentRequests?: ExpressionOrValue<boolean> | undefined;
  /**
   * Base64 encoded string body to send with this web test.
   */
  requestBody?: ExpressionOrValue<string> | undefined;
  /**
   * Url location to test.
   */
  requestUrl?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The collection of request properties
 */
export type WebTestPropertiesRequestView = WebTestPropertiesRequestInput;

export const webTestPropertiesRequestShape: FlatModelShape = createFlatModelShape({
  followRedirects: { armPath: ["FollowRedirects"], value: createBooleanShape() },
  headers: {
    armPath: ["Headers"],
    value: createArrayShape(createDeferredShape(() => headerFieldShape)),
  },
  httpVerb: { armPath: ["HttpVerb"], value: createStringShape() },
  parseDependentRequests: { armPath: ["ParseDependentRequests"], value: createBooleanShape() },
  requestBody: { armPath: ["RequestBody"], value: createStringShape() },
  requestUrl: { armPath: ["RequestUrl"], value: createStringShape() },
});

/**
 * The collection of validation rule properties
 */
export interface WebTestPropertiesValidationRules {
  /**
   * The collection of content validation properties
   */
  contentValidation?: WebTestPropertiesValidationRulesContentValidation;
  /**
   * Validate that the WebTest returns the http status code provided.
   */
  expectedHttpStatusCode?: number;
  /**
   * When set, validation will ignore the status code.
   */
  ignoreHttpStatusCode?: boolean;
  /**
   * A number of days to check still remain before the the existing SSL cert expires. Value must be positive and the SSLCheck must be set to true.
   */
  sSlCertRemainingLifetimeCheck?: number;
  /**
   * Checks to see if the SSL cert is still valid.
   */
  sSlCheck?: boolean;
}

/**
 * Input type for The collection of validation rule properties
 */
export interface WebTestPropertiesValidationRulesInput extends InputOf<WebTestPropertiesValidationRules> {
  /**
   * The collection of content validation properties
   */
  contentValidation?: WebTestPropertiesValidationRulesContentValidationInput | undefined;
  /**
   * Validate that the WebTest returns the http status code provided.
   */
  expectedHttpStatusCode?: ExpressionOrValue<number> | undefined;
  /**
   * When set, validation will ignore the status code.
   */
  ignoreHttpStatusCode?: ExpressionOrValue<boolean> | undefined;
  /**
   * A number of days to check still remain before the the existing SSL cert expires. Value must be positive and the SSLCheck must be set to true.
   */
  sSlCertRemainingLifetimeCheck?: ExpressionOrValue<number> | undefined;
  /**
   * Checks to see if the SSL cert is still valid.
   */
  sSlCheck?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for The collection of validation rule properties
 */
export type WebTestPropertiesValidationRulesView = WebTestPropertiesValidationRulesInput;

export const webTestPropertiesValidationRulesShape: FlatModelShape = createFlatModelShape({
  contentValidation: {
    armPath: ["ContentValidation"],
    value: createDeferredShape(() => webTestPropertiesValidationRulesContentValidationShape),
  },
  expectedHttpStatusCode: { armPath: ["ExpectedHttpStatusCode"], value: createNumberShape() },
  ignoreHttpStatusCode: { armPath: ["IgnoreHttpStatusCode"], value: createBooleanShape() },
  sSlCertRemainingLifetimeCheck: {
    armPath: ["SSLCertRemainingLifetimeCheck"],
    value: createNumberShape(),
  },
  sSlCheck: { armPath: ["SSLCheck"], value: createBooleanShape() },
});

/**
 * The collection of content validation properties
 */
export interface WebTestPropertiesValidationRulesContentValidation {
  /**
   * Content to look for in the return of the WebTest. Must not be null or empty.
   */
  contentMatch?: string;
  /**
   * When set, this value makes the ContentMatch validation case insensitive.
   */
  ignoreCase?: boolean;
  /**
   * When true, validation will pass if there is a match for the ContentMatch string. If false, validation will fail if there is a match
   */
  passIfTextFound?: boolean;
}

/**
 * Input type for The collection of content validation properties
 */
export interface WebTestPropertiesValidationRulesContentValidationInput extends InputOf<WebTestPropertiesValidationRulesContentValidation> {
  /**
   * Content to look for in the return of the WebTest. Must not be null or empty.
   */
  contentMatch?: ExpressionOrValue<string> | undefined;
  /**
   * When set, this value makes the ContentMatch validation case insensitive.
   */
  ignoreCase?: ExpressionOrValue<boolean> | undefined;
  /**
   * When true, validation will pass if there is a match for the ContentMatch string. If false, validation will fail if there is a match
   */
  passIfTextFound?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for The collection of content validation properties
 */
export type WebTestPropertiesValidationRulesContentValidationView =
  WebTestPropertiesValidationRulesContentValidationInput;

export const webTestPropertiesValidationRulesContentValidationShape: FlatModelShape =
  createFlatModelShape({
    contentMatch: { armPath: ["ContentMatch"], value: createStringShape() },
    ignoreCase: { armPath: ["IgnoreCase"], value: createBooleanShape() },
    passIfTextFound: { armPath: ["PassIfTextFound"], value: createBooleanShape() },
  });

/**
 * Properties that contain a workbook.
 */
export interface WorkbookProperties {
  /**
   * Workbook category, as defined by the user at creation time.
   */
  category: string;
  /**
   * The description of the workbook.
   */
  description?: string | null;
  /**
   * The user-defined name (display name) of the workbook.
   */
  displayName: string;
  /**
   * The unique revision id for this workbook definition
   */
  revision?: string | null;
  /**
   * Configuration of this particular workbook. Configuration data is a string containing valid JSON
   */
  serializedData: string | null;
  /**
   * ResourceId for a source resource.
   */
  sourceId?: string;
  /**
   * The resourceId to the storage account when bring your own storage is used
   */
  storageUri?: string | null;
  /**
   * Being deprecated, please use the other tags field
   */
  tags?: string[];
  /**
   * Date and time in UTC of the last modification that was made to this workbook definition.
   */
  timeModified?: Date;
  /**
   * Unique user id of the specific user that owns this workbook.
   */
  userId?: string;
  /**
   * Workbook schema version format, like 'Notebook/1.0', which should match the workbook in serializedData
   */
  version?: string;
}

/**
 * Input type for Properties that contain a workbook.
 */
export interface WorkbookPropertiesInput extends InputOf<WorkbookProperties> {
  /**
   * Workbook category, as defined by the user at creation time.
   */
  category: ExpressionOrValue<string>;
  /**
   * The description of the workbook.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * The user-defined name (display name) of the workbook.
   */
  displayName: ExpressionOrValue<string>;
  /**
   * Configuration of this particular workbook. Configuration data is a string containing valid JSON
   */
  serializedData: ExpressionOrValue<string | null>;
  /**
   * ResourceId for a source resource.
   */
  sourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The resourceId to the storage account when bring your own storage is used
   */
  storageUri?: ExpressionOrValue<string | null> | undefined;
  /**
   * Being deprecated, please use the other tags field
   */
  tags?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Workbook schema version format, like 'Notebook/1.0', which should match the workbook in serializedData
   */
  version?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties that contain a workbook.
 */
export interface WorkbookPropertiesView extends InputOf<WorkbookProperties> {
  /**
   * Workbook category, as defined by the user at creation time.
   */
  category: ExpressionOrValue<string>;
  /**
   * The description of the workbook.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * The user-defined name (display name) of the workbook.
   */
  displayName: ExpressionOrValue<string>;
  /**
   * Read-only output: The unique revision id for this workbook definition
   */
  readonly revision?: Expression<string | null> | undefined;
  /**
   * Configuration of this particular workbook. Configuration data is a string containing valid JSON
   */
  serializedData: ExpressionOrValue<string | null>;
  /**
   * ResourceId for a source resource.
   */
  sourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The resourceId to the storage account when bring your own storage is used
   */
  storageUri?: ExpressionOrValue<string | null> | undefined;
  /**
   * Being deprecated, please use the other tags field
   */
  tags?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Read-only output: Date and time in UTC of the last modification that was made to this workbook definition.
   */
  readonly timeModified?: Expression<Date> | undefined;
  /**
   * Read-only output: Unique user id of the specific user that owns this workbook.
   */
  readonly userId?: Expression<string> | undefined;
  /**
   * Workbook schema version format, like 'Notebook/1.0', which should match the workbook in serializedData
   */
  version?: ExpressionOrValue<string> | undefined;
}

export const workbookPropertiesShape: FlatModelShape = createFlatModelShape({
  category: { armPath: ["category"], value: createStringShape() },
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  revision: { armPath: ["revision"], value: createStringShape(), readOnly: true },
  serializedData: { armPath: ["serializedData"], value: createStringShape() },
  sourceId: { armPath: ["sourceId"], value: createStringShape() },
  storageUri: { armPath: ["storageUri"], value: createStringShape() },
  tags: { armPath: ["tags"], value: createArrayShape(createStringShape()) },
  timeModified: {
    armPath: ["timeModified"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  userId: { armPath: ["userId"], value: createStringShape(), readOnly: true },
  version: { armPath: ["version"], value: createStringShape() },
});

/**
 * Identity used for BYOS
 */
export interface WorkbookResourceIdentity {
  /**
   * The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  principalId?: string;
  /**
   * The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  tenantId?: string;
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ManagedServiceIdentityType;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

/**
 * Input type for Identity used for BYOS
 */
export interface WorkbookResourceIdentityInput extends InputOf<WorkbookResourceIdentity> {
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ExpressionOrValue<ManagedServiceIdentityType>;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?:
    | InputRecord<
        UserAssignedIdentityInput | ExpressionOrValue<null>,
        Record<string, UserAssignedIdentity | null>
      >
    | undefined;
}

/**
 * View type for Identity used for BYOS
 */
export interface WorkbookResourceIdentityView extends InputOf<WorkbookResourceIdentity> {
  /**
   * Read-only output: The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ExpressionOrValue<ManagedServiceIdentityType>;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?:
    | InputRecord<
        UserAssignedIdentityView | ExpressionOrValue<null>,
        Record<string, UserAssignedIdentity | null>
      >
    | undefined;
}

export const workbookResourceIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userAssignedIdentityShape)),
  },
});

/**
 * Gallery information for a workbook template.
 */
export interface WorkbookTemplateGallery {
  /**
   * Category for the gallery.
   */
  category?: string;
  /**
   * Name of the workbook template in the gallery.
   */
  name?: string;
  /**
   * Order of the template within the gallery.
   */
  order?: number;
  /**
   * Azure resource type supported by the gallery.
   */
  resourceType?: string;
  /**
   * Type of workbook supported by the workbook template.
   */
  type?: string;
}

/**
 * Input type for Gallery information for a workbook template.
 */
export interface WorkbookTemplateGalleryInput extends InputOf<WorkbookTemplateGallery> {
  /**
   * Category for the gallery.
   */
  category?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the workbook template in the gallery.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Order of the template within the gallery.
   */
  order?: ExpressionOrValue<number> | undefined;
  /**
   * Azure resource type supported by the gallery.
   */
  resourceType?: ExpressionOrValue<string> | undefined;
  /**
   * Type of workbook supported by the workbook template.
   */
  type?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Gallery information for a workbook template.
 */
export type WorkbookTemplateGalleryView = WorkbookTemplateGalleryInput;

export const workbookTemplateGalleryShape: FlatModelShape = createFlatModelShape({
  category: { armPath: ["category"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
  order: { armPath: ["order"], value: createNumberShape() },
  resourceType: { armPath: ["resourceType"], value: createStringShape() },
  type: { armPath: ["type"], value: createStringShape() },
});

/**
 * Localized template data and gallery information.
 */
export interface WorkbookTemplateLocalizedGallery {
  /**
   * Workbook galleries supported by the template.
   */
  galleries?: WorkbookTemplateGallery[];
  /**
   * Valid JSON object containing workbook template payload.
   */
  templateData?: any;
}

/**
 * Input type for Localized template data and gallery information.
 */
export interface WorkbookTemplateLocalizedGalleryInput extends InputOf<WorkbookTemplateLocalizedGallery> {
  /**
   * Workbook galleries supported by the template.
   */
  galleries?: InputArray<WorkbookTemplateGalleryInput, WorkbookTemplateGallery[]> | undefined;
  /**
   * Valid JSON object containing workbook template payload.
   */
  templateData?: any | undefined;
}

/**
 * View type for Localized template data and gallery information.
 */
export type WorkbookTemplateLocalizedGalleryView = WorkbookTemplateLocalizedGalleryInput;

export const workbookTemplateLocalizedGalleryShape: FlatModelShape = createFlatModelShape({
  galleries: {
    armPath: ["galleries"],
    value: createArrayShape(createDeferredShape(() => workbookTemplateGalleryShape)),
  },
  templateData: { armPath: ["templateData"], value: createAnyShape() },
});

/**
 * Properties that contain a workbook template.
 */
export interface WorkbookTemplateProperties {
  /**
   * Information about the author of the workbook template.
   */
  author?: string;
  /**
   * Workbook galleries supported by the template.
   */
  galleries: WorkbookTemplateGallery[];
  /**
   * Key value pair of localized gallery. Each key is the locale code of languages supported by the Azure portal.
   */
  localized?: Record<string, WorkbookTemplateLocalizedGallery[]>;
  /**
   * Priority of the template. Determines which template to open when a workbook gallery is opened in viewer mode.
   */
  priority?: number;
  /**
   * Valid JSON object containing workbook template payload.
   */
  templateData: any;
}

/**
 * Input type for Properties that contain a workbook template.
 */
export interface WorkbookTemplatePropertiesInput extends InputOf<WorkbookTemplateProperties> {
  /**
   * Information about the author of the workbook template.
   */
  author?: ExpressionOrValue<string> | undefined;
  /**
   * Workbook galleries supported by the template.
   */
  galleries: InputArray<WorkbookTemplateGalleryInput, WorkbookTemplateGallery[]>;
  /**
   * Key value pair of localized gallery. Each key is the locale code of languages supported by the Azure portal.
   */
  localized?:
    | InputRecord<
        InputArray<WorkbookTemplateLocalizedGalleryInput, WorkbookTemplateLocalizedGallery[]>,
        Record<string, WorkbookTemplateLocalizedGallery[]>
      >
    | undefined;
  /**
   * Priority of the template. Determines which template to open when a workbook gallery is opened in viewer mode.
   */
  priority?: ExpressionOrValue<number> | undefined;
  /**
   * Valid JSON object containing workbook template payload.
   */
  templateData: any;
}

/**
 * View type for Properties that contain a workbook template.
 */
export type WorkbookTemplatePropertiesView = WorkbookTemplatePropertiesInput;

export const workbookTemplatePropertiesShape: FlatModelShape = createFlatModelShape({
  author: { armPath: ["author"], value: createStringShape() },
  galleries: {
    armPath: ["galleries"],
    value: createArrayShape(createDeferredShape(() => workbookTemplateGalleryShape)),
  },
  localized: {
    armPath: ["localized"],
    value: createRecordShape(
      createArrayShape(createDeferredShape(() => workbookTemplateLocalizedGalleryShape)),
    ),
  },
  priority: { armPath: ["priority"], value: createNumberShape() },
  templateData: { armPath: ["templateData"], value: createAnyShape() },
});

/**
 * Type of application being monitored.
 *
 * Known values:
 *
 * - `"web"`: web
 *
 * - `"other"`: other
 */
export type ApplicationType = string;

/**
 * Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API.
 *
 * Known values:
 *
 * - `"Bluefield"`: Bluefield
 */
export type FlowType = string;

/**
 * Indicates the flow of the ingestion.
 *
 * Known values:
 *
 * - `"ApplicationInsights"`: ApplicationInsights
 *
 * - `"ApplicationInsightsWithDiagnosticSettings"`: ApplicationInsightsWithDiagnosticSettings
 *
 * - `"LogAnalytics"`: LogAnalytics
 */
export type IngestionMode = string;

/**
 * Enum indicating if this item definition is owned by a specific user or is shared between all users with access to the Application Insights component.
 *
 * Known values:
 *
 * - `"shared"`: shared
 *
 * - `"user"`: user
 */
export type ItemScope = string;

/**
 * Enum indicating the type of the Analytics item.
 *
 * Known values:
 *
 * - `"none"`: none
 *
 * - `"query"`: query
 *
 * - `"recent"`: recent
 *
 * - `"function"`: function
 */
export type ItemType = string;

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed).
 *
 * Known values:
 *
 * - `"None"`: No managed identity.
 *
 * - `"SystemAssigned"`: System assigned managed identity.
 *
 * - `"UserAssigned"`: User assigned managed identity.
 *
 * - `"SystemAssigned,UserAssigned"`: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/**
 * The network access type for operating on the Application Insights Component. By default it is Enabled
 *
 * Known values:
 *
 * - `"Enabled"`: Enables connectivity to Application Insights through public DNS.
 *
 * - `"Disabled"`: Disables public connectivity to Application Insights through public DNS.
 */
export type PublicNetworkAccessType = string;

/**
 * Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'.
 *
 * Known values:
 *
 * - `"rest"`: rest
 */
export type RequestSource = string;

/**
 * Known values:
 *
 * - `"ServiceProfiler"`: ServiceProfiler
 */
export type StorageType = string;

/**
 * The kind of workbook. Only valid value is shared.
 *
 * Known values:
 *
 * - `"shared"`: shared
 */
export type WorkbookSharedTypeKind = string;
