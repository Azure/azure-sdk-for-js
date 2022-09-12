// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ApplicationData,
  SearchBoundaryQuery,
  Boundary,
  Crop,
  CropVariety,
  DeviceDataModel,
  Device,
  Farmer,
  FarmOperationDataIngestionJob,
  Farm,
  Field,
  HarvestData,
  ImageProcessingRasterizeJob,
  Insight,
  ManagementZone,
  BiomassModelJob,
  SoilMoistureModelJob,
  NutrientAnalysis,
  OAuthProvider,
  OAuthConnectRequest,
  PlantingData,
  PlantTissueAnalysis,
  PrescriptionMap,
  Prescription,
  SatelliteDataIngestionJob,
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
  Zone
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
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface ApplicationDataListQueryParam {
  queryParameters?: ApplicationDataListQueryParamProperties;
}

export type ApplicationDataListParameters = ApplicationDataListQueryParam &
  RequestParameters;

export interface ApplicationDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the farmer. */
  farmerId: string;
  /** Id of the application data. */
  applicationDataId: string;
}

export interface ApplicationDataCreateCascadeDeleteJobQueryParam {
  queryParameters: ApplicationDataCreateCascadeDeleteJobQueryParamProperties;
}

export type ApplicationDataCreateCascadeDeleteJobParameters = ApplicationDataCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type ApplicationDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ApplicationDataListByFarmerIdQueryParamProperties {
  /** Minimum average amount of material applied during the application (inclusive). */
  minAvgMaterial?: number;
  /** Maximum average amount of material applied during the application (inclusive). */
  maxAvgMaterial?: number;
  /** Minimum total amount of material applied during the application (inclusive). */
  minTotalMaterial?: number;
  /** Maximum total amount of material applied during the application (inclusive). */
  maxTotalMaterial?: number;
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface ApplicationDataListByFarmerIdQueryParam {
  queryParameters?: ApplicationDataListByFarmerIdQueryParamProperties;
}

export type ApplicationDataListByFarmerIdParameters = ApplicationDataListByFarmerIdQueryParam &
  RequestParameters;
export type ApplicationDataGetParameters = RequestParameters;

export interface ApplicationDataCreateOrUpdateBodyParam {
  /** Application data resource payload to create or update. */
  body: ApplicationData;
}

export interface ApplicationDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type ApplicationDataCreateOrUpdateParameters = ApplicationDataCreateOrUpdateMediaTypesParam &
  ApplicationDataCreateOrUpdateBodyParam &
  RequestParameters;
export type ApplicationDataDeleteParameters = RequestParameters;

export interface AttachmentsListByFarmerIdQueryParamProperties {
  /** Resource Ids of the resource. */
  resourceIds?: Array<string>;
  /**
   * Resource Types of the resource.
   * i.e. Farmer, Farm, Field, SeasonalField, Boundary, ApplicationData, HarvestData, TillageData, PlantingData, PlantTissueAnalysis.
   */
  resourceTypes?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface AttachmentsListByFarmerIdQueryParam {
  queryParameters?: AttachmentsListByFarmerIdQueryParamProperties;
}

export type AttachmentsListByFarmerIdParameters = AttachmentsListByFarmerIdQueryParam &
  RequestParameters;
export type AttachmentsGetParameters = RequestParameters;

export interface AttachmentsCreateOrUpdateBodyParam {
  body?: AttachmentsCreateOrUpdateFormBody;
}

export interface AttachmentsCreateOrUpdateFormBody {
  /**
   * file
   *
   * Value may contain any sequence of octets
   */
  file?:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  /** Associated Resource id for this attachment. */
  ResourceId?: string;
  /** Associated Resource type for this attachment. */
  ResourceType?: string;
  /** Original File Name for this attachment. */
  OriginalFileName?: string;
  /** Farmer id for this attachment. */
  FarmerId?: string;
  /** Unique id. */
  Id?: string;
  /** Status of the resource. */
  Status?: string;
  /** Date when resource was created. */
  CreatedDateTime?: string;
  /** Date when resource was last modified. */
  ModifiedDateTime?: string;
  /** Source of the resource. */
  Source?: string;
  /** Name to identify resource. */
  Name?: string;
  /** Textual description of resource. */
  Description?: string;
  /** The ETag value to implement optimistic concurrency. */
  ETag?: string;
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
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Parent Ids of the resource. */
  parentIds?: Array<string>;
  /** Minimum acreage of the boundary (inclusive). */
  minAcreage?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxAcreage?: number;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface BoundariesListQueryParam {
  queryParameters?: BoundariesListQueryParamProperties;
}

export type BoundariesListParameters = BoundariesListQueryParam &
  RequestParameters;

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
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the boundary to be deleted. */
  boundaryId: string;
}

export interface BoundariesCreateCascadeDeleteJobQueryParam {
  queryParameters: BoundariesCreateCascadeDeleteJobQueryParamProperties;
}

export type BoundariesCreateCascadeDeleteJobParameters = BoundariesCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type BoundariesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface BoundariesListByFarmerIdQueryParamProperties {
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Parent Ids of the resource. */
  parentIds?: Array<string>;
  /** Minimum acreage of the boundary (inclusive). */
  minAcreage?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxAcreage?: number;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface BoundariesListByFarmerIdQueryParam {
  queryParameters?: BoundariesListByFarmerIdQueryParamProperties;
}

export type BoundariesListByFarmerIdParameters = BoundariesListByFarmerIdQueryParam &
  RequestParameters;

export interface BoundariesSearchByFarmerIdBodyParam {
  /** Query filters. */
  body: SearchBoundaryQuery;
}

export interface BoundariesSearchByFarmerIdMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BoundariesSearchByFarmerIdParameters = BoundariesSearchByFarmerIdMediaTypesParam &
  BoundariesSearchByFarmerIdBodyParam &
  RequestParameters;

export interface BoundariesCreateOrUpdateBodyParam {
  /** Boundary resource payload to create or update. */
  body: Boundary;
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
  /** FarmerId of the other field. */
  otherFarmerId: string;
  /** Id of the other boundary. */
  otherBoundaryId: string;
}

export interface BoundariesGetOverlapQueryParam {
  queryParameters: BoundariesGetOverlapQueryParamProperties;
}

export type BoundariesGetOverlapParameters = BoundariesGetOverlapQueryParam &
  RequestParameters;

export interface CropsListQueryParamProperties {
  /** Crop phenotypes of the resource. */
  phenotypes?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface CropsListQueryParam {
  queryParameters?: CropsListQueryParamProperties;
}

export type CropsListParameters = CropsListQueryParam & RequestParameters;
export type CropsGetParameters = RequestParameters;

export interface CropsCreateOrUpdateBodyParam {
  /** Crop resource payload to create or update. */
  body: Crop;
}

export interface CropsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CropsCreateOrUpdateParameters = CropsCreateOrUpdateMediaTypesParam &
  CropsCreateOrUpdateBodyParam &
  RequestParameters;
export type CropsDeleteParameters = RequestParameters;

export interface CropVarietiesListQueryParamProperties {
  /** CropIds of the resource. */
  cropIds?: Array<string>;
  /** Brands of the resource. */
  brands?: Array<string>;
  /** Products of the resource. */
  products?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface CropVarietiesListQueryParam {
  queryParameters?: CropVarietiesListQueryParamProperties;
}

export type CropVarietiesListParameters = CropVarietiesListQueryParam &
  RequestParameters;
export type CropVarietiesGetParameters = RequestParameters;

export interface CropVarietiesCreateOrUpdateBodyParam {
  /** Crop variety resource payload to create or update. */
  body: CropVariety;
}

export interface CropVarietiesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CropVarietiesCreateOrUpdateParameters = CropVarietiesCreateOrUpdateMediaTypesParam &
  CropVarietiesCreateOrUpdateBodyParam &
  RequestParameters;
export type CropVarietiesDeleteParameters = RequestParameters;

export interface DeviceDataModelsListQueryParamProperties {
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface DeviceDataModelsListQueryParam {
  queryParameters?: DeviceDataModelsListQueryParamProperties;
}

export type DeviceDataModelsListParameters = DeviceDataModelsListQueryParam &
  RequestParameters;

export interface DeviceDataModelsCreateOrUpdateBodyParam {
  /** Device data model object details. */
  body: DeviceDataModel;
}

export interface DeviceDataModelsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type DeviceDataModelsCreateOrUpdateParameters = DeviceDataModelsCreateOrUpdateMediaTypesParam &
  DeviceDataModelsCreateOrUpdateBodyParam &
  RequestParameters;
export type DeviceDataModelsGetParameters = RequestParameters;
export type DeviceDataModelsDeleteParameters = RequestParameters;

export interface DevicesListQueryParamProperties {
  /** Id's of the parent devices. */
  parentDeviceIds?: Array<string>;
  /** Id's of the device data models. */
  deviceDataModelIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface DevicesListQueryParam {
  queryParameters?: DevicesListQueryParamProperties;
}

export type DevicesListParameters = DevicesListQueryParam & RequestParameters;

export interface DevicesCreateOrUpdateBodyParam {
  /** Device object details. */
  body: Device;
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

export interface FarmersListQueryParamProperties {
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface FarmersListQueryParam {
  queryParameters?: FarmersListQueryParamProperties;
}

export type FarmersListParameters = FarmersListQueryParam & RequestParameters;
export type FarmersGetParameters = RequestParameters;

export interface FarmersCreateOrUpdateBodyParam {
  /** Farmer resource payload to create or update. */
  body: Farmer;
}

export interface FarmersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FarmersCreateOrUpdateParameters = FarmersCreateOrUpdateMediaTypesParam &
  FarmersCreateOrUpdateBodyParam &
  RequestParameters;
export type FarmersDeleteParameters = RequestParameters;

export interface FarmersCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the farmer to be deleted. */
  farmerId: string;
}

export interface FarmersCreateCascadeDeleteJobQueryParam {
  queryParameters: FarmersCreateCascadeDeleteJobQueryParamProperties;
}

export type FarmersCreateCascadeDeleteJobParameters = FarmersCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type FarmersGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FarmOperationsCreateDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body: FarmOperationDataIngestionJob;
}

export interface FarmOperationsCreateDataIngestionJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FarmOperationsCreateDataIngestionJobParameters = FarmOperationsCreateDataIngestionJobMediaTypesParam &
  FarmOperationsCreateDataIngestionJobBodyParam &
  RequestParameters;
export type FarmOperationsGetDataIngestionJobDetailsParameters = RequestParameters;

export interface FarmsListByFarmerIdQueryParamProperties {
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface FarmsListByFarmerIdQueryParam {
  queryParameters?: FarmsListByFarmerIdQueryParamProperties;
}

export type FarmsListByFarmerIdParameters = FarmsListByFarmerIdQueryParam &
  RequestParameters;
export type FarmsGetParameters = RequestParameters;

export interface FarmsCreateOrUpdateBodyParam {
  /** Farm resource payload to create or update. */
  body: Farm;
}

export interface FarmsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FarmsCreateOrUpdateParameters = FarmsCreateOrUpdateMediaTypesParam &
  FarmsCreateOrUpdateBodyParam &
  RequestParameters;
export type FarmsDeleteParameters = RequestParameters;

export interface FarmsListQueryParamProperties {
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface FarmsListQueryParam {
  queryParameters?: FarmsListQueryParamProperties;
}

export type FarmsListParameters = FarmsListQueryParam & RequestParameters;

export interface FarmsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the farm to be deleted. */
  farmId: string;
}

export interface FarmsCreateCascadeDeleteJobQueryParam {
  queryParameters: FarmsCreateCascadeDeleteJobQueryParamProperties;
}

export type FarmsCreateCascadeDeleteJobParameters = FarmsCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type FarmsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FieldsListByFarmerIdQueryParamProperties {
  /** Farm Ids of the resource. */
  farmIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface FieldsListByFarmerIdQueryParam {
  queryParameters?: FieldsListByFarmerIdQueryParamProperties;
}

export type FieldsListByFarmerIdParameters = FieldsListByFarmerIdQueryParam &
  RequestParameters;
export type FieldsGetParameters = RequestParameters;

export interface FieldsCreateOrUpdateBodyParam {
  /** Field resource payload to create or update. */
  body: Field;
}

export interface FieldsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FieldsCreateOrUpdateParameters = FieldsCreateOrUpdateMediaTypesParam &
  FieldsCreateOrUpdateBodyParam &
  RequestParameters;
export type FieldsDeleteParameters = RequestParameters;

export interface FieldsListQueryParamProperties {
  /** Farm Ids of the resource. */
  farmIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface FieldsListQueryParam {
  queryParameters?: FieldsListQueryParamProperties;
}

export type FieldsListParameters = FieldsListQueryParam & RequestParameters;

export interface FieldsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the field to be deleted. */
  fieldId: string;
}

export interface FieldsCreateCascadeDeleteJobQueryParam {
  queryParameters: FieldsCreateCascadeDeleteJobQueryParamProperties;
}

export type FieldsCreateCascadeDeleteJobParameters = FieldsCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type FieldsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface HarvestDataListByFarmerIdQueryParamProperties {
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
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface HarvestDataListByFarmerIdQueryParam {
  queryParameters?: HarvestDataListByFarmerIdQueryParamProperties;
}

export type HarvestDataListByFarmerIdParameters = HarvestDataListByFarmerIdQueryParam &
  RequestParameters;
export type HarvestDataGetParameters = RequestParameters;

export interface HarvestDataCreateOrUpdateBodyParam {
  /** Harvest data resource payload to create or update. */
  body: HarvestData;
}

export interface HarvestDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type HarvestDataCreateOrUpdateParameters = HarvestDataCreateOrUpdateMediaTypesParam &
  HarvestDataCreateOrUpdateBodyParam &
  RequestParameters;
export type HarvestDataDeleteParameters = RequestParameters;

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
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface HarvestDataListQueryParam {
  queryParameters?: HarvestDataListQueryParamProperties;
}

export type HarvestDataListParameters = HarvestDataListQueryParam &
  RequestParameters;

export interface HarvestDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the farmer. */
  farmerId: string;
  /** Id of the harvest data. */
  harvestDataId: string;
}

export interface HarvestDataCreateCascadeDeleteJobQueryParam {
  queryParameters: HarvestDataCreateCascadeDeleteJobQueryParamProperties;
}

export type HarvestDataCreateCascadeDeleteJobParameters = HarvestDataCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type HarvestDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ImageProcessingCreateRasterizeJobBodyParam {
  /** Job parameters supplied by user. */
  body: ImageProcessingRasterizeJob;
}

export interface ImageProcessingCreateRasterizeJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ImageProcessingCreateRasterizeJobParameters = ImageProcessingCreateRasterizeJobMediaTypesParam &
  ImageProcessingCreateRasterizeJobBodyParam &
  RequestParameters;
export type ImageProcessingGetRasterizeJobParameters = RequestParameters;

export interface InsightAttachmentsListByFarmerIdModelIdAndResourceQueryParamProperties {
  /** List of insight IDs. */
  insightIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface InsightAttachmentsListByFarmerIdModelIdAndResourceQueryParam {
  queryParameters?: InsightAttachmentsListByFarmerIdModelIdAndResourceQueryParamProperties;
}

export type InsightAttachmentsListByFarmerIdModelIdAndResourceParameters = InsightAttachmentsListByFarmerIdModelIdAndResourceQueryParam &
  RequestParameters;

export interface InsightAttachmentsCreateOrUpdateBodyParam {
  body: InsightAttachmentsCreateOrUpdateFormBody;
}

export interface InsightAttachmentsCreateOrUpdateFormBody {
  /**
   * abcd
   *
   * Value may contain any sequence of octets
   */
  file?:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  /** InsightID for this InsightAttachment. */
  insightId: string;
  /** ModelID for this InsightAttachment. */
  ModelId?: string;
  /** Associated Resource type for this attachment. */
  ResourceType?: string;
  /** Associated Resource id for this attachment. */
  ResourceId?: string;
  /** Original File Name for this attachment. */
  OriginalFileName?: string;
  /** Farmer id for this attachment. */
  FarmerId?: string;
  /** Unique id. */
  Id?: string;
  /** Status of the resource. */
  Status?: string;
  /** Date when resource was created. */
  CreatedDateTime?: string;
  /** Date when resource was last modified. */
  ModifiedDateTime?: string;
  /** Source of the resource. */
  Source?: string;
  /** Name to identify resource. */
  Name?: string;
  /** Textual description of resource. */
  Description?: string;
  /** The ETag value to implement optimistic concurrency. */
  ETag?: string;
}

export interface InsightAttachmentsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "multipart/form-data";
}

export type InsightAttachmentsCreateOrUpdateParameters = InsightAttachmentsCreateOrUpdateMediaTypesParam &
  InsightAttachmentsCreateOrUpdateBodyParam &
  RequestParameters;
export type InsightAttachmentsGetParameters = RequestParameters;
export type InsightAttachmentsDeleteParameters = RequestParameters;
export type InsightAttachmentsDownloadParameters = RequestParameters;

export interface InsightsListByFarmerIdModelIdAndResourceQueryParamProperties {
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
   * eg. "measureKey.value eq {testValue}" where testValue = double.
   */
  measureFilters?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface InsightsListByFarmerIdModelIdAndResourceQueryParam {
  queryParameters?: InsightsListByFarmerIdModelIdAndResourceQueryParamProperties;
}

export type InsightsListByFarmerIdModelIdAndResourceParameters = InsightsListByFarmerIdModelIdAndResourceQueryParam &
  RequestParameters;

export interface InsightsCreateOrUpdateBodyParam {
  /** Insight data. */
  body: Insight;
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

export interface InsightsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
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

export interface ManagementZonesListByFarmerIdQueryParamProperties {
  /** Types of the ManagementZone. */
  types?: Array<string>;
  /** CropIds of the ManagementZone. */
  cropIds?: Array<string>;
  /** SeasonIds of the ManagementZone. */
  seasonIds?: Array<string>;
  /** FieldIds of the ManagementZone. */
  fieldIds?: Array<string>;
  /** Sources of the ManagementZone. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface ManagementZonesListByFarmerIdQueryParam {
  queryParameters?: ManagementZonesListByFarmerIdQueryParamProperties;
}

export type ManagementZonesListByFarmerIdParameters = ManagementZonesListByFarmerIdQueryParam &
  RequestParameters;
export type ManagementZonesGetParameters = RequestParameters;

export interface ManagementZonesCreateOrUpdateBodyParam {
  /** ManagementZone resource payload to create or update. */
  body: ManagementZone;
}

export interface ManagementZonesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type ManagementZonesCreateOrUpdateParameters = ManagementZonesCreateOrUpdateMediaTypesParam &
  ManagementZonesCreateOrUpdateBodyParam &
  RequestParameters;
export type ManagementZonesDeleteParameters = RequestParameters;

export interface ManagementZonesListQueryParamProperties {
  /** Types of the ManagementZone. */
  types?: Array<string>;
  /** CropIds of the ManagementZone. */
  cropIds?: Array<string>;
  /** SeasonIds of the ManagementZone. */
  seasonIds?: Array<string>;
  /** FieldIds of the ManagementZone. */
  fieldIds?: Array<string>;
  /** Sources of the ManagementZone. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface ManagementZonesListQueryParam {
  queryParameters?: ManagementZonesListQueryParamProperties;
}

export type ManagementZonesListParameters = ManagementZonesListQueryParam &
  RequestParameters;
export type ManagementZonesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ManagementZonesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the management zone to be deleted. */
  managementZoneId: string;
}

export interface ManagementZonesCreateCascadeDeleteJobQueryParam {
  queryParameters: ManagementZonesCreateCascadeDeleteJobQueryParamProperties;
}

export type ManagementZonesCreateCascadeDeleteJobParameters = ManagementZonesCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface ModelInferenceCreateBiomassModelJobBodyParam {
  /** Job parameters supplied by user. */
  body: BiomassModelJob;
}

export interface ModelInferenceCreateBiomassModelJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ModelInferenceCreateBiomassModelJobParameters = ModelInferenceCreateBiomassModelJobMediaTypesParam &
  ModelInferenceCreateBiomassModelJobBodyParam &
  RequestParameters;
export type ModelInferenceGetBiomassModelJobParameters = RequestParameters;

export interface ModelInferenceCreateSoilMoistureModelJobBodyParam {
  /** Job parameters supplied by user. */
  body: SoilMoistureModelJob;
}

export interface ModelInferenceCreateSoilMoistureModelJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ModelInferenceCreateSoilMoistureModelJobParameters = ModelInferenceCreateSoilMoistureModelJobMediaTypesParam &
  ModelInferenceCreateSoilMoistureModelJobBodyParam &
  RequestParameters;
export type ModelInferenceGetSoilMoistureModelJobParameters = RequestParameters;

export interface NutrientAnalysesListByFarmerIdQueryParamProperties {
  /**
   * Type of the parent it belongs to.
   * i.e. PlantTissueAnalysis.
   */
  parentType?: string;
  /** Parent ids of the resource. */
  parentIds?: Array<string>;
  /** Classifications for nutrient analyses. */
  classifications?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface NutrientAnalysesListByFarmerIdQueryParam {
  queryParameters?: NutrientAnalysesListByFarmerIdQueryParamProperties;
}

export type NutrientAnalysesListByFarmerIdParameters = NutrientAnalysesListByFarmerIdQueryParam &
  RequestParameters;
export type NutrientAnalysesGetParameters = RequestParameters;

export interface NutrientAnalysesCreateOrUpdateBodyParam {
  /** NutrientAnalysis resource payload to create or update. */
  body: NutrientAnalysis;
}

export interface NutrientAnalysesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type NutrientAnalysesCreateOrUpdateParameters = NutrientAnalysesCreateOrUpdateMediaTypesParam &
  NutrientAnalysesCreateOrUpdateBodyParam &
  RequestParameters;
export type NutrientAnalysesDeleteParameters = RequestParameters;

export interface NutrientAnalysesListQueryParamProperties {
  /**
   * Type of the parent it belongs to.
   * i.e. PlantTissueAnalysis.
   */
  parentType?: string;
  /** Parent ids of the resource. */
  parentIds?: Array<string>;
  /** Classifications for nutrient analyses. */
  classifications?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface NutrientAnalysesListQueryParam {
  queryParameters?: NutrientAnalysesListQueryParamProperties;
}

export type NutrientAnalysesListParameters = NutrientAnalysesListQueryParam &
  RequestParameters;

export interface OAuthProvidersListQueryParamProperties {
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface OAuthProvidersListQueryParam {
  queryParameters?: OAuthProvidersListQueryParamProperties;
}

export type OAuthProvidersListParameters = OAuthProvidersListQueryParam &
  RequestParameters;
export type OAuthProvidersGetParameters = RequestParameters;

export interface OAuthProvidersCreateOrUpdateBodyParam {
  /** OauthProvider resource payload to create or update. */
  body: OAuthProvider;
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

export type OAuthProvidersCreateCascadeDeleteJobParameters = OAuthProvidersCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface OAuthTokensListQueryParamProperties {
  /** Name of AuthProvider. */
  authProviderIds?: Array<string>;
  /** List of farmers. */
  farmerIds?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface OAuthTokensListQueryParam {
  queryParameters?: OAuthTokensListQueryParamProperties;
}

export type OAuthTokensListParameters = OAuthTokensListQueryParam &
  RequestParameters;

export interface OAuthTokensGetOAuthConnectionLinkBodyParam {
  /** OAuth Connect Request. */
  body: OAuthConnectRequest;
}

export interface OAuthTokensGetOAuthConnectionLinkMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type OAuthTokensGetOAuthConnectionLinkParameters = OAuthTokensGetOAuthConnectionLinkMediaTypesParam &
  OAuthTokensGetOAuthConnectionLinkBodyParam &
  RequestParameters;

export interface OAuthTokensCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the farmer. */
  farmerId: string;
  /** Id of the OAuthProvider. */
  oauthProviderId: string;
}

export interface OAuthTokensCreateCascadeDeleteJobQueryParam {
  queryParameters: OAuthTokensCreateCascadeDeleteJobQueryParamProperties;
}

export type OAuthTokensCreateCascadeDeleteJobParameters = OAuthTokensCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type OAuthTokensGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PlantingDataListByFarmerIdQueryParamProperties {
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
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PlantingDataListByFarmerIdQueryParam {
  queryParameters?: PlantingDataListByFarmerIdQueryParamProperties;
}

export type PlantingDataListByFarmerIdParameters = PlantingDataListByFarmerIdQueryParam &
  RequestParameters;
export type PlantingDataGetParameters = RequestParameters;

export interface PlantingDataCreateOrUpdateBodyParam {
  /** Planting data resource payload to create or update. */
  body: PlantingData;
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
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PlantingDataListQueryParam {
  queryParameters?: PlantingDataListQueryParamProperties;
}

export type PlantingDataListParameters = PlantingDataListQueryParam &
  RequestParameters;

export interface PlantingDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the farmer. */
  farmerId: string;
  /** Id of the planting data. */
  plantingDataId: string;
}

export interface PlantingDataCreateCascadeDeleteJobQueryParam {
  queryParameters: PlantingDataCreateCascadeDeleteJobQueryParamProperties;
}

export type PlantingDataCreateCascadeDeleteJobParameters = PlantingDataCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type PlantingDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PlantTissueAnalysesListByFarmerIdQueryParamProperties {
  /** Season ids of the plant tissue analyses. */
  seasonIds?: Array<string>;
  /** Crop ids of the plant tissue analyses. */
  cropIds?: Array<string>;
  /** Crop varieties ids of the plant tissue analyses. */
  cropVarietiesIds?: Array<string>;
  /** Field ids of the plant tissue analyses. */
  fieldIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PlantTissueAnalysesListByFarmerIdQueryParam {
  queryParameters?: PlantTissueAnalysesListByFarmerIdQueryParamProperties;
}

export type PlantTissueAnalysesListByFarmerIdParameters = PlantTissueAnalysesListByFarmerIdQueryParam &
  RequestParameters;
export type PlantTissueAnalysesGetParameters = RequestParameters;

export interface PlantTissueAnalysesCreateOrUpdateBodyParam {
  /** PlantTissueAnalysis resource payload to create or update. */
  body: PlantTissueAnalysis;
}

export interface PlantTissueAnalysesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PlantTissueAnalysesCreateOrUpdateParameters = PlantTissueAnalysesCreateOrUpdateMediaTypesParam &
  PlantTissueAnalysesCreateOrUpdateBodyParam &
  RequestParameters;
export type PlantTissueAnalysesDeleteParameters = RequestParameters;

export interface PlantTissueAnalysesListQueryParamProperties {
  /** Season ids of the plant tissue analyses. */
  seasonIds?: Array<string>;
  /** Crop ids of the plant tissue analyses. */
  cropIds?: Array<string>;
  /** Crop varieties ids of the plant tissue analyses. */
  cropVarietiesIds?: Array<string>;
  /** Field ids of the plant tissue analyses. */
  fieldIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PlantTissueAnalysesListQueryParam {
  queryParameters?: PlantTissueAnalysesListQueryParamProperties;
}

export type PlantTissueAnalysesListParameters = PlantTissueAnalysesListQueryParam &
  RequestParameters;

export interface PlantTissueAnalysesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the plant tissue analysis to be deleted. */
  plantTissueAnalysisId: string;
}

export interface PlantTissueAnalysesCreateCascadeDeleteJobQueryParam {
  queryParameters: PlantTissueAnalysesCreateCascadeDeleteJobQueryParamProperties;
}

export type PlantTissueAnalysesCreateCascadeDeleteJobParameters = PlantTissueAnalysesCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type PlantTissueAnalysesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PrescriptionMapsListByFarmerIdQueryParamProperties {
  /** Types of the resource. */
  types?: Array<string>;
  /** Crop Ids of the resource. */
  cropIds?: Array<string>;
  /** Season Ids of the resource. */
  seasonIds?: Array<string>;
  /** Field Ids of the resource. */
  fieldIds?: Array<string>;
  /** Sources for the resource. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PrescriptionMapsListByFarmerIdQueryParam {
  queryParameters?: PrescriptionMapsListByFarmerIdQueryParamProperties;
}

export type PrescriptionMapsListByFarmerIdParameters = PrescriptionMapsListByFarmerIdQueryParam &
  RequestParameters;
export type PrescriptionMapsGetParameters = RequestParameters;

export interface PrescriptionMapsCreateOrUpdateBodyParam {
  /** PrescriptionMap resource payload to create or update. */
  body: PrescriptionMap;
}

export interface PrescriptionMapsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PrescriptionMapsCreateOrUpdateParameters = PrescriptionMapsCreateOrUpdateMediaTypesParam &
  PrescriptionMapsCreateOrUpdateBodyParam &
  RequestParameters;
export type PrescriptionMapsDeleteParameters = RequestParameters;

export interface PrescriptionMapsListQueryParamProperties {
  /** Types of the resource. */
  types?: Array<string>;
  /** Crop Ids of the resource. */
  cropIds?: Array<string>;
  /** Season Ids of the resource. */
  seasonIds?: Array<string>;
  /** Field Ids of the resource. */
  fieldIds?: Array<string>;
  /** Sources for the resource. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PrescriptionMapsListQueryParam {
  queryParameters?: PrescriptionMapsListQueryParamProperties;
}

export type PrescriptionMapsListParameters = PrescriptionMapsListQueryParam &
  RequestParameters;
export type PrescriptionMapsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PrescriptionMapsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the prescription map to be deleted. */
  prescriptionMapId: string;
}

export interface PrescriptionMapsCreateCascadeDeleteJobQueryParam {
  queryParameters: PrescriptionMapsCreateCascadeDeleteJobQueryParamProperties;
}

export type PrescriptionMapsCreateCascadeDeleteJobParameters = PrescriptionMapsCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface PrescriptionsListByFarmerIdQueryParamProperties {
  /** Prescription Map Ids of the resource. */
  prescriptionMapIds?: Array<string>;
  /** Types of the resource. */
  types?: Array<string>;
  /** Product Codes of the resource. */
  productCodes?: Array<string>;
  /** Product Names of the resource. */
  productNames?: Array<string>;
  /** Sources for the resource. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PrescriptionsListByFarmerIdQueryParam {
  queryParameters?: PrescriptionsListByFarmerIdQueryParamProperties;
}

export type PrescriptionsListByFarmerIdParameters = PrescriptionsListByFarmerIdQueryParam &
  RequestParameters;
export type PrescriptionsGetParameters = RequestParameters;

export interface PrescriptionsCreateOrUpdateBodyParam {
  /** Prescription resource payload to create or update. */
  body: Prescription;
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
  /** Prescription Map Ids of the resource. */
  prescriptionMapIds?: Array<string>;
  /** Types of the resource. */
  types?: Array<string>;
  /** Product Codes of the resource. */
  productCodes?: Array<string>;
  /** Product Names of the resource. */
  productNames?: Array<string>;
  /** Sources for the resource. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface PrescriptionsListQueryParam {
  queryParameters?: PrescriptionsListQueryParamProperties;
}

export type PrescriptionsListParameters = PrescriptionsListQueryParam &
  RequestParameters;
export type PrescriptionsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PrescriptionsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the prescription to be deleted. */
  prescriptionId: string;
}

export interface PrescriptionsCreateCascadeDeleteJobQueryParam {
  queryParameters: PrescriptionsCreateCascadeDeleteJobQueryParamProperties;
}

export type PrescriptionsCreateCascadeDeleteJobParameters = PrescriptionsCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface ScenesListQueryParamProperties {
  /** Provider name of scene data. */
  provider: string;
  /** FarmerId. */
  farmerId: string;
  /** BoundaryId. */
  boundaryId: string;
  /** Source name of scene data, default value Sentinel_2_L2A (Sentinel 2 L2A). */
  source?: string;
  /** Scene start UTC datetime (inclusive), sample format: yyyy-MM-ddThh:mm:ssZ. */
  startDateTime?: Date | string;
  /** Scene end UTC datetime (inclusive), sample format: yyyy-MM-dThh:mm:ssZ. */
  endDateTime?: Date | string;
  /** Filter scenes with cloud coverage percentage less than max value. Range [0 to 100.0]. */
  maxCloudCoveragePercentage?: number;
  /** Filter scenes with dark pixel coverage percentage less than max value. Range [0 to 100.0]. */
  maxDarkPixelCoveragePercentage?: number;
  /** List of image names to be filtered. */
  imageNames?: Array<string>;
  /** List of image resolutions in meters to be filtered. */
  imageResolutions?: Array<number>;
  /** List of image formats to be filtered. */
  imageFormats?: Array<string>;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
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

export type ScenesDownloadParameters = ScenesDownloadQueryParam &
  RequestParameters;

export interface ScenesCreateSatelliteDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body: SatelliteDataIngestionJob;
}

export interface ScenesCreateSatelliteDataIngestionJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ScenesCreateSatelliteDataIngestionJobParameters = ScenesCreateSatelliteDataIngestionJobMediaTypesParam &
  ScenesCreateSatelliteDataIngestionJobBodyParam &
  RequestParameters;
export type ScenesGetSatelliteDataIngestionJobDetailsParameters = RequestParameters;

export interface SeasonalFieldsListByFarmerIdQueryParamProperties {
  /** Farm Ids of the resource. */
  farmIds?: Array<string>;
  /** Field Ids of the resource. */
  fieldIds?: Array<string>;
  /** Season Ids of the resource. */
  seasonIds?: Array<string>;
  /** CropVarietyIds of the resource. */
  cropVarietyIds?: Array<string>;
  /** Ids of the crop it belongs to. */
  cropIds?: Array<string>;
  /** Minimum average yield value of the seasonal field(inclusive). */
  minAvgYieldValue?: number;
  /** Maximum average yield value of the seasonal field(inclusive). */
  maxAvgYieldValue?: number;
  /** Unit of the average yield value attribute. */
  avgYieldUnit?: string;
  /** Minimum average seed population value of the seasonal field(inclusive). */
  minAvgSeedPopulationValue?: number;
  /** Maximum average seed population value of the seasonal field(inclusive). */
  maxAvgSeedPopulationValue?: number;
  /** Unit of average seed population value attribute. */
  avgSeedPopulationUnit?: string;
  /** Minimum planting datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minPlantingDateTime?: Date | string;
  /** Maximum planting datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxPlantingDateTime?: Date | string;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface SeasonalFieldsListByFarmerIdQueryParam {
  queryParameters?: SeasonalFieldsListByFarmerIdQueryParamProperties;
}

export type SeasonalFieldsListByFarmerIdParameters = SeasonalFieldsListByFarmerIdQueryParam &
  RequestParameters;
export type SeasonalFieldsGetParameters = RequestParameters;

export interface SeasonalFieldsCreateOrUpdateBodyParam {
  /** Seasonal field resource payload to create or update. */
  body: SeasonalField;
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
  /** Farm Ids of the resource. */
  farmIds?: Array<string>;
  /** Field Ids of the resource. */
  fieldIds?: Array<string>;
  /** Season Ids of the resource. */
  seasonIds?: Array<string>;
  /** CropVarietyIds of the resource. */
  cropVarietyIds?: Array<string>;
  /** Ids of the crop it belongs to. */
  cropIds?: Array<string>;
  /** Minimum average yield value of the seasonal field(inclusive). */
  minAvgYieldValue?: number;
  /** Maximum average yield value of the seasonal field(inclusive). */
  maxAvgYieldValue?: number;
  /** Unit of the average yield value attribute. */
  avgYieldUnit?: string;
  /** Minimum average seed population value of the seasonal field(inclusive). */
  minAvgSeedPopulationValue?: number;
  /** Maximum average seed population value of the seasonal field(inclusive). */
  maxAvgSeedPopulationValue?: number;
  /** Unit of average seed population value attribute. */
  avgSeedPopulationUnit?: string;
  /** Minimum planting datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minPlantingDateTime?: Date | string;
  /** Maximum planting datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxPlantingDateTime?: Date | string;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface SeasonalFieldsListQueryParam {
  queryParameters?: SeasonalFieldsListQueryParamProperties;
}

export type SeasonalFieldsListParameters = SeasonalFieldsListQueryParam &
  RequestParameters;

export interface SeasonalFieldsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the seasonalField to be deleted. */
  seasonalFieldId: string;
}

export interface SeasonalFieldsCreateCascadeDeleteJobQueryParam {
  queryParameters: SeasonalFieldsCreateCascadeDeleteJobQueryParamProperties;
}

export type SeasonalFieldsCreateCascadeDeleteJobParameters = SeasonalFieldsCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type SeasonalFieldsGetCascadeDeleteJobDetailsParameters = RequestParameters;

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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface SeasonsListQueryParam {
  queryParameters?: SeasonsListQueryParamProperties;
}

export type SeasonsListParameters = SeasonsListQueryParam & RequestParameters;
export type SeasonsGetParameters = RequestParameters;

export interface SeasonsCreateOrUpdateBodyParam {
  /** Season resource payload to create or update. */
  body: Season;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface SensorDataModelsListQueryParam {
  queryParameters?: SensorDataModelsListQueryParamProperties;
}

export type SensorDataModelsListParameters = SensorDataModelsListQueryParam &
  RequestParameters;

export interface SensorDataModelsCreateOrUpdateBodyParam {
  /** Sensor data model object details. */
  body: SensorDataModel;
}

export interface SensorDataModelsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SensorDataModelsCreateOrUpdateParameters = SensorDataModelsCreateOrUpdateMediaTypesParam &
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

export type SensorEventsListParameters = SensorEventsListQueryParam &
  RequestParameters;

export interface SensorMappingsListQueryParamProperties {
  /** Id of the sensors. */
  sensorIds?: Array<string>;
  /** Id of the sensor partners. */
  sensorPartnerIds?: Array<string>;
  /** Id of the farmers. */
  farmerIds?: Array<string>;
  /** Id of the boundaries. */
  boundaryIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface SensorMappingsListQueryParam {
  queryParameters?: SensorMappingsListQueryParamProperties;
}

export type SensorMappingsListParameters = SensorMappingsListQueryParam &
  RequestParameters;

export interface SensorMappingsCreateOrUpdateBodyParam {
  /** Sensor mapping object details. */
  body: SensorMapping;
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
  /** Ids of the partner integration models. */
  integrationIds?: Array<string>;
  /** Ids of the farmers. */
  farmerIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface SensorPartnerIntegrationsListQueryParam {
  queryParameters?: SensorPartnerIntegrationsListQueryParamProperties;
}

export type SensorPartnerIntegrationsListParameters = SensorPartnerIntegrationsListQueryParam &
  RequestParameters;

export interface SensorPartnerIntegrationsCreateOrUpdateBodyParam {
  /** Partner integration model. */
  body: SensorPartnerIntegrationModel;
}

export interface SensorPartnerIntegrationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SensorPartnerIntegrationsCreateOrUpdateParameters = SensorPartnerIntegrationsCreateOrUpdateMediaTypesParam &
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

export type SensorPartnerIntegrationsCheckConsentParameters = SensorPartnerIntegrationsCheckConsentQueryParam &
  RequestParameters;
export type SensorPartnerIntegrationsGenerateConsentLinkParameters = RequestParameters;

export interface SensorsListQueryParamProperties {
  /** Id's of the sensor data models. */
  sensorDataModelIds?: Array<string>;
  /** Ids of the sensor mappings. */
  sensorMappingIds?: Array<string>;
  /** Id's of the devices. */
  deviceIds?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface SensorsListQueryParam {
  queryParameters?: SensorsListQueryParamProperties;
}

export type SensorsListParameters = SensorsListQueryParam & RequestParameters;

export interface SensorsCreateOrUpdateBodyParam {
  /** Sensor object details. */
  body: Sensor;
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

export type SolutionInferenceCreateOrUpdateParameters = SolutionInferenceCreateOrUpdateMediaTypesParam &
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

export interface TillageDataListByFarmerIdQueryParamProperties {
  /** Minimum measured tillage depth (inclusive). */
  minTillageDepth?: number;
  /** Maximum measured tillage depth (inclusive). */
  maxTillageDepth?: number;
  /** Minimum pressure applied to a tillage implement (inclusive). */
  minTillagePressure?: number;
  /** Maximum pressure applied to a tillage implement (inclusive). */
  maxTillagePressure?: number;
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface TillageDataListByFarmerIdQueryParam {
  queryParameters?: TillageDataListByFarmerIdQueryParamProperties;
}

export type TillageDataListByFarmerIdParameters = TillageDataListByFarmerIdQueryParam &
  RequestParameters;
export type TillageDataGetParameters = RequestParameters;

export interface TillageDataCreateOrUpdateBodyParam {
  /** Tillage data resource payload to create or update. */
  body: TillageData;
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
  /** Sources of the operation data. */
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
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
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface TillageDataListQueryParam {
  queryParameters?: TillageDataListQueryParamProperties;
}

export type TillageDataListParameters = TillageDataListQueryParam &
  RequestParameters;

export interface TillageDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the farmer. */
  farmerId: string;
  /** Id of the tillage data. */
  tillageDataId: string;
}

export interface TillageDataCreateCascadeDeleteJobQueryParam {
  queryParameters: TillageDataCreateCascadeDeleteJobQueryParamProperties;
}

export type TillageDataCreateCascadeDeleteJobParameters = TillageDataCreateCascadeDeleteJobQueryParam &
  RequestParameters;
export type TillageDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface WeatherListQueryParamProperties {
  /** Farmer ID. */
  farmerId: string;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
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

export interface ZonesListByFarmerIdQueryParamProperties {
  /** Types of the Zones. */
  types?: Array<string>;
  /** ManagementZoneIds of the Zones. */
  managementZoneIds?: Array<string>;
  /** Sources of the Zones. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface ZonesListByFarmerIdQueryParam {
  queryParameters?: ZonesListByFarmerIdQueryParamProperties;
}

export type ZonesListByFarmerIdParameters = ZonesListByFarmerIdQueryParam &
  RequestParameters;
export type ZonesGetParameters = RequestParameters;

export interface ZonesCreateOrUpdateBodyParam {
  /** Zone resource payload to create or update. */
  body: Zone;
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
  /** Types of the Zones. */
  types?: Array<string>;
  /** ManagementZoneIds of the Zones. */
  managementZoneIds?: Array<string>;
  /** Sources of the Zones. */
  sources?: Array<string>;
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface ZonesListQueryParam {
  queryParameters?: ZonesListQueryParamProperties;
}

export type ZonesListParameters = ZonesListQueryParam & RequestParameters;
export type ZonesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ZonesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the zone to be deleted. */
  zoneId: string;
}

export interface ZonesCreateCascadeDeleteJobQueryParam {
  queryParameters: ZonesCreateCascadeDeleteJobQueryParamProperties;
}

export type ZonesCreateCascadeDeleteJobParameters = ZonesCreateCascadeDeleteJobQueryParam &
  RequestParameters;
