// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ApplicationDataListByFarmerIdParameters,
  ApplicationDataListParameters,
  ApplicationDataGetParameters,
  ApplicationDataCreateOrUpdateParameters,
  ApplicationDataDeleteParameters,
  ApplicationDataGetCascadeDeleteJobDetailsParameters,
  ApplicationDataCreateCascadeDeleteJobParameters,
  AttachmentsListByFarmerIdParameters,
  AttachmentsGetParameters,
  AttachmentsCreateOrUpdateParameters,
  AttachmentsDeleteParameters,
  AttachmentsDownloadParameters,
  BoundariesListByFarmerIdParameters,
  BoundariesSearchByFarmerIdParameters,
  BoundariesListParameters,
  BoundariesSearchParameters,
  BoundariesGetCascadeDeleteJobDetailsParameters,
  BoundariesCreateCascadeDeleteJobParameters,
  BoundariesGetParameters,
  BoundariesCreateOrUpdateParameters,
  BoundariesDeleteParameters,
  BoundariesGetOverlapParameters,
  CropsListParameters,
  CropsGetParameters,
  CropsCreateOrUpdateParameters,
  CropsDeleteParameters,
  CropVarietiesListByCropIdParameters,
  CropVarietiesListParameters,
  CropVarietiesGetParameters,
  CropVarietiesCreateOrUpdateParameters,
  CropVarietiesDeleteParameters,
  FarmersListParameters,
  FarmersGetParameters,
  FarmersCreateOrUpdateParameters,
  FarmersDeleteParameters,
  FarmersGetCascadeDeleteJobDetailsParameters,
  FarmersCreateCascadeDeleteJobParameters,
  FarmOperationsCreateDataIngestionJobParameters,
  FarmOperationsGetDataIngestionJobDetailsParameters,
  FarmsListByFarmerIdParameters,
  FarmsListParameters,
  FarmsGetParameters,
  FarmsCreateOrUpdateParameters,
  FarmsDeleteParameters,
  FarmsGetCascadeDeleteJobDetailsParameters,
  FarmsCreateCascadeDeleteJobParameters,
  FieldsListByFarmerIdParameters,
  FieldsListParameters,
  FieldsGetParameters,
  FieldsCreateOrUpdateParameters,
  FieldsDeleteParameters,
  FieldsGetCascadeDeleteJobDetailsParameters,
  FieldsCreateCascadeDeleteJobParameters,
  HarvestDataListByFarmerIdParameters,
  HarvestDataListParameters,
  HarvestDataGetParameters,
  HarvestDataCreateOrUpdateParameters,
  HarvestDataDeleteParameters,
  HarvestDataGetCascadeDeleteJobDetailsParameters,
  HarvestDataCreateCascadeDeleteJobParameters,
  ImageProcessingCreateRasterizeJobParameters,
  ImageProcessingGetRasterizeJobParameters,
  OAuthProvidersListParameters,
  OAuthProvidersGetParameters,
  OAuthProvidersCreateOrUpdateParameters,
  OAuthProvidersDeleteParameters,
  OAuthProvidersGetCascadeDeleteJobDetailsParameters,
  OAuthProvidersCreateCascadeDeleteJobParameters,
  OAuthTokensListParameters,
  OAuthTokensGetOAuthConnectionLinkParameters,
  OAuthTokensGetCascadeDeleteJobDetailsParameters,
  OAuthTokensCreateCascadeDeleteJobParameters,
  PlantingDataListByFarmerIdParameters,
  PlantingDataListParameters,
  PlantingDataGetParameters,
  PlantingDataCreateOrUpdateParameters,
  PlantingDataDeleteParameters,
  PlantingDataGetCascadeDeleteJobDetailsParameters,
  PlantingDataCreateCascadeDeleteJobParameters,
  ScenesListParameters,
  ScenesCreateSatelliteDataIngestionJobParameters,
  ScenesGetSatelliteDataIngestionJobDetailsParameters,
  ScenesDownloadParameters,
  SeasonalFieldsListByFarmerIdParameters,
  SeasonalFieldsListParameters,
  SeasonalFieldsGetParameters,
  SeasonalFieldsCreateOrUpdateParameters,
  SeasonalFieldsDeleteParameters,
  SeasonalFieldsGetCascadeDeleteJobDetailsParameters,
  SeasonalFieldsCreateCascadeDeleteJobParameters,
  SeasonsListParameters,
  SeasonsGetParameters,
  SeasonsCreateOrUpdateParameters,
  SeasonsDeleteParameters,
  TillageDataListByFarmerIdParameters,
  TillageDataListParameters,
  TillageDataGetParameters,
  TillageDataCreateOrUpdateParameters,
  TillageDataDeleteParameters,
  TillageDataGetCascadeDeleteJobDetailsParameters,
  TillageDataCreateCascadeDeleteJobParameters,
  WeatherListParameters,
  WeatherGetDataIngestionJobDetailsParameters,
  WeatherCreateDataIngestionJobParameters,
  WeatherGetDataDeleteJobDetailsParameters,
  WeatherCreateDataDeleteJobParameters,
} from "./parameters";
import {
  ApplicationDataListByFarmerId200Response,
  ApplicationDataListByFarmerIddefaultResponse,
  ApplicationDataList200Response,
  ApplicationDataListdefaultResponse,
  ApplicationDataGet200Response,
  ApplicationDataGetdefaultResponse,
  ApplicationDataCreateOrUpdate200Response,
  ApplicationDataCreateOrUpdate201Response,
  ApplicationDataCreateOrUpdatedefaultResponse,
  ApplicationDataDelete204Response,
  ApplicationDataDeletedefaultResponse,
  ApplicationDataGetCascadeDeleteJobDetails200Response,
  ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse,
  ApplicationDataCreateCascadeDeleteJob202Response,
  ApplicationDataCreateCascadeDeleteJobdefaultResponse,
  AttachmentsListByFarmerId200Response,
  AttachmentsListByFarmerIddefaultResponse,
  AttachmentsGet200Response,
  AttachmentsGetdefaultResponse,
  AttachmentsCreateOrUpdate200Response,
  AttachmentsCreateOrUpdate201Response,
  AttachmentsCreateOrUpdatedefaultResponse,
  AttachmentsDelete204Response,
  AttachmentsDeletedefaultResponse,
  AttachmentsDownload200Response,
  AttachmentsDownloaddefaultResponse,
  BoundariesListByFarmerId200Response,
  BoundariesListByFarmerIddefaultResponse,
  BoundariesSearchByFarmerId200Response,
  BoundariesSearchByFarmerIddefaultResponse,
  BoundariesList200Response,
  BoundariesListdefaultResponse,
  BoundariesSearch200Response,
  BoundariesSearchdefaultResponse,
  BoundariesGetCascadeDeleteJobDetails200Response,
  BoundariesGetCascadeDeleteJobDetailsdefaultResponse,
  BoundariesCreateCascadeDeleteJob202Response,
  BoundariesCreateCascadeDeleteJobdefaultResponse,
  BoundariesGet200Response,
  BoundariesGetdefaultResponse,
  BoundariesCreateOrUpdate200Response,
  BoundariesCreateOrUpdate201Response,
  BoundariesCreateOrUpdatedefaultResponse,
  BoundariesDelete204Response,
  BoundariesDeletedefaultResponse,
  BoundariesGetOverlap200Response,
  BoundariesGetOverlapdefaultResponse,
  CropsList200Response,
  CropsListdefaultResponse,
  CropsGet200Response,
  CropsGetdefaultResponse,
  CropsCreateOrUpdate200Response,
  CropsCreateOrUpdate201Response,
  CropsCreateOrUpdatedefaultResponse,
  CropsDelete204Response,
  CropsDeletedefaultResponse,
  CropVarietiesListByCropId200Response,
  CropVarietiesListByCropIddefaultResponse,
  CropVarietiesList200Response,
  CropVarietiesListdefaultResponse,
  CropVarietiesGet200Response,
  CropVarietiesGetdefaultResponse,
  CropVarietiesCreateOrUpdate200Response,
  CropVarietiesCreateOrUpdate201Response,
  CropVarietiesCreateOrUpdatedefaultResponse,
  CropVarietiesDelete204Response,
  CropVarietiesDeletedefaultResponse,
  FarmersList200Response,
  FarmersListdefaultResponse,
  FarmersGet200Response,
  FarmersGetdefaultResponse,
  FarmersCreateOrUpdate200Response,
  FarmersCreateOrUpdate201Response,
  FarmersCreateOrUpdatedefaultResponse,
  FarmersDelete204Response,
  FarmersDeletedefaultResponse,
  FarmersGetCascadeDeleteJobDetails200Response,
  FarmersGetCascadeDeleteJobDetailsdefaultResponse,
  FarmersCreateCascadeDeleteJob202Response,
  FarmersCreateCascadeDeleteJobdefaultResponse,
  FarmOperationsCreateDataIngestionJob202Response,
  FarmOperationsCreateDataIngestionJobdefaultResponse,
  FarmOperationsGetDataIngestionJobDetails200Response,
  FarmOperationsGetDataIngestionJobDetailsdefaultResponse,
  FarmsListByFarmerId200Response,
  FarmsListByFarmerIddefaultResponse,
  FarmsList200Response,
  FarmsListdefaultResponse,
  FarmsGet200Response,
  FarmsGetdefaultResponse,
  FarmsCreateOrUpdate200Response,
  FarmsCreateOrUpdate201Response,
  FarmsCreateOrUpdatedefaultResponse,
  FarmsDelete204Response,
  FarmsDeletedefaultResponse,
  FarmsGetCascadeDeleteJobDetails200Response,
  FarmsGetCascadeDeleteJobDetailsdefaultResponse,
  FarmsCreateCascadeDeleteJob202Response,
  FarmsCreateCascadeDeleteJobdefaultResponse,
  FieldsListByFarmerId200Response,
  FieldsListByFarmerIddefaultResponse,
  FieldsList200Response,
  FieldsListdefaultResponse,
  FieldsGet200Response,
  FieldsGetdefaultResponse,
  FieldsCreateOrUpdate200Response,
  FieldsCreateOrUpdate201Response,
  FieldsCreateOrUpdatedefaultResponse,
  FieldsDelete204Response,
  FieldsDeletedefaultResponse,
  FieldsGetCascadeDeleteJobDetails200Response,
  FieldsGetCascadeDeleteJobDetailsdefaultResponse,
  FieldsCreateCascadeDeleteJob202Response,
  FieldsCreateCascadeDeleteJobdefaultResponse,
  HarvestDataListByFarmerId200Response,
  HarvestDataListByFarmerIddefaultResponse,
  HarvestDataList200Response,
  HarvestDataListdefaultResponse,
  HarvestDataGet200Response,
  HarvestDataGetdefaultResponse,
  HarvestDataCreateOrUpdate200Response,
  HarvestDataCreateOrUpdate201Response,
  HarvestDataCreateOrUpdatedefaultResponse,
  HarvestDataDelete204Response,
  HarvestDataDeletedefaultResponse,
  HarvestDataGetCascadeDeleteJobDetails200Response,
  HarvestDataGetCascadeDeleteJobDetailsdefaultResponse,
  HarvestDataCreateCascadeDeleteJob202Response,
  HarvestDataCreateCascadeDeleteJobdefaultResponse,
  ImageProcessingCreateRasterizeJob202Response,
  ImageProcessingCreateRasterizeJobdefaultResponse,
  ImageProcessingGetRasterizeJob200Response,
  OAuthProvidersList200Response,
  OAuthProvidersListdefaultResponse,
  OAuthProvidersGet200Response,
  OAuthProvidersGetdefaultResponse,
  OAuthProvidersCreateOrUpdate200Response,
  OAuthProvidersCreateOrUpdate201Response,
  OAuthProvidersCreateOrUpdatedefaultResponse,
  OAuthProvidersDelete204Response,
  OAuthProvidersDeletedefaultResponse,
  OAuthProvidersGetCascadeDeleteJobDetails200Response,
  OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse,
  OAuthProvidersCreateCascadeDeleteJob202Response,
  OAuthProvidersCreateCascadeDeleteJobdefaultResponse,
  OAuthTokensList200Response,
  OAuthTokensListdefaultResponse,
  OAuthTokensGetOAuthConnectionLink200Response,
  OAuthTokensGetOAuthConnectionLinkdefaultResponse,
  OAuthTokensGetCascadeDeleteJobDetails200Response,
  OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse,
  OAuthTokensCreateCascadeDeleteJob202Response,
  OAuthTokensCreateCascadeDeleteJobdefaultResponse,
  PlantingDataListByFarmerId200Response,
  PlantingDataListByFarmerIddefaultResponse,
  PlantingDataList200Response,
  PlantingDataListdefaultResponse,
  PlantingDataGet200Response,
  PlantingDataGetdefaultResponse,
  PlantingDataCreateOrUpdate200Response,
  PlantingDataCreateOrUpdate201Response,
  PlantingDataCreateOrUpdatedefaultResponse,
  PlantingDataDelete204Response,
  PlantingDataDeletedefaultResponse,
  PlantingDataGetCascadeDeleteJobDetails200Response,
  PlantingDataGetCascadeDeleteJobDetailsdefaultResponse,
  PlantingDataCreateCascadeDeleteJob202Response,
  PlantingDataCreateCascadeDeleteJobdefaultResponse,
  ScenesList200Response,
  ScenesListdefaultResponse,
  ScenesCreateSatelliteDataIngestionJob202Response,
  ScenesCreateSatelliteDataIngestionJobdefaultResponse,
  ScenesGetSatelliteDataIngestionJobDetails200Response,
  ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse,
  ScenesDownload200Response,
  ScenesDownloaddefaultResponse,
  SeasonalFieldsListByFarmerId200Response,
  SeasonalFieldsListByFarmerIddefaultResponse,
  SeasonalFieldsList200Response,
  SeasonalFieldsListdefaultResponse,
  SeasonalFieldsGet200Response,
  SeasonalFieldsGetdefaultResponse,
  SeasonalFieldsCreateOrUpdate200Response,
  SeasonalFieldsCreateOrUpdate201Response,
  SeasonalFieldsCreateOrUpdatedefaultResponse,
  SeasonalFieldsDelete204Response,
  SeasonalFieldsDeletedefaultResponse,
  SeasonalFieldsGetCascadeDeleteJobDetails200Response,
  SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse,
  SeasonalFieldsCreateCascadeDeleteJob202Response,
  SeasonalFieldsCreateCascadeDeleteJobdefaultResponse,
  SeasonsList200Response,
  SeasonsListdefaultResponse,
  SeasonsGet200Response,
  SeasonsGetdefaultResponse,
  SeasonsCreateOrUpdate200Response,
  SeasonsCreateOrUpdate201Response,
  SeasonsCreateOrUpdatedefaultResponse,
  SeasonsDelete204Response,
  SeasonsDeletedefaultResponse,
  TillageDataListByFarmerId200Response,
  TillageDataListByFarmerIddefaultResponse,
  TillageDataList200Response,
  TillageDataListdefaultResponse,
  TillageDataGet200Response,
  TillageDataGetdefaultResponse,
  TillageDataCreateOrUpdate200Response,
  TillageDataCreateOrUpdate201Response,
  TillageDataCreateOrUpdatedefaultResponse,
  TillageDataDelete204Response,
  TillageDataDeletedefaultResponse,
  TillageDataGetCascadeDeleteJobDetails200Response,
  TillageDataGetCascadeDeleteJobDetailsdefaultResponse,
  TillageDataCreateCascadeDeleteJob202Response,
  TillageDataCreateCascadeDeleteJobdefaultResponse,
  WeatherList200Response,
  WeatherListdefaultResponse,
  WeatherGetDataIngestionJobDetails200Response,
  WeatherGetDataIngestionJobDetailsdefaultResponse,
  WeatherCreateDataIngestionJob202Response,
  WeatherCreateDataIngestionJobdefaultResponse,
  WeatherGetDataDeleteJobDetails200Response,
  WeatherGetDataDeleteJobDetailsdefaultResponse,
  WeatherCreateDataDeleteJob202Response,
  WeatherCreateDataDeleteJobdefaultResponse,
} from "./responses";
import { Client } from "@azure-rest/core-client";

export interface ApplicationDataListByFarmerId {
  /**
   * Get a paginated list of application data resources for a given farmer and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: ApplicationDataListByFarmerIdParameters
  ): Promise<
    ApplicationDataListByFarmerId200Response | ApplicationDataListByFarmerIddefaultResponse
  >;
}

export interface ApplicationDataList {
  /**
   * Get a paginated list of application data resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: ApplicationDataListParameters
  ): Promise<ApplicationDataList200Response | ApplicationDataListdefaultResponse>;
}

export interface ApplicationDataGet {
  /**
   * Get a specified application data resource for a given farmer.
   *
   *
   */
  get(
    options?: ApplicationDataGetParameters
  ): Promise<ApplicationDataGet200Response | ApplicationDataGetdefaultResponse>;
  /**
   * Create or update an application data resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: ApplicationDataCreateOrUpdateParameters
  ): Promise<
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified application data resource for a given farmer.
   *
   *
   */
  delete(
    options?: ApplicationDataDeleteParameters
  ): Promise<ApplicationDataDelete204Response | ApplicationDataDeletedefaultResponse>;
}

export interface ApplicationDataGetCascadeDeleteJobDetails {
  /**
   * Get details of a cascade delete job for application data resource.
   *
   *
   */
  get(
    options?: ApplicationDataGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | ApplicationDataGetCascadeDeleteJobDetails200Response
    | ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create cascade delete job for application data resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: ApplicationDataCreateCascadeDeleteJobParameters
  ): Promise<
    | ApplicationDataCreateCascadeDeleteJob202Response
    | ApplicationDataCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface AttachmentsListByFarmerId {
  /**
   * Get a paginated list of attachment resources for a given farmer and search criteria.
   *
   *
   */
  get(
    options?: AttachmentsListByFarmerIdParameters
  ): Promise<AttachmentsListByFarmerId200Response | AttachmentsListByFarmerIddefaultResponse>;
}

export interface AttachmentsGet {
  /**
   * Get a specified attachment resource for a given farmer.
   *
   *
   */
  get(
    options?: AttachmentsGetParameters
  ): Promise<AttachmentsGet200Response | AttachmentsGetdefaultResponse>;
  /**
   * Create or update an attachment resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  patch(
    options?: AttachmentsCreateOrUpdateParameters
  ): Promise<
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified attachment resource for a given farmer.
   *
   *
   */
  delete(
    options?: AttachmentsDeleteParameters
  ): Promise<AttachmentsDelete204Response | AttachmentsDeletedefaultResponse>;
}

export interface AttachmentsDownload {
  /**
   * Return attachment as a file stream for a given input filePath.
   *
   *
   */
  get(
    options?: AttachmentsDownloadParameters
  ): Promise<AttachmentsDownload200Response | AttachmentsDownloaddefaultResponse>;
}

export interface BoundariesListByFarmerId {
  /**
   * Get a paginated list of boundary resources for a given farmer and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: BoundariesListByFarmerIdParameters
  ): Promise<BoundariesListByFarmerId200Response | BoundariesListByFarmerIddefaultResponse>;
  /**
   * Search for boundaries of a farmer intersecting with a given geometry.
   * This API is expected to be used when users want to find boundaries that intersect with a given geometry. Otherwise, this is functionally same as 'List by Farmer Id' API for boundaries.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  post(
    options?: BoundariesSearchByFarmerIdParameters
  ): Promise<BoundariesSearchByFarmerId200Response | BoundariesSearchByFarmerIddefaultResponse>;
}

export interface BoundariesList {
  /**
   * Get a paginated list of boundary resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: BoundariesListParameters
  ): Promise<BoundariesList200Response | BoundariesListdefaultResponse>;
  /**
   * Search for boundaries across all the farmers intersecting with a given geometry.
   * This API is expected to be used when users want to find boundaries that intersect with a given geometry. Otherwise, this is functionally same as 'List' API for boundaries.
   *
   *
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘Search by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  post(
    options?: BoundariesSearchParameters
  ): Promise<BoundariesSearch200Response | BoundariesSearchdefaultResponse>;
}

export interface BoundariesGetCascadeDeleteJobDetails {
  /**
   * Get details of cascade delete job for a specified boundary.
   *
   *
   */
  get(
    options?: BoundariesGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create a cascade delete job for a specified boundary.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: BoundariesCreateCascadeDeleteJobParameters
  ): Promise<
    BoundariesCreateCascadeDeleteJob202Response | BoundariesCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface BoundariesGet {
  /**
   * Get a specified boundary resource for a given farmer.
   *
   *
   */
  get(
    options?: BoundariesGetParameters
  ): Promise<BoundariesGet200Response | BoundariesGetdefaultResponse>;
  /**
   * Create or update a boundary resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: BoundariesCreateOrUpdateParameters
  ): Promise<
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified boundary resource for a given farmer. It can only be deleted if it has no linked attachments, satellite or weather data.
   *
   *
   */
  delete(
    options?: BoundariesDeleteParameters
  ): Promise<BoundariesDelete204Response | BoundariesDeletedefaultResponse>;
}

export interface BoundariesGetOverlap {
  /**
   * Get overlapping (intersecting) acreage between two boundaries.
   *
   *
   */
  get(
    options: BoundariesGetOverlapParameters
  ): Promise<BoundariesGetOverlap200Response | BoundariesGetOverlapdefaultResponse>;
}

export interface CropsList {
  /**
   * Get a paginated list of crop resources.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(options?: CropsListParameters): Promise<CropsList200Response | CropsListdefaultResponse>;
}

export interface CropsGet {
  /**
   * Get a specified crop resource.
   *
   *
   */
  get(options?: CropsGetParameters): Promise<CropsGet200Response | CropsGetdefaultResponse>;
  /**
   * Create or update a crop resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: CropsCreateOrUpdateParameters
  ): Promise<
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified crop resource.
   *
   *
   */
  delete(
    options?: CropsDeleteParameters
  ): Promise<CropsDelete204Response | CropsDeletedefaultResponse>;
}

export interface CropVarietiesListByCropId {
  /**
   * Get a paginated list of crop variety resources for a given crop and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: CropVarietiesListByCropIdParameters
  ): Promise<CropVarietiesListByCropId200Response | CropVarietiesListByCropIddefaultResponse>;
}

export interface CropVarietiesList {
  /**
   * Get a paginated list of crop variety resources across all the crops for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the crop Id is available, it is strongly recommended to use **‘List by Crop Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: CropVarietiesListParameters
  ): Promise<CropVarietiesList200Response | CropVarietiesListdefaultResponse>;
}

export interface CropVarietiesGet {
  /**
   * Get a specified crop variety resource for a given crop.
   *
   *
   */
  get(
    options?: CropVarietiesGetParameters
  ): Promise<CropVarietiesGet200Response | CropVarietiesGetdefaultResponse>;
  /**
   * Create or update a crop variety resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: CropVarietiesCreateOrUpdateParameters
  ): Promise<
    | CropVarietiesCreateOrUpdate200Response
    | CropVarietiesCreateOrUpdate201Response
    | CropVarietiesCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified crop variety resource for a given crop.
   *
   *
   */
  delete(
    options?: CropVarietiesDeleteParameters
  ): Promise<CropVarietiesDelete204Response | CropVarietiesDeletedefaultResponse>;
}

export interface FarmersList {
  /**
   * Get a paginated list of farmer resources for a given search criteria.
   *
   *
   */
  get(
    options?: FarmersListParameters
  ): Promise<FarmersList200Response | FarmersListdefaultResponse>;
}

export interface FarmersGet {
  /**
   * Get a specified farmer resource.
   *
   *
   */
  get(options?: FarmersGetParameters): Promise<FarmersGet200Response | FarmersGetdefaultResponse>;
  /**
   * Create or update a farmer resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: FarmersCreateOrUpdateParameters
  ): Promise<
    | FarmersCreateOrUpdate200Response
    | FarmersCreateOrUpdate201Response
    | FarmersCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified farmer resource. It can only be deleted if it has no linked attachments or farms.
   *
   *
   */
  delete(
    options?: FarmersDeleteParameters
  ): Promise<FarmersDelete204Response | FarmersDeletedefaultResponse>;
}

export interface FarmersGetCascadeDeleteJobDetails {
  /**
   * Get details of a cascade delete job for a specified farmer.
   *
   *
   */
  get(
    options?: FarmersGetCascadeDeleteJobDetailsParameters
  ): Promise<
    FarmersGetCascadeDeleteJobDetails200Response | FarmersGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create a cascade delete job for a specified farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: FarmersCreateCascadeDeleteJobParameters
  ): Promise<
    FarmersCreateCascadeDeleteJob202Response | FarmersCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface FarmOperationsCreateDataIngestionJob {
  /**
   * Create a farm operation data ingestion job.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  put(
    options?: FarmOperationsCreateDataIngestionJobParameters
  ): Promise<
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobdefaultResponse
  >;
  /**
   * Get details of a farm operation data ingestion job.
   *
   *
   */
  get(
    options?: FarmOperationsGetDataIngestionJobDetailsParameters
  ): Promise<
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsdefaultResponse
  >;
}

export interface FarmsListByFarmerId {
  /**
   * Get a paginated list of farm resources for a given farmer and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: FarmsListByFarmerIdParameters
  ): Promise<FarmsListByFarmerId200Response | FarmsListByFarmerIddefaultResponse>;
}

export interface FarmsList {
  /**
   * Get a paginated list of farm resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(options?: FarmsListParameters): Promise<FarmsList200Response | FarmsListdefaultResponse>;
}

export interface FarmsGet {
  /**
   * Get a specified farm resource for a given farmer.
   *
   *
   */
  get(options?: FarmsGetParameters): Promise<FarmsGet200Response | FarmsGetdefaultResponse>;
  /**
   * Create or update a farm resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: FarmsCreateOrUpdateParameters
  ): Promise<
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified farm resource for a given farmer. It can only be deleted if it has no linked attachments, fields or seasonal fields.
   *
   *
   */
  delete(
    options?: FarmsDeleteParameters
  ): Promise<FarmsDelete204Response | FarmsDeletedefaultResponse>;
}

export interface FarmsGetCascadeDeleteJobDetails {
  /**
   * Get details of cascade delete job for a specified farm.
   *
   *
   */
  get(
    options?: FarmsGetCascadeDeleteJobDetailsParameters
  ): Promise<
    FarmsGetCascadeDeleteJobDetails200Response | FarmsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create a cascade delete job for a specified farm.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: FarmsCreateCascadeDeleteJobParameters
  ): Promise<FarmsCreateCascadeDeleteJob202Response | FarmsCreateCascadeDeleteJobdefaultResponse>;
}

export interface FieldsListByFarmerId {
  /**
   * Get a paginated list of field resources for a given farmer and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: FieldsListByFarmerIdParameters
  ): Promise<FieldsListByFarmerId200Response | FieldsListByFarmerIddefaultResponse>;
}

export interface FieldsList {
  /**
   * Get a paginated list of field resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(options?: FieldsListParameters): Promise<FieldsList200Response | FieldsListdefaultResponse>;
}

export interface FieldsGet {
  /**
   * Get a specified field resource for a given farmer.
   *
   *
   */
  get(options?: FieldsGetParameters): Promise<FieldsGet200Response | FieldsGetdefaultResponse>;
  /**
   * Create or update a field resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: FieldsCreateOrUpdateParameters
  ): Promise<
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified field resource for a given farmer. It can only be deleted if it has no linked attachments, boundaries or seasonal fields.
   *
   *
   */
  delete(
    options?: FieldsDeleteParameters
  ): Promise<FieldsDelete204Response | FieldsDeletedefaultResponse>;
}

export interface FieldsGetCascadeDeleteJobDetails {
  /**
   * Get details of cascade delete job for a specified field.
   *
   *
   */
  get(
    options?: FieldsGetCascadeDeleteJobDetailsParameters
  ): Promise<
    FieldsGetCascadeDeleteJobDetails200Response | FieldsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create a cascade delete job for specified field.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: FieldsCreateCascadeDeleteJobParameters
  ): Promise<FieldsCreateCascadeDeleteJob202Response | FieldsCreateCascadeDeleteJobdefaultResponse>;
}

export interface HarvestDataListByFarmerId {
  /**
   * Get a paginated list of harvest data resources for a given farmer and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: HarvestDataListByFarmerIdParameters
  ): Promise<HarvestDataListByFarmerId200Response | HarvestDataListByFarmerIddefaultResponse>;
}

export interface HarvestDataList {
  /**
   * Get a paginated list of harvest data resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: HarvestDataListParameters
  ): Promise<HarvestDataList200Response | HarvestDataListdefaultResponse>;
}

export interface HarvestDataGet {
  /**
   * Get a specified harvest data resource for a given farmer.
   *
   *
   */
  get(
    options?: HarvestDataGetParameters
  ): Promise<HarvestDataGet200Response | HarvestDataGetdefaultResponse>;
  /**
   * Create or update harvest data resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: HarvestDataCreateOrUpdateParameters
  ): Promise<
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified harvest data resource for a given farmer.
   *
   *
   */
  delete(
    options?: HarvestDataDeleteParameters
  ): Promise<HarvestDataDelete204Response | HarvestDataDeletedefaultResponse>;
}

export interface HarvestDataGetCascadeDeleteJobDetails {
  /**
   * Get details of a cascade delete job for harvest data resource.
   *
   *
   */
  get(
    options?: HarvestDataGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | HarvestDataGetCascadeDeleteJobDetails200Response
    | HarvestDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create cascade delete job for harvest data resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: HarvestDataCreateCascadeDeleteJobParameters
  ): Promise<
    HarvestDataCreateCascadeDeleteJob202Response | HarvestDataCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface ImageProcessingCreateRasterizeJob {
  /**
   * Create a job which converts shape files into raster images.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  put(
    options?: ImageProcessingCreateRasterizeJobParameters
  ): Promise<
    ImageProcessingCreateRasterizeJob202Response | ImageProcessingCreateRasterizeJobdefaultResponse
  >;
  /**
   * Get details of rasterize job. Rasterize job converts shape files into raster images.
   *
   *
   */
  get(
    options?: ImageProcessingGetRasterizeJobParameters
  ): Promise<ImageProcessingGetRasterizeJob200Response>;
}

export interface OAuthProvidersList {
  /**
   * Get a paginated list of OAuth provider resources for a given search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: OAuthProvidersListParameters
  ): Promise<OAuthProvidersList200Response | OAuthProvidersListdefaultResponse>;
}

export interface OAuthProvidersGet {
  /**
   * Get a specified OAuth provider resource.
   *
   *
   */
  get(
    options?: OAuthProvidersGetParameters
  ): Promise<OAuthProvidersGet200Response | OAuthProvidersGetdefaultResponse>;
  /**
   * Create or update an OAuth provider resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: OAuthProvidersCreateOrUpdateParameters
  ): Promise<
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified OAuth provider resource.
   *
   *
   */
  delete(
    options?: OAuthProvidersDeleteParameters
  ): Promise<OAuthProvidersDelete204Response | OAuthProvidersDeletedefaultResponse>;
}

export interface OAuthProvidersGetCascadeDeleteJobDetails {
  /**
   * Get details of cascade delete job for an OAuth provider resource.
   *
   *
   */
  get(
    options?: OAuthProvidersGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | OAuthProvidersGetCascadeDeleteJobDetails200Response
    | OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create cascade delete job for an OAuth provider resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: OAuthProvidersCreateCascadeDeleteJobParameters
  ): Promise<
    | OAuthProvidersCreateCascadeDeleteJob202Response
    | OAuthProvidersCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface OAuthTokensList {
  /**
   * Get a list of OAuthToken documents for a given search criteria.
   *
   *
   */
  get(
    options?: OAuthTokensListParameters
  ): Promise<OAuthTokensList200Response | OAuthTokensListdefaultResponse>;
}

export interface OAuthTokensGetOAuthConnectionLink {
  /**
   * Get connection link needed in the OAuth flow.
   *
   *
   */
  post(
    options?: OAuthTokensGetOAuthConnectionLinkParameters
  ): Promise<
    OAuthTokensGetOAuthConnectionLink200Response | OAuthTokensGetOAuthConnectionLinkdefaultResponse
  >;
}

export interface OAuthTokensGetCascadeDeleteJobDetails {
  /**
   * Get details of OAuth token remove job.
   *
   *
   */
  get(
    options?: OAuthTokensGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create job to remove OAuth token.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: OAuthTokensCreateCascadeDeleteJobParameters
  ): Promise<
    OAuthTokensCreateCascadeDeleteJob202Response | OAuthTokensCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface PlantingDataListByFarmerId {
  /**
   * Get a paginated list of planting data resources for a given farm and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: PlantingDataListByFarmerIdParameters
  ): Promise<PlantingDataListByFarmerId200Response | PlantingDataListByFarmerIddefaultResponse>;
}

export interface PlantingDataList {
  /**
   * Get a paginated list of planting data resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: PlantingDataListParameters
  ): Promise<PlantingDataList200Response | PlantingDataListdefaultResponse>;
}

export interface PlantingDataGet {
  /**
   * Get a specified planting data resource for a given farmer.
   *
   *
   */
  get(
    options?: PlantingDataGetParameters
  ): Promise<PlantingDataGet200Response | PlantingDataGetdefaultResponse>;
  /**
   * Create or update a planting data resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: PlantingDataCreateOrUpdateParameters
  ): Promise<
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified planting data resource under a particular farmer.
   *
   *
   */
  delete(
    options?: PlantingDataDeleteParameters
  ): Promise<PlantingDataDelete204Response | PlantingDataDeletedefaultResponse>;
}

export interface PlantingDataGetCascadeDeleteJobDetails {
  /**
   * Get details of a cascade delete job for planting data resource.
   *
   *
   */
  get(
    options?: PlantingDataGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | PlantingDataGetCascadeDeleteJobDetails200Response
    | PlantingDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create cascade delete job for planting data resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: PlantingDataCreateCascadeDeleteJobParameters
  ): Promise<
    | PlantingDataCreateCascadeDeleteJob202Response
    | PlantingDataCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface ScenesList {
  /**
   * Get a paginated list of scene resources for a given search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   * 2. This API will retrieve scenes present in the FarmBeats datastore and does not ingest new data. Example: a user has ingested satellite data from 1st of Jan 2019 to 30th of June 2019. However, using the current API, the user has asked for data from 1st of Jan 2019 to 31st of December 2019. In such a case, only data for the first 6 months is returned to the user.
   *
   *
   */
  get(options: ScenesListParameters): Promise<ScenesList200Response | ScenesListdefaultResponse>;
}

export interface ScenesCreateSatelliteDataIngestionJob {
  /**
   * Create a satellite data ingestion job.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  put(
    options?: ScenesCreateSatelliteDataIngestionJobParameters
  ): Promise<
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobdefaultResponse
  >;
  /**
   * Get details of a satellite data ingestion job.
   *
   *
   */
  get(
    options?: ScenesGetSatelliteDataIngestionJobDetailsParameters
  ): Promise<
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
  >;
}

export interface ScenesDownload {
  /**
   * Return scenes as a file stream for a given input filePath.
   *
   *
   */
  get(
    options: ScenesDownloadParameters
  ): Promise<ScenesDownload200Response | ScenesDownloaddefaultResponse>;
}

export interface SeasonalFieldsListByFarmerId {
  /**
   * Get a paginated list of seasonal field resources for a given farmer and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: SeasonalFieldsListByFarmerIdParameters
  ): Promise<SeasonalFieldsListByFarmerId200Response | SeasonalFieldsListByFarmerIddefaultResponse>;
}

export interface SeasonalFieldsList {
  /**
   * Get a paginated list of seasonal field resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: SeasonalFieldsListParameters
  ): Promise<SeasonalFieldsList200Response | SeasonalFieldsListdefaultResponse>;
}

export interface SeasonalFieldsGet {
  /**
   * Get a specified seasonal field resource for a given farmer.
   *
   *
   */
  get(
    options?: SeasonalFieldsGetParameters
  ): Promise<SeasonalFieldsGet200Response | SeasonalFieldsGetdefaultResponse>;
  /**
   * Create or update a seasonal field resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: SeasonalFieldsCreateOrUpdateParameters
  ): Promise<
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified seasonal field resource for a given farmer. It can only be deleted if it has no linked attachments or boundaries.
   *
   *
   */
  delete(
    options?: SeasonalFieldsDeleteParameters
  ): Promise<SeasonalFieldsDelete204Response | SeasonalFieldsDeletedefaultResponse>;
}

export interface SeasonalFieldsGetCascadeDeleteJobDetails {
  /**
   * Get details of cascade delete job for a specified seasonal field.
   *
   *
   */
  get(
    options?: SeasonalFieldsGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create a cascade delete job for a specified seasonal field.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: SeasonalFieldsCreateCascadeDeleteJobParameters
  ): Promise<
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface SeasonsList {
  /**
   * Get a paginated list of season resources.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: SeasonsListParameters
  ): Promise<SeasonsList200Response | SeasonsListdefaultResponse>;
}

export interface SeasonsGet {
  /**
   * Get a specified season resource.
   *
   *
   */
  get(options?: SeasonsGetParameters): Promise<SeasonsGet200Response | SeasonsGetdefaultResponse>;
  /**
   * Create or update a season resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: SeasonsCreateOrUpdateParameters
  ): Promise<
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified season resource.
   *
   *
   */
  delete(
    options?: SeasonsDeleteParameters
  ): Promise<SeasonsDelete204Response | SeasonsDeletedefaultResponse>;
}

export interface TillageDataListByFarmerId {
  /**
   * Get a paginated list of tillage data resources for a given farmer and search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: TillageDataListByFarmerIdParameters
  ): Promise<TillageDataListByFarmerId200Response | TillageDataListByFarmerIddefaultResponse>;
}

export interface TillageDataList {
  /**
   * Get a paginated list of tillage data resources across all the farmers for a given search criteria.
   *
   * 
###### Note:
   * 1. This API does a serial search of the database for the given search criteria. If the farmer Id is available, it is strongly recommended to use **‘List by Farmer Id’** API as it is performant.
   * 2. Users will get paginated response with each page containing a link to the next page. Few pages may have **no items (zero results)**. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   *
   *
   */
  get(
    options?: TillageDataListParameters
  ): Promise<TillageDataList200Response | TillageDataListdefaultResponse>;
}

export interface TillageDataGet {
  /**
   * Get a specified tillage data resource for a given farmer.
   *
   *
   */
  get(
    options?: TillageDataGetParameters
  ): Promise<TillageDataGet200Response | TillageDataGetdefaultResponse>;
  /**
   * Create or update a tillage data resource for a given farmer.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/merge-patch+json'**.
   * 2. 'Id' of a resource can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of an ‘Id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  patch(
    options?: TillageDataCreateOrUpdateParameters
  ): Promise<
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdatedefaultResponse
  >;
  /**
   * Delete a specified tillage data resource for a given farmer.
   *
   *
   */
  delete(
    options?: TillageDataDeleteParameters
  ): Promise<TillageDataDelete204Response | TillageDataDeletedefaultResponse>;
}

export interface TillageDataGetCascadeDeleteJobDetails {
  /**
   * Get details of a cascade delete job for tillage data resource.
   *
   *
   */
  get(
    options?: TillageDataGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | TillageDataGetCascadeDeleteJobDetails200Response
    | TillageDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create cascade delete job for tillage data resource.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   *
   *
   */
  put(
    options: TillageDataCreateCascadeDeleteJobParameters
  ): Promise<
    TillageDataCreateCascadeDeleteJob202Response | TillageDataCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface WeatherList {
  /**
   * Get a paginated list of weather data resources for a given search criteria.
   *
   * 
###### Note: 
   * 1. Users will get paginated response with each page containing a link to the next page. Users are expected to iterate over all the pages using ‘nextLink’. The search comes to an end when ‘nextLink’ is null.
   * 2. This API will retrieve weather data present in the FarmBeats datastore and does not ingest new data. Example: a user has ingested historical weather data from 1st of Jan 2019 to 30th of June 2019. However, using the current API, the user has asked for historical data from 1st of Jan 2019 to 31st of December 2019. In such a case, only data for the first 6 months is returned to the user.
   *
   *
   */
  get(options: WeatherListParameters): Promise<WeatherList200Response | WeatherListdefaultResponse>;
}

export interface WeatherGetDataIngestionJobDetails {
  /**
   * Get details of a weather data ingestion job.
   *
   *
   */
  get(
    options?: WeatherGetDataIngestionJobDetailsParameters
  ): Promise<
    WeatherGetDataIngestionJobDetails200Response | WeatherGetDataIngestionJobDetailsdefaultResponse
  >;
  /**
   * Create a weather data ingestion job.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  put(
    options?: WeatherCreateDataIngestionJobParameters
  ): Promise<
    WeatherCreateDataIngestionJob202Response | WeatherCreateDataIngestionJobdefaultResponse
  >;
}

export interface WeatherGetDataDeleteJobDetails {
  /**
   * Get details of a weather data delete job.
   *
   *
   */
  get(
    options?: WeatherGetDataDeleteJobDetailsParameters
  ): Promise<
    WeatherGetDataDeleteJobDetails200Response | WeatherGetDataDeleteJobDetailsdefaultResponse
  >;
  /**
   * Create a weather data delete job.
   *
   * 
###### Note:
   * 
1. The **‘contentType’** in the request header should be **'application/json'**.
   * 2. ‘Job id’ can only contain alphanumeric characters, '-', '_', '~' or '.', and must begin and end with an alphanumeric character. Minimum length of a ‘Job id’ is 2 characters and maximum length is 50 characters.
   * 3. 'Key' and 'value' in 'Properties' can have a maximum of 50 and 150 characters respectively.
   *
   *
   */
  put(
    options?: WeatherCreateDataDeleteJobParameters
  ): Promise<WeatherCreateDataDeleteJob202Response | WeatherCreateDataDeleteJobdefaultResponse>;
}

export interface Routes {
  /** Resource for '/farmers/\{farmerId\}/application-data' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/application-data", farmerId: string): ApplicationDataListByFarmerId;
  /** Resource for '/application-data' has methods for the following verbs: get */
  (path: "/application-data"): ApplicationDataList;
  /** Resource for '/farmers/\{farmerId\}/application-data/\{applicationDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/application-data/{applicationDataId}",
    farmerId: string,
    applicationDataId: string
  ): ApplicationDataGet;
  /** Resource for '/application-data/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/application-data/cascade-delete/{jobId}",
    jobId: string
  ): ApplicationDataGetCascadeDeleteJobDetails;
  /** Resource for '/farmers/\{farmerId\}/attachments' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/attachments", farmerId: string): AttachmentsListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/attachments/\{attachmentId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/attachments/{attachmentId}",
    farmerId: string,
    attachmentId: string
  ): AttachmentsGet;
  /** Resource for '/farmers/\{farmerId\}/attachments/\{attachmentId\}/file' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/attachments/{attachmentId}/file",
    farmerId: string,
    attachmentId: string
  ): AttachmentsDownload;
  /** Resource for '/farmers/\{farmerId\}/boundaries' has methods for the following verbs: get, post */
  (path: "/farmers/{farmerId}/boundaries", farmerId: string): BoundariesListByFarmerId;
  /** Resource for '/boundaries' has methods for the following verbs: get, post */
  (path: "/boundaries"): BoundariesList;
  /** Resource for '/boundaries/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/boundaries/cascade-delete/{jobId}", jobId: string): BoundariesGetCascadeDeleteJobDetails;
  /** Resource for '/farmers/\{farmerId\}/boundaries/\{boundaryId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/boundaries/{boundaryId}",
    farmerId: string,
    boundaryId: string
  ): BoundariesGet;
  /** Resource for '/farmers/\{farmerId\}/boundaries/\{boundaryId\}/overlap' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/boundaries/{boundaryId}/overlap",
    farmerId: string,
    boundaryId: string
  ): BoundariesGetOverlap;
  /** Resource for '/crops' has methods for the following verbs: get */
  (path: "/crops"): CropsList;
  /** Resource for '/crops/\{cropId\}' has methods for the following verbs: get, patch, delete */
  (path: "/crops/{cropId}", cropId: string): CropsGet;
  /** Resource for '/crops/\{cropId\}/crop-varieties' has methods for the following verbs: get */
  (path: "/crops/{cropId}/crop-varieties", cropId: string): CropVarietiesListByCropId;
  /** Resource for '/crop-varieties' has methods for the following verbs: get */
  (path: "/crop-varieties"): CropVarietiesList;
  /** Resource for '/crops/\{cropId\}/crop-varieties/\{cropVarietyId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/crops/{cropId}/crop-varieties/{cropVarietyId}",
    cropId: string,
    cropVarietyId: string
  ): CropVarietiesGet;
  /** Resource for '/farmers' has methods for the following verbs: get */
  (path: "/farmers"): FarmersList;
  /** Resource for '/farmers/\{farmerId\}' has methods for the following verbs: get, patch, delete */
  (path: "/farmers/{farmerId}", farmerId: string): FarmersGet;
  /** Resource for '/farmers/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/farmers/cascade-delete/{jobId}", jobId: string): FarmersGetCascadeDeleteJobDetails;
  /** Resource for '/farm-operations/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/farm-operations/ingest-data/{jobId}",
    jobId: string
  ): FarmOperationsCreateDataIngestionJob;
  /** Resource for '/farmers/\{farmerId\}/farms' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/farms", farmerId: string): FarmsListByFarmerId;
  /** Resource for '/farms' has methods for the following verbs: get */
  (path: "/farms"): FarmsList;
  /** Resource for '/farmers/\{farmerId\}/farms/\{farmId\}' has methods for the following verbs: get, patch, delete */
  (path: "/farmers/{farmerId}/farms/{farmId}", farmerId: string, farmId: string): FarmsGet;
  /** Resource for '/farms/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/farms/cascade-delete/{jobId}", jobId: string): FarmsGetCascadeDeleteJobDetails;
  /** Resource for '/farmers/\{farmerId\}/fields' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/fields", farmerId: string): FieldsListByFarmerId;
  /** Resource for '/fields' has methods for the following verbs: get */
  (path: "/fields"): FieldsList;
  /** Resource for '/farmers/\{farmerId\}/fields/\{fieldId\}' has methods for the following verbs: get, patch, delete */
  (path: "/farmers/{farmerId}/fields/{fieldId}", farmerId: string, fieldId: string): FieldsGet;
  /** Resource for '/fields/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/fields/cascade-delete/{jobId}", jobId: string): FieldsGetCascadeDeleteJobDetails;
  /** Resource for '/farmers/\{farmerId\}/harvest-data' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/harvest-data", farmerId: string): HarvestDataListByFarmerId;
  /** Resource for '/harvest-data' has methods for the following verbs: get */
  (path: "/harvest-data"): HarvestDataList;
  /** Resource for '/farmers/\{farmerId\}/harvest-data/\{harvestDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/harvest-data/{harvestDataId}",
    farmerId: string,
    harvestDataId: string
  ): HarvestDataGet;
  /** Resource for '/harvest-data/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/harvest-data/cascade-delete/{jobId}",
    jobId: string
  ): HarvestDataGetCascadeDeleteJobDetails;
  /** Resource for '/image-processing/rasterize/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/image-processing/rasterize/{jobId}", jobId: string): ImageProcessingCreateRasterizeJob;
  /** Resource for '/oauth/providers' has methods for the following verbs: get */
  (path: "/oauth/providers"): OAuthProvidersList;
  /** Resource for '/oauth/providers/\{oauthProviderId\}' has methods for the following verbs: get, patch, delete */
  (path: "/oauth/providers/{oauthProviderId}", oauthProviderId: string): OAuthProvidersGet;
  /** Resource for '/oauth/providers/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/oauth/providers/cascade-delete/{jobId}",
    jobId: string
  ): OAuthProvidersGetCascadeDeleteJobDetails;
  /** Resource for '/oauth/tokens' has methods for the following verbs: get */
  (path: "/oauth/tokens"): OAuthTokensList;
  /** Resource for '/oauth/tokens/:connect' has methods for the following verbs: post */
  (path: "/oauth/tokens/:connect"): OAuthTokensGetOAuthConnectionLink;
  /** Resource for '/oauth/tokens/remove/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/oauth/tokens/remove/{jobId}", jobId: string): OAuthTokensGetCascadeDeleteJobDetails;
  /** Resource for '/farmers/\{farmerId\}/planting-data' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/planting-data", farmerId: string): PlantingDataListByFarmerId;
  /** Resource for '/planting-data' has methods for the following verbs: get */
  (path: "/planting-data"): PlantingDataList;
  /** Resource for '/farmers/\{farmerId\}/planting-data/\{plantingDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/planting-data/{plantingDataId}",
    farmerId: string,
    plantingDataId: string
  ): PlantingDataGet;
  /** Resource for '/planting-data/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/planting-data/cascade-delete/{jobId}",
    jobId: string
  ): PlantingDataGetCascadeDeleteJobDetails;
  /** Resource for '/scenes' has methods for the following verbs: get */
  (path: "/scenes"): ScenesList;
  /** Resource for '/scenes/satellite/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/scenes/satellite/ingest-data/{jobId}",
    jobId: string
  ): ScenesCreateSatelliteDataIngestionJob;
  /** Resource for '/scenes/downloadFiles' has methods for the following verbs: get */
  (path: "/scenes/downloadFiles"): ScenesDownload;
  /** Resource for '/farmers/\{farmerId\}/seasonal-fields' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/seasonal-fields", farmerId: string): SeasonalFieldsListByFarmerId;
  /** Resource for '/seasonal-fields' has methods for the following verbs: get */
  (path: "/seasonal-fields"): SeasonalFieldsList;
  /** Resource for '/farmers/\{farmerId\}/seasonal-fields/\{seasonalFieldId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/seasonal-fields/{seasonalFieldId}",
    farmerId: string,
    seasonalFieldId: string
  ): SeasonalFieldsGet;
  /** Resource for '/seasonal-fields/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/seasonal-fields/cascade-delete/{jobId}",
    jobId: string
  ): SeasonalFieldsGetCascadeDeleteJobDetails;
  /** Resource for '/seasons' has methods for the following verbs: get */
  (path: "/seasons"): SeasonsList;
  /** Resource for '/seasons/\{seasonId\}' has methods for the following verbs: get, patch, delete */
  (path: "/seasons/{seasonId}", seasonId: string): SeasonsGet;
  /** Resource for '/farmers/\{farmerId\}/tillage-data' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/tillage-data", farmerId: string): TillageDataListByFarmerId;
  /** Resource for '/tillage-data' has methods for the following verbs: get */
  (path: "/tillage-data"): TillageDataList;
  /** Resource for '/farmers/\{farmerId\}/tillage-data/\{tillageDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/tillage-data/{tillageDataId}",
    farmerId: string,
    tillageDataId: string
  ): TillageDataGet;
  /** Resource for '/tillage-data/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/tillage-data/cascade-delete/{jobId}",
    jobId: string
  ): TillageDataGetCascadeDeleteJobDetails;
  /** Resource for '/weather' has methods for the following verbs: get */
  (path: "/weather"): WeatherList;
  /** Resource for '/weather/ingest-data/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/weather/ingest-data/{jobId}", jobId: string): WeatherGetDataIngestionJobDetails;
  /** Resource for '/weather/delete-data/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/weather/delete-data/{jobId}", jobId: string): WeatherGetDataDeleteJobDetails;
}

export type FarmBeatsRestClient = Client & {
  path: Routes;
};
