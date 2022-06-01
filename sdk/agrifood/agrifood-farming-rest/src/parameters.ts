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
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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

export type ApplicationDataListParameters = ApplicationDataListQueryParam & RequestParameters;
export type ApplicationDataGetParameters = RequestParameters;

export interface ApplicationDataCreateOrUpdateBodyParam {
  /** Application data resource payload to create or update. */
  body?: ApplicationData;
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
  /** Resource Types of the resource. */
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
  /**
   * File to be uploaded.
   *
   * Value may contain any sequence of octets
   */
  body?: string;
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
  body?: SearchBoundaryQuery;
}

export interface BoundariesSearchByFarmerIdMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BoundariesSearchByFarmerIdParameters = BoundariesSearchByFarmerIdMediaTypesParam &
  BoundariesSearchByFarmerIdBodyParam &
  RequestParameters;

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

export type BoundariesListParameters = BoundariesListQueryParam & RequestParameters;

export interface BoundariesSearchBodyParam {
  /** Query filters. */
  body?: SearchBoundaryQuery;
}

export interface BoundariesSearchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BoundariesSearchParameters = BoundariesSearchMediaTypesParam &
  BoundariesSearchBodyParam &
  RequestParameters;
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

export type BoundariesCreateCascadeDeleteJobParameters =
  BoundariesCreateCascadeDeleteJobQueryParam & RequestParameters;
export type BoundariesGetParameters = RequestParameters;

export interface BoundariesCreateOrUpdateBodyParam {
  /** Boundary resource payload to create or update. */
  body?: Boundary;
}

export interface BoundariesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type BoundariesCreateOrUpdateParameters = BoundariesCreateOrUpdateMediaTypesParam &
  BoundariesCreateOrUpdateBodyParam &
  RequestParameters;
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

export type BoundariesGetOverlapParameters = BoundariesGetOverlapQueryParam & RequestParameters;

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
  body?: Crop;
}

export interface CropsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CropsCreateOrUpdateParameters = CropsCreateOrUpdateMediaTypesParam &
  CropsCreateOrUpdateBodyParam &
  RequestParameters;
export type CropsDeleteParameters = RequestParameters;

export interface CropVarietiesListByCropIdQueryParamProperties {
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

export interface CropVarietiesListByCropIdQueryParam {
  queryParameters?: CropVarietiesListByCropIdQueryParamProperties;
}

export type CropVarietiesListByCropIdParameters = CropVarietiesListByCropIdQueryParam &
  RequestParameters;

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

export type CropVarietiesListParameters = CropVarietiesListQueryParam & RequestParameters;
export type CropVarietiesGetParameters = RequestParameters;

export interface CropVarietiesCreateOrUpdateBodyParam {
  /** Crop variety resource payload to create or update. */
  body?: CropVariety;
}

export interface CropVarietiesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type CropVarietiesCreateOrUpdateParameters = CropVarietiesCreateOrUpdateMediaTypesParam &
  CropVarietiesCreateOrUpdateBodyParam &
  RequestParameters;
export type CropVarietiesDeleteParameters = RequestParameters;

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
  body?: Farmer;
}

export interface FarmersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FarmersCreateOrUpdateParameters = FarmersCreateOrUpdateMediaTypesParam &
  FarmersCreateOrUpdateBodyParam &
  RequestParameters;
export type FarmersDeleteParameters = RequestParameters;
export type FarmersGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface FarmersCreateCascadeDeleteJobQueryParamProperties {
  /** ID of the farmer to be deleted. */
  farmerId: string;
}

export interface FarmersCreateCascadeDeleteJobQueryParam {
  queryParameters: FarmersCreateCascadeDeleteJobQueryParamProperties;
}

export type FarmersCreateCascadeDeleteJobParameters = FarmersCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface FarmOperationsCreateDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body?: FarmOperationDataIngestionJob;
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

export type FarmsListByFarmerIdParameters = FarmsListByFarmerIdQueryParam & RequestParameters;

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
export type FarmsGetParameters = RequestParameters;

export interface FarmsCreateOrUpdateBodyParam {
  /** Farm resource payload to create or update. */
  body?: Farm;
}

export interface FarmsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FarmsCreateOrUpdateParameters = FarmsCreateOrUpdateMediaTypesParam &
  FarmsCreateOrUpdateBodyParam &
  RequestParameters;
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

export type FarmsCreateCascadeDeleteJobParameters = FarmsCreateCascadeDeleteJobQueryParam &
  RequestParameters;

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

export type FieldsListByFarmerIdParameters = FieldsListByFarmerIdQueryParam & RequestParameters;

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
export type FieldsGetParameters = RequestParameters;

export interface FieldsCreateOrUpdateBodyParam {
  /** Field resource payload to create or update. */
  body?: Field;
}

export interface FieldsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type FieldsCreateOrUpdateParameters = FieldsCreateOrUpdateMediaTypesParam &
  FieldsCreateOrUpdateBodyParam &
  RequestParameters;
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

export type FieldsCreateCascadeDeleteJobParameters = FieldsCreateCascadeDeleteJobQueryParam &
  RequestParameters;

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
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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

export type HarvestDataListParameters = HarvestDataListQueryParam & RequestParameters;
export type HarvestDataGetParameters = RequestParameters;

export interface HarvestDataCreateOrUpdateBodyParam {
  /** Harvest data resource payload to create or update. */
  body?: HarvestData;
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
  body?: ImageProcessingRasterizeJob;
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

export type OAuthProvidersListParameters = OAuthProvidersListQueryParam & RequestParameters;
export type OAuthProvidersGetParameters = RequestParameters;

export interface OAuthProvidersCreateOrUpdateBodyParam {
  /** OauthProvider resource payload to create or update. */
  body?: OAuthProvider;
}

export interface OAuthProvidersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type OAuthProvidersCreateOrUpdateParameters = OAuthProvidersCreateOrUpdateMediaTypesParam &
  OAuthProvidersCreateOrUpdateBodyParam &
  RequestParameters;
export type OAuthProvidersDeleteParameters = RequestParameters;

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

export type OAuthTokensListParameters = OAuthTokensListQueryParam & RequestParameters;

export interface OAuthTokensGetOAuthConnectionLinkBodyParam {
  /** OAuth Connect Request. */
  body?: OAuthConnectRequest;
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
  /** ID of the farmer. */
  farmerId: string;
  /** ID of the OAuthProvider. */
  oauthProviderId: string;
}

export interface OAuthTokensCreateCascadeDeleteJobQueryParam {
  queryParameters: OAuthTokensCreateCascadeDeleteJobQueryParamProperties;
}

export type OAuthTokensCreateCascadeDeleteJobParameters =
  OAuthTokensCreateCascadeDeleteJobQueryParam & RequestParameters;

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
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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

export type PlantingDataListParameters = PlantingDataListQueryParam & RequestParameters;
export type PlantingDataGetParameters = RequestParameters;

export interface PlantingDataCreateOrUpdateBodyParam {
  /** Planting data resource payload to create or update. */
  body?: PlantingData;
}

export interface PlantingDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type PlantingDataCreateOrUpdateParameters = PlantingDataCreateOrUpdateMediaTypesParam &
  PlantingDataCreateOrUpdateBodyParam &
  RequestParameters;
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

export interface ScenesCreateSatelliteDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body?: SatelliteDataIngestionJob;
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

export interface ScenesDownloadQueryParamProperties {
  /** cloud storage path of scene file. */
  filePath: string;
}

export interface ScenesDownloadQueryParam {
  queryParameters: ScenesDownloadQueryParamProperties;
}

export type ScenesDownloadParameters = ScenesDownloadQueryParam & RequestParameters;

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

export type SeasonalFieldsListParameters = SeasonalFieldsListQueryParam & RequestParameters;
export type SeasonalFieldsGetParameters = RequestParameters;

export interface SeasonalFieldsCreateOrUpdateBodyParam {
  /** Seasonal field resource payload to create or update. */
  body?: SeasonalField;
}

export interface SeasonalFieldsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SeasonalFieldsCreateOrUpdateParameters = SeasonalFieldsCreateOrUpdateMediaTypesParam &
  SeasonalFieldsCreateOrUpdateBodyParam &
  RequestParameters;
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
  body?: Season;
}

export interface SeasonsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type SeasonsCreateOrUpdateParameters = SeasonsCreateOrUpdateMediaTypesParam &
  SeasonsCreateOrUpdateBodyParam &
  RequestParameters;
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
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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
  sources?: Array<string>;
  /** Boundary IDs associated with operation data. */
  associatedBoundaryIds?: Array<string>;
  /** Operation boundary IDs associated with operation data. */
  operationBoundaryIds?: Array<string>;
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

export type TillageDataListParameters = TillageDataListQueryParam & RequestParameters;
export type TillageDataGetParameters = RequestParameters;

export interface TillageDataCreateOrUpdateBodyParam {
  /** Tillage data resource payload to create or update. */
  body?: TillageData;
}

export interface TillageDataCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TillageDataCreateOrUpdateParameters = TillageDataCreateOrUpdateMediaTypesParam &
  TillageDataCreateOrUpdateBodyParam &
  RequestParameters;
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
export type WeatherGetDataIngestionJobDetailsParameters = RequestParameters;

export interface WeatherCreateDataIngestionJobBodyParam {
  /** Job parameters supplied by user. */
  body?: WeatherDataIngestionJob;
}

export interface WeatherCreateDataIngestionJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WeatherCreateDataIngestionJobParameters = WeatherCreateDataIngestionJobMediaTypesParam &
  WeatherCreateDataIngestionJobBodyParam &
  RequestParameters;
export type WeatherGetDataDeleteJobDetailsParameters = RequestParameters;

export interface WeatherCreateDataDeleteJobBodyParam {
  /** Job parameters supplied by user. */
  body?: WeatherDataDeleteJob;
}

export interface WeatherCreateDataDeleteJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WeatherCreateDataDeleteJobParameters = WeatherCreateDataDeleteJobMediaTypesParam &
  WeatherCreateDataDeleteJobBodyParam &
  RequestParameters;
