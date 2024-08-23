// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ApplicationData,
  SearchBoundaryQuery,
  Boundary,
  CropProduct,
  Crop,
  DeviceDataModel,
  Device,
  FarmOperationDataIngestionJob,
  Farm,
  Field,
  HarvestData,
  ImageProcessingRasterizeJob,
  Insight,
  ManagementZone,
  BiomassModelJob,
  SensorPlacementModelJob,
  SoilMoistureModelJob,
  NutrientAnalysis,
  OAuthProvider,
  OAuthConnectRequest,
  Party,
  PlantingData,
  PlantTissueAnalysis,
  PrescriptionMap,
  Prescription,
  SatelliteDataIngestionJob,
  SearchFeaturesQuery,
  SeasonalField,
  Season,
  SensorDataModel,
  SensorMapping,
  SensorPartnerIntegrationModel,
  Sensor,
  SensorRenewConnectionStringModel,
  SolutionInference,
  TillageData,
  WeatherDataDeleteJob,
  WeatherDataIngestionJob,
  WeatherDataProviderRequest,
  Zone,
} from "./models";

export interface ApplicationDataListQueryParamProperties {
  /** Minimum average amount of material applied during the application (inclusive). */
  minAvgMaterial?: number;
  /** Maximum average amount of material applied during the application (inclusive). */
  maxAvgMaterial?: number;
  /** Minimum total amount of material applied during the application (inclusive). */
  minTotalMaterial?: number;
  /** Maximum total amount of material applied during the application (inclusive). */
  maxTotalMaterial?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface ApplicationDataListQueryParam {
  queryParameters?: ApplicationDataListQueryParamProperties;
}

export type ApplicationDataListParameters = ApplicationDataListQueryParam & RequestParameters;

export interface ApplicationDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the party. */
  partyId: string;
  /** Id of the application data. */
  applicationDataId: string;
}

export interface ApplicationDataCreateCascadeDeleteJobQueryParam {
  queryParameters: ApplicationDataCreateCascadeDeleteJobQueryParamProperties;
}

export type ApplicationDataCreateCascadeDeleteJobParameters =
  ApplicationDataCreateCascadeDeleteJobQueryParam & RequestParameters;
export type ApplicationDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ApplicationDataListByPartyIdQueryParamProperties {
  /** Minimum average amount of material applied during the application (inclusive). */
  minAvgMaterial?: number;
  /** Maximum average amount of material applied during the application (inclusive). */
  maxAvgMaterial?: number;
  /** Minimum total amount of material applied during the application (inclusive). */
  minTotalMaterial?: number;
  /** Maximum total amount of material applied during the application (inclusive). */
  maxTotalMaterial?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface ApplicationDataListByPartyIdQueryParam {
  queryParameters?: ApplicationDataListByPartyIdQueryParamProperties;
}

export type ApplicationDataListByPartyIdParameters = ApplicationDataListByPartyIdQueryParam &
  RequestParameters;
export type ApplicationDataGetParameters = RequestParameters;
/** Application data resource payload to create or update. */
export type ApplicationDataResourceMergeAndPatch = Partial<ApplicationData>;

export interface ApplicationDataCreateOrUpdateBodyParam {
  /** Application data resource payload to create or update. */
  body: ApplicationDataResourceMergeAndPatch;
}

export interface ApplicationDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type ApplicationDataCreateOrUpdateParameters = ApplicationDataCreateOrUpdateMediaTypesParam &
  ApplicationDataCreateOrUpdateBodyParam &
  RequestParameters;
export type ApplicationDataDeleteParameters = RequestParameters;

export interface AttachmentsListByPartyIdQueryParamProperties {
  /** Resource Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  resourceIds?: string;
  /**
   * Resource Types of the resource.
   * i.e. Party, Farm, Field, SeasonalField, Boundary, ApplicationData, HarvestData, TillageData, PlantingData, PlantTissueAnalysis. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  resourceTypes?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface AttachmentsListByPartyIdQueryParam {
  queryParameters?: AttachmentsListByPartyIdQueryParamProperties;
}

export type AttachmentsListByPartyIdParameters = AttachmentsListByPartyIdQueryParam &
  RequestParameters;
export type AttachmentsGetParameters = RequestParameters;

export interface AttachmentsCreateOrUpdateBodyParam {
  body?: AttachmentsCreateOrUpdateFormBody;
}

export interface AttachmentsCreateOrUpdateFormBody {
  /**
   * File to be uploaded.
   *
   * Value may contain any sequence of octets
   */
  file?: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
  /** Associated Resource id for this attachment. */
  resourceId?: string;
  /** Associated Resource type for this attachment. */
  resourceType?: string;
  /** Original File Name for this attachment. */
  originalFileName?: string;
  /** Unique id. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  createdDateTime?: string;
  /** Date when resource was last modified. */
  modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** Created by user/tenant id. */
  createdBy?: string;
  /** Modified by user/tenant id. */
  modifiedBy?: string;
}

export interface AttachmentsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type AttachmentsCreateOrUpdateParameters = AttachmentsCreateOrUpdateMediaTypesParam &
  AttachmentsCreateOrUpdateBodyParam &
  RequestParameters;
export type AttachmentsDeleteParameters = RequestParameters;
export type AttachmentsDownloadParameters = RequestParameters;

export interface BoundariesListQueryParamProperties {
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Type it belongs to. */
  type?: string;
  /** Parent Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  parentIds?: string;
  /** Minimum area of the boundary (inclusive). */
  minArea?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface BoundariesListQueryParam {
  queryParameters?: BoundariesListQueryParamProperties;
}

export type BoundariesListParameters = BoundariesListQueryParam & RequestParameters;

export interface BoundariesSearchBodyParam {
  /** Query filters. */
  body: SearchBoundaryQuery;
}

export interface BoundariesSearchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BoundariesSearchParameters = BoundariesSearchMediaTypesParam &
  BoundariesSearchBodyParam &
  RequestParameters;

export interface BoundariesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the boundary to be deleted. */
  boundaryId: string;
}

export interface BoundariesCreateCascadeDeleteJobQueryParam {
  queryParameters: BoundariesCreateCascadeDeleteJobQueryParamProperties;
}

export type BoundariesCreateCascadeDeleteJobParameters =
  BoundariesCreateCascadeDeleteJobQueryParam & RequestParameters;
export type BoundariesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface BoundariesListByPartyIdQueryParamProperties {
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Type it belongs to. */
  type?: string;
  /** Parent Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  parentIds?: string;
  /** Minimum area of the boundary (inclusive). */
  minArea?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface BoundariesListByPartyIdQueryParam {
  queryParameters?: BoundariesListByPartyIdQueryParamProperties;
}

export type BoundariesListByPartyIdParameters = BoundariesListByPartyIdQueryParam &
  RequestParameters;

export interface BoundariesSearchByPartyIdBodyParam {
  /** Query filters. */
  body: SearchBoundaryQuery;
}

export interface BoundariesSearchByPartyIdMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BoundariesSearchByPartyIdParameters = BoundariesSearchByPartyIdMediaTypesParam &
  BoundariesSearchByPartyIdBodyParam &
  RequestParameters;
/** Boundary resource payload to create or update. */
export type BoundaryResourceMergeAndPatch = Partial<Boundary>;

export interface BoundariesCreateOrUpdateBodyParam {
  /** Boundary resource payload to create or update. */
  body: BoundaryResourceMergeAndPatch;
}

export interface BoundariesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type BoundariesCreateOrUpdateParameters = BoundariesCreateOrUpdateMediaTypesParam &
  BoundariesCreateOrUpdateBodyParam &
  RequestParameters;
export type BoundariesGetParameters = RequestParameters;
export type BoundariesDeleteParameters = RequestParameters;

export interface BoundariesGetOverlapQueryParamProperties {
  /** PartyId of the other field. */
  otherPartyId: string;
  /** Id of the other boundary. */
  otherBoundaryId: string;
}

export interface BoundariesGetOverlapQueryParam {
  queryParameters: BoundariesGetOverlapQueryParamProperties;
}

export type BoundariesGetOverlapParameters = BoundariesGetOverlapQueryParam & RequestParameters;

export interface CropProductsListQueryParamProperties {
  /** CropIds of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** Brands of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  brands?: string;
  /** Products of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  products?: string;
  /** Traits of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  traits?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface CropProductsListQueryParam {
  queryParameters?: CropProductsListQueryParamProperties;
}

export type CropProductsListParameters = CropProductsListQueryParam & RequestParameters;
export type CropProductsGetParameters = RequestParameters;
/** Crop Product resource payload to create or update. */
export type CropProductResourceMergeAndPatch = Partial<CropProduct>;

export interface CropProductsCreateOrUpdateBodyParam {
  /** Crop Product resource payload to create or update. */
  body: CropProductResourceMergeAndPatch;
}

export interface CropProductsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CropProductsCreateOrUpdateParameters = CropProductsCreateOrUpdateMediaTypesParam &
  CropProductsCreateOrUpdateBodyParam &
  RequestParameters;
export type CropProductsDeleteParameters = RequestParameters;

export interface CropsListQueryParamProperties {
  /** Crop phenotypes of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  phenotypes?: string;
  /** Breeding method of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  breedingMethods?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface CropsListQueryParam {
  queryParameters?: CropsListQueryParamProperties;
}

export type CropsListParameters = CropsListQueryParam & RequestParameters;
export type CropsGetParameters = RequestParameters;
/** Crop resource payload to create or update. */
export type CropResourceMergeAndPatch = Partial<Crop>;

export interface CropsCreateOrUpdateBodyParam {
  /** Crop resource payload to create or update. */
  body: CropResourceMergeAndPatch;
}

export interface CropsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CropsCreateOrUpdateParameters = CropsCreateOrUpdateMediaTypesParam &
  CropsCreateOrUpdateBodyParam &
  RequestParameters;
export type CropsDeleteParameters = RequestParameters;

export interface DeviceDataModelsListQueryParamProperties {
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface DeviceDataModelsListQueryParam {
  queryParameters?: DeviceDataModelsListQueryParamProperties;
}

export type DeviceDataModelsListParameters = DeviceDataModelsListQueryParam & RequestParameters;
/** Device data model object details. */
export type DeviceDataModelResourceMergeAndPatch = Partial<DeviceDataModel>;

export interface DeviceDataModelsCreateOrUpdateBodyParam {
  /** Device data model object details. */
  body: DeviceDataModelResourceMergeAndPatch;
}

export interface DeviceDataModelsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type DeviceDataModelsCreateOrUpdateParameters =
  DeviceDataModelsCreateOrUpdateMediaTypesParam &
    DeviceDataModelsCreateOrUpdateBodyParam &
    RequestParameters;
export type DeviceDataModelsGetParameters = RequestParameters;
export type DeviceDataModelsDeleteParameters = RequestParameters;

export interface DevicesListQueryParamProperties {
  /** Id's of the parent devices. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  parentDeviceIds?: string;
  /** Id's of the device data models. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  deviceDataModelIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface DevicesListQueryParam {
  queryParameters?: DevicesListQueryParamProperties;
}

export type DevicesListParameters = DevicesListQueryParam & RequestParameters;
/** Device object details. */
export type DeviceResourceMergeAndPatch = Partial<Device>;

export interface DevicesCreateOrUpdateBodyParam {
  /** Device object details. */
  body: DeviceResourceMergeAndPatch;
}

export interface DevicesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type DevicesCreateOrUpdateParameters = DevicesCreateOrUpdateMediaTypesParam &
  DevicesCreateOrUpdateBodyParam &
  RequestParameters;
export type DevicesGetParameters = RequestParameters;
export type DevicesDeleteParameters = RequestParameters;

export interface FarmOperationsCreateDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body: FarmOperationDataIngestionJob;
}

export interface FarmOperationsCreateDataIngestionJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FarmOperationsCreateDataIngestionJobParameters =
  FarmOperationsCreateDataIngestionJobMediaTypesParam &
    FarmOperationsCreateDataIngestionJobBodyParam &
    RequestParameters;
export type FarmOperationsGetDataIngestionJobDetailsParameters = RequestParameters;

export interface FarmsListQueryParamProperties {
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface FarmsListQueryParam {
  queryParameters?: FarmsListQueryParamProperties;
}

export type FarmsListParameters = FarmsListQueryParam & RequestParameters;

export interface FarmsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the farm to be deleted. */
  farmId: string;
}

export interface FarmsCreateCascadeDeleteJobQueryParam {
  queryParameters: FarmsCreateCascadeDeleteJobQueryParamProperties;
}

export type FarmsCreateCascadeDeleteJobParameters = FarmsCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type FarmsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FarmsListByPartyIdQueryParamProperties {
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface FarmsListByPartyIdQueryParam {
  queryParameters?: FarmsListByPartyIdQueryParamProperties;
}

export type FarmsListByPartyIdParameters = FarmsListByPartyIdQueryParam & RequestParameters;
export type FarmsGetParameters = RequestParameters;
/** Farm resource payload to create or update. */
export type FarmResourceMergeAndPatch = Partial<Farm>;

export interface FarmsCreateOrUpdateBodyParam {
  /** Farm resource payload to create or update. */
  body: FarmResourceMergeAndPatch;
}

export interface FarmsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FarmsCreateOrUpdateParameters = FarmsCreateOrUpdateMediaTypesParam &
  FarmsCreateOrUpdateBodyParam &
  RequestParameters;
export type FarmsDeleteParameters = RequestParameters;

export interface FieldsListQueryParamProperties {
  /** Farm Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  farmIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface FieldsListQueryParam {
  queryParameters?: FieldsListQueryParamProperties;
}

export type FieldsListParameters = FieldsListQueryParam & RequestParameters;
export type FieldsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FieldsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the field to be deleted. */
  fieldId: string;
}

export interface FieldsCreateCascadeDeleteJobQueryParam {
  queryParameters: FieldsCreateCascadeDeleteJobQueryParamProperties;
}

export type FieldsCreateCascadeDeleteJobParameters = FieldsCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface FieldsListByPartyIdQueryParamProperties {
  /** Farm Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  farmIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface FieldsListByPartyIdQueryParam {
  queryParameters?: FieldsListByPartyIdQueryParamProperties;
}

export type FieldsListByPartyIdParameters = FieldsListByPartyIdQueryParam & RequestParameters;
export type FieldsGetParameters = RequestParameters;
/** Field resource payload to create or update. */
export type FieldResourceMergeAndPatch = Partial<Field>;

export interface FieldsCreateOrUpdateBodyParam {
  /** Field resource payload to create or update. */
  body: FieldResourceMergeAndPatch;
}

export interface FieldsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FieldsCreateOrUpdateParameters = FieldsCreateOrUpdateMediaTypesParam &
  FieldsCreateOrUpdateBodyParam &
  RequestParameters;
export type FieldsDeleteParameters = RequestParameters;

export interface HarvestDataListQueryParamProperties {
  /** Minimum Yield value(inclusive). */
  minTotalYield?: number;
  /** Maximum Yield value (inclusive). */
  maxTotalYield?: number;
  /** Minimum AvgYield value(inclusive). */
  minAvgYield?: number;
  /** Maximum AvgYield value (inclusive). */
  maxAvgYield?: number;
  /** Minimum Total WetMass value(inclusive). */
  minTotalWetMass?: number;
  /** Maximum Total WetMass value (inclusive). */
  maxTotalWetMass?: number;
  /** Minimum AvgWetMass value(inclusive). */
  minAvgWetMass?: number;
  /** Maximum AvgWetMass value (inclusive). */
  maxAvgWetMass?: number;
  /** Minimum AvgMoisture value(inclusive). */
  minAvgMoisture?: number;
  /** Maximum AvgMoisture value (inclusive). */
  maxAvgMoisture?: number;
  /** Minimum AvgSpeed value(inclusive). */
  minAvgSpeed?: number;
  /** Maximum AvgSpeed value (inclusive). */
  maxAvgSpeed?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface HarvestDataListQueryParam {
  queryParameters?: HarvestDataListQueryParamProperties;
}

export type HarvestDataListParameters = HarvestDataListQueryParam & RequestParameters;

export interface HarvestDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the party. */
  partyId: string;
  /** Id of the harvest data. */
  harvestDataId: string;
}

export interface HarvestDataCreateCascadeDeleteJobQueryParam {
  queryParameters: HarvestDataCreateCascadeDeleteJobQueryParamProperties;
}

export type HarvestDataCreateCascadeDeleteJobParameters =
  HarvestDataCreateCascadeDeleteJobQueryParam & RequestParameters;
export type HarvestDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface HarvestDataListByPartyIdQueryParamProperties {
  /** Minimum Yield value(inclusive). */
  minTotalYield?: number;
  /** Maximum Yield value (inclusive). */
  maxTotalYield?: number;
  /** Minimum AvgYield value(inclusive). */
  minAvgYield?: number;
  /** Maximum AvgYield value (inclusive). */
  maxAvgYield?: number;
  /** Minimum Total WetMass value(inclusive). */
  minTotalWetMass?: number;
  /** Maximum Total WetMass value (inclusive). */
  maxTotalWetMass?: number;
  /** Minimum AvgWetMass value(inclusive). */
  minAvgWetMass?: number;
  /** Maximum AvgWetMass value (inclusive). */
  maxAvgWetMass?: number;
  /** Minimum AvgMoisture value(inclusive). */
  minAvgMoisture?: number;
  /** Maximum AvgMoisture value (inclusive). */
  maxAvgMoisture?: number;
  /** Minimum AvgSpeed value(inclusive). */
  minAvgSpeed?: number;
  /** Maximum AvgSpeed value (inclusive). */
  maxAvgSpeed?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface HarvestDataListByPartyIdQueryParam {
  queryParameters?: HarvestDataListByPartyIdQueryParamProperties;
}

export type HarvestDataListByPartyIdParameters = HarvestDataListByPartyIdQueryParam &
  RequestParameters;
export type HarvestDataGetParameters = RequestParameters;
/** Harvest data resource payload to create or update. */
export type HarvestDataResourceMergeAndPatch = Partial<HarvestData>;

export interface HarvestDataCreateOrUpdateBodyParam {
  /** Harvest data resource payload to create or update. */
  body: HarvestDataResourceMergeAndPatch;
}

export interface HarvestDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type HarvestDataCreateOrUpdateParameters = HarvestDataCreateOrUpdateMediaTypesParam &
  HarvestDataCreateOrUpdateBodyParam &
  RequestParameters;
export type HarvestDataDeleteParameters = RequestParameters;

export interface ImageProcessingCreateRasterizeJobBodyParam {
  /** Job parameters supplied by user. */
  body: ImageProcessingRasterizeJob;
}

export interface ImageProcessingCreateRasterizeJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ImageProcessingCreateRasterizeJobParameters =
  ImageProcessingCreateRasterizeJobMediaTypesParam &
    ImageProcessingCreateRasterizeJobBodyParam &
    RequestParameters;
export type ImageProcessingGetRasterizeJobParameters = RequestParameters;

export interface InsightAttachmentsListByPartyIdModelIdAndResourceQueryParamProperties {
  /** List of insight IDs. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  insightIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface InsightAttachmentsListByPartyIdModelIdAndResourceQueryParam {
  queryParameters?: InsightAttachmentsListByPartyIdModelIdAndResourceQueryParamProperties;
}

export type InsightAttachmentsListByPartyIdModelIdAndResourceParameters =
  InsightAttachmentsListByPartyIdModelIdAndResourceQueryParam & RequestParameters;

export interface InsightAttachmentsCreateOrUpdateBodyParam {
  body: InsightAttachmentsCreateOrUpdateFormBody;
}

export interface InsightAttachmentsCreateOrUpdateFormBody {
  /**
   * File to be uploaded.
   *
   * Value may contain any sequence of octets
   */
  file?: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
  /** InsightID for this InsightAttachment. */
  insightId: string;
  /** Original File Name for this attachment. */
  originalFileName?: string;
  /** Unique id. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  createdDateTime?: string;
  /** Date when resource was last modified. */
  modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** Created by user/tenant id. */
  createdBy?: string;
  /** Modified by user/tenant id. */
  modifiedBy?: string;
}

export interface InsightAttachmentsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type InsightAttachmentsCreateOrUpdateParameters =
  InsightAttachmentsCreateOrUpdateMediaTypesParam &
    InsightAttachmentsCreateOrUpdateBodyParam &
    RequestParameters;
export type InsightAttachmentsGetParameters = RequestParameters;
export type InsightAttachmentsDeleteParameters = RequestParameters;
export type InsightAttachmentsDownloadParameters = RequestParameters;

export interface InsightsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** Id of the associated model. */
  modelId: string;
  /** Resource Type. */
  resourceType: string;
  /** Id of the associated resource. */
  resourceId: string;
  /** Insight id. */
  insightId: string;
}

export interface InsightsCreateCascadeDeleteJobQueryParam {
  queryParameters: InsightsCreateCascadeDeleteJobQueryParamProperties;
}

export type InsightsCreateCascadeDeleteJobParameters = InsightsCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type InsightsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface InsightsListByPartyIdModelIdAndResourceQueryParamProperties {
  /** Minimum insightStartDateTime time of insight resources (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minInsightStartDateTime?: Date | string;
  /** Maximum insightStartDateTime time of insight resources (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxInsightStartDateTime?: Date | string;
  /** Minimum insightEndDateTime time of insight resources (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minInsightEndDateTime?: Date | string;
  /** Maximum insightEndDateTime time of insight resources (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxInsightEndDateTime?: Date | string;
  /**
   * Filters on measureKey.unit/unitValue or measureKey.value/value pairs within the Measures object.
   * eg. "measureKey.unit eq {testValue}" where testValue is string.
   * eg. "measureKey.value eq {testValue}" where testValue = double. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  measurementFilters?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface InsightsListByPartyIdModelIdAndResourceQueryParam {
  queryParameters?: InsightsListByPartyIdModelIdAndResourceQueryParamProperties;
}

export type InsightsListByPartyIdModelIdAndResourceParameters =
  InsightsListByPartyIdModelIdAndResourceQueryParam & RequestParameters;
/** Insight data. */
export type InsightResourceMergeAndPatch = Partial<Insight>;

export interface InsightsCreateOrUpdateBodyParam {
  /** Insight data. */
  body: InsightResourceMergeAndPatch;
}

export interface InsightsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type InsightsCreateOrUpdateParameters = InsightsCreateOrUpdateMediaTypesParam &
  InsightsCreateOrUpdateBodyParam &
  RequestParameters;
export type InsightsGetParameters = RequestParameters;
export type InsightsDeleteParameters = RequestParameters;

export interface ManagementZonesListQueryParamProperties {
  /** Types of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** CropIds of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** SeasonIds of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** FieldIds of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Sources of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface ManagementZonesListQueryParam {
  queryParameters?: ManagementZonesListQueryParamProperties;
}

export type ManagementZonesListParameters = ManagementZonesListQueryParam & RequestParameters;
export type ManagementZonesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ManagementZonesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the management zone to be deleted. */
  managementZoneId: string;
}

export interface ManagementZonesCreateCascadeDeleteJobQueryParam {
  queryParameters: ManagementZonesCreateCascadeDeleteJobQueryParamProperties;
}

export type ManagementZonesCreateCascadeDeleteJobParameters =
  ManagementZonesCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface ManagementZonesListByPartyIdQueryParamProperties {
  /** Types of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** CropIds of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** SeasonIds of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** FieldIds of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Sources of the ManagementZone. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface ManagementZonesListByPartyIdQueryParam {
  queryParameters?: ManagementZonesListByPartyIdQueryParamProperties;
}

export type ManagementZonesListByPartyIdParameters = ManagementZonesListByPartyIdQueryParam &
  RequestParameters;
export type ManagementZonesGetParameters = RequestParameters;
/** ManagementZone resource payload to create or update. */
export type ManagementZoneResourceMergeAndPatch = Partial<ManagementZone>;

export interface ManagementZonesCreateOrUpdateBodyParam {
  /** ManagementZone resource payload to create or update. */
  body: ManagementZoneResourceMergeAndPatch;
}

export interface ManagementZonesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type ManagementZonesCreateOrUpdateParameters = ManagementZonesCreateOrUpdateMediaTypesParam &
  ManagementZonesCreateOrUpdateBodyParam &
  RequestParameters;
export type ManagementZonesDeleteParameters = RequestParameters;

export interface ModelInferenceCreateBiomassModelJobBodyParam {
  /** Job parameters supplied by user. */
  body: BiomassModelJob;
}

export interface ModelInferenceCreateBiomassModelJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ModelInferenceCreateBiomassModelJobParameters =
  ModelInferenceCreateBiomassModelJobMediaTypesParam &
    ModelInferenceCreateBiomassModelJobBodyParam &
    RequestParameters;
export type ModelInferenceGetBiomassModelJobParameters = RequestParameters;

export interface ModelInferenceCreateSensorPlacementModelJobBodyParam {
  /** Job parameters supplied by user. */
  body: SensorPlacementModelJob;
}

export interface ModelInferenceCreateSensorPlacementModelJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ModelInferenceCreateSensorPlacementModelJobParameters =
  ModelInferenceCreateSensorPlacementModelJobMediaTypesParam &
    ModelInferenceCreateSensorPlacementModelJobBodyParam &
    RequestParameters;
export type ModelInferenceGetSensorPlacementModelJobParameters = RequestParameters;

export interface ModelInferenceCreateSoilMoistureModelJobBodyParam {
  /** Job parameters supplied by user. */
  body: SoilMoistureModelJob;
}

export interface ModelInferenceCreateSoilMoistureModelJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ModelInferenceCreateSoilMoistureModelJobParameters =
  ModelInferenceCreateSoilMoistureModelJobMediaTypesParam &
    ModelInferenceCreateSoilMoistureModelJobBodyParam &
    RequestParameters;
export type ModelInferenceGetSoilMoistureModelJobParameters = RequestParameters;

export interface NutrientAnalysesListQueryParamProperties {
  /**
   * Type of the parent it belongs to.
   * i.e. PlantTissueAnalysis.
   */
  parentType?: string;
  /** Parent ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  parentIds?: string;
  /** Classifications for nutrient analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  classifications?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface NutrientAnalysesListQueryParam {
  queryParameters?: NutrientAnalysesListQueryParamProperties;
}

export type NutrientAnalysesListParameters = NutrientAnalysesListQueryParam & RequestParameters;

export interface NutrientAnalysesListByPartyIdQueryParamProperties {
  /**
   * Type of the parent it belongs to.
   * i.e. PlantTissueAnalysis.
   */
  parentType?: string;
  /** Parent ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  parentIds?: string;
  /** Classifications for nutrient analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  classifications?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface NutrientAnalysesListByPartyIdQueryParam {
  queryParameters?: NutrientAnalysesListByPartyIdQueryParamProperties;
}

export type NutrientAnalysesListByPartyIdParameters = NutrientAnalysesListByPartyIdQueryParam &
  RequestParameters;
export type NutrientAnalysesGetParameters = RequestParameters;
/** NutrientAnalysis resource payload to create or update. */
export type NutrientAnalysisResourceMergeAndPatch = Partial<NutrientAnalysis>;

export interface NutrientAnalysesCreateOrUpdateBodyParam {
  /** NutrientAnalysis resource payload to create or update. */
  body: NutrientAnalysisResourceMergeAndPatch;
}

export interface NutrientAnalysesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type NutrientAnalysesCreateOrUpdateParameters =
  NutrientAnalysesCreateOrUpdateMediaTypesParam &
    NutrientAnalysesCreateOrUpdateBodyParam &
    RequestParameters;
export type NutrientAnalysesDeleteParameters = RequestParameters;

export interface OAuthProvidersListQueryParamProperties {
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface OAuthProvidersListQueryParam {
  queryParameters?: OAuthProvidersListQueryParamProperties;
}

export type OAuthProvidersListParameters = OAuthProvidersListQueryParam & RequestParameters;
export type OAuthProvidersGetParameters = RequestParameters;
/** OauthProvider resource payload to create or update. */
export type OAuthProviderResourceMergeAndPatch = Partial<OAuthProvider>;

export interface OAuthProvidersCreateOrUpdateBodyParam {
  /** OauthProvider resource payload to create or update. */
  body: OAuthProviderResourceMergeAndPatch;
}

export interface OAuthProvidersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type OAuthProvidersCreateOrUpdateParameters = OAuthProvidersCreateOrUpdateMediaTypesParam &
  OAuthProvidersCreateOrUpdateBodyParam &
  RequestParameters;
export type OAuthProvidersDeleteParameters = RequestParameters;
export type OAuthProvidersGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface OAuthProvidersCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the application data. */
  oauthProviderId: string;
}

export interface OAuthProvidersCreateCascadeDeleteJobQueryParam {
  queryParameters: OAuthProvidersCreateCascadeDeleteJobQueryParamProperties;
}

export type OAuthProvidersCreateCascadeDeleteJobParameters =
  OAuthProvidersCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface OAuthTokensListQueryParamProperties {
  /** Name of AuthProvider. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  authProviderIds?: string;
  /** List of parties. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  partyIds?: string;
  /** If the token object is valid. */
  isValid?: boolean;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface OAuthTokensListQueryParam {
  queryParameters?: OAuthTokensListQueryParamProperties;
}

export type OAuthTokensListParameters = OAuthTokensListQueryParam & RequestParameters;

export interface OAuthTokensGetOAuthConnectionLinkBodyParam {
  /** OAuth Connect Request. */
  body: OAuthConnectRequest;
}

export interface OAuthTokensGetOAuthConnectionLinkMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type OAuthTokensGetOAuthConnectionLinkParameters =
  OAuthTokensGetOAuthConnectionLinkMediaTypesParam &
    OAuthTokensGetOAuthConnectionLinkBodyParam &
    RequestParameters;
export type OAuthTokensGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface OAuthTokensCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the party. */
  partyId: string;
  /** Id of the OAuthProvider. */
  oauthProviderId: string;
}

export interface OAuthTokensCreateCascadeDeleteJobQueryParam {
  queryParameters: OAuthTokensCreateCascadeDeleteJobQueryParamProperties;
}

export type OAuthTokensCreateCascadeDeleteJobParameters =
  OAuthTokensCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface PartiesListQueryParamProperties {
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PartiesListQueryParam {
  queryParameters?: PartiesListQueryParamProperties;
}

export type PartiesListParameters = PartiesListQueryParam & RequestParameters;
export type PartiesGetParameters = RequestParameters;
/** Party resource payload to create or update. */
export type PartyResourceMergeAndPatch = Partial<Party>;

export interface PartiesCreateOrUpdateBodyParam {
  /** Party resource payload to create or update. */
  body: PartyResourceMergeAndPatch;
}

export interface PartiesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PartiesCreateOrUpdateParameters = PartiesCreateOrUpdateMediaTypesParam &
  PartiesCreateOrUpdateBodyParam &
  RequestParameters;
export type PartiesDeleteParameters = RequestParameters;
export type PartiesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PartiesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the party to be deleted. */
  partyId: string;
}

export interface PartiesCreateCascadeDeleteJobQueryParam {
  queryParameters: PartiesCreateCascadeDeleteJobQueryParamProperties;
}

export type PartiesCreateCascadeDeleteJobParameters = PartiesCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface PlantingDataListByPartyIdQueryParamProperties {
  /** Minimum AvgPlantingRate value(inclusive). */
  minAvgPlantingRate?: number;
  /** Maximum AvgPlantingRate value (inclusive). */
  maxAvgPlantingRate?: number;
  /** Minimum TotalMaterial value(inclusive). */
  minTotalMaterial?: number;
  /** Maximum TotalMaterial value (inclusive). */
  maxTotalMaterial?: number;
  /** Minimum AvgMaterial value(inclusive). */
  minAvgMaterial?: number;
  /** Maximum AvgMaterial value (inclusive). */
  maxAvgMaterial?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PlantingDataListByPartyIdQueryParam {
  queryParameters?: PlantingDataListByPartyIdQueryParamProperties;
}

export type PlantingDataListByPartyIdParameters = PlantingDataListByPartyIdQueryParam &
  RequestParameters;
export type PlantingDataGetParameters = RequestParameters;
/** Planting data resource payload to create or update. */
export type PlantingDataResourceMergeAndPatch = Partial<PlantingData>;

export interface PlantingDataCreateOrUpdateBodyParam {
  /** Planting data resource payload to create or update. */
  body: PlantingDataResourceMergeAndPatch;
}

export interface PlantingDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PlantingDataCreateOrUpdateParameters = PlantingDataCreateOrUpdateMediaTypesParam &
  PlantingDataCreateOrUpdateBodyParam &
  RequestParameters;
export type PlantingDataDeleteParameters = RequestParameters;

export interface PlantingDataListQueryParamProperties {
  /** Minimum AvgPlantingRate value(inclusive). */
  minAvgPlantingRate?: number;
  /** Maximum AvgPlantingRate value (inclusive). */
  maxAvgPlantingRate?: number;
  /** Minimum TotalMaterial value(inclusive). */
  minTotalMaterial?: number;
  /** Maximum TotalMaterial value (inclusive). */
  maxTotalMaterial?: number;
  /** Minimum AvgMaterial value(inclusive). */
  minAvgMaterial?: number;
  /** Maximum AvgMaterial value (inclusive). */
  maxAvgMaterial?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PlantingDataListQueryParam {
  queryParameters?: PlantingDataListQueryParamProperties;
}

export type PlantingDataListParameters = PlantingDataListQueryParam & RequestParameters;

export interface PlantingDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the party. */
  partyId: string;
  /** Id of the planting data. */
  plantingDataId: string;
}

export interface PlantingDataCreateCascadeDeleteJobQueryParam {
  queryParameters: PlantingDataCreateCascadeDeleteJobQueryParamProperties;
}

export type PlantingDataCreateCascadeDeleteJobParameters =
  PlantingDataCreateCascadeDeleteJobQueryParam & RequestParameters;
export type PlantingDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PlantTissueAnalysesListByPartyIdQueryParamProperties {
  /** Season ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** Crop ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** Crop products ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropProductsIds?: string;
  /** Field ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PlantTissueAnalysesListByPartyIdQueryParam {
  queryParameters?: PlantTissueAnalysesListByPartyIdQueryParamProperties;
}

export type PlantTissueAnalysesListByPartyIdParameters =
  PlantTissueAnalysesListByPartyIdQueryParam & RequestParameters;
export type PlantTissueAnalysesGetParameters = RequestParameters;
/** PlantTissueAnalysis resource payload to create or update. */
export type PlantTissueAnalysisResourceMergeAndPatch = Partial<PlantTissueAnalysis>;

export interface PlantTissueAnalysesCreateOrUpdateBodyParam {
  /** PlantTissueAnalysis resource payload to create or update. */
  body: PlantTissueAnalysisResourceMergeAndPatch;
}

export interface PlantTissueAnalysesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PlantTissueAnalysesCreateOrUpdateParameters =
  PlantTissueAnalysesCreateOrUpdateMediaTypesParam &
    PlantTissueAnalysesCreateOrUpdateBodyParam &
    RequestParameters;
export type PlantTissueAnalysesDeleteParameters = RequestParameters;

export interface PlantTissueAnalysesListQueryParamProperties {
  /** Season ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** Crop ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** Crop products ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropProductsIds?: string;
  /** Field ids of the plant tissue analyses. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PlantTissueAnalysesListQueryParam {
  queryParameters?: PlantTissueAnalysesListQueryParamProperties;
}

export type PlantTissueAnalysesListParameters = PlantTissueAnalysesListQueryParam &
  RequestParameters;

export interface PlantTissueAnalysesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the plant tissue analysis to be deleted. */
  plantTissueAnalysisId: string;
}

export interface PlantTissueAnalysesCreateCascadeDeleteJobQueryParam {
  queryParameters: PlantTissueAnalysesCreateCascadeDeleteJobQueryParamProperties;
}

export type PlantTissueAnalysesCreateCascadeDeleteJobParameters =
  PlantTissueAnalysesCreateCascadeDeleteJobQueryParam & RequestParameters;
export type PlantTissueAnalysesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PrescriptionMapsListByPartyIdQueryParamProperties {
  /** Types of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** Crop Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** Season Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** Field Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Sources for the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PrescriptionMapsListByPartyIdQueryParam {
  queryParameters?: PrescriptionMapsListByPartyIdQueryParamProperties;
}

export type PrescriptionMapsListByPartyIdParameters = PrescriptionMapsListByPartyIdQueryParam &
  RequestParameters;
export type PrescriptionMapsGetParameters = RequestParameters;
/** PrescriptionMap resource payload to create or update. */
export type PrescriptionMapResourceMergeAndPatch = Partial<PrescriptionMap>;

export interface PrescriptionMapsCreateOrUpdateBodyParam {
  /** PrescriptionMap resource payload to create or update. */
  body: PrescriptionMapResourceMergeAndPatch;
}

export interface PrescriptionMapsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PrescriptionMapsCreateOrUpdateParameters =
  PrescriptionMapsCreateOrUpdateMediaTypesParam &
    PrescriptionMapsCreateOrUpdateBodyParam &
    RequestParameters;
export type PrescriptionMapsDeleteParameters = RequestParameters;

export interface PrescriptionMapsListQueryParamProperties {
  /** Types of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** Crop Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** Season Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** Field Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Sources for the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PrescriptionMapsListQueryParam {
  queryParameters?: PrescriptionMapsListQueryParamProperties;
}

export type PrescriptionMapsListParameters = PrescriptionMapsListQueryParam & RequestParameters;
export type PrescriptionMapsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PrescriptionMapsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the prescription map to be deleted. */
  prescriptionMapId: string;
}

export interface PrescriptionMapsCreateCascadeDeleteJobQueryParam {
  queryParameters: PrescriptionMapsCreateCascadeDeleteJobQueryParamProperties;
}

export type PrescriptionMapsCreateCascadeDeleteJobParameters =
  PrescriptionMapsCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface PrescriptionsListByPartyIdQueryParamProperties {
  /** Prescription Map Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  prescriptionMapIds?: string;
  /** Types of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** Product Codes of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  productCodes?: string;
  /** Product Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  productNames?: string;
  /** Sources for the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PrescriptionsListByPartyIdQueryParam {
  queryParameters?: PrescriptionsListByPartyIdQueryParamProperties;
}

export type PrescriptionsListByPartyIdParameters = PrescriptionsListByPartyIdQueryParam &
  RequestParameters;
export type PrescriptionsGetParameters = RequestParameters;
/** Prescription resource payload to create or update. */
export type PrescriptionResourceMergeAndPatch = Partial<Prescription>;

export interface PrescriptionsCreateOrUpdateBodyParam {
  /** Prescription resource payload to create or update. */
  body: PrescriptionResourceMergeAndPatch;
}

export interface PrescriptionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PrescriptionsCreateOrUpdateParameters = PrescriptionsCreateOrUpdateMediaTypesParam &
  PrescriptionsCreateOrUpdateBodyParam &
  RequestParameters;
export type PrescriptionsDeleteParameters = RequestParameters;

export interface PrescriptionsListQueryParamProperties {
  /** Prescription Map Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  prescriptionMapIds?: string;
  /** Types of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** Product Codes of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  productCodes?: string;
  /** Product Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  productNames?: string;
  /** Sources for the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface PrescriptionsListQueryParam {
  queryParameters?: PrescriptionsListQueryParamProperties;
}

export type PrescriptionsListParameters = PrescriptionsListQueryParam & RequestParameters;
export type PrescriptionsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PrescriptionsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the prescription to be deleted. */
  prescriptionId: string;
}

export interface PrescriptionsCreateCascadeDeleteJobQueryParam {
  queryParameters: PrescriptionsCreateCascadeDeleteJobQueryParamProperties;
}

export type PrescriptionsCreateCascadeDeleteJobParameters =
  PrescriptionsCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface ScenesListQueryParamProperties {
  /** Provider name of scene data. */
  provider: string;
  /** PartyId. */
  partyId: string;
  /** BoundaryId. */
  boundaryId: string;
  /** Source name of scene data, Available Values: Sentinel_2_L2A, Sentinel_2_L1C. */
  source: string;
  /** Scene start UTC datetime (inclusive), sample format: yyyy-MM-ddThh:mm:ssZ. */
  startDateTime?: Date | string;
  /** Scene end UTC datetime (inclusive), sample format: yyyy-MM-dThh:mm:ssZ. */
  endDateTime?: Date | string;
  /** Filter scenes with cloud coverage percentage less than max value. Range [0 to 100.0]. */
  maxCloudCoveragePercentage?: number;
  /** Filter scenes with dark pixel coverage percentage less than max value. Range [0 to 100.0]. */
  maxDarkPixelCoveragePercentage?: number;
  /** List of image names to be filtered. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  imageNames?: string;
  /** List of image resolutions in meters to be filtered. */
  imageResolutions?: Array<number>;
  /** List of image formats to be filtered. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  imageFormats?: string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface ScenesListQueryParam {
  queryParameters: ScenesListQueryParamProperties;
}

export type ScenesListParameters = ScenesListQueryParam & RequestParameters;

export interface ScenesDownloadQueryParamProperties {
  /** cloud storage path of scene file. */
  filePath: string;
}

export interface ScenesDownloadQueryParam {
  queryParameters: ScenesDownloadQueryParamProperties;
}

export type ScenesDownloadParameters = ScenesDownloadQueryParam & RequestParameters;

export interface ScenesCreateSatelliteDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body: SatelliteDataIngestionJob;
}

export interface ScenesCreateSatelliteDataIngestionJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ScenesCreateSatelliteDataIngestionJobParameters =
  ScenesCreateSatelliteDataIngestionJobMediaTypesParam &
    ScenesCreateSatelliteDataIngestionJobBodyParam &
    RequestParameters;
export type ScenesGetSatelliteDataIngestionJobDetailsParameters = RequestParameters;

export interface ScenesSearchFeaturesBodyParam {
  /** Query filters. */
  body: SearchFeaturesQuery;
}

export interface ScenesSearchFeaturesQueryParamProperties {
  /** Maximum number of features needed (inclusive). Minimum = 1, Maximum = 100, Default value = 10. */
  maxpagesize?: number;
  /** Skip token for getting next set of results. */
  skip?: number;
}

export interface ScenesSearchFeaturesQueryParam {
  queryParameters?: ScenesSearchFeaturesQueryParamProperties;
}

export interface ScenesSearchFeaturesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ScenesSearchFeaturesParameters = ScenesSearchFeaturesQueryParam &
  ScenesSearchFeaturesMediaTypesParam &
  ScenesSearchFeaturesBodyParam &
  RequestParameters;
export type ScenesGetStacFeatureParameters = RequestParameters;

export interface SeasonalFieldsListByPartyIdQueryParamProperties {
  /** Farm Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  farmIds?: string;
  /** Field Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Season Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** CropProductIds of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropProductIds?: string;
  /** Ids of the crop it belongs to. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface SeasonalFieldsListByPartyIdQueryParam {
  queryParameters?: SeasonalFieldsListByPartyIdQueryParamProperties;
}

export type SeasonalFieldsListByPartyIdParameters = SeasonalFieldsListByPartyIdQueryParam &
  RequestParameters;
export type SeasonalFieldsGetParameters = RequestParameters;
/** Seasonal field resource payload to create or update. */
export type SeasonalFieldResourceMergeAndPatch = Partial<SeasonalField>;

export interface SeasonalFieldsCreateOrUpdateBodyParam {
  /** Seasonal field resource payload to create or update. */
  body: SeasonalFieldResourceMergeAndPatch;
}

export interface SeasonalFieldsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SeasonalFieldsCreateOrUpdateParameters = SeasonalFieldsCreateOrUpdateMediaTypesParam &
  SeasonalFieldsCreateOrUpdateBodyParam &
  RequestParameters;
export type SeasonalFieldsDeleteParameters = RequestParameters;

export interface SeasonalFieldsListQueryParamProperties {
  /** Farm Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  farmIds?: string;
  /** Field Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  fieldIds?: string;
  /** Season Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  seasonIds?: string;
  /** CropProductIds of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropProductIds?: string;
  /** Ids of the crop it belongs to. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  cropIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface SeasonalFieldsListQueryParam {
  queryParameters?: SeasonalFieldsListQueryParamProperties;
}

export type SeasonalFieldsListParameters = SeasonalFieldsListQueryParam & RequestParameters;
export type SeasonalFieldsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface SeasonalFieldsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the seasonalField to be deleted. */
  seasonalFieldId: string;
}

export interface SeasonalFieldsCreateCascadeDeleteJobQueryParam {
  queryParameters: SeasonalFieldsCreateCascadeDeleteJobQueryParamProperties;
}

export type SeasonalFieldsCreateCascadeDeleteJobParameters =
  SeasonalFieldsCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface SeasonsListQueryParamProperties {
  /** Minimum season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minStartDateTime?: Date | string;
  /** Maximum season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxStartDateTime?: Date | string;
  /** Minimum season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minEndDateTime?: Date | string;
  /** Maximum season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxEndDateTime?: Date | string;
  /** Years of the resource. */
  years?: Array<number>;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface SeasonsListQueryParam {
  queryParameters?: SeasonsListQueryParamProperties;
}

export type SeasonsListParameters = SeasonsListQueryParam & RequestParameters;
export type SeasonsGetParameters = RequestParameters;
/** Season resource payload to create or update. */
export type SeasonResourceMergeAndPatch = Partial<Season>;

export interface SeasonsCreateOrUpdateBodyParam {
  /** Season resource payload to create or update. */
  body: SeasonResourceMergeAndPatch;
}

export interface SeasonsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SeasonsCreateOrUpdateParameters = SeasonsCreateOrUpdateMediaTypesParam &
  SeasonsCreateOrUpdateBodyParam &
  RequestParameters;
export type SeasonsDeleteParameters = RequestParameters;

export interface SensorDataModelsListQueryParamProperties {
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface SensorDataModelsListQueryParam {
  queryParameters?: SensorDataModelsListQueryParamProperties;
}

export type SensorDataModelsListParameters = SensorDataModelsListQueryParam & RequestParameters;
/** Sensor data model object details. */
export type SensorDataModelResourceMergeAndPatch = Partial<SensorDataModel>;

export interface SensorDataModelsCreateOrUpdateBodyParam {
  /** Sensor data model object details. */
  body: SensorDataModelResourceMergeAndPatch;
}

export interface SensorDataModelsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SensorDataModelsCreateOrUpdateParameters =
  SensorDataModelsCreateOrUpdateMediaTypesParam &
    SensorDataModelsCreateOrUpdateBodyParam &
    RequestParameters;
export type SensorDataModelsGetParameters = RequestParameters;
export type SensorDataModelsDeleteParameters = RequestParameters;

export interface SensorEventsListQueryParamProperties {
  /** Id of the associated sensor. */
  sensorId: string;
  /** Id of the associated sensor partner. */
  sensorPartnerId: string;
  /**
   * Search span start time of sensor events (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ.
   * It is truncated upto seconds if fraction is provided.
   */
  startDateTime?: Date | string;
  /**
   * Search span end time of sensor events (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ.
   * It is truncated upto seconds if fraction is provided.
   */
  endDateTime?: Date | string;
  /** Flag to exclude duplicate events and take the latest ones only (Default: true). */
  excludeDuplicateEvents?: boolean;
}

export interface SensorEventsListQueryParam {
  queryParameters: SensorEventsListQueryParamProperties;
}

export type SensorEventsListParameters = SensorEventsListQueryParam & RequestParameters;

export interface SensorMappingsListQueryParamProperties {
  /** Id of the sensors. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sensorIds?: string;
  /** Id of the sensor partners. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sensorPartnerIds?: string;
  /** Id of the parties. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  partyIds?: string;
  /** Id of the boundaries. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  boundaryIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface SensorMappingsListQueryParam {
  queryParameters?: SensorMappingsListQueryParamProperties;
}

export type SensorMappingsListParameters = SensorMappingsListQueryParam & RequestParameters;
/** Sensor mapping object details. */
export type SensorMappingResourceMergeAndPatch = Partial<SensorMapping>;

export interface SensorMappingsCreateOrUpdateBodyParam {
  /** Sensor mapping object details. */
  body: SensorMappingResourceMergeAndPatch;
}

export interface SensorMappingsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SensorMappingsCreateOrUpdateParameters = SensorMappingsCreateOrUpdateMediaTypesParam &
  SensorMappingsCreateOrUpdateBodyParam &
  RequestParameters;
export type SensorMappingsGetParameters = RequestParameters;
export type SensorMappingsDeleteParameters = RequestParameters;

export interface SensorPartnerIntegrationsListQueryParamProperties {
  /** Ids of the partner integration models. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  integrationIds?: string;
  /** Ids of the parties. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  partyIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface SensorPartnerIntegrationsListQueryParam {
  queryParameters?: SensorPartnerIntegrationsListQueryParamProperties;
}

export type SensorPartnerIntegrationsListParameters = SensorPartnerIntegrationsListQueryParam &
  RequestParameters;
/** Partner integration model. */
export type SensorPartnerIntegrationModelResourceMergeAndPatch =
  Partial<SensorPartnerIntegrationModel>;

export interface SensorPartnerIntegrationsCreateOrUpdateBodyParam {
  /** Partner integration model. */
  body: SensorPartnerIntegrationModelResourceMergeAndPatch;
}

export interface SensorPartnerIntegrationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SensorPartnerIntegrationsCreateOrUpdateParameters =
  SensorPartnerIntegrationsCreateOrUpdateMediaTypesParam &
    SensorPartnerIntegrationsCreateOrUpdateBodyParam &
    RequestParameters;
export type SensorPartnerIntegrationsGetParameters = RequestParameters;
export type SensorPartnerIntegrationsDeleteParameters = RequestParameters;

export interface SensorPartnerIntegrationsCheckConsentQueryParamProperties {
  /** Partner integration key. */
  key: string;
}

export interface SensorPartnerIntegrationsCheckConsentQueryParam {
  queryParameters: SensorPartnerIntegrationsCheckConsentQueryParamProperties;
}

export type SensorPartnerIntegrationsCheckConsentParameters =
  SensorPartnerIntegrationsCheckConsentQueryParam & RequestParameters;
export type SensorPartnerIntegrationsGenerateConsentLinkParameters = RequestParameters;

export interface SensorsListQueryParamProperties {
  /** Id's of the sensor data models. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sensorDataModelIds?: string;
  /** Ids of the sensor mappings. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sensorMappingIds?: string;
  /** Id's of the devices. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  deviceIds?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface SensorsListQueryParam {
  queryParameters?: SensorsListQueryParamProperties;
}

export type SensorsListParameters = SensorsListQueryParam & RequestParameters;
/** Sensor object details. */
export type SensorResourceMergeAndPatch = Partial<Sensor>;

export interface SensorsCreateOrUpdateBodyParam {
  /** Sensor object details. */
  body: SensorResourceMergeAndPatch;
}

export interface SensorsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SensorsCreateOrUpdateParameters = SensorsCreateOrUpdateMediaTypesParam &
  SensorsCreateOrUpdateBodyParam &
  RequestParameters;
export type SensorsGetParameters = RequestParameters;
export type SensorsDeleteParameters = RequestParameters;
export type SensorsGetConnectionStringParameters = RequestParameters;

export interface SensorsRenewConnectionStringBodyParam {
  /** Sensor's connection string model. */
  body: SensorRenewConnectionStringModel;
}

export interface SensorsRenewConnectionStringMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SensorsRenewConnectionStringParameters = SensorsRenewConnectionStringMediaTypesParam &
  SensorsRenewConnectionStringBodyParam &
  RequestParameters;

export interface SolutionInferenceCancelBodyParam {
  /** solutionInferenceRequest containing input needed for job request processing. */
  body: SolutionInference;
}

export interface SolutionInferenceCancelMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SolutionInferenceCancelParameters = SolutionInferenceCancelMediaTypesParam &
  SolutionInferenceCancelBodyParam &
  RequestParameters;

export interface SolutionInferenceCreateOrUpdateBodyParam {
  /** solutionInferenceRequest containing input needed for job request processing. */
  body: SolutionInference;
}

export interface SolutionInferenceCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SolutionInferenceCreateOrUpdateParameters =
  SolutionInferenceCreateOrUpdateMediaTypesParam &
    SolutionInferenceCreateOrUpdateBodyParam &
    RequestParameters;

export interface SolutionInferenceFetchBodyParam {
  /** solutionInferenceRequest containing input needed for job request processing. */
  body: SolutionInference;
}

export interface SolutionInferenceFetchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SolutionInferenceFetchParameters = SolutionInferenceFetchMediaTypesParam &
  SolutionInferenceFetchBodyParam &
  RequestParameters;

export interface TillageDataListByPartyIdQueryParamProperties {
  /** Minimum measured tillage depth (inclusive). */
  minTillageDepth?: number;
  /** Maximum measured tillage depth (inclusive). */
  maxTillageDepth?: number;
  /** Minimum pressure applied to a tillage implement (inclusive). */
  minTillagePressure?: number;
  /** Maximum pressure applied to a tillage implement (inclusive). */
  maxTillagePressure?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface TillageDataListByPartyIdQueryParam {
  queryParameters?: TillageDataListByPartyIdQueryParamProperties;
}

export type TillageDataListByPartyIdParameters = TillageDataListByPartyIdQueryParam &
  RequestParameters;
export type TillageDataGetParameters = RequestParameters;
/** Tillage data resource payload to create or update. */
export type TillageDataResourceMergeAndPatch = Partial<TillageData>;

export interface TillageDataCreateOrUpdateBodyParam {
  /** Tillage data resource payload to create or update. */
  body: TillageDataResourceMergeAndPatch;
}

export interface TillageDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TillageDataCreateOrUpdateParameters = TillageDataCreateOrUpdateMediaTypesParam &
  TillageDataCreateOrUpdateBodyParam &
  RequestParameters;
export type TillageDataDeleteParameters = RequestParameters;

export interface TillageDataListQueryParamProperties {
  /** Minimum measured tillage depth (inclusive). */
  minTillageDepth?: number;
  /** Maximum measured tillage depth (inclusive). */
  maxTillageDepth?: number;
  /** Minimum pressure applied to a tillage implement (inclusive). */
  minTillagePressure?: number;
  /** Maximum pressure applied to a tillage implement (inclusive). */
  maxTillagePressure?: number;
  /** Sources of the operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Boundary IDs associated with operation data. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  associatedBoundaryIds?: string;
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date | string;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date | string;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date | string;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date | string;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date | string;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date | string;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface TillageDataListQueryParam {
  queryParameters?: TillageDataListQueryParamProperties;
}

export type TillageDataListParameters = TillageDataListQueryParam & RequestParameters;

export interface TillageDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the party. */
  partyId: string;
  /** Id of the tillage data. */
  tillageDataId: string;
}

export interface TillageDataCreateCascadeDeleteJobQueryParam {
  queryParameters: TillageDataCreateCascadeDeleteJobQueryParamProperties;
}

export type TillageDataCreateCascadeDeleteJobParameters =
  TillageDataCreateCascadeDeleteJobQueryParam & RequestParameters;
export type TillageDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface WeatherListQueryParamProperties {
  /** Party ID. */
  partyId: string;
  /** Boundary ID. */
  boundaryId: string;
  /** ID of the weather extension. */
  extensionId: string;
  /** Type of weather data (forecast/historical). */
  weatherDataType: string;
  /** Granularity of weather data (daily/hourly). */
  granularity: string;
  /** Weather data start UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startDateTime?: Date | string;
  /** Weather data end UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface WeatherListQueryParam {
  queryParameters: WeatherListQueryParamProperties;
}

export type WeatherListParameters = WeatherListQueryParam & RequestParameters;
export type WeatherGetDataDeleteJobDetailsParameters = RequestParameters;

export interface WeatherCreateDataDeleteJobBodyParam {
  /** Job parameters supplied by user. */
  body: WeatherDataDeleteJob;
}

export interface WeatherCreateDataDeleteJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WeatherCreateDataDeleteJobParameters = WeatherCreateDataDeleteJobMediaTypesParam &
  WeatherCreateDataDeleteJobBodyParam &
  RequestParameters;
export type WeatherGetDataIngestionJobDetailsParameters = RequestParameters;

export interface WeatherCreateDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body: WeatherDataIngestionJob;
}

export interface WeatherCreateDataIngestionJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WeatherCreateDataIngestionJobParameters = WeatherCreateDataIngestionJobMediaTypesParam &
  WeatherCreateDataIngestionJobBodyParam &
  RequestParameters;

export interface WeatherDataGetBodyParam {
  /** Weather data provider request. */
  body: WeatherDataProviderRequest;
}

export interface WeatherDataGetMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WeatherDataGetParameters = WeatherDataGetMediaTypesParam &
  WeatherDataGetBodyParam &
  RequestParameters;

export interface ZonesListByPartyIdQueryParamProperties {
  /** Types of the Zones. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** ManagementZoneIds of the Zones. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  managementZoneIds?: string;
  /** Sources of the Zones. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface ZonesListByPartyIdQueryParam {
  queryParameters?: ZonesListByPartyIdQueryParamProperties;
}

export type ZonesListByPartyIdParameters = ZonesListByPartyIdQueryParam & RequestParameters;
export type ZonesGetParameters = RequestParameters;
/** Zone resource payload to create or update. */
export type ZoneResourceMergeAndPatch = Partial<Zone>;

export interface ZonesCreateOrUpdateBodyParam {
  /** Zone resource payload to create or update. */
  body: ZoneResourceMergeAndPatch;
}

export interface ZonesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type ZonesCreateOrUpdateParameters = ZonesCreateOrUpdateMediaTypesParam &
  ZonesCreateOrUpdateBodyParam &
  RequestParameters;
export type ZonesDeleteParameters = RequestParameters;

export interface ZonesListQueryParamProperties {
  /** Types of the Zones. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  types?: string;
  /** ManagementZoneIds of the Zones. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  managementZoneIds?: string;
  /** Sources of the Zones. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  sources?: string;
  /** Ids of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  ids?: string;
  /** Names of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  names?: string;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}". This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  propertyFilters?: string;
  /** Statuses of the resource. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request */
  statuses?: string;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
}

export interface ZonesListQueryParam {
  queryParameters?: ZonesListQueryParamProperties;
}

export type ZonesListParameters = ZonesListQueryParam & RequestParameters;
export type ZonesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ZonesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated party. */
  partyId: string;
  /** ID of the zone to be deleted. */
  zoneId: string;
}

export interface ZonesCreateCascadeDeleteJobQueryParam {
  queryParameters: ZonesCreateCascadeDeleteJobQueryParamProperties;
}

export type ZonesCreateCascadeDeleteJobParameters = ZonesCreateCascadeDeleteJobQueryParam &
  RequestParameters;
