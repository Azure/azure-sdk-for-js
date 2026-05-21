// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Annotations list result. */
export interface _AnnotationsListResult {
  /** An array of annotations. */
  readonly value?: Annotation[];
  /** The url to the next page of results. */
  nextLink?: string;
}

export function _annotationsListResultDeserializer(item: any): _AnnotationsListResult {
  return {
    value: !item["value"] ? item["value"] : annotationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function annotationArraySerializer(result: Array<Annotation>): any[] {
  return result.map((item) => {
    return annotationSerializer(item);
  });
}

export function annotationArrayDeserializer(result: Array<Annotation>): any[] {
  return result.map((item) => {
    return annotationDeserializer(item);
  });
}

/** Annotation associated with an application insights resource. */
export interface Annotation {
  /** Name of annotation */
  annotationName?: string;
  /** Category of annotation, free form */
  category?: string;
  /** Time when event occurred */
  eventTime?: Date;
  /** Unique Id for annotation */
  id?: string;
  /** Serialized JSON object for detailed properties */
  properties?: string;
  /** Related parent annotation if any */
  relatedAnnotation?: string;
}

export function annotationSerializer(item: Annotation): any {
  return {
    AnnotationName: item["annotationName"],
    Category: item["category"],
    EventTime: !item["eventTime"] ? item["eventTime"] : item["eventTime"].toISOString(),
    Id: item["id"],
    Properties: item["properties"],
    RelatedAnnotation: item["relatedAnnotation"],
  };
}

export function annotationDeserializer(item: any): Annotation {
  return {
    annotationName: item["AnnotationName"],
    category: item["Category"],
    eventTime: !item["EventTime"] ? item["EventTime"] : new Date(item["EventTime"]),
    id: item["Id"],
    properties: item["Properties"],
    relatedAnnotation: item["RelatedAnnotation"],
  };
}

/** Error associated with trying to create annotation with Id that already exist */
export interface AnnotationError {
  /** Error detail code and explanation */
  code?: string;
  /** Error message */
  message?: string;
  /** Inner error */
  innererror?: InnerError;
}

export function annotationErrorDeserializer(item: any): AnnotationError {
  return {
    code: item["code"],
    message: item["message"],
    innererror: !item["innererror"]
      ? item["innererror"]
      : innerErrorDeserializer(item["innererror"]),
  };
}

/** Inner error */
export interface InnerError {
  /** Provides correlation for request */
  diagnosticcontext?: string;
  /** Request time */
  time?: Date;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    diagnosticcontext: item["diagnosticcontext"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
  };
}

/** Describes the list of API Keys of an Application Insights Component. */
export interface _ApplicationInsightsComponentAPIKeyListResult {
  /** List of API Key definitions. */
  value: ApplicationInsightsComponentAPIKey[];
  /** The url to the next page of results. */
  nextLink?: string;
}

export function _applicationInsightsComponentAPIKeyListResultDeserializer(
  item: any,
): _ApplicationInsightsComponentAPIKeyListResult {
  return {
    value: applicationInsightsComponentAPIKeyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationInsightsComponentAPIKeyArrayDeserializer(
  result: Array<ApplicationInsightsComponentAPIKey>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentAPIKeyDeserializer(item);
  });
}

/** Properties that define an API key of an Application Insights Component. */
export interface ApplicationInsightsComponentAPIKey {
  /** The unique ID of the API key inside an Application Insights component. It is auto generated when the API key is created. */
  readonly id?: string;
  /** The API key value. It will be only return once when the API Key was created. */
  readonly apiKey?: string;
  /** The create date of this API key. */
  createdDate?: string;
  /** The name of the API key. */
  name?: string;
  /** The read access rights of this API Key. */
  linkedReadProperties?: string[];
  /** The write access rights of this API Key. */
  linkedWriteProperties?: string[];
}

export function applicationInsightsComponentAPIKeyDeserializer(
  item: any,
): ApplicationInsightsComponentAPIKey {
  return {
    id: item["id"],
    apiKey: item["apiKey"],
    createdDate: item["createdDate"],
    name: item["name"],
    linkedReadProperties: !item["linkedReadProperties"]
      ? item["linkedReadProperties"]
      : item["linkedReadProperties"].map((p: any) => {
          return p;
        }),
    linkedWriteProperties: !item["linkedWriteProperties"]
      ? item["linkedWriteProperties"]
      : item["linkedWriteProperties"].map((p: any) => {
          return p;
        }),
  };
}

/** An Application Insights component API Key creation request definition. */
export interface APIKeyRequest {
  /** The name of the API Key. */
  name?: string;
  /** The read access rights of this API Key. */
  linkedReadProperties?: string[];
  /** The write access rights of this API Key. */
  linkedWriteProperties?: string[];
}

export function apiKeyRequestSerializer(item: APIKeyRequest): any {
  return {
    name: item["name"],
    linkedReadProperties: !item["linkedReadProperties"]
      ? item["linkedReadProperties"]
      : item["linkedReadProperties"].map((p: any) => {
          return p;
        }),
    linkedWriteProperties: !item["linkedWriteProperties"]
      ? item["linkedWriteProperties"]
      : item["linkedWriteProperties"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties that define a Continuous Export configuration. */
export interface ApplicationInsightsComponentExportConfiguration {
  /** The unique ID of the export configuration inside an Application Insights component. It is auto generated when the Continuous Export configuration is created. */
  readonly exportId?: string;
  /** The instrumentation key of the Application Insights component. */
  readonly instrumentationKey?: string;
  /** This comma separated list of document types that will be exported. The possible values include 'Requests', 'Event', 'Exceptions', 'Metrics', 'PageViews', 'PageViewPerformance', 'Rdd', 'PerformanceCounters', 'Availability', 'Messages'. */
  recordTypes?: string;
  /** The name of the Application Insights component. */
  readonly applicationName?: string;
  /** The subscription of the Application Insights component. */
  readonly subscriptionId?: string;
  /** The resource group of the Application Insights component. */
  readonly resourceGroup?: string;
  /** The destination storage account subscription ID. */
  readonly destinationStorageSubscriptionId?: string;
  /** The destination account location ID. */
  readonly destinationStorageLocationId?: string;
  /** The name of destination account. */
  readonly destinationAccountId?: string;
  /** The destination type. */
  readonly destinationType?: string;
  /** This will be 'true' if the Continuous Export configuration is enabled, otherwise it will be 'false'. */
  readonly isUserEnabled?: string;
  /** Last time the Continuous Export configuration was updated. */
  readonly lastUserUpdate?: string;
  /** Deprecated */
  notificationQueueEnabled?: string;
  /** This indicates current Continuous Export configuration status. The possible values are 'Preparing', 'Success', 'Failure'. */
  readonly exportStatus?: string;
  /** The last time data was successfully delivered to the destination storage container for this Continuous Export configuration. */
  readonly lastSuccessTime?: string;
  /** The last time the Continuous Export configuration started failing. */
  readonly lastGapTime?: string;
  /** This is the reason the Continuous Export configuration started failing. It can be 'AzureStorageNotFound' or 'AzureStorageAccessDenied'. */
  readonly permanentErrorReason?: string;
  /** The name of the destination storage account. */
  readonly storageName?: string;
  /** The name of the destination storage container. */
  readonly containerName?: string;
}

export function applicationInsightsComponentExportConfigurationDeserializer(
  item: any,
): ApplicationInsightsComponentExportConfiguration {
  return {
    exportId: item["ExportId"],
    instrumentationKey: item["InstrumentationKey"],
    recordTypes: item["RecordTypes"],
    applicationName: item["ApplicationName"],
    subscriptionId: item["SubscriptionId"],
    resourceGroup: item["ResourceGroup"],
    destinationStorageSubscriptionId: item["DestinationStorageSubscriptionId"],
    destinationStorageLocationId: item["DestinationStorageLocationId"],
    destinationAccountId: item["DestinationAccountId"],
    destinationType: item["DestinationType"],
    isUserEnabled: item["IsUserEnabled"],
    lastUserUpdate: item["LastUserUpdate"],
    notificationQueueEnabled: item["NotificationQueueEnabled"],
    exportStatus: item["ExportStatus"],
    lastSuccessTime: item["LastSuccessTime"],
    lastGapTime: item["LastGapTime"],
    permanentErrorReason: item["PermanentErrorReason"],
    storageName: item["StorageName"],
    containerName: item["ContainerName"],
  };
}

/** An Application Insights component Continuous Export configuration request definition. */
export interface ApplicationInsightsComponentExportRequest {
  /** The document types to be exported, as comma separated values. Allowed values include 'Requests', 'Event', 'Exceptions', 'Metrics', 'PageViews', 'PageViewPerformance', 'Rdd', 'PerformanceCounters', 'Availability', 'Messages'. */
  recordTypes?: string;
  /** The Continuous Export destination type. This has to be 'Blob'. */
  destinationType?: string;
  /** The SAS URL for the destination storage container. It must grant write permission. */
  destinationAddress?: string;
  /** Set to 'true' to create a Continuous Export configuration as enabled, otherwise set it to 'false'. */
  isEnabled?: string;
  /** Deprecated */
  notificationQueueEnabled?: string;
  /** Deprecated */
  notificationQueueUri?: string;
  /** The subscription ID of the destination storage container. */
  destinationStorageSubscriptionId?: string;
  /** The location ID of the destination storage container. */
  destinationStorageLocationId?: string;
  /** The name of destination storage account. */
  destinationAccountId?: string;
}

export function applicationInsightsComponentExportRequestSerializer(
  item: ApplicationInsightsComponentExportRequest,
): any {
  return {
    RecordTypes: item["recordTypes"],
    DestinationType: item["destinationType"],
    DestinationAddress: item["destinationAddress"],
    IsEnabled: item["isEnabled"],
    NotificationQueueEnabled: item["notificationQueueEnabled"],
    NotificationQueueUri: item["notificationQueueUri"],
    DestinationStorageSubscriptionId: item["destinationStorageSubscriptionId"],
    DestinationStorageLocationId: item["destinationStorageLocationId"],
    DestinationAccountId: item["destinationAccountId"],
  };
}

/** An Application Insights component billing features */
export interface ApplicationInsightsComponentBillingFeatures {
  /** An Application Insights component daily data volume cap */
  dataVolumeCap?: ApplicationInsightsComponentDataVolumeCap;
  /** Current enabled pricing plan. When the component is in the Enterprise plan, this will list both 'Basic' and 'Application Insights Enterprise'. */
  currentBillingFeatures?: string[];
}

export function applicationInsightsComponentBillingFeaturesSerializer(
  item: ApplicationInsightsComponentBillingFeatures,
): any {
  return {
    DataVolumeCap: !item["dataVolumeCap"]
      ? item["dataVolumeCap"]
      : applicationInsightsComponentDataVolumeCapSerializer(item["dataVolumeCap"]),
    CurrentBillingFeatures: !item["currentBillingFeatures"]
      ? item["currentBillingFeatures"]
      : item["currentBillingFeatures"].map((p: any) => {
          return p;
        }),
  };
}

export function applicationInsightsComponentBillingFeaturesDeserializer(
  item: any,
): ApplicationInsightsComponentBillingFeatures {
  return {
    dataVolumeCap: !item["DataVolumeCap"]
      ? item["DataVolumeCap"]
      : applicationInsightsComponentDataVolumeCapDeserializer(item["DataVolumeCap"]),
    currentBillingFeatures: !item["CurrentBillingFeatures"]
      ? item["CurrentBillingFeatures"]
      : item["CurrentBillingFeatures"].map((p: any) => {
          return p;
        }),
  };
}

/** An Application Insights component daily data volume cap */
export interface ApplicationInsightsComponentDataVolumeCap {
  /** Daily data volume cap in GB. */
  cap?: number;
  /** Daily data volume cap UTC reset hour. */
  readonly resetTime?: number;
  /** Reserved, not used for now. */
  warningThreshold?: number;
  /** Reserved, not used for now. */
  stopSendNotificationWhenHitThreshold?: boolean;
  /** Do not send a notification email when the daily data volume cap is met. */
  stopSendNotificationWhenHitCap?: boolean;
  /** Maximum daily data volume cap that the user can set for this component. */
  readonly maxHistoryCap?: number;
}

export function applicationInsightsComponentDataVolumeCapSerializer(
  item: ApplicationInsightsComponentDataVolumeCap,
): any {
  return {
    Cap: item["cap"],
    WarningThreshold: item["warningThreshold"],
    StopSendNotificationWhenHitThreshold: item["stopSendNotificationWhenHitThreshold"],
    StopSendNotificationWhenHitCap: item["stopSendNotificationWhenHitCap"],
  };
}

export function applicationInsightsComponentDataVolumeCapDeserializer(
  item: any,
): ApplicationInsightsComponentDataVolumeCap {
  return {
    cap: item["Cap"],
    resetTime: item["ResetTime"],
    warningThreshold: item["WarningThreshold"],
    stopSendNotificationWhenHitThreshold: item["StopSendNotificationWhenHitThreshold"],
    stopSendNotificationWhenHitCap: item["StopSendNotificationWhenHitCap"],
    maxHistoryCap: item["MaxHistoryCap"],
  };
}

/** An Application Insights component daily data volume cap status */
export interface ApplicationInsightsComponentQuotaStatus {
  /** The Application ID for the Application Insights component. */
  readonly appId?: string;
  /** The daily data volume cap is met, and data ingestion will be stopped. */
  readonly shouldBeThrottled?: boolean;
  /** Date and time when the daily data volume cap will be reset, and data ingestion will resume. */
  readonly expirationTime?: string;
}

export function applicationInsightsComponentQuotaStatusDeserializer(
  item: any,
): ApplicationInsightsComponentQuotaStatus {
  return {
    appId: item["AppId"],
    shouldBeThrottled: item["ShouldBeThrottled"],
    expirationTime: item["ExpirationTime"],
  };
}

/** An Application Insights component feature capabilities */
export interface ApplicationInsightsComponentFeatureCapabilities {
  /** Whether allow to use continuous export feature. */
  readonly supportExportData?: boolean;
  /** Reserved, not used now. */
  readonly burstThrottlePolicy?: string;
  /** Reserved, not used now. */
  readonly metadataClass?: string;
  /** Reserved, not used now. */
  readonly liveStreamMetrics?: boolean;
  /** Reserved, not used now. */
  readonly applicationMap?: boolean;
  /** Whether allow to use work item integration feature. */
  readonly workItemIntegration?: boolean;
  /** Reserved, not used now. */
  readonly powerBIIntegration?: boolean;
  /** Reserved, not used now. */
  readonly openSchema?: boolean;
  /** Reserved, not used now. */
  readonly proactiveDetection?: boolean;
  /** Reserved, not used now. */
  readonly analyticsIntegration?: boolean;
  /** Whether allow to use multiple steps web test feature. */
  readonly multipleStepWebTest?: boolean;
  /** Reserved, not used now. */
  readonly apiAccessLevel?: string;
  /** The application insights component used tracking type. */
  readonly trackingType?: string;
  /** Daily data volume cap in GB. */
  readonly dailyCap?: number;
  /** Daily data volume cap UTC reset hour. */
  readonly dailyCapResetTime?: number;
  /** Reserved, not used now. */
  readonly throttleRate?: number;
}

export function applicationInsightsComponentFeatureCapabilitiesDeserializer(
  item: any,
): ApplicationInsightsComponentFeatureCapabilities {
  return {
    supportExportData: item["SupportExportData"],
    burstThrottlePolicy: item["BurstThrottlePolicy"],
    metadataClass: item["MetadataClass"],
    liveStreamMetrics: item["LiveStreamMetrics"],
    applicationMap: item["ApplicationMap"],
    workItemIntegration: item["WorkItemIntegration"],
    powerBIIntegration: item["PowerBIIntegration"],
    openSchema: item["OpenSchema"],
    proactiveDetection: item["ProactiveDetection"],
    analyticsIntegration: item["AnalyticsIntegration"],
    multipleStepWebTest: item["MultipleStepWebTest"],
    apiAccessLevel: item["ApiAccessLevel"],
    trackingType: item["TrackingType"],
    dailyCap: item["DailyCap"],
    dailyCapResetTime: item["DailyCapResetTime"],
    throttleRate: item["ThrottleRate"],
  };
}

/** An Application Insights component available features. */
export interface ApplicationInsightsComponentAvailableFeatures {
  /** A list of Application Insights component feature. */
  readonly result?: ApplicationInsightsComponentFeature[];
}

export function applicationInsightsComponentAvailableFeaturesDeserializer(
  item: any,
): ApplicationInsightsComponentAvailableFeatures {
  return {
    result: !item["Result"]
      ? item["Result"]
      : applicationInsightsComponentFeatureArrayDeserializer(item["Result"]),
  };
}

export function applicationInsightsComponentFeatureArrayDeserializer(
  result: Array<ApplicationInsightsComponentFeature>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentFeatureDeserializer(item);
  });
}

/** An Application Insights component daily data volume cap status */
export interface ApplicationInsightsComponentFeature {
  /** The pricing feature name. */
  readonly featureName?: string;
  /** The meter id used for the feature. */
  readonly meterId?: string;
  /** The meter rate for the feature's meter. */
  readonly meterRateFrequency?: string;
  /** Reserved, not used now. */
  readonly resouceId?: string;
  /** Reserved, not used now. */
  readonly isHidden?: boolean;
  /** A list of Application Insights component feature capability. */
  readonly capabilities?: ApplicationInsightsComponentFeatureCapability[];
  /** Display name of the feature. */
  readonly title?: string;
  /** Whether can apply addon feature on to it. */
  readonly isMainFeature?: boolean;
  /** The add on features on main feature. */
  readonly supportedAddonFeatures?: string;
}

export function applicationInsightsComponentFeatureDeserializer(
  item: any,
): ApplicationInsightsComponentFeature {
  return {
    featureName: item["FeatureName"],
    meterId: item["MeterId"],
    meterRateFrequency: item["MeterRateFrequency"],
    resouceId: item["ResouceId"],
    isHidden: item["IsHidden"],
    capabilities: !item["Capabilities"]
      ? item["Capabilities"]
      : applicationInsightsComponentFeatureCapabilityArrayDeserializer(item["Capabilities"]),
    title: item["Title"],
    isMainFeature: item["IsMainFeature"],
    supportedAddonFeatures: item["SupportedAddonFeatures"],
  };
}

export function applicationInsightsComponentFeatureCapabilityArrayDeserializer(
  result: Array<ApplicationInsightsComponentFeatureCapability>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentFeatureCapabilityDeserializer(item);
  });
}

/** An Application Insights component feature capability */
export interface ApplicationInsightsComponentFeatureCapability {
  /** The name of the capability. */
  readonly name?: string;
  /** The description of the capability. */
  readonly description?: string;
  /** The value of the capability. */
  readonly value?: string;
  /** The unit of the capability. */
  readonly unit?: string;
  /** The meter used for the capability. */
  readonly meterId?: string;
  /** The meter rate of the meter. */
  readonly meterRateFrequency?: string;
}

export function applicationInsightsComponentFeatureCapabilityDeserializer(
  item: any,
): ApplicationInsightsComponentFeatureCapability {
  return {
    name: item["Name"],
    description: item["Description"],
    value: item["Value"],
    unit: item["Unit"],
    meterId: item["MeterId"],
    meterRateFrequency: item["MeterRateFrequency"],
  };
}

/** Properties that define a ProactiveDetection configuration. */
export interface ApplicationInsightsComponentProactiveDetectionConfiguration {
  /** The rule name */
  name?: string;
  /** A flag that indicates whether this rule is enabled by the user */
  enabled?: boolean;
  /** A flag that indicated whether notifications on this rule should be sent to subscription owners */
  sendEmailsToSubscriptionOwners?: boolean;
  /** Custom email addresses for this rule notifications */
  customEmails?: string[];
  /** The last time this rule was updated */
  lastUpdatedTime?: string;
  /** Static definitions of the ProactiveDetection configuration rule (same values for all components). */
  ruleDefinitions?: ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions;
}

export function applicationInsightsComponentProactiveDetectionConfigurationSerializer(
  item: ApplicationInsightsComponentProactiveDetectionConfiguration,
): any {
  return {
    name: item["name"],
    enabled: item["enabled"],
    sendEmailsToSubscriptionOwners: item["sendEmailsToSubscriptionOwners"],
    customEmails: !item["customEmails"]
      ? item["customEmails"]
      : item["customEmails"].map((p: any) => {
          return p;
        }),
    lastUpdatedTime: item["lastUpdatedTime"],
    ruleDefinitions: !item["ruleDefinitions"]
      ? item["ruleDefinitions"]
      : applicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsSerializer(
          item["ruleDefinitions"],
        ),
  };
}

export function applicationInsightsComponentProactiveDetectionConfigurationDeserializer(
  item: any,
): ApplicationInsightsComponentProactiveDetectionConfiguration {
  return {
    name: item["name"],
    enabled: item["enabled"],
    sendEmailsToSubscriptionOwners: item["sendEmailsToSubscriptionOwners"],
    customEmails: !item["customEmails"]
      ? item["customEmails"]
      : item["customEmails"].map((p: any) => {
          return p;
        }),
    lastUpdatedTime: item["lastUpdatedTime"],
    ruleDefinitions: !item["ruleDefinitions"]
      ? item["ruleDefinitions"]
      : applicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsDeserializer(
          item["ruleDefinitions"],
        ),
  };
}

/** Static definitions of the ProactiveDetection configuration rule (same values for all components). */
export interface ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions {
  /** The rule name */
  name?: string;
  /** The rule name as it is displayed in UI */
  displayName?: string;
  /** The rule description */
  description?: string;
  /** URL which displays additional info about the proactive detection rule */
  helpUrl?: string;
  /** A flag indicating whether the rule is hidden (from the UI) */
  isHidden?: boolean;
  /** A flag indicating whether the rule is enabled by default */
  isEnabledByDefault?: boolean;
  /** A flag indicating whether the rule is in preview */
  isInPreview?: boolean;
  /** A flag indicating whether email notifications are supported for detections for this rule */
  supportsEmailNotifications?: boolean;
}

export function applicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsSerializer(
  item: ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions,
): any {
  return {
    Name: item["name"],
    DisplayName: item["displayName"],
    Description: item["description"],
    HelpUrl: item["helpUrl"],
    IsHidden: item["isHidden"],
    IsEnabledByDefault: item["isEnabledByDefault"],
    IsInPreview: item["isInPreview"],
    SupportsEmailNotifications: item["supportsEmailNotifications"],
  };
}

export function applicationInsightsComponentProactiveDetectionConfigurationRuleDefinitionsDeserializer(
  item: any,
): ApplicationInsightsComponentProactiveDetectionConfigurationRuleDefinitions {
  return {
    name: item["Name"],
    displayName: item["DisplayName"],
    description: item["Description"],
    helpUrl: item["HelpUrl"],
    isHidden: item["IsHidden"],
    isEnabledByDefault: item["IsEnabledByDefault"],
    isInPreview: item["IsInPreview"],
    supportsEmailNotifications: item["SupportsEmailNotifications"],
  };
}

/** Work item configuration list result. */
export interface _WorkItemConfigurationsListResult {
  /** An array of work item configurations. */
  readonly value?: WorkItemConfiguration[];
  /** The url to the next page of results. */
  nextLink?: string;
}

export function _workItemConfigurationsListResultDeserializer(
  item: any,
): _WorkItemConfigurationsListResult {
  return {
    value: !item["value"] ? item["value"] : workItemConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workItemConfigurationArrayDeserializer(
  result: Array<WorkItemConfiguration>,
): any[] {
  return result.map((item) => {
    return workItemConfigurationDeserializer(item);
  });
}

/** Work item configuration associated with an application insights resource. */
export interface WorkItemConfiguration {
  /** Connector identifier where work item is created */
  connectorId?: string;
  /** Configuration friendly name */
  configDisplayName?: string;
  /** Boolean value indicating whether configuration is default */
  isDefault?: boolean;
  /** Unique Id for work item */
  id?: string;
  /** Serialized JSON object for detailed properties */
  configProperties?: string;
}

export function workItemConfigurationDeserializer(item: any): WorkItemConfiguration {
  return {
    connectorId: item["ConnectorId"],
    configDisplayName: item["ConfigDisplayName"],
    isDefault: item["IsDefault"],
    id: item["Id"],
    configProperties: item["ConfigProperties"],
  };
}

/** Error associated with trying to get work item configuration or configurations */
export interface WorkItemConfigurationError {
  /** Error detail code and explanation */
  code?: string;
  /** Error message */
  message?: string;
  /** Inner error */
  innererror?: InnerError;
}

export function workItemConfigurationErrorDeserializer(item: any): WorkItemConfigurationError {
  return {
    code: item["code"],
    message: item["message"],
    innererror: !item["innererror"]
      ? item["innererror"]
      : innerErrorDeserializer(item["innererror"]),
  };
}

/** Work item configuration creation payload */
export interface WorkItemCreateConfiguration {
  /** Unique connector id */
  connectorId?: string;
  /** Serialized JSON object for detailed properties */
  connectorDataConfiguration?: string;
  /** Boolean indicating validate only */
  validateOnly?: boolean;
  /** Custom work item properties */
  workItemProperties?: Record<string, string>;
}

export function workItemCreateConfigurationSerializer(item: WorkItemCreateConfiguration): any {
  return {
    ConnectorId: item["connectorId"],
    ConnectorDataConfiguration: item["connectorDataConfiguration"],
    ValidateOnly: item["validateOnly"],
    WorkItemProperties: item["workItemProperties"],
  };
}

export function applicationInsightsComponentProactiveDetectionConfigurationArraySerializer(
  result: Array<ApplicationInsightsComponentProactiveDetectionConfiguration>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentProactiveDetectionConfigurationSerializer(item);
  });
}

export function applicationInsightsComponentProactiveDetectionConfigurationArrayDeserializer(
  result: Array<ApplicationInsightsComponentProactiveDetectionConfiguration>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentProactiveDetectionConfigurationDeserializer(item);
  });
}

export function applicationInsightsComponentExportConfigurationArrayDeserializer(
  result: Array<ApplicationInsightsComponentExportConfiguration>,
): any[] {
  return result.map((item) => {
    return applicationInsightsComponentExportConfigurationDeserializer(item);
  });
}
