// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ApplicationDataListResponseOutput,
  ErrorResponseOutput,
  CascadeDeleteJobOutput,
  ApplicationDataOutput,
  AttachmentListResponseOutput,
  AttachmentOutput,
  BoundaryMetadataListResponseOutput,
  BoundaryOutput,
  BoundaryOverlapResponseOutput,
  CropListResponseOutput,
  CropOutput,
  CropVarietyListResponseOutput,
  CropVarietyOutput,
  DeviceDataModelListResponseOutput,
  DeviceDataModelOutput,
  DeviceListResponseOutput,
  DeviceOutput,
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
  InsightAttachmentListResponseOutput,
  InsightAttachmentOutput,
  InsightListResponseOutput,
  InsightOutput,
  ManagementZoneListResponseOutput,
  ManagementZoneOutput,
  BiomassModelJobOutput,
  SoilMoistureModelJobOutput,
  NutrientAnalysisListResponseOutput,
  NutrientAnalysisOutput,
  OAuthProviderListResponseOutput,
  OAuthProviderOutput,
  OAuthProviderCascadeDeleteJobOutput,
  OAuthTokenListResponseOutput,
  PlantingDataListResponseOutput,
  PlantingDataOutput,
  PlantTissueAnalysisListResponseOutput,
  PlantTissueAnalysisOutput,
  PrescriptionMapListResponseOutput,
  PrescriptionMapOutput,
  PrescriptionListResponseOutput,
  PrescriptionOutput,
  SceneListResponseOutput,
  SatelliteDataIngestionJobOutput,
  SeasonalFieldListResponseOutput,
  SeasonalFieldOutput,
  SeasonListResponseOutput,
  SeasonOutput,
  SensorDataModelListResponseOutput,
  SensorDataModelOutput,
  SensorEventListResponseOutput,
  SensorMappingListResponseOutput,
  SensorMappingOutput,
  SensorPartnerIntegrationModelListResponseOutput,
  SensorPartnerIntegrationModelOutput,
  SensorPartnerIntegrationCheckConsentResponseOutput,
  SensorPartnerIntegrationGenerateConsentLinkResponseOutput,
  SensorListResponseOutput,
  SensorOutput,
  IoTHubDeviceAuthenticationOutput,
  TillageDataListResponseOutput,
  TillageDataOutput,
  WeatherDataListResponseOutput,
  WeatherDataDeleteJobOutput,
  WeatherDataIngestionJobOutput,
  ZoneListResponseOutput,
  ZoneOutput
} from "./outputModels";

/** Returns a paginated list of application data resources across all farmers. */
export interface ApplicationDataList200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponseOutput;
}

export interface ApplicationDataListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of application data resources across all farmers. */
export interface ApplicationDataListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataListdefaultHeaders;
}

/** Create cascade delete job for application data resource. */
export interface ApplicationDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface ApplicationDataCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for application data resource. */
export interface ApplicationDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataCreateCascadeDeleteJobdefaultHeaders;
}

/** Get cascade delete job for application data resource. */
export interface ApplicationDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface ApplicationDataGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for application data resource. */
export interface ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    ApplicationDataGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of application data resources under a particular farm. */
export interface ApplicationDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponseOutput;
}

export interface ApplicationDataListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of application data resources under a particular farm. */
export interface ApplicationDataListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataListByFarmerIddefaultHeaders;
}

/** Get a specified application data resource under a particular farmer. */
export interface ApplicationDataGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataOutput;
}

export interface ApplicationDataGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified application data resource under a particular farmer. */
export interface ApplicationDataGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataGetdefaultHeaders;
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

export interface ApplicationDataCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an application data resource under a particular farmer. */
export interface ApplicationDataCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified application data resource under a particular farmer. */
export interface ApplicationDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface ApplicationDataDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified application data resource under a particular farmer. */
export interface ApplicationDataDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataDeletedefaultHeaders;
}

/** Returns a paginated list of attachment resources under a particular farmer. */
export interface AttachmentsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: AttachmentListResponseOutput;
}

export interface AttachmentsListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of attachment resources under a particular farmer. */
export interface AttachmentsListByFarmerIddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsListByFarmerIddefaultHeaders;
}

/** Gets a specified attachment resource under a particular farmer. */
export interface AttachmentsGet200Response extends HttpResponse {
  status: "200";
  body: AttachmentOutput;
}

export interface AttachmentsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified attachment resource under a particular farmer. */
export interface AttachmentsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsGetdefaultHeaders;
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

export interface AttachmentsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an attachment resource under a particular farmer. */
export interface AttachmentsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified attachment resource under a particular farmer. */
export interface AttachmentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface AttachmentsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified attachment resource under a particular farmer. */
export interface AttachmentsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsDeletedefaultHeaders;
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownload200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface AttachmentsDownloaddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownloaddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsDownloaddefaultHeaders;
}

/** Returns a paginated list of boundary resources across all farmers. */
export interface BoundariesList200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of boundary resources across all farmers. */
export interface BoundariesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesListdefaultHeaders;
}

/** Search for boundaries across all farmers by fields and intersecting geometry. */
export interface BoundariesSearch200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesSearchdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Search for boundaries across all farmers by fields and intersecting geometry. */
export interface BoundariesSearchdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesSearchdefaultHeaders;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface BoundariesCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesCreateCascadeDeleteJobdefaultHeaders;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface BoundariesGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of boundary resources under a particular farmer. */
export interface BoundariesListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of boundary resources under a particular farmer. */
export interface BoundariesListByFarmerIddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesListByFarmerIddefaultHeaders;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByFarmerId200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesSearchByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesSearchByFarmerIddefaultHeaders;
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

export interface BoundariesCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesCreateOrUpdatedefaultHeaders;
}

/** Gets a specified boundary resource under a particular farmer. */
export interface BoundariesGet200Response extends HttpResponse {
  status: "200";
  body: BoundaryOutput;
}

export interface BoundariesGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified boundary resource under a particular farmer. */
export interface BoundariesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesGetdefaultHeaders;
}

/** Deletes a specified boundary resource under a particular farmer. */
export interface BoundariesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface BoundariesDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified boundary resource under a particular farmer. */
export interface BoundariesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesDeletedefaultHeaders;
}

/** Returns overlapping acreage between two boundary Ids. */
export interface BoundariesGetOverlap200Response extends HttpResponse {
  status: "200";
  body: BoundaryOverlapResponseOutput;
}

export interface BoundariesGetOverlapdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns overlapping acreage between two boundary Ids. */
export interface BoundariesGetOverlapdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesGetOverlapdefaultHeaders;
}

/** Returns a paginated list of crop resources. */
export interface CropsList200Response extends HttpResponse {
  status: "200";
  body: CropListResponseOutput;
}

export interface CropsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of crop resources. */
export interface CropsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsListdefaultHeaders;
}

/** Gets a specified crop resource. */
export interface CropsGet200Response extends HttpResponse {
  status: "200";
  body: CropOutput;
}

export interface CropsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified crop resource. */
export interface CropsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsGetdefaultHeaders;
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

export interface CropsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsCreateOrUpdatedefaultHeaders;
}

/** Deletes Crop for given crop id. */
export interface CropsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface CropsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes Crop for given crop id. */
export interface CropsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsDeletedefaultHeaders;
}

/** Returns a paginated list of crop variety resources. */
export interface CropVarietiesList200Response extends HttpResponse {
  status: "200";
  body: CropVarietyListResponseOutput;
}

export interface CropVarietiesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of crop variety resources. */
export interface CropVarietiesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropVarietiesListdefaultHeaders;
}

/** Gets a specified crop variety resource. */
export interface CropVarietiesGet200Response extends HttpResponse {
  status: "200";
  body: CropVarietyOutput;
}

export interface CropVarietiesGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified crop variety resource. */
export interface CropVarietiesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropVarietiesGetdefaultHeaders;
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

export interface CropVarietiesCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a crop variety resource. */
export interface CropVarietiesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropVarietiesCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified crop variety resource. */
export interface CropVarietiesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface CropVarietiesDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified crop variety resource. */
export interface CropVarietiesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropVarietiesDeletedefaultHeaders;
}

/** Returns a paginated list of device data model resources. */
export interface DeviceDataModelsList200Response extends HttpResponse {
  status: "200";
  body: DeviceDataModelListResponseOutput;
}

export interface DeviceDataModelsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of device data model resources. */
export interface DeviceDataModelsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsListdefaultHeaders;
}

/** Create a device data model entity. */
export interface DeviceDataModelsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: DeviceDataModelOutput;
}

/** Create a device data model entity. */
export interface DeviceDataModelsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: DeviceDataModelOutput;
}

export interface DeviceDataModelsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a device data model entity. */
export interface DeviceDataModelsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsCreateOrUpdatedefaultHeaders;
}

/** Gets a device data model entity. */
export interface DeviceDataModelsGet200Response extends HttpResponse {
  status: "200";
  body: DeviceDataModelOutput;
}

export interface DeviceDataModelsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a device data model entity. */
export interface DeviceDataModelsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsGetdefaultHeaders;
}

/** Deletes a device data model entity. */
export interface DeviceDataModelsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface DeviceDataModelsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a device data model entity. */
export interface DeviceDataModelsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsDeletedefaultHeaders;
}

/** Returns a paginated list of device resources. */
export interface DevicesList200Response extends HttpResponse {
  status: "200";
  body: DeviceListResponseOutput;
}

export interface DevicesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of device resources. */
export interface DevicesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesListdefaultHeaders;
}

/** Create a device entity. */
export interface DevicesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

/** Create a device entity. */
export interface DevicesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DeviceOutput;
}

export interface DevicesCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a device entity. */
export interface DevicesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesCreateOrUpdatedefaultHeaders;
}

/** Gets a device entity. */
export interface DevicesGet200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

export interface DevicesGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a device entity. */
export interface DevicesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesGetdefaultHeaders;
}

/** Deletes a device entity. */
export interface DevicesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface DevicesDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a device entity. */
export interface DevicesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesDeletedefaultHeaders;
}

/** Returns a paginated list of farmer resources. */
export interface FarmersList200Response extends HttpResponse {
  status: "200";
  body: FarmerListResponseOutput;
}

export interface FarmersListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of farmer resources. */
export interface FarmersListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmersListdefaultHeaders;
}

/** Gets a specified farmer resource. */
export interface FarmersGet200Response extends HttpResponse {
  status: "200";
  body: FarmerOutput;
}

export interface FarmersGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified farmer resource. */
export interface FarmersGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmersGetdefaultHeaders;
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

export interface FarmersCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a farmer resource. */
export interface FarmersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmersCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified farmer resource. */
export interface FarmersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface FarmersDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified farmer resource. */
export interface FarmersDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmersDeletedefaultHeaders;
}

/** Create a cascade delete job for specified farmer. */
export interface FarmersCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface FarmersCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified farmer. */
export interface FarmersCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmersCreateCascadeDeleteJobdefaultHeaders;
}

/** Get a cascade delete job for specified farmer. */
export interface FarmersGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface FarmersGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified farmer. */
export interface FarmersGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmersGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJob202Response
  extends HttpResponse {
  status: "202";
  body: FarmOperationDataIngestionJobOutput;
}

export interface FarmOperationsCreateDataIngestionJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmOperationsCreateDataIngestionJobdefaultHeaders;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: FarmOperationDataIngestionJobOutput;
}

export interface FarmOperationsGetDataIngestionJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    FarmOperationsGetDataIngestionJobDetailsdefaultHeaders;
}

/** Returns a paginated list of farm resources under a particular farmer. */
export interface FarmsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FarmListResponseOutput;
}

export interface FarmsListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of farm resources under a particular farmer. */
export interface FarmsListByFarmerIddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsListByFarmerIddefaultHeaders;
}

/** Gets a specified farm resource under a particular farmer. */
export interface FarmsGet200Response extends HttpResponse {
  status: "200";
  body: FarmOutput;
}

export interface FarmsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified farm resource under a particular farmer. */
export interface FarmsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsGetdefaultHeaders;
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

export interface FarmsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a farm resource under a particular farmer. */
export interface FarmsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified farm resource under a particular farmer. */
export interface FarmsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface FarmsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified farm resource under a particular farmer. */
export interface FarmsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsDeletedefaultHeaders;
}

/** Returns a paginated list of farm resources across all farmers. */
export interface FarmsList200Response extends HttpResponse {
  status: "200";
  body: FarmListResponseOutput;
}

export interface FarmsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of farm resources across all farmers. */
export interface FarmsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsListdefaultHeaders;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface FarmsCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsCreateCascadeDeleteJobdefaultHeaders;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface FarmsGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of field resources under a particular farmer. */
export interface FieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: FieldListResponseOutput;
}

export interface FieldsListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of field resources under a particular farmer. */
export interface FieldsListByFarmerIddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsListByFarmerIddefaultHeaders;
}

/** Gets a specified field resource under a particular farmer. */
export interface FieldsGet200Response extends HttpResponse {
  status: "200";
  body: FieldOutput;
}

export interface FieldsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified field resource under a particular farmer. */
export interface FieldsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsGetdefaultHeaders;
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

export interface FieldsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a field resource under a particular farmer. */
export interface FieldsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified field resource under a particular farmer. */
export interface FieldsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface FieldsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified field resource under a particular farmer. */
export interface FieldsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsDeletedefaultHeaders;
}

/** Returns a paginated list of field resources across all farmers. */
export interface FieldsList200Response extends HttpResponse {
  status: "200";
  body: FieldListResponseOutput;
}

export interface FieldsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of field resources across all farmers. */
export interface FieldsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsListdefaultHeaders;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface FieldsCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsCreateCascadeDeleteJobdefaultHeaders;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface FieldsGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponseOutput;
}

export interface HarvestDataListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByFarmerIddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataListByFarmerIddefaultHeaders;
}

/** Get a specified harvest data resource under a particular farmer. */
export interface HarvestDataGet200Response extends HttpResponse {
  status: "200";
  body: HarvestDataOutput;
}

export interface HarvestDataGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified harvest data resource under a particular farmer. */
export interface HarvestDataGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataGetdefaultHeaders;
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

export interface HarvestDataCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates harvest data resource under a particular farmer. */
export interface HarvestDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified harvest data resource under a particular farmer. */
export interface HarvestDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface HarvestDataDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified harvest data resource under a particular farmer. */
export interface HarvestDataDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataDeletedefaultHeaders;
}

/** Returns a paginated list of harvest data resources across all farmers. */
export interface HarvestDataList200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponseOutput;
}

export interface HarvestDataListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of harvest data resources across all farmers. */
export interface HarvestDataListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataListdefaultHeaders;
}

/** Create cascade delete job for harvest data resource. */
export interface HarvestDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface HarvestDataCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for harvest data resource. */
export interface HarvestDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataCreateCascadeDeleteJobdefaultHeaders;
}

/** Get cascade delete job for harvest data resource. */
export interface HarvestDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface HarvestDataGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for harvest data resource. */
export interface HarvestDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJob202Response
  extends HttpResponse {
  status: "202";
  body: ImageProcessingRasterizeJobOutput;
}

export interface ImageProcessingCreateRasterizeJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: Record<string, unknown>;
  headers: RawHttpHeaders & ImageProcessingCreateRasterizeJobdefaultHeaders;
}

/** Get ImageProcessing Rasterize job's details. */
export interface ImageProcessingGetRasterizeJob200Response
  extends HttpResponse {
  status: "200";
  body: ImageProcessingRasterizeJobOutput;
}

/** Returns a paginated list of insight resources. */
export interface InsightAttachmentsListByFarmerIdModelIdAndResource200Response
  extends HttpResponse {
  status: "200";
  body: InsightAttachmentListResponseOutput;
}

export interface InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of insight resources. */
export interface InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultHeaders;
}

/** Creates or updates insight entity. */
export interface InsightAttachmentsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: InsightAttachmentOutput;
}

/** Creates or updates insight entity. */
export interface InsightAttachmentsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: InsightAttachmentOutput;
}

export interface InsightAttachmentsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates insight entity. */
export interface InsightAttachmentsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsCreateOrUpdatedefaultHeaders;
}

/** Gets a specified insight resource under a particular farmer. */
export interface InsightAttachmentsGet200Response extends HttpResponse {
  status: "200";
  body: InsightAttachmentOutput;
}

export interface InsightAttachmentsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified insight resource under a particular farmer. */
export interface InsightAttachmentsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsGetdefaultHeaders;
}

/** Deletes a specified insight resource. */
export interface InsightAttachmentsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface InsightAttachmentsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified insight resource. */
export interface InsightAttachmentsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsDeletedefaultHeaders;
}

/** Downloads and returns insight-attachment as response for the given input filePath. */
export interface InsightAttachmentsDownload200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface InsightAttachmentsDownloaddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Downloads and returns insight-attachment as response for the given input filePath. */
export interface InsightAttachmentsDownloaddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsDownloaddefaultHeaders;
}

/** Returns a paginated list of insight resources. */
export interface InsightsListByFarmerIdModelIdAndResource200Response
  extends HttpResponse {
  status: "200";
  body: InsightListResponseOutput;
}

export interface InsightsListByFarmerIdModelIdAndResourcedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of insight resources. */
export interface InsightsListByFarmerIdModelIdAndResourcedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    InsightsListByFarmerIdModelIdAndResourcedefaultHeaders;
}

/** Creates or updates insight entity. */
export interface InsightsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: InsightOutput;
}

/** Creates or updates insight entity. */
export interface InsightsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: InsightOutput;
}

export interface InsightsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates insight entity. */
export interface InsightsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsCreateOrUpdatedefaultHeaders;
}

/** Gets a specified insight resource under a particular farmer. */
export interface InsightsGet200Response extends HttpResponse {
  status: "200";
  body: InsightOutput;
}

export interface InsightsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified insight resource under a particular farmer. */
export interface InsightsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsGetdefaultHeaders;
}

/** Deletes a specified insight resource. */
export interface InsightsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface InsightsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified insight resource. */
export interface InsightsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsDeletedefaultHeaders;
}

/** Create a cascade delete job for insights specified farmerId/modelId/resourceType/resourceId. */
export interface InsightsCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface InsightsCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for insights specified farmerId/modelId/resourceType/resourceId. */
export interface InsightsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsCreateCascadeDeleteJobdefaultHeaders;
}

/** Get a cascade delete job for specified insight. */
export interface InsightsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface InsightsGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified insight. */
export interface InsightsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of management zone resources under a particular farmer. */
export interface ManagementZonesListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: ManagementZoneListResponseOutput;
}

export interface ManagementZonesListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of management zone resources under a particular farmer. */
export interface ManagementZonesListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesListByFarmerIddefaultHeaders;
}

/** Gets a specified management zone resource under a particular farmer. */
export interface ManagementZonesGet200Response extends HttpResponse {
  status: "200";
  body: ManagementZoneOutput;
}

export interface ManagementZonesGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified management zone resource under a particular farmer. */
export interface ManagementZonesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesGetdefaultHeaders;
}

/** Creates or updates a management zone resource. */
export interface ManagementZonesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ManagementZoneOutput;
}

/** Creates or updates a management zone resource. */
export interface ManagementZonesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ManagementZoneOutput;
}

export interface ManagementZonesCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a management zone resource. */
export interface ManagementZonesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified management zone resource under a particular farmer. */
export interface ManagementZonesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface ManagementZonesDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified management zone resource under a particular farmer. */
export interface ManagementZonesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesDeletedefaultHeaders;
}

/** Returns a paginated list of management zone resources across all farmers. */
export interface ManagementZonesList200Response extends HttpResponse {
  status: "200";
  body: ManagementZoneListResponseOutput;
}

export interface ManagementZonesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of management zone resources across all farmers. */
export interface ManagementZonesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesListdefaultHeaders;
}

/** Get a cascade delete job for specified job id. */
export interface ManagementZonesGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface ManagementZonesGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified job id. */
export interface ManagementZonesGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    ManagementZonesGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Create a cascade delete job for specified management zone. */
export interface ManagementZonesCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface ManagementZonesCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified management zone. */
export interface ManagementZonesCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesCreateCascadeDeleteJobdefaultHeaders;
}

/** Create a Biomass Model job. */
export interface ModelInferenceCreateBiomassModelJob202Response
  extends HttpResponse {
  status: "202";
  body: BiomassModelJobOutput;
}

export interface ModelInferenceCreateBiomassModelJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a Biomass Model job. */
export interface ModelInferenceCreateBiomassModelJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceCreateBiomassModelJobdefaultHeaders;
}

/** Get Biomass Model job's details. */
export interface ModelInferenceGetBiomassModelJob200Response
  extends HttpResponse {
  status: "200";
  body: BiomassModelJobOutput;
}

export interface ModelInferenceGetBiomassModelJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get Biomass Model job's details. */
export interface ModelInferenceGetBiomassModelJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceGetBiomassModelJobdefaultHeaders;
}

/** Create a SoilMoisture Model job. */
export interface ModelInferenceCreateSoilMoistureModelJob202Response
  extends HttpResponse {
  status: "202";
  body: SoilMoistureModelJobOutput;
}

export interface ModelInferenceCreateSoilMoistureModelJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a SoilMoisture Model job. */
export interface ModelInferenceCreateSoilMoistureModelJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    ModelInferenceCreateSoilMoistureModelJobdefaultHeaders;
}

/** Get SoilMoisture Model job's details. */
export interface ModelInferenceGetSoilMoistureModelJob200Response
  extends HttpResponse {
  status: "200";
  body: SoilMoistureModelJobOutput;
}

export interface ModelInferenceGetSoilMoistureModelJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get SoilMoisture Model job's details. */
export interface ModelInferenceGetSoilMoistureModelJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceGetSoilMoistureModelJobdefaultHeaders;
}

/** Returns a paginated list of nutrient analysis resources under a particular farmer. */
export interface NutrientAnalysesListByFarmerId200Response
  extends HttpResponse {
  status: "200";
  body: NutrientAnalysisListResponseOutput;
}

export interface NutrientAnalysesListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of nutrient analysis resources under a particular farmer. */
export interface NutrientAnalysesListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesListByFarmerIddefaultHeaders;
}

/** Gets a specified nutrient analysis resource under a particular farmer. */
export interface NutrientAnalysesGet200Response extends HttpResponse {
  status: "200";
  body: NutrientAnalysisOutput;
}

export interface NutrientAnalysesGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified nutrient analysis resource under a particular farmer. */
export interface NutrientAnalysesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesGetdefaultHeaders;
}

/** Creates or updates a nutrient analysis resource. */
export interface NutrientAnalysesCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: NutrientAnalysisOutput;
}

/** Creates or updates a nutrient analysis resource. */
export interface NutrientAnalysesCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: NutrientAnalysisOutput;
}

export interface NutrientAnalysesCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a nutrient analysis resource. */
export interface NutrientAnalysesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified nutrient analysis resource under a particular farmer. */
export interface NutrientAnalysesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface NutrientAnalysesDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified nutrient analysis resource under a particular farmer. */
export interface NutrientAnalysesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesDeletedefaultHeaders;
}

/** Returns a paginated list of nutrient analysis resources across all farmers. */
export interface NutrientAnalysesList200Response extends HttpResponse {
  status: "200";
  body: NutrientAnalysisListResponseOutput;
}

export interface NutrientAnalysesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of nutrient analysis resources across all farmers. */
export interface NutrientAnalysesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesListdefaultHeaders;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersList200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderListResponseOutput;
}

export interface OAuthProvidersListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersListdefaultHeaders;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGet200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderOutput;
}

export interface OAuthProvidersGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersGetdefaultHeaders;
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

export interface OAuthProvidersCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersCreateOrUpdatedefaultHeaders;
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface OAuthProvidersDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersDeletedefaultHeaders;
}

/** Get cascade delete job for oauthProvider resource. */
export interface OAuthProvidersGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: OAuthProviderCascadeDeleteJobOutput;
}

export interface OAuthProvidersGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for oauthProvider resource. */
export interface OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    OAuthProvidersGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Create cascade delete job for oauthProvider resource. */
export interface OAuthProvidersCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: OAuthProviderCascadeDeleteJobOutput;
}

export interface OAuthProvidersCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for oauthProvider resource. */
export interface OAuthProvidersCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersCreateCascadeDeleteJobdefaultHeaders;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensList200Response extends HttpResponse {
  status: "200";
  body: OAuthTokenListResponseOutput;
}

export interface OAuthTokensListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensListdefaultHeaders;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLink200Response
  extends HttpResponse {
  status: "200";
  body: string;
}

export interface OAuthTokensGetOAuthConnectionLinkdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLinkdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensGetOAuthConnectionLinkdefaultHeaders;
}

/** Create remove job for OAuth token. */
export interface OAuthTokensCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface OAuthTokensCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create remove job for OAuth token. */
export interface OAuthTokensCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensCreateCascadeDeleteJobdefaultHeaders;
}

/** Get remove job for OAuth token. */
export interface OAuthTokensGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface OAuthTokensGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get remove job for OAuth token. */
export interface OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of planting data resources under a particular farm. */
export interface PlantingDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponseOutput;
}

export interface PlantingDataListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of planting data resources under a particular farm. */
export interface PlantingDataListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataListByFarmerIddefaultHeaders;
}

/** Get a specified planting data resource under a particular farmer. */
export interface PlantingDataGet200Response extends HttpResponse {
  status: "200";
  body: PlantingDataOutput;
}

export interface PlantingDataGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified planting data resource under a particular farmer. */
export interface PlantingDataGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataGetdefaultHeaders;
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

export interface PlantingDataCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an planting data resource under a particular farmer. */
export interface PlantingDataCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified planting data resource under a particular farmer. */
export interface PlantingDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface PlantingDataDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified planting data resource under a particular farmer. */
export interface PlantingDataDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataDeletedefaultHeaders;
}

/** Returns a paginated list of planting data resources across all farmers. */
export interface PlantingDataList200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponseOutput;
}

export interface PlantingDataListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of planting data resources across all farmers. */
export interface PlantingDataListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataListdefaultHeaders;
}

/** Create cascade delete job for planting data resource. */
export interface PlantingDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PlantingDataCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for planting data resource. */
export interface PlantingDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataCreateCascadeDeleteJobdefaultHeaders;
}

/** Get cascade delete job for planting data resource. */
export interface PlantingDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PlantingDataGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for planting data resource. */
export interface PlantingDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    PlantingDataGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of plant tissue analysis resources under a particular farmer. */
export interface PlantTissueAnalysesListByFarmerId200Response
  extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisListResponseOutput;
}

export interface PlantTissueAnalysesListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of plant tissue analysis resources under a particular farmer. */
export interface PlantTissueAnalysesListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesListByFarmerIddefaultHeaders;
}

/** Gets a specified plant tissue analysis resource under a particular farmer. */
export interface PlantTissueAnalysesGet200Response extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisOutput;
}

export interface PlantTissueAnalysesGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified plant tissue analysis resource under a particular farmer. */
export interface PlantTissueAnalysesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesGetdefaultHeaders;
}

/** Creates or updates a plant tissue analysis resource. */
export interface PlantTissueAnalysesCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisOutput;
}

/** Creates or updates a plant tissue analysis resource. */
export interface PlantTissueAnalysesCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: PlantTissueAnalysisOutput;
}

export interface PlantTissueAnalysesCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a plant tissue analysis resource. */
export interface PlantTissueAnalysesCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified plant tissue analysis resource under a particular farmer. */
export interface PlantTissueAnalysesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface PlantTissueAnalysesDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified plant tissue analysis resource under a particular farmer. */
export interface PlantTissueAnalysesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesDeletedefaultHeaders;
}

/** Returns a paginated list of plant tissue analysis resources across all farmers. */
export interface PlantTissueAnalysesList200Response extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisListResponseOutput;
}

export interface PlantTissueAnalysesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of plant tissue analysis resources across all farmers. */
export interface PlantTissueAnalysesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesListdefaultHeaders;
}

/** Create a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PlantTissueAnalysesCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    PlantTissueAnalysesCreateCascadeDeleteJobdefaultHeaders;
}

/** Get a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of prescription map resources under a particular farmer. */
export interface PrescriptionMapsListByFarmerId200Response
  extends HttpResponse {
  status: "200";
  body: PrescriptionMapListResponseOutput;
}

export interface PrescriptionMapsListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription map resources under a particular farmer. */
export interface PrescriptionMapsListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsListByFarmerIddefaultHeaders;
}

/** Gets a specified prescription map resource under a particular farmer. */
export interface PrescriptionMapsGet200Response extends HttpResponse {
  status: "200";
  body: PrescriptionMapOutput;
}

export interface PrescriptionMapsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified prescription map resource under a particular farmer. */
export interface PrescriptionMapsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsGetdefaultHeaders;
}

/** Creates or Updates a prescription map resource under a particular farmer. */
export interface PrescriptionMapsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: PrescriptionMapOutput;
}

/** Creates or Updates a prescription map resource under a particular farmer. */
export interface PrescriptionMapsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: PrescriptionMapOutput;
}

export interface PrescriptionMapsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a prescription map resource under a particular farmer. */
export interface PrescriptionMapsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified prescription map resource under a particular farmer. */
export interface PrescriptionMapsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface PrescriptionMapsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified prescription map resource under a particular farmer. */
export interface PrescriptionMapsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsDeletedefaultHeaders;
}

/** Returns a paginated list of prescription map resources across all farmers. */
export interface PrescriptionMapsList200Response extends HttpResponse {
  status: "200";
  body: PrescriptionMapListResponseOutput;
}

export interface PrescriptionMapsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription map resources across all farmers. */
export interface PrescriptionMapsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsListdefaultHeaders;
}

/** Get a cascade delete job for specified prescription map. */
export interface PrescriptionMapsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionMapsGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified prescription map. */
export interface PrescriptionMapsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    PrescriptionMapsGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Create a cascade delete job for specified prescription map. */
export interface PrescriptionMapsCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionMapsCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified prescription map. */
export interface PrescriptionMapsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    PrescriptionMapsCreateCascadeDeleteJobdefaultHeaders;
}

/** Returns a paginated list of prescription resources under a particular farmer. */
export interface PrescriptionsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: PrescriptionListResponseOutput;
}

export interface PrescriptionsListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription resources under a particular farmer. */
export interface PrescriptionsListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsListByFarmerIddefaultHeaders;
}

/** Gets a specified prescription resource under a particular farmer. */
export interface PrescriptionsGet200Response extends HttpResponse {
  status: "200";
  body: PrescriptionOutput;
}

export interface PrescriptionsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified prescription resource under a particular farmer. */
export interface PrescriptionsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsGetdefaultHeaders;
}

/** Creates or Updates a prescription resource under a particular farmer. */
export interface PrescriptionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PrescriptionOutput;
}

/** Creates or Updates a prescription resource under a particular farmer. */
export interface PrescriptionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PrescriptionOutput;
}

export interface PrescriptionsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a prescription resource under a particular farmer. */
export interface PrescriptionsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified prescription resource under a particular farmer. */
export interface PrescriptionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface PrescriptionsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified prescription resource under a particular farmer. */
export interface PrescriptionsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsDeletedefaultHeaders;
}

/** Returns a paginated list of prescription resources across all farmers. */
export interface PrescriptionsList200Response extends HttpResponse {
  status: "200";
  body: PrescriptionListResponseOutput;
}

export interface PrescriptionsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription resources across all farmers. */
export interface PrescriptionsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsListdefaultHeaders;
}

/** Get a cascade delete job for specified prescription. */
export interface PrescriptionsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionsGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified prescription. */
export interface PrescriptionsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    PrescriptionsGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Create a cascade delete job for specified prescription. */
export interface PrescriptionsCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionsCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified prescription. */
export interface PrescriptionsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsCreateCascadeDeleteJobdefaultHeaders;
}

/** Returns a paginated list of scene resources. */
export interface ScenesList200Response extends HttpResponse {
  status: "200";
  body: SceneListResponseOutput;
}

export interface ScenesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of scene resources. */
export interface ScenesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesListdefaultHeaders;
}

/** Downloads and returns file Stream as response for the given input filePath. */
export interface ScenesDownload200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface ScenesDownloaddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Downloads and returns file Stream as response for the given input filePath. */
export interface ScenesDownloaddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesDownloaddefaultHeaders;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJob202Response
  extends HttpResponse {
  status: "202";
  body: SatelliteDataIngestionJobOutput;
}

export interface ScenesCreateSatelliteDataIngestionJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesCreateSatelliteDataIngestionJobdefaultHeaders;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: SatelliteDataIngestionJobOutput;
}

export interface ScenesGetSatelliteDataIngestionJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    ScenesGetSatelliteDataIngestionJobDetailsdefaultHeaders;
}

/** Returns a paginated list of seasonal field resources under a particular farmer. */
export interface SeasonalFieldsListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponseOutput;
}

export interface SeasonalFieldsListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of seasonal field resources under a particular farmer. */
export interface SeasonalFieldsListByFarmerIddefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsListByFarmerIddefaultHeaders;
}

/** Gets a specified seasonal field resource under a particular farmer. */
export interface SeasonalFieldsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldOutput;
}

export interface SeasonalFieldsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified seasonal field resource under a particular farmer. */
export interface SeasonalFieldsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsGetdefaultHeaders;
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

export interface SeasonalFieldsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a seasonal field resource under a particular farmer. */
export interface SeasonalFieldsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified seasonal-field resource under a particular farmer. */
export interface SeasonalFieldsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface SeasonalFieldsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified seasonal-field resource under a particular farmer. */
export interface SeasonalFieldsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsDeletedefaultHeaders;
}

/** Returns a paginated list of seasonal field resources across all farmers. */
export interface SeasonalFieldsList200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponseOutput;
}

export interface SeasonalFieldsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of seasonal field resources across all farmers. */
export interface SeasonalFieldsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsListdefaultHeaders;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface SeasonalFieldsCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsCreateCascadeDeleteJobdefaultHeaders;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface SeasonalFieldsGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    SeasonalFieldsGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of season resources. */
export interface SeasonsList200Response extends HttpResponse {
  status: "200";
  body: SeasonListResponseOutput;
}

export interface SeasonsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of season resources. */
export interface SeasonsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsListdefaultHeaders;
}

/** Gets a specified season resource. */
export interface SeasonsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonOutput;
}

export interface SeasonsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified season resource. */
export interface SeasonsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsGetdefaultHeaders;
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

export interface SeasonsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified season resource. */
export interface SeasonsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface SeasonsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified season resource. */
export interface SeasonsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsDeletedefaultHeaders;
}

/** Returns a paginated list of sensor data model resources. */
export interface SensorDataModelsList200Response extends HttpResponse {
  status: "200";
  body: SensorDataModelListResponseOutput;
}

export interface SensorDataModelsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of sensor data model resources. */
export interface SensorDataModelsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsListdefaultHeaders;
}

/** Create a sensor data model entity. */
export interface SensorDataModelsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: SensorDataModelOutput;
}

/** Create a sensor data model entity. */
export interface SensorDataModelsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: SensorDataModelOutput;
}

export interface SensorDataModelsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a sensor data model entity. */
export interface SensorDataModelsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsCreateOrUpdatedefaultHeaders;
}

/** Gets a sensor data model entity. */
export interface SensorDataModelsGet200Response extends HttpResponse {
  status: "200";
  body: SensorDataModelOutput;
}

export interface SensorDataModelsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor data model entity. */
export interface SensorDataModelsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsGetdefaultHeaders;
}

/** Deletes a sensor data model entity. */
export interface SensorDataModelsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface SensorDataModelsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a sensor data model entity. */
export interface SensorDataModelsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsDeletedefaultHeaders;
}

/**
 * Returns a list of sensor events data. Time span for query is limited to 90 days at a time.
 * Returns last 90 days events when startDateTime and endDateTime are not provided.
 */
export interface SensorEventsList200Response extends HttpResponse {
  status: "200";
  body: SensorEventListResponseOutput;
}

export interface SensorEventsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/**
 * Returns a list of sensor events data. Time span for query is limited to 90 days at a time.
 * Returns last 90 days events when startDateTime and endDateTime are not provided.
 */
export interface SensorEventsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorEventsListdefaultHeaders;
}

/** Returns a paginated list of sensor mapping resources. */
export interface SensorMappingsList200Response extends HttpResponse {
  status: "200";
  body: SensorMappingListResponseOutput;
}

export interface SensorMappingsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of sensor mapping resources. */
export interface SensorMappingsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsListdefaultHeaders;
}

/** Create a sensor mapping entity. */
export interface SensorMappingsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SensorMappingOutput;
}

/** Create a sensor mapping entity. */
export interface SensorMappingsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SensorMappingOutput;
}

export interface SensorMappingsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a sensor mapping entity. */
export interface SensorMappingsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsCreateOrUpdatedefaultHeaders;
}

/** Gets a sensor mapping entity. */
export interface SensorMappingsGet200Response extends HttpResponse {
  status: "200";
  body: SensorMappingOutput;
}

export interface SensorMappingsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor mapping entity. */
export interface SensorMappingsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsGetdefaultHeaders;
}

/** Deletes a sensor mapping entity. */
export interface SensorMappingsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface SensorMappingsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a sensor mapping entity. */
export interface SensorMappingsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsDeletedefaultHeaders;
}

/** Gets partner integration models. */
export interface SensorPartnerIntegrationsList200Response extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationModelListResponseOutput;
}

export interface SensorPartnerIntegrationsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets partner integration models. */
export interface SensorPartnerIntegrationsListdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsListdefaultHeaders;
}

/** Create or update an integration with a sensor partner. */
export interface SensorPartnerIntegrationsCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationModelOutput;
}

/** Create or update an integration with a sensor partner. */
export interface SensorPartnerIntegrationsCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: SensorPartnerIntegrationModelOutput;
}

export interface SensorPartnerIntegrationsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create or update an integration with a sensor partner. */
export interface SensorPartnerIntegrationsCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    SensorPartnerIntegrationsCreateOrUpdatedefaultHeaders;
}

/** Gets a partner integration model entity. */
export interface SensorPartnerIntegrationsGet200Response extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationModelOutput;
}

export interface SensorPartnerIntegrationsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a partner integration model entity. */
export interface SensorPartnerIntegrationsGetdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsGetdefaultHeaders;
}

/** Deletes a partner integration model entity. */
export interface SensorPartnerIntegrationsDelete204Response
  extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface SensorPartnerIntegrationsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a partner integration model entity. */
export interface SensorPartnerIntegrationsDeletedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsDeletedefaultHeaders;
}

/** Checks consent for partner integration. */
export interface SensorPartnerIntegrationsCheckConsent200Response
  extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationCheckConsentResponseOutput;
}

export interface SensorPartnerIntegrationsCheckConsentdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Checks consent for partner integration. */
export interface SensorPartnerIntegrationsCheckConsentdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsCheckConsentdefaultHeaders;
}

/** Generates partner integration consent link. */
export interface SensorPartnerIntegrationsGenerateConsentLink200Response
  extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationGenerateConsentLinkResponseOutput;
}

export interface SensorPartnerIntegrationsGenerateConsentLinkdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Generates partner integration consent link. */
export interface SensorPartnerIntegrationsGenerateConsentLinkdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders &
    SensorPartnerIntegrationsGenerateConsentLinkdefaultHeaders;
}

/** Returns a paginated list of sensor resources. */
export interface SensorsList200Response extends HttpResponse {
  status: "200";
  body: SensorListResponseOutput;
}

export interface SensorsListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of sensor resources. */
export interface SensorsListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsListdefaultHeaders;
}

/** Create a sensor entity. */
export interface SensorsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SensorOutput;
}

/** Create a sensor entity. */
export interface SensorsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SensorOutput;
}

export interface SensorsCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a sensor entity. */
export interface SensorsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsCreateOrUpdatedefaultHeaders;
}

/** Gets a sensor entity. */
export interface SensorsGet200Response extends HttpResponse {
  status: "200";
  body: SensorOutput;
}

export interface SensorsGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor entity. */
export interface SensorsGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsGetdefaultHeaders;
}

/** Deletes a sensor entity. */
export interface SensorsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface SensorsDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a sensor entity. */
export interface SensorsDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsDeletedefaultHeaders;
}

/** Gets a sensor connection string. */
export interface SensorsGetConnectionString200Response extends HttpResponse {
  status: "200";
  body: IoTHubDeviceAuthenticationOutput;
}

export interface SensorsGetConnectionStringdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor connection string. */
export interface SensorsGetConnectionStringdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsGetConnectionStringdefaultHeaders;
}

/** Renews a sensor connection string. */
export interface SensorsRenewConnectionString200Response extends HttpResponse {
  status: "200";
  body: IoTHubDeviceAuthenticationOutput;
}

export interface SensorsRenewConnectionStringdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Renews a sensor connection string. */
export interface SensorsRenewConnectionStringdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsRenewConnectionStringdefaultHeaders;
}

/** Cancels a job for given solution id. */
export interface SolutionInferenceCancel200Response extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

export interface SolutionInferenceCanceldefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Cancels a job for given solution id. */
export interface SolutionInferenceCanceldefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SolutionInferenceCanceldefaultHeaders;
}

/** Creates a job trigger for a solution. */
export interface SolutionInferenceCreateOrUpdate202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, any>;
}

export interface SolutionInferenceCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates a job trigger for a solution. */
export interface SolutionInferenceCreateOrUpdatedefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SolutionInferenceCreateOrUpdatedefaultHeaders;
}

/** Fetches details of triggered job for a solution. */
export interface SolutionInferenceFetch200Response extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

export interface SolutionInferenceFetchdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Fetches details of triggered job for a solution. */
export interface SolutionInferenceFetchdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SolutionInferenceFetchdefaultHeaders;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponseOutput;
}

export interface TillageDataListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByFarmerIddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataListByFarmerIddefaultHeaders;
}

/** Get a specified tillage data resource under a particular farmer. */
export interface TillageDataGet200Response extends HttpResponse {
  status: "200";
  body: TillageDataOutput;
}

export interface TillageDataGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified tillage data resource under a particular farmer. */
export interface TillageDataGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataGetdefaultHeaders;
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

export interface TillageDataCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an tillage data resource under a particular farmer. */
export interface TillageDataCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified tillage data resource under a particular farmer. */
export interface TillageDataDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface TillageDataDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified tillage data resource under a particular farmer. */
export interface TillageDataDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataDeletedefaultHeaders;
}

/** Returns a paginated list of tillage data resources across all farmers. */
export interface TillageDataList200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponseOutput;
}

export interface TillageDataListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of tillage data resources across all farmers. */
export interface TillageDataListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataListdefaultHeaders;
}

/** Create cascade delete job for tillage data resource. */
export interface TillageDataCreateCascadeDeleteJob202Response
  extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface TillageDataCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for tillage data resource. */
export interface TillageDataCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataCreateCascadeDeleteJobdefaultHeaders;
}

/** Get cascade delete job for tillage data resource. */
export interface TillageDataGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface TillageDataGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for tillage data resource. */
export interface TillageDataGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Returns a paginated list of weather data. */
export interface WeatherList200Response extends HttpResponse {
  status: "200";
  body: WeatherDataListResponseOutput;
}

export interface WeatherListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of weather data. */
export interface WeatherListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherListdefaultHeaders;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: WeatherDataDeleteJobOutput;
}

export interface WeatherGetDataDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherGetDataDeleteJobDetailsdefaultHeaders;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataDeleteJobOutput;
}

export interface WeatherCreateDataDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherCreateDataDeleteJobdefaultHeaders;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: WeatherDataIngestionJobOutput;
}

export interface WeatherGetDataIngestionJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherGetDataIngestionJobDetailsdefaultHeaders;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataIngestionJobOutput;
}

export interface WeatherCreateDataIngestionJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherCreateDataIngestionJobdefaultHeaders;
}

/** Returns a paginated list of zone resources under a particular farmer. */
export interface ZonesListByFarmerId200Response extends HttpResponse {
  status: "200";
  body: ZoneListResponseOutput;
}

export interface ZonesListByFarmerIddefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of zone resources under a particular farmer. */
export interface ZonesListByFarmerIddefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesListByFarmerIddefaultHeaders;
}

/** Gets a specified zone resource under a particular farmer. */
export interface ZonesGet200Response extends HttpResponse {
  status: "200";
  body: ZoneOutput;
}

export interface ZonesGetdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified zone resource under a particular farmer. */
export interface ZonesGetdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesGetdefaultHeaders;
}

/** Creates or updates a Zone resource. */
export interface ZonesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ZoneOutput;
}

/** Creates or updates a Zone resource. */
export interface ZonesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ZoneOutput;
}

export interface ZonesCreateOrUpdatedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a Zone resource. */
export interface ZonesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesCreateOrUpdatedefaultHeaders;
}

/** Deletes a specified zone resource under a particular farmer. */
export interface ZonesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

export interface ZonesDeletedefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified zone resource under a particular farmer. */
export interface ZonesDeletedefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesDeletedefaultHeaders;
}

/** Returns a paginated list of zone resources across all farmers. */
export interface ZonesList200Response extends HttpResponse {
  status: "200";
  body: ZoneListResponseOutput;
}

export interface ZonesListdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of zone resources across all farmers. */
export interface ZonesListdefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesListdefaultHeaders;
}

/** Get a cascade delete job for specified job id. */
export interface ZonesGetCascadeDeleteJobDetails200Response
  extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface ZonesGetCascadeDeleteJobDetailsdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified job id. */
export interface ZonesGetCascadeDeleteJobDetailsdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesGetCascadeDeleteJobDetailsdefaultHeaders;
}

/** Create a cascade delete job for specified zone. */
export interface ZonesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface ZonesCreateCascadeDeleteJobdefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified zone. */
export interface ZonesCreateCascadeDeleteJobdefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesCreateCascadeDeleteJobdefaultHeaders;
}
