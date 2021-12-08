// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ApplicationDataCreateOrUpdate200Response,
  ApplicationDataCreateOrUpdate201Response,
  ApplicationDataCreateOrUpdatedefaultResponse,
  ApplicationDataDelete204Response,
  ApplicationDataDeletedefaultResponse,
  ApplicationDataGet200Response,
  ApplicationDataGetdefaultResponse,
  ApplicationDataList200Response,
  ApplicationDataListByFarmerId200Response,
  ApplicationDataListByFarmerIddefaultResponse,
  ApplicationDataListdefaultResponse,
  AttachmentsCreateOrUpdate200Response,
  AttachmentsCreateOrUpdate201Response,
  AttachmentsCreateOrUpdatedefaultResponse,
  AttachmentsDelete204Response,
  AttachmentsDeletedefaultResponse,
  AttachmentsDownload200Response,
  AttachmentsDownloaddefaultResponse,
  AttachmentsGet200Response,
  AttachmentsGetdefaultResponse,
  AttachmentsListByFarmerId200Response,
  AttachmentsListByFarmerIddefaultResponse,
  BoundariesCreateCascadeDeleteJob202Response,
  BoundariesCreateCascadeDeleteJobdefaultResponse,
  BoundariesCreateOrUpdate200Response,
  BoundariesCreateOrUpdate201Response,
  BoundariesCreateOrUpdatedefaultResponse,
  BoundariesDelete204Response,
  BoundariesDeletedefaultResponse,
  BoundariesGet200Response,
  BoundariesGetCascadeDeleteJobDetails200Response,
  BoundariesGetCascadeDeleteJobDetailsdefaultResponse,
  BoundariesGetOverlap200Response,
  BoundariesGetOverlapdefaultResponse,
  BoundariesGetdefaultResponse,
  BoundariesList200Response,
  BoundariesListByFarmerId200Response,
  BoundariesListByFarmerIddefaultResponse,
  BoundariesListdefaultResponse,
  BoundariesSearch200Response,
  BoundariesSearchByFarmerId200Response,
  BoundariesSearchByFarmerIddefaultResponse,
  BoundariesSearchdefaultResponse,
  CropVarietiesCreateOrUpdate200Response,
  CropVarietiesCreateOrUpdate201Response,
  CropVarietiesCreateOrUpdatedefaultResponse,
  CropVarietiesDelete204Response,
  CropVarietiesDeletedefaultResponse,
  CropVarietiesGet200Response,
  CropVarietiesGetdefaultResponse,
  CropVarietiesList200Response,
  CropVarietiesListByCropId200Response,
  CropVarietiesListByCropIddefaultResponse,
  CropVarietiesListdefaultResponse,
  CropsCreateOrUpdate200Response,
  CropsCreateOrUpdate201Response,
  CropsCreateOrUpdatedefaultResponse,
  CropsDelete204Response,
  CropsDeletedefaultResponse,
  CropsGet200Response,
  CropsGetdefaultResponse,
  CropsList200Response,
  CropsListdefaultResponse,
  FarmOperationsCreateDataIngestionJob202Response,
  FarmOperationsCreateDataIngestionJobdefaultResponse,
  FarmOperationsGetDataIngestionJobDetails200Response,
  FarmOperationsGetDataIngestionJobDetailsdefaultResponse,
  FarmersCreateCascadeDeleteJob202Response,
  FarmersCreateCascadeDeleteJobdefaultResponse,
  FarmersCreateOrUpdate200Response,
  FarmersCreateOrUpdate201Response,
  FarmersCreateOrUpdatedefaultResponse,
  FarmersDelete204Response,
  FarmersDeletedefaultResponse,
  FarmersGet200Response,
  FarmersGetCascadeDeleteJobDetails200Response,
  FarmersGetCascadeDeleteJobDetailsdefaultResponse,
  FarmersGetdefaultResponse,
  FarmersList200Response,
  FarmersListdefaultResponse,
  FarmsCreateCascadeDeleteJob202Response,
  FarmsCreateCascadeDeleteJobdefaultResponse,
  FarmsCreateOrUpdate200Response,
  FarmsCreateOrUpdate201Response,
  FarmsCreateOrUpdatedefaultResponse,
  FarmsDelete204Response,
  FarmsDeletedefaultResponse,
  FarmsGet200Response,
  FarmsGetCascadeDeleteJobDetails200Response,
  FarmsGetCascadeDeleteJobDetailsdefaultResponse,
  FarmsGetdefaultResponse,
  FarmsList200Response,
  FarmsListByFarmerId200Response,
  FarmsListByFarmerIddefaultResponse,
  FarmsListdefaultResponse,
  FieldsCreateCascadeDeleteJob202Response,
  FieldsCreateCascadeDeleteJobdefaultResponse,
  FieldsCreateOrUpdate200Response,
  FieldsCreateOrUpdate201Response,
  FieldsCreateOrUpdatedefaultResponse,
  FieldsDelete204Response,
  FieldsDeletedefaultResponse,
  FieldsGet200Response,
  FieldsGetCascadeDeleteJobDetails200Response,
  FieldsGetCascadeDeleteJobDetailsdefaultResponse,
  FieldsGetdefaultResponse,
  FieldsList200Response,
  FieldsListByFarmerId200Response,
  FieldsListByFarmerIddefaultResponse,
  FieldsListdefaultResponse,
  HarvestDataCreateOrUpdate200Response,
  HarvestDataCreateOrUpdate201Response,
  HarvestDataCreateOrUpdatedefaultResponse,
  HarvestDataDelete204Response,
  HarvestDataDeletedefaultResponse,
  HarvestDataGet200Response,
  HarvestDataGetdefaultResponse,
  HarvestDataList200Response,
  HarvestDataListByFarmerId200Response,
  HarvestDataListByFarmerIddefaultResponse,
  HarvestDataListdefaultResponse,
  ImageProcessingCreateRasterizeJob202Response,
  ImageProcessingCreateRasterizeJobdefaultResponse,
  ImageProcessingGetRasterizeJob200Response,
  OAuthProvidersCreateOrUpdate200Response,
  OAuthProvidersCreateOrUpdate201Response,
  OAuthProvidersCreateOrUpdatedefaultResponse,
  OAuthProvidersDelete204Response,
  OAuthProvidersDeletedefaultResponse,
  OAuthProvidersGet200Response,
  OAuthProvidersGetdefaultResponse,
  OAuthProvidersList200Response,
  OAuthProvidersListdefaultResponse,
  OAuthTokensCreateCascadeDeleteJob202Response,
  OAuthTokensCreateCascadeDeleteJobdefaultResponse,
  OAuthTokensGetCascadeDeleteJobDetails200Response,
  OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse,
  OAuthTokensGetOAuthConnectionLink200Response,
  OAuthTokensGetOAuthConnectionLinkdefaultResponse,
  OAuthTokensList200Response,
  OAuthTokensListdefaultResponse,
  PlantingDataCreateOrUpdate200Response,
  PlantingDataCreateOrUpdate201Response,
  PlantingDataCreateOrUpdatedefaultResponse,
  PlantingDataDelete204Response,
  PlantingDataDeletedefaultResponse,
  PlantingDataGet200Response,
  PlantingDataGetdefaultResponse,
  PlantingDataList200Response,
  PlantingDataListByFarmerId200Response,
  PlantingDataListByFarmerIddefaultResponse,
  PlantingDataListdefaultResponse,
  ScenesCreateSatelliteDataIngestionJob202Response,
  ScenesCreateSatelliteDataIngestionJobdefaultResponse,
  ScenesDownload200Response,
  ScenesDownloaddefaultResponse,
  ScenesGetSatelliteDataIngestionJobDetails200Response,
  ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse,
  ScenesList200Response,
  ScenesListdefaultResponse,
  SeasonalFieldsCreateCascadeDeleteJob202Response,
  SeasonalFieldsCreateCascadeDeleteJobdefaultResponse,
  SeasonalFieldsCreateOrUpdate200Response,
  SeasonalFieldsCreateOrUpdate201Response,
  SeasonalFieldsCreateOrUpdatedefaultResponse,
  SeasonalFieldsDelete204Response,
  SeasonalFieldsDeletedefaultResponse,
  SeasonalFieldsGet200Response,
  SeasonalFieldsGetCascadeDeleteJobDetails200Response,
  SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse,
  SeasonalFieldsGetdefaultResponse,
  SeasonalFieldsList200Response,
  SeasonalFieldsListByFarmerId200Response,
  SeasonalFieldsListByFarmerIddefaultResponse,
  SeasonalFieldsListdefaultResponse,
  SeasonsCreateOrUpdate200Response,
  SeasonsCreateOrUpdate201Response,
  SeasonsCreateOrUpdatedefaultResponse,
  SeasonsDelete204Response,
  SeasonsDeletedefaultResponse,
  SeasonsGet200Response,
  SeasonsGetdefaultResponse,
  SeasonsList200Response,
  SeasonsListdefaultResponse,
  TillageDataCreateOrUpdate200Response,
  TillageDataCreateOrUpdate201Response,
  TillageDataCreateOrUpdatedefaultResponse,
  TillageDataDelete204Response,
  TillageDataDeletedefaultResponse,
  TillageDataGet200Response,
  TillageDataGetdefaultResponse,
  TillageDataList200Response,
  TillageDataListByFarmerId200Response,
  TillageDataListByFarmerIddefaultResponse,
  TillageDataListdefaultResponse,
  WeatherCreateDataDeleteJob202Response,
  WeatherCreateDataDeleteJobdefaultResponse,
  WeatherCreateDataIngestionJob202Response,
  WeatherCreateDataIngestionJobdefaultResponse,
  WeatherGetDataDeleteJobDetails200Response,
  WeatherGetDataDeleteJobDetailsdefaultResponse,
  WeatherGetDataIngestionJobDetails200Response,
  WeatherGetDataIngestionJobDetailsdefaultResponse,
  WeatherList200Response,
  WeatherListdefaultResponse,
} from "./responses";
import {
  ApplicationDataCreateOrUpdateParameters,
  ApplicationDataDeleteParameters,
  ApplicationDataGetParameters,
  ApplicationDataListByFarmerIdParameters,
  ApplicationDataListParameters,
  AttachmentsCreateOrUpdateParameters,
  AttachmentsDeleteParameters,
  AttachmentsDownloadParameters,
  AttachmentsGetParameters,
  AttachmentsListByFarmerIdParameters,
  BoundariesCreateCascadeDeleteJobParameters,
  BoundariesCreateOrUpdateParameters,
  BoundariesDeleteParameters,
  BoundariesGetCascadeDeleteJobDetailsParameters,
  BoundariesGetOverlapParameters,
  BoundariesGetParameters,
  BoundariesListByFarmerIdParameters,
  BoundariesListParameters,
  BoundariesSearchByFarmerIdParameters,
  BoundariesSearchParameters,
  CropVarietiesCreateOrUpdateParameters,
  CropVarietiesDeleteParameters,
  CropVarietiesGetParameters,
  CropVarietiesListByCropIdParameters,
  CropVarietiesListParameters,
  CropsCreateOrUpdateParameters,
  CropsDeleteParameters,
  CropsGetParameters,
  CropsListParameters,
  FarmOperationsCreateDataIngestionJobParameters,
  FarmOperationsGetDataIngestionJobDetailsParameters,
  FarmersCreateCascadeDeleteJobParameters,
  FarmersCreateOrUpdateParameters,
  FarmersDeleteParameters,
  FarmersGetCascadeDeleteJobDetailsParameters,
  FarmersGetParameters,
  FarmersListParameters,
  FarmsCreateCascadeDeleteJobParameters,
  FarmsCreateOrUpdateParameters,
  FarmsDeleteParameters,
  FarmsGetCascadeDeleteJobDetailsParameters,
  FarmsGetParameters,
  FarmsListByFarmerIdParameters,
  FarmsListParameters,
  FieldsCreateCascadeDeleteJobParameters,
  FieldsCreateOrUpdateParameters,
  FieldsDeleteParameters,
  FieldsGetCascadeDeleteJobDetailsParameters,
  FieldsGetParameters,
  FieldsListByFarmerIdParameters,
  FieldsListParameters,
  HarvestDataCreateOrUpdateParameters,
  HarvestDataDeleteParameters,
  HarvestDataGetParameters,
  HarvestDataListByFarmerIdParameters,
  HarvestDataListParameters,
  ImageProcessingCreateRasterizeJobParameters,
  ImageProcessingGetRasterizeJobParameters,
  OAuthProvidersCreateOrUpdateParameters,
  OAuthProvidersDeleteParameters,
  OAuthProvidersGetParameters,
  OAuthProvidersListParameters,
  OAuthTokensCreateCascadeDeleteJobParameters,
  OAuthTokensGetCascadeDeleteJobDetailsParameters,
  OAuthTokensGetOAuthConnectionLinkParameters,
  OAuthTokensListParameters,
  PlantingDataCreateOrUpdateParameters,
  PlantingDataDeleteParameters,
  PlantingDataGetParameters,
  PlantingDataListByFarmerIdParameters,
  PlantingDataListParameters,
  ScenesCreateSatelliteDataIngestionJobParameters,
  ScenesDownloadParameters,
  ScenesGetSatelliteDataIngestionJobDetailsParameters,
  ScenesListParameters,
  SeasonalFieldsCreateCascadeDeleteJobParameters,
  SeasonalFieldsCreateOrUpdateParameters,
  SeasonalFieldsDeleteParameters,
  SeasonalFieldsGetCascadeDeleteJobDetailsParameters,
  SeasonalFieldsGetParameters,
  SeasonalFieldsListByFarmerIdParameters,
  SeasonalFieldsListParameters,
  SeasonsCreateOrUpdateParameters,
  SeasonsDeleteParameters,
  SeasonsGetParameters,
  SeasonsListParameters,
  TillageDataCreateOrUpdateParameters,
  TillageDataDeleteParameters,
  TillageDataGetParameters,
  TillageDataListByFarmerIdParameters,
  TillageDataListParameters,
  WeatherCreateDataDeleteJobParameters,
  WeatherCreateDataIngestionJobParameters,
  WeatherGetDataDeleteJobDetailsParameters,
  WeatherGetDataIngestionJobDetailsParameters,
  WeatherListParameters,
} from "./parameters";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface ApplicationDataListByFarmerId {
  /** Returns a paginated list of application data resources under a particular farm. */
  get(
    options?: ApplicationDataListByFarmerIdParameters
  ): Promise<
    ApplicationDataListByFarmerId200Response | ApplicationDataListByFarmerIddefaultResponse
  >;
}

export interface ApplicationDataList {
  /** Returns a paginated list of application data resources across all farmers. */
  get(
    options?: ApplicationDataListParameters
  ): Promise<ApplicationDataList200Response | ApplicationDataListdefaultResponse>;
}

export interface ApplicationDataDelete {
  /** Get a specified application data resource under a particular farmer. */
  get(
    options?: ApplicationDataGetParameters
  ): Promise<ApplicationDataGet200Response | ApplicationDataGetdefaultResponse>;
  /** Creates or updates an application data resource under a particular farmer. */
  patch(
    options?: ApplicationDataCreateOrUpdateParameters
  ): Promise<
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified application data resource under a particular farmer. */
  delete(
    options?: ApplicationDataDeleteParameters
  ): Promise<ApplicationDataDelete204Response | ApplicationDataDeletedefaultResponse>;
}

export interface AttachmentsListByFarmerId {
  /** Returns a paginated list of attachment resources under a particular farmer. */
  get(
    options?: AttachmentsListByFarmerIdParameters
  ): Promise<AttachmentsListByFarmerId200Response | AttachmentsListByFarmerIddefaultResponse>;
}

export interface AttachmentsDelete {
  /** Gets a specified attachment resource under a particular farmer. */
  get(
    options?: AttachmentsGetParameters
  ): Promise<AttachmentsGet200Response | AttachmentsGetdefaultResponse>;
  /** Creates or updates an attachment resource under a particular farmer. */
  patch(
    options?: AttachmentsCreateOrUpdateParameters
  ): Promise<
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified attachment resource under a particular farmer. */
  delete(
    options?: AttachmentsDeleteParameters
  ): Promise<AttachmentsDelete204Response | AttachmentsDeletedefaultResponse>;
}

export interface AttachmentsDownload {
  /** Downloads and returns attachment as response for the given input filePath. */
  get(
    options?: AttachmentsDownloadParameters
  ): Promise<AttachmentsDownload200Response | AttachmentsDownloaddefaultResponse>;
}

export interface BoundariesSearchByFarmerId {
  /** Returns a paginated list of boundary resources under a particular farmer. */
  get(
    options?: BoundariesListByFarmerIdParameters
  ): Promise<BoundariesListByFarmerId200Response | BoundariesListByFarmerIddefaultResponse>;
  /** Search for boundaries by fields and intersecting geometry. */
  post(
    options?: BoundariesSearchByFarmerIdParameters
  ): Promise<BoundariesSearchByFarmerId200Response | BoundariesSearchByFarmerIddefaultResponse>;
}

export interface BoundariesSearch {
  /** Returns a paginated list of boundary resources across all farmers. */
  get(
    options?: BoundariesListParameters
  ): Promise<BoundariesList200Response | BoundariesListdefaultResponse>;
  /** Search for boundaries across all farmers by fields and intersecting geometry. */
  post(
    options?: BoundariesSearchParameters
  ): Promise<BoundariesSearch200Response | BoundariesSearchdefaultResponse>;
}

export interface BoundariesCreateCascadeDeleteJob {
  /** Get cascade delete job for specified boundary. */
  get(
    options?: BoundariesGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified boundary. */
  put(
    options?: BoundariesCreateCascadeDeleteJobParameters
  ): Promise<
    BoundariesCreateCascadeDeleteJob202Response | BoundariesCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface BoundariesDelete {
  /** Gets a specified boundary resource under a particular farmer. */
  get(
    options?: BoundariesGetParameters
  ): Promise<BoundariesGet200Response | BoundariesGetdefaultResponse>;
  /** Creates or updates a boundary resource. */
  patch(
    options?: BoundariesCreateOrUpdateParameters
  ): Promise<
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified boundary resource under a particular farmer. */
  delete(
    options?: BoundariesDeleteParameters
  ): Promise<BoundariesDelete204Response | BoundariesDeletedefaultResponse>;
}

export interface BoundariesGetOverlap {
  /** Returns overlapping acreage between two boundary Ids. */
  get(
    options?: BoundariesGetOverlapParameters
  ): Promise<BoundariesGetOverlap200Response | BoundariesGetOverlapdefaultResponse>;
}

export interface CropsList {
  /** Returns a paginated list of crop resources. */
  get(options?: CropsListParameters): Promise<CropsList200Response | CropsListdefaultResponse>;
}

export interface CropsDelete {
  /** Gets a specified crop resource. */
  get(options?: CropsGetParameters): Promise<CropsGet200Response | CropsGetdefaultResponse>;
  /** Creates or updates a crop resource. */
  patch(
    options?: CropsCreateOrUpdateParameters
  ): Promise<
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdatedefaultResponse
  >;
  /** Deletes Crop for given crop id. */
  delete(
    options?: CropsDeleteParameters
  ): Promise<CropsDelete204Response | CropsDeletedefaultResponse>;
}

export interface CropVarietiesListByCropId {
  /** Returns a paginated list of crop variety resources under a particular crop. */
  get(
    options?: CropVarietiesListByCropIdParameters
  ): Promise<CropVarietiesListByCropId200Response | CropVarietiesListByCropIddefaultResponse>;
}

export interface CropVarietiesList {
  /** Returns a paginated list of crop variety resources across all crops. */
  get(
    options?: CropVarietiesListParameters
  ): Promise<CropVarietiesList200Response | CropVarietiesListdefaultResponse>;
}

export interface CropVarietiesDelete {
  /** Gets a specified crop variety resource under a particular crop. */
  get(
    options?: CropVarietiesGetParameters
  ): Promise<CropVarietiesGet200Response | CropVarietiesGetdefaultResponse>;
  /** Creates or updates a crop variety resource. */
  patch(
    options?: CropVarietiesCreateOrUpdateParameters
  ): Promise<
    | CropVarietiesCreateOrUpdate200Response
    | CropVarietiesCreateOrUpdate201Response
    | CropVarietiesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified crop variety resource under a particular crop. */
  delete(
    options?: CropVarietiesDeleteParameters
  ): Promise<CropVarietiesDelete204Response | CropVarietiesDeletedefaultResponse>;
}

export interface FarmersList {
  /** Returns a paginated list of farmer resources. */
  get(
    options?: FarmersListParameters
  ): Promise<FarmersList200Response | FarmersListdefaultResponse>;
}

export interface FarmersDelete {
  /** Gets a specified farmer resource. */
  get(options?: FarmersGetParameters): Promise<FarmersGet200Response | FarmersGetdefaultResponse>;
  /** Creates or updates a farmer resource. */
  patch(
    options?: FarmersCreateOrUpdateParameters
  ): Promise<
    | FarmersCreateOrUpdate200Response
    | FarmersCreateOrUpdate201Response
    | FarmersCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified farmer resource. */
  delete(
    options?: FarmersDeleteParameters
  ): Promise<FarmersDelete204Response | FarmersDeletedefaultResponse>;
}

export interface FarmersCreateCascadeDeleteJob {
  /** Get a cascade delete job for specified farmer. */
  get(
    options?: FarmersGetCascadeDeleteJobDetailsParameters
  ): Promise<
    FarmersGetCascadeDeleteJobDetails200Response | FarmersGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified farmer. */
  put(
    options?: FarmersCreateCascadeDeleteJobParameters
  ): Promise<
    FarmersCreateCascadeDeleteJob202Response | FarmersCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface FarmOperationsGetDataIngestionJobDetails {
  /** Create a farm operation data ingestion job. */
  put(
    options?: FarmOperationsCreateDataIngestionJobParameters
  ): Promise<
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobdefaultResponse
  >;
  /** Get a farm operation data ingestion job. */
  get(
    options?: FarmOperationsGetDataIngestionJobDetailsParameters
  ): Promise<
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsdefaultResponse
  >;
}

export interface FarmsListByFarmerId {
  /** Returns a paginated list of farm resources under a particular farmer. */
  get(
    options?: FarmsListByFarmerIdParameters
  ): Promise<FarmsListByFarmerId200Response | FarmsListByFarmerIddefaultResponse>;
}

export interface FarmsList {
  /** Returns a paginated list of farm resources across all farmers. */
  get(options?: FarmsListParameters): Promise<FarmsList200Response | FarmsListdefaultResponse>;
}

export interface FarmsDelete {
  /** Gets a specified farm resource under a particular farmer. */
  get(options?: FarmsGetParameters): Promise<FarmsGet200Response | FarmsGetdefaultResponse>;
  /** Creates or updates a farm resource under a particular farmer. */
  patch(
    options?: FarmsCreateOrUpdateParameters
  ): Promise<
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified farm resource under a particular farmer. */
  delete(
    options?: FarmsDeleteParameters
  ): Promise<FarmsDelete204Response | FarmsDeletedefaultResponse>;
}

export interface FarmsCreateCascadeDeleteJob {
  /** Get a cascade delete job for specified farm. */
  get(
    options?: FarmsGetCascadeDeleteJobDetailsParameters
  ): Promise<
    FarmsGetCascadeDeleteJobDetails200Response | FarmsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified farm. */
  put(
    options?: FarmsCreateCascadeDeleteJobParameters
  ): Promise<FarmsCreateCascadeDeleteJob202Response | FarmsCreateCascadeDeleteJobdefaultResponse>;
}

export interface FieldsListByFarmerId {
  /** Returns a paginated list of field resources under a particular farmer. */
  get(
    options?: FieldsListByFarmerIdParameters
  ): Promise<FieldsListByFarmerId200Response | FieldsListByFarmerIddefaultResponse>;
}

export interface FieldsList {
  /** Returns a paginated list of field resources across all farmers. */
  get(options?: FieldsListParameters): Promise<FieldsList200Response | FieldsListdefaultResponse>;
}

export interface FieldsDelete {
  /** Gets a specified field resource under a particular farmer. */
  get(options?: FieldsGetParameters): Promise<FieldsGet200Response | FieldsGetdefaultResponse>;
  /** Creates or Updates a field resource under a particular farmer. */
  patch(
    options?: FieldsCreateOrUpdateParameters
  ): Promise<
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified field resource under a particular farmer. */
  delete(
    options?: FieldsDeleteParameters
  ): Promise<FieldsDelete204Response | FieldsDeletedefaultResponse>;
}

export interface FieldsCreateCascadeDeleteJob {
  /** Get a cascade delete job for specified field. */
  get(
    options?: FieldsGetCascadeDeleteJobDetailsParameters
  ): Promise<
    FieldsGetCascadeDeleteJobDetails200Response | FieldsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified field. */
  put(
    options?: FieldsCreateCascadeDeleteJobParameters
  ): Promise<FieldsCreateCascadeDeleteJob202Response | FieldsCreateCascadeDeleteJobdefaultResponse>;
}

export interface HarvestDataListByFarmerId {
  /** Returns a paginated list of harvest data resources under a particular farm. */
  get(
    options?: HarvestDataListByFarmerIdParameters
  ): Promise<HarvestDataListByFarmerId200Response | HarvestDataListByFarmerIddefaultResponse>;
}

export interface HarvestDataList {
  /** Returns a paginated list of harvest data resources across all farmers. */
  get(
    options?: HarvestDataListParameters
  ): Promise<HarvestDataList200Response | HarvestDataListdefaultResponse>;
}

export interface HarvestDataDelete {
  /** Get a specified harvest data resource under a particular farmer. */
  get(
    options?: HarvestDataGetParameters
  ): Promise<HarvestDataGet200Response | HarvestDataGetdefaultResponse>;
  /** Creates or updates harvest data resource under a particular farmer. */
  patch(
    options?: HarvestDataCreateOrUpdateParameters
  ): Promise<
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified harvest data resource under a particular farmer. */
  delete(
    options?: HarvestDataDeleteParameters
  ): Promise<HarvestDataDelete204Response | HarvestDataDeletedefaultResponse>;
}

export interface ImageProcessingGetRasterizeJob {
  /** Create a ImageProcessing Rasterize job. */
  put(
    options?: ImageProcessingCreateRasterizeJobParameters
  ): Promise<
    ImageProcessingCreateRasterizeJob202Response | ImageProcessingCreateRasterizeJobdefaultResponse
  >;
  /** Get ImageProcessing Rasterize job's details. */
  get(
    options?: ImageProcessingGetRasterizeJobParameters
  ): Promise<ImageProcessingGetRasterizeJob200Response>;
}

export interface OAuthProvidersList {
  /** Returns a paginated list of oauthProvider resources. */
  get(
    options?: OAuthProvidersListParameters
  ): Promise<OAuthProvidersList200Response | OAuthProvidersListdefaultResponse>;
}

export interface OAuthProvidersDelete {
  /** Get a specified oauthProvider resource. */
  get(
    options?: OAuthProvidersGetParameters
  ): Promise<OAuthProvidersGet200Response | OAuthProvidersGetdefaultResponse>;
  /** Creates or updates an oauthProvider resource. */
  patch(
    options?: OAuthProvidersCreateOrUpdateParameters
  ): Promise<
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdatedefaultResponse
  >;
  /** Deletes an specified oauthProvider resource. */
  delete(
    options?: OAuthProvidersDeleteParameters
  ): Promise<OAuthProvidersDelete204Response | OAuthProvidersDeletedefaultResponse>;
}

export interface OAuthTokensList {
  /** Returns a list of OAuthToken documents. */
  get(
    options?: OAuthTokensListParameters
  ): Promise<OAuthTokensList200Response | OAuthTokensListdefaultResponse>;
}

export interface OAuthTokensGetOAuthConnectionLink {
  /** Returns Connection link needed in the OAuth flow. */
  post(
    options?: OAuthTokensGetOAuthConnectionLinkParameters
  ): Promise<
    OAuthTokensGetOAuthConnectionLink200Response | OAuthTokensGetOAuthConnectionLinkdefaultResponse
  >;
}

export interface OAuthTokensCreateCascadeDeleteJob {
  /** Get cascade delete job details for OAuth tokens for specified job ID. */
  get(
    options?: OAuthTokensGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for OAuth tokens. */
  put(
    options?: OAuthTokensCreateCascadeDeleteJobParameters
  ): Promise<
    OAuthTokensCreateCascadeDeleteJob202Response | OAuthTokensCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface PlantingDataListByFarmerId {
  /** Returns a paginated list of planting data resources under a particular farm. */
  get(
    options?: PlantingDataListByFarmerIdParameters
  ): Promise<PlantingDataListByFarmerId200Response | PlantingDataListByFarmerIddefaultResponse>;
}

export interface PlantingDataList {
  /** Returns a paginated list of planting data resources across all farmers. */
  get(
    options?: PlantingDataListParameters
  ): Promise<PlantingDataList200Response | PlantingDataListdefaultResponse>;
}

export interface PlantingDataDelete {
  /** Get a specified planting data resource under a particular farmer. */
  get(
    options?: PlantingDataGetParameters
  ): Promise<PlantingDataGet200Response | PlantingDataGetdefaultResponse>;
  /** Creates or updates an planting data resource under a particular farmer. */
  patch(
    options?: PlantingDataCreateOrUpdateParameters
  ): Promise<
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified planting data resource under a particular farmer. */
  delete(
    options?: PlantingDataDeleteParameters
  ): Promise<PlantingDataDelete204Response | PlantingDataDeletedefaultResponse>;
}

export interface ScenesList {
  /** Returns a paginated list of scene resources. */
  get(options?: ScenesListParameters): Promise<ScenesList200Response | ScenesListdefaultResponse>;
}

export interface ScenesGetSatelliteDataIngestionJobDetails {
  /** Create a satellite data ingestion job. */
  put(
    options?: ScenesCreateSatelliteDataIngestionJobParameters
  ): Promise<
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobdefaultResponse
  >;
  /** Get a satellite data ingestion job. */
  get(
    options?: ScenesGetSatelliteDataIngestionJobDetailsParameters
  ): Promise<
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
  >;
}

export interface ScenesDownload {
  /** Downloads and returns file stream as response for the given input filePath. */
  get(
    options?: ScenesDownloadParameters
  ): Promise<ScenesDownload200Response | ScenesDownloaddefaultResponse>;
}

export interface SeasonalFieldsListByFarmerId {
  /** Returns a paginated list of seasonal field resources under a particular farmer. */
  get(
    options?: SeasonalFieldsListByFarmerIdParameters
  ): Promise<SeasonalFieldsListByFarmerId200Response | SeasonalFieldsListByFarmerIddefaultResponse>;
}

export interface SeasonalFieldsList {
  /** Returns a paginated list of seasonal field resources across all farmers. */
  get(
    options?: SeasonalFieldsListParameters
  ): Promise<SeasonalFieldsList200Response | SeasonalFieldsListdefaultResponse>;
}

export interface SeasonalFieldsDelete {
  /** Gets a specified seasonal field resource under a particular farmer. */
  get(
    options?: SeasonalFieldsGetParameters
  ): Promise<SeasonalFieldsGet200Response | SeasonalFieldsGetdefaultResponse>;
  /** Creates or Updates a seasonal field resource under a particular farmer. */
  patch(
    options?: SeasonalFieldsCreateOrUpdateParameters
  ): Promise<
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified seasonal-field resource under a particular farmer. */
  delete(
    options?: SeasonalFieldsDeleteParameters
  ): Promise<SeasonalFieldsDelete204Response | SeasonalFieldsDeletedefaultResponse>;
}

export interface SeasonalFieldsCreateCascadeDeleteJob {
  /** Get cascade delete job for specified seasonal field. */
  get(
    options?: SeasonalFieldsGetCascadeDeleteJobDetailsParameters
  ): Promise<
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified seasonal field. */
  put(
    options?: SeasonalFieldsCreateCascadeDeleteJobParameters
  ): Promise<
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface SeasonsList {
  /** Returns a paginated list of season resources. */
  get(
    options?: SeasonsListParameters
  ): Promise<SeasonsList200Response | SeasonsListdefaultResponse>;
}

export interface SeasonsDelete {
  /** Gets a specified season resource. */
  get(options?: SeasonsGetParameters): Promise<SeasonsGet200Response | SeasonsGetdefaultResponse>;
  /** Creates or updates a season resource. */
  patch(
    options?: SeasonsCreateOrUpdateParameters
  ): Promise<
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified season resource. */
  delete(
    options?: SeasonsDeleteParameters
  ): Promise<SeasonsDelete204Response | SeasonsDeletedefaultResponse>;
}

export interface TillageDataListByFarmerId {
  /** Returns a paginated list of tillage data resources under a particular farm. */
  get(
    options?: TillageDataListByFarmerIdParameters
  ): Promise<TillageDataListByFarmerId200Response | TillageDataListByFarmerIddefaultResponse>;
}

export interface TillageDataList {
  /** Returns a paginated list of tillage data resources across all farmers. */
  get(
    options?: TillageDataListParameters
  ): Promise<TillageDataList200Response | TillageDataListdefaultResponse>;
}

export interface TillageDataDelete {
  /** Get a specified tillage data resource under a particular farmer. */
  get(
    options?: TillageDataGetParameters
  ): Promise<TillageDataGet200Response | TillageDataGetdefaultResponse>;
  /** Creates or updates an tillage data resource under a particular farmer. */
  patch(
    options?: TillageDataCreateOrUpdateParameters
  ): Promise<
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified tillage data resource under a particular farmer. */
  delete(
    options?: TillageDataDeleteParameters
  ): Promise<TillageDataDelete204Response | TillageDataDeletedefaultResponse>;
}

export interface WeatherList {
  /** Returns a paginated list of weather data. */
  get(
    options?: WeatherListParameters
  ): Promise<WeatherList200Response | WeatherListdefaultResponse>;
}

export interface WeatherCreateDataIngestionJob {
  /** Get weather ingestion job. */
  get(
    options?: WeatherGetDataIngestionJobDetailsParameters
  ): Promise<
    WeatherGetDataIngestionJobDetails200Response | WeatherGetDataIngestionJobDetailsdefaultResponse
  >;
  /** Create a weather data ingestion job. */
  put(
    options?: WeatherCreateDataIngestionJobParameters
  ): Promise<
    WeatherCreateDataIngestionJob202Response | WeatherCreateDataIngestionJobdefaultResponse
  >;
}

export interface WeatherCreateDataDeleteJob {
  /** Get weather data delete job. */
  get(
    options?: WeatherGetDataDeleteJobDetailsParameters
  ): Promise<
    WeatherGetDataDeleteJobDetails200Response | WeatherGetDataDeleteJobDetailsdefaultResponse
  >;
  /** Create a weather data delete job. */
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
  ): ApplicationDataDelete;
  /** Resource for '/farmers/\{farmerId\}/attachments' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/attachments", farmerId: string): AttachmentsListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/attachments/\{attachmentId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/attachments/{attachmentId}",
    farmerId: string,
    attachmentId: string
  ): AttachmentsDelete;
  /** Resource for '/farmers/\{farmerId\}/attachments/\{attachmentId\}/file' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/attachments/{attachmentId}/file",
    farmerId: string,
    attachmentId: string
  ): AttachmentsDownload;
  /** Resource for '/farmers/\{farmerId\}/boundaries' has methods for the following verbs: get, post */
  (path: "/farmers/{farmerId}/boundaries", farmerId: string): BoundariesSearchByFarmerId;
  /** Resource for '/boundaries' has methods for the following verbs: get, post */
  (path: "/boundaries"): BoundariesSearch;
  /** Resource for '/boundaries/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/boundaries/cascade-delete/{jobId}", jobId: string): BoundariesCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/boundaries/\{boundaryId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/boundaries/{boundaryId}",
    farmerId: string,
    boundaryId: string
  ): BoundariesDelete;
  /** Resource for '/farmers/\{farmerId\}/boundaries/\{boundaryId\}/overlap' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/boundaries/{boundaryId}/overlap",
    farmerId: string,
    boundaryId: string
  ): BoundariesGetOverlap;
  /** Resource for '/crops' has methods for the following verbs: get */
  (path: "/crops"): CropsList;
  /** Resource for '/crops/\{cropId\}' has methods for the following verbs: get, patch, delete */
  (path: "/crops/{cropId}", cropId: string): CropsDelete;
  /** Resource for '/crops/\{cropId\}/crop-varieties' has methods for the following verbs: get */
  (path: "/crops/{cropId}/crop-varieties", cropId: string): CropVarietiesListByCropId;
  /** Resource for '/crop-varieties' has methods for the following verbs: get */
  (path: "/crop-varieties"): CropVarietiesList;
  /** Resource for '/crops/\{cropId\}/crop-varieties/\{cropVarietyId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/crops/{cropId}/crop-varieties/{cropVarietyId}",
    cropId: string,
    cropVarietyId: string
  ): CropVarietiesDelete;
  /** Resource for '/farmers' has methods for the following verbs: get */
  (path: "/farmers"): FarmersList;
  /** Resource for '/farmers/\{farmerId\}' has methods for the following verbs: get, patch, delete */
  (path: "/farmers/{farmerId}", farmerId: string): FarmersDelete;
  /** Resource for '/farmers/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/farmers/cascade-delete/{jobId}", jobId: string): FarmersCreateCascadeDeleteJob;
  /** Resource for '/farm-operations/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/farm-operations/ingest-data/{jobId}",
    jobId: string
  ): FarmOperationsGetDataIngestionJobDetails;
  /** Resource for '/farmers/\{farmerId\}/farms' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/farms", farmerId: string): FarmsListByFarmerId;
  /** Resource for '/farms' has methods for the following verbs: get */
  (path: "/farms"): FarmsList;
  /** Resource for '/farmers/\{farmerId\}/farms/\{farmId\}' has methods for the following verbs: get, patch, delete */
  (path: "/farmers/{farmerId}/farms/{farmId}", farmerId: string, farmId: string): FarmsDelete;
  /** Resource for '/farms/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/farms/cascade-delete/{jobId}", jobId: string): FarmsCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/fields' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/fields", farmerId: string): FieldsListByFarmerId;
  /** Resource for '/fields' has methods for the following verbs: get */
  (path: "/fields"): FieldsList;
  /** Resource for '/farmers/\{farmerId\}/fields/\{fieldId\}' has methods for the following verbs: get, patch, delete */
  (path: "/farmers/{farmerId}/fields/{fieldId}", farmerId: string, fieldId: string): FieldsDelete;
  /** Resource for '/fields/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/fields/cascade-delete/{jobId}", jobId: string): FieldsCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/harvest-data' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/harvest-data", farmerId: string): HarvestDataListByFarmerId;
  /** Resource for '/harvest-data' has methods for the following verbs: get */
  (path: "/harvest-data"): HarvestDataList;
  /** Resource for '/farmers/\{farmerId\}/harvest-data/\{harvestDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/harvest-data/{harvestDataId}",
    farmerId: string,
    harvestDataId: string
  ): HarvestDataDelete;
  /** Resource for '/image-processing/rasterize/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/image-processing/rasterize/{jobId}", jobId: string): ImageProcessingGetRasterizeJob;
  /** Resource for '/oauth/providers' has methods for the following verbs: get */
  (path: "/oauth/providers"): OAuthProvidersList;
  /** Resource for '/oauth/providers/\{oauthProviderId\}' has methods for the following verbs: get, patch, delete */
  (path: "/oauth/providers/{oauthProviderId}", oauthProviderId: string): OAuthProvidersDelete;
  /** Resource for '/oauth/tokens' has methods for the following verbs: get */
  (path: "/oauth/tokens"): OAuthTokensList;
  /** Resource for '/oauth/tokens/:connect' has methods for the following verbs: post */
  (path: "/oauth/tokens/:connect"): OAuthTokensGetOAuthConnectionLink;
  /** Resource for '/oauth/tokens/remove/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/oauth/tokens/remove/{jobId}", jobId: string): OAuthTokensCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/planting-data' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/planting-data", farmerId: string): PlantingDataListByFarmerId;
  /** Resource for '/planting-data' has methods for the following verbs: get */
  (path: "/planting-data"): PlantingDataList;
  /** Resource for '/farmers/\{farmerId\}/planting-data/\{plantingDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/planting-data/{plantingDataId}",
    farmerId: string,
    plantingDataId: string
  ): PlantingDataDelete;
  /** Resource for '/scenes' has methods for the following verbs: get */
  (path: "/scenes"): ScenesList;
  /** Resource for '/scenes/satellite/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/scenes/satellite/ingest-data/{jobId}",
    jobId: string
  ): ScenesGetSatelliteDataIngestionJobDetails;
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
  ): SeasonalFieldsDelete;
  /** Resource for '/seasonal-fields/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/seasonal-fields/cascade-delete/{jobId}",
    jobId: string
  ): SeasonalFieldsCreateCascadeDeleteJob;
  /** Resource for '/seasons' has methods for the following verbs: get */
  (path: "/seasons"): SeasonsList;
  /** Resource for '/seasons/\{seasonId\}' has methods for the following verbs: get, patch, delete */
  (path: "/seasons/{seasonId}", seasonId: string): SeasonsDelete;
  /** Resource for '/farmers/\{farmerId\}/tillage-data' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/tillage-data", farmerId: string): TillageDataListByFarmerId;
  /** Resource for '/tillage-data' has methods for the following verbs: get */
  (path: "/tillage-data"): TillageDataList;
  /** Resource for '/farmers/\{farmerId\}/tillage-data/\{tillageDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/tillage-data/{tillageDataId}",
    farmerId: string,
    tillageDataId: string
  ): TillageDataDelete;
  /** Resource for '/weather' has methods for the following verbs: get */
  (path: "/weather"): WeatherList;
  /** Resource for '/weather/ingest-data/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/weather/ingest-data/{jobId}", jobId: string): WeatherCreateDataIngestionJob;
  /** Resource for '/weather/delete-data/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/weather/delete-data/{jobId}", jobId: string): WeatherCreateDataDeleteJob;
}

export type FarmBeatsRestClient = Client & {
  path: Routes;
};

export default function FarmBeats(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): FarmBeatsRestClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}`;
  options.apiVersion = options.apiVersion ?? "2021-03-31-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://farmbeats.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as FarmBeatsRestClient;
}
