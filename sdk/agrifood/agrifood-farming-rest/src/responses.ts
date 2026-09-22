// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  ApplicationDataListResponseOutput,
  ErrorResponseOutput,
  CascadeDeleteJobOutput,
  ApplicationDataOutput,
  AttachmentListResponseOutput,
  AttachmentOutput,
  BoundaryMetadataListResponseOutput,
  BoundaryOutput,
  BoundaryOverlapResponseOutput,
  CropProductListResponseOutput,
  CropProductOutput,
  CropListResponseOutput,
  CropOutput,
  DeviceDataModelListResponseOutput,
  DeviceDataModelOutput,
  DeviceListResponseOutput,
  DeviceOutput,
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
  SensorPlacementModelJobOutput,
  SoilMoistureModelJobOutput,
  NutrientAnalysisListResponseOutput,
  NutrientAnalysisOutput,
  OAuthProviderListResponseOutput,
  OAuthProviderOutput,
  OAuthProviderCascadeDeleteJobOutput,
  OAuthTokenListResponseOutput,
  PartyListResponseOutput,
  PartyOutput,
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
  SearchFeaturesResponseOutput,
  StacFeatureOutput,
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
  WeatherDataProviderResponseOutput,
  ZoneListResponseOutput,
  ZoneOutput,
} from "./outputModels.js";

/** Returns a paginated list of application data resources across all parties. */
export interface ApplicationDataList200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponseOutput;
}

export interface ApplicationDataListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of application data resources across all parties. */
export interface ApplicationDataListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataListDefaultHeaders;
}

/** Create cascade delete job for application data resource. */
export interface ApplicationDataCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface ApplicationDataCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for application data resource. */
export interface ApplicationDataCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataCreateCascadeDeleteJobDefaultHeaders;
}

/** Get cascade delete job for application data resource. */
export interface ApplicationDataGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface ApplicationDataGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for application data resource. */
export interface ApplicationDataGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of application data resources under a particular party. */
export interface ApplicationDataListByPartyId200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataListResponseOutput;
}

export interface ApplicationDataListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of application data resources under a particular party. */
export interface ApplicationDataListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataListByPartyIdDefaultHeaders;
}

/** Get a specified application data resource under a particular party. */
export interface ApplicationDataGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataOutput;
}

export interface ApplicationDataGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified application data resource under a particular party. */
export interface ApplicationDataGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataGetDefaultHeaders;
}

/** Creates or updates an application data resource under a particular party. */
export interface ApplicationDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationDataOutput;
}

/** Creates or updates an application data resource under a particular party. */
export interface ApplicationDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ApplicationDataOutput;
}

export interface ApplicationDataCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an application data resource under a particular party. */
export interface ApplicationDataCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified application data resource under a particular party. */
export interface ApplicationDataDelete204Response extends HttpResponse {
  status: "204";
}

export interface ApplicationDataDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified application data resource under a particular party. */
export interface ApplicationDataDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ApplicationDataDeleteDefaultHeaders;
}

/** Returns a paginated list of attachment resources under a particular party. */
export interface AttachmentsListByPartyId200Response extends HttpResponse {
  status: "200";
  body: AttachmentListResponseOutput;
}

export interface AttachmentsListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of attachment resources under a particular party. */
export interface AttachmentsListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsListByPartyIdDefaultHeaders;
}

/** Gets a specified attachment resource under a particular party. */
export interface AttachmentsGet200Response extends HttpResponse {
  status: "200";
  body: AttachmentOutput;
}

export interface AttachmentsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified attachment resource under a particular party. */
export interface AttachmentsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsGetDefaultHeaders;
}

/** Creates or updates an attachment resource under a particular party. */
export interface AttachmentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AttachmentOutput;
}

/** Creates or updates an attachment resource under a particular party. */
export interface AttachmentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: AttachmentOutput;
}

export interface AttachmentsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an attachment resource under a particular party. */
export interface AttachmentsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified attachment resource under a particular party. */
export interface AttachmentsDelete204Response extends HttpResponse {
  status: "204";
}

export interface AttachmentsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified attachment resource under a particular party. */
export interface AttachmentsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsDeleteDefaultHeaders;
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownload200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface AttachmentsDownloadDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Downloads and returns attachment as response for the given input filePath. */
export interface AttachmentsDownloadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & AttachmentsDownloadDefaultHeaders;
}

/** Returns a paginated list of boundary resources across all parties. */
export interface BoundariesList200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of boundary resources across all parties. */
export interface BoundariesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesListDefaultHeaders;
}

/** Search for boundaries across all parties by fields and intersecting geometry. */
export interface BoundariesSearch200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesSearchDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Search for boundaries across all parties by fields and intersecting geometry. */
export interface BoundariesSearchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesSearchDefaultHeaders;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface BoundariesCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified boundary. */
export interface BoundariesCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesCreateCascadeDeleteJobDefaultHeaders;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface BoundariesGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for specified boundary. */
export interface BoundariesGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of boundary resources under a particular party. */
export interface BoundariesListByPartyId200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of boundary resources under a particular party. */
export interface BoundariesListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesListByPartyIdDefaultHeaders;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByPartyId200Response extends HttpResponse {
  status: "200";
  body: BoundaryMetadataListResponseOutput;
}

export interface BoundariesSearchByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Search for boundaries by fields and intersecting geometry. */
export interface BoundariesSearchByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesSearchByPartyIdDefaultHeaders;
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

export interface BoundariesCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a boundary resource. */
export interface BoundariesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesCreateOrUpdateDefaultHeaders;
}

/** Gets a specified boundary resource under a particular party. */
export interface BoundariesGet200Response extends HttpResponse {
  status: "200";
  body: BoundaryOutput;
}

export interface BoundariesGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified boundary resource under a particular party. */
export interface BoundariesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesGetDefaultHeaders;
}

/** Deletes a specified boundary resource under a particular party. */
export interface BoundariesDelete204Response extends HttpResponse {
  status: "204";
}

export interface BoundariesDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified boundary resource under a particular party. */
export interface BoundariesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesDeleteDefaultHeaders;
}

/** Returns overlapping area between two boundary Ids. */
export interface BoundariesGetOverlap200Response extends HttpResponse {
  status: "200";
  body: BoundaryOverlapResponseOutput;
}

export interface BoundariesGetOverlapDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns overlapping area between two boundary Ids. */
export interface BoundariesGetOverlapDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & BoundariesGetOverlapDefaultHeaders;
}

/** Returns a paginated list of crop product resources. */
export interface CropProductsList200Response extends HttpResponse {
  status: "200";
  body: CropProductListResponseOutput;
}

export interface CropProductsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of crop product resources. */
export interface CropProductsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropProductsListDefaultHeaders;
}

/** Gets a specified crop Product resource. */
export interface CropProductsGet200Response extends HttpResponse {
  status: "200";
  body: CropProductOutput;
}

export interface CropProductsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified crop Product resource. */
export interface CropProductsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropProductsGetDefaultHeaders;
}

/** Creates or updates a crop Product resource. */
export interface CropProductsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CropProductOutput;
}

/** Creates or updates a crop Product resource. */
export interface CropProductsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CropProductOutput;
}

export interface CropProductsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a crop Product resource. */
export interface CropProductsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropProductsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified crop Product resource. */
export interface CropProductsDelete204Response extends HttpResponse {
  status: "204";
}

export interface CropProductsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified crop Product resource. */
export interface CropProductsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropProductsDeleteDefaultHeaders;
}

/** Returns a paginated list of crop resources. */
export interface CropsList200Response extends HttpResponse {
  status: "200";
  body: CropListResponseOutput;
}

export interface CropsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of crop resources. */
export interface CropsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsListDefaultHeaders;
}

/** Gets a specified crop resource. */
export interface CropsGet200Response extends HttpResponse {
  status: "200";
  body: CropOutput;
}

export interface CropsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified crop resource. */
export interface CropsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsGetDefaultHeaders;
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

export interface CropsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a crop resource. */
export interface CropsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsCreateOrUpdateDefaultHeaders;
}

/** Deletes Crop for given crop id. */
export interface CropsDelete204Response extends HttpResponse {
  status: "204";
}

export interface CropsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes Crop for given crop id. */
export interface CropsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CropsDeleteDefaultHeaders;
}

/** Returns a paginated list of device data model resources. */
export interface DeviceDataModelsList200Response extends HttpResponse {
  status: "200";
  body: DeviceDataModelListResponseOutput;
}

export interface DeviceDataModelsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of device data model resources. */
export interface DeviceDataModelsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsListDefaultHeaders;
}

/** Create a device data model entity. */
export interface DeviceDataModelsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DeviceDataModelOutput;
}

/** Create a device data model entity. */
export interface DeviceDataModelsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DeviceDataModelOutput;
}

export interface DeviceDataModelsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a device data model entity. */
export interface DeviceDataModelsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsCreateOrUpdateDefaultHeaders;
}

/** Gets a device data model entity. */
export interface DeviceDataModelsGet200Response extends HttpResponse {
  status: "200";
  body: DeviceDataModelOutput;
}

export interface DeviceDataModelsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a device data model entity. */
export interface DeviceDataModelsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsGetDefaultHeaders;
}

/** Deletes a device data model entity. */
export interface DeviceDataModelsDelete204Response extends HttpResponse {
  status: "204";
}

export interface DeviceDataModelsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a device data model entity. */
export interface DeviceDataModelsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeviceDataModelsDeleteDefaultHeaders;
}

/** Returns a paginated list of device resources. */
export interface DevicesList200Response extends HttpResponse {
  status: "200";
  body: DeviceListResponseOutput;
}

export interface DevicesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of device resources. */
export interface DevicesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesListDefaultHeaders;
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

export interface DevicesCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a device entity. */
export interface DevicesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesCreateOrUpdateDefaultHeaders;
}

/** Gets a device entity. */
export interface DevicesGet200Response extends HttpResponse {
  status: "200";
  body: DeviceOutput;
}

export interface DevicesGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a device entity. */
export interface DevicesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesGetDefaultHeaders;
}

/** Deletes a device entity. */
export interface DevicesDelete204Response extends HttpResponse {
  status: "204";
}

export interface DevicesDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a device entity. */
export interface DevicesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DevicesDeleteDefaultHeaders;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: FarmOperationDataIngestionJobOutput;
}

export interface FarmOperationsCreateDataIngestionJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a farm operation data ingestion job. */
export interface FarmOperationsCreateDataIngestionJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmOperationsCreateDataIngestionJobDefaultHeaders;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: FarmOperationDataIngestionJobOutput;
}

export interface FarmOperationsGetDataIngestionJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a farm operation data ingestion job. */
export interface FarmOperationsGetDataIngestionJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmOperationsGetDataIngestionJobDetailsDefaultHeaders;
}

/** Returns a paginated list of farm resources across all parties. */
export interface FarmsList200Response extends HttpResponse {
  status: "200";
  body: FarmListResponseOutput;
}

export interface FarmsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of farm resources across all parties. */
export interface FarmsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsListDefaultHeaders;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface FarmsCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified farm. */
export interface FarmsCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsCreateCascadeDeleteJobDefaultHeaders;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface FarmsGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified farm. */
export interface FarmsGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of farm resources under a particular party. */
export interface FarmsListByPartyId200Response extends HttpResponse {
  status: "200";
  body: FarmListResponseOutput;
}

export interface FarmsListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of farm resources under a particular party. */
export interface FarmsListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsListByPartyIdDefaultHeaders;
}

/** Gets a specified farm resource under a particular party. */
export interface FarmsGet200Response extends HttpResponse {
  status: "200";
  body: FarmOutput;
}

export interface FarmsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified farm resource under a particular party. */
export interface FarmsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsGetDefaultHeaders;
}

/** Creates or updates a farm resource under a particular party. */
export interface FarmsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FarmOutput;
}

/** Creates or updates a farm resource under a particular party. */
export interface FarmsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FarmOutput;
}

export interface FarmsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a farm resource under a particular party. */
export interface FarmsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified farm resource under a particular party. */
export interface FarmsDelete204Response extends HttpResponse {
  status: "204";
}

export interface FarmsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified farm resource under a particular party. */
export interface FarmsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FarmsDeleteDefaultHeaders;
}

/** Returns a paginated list of field resources across all parties. */
export interface FieldsList200Response extends HttpResponse {
  status: "200";
  body: FieldListResponseOutput;
}

export interface FieldsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of field resources across all parties. */
export interface FieldsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsListDefaultHeaders;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface FieldsGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified field. */
export interface FieldsGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface FieldsCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified field. */
export interface FieldsCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a paginated list of field resources under a particular party. */
export interface FieldsListByPartyId200Response extends HttpResponse {
  status: "200";
  body: FieldListResponseOutput;
}

export interface FieldsListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of field resources under a particular party. */
export interface FieldsListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsListByPartyIdDefaultHeaders;
}

/** Gets a specified field resource under a particular party. */
export interface FieldsGet200Response extends HttpResponse {
  status: "200";
  body: FieldOutput;
}

export interface FieldsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified field resource under a particular party. */
export interface FieldsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsGetDefaultHeaders;
}

/** Creates or Updates a field resource under a particular party. */
export interface FieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FieldOutput;
}

/** Creates or Updates a field resource under a particular party. */
export interface FieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FieldOutput;
}

export interface FieldsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a field resource under a particular party. */
export interface FieldsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified field resource under a particular party. */
export interface FieldsDelete204Response extends HttpResponse {
  status: "204";
}

export interface FieldsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified field resource under a particular party. */
export interface FieldsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & FieldsDeleteDefaultHeaders;
}

/** Returns a paginated list of harvest data resources across all parties. */
export interface HarvestDataList200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponseOutput;
}

export interface HarvestDataListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of harvest data resources across all parties. */
export interface HarvestDataListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataListDefaultHeaders;
}

/** Create cascade delete job for harvest data resource. */
export interface HarvestDataCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface HarvestDataCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for harvest data resource. */
export interface HarvestDataCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataCreateCascadeDeleteJobDefaultHeaders;
}

/** Get cascade delete job for harvest data resource. */
export interface HarvestDataGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface HarvestDataGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for harvest data resource. */
export interface HarvestDataGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByPartyId200Response extends HttpResponse {
  status: "200";
  body: HarvestDataListResponseOutput;
}

export interface HarvestDataListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of harvest data resources under a particular farm. */
export interface HarvestDataListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataListByPartyIdDefaultHeaders;
}

/** Get a specified harvest data resource under a particular party. */
export interface HarvestDataGet200Response extends HttpResponse {
  status: "200";
  body: HarvestDataOutput;
}

export interface HarvestDataGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified harvest data resource under a particular party. */
export interface HarvestDataGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataGetDefaultHeaders;
}

/** Creates or updates harvest data resource under a particular party. */
export interface HarvestDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: HarvestDataOutput;
}

/** Creates or updates harvest data resource under a particular party. */
export interface HarvestDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: HarvestDataOutput;
}

export interface HarvestDataCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates harvest data resource under a particular party. */
export interface HarvestDataCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified harvest data resource under a particular party. */
export interface HarvestDataDelete204Response extends HttpResponse {
  status: "204";
}

export interface HarvestDataDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified harvest data resource under a particular party. */
export interface HarvestDataDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & HarvestDataDeleteDefaultHeaders;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJob202Response extends HttpResponse {
  status: "202";
  body: ImageProcessingRasterizeJobOutput;
}

export interface ImageProcessingCreateRasterizeJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a ImageProcessing Rasterize job. */
export interface ImageProcessingCreateRasterizeJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ImageProcessingCreateRasterizeJobDefaultHeaders;
}

/** Get ImageProcessing Rasterize job's details. */
export interface ImageProcessingGetRasterizeJob200Response extends HttpResponse {
  status: "200";
  body: ImageProcessingRasterizeJobOutput;
}

export interface ImageProcessingGetRasterizeJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get ImageProcessing Rasterize job's details. */
export interface ImageProcessingGetRasterizeJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ImageProcessingGetRasterizeJobDefaultHeaders;
}

/** Returns a paginated list of insight resources. */
export interface InsightAttachmentsListByPartyIdModelIdAndResource200Response extends HttpResponse {
  status: "200";
  body: InsightAttachmentListResponseOutput;
}

export interface InsightAttachmentsListByPartyIdModelIdAndResourceDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of insight resources. */
export interface InsightAttachmentsListByPartyIdModelIdAndResourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsListByPartyIdModelIdAndResourceDefaultHeaders;
}

/** Creates or updates insight entity. */
export interface InsightAttachmentsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: InsightAttachmentOutput;
}

/** Creates or updates insight entity. */
export interface InsightAttachmentsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: InsightAttachmentOutput;
}

export interface InsightAttachmentsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates insight entity. */
export interface InsightAttachmentsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsCreateOrUpdateDefaultHeaders;
}

/** Gets a specified insight resource under a particular party. */
export interface InsightAttachmentsGet200Response extends HttpResponse {
  status: "200";
  body: InsightAttachmentOutput;
}

export interface InsightAttachmentsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified insight resource under a particular party. */
export interface InsightAttachmentsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsGetDefaultHeaders;
}

/** Deletes a specified insight resource. */
export interface InsightAttachmentsDelete204Response extends HttpResponse {
  status: "204";
}

export interface InsightAttachmentsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified insight resource. */
export interface InsightAttachmentsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsDeleteDefaultHeaders;
}

/** Downloads and returns insight-attachment as response for the given input filePath. */
export interface InsightAttachmentsDownload200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface InsightAttachmentsDownloadDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Downloads and returns insight-attachment as response for the given input filePath. */
export interface InsightAttachmentsDownloadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightAttachmentsDownloadDefaultHeaders;
}

/** Create a cascade delete job for insights specified partyId/modelId/resourceType/resourceId. */
export interface InsightsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface InsightsCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for insights specified partyId/modelId/resourceType/resourceId. */
export interface InsightsCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsCreateCascadeDeleteJobDefaultHeaders;
}

/** Get a cascade delete job for specified insight. */
export interface InsightsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface InsightsGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified insight. */
export interface InsightsGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of insight resources. */
export interface InsightsListByPartyIdModelIdAndResource200Response extends HttpResponse {
  status: "200";
  body: InsightListResponseOutput;
}

export interface InsightsListByPartyIdModelIdAndResourceDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of insight resources. */
export interface InsightsListByPartyIdModelIdAndResourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsListByPartyIdModelIdAndResourceDefaultHeaders;
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

export interface InsightsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates insight entity. */
export interface InsightsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsCreateOrUpdateDefaultHeaders;
}

/** Gets a specified insight resource under a particular party. */
export interface InsightsGet200Response extends HttpResponse {
  status: "200";
  body: InsightOutput;
}

export interface InsightsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified insight resource under a particular party. */
export interface InsightsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsGetDefaultHeaders;
}

/** Deletes a specified insight resource. */
export interface InsightsDelete204Response extends HttpResponse {
  status: "204";
}

export interface InsightsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified insight resource. */
export interface InsightsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & InsightsDeleteDefaultHeaders;
}

/** Returns a paginated list of management zone resources across all parties. */
export interface ManagementZonesList200Response extends HttpResponse {
  status: "200";
  body: ManagementZoneListResponseOutput;
}

export interface ManagementZonesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of management zone resources across all parties. */
export interface ManagementZonesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesListDefaultHeaders;
}

/** Get a cascade delete job for specified job id. */
export interface ManagementZonesGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface ManagementZonesGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified job id. */
export interface ManagementZonesGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create a cascade delete job for specified management zone. */
export interface ManagementZonesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface ManagementZonesCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified management zone. */
export interface ManagementZonesCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a paginated list of management zone resources under a particular party. */
export interface ManagementZonesListByPartyId200Response extends HttpResponse {
  status: "200";
  body: ManagementZoneListResponseOutput;
}

export interface ManagementZonesListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of management zone resources under a particular party. */
export interface ManagementZonesListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesListByPartyIdDefaultHeaders;
}

/** Gets a specified management zone resource under a particular party. */
export interface ManagementZonesGet200Response extends HttpResponse {
  status: "200";
  body: ManagementZoneOutput;
}

export interface ManagementZonesGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified management zone resource under a particular party. */
export interface ManagementZonesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesGetDefaultHeaders;
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

export interface ManagementZonesCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a management zone resource. */
export interface ManagementZonesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified management zone resource under a particular party. */
export interface ManagementZonesDelete204Response extends HttpResponse {
  status: "204";
}

export interface ManagementZonesDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified management zone resource under a particular party. */
export interface ManagementZonesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ManagementZonesDeleteDefaultHeaders;
}

/** Create a Biomass Model job. */
export interface ModelInferenceCreateBiomassModelJob202Response extends HttpResponse {
  status: "202";
  body: BiomassModelJobOutput;
}

export interface ModelInferenceCreateBiomassModelJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a Biomass Model job. */
export interface ModelInferenceCreateBiomassModelJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceCreateBiomassModelJobDefaultHeaders;
}

/** Get Biomass Model job's details. */
export interface ModelInferenceGetBiomassModelJob200Response extends HttpResponse {
  status: "200";
  body: BiomassModelJobOutput;
}

export interface ModelInferenceGetBiomassModelJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get Biomass Model job's details. */
export interface ModelInferenceGetBiomassModelJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceGetBiomassModelJobDefaultHeaders;
}

/** Create a Sensor Placement Model job. */
export interface ModelInferenceCreateSensorPlacementModelJob202Response extends HttpResponse {
  status: "202";
  body: SensorPlacementModelJobOutput;
}

export interface ModelInferenceCreateSensorPlacementModelJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a Sensor Placement Model job. */
export interface ModelInferenceCreateSensorPlacementModelJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceCreateSensorPlacementModelJobDefaultHeaders;
}

/** Get Sensor Placement Model job's details. */
export interface ModelInferenceGetSensorPlacementModelJob200Response extends HttpResponse {
  status: "200";
  body: SensorPlacementModelJobOutput;
}

export interface ModelInferenceGetSensorPlacementModelJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get Sensor Placement Model job's details. */
export interface ModelInferenceGetSensorPlacementModelJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceGetSensorPlacementModelJobDefaultHeaders;
}

/** Create a SoilMoisture Model job. */
export interface ModelInferenceCreateSoilMoistureModelJob202Response extends HttpResponse {
  status: "202";
  body: SoilMoistureModelJobOutput;
}

export interface ModelInferenceCreateSoilMoistureModelJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a SoilMoisture Model job. */
export interface ModelInferenceCreateSoilMoistureModelJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceCreateSoilMoistureModelJobDefaultHeaders;
}

/** Get SoilMoisture Model job's details. */
export interface ModelInferenceGetSoilMoistureModelJob200Response extends HttpResponse {
  status: "200";
  body: SoilMoistureModelJobOutput;
}

export interface ModelInferenceGetSoilMoistureModelJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get SoilMoisture Model job's details. */
export interface ModelInferenceGetSoilMoistureModelJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ModelInferenceGetSoilMoistureModelJobDefaultHeaders;
}

/** Returns a paginated list of nutrient analysis resources across all parties. */
export interface NutrientAnalysesList200Response extends HttpResponse {
  status: "200";
  body: NutrientAnalysisListResponseOutput;
}

export interface NutrientAnalysesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of nutrient analysis resources across all parties. */
export interface NutrientAnalysesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesListDefaultHeaders;
}

/** Returns a paginated list of nutrient analysis resources under a particular party. */
export interface NutrientAnalysesListByPartyId200Response extends HttpResponse {
  status: "200";
  body: NutrientAnalysisListResponseOutput;
}

export interface NutrientAnalysesListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of nutrient analysis resources under a particular party. */
export interface NutrientAnalysesListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesListByPartyIdDefaultHeaders;
}

/** Gets a specified nutrient analysis resource under a particular party. */
export interface NutrientAnalysesGet200Response extends HttpResponse {
  status: "200";
  body: NutrientAnalysisOutput;
}

export interface NutrientAnalysesGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified nutrient analysis resource under a particular party. */
export interface NutrientAnalysesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesGetDefaultHeaders;
}

/** Creates or updates a nutrient analysis resource. */
export interface NutrientAnalysesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NutrientAnalysisOutput;
}

/** Creates or updates a nutrient analysis resource. */
export interface NutrientAnalysesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NutrientAnalysisOutput;
}

export interface NutrientAnalysesCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a nutrient analysis resource. */
export interface NutrientAnalysesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified nutrient analysis resource under a particular party. */
export interface NutrientAnalysesDelete204Response extends HttpResponse {
  status: "204";
}

export interface NutrientAnalysesDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified nutrient analysis resource under a particular party. */
export interface NutrientAnalysesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & NutrientAnalysesDeleteDefaultHeaders;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersList200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderListResponseOutput;
}

export interface OAuthProvidersListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of oauthProvider resources. */
export interface OAuthProvidersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersListDefaultHeaders;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGet200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderOutput;
}

export interface OAuthProvidersGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified oauthProvider resource. */
export interface OAuthProvidersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersGetDefaultHeaders;
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

export interface OAuthProvidersCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an oauthProvider resource. */
export interface OAuthProvidersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersCreateOrUpdateDefaultHeaders;
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDelete204Response extends HttpResponse {
  status: "204";
}

export interface OAuthProvidersDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes an specified oauthProvider resource. */
export interface OAuthProvidersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersDeleteDefaultHeaders;
}

/** Get cascade delete job for oauthProvider resource. */
export interface OAuthProvidersGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: OAuthProviderCascadeDeleteJobOutput;
}

export interface OAuthProvidersGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for oauthProvider resource. */
export interface OAuthProvidersGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create cascade delete job for oauthProvider resource. */
export interface OAuthProvidersCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: OAuthProviderCascadeDeleteJobOutput;
}

export interface OAuthProvidersCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for oauthProvider resource. */
export interface OAuthProvidersCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthProvidersCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensList200Response extends HttpResponse {
  status: "200";
  body: OAuthTokenListResponseOutput;
}

export interface OAuthTokensListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a list of OAuthToken documents. */
export interface OAuthTokensListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensListDefaultHeaders;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLink200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface OAuthTokensGetOAuthConnectionLinkDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns Connection link needed in the OAuth flow. */
export interface OAuthTokensGetOAuthConnectionLinkDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensGetOAuthConnectionLinkDefaultHeaders;
}

/** Get remove job for OAuth token. */
export interface OAuthTokensGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface OAuthTokensGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get remove job for OAuth token. */
export interface OAuthTokensGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create remove job for OAuth token. */
export interface OAuthTokensCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface OAuthTokensCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create remove job for OAuth token. */
export interface OAuthTokensCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & OAuthTokensCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a paginated list of party resources. */
export interface PartiesList200Response extends HttpResponse {
  status: "200";
  body: PartyListResponseOutput;
}

export interface PartiesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of party resources. */
export interface PartiesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PartiesListDefaultHeaders;
}

/** Gets a specified party resource. */
export interface PartiesGet200Response extends HttpResponse {
  status: "200";
  body: PartyOutput;
}

export interface PartiesGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified party resource. */
export interface PartiesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PartiesGetDefaultHeaders;
}

/** Creates or updates a party resource. */
export interface PartiesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PartyOutput;
}

/** Creates or updates a party resource. */
export interface PartiesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PartyOutput;
}

export interface PartiesCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a party resource. */
export interface PartiesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PartiesCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified party resource. */
export interface PartiesDelete204Response extends HttpResponse {
  status: "204";
}

export interface PartiesDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified party resource. */
export interface PartiesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PartiesDeleteDefaultHeaders;
}

/** Get a cascade delete job for specified party. */
export interface PartiesGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PartiesGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified party. */
export interface PartiesGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PartiesGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create a cascade delete job for specified party. */
export interface PartiesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PartiesCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified party. */
export interface PartiesCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PartiesCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a paginated list of planting data resources under a particular party. */
export interface PlantingDataListByPartyId200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponseOutput;
}

export interface PlantingDataListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of planting data resources under a particular party. */
export interface PlantingDataListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataListByPartyIdDefaultHeaders;
}

/** Get a specified planting data resource under a particular party. */
export interface PlantingDataGet200Response extends HttpResponse {
  status: "200";
  body: PlantingDataOutput;
}

export interface PlantingDataGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified planting data resource under a particular party. */
export interface PlantingDataGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataGetDefaultHeaders;
}

/** Creates or updates an planting data resource under a particular party. */
export interface PlantingDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PlantingDataOutput;
}

/** Creates or updates an planting data resource under a particular party. */
export interface PlantingDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PlantingDataOutput;
}

export interface PlantingDataCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an planting data resource under a particular party. */
export interface PlantingDataCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified planting data resource under a particular party. */
export interface PlantingDataDelete204Response extends HttpResponse {
  status: "204";
}

export interface PlantingDataDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified planting data resource under a particular party. */
export interface PlantingDataDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataDeleteDefaultHeaders;
}

/** Returns a paginated list of planting data resources across all parties. */
export interface PlantingDataList200Response extends HttpResponse {
  status: "200";
  body: PlantingDataListResponseOutput;
}

export interface PlantingDataListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of planting data resources across all parties. */
export interface PlantingDataListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataListDefaultHeaders;
}

/** Create cascade delete job for planting data resource. */
export interface PlantingDataCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PlantingDataCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for planting data resource. */
export interface PlantingDataCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataCreateCascadeDeleteJobDefaultHeaders;
}

/** Get cascade delete job for planting data resource. */
export interface PlantingDataGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PlantingDataGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for planting data resource. */
export interface PlantingDataGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantingDataGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of plant tissue analysis resources under a particular party. */
export interface PlantTissueAnalysesListByPartyId200Response extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisListResponseOutput;
}

export interface PlantTissueAnalysesListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of plant tissue analysis resources under a particular party. */
export interface PlantTissueAnalysesListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesListByPartyIdDefaultHeaders;
}

/** Gets a specified plant tissue analysis resource under a particular party. */
export interface PlantTissueAnalysesGet200Response extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisOutput;
}

export interface PlantTissueAnalysesGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified plant tissue analysis resource under a particular party. */
export interface PlantTissueAnalysesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesGetDefaultHeaders;
}

/** Creates or updates a plant tissue analysis resource. */
export interface PlantTissueAnalysesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisOutput;
}

/** Creates or updates a plant tissue analysis resource. */
export interface PlantTissueAnalysesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PlantTissueAnalysisOutput;
}

export interface PlantTissueAnalysesCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a plant tissue analysis resource. */
export interface PlantTissueAnalysesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified plant tissue analysis resource under a particular party. */
export interface PlantTissueAnalysesDelete204Response extends HttpResponse {
  status: "204";
}

export interface PlantTissueAnalysesDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified plant tissue analysis resource under a particular party. */
export interface PlantTissueAnalysesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesDeleteDefaultHeaders;
}

/** Returns a paginated list of plant tissue analysis resources across all parties. */
export interface PlantTissueAnalysesList200Response extends HttpResponse {
  status: "200";
  body: PlantTissueAnalysisListResponseOutput;
}

export interface PlantTissueAnalysesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of plant tissue analysis resources across all parties. */
export interface PlantTissueAnalysesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesListDefaultHeaders;
}

/** Create a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PlantTissueAnalysesCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesCreateCascadeDeleteJobDefaultHeaders;
}

/** Get a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified plant tissue analysis. */
export interface PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of prescription map resources under a particular party. */
export interface PrescriptionMapsListByPartyId200Response extends HttpResponse {
  status: "200";
  body: PrescriptionMapListResponseOutput;
}

export interface PrescriptionMapsListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription map resources under a particular party. */
export interface PrescriptionMapsListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsListByPartyIdDefaultHeaders;
}

/** Gets a specified prescription map resource under a particular party. */
export interface PrescriptionMapsGet200Response extends HttpResponse {
  status: "200";
  body: PrescriptionMapOutput;
}

export interface PrescriptionMapsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified prescription map resource under a particular party. */
export interface PrescriptionMapsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsGetDefaultHeaders;
}

/** Creates or Updates a prescription map resource under a particular party. */
export interface PrescriptionMapsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PrescriptionMapOutput;
}

/** Creates or Updates a prescription map resource under a particular party. */
export interface PrescriptionMapsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PrescriptionMapOutput;
}

export interface PrescriptionMapsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a prescription map resource under a particular party. */
export interface PrescriptionMapsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified prescription map resource under a particular party. */
export interface PrescriptionMapsDelete204Response extends HttpResponse {
  status: "204";
}

export interface PrescriptionMapsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified prescription map resource under a particular party. */
export interface PrescriptionMapsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsDeleteDefaultHeaders;
}

/** Returns a paginated list of prescription map resources across all parties. */
export interface PrescriptionMapsList200Response extends HttpResponse {
  status: "200";
  body: PrescriptionMapListResponseOutput;
}

export interface PrescriptionMapsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription map resources across all parties. */
export interface PrescriptionMapsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsListDefaultHeaders;
}

/** Get a cascade delete job for specified prescription map. */
export interface PrescriptionMapsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionMapsGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified prescription map. */
export interface PrescriptionMapsGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create a cascade delete job for specified prescription map. */
export interface PrescriptionMapsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionMapsCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified prescription map. */
export interface PrescriptionMapsCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionMapsCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a paginated list of prescription resources under a particular party. */
export interface PrescriptionsListByPartyId200Response extends HttpResponse {
  status: "200";
  body: PrescriptionListResponseOutput;
}

export interface PrescriptionsListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription resources under a particular party. */
export interface PrescriptionsListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsListByPartyIdDefaultHeaders;
}

/** Gets a specified prescription resource under a particular party. */
export interface PrescriptionsGet200Response extends HttpResponse {
  status: "200";
  body: PrescriptionOutput;
}

export interface PrescriptionsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified prescription resource under a particular party. */
export interface PrescriptionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsGetDefaultHeaders;
}

/** Creates or Updates a prescription resource under a particular party. */
export interface PrescriptionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PrescriptionOutput;
}

/** Creates or Updates a prescription resource under a particular party. */
export interface PrescriptionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PrescriptionOutput;
}

export interface PrescriptionsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a prescription resource under a particular party. */
export interface PrescriptionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified prescription resource under a particular party. */
export interface PrescriptionsDelete204Response extends HttpResponse {
  status: "204";
}

export interface PrescriptionsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified prescription resource under a particular party. */
export interface PrescriptionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsDeleteDefaultHeaders;
}

/** Returns a paginated list of prescription resources across all parties. */
export interface PrescriptionsList200Response extends HttpResponse {
  status: "200";
  body: PrescriptionListResponseOutput;
}

export interface PrescriptionsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of prescription resources across all parties. */
export interface PrescriptionsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsListDefaultHeaders;
}

/** Get a cascade delete job for specified prescription. */
export interface PrescriptionsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionsGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified prescription. */
export interface PrescriptionsGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create a cascade delete job for specified prescription. */
export interface PrescriptionsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface PrescriptionsCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified prescription. */
export interface PrescriptionsCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PrescriptionsCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a paginated list of scene resources. */
export interface ScenesList200Response extends HttpResponse {
  status: "200";
  body: SceneListResponseOutput;
}

export interface ScenesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of scene resources. */
export interface ScenesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesListDefaultHeaders;
}

/** Downloads and returns file Stream as response for the given input filePath. */
export interface ScenesDownload200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface ScenesDownloadDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Downloads and returns file Stream as response for the given input filePath. */
export interface ScenesDownloadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesDownloadDefaultHeaders;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: SatelliteDataIngestionJobOutput;
}

export interface ScenesCreateSatelliteDataIngestionJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a satellite data ingestion job. */
export interface ScenesCreateSatelliteDataIngestionJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesCreateSatelliteDataIngestionJobDefaultHeaders;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: SatelliteDataIngestionJobOutput;
}

export interface ScenesGetSatelliteDataIngestionJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a satellite data ingestion job. */
export interface ScenesGetSatelliteDataIngestionJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesGetSatelliteDataIngestionJobDetailsDefaultHeaders;
}

/** Search for STAC features by collection id, bbox, intersecting geometry, start and end datetime. */
export interface ScenesSearchFeatures200Response extends HttpResponse {
  status: "200";
  body: SearchFeaturesResponseOutput;
}

export interface ScenesSearchFeaturesDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Search for STAC features by collection id, bbox, intersecting geometry, start and end datetime. */
export interface ScenesSearchFeaturesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesSearchFeaturesDefaultHeaders;
}

/** Get a feature(SpatioTemporal Asset Catalog (STAC) Item) for given collection and feature id. */
export interface ScenesGetStacFeature200Response extends HttpResponse {
  status: "200";
  body: StacFeatureOutput;
}

export interface ScenesGetStacFeatureDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a feature(SpatioTemporal Asset Catalog (STAC) Item) for given collection and feature id. */
export interface ScenesGetStacFeatureDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ScenesGetStacFeatureDefaultHeaders;
}

/** Returns a paginated list of seasonal field resources under a particular party. */
export interface SeasonalFieldsListByPartyId200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponseOutput;
}

export interface SeasonalFieldsListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of seasonal field resources under a particular party. */
export interface SeasonalFieldsListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsListByPartyIdDefaultHeaders;
}

/** Gets a specified seasonal field resource under a particular party. */
export interface SeasonalFieldsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldOutput;
}

export interface SeasonalFieldsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified seasonal field resource under a particular party. */
export interface SeasonalFieldsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsGetDefaultHeaders;
}

/** Creates or Updates a seasonal field resource under a particular party. */
export interface SeasonalFieldsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldOutput;
}

/** Creates or Updates a seasonal field resource under a particular party. */
export interface SeasonalFieldsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SeasonalFieldOutput;
}

export interface SeasonalFieldsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or Updates a seasonal field resource under a particular party. */
export interface SeasonalFieldsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified seasonal-field resource under a particular party. */
export interface SeasonalFieldsDelete204Response extends HttpResponse {
  status: "204";
}

export interface SeasonalFieldsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified seasonal-field resource under a particular party. */
export interface SeasonalFieldsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsDeleteDefaultHeaders;
}

/** Returns a paginated list of seasonal field resources across all parties. */
export interface SeasonalFieldsList200Response extends HttpResponse {
  status: "200";
  body: SeasonalFieldListResponseOutput;
}

export interface SeasonalFieldsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of seasonal field resources across all parties. */
export interface SeasonalFieldsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsListDefaultHeaders;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface SeasonalFieldsGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for specified seasonal field. */
export interface SeasonalFieldsGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface SeasonalFieldsCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified seasonal field. */
export interface SeasonalFieldsCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonalFieldsCreateCascadeDeleteJobDefaultHeaders;
}

/** Returns a paginated list of season resources. */
export interface SeasonsList200Response extends HttpResponse {
  status: "200";
  body: SeasonListResponseOutput;
}

export interface SeasonsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of season resources. */
export interface SeasonsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsListDefaultHeaders;
}

/** Gets a specified season resource. */
export interface SeasonsGet200Response extends HttpResponse {
  status: "200";
  body: SeasonOutput;
}

export interface SeasonsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified season resource. */
export interface SeasonsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsGetDefaultHeaders;
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

export interface SeasonsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a season resource. */
export interface SeasonsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified season resource. */
export interface SeasonsDelete204Response extends HttpResponse {
  status: "204";
}

export interface SeasonsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified season resource. */
export interface SeasonsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SeasonsDeleteDefaultHeaders;
}

/** Returns a paginated list of sensor data model resources. */
export interface SensorDataModelsList200Response extends HttpResponse {
  status: "200";
  body: SensorDataModelListResponseOutput;
}

export interface SensorDataModelsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of sensor data model resources. */
export interface SensorDataModelsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsListDefaultHeaders;
}

/** Create a sensor data model entity. */
export interface SensorDataModelsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SensorDataModelOutput;
}

/** Create a sensor data model entity. */
export interface SensorDataModelsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SensorDataModelOutput;
}

export interface SensorDataModelsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a sensor data model entity. */
export interface SensorDataModelsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsCreateOrUpdateDefaultHeaders;
}

/** Gets a sensor data model entity. */
export interface SensorDataModelsGet200Response extends HttpResponse {
  status: "200";
  body: SensorDataModelOutput;
}

export interface SensorDataModelsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor data model entity. */
export interface SensorDataModelsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsGetDefaultHeaders;
}

/** Deletes a sensor data model entity. */
export interface SensorDataModelsDelete204Response extends HttpResponse {
  status: "204";
}

export interface SensorDataModelsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a sensor data model entity. */
export interface SensorDataModelsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorDataModelsDeleteDefaultHeaders;
}

/**
 * Returns a list of sensor events data. Time span for query is limited to 90 days at a time.
 * Returns last 90 days events when startDateTime and endDateTime are not provided.
 */
export interface SensorEventsList200Response extends HttpResponse {
  status: "200";
  body: SensorEventListResponseOutput;
}

export interface SensorEventsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/**
 * Returns a list of sensor events data. Time span for query is limited to 90 days at a time.
 * Returns last 90 days events when startDateTime and endDateTime are not provided.
 */
export interface SensorEventsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorEventsListDefaultHeaders;
}

/** Returns a paginated list of sensor mapping resources. */
export interface SensorMappingsList200Response extends HttpResponse {
  status: "200";
  body: SensorMappingListResponseOutput;
}

export interface SensorMappingsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of sensor mapping resources. */
export interface SensorMappingsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsListDefaultHeaders;
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

export interface SensorMappingsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a sensor mapping entity. */
export interface SensorMappingsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsCreateOrUpdateDefaultHeaders;
}

/** Gets a sensor mapping entity. */
export interface SensorMappingsGet200Response extends HttpResponse {
  status: "200";
  body: SensorMappingOutput;
}

export interface SensorMappingsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor mapping entity. */
export interface SensorMappingsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsGetDefaultHeaders;
}

/** Deletes a sensor mapping entity. */
export interface SensorMappingsDelete204Response extends HttpResponse {
  status: "204";
}

export interface SensorMappingsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a sensor mapping entity. */
export interface SensorMappingsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorMappingsDeleteDefaultHeaders;
}

/** Gets partner integration models. */
export interface SensorPartnerIntegrationsList200Response extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationModelListResponseOutput;
}

export interface SensorPartnerIntegrationsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets partner integration models. */
export interface SensorPartnerIntegrationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsListDefaultHeaders;
}

/** Create or update an integration with a sensor partner. */
export interface SensorPartnerIntegrationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationModelOutput;
}

/** Create or update an integration with a sensor partner. */
export interface SensorPartnerIntegrationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SensorPartnerIntegrationModelOutput;
}

export interface SensorPartnerIntegrationsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create or update an integration with a sensor partner. */
export interface SensorPartnerIntegrationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsCreateOrUpdateDefaultHeaders;
}

/** Gets a partner integration model entity. */
export interface SensorPartnerIntegrationsGet200Response extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationModelOutput;
}

export interface SensorPartnerIntegrationsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a partner integration model entity. */
export interface SensorPartnerIntegrationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsGetDefaultHeaders;
}

/** Deletes a partner integration model entity. */
export interface SensorPartnerIntegrationsDelete204Response extends HttpResponse {
  status: "204";
}

export interface SensorPartnerIntegrationsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a partner integration model entity. */
export interface SensorPartnerIntegrationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsDeleteDefaultHeaders;
}

/** Checks consent for partner integration. */
export interface SensorPartnerIntegrationsCheckConsent200Response extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationCheckConsentResponseOutput;
}

export interface SensorPartnerIntegrationsCheckConsentDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Checks consent for partner integration. */
export interface SensorPartnerIntegrationsCheckConsentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsCheckConsentDefaultHeaders;
}

/** Generates partner integration consent link. */
export interface SensorPartnerIntegrationsGenerateConsentLink200Response extends HttpResponse {
  status: "200";
  body: SensorPartnerIntegrationGenerateConsentLinkResponseOutput;
}

export interface SensorPartnerIntegrationsGenerateConsentLinkDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Generates partner integration consent link. */
export interface SensorPartnerIntegrationsGenerateConsentLinkDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorPartnerIntegrationsGenerateConsentLinkDefaultHeaders;
}

/** Returns a paginated list of sensor resources. */
export interface SensorsList200Response extends HttpResponse {
  status: "200";
  body: SensorListResponseOutput;
}

export interface SensorsListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of sensor resources. */
export interface SensorsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsListDefaultHeaders;
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

export interface SensorsCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a sensor entity. */
export interface SensorsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsCreateOrUpdateDefaultHeaders;
}

/** Gets a sensor entity. */
export interface SensorsGet200Response extends HttpResponse {
  status: "200";
  body: SensorOutput;
}

export interface SensorsGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor entity. */
export interface SensorsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsGetDefaultHeaders;
}

/** Deletes a sensor entity. */
export interface SensorsDelete204Response extends HttpResponse {
  status: "204";
}

export interface SensorsDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a sensor entity. */
export interface SensorsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsDeleteDefaultHeaders;
}

/** Gets a sensor connection string. */
export interface SensorsGetConnectionString200Response extends HttpResponse {
  status: "200";
  body: IoTHubDeviceAuthenticationOutput;
}

export interface SensorsGetConnectionStringDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a sensor connection string. */
export interface SensorsGetConnectionStringDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsGetConnectionStringDefaultHeaders;
}

/** Renews a sensor connection string. */
export interface SensorsRenewConnectionString200Response extends HttpResponse {
  status: "200";
  body: IoTHubDeviceAuthenticationOutput;
}

export interface SensorsRenewConnectionStringDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Renews a sensor connection string. */
export interface SensorsRenewConnectionStringDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SensorsRenewConnectionStringDefaultHeaders;
}

/** Cancels a job for given solution id. */
export interface SolutionInferenceCancel200Response extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

export interface SolutionInferenceCancelDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Cancels a job for given solution id. */
export interface SolutionInferenceCancelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SolutionInferenceCancelDefaultHeaders;
}

/** Creates a job trigger for a solution. */
export interface SolutionInferenceCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, any>;
}

export interface SolutionInferenceCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates a job trigger for a solution. */
export interface SolutionInferenceCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SolutionInferenceCreateOrUpdateDefaultHeaders;
}

/** Fetches details of triggered job for a solution. */
export interface SolutionInferenceFetch200Response extends HttpResponse {
  status: "200";
  body: Record<string, any>;
}

export interface SolutionInferenceFetchDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Fetches details of triggered job for a solution. */
export interface SolutionInferenceFetchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & SolutionInferenceFetchDefaultHeaders;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByPartyId200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponseOutput;
}

export interface TillageDataListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of tillage data resources under a particular farm. */
export interface TillageDataListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataListByPartyIdDefaultHeaders;
}

/** Get a specified tillage data resource under a particular party. */
export interface TillageDataGet200Response extends HttpResponse {
  status: "200";
  body: TillageDataOutput;
}

export interface TillageDataGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a specified tillage data resource under a particular party. */
export interface TillageDataGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataGetDefaultHeaders;
}

/** Creates or updates an tillage data resource under a particular party. */
export interface TillageDataCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TillageDataOutput;
}

/** Creates or updates an tillage data resource under a particular party. */
export interface TillageDataCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: TillageDataOutput;
}

export interface TillageDataCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates an tillage data resource under a particular party. */
export interface TillageDataCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified tillage data resource under a particular party. */
export interface TillageDataDelete204Response extends HttpResponse {
  status: "204";
}

export interface TillageDataDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified tillage data resource under a particular party. */
export interface TillageDataDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataDeleteDefaultHeaders;
}

/** Returns a paginated list of tillage data resources across all parties. */
export interface TillageDataList200Response extends HttpResponse {
  status: "200";
  body: TillageDataListResponseOutput;
}

export interface TillageDataListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of tillage data resources across all parties. */
export interface TillageDataListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataListDefaultHeaders;
}

/** Create cascade delete job for tillage data resource. */
export interface TillageDataCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface TillageDataCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create cascade delete job for tillage data resource. */
export interface TillageDataCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataCreateCascadeDeleteJobDefaultHeaders;
}

/** Get cascade delete job for tillage data resource. */
export interface TillageDataGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface TillageDataGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get cascade delete job for tillage data resource. */
export interface TillageDataGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & TillageDataGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Returns a paginated list of weather data. */
export interface WeatherList200Response extends HttpResponse {
  status: "200";
  body: WeatherDataListResponseOutput;
}

export interface WeatherListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of weather data. */
export interface WeatherListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherListDefaultHeaders;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: WeatherDataDeleteJobOutput;
}

export interface WeatherGetDataDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get weather data delete job. */
export interface WeatherGetDataDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherGetDataDeleteJobDetailsDefaultHeaders;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataDeleteJobOutput;
}

export interface WeatherCreateDataDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a weather data delete job. */
export interface WeatherCreateDataDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherCreateDataDeleteJobDefaultHeaders;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetails200Response extends HttpResponse {
  status: "200";
  body: WeatherDataIngestionJobOutput;
}

export interface WeatherGetDataIngestionJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get weather ingestion job. */
export interface WeatherGetDataIngestionJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherGetDataIngestionJobDetailsDefaultHeaders;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJob202Response extends HttpResponse {
  status: "202";
  body: WeatherDataIngestionJobOutput;
}

export interface WeatherCreateDataIngestionJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a weather data ingestion job. */
export interface WeatherCreateDataIngestionJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherCreateDataIngestionJobDefaultHeaders;
}

export interface WeatherDataGet200Headers {
  /** Indicate whether the request was cache hit or cache miss. */
  "x-ms-cache-hit"?: boolean;
  /** Time taken in milliseconds for processing the request at server side. */
  "x-ms-response-latency-in-milliseconds"?: number;
}

/** Returns a list of WeatherData. */
export interface WeatherDataGet200Response extends HttpResponse {
  status: "200";
  body: WeatherDataProviderResponseOutput;
  headers: RawHttpHeaders & WeatherDataGet200Headers;
}

export interface WeatherDataGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a list of WeatherData. */
export interface WeatherDataGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & WeatherDataGetDefaultHeaders;
}

/** Returns a paginated list of zone resources under a particular party. */
export interface ZonesListByPartyId200Response extends HttpResponse {
  status: "200";
  body: ZoneListResponseOutput;
}

export interface ZonesListByPartyIdDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of zone resources under a particular party. */
export interface ZonesListByPartyIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesListByPartyIdDefaultHeaders;
}

/** Gets a specified zone resource under a particular party. */
export interface ZonesGet200Response extends HttpResponse {
  status: "200";
  body: ZoneOutput;
}

export interface ZonesGetDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Gets a specified zone resource under a particular party. */
export interface ZonesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesGetDefaultHeaders;
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

export interface ZonesCreateOrUpdateDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Creates or updates a Zone resource. */
export interface ZonesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesCreateOrUpdateDefaultHeaders;
}

/** Deletes a specified zone resource under a particular party. */
export interface ZonesDelete204Response extends HttpResponse {
  status: "204";
}

export interface ZonesDeleteDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Deletes a specified zone resource under a particular party. */
export interface ZonesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesDeleteDefaultHeaders;
}

/** Returns a paginated list of zone resources across all parties. */
export interface ZonesList200Response extends HttpResponse {
  status: "200";
  body: ZoneListResponseOutput;
}

export interface ZonesListDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Returns a paginated list of zone resources across all parties. */
export interface ZonesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesListDefaultHeaders;
}

/** Get a cascade delete job for specified job id. */
export interface ZonesGetCascadeDeleteJobDetails200Response extends HttpResponse {
  status: "200";
  body: CascadeDeleteJobOutput;
}

export interface ZonesGetCascadeDeleteJobDetailsDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Get a cascade delete job for specified job id. */
export interface ZonesGetCascadeDeleteJobDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesGetCascadeDeleteJobDetailsDefaultHeaders;
}

/** Create a cascade delete job for specified zone. */
export interface ZonesCreateCascadeDeleteJob202Response extends HttpResponse {
  status: "202";
  body: CascadeDeleteJobOutput;
}

export interface ZonesCreateCascadeDeleteJobDefaultHeaders {
  "x-ms-error-code"?: string;
}

/** Create a cascade delete job for specified zone. */
export interface ZonesCreateCascadeDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ZonesCreateCascadeDeleteJobDefaultHeaders;
}
