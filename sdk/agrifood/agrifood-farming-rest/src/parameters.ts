// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ApplicationData,
  SearchBoundaryQuery,
  Boundary,
  Crop,
  CropVariety,
  Farmer,
  FarmOperationDataIngestionJob,
  Farm,
  Field,
  HarvestData,
  ImageProcessingRasterizeJob,
  OAuthProvider,
  OAuthConnectRequest,
  PlantingData,
  SatelliteDataIngestionJob,
  SeasonalField,
  Season,
  TillageData,
  WeatherDataIngestionJob,
  WeatherDataDeleteJob,
} from "./models";

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
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type ApplicationDataListByFarmerIdParameters = RequestParameters &
  ApplicationDataListByFarmerIdQueryParam;

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
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type ApplicationDataListParameters = RequestParameters & ApplicationDataListQueryParam;
export type ApplicationDataGetParameters = RequestParameters;

export interface ApplicationDataCreateOrUpdateBodyParam {
  body?: ApplicationData;
}

export type ApplicationDataCreateOrUpdateParameters = RequestParameters &
  ApplicationDataCreateOrUpdateBodyParam;
export type ApplicationDataDeleteParameters = RequestParameters;

export interface AttachmentsListByFarmerIdQueryParamProperties {
  /** Resource Ids of the resource. */
  resourceIds?: string[];
  /** Resource Types of the resource. */
  resourceTypes?: string[];
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type AttachmentsListByFarmerIdParameters = RequestParameters &
  AttachmentsListByFarmerIdQueryParam;
export type AttachmentsGetParameters = RequestParameters;

export interface AttachmentsCreateOrUpdateBodyParam {
  body?: string;
}

export type AttachmentsCreateOrUpdateParameters = RequestParameters &
  AttachmentsCreateOrUpdateBodyParam;
export type AttachmentsDeleteParameters = RequestParameters;
export type AttachmentsDownloadParameters = RequestParameters;

export interface BoundariesListByFarmerIdQueryParamProperties {
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Parent Ids of the resource. */
  parentIds?: string[];
  /** Minimum acreage of the boundary (inclusive). */
  minAcreage?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxAcreage?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type BoundariesListByFarmerIdParameters = RequestParameters &
  BoundariesListByFarmerIdQueryParam;

export interface BoundariesSearchByFarmerIdBodyParam {
  body?: SearchBoundaryQuery;
}

export type BoundariesSearchByFarmerIdParameters = RequestParameters &
  BoundariesSearchByFarmerIdBodyParam;

export interface BoundariesListQueryParamProperties {
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Parent Ids of the resource. */
  parentIds?: string[];
  /** Minimum acreage of the boundary (inclusive). */
  minAcreage?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxAcreage?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type BoundariesListParameters = RequestParameters & BoundariesListQueryParam;

export interface BoundariesSearchBodyParam {
  body?: SearchBoundaryQuery;
}

export type BoundariesSearchParameters = RequestParameters & BoundariesSearchBodyParam;
export type BoundariesGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface BoundariesCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the boundary to be deleted. */
  boundaryId: string;
}

export interface BoundariesCreateCascadeDeleteJobQueryParam {
  queryParameters: BoundariesCreateCascadeDeleteJobQueryParamProperties;
}

export type BoundariesCreateCascadeDeleteJobParameters = RequestParameters &
  BoundariesCreateCascadeDeleteJobQueryParam;
export type BoundariesGetParameters = RequestParameters;

export interface BoundariesCreateOrUpdateBodyParam {
  body?: Boundary;
}

export type BoundariesCreateOrUpdateParameters = RequestParameters &
  BoundariesCreateOrUpdateBodyParam;
export type BoundariesDeleteParameters = RequestParameters;

export interface BoundariesGetOverlapQueryParamProperties {
  /** FarmerId of the other field. */
  otherFarmerId: string;
  /** ID of the other boundary. */
  otherBoundaryId: string;
}

export interface BoundariesGetOverlapQueryParam {
  queryParameters: BoundariesGetOverlapQueryParamProperties;
}

export type BoundariesGetOverlapParameters = RequestParameters & BoundariesGetOverlapQueryParam;

export interface CropsListQueryParamProperties {
  /** Crop phenotypes of the resource. */
  phenotypes?: string[];
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type CropsListParameters = RequestParameters & CropsListQueryParam;
export type CropsGetParameters = RequestParameters;

export interface CropsCreateOrUpdateBodyParam {
  body?: Crop;
}

export type CropsCreateOrUpdateParameters = RequestParameters & CropsCreateOrUpdateBodyParam;
export type CropsDeleteParameters = RequestParameters;

export interface CropVarietiesListByCropIdQueryParamProperties {
  /** CropIds of the resource. */
  cropIds?: string[];
  /** Brands of the resource. */
  brands?: string[];
  /** Products of the resource. */
  products?: string[];
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface CropVarietiesListByCropIdQueryParam {
  queryParameters?: CropVarietiesListByCropIdQueryParamProperties;
}

export type CropVarietiesListByCropIdParameters = RequestParameters &
  CropVarietiesListByCropIdQueryParam;

export interface CropVarietiesListQueryParamProperties {
  /** CropIds of the resource. */
  cropIds?: string[];
  /** Brands of the resource. */
  brands?: string[];
  /** Products of the resource. */
  products?: string[];
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type CropVarietiesListParameters = RequestParameters & CropVarietiesListQueryParam;
export type CropVarietiesGetParameters = RequestParameters;

export interface CropVarietiesCreateOrUpdateBodyParam {
  body?: CropVariety;
}

export type CropVarietiesCreateOrUpdateParameters = RequestParameters &
  CropVarietiesCreateOrUpdateBodyParam;
export type CropVarietiesDeleteParameters = RequestParameters;

export interface FarmersListQueryParamProperties {
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type FarmersListParameters = RequestParameters & FarmersListQueryParam;
export type FarmersGetParameters = RequestParameters;

export interface FarmersCreateOrUpdateBodyParam {
  body?: Farmer;
}

export type FarmersCreateOrUpdateParameters = RequestParameters & FarmersCreateOrUpdateBodyParam;
export type FarmersDeleteParameters = RequestParameters;
export type FarmersGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FarmersCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the farmer to be deleted. */
  farmerId: string;
}

export interface FarmersCreateCascadeDeleteJobQueryParam {
  queryParameters: FarmersCreateCascadeDeleteJobQueryParamProperties;
}

export type FarmersCreateCascadeDeleteJobParameters = RequestParameters &
  FarmersCreateCascadeDeleteJobQueryParam;

export interface FarmOperationsCreateDataIngestionJobBodyParam {
  body?: FarmOperationDataIngestionJob;
}

export type FarmOperationsCreateDataIngestionJobParameters = RequestParameters &
  FarmOperationsCreateDataIngestionJobBodyParam;
export type FarmOperationsGetDataIngestionJobDetailsParameters = RequestParameters;

export interface FarmsListByFarmerIdQueryParamProperties {
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type FarmsListByFarmerIdParameters = RequestParameters & FarmsListByFarmerIdQueryParam;

export interface FarmsListQueryParamProperties {
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type FarmsListParameters = RequestParameters & FarmsListQueryParam;
export type FarmsGetParameters = RequestParameters;

export interface FarmsCreateOrUpdateBodyParam {
  body?: Farm;
}

export type FarmsCreateOrUpdateParameters = RequestParameters & FarmsCreateOrUpdateBodyParam;
export type FarmsDeleteParameters = RequestParameters;
export type FarmsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FarmsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the farm to be deleted. */
  farmId: string;
}

export interface FarmsCreateCascadeDeleteJobQueryParam {
  queryParameters: FarmsCreateCascadeDeleteJobQueryParamProperties;
}

export type FarmsCreateCascadeDeleteJobParameters = RequestParameters &
  FarmsCreateCascadeDeleteJobQueryParam;

export interface FieldsListByFarmerIdQueryParamProperties {
  /** Farm Ids of the resource. */
  farmIds?: string[];
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type FieldsListByFarmerIdParameters = RequestParameters & FieldsListByFarmerIdQueryParam;

export interface FieldsListQueryParamProperties {
  /** Farm Ids of the resource. */
  farmIds?: string[];
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type FieldsListParameters = RequestParameters & FieldsListQueryParam;
export type FieldsGetParameters = RequestParameters;

export interface FieldsCreateOrUpdateBodyParam {
  body?: Field;
}

export type FieldsCreateOrUpdateParameters = RequestParameters & FieldsCreateOrUpdateBodyParam;
export type FieldsDeleteParameters = RequestParameters;
export type FieldsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FieldsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the field to be deleted. */
  fieldId: string;
}

export interface FieldsCreateCascadeDeleteJobQueryParam {
  queryParameters: FieldsCreateCascadeDeleteJobQueryParamProperties;
}

export type FieldsCreateCascadeDeleteJobParameters = RequestParameters &
  FieldsCreateCascadeDeleteJobQueryParam;

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
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type HarvestDataListByFarmerIdParameters = RequestParameters &
  HarvestDataListByFarmerIdQueryParam;

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
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type HarvestDataListParameters = RequestParameters & HarvestDataListQueryParam;
export type HarvestDataGetParameters = RequestParameters;

export interface HarvestDataCreateOrUpdateBodyParam {
  body?: HarvestData;
}

export type HarvestDataCreateOrUpdateParameters = RequestParameters &
  HarvestDataCreateOrUpdateBodyParam;
export type HarvestDataDeleteParameters = RequestParameters;

export interface ImageProcessingCreateRasterizeJobBodyParam {
  body?: ImageProcessingRasterizeJob;
}

export type ImageProcessingCreateRasterizeJobParameters = RequestParameters &
  ImageProcessingCreateRasterizeJobBodyParam;
export type ImageProcessingGetRasterizeJobParameters = RequestParameters;

export interface OAuthProvidersListQueryParamProperties {
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type OAuthProvidersListParameters = RequestParameters & OAuthProvidersListQueryParam;
export type OAuthProvidersGetParameters = RequestParameters;

export interface OAuthProvidersCreateOrUpdateBodyParam {
  body?: OAuthProvider;
}

export type OAuthProvidersCreateOrUpdateParameters = RequestParameters &
  OAuthProvidersCreateOrUpdateBodyParam;
export type OAuthProvidersDeleteParameters = RequestParameters;

export interface OAuthTokensListQueryParamProperties {
  /** Name of AuthProvider. */
  authProviderIds?: string[];
  /** List of farmers. */
  farmerIds?: string[];
  /** If the token object is valid. */
  isValid?: boolean;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type OAuthTokensListParameters = RequestParameters & OAuthTokensListQueryParam;

export interface OAuthTokensGetOAuthConnectionLinkBodyParam {
  body?: OAuthConnectRequest;
}

export type OAuthTokensGetOAuthConnectionLinkParameters = RequestParameters &
  OAuthTokensGetOAuthConnectionLinkBodyParam;
export type OAuthTokensGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface OAuthTokensCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the farmer. */
  farmerId: string;
  /** ID of the OAuthProvider. */
  oauthProviderId: string;
}

export interface OAuthTokensCreateCascadeDeleteJobQueryParam {
  queryParameters: OAuthTokensCreateCascadeDeleteJobQueryParamProperties;
}

export type OAuthTokensCreateCascadeDeleteJobParameters = RequestParameters &
  OAuthTokensCreateCascadeDeleteJobQueryParam;

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
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type PlantingDataListByFarmerIdParameters = RequestParameters &
  PlantingDataListByFarmerIdQueryParam;

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
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type PlantingDataListParameters = RequestParameters & PlantingDataListQueryParam;
export type PlantingDataGetParameters = RequestParameters;

export interface PlantingDataCreateOrUpdateBodyParam {
  body?: PlantingData;
}

export type PlantingDataCreateOrUpdateParameters = RequestParameters &
  PlantingDataCreateOrUpdateBodyParam;
export type PlantingDataDeleteParameters = RequestParameters;

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
  startDateTime?: Date;
  /** Scene end UTC datetime (inclusive), sample format: yyyy-MM-dThh:mm:ssZ. */
  endDateTime?: Date;
  /** Filter scenes with cloud coverage percentage less than max value. Range [0 to 100.0]. */
  maxCloudCoveragePercentage?: number;
  /** Filter scenes with dark pixel coverage percentage less than max value. Range [0 to 100.0]. */
  maxDarkPixelCoveragePercentage?: number;
  /** List of image names to be filtered. */
  imageNames?: string[];
  /** List of image resolutions in meters to be filtered. */
  imageResolutions?: number[];
  /** List of image formats to be filtered. */
  imageFormats?: string[];
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

export type ScenesListParameters = RequestParameters & ScenesListQueryParam;

export interface ScenesCreateSatelliteDataIngestionJobBodyParam {
  body?: SatelliteDataIngestionJob;
}

export type ScenesCreateSatelliteDataIngestionJobParameters = RequestParameters &
  ScenesCreateSatelliteDataIngestionJobBodyParam;
export type ScenesGetSatelliteDataIngestionJobDetailsParameters = RequestParameters;

export interface ScenesDownloadQueryParamProperties {
  /** cloud storage path of scene file. */
  filePath: string;
}

export interface ScenesDownloadQueryParam {
  queryParameters: ScenesDownloadQueryParamProperties;
}

export type ScenesDownloadParameters = RequestParameters & ScenesDownloadQueryParam;

export interface SeasonalFieldsListByFarmerIdQueryParamProperties {
  /** Farm Ids of the resource. */
  farmIds?: string[];
  /** Field Ids of the resource. */
  fieldIds?: string[];
  /** Season Ids of the resource. */
  seasonIds?: string[];
  /** CropVarietyIds of the resource. */
  cropVarietyIds?: string[];
  /** Ids of the crop it belongs to. */
  cropIds?: string[];
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
  minPlantingDateTime?: Date;
  /** Maximum planting datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxPlantingDateTime?: Date;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type SeasonalFieldsListByFarmerIdParameters = RequestParameters &
  SeasonalFieldsListByFarmerIdQueryParam;

export interface SeasonalFieldsListQueryParamProperties {
  /** Farm Ids of the resource. */
  farmIds?: string[];
  /** Field Ids of the resource. */
  fieldIds?: string[];
  /** Season Ids of the resource. */
  seasonIds?: string[];
  /** CropVarietyIds of the resource. */
  cropVarietyIds?: string[];
  /** Ids of the crop it belongs to. */
  cropIds?: string[];
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
  minPlantingDateTime?: Date;
  /** Maximum planting datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxPlantingDateTime?: Date;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type SeasonalFieldsListParameters = RequestParameters & SeasonalFieldsListQueryParam;
export type SeasonalFieldsGetParameters = RequestParameters;

export interface SeasonalFieldsCreateOrUpdateBodyParam {
  body?: SeasonalField;
}

export type SeasonalFieldsCreateOrUpdateParameters = RequestParameters &
  SeasonalFieldsCreateOrUpdateBodyParam;
export type SeasonalFieldsDeleteParameters = RequestParameters;
export type SeasonalFieldsGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface SeasonalFieldsCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the associated farmer. */
  farmerId: string;
  /** ID of the seasonalField to be deleted. */
  seasonalFieldId: string;
}

export interface SeasonalFieldsCreateCascadeDeleteJobQueryParam {
  queryParameters: SeasonalFieldsCreateCascadeDeleteJobQueryParamProperties;
}

export type SeasonalFieldsCreateCascadeDeleteJobParameters = RequestParameters &
  SeasonalFieldsCreateCascadeDeleteJobQueryParam;

export interface SeasonsListQueryParamProperties {
  /** Minimum season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minStartDateTime?: Date;
  /** Maximum season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxStartDateTime?: Date;
  /** Minimum season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  minEndDateTime?: Date;
  /** Maximum season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  maxEndDateTime?: Date;
  /** Years of the resource. */
  years?: number[];
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type SeasonsListParameters = RequestParameters & SeasonsListQueryParam;
export type SeasonsGetParameters = RequestParameters;

export interface SeasonsCreateOrUpdateBodyParam {
  body?: Season;
}

export type SeasonsCreateOrUpdateParameters = RequestParameters & SeasonsCreateOrUpdateBodyParam;
export type SeasonsDeleteParameters = RequestParameters;

export interface TillageDataListByFarmerIdQueryParamProperties {
  /** Minimum measured tillage depth (inclusive). */
  minTillageDepth?: number;
  /** Maximum measured tillage depth (inclusive). */
  maxTillageDepth?: number;
  /** Minimum pressure applied by a tillage implement (inclusive). */
  minTillagePressure?: number;
  /** Maximum pressure applied by a tillage implement (inclusive). */
  maxTillagePressure?: number;
  /** Sources of the operation data. */
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type TillageDataListByFarmerIdParameters = RequestParameters &
  TillageDataListByFarmerIdQueryParam;

export interface TillageDataListQueryParamProperties {
  /** Minimum measured tillage depth (inclusive). */
  minTillageDepth?: number;
  /** Maximum measured tillage depth (inclusive). */
  maxTillageDepth?: number;
  /** Minimum pressure applied by a tillage implement (inclusive). */
  minTillagePressure?: number;
  /** Maximum pressure applied by a tillage implement (inclusive). */
  maxTillagePressure?: number;
  /** Sources of the operation data. */
  sources?: string[];
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: string[];
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: string[];
  /** Minimum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationStartDateTime?: Date;
  /** Maximum start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationStartDateTime?: Date;
  /** Minimum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationEndDateTime?: Date;
  /** Maximum end date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationEndDateTime?: Date;
  /** Minimum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  minOperationModifiedDateTime?: Date;
  /** Maximum modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ (inclusive). */
  maxOperationModifiedDateTime?: Date;
  /** Minimum area for which operation was applied (inclusive). */
  minArea?: number;
  /** Maximum area for which operation was applied (inclusive). */
  maxArea?: number;
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "\{testKey\} eq \{testValue\}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
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

export type TillageDataListParameters = RequestParameters & TillageDataListQueryParam;
export type TillageDataGetParameters = RequestParameters;

export interface TillageDataCreateOrUpdateBodyParam {
  body?: TillageData;
}

export type TillageDataCreateOrUpdateParameters = RequestParameters &
  TillageDataCreateOrUpdateBodyParam;
export type TillageDataDeleteParameters = RequestParameters;

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
  startDateTime?: Date;
  /** Weather data end UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: Date;
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

export type WeatherListParameters = RequestParameters & WeatherListQueryParam;
export type WeatherGetDataIngestionJobDetailsParameters = RequestParameters;

export interface WeatherCreateDataIngestionJobBodyParam {
  body?: WeatherDataIngestionJob;
}

export type WeatherCreateDataIngestionJobParameters = RequestParameters &
  WeatherCreateDataIngestionJobBodyParam;
export type WeatherGetDataDeleteJobDetailsParameters = RequestParameters;

export interface WeatherCreateDataDeleteJobBodyParam {
  body?: WeatherDataDeleteJob;
}

export type WeatherCreateDataDeleteJobParameters = RequestParameters &
  WeatherCreateDataDeleteJobBodyParam;
