// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  ApplicationDataListResponseOutput,
  ErrorResponseOutput,
  ApplicationDataOutput,
  AttachmentListResponseOutput,
  AttachmentOutput,
  BoundaryListResponseOutput,
  CascadeDeleteJobOutput,
  BoundaryOutput,
  BoundaryOverlapResponseOutput,
  CropListResponseOutput,
  CropOutput,
  CropVarietyListResponseOutput,
  CropVarietyOutput,
  FarmerListResponseOutput,
  FarmerOutput,
  FarmOperationDataIngestionJobOutput,
  FarmListResponseOutput,
  FarmOutput,
  FieldListResponseOutput,
  FieldOutput,
  HarvestDataListResponseOutput,
  HarvestDataOutput,
  ImageProcessingRasterizeJobOutput,
  OAuthProviderListResponseOutput,
  OAuthProviderOutput,
  OAuthTokenListResponseOutput,
  PlantingDataListResponseOutput,
  PlantingDataOutput,
  SceneListResponseOutput,
  SatelliteDataIngestionJobOutput,
  SeasonalFieldListResponseOutput,
  SeasonalFieldOutput,
  SeasonListResponseOutput,
  SeasonOutput,
  TillageDataListResponseOutput,
  TillageDataOutput,
  WeatherDataListResponseOutput,
  WeatherDataIngestionJobOutput,
  WeatherDataDeleteJobOutput,
} from "./outputModels";

/** Returns a paginated list of application data resources under a particular farm. */
export interface ApplicationDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponseOutput;
}

/** Returns a paginated list of application data resources under a particular farm. */
export interface ApplicationDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of application data resources across all farmers. */
export interface ApplicationDataList200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponseOutput;
}

/** Returns a paginated list of application data resources across all farmers. */
export interface ApplicationDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specified application data resource under a particular farmer. */
export interface ApplicationDataGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataOutput;
}

/** Get a specified application data resource under a particular farmer. */
export interface ApplicationDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates an application data resource under a particular farmer. */
export interface ApplicationDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataOutput;
}

/** Creates or updates an application data resource under a particular farmer. */
export interface ApplicationDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ApplicationDataOutput;
}

/** Creates or updates an application data resource under a particular farmer. */
export interface ApplicationDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified application data resource under a particular farmer. */
export interface ApplicationDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified application data resource under a particular farmer. */
export interface ApplicationDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of attachment resources under a particular farmer. */
export interface AttachmentsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: AttachmentListResponseOutput;
}

/** Returns a paginated list of attachment resources under a particular farmer. */
export interface AttachmentsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified attachment resource under a particular farmer. */
export interface AttachmentsGet200Response extends HttpResponse {
  status: "200";
  body: AttachmentOutput;
}

/** Gets a specified attachment resource under a particular farmer. */
export interface AttachmentsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates an attachment resource under a particular farmer. */
export interface AttachmentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AttachmentOutput;
}

/** Creates or updates an attachment resource under a particular farmer. */
export interface AttachmentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: AttachmentOutput;
}

/** Creates or updates an attachment resource under a particular farmer. */
export interface AttachmentsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified attachment resource under a particular farmer. */
export interface AttachmentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified attachment resource under a particular farmer. */
export interface AttachmentsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownload200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownloaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of boundary resources under a particular farmer. */
export interface BoundariesListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponseOutput;
}

/** Returns a paginated list of boundary resources under a particular farmer. */
export interface BoundariesListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponseOutput;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of boundary resources across all farmers. */
export interface BoundariesList200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponseOutput;
}

/** Returns a paginated list of boundary resources across all farmers. */
export interface BoundariesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Search for boundaries across all farmers by fields and intersecting geometry. */
export interface BoundariesSearch200Response extends HttpResponse {
  status: "200";
  body: BoundaryListResponseOutput;
}

/** Search for boundaries across all farmers by fields and intersecting geometry. */
export interface BoundariesSearchdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified boundary resource under a particular farmer. */
export interface BoundariesGet200Response extends HttpResponse {
  status: "200";
  body: BoundaryOutput;
}

/** Gets a specified boundary resource under a particular farmer. */
export interface BoundariesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: BoundaryOutput;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: BoundaryOutput;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified boundary resource under a particular farmer. */
export interface BoundariesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified boundary resource under a particular farmer. */
export interface BoundariesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns overlapping acreage between two boundary Ids. */
export interface BoundariesGetOverlap200Response extends HttpResponse {
  status: "200";
  body: BoundaryOverlapResponseOutput;
}

/** Returns overlapping acreage between two boundary Ids. */
export interface BoundariesGetOverlapdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of crop resources. */
export interface CropsList200Response extends HttpResponse {
  status: "200";
  body: CropListResponseOutput;
}

/** Returns a paginated list of crop resources. */
export interface CropsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified crop resource. */
export interface CropsGet200Response extends HttpResponse {
  status: "200";
  body: CropOutput;
}

/** Gets a specified crop resource. */
export interface CropsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CropOutput;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CropOutput;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes Crop for given crop id. */
export interface CropsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes Crop for given crop id. */
export interface CropsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of crop variety resources under a particular crop. */
export interface CropVarietiesListByCropId200Response extends HttpResponse {
  status: "200";
  body: CropVarietyListResponseOutput;
}

/** Returns a paginated list of crop variety resources under a particular crop. */
export interface CropVarietiesListByCropIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of crop variety resources across all crops. */
export interface CropVarietiesList200Response extends HttpResponse {
  status: "200";
  body: CropVarietyListResponseOutput;
}

/** Returns a paginated list of crop variety resources across all crops. */
export interface CropVarietiesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified crop variety resource under a particular crop. */
export interface CropVarietiesGet200Response extends HttpResponse {
  status: "200";
  body: CropVarietyOutput;
}

/** Gets a specified crop variety resource under a particular crop. */
export interface CropVarietiesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a crop variety resource. */
export interface CropVarietiesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CropVarietyOutput;
}

/** Creates or updates a crop variety resource. */
export interface CropVarietiesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CropVarietyOutput;
}

/** Creates or updates a crop variety resource. */
export interface CropVarietiesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified crop variety resource under a particular crop. */
export interface CropVarietiesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified crop variety resource under a particular crop. */
export interface CropVarietiesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of farmer resources. */
export interface FarmersList200Response extends HttpResponse {
  status: "200";
  body: FarmerListResponseOutput;
}

/** Returns a paginated list of farmer resources. */
export interface FarmersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified farmer resource. */
export interface FarmersGet200Response extends HttpResponse {
  status: "200";
  body: FarmerOutput;
}

/** Gets a specified farmer resource. */
export interface FarmersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a farmer resource. */
export interface FarmersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FarmerOutput;
}

/** Creates or updates a farmer resource. */
export interface FarmersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FarmerOutput;
}

/** Creates or updates a farmer resource. */
export interface FarmersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified farmer resource. */
export interface FarmersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified farmer resource. */
export interface FarmersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a cascade delete job for specified farmer. */
export interface FarmersGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

/** Get a cascade delete job for specified farmer. */
export interface FarmersGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a cascade delete job for specified farmer. */
export interface FarmersCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

/** Create a cascade delete job for specified farmer. */
export interface FarmersCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: FarmOperationDataIngestionJobOutput;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: FarmOperationDataIngestionJobOutput;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of farm resources under a particular farmer. */
export interface FarmsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FarmListResponseOutput;
}

/** Returns a paginated list of farm resources under a particular farmer. */
export interface FarmsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of farm resources across all farmers. */
export interface FarmsList200Response extends HttpResponse {
  status: "200";
  body: FarmListResponseOutput;
}

/** Returns a paginated list of farm resources across all farmers. */
export interface FarmsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified farm resource under a particular farmer. */
export interface FarmsGet200Response extends HttpResponse {
  status: "200";
  body: FarmOutput;
}

/** Gets a specified farm resource under a particular farmer. */
export interface FarmsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a farm resource under a particular farmer. */
export interface FarmsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FarmOutput;
}

/** Creates or updates a farm resource under a particular farmer. */
export interface FarmsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FarmOutput;
}

/** Creates or updates a farm resource under a particular farmer. */
export interface FarmsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified farm resource under a particular farmer. */
export interface FarmsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified farm resource under a particular farmer. */
export interface FarmsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of field resources under a particular farmer. */
export interface FieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FieldListResponseOutput;
}

/** Returns a paginated list of field resources under a particular farmer. */
export interface FieldsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of field resources across all farmers. */
export interface FieldsList200Response extends HttpResponse {
  status: "200";
  body: FieldListResponseOutput;
}

/** Returns a paginated list of field resources across all farmers. */
export interface FieldsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified field resource under a particular farmer. */
export interface FieldsGet200Response extends HttpResponse {
  status: "200";
  body: FieldOutput;
}

/** Gets a specified field resource under a particular farmer. */
export interface FieldsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or Updates a field resource under a particular farmer. */
export interface FieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FieldOutput;
}

/** Creates or Updates a field resource under a particular farmer. */
export interface FieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FieldOutput;
}

/** Creates or Updates a field resource under a particular farmer. */
export interface FieldsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified field resource under a particular farmer. */
export interface FieldsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified field resource under a particular farmer. */
export interface FieldsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponseOutput;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of harvest data resources across all farmers. */
export interface HarvestDataList200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponseOutput;
}

/** Returns a paginated list of harvest data resources across all farmers. */
export interface HarvestDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specified harvest data resource under a particular farmer. */
export interface HarvestDataGet200Response extends HttpResponse {
  status: "200";
  body: HarvestDataOutput;
}

/** Get a specified harvest data resource under a particular farmer. */
export interface HarvestDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates harvest data resource under a particular farmer. */
export interface HarvestDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: HarvestDataOutput;
}

/** Creates or updates harvest data resource under a particular farmer. */
export interface HarvestDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: HarvestDataOutput;
}

/** Creates or updates harvest data resource under a particular farmer. */
export interface HarvestDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified harvest data resource under a particular farmer. */
export interface HarvestDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified harvest data resource under a particular farmer. */
export interface HarvestDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJob202Response extends HttpResponse {
  status: "202";
  body: ImageProcessingRasterizeJobOutput;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJobdefaultResponse extends HttpResponse {
  status: "500";
  body: Record<string, unknown>;
}

/** Get ImageProcessing Rasterize job's details. */
export interface ImageProcessingGetRasterizeJob200Response extends HttpResponse {
  status: "200";
  body: ImageProcessingRasterizeJobOutput;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersList200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderListResponseOutput;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGet200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderOutput;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderOutput;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: OAuthProviderOutput;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensList200Response extends HttpResponse {
  status: "200";
  body: OAuthTokenListResponseOutput;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLink200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLinkdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get cascade delete job details for OAuth tokens for specified job ID. */
export interface OAuthTokensGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

/** Get cascade delete job details for OAuth tokens for specified job ID. */
export interface OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a cascade delete job for OAuth tokens. */
export interface OAuthTokensCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

/** Create a cascade delete job for OAuth tokens. */
export interface OAuthTokensCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of planting data resources under a particular farm. */
export interface PlantingDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponseOutput;
}

/** Returns a paginated list of planting data resources under a particular farm. */
export interface PlantingDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of planting data resources across all farmers. */
export interface PlantingDataList200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponseOutput;
}

/** Returns a paginated list of planting data resources across all farmers. */
export interface PlantingDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specified planting data resource under a particular farmer. */
export interface PlantingDataGet200Response extends HttpResponse {
  status: "200";
  body: PlantingDataOutput;
}

/** Get a specified planting data resource under a particular farmer. */
export interface PlantingDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates an planting data resource under a particular farmer. */
export interface PlantingDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PlantingDataOutput;
}

/** Creates or updates an planting data resource under a particular farmer. */
export interface PlantingDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PlantingDataOutput;
}

/** Creates or updates an planting data resource under a particular farmer. */
export interface PlantingDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified planting data resource under a particular farmer. */
export interface PlantingDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified planting data resource under a particular farmer. */
export interface PlantingDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of scene resources. */
export interface ScenesList200Response extends HttpResponse {
  status: "200";
  body: SceneListResponseOutput;
}

/** Returns a paginated list of scene resources. */
export interface ScenesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: SatelliteDataIngestionJobOutput;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: SatelliteDataIngestionJobOutput;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Downloads and returns file stream as response for the given input filePath. */
export interface ScenesDownload200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Downloads and returns file stream as response for the given input filePath. */
export interface ScenesDownloaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of seasonal field resources under a particular farmer. */
export interface SeasonalFieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponseOutput;
}

/** Returns a paginated list of seasonal field resources under a particular farmer. */
export interface SeasonalFieldsListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of seasonal field resources across all farmers. */
export interface SeasonalFieldsList200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponseOutput;
}

/** Returns a paginated list of seasonal field resources across all farmers. */
export interface SeasonalFieldsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified seasonal field resource under a particular farmer. */
export interface SeasonalFieldsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldOutput;
}

/** Gets a specified seasonal field resource under a particular farmer. */
export interface SeasonalFieldsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or Updates a seasonal field resource under a particular farmer. */
export interface SeasonalFieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldOutput;
}

/** Creates or Updates a seasonal field resource under a particular farmer. */
export interface SeasonalFieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SeasonalFieldOutput;
}

/** Creates or Updates a seasonal field resource under a particular farmer. */
export interface SeasonalFieldsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified seasonal-field resource under a particular farmer. */
export interface SeasonalFieldsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified seasonal-field resource under a particular farmer. */
export interface SeasonalFieldsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of season resources. */
export interface SeasonsList200Response extends HttpResponse {
  status: "200";
  body: SeasonListResponseOutput;
}

/** Returns a paginated list of season resources. */
export interface SeasonsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Gets a specified season resource. */
export interface SeasonsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonOutput;
}

/** Gets a specified season resource. */
export interface SeasonsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SeasonOutput;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SeasonOutput;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified season resource. */
export interface SeasonsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified season resource. */
export interface SeasonsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponseOutput;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByFarmerIddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of tillage data resources across all farmers. */
export interface TillageDataList200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponseOutput;
}

/** Returns a paginated list of tillage data resources across all farmers. */
export interface TillageDataListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get a specified tillage data resource under a particular farmer. */
export interface TillageDataGet200Response extends HttpResponse {
  status: "200";
  body: TillageDataOutput;
}

/** Get a specified tillage data resource under a particular farmer. */
export interface TillageDataGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Creates or updates an tillage data resource under a particular farmer. */
export interface TillageDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TillageDataOutput;
}

/** Creates or updates an tillage data resource under a particular farmer. */
export interface TillageDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: TillageDataOutput;
}

/** Creates or updates an tillage data resource under a particular farmer. */
export interface TillageDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Deletes a specified tillage data resource under a particular farmer. */
export interface TillageDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a specified tillage data resource under a particular farmer. */
export interface TillageDataDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Returns a paginated list of weather data. */
export interface WeatherList200Response extends HttpResponse {
  status: "200";
  body: WeatherDataListResponseOutput;
}

/** Returns a paginated list of weather data. */
export interface WeatherListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: WeatherDataIngestionJobOutput;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataIngestionJobOutput;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: WeatherDataDeleteJobOutput;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetailsdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataDeleteJobOutput;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJobdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseOutput;
}
