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
  /** Application data with average material greater than or equal to the value specified will be returned. */
  minAvgMaterial?: number;
  /** Application data with average material lesser than or equal to the value specified will be returned. */
  maxAvgMaterial?: number;
  /** Application data with total material greater than or equal to the value specified will be returned. */
  minTotalMaterial?: number;
  /** Application data with total material lesser than or equal to the value specified will be returned. */
  maxTotalMaterial?: number;
  /** Application data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the application operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the application operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Application operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Application operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Application operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Application operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Application operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Application operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Application operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Application operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of application operations to be returned. */
  ids?: Array<string>;
  /** List of names of application operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Application data with only given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned. */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned. */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned. */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned. */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Application data with average material greater than or equal to the value specified will be returned. */
  minAvgMaterial?: number;
  /**  Application data with average material lesser than or equal to the value specified will be returned. */
  maxAvgMaterial?: number;
  /** Application data with total material greater than or equal to the value specified will be returned. */
  minTotalMaterial?: number;
  /** Application data with total material lesser than or equal to the value specified will be returned. */
  maxTotalMaterial?: number;
  /** Application data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the application operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the application operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Application operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Application operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Application operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Application operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Application operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Application operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Application operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Application operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of application operations to be returned. */
  ids?: Array<string>;
  /** List of names of application operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Application data with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Application data resource payload to Create or update. */
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
export type ApplicationDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface ApplicationDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the application data resource. */
  applicationDataId: string;
}

export interface ApplicationDataCreateCascadeDeleteJobQueryParam {
  queryParameters: ApplicationDataCreateCascadeDeleteJobQueryParamProperties;
}

export type ApplicationDataCreateCascadeDeleteJobParameters =
  ApplicationDataCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface AttachmentsListByFarmerIdQueryParamProperties {
  /** Attachments belonging to the given list of resources will be returned. */
  resourceIds?: Array<string>;
  /** Attachments belonging to the resources of the given resource types will be returned. Valid values are Farmer, Farm, Field, SeasonalField, Boundary, ApplicationData, HarvestData, TillageDat and PlantingData. */
  resourceTypes?: Array<string>;
  /** Ids of the attachments to be returned. */
  ids?: Array<string>;
  /** List of names of attachments to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Attachments with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Attachments created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Attachments created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Attachments last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Attachments last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
   * File to be uploaded.
   *
   * Value may contain any sequence of octets
   */
  file?: string | Uint8Array;
  /** Id of the associated farmer. */
  FarmerId?: string;
  /** This is the Id of the resource to which the attachment belongs. Ids of following entities are valid: Farmer, Farm, Field, Seasonal field, Boundary, Application data, Harvest data, Tillage data and Planting data. */
  ResourceId?: string;
  /** Indicates the type of resource to which this attachment belongs. Valid values are Farmer, Farm, Field, SeasonalField, Boundary, ApplicationData, HarvestData, TillageDat and PlantingData. */
  ResourceType?: string;
  /** Original file name of the attachment. */
  OriginalFileName?: string;
  /** Unique Id of the attachment. This Id is unique for a given farmer. */
  Id?: string;
  /** User provided status of the attachment. */
  Status?: string;
  /** UTC Date-time at which the attachment was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  CreatedDateTime?: string;
  /** UTC Date-time at which the attachment was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  ModifiedDateTime?: string;
  /** Name of the attachment. */
  Name?: string;
  /** Brief description of the attachment. */
  Description?: string;
  /** ETag value can be used to implement optimistic concurrency. */
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

export interface BoundariesListByFarmerIdQueryParamProperties {
  /** If set, only primary boundaries are returned. */
  isPrimary?: boolean;
  /** Boundaries with given parent types are returned. VAlid values are 'Field' and 'SeasonalField'. */
  parentType?: string;
  /** Boundaries associated with the given parent Ids are returned. */
  parentIds?: Array<string>;
  /** Boundaries with acreage equal to or greater than the given value are returned. */
  minAcreage?: number;
  /** Boundaries with acreage equal to or lesser than the given value are returned. */
  maxAcreage?: number;
  /** List of Ids of boundaries to be returned. */
  ids?: Array<string>;
  /** List of names of boundaries to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Boundaries with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** If set, only primary boundaries are returned. */
  isPrimary?: boolean;
  /** Boundaries with given parent types are returned. VAlid values are 'Field' and 'SeasonalField'. */
  parentType?: string;
  /** Boundaries associated with the given parent Ids are returned. */
  parentIds?: Array<string>;
  /** Boundaries with acreage equal to or greater than the given value are returned. */
  minAcreage?: number;
  /** Boundaries with acreage equal to or lesser than the given value are returned. */
  maxAcreage?: number;
  /** List of Ids of boundaries to be returned. */
  ids?: Array<string>;
  /** List of names of boundaries to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Boundaries with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the boundary to be deleted. */
  boundaryId: string;
}

export interface BoundariesCreateCascadeDeleteJobQueryParam {
  queryParameters: BoundariesCreateCascadeDeleteJobQueryParamProperties;
}

export type BoundariesCreateCascadeDeleteJobParameters =
  BoundariesCreateCascadeDeleteJobQueryParam & RequestParameters;
export type BoundariesGetParameters = RequestParameters;

export interface BoundariesCreateOrUpdateBodyParam {
  /** Boundary resource payload to Create or update. */
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
  /** Id of the farmer associated with the other boundary. */
  otherFarmerId: string;
  /** Id of the other boundary. */
  otherBoundaryId: string;
}

export interface BoundariesGetOverlapQueryParam {
  queryParameters: BoundariesGetOverlapQueryParamProperties;
}

export type BoundariesGetOverlapParameters = BoundariesGetOverlapQueryParam & RequestParameters;

export interface CropsListQueryParamProperties {
  /** Crops with the given list of phenotypes are returned. */
  phenotypes?: Array<string>;
  /** List of Ids of crops to be returned. */
  ids?: Array<string>;
  /** List of names of crops to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Crops with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Crop varieties associated with the given list of crop ids are returned. */
  cropIds?: Array<string>;
  /** Crop varieties associated with the given list of brands are returned. */
  brands?: Array<string>;
  /** Crop varieties associated with the given list of products are returned. */
  products?: Array<string>;
  /** List of Ids of crop varieties to be returned. */
  ids?: Array<string>;
  /** List of names of crop varieties to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Crop varieties with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Crop varieties associated with the given list of crop ids are returned. */
  cropIds?: Array<string>;
  /** Crop varieties associated with the given list of brands are returned. */
  brands?: Array<string>;
  /** Crop varieties associated with the given list of products are returned. */
  products?: Array<string>;
  /** List of Ids of crop varieties to be returned. */
  ids?: Array<string>;
  /** List of names of crop varieties to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Crop varieties with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** List of Ids of farmers to be returned. */
  ids?: Array<string>;
  /** List of names of farmers to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Farmers with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Id of the farmer to be deleted. */
  farmerId: string;
}

export interface FarmersCreateCascadeDeleteJobQueryParam {
  queryParameters: FarmersCreateCascadeDeleteJobQueryParamProperties;
}

export type FarmersCreateCascadeDeleteJobParameters = FarmersCreateCascadeDeleteJobQueryParam &
  RequestParameters;

export interface FarmOperationsCreateDataIngestionJobBodyParam {
  /** Job parameters supplied by the user. */
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
  /** List of Ids of farms to be returned. */
  ids?: Array<string>;
  /** List of names of farms to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Farms with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface FarmsListByFarmerIdQueryParam {
  queryParameters?: FarmsListByFarmerIdQueryParamProperties;
}

export type FarmsListByFarmerIdParameters = FarmsListByFarmerIdQueryParam & RequestParameters;

export interface FarmsListQueryParamProperties {
  /** List of Ids of farms to be returned. */
  ids?: Array<string>;
  /** List of names of farms to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Farms with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Fields associated with the given list of farms are returned. */
  farmIds?: Array<string>;
  /** List of Ids of fields to be returned. */
  ids?: Array<string>;
  /** List of names of fields to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Fields with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface FieldsListByFarmerIdQueryParam {
  queryParameters?: FieldsListByFarmerIdQueryParamProperties;
}

export type FieldsListByFarmerIdParameters = FieldsListByFarmerIdQueryParam & RequestParameters;

export interface FieldsListQueryParamProperties {
  /** Fields associated with the given list of farms are returned. */
  farmIds?: Array<string>;
  /** List of Ids of fields to be returned. */
  ids?: Array<string>;
  /** List of names of fields to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Fields with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Field resource payload to Create or update. */
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
  /** Id of the associated farmer. */
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
  /** Harvest data with total yield greater than or equal to the value specified will be returned. */
  minTotalYield?: number;
  /** Harvest data with total yield lesser than or equal to the value specified will be returned. */
  maxTotalYield?: number;
  /** Harvest data with average yield greater than or equal to the value specified will be returned. */
  minAvgYield?: number;
  /** Harvest data with average yield lesser than or equal to the value specified will be returned. */
  maxAvgYield?: number;
  /** Harvest data with total wet mass greater than or equal to the value specified will be returned. */
  minTotalWetMass?: number;
  /** Harvest data with total wet mass lesser than or equal to the value specified will be returned. */
  maxTotalWetMass?: number;
  /** Harvest data with average wet mass greater than or equal to the value specified will be returned. */
  minAvgWetMass?: number;
  /** Harvest data with average wet mass lesser than or equal to the value specified will be returned. */
  maxAvgWetMass?: number;
  /** Harvest data with average moisture greater than or equal to the value specified will be returned. */
  minAvgMoisture?: number;
  /** Harvest data with average moisture lesser than or equal to the value specified will be returned. */
  maxAvgMoisture?: number;
  /** Harvest data with average speed greater than or equal to the value specified will be returned. */
  minAvgSpeed?: number;
  /** Harvest data with average speed lesser than or equal to the value specified will be returned. */
  maxAvgSpeed?: number;
  /** Harvest data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the harvest operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the harvest operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Harvest operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Harvest operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Harvest operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Harvest operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Harvest operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Harvest operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Harvest operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Harvest operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of harvest operations to be returned. */
  ids?: Array<string>;
  /** List of names of harvest operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Harvest data with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Harvest data with total yield greater than or equal to the value specified will be returned. */
  minTotalYield?: number;
  /** Harvest data with total yield lesser than or equal to the value specified will be returned. */
  maxTotalYield?: number;
  /** Harvest data with average yield greater than or equal to the value specified will be returned. */
  minAvgYield?: number;
  /** Harvest data with average yield lesser than or equal to the value specified will be returned. */
  maxAvgYield?: number;
  /** Harvest data with total wet mass greater than or equal to the value specified will be returned. */
  minTotalWetMass?: number;
  /** Harvest data with total wet mass lesser than or equal to the value specified will be returned. */
  maxTotalWetMass?: number;
  /** Harvest data with average wet mass greater than or equal to the value specified will be returned. */
  minAvgWetMass?: number;
  /** Harvest data with average wet mass lesser than or equal to the value specified will be returned. */
  maxAvgWetMass?: number;
  /** Harvest data with average moisture greater than or equal to the value specified will be returned. */
  minAvgMoisture?: number;
  /** Harvest data with average moisture lesser than or equal to the value specified will be returned. */
  maxAvgMoisture?: number;
  /** Harvest data with average speed greater than or equal to the value specified will be returned. */
  minAvgSpeed?: number;
  /** Harvest data with average speed lesser than or equal to the value specified will be returned. */
  maxAvgSpeed?: number;
  /** Harvest data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the harvest operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the harvest operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Harvest operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Harvest operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Harvest operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Harvest operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Harvest operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Harvest operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Harvest operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Harvest operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of harvest operations to be returned. */
  ids?: Array<string>;
  /** List of names of harvest operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Harvest data with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Harvest data resource payload to Create or update. */
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
export type HarvestDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface HarvestDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the harvest data resource. */
  harvestDataId: string;
}

export interface HarvestDataCreateCascadeDeleteJobQueryParam {
  queryParameters: HarvestDataCreateCascadeDeleteJobQueryParamProperties;
}

export type HarvestDataCreateCascadeDeleteJobParameters =
  HarvestDataCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface ImageProcessingCreateRasterizeJobBodyParam {
  /** Job parameters supplied by the user. */
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
  /** List of Ids of OAuth providers to be returned. */
  ids?: Array<string>;
  /** List of names of OAuth providers to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** OAuth providers with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** OauthProvider resource payload to Create or update. */
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
export type OAuthProvidersGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface OAuthProvidersCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the OAuth provider resource. */
  oauthProviderId: string;
}

export interface OAuthProvidersCreateCascadeDeleteJobQueryParam {
  queryParameters: OAuthProvidersCreateCascadeDeleteJobQueryParamProperties;
}

export type OAuthProvidersCreateCascadeDeleteJobParameters =
  OAuthProvidersCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface OAuthTokensListQueryParamProperties {
  /** List of Ids of OAuth providers to be returned. */
  authProviderIds?: Array<string>;
  /** List of Ids of associated farmers. */
  farmerIds?: Array<string>;
  /** If set, only valid (non expired) OAuth tokens are returned. */
  isValid?: boolean;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the OAuth provider resource. */
  oauthProviderId: string;
}

export interface OAuthTokensCreateCascadeDeleteJobQueryParam {
  queryParameters: OAuthTokensCreateCascadeDeleteJobQueryParamProperties;
}

export type OAuthTokensCreateCascadeDeleteJobParameters =
  OAuthTokensCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface PlantingDataListByFarmerIdQueryParamProperties {
  /** Planting data with average planting rate greater than or equal to the value specified will be returned. */
  minAvgPlantingRate?: number;
  /** Planting data with average planting rate lesser than or equal to the value specified will be returned. */
  maxAvgPlantingRate?: number;
  /** Planting data with total material greater than or equal to the value specified will be returned. */
  minTotalMaterial?: number;
  /** Planting data with total material lesser than or equal to the value specified will be returned. */
  maxTotalMaterial?: number;
  /** Planting data with average material greater than or equal to the value specified will be returned. */
  minAvgMaterial?: number;
  /** Planting data with total material lesser than or equal to the value specified will be returned. */
  maxAvgMaterial?: number;
  /** Planting data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the planting operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the planting operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Planting operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Planting operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Planting operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Planting operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Planting operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Planting operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Planting operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Planting operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of planting operations to be returned. */
  ids?: Array<string>;
  /** List of names of planting operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Planting data with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Planting data with average planting rate greater than or equal to the value specified will be returned. */
  minAvgPlantingRate?: number;
  /** Planting data with average planting rate lesser than or equal to the value specified will be returned. */
  maxAvgPlantingRate?: number;
  /** Planting data with total material greater than or equal to the value specified will be returned. */
  minTotalMaterial?: number;
  /** Planting data with total material lesser than or equal to the value specified will be returned. */
  maxTotalMaterial?: number;
  /** Planting data with average material greater than or equal to the value specified will be returned. */
  minAvgMaterial?: number;
  /** Planting data with average material lesser than or equal to the value specified will be returned. */
  maxAvgMaterial?: number;
  /** Planting data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the planting operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the planting operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Planting operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Planting operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Planting operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Planting operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Planting operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Planting operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Planting operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Planting operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of planting operations to be returned. */
  ids?: Array<string>;
  /** List of names of planting operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Planting data with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Planting data resource payload to Create or update. */
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
export type PlantingDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface PlantingDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the planting data resource. */
  plantingDataId: string;
}

export interface PlantingDataCreateCascadeDeleteJobQueryParam {
  queryParameters: PlantingDataCreateCascadeDeleteJobQueryParamProperties;
}

export type PlantingDataCreateCascadeDeleteJobParameters =
  PlantingDataCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface ScenesListQueryParamProperties {
  /** Name of the data provider for the scene. For satellite imagery, this refers to the name of the satellite data provider. */
  provider: string;
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the associated boundary. */
  boundaryId: string;
  /** Source from where the scene was procured/generated. For satellite imagery, this refers to the name of the satellite constellation. */
  source?: string;
  /** Scenes that were captured/made available (at source) at or after this UTC Date-time is returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  startDateTime?: Date | string;
  /** Scenes that were captured/made available (at source) at or before this UTC Date-time is returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  endDateTime?: Date | string;
  /** Scenes with cloud cover less than or equal to the given value are returned. Range [0 to 100.0]. */
  maxCloudCoveragePercentage?: number;
  /** Scenes with dark pixel cover less than or equal to the given value are returned. Range [0 to 100.0]. */
  maxDarkPixelCoveragePercentage?: number;
  /**
   * List of names of images to be fetched.
   * For Sentinel-2, allowed values are: 'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B8A', 'B09', 'B11', 'B12', 'AOT', 'SCL', 'SNW', 'CLD', 'NDVI', 'NDWI', 'EVI', 'LAI', 'LAIMask', 'CLP', 'CLM', 'dataMask', sunAzimuthAngles, sunZenithAngles, viewAzimuthMean and viewZenithMean.
   */
  imageNames?: Array<string>;
  /** List of image resolutions in meters. For Sentinel-2, available values are: 10, 20, 60. */
  imageResolutions?: Array<number>;
  /** Format in which the scenes are to be returned. Available value: TIF. */
  imageFormats?: Array<string>;
  /** Maximum number of items to be returned in a single page. */
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
}

export interface ScenesListQueryParam {
  queryParameters: ScenesListQueryParamProperties;
}

export type ScenesListParameters = ScenesListQueryParam & RequestParameters;

export interface ScenesCreateSatelliteDataIngestionJobBodyParam {
  /** Job parameters supplied by the user. */
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
  /** Relative path where the scene is stored in cloud storage. */
  filePath: string;
}

export interface ScenesDownloadQueryParam {
  queryParameters: ScenesDownloadQueryParamProperties;
}

export type ScenesDownloadParameters = ScenesDownloadQueryParam & RequestParameters;

export interface SeasonalFieldsListByFarmerIdQueryParamProperties {
  /** Seasonal fields associated with the given farms are returned. */
  farmIds?: Array<string>;
  /** Seasonal fields associated with the given fields are returned. */
  fieldIds?: Array<string>;
  /** Seasonal fields associated with the given seasons are returned. */
  seasonIds?: Array<string>;
  /** Seasonal fields associated with at least one of the given crop varieties are returned. */
  cropVarietyIds?: Array<string>;
  /** Seasonal fields associated with at least one of the given crops are returned. */
  cropIds?: Array<string>;
  /** Seasonal fields with average yield greater than or equal to the value specified will be returned. */
  minAvgYieldValue?: number;
  /** Seasonal fields with average yield lesser than or equal to the value specified will be returned. */
  maxAvgYieldValue?: number;
  /** Unit of the average yield. */
  avgYieldUnit?: string;
  /** Seasonal fields with average seed population greater than or equal to the value specified will be returned. */
  minAvgSeedPopulationValue?: number;
  /** Seasonal fields with average seed population lesser than or equal to the value specified will be returned. */
  maxAvgSeedPopulationValue?: number;
  /** Unit of average seed population. */
  avgSeedPopulationUnit?: string;
  /** Seasonal fields with planting date at or after the value specified will be returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minPlantingDateTime?: Date | string;
  /** Seasonal fields with planting date at or before the value specified will be returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxPlantingDateTime?: Date | string;
  /** List of Ids of seasonal fields to be returned. */
  ids?: Array<string>;
  /** List of names of seasonal fields to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Seasonal fields with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Seasonal fields associated with the given farms are returned. */
  farmIds?: Array<string>;
  /** Seasonal fields associated with the given fields are returned. */
  fieldIds?: Array<string>;
  /** Seasonal fields associated with the given seasons are returned. */
  seasonIds?: Array<string>;
  /** Seasonal fields associated with at least one of the given crop varieties are returned. */
  cropVarietyIds?: Array<string>;
  /** Seasonal fields associated with at least one of the given crops are returned. */
  cropIds?: Array<string>;
  /** Seasonal fields with average yield greater than or equal to the value specified will be returned. */
  minAvgYieldValue?: number;
  /** Seasonal fields with average yield lesser than or equal to the value specified will be returned. */
  maxAvgYieldValue?: number;
  /** Unit of the average yield. */
  avgYieldUnit?: string;
  /** Seasonal fields with average seed population greater than or equal to the value specified will be returned. */
  minAvgSeedPopulationValue?: number;
  /** Seasonal fields with average seed population lesser than or equal to the value specified will be returned. */
  maxAvgSeedPopulationValue?: number;
  /** Unit of average seed population. */
  avgSeedPopulationUnit?: string;
  /** Seasonal fields with planting date at or after the value specified will be returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minPlantingDateTime?: Date | string;
  /** Seasonal fields with planting date at or before the value specified will be returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxPlantingDateTime?: Date | string;
  /** List of Ids of seasonal fields to be returned. */
  ids?: Array<string>;
  /** List of names of seasonal fields to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Seasonal fields with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Seasonal field resource payload to Create or update. */
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
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the seasonal field to be deleted. */
  seasonalFieldId: string;
}

export interface SeasonalFieldsCreateCascadeDeleteJobQueryParam {
  queryParameters: SeasonalFieldsCreateCascadeDeleteJobQueryParamProperties;
}

export type SeasonalFieldsCreateCascadeDeleteJobParameters =
  SeasonalFieldsCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface SeasonsListQueryParamProperties {
  /** Seasons which start at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minStartDateTime?: Date | string;
  /** Seasons which start at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxStartDateTime?: Date | string;
  /** Seasons which end at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minEndDateTime?: Date | string;
  /** Seasons which end at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxEndDateTime?: Date | string;
  /** Seasons with given list of years are returned. */
  years?: Array<number>;
  /** List of Ids of seasons to be returned. */
  ids?: Array<string>;
  /** List of names of seasons to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Seasons with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Season resource payload to Create or update. */
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
  /** Tillage data with tillage depth greater than or equal to the value specified will be returned. */
  minTillageDepth?: number;
  /** Tillage data with tillage depth lesser than or equal to the value specified will be returned. */
  maxTillageDepth?: number;
  /** Tillage data with tillage pressure greater than or equal to the value specified will be returned. */
  minTillagePressure?: number;
  /** Tillage data with tillage pressure lesser than or equal to the value specified will be returned. */
  maxTillagePressure?: number;
  /** Tillage data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the tillage operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the tillage operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Tillage operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Tillage operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Tillage operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Tillage operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Tillage operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Tillage operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Tillage operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Tillage operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of tillage operations to be returned. */
  ids?: Array<string>;
  /** List of names of tillage operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Tillage data with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Tillage data with tillage depth greater than or equal to the value specified will be returned. */
  minTillageDepth?: number;
  /** Tillage data with tillage depth lesser than or equal to the value specified will be returned. */
  maxTillageDepth?: number;
  /** Tillage data with tillage pressure greater than or equal to the value specified will be returned. */
  minTillagePressure?: number;
  /** Tillage data with tillage pressure lesser than or equal to the value specified will be returned. */
  maxTillagePressure?: number;
  /** Tillage data obtained from the given list of sources will be returned. */
  sources?: Array<string>;
  /** List of boundary Ids of the field/seasonal field on which the tillage operation was done. */
  associatedBoundaryIds?: Array<string>;
  /** List of the boundary Ids that were created using the geographical area on which the tillage operation was carried out. */
  operationBoundaryIds?: Array<string>;
  /** Tillage operations that began at or after the given UTC date-time is returned. */
  minOperationStartDateTime?: Date | string;
  /** Tillage operations that began at or before the given UTC date-time is returned. */
  maxOperationStartDateTime?: Date | string;
  /** Tillage operations that ended at or after the given UTC date-time is returned. */
  minOperationEndDateTime?: Date | string;
  /** Tillage operations that ended at or before the given UTC date-time is returned. */
  maxOperationEndDateTime?: Date | string;
  /** Tillage operations that were modified (at source) at or after the given UTC date-time is returned. */
  minOperationModifiedDateTime?: Date | string;
  /** Tillage operations that were modified (at source) at or before the given UTC date-time is returned. */
  maxOperationModifiedDateTime?: Date | string;
  /** Tillage operations carried over area greater than or equal to the given value is returned. */
  minArea?: number;
  /** Tillage operations carried over area lesser than or equal to the given value is returned. */
  maxArea?: number;
  /** List of Ids of tillage operations to be returned. */
  ids?: Array<string>;
  /** List of names of tillage operations to be returned. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Tillage data with only the given statuses are returned. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Tillage data resource payload to Create or update. */
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
export type TillageDataGetCascadeDeleteJobDetailsParameters = RequestParameters;

export interface TillageDataCreateCascadeDeleteJobQueryParamProperties {
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the tillage data resource. */
  tillageDataId: string;
}

export interface TillageDataCreateCascadeDeleteJobQueryParam {
  queryParameters: TillageDataCreateCascadeDeleteJobQueryParamProperties;
}

export type TillageDataCreateCascadeDeleteJobParameters =
  TillageDataCreateCascadeDeleteJobQueryParam & RequestParameters;

export interface WeatherListQueryParamProperties {
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the associated boundary. */
  boundaryId: string;
  /** Id of the weather extension. This signifies the source from where the weather data is fetched (eg. DTN.ClearAg). */
  extensionId: string;
  /** Type of weather data (forecast/historical). */
  weatherDataType: string;
  /** Granularity of weather data (daily/hourly). */
  granularity: string;
  /** Weather data at or after the given UTC Date-time will be returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  startDateTime?: Date | string;
  /** Weather data at or before the given UTC Date-time will be returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  endDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
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
  /** Job parameters supplied by the user. */
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
  /** Job parameters supplied by the user. */
  body?: WeatherDataDeleteJob;
}

export interface WeatherCreateDataDeleteJobMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WeatherCreateDataDeleteJobParameters = WeatherCreateDataDeleteJobMediaTypesParam &
  WeatherCreateDataDeleteJobBodyParam &
  RequestParameters;
