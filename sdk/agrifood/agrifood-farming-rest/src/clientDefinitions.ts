// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ApplicationDataListParameters,
  ApplicationDataCreateCascadeDeleteJobParameters,
  ApplicationDataGetCascadeDeleteJobDetailsParameters,
  ApplicationDataListByFarmerIdParameters,
  ApplicationDataGetParameters,
  ApplicationDataCreateOrUpdateParameters,
  ApplicationDataDeleteParameters,
  AttachmentsListByFarmerIdParameters,
  AttachmentsGetParameters,
  AttachmentsCreateOrUpdateParameters,
  AttachmentsDeleteParameters,
  AttachmentsDownloadParameters,
  BoundariesListParameters,
  BoundariesSearchParameters,
  BoundariesCreateCascadeDeleteJobParameters,
  BoundariesGetCascadeDeleteJobDetailsParameters,
  BoundariesListByFarmerIdParameters,
  BoundariesSearchByFarmerIdParameters,
  BoundariesCreateOrUpdateParameters,
  BoundariesGetParameters,
  BoundariesDeleteParameters,
  BoundariesGetOverlapParameters,
  CropsListParameters,
  CropsGetParameters,
  CropsCreateOrUpdateParameters,
  CropsDeleteParameters,
  CropVarietiesListParameters,
  CropVarietiesGetParameters,
  CropVarietiesCreateOrUpdateParameters,
  CropVarietiesDeleteParameters,
  DeviceDataModelsListParameters,
  DeviceDataModelsCreateOrUpdateParameters,
  DeviceDataModelsGetParameters,
  DeviceDataModelsDeleteParameters,
  DevicesListParameters,
  DevicesCreateOrUpdateParameters,
  DevicesGetParameters,
  DevicesDeleteParameters,
  FarmersListParameters,
  FarmersGetParameters,
  FarmersCreateOrUpdateParameters,
  FarmersDeleteParameters,
  FarmersCreateCascadeDeleteJobParameters,
  FarmersGetCascadeDeleteJobDetailsParameters,
  FarmOperationsCreateDataIngestionJobParameters,
  FarmOperationsGetDataIngestionJobDetailsParameters,
  FarmsListByFarmerIdParameters,
  FarmsGetParameters,
  FarmsCreateOrUpdateParameters,
  FarmsDeleteParameters,
  FarmsListParameters,
  FarmsCreateCascadeDeleteJobParameters,
  FarmsGetCascadeDeleteJobDetailsParameters,
  FieldsListByFarmerIdParameters,
  FieldsGetParameters,
  FieldsCreateOrUpdateParameters,
  FieldsDeleteParameters,
  FieldsListParameters,
  FieldsCreateCascadeDeleteJobParameters,
  FieldsGetCascadeDeleteJobDetailsParameters,
  HarvestDataListByFarmerIdParameters,
  HarvestDataGetParameters,
  HarvestDataCreateOrUpdateParameters,
  HarvestDataDeleteParameters,
  HarvestDataListParameters,
  HarvestDataCreateCascadeDeleteJobParameters,
  HarvestDataGetCascadeDeleteJobDetailsParameters,
  ImageProcessingCreateRasterizeJobParameters,
  ImageProcessingGetRasterizeJobParameters,
  InsightAttachmentsListByFarmerIdModelIdAndResourceParameters,
  InsightAttachmentsCreateOrUpdateParameters,
  InsightAttachmentsGetParameters,
  InsightAttachmentsDeleteParameters,
  InsightAttachmentsDownloadParameters,
  InsightsListByFarmerIdModelIdAndResourceParameters,
  InsightsCreateOrUpdateParameters,
  InsightsGetParameters,
  InsightsDeleteParameters,
  InsightsCreateCascadeDeleteJobParameters,
  InsightsGetCascadeDeleteJobDetailsParameters,
  ManagementZonesListByFarmerIdParameters,
  ManagementZonesGetParameters,
  ManagementZonesCreateOrUpdateParameters,
  ManagementZonesDeleteParameters,
  ManagementZonesListParameters,
  ManagementZonesGetCascadeDeleteJobDetailsParameters,
  ManagementZonesCreateCascadeDeleteJobParameters,
  ModelInferenceCreateBiomassModelJobParameters,
  ModelInferenceGetBiomassModelJobParameters,
  ModelInferenceCreateSoilMoistureModelJobParameters,
  ModelInferenceGetSoilMoistureModelJobParameters,
  NutrientAnalysesListByFarmerIdParameters,
  NutrientAnalysesGetParameters,
  NutrientAnalysesCreateOrUpdateParameters,
  NutrientAnalysesDeleteParameters,
  NutrientAnalysesListParameters,
  OAuthProvidersListParameters,
  OAuthProvidersGetParameters,
  OAuthProvidersCreateOrUpdateParameters,
  OAuthProvidersDeleteParameters,
  OAuthProvidersGetCascadeDeleteJobDetailsParameters,
  OAuthProvidersCreateCascadeDeleteJobParameters,
  OAuthTokensListParameters,
  OAuthTokensGetOAuthConnectionLinkParameters,
  OAuthTokensCreateCascadeDeleteJobParameters,
  OAuthTokensGetCascadeDeleteJobDetailsParameters,
  PlantingDataListByFarmerIdParameters,
  PlantingDataGetParameters,
  PlantingDataCreateOrUpdateParameters,
  PlantingDataDeleteParameters,
  PlantingDataListParameters,
  PlantingDataCreateCascadeDeleteJobParameters,
  PlantingDataGetCascadeDeleteJobDetailsParameters,
  PlantTissueAnalysesListByFarmerIdParameters,
  PlantTissueAnalysesGetParameters,
  PlantTissueAnalysesCreateOrUpdateParameters,
  PlantTissueAnalysesDeleteParameters,
  PlantTissueAnalysesListParameters,
  PlantTissueAnalysesCreateCascadeDeleteJobParameters,
  PlantTissueAnalysesGetCascadeDeleteJobDetailsParameters,
  PrescriptionMapsListByFarmerIdParameters,
  PrescriptionMapsGetParameters,
  PrescriptionMapsCreateOrUpdateParameters,
  PrescriptionMapsDeleteParameters,
  PrescriptionMapsListParameters,
  PrescriptionMapsGetCascadeDeleteJobDetailsParameters,
  PrescriptionMapsCreateCascadeDeleteJobParameters,
  PrescriptionsListByFarmerIdParameters,
  PrescriptionsGetParameters,
  PrescriptionsCreateOrUpdateParameters,
  PrescriptionsDeleteParameters,
  PrescriptionsListParameters,
  PrescriptionsGetCascadeDeleteJobDetailsParameters,
  PrescriptionsCreateCascadeDeleteJobParameters,
  ScenesListParameters,
  ScenesDownloadParameters,
  ScenesCreateSatelliteDataIngestionJobParameters,
  ScenesGetSatelliteDataIngestionJobDetailsParameters,
  SeasonalFieldsListByFarmerIdParameters,
  SeasonalFieldsGetParameters,
  SeasonalFieldsCreateOrUpdateParameters,
  SeasonalFieldsDeleteParameters,
  SeasonalFieldsListParameters,
  SeasonalFieldsCreateCascadeDeleteJobParameters,
  SeasonalFieldsGetCascadeDeleteJobDetailsParameters,
  SeasonsListParameters,
  SeasonsGetParameters,
  SeasonsCreateOrUpdateParameters,
  SeasonsDeleteParameters,
  SensorDataModelsListParameters,
  SensorDataModelsCreateOrUpdateParameters,
  SensorDataModelsGetParameters,
  SensorDataModelsDeleteParameters,
  SensorEventsListParameters,
  SensorMappingsListParameters,
  SensorMappingsCreateOrUpdateParameters,
  SensorMappingsGetParameters,
  SensorMappingsDeleteParameters,
  SensorPartnerIntegrationsListParameters,
  SensorPartnerIntegrationsCreateOrUpdateParameters,
  SensorPartnerIntegrationsGetParameters,
  SensorPartnerIntegrationsDeleteParameters,
  SensorPartnerIntegrationsCheckConsentParameters,
  SensorPartnerIntegrationsGenerateConsentLinkParameters,
  SensorsListParameters,
  SensorsCreateOrUpdateParameters,
  SensorsGetParameters,
  SensorsDeleteParameters,
  SensorsGetConnectionStringParameters,
  SensorsRenewConnectionStringParameters,
  SolutionInferenceCancelParameters,
  SolutionInferenceCreateOrUpdateParameters,
  SolutionInferenceFetchParameters,
  TillageDataListByFarmerIdParameters,
  TillageDataGetParameters,
  TillageDataCreateOrUpdateParameters,
  TillageDataDeleteParameters,
  TillageDataListParameters,
  TillageDataCreateCascadeDeleteJobParameters,
  TillageDataGetCascadeDeleteJobDetailsParameters,
  WeatherListParameters,
  WeatherGetDataDeleteJobDetailsParameters,
  WeatherCreateDataDeleteJobParameters,
  WeatherGetDataIngestionJobDetailsParameters,
  WeatherCreateDataIngestionJobParameters,
  ZonesListByFarmerIdParameters,
  ZonesGetParameters,
  ZonesCreateOrUpdateParameters,
  ZonesDeleteParameters,
  ZonesListParameters,
  ZonesGetCascadeDeleteJobDetailsParameters,
  ZonesCreateCascadeDeleteJobParameters
} from "./parameters";
import {
  ApplicationDataList200Response,
  ApplicationDataListdefaultResponse,
  ApplicationDataCreateCascadeDeleteJob202Response,
  ApplicationDataCreateCascadeDeleteJobdefaultResponse,
  ApplicationDataGetCascadeDeleteJobDetails200Response,
  ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse,
  ApplicationDataListByFarmerId200Response,
  ApplicationDataListByFarmerIddefaultResponse,
  ApplicationDataGet200Response,
  ApplicationDataGetdefaultResponse,
  ApplicationDataCreateOrUpdate200Response,
  ApplicationDataCreateOrUpdate201Response,
  ApplicationDataCreateOrUpdatedefaultResponse,
  ApplicationDataDelete204Response,
  ApplicationDataDeletedefaultResponse,
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
  BoundariesList200Response,
  BoundariesListdefaultResponse,
  BoundariesSearch200Response,
  BoundariesSearchdefaultResponse,
  BoundariesCreateCascadeDeleteJob202Response,
  BoundariesCreateCascadeDeleteJobdefaultResponse,
  BoundariesGetCascadeDeleteJobDetails200Response,
  BoundariesGetCascadeDeleteJobDetailsdefaultResponse,
  BoundariesListByFarmerId200Response,
  BoundariesListByFarmerIddefaultResponse,
  BoundariesSearchByFarmerId200Response,
  BoundariesSearchByFarmerIddefaultResponse,
  BoundariesCreateOrUpdate200Response,
  BoundariesCreateOrUpdate201Response,
  BoundariesCreateOrUpdatedefaultResponse,
  BoundariesGet200Response,
  BoundariesGetdefaultResponse,
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
  CropVarietiesList200Response,
  CropVarietiesListdefaultResponse,
  CropVarietiesGet200Response,
  CropVarietiesGetdefaultResponse,
  CropVarietiesCreateOrUpdate200Response,
  CropVarietiesCreateOrUpdate201Response,
  CropVarietiesCreateOrUpdatedefaultResponse,
  CropVarietiesDelete204Response,
  CropVarietiesDeletedefaultResponse,
  DeviceDataModelsList200Response,
  DeviceDataModelsListdefaultResponse,
  DeviceDataModelsCreateOrUpdate200Response,
  DeviceDataModelsCreateOrUpdate201Response,
  DeviceDataModelsCreateOrUpdatedefaultResponse,
  DeviceDataModelsGet200Response,
  DeviceDataModelsGetdefaultResponse,
  DeviceDataModelsDelete204Response,
  DeviceDataModelsDeletedefaultResponse,
  DevicesList200Response,
  DevicesListdefaultResponse,
  DevicesCreateOrUpdate200Response,
  DevicesCreateOrUpdate201Response,
  DevicesCreateOrUpdatedefaultResponse,
  DevicesGet200Response,
  DevicesGetdefaultResponse,
  DevicesDelete204Response,
  DevicesDeletedefaultResponse,
  FarmersList200Response,
  FarmersListdefaultResponse,
  FarmersGet200Response,
  FarmersGetdefaultResponse,
  FarmersCreateOrUpdate200Response,
  FarmersCreateOrUpdate201Response,
  FarmersCreateOrUpdatedefaultResponse,
  FarmersDelete204Response,
  FarmersDeletedefaultResponse,
  FarmersCreateCascadeDeleteJob202Response,
  FarmersCreateCascadeDeleteJobdefaultResponse,
  FarmersGetCascadeDeleteJobDetails200Response,
  FarmersGetCascadeDeleteJobDetailsdefaultResponse,
  FarmOperationsCreateDataIngestionJob202Response,
  FarmOperationsCreateDataIngestionJobdefaultResponse,
  FarmOperationsGetDataIngestionJobDetails200Response,
  FarmOperationsGetDataIngestionJobDetailsdefaultResponse,
  FarmsListByFarmerId200Response,
  FarmsListByFarmerIddefaultResponse,
  FarmsGet200Response,
  FarmsGetdefaultResponse,
  FarmsCreateOrUpdate200Response,
  FarmsCreateOrUpdate201Response,
  FarmsCreateOrUpdatedefaultResponse,
  FarmsDelete204Response,
  FarmsDeletedefaultResponse,
  FarmsList200Response,
  FarmsListdefaultResponse,
  FarmsCreateCascadeDeleteJob202Response,
  FarmsCreateCascadeDeleteJobdefaultResponse,
  FarmsGetCascadeDeleteJobDetails200Response,
  FarmsGetCascadeDeleteJobDetailsdefaultResponse,
  FieldsListByFarmerId200Response,
  FieldsListByFarmerIddefaultResponse,
  FieldsGet200Response,
  FieldsGetdefaultResponse,
  FieldsCreateOrUpdate200Response,
  FieldsCreateOrUpdate201Response,
  FieldsCreateOrUpdatedefaultResponse,
  FieldsDelete204Response,
  FieldsDeletedefaultResponse,
  FieldsList200Response,
  FieldsListdefaultResponse,
  FieldsCreateCascadeDeleteJob202Response,
  FieldsCreateCascadeDeleteJobdefaultResponse,
  FieldsGetCascadeDeleteJobDetails200Response,
  FieldsGetCascadeDeleteJobDetailsdefaultResponse,
  HarvestDataListByFarmerId200Response,
  HarvestDataListByFarmerIddefaultResponse,
  HarvestDataGet200Response,
  HarvestDataGetdefaultResponse,
  HarvestDataCreateOrUpdate200Response,
  HarvestDataCreateOrUpdate201Response,
  HarvestDataCreateOrUpdatedefaultResponse,
  HarvestDataDelete204Response,
  HarvestDataDeletedefaultResponse,
  HarvestDataList200Response,
  HarvestDataListdefaultResponse,
  HarvestDataCreateCascadeDeleteJob202Response,
  HarvestDataCreateCascadeDeleteJobdefaultResponse,
  HarvestDataGetCascadeDeleteJobDetails200Response,
  HarvestDataGetCascadeDeleteJobDetailsdefaultResponse,
  ImageProcessingCreateRasterizeJob202Response,
  ImageProcessingCreateRasterizeJobdefaultResponse,
  ImageProcessingGetRasterizeJob200Response,
  InsightAttachmentsListByFarmerIdModelIdAndResource200Response,
  InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultResponse,
  InsightAttachmentsCreateOrUpdate200Response,
  InsightAttachmentsCreateOrUpdate201Response,
  InsightAttachmentsCreateOrUpdatedefaultResponse,
  InsightAttachmentsGet200Response,
  InsightAttachmentsGetdefaultResponse,
  InsightAttachmentsDelete204Response,
  InsightAttachmentsDeletedefaultResponse,
  InsightAttachmentsDownload200Response,
  InsightAttachmentsDownloaddefaultResponse,
  InsightsListByFarmerIdModelIdAndResource200Response,
  InsightsListByFarmerIdModelIdAndResourcedefaultResponse,
  InsightsCreateOrUpdate200Response,
  InsightsCreateOrUpdate201Response,
  InsightsCreateOrUpdatedefaultResponse,
  InsightsGet200Response,
  InsightsGetdefaultResponse,
  InsightsDelete204Response,
  InsightsDeletedefaultResponse,
  InsightsCreateCascadeDeleteJob202Response,
  InsightsCreateCascadeDeleteJobdefaultResponse,
  InsightsGetCascadeDeleteJobDetails200Response,
  InsightsGetCascadeDeleteJobDetailsdefaultResponse,
  ManagementZonesListByFarmerId200Response,
  ManagementZonesListByFarmerIddefaultResponse,
  ManagementZonesGet200Response,
  ManagementZonesGetdefaultResponse,
  ManagementZonesCreateOrUpdate200Response,
  ManagementZonesCreateOrUpdate201Response,
  ManagementZonesCreateOrUpdatedefaultResponse,
  ManagementZonesDelete204Response,
  ManagementZonesDeletedefaultResponse,
  ManagementZonesList200Response,
  ManagementZonesListdefaultResponse,
  ManagementZonesGetCascadeDeleteJobDetails200Response,
  ManagementZonesGetCascadeDeleteJobDetailsdefaultResponse,
  ManagementZonesCreateCascadeDeleteJob202Response,
  ManagementZonesCreateCascadeDeleteJobdefaultResponse,
  ModelInferenceCreateBiomassModelJob202Response,
  ModelInferenceCreateBiomassModelJobdefaultResponse,
  ModelInferenceGetBiomassModelJob200Response,
  ModelInferenceGetBiomassModelJobdefaultResponse,
  ModelInferenceCreateSoilMoistureModelJob202Response,
  ModelInferenceCreateSoilMoistureModelJobdefaultResponse,
  ModelInferenceGetSoilMoistureModelJob200Response,
  ModelInferenceGetSoilMoistureModelJobdefaultResponse,
  NutrientAnalysesListByFarmerId200Response,
  NutrientAnalysesListByFarmerIddefaultResponse,
  NutrientAnalysesGet200Response,
  NutrientAnalysesGetdefaultResponse,
  NutrientAnalysesCreateOrUpdate200Response,
  NutrientAnalysesCreateOrUpdate201Response,
  NutrientAnalysesCreateOrUpdatedefaultResponse,
  NutrientAnalysesDelete204Response,
  NutrientAnalysesDeletedefaultResponse,
  NutrientAnalysesList200Response,
  NutrientAnalysesListdefaultResponse,
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
  OAuthTokensCreateCascadeDeleteJob202Response,
  OAuthTokensCreateCascadeDeleteJobdefaultResponse,
  OAuthTokensGetCascadeDeleteJobDetails200Response,
  OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse,
  PlantingDataListByFarmerId200Response,
  PlantingDataListByFarmerIddefaultResponse,
  PlantingDataGet200Response,
  PlantingDataGetdefaultResponse,
  PlantingDataCreateOrUpdate200Response,
  PlantingDataCreateOrUpdate201Response,
  PlantingDataCreateOrUpdatedefaultResponse,
  PlantingDataDelete204Response,
  PlantingDataDeletedefaultResponse,
  PlantingDataList200Response,
  PlantingDataListdefaultResponse,
  PlantingDataCreateCascadeDeleteJob202Response,
  PlantingDataCreateCascadeDeleteJobdefaultResponse,
  PlantingDataGetCascadeDeleteJobDetails200Response,
  PlantingDataGetCascadeDeleteJobDetailsdefaultResponse,
  PlantTissueAnalysesListByFarmerId200Response,
  PlantTissueAnalysesListByFarmerIddefaultResponse,
  PlantTissueAnalysesGet200Response,
  PlantTissueAnalysesGetdefaultResponse,
  PlantTissueAnalysesCreateOrUpdate200Response,
  PlantTissueAnalysesCreateOrUpdate201Response,
  PlantTissueAnalysesCreateOrUpdatedefaultResponse,
  PlantTissueAnalysesDelete204Response,
  PlantTissueAnalysesDeletedefaultResponse,
  PlantTissueAnalysesList200Response,
  PlantTissueAnalysesListdefaultResponse,
  PlantTissueAnalysesCreateCascadeDeleteJob202Response,
  PlantTissueAnalysesCreateCascadeDeleteJobdefaultResponse,
  PlantTissueAnalysesGetCascadeDeleteJobDetails200Response,
  PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultResponse,
  PrescriptionMapsListByFarmerId200Response,
  PrescriptionMapsListByFarmerIddefaultResponse,
  PrescriptionMapsGet200Response,
  PrescriptionMapsGetdefaultResponse,
  PrescriptionMapsCreateOrUpdate200Response,
  PrescriptionMapsCreateOrUpdate201Response,
  PrescriptionMapsCreateOrUpdatedefaultResponse,
  PrescriptionMapsDelete204Response,
  PrescriptionMapsDeletedefaultResponse,
  PrescriptionMapsList200Response,
  PrescriptionMapsListdefaultResponse,
  PrescriptionMapsGetCascadeDeleteJobDetails200Response,
  PrescriptionMapsGetCascadeDeleteJobDetailsdefaultResponse,
  PrescriptionMapsCreateCascadeDeleteJob202Response,
  PrescriptionMapsCreateCascadeDeleteJobdefaultResponse,
  PrescriptionsListByFarmerId200Response,
  PrescriptionsListByFarmerIddefaultResponse,
  PrescriptionsGet200Response,
  PrescriptionsGetdefaultResponse,
  PrescriptionsCreateOrUpdate200Response,
  PrescriptionsCreateOrUpdate201Response,
  PrescriptionsCreateOrUpdatedefaultResponse,
  PrescriptionsDelete204Response,
  PrescriptionsDeletedefaultResponse,
  PrescriptionsList200Response,
  PrescriptionsListdefaultResponse,
  PrescriptionsGetCascadeDeleteJobDetails200Response,
  PrescriptionsGetCascadeDeleteJobDetailsdefaultResponse,
  PrescriptionsCreateCascadeDeleteJob202Response,
  PrescriptionsCreateCascadeDeleteJobdefaultResponse,
  ScenesList200Response,
  ScenesListdefaultResponse,
  ScenesDownload200Response,
  ScenesDownloaddefaultResponse,
  ScenesCreateSatelliteDataIngestionJob202Response,
  ScenesCreateSatelliteDataIngestionJobdefaultResponse,
  ScenesGetSatelliteDataIngestionJobDetails200Response,
  ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse,
  SeasonalFieldsListByFarmerId200Response,
  SeasonalFieldsListByFarmerIddefaultResponse,
  SeasonalFieldsGet200Response,
  SeasonalFieldsGetdefaultResponse,
  SeasonalFieldsCreateOrUpdate200Response,
  SeasonalFieldsCreateOrUpdate201Response,
  SeasonalFieldsCreateOrUpdatedefaultResponse,
  SeasonalFieldsDelete204Response,
  SeasonalFieldsDeletedefaultResponse,
  SeasonalFieldsList200Response,
  SeasonalFieldsListdefaultResponse,
  SeasonalFieldsCreateCascadeDeleteJob202Response,
  SeasonalFieldsCreateCascadeDeleteJobdefaultResponse,
  SeasonalFieldsGetCascadeDeleteJobDetails200Response,
  SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse,
  SeasonsList200Response,
  SeasonsListdefaultResponse,
  SeasonsGet200Response,
  SeasonsGetdefaultResponse,
  SeasonsCreateOrUpdate200Response,
  SeasonsCreateOrUpdate201Response,
  SeasonsCreateOrUpdatedefaultResponse,
  SeasonsDelete204Response,
  SeasonsDeletedefaultResponse,
  SensorDataModelsList200Response,
  SensorDataModelsListdefaultResponse,
  SensorDataModelsCreateOrUpdate200Response,
  SensorDataModelsCreateOrUpdate201Response,
  SensorDataModelsCreateOrUpdatedefaultResponse,
  SensorDataModelsGet200Response,
  SensorDataModelsGetdefaultResponse,
  SensorDataModelsDelete204Response,
  SensorDataModelsDeletedefaultResponse,
  SensorEventsList200Response,
  SensorEventsListdefaultResponse,
  SensorMappingsList200Response,
  SensorMappingsListdefaultResponse,
  SensorMappingsCreateOrUpdate200Response,
  SensorMappingsCreateOrUpdate201Response,
  SensorMappingsCreateOrUpdatedefaultResponse,
  SensorMappingsGet200Response,
  SensorMappingsGetdefaultResponse,
  SensorMappingsDelete204Response,
  SensorMappingsDeletedefaultResponse,
  SensorPartnerIntegrationsList200Response,
  SensorPartnerIntegrationsListdefaultResponse,
  SensorPartnerIntegrationsCreateOrUpdate200Response,
  SensorPartnerIntegrationsCreateOrUpdate201Response,
  SensorPartnerIntegrationsCreateOrUpdatedefaultResponse,
  SensorPartnerIntegrationsGet200Response,
  SensorPartnerIntegrationsGetdefaultResponse,
  SensorPartnerIntegrationsDelete204Response,
  SensorPartnerIntegrationsDeletedefaultResponse,
  SensorPartnerIntegrationsCheckConsent200Response,
  SensorPartnerIntegrationsCheckConsentdefaultResponse,
  SensorPartnerIntegrationsGenerateConsentLink200Response,
  SensorPartnerIntegrationsGenerateConsentLinkdefaultResponse,
  SensorsList200Response,
  SensorsListdefaultResponse,
  SensorsCreateOrUpdate200Response,
  SensorsCreateOrUpdate201Response,
  SensorsCreateOrUpdatedefaultResponse,
  SensorsGet200Response,
  SensorsGetdefaultResponse,
  SensorsDelete204Response,
  SensorsDeletedefaultResponse,
  SensorsGetConnectionString200Response,
  SensorsGetConnectionStringdefaultResponse,
  SensorsRenewConnectionString200Response,
  SensorsRenewConnectionStringdefaultResponse,
  SolutionInferenceCancel200Response,
  SolutionInferenceCanceldefaultResponse,
  SolutionInferenceCreateOrUpdate202Response,
  SolutionInferenceCreateOrUpdatedefaultResponse,
  SolutionInferenceFetch200Response,
  SolutionInferenceFetchdefaultResponse,
  TillageDataListByFarmerId200Response,
  TillageDataListByFarmerIddefaultResponse,
  TillageDataGet200Response,
  TillageDataGetdefaultResponse,
  TillageDataCreateOrUpdate200Response,
  TillageDataCreateOrUpdate201Response,
  TillageDataCreateOrUpdatedefaultResponse,
  TillageDataDelete204Response,
  TillageDataDeletedefaultResponse,
  TillageDataList200Response,
  TillageDataListdefaultResponse,
  TillageDataCreateCascadeDeleteJob202Response,
  TillageDataCreateCascadeDeleteJobdefaultResponse,
  TillageDataGetCascadeDeleteJobDetails200Response,
  TillageDataGetCascadeDeleteJobDetailsdefaultResponse,
  WeatherList200Response,
  WeatherListdefaultResponse,
  WeatherGetDataDeleteJobDetails200Response,
  WeatherGetDataDeleteJobDetailsdefaultResponse,
  WeatherCreateDataDeleteJob202Response,
  WeatherCreateDataDeleteJobdefaultResponse,
  WeatherGetDataIngestionJobDetails200Response,
  WeatherGetDataIngestionJobDetailsdefaultResponse,
  WeatherCreateDataIngestionJob202Response,
  WeatherCreateDataIngestionJobdefaultResponse,
  ZonesListByFarmerId200Response,
  ZonesListByFarmerIddefaultResponse,
  ZonesGet200Response,
  ZonesGetdefaultResponse,
  ZonesCreateOrUpdate200Response,
  ZonesCreateOrUpdate201Response,
  ZonesCreateOrUpdatedefaultResponse,
  ZonesDelete204Response,
  ZonesDeletedefaultResponse,
  ZonesList200Response,
  ZonesListdefaultResponse,
  ZonesGetCascadeDeleteJobDetails200Response,
  ZonesGetCascadeDeleteJobDetailsdefaultResponse,
  ZonesCreateCascadeDeleteJob202Response,
  ZonesCreateCascadeDeleteJobdefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ApplicationDataList {
  /** Returns a paginated list of application data resources across all farmers. */
  get(
    options?: ApplicationDataListParameters
  ): StreamableMethod<
    ApplicationDataList200Response | ApplicationDataListdefaultResponse
  >;
}

export interface ApplicationDataCreateCascadeDeleteJob {
  /** Create cascade delete job for application data resource. */
  put(
    options: ApplicationDataCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | ApplicationDataCreateCascadeDeleteJob202Response
    | ApplicationDataCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get cascade delete job for application data resource. */
  get(
    options?: ApplicationDataGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | ApplicationDataGetCascadeDeleteJobDetails200Response
    | ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface ApplicationDataListByFarmerId {
  /** Returns a paginated list of application data resources under a particular farm. */
  get(
    options?: ApplicationDataListByFarmerIdParameters
  ): StreamableMethod<
    | ApplicationDataListByFarmerId200Response
    | ApplicationDataListByFarmerIddefaultResponse
  >;
}

export interface ApplicationDataGet {
  /** Get a specified application data resource under a particular farmer. */
  get(
    options?: ApplicationDataGetParameters
  ): StreamableMethod<
    ApplicationDataGet200Response | ApplicationDataGetdefaultResponse
  >;
  /** Creates or updates an application data resource under a particular farmer. */
  patch(
    options: ApplicationDataCreateOrUpdateParameters
  ): StreamableMethod<
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified application data resource under a particular farmer. */
  delete(
    options?: ApplicationDataDeleteParameters
  ): StreamableMethod<
    ApplicationDataDelete204Response | ApplicationDataDeletedefaultResponse
  >;
}

export interface AttachmentsListByFarmerId {
  /** Returns a paginated list of attachment resources under a particular farmer. */
  get(
    options?: AttachmentsListByFarmerIdParameters
  ): StreamableMethod<
    | AttachmentsListByFarmerId200Response
    | AttachmentsListByFarmerIddefaultResponse
  >;
}

export interface AttachmentsGet {
  /** Gets a specified attachment resource under a particular farmer. */
  get(
    options?: AttachmentsGetParameters
  ): StreamableMethod<
    AttachmentsGet200Response | AttachmentsGetdefaultResponse
  >;
  /** Creates or updates an attachment resource under a particular farmer. */
  patch(
    options?: AttachmentsCreateOrUpdateParameters
  ): StreamableMethod<
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified attachment resource under a particular farmer. */
  delete(
    options?: AttachmentsDeleteParameters
  ): StreamableMethod<
    AttachmentsDelete204Response | AttachmentsDeletedefaultResponse
  >;
}

export interface AttachmentsDownload {
  /** Downloads and returns attachment as response for the given input filePath. */
  get(
    options?: AttachmentsDownloadParameters
  ): StreamableMethod<
    AttachmentsDownload200Response | AttachmentsDownloaddefaultResponse
  >;
}

export interface BoundariesList {
  /** Returns a paginated list of boundary resources across all farmers. */
  get(
    options?: BoundariesListParameters
  ): StreamableMethod<
    BoundariesList200Response | BoundariesListdefaultResponse
  >;
  /** Search for boundaries across all farmers by fields and intersecting geometry. */
  post(
    options: BoundariesSearchParameters
  ): StreamableMethod<
    BoundariesSearch200Response | BoundariesSearchdefaultResponse
  >;
}

export interface BoundariesCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified boundary. */
  put(
    options: BoundariesCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | BoundariesCreateCascadeDeleteJob202Response
    | BoundariesCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get cascade delete job for specified boundary. */
  get(
    options?: BoundariesGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface BoundariesListByFarmerId {
  /** Returns a paginated list of boundary resources under a particular farmer. */
  get(
    options?: BoundariesListByFarmerIdParameters
  ): StreamableMethod<
    | BoundariesListByFarmerId200Response
    | BoundariesListByFarmerIddefaultResponse
  >;
  /** Search for boundaries by fields and intersecting geometry. */
  post(
    options: BoundariesSearchByFarmerIdParameters
  ): StreamableMethod<
    | BoundariesSearchByFarmerId200Response
    | BoundariesSearchByFarmerIddefaultResponse
  >;
}

export interface BoundariesCreateOrUpdate {
  /** Creates or updates a boundary resource. */
  patch(
    options: BoundariesCreateOrUpdateParameters
  ): StreamableMethod<
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdatedefaultResponse
  >;
  /** Gets a specified boundary resource under a particular farmer. */
  get(
    options?: BoundariesGetParameters
  ): StreamableMethod<BoundariesGet200Response | BoundariesGetdefaultResponse>;
  /** Deletes a specified boundary resource under a particular farmer. */
  delete(
    options?: BoundariesDeleteParameters
  ): StreamableMethod<
    BoundariesDelete204Response | BoundariesDeletedefaultResponse
  >;
}

export interface BoundariesGetOverlap {
  /** Returns overlapping acreage between two boundary Ids. */
  get(
    options: BoundariesGetOverlapParameters
  ): StreamableMethod<
    BoundariesGetOverlap200Response | BoundariesGetOverlapdefaultResponse
  >;
}

export interface CropsList {
  /** Returns a paginated list of crop resources. */
  get(
    options?: CropsListParameters
  ): StreamableMethod<CropsList200Response | CropsListdefaultResponse>;
}

export interface CropsGet {
  /** Gets a specified crop resource. */
  get(
    options?: CropsGetParameters
  ): StreamableMethod<CropsGet200Response | CropsGetdefaultResponse>;
  /** Creates or updates a crop resource. */
  patch(
    options: CropsCreateOrUpdateParameters
  ): StreamableMethod<
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdatedefaultResponse
  >;
  /** Deletes Crop for given crop id. */
  delete(
    options?: CropsDeleteParameters
  ): StreamableMethod<CropsDelete204Response | CropsDeletedefaultResponse>;
}

export interface CropVarietiesList {
  /** Returns a paginated list of crop variety resources. */
  get(
    options?: CropVarietiesListParameters
  ): StreamableMethod<
    CropVarietiesList200Response | CropVarietiesListdefaultResponse
  >;
}

export interface CropVarietiesGet {
  /** Gets a specified crop variety resource. */
  get(
    options?: CropVarietiesGetParameters
  ): StreamableMethod<
    CropVarietiesGet200Response | CropVarietiesGetdefaultResponse
  >;
  /** Creates or updates a crop variety resource. */
  patch(
    options: CropVarietiesCreateOrUpdateParameters
  ): StreamableMethod<
    | CropVarietiesCreateOrUpdate200Response
    | CropVarietiesCreateOrUpdate201Response
    | CropVarietiesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified crop variety resource. */
  delete(
    options?: CropVarietiesDeleteParameters
  ): StreamableMethod<
    CropVarietiesDelete204Response | CropVarietiesDeletedefaultResponse
  >;
}

export interface DeviceDataModelsList {
  /** Returns a paginated list of device data model resources. */
  get(
    options?: DeviceDataModelsListParameters
  ): StreamableMethod<
    DeviceDataModelsList200Response | DeviceDataModelsListdefaultResponse
  >;
}

export interface DeviceDataModelsCreateOrUpdate {
  /** Create a device data model entity. */
  patch(
    options: DeviceDataModelsCreateOrUpdateParameters
  ): StreamableMethod<
    | DeviceDataModelsCreateOrUpdate200Response
    | DeviceDataModelsCreateOrUpdate201Response
    | DeviceDataModelsCreateOrUpdatedefaultResponse
  >;
  /** Gets a device data model entity. */
  get(
    options?: DeviceDataModelsGetParameters
  ): StreamableMethod<
    DeviceDataModelsGet200Response | DeviceDataModelsGetdefaultResponse
  >;
  /** Deletes a device data model entity. */
  delete(
    options?: DeviceDataModelsDeleteParameters
  ): StreamableMethod<
    DeviceDataModelsDelete204Response | DeviceDataModelsDeletedefaultResponse
  >;
}

export interface DevicesList {
  /** Returns a paginated list of device resources. */
  get(
    options?: DevicesListParameters
  ): StreamableMethod<DevicesList200Response | DevicesListdefaultResponse>;
}

export interface DevicesCreateOrUpdate {
  /** Create a device entity. */
  patch(
    options: DevicesCreateOrUpdateParameters
  ): StreamableMethod<
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdatedefaultResponse
  >;
  /** Gets a device entity. */
  get(
    options?: DevicesGetParameters
  ): StreamableMethod<DevicesGet200Response | DevicesGetdefaultResponse>;
  /** Deletes a device entity. */
  delete(
    options?: DevicesDeleteParameters
  ): StreamableMethod<DevicesDelete204Response | DevicesDeletedefaultResponse>;
}

export interface FarmersList {
  /** Returns a paginated list of farmer resources. */
  get(
    options?: FarmersListParameters
  ): StreamableMethod<FarmersList200Response | FarmersListdefaultResponse>;
}

export interface FarmersGet {
  /** Gets a specified farmer resource. */
  get(
    options?: FarmersGetParameters
  ): StreamableMethod<FarmersGet200Response | FarmersGetdefaultResponse>;
  /** Creates or updates a farmer resource. */
  patch(
    options: FarmersCreateOrUpdateParameters
  ): StreamableMethod<
    | FarmersCreateOrUpdate200Response
    | FarmersCreateOrUpdate201Response
    | FarmersCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified farmer resource. */
  delete(
    options?: FarmersDeleteParameters
  ): StreamableMethod<FarmersDelete204Response | FarmersDeletedefaultResponse>;
}

export interface FarmersCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified farmer. */
  put(
    options: FarmersCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | FarmersCreateCascadeDeleteJob202Response
    | FarmersCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get a cascade delete job for specified farmer. */
  get(
    options?: FarmersGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | FarmersGetCascadeDeleteJobDetails200Response
    | FarmersGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface FarmOperationsCreateDataIngestionJob {
  /** Create a farm operation data ingestion job. */
  put(
    options: FarmOperationsCreateDataIngestionJobParameters
  ): StreamableMethod<
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobdefaultResponse
  >;
  /** Get a farm operation data ingestion job. */
  get(
    options?: FarmOperationsGetDataIngestionJobDetailsParameters
  ): StreamableMethod<
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsdefaultResponse
  >;
}

export interface FarmsListByFarmerId {
  /** Returns a paginated list of farm resources under a particular farmer. */
  get(
    options?: FarmsListByFarmerIdParameters
  ): StreamableMethod<
    FarmsListByFarmerId200Response | FarmsListByFarmerIddefaultResponse
  >;
}

export interface FarmsGet {
  /** Gets a specified farm resource under a particular farmer. */
  get(
    options?: FarmsGetParameters
  ): StreamableMethod<FarmsGet200Response | FarmsGetdefaultResponse>;
  /** Creates or updates a farm resource under a particular farmer. */
  patch(
    options: FarmsCreateOrUpdateParameters
  ): StreamableMethod<
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified farm resource under a particular farmer. */
  delete(
    options?: FarmsDeleteParameters
  ): StreamableMethod<FarmsDelete204Response | FarmsDeletedefaultResponse>;
}

export interface FarmsList {
  /** Returns a paginated list of farm resources across all farmers. */
  get(
    options?: FarmsListParameters
  ): StreamableMethod<FarmsList200Response | FarmsListdefaultResponse>;
}

export interface FarmsCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified farm. */
  put(
    options: FarmsCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | FarmsCreateCascadeDeleteJob202Response
    | FarmsCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get a cascade delete job for specified farm. */
  get(
    options?: FarmsGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | FarmsGetCascadeDeleteJobDetails200Response
    | FarmsGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface FieldsListByFarmerId {
  /** Returns a paginated list of field resources under a particular farmer. */
  get(
    options?: FieldsListByFarmerIdParameters
  ): StreamableMethod<
    FieldsListByFarmerId200Response | FieldsListByFarmerIddefaultResponse
  >;
}

export interface FieldsGet {
  /** Gets a specified field resource under a particular farmer. */
  get(
    options?: FieldsGetParameters
  ): StreamableMethod<FieldsGet200Response | FieldsGetdefaultResponse>;
  /** Creates or Updates a field resource under a particular farmer. */
  patch(
    options: FieldsCreateOrUpdateParameters
  ): StreamableMethod<
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified field resource under a particular farmer. */
  delete(
    options?: FieldsDeleteParameters
  ): StreamableMethod<FieldsDelete204Response | FieldsDeletedefaultResponse>;
}

export interface FieldsList {
  /** Returns a paginated list of field resources across all farmers. */
  get(
    options?: FieldsListParameters
  ): StreamableMethod<FieldsList200Response | FieldsListdefaultResponse>;
}

export interface FieldsCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified field. */
  put(
    options: FieldsCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | FieldsCreateCascadeDeleteJob202Response
    | FieldsCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get a cascade delete job for specified field. */
  get(
    options?: FieldsGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | FieldsGetCascadeDeleteJobDetails200Response
    | FieldsGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface HarvestDataListByFarmerId {
  /** Returns a paginated list of harvest data resources under a particular farm. */
  get(
    options?: HarvestDataListByFarmerIdParameters
  ): StreamableMethod<
    | HarvestDataListByFarmerId200Response
    | HarvestDataListByFarmerIddefaultResponse
  >;
}

export interface HarvestDataGet {
  /** Get a specified harvest data resource under a particular farmer. */
  get(
    options?: HarvestDataGetParameters
  ): StreamableMethod<
    HarvestDataGet200Response | HarvestDataGetdefaultResponse
  >;
  /** Creates or updates harvest data resource under a particular farmer. */
  patch(
    options: HarvestDataCreateOrUpdateParameters
  ): StreamableMethod<
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified harvest data resource under a particular farmer. */
  delete(
    options?: HarvestDataDeleteParameters
  ): StreamableMethod<
    HarvestDataDelete204Response | HarvestDataDeletedefaultResponse
  >;
}

export interface HarvestDataList {
  /** Returns a paginated list of harvest data resources across all farmers. */
  get(
    options?: HarvestDataListParameters
  ): StreamableMethod<
    HarvestDataList200Response | HarvestDataListdefaultResponse
  >;
}

export interface HarvestDataCreateCascadeDeleteJob {
  /** Create cascade delete job for harvest data resource. */
  put(
    options: HarvestDataCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | HarvestDataCreateCascadeDeleteJob202Response
    | HarvestDataCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get cascade delete job for harvest data resource. */
  get(
    options?: HarvestDataGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | HarvestDataGetCascadeDeleteJobDetails200Response
    | HarvestDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface ImageProcessingCreateRasterizeJob {
  /** Create a ImageProcessing Rasterize job. */
  put(
    options: ImageProcessingCreateRasterizeJobParameters
  ): StreamableMethod<
    | ImageProcessingCreateRasterizeJob202Response
    | ImageProcessingCreateRasterizeJobdefaultResponse
  >;
  /** Get ImageProcessing Rasterize job's details. */
  get(
    options?: ImageProcessingGetRasterizeJobParameters
  ): StreamableMethod<ImageProcessingGetRasterizeJob200Response>;
}

export interface InsightAttachmentsListByFarmerIdModelIdAndResource {
  /** Returns a paginated list of insight resources. */
  get(
    options?: InsightAttachmentsListByFarmerIdModelIdAndResourceParameters
  ): StreamableMethod<
    | InsightAttachmentsListByFarmerIdModelIdAndResource200Response
    | InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultResponse
  >;
}

export interface InsightAttachmentsCreateOrUpdate {
  /** Creates or updates insight entity. */
  patch(
    options: InsightAttachmentsCreateOrUpdateParameters
  ): StreamableMethod<
    | InsightAttachmentsCreateOrUpdate200Response
    | InsightAttachmentsCreateOrUpdate201Response
    | InsightAttachmentsCreateOrUpdatedefaultResponse
  >;
  /** Gets a specified insight resource under a particular farmer. */
  get(
    options?: InsightAttachmentsGetParameters
  ): StreamableMethod<
    InsightAttachmentsGet200Response | InsightAttachmentsGetdefaultResponse
  >;
  /** Deletes a specified insight resource. */
  delete(
    options?: InsightAttachmentsDeleteParameters
  ): StreamableMethod<
    | InsightAttachmentsDelete204Response
    | InsightAttachmentsDeletedefaultResponse
  >;
}

export interface InsightAttachmentsDownload {
  /** Downloads and returns insight-attachment as response for the given input filePath. */
  get(
    options?: InsightAttachmentsDownloadParameters
  ): StreamableMethod<
    | InsightAttachmentsDownload200Response
    | InsightAttachmentsDownloaddefaultResponse
  >;
}

export interface InsightsListByFarmerIdModelIdAndResource {
  /** Returns a paginated list of insight resources. */
  get(
    options?: InsightsListByFarmerIdModelIdAndResourceParameters
  ): StreamableMethod<
    | InsightsListByFarmerIdModelIdAndResource200Response
    | InsightsListByFarmerIdModelIdAndResourcedefaultResponse
  >;
}

export interface InsightsCreateOrUpdate {
  /** Creates or updates insight entity. */
  patch(
    options: InsightsCreateOrUpdateParameters
  ): StreamableMethod<
    | InsightsCreateOrUpdate200Response
    | InsightsCreateOrUpdate201Response
    | InsightsCreateOrUpdatedefaultResponse
  >;
  /** Gets a specified insight resource under a particular farmer. */
  get(
    options?: InsightsGetParameters
  ): StreamableMethod<InsightsGet200Response | InsightsGetdefaultResponse>;
  /** Deletes a specified insight resource. */
  delete(
    options?: InsightsDeleteParameters
  ): StreamableMethod<
    InsightsDelete204Response | InsightsDeletedefaultResponse
  >;
}

export interface InsightsCreateCascadeDeleteJob {
  /** Create a cascade delete job for insights specified farmerId/modelId/resourceType/resourceId. */
  put(
    options: InsightsCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | InsightsCreateCascadeDeleteJob202Response
    | InsightsCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get a cascade delete job for specified insight. */
  get(
    options?: InsightsGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | InsightsGetCascadeDeleteJobDetails200Response
    | InsightsGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface ManagementZonesListByFarmerId {
  /** Returns a paginated list of management zone resources under a particular farmer. */
  get(
    options?: ManagementZonesListByFarmerIdParameters
  ): StreamableMethod<
    | ManagementZonesListByFarmerId200Response
    | ManagementZonesListByFarmerIddefaultResponse
  >;
}

export interface ManagementZonesGet {
  /** Gets a specified management zone resource under a particular farmer. */
  get(
    options?: ManagementZonesGetParameters
  ): StreamableMethod<
    ManagementZonesGet200Response | ManagementZonesGetdefaultResponse
  >;
  /** Creates or updates a management zone resource. */
  patch(
    options: ManagementZonesCreateOrUpdateParameters
  ): StreamableMethod<
    | ManagementZonesCreateOrUpdate200Response
    | ManagementZonesCreateOrUpdate201Response
    | ManagementZonesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified management zone resource under a particular farmer. */
  delete(
    options?: ManagementZonesDeleteParameters
  ): StreamableMethod<
    ManagementZonesDelete204Response | ManagementZonesDeletedefaultResponse
  >;
}

export interface ManagementZonesList {
  /** Returns a paginated list of management zone resources across all farmers. */
  get(
    options?: ManagementZonesListParameters
  ): StreamableMethod<
    ManagementZonesList200Response | ManagementZonesListdefaultResponse
  >;
}

export interface ManagementZonesGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified job id. */
  get(
    options?: ManagementZonesGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | ManagementZonesGetCascadeDeleteJobDetails200Response
    | ManagementZonesGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified management zone. */
  put(
    options: ManagementZonesCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | ManagementZonesCreateCascadeDeleteJob202Response
    | ManagementZonesCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface ModelInferenceCreateBiomassModelJob {
  /** Create a Biomass Model job. */
  put(
    options: ModelInferenceCreateBiomassModelJobParameters
  ): StreamableMethod<
    | ModelInferenceCreateBiomassModelJob202Response
    | ModelInferenceCreateBiomassModelJobdefaultResponse
  >;
  /** Get Biomass Model job's details. */
  get(
    options?: ModelInferenceGetBiomassModelJobParameters
  ): StreamableMethod<
    | ModelInferenceGetBiomassModelJob200Response
    | ModelInferenceGetBiomassModelJobdefaultResponse
  >;
}

export interface ModelInferenceCreateSoilMoistureModelJob {
  /** Create a SoilMoisture Model job. */
  put(
    options: ModelInferenceCreateSoilMoistureModelJobParameters
  ): StreamableMethod<
    | ModelInferenceCreateSoilMoistureModelJob202Response
    | ModelInferenceCreateSoilMoistureModelJobdefaultResponse
  >;
  /** Get SoilMoisture Model job's details. */
  get(
    options?: ModelInferenceGetSoilMoistureModelJobParameters
  ): StreamableMethod<
    | ModelInferenceGetSoilMoistureModelJob200Response
    | ModelInferenceGetSoilMoistureModelJobdefaultResponse
  >;
}

export interface NutrientAnalysesListByFarmerId {
  /** Returns a paginated list of nutrient analysis resources under a particular farmer. */
  get(
    options?: NutrientAnalysesListByFarmerIdParameters
  ): StreamableMethod<
    | NutrientAnalysesListByFarmerId200Response
    | NutrientAnalysesListByFarmerIddefaultResponse
  >;
}

export interface NutrientAnalysesGet {
  /** Gets a specified nutrient analysis resource under a particular farmer. */
  get(
    options?: NutrientAnalysesGetParameters
  ): StreamableMethod<
    NutrientAnalysesGet200Response | NutrientAnalysesGetdefaultResponse
  >;
  /** Creates or updates a nutrient analysis resource. */
  patch(
    options: NutrientAnalysesCreateOrUpdateParameters
  ): StreamableMethod<
    | NutrientAnalysesCreateOrUpdate200Response
    | NutrientAnalysesCreateOrUpdate201Response
    | NutrientAnalysesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified nutrient analysis resource under a particular farmer. */
  delete(
    options?: NutrientAnalysesDeleteParameters
  ): StreamableMethod<
    NutrientAnalysesDelete204Response | NutrientAnalysesDeletedefaultResponse
  >;
}

export interface NutrientAnalysesList {
  /** Returns a paginated list of nutrient analysis resources across all farmers. */
  get(
    options?: NutrientAnalysesListParameters
  ): StreamableMethod<
    NutrientAnalysesList200Response | NutrientAnalysesListdefaultResponse
  >;
}

export interface OAuthProvidersList {
  /** Returns a paginated list of oauthProvider resources. */
  get(
    options?: OAuthProvidersListParameters
  ): StreamableMethod<
    OAuthProvidersList200Response | OAuthProvidersListdefaultResponse
  >;
}

export interface OAuthProvidersGet {
  /** Get a specified oauthProvider resource. */
  get(
    options?: OAuthProvidersGetParameters
  ): StreamableMethod<
    OAuthProvidersGet200Response | OAuthProvidersGetdefaultResponse
  >;
  /** Creates or updates an oauthProvider resource. */
  patch(
    options: OAuthProvidersCreateOrUpdateParameters
  ): StreamableMethod<
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdatedefaultResponse
  >;
  /** Deletes an specified oauthProvider resource. */
  delete(
    options?: OAuthProvidersDeleteParameters
  ): StreamableMethod<
    OAuthProvidersDelete204Response | OAuthProvidersDeletedefaultResponse
  >;
}

export interface OAuthProvidersGetCascadeDeleteJobDetails {
  /** Get cascade delete job for oauthProvider resource. */
  get(
    options?: OAuthProvidersGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | OAuthProvidersGetCascadeDeleteJobDetails200Response
    | OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create cascade delete job for oauthProvider resource. */
  put(
    options: OAuthProvidersCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | OAuthProvidersCreateCascadeDeleteJob202Response
    | OAuthProvidersCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface OAuthTokensList {
  /** Returns a list of OAuthToken documents. */
  get(
    options?: OAuthTokensListParameters
  ): StreamableMethod<
    OAuthTokensList200Response | OAuthTokensListdefaultResponse
  >;
}

export interface OAuthTokensGetOAuthConnectionLink {
  /** Returns Connection link needed in the OAuth flow. */
  post(
    options: OAuthTokensGetOAuthConnectionLinkParameters
  ): StreamableMethod<
    | OAuthTokensGetOAuthConnectionLink200Response
    | OAuthTokensGetOAuthConnectionLinkdefaultResponse
  >;
}

export interface OAuthTokensCreateCascadeDeleteJob {
  /** Create remove job for OAuth token. */
  put(
    options: OAuthTokensCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | OAuthTokensCreateCascadeDeleteJob202Response
    | OAuthTokensCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get remove job for OAuth token. */
  get(
    options?: OAuthTokensGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface PlantingDataListByFarmerId {
  /** Returns a paginated list of planting data resources under a particular farm. */
  get(
    options?: PlantingDataListByFarmerIdParameters
  ): StreamableMethod<
    | PlantingDataListByFarmerId200Response
    | PlantingDataListByFarmerIddefaultResponse
  >;
}

export interface PlantingDataGet {
  /** Get a specified planting data resource under a particular farmer. */
  get(
    options?: PlantingDataGetParameters
  ): StreamableMethod<
    PlantingDataGet200Response | PlantingDataGetdefaultResponse
  >;
  /** Creates or updates an planting data resource under a particular farmer. */
  patch(
    options: PlantingDataCreateOrUpdateParameters
  ): StreamableMethod<
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified planting data resource under a particular farmer. */
  delete(
    options?: PlantingDataDeleteParameters
  ): StreamableMethod<
    PlantingDataDelete204Response | PlantingDataDeletedefaultResponse
  >;
}

export interface PlantingDataList {
  /** Returns a paginated list of planting data resources across all farmers. */
  get(
    options?: PlantingDataListParameters
  ): StreamableMethod<
    PlantingDataList200Response | PlantingDataListdefaultResponse
  >;
}

export interface PlantingDataCreateCascadeDeleteJob {
  /** Create cascade delete job for planting data resource. */
  put(
    options: PlantingDataCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | PlantingDataCreateCascadeDeleteJob202Response
    | PlantingDataCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get cascade delete job for planting data resource. */
  get(
    options?: PlantingDataGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | PlantingDataGetCascadeDeleteJobDetails200Response
    | PlantingDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface PlantTissueAnalysesListByFarmerId {
  /** Returns a paginated list of plant tissue analysis resources under a particular farmer. */
  get(
    options?: PlantTissueAnalysesListByFarmerIdParameters
  ): StreamableMethod<
    | PlantTissueAnalysesListByFarmerId200Response
    | PlantTissueAnalysesListByFarmerIddefaultResponse
  >;
}

export interface PlantTissueAnalysesGet {
  /** Gets a specified plant tissue analysis resource under a particular farmer. */
  get(
    options?: PlantTissueAnalysesGetParameters
  ): StreamableMethod<
    PlantTissueAnalysesGet200Response | PlantTissueAnalysesGetdefaultResponse
  >;
  /** Creates or updates a plant tissue analysis resource. */
  patch(
    options: PlantTissueAnalysesCreateOrUpdateParameters
  ): StreamableMethod<
    | PlantTissueAnalysesCreateOrUpdate200Response
    | PlantTissueAnalysesCreateOrUpdate201Response
    | PlantTissueAnalysesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified plant tissue analysis resource under a particular farmer. */
  delete(
    options?: PlantTissueAnalysesDeleteParameters
  ): StreamableMethod<
    | PlantTissueAnalysesDelete204Response
    | PlantTissueAnalysesDeletedefaultResponse
  >;
}

export interface PlantTissueAnalysesList {
  /** Returns a paginated list of plant tissue analysis resources across all farmers. */
  get(
    options?: PlantTissueAnalysesListParameters
  ): StreamableMethod<
    PlantTissueAnalysesList200Response | PlantTissueAnalysesListdefaultResponse
  >;
}

export interface PlantTissueAnalysesCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified plant tissue analysis. */
  put(
    options: PlantTissueAnalysesCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | PlantTissueAnalysesCreateCascadeDeleteJob202Response
    | PlantTissueAnalysesCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get a cascade delete job for specified plant tissue analysis. */
  get(
    options?: PlantTissueAnalysesGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | PlantTissueAnalysesGetCascadeDeleteJobDetails200Response
    | PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface PrescriptionMapsListByFarmerId {
  /** Returns a paginated list of prescription map resources under a particular farmer. */
  get(
    options?: PrescriptionMapsListByFarmerIdParameters
  ): StreamableMethod<
    | PrescriptionMapsListByFarmerId200Response
    | PrescriptionMapsListByFarmerIddefaultResponse
  >;
}

export interface PrescriptionMapsGet {
  /** Gets a specified prescription map resource under a particular farmer. */
  get(
    options?: PrescriptionMapsGetParameters
  ): StreamableMethod<
    PrescriptionMapsGet200Response | PrescriptionMapsGetdefaultResponse
  >;
  /** Creates or Updates a prescription map resource under a particular farmer. */
  patch(
    options: PrescriptionMapsCreateOrUpdateParameters
  ): StreamableMethod<
    | PrescriptionMapsCreateOrUpdate200Response
    | PrescriptionMapsCreateOrUpdate201Response
    | PrescriptionMapsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified prescription map resource under a particular farmer. */
  delete(
    options?: PrescriptionMapsDeleteParameters
  ): StreamableMethod<
    PrescriptionMapsDelete204Response | PrescriptionMapsDeletedefaultResponse
  >;
}

export interface PrescriptionMapsList {
  /** Returns a paginated list of prescription map resources across all farmers. */
  get(
    options?: PrescriptionMapsListParameters
  ): StreamableMethod<
    PrescriptionMapsList200Response | PrescriptionMapsListdefaultResponse
  >;
}

export interface PrescriptionMapsGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified prescription map. */
  get(
    options?: PrescriptionMapsGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | PrescriptionMapsGetCascadeDeleteJobDetails200Response
    | PrescriptionMapsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified prescription map. */
  put(
    options: PrescriptionMapsCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | PrescriptionMapsCreateCascadeDeleteJob202Response
    | PrescriptionMapsCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface PrescriptionsListByFarmerId {
  /** Returns a paginated list of prescription resources under a particular farmer. */
  get(
    options?: PrescriptionsListByFarmerIdParameters
  ): StreamableMethod<
    | PrescriptionsListByFarmerId200Response
    | PrescriptionsListByFarmerIddefaultResponse
  >;
}

export interface PrescriptionsGet {
  /** Gets a specified prescription resource under a particular farmer. */
  get(
    options?: PrescriptionsGetParameters
  ): StreamableMethod<
    PrescriptionsGet200Response | PrescriptionsGetdefaultResponse
  >;
  /** Creates or Updates a prescription resource under a particular farmer. */
  patch(
    options: PrescriptionsCreateOrUpdateParameters
  ): StreamableMethod<
    | PrescriptionsCreateOrUpdate200Response
    | PrescriptionsCreateOrUpdate201Response
    | PrescriptionsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified prescription resource under a particular farmer. */
  delete(
    options?: PrescriptionsDeleteParameters
  ): StreamableMethod<
    PrescriptionsDelete204Response | PrescriptionsDeletedefaultResponse
  >;
}

export interface PrescriptionsList {
  /** Returns a paginated list of prescription resources across all farmers. */
  get(
    options?: PrescriptionsListParameters
  ): StreamableMethod<
    PrescriptionsList200Response | PrescriptionsListdefaultResponse
  >;
}

export interface PrescriptionsGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified prescription. */
  get(
    options?: PrescriptionsGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | PrescriptionsGetCascadeDeleteJobDetails200Response
    | PrescriptionsGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified prescription. */
  put(
    options: PrescriptionsCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | PrescriptionsCreateCascadeDeleteJob202Response
    | PrescriptionsCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface ScenesList {
  /** Returns a paginated list of scene resources. */
  get(
    options: ScenesListParameters
  ): StreamableMethod<ScenesList200Response | ScenesListdefaultResponse>;
}

export interface ScenesDownload {
  /** Downloads and returns file Stream as response for the given input filePath. */
  get(
    options: ScenesDownloadParameters
  ): StreamableMethod<
    ScenesDownload200Response | ScenesDownloaddefaultResponse
  >;
}

export interface ScenesCreateSatelliteDataIngestionJob {
  /** Create a satellite data ingestion job. */
  put(
    options: ScenesCreateSatelliteDataIngestionJobParameters
  ): StreamableMethod<
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobdefaultResponse
  >;
  /** Get a satellite data ingestion job. */
  get(
    options?: ScenesGetSatelliteDataIngestionJobDetailsParameters
  ): StreamableMethod<
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
  >;
}

export interface SeasonalFieldsListByFarmerId {
  /** Returns a paginated list of seasonal field resources under a particular farmer. */
  get(
    options?: SeasonalFieldsListByFarmerIdParameters
  ): StreamableMethod<
    | SeasonalFieldsListByFarmerId200Response
    | SeasonalFieldsListByFarmerIddefaultResponse
  >;
}

export interface SeasonalFieldsGet {
  /** Gets a specified seasonal field resource under a particular farmer. */
  get(
    options?: SeasonalFieldsGetParameters
  ): StreamableMethod<
    SeasonalFieldsGet200Response | SeasonalFieldsGetdefaultResponse
  >;
  /** Creates or Updates a seasonal field resource under a particular farmer. */
  patch(
    options: SeasonalFieldsCreateOrUpdateParameters
  ): StreamableMethod<
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified seasonal-field resource under a particular farmer. */
  delete(
    options?: SeasonalFieldsDeleteParameters
  ): StreamableMethod<
    SeasonalFieldsDelete204Response | SeasonalFieldsDeletedefaultResponse
  >;
}

export interface SeasonalFieldsList {
  /** Returns a paginated list of seasonal field resources across all farmers. */
  get(
    options?: SeasonalFieldsListParameters
  ): StreamableMethod<
    SeasonalFieldsList200Response | SeasonalFieldsListdefaultResponse
  >;
}

export interface SeasonalFieldsCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified seasonal field. */
  put(
    options: SeasonalFieldsCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get cascade delete job for specified seasonal field. */
  get(
    options?: SeasonalFieldsGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface SeasonsList {
  /** Returns a paginated list of season resources. */
  get(
    options?: SeasonsListParameters
  ): StreamableMethod<SeasonsList200Response | SeasonsListdefaultResponse>;
}

export interface SeasonsGet {
  /** Gets a specified season resource. */
  get(
    options?: SeasonsGetParameters
  ): StreamableMethod<SeasonsGet200Response | SeasonsGetdefaultResponse>;
  /** Creates or updates a season resource. */
  patch(
    options: SeasonsCreateOrUpdateParameters
  ): StreamableMethod<
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified season resource. */
  delete(
    options?: SeasonsDeleteParameters
  ): StreamableMethod<SeasonsDelete204Response | SeasonsDeletedefaultResponse>;
}

export interface SensorDataModelsList {
  /** Returns a paginated list of sensor data model resources. */
  get(
    options?: SensorDataModelsListParameters
  ): StreamableMethod<
    SensorDataModelsList200Response | SensorDataModelsListdefaultResponse
  >;
}

export interface SensorDataModelsCreateOrUpdate {
  /** Create a sensor data model entity. */
  patch(
    options: SensorDataModelsCreateOrUpdateParameters
  ): StreamableMethod<
    | SensorDataModelsCreateOrUpdate200Response
    | SensorDataModelsCreateOrUpdate201Response
    | SensorDataModelsCreateOrUpdatedefaultResponse
  >;
  /** Gets a sensor data model entity. */
  get(
    options?: SensorDataModelsGetParameters
  ): StreamableMethod<
    SensorDataModelsGet200Response | SensorDataModelsGetdefaultResponse
  >;
  /** Deletes a sensor data model entity. */
  delete(
    options?: SensorDataModelsDeleteParameters
  ): StreamableMethod<
    SensorDataModelsDelete204Response | SensorDataModelsDeletedefaultResponse
  >;
}

export interface SensorEventsList {
  /**
   * Returns a list of sensor events data. Time span for query is limited to 90 days at a time.
   * Returns last 90 days events when startDateTime and endDateTime are not provided.
   */
  get(
    options: SensorEventsListParameters
  ): StreamableMethod<
    SensorEventsList200Response | SensorEventsListdefaultResponse
  >;
}

export interface SensorMappingsList {
  /** Returns a paginated list of sensor mapping resources. */
  get(
    options?: SensorMappingsListParameters
  ): StreamableMethod<
    SensorMappingsList200Response | SensorMappingsListdefaultResponse
  >;
}

export interface SensorMappingsCreateOrUpdate {
  /** Create a sensor mapping entity. */
  patch(
    options: SensorMappingsCreateOrUpdateParameters
  ): StreamableMethod<
    | SensorMappingsCreateOrUpdate200Response
    | SensorMappingsCreateOrUpdate201Response
    | SensorMappingsCreateOrUpdatedefaultResponse
  >;
  /** Gets a sensor mapping entity. */
  get(
    options?: SensorMappingsGetParameters
  ): StreamableMethod<
    SensorMappingsGet200Response | SensorMappingsGetdefaultResponse
  >;
  /** Deletes a sensor mapping entity. */
  delete(
    options?: SensorMappingsDeleteParameters
  ): StreamableMethod<
    SensorMappingsDelete204Response | SensorMappingsDeletedefaultResponse
  >;
}

export interface SensorPartnerIntegrationsList {
  /** Gets partner integration models. */
  get(
    options?: SensorPartnerIntegrationsListParameters
  ): StreamableMethod<
    | SensorPartnerIntegrationsList200Response
    | SensorPartnerIntegrationsListdefaultResponse
  >;
}

export interface SensorPartnerIntegrationsCreateOrUpdate {
  /** Create or update an integration with a sensor partner. */
  patch(
    options: SensorPartnerIntegrationsCreateOrUpdateParameters
  ): StreamableMethod<
    | SensorPartnerIntegrationsCreateOrUpdate200Response
    | SensorPartnerIntegrationsCreateOrUpdate201Response
    | SensorPartnerIntegrationsCreateOrUpdatedefaultResponse
  >;
  /** Gets a partner integration model entity. */
  get(
    options?: SensorPartnerIntegrationsGetParameters
  ): StreamableMethod<
    | SensorPartnerIntegrationsGet200Response
    | SensorPartnerIntegrationsGetdefaultResponse
  >;
  /** Deletes a partner integration model entity. */
  delete(
    options?: SensorPartnerIntegrationsDeleteParameters
  ): StreamableMethod<
    | SensorPartnerIntegrationsDelete204Response
    | SensorPartnerIntegrationsDeletedefaultResponse
  >;
}

export interface SensorPartnerIntegrationsCheckConsent {
  /** Checks consent for partner integration. */
  post(
    options: SensorPartnerIntegrationsCheckConsentParameters
  ): StreamableMethod<
    | SensorPartnerIntegrationsCheckConsent200Response
    | SensorPartnerIntegrationsCheckConsentdefaultResponse
  >;
}

export interface SensorPartnerIntegrationsGenerateConsentLink {
  /** Generates partner integration consent link. */
  post(
    options?: SensorPartnerIntegrationsGenerateConsentLinkParameters
  ): StreamableMethod<
    | SensorPartnerIntegrationsGenerateConsentLink200Response
    | SensorPartnerIntegrationsGenerateConsentLinkdefaultResponse
  >;
}

export interface SensorsList {
  /** Returns a paginated list of sensor resources. */
  get(
    options?: SensorsListParameters
  ): StreamableMethod<SensorsList200Response | SensorsListdefaultResponse>;
}

export interface SensorsCreateOrUpdate {
  /** Create a sensor entity. */
  patch(
    options: SensorsCreateOrUpdateParameters
  ): StreamableMethod<
    | SensorsCreateOrUpdate200Response
    | SensorsCreateOrUpdate201Response
    | SensorsCreateOrUpdatedefaultResponse
  >;
  /** Gets a sensor entity. */
  get(
    options?: SensorsGetParameters
  ): StreamableMethod<SensorsGet200Response | SensorsGetdefaultResponse>;
  /** Deletes a sensor entity. */
  delete(
    options?: SensorsDeleteParameters
  ): StreamableMethod<SensorsDelete204Response | SensorsDeletedefaultResponse>;
}

export interface SensorsGetConnectionString {
  /** Gets a sensor connection string. */
  get(
    options?: SensorsGetConnectionStringParameters
  ): StreamableMethod<
    | SensorsGetConnectionString200Response
    | SensorsGetConnectionStringdefaultResponse
  >;
}

export interface SensorsRenewConnectionString {
  /** Renews a sensor connection string. */
  post(
    options: SensorsRenewConnectionStringParameters
  ): StreamableMethod<
    | SensorsRenewConnectionString200Response
    | SensorsRenewConnectionStringdefaultResponse
  >;
}

export interface SolutionInferenceCancel {
  /** Cancels a job for given solution id. */
  post(
    options: SolutionInferenceCancelParameters
  ): StreamableMethod<
    SolutionInferenceCancel200Response | SolutionInferenceCanceldefaultResponse
  >;
}

export interface SolutionInferenceCreateOrUpdate {
  /** Creates a job trigger for a solution. */
  post(
    options: SolutionInferenceCreateOrUpdateParameters
  ): StreamableMethod<
    | SolutionInferenceCreateOrUpdate202Response
    | SolutionInferenceCreateOrUpdatedefaultResponse
  >;
}

export interface SolutionInferenceFetch {
  /** Fetches details of triggered job for a solution. */
  post(
    options: SolutionInferenceFetchParameters
  ): StreamableMethod<
    SolutionInferenceFetch200Response | SolutionInferenceFetchdefaultResponse
  >;
}

export interface TillageDataListByFarmerId {
  /** Returns a paginated list of tillage data resources under a particular farm. */
  get(
    options?: TillageDataListByFarmerIdParameters
  ): StreamableMethod<
    | TillageDataListByFarmerId200Response
    | TillageDataListByFarmerIddefaultResponse
  >;
}

export interface TillageDataGet {
  /** Get a specified tillage data resource under a particular farmer. */
  get(
    options?: TillageDataGetParameters
  ): StreamableMethod<
    TillageDataGet200Response | TillageDataGetdefaultResponse
  >;
  /** Creates or updates an tillage data resource under a particular farmer. */
  patch(
    options: TillageDataCreateOrUpdateParameters
  ): StreamableMethod<
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified tillage data resource under a particular farmer. */
  delete(
    options?: TillageDataDeleteParameters
  ): StreamableMethod<
    TillageDataDelete204Response | TillageDataDeletedefaultResponse
  >;
}

export interface TillageDataList {
  /** Returns a paginated list of tillage data resources across all farmers. */
  get(
    options?: TillageDataListParameters
  ): StreamableMethod<
    TillageDataList200Response | TillageDataListdefaultResponse
  >;
}

export interface TillageDataCreateCascadeDeleteJob {
  /** Create cascade delete job for tillage data resource. */
  put(
    options: TillageDataCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | TillageDataCreateCascadeDeleteJob202Response
    | TillageDataCreateCascadeDeleteJobdefaultResponse
  >;
  /** Get cascade delete job for tillage data resource. */
  get(
    options?: TillageDataGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | TillageDataGetCascadeDeleteJobDetails200Response
    | TillageDataGetCascadeDeleteJobDetailsdefaultResponse
  >;
}

export interface WeatherList {
  /** Returns a paginated list of weather data. */
  get(
    options: WeatherListParameters
  ): StreamableMethod<WeatherList200Response | WeatherListdefaultResponse>;
}

export interface WeatherGetDataDeleteJobDetails {
  /** Get weather data delete job. */
  get(
    options?: WeatherGetDataDeleteJobDetailsParameters
  ): StreamableMethod<
    | WeatherGetDataDeleteJobDetails200Response
    | WeatherGetDataDeleteJobDetailsdefaultResponse
  >;
  /** Create a weather data delete job. */
  put(
    options: WeatherCreateDataDeleteJobParameters
  ): StreamableMethod<
    | WeatherCreateDataDeleteJob202Response
    | WeatherCreateDataDeleteJobdefaultResponse
  >;
}

export interface WeatherGetDataIngestionJobDetails {
  /** Get weather ingestion job. */
  get(
    options?: WeatherGetDataIngestionJobDetailsParameters
  ): StreamableMethod<
    | WeatherGetDataIngestionJobDetails200Response
    | WeatherGetDataIngestionJobDetailsdefaultResponse
  >;
  /** Create a weather data ingestion job. */
  put(
    options: WeatherCreateDataIngestionJobParameters
  ): StreamableMethod<
    | WeatherCreateDataIngestionJob202Response
    | WeatherCreateDataIngestionJobdefaultResponse
  >;
}

export interface ZonesListByFarmerId {
  /** Returns a paginated list of zone resources under a particular farmer. */
  get(
    options?: ZonesListByFarmerIdParameters
  ): StreamableMethod<
    ZonesListByFarmerId200Response | ZonesListByFarmerIddefaultResponse
  >;
}

export interface ZonesGet {
  /** Gets a specified zone resource under a particular farmer. */
  get(
    options?: ZonesGetParameters
  ): StreamableMethod<ZonesGet200Response | ZonesGetdefaultResponse>;
  /** Creates or updates a Zone resource. */
  patch(
    options: ZonesCreateOrUpdateParameters
  ): StreamableMethod<
    | ZonesCreateOrUpdate200Response
    | ZonesCreateOrUpdate201Response
    | ZonesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a specified zone resource under a particular farmer. */
  delete(
    options?: ZonesDeleteParameters
  ): StreamableMethod<ZonesDelete204Response | ZonesDeletedefaultResponse>;
}

export interface ZonesList {
  /** Returns a paginated list of zone resources across all farmers. */
  get(
    options?: ZonesListParameters
  ): StreamableMethod<ZonesList200Response | ZonesListdefaultResponse>;
}

export interface ZonesGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified job id. */
  get(
    options?: ZonesGetCascadeDeleteJobDetailsParameters
  ): StreamableMethod<
    | ZonesGetCascadeDeleteJobDetails200Response
    | ZonesGetCascadeDeleteJobDetailsdefaultResponse
  >;
  /** Create a cascade delete job for specified zone. */
  put(
    options: ZonesCreateCascadeDeleteJobParameters
  ): StreamableMethod<
    | ZonesCreateCascadeDeleteJob202Response
    | ZonesCreateCascadeDeleteJobdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/application-data' has methods for the following verbs: get */
  (path: "/application-data"): ApplicationDataList;
  /** Resource for '/application-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/application-data/cascade-delete/{jobId}",
    jobId: string
  ): ApplicationDataCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/application-data' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/application-data",
    farmerId: string
  ): ApplicationDataListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/application-data/\{applicationDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/application-data/{applicationDataId}",
    farmerId: string,
    applicationDataId: string
  ): ApplicationDataGet;
  /** Resource for '/farmers/\{farmerId\}/attachments' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/attachments",
    farmerId: string
  ): AttachmentsListByFarmerId;
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
  /** Resource for '/boundaries' has methods for the following verbs: get, post */
  (path: "/boundaries"): BoundariesList;
  /** Resource for '/boundaries/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/boundaries/cascade-delete/{jobId}",
    jobId: string
  ): BoundariesCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/boundaries' has methods for the following verbs: get, post */
  (
    path: "/farmers/{farmerId}/boundaries",
    farmerId: string
  ): BoundariesListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/boundaries/\{boundaryId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/farmers/{farmerId}/boundaries/{boundaryId}",
    farmerId: string,
    boundaryId: string
  ): BoundariesCreateOrUpdate;
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
  /** Resource for '/crop-varieties' has methods for the following verbs: get */
  (path: "/crop-varieties"): CropVarietiesList;
  /** Resource for '/crop-varieties/\{cropVarietyId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/crop-varieties/{cropVarietyId}",
    cropVarietyId: string
  ): CropVarietiesGet;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/device-data-models' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/device-data-models",
    sensorPartnerId: string
  ): DeviceDataModelsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/device-data-models/\{deviceDataModelId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}",
    sensorPartnerId: string,
    deviceDataModelId: string
  ): DeviceDataModelsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/devices' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/devices",
    sensorPartnerId: string
  ): DevicesList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/devices/\{deviceId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/devices/{deviceId}",
    sensorPartnerId: string,
    deviceId: string
  ): DevicesCreateOrUpdate;
  /** Resource for '/farmers' has methods for the following verbs: get */
  (path: "/farmers"): FarmersList;
  /** Resource for '/farmers/\{farmerId\}' has methods for the following verbs: get, patch, delete */
  (path: "/farmers/{farmerId}", farmerId: string): FarmersGet;
  /** Resource for '/farmers/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/farmers/cascade-delete/{jobId}",
    jobId: string
  ): FarmersCreateCascadeDeleteJob;
  /** Resource for '/farm-operations/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/farm-operations/ingest-data/{jobId}",
    jobId: string
  ): FarmOperationsCreateDataIngestionJob;
  /** Resource for '/farmers/\{farmerId\}/farms' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/farms", farmerId: string): FarmsListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/farms/\{farmId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/farms/{farmId}",
    farmerId: string,
    farmId: string
  ): FarmsGet;
  /** Resource for '/farms' has methods for the following verbs: get */
  (path: "/farms"): FarmsList;
  /** Resource for '/farms/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/farms/cascade-delete/{jobId}",
    jobId: string
  ): FarmsCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/fields' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/fields", farmerId: string): FieldsListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/fields/\{fieldId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/fields/{fieldId}",
    farmerId: string,
    fieldId: string
  ): FieldsGet;
  /** Resource for '/fields' has methods for the following verbs: get */
  (path: "/fields"): FieldsList;
  /** Resource for '/fields/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/fields/cascade-delete/{jobId}",
    jobId: string
  ): FieldsCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/harvest-data' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/harvest-data",
    farmerId: string
  ): HarvestDataListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/harvest-data/\{harvestDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/harvest-data/{harvestDataId}",
    farmerId: string,
    harvestDataId: string
  ): HarvestDataGet;
  /** Resource for '/harvest-data' has methods for the following verbs: get */
  (path: "/harvest-data"): HarvestDataList;
  /** Resource for '/harvest-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/harvest-data/cascade-delete/{jobId}",
    jobId: string
  ): HarvestDataCreateCascadeDeleteJob;
  /** Resource for '/image-processing/rasterize/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/image-processing/rasterize/{jobId}",
    jobId: string
  ): ImageProcessingCreateRasterizeJob;
  /** Resource for '/farmers/\{farmerId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insight-attachments' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments",
    farmerId: string,
    modelId: string,
    resourceType: string,
    resourceId: string
  ): InsightAttachmentsListByFarmerIdModelIdAndResource;
  /** Resource for '/farmers/\{farmerId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insight-attachments/\{insightAttachmentId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}",
    farmerId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
    insightAttachmentId: string
  ): InsightAttachmentsCreateOrUpdate;
  /** Resource for '/farmers/\{farmerId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insight-attachments/\{insightAttachmentId\}/file' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}/file",
    farmerId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
    insightAttachmentId: string
  ): InsightAttachmentsDownload;
  /** Resource for '/farmers/\{farmerId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insights' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights",
    farmerId: string,
    modelId: string,
    resourceType: string,
    resourceId: string
  ): InsightsListByFarmerIdModelIdAndResource;
  /** Resource for '/farmers/\{farmerId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insights/\{insightId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}",
    farmerId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
    insightId: string
  ): InsightsCreateOrUpdate;
  /** Resource for '/insights/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/insights/cascade-delete/{jobId}",
    jobId: string
  ): InsightsCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/management-zones' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/management-zones",
    farmerId: string
  ): ManagementZonesListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/management-zones/\{managementZoneId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/management-zones/{managementZoneId}",
    farmerId: string,
    managementZoneId: string
  ): ManagementZonesGet;
  /** Resource for '/management-zones' has methods for the following verbs: get */
  (path: "/management-zones"): ManagementZonesList;
  /** Resource for '/management-zones/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/management-zones/cascade-delete/{jobId}",
    jobId: string
  ): ManagementZonesGetCascadeDeleteJobDetails;
  /** Resource for '/model-inference/models/microsoft-biomass/infer-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/model-inference/models/microsoft-biomass/infer-data/{jobId}",
    jobId: string
  ): ModelInferenceCreateBiomassModelJob;
  /** Resource for '/model-inference/models/microsoft-soil-moisture/infer-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/model-inference/models/microsoft-soil-moisture/infer-data/{jobId}",
    jobId: string
  ): ModelInferenceCreateSoilMoistureModelJob;
  /** Resource for '/farmers/\{farmerId\}/nutrient-analyses' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/nutrient-analyses",
    farmerId: string
  ): NutrientAnalysesListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/nutrient-analyses/\{nutrientAnalysisId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/nutrient-analyses/{nutrientAnalysisId}",
    farmerId: string,
    nutrientAnalysisId: string
  ): NutrientAnalysesGet;
  /** Resource for '/nutrient-analyses' has methods for the following verbs: get */
  (path: "/nutrient-analyses"): NutrientAnalysesList;
  /** Resource for '/oauth/providers' has methods for the following verbs: get */
  (path: "/oauth/providers"): OAuthProvidersList;
  /** Resource for '/oauth/providers/\{oauthProviderId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/oauth/providers/{oauthProviderId}",
    oauthProviderId: string
  ): OAuthProvidersGet;
  /** Resource for '/oauth/providers/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/oauth/providers/cascade-delete/{jobId}",
    jobId: string
  ): OAuthProvidersGetCascadeDeleteJobDetails;
  /** Resource for '/oauth/tokens' has methods for the following verbs: get */
  (path: "/oauth/tokens"): OAuthTokensList;
  /** Resource for '/oauth/tokens/:connect' has methods for the following verbs: post */
  (path: "/oauth/tokens/:connect"): OAuthTokensGetOAuthConnectionLink;
  /** Resource for '/oauth/tokens/remove/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/oauth/tokens/remove/{jobId}",
    jobId: string
  ): OAuthTokensCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/planting-data' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/planting-data",
    farmerId: string
  ): PlantingDataListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/planting-data/\{plantingDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/planting-data/{plantingDataId}",
    farmerId: string,
    plantingDataId: string
  ): PlantingDataGet;
  /** Resource for '/planting-data' has methods for the following verbs: get */
  (path: "/planting-data"): PlantingDataList;
  /** Resource for '/planting-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/planting-data/cascade-delete/{jobId}",
    jobId: string
  ): PlantingDataCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/plant-tissue-analyses' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/plant-tissue-analyses",
    farmerId: string
  ): PlantTissueAnalysesListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/plant-tissue-analyses/\{plantTissueAnalysisId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/plant-tissue-analyses/{plantTissueAnalysisId}",
    farmerId: string,
    plantTissueAnalysisId: string
  ): PlantTissueAnalysesGet;
  /** Resource for '/plant-tissue-analyses' has methods for the following verbs: get */
  (path: "/plant-tissue-analyses"): PlantTissueAnalysesList;
  /** Resource for '/plant-tissue-analyses/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/plant-tissue-analyses/cascade-delete/{jobId}",
    jobId: string
  ): PlantTissueAnalysesCreateCascadeDeleteJob;
  /** Resource for '/farmers/\{farmerId\}/prescription-maps' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/prescription-maps",
    farmerId: string
  ): PrescriptionMapsListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/prescription-maps/\{prescriptionMapId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/prescription-maps/{prescriptionMapId}",
    farmerId: string,
    prescriptionMapId: string
  ): PrescriptionMapsGet;
  /** Resource for '/prescription-maps' has methods for the following verbs: get */
  (path: "/prescription-maps"): PrescriptionMapsList;
  /** Resource for '/prescription-maps/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/prescription-maps/cascade-delete/{jobId}",
    jobId: string
  ): PrescriptionMapsGetCascadeDeleteJobDetails;
  /** Resource for '/farmers/\{farmerId\}/prescriptions' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/prescriptions",
    farmerId: string
  ): PrescriptionsListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/prescriptions/\{prescriptionId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/prescriptions/{prescriptionId}",
    farmerId: string,
    prescriptionId: string
  ): PrescriptionsGet;
  /** Resource for '/prescriptions' has methods for the following verbs: get */
  (path: "/prescriptions"): PrescriptionsList;
  /** Resource for '/prescriptions/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/prescriptions/cascade-delete/{jobId}",
    jobId: string
  ): PrescriptionsGetCascadeDeleteJobDetails;
  /** Resource for '/scenes' has methods for the following verbs: get */
  (path: "/scenes"): ScenesList;
  /** Resource for '/scenes/downloadFiles' has methods for the following verbs: get */
  (path: "/scenes/downloadFiles"): ScenesDownload;
  /** Resource for '/scenes/satellite/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/scenes/satellite/ingest-data/{jobId}",
    jobId: string
  ): ScenesCreateSatelliteDataIngestionJob;
  /** Resource for '/farmers/\{farmerId\}/seasonal-fields' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/seasonal-fields",
    farmerId: string
  ): SeasonalFieldsListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/seasonal-fields/\{seasonalFieldId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/seasonal-fields/{seasonalFieldId}",
    farmerId: string,
    seasonalFieldId: string
  ): SeasonalFieldsGet;
  /** Resource for '/seasonal-fields' has methods for the following verbs: get */
  (path: "/seasonal-fields"): SeasonalFieldsList;
  /** Resource for '/seasonal-fields/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/seasonal-fields/cascade-delete/{jobId}",
    jobId: string
  ): SeasonalFieldsCreateCascadeDeleteJob;
  /** Resource for '/seasons' has methods for the following verbs: get */
  (path: "/seasons"): SeasonsList;
  /** Resource for '/seasons/\{seasonId\}' has methods for the following verbs: get, patch, delete */
  (path: "/seasons/{seasonId}", seasonId: string): SeasonsGet;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensor-data-models' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensor-data-models",
    sensorPartnerId: string
  ): SensorDataModelsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensor-data-models/\{sensorDataModelId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}",
    sensorPartnerId: string,
    sensorDataModelId: string
  ): SensorDataModelsCreateOrUpdate;
  /** Resource for '/sensor-events' has methods for the following verbs: get */
  (path: "/sensor-events"): SensorEventsList;
  /** Resource for '/sensor-mappings' has methods for the following verbs: get */
  (path: "/sensor-mappings"): SensorMappingsList;
  /** Resource for '/sensor-mappings/\{sensorMappingId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-mappings/{sensorMappingId}",
    sensorMappingId: string
  ): SensorMappingsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations",
    sensorPartnerId: string
  ): SensorPartnerIntegrationsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations/\{integrationId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations/{integrationId}",
    sensorPartnerId: string,
    integrationId: string
  ): SensorPartnerIntegrationsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations/\{integrationId\}/:check-consent' has methods for the following verbs: post */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:check-consent",
    sensorPartnerId: string,
    integrationId: string
  ): SensorPartnerIntegrationsCheckConsent;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations/\{integrationId\}/:generate-consent-link' has methods for the following verbs: post */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:generate-consent-link",
    sensorPartnerId: string,
    integrationId: string
  ): SensorPartnerIntegrationsGenerateConsentLink;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensors",
    sensorPartnerId: string
  ): SensorsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors/\{sensorId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensors/{sensorId}",
    sensorPartnerId: string,
    sensorId: string
  ): SensorsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors/\{sensorId\}/connection-strings' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings",
    sensorPartnerId: string,
    sensorId: string
  ): SensorsGetConnectionString;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors/\{sensorId\}/connection-strings/:renew' has methods for the following verbs: post */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings/:renew",
    sensorPartnerId: string,
    sensorId: string
  ): SensorsRenewConnectionString;
  /** Resource for '/solutions/\{solutionId\}:cancel' has methods for the following verbs: post */
  (
    path: "/solutions/{solutionId}:cancel",
    solutionId: string
  ): SolutionInferenceCancel;
  /** Resource for '/solutions/\{solutionId\}:create' has methods for the following verbs: post */
  (
    path: "/solutions/{solutionId}:create",
    solutionId: string
  ): SolutionInferenceCreateOrUpdate;
  /** Resource for '/solutions/\{solutionId\}:fetch' has methods for the following verbs: post */
  (
    path: "/solutions/{solutionId}:fetch",
    solutionId: string
  ): SolutionInferenceFetch;
  /** Resource for '/farmers/\{farmerId\}/tillage-data' has methods for the following verbs: get */
  (
    path: "/farmers/{farmerId}/tillage-data",
    farmerId: string
  ): TillageDataListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/tillage-data/\{tillageDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/tillage-data/{tillageDataId}",
    farmerId: string,
    tillageDataId: string
  ): TillageDataGet;
  /** Resource for '/tillage-data' has methods for the following verbs: get */
  (path: "/tillage-data"): TillageDataList;
  /** Resource for '/tillage-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/tillage-data/cascade-delete/{jobId}",
    jobId: string
  ): TillageDataCreateCascadeDeleteJob;
  /** Resource for '/weather' has methods for the following verbs: get */
  (path: "/weather"): WeatherList;
  /** Resource for '/weather/delete-data/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/weather/delete-data/{jobId}",
    jobId: string
  ): WeatherGetDataDeleteJobDetails;
  /** Resource for '/weather/ingest-data/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/weather/ingest-data/{jobId}",
    jobId: string
  ): WeatherGetDataIngestionJobDetails;
  /** Resource for '/farmers/\{farmerId\}/zones' has methods for the following verbs: get */
  (path: "/farmers/{farmerId}/zones", farmerId: string): ZonesListByFarmerId;
  /** Resource for '/farmers/\{farmerId\}/zones/\{zoneId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/farmers/{farmerId}/zones/{zoneId}",
    farmerId: string,
    zoneId: string
  ): ZonesGet;
  /** Resource for '/zones' has methods for the following verbs: get */
  (path: "/zones"): ZonesList;
  /** Resource for '/zones/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/zones/cascade-delete/{jobId}",
    jobId: string
  ): ZonesGetCascadeDeleteJobDetails;
}

export type FarmBeatsClient = Client & {
  path: Routes;
};
