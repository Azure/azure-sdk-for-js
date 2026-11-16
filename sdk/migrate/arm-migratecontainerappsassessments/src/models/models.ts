// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** ARM model of Azure Container Apps Assessment. */
export interface ContainerAppsAssessment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ContainerAppsAssessmentProperties;
}

export function containerAppsAssessmentSerializer(item: ContainerAppsAssessment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : containerAppsAssessmentPropertiesSerializer(item["properties"]),
  };
}

export function containerAppsAssessmentDeserializer(item: any): ContainerAppsAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : containerAppsAssessmentPropertiesDeserializer(item["properties"]),
  };
}

/** Azure Container Apps Assessment Properties. */
export interface ContainerAppsAssessmentProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Gets or sets the scope of assessment. */
  scope?: Scope;
  /** Gets or sets the settings for the assessment. */
  settings?: ContainerAppsAssessmentSettings;
  /** Gets or sets the details of the assessment. */
  details?: AssessmentDetails;
}

export function containerAppsAssessmentPropertiesSerializer(
  item: ContainerAppsAssessmentProperties,
): any {
  return {
    scope: !item["scope"] ? item["scope"] : scopeSerializer(item["scope"]),
    settings: !item["settings"]
      ? item["settings"]
      : containerAppsAssessmentSettingsSerializer(item["settings"]),
    details: !item["details"] ? item["details"] : assessmentDetailsSerializer(item["details"]),
  };
}

export function containerAppsAssessmentPropertiesDeserializer(
  item: any,
): ContainerAppsAssessmentProperties {
  return {
    provisioningState: item["provisioningState"],
    scope: !item["scope"] ? item["scope"] : scopeDeserializer(item["scope"]),
    settings: !item["settings"]
      ? item["settings"]
      : containerAppsAssessmentSettingsDeserializer(item["settings"]),
    details: !item["details"] ? item["details"] : assessmentDetailsDeserializer(item["details"]),
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource provisioning Successful. */
  Succeeded = "Succeeded",
  /** Resource provisioning Failed. */
  Failed = "Failed",
  /** Resource provisioning Canceled. */
  Canceled = "Canceled",
  /** Resource is being Provisioned. */
  Provisioning = "Provisioning",
  /** Resource is being Updated. */
  Updating = "Updating",
  /** Resource is being Deleted. */
  Deleting = "Deleting",
  /** Resource is being Accepted. */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource provisioning Successful. \
 * **Failed**: Resource provisioning Failed. \
 * **Canceled**: Resource provisioning Canceled. \
 * **Provisioning**: Resource is being Provisioned. \
 * **Updating**: Resource is being Updated. \
 * **Deleting**: Resource is being Deleted. \
 * **Accepted**: Resource is being Accepted.
 */
export type ProvisioningState = string;

/** Scope of the assessment. */
export interface Scope {
  /** The scope type */
  scopeType?: ScopeType;
  /** The server group arm id. */
  serverGroupId?: string;
  /** The ARG query. */
  azureResourceGraphQuery?: string;
}

export function scopeSerializer(item: Scope): any {
  return {
    scopeType: item["scopeType"],
    serverGroupId: item["serverGroupId"],
    azureResourceGraphQuery: item["azureResourceGraphQuery"],
  };
}

export function scopeDeserializer(item: any): Scope {
  return {
    scopeType: item["scopeType"],
    serverGroupId: item["serverGroupId"],
    azureResourceGraphQuery: item["azureResourceGraphQuery"],
  };
}

/** Scope type */
export enum KnownScopeType {
  /** ServerGroupId - Scope type */
  ServerGroupId = "ServerGroupId",
  /** AzureResourceGraphQuery - Scope type */
  AzureResourceGraphQuery = "AzureResourceGraphQuery",
}

/**
 * Scope type \
 * {@link KnownScopeType} can be used interchangeably with ScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServerGroupId**: ServerGroupId - Scope type \
 * **AzureResourceGraphQuery**: AzureResourceGraphQuery - Scope type
 */
export type ScopeType = string;

/** Data model of Azure Container Apps Assessment Settings. */
export interface ContainerAppsAssessmentSettings {
  /** Azure Location or Azure region where to which the machines will be migrated. */
  azureLocation?: string;
  /** Currency in which prices should be reported. */
  currency?: AzureCurrency;
  /**
   * Percentage of buffer that user wants on performance metrics when recommending
   * Azure sizes.
   */
  scalingFactor?: number;
  /** Custom discount percentage. */
  discountPercentage?: number;
  /** Assessment sizing criterion. */
  sizingCriterion?: AssessmentSizingCriterion;
  /** Gets or sets the performance data. */
  performanceData?: PerformanceData;
  /** Gets or sets the savings settings. */
  savingsSettings?: SavingsSettings;
  /** Gets or sets the billing settings. */
  billingSettings?: BillingSettings;
  /** Gets or sets user configurable setting to display the environment type. */
  environmentType?: EnvironmentType;
  /** Gets or sets the workload profile SKU. */
  sku: ContainerAppsWorkloadProfileSku;
  /** Gets or sets the workload profile type. */
  workloadProfileType: ContainerAppsWorkloadProfileType;
}

export function containerAppsAssessmentSettingsSerializer(
  item: ContainerAppsAssessmentSettings,
): any {
  return {
    azureLocation: item["azureLocation"],
    currency: item["currency"],
    scalingFactor: item["scalingFactor"],
    discountPercentage: item["discountPercentage"],
    sizingCriterion: item["sizingCriterion"],
    performanceData: !item["performanceData"]
      ? item["performanceData"]
      : performanceDataSerializer(item["performanceData"]),
    savingsSettings: !item["savingsSettings"]
      ? item["savingsSettings"]
      : savingsSettingsSerializer(item["savingsSettings"]),
    billingSettings: !item["billingSettings"]
      ? item["billingSettings"]
      : billingSettingsSerializer(item["billingSettings"]),
    environmentType: item["environmentType"],
    sku: item["sku"],
    workloadProfileType: item["workloadProfileType"],
  };
}

export function containerAppsAssessmentSettingsDeserializer(
  item: any,
): ContainerAppsAssessmentSettings {
  return {
    azureLocation: item["azureLocation"],
    currency: item["currency"],
    scalingFactor: item["scalingFactor"],
    discountPercentage: item["discountPercentage"],
    sizingCriterion: item["sizingCriterion"],
    performanceData: !item["performanceData"]
      ? item["performanceData"]
      : performanceDataDeserializer(item["performanceData"]),
    savingsSettings: !item["savingsSettings"]
      ? item["savingsSettings"]
      : savingsSettingsDeserializer(item["savingsSettings"]),
    billingSettings: !item["billingSettings"]
      ? item["billingSettings"]
      : billingSettingsDeserializer(item["billingSettings"]),
    environmentType: item["environmentType"],
    sku: item["sku"],
    workloadProfileType: item["workloadProfileType"],
  };
}

/** Currency for Azure. */
export enum KnownAzureCurrency {
  /** Unknown Currency for Azure */
  Unknown = "Unknown",
  /** USD Currency for Azure */
  USD = "USD",
  /** DKK Currency for Azure */
  DKK = "DKK",
  /** CAD Currency for Azure */
  CAD = "CAD",
  /** IDR Currency for Azure */
  IDR = "IDR",
  /** JPY Currency for Azure */
  JPY = "JPY",
  /** KRW Currency for Azure */
  KRW = "KRW",
  /** NZD Currency for Azure */
  NZD = "NZD",
  /** NOK Currency for Azure */
  NOK = "NOK",
  /** RUB Currency for Azure */
  RUB = "RUB",
  /** SAR Currency for Azure */
  SAR = "SAR",
  /** ZAR Currency for Azure */
  ZAR = "ZAR",
  /** SEK Currency for Azure */
  SEK = "SEK",
  /** TRY Currency for Azure */
  TRY = "TRY",
  /** GBP Currency for Azure */
  GBP = "GBP",
  /** MXN Currency for Azure */
  MXN = "MXN",
  /** MYR Currency for Azure */
  MYR = "MYR",
  /** INR Currency for Azure */
  INR = "INR",
  /** HKD Currency for Azure */
  HKD = "HKD",
  /** BRL Currency for Azure */
  BRL = "BRL",
  /** TWD Currency for Azure */
  TWD = "TWD",
  /** EUR Currency for Azure */
  EUR = "EUR",
  /** CHF Currency for Azure */
  CHF = "CHF",
  /** ARS Currency for Azure */
  ARS = "ARS",
  /** AUD Currency for Azure */
  AUD = "AUD",
  /** CNY Currency for Azure */
  CNY = "CNY",
}

/**
 * Currency for Azure. \
 * {@link KnownAzureCurrency} can be used interchangeably with AzureCurrency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown Currency for Azure \
 * **USD**: USD Currency for Azure \
 * **DKK**: DKK Currency for Azure \
 * **CAD**: CAD Currency for Azure \
 * **IDR**: IDR Currency for Azure \
 * **JPY**: JPY Currency for Azure \
 * **KRW**: KRW Currency for Azure \
 * **NZD**: NZD Currency for Azure \
 * **NOK**: NOK Currency for Azure \
 * **RUB**: RUB Currency for Azure \
 * **SAR**: SAR Currency for Azure \
 * **ZAR**: ZAR Currency for Azure \
 * **SEK**: SEK Currency for Azure \
 * **TRY**: TRY Currency for Azure \
 * **GBP**: GBP Currency for Azure \
 * **MXN**: MXN Currency for Azure \
 * **MYR**: MYR Currency for Azure \
 * **INR**: INR Currency for Azure \
 * **HKD**: HKD Currency for Azure \
 * **BRL**: BRL Currency for Azure \
 * **TWD**: TWD Currency for Azure \
 * **EUR**: EUR Currency for Azure \
 * **CHF**: CHF Currency for Azure \
 * **ARS**: ARS Currency for Azure \
 * **AUD**: AUD Currency for Azure \
 * **CNY**: CNY Currency for Azure
 */
export type AzureCurrency = string;

/** Assessment Sizing Criteria. */
export enum KnownAssessmentSizingCriterion {
  /** Performance Data based Sizing. */
  PerformanceBased = "PerformanceBased",
  /** As On Premises or Static Data based Sizing. */
  AsOnPremises = "AsOnPremises",
}

/**
 * Assessment Sizing Criteria. \
 * {@link KnownAssessmentSizingCriterion} can be used interchangeably with AssessmentSizingCriterion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PerformanceBased**: Performance Data based Sizing. \
 * **AsOnPremises**: As On Premises or Static Data based Sizing.
 */
export type AssessmentSizingCriterion = string;

/** Performance data class. */
export interface PerformanceData {
  /**
   * Percentile of the utilization data values to be considered while assessing
   * machines.
   */
  percentile?: Percentile;
  /**
   * Time Range for which the historic utilization data should be considered for
   * assessment.
   */
  timeRange?: TimeRange;
  /** Gets or sets the start time to consider performance data for assessment. */
  perfDataStartTime?: Date;
  /** Gets or sets the end time to consider performance data for assessment. */
  perfDataEndTime?: Date;
}

export function performanceDataSerializer(item: PerformanceData): any {
  return {
    percentile: item["percentile"],
    timeRange: item["timeRange"],
    perfDataStartTime: !item["perfDataStartTime"]
      ? item["perfDataStartTime"]
      : item["perfDataStartTime"].toISOString(),
    perfDataEndTime: !item["perfDataEndTime"]
      ? item["perfDataEndTime"]
      : item["perfDataEndTime"].toISOString(),
  };
}

export function performanceDataDeserializer(item: any): PerformanceData {
  return {
    percentile: item["percentile"],
    timeRange: item["timeRange"],
    perfDataStartTime: !item["perfDataStartTime"]
      ? item["perfDataStartTime"]
      : new Date(item["perfDataStartTime"]),
    perfDataEndTime: !item["perfDataEndTime"]
      ? item["perfDataEndTime"]
      : new Date(item["perfDataEndTime"]),
  };
}

/** Percentile for Performance Data. */
export enum KnownPercentile {
  /** Percentile 50. */
  Percentile50 = "Percentile50",
  /** Percentile 90. */
  Percentile90 = "Percentile90",
  /** Percentile 95. */
  Percentile95 = "Percentile95",
  /** Percentile 99. */
  Percentile99 = "Percentile99",
  /** Percentile unknown. */
  PercentileUnknown = "PercentileUnknown",
}

/**
 * Percentile for Performance Data. \
 * {@link KnownPercentile} can be used interchangeably with Percentile,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Percentile50**: Percentile 50. \
 * **Percentile90**: Percentile 90. \
 * **Percentile95**: Percentile 95. \
 * **Percentile99**: Percentile 99. \
 * **PercentileUnknown**: Percentile unknown.
 */
export type Percentile = string;

/** Time Range for Performance Data. */
export enum KnownTimeRange {
  /** Daily. */
  Day = "Day",
  /** Weekly. */
  Week = "Week",
  /** Monthly. */
  Month = "Month",
  /** Custom Time Range. */
  Custom = "Custom",
}

/**
 * Time Range for Performance Data. \
 * {@link KnownTimeRange} can be used interchangeably with TimeRange,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Day**: Daily. \
 * **Week**: Weekly. \
 * **Month**: Monthly. \
 * **Custom**: Custom Time Range.
 */
export type TimeRange = string;

/** Savings settings class. */
export interface SavingsSettings {
  /** Gets or sets the savings options. */
  savingsOptions?: SavingsOptions;
  /** Gets or sets the Azure offer code. */
  azureOfferCode?: AzureOffer;
}

export function savingsSettingsSerializer(item: SavingsSettings): any {
  return { savingsOptions: item["savingsOptions"], azureOfferCode: item["azureOfferCode"] };
}

export function savingsSettingsDeserializer(item: any): SavingsSettings {
  return {
    savingsOptions: item["savingsOptions"],
    azureOfferCode: item["azureOfferCode"],
  };
}

/** The savings options. */
export enum KnownSavingsOptions {
  /** No savings options. */
  None = "None",
  /** Reserved Instance for 1 year. */
  RI1Year = "RI1Year",
  /** Reserved Instance for 3 years. */
  RI3Year = "RI3Year",
  /** The savings plan for 1 year. */
  SavingsPlan1Year = "SavingsPlan1Year",
  /** The savings plan for 3  years. */
  SavingsPlan3Year = "SavingsPlan3Year",
  /** Custom azure offer code. */
  CustomAzureOfferCode = "CustomAzureOfferCode",
}

/**
 * The savings options. \
 * {@link KnownSavingsOptions} can be used interchangeably with SavingsOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No savings options. \
 * **RI1Year**: Reserved Instance for 1 year. \
 * **RI3Year**: Reserved Instance for 3 years. \
 * **SavingsPlan1Year**: The savings plan for 1 year. \
 * **SavingsPlan3Year**: The savings plan for 3  years. \
 * **CustomAzureOfferCode**: Custom azure offer code.
 */
export type SavingsOptions = string;

/** Azure Offer */
export enum KnownAzureOffer {
  /** Unknown - Azure Offer */
  Unknown = "Unknown",
  /** MSAZR0003P Azure Offer */
  Msazr0003P = "MSAZR0003P",
  /** MSAZR0023P Azure Offer */
  Msazr0023P = "MSAZR0023P",
  /** MSMCAZR0044P Azure Offer */
  Msmcazr0044P = "MSMCAZR0044P",
  /** MSMCAZR0059P Azure Offer */
  Msmcazr0059P = "MSMCAZR0059P",
  /** MSMCAZR0060P Azure Offer */
  Msmcazr0060P = "MSMCAZR0060P",
  /** MSMCAZR0063P Azure Offer */
  Msmcazr0063P = "MSMCAZR0063P",
  /** MSAZRUSGOV0003P Azure Offer */
  Msazrusgov0003P = "MSAZRUSGOV0003P",
  /** EA Azure Offer */
  EA = "EA",
  /** SavingsPlan1Year Azure Offer */
  SavingsPlan1Year = "SavingsPlan1Year",
  /** SavingsPlan3Year Azure Offer */
  SavingsPlan3Year = "SavingsPlan3Year",
}

/**
 * Azure Offer \
 * {@link KnownAzureOffer} can be used interchangeably with AzureOffer,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Azure Offer \
 * **MSAZR0003P**: MSAZR0003P Azure Offer \
 * **MSAZR0023P**: MSAZR0023P Azure Offer \
 * **MSMCAZR0044P**: MSMCAZR0044P Azure Offer \
 * **MSMCAZR0059P**: MSMCAZR0059P Azure Offer \
 * **MSMCAZR0060P**: MSMCAZR0060P Azure Offer \
 * **MSMCAZR0063P**: MSMCAZR0063P Azure Offer \
 * **MSAZRUSGOV0003P**: MSAZRUSGOV0003P Azure Offer \
 * **EA**: EA Azure Offer \
 * **SavingsPlan1Year**: SavingsPlan1Year Azure Offer \
 * **SavingsPlan3Year**: SavingsPlan3Year Azure Offer
 */
export type AzureOffer = string;

/** Billing settings class. */
export interface BillingSettings {
  /** Gets or sets the licensing program. */
  licensingProgram?: LicensingProgram;
  /** Gets or sets the subscription ID for licensing program selected. */
  subscriptionId?: string;
}

export function billingSettingsSerializer(item: BillingSettings): any {
  return { licensingProgram: item["licensingProgram"], subscriptionId: item["subscriptionId"] };
}

export function billingSettingsDeserializer(item: any): BillingSettings {
  return {
    licensingProgram: item["licensingProgram"],
    subscriptionId: item["subscriptionId"],
  };
}

/** The licensing program. */
export enum KnownLicensingProgram {
  /** Retail/Pay as you go. */
  Retail = "Retail",
  /** Not known */
  Unknown = "Unknown",
  /** Enterprise agreement. */
  EA = "EA",
  /** Microsoft customer agreement. */
  MCA = "MCA",
}

/**
 * The licensing program. \
 * {@link KnownLicensingProgram} can be used interchangeably with LicensingProgram,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Retail**: Retail\/Pay as you go. \
 * **Unknown**: Not known \
 * **EA**: Enterprise agreement. \
 * **MCA**: Microsoft customer agreement.
 */
export type LicensingProgram = string;

/** Environment Type */
export enum KnownEnvironmentType {
  /** Production - Environment Type */
  Production = "Production",
  /** Unknown - Environment Type */
  Unknown = "Unknown",
  /** DevTest - Environment Type */
  DevTest = "DevTest",
}

/**
 * Environment Type \
 * {@link KnownEnvironmentType} can be used interchangeably with EnvironmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Production**: Production - Environment Type \
 * **Unknown**: Unknown - Environment Type \
 * **DevTest**: DevTest - Environment Type
 */
export type EnvironmentType = string;

/** Workload Profile SKU for Azure Container Apps. */
export enum KnownContainerAppsWorkloadProfileSku {
  /** Consumption workload profile. */
  Consumption = "Consumption",
  /** Dedicated D4 — General purpose D-series. */
  DedicatedD4 = "Dedicated-D4",
  /** Dedicated D8 — General purpose D-series. */
  DedicatedD8 = "Dedicated-D8",
  /** Dedicated D16 — General purpose D-series. */
  DedicatedD16 = "Dedicated-D16",
  /** Dedicated D32 — General purpose D-series. */
  DedicatedD32 = "Dedicated-D32",
  /** Dedicated E4 — Memory optimized E-series. */
  DedicatedE4 = "Dedicated-E4",
  /** Dedicated E8 — Memory optimized E-series. */
  DedicatedE8 = "Dedicated-E8",
  /** Dedicated E16 — Memory optimized E-series. */
  DedicatedE16 = "Dedicated-E16",
  /** Dedicated E32 — Memory optimized E-series. */
  DedicatedE32 = "Dedicated-E32",
  /** Consumption GPU NC8as T4 — GPU-accelerated T4. */
  ConsumptionGpuNC8AsT4 = "Consumption-GPU-NC8as-T4",
  /** Consumption GPU NC24 A100 — GPU-accelerated A100. */
  ConsumptionGpuNC24A100 = "Consumption-GPU-NC24-A100",
  /** Dedicated NC24 A100 — GPU-accelerated A100. */
  DedicatedNC24A100 = "Dedicated-NC24-A100",
  /** Dedicated NC48 A100 — GPU-accelerated A100. */
  DedicatedNC48A100 = "Dedicated-NC48-A100",
  /** Dedicated NC96 A100 — GPU-accelerated A100. */
  DedicatedNC96A100 = "Dedicated-NC96-A100",
}

/**
 * Workload Profile SKU for Azure Container Apps. \
 * {@link KnownContainerAppsWorkloadProfileSku} can be used interchangeably with ContainerAppsWorkloadProfileSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Consumption**: Consumption workload profile. \
 * **Dedicated-D4**: Dedicated D4 — General purpose D-series. \
 * **Dedicated-D8**: Dedicated D8 — General purpose D-series. \
 * **Dedicated-D16**: Dedicated D16 — General purpose D-series. \
 * **Dedicated-D32**: Dedicated D32 — General purpose D-series. \
 * **Dedicated-E4**: Dedicated E4 — Memory optimized E-series. \
 * **Dedicated-E8**: Dedicated E8 — Memory optimized E-series. \
 * **Dedicated-E16**: Dedicated E16 — Memory optimized E-series. \
 * **Dedicated-E32**: Dedicated E32 — Memory optimized E-series. \
 * **Consumption-GPU-NC8as-T4**: Consumption GPU NC8as T4 — GPU-accelerated T4. \
 * **Consumption-GPU-NC24-A100**: Consumption GPU NC24 A100 — GPU-accelerated A100. \
 * **Dedicated-NC24-A100**: Dedicated NC24 A100 — GPU-accelerated A100. \
 * **Dedicated-NC48-A100**: Dedicated NC48 A100 — GPU-accelerated A100. \
 * **Dedicated-NC96-A100**: Dedicated NC96 A100 — GPU-accelerated A100.
 */
export type ContainerAppsWorkloadProfileSku = string;

/** Workload Profile Type for Azure Container Apps. */
export enum KnownContainerAppsWorkloadProfileType {
  /** Any workload profile type. */
  Any = "Any",
  /** Consumption workload profile — up to 4 vCPUs, 8 GiB memory. */
  Consumption = "Consumption",
  /** Dedicated workload profile. */
  Dedicated = "Dedicated",
}

/**
 * Workload Profile Type for Azure Container Apps. \
 * {@link KnownContainerAppsWorkloadProfileType} can be used interchangeably with ContainerAppsWorkloadProfileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any**: Any workload profile type. \
 * **Consumption**: Consumption workload profile — up to 4 vCPUs, 8 GiB memory. \
 * **Dedicated**: Dedicated workload profile.
 */
export type ContainerAppsWorkloadProfileType = string;

/** Assessment details class. */
export interface AssessmentDetails {
  /** Confidence Rating in Percentage. */
  readonly confidenceRatingInPercentage?: number;
  /** Last time when rates were queried. */
  readonly pricesTimestamp?: Date;
  /** Date and Time when assessment was created. */
  readonly createdTimestamp?: Date;
  /** Date and Time when assessment was last updated. */
  readonly updatedTimestamp?: Date;
  /** Whether assessment is in valid state and all machines have been assessed. */
  readonly status?: AssessmentStatus;
}

export function assessmentDetailsSerializer(_item: AssessmentDetails): any {
  return {};
}

export function assessmentDetailsDeserializer(item: any): AssessmentDetails {
  return {
    confidenceRatingInPercentage: item["confidenceRatingInPercentage"],
    pricesTimestamp: !item["pricesTimestamp"]
      ? item["pricesTimestamp"]
      : new Date(item["pricesTimestamp"]),
    createdTimestamp: !item["createdTimestamp"]
      ? item["createdTimestamp"]
      : new Date(item["createdTimestamp"]),
    updatedTimestamp: !item["updatedTimestamp"]
      ? item["updatedTimestamp"]
      : new Date(item["updatedTimestamp"]),
    status: item["status"],
  };
}

/** Assessment Status. */
export enum KnownAssessmentStatus {
  /** Assessment is Created. */
  Created = "Created",
  /** Assessment is Updated. */
  Updated = "Updated",
  /** Assessment is currently running. */
  Running = "Running",
  /** Assessment is Completed or Ready. */
  Completed = "Completed",
  /** Assessment is Failed i.e. it is now invalid. */
  Invalid = "Invalid",
  /** Assessment is Out of Sync. */
  OutOfSync = "OutOfSync",
  /** Assessment is Out Dated. */
  OutDated = "OutDated",
  /** Assessment is Deleted. */
  Deleted = "Deleted",
  /** Assessment has Failed. */
  Failed = "Failed",
}

/**
 * Assessment Status. \
 * {@link KnownAssessmentStatus} can be used interchangeably with AssessmentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Assessment is Created. \
 * **Updated**: Assessment is Updated. \
 * **Running**: Assessment is currently running. \
 * **Completed**: Assessment is Completed or Ready. \
 * **Invalid**: Assessment is Failed i.e. it is now invalid. \
 * **OutOfSync**: Assessment is Out of Sync. \
 * **OutDated**: Assessment is Out Dated. \
 * **Deleted**: Assessment is Deleted. \
 * **Failed**: Assessment has Failed.
 */
export type AssessmentStatus = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(_item: Resource): any {
  return {};
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The response of a ContainerAppsAssessment list operation. */
export interface _ContainerAppsAssessmentListResult {
  /** The ContainerAppsAssessment items on this page */
  value: ContainerAppsAssessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerAppsAssessmentListResultDeserializer(
  item: any,
): _ContainerAppsAssessmentListResult {
  return {
    value: containerAppsAssessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerAppsAssessmentArraySerializer(
  result: Array<ContainerAppsAssessment>,
): any[] {
  return result.map((item) => {
    return containerAppsAssessmentSerializer(item);
  });
}

export function containerAppsAssessmentArrayDeserializer(
  result: Array<ContainerAppsAssessment>,
): any[] {
  return result.map((item) => {
    return containerAppsAssessmentDeserializer(item);
  });
}

/** Data model of Download URL for assessment report. */
export interface DownloadUrl {
  /** Hyperlink to download report. */
  readonly assessmentReportUrl: string;
  /** Expiry date of download url. */
  readonly expirationTime: Date;
}

export function downloadUrlDeserializer(item: any): DownloadUrl {
  return {
    assessmentReportUrl: item["assessmentReportUrl"],
    expirationTime: new Date(item["expirationTime"]),
  };
}

/** ARM model of Assessed Web Application. */
export interface AssessedWebApplication extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AssessedWebApplicationProperties;
}

export function assessedWebApplicationDeserializer(item: any): AssessedWebApplication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : assessedWebApplicationPropertiesDeserializer(item["properties"]),
  };
}

/** Assessed Web Application Properties. */
export interface AssessedWebApplicationProperties {
  /** The workload type */
  readonly workloadType?: MigrateWorkloadType;
  /** The linkages list. */
  readonly linkages?: Linkages[];
  /** The recommendation list. */
  readonly recommendations?: RecommendationsMigrationIssuesMigrationSuitabilitySkus[];
  /** Recommendation Result of assessed webapp. */
  recommendationResult: RecommendationResult;
  /** Type of assessed webapp. */
  webAppType: WebServerType;
}

export function assessedWebApplicationPropertiesDeserializer(
  item: any,
): AssessedWebApplicationProperties {
  return {
    workloadType: item["workloadType"],
    linkages: !item["linkages"] ? item["linkages"] : linkagesArrayDeserializer(item["linkages"]),
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : recommendationsMigrationIssuesMigrationSuitabilitySkusArrayDeserializer(
          item["recommendations"],
        ),
    recommendationResult: recommendationResultDeserializer(item["recommendationResult"]),
    webAppType: item["webAppType"],
  };
}

/** Migration Workload type */
export enum KnownMigrateWorkloadType {
  /** Unknown - Migration Workload type */
  Unknown = "Unknown",
  /** Machine - Migration Workload type */
  Machine = "Machine",
  /** Server - Migration Workload type */
  Server = "Server",
  /** Instance - Migration Workload type */
  Instance = "Instance",
  /** WebServer - Migration Workload type */
  WebServer = "WebServer",
  /** WebApplication - Migration Workload type */
  WebApplication = "WebApplication",
  /** Database - Migration Workload type */
  Database = "Database",
  /** Host - Migration Workload type */
  Host = "Host",
  /** ManagementServer - Migration Workload type */
  ManagementServer = "ManagementServer",
}

/**
 * Migration Workload type \
 * {@link KnownMigrateWorkloadType} can be used interchangeably with MigrateWorkloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Migration Workload type \
 * **Machine**: Machine - Migration Workload type \
 * **Server**: Server - Migration Workload type \
 * **Instance**: Instance - Migration Workload type \
 * **WebServer**: WebServer - Migration Workload type \
 * **WebApplication**: WebApplication - Migration Workload type \
 * **Database**: Database - Migration Workload type \
 * **Host**: Host - Migration Workload type \
 * **ManagementServer**: ManagementServer - Migration Workload type
 */
export type MigrateWorkloadType = string;

export function linkagesArrayDeserializer(result: Array<Linkages>): any[] {
  return result.map((item) => {
    return linkagesDeserializer(item);
  });
}

/** Linkages details */
export interface Linkages {
  /** The workload name */
  readonly workloadName?: string;
  /** The linkage type. */
  readonly linkageType?: LinkageType;
  /** The linkage kind. */
  readonly kind?: LinkageKind;
  /** The arm id. */
  readonly armId?: string;
}

export function linkagesDeserializer(item: any): Linkages {
  return {
    workloadName: item["workloadName"],
    linkageType: item["linkageType"],
    kind: item["kind"],
    armId: item["armId"],
  };
}

/** Linkage type */
export enum KnownLinkageType {
  /** Parent - Linkage type */
  Parent = "Parent",
  /** Source - Linkage type */
  Source = "Source",
}

/**
 * Linkage type \
 * {@link KnownLinkageType} can be used interchangeably with LinkageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Parent**: Parent - Linkage type \
 * **Source**: Source - Linkage type
 */
export type LinkageType = string;

/** Linkage kind */
export enum KnownLinkageKind {
  /** Unknown - Linkage kind */
  Unknown = "Unknown",
  /** Machine - Linkage kind */
  Machine = "Machine",
  /** Server - Linkage kind */
  Server = "Server",
  /** Instance - Linkage kind */
  Instance = "Instance",
  /** WebServer - Linkage kind */
  WebServer = "WebServer",
  /** WebApplication - Linkage kind */
  WebApplication = "WebApplication",
  /** Database - Linkage kind */
  Database = "Database",
}

/**
 * Linkage kind \
 * {@link KnownLinkageKind} can be used interchangeably with LinkageKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Linkage kind \
 * **Machine**: Machine - Linkage kind \
 * **Server**: Server - Linkage kind \
 * **Instance**: Instance - Linkage kind \
 * **WebServer**: WebServer - Linkage kind \
 * **WebApplication**: WebApplication - Linkage kind \
 * **Database**: Database - Linkage kind
 */
export type LinkageKind = string;

export function recommendationsMigrationIssuesMigrationSuitabilitySkusArrayDeserializer(
  result: Array<RecommendationsMigrationIssuesMigrationSuitabilitySkus>,
): any[] {
  return result.map((item) => {
    return recommendationsMigrationIssuesMigrationSuitabilitySkusDeserializer(item);
  });
}

/** Recommendation details */
export interface RecommendationsMigrationIssuesMigrationSuitabilitySkus {
  /** The configuration data. */
  readonly configuration?: Configuration;
  /** The recommended details. */
  readonly recommendedFor?: RecommendedFor;
  /** The migration Platform. */
  readonly migrationPlatform?: MigrationPlatform;
  /** The confidence score. */
  readonly confidenceScore?: number;
  /** The migration suitability. */
  readonly migrationSuitability?: MigrationSuitability;
  /** The security suitability. */
  readonly securitySuitability?: SecuritySuitability;
  /** The total cost details. */
  readonly totalCost?: CostDetailsCommon[];
  /** The total cost details. */
  readonly totalSavings?: SavingsDetailsCommon[];
  /** The migration issues list. */
  readonly migrationIssues?: MigrationIssues[];
  /** The Skus list. */
  readonly skus?: SkusMigrationSuitability[];
}

export function recommendationsMigrationIssuesMigrationSuitabilitySkusDeserializer(
  item: any,
): RecommendationsMigrationIssuesMigrationSuitabilitySkus {
  return {
    configuration: !item["configuration"]
      ? item["configuration"]
      : configurationDeserializer(item["configuration"]),
    recommendedFor: !item["recommendedFor"]
      ? item["recommendedFor"]
      : recommendedForDeserializer(item["recommendedFor"]),
    migrationPlatform: item["migrationPlatform"],
    confidenceScore: item["confidenceScore"],
    migrationSuitability: !item["migrationSuitability"]
      ? item["migrationSuitability"]
      : migrationSuitabilityDeserializer(item["migrationSuitability"]),
    securitySuitability: !item["securitySuitability"]
      ? item["securitySuitability"]
      : securitySuitabilityDeserializer(item["securitySuitability"]),
    totalCost: !item["totalCost"]
      ? item["totalCost"]
      : costDetailsCommonArrayDeserializer(item["totalCost"]),
    totalSavings: !item["totalSavings"]
      ? item["totalSavings"]
      : savingsDetailsCommonArrayDeserializer(item["totalSavings"]),
    migrationIssues: !item["migrationIssues"]
      ? item["migrationIssues"]
      : migrationIssuesArrayDeserializer(item["migrationIssues"]),
    skus: !item["skus"] ? item["skus"] : skusMigrationSuitabilityArrayDeserializer(item["skus"]),
  };
}

/** Configuration details. */
export interface Configuration {
  /** The azure target. */
  readonly azureTarget?: AzureTarget;
  /** The azure target. */
  readonly sizingCriterion?: AssessmentSizingCriterion;
}

export function configurationDeserializer(item: any): Configuration {
  return {
    azureTarget: item["azureTarget"],
    sizingCriterion: item["sizingCriterion"],
  };
}

/** Azure Target */
export enum KnownAzureTarget {
  /** Unknown - Azure Target */
  Unknown = "Unknown",
  /** SqlDatabase - Azure Target */
  SqlDatabase = "SqlDatabase",
  /** SqlMI - Azure Target */
  SqlMI = "SqlMI",
  /** FlexServerPG - Azure Target */
  FlexServerPG = "FlexServerPG",
  /** OracleIaasVM - Azure Target */
  OracleIaasVM = "OracleIaasVM",
  /** AzureSpringApps - Azure Target */
  AzureSpringApps = "AzureSpringApps",
  /** SAPAzureInstance - Azure Target */
  SAPAzureInstance = "SAPAzureInstance",
  /** AKS - Azure Target */
  AKS = "AKS",
  /** MySQLAzureFlexServer - Azure Target */
  MySQLAzureFlexServer = "MySQLAzureFlexServer",
  /** AzureSQLVM - Azure Target */
  AzureSqlvm = "AzureSQLVM",
  /** AzureVM - Azure Target */
  AzureVM = "AzureVM",
  /** AzureAppService - Azure Target */
  AzureAppService = "AzureAppService",
  /** AzureAppServiceContainer - Azure Target */
  AzureAppServiceContainer = "AzureAppServiceContainer",
  /** Avs - Azure Target */
  Avs = "Avs",
  /** ContainerApps - Azure Target */
  ContainerApps = "ContainerApps",
}

/**
 * Azure Target \
 * {@link KnownAzureTarget} can be used interchangeably with AzureTarget,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Azure Target \
 * **SqlDatabase**: SqlDatabase - Azure Target \
 * **SqlMI**: SqlMI - Azure Target \
 * **FlexServerPG**: FlexServerPG - Azure Target \
 * **OracleIaasVM**: OracleIaasVM - Azure Target \
 * **AzureSpringApps**: AzureSpringApps - Azure Target \
 * **SAPAzureInstance**: SAPAzureInstance - Azure Target \
 * **AKS**: AKS - Azure Target \
 * **MySQLAzureFlexServer**: MySQLAzureFlexServer - Azure Target \
 * **AzureSQLVM**: AzureSQLVM - Azure Target \
 * **AzureVM**: AzureVM - Azure Target \
 * **AzureAppService**: AzureAppService - Azure Target \
 * **AzureAppServiceContainer**: AzureAppServiceContainer - Azure Target \
 * **Avs**: Avs - Azure Target \
 * **ContainerApps**: ContainerApps - Azure Target
 */
export type AzureTarget = string;

/** The recommended details. */
export interface RecommendedFor {
  /** The list of strategy type. */
  readonly strategies?: StrategyType[];
}

export function recommendedForDeserializer(item: any): RecommendedFor {
  return {
    strategies: !item["strategies"]
      ? item["strategies"]
      : item["strategies"].map((p: any) => {
          return p;
        }),
  };
}

/** Strategy type */
export enum KnownStrategyType {
  /** PaaSPreferred - Strategy type */
  PaaSPreferred = "PaaSPreferred",
  /** CostOptimized - Strategy type */
  CostOptimized = "CostOptimized",
  /** EffortOptimized - Strategy type */
  EffortOptimized = "EffortOptimized",
}

/**
 * Strategy type \
 * {@link KnownStrategyType} can be used interchangeably with StrategyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PaaSPreferred**: PaaSPreferred - Strategy type \
 * **CostOptimized**: CostOptimized - Strategy type \
 * **EffortOptimized**: EffortOptimized - Strategy type
 */
export type StrategyType = string;

/** Migration Platform */
export enum KnownMigrationPlatform {
  /** Unknown - Migration Platform */
  Unknown = "Unknown",
  /** PaaS - Migration Platform */
  PaaS = "PaaS",
  /** IaaS - Migration Platform */
  IaaS = "IaaS",
  /** SaaS - Migration Platform */
  SaaS = "SaaS",
}

/**
 * Migration Platform \
 * {@link KnownMigrationPlatform} can be used interchangeably with MigrationPlatform,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Migration Platform \
 * **PaaS**: PaaS - Migration Platform \
 * **IaaS**: IaaS - Migration Platform \
 * **SaaS**: SaaS - Migration Platform
 */
export type MigrationPlatform = string;

/** The migration suitability. */
export interface MigrationSuitability {
  /** The migration suitability. */
  readonly readiness?: CloudSuitabilityCommon;
}

export function migrationSuitabilityDeserializer(item: any): MigrationSuitability {
  return {
    readiness: item["readiness"],
  };
}

/** Cloud Suitability Common */
export enum KnownCloudSuitabilityCommon {
  /** Unknown - Cloud Suitability Common */
  Unknown = "Unknown",
  /** NotSuitable - Cloud Suitability Common */
  NotSuitable = "NotSuitable",
  /** Suitable - Cloud Suitability Common */
  Suitable = "Suitable",
  /** ConditionallySuitable - Cloud Suitability Common */
  ConditionallySuitable = "ConditionallySuitable",
  /** ReadinessUnknown - Cloud Suitability Common */
  ReadinessUnknown = "ReadinessUnknown",
  /** SuitableWithWarnings - Cloud Suitability Common */
  SuitableWithWarnings = "SuitableWithWarnings",
}

/**
 * Cloud Suitability Common \
 * {@link KnownCloudSuitabilityCommon} can be used interchangeably with CloudSuitabilityCommon,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Cloud Suitability Common \
 * **NotSuitable**: NotSuitable - Cloud Suitability Common \
 * **Suitable**: Suitable - Cloud Suitability Common \
 * **ConditionallySuitable**: ConditionallySuitable - Cloud Suitability Common \
 * **ReadinessUnknown**: ReadinessUnknown - Cloud Suitability Common \
 * **SuitableWithWarnings**: SuitableWithWarnings - Cloud Suitability Common
 */
export type CloudSuitabilityCommon = string;

/** The security suitability. */
export interface SecuritySuitability {
  /** The security suitability. */
  readonly readiness?: CloudSuitabilityCommon;
}

export function securitySuitabilityDeserializer(item: any): SecuritySuitability {
  return {
    readiness: item["readiness"],
  };
}

export function costDetailsCommonArrayDeserializer(result: Array<CostDetailsCommon>): any[] {
  return result.map((item) => {
    return costDetailsCommonDeserializer(item);
  });
}

/** The cost details. */
export interface CostDetailsCommon {
  /** The savings options. */
  readonly savingOptions?: SavingsOptions;
  /** The sku cost details per azure offer type. */
  readonly costDetail?: NameValuePairCostType[];
}

export function costDetailsCommonDeserializer(item: any): CostDetailsCommon {
  return {
    savingOptions: item["savingOptions"],
    costDetail: !item["costDetail"]
      ? item["costDetail"]
      : nameValuePairCostTypeArrayDeserializer(item["costDetail"]),
  };
}

export function nameValuePairCostTypeArrayDeserializer(
  result: Array<NameValuePairCostType>,
): any[] {
  return result.map((item) => {
    return nameValuePairCostTypeDeserializer(item);
  });
}

/** The generic name value pair. */
export interface NameValuePairCostType {
  /** The name. */
  readonly name?: CostType;
  /** The value. */
  readonly value?: number;
}

export function nameValuePairCostTypeDeserializer(item: any): NameValuePairCostType {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Cost type */
export enum KnownCostType {
  /** MonthlyStorageCost - Cost type */
  MonthlyStorageCost = "MonthlyStorageCost",
  /** MonthlyComputeCost - Cost type */
  MonthlyComputeCost = "MonthlyComputeCost",
  /** MonthlyLicensingCost - Cost type */
  MonthlyLicensingCost = "MonthlyLicensingCost",
  /** MonthlySecurityCost - Cost type */
  MonthlySecurityCost = "MonthlySecurityCost",
  /** MonthlyManagementCost - Cost type */
  MonthlyManagementCost = "MonthlyManagementCost",
  /** MonitoringService - Cost type */
  MonitoringService = "MonitoringService",
  /** DataProtectionService - Cost type */
  DataProtectionService = "DataProtectionService",
  /** PatchingService - Cost type */
  PatchingService = "PatchingService",
  /** MonthlyAzureHybridCost - Cost type */
  MonthlyAzureHybridCost = "MonthlyAzureHybridCost",
  /** MonthlyPremiumV2StorageCost - Cost type */
  MonthlyPremiumV2StorageCost = "MonthlyPremiumV2StorageCost",
  /** MonthlyLinuxAzureHybridCost - Cost type */
  MonthlyLinuxAzureHybridCost = "MonthlyLinuxAzureHybridCost",
  /** MonthlyUltraStorageCost - Cost type */
  MonthlyUltraStorageCost = "MonthlyUltraStorageCost",
  /** MonthlyStandardSsdStorageCost - Cost type */
  MonthlyStandardSsdStorageCost = "MonthlyStandardSsdStorageCost",
  /** MonthlyBandwidthCost - Cost type */
  MonthlyBandwidthCost = "MonthlyBandwidthCost",
  /** MonthlyPremiumStorageCost - Cost type */
  MonthlyPremiumStorageCost = "MonthlyPremiumStorageCost",
  /** MonthlyUltraDiskCost - Cost type */
  MonthlyUltraDiskCost = "MonthlyUltraDiskCost",
  /** MonthlyStandardHddStorageCost - Cost type */
  MonthlyStandardHddStorageCost = "MonthlyStandardHddStorageCost",
  /** MonthlyAvsExternalStorageCost - Cost type */
  MonthlyAvsExternalStorageCost = "MonthlyAvsExternalStorageCost",
  /** MonthlyAvsNetworkCost - Cost type */
  MonthlyAvsNetworkCost = "MonthlyAvsNetworkCost",
  /** MonthlyAvsNodeCost - Cost type */
  MonthlyAvsNodeCost = "MonthlyAvsNodeCost",
  /** TotalMonthlyCost - Cost type */
  TotalMonthlyCost = "TotalMonthlyCost",
}

/**
 * Cost type \
 * {@link KnownCostType} can be used interchangeably with CostType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MonthlyStorageCost**: MonthlyStorageCost - Cost type \
 * **MonthlyComputeCost**: MonthlyComputeCost - Cost type \
 * **MonthlyLicensingCost**: MonthlyLicensingCost - Cost type \
 * **MonthlySecurityCost**: MonthlySecurityCost - Cost type \
 * **MonthlyManagementCost**: MonthlyManagementCost - Cost type \
 * **MonitoringService**: MonitoringService - Cost type \
 * **DataProtectionService**: DataProtectionService - Cost type \
 * **PatchingService**: PatchingService - Cost type \
 * **MonthlyAzureHybridCost**: MonthlyAzureHybridCost - Cost type \
 * **MonthlyPremiumV2StorageCost**: MonthlyPremiumV2StorageCost - Cost type \
 * **MonthlyLinuxAzureHybridCost**: MonthlyLinuxAzureHybridCost - Cost type \
 * **MonthlyUltraStorageCost**: MonthlyUltraStorageCost - Cost type \
 * **MonthlyStandardSsdStorageCost**: MonthlyStandardSsdStorageCost - Cost type \
 * **MonthlyBandwidthCost**: MonthlyBandwidthCost - Cost type \
 * **MonthlyPremiumStorageCost**: MonthlyPremiumStorageCost - Cost type \
 * **MonthlyUltraDiskCost**: MonthlyUltraDiskCost - Cost type \
 * **MonthlyStandardHddStorageCost**: MonthlyStandardHddStorageCost - Cost type \
 * **MonthlyAvsExternalStorageCost**: MonthlyAvsExternalStorageCost - Cost type \
 * **MonthlyAvsNetworkCost**: MonthlyAvsNetworkCost - Cost type \
 * **MonthlyAvsNodeCost**: MonthlyAvsNodeCost - Cost type \
 * **TotalMonthlyCost**: TotalMonthlyCost - Cost type
 */
export type CostType = string;

export function savingsDetailsCommonArrayDeserializer(result: Array<SavingsDetailsCommon>): any[] {
  return result.map((item) => {
    return savingsDetailsCommonDeserializer(item);
  });
}

/** The savings details. */
export interface SavingsDetailsCommon {
  /** The savings options. */
  readonly savingOptions?: SavingsOptions;
  /** The sku cost details per azure offer type. */
  readonly savingsDetail?: NameValuePairSavingsType[];
}

export function savingsDetailsCommonDeserializer(item: any): SavingsDetailsCommon {
  return {
    savingOptions: item["savingOptions"],
    savingsDetail: !item["savingsDetail"]
      ? item["savingsDetail"]
      : nameValuePairSavingsTypeArrayDeserializer(item["savingsDetail"]),
  };
}

export function nameValuePairSavingsTypeArrayDeserializer(
  result: Array<NameValuePairSavingsType>,
): any[] {
  return result.map((item) => {
    return nameValuePairSavingsTypeDeserializer(item);
  });
}

/** The generic name value pair. */
export interface NameValuePairSavingsType {
  /** The name. */
  readonly name?: SavingsType;
  /** The value. */
  readonly value?: number;
}

export function nameValuePairSavingsTypeDeserializer(item: any): NameValuePairSavingsType {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Savings type */
export enum KnownSavingsType {
  /** MonthlyAzureHybridCostSavings - Savings type */
  MonthlyAzureHybridCostSavings = "MonthlyAzureHybridCostSavings",
  /** MonthlyLinuxAzureHybridCostSavings - Savings type */
  MonthlyLinuxAzureHybridCostSavings = "MonthlyLinuxAzureHybridCostSavings",
  /** MonthlyAhubSqlCostSavings - Savings type */
  MonthlyAhubSqlCostSavings = "MonthlyAhubSqlCostSavings",
  /** MonthlyVcfByolCostDifference - Savings type */
  MonthlyVcfByolCostDifference = "MonthlyVcfByolCostDifference",
}

/**
 * Savings type \
 * {@link KnownSavingsType} can be used interchangeably with SavingsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MonthlyAzureHybridCostSavings**: MonthlyAzureHybridCostSavings - Savings type \
 * **MonthlyLinuxAzureHybridCostSavings**: MonthlyLinuxAzureHybridCostSavings - Savings type \
 * **MonthlyAhubSqlCostSavings**: MonthlyAhubSqlCostSavings - Savings type \
 * **MonthlyVcfByolCostDifference**: MonthlyVcfByolCostDifference - Savings type
 */
export type SavingsType = string;

export function migrationIssuesArrayDeserializer(result: Array<MigrationIssues>): any[] {
  return result.map((item) => {
    return migrationIssuesDeserializer(item);
  });
}

/** Migration issues. */
export interface MigrationIssues {
  /** The issue id. */
  readonly issueCode?: string;
  /** The issue category. */
  readonly issueCategory?: MigrationIssuesCategory;
  /** The issue description. */
  readonly issueDescription?: string;
  /** The possible causes. */
  readonly possibleCause?: string;
  /** The recommended action. */
  readonly recommendedActions?: string[];
  /** The more information list. */
  readonly moreInformation?: MoreInformation[];
}

export function migrationIssuesDeserializer(item: any): MigrationIssues {
  return {
    issueCode: item["issueCode"],
    issueCategory: item["issueCategory"],
    issueDescription: item["issueDescription"],
    possibleCause: item["possibleCause"],
    recommendedActions: !item["recommendedActions"]
      ? item["recommendedActions"]
      : item["recommendedActions"].map((p: any) => {
          return p;
        }),
    moreInformation: !item["moreInformation"]
      ? item["moreInformation"]
      : moreInformationArrayDeserializer(item["moreInformation"]),
  };
}

/** Migration Issues Category */
export enum KnownMigrationIssuesCategory {
  /** Issue - Migration Issues Category */
  Issue = "Issue",
  /** Warning - Migration Issues Category */
  Warning = "Warning",
  /** Internal - Migration Issues Category */
  Internal = "Internal",
}

/**
 * Migration Issues Category \
 * {@link KnownMigrationIssuesCategory} can be used interchangeably with MigrationIssuesCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Issue**: Issue - Migration Issues Category \
 * **Warning**: Warning - Migration Issues Category \
 * **Internal**: Internal - Migration Issues Category
 */
export type MigrationIssuesCategory = string;

export function moreInformationArrayDeserializer(result: Array<MoreInformation>): any[] {
  return result.map((item) => {
    return moreInformationDeserializer(item);
  });
}

/** More information details. */
export interface MoreInformation {
  /** The title of the information. */
  readonly title: string;
  /** The URL of the information. */
  readonly url: string;
}

export function moreInformationDeserializer(item: any): MoreInformation {
  return {
    title: item["title"],
    url: item["url"],
  };
}

export function skusMigrationSuitabilityArrayDeserializer(
  result: Array<SkusMigrationSuitability>,
): any[] {
  return result.map((item) => {
    return skusMigrationSuitabilityDeserializer(item);
  });
}

/** Skus details. */
export interface SkusMigrationSuitability {
  /** The Sku kind. */
  readonly kind?: SkuKind;
  /** The resource uri. */
  readonly resourceUri?: string;
  /** The sku name. */
  readonly displayName?: string;
  /** The sku id. */
  readonly id?: string;
  /** The sku type. */
  readonly type?: SkuType;
  /** The source name. */
  readonly sources?: SourceRecommendationMigrationSuitability[];
  /** The sku details. */
  readonly details?: SkuDetails;
}

export function skusMigrationSuitabilityDeserializer(item: any): SkusMigrationSuitability {
  return {
    kind: item["kind"],
    resourceUri: item["resourceUri"],
    displayName: item["displayName"],
    id: item["id"],
    type: item["type"],
    sources: !item["sources"]
      ? item["sources"]
      : sourceRecommendationMigrationSuitabilityArrayDeserializer(item["sources"]),
    details: !item["details"] ? item["details"] : skuDetailsDeserializer(item["details"]),
  };
}

/** Sku Kind */
export enum KnownSkuKind {
  /** Endpoint - Sku Kind */
  Endpoint = "Endpoint",
  /** Details - Sku Kind */
  Details = "Details",
}

/**
 * Sku Kind \
 * {@link KnownSkuKind} can be used interchangeably with SkuKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Endpoint**: Endpoint - Sku Kind \
 * **Details**: Details - Sku Kind
 */
export type SkuKind = string;

/** Sku type */
export enum KnownSkuType {
  /** Unknown - Sku type */
  Unknown = "Unknown",
  /** Compute - Sku type */
  Compute = "Compute",
  /** Storage - Sku type */
  Storage = "Storage",
  /** Network - Sku type */
  Network = "Network",
  /** AppServicePlan - Sku type */
  AppServicePlan = "AppServicePlan",
  /** AzureSpringApps - Sku type */
  AzureSpringApps = "AzureSpringApps",
}

/**
 * Sku type \
 * {@link KnownSkuType} can be used interchangeably with SkuType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Sku type \
 * **Compute**: Compute - Sku type \
 * **Storage**: Storage - Sku type \
 * **Network**: Network - Sku type \
 * **AppServicePlan**: AppServicePlan - Sku type \
 * **AzureSpringApps**: AzureSpringApps - Sku type
 */
export type SkuType = string;

export function sourceRecommendationMigrationSuitabilityArrayDeserializer(
  result: Array<SourceRecommendationMigrationSuitability>,
): any[] {
  return result.map((item) => {
    return sourceRecommendationMigrationSuitabilityDeserializer(item);
  });
}

/** Source recommendation details. */
export interface SourceRecommendationMigrationSuitability {
  /** The sku name. */
  readonly name?: string;
  /** The sku type. */
  readonly migrationSuitability?: MigrationSuitability;
}

export function sourceRecommendationMigrationSuitabilityDeserializer(
  item: any,
): SourceRecommendationMigrationSuitability {
  return {
    name: item["name"],
    migrationSuitability: !item["migrationSuitability"]
      ? item["migrationSuitability"]
      : migrationSuitabilityDeserializer(item["migrationSuitability"]),
  };
}

/** Sku details. */
export interface SkuDetails {
  /** The sku type. */
  readonly skuType?: SkuType;
  /** The sku name. */
  readonly skuName?: string;
  /** The capabilities. */
  readonly capabilities?: NameValuePair[];
  /** The sku cost details. */
  readonly totalCost?: CostDetailsCommon[];
  /** The sku savings details. */
  readonly totalSavings?: SavingsDetailsCommon[];
}

export function skuDetailsDeserializer(item: any): SkuDetails {
  return {
    skuType: item["skuType"],
    skuName: item["skuName"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : nameValuePairArrayDeserializer(item["capabilities"]),
    totalCost: !item["totalCost"]
      ? item["totalCost"]
      : costDetailsCommonArrayDeserializer(item["totalCost"]),
    totalSavings: !item["totalSavings"]
      ? item["totalSavings"]
      : savingsDetailsCommonArrayDeserializer(item["totalSavings"]),
  };
}

export function nameValuePairArrayDeserializer(result: Array<NameValuePair>): any[] {
  return result.map((item) => {
    return nameValuePairDeserializer(item);
  });
}

/** The generic name value pair. */
export interface NameValuePair {
  /** The name. */
  readonly name?: string;
  /** The value. */
  readonly value?: string;
}

export function nameValuePairDeserializer(item: any): NameValuePair {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Data model of Recommendation Result. */
export interface RecommendationResult {
  /** Gets cores and memory request. */
  readonly request: ComputeResource;
  /** Gets cores and memory limit. */
  readonly limit: ComputeResource;
  /** Gets environment name. */
  readonly environmentName: string;
  /** Gets the workload profile type. */
  readonly workloadProfileType: ContainerAppsWorkloadProfileType;
  /** Gets the minimum number of replicas. */
  readonly minReplicas: number;
  /** Gets the maximum number of replicas. */
  readonly maxReplicas: number;
}

export function recommendationResultDeserializer(item: any): RecommendationResult {
  return {
    request: computeResourceDeserializer(item["request"]),
    limit: computeResourceDeserializer(item["limit"]),
    environmentName: item["environmentName"],
    workloadProfileType: item["workloadProfileType"],
    minReplicas: item["minReplicas"],
    maxReplicas: item["maxReplicas"],
  };
}

/** Data model of Cores and Memory Compute Resource. */
export interface ComputeResource {
  /** Gets cores. */
  readonly cores: number;
  /** Gets memory. */
  readonly memory: number;
}

export function computeResourceDeserializer(item: any): ComputeResource {
  return {
    cores: item["cores"],
    memory: item["memory"],
  };
}

/** Web Server Type. */
export enum KnownWebServerType {
  /** Unknown. Indicates Missing Data. */
  Unknown = "Unknown",
  /** ASP.NET Web App. */
  IIS = "IIS",
  /** Java Web App. */
  Tomcat = "Tomcat",
}

/**
 * Web Server Type. \
 * {@link KnownWebServerType} can be used interchangeably with WebServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown. Indicates Missing Data. \
 * **IIS**: ASP.NET Web App. \
 * **Tomcat**: Java Web App.
 */
export type WebServerType = string;

/** The response of a AssessedWebApplication list operation. */
export interface _AssessedWebApplicationListResult {
  /** The AssessedWebApplication items on this page */
  value: AssessedWebApplication[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assessedWebApplicationListResultDeserializer(
  item: any,
): _AssessedWebApplicationListResult {
  return {
    value: assessedWebApplicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assessedWebApplicationArrayDeserializer(
  result: Array<AssessedWebApplication>,
): any[] {
  return result.map((item) => {
    return assessedWebApplicationDeserializer(item);
  });
}

/** ARM model of Azure Container Apps Assessment Options. */
export interface ContainerAppsAssessmentOptions extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ContainerAppsAssessmentOptionsProperties;
}

export function containerAppsAssessmentOptionsDeserializer(
  item: any,
): ContainerAppsAssessmentOptions {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : containerAppsAssessmentOptionsPropertiesDeserializer(item["properties"]),
  };
}

/** Azure Container Apps Assessment Options Properties. */
export interface ContainerAppsAssessmentOptionsProperties {
  /** Gets the mapping of Assessment Options in graph representation. */
  readonly edges: Record<string, ContainerAppsAssessmentOptionsOutboundEdgeGroup>;
}

export function containerAppsAssessmentOptionsPropertiesDeserializer(
  item: any,
): ContainerAppsAssessmentOptionsProperties {
  return {
    edges: containerAppsAssessmentOptionsOutboundEdgeGroupRecordDeserializer(item["edges"]),
  };
}

export function containerAppsAssessmentOptionsOutboundEdgeGroupRecordDeserializer(
  item: Record<string, any>,
): Record<string, ContainerAppsAssessmentOptionsOutboundEdgeGroup> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : containerAppsAssessmentOptionsOutboundEdgeGroupDeserializer(item[key]);
  });
  return result;
}

/** A class that represents the outbound edges from a given node. */
export interface ContainerAppsAssessmentOptionsOutboundEdgeGroup {
  /** Gets or sets the Workload Profile SKUs. */
  sku: ContainerAppsWorkloadProfileSku[];
  /** Gets or sets the Workload Profile Types. */
  workloadProfileTypes: ContainerAppsWorkloadProfileType[];
  /** Gets or sets the Azure Locations. */
  targetLocations: string[];
  /** Gets or sets the Azure Currency. */
  currencies: AzureCurrency[];
  /** Gets or sets the Assessment Savings Options. */
  savingsOptions: SavingsOptions[];
  /** Gets or sets the Licensing Program. */
  licensingProgram: LicensingProgram[];
}

export function containerAppsAssessmentOptionsOutboundEdgeGroupDeserializer(
  item: any,
): ContainerAppsAssessmentOptionsOutboundEdgeGroup {
  return {
    sku: item["sku"].map((p: any) => {
      return p;
    }),
    workloadProfileTypes: item["workloadProfileTypes"].map((p: any) => {
      return p;
    }),
    targetLocations: item["targetLocations"].map((p: any) => {
      return p;
    }),
    currencies: item["currencies"].map((p: any) => {
      return p;
    }),
    savingsOptions: item["savingsOptions"].map((p: any) => {
      return p;
    }),
    licensingProgram: item["licensingProgram"].map((p: any) => {
      return p;
    }),
  };
}

/** The response of a ContainerAppsAssessmentOptions list operation. */
export interface _ContainerAppsAssessmentOptionsListResult {
  /** The ContainerAppsAssessmentOptions items on this page */
  value: ContainerAppsAssessmentOptions[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerAppsAssessmentOptionsListResultDeserializer(
  item: any,
): _ContainerAppsAssessmentOptionsListResult {
  return {
    value: containerAppsAssessmentOptionsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerAppsAssessmentOptionsArrayDeserializer(
  result: Array<ContainerAppsAssessmentOptions>,
): any[] {
  return result.map((item) => {
    return containerAppsAssessmentOptionsDeserializer(item);
  });
}

/** ARM model of Azure Container Apps Summary. */
export interface ContainerAppsSummary extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ContainerAppsSummaryProperties;
}

export function containerAppsSummaryDeserializer(item: any): ContainerAppsSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : containerAppsSummaryPropertiesDeserializer(item["properties"]),
  };
}

/** Azure Container Apps Summary Properties. */
export interface ContainerAppsSummaryProperties {
  /** The summary type */
  readonly summaryType?: SummaryType;
  /** The summary name */
  readonly summaryName?: string;
  /** The source details list. */
  readonly sources?: SourceDetails[];
  /** The target details list. */
  readonly targets?: TargetDetails[];
  /** The target source mapping. */
  readonly targetSourceMapping?: TargetSourcePair[];
  /** The cost components. */
  readonly costComponents?: CostDetailsCommon[];
  /** The cost components. */
  readonly savingsComponents?: SavingsDetailsCommon[];
  /** Gets the number of web apps. */
  readonly webAppCount: number;
  /** Gets the number of web servers. */
  readonly webServerCount: number;
  /** Gets the number of machines. */
  readonly machineCount: number;
}

export function containerAppsSummaryPropertiesDeserializer(
  item: any,
): ContainerAppsSummaryProperties {
  return {
    summaryType: item["summaryType"],
    summaryName: item["summaryName"],
    sources: !item["sources"] ? item["sources"] : sourceDetailsArrayDeserializer(item["sources"]),
    targets: !item["targets"] ? item["targets"] : targetDetailsArrayDeserializer(item["targets"]),
    targetSourceMapping: !item["targetSourceMapping"]
      ? item["targetSourceMapping"]
      : targetSourcePairArrayDeserializer(item["targetSourceMapping"]),
    costComponents: !item["costComponents"]
      ? item["costComponents"]
      : costDetailsCommonArrayDeserializer(item["costComponents"]),
    savingsComponents: !item["savingsComponents"]
      ? item["savingsComponents"]
      : savingsDetailsCommonArrayDeserializer(item["savingsComponents"]),
    webAppCount: item["webAppCount"],
    webServerCount: item["webServerCount"],
    machineCount: item["machineCount"],
  };
}

/** Summary Type */
export enum KnownSummaryType {
  /** Unknown - Summary Type */
  Unknown = "Unknown",
  /** Strategy - Summary Type */
  Strategy = "Strategy",
  /** Target - Summary Type */
  Target = "Target",
}

/**
 * Summary Type \
 * {@link KnownSummaryType} can be used interchangeably with SummaryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Summary Type \
 * **Strategy**: Strategy - Summary Type \
 * **Target**: Target - Summary Type
 */
export type SummaryType = string;

export function sourceDetailsArrayDeserializer(result: Array<SourceDetails>): any[] {
  return result.map((item) => {
    return sourceDetailsDeserializer(item);
  });
}

/** Source details */
export interface SourceDetails {
  /** The source name. */
  readonly sourceName?: AssessmentSource;
  /** The source type. */
  readonly sourceType?: MigrateWorkloadType;
  /** The migration platform. */
  readonly platform?: MigrationPlatform;
  /** The count of a type of source. */
  readonly count?: number;
}

export function sourceDetailsDeserializer(item: any): SourceDetails {
  return {
    sourceName: item["sourceName"],
    sourceType: item["sourceType"],
    platform: item["platform"],
    count: item["count"],
  };
}

/** Assessment Source */
export enum KnownAssessmentSource {
  /** Unknown - Assessment Source */
  Unknown = "Unknown",
  /** Machine - Assessment Source */
  Machine = "Machine",
  /** IIS - Assessment Source */
  IIS = "IIS",
  /** TomCat - Assessment Source */
  TomCat = "TomCat",
  /** OracleServer - Assessment Source */
  OracleServer = "OracleServer",
  /** OracleDatabase - Assessment Source */
  OracleDatabase = "OracleDatabase",
  /** SAPInstance - Assessment Source */
  SAPInstance = "SAPInstance",
  /** SpringbootApplication - Assessment Source */
  SpringbootApplication = "SpringbootApplication",
  /** MySQLServer - Assessment Source */
  MySQLServer = "MySQLServer",
  /** SqlInstance - Assessment Source */
  SqlInstance = "SqlInstance",
  /** SqlDatabase - Assessment Source */
  SqlDatabase = "SqlDatabase",
  /** WebApps - Assessment Source */
  WebApps = "WebApps",
}

/**
 * Assessment Source \
 * {@link KnownAssessmentSource} can be used interchangeably with AssessmentSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Assessment Source \
 * **Machine**: Machine - Assessment Source \
 * **IIS**: IIS - Assessment Source \
 * **TomCat**: TomCat - Assessment Source \
 * **OracleServer**: OracleServer - Assessment Source \
 * **OracleDatabase**: OracleDatabase - Assessment Source \
 * **SAPInstance**: SAPInstance - Assessment Source \
 * **SpringbootApplication**: SpringbootApplication - Assessment Source \
 * **MySQLServer**: MySQLServer - Assessment Source \
 * **SqlInstance**: SqlInstance - Assessment Source \
 * **SqlDatabase**: SqlDatabase - Assessment Source \
 * **WebApps**: WebApps - Assessment Source
 */
export type AssessmentSource = string;

export function targetDetailsArrayDeserializer(result: Array<TargetDetails>): any[] {
  return result.map((item) => {
    return targetDetailsDeserializer(item);
  });
}

/** Target details */
export interface TargetDetails {
  /** The target name. */
  readonly targetName?: AzureTarget;
  /** The target type. */
  readonly targetType?: MigrateWorkloadType;
  /** The migration platform. */
  readonly platform?: MigrationPlatform;
  /** The count of a type of source. */
  readonly count?: number;
}

export function targetDetailsDeserializer(item: any): TargetDetails {
  return {
    targetName: item["targetName"],
    targetType: item["targetType"],
    platform: item["platform"],
    count: item["count"],
  };
}

export function targetSourcePairArrayDeserializer(result: Array<TargetSourcePair>): any[] {
  return result.map((item) => {
    return targetSourcePairDeserializer(item);
  });
}

/** Target source pair */
export interface TargetSourcePair {
  /** The source name. */
  readonly sourceRef?: AssessmentSource;
  /** The target name. */
  readonly targetRef?: AzureTarget;
  /** The count of a type of source. */
  readonly sourceCount?: number;
  /** The count of a type of target. */
  readonly targetCount?: number;
  /** The migration details. */
  readonly migrationDetails?: MigrationDetails;
  /** The management details. */
  readonly managementDetails?: ManagementDetails[];
  /** The cost details. */
  readonly costDetails?: CostDetailsCommon[];
  /** The savings details. */
  readonly savingsDetails?: SavingsDetailsCommon[];
  /** The confidence score. */
  readonly confidenceScore?: number;
}

export function targetSourcePairDeserializer(item: any): TargetSourcePair {
  return {
    sourceRef: item["sourceRef"],
    targetRef: item["targetRef"],
    sourceCount: item["sourceCount"],
    targetCount: item["targetCount"],
    migrationDetails: !item["migrationDetails"]
      ? item["migrationDetails"]
      : migrationDetailsDeserializer(item["migrationDetails"]),
    managementDetails: !item["managementDetails"]
      ? item["managementDetails"]
      : managementDetailsArrayDeserializer(item["managementDetails"]),
    costDetails: !item["costDetails"]
      ? item["costDetails"]
      : costDetailsCommonArrayDeserializer(item["costDetails"]),
    savingsDetails: !item["savingsDetails"]
      ? item["savingsDetails"]
      : savingsDetailsCommonArrayDeserializer(item["savingsDetails"]),
    confidenceScore: item["confidenceScore"],
  };
}

/** Migration details. */
export interface MigrationDetails {
  /** The readiness summary. */
  readonly readinessSummary?: NameValuePairCloudSuitabilityCommon[];
  /** The migration type */
  readonly migrationType?: MigrationType;
}

export function migrationDetailsDeserializer(item: any): MigrationDetails {
  return {
    readinessSummary: !item["readinessSummary"]
      ? item["readinessSummary"]
      : nameValuePairCloudSuitabilityCommonArrayDeserializer(item["readinessSummary"]),
    migrationType: item["migrationType"],
  };
}

export function nameValuePairCloudSuitabilityCommonArrayDeserializer(
  result: Array<NameValuePairCloudSuitabilityCommon>,
): any[] {
  return result.map((item) => {
    return nameValuePairCloudSuitabilityCommonDeserializer(item);
  });
}

/** The generic name value pair. */
export interface NameValuePairCloudSuitabilityCommon {
  /** The name. */
  readonly name?: CloudSuitabilityCommon;
  /** The value. */
  readonly value?: number;
}

export function nameValuePairCloudSuitabilityCommonDeserializer(
  item: any,
): NameValuePairCloudSuitabilityCommon {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Migration Type */
export enum KnownMigrationType {
  /** Unknown - Migration Type */
  Unknown = "Unknown",
  /** Replatform - Migration Type */
  Replatform = "Replatform",
  /** Rehost - Migration Type */
  Rehost = "Rehost",
  /** Retain - Migration Type */
  Retain = "Retain",
  /** Rearchitect - Migration Type */
  Rearchitect = "Rearchitect",
}

/**
 * Migration Type \
 * {@link KnownMigrationType} can be used interchangeably with MigrationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown - Migration Type \
 * **Replatform**: Replatform - Migration Type \
 * **Rehost**: Rehost - Migration Type \
 * **Retain**: Retain - Migration Type \
 * **Rearchitect**: Rearchitect - Migration Type
 */
export type MigrationType = string;

export function managementDetailsArrayDeserializer(result: Array<ManagementDetails>): any[] {
  return result.map((item) => {
    return managementDetailsDeserializer(item);
  });
}

/** Management details. */
export interface ManagementDetails {
  /** The management summary name. */
  readonly name?: AzureManagementOfferingType;
  /** The management suitability summary. */
  readonly readinessSummary?: NameValuePairCloudSuitabilityCommon[];
}

export function managementDetailsDeserializer(item: any): ManagementDetails {
  return {
    name: item["name"],
    readinessSummary: !item["readinessSummary"]
      ? item["readinessSummary"]
      : nameValuePairCloudSuitabilityCommonArrayDeserializer(item["readinessSummary"]),
  };
}

/** Azure management Offering type */
export enum KnownAzureManagementOfferingType {
  /** No - Azure management Offering type */
  No = "No",
  /** SCOMMI - Azure management Offering type */
  Scommi = "SCOMMI",
  /** AzMon - Azure management Offering type */
  AzMon = "AzMon",
  /** AUM - Azure management Offering type */
  AUM = "AUM",
  /** AzureBackup - Azure management Offering type */
  AzureBackup = "AzureBackup",
}

/**
 * Azure management Offering type \
 * {@link KnownAzureManagementOfferingType} can be used interchangeably with AzureManagementOfferingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **No**: No - Azure management Offering type \
 * **SCOMMI**: SCOMMI - Azure management Offering type \
 * **AzMon**: AzMon - Azure management Offering type \
 * **AUM**: AUM - Azure management Offering type \
 * **AzureBackup**: AzureBackup - Azure management Offering type
 */
export type AzureManagementOfferingType = string;

/** The response of a ContainerAppsSummary list operation. */
export interface _ContainerAppsSummaryListResult {
  /** The ContainerAppsSummary items on this page */
  value: ContainerAppsSummary[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerAppsSummaryListResultDeserializer(
  item: any,
): _ContainerAppsSummaryListResult {
  return {
    value: containerAppsSummaryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerAppsSummaryArrayDeserializer(result: Array<ContainerAppsSummary>): any[] {
  return result.map((item) => {
    return containerAppsSummaryDeserializer(item);
  });
}

/** ARM model of Azure Container Apps Managed Environment. */
export interface ContainerAppsManagedEnvironment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ContainerAppsManagedEnvironmentProperties;
}

export function containerAppsManagedEnvironmentDeserializer(
  item: any,
): ContainerAppsManagedEnvironment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : containerAppsManagedEnvironmentPropertiesDeserializer(item["properties"]),
  };
}

/** ARM model of Azure Container Apps Managed Environment Properties. */
export interface ContainerAppsManagedEnvironmentProperties {
  /** Gets region. */
  readonly region?: string;
  /** Gets the workload profile type for the environment. */
  readonly workloadProfileType?: ContainerAppsWorkloadProfileType;
  /** Gets the total vCPU cores allocated to the environment. */
  readonly cores?: number;
  /** Gets the total memory in GiB allocated to the environment. */
  readonly memoryInGib?: number;
  /** Gets the number of container apps in this environment. */
  readonly numberOfContainerApps?: number;
  /** Gets monthly cost. */
  readonly monthlyCost?: number;
  /** Gets management fee monthly cost. */
  readonly managementFeeMonthlyCost?: number;
  /** Gets the created timestamp. */
  readonly createdTimestamp?: Date;
  /** Gets the updated timestamp. */
  readonly updatedTimestamp?: Date;
  /** Gets list of container apps in this environment. */
  readonly containerApps: ContainerApp[];
}

export function containerAppsManagedEnvironmentPropertiesDeserializer(
  item: any,
): ContainerAppsManagedEnvironmentProperties {
  return {
    region: item["region"],
    workloadProfileType: item["workloadProfileType"],
    cores: item["cores"],
    memoryInGib: item["memoryInGib"],
    numberOfContainerApps: item["numberOfContainerApps"],
    monthlyCost: item["monthlyCost"],
    managementFeeMonthlyCost: item["managementFeeMonthlyCost"],
    createdTimestamp: !item["createdTimestamp"]
      ? item["createdTimestamp"]
      : new Date(item["createdTimestamp"]),
    updatedTimestamp: !item["updatedTimestamp"]
      ? item["updatedTimestamp"]
      : new Date(item["updatedTimestamp"]),
    containerApps: containerAppArrayDeserializer(item["containerApps"]),
  };
}

export function containerAppArrayDeserializer(result: Array<ContainerApp>): any[] {
  return result.map((item) => {
    return containerAppDeserializer(item);
  });
}

/** Data model of Container App within an Azure Container Apps environment. */
export interface ContainerApp {
  /** Gets the Azure resource ID of the referenced container app. */
  readonly containerAppId: string;
  /** Gets the name of the referenced container app. */
  readonly containerAppName: string;
  /** Gets the parent environment name. */
  readonly environmentName: string;
  /** Gets the workload profile type. */
  readonly workloadProfileType?: ContainerAppsWorkloadProfileType;
  /** Gets the workload profile SKU. */
  readonly sku?: ContainerAppsWorkloadProfileSku;
  /** Gets vCPU cores allocated to the container app. */
  readonly cores?: number;
  /** Gets memory in GiB allocated to the container app. */
  readonly memoryInGib?: number;
  /** Gets monthly cost. */
  readonly monthlyCost?: number;
}

export function containerAppDeserializer(item: any): ContainerApp {
  return {
    containerAppId: item["containerAppId"],
    containerAppName: item["containerAppName"],
    environmentName: item["environmentName"],
    workloadProfileType: item["workloadProfileType"],
    sku: item["sku"],
    cores: item["cores"],
    memoryInGib: item["memoryInGib"],
    monthlyCost: item["monthlyCost"],
  };
}

/** The response of a ContainerAppsManagedEnvironment list operation. */
export interface _ContainerAppsManagedEnvironmentListResult {
  /** The ContainerAppsManagedEnvironment items on this page */
  value: ContainerAppsManagedEnvironment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerAppsManagedEnvironmentListResultDeserializer(
  item: any,
): _ContainerAppsManagedEnvironmentListResult {
  return {
    value: containerAppsManagedEnvironmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerAppsManagedEnvironmentArrayDeserializer(
  result: Array<ContainerAppsManagedEnvironment>,
): any[] {
  return result.map((item) => {
    return containerAppsManagedEnvironmentDeserializer(item);
  });
}

/** The response of a ContainerAppsCostDetail list operation. */
export interface _ContainerAppsCostDetailListResult {
  /** The ContainerAppsCostDetail items on this page */
  value: ContainerAppsCostDetail[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerAppsCostDetailListResultDeserializer(
  item: any,
): _ContainerAppsCostDetailListResult {
  return {
    value: containerAppsCostDetailArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerAppsCostDetailArrayDeserializer(
  result: Array<ContainerAppsCostDetail>,
): any[] {
  return result.map((item) => {
    return containerAppsCostDetailDeserializer(item);
  });
}

/** ARM model of Azure Container Apps Cost Detail. */
export interface ContainerAppsCostDetail extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ContainerAppsCostDetailProperties;
}

export function containerAppsCostDetailDeserializer(item: any): ContainerAppsCostDetail {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : containerAppsCostDetailPropertiesDeserializer(item["properties"]),
  };
}

/** ARM model of Azure Container Apps Cost Detail Properties. */
export interface ContainerAppsCostDetailProperties {
  /** Gets the Azure resource ID of the referenced container app. */
  readonly containerAppId: string;
  /** Gets the name of the referenced container app. */
  readonly containerAppName: string;
  /** Gets the parent environment name. */
  readonly environmentName: string;
  /** Gets the workload profile type. */
  readonly workloadProfileType?: ContainerAppsWorkloadProfileType;
  /** Gets the workload profile SKU. */
  readonly sku?: ContainerAppsWorkloadProfileSku;
  /** Gets vCPU cores allocated to the container app. */
  readonly cores?: number;
  /** Gets memory in GiB allocated to the container app. */
  readonly memoryInGib?: number;
  /** Gets monthly cost. */
  readonly monthlyCost?: number;
}

export function containerAppsCostDetailPropertiesDeserializer(
  item: any,
): ContainerAppsCostDetailProperties {
  return {
    containerAppId: item["containerAppId"],
    containerAppName: item["containerAppName"],
    environmentName: item["environmentName"],
    workloadProfileType: item["workloadProfileType"],
    sku: item["sku"],
    cores: item["cores"],
    memoryInGib: item["memoryInGib"],
    monthlyCost: item["monthlyCost"],
  };
}

/** API Versions for Azure Container Apps Assessment Resource. */
export enum KnownContainerAppsApiVersions {
  /** 2025-09-09-preview API Version. */
  V20250909Preview = "2025-09-09-preview",
}
