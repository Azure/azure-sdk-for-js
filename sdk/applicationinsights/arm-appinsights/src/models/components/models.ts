// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An Application Insights component definition. */
export interface ApplicationInsightsComponent extends ComponentsResource {
  /** The kind of application that this component refers to, used to customize UI. This value is a freeform string, values should typically be one of the following: web, ios, other, store, java, phone. */
  kind: string;
  /** Resource etag */
  etag?: string;
  /** The unique ID of your application. This field mirrors the 'Name' field and cannot be changed. */
  readonly applicationId?: string;
  /** Application Insights Unique ID for your Application. */
  readonly appId?: string;
  /** Application name. */
  readonly namePropertiesName?: string;
  /** Type of application being monitored. */
  applicationType?: ApplicationType;
  /** Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API. */
  flowType?: FlowType;
  /** Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'. */
  requestSource?: RequestSource;
  /** Application Insights Instrumentation key. A read-only value that applications can use to identify the destination for all telemetry sent to Azure Application Insights. This value will be supplied upon construction of each new Application Insights component. */
  readonly instrumentationKey?: string;
  /** Creation Date for the Application Insights component, in ISO 8601 format. */
  readonly creationDate?: Date;
  /** Azure Tenant Id. */
  readonly tenantId?: string;
  /** The unique application ID created when a new application is added to HockeyApp, used for communications with HockeyApp. */
  hockeyAppId?: string;
  /** Token used to authenticate communications with between Application Insights and HockeyApp. */
  readonly hockeyAppToken?: string;
  /** Current state of this component: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed. */
  readonly provisioningState?: string;
  /** Percentage of the data produced by the application being monitored that is being sampled for Application Insights telemetry. */
  samplingPercentage?: number;
  /** Application Insights component connection string. */
  readonly connectionString?: string;
  /** Retention period in days. */
  retentionInDays?: number;
  /** Disable IP masking. */
  disableIpMasking?: boolean;
  /** Purge data immediately after 30 days. */
  immediatePurgeDataOn30Days?: boolean;
  /** Resource Id of the log analytics workspace which the data will be ingested to. This property is required to create an application with this API version. Applications from older versions will not have this property. */
  workspaceResourceId?: string;
  /** The date which the component got migrated to LA, in ISO 8601 format. */
  readonly laMigrationDate?: Date;
  /** List of linked private link scope resources. */
  readonly privateLinkScopedResources?: PrivateLinkScopedResource[];
  /** The network access type for accessing Application Insights ingestion. */
  publicNetworkAccessForIngestion?: PublicNetworkAccessType;
  /** The network access type for accessing Application Insights query. */
  publicNetworkAccessForQuery?: PublicNetworkAccessType;
  /** Indicates the flow of the ingestion. */
  ingestionMode?: IngestionMode;
  /** Disable Non-AAD based Auth. */
  disableLocalAuth?: boolean;
  /** Force users to create their own storage account for profiler and debugger. */
  forceCustomerStorageForProfiler?: boolean;
}

export function applicationInsightsComponentSerializer(item: ApplicationInsightsComponent): any {
  return {
    location: item["location"],
    tags: item["tags"],
    kind: item["kind"],
    etag: item["etag"],
    properties: areAllPropsUndefined(item, [
      "applicationType",
      "flowType",
      "requestSource",
      "hockeyAppId",
      "samplingPercentage",
      "retentionInDays",
      "disableIpMasking",
      "immediatePurgeDataOn30Days",
      "workspaceResourceId",
      "publicNetworkAccessForIngestion",
      "publicNetworkAccessForQuery",
      "ingestionMode",
      "disableLocalAuth",
      "forceCustomerStorageForProfiler",
    ])
      ? undefined
      : _applicationInsightsComponentPropertiesSerializer(item),
  };
}

export function applicationInsightsComponentDeserializer(item: any): ApplicationInsightsComponent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    kind: item["kind"],
    etag: item["etag"],
    ...(!item["properties"]
      ? item["properties"]
      : _applicationInsightsComponentPropertiesDeserializer(item["properties"])),
  };
}

/** Properties that define an Application Insights component resource. */
export interface ApplicationInsightsComponentProperties {
  /** The unique ID of your application. This field mirrors the 'Name' field and cannot be changed. */
  readonly applicationId?: string;
  /** Application Insights Unique ID for your Application. */
  readonly appId?: string;
  /** Application name. */
  readonly name?: string;
  /** Type of application being monitored. */
  applicationType: ApplicationType;
  /** Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API. */
  flowType?: FlowType;
  /** Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'. */
  requestSource?: RequestSource;
  /** Application Insights Instrumentation key. A read-only value that applications can use to identify the destination for all telemetry sent to Azure Application Insights. This value will be supplied upon construction of each new Application Insights component. */
  readonly instrumentationKey?: string;
  /** Creation Date for the Application Insights component, in ISO 8601 format. */
  readonly creationDate?: Date;
  /** Azure Tenant Id. */
  readonly tenantId?: string;
  /** The unique application ID created when a new application is added to HockeyApp, used for communications with HockeyApp. */
  hockeyAppId?: string;
  /** Token used to authenticate communications with between Application Insights and HockeyApp. */
  readonly hockeyAppToken?: string;
  /** Current state of this component: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed. */
  readonly provisioningState?: string;
  /** Percentage of the data produced by the application being monitored that is being sampled for Application Insights telemetry. */
  samplingPercentage?: number;
  /** Application Insights component connection string. */
  readonly connectionString?: string;
  /** Retention period in days. */
  retentionInDays?: number;
  /** Disable IP masking. */
  disableIpMasking?: boolean;
  /** Purge data immediately after 30 days. */
  immediatePurgeDataOn30Days?: boolean;
  /** Resource Id of the log analytics workspace which the data will be ingested to. This property is required to create an application with this API version. Applications from older versions will not have this property. */
  workspaceResourceId?: string;
  /** The date which the component got migrated to LA, in ISO 8601 format. */
  readonly laMigrationDate?: Date;
  /** List of linked private link scope resources. */
  readonly privateLinkScopedResources?: PrivateLinkScopedResource[];
  /** The network access type for accessing Application Insights ingestion. */
  publicNetworkAccessForIngestion?: PublicNetworkAccessType;
  /** The network access type for accessing Application Insights query. */
  publicNetworkAccessForQuery?: PublicNetworkAccessType;
  /** Indicates the flow of the ingestion. */
  ingestionMode?: IngestionMode;
  /** Disable Non-AAD based Auth. */
  disableLocalAuth?: boolean;
  /** Force users to create their own storage account for profiler and debugger. */
  forceCustomerStorageForProfiler?: boolean;
}

export function applicationInsightsComponentPropertiesSerializer(
  item: ApplicationInsightsComponentProperties,
): any {
  return {
    Application_Type: item["applicationType"],
    Flow_Type: item["flowType"],
    Request_Source: item["requestSource"],
    HockeyAppId: item["hockeyAppId"],
    SamplingPercentage: item["samplingPercentage"],
    RetentionInDays: item["retentionInDays"],
    DisableIpMasking: item["disableIpMasking"],
    ImmediatePurgeDataOn30Days: item["immediatePurgeDataOn30Days"],
    WorkspaceResourceId: item["workspaceResourceId"],
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    IngestionMode: item["ingestionMode"],
    DisableLocalAuth: item["disableLocalAuth"],
    ForceCustomerStorageForProfiler: item["forceCustomerStorageForProfiler"],
  };
}

export function applicationInsightsComponentPropertiesDeserializer(
  item: any,
): ApplicationInsightsComponentProperties {
  return {
    applicationId: item["ApplicationId"],
    appId: item["AppId"],
    name: item["Name"],
    applicationType: item["Application_Type"],
    flowType: item["Flow_Type"],
    requestSource: item["Request_Source"],
    instrumentationKey: item["InstrumentationKey"],
    creationDate: !item["CreationDate"] ? item["CreationDate"] : new Date(item["CreationDate"]),
    tenantId: item["TenantId"],
    hockeyAppId: item["HockeyAppId"],
    hockeyAppToken: item["HockeyAppToken"],
    provisioningState: item["provisioningState"],
    samplingPercentage: item["SamplingPercentage"],
    connectionString: item["ConnectionString"],
    retentionInDays: item["RetentionInDays"],
    disableIpMasking: item["DisableIpMasking"],
    immediatePurgeDataOn30Days: item["ImmediatePurgeDataOn30Days"],
    workspaceResourceId: item["WorkspaceResourceId"],
    laMigrationDate: !item["LaMigrationDate"]
      ? item["LaMigrationDate"]
      : new Date(item["LaMigrationDate"]),
    privateLinkScopedResources: !item["PrivateLinkScopedResources"]
      ? item["PrivateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["PrivateLinkScopedResources"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    ingestionMode: item["IngestionMode"],
    disableLocalAuth: item["DisableLocalAuth"],
    forceCustomerStorageForProfiler: item["ForceCustomerStorageForProfiler"],
  };
}

/** Type of application being monitored. */
export enum KnownApplicationType {
  /** web */
  Web = "web",
  /** other */
  Other = "other",
}

/**
 * Type of application being monitored. \
 * {@link KnownApplicationType} can be used interchangeably with ApplicationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **web**: web \
 * **other**: other
 */
export type ApplicationType = string;

/** Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API. */
export enum KnownFlowType {
  /** Bluefield */
  Bluefield = "Bluefield",
}

/**
 * Used by the Application Insights system to determine what kind of flow this component was created by. This is to be set to 'Bluefield' when creating/updating a component via the REST API. \
 * {@link KnownFlowType} can be used interchangeably with FlowType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bluefield**: Bluefield
 */
export type FlowType = string;

/** Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'. */
export enum KnownRequestSource {
  /** rest */
  Rest = "rest",
}

/**
 * Describes what tool created this Application Insights component. Customers using this API should set this to the default 'rest'. \
 * {@link KnownRequestSource} can be used interchangeably with RequestSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **rest**: rest
 */
export type RequestSource = string;

export function privateLinkScopedResourceArrayDeserializer(
  result: Array<PrivateLinkScopedResource>,
): any[] {
  return result.map((item) => {
    return privateLinkScopedResourceDeserializer(item);
  });
}

/** The private link scope resource reference. */
export interface PrivateLinkScopedResource {
  /** The full resource Id of the private link scope resource. */
  resourceId?: string;
  /** The private link scope unique Identifier. */
  scopeId?: string;
}

export function privateLinkScopedResourceDeserializer(item: any): PrivateLinkScopedResource {
  return {
    resourceId: item["ResourceId"],
    scopeId: item["ScopeId"],
  };
}

/** The network access type for operating on the Application Insights Component. By default it is Enabled */
export enum KnownPublicNetworkAccessType {
  /** Enables connectivity to Application Insights through public DNS. */
  Enabled = "Enabled",
  /** Disables public connectivity to Application Insights through public DNS. */
  Disabled = "Disabled",
}

/**
 * The network access type for operating on the Application Insights Component. By default it is Enabled \
 * {@link KnownPublicNetworkAccessType} can be used interchangeably with PublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enables connectivity to Application Insights through public DNS. \
 * **Disabled**: Disables public connectivity to Application Insights through public DNS.
 */
export type PublicNetworkAccessType = string;

/** Indicates the flow of the ingestion. */
export enum KnownIngestionMode {
  /** ApplicationInsights */
  ApplicationInsights = "ApplicationInsights",
  /** ApplicationInsightsWithDiagnosticSettings */
  ApplicationInsightsWithDiagnosticSettings = "ApplicationInsightsWithDiagnosticSettings",
  /** LogAnalytics */
  LogAnalytics = "LogAnalytics",
}

/**
 * Indicates the flow of the ingestion. \
 * {@link KnownIngestionMode} can be used interchangeably with IngestionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ApplicationInsights**: ApplicationInsights \
 * **ApplicationInsightsWithDiagnosticSettings**: ApplicationInsightsWithDiagnosticSettings \
 * **LogAnalytics**: LogAnalytics
 */
export type IngestionMode = string;

/** An azure resource object */
export interface ComponentsResource {
  /** Azure resource Id */
  readonly id?: string;
  /** Azure resource name */
  readonly name?: string;
  /** Azure resource type */
  readonly type?: string;
  /** Resource location */
  location: string;
  /** Resource tags */
  tags?: Record<string, string>;
}

export function componentsResourceSerializer(item: ComponentsResource): any {
  return { location: item["location"], tags: item["tags"] };
}

export function componentsResourceDeserializer(item: any): ComponentsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** model interface ErrorResponseComponents */
export interface ErrorResponseComponents {
  /** Error response indicates Insights service is not able to process the incoming request. The reason is provided in the error message. */
  error?: ErrorResponseComponentsError;
}

export function errorResponseComponentsDeserializer(item: any): ErrorResponseComponents {
  return {
    error: !item["error"] ? item["error"] : errorResponseComponentsErrorDeserializer(item["error"]),
  };
}

/** Error response indicates Insights service is not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorResponseComponentsError {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function errorResponseComponentsErrorDeserializer(item: any): ErrorResponseComponentsError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function applicationInsightsComponentArraySerializer(
  result: Array<ApplicationInsightsComponent>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentSerializer(item);
  });
}

export function applicationInsightsComponentArrayDeserializer(
  result: Array<ApplicationInsightsComponent>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentDeserializer(item);
  });
}

/** Describes the body of a purge request for an App Insights component */
export interface ComponentPurgeBody {
  /** Table from which to purge data. */
  table: string;
  /** The set of columns and filters (queries) to run over them to purge the resulting data. */
  filters: ComponentPurgeBodyFilters[];
}

export function componentPurgeBodySerializer(item: ComponentPurgeBody): any {
  return {
    table: item["table"],
    filters: componentPurgeBodyFiltersArraySerializer(item["filters"]),
  };
}

export function componentPurgeBodyFiltersArraySerializer(
  result: Array<ComponentPurgeBodyFilters>,
): any[] {
  return result.map((item) => {
    return componentPurgeBodyFiltersSerializer(item);
  });
}

/** User-defined filters to return data which will be purged from the table. */
export interface ComponentPurgeBodyFilters {
  /** The column of the table over which the given query should run */
  column?: string;
  /** A query operator to evaluate over the provided column and value(s). Supported operators are ==, =~, in, in~, >, >=, <, <=, between, and have the same behavior as they would in a KQL query. */
  operator?: string;
  /** the value for the operator to function over. This can be a number (e.g., > 100), a string (timestamp >= '2017-09-01') or array of values. */
  value?: any;
  /** When filtering over custom dimensions, this key will be used as the name of the custom dimension. */
  key?: string;
}

export function componentPurgeBodyFiltersSerializer(item: ComponentPurgeBodyFilters): any {
  return {
    column: item["column"],
    operator: item["operator"],
    value: item["value"],
    key: item["key"],
  };
}

/** Response containing operationId for a specific purge action. */
export interface ComponentPurgeResponse {
  /** Id to use when querying for status for a particular purge operation. */
  operationId: string;
}

export function componentPurgeResponseDeserializer(item: any): ComponentPurgeResponse {
  return {
    operationId: item["operationId"],
  };
}

/** Response containing status for a specific purge operation. */
export interface ComponentPurgeStatusResponse {
  /** Status of the operation represented by the requested Id. */
  status: PurgeState;
}

export function componentPurgeStatusResponseDeserializer(item: any): ComponentPurgeStatusResponse {
  return {
    status: item["status"],
  };
}

/** Status of the operation represented by the requested Id. */
export enum KnownPurgeState {
  /** pending */
  Pending = "pending",
  /** completed */
  Completed = "completed",
}

/**
 * Status of the operation represented by the requested Id. \
 * {@link KnownPurgeState} can be used interchangeably with PurgeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pending**: pending \
 * **completed**: completed
 */
export type PurgeState = string;

export function _applicationInsightsComponentPropertiesSerializer(
  item: ApplicationInsightsComponent,
): any {
  return {
    Application_Type: item["applicationType"],
    Flow_Type: item["flowType"],
    Request_Source: item["requestSource"],
    HockeyAppId: item["hockeyAppId"],
    SamplingPercentage: item["samplingPercentage"],
    RetentionInDays: item["retentionInDays"],
    DisableIpMasking: item["disableIpMasking"],
    ImmediatePurgeDataOn30Days: item["immediatePurgeDataOn30Days"],
    WorkspaceResourceId: item["workspaceResourceId"],
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    IngestionMode: item["ingestionMode"],
    DisableLocalAuth: item["disableLocalAuth"],
    ForceCustomerStorageForProfiler: item["forceCustomerStorageForProfiler"],
  };
}

export function _applicationInsightsComponentPropertiesDeserializer(item: any) {
  return {
    applicationId: item["ApplicationId"],
    appId: item["AppId"],
    namePropertiesName: item["Name"],
    applicationType: item["Application_Type"],
    flowType: item["Flow_Type"],
    requestSource: item["Request_Source"],
    instrumentationKey: item["InstrumentationKey"],
    creationDate: !item["CreationDate"] ? item["CreationDate"] : new Date(item["CreationDate"]),
    tenantId: item["TenantId"],
    hockeyAppId: item["HockeyAppId"],
    hockeyAppToken: item["HockeyAppToken"],
    provisioningState: item["provisioningState"],
    samplingPercentage: item["SamplingPercentage"],
    connectionString: item["ConnectionString"],
    retentionInDays: item["RetentionInDays"],
    disableIpMasking: item["DisableIpMasking"],
    immediatePurgeDataOn30Days: item["ImmediatePurgeDataOn30Days"],
    workspaceResourceId: item["WorkspaceResourceId"],
    laMigrationDate: !item["LaMigrationDate"]
      ? item["LaMigrationDate"]
      : new Date(item["LaMigrationDate"]),
    privateLinkScopedResources: !item["PrivateLinkScopedResources"]
      ? item["PrivateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["PrivateLinkScopedResources"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    ingestionMode: item["IngestionMode"],
    disableLocalAuth: item["DisableLocalAuth"],
    forceCustomerStorageForProfiler: item["ForceCustomerStorageForProfiler"],
  };
}
