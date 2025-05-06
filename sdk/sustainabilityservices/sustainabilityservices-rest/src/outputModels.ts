// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Paged collection of FactorLibrary items */
export interface PagedFactorLibraryOutput {
  /** The FactorLibrary items on this page */
  value: Array<FactorLibraryOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Represents collection of emission and estimation factors. */
export interface FactorLibraryOutput {
  /** Factor library id. */
  readonly factorLibraryId: string;
  /** Factor library name. */
  name: string;
  /** Type of factor library: estimation or emission. */
  libraryType: string;
  /** Appropriate acknowledgment to the original content creator when utilizing or distributing their work within the application. */
  attribution?: string;
  /** Factor library version. */
  version?: string;
  /** Description of the library. */
  description?: string;
  /** Date published. */
  datePublished?: string;
  /** Documentation reference. */
  documentationReference?: string;
}

/** Paged collection of EstimationFactor items */
export interface PagedEstimationFactorOutput {
  /** The EstimationFactor items on this page */
  value: Array<EstimationFactorOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Estimation factors are used to convert proxy data into activity data that can be used with an emission factor. Typical examples are square footage of real estate to convert to energy or refrigerants, and the number of nights of a hotel stay */
export interface EstimationFactorOutput {
  /** Entity name. */
  entityName: string;
  /** ID. */
  id: string;
  /** Document reference. */
  documentationReference?: string;
  /** Estimation factor ID. */
  readonly estimationFactorId: string;
  /** Factor library which the estimation factor belongs to. */
  factorLibrary: LookupFieldOutput;
  /** Estimation factor value. */
  factorValue: number;
  /** Unit for factor value. */
  factorValueUnit: LookupFieldOutput;
  /** Estimation factor name. */
  name: string;
  /** Subtype. */
  subtype?: string;
  /** Type. */
  type?: string;
  /** Unit. */
  unit: LookupFieldOutput;
}

/** Lookup details. */
export interface LookupFieldOutput {
  /** Unique ID of the referenced field value. */
  id: string;
  /** Schema name of the referenced table. */
  logicalName: string;
  /** Display name of the referenced field value. */
  name: string;
  /** Key attributes of the referenced field. */
  keyAttributes: Record<string, any>;
  /** Row version. */
  rowVersion: string;
}

/** Paged collection of EmissionFactor items */
export interface PagedEmissionFactorOutput {
  /** The EmissionFactor items on this page */
  value: Array<EmissionFactorOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Conversion factor to convert quantities in activity data into greenhouse gas emissions. */
export interface EmissionFactorOutput {
  /** Entity name. */
  entityName: string;
  /** Factor library to which the emission factor belongs to. */
  factorLibrary: LookupFieldOutput;
  /** CH4 factor value. */
  ch4?: number;
  /** Unit for CH4 factor value. */
  ch4Unit?: LookupFieldOutput;
  /** CO2 factor value. */
  co2?: number;
  /** Unit for CO2 factor value. */
  co2Unit?: LookupFieldOutput;
  /** CO2e factor value. */
  co2e?: number;
  /** Unit for CO2e factor value. */
  co2eUnit?: LookupFieldOutput;
  /** Documentation reference. */
  documentationReference?: string;
  /** Emission factor ID. */
  readonly emissionFactorId: string;
  /** ID. */
  id: string;
  /** HFCs factor value. */
  hfcs?: number;
  /** Unit for HFCs factor value. */
  hfcsUnit?: LookupFieldOutput;
  /** Is biofuel. */
  isBiofuel?: boolean;
  /** Emission factor name. */
  name: string;
  /** NF3 factor value. */
  nf3?: number;
  /** Unit for NF3 factor value. */
  nf3Unit?: LookupFieldOutput;
  /** NO2 factor value. */
  n2o?: number;
  /** Unit for N2O factor value. */
  n2oUnit?: LookupFieldOutput;
  /** Other GHG factor value. */
  otherGhgs?: number;
  /** Unit for other GHGs factor value. */
  otherGhgsUnit?: LookupFieldOutput;
  /** PFCs factor value. */
  pfcs?: number;
  /** Unit for PFCs factor value. */
  pfcsUnit?: LookupFieldOutput;
  /** SF6 factor value. */
  sf6?: number;
  /** Unit for SF6 factor value. */
  sf6Unit?: LookupFieldOutput;
  /** Subtype. */
  subtype?: string;
  /** Type. */
  type?: string;
  /** Unit. */
  unit?: LookupFieldOutput;
}

/** Paged collection of FactorMapping items */
export interface PagedFactorMappingOutput {
  /** The FactorMapping items on this page */
  value: Array<FactorMappingOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Factor mapping. */
export interface FactorMappingOutput {
  /** Factor mapping id. */
  readonly factorMappingId: string;
  /** Factor library which this mapping belongs to. */
  factorLibrary: LookupFieldOutput;
  /** Name. */
  name: string;
  /** Factor associated with the factor mapping. */
  factor: LookupFieldOutput;
  /** Reference data 1 */
  referenceData1: LookupFieldOutput;
  /** Reference data 2 */
  referenceData2?: LookupFieldOutput;
  /** Reference data 3 */
  referenceData3?: LookupFieldOutput;
  /** Reference data 4 */
  referenceData4?: LookupFieldOutput;
}

/** Paged collection of CalculationModel items */
export interface PagedCalculationModelOutput {
  /** The CalculationModel items on this page */
  value: Array<CalculationModelOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Logical representation of the emission calculation that runs the calculation methodology bringing activity data and emission factors together. */
export interface CalculationModelOutput {
  /** Entity name. */
  entityName: string;
  /** Calculation model ID. */
  readonly calculationModelId: string;
  /** Calculation flow json. */
  calculationFlowJson?: string;
  /** Calculation method or model used to calculate emissions, as recommended by protocol. */
  calculationMethod?: string;
  /** Data definition of source. */
  dataDefinitionId?: LookupFieldOutput;
  /** Document reference. */
  documentationReference?: string;
  /** Emission calculation ID. */
  emissionCalculationId: string;
  /** Emission source. */
  emissionSource: LookupFieldOutput;
  /** Model JSON version. */
  modelJsonVersion?: string;
  /** Calculation model name. */
  name: string;
  /** Sustainability module. */
  sustainabilitymodule?: LookupFieldOutput;
  /** Model type. */
  type: string;
}

/** Paged collection of ReferenceDataEntities items */
export interface PagedReferenceDataEntitiesOutput {
  /** The ReferenceDataEntities items on this page */
  value: Array<ReferenceDataEntitiesOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Reference data. */
export interface ReferenceDataEntitiesOutput {
  /** Logical name of the entity. Example: fueltype. */
  readonly entityName: string;
  /** Display name of the entity. Example: Fuel Type. */
  displayName: string;
  /** Schema name of the entity. */
  schemaName: string;
}

/** Paged collection of EntityRecord items */
export interface PagedEntityRecordOutput {
  /** The EntityRecord items on this page */
  value: Array<EntityRecordOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Entity record. */
export interface EntityRecordOutput {
  /** Record ID. */
  readonly id: string;
  /** Entity data. */
  data: Record<string, any>;
}

/** The output of a calculation. */
export interface EmissionCalculationResultOutput {
  /** Calculation summary. */
  summary: CalculationSummaryOutput;
  /** Calculation error details. */
  errorDetails: Array<CalculationErrorDetailsOutput>;
  /** Calculated emissions from the activities. */
  activityEmissionOutput: Array<ActivityEmissionOutputOutput>;
}

/** Describes the summary of the calculation. */
export interface CalculationSummaryOutput {
  /**
   * Calculation status.
   *
   * Possible values: "Succeeded", "Failed", "CompletedWithErrors"
   */
  status: CalculationStatusEnumOutput;
  /** Total number of successful activities. */
  successfulActivities: number;
  /** Total number of failed activities. */
  failedActivities: number;
  /** Total number of excluded activities. */
  excludedActivities: number;
  /** Total number of processed activities. */
  processedActivities: number;
}

/** Details of the error in calculation */
export interface CalculationErrorDetailsOutput {
  /** Activity ID. */
  activityId: string;
  /** Activity name. */
  activityName: string;
  /** Error message. */
  message: string;
  /** Error code. */
  code: string;
}

/** Output emission of the activity */
export interface ActivityEmissionOutputOutput {
  /** Activity ID. */
  id: string;
  /** Activity emissions for the activity. */
  emissions: Array<GhgEmissionsOutput>;
}

/** Emissions for the activity. */
export interface GhgEmissionsOutput {
  /** CH4 emission. */
  ch4?: number;
  /** CH4 emissions unit. */
  ch4Unit?: string;
  /** CO2 emissions. */
  co2?: number;
  /** CO2 emissions unit. */
  co2Unit?: string;
  /** CO2e emissions. */
  co2e?: number;
  /** CO2e emissions unit. */
  co2eUnit?: string;
  /** CO2emt emissions. */
  co2emt?: number;
  /** HFCs emissions. */
  hfcs?: number;
  /** HFCs emissions unit. */
  hfcsUnit?: string;
  /** N2O emissions. */
  n2o?: number;
  /** N2O emissions unit. */
  n2oUnit?: string;
  /** NF3 emissions. */
  nf3?: number;
  /** NF3 emissions unit. */
  nf3Unit?: string;
  /** PFCs emissions. */
  pfcs?: number;
  /** PFCs emissions unit. */
  pfcsUnit?: string;
  /** Other GHG emissions. */
  otherGhgs?: number;
  /** Other GHG emissions unit. */
  otherGhgsUnit?: string;
  /** SF6 emissions. */
  sf6?: number;
  /** SF6 emissions unit. */
  sf6Unit?: string;
  /** Is market based. */
  isMarketBased?: boolean;
  /** Is biogenic. */
  isBiogenic?: boolean;
  /** Emission calculation model used for the calculation. */
  emissionCalculationModel?: string;
  /** Factor library used for the calculation. */
  calculationLibrary?: string;
  /** Emission factor used for the calculation. */
  emissionFactor?: string;
  /** Actual quantity of the activity responsible for the emission. For example, the actual quantity for a business trip involving a hotel stay might be the number of nights stayed multiplied by the estimation factor. */
  adjustedActualQuantity?: string;
  /** Actual quantity unit. */
  adjustedActualQuantityUnit?: string;
}

/** Supported API versions for the Microsoft.SustainabilityServices. */
export type VersionsOutput = "2025-01-01-preview";
/** Alias for CalculationStatusEnumOutput */
export type CalculationStatusEnumOutput = string;
