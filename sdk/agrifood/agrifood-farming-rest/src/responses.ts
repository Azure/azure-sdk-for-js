// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ApplicationDataListResponse,
  ErrorResponse,
  ApplicationData,
  AttachmentListResponse,
  Attachment,
  BoundaryListResponse,
  CascadeDeleteJob,
  Boundary,
  BoundaryOverlapResponse,
  CropListResponse,
  Crop,
  CropVarietyListResponse,
  CropVariety,
  FarmerListResponse,
  Farmer,
  FarmOperationDataIngestionJob,
  FarmListResponse,
  Farm,
  FieldListResponse,
  Field,
  HarvestDataListResponse,
  HarvestData,
  ImageProcessingRasterizeJob,
  OAuthProviderListResponse,
  OAuthProvider,
  OAuthTokenListResponse,
  PlantingDataListResponse,
  PlantingData,
  SceneListResponse,
  SatelliteDataIngestionJob,
  SeasonalFieldListResponse,
  SeasonalField,
  SeasonListResponse,
  Season,
  TillageDataListResponse,
  TillageData,
  WeatherDataListResponse,
  WeatherDataIngestionJob,
  WeatherDataDeleteJob,
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";

/** Returns a paginated list of application data resources under a particular farm. */
export interface ApplicationDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponse;
}

/** Returns a paginated list of application data resources under a particular farm. */
export interface ApplicationDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of application data resources across all farmers. */
export interface ApplicationDataList200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponse;
}

/** Returns a paginated list of application data resources across all farmers. */
export interface ApplicationDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a specified application data resource under a particular farmer. */
export interface ApplicationDataGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationData;
}

/** Get a specified application data resource under a particular farmer. */
export interface ApplicationDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates an application data resource under a particular farmer. */
export interface ApplicationDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationData;
}

/** Creates or updates an application data resource under a particular farmer. */
export interface ApplicationDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ApplicationData;
}

/** Creates or updates an application data resource under a particular farmer. */
export interface ApplicationDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified application data resource under a particular farmer. */
export interface ApplicationDataDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified application data resource under a particular farmer. */
export interface ApplicationDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of attachment resources under a particular farmer. */
export interface AttachmentsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: AttachmentListResponse;
}

/** Returns a paginated list of attachment resources under a particular farmer. */
export interface AttachmentsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified attachment resource under a particular farmer. */
export interface AttachmentsGet200Response extends HttpResponse {
  status: "200";
  body: Attachment;
}

/** Gets a specified attachment resource under a particular farmer. */
export interface AttachmentsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates an attachment resource under a particular farmer. */
export interface AttachmentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Attachment;
}

/** Creates or updates an attachment resource under a particular farmer. */
export interface AttachmentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Attachment;
}

/** Creates or updates an attachment resource under a particular farmer. */
export interface AttachmentsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified attachment resource under a particular farmer. */
export interface AttachmentsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified attachment resource under a particular farmer. */
export interface AttachmentsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownload200Response extends HttpResponse {
  status: "200";
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownloaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of boundary resources under a particular farmer. */
export interface BoundariesListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/** Returns a paginated list of boundary resources under a particular farmer. */
export interface BoundariesListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of boundary resources across all farmers. */
export interface BoundariesList200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/** Returns a paginated list of boundary resources across all farmers. */
export interface BoundariesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Search for boundaries across all farmers by fields and intersecting geometry. */
export interface BoundariesSearch200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponse;
}

/** Search for boundaries across all farmers by fields and intersecting geometry. */
export interface BoundariesSearchdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified boundary resource under a particular farmer. */
export interface BoundariesGet200Response extends HttpResponse {
  status: "200";
  body: Boundary;
}

/** Gets a specified boundary resource under a particular farmer. */
export interface BoundariesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Boundary;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Boundary;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified boundary resource under a particular farmer. */
export interface BoundariesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified boundary resource under a particular farmer. */
export interface BoundariesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns overlapping acreage between two boundary Ids. */
export interface BoundariesGetOverlap200Response extends HttpResponse {
  status: "200";
  body: BoundaryOverlapResponse;
}

/** Returns overlapping acreage between two boundary Ids. */
export interface BoundariesGetOverlapdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of crop resources. */
export interface CropsList200Response extends HttpResponse {
  status: "200";
  body: CropListResponse;
}

/** Returns a paginated list of crop resources. */
export interface CropsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified crop resource. */
export interface CropsGet200Response extends HttpResponse {
  status: "200";
  body: Crop;
}

/** Gets a specified crop resource. */
export interface CropsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Crop;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Crop;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes Crop for given crop id. */
export interface CropsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes Crop for given crop id. */
export interface CropsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of crop variety resources under a particular crop. */
export interface CropVarietiesListByCropId200Response extends HttpResponse {
  status: "200";
  body: CropVarietyListResponse;
}

/** Returns a paginated list of crop variety resources under a particular crop. */
export interface CropVarietiesListByCropIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of crop variety resources across all crops. */
export interface CropVarietiesList200Response extends HttpResponse {
  status: "200";
  body: CropVarietyListResponse;
}

/** Returns a paginated list of crop variety resources across all crops. */
export interface CropVarietiesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified crop variety resource under a particular crop. */
export interface CropVarietiesGet200Response extends HttpResponse {
  status: "200";
  body: CropVariety;
}

/** Gets a specified crop variety resource under a particular crop. */
export interface CropVarietiesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a crop variety resource. */
export interface CropVarietiesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CropVariety;
}

/** Creates or updates a crop variety resource. */
export interface CropVarietiesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CropVariety;
}

/** Creates or updates a crop variety resource. */
export interface CropVarietiesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified crop variety resource under a particular crop. */
export interface CropVarietiesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified crop variety resource under a particular crop. */
export interface CropVarietiesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of farmer resources. */
export interface FarmersList200Response extends HttpResponse {
  status: "200";
  body: FarmerListResponse;
}

/** Returns a paginated list of farmer resources. */
export interface FarmersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified farmer resource. */
export interface FarmersGet200Response extends HttpResponse {
  status: "200";
  body: Farmer;
}

/** Gets a specified farmer resource. */
export interface FarmersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a farmer resource. */
export interface FarmersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Farmer;
}

/** Creates or updates a farmer resource. */
export interface FarmersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Farmer;
}

/** Creates or updates a farmer resource. */
export interface FarmersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified farmer resource. */
export interface FarmersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified farmer resource. */
export interface FarmersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a cascade delete job for specified farmer. */
export interface FarmersGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/** Get a cascade delete job for specified farmer. */
export interface FarmersGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a cascade delete job for specified farmer. */
export interface FarmersCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/** Create a cascade delete job for specified farmer. */
export interface FarmersCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: FarmOperationDataIngestionJob;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: FarmOperationDataIngestionJob;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of farm resources under a particular farmer. */
export interface FarmsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FarmListResponse;
}

/** Returns a paginated list of farm resources under a particular farmer. */
export interface FarmsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of farm resources across all farmers. */
export interface FarmsList200Response extends HttpResponse {
  status: "200";
  body: FarmListResponse;
}

/** Returns a paginated list of farm resources across all farmers. */
export interface FarmsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified farm resource under a particular farmer. */
export interface FarmsGet200Response extends HttpResponse {
  status: "200";
  body: Farm;
}

/** Gets a specified farm resource under a particular farmer. */
export interface FarmsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a farm resource under a particular farmer. */
export interface FarmsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Farm;
}

/** Creates or updates a farm resource under a particular farmer. */
export interface FarmsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Farm;
}

/** Creates or updates a farm resource under a particular farmer. */
export interface FarmsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified farm resource under a particular farmer. */
export interface FarmsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified farm resource under a particular farmer. */
export interface FarmsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of field resources under a particular farmer. */
export interface FieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FieldListResponse;
}

/** Returns a paginated list of field resources under a particular farmer. */
export interface FieldsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of field resources across all farmers. */
export interface FieldsList200Response extends HttpResponse {
  status: "200";
  body: FieldListResponse;
}

/** Returns a paginated list of field resources across all farmers. */
export interface FieldsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified field resource under a particular farmer. */
export interface FieldsGet200Response extends HttpResponse {
  status: "200";
  body: Field;
}

/** Gets a specified field resource under a particular farmer. */
export interface FieldsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or Updates a field resource under a particular farmer. */
export interface FieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Field;
}

/** Creates or Updates a field resource under a particular farmer. */
export interface FieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Field;
}

/** Creates or Updates a field resource under a particular farmer. */
export interface FieldsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified field resource under a particular farmer. */
export interface FieldsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified field resource under a particular farmer. */
export interface FieldsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponse;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of harvest data resources across all farmers. */
export interface HarvestDataList200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponse;
}

/** Returns a paginated list of harvest data resources across all farmers. */
export interface HarvestDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a specified harvest data resource under a particular farmer. */
export interface HarvestDataGet200Response extends HttpResponse {
  status: "200";
  body: HarvestData;
}

/** Get a specified harvest data resource under a particular farmer. */
export interface HarvestDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates harvest data resource under a particular farmer. */
export interface HarvestDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: HarvestData;
}

/** Creates or updates harvest data resource under a particular farmer. */
export interface HarvestDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: HarvestData;
}

/** Creates or updates harvest data resource under a particular farmer. */
export interface HarvestDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified harvest data resource under a particular farmer. */
export interface HarvestDataDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified harvest data resource under a particular farmer. */
export interface HarvestDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJob202Response extends HttpResponse {
  status: "202";
  body: ImageProcessingRasterizeJob;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJobdefaultResponse extends HttpResponse {
  status: "500";
}

/** Get ImageProcessing Rasterize job's details. */
export interface ImageProcessingGetRasterizeJob200Response extends HttpResponse {
  status: "200";
  body: ImageProcessingRasterizeJob;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersList200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderListResponse;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGet200Response extends HttpResponse {
  status: "200";
  body: OAuthProvider;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: OAuthProvider;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: OAuthProvider;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensList200Response extends HttpResponse {
  status: "200";
  body: OAuthTokenListResponse;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLink200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLinkdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get cascade delete job details for OAuth tokens for specified job ID. */
export interface OAuthTokensGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/** Get cascade delete job details for OAuth tokens for specified job ID. */
export interface OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a cascade delete job for OAuth tokens. */
export interface OAuthTokensCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/** Create a cascade delete job for OAuth tokens. */
export interface OAuthTokensCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of planting data resources under a particular farm. */
export interface PlantingDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponse;
}

/** Returns a paginated list of planting data resources under a particular farm. */
export interface PlantingDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of planting data resources across all farmers. */
export interface PlantingDataList200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponse;
}

/** Returns a paginated list of planting data resources across all farmers. */
export interface PlantingDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a specified planting data resource under a particular farmer. */
export interface PlantingDataGet200Response extends HttpResponse {
  status: "200";
  body: PlantingData;
}

/** Get a specified planting data resource under a particular farmer. */
export interface PlantingDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates an planting data resource under a particular farmer. */
export interface PlantingDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PlantingData;
}

/** Creates or updates an planting data resource under a particular farmer. */
export interface PlantingDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PlantingData;
}

/** Creates or updates an planting data resource under a particular farmer. */
export interface PlantingDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified planting data resource under a particular farmer. */
export interface PlantingDataDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified planting data resource under a particular farmer. */
export interface PlantingDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of scene resources. */
export interface ScenesList200Response extends HttpResponse {
  status: "200";
  body: SceneListResponse;
}

/** Returns a paginated list of scene resources. */
export interface ScenesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: SatelliteDataIngestionJob;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: SatelliteDataIngestionJob;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Downloads and returns file stream as response for the given input filePath. */
export interface ScenesDownload200Response extends HttpResponse {
  status: "200";
}

/** Downloads and returns file stream as response for the given input filePath. */
export interface ScenesDownloaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of seasonal field resources under a particular farmer. */
export interface SeasonalFieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponse;
}

/** Returns a paginated list of seasonal field resources under a particular farmer. */
export interface SeasonalFieldsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of seasonal field resources across all farmers. */
export interface SeasonalFieldsList200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponse;
}

/** Returns a paginated list of seasonal field resources across all farmers. */
export interface SeasonalFieldsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified seasonal field resource under a particular farmer. */
export interface SeasonalFieldsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonalField;
}

/** Gets a specified seasonal field resource under a particular farmer. */
export interface SeasonalFieldsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or Updates a seasonal field resource under a particular farmer. */
export interface SeasonalFieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SeasonalField;
}

/** Creates or Updates a seasonal field resource under a particular farmer. */
export interface SeasonalFieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SeasonalField;
}

/** Creates or Updates a seasonal field resource under a particular farmer. */
export interface SeasonalFieldsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified seasonal-field resource under a particular farmer. */
export interface SeasonalFieldsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified seasonal-field resource under a particular farmer. */
export interface SeasonalFieldsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJob;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJob;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of season resources. */
export interface SeasonsList200Response extends HttpResponse {
  status: "200";
  body: SeasonListResponse;
}

/** Returns a paginated list of season resources. */
export interface SeasonsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Gets a specified season resource. */
export interface SeasonsGet200Response extends HttpResponse {
  status: "200";
  body: Season;
}

/** Gets a specified season resource. */
export interface SeasonsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Season;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Season;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified season resource. */
export interface SeasonsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified season resource. */
export interface SeasonsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponse;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of tillage data resources across all farmers. */
export interface TillageDataList200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponse;
}

/** Returns a paginated list of tillage data resources across all farmers. */
export interface TillageDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get a specified tillage data resource under a particular farmer. */
export interface TillageDataGet200Response extends HttpResponse {
  status: "200";
  body: TillageData;
}

/** Get a specified tillage data resource under a particular farmer. */
export interface TillageDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Creates or updates an tillage data resource under a particular farmer. */
export interface TillageDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TillageData;
}

/** Creates or updates an tillage data resource under a particular farmer. */
export interface TillageDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: TillageData;
}

/** Creates or updates an tillage data resource under a particular farmer. */
export interface TillageDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Deletes a specified tillage data resource under a particular farmer. */
export interface TillageDataDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a specified tillage data resource under a particular farmer. */
export interface TillageDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Returns a paginated list of weather data. */
export interface WeatherList200Response extends HttpResponse {
  status: "200";
  body: WeatherDataListResponse;
}

/** Returns a paginated list of weather data. */
export interface WeatherListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: WeatherDataIngestionJob;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataIngestionJob;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: WeatherDataDeleteJob;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataDeleteJob;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponse;
}
