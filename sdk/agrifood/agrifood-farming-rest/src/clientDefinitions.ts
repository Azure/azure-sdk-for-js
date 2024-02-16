// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ApplicationDataListParameters,
  ApplicationDataCreateCascadeDeleteJobParameters,
  ApplicationDataGetCascadeDeleteJobDetailsParameters,
  ApplicationDataListByPartyIdParameters,
  ApplicationDataGetParameters,
  ApplicationDataCreateOrUpdateParameters,
  ApplicationDataDeleteParameters,
  AttachmentsListByPartyIdParameters,
  AttachmentsGetParameters,
  AttachmentsCreateOrUpdateParameters,
  AttachmentsDeleteParameters,
  AttachmentsDownloadParameters,
  BoundariesListParameters,
  BoundariesSearchParameters,
  BoundariesCreateCascadeDeleteJobParameters,
  BoundariesGetCascadeDeleteJobDetailsParameters,
  BoundariesListByPartyIdParameters,
  BoundariesSearchByPartyIdParameters,
  BoundariesCreateOrUpdateParameters,
  BoundariesGetParameters,
  BoundariesDeleteParameters,
  BoundariesGetOverlapParameters,
  CropProductsListParameters,
  CropProductsGetParameters,
  CropProductsCreateOrUpdateParameters,
  CropProductsDeleteParameters,
  CropsListParameters,
  CropsGetParameters,
  CropsCreateOrUpdateParameters,
  CropsDeleteParameters,
  DeviceDataModelsListParameters,
  DeviceDataModelsCreateOrUpdateParameters,
  DeviceDataModelsGetParameters,
  DeviceDataModelsDeleteParameters,
  DevicesListParameters,
  DevicesCreateOrUpdateParameters,
  DevicesGetParameters,
  DevicesDeleteParameters,
  FarmOperationsCreateDataIngestionJobParameters,
  FarmOperationsGetDataIngestionJobDetailsParameters,
  FarmsListParameters,
  FarmsCreateCascadeDeleteJobParameters,
  FarmsGetCascadeDeleteJobDetailsParameters,
  FarmsListByPartyIdParameters,
  FarmsGetParameters,
  FarmsCreateOrUpdateParameters,
  FarmsDeleteParameters,
  FieldsListParameters,
  FieldsGetCascadeDeleteJobDetailsParameters,
  FieldsCreateCascadeDeleteJobParameters,
  FieldsListByPartyIdParameters,
  FieldsGetParameters,
  FieldsCreateOrUpdateParameters,
  FieldsDeleteParameters,
  HarvestDataListParameters,
  HarvestDataCreateCascadeDeleteJobParameters,
  HarvestDataGetCascadeDeleteJobDetailsParameters,
  HarvestDataListByPartyIdParameters,
  HarvestDataGetParameters,
  HarvestDataCreateOrUpdateParameters,
  HarvestDataDeleteParameters,
  ImageProcessingCreateRasterizeJobParameters,
  ImageProcessingGetRasterizeJobParameters,
  InsightAttachmentsListByPartyIdModelIdAndResourceParameters,
  InsightAttachmentsCreateOrUpdateParameters,
  InsightAttachmentsGetParameters,
  InsightAttachmentsDeleteParameters,
  InsightAttachmentsDownloadParameters,
  InsightsCreateCascadeDeleteJobParameters,
  InsightsGetCascadeDeleteJobDetailsParameters,
  InsightsListByPartyIdModelIdAndResourceParameters,
  InsightsCreateOrUpdateParameters,
  InsightsGetParameters,
  InsightsDeleteParameters,
  ManagementZonesListParameters,
  ManagementZonesGetCascadeDeleteJobDetailsParameters,
  ManagementZonesCreateCascadeDeleteJobParameters,
  ManagementZonesListByPartyIdParameters,
  ManagementZonesGetParameters,
  ManagementZonesCreateOrUpdateParameters,
  ManagementZonesDeleteParameters,
  ModelInferenceCreateBiomassModelJobParameters,
  ModelInferenceGetBiomassModelJobParameters,
  ModelInferenceCreateSensorPlacementModelJobParameters,
  ModelInferenceGetSensorPlacementModelJobParameters,
  ModelInferenceCreateSoilMoistureModelJobParameters,
  ModelInferenceGetSoilMoistureModelJobParameters,
  NutrientAnalysesListParameters,
  NutrientAnalysesListByPartyIdParameters,
  NutrientAnalysesGetParameters,
  NutrientAnalysesCreateOrUpdateParameters,
  NutrientAnalysesDeleteParameters,
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
  PartiesListParameters,
  PartiesGetParameters,
  PartiesCreateOrUpdateParameters,
  PartiesDeleteParameters,
  PartiesGetCascadeDeleteJobDetailsParameters,
  PartiesCreateCascadeDeleteJobParameters,
  PlantingDataListByPartyIdParameters,
  PlantingDataGetParameters,
  PlantingDataCreateOrUpdateParameters,
  PlantingDataDeleteParameters,
  PlantingDataListParameters,
  PlantingDataCreateCascadeDeleteJobParameters,
  PlantingDataGetCascadeDeleteJobDetailsParameters,
  PlantTissueAnalysesListByPartyIdParameters,
  PlantTissueAnalysesGetParameters,
  PlantTissueAnalysesCreateOrUpdateParameters,
  PlantTissueAnalysesDeleteParameters,
  PlantTissueAnalysesListParameters,
  PlantTissueAnalysesCreateCascadeDeleteJobParameters,
  PlantTissueAnalysesGetCascadeDeleteJobDetailsParameters,
  PrescriptionMapsListByPartyIdParameters,
  PrescriptionMapsGetParameters,
  PrescriptionMapsCreateOrUpdateParameters,
  PrescriptionMapsDeleteParameters,
  PrescriptionMapsListParameters,
  PrescriptionMapsGetCascadeDeleteJobDetailsParameters,
  PrescriptionMapsCreateCascadeDeleteJobParameters,
  PrescriptionsListByPartyIdParameters,
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
  ScenesSearchFeaturesParameters,
  ScenesGetStacFeatureParameters,
  SeasonalFieldsListByPartyIdParameters,
  SeasonalFieldsGetParameters,
  SeasonalFieldsCreateOrUpdateParameters,
  SeasonalFieldsDeleteParameters,
  SeasonalFieldsListParameters,
  SeasonalFieldsGetCascadeDeleteJobDetailsParameters,
  SeasonalFieldsCreateCascadeDeleteJobParameters,
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
  TillageDataListByPartyIdParameters,
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
  WeatherDataGetParameters,
  ZonesListByPartyIdParameters,
  ZonesGetParameters,
  ZonesCreateOrUpdateParameters,
  ZonesDeleteParameters,
  ZonesListParameters,
  ZonesGetCascadeDeleteJobDetailsParameters,
  ZonesCreateCascadeDeleteJobParameters,
} from "./parameters";
import {
  ApplicationDataList200Response,
  ApplicationDataListDefaultResponse,
  ApplicationDataCreateCascadeDeleteJob202Response,
  ApplicationDataCreateCascadeDeleteJobDefaultResponse,
  ApplicationDataGetCascadeDeleteJobDetails200Response,
  ApplicationDataGetCascadeDeleteJobDetailsDefaultResponse,
  ApplicationDataListByPartyId200Response,
  ApplicationDataListByPartyIdDefaultResponse,
  ApplicationDataGet200Response,
  ApplicationDataGetDefaultResponse,
  ApplicationDataCreateOrUpdate200Response,
  ApplicationDataCreateOrUpdate201Response,
  ApplicationDataCreateOrUpdateDefaultResponse,
  ApplicationDataDelete204Response,
  ApplicationDataDeleteDefaultResponse,
  AttachmentsListByPartyId200Response,
  AttachmentsListByPartyIdDefaultResponse,
  AttachmentsGet200Response,
  AttachmentsGetDefaultResponse,
  AttachmentsCreateOrUpdate200Response,
  AttachmentsCreateOrUpdate201Response,
  AttachmentsCreateOrUpdateDefaultResponse,
  AttachmentsDelete204Response,
  AttachmentsDeleteDefaultResponse,
  AttachmentsDownload200Response,
  AttachmentsDownloadDefaultResponse,
  BoundariesList200Response,
  BoundariesListDefaultResponse,
  BoundariesSearch200Response,
  BoundariesSearchDefaultResponse,
  BoundariesCreateCascadeDeleteJob202Response,
  BoundariesCreateCascadeDeleteJobDefaultResponse,
  BoundariesGetCascadeDeleteJobDetails200Response,
  BoundariesGetCascadeDeleteJobDetailsDefaultResponse,
  BoundariesListByPartyId200Response,
  BoundariesListByPartyIdDefaultResponse,
  BoundariesSearchByPartyId200Response,
  BoundariesSearchByPartyIdDefaultResponse,
  BoundariesCreateOrUpdate200Response,
  BoundariesCreateOrUpdate201Response,
  BoundariesCreateOrUpdateDefaultResponse,
  BoundariesGet200Response,
  BoundariesGetDefaultResponse,
  BoundariesDelete204Response,
  BoundariesDeleteDefaultResponse,
  BoundariesGetOverlap200Response,
  BoundariesGetOverlapDefaultResponse,
  CropProductsList200Response,
  CropProductsListDefaultResponse,
  CropProductsGet200Response,
  CropProductsGetDefaultResponse,
  CropProductsCreateOrUpdate200Response,
  CropProductsCreateOrUpdate201Response,
  CropProductsCreateOrUpdateDefaultResponse,
  CropProductsDelete204Response,
  CropProductsDeleteDefaultResponse,
  CropsList200Response,
  CropsListDefaultResponse,
  CropsGet200Response,
  CropsGetDefaultResponse,
  CropsCreateOrUpdate200Response,
  CropsCreateOrUpdate201Response,
  CropsCreateOrUpdateDefaultResponse,
  CropsDelete204Response,
  CropsDeleteDefaultResponse,
  DeviceDataModelsList200Response,
  DeviceDataModelsListDefaultResponse,
  DeviceDataModelsCreateOrUpdate200Response,
  DeviceDataModelsCreateOrUpdate201Response,
  DeviceDataModelsCreateOrUpdateDefaultResponse,
  DeviceDataModelsGet200Response,
  DeviceDataModelsGetDefaultResponse,
  DeviceDataModelsDelete204Response,
  DeviceDataModelsDeleteDefaultResponse,
  DevicesList200Response,
  DevicesListDefaultResponse,
  DevicesCreateOrUpdate200Response,
  DevicesCreateOrUpdate201Response,
  DevicesCreateOrUpdateDefaultResponse,
  DevicesGet200Response,
  DevicesGetDefaultResponse,
  DevicesDelete204Response,
  DevicesDeleteDefaultResponse,
  FarmOperationsCreateDataIngestionJob202Response,
  FarmOperationsCreateDataIngestionJobDefaultResponse,
  FarmOperationsGetDataIngestionJobDetails200Response,
  FarmOperationsGetDataIngestionJobDetailsDefaultResponse,
  FarmsList200Response,
  FarmsListDefaultResponse,
  FarmsCreateCascadeDeleteJob202Response,
  FarmsCreateCascadeDeleteJobDefaultResponse,
  FarmsGetCascadeDeleteJobDetails200Response,
  FarmsGetCascadeDeleteJobDetailsDefaultResponse,
  FarmsListByPartyId200Response,
  FarmsListByPartyIdDefaultResponse,
  FarmsGet200Response,
  FarmsGetDefaultResponse,
  FarmsCreateOrUpdate200Response,
  FarmsCreateOrUpdate201Response,
  FarmsCreateOrUpdateDefaultResponse,
  FarmsDelete204Response,
  FarmsDeleteDefaultResponse,
  FieldsList200Response,
  FieldsListDefaultResponse,
  FieldsGetCascadeDeleteJobDetails200Response,
  FieldsGetCascadeDeleteJobDetailsDefaultResponse,
  FieldsCreateCascadeDeleteJob202Response,
  FieldsCreateCascadeDeleteJobDefaultResponse,
  FieldsListByPartyId200Response,
  FieldsListByPartyIdDefaultResponse,
  FieldsGet200Response,
  FieldsGetDefaultResponse,
  FieldsCreateOrUpdate200Response,
  FieldsCreateOrUpdate201Response,
  FieldsCreateOrUpdateDefaultResponse,
  FieldsDelete204Response,
  FieldsDeleteDefaultResponse,
  HarvestDataList200Response,
  HarvestDataListDefaultResponse,
  HarvestDataCreateCascadeDeleteJob202Response,
  HarvestDataCreateCascadeDeleteJobDefaultResponse,
  HarvestDataGetCascadeDeleteJobDetails200Response,
  HarvestDataGetCascadeDeleteJobDetailsDefaultResponse,
  HarvestDataListByPartyId200Response,
  HarvestDataListByPartyIdDefaultResponse,
  HarvestDataGet200Response,
  HarvestDataGetDefaultResponse,
  HarvestDataCreateOrUpdate200Response,
  HarvestDataCreateOrUpdate201Response,
  HarvestDataCreateOrUpdateDefaultResponse,
  HarvestDataDelete204Response,
  HarvestDataDeleteDefaultResponse,
  ImageProcessingCreateRasterizeJob202Response,
  ImageProcessingCreateRasterizeJobDefaultResponse,
  ImageProcessingGetRasterizeJob200Response,
  ImageProcessingGetRasterizeJobDefaultResponse,
  InsightAttachmentsListByPartyIdModelIdAndResource200Response,
  InsightAttachmentsListByPartyIdModelIdAndResourceDefaultResponse,
  InsightAttachmentsCreateOrUpdate200Response,
  InsightAttachmentsCreateOrUpdate201Response,
  InsightAttachmentsCreateOrUpdateDefaultResponse,
  InsightAttachmentsGet200Response,
  InsightAttachmentsGetDefaultResponse,
  InsightAttachmentsDelete204Response,
  InsightAttachmentsDeleteDefaultResponse,
  InsightAttachmentsDownload200Response,
  InsightAttachmentsDownloadDefaultResponse,
  InsightsCreateCascadeDeleteJob202Response,
  InsightsCreateCascadeDeleteJobDefaultResponse,
  InsightsGetCascadeDeleteJobDetails200Response,
  InsightsGetCascadeDeleteJobDetailsDefaultResponse,
  InsightsListByPartyIdModelIdAndResource200Response,
  InsightsListByPartyIdModelIdAndResourceDefaultResponse,
  InsightsCreateOrUpdate200Response,
  InsightsCreateOrUpdate201Response,
  InsightsCreateOrUpdateDefaultResponse,
  InsightsGet200Response,
  InsightsGetDefaultResponse,
  InsightsDelete204Response,
  InsightsDeleteDefaultResponse,
  ManagementZonesList200Response,
  ManagementZonesListDefaultResponse,
  ManagementZonesGetCascadeDeleteJobDetails200Response,
  ManagementZonesGetCascadeDeleteJobDetailsDefaultResponse,
  ManagementZonesCreateCascadeDeleteJob202Response,
  ManagementZonesCreateCascadeDeleteJobDefaultResponse,
  ManagementZonesListByPartyId200Response,
  ManagementZonesListByPartyIdDefaultResponse,
  ManagementZonesGet200Response,
  ManagementZonesGetDefaultResponse,
  ManagementZonesCreateOrUpdate200Response,
  ManagementZonesCreateOrUpdate201Response,
  ManagementZonesCreateOrUpdateDefaultResponse,
  ManagementZonesDelete204Response,
  ManagementZonesDeleteDefaultResponse,
  ModelInferenceCreateBiomassModelJob202Response,
  ModelInferenceCreateBiomassModelJobDefaultResponse,
  ModelInferenceGetBiomassModelJob200Response,
  ModelInferenceGetBiomassModelJobDefaultResponse,
  ModelInferenceCreateSensorPlacementModelJob202Response,
  ModelInferenceCreateSensorPlacementModelJobDefaultResponse,
  ModelInferenceGetSensorPlacementModelJob200Response,
  ModelInferenceGetSensorPlacementModelJobDefaultResponse,
  ModelInferenceCreateSoilMoistureModelJob202Response,
  ModelInferenceCreateSoilMoistureModelJobDefaultResponse,
  ModelInferenceGetSoilMoistureModelJob200Response,
  ModelInferenceGetSoilMoistureModelJobDefaultResponse,
  NutrientAnalysesList200Response,
  NutrientAnalysesListDefaultResponse,
  NutrientAnalysesListByPartyId200Response,
  NutrientAnalysesListByPartyIdDefaultResponse,
  NutrientAnalysesGet200Response,
  NutrientAnalysesGetDefaultResponse,
  NutrientAnalysesCreateOrUpdate200Response,
  NutrientAnalysesCreateOrUpdate201Response,
  NutrientAnalysesCreateOrUpdateDefaultResponse,
  NutrientAnalysesDelete204Response,
  NutrientAnalysesDeleteDefaultResponse,
  OAuthProvidersList200Response,
  OAuthProvidersListDefaultResponse,
  OAuthProvidersGet200Response,
  OAuthProvidersGetDefaultResponse,
  OAuthProvidersCreateOrUpdate200Response,
  OAuthProvidersCreateOrUpdate201Response,
  OAuthProvidersCreateOrUpdateDefaultResponse,
  OAuthProvidersDelete204Response,
  OAuthProvidersDeleteDefaultResponse,
  OAuthProvidersGetCascadeDeleteJobDetails200Response,
  OAuthProvidersGetCascadeDeleteJobDetailsDefaultResponse,
  OAuthProvidersCreateCascadeDeleteJob202Response,
  OAuthProvidersCreateCascadeDeleteJobDefaultResponse,
  OAuthTokensList200Response,
  OAuthTokensListDefaultResponse,
  OAuthTokensGetOAuthConnectionLink200Response,
  OAuthTokensGetOAuthConnectionLinkDefaultResponse,
  OAuthTokensGetCascadeDeleteJobDetails200Response,
  OAuthTokensGetCascadeDeleteJobDetailsDefaultResponse,
  OAuthTokensCreateCascadeDeleteJob202Response,
  OAuthTokensCreateCascadeDeleteJobDefaultResponse,
  PartiesList200Response,
  PartiesListDefaultResponse,
  PartiesGet200Response,
  PartiesGetDefaultResponse,
  PartiesCreateOrUpdate200Response,
  PartiesCreateOrUpdate201Response,
  PartiesCreateOrUpdateDefaultResponse,
  PartiesDelete204Response,
  PartiesDeleteDefaultResponse,
  PartiesGetCascadeDeleteJobDetails200Response,
  PartiesGetCascadeDeleteJobDetailsDefaultResponse,
  PartiesCreateCascadeDeleteJob202Response,
  PartiesCreateCascadeDeleteJobDefaultResponse,
  PlantingDataListByPartyId200Response,
  PlantingDataListByPartyIdDefaultResponse,
  PlantingDataGet200Response,
  PlantingDataGetDefaultResponse,
  PlantingDataCreateOrUpdate200Response,
  PlantingDataCreateOrUpdate201Response,
  PlantingDataCreateOrUpdateDefaultResponse,
  PlantingDataDelete204Response,
  PlantingDataDeleteDefaultResponse,
  PlantingDataList200Response,
  PlantingDataListDefaultResponse,
  PlantingDataCreateCascadeDeleteJob202Response,
  PlantingDataCreateCascadeDeleteJobDefaultResponse,
  PlantingDataGetCascadeDeleteJobDetails200Response,
  PlantingDataGetCascadeDeleteJobDetailsDefaultResponse,
  PlantTissueAnalysesListByPartyId200Response,
  PlantTissueAnalysesListByPartyIdDefaultResponse,
  PlantTissueAnalysesGet200Response,
  PlantTissueAnalysesGetDefaultResponse,
  PlantTissueAnalysesCreateOrUpdate200Response,
  PlantTissueAnalysesCreateOrUpdate201Response,
  PlantTissueAnalysesCreateOrUpdateDefaultResponse,
  PlantTissueAnalysesDelete204Response,
  PlantTissueAnalysesDeleteDefaultResponse,
  PlantTissueAnalysesList200Response,
  PlantTissueAnalysesListDefaultResponse,
  PlantTissueAnalysesCreateCascadeDeleteJob202Response,
  PlantTissueAnalysesCreateCascadeDeleteJobDefaultResponse,
  PlantTissueAnalysesGetCascadeDeleteJobDetails200Response,
  PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultResponse,
  PrescriptionMapsListByPartyId200Response,
  PrescriptionMapsListByPartyIdDefaultResponse,
  PrescriptionMapsGet200Response,
  PrescriptionMapsGetDefaultResponse,
  PrescriptionMapsCreateOrUpdate200Response,
  PrescriptionMapsCreateOrUpdate201Response,
  PrescriptionMapsCreateOrUpdateDefaultResponse,
  PrescriptionMapsDelete204Response,
  PrescriptionMapsDeleteDefaultResponse,
  PrescriptionMapsList200Response,
  PrescriptionMapsListDefaultResponse,
  PrescriptionMapsGetCascadeDeleteJobDetails200Response,
  PrescriptionMapsGetCascadeDeleteJobDetailsDefaultResponse,
  PrescriptionMapsCreateCascadeDeleteJob202Response,
  PrescriptionMapsCreateCascadeDeleteJobDefaultResponse,
  PrescriptionsListByPartyId200Response,
  PrescriptionsListByPartyIdDefaultResponse,
  PrescriptionsGet200Response,
  PrescriptionsGetDefaultResponse,
  PrescriptionsCreateOrUpdate200Response,
  PrescriptionsCreateOrUpdate201Response,
  PrescriptionsCreateOrUpdateDefaultResponse,
  PrescriptionsDelete204Response,
  PrescriptionsDeleteDefaultResponse,
  PrescriptionsList200Response,
  PrescriptionsListDefaultResponse,
  PrescriptionsGetCascadeDeleteJobDetails200Response,
  PrescriptionsGetCascadeDeleteJobDetailsDefaultResponse,
  PrescriptionsCreateCascadeDeleteJob202Response,
  PrescriptionsCreateCascadeDeleteJobDefaultResponse,
  ScenesList200Response,
  ScenesListDefaultResponse,
  ScenesDownload200Response,
  ScenesDownloadDefaultResponse,
  ScenesCreateSatelliteDataIngestionJob202Response,
  ScenesCreateSatelliteDataIngestionJobDefaultResponse,
  ScenesGetSatelliteDataIngestionJobDetails200Response,
  ScenesGetSatelliteDataIngestionJobDetailsDefaultResponse,
  ScenesSearchFeatures200Response,
  ScenesSearchFeaturesDefaultResponse,
  ScenesGetStacFeature200Response,
  ScenesGetStacFeatureDefaultResponse,
  SeasonalFieldsListByPartyId200Response,
  SeasonalFieldsListByPartyIdDefaultResponse,
  SeasonalFieldsGet200Response,
  SeasonalFieldsGetDefaultResponse,
  SeasonalFieldsCreateOrUpdate200Response,
  SeasonalFieldsCreateOrUpdate201Response,
  SeasonalFieldsCreateOrUpdateDefaultResponse,
  SeasonalFieldsDelete204Response,
  SeasonalFieldsDeleteDefaultResponse,
  SeasonalFieldsList200Response,
  SeasonalFieldsListDefaultResponse,
  SeasonalFieldsGetCascadeDeleteJobDetails200Response,
  SeasonalFieldsGetCascadeDeleteJobDetailsDefaultResponse,
  SeasonalFieldsCreateCascadeDeleteJob202Response,
  SeasonalFieldsCreateCascadeDeleteJobDefaultResponse,
  SeasonsList200Response,
  SeasonsListDefaultResponse,
  SeasonsGet200Response,
  SeasonsGetDefaultResponse,
  SeasonsCreateOrUpdate200Response,
  SeasonsCreateOrUpdate201Response,
  SeasonsCreateOrUpdateDefaultResponse,
  SeasonsDelete204Response,
  SeasonsDeleteDefaultResponse,
  SensorDataModelsList200Response,
  SensorDataModelsListDefaultResponse,
  SensorDataModelsCreateOrUpdate200Response,
  SensorDataModelsCreateOrUpdate201Response,
  SensorDataModelsCreateOrUpdateDefaultResponse,
  SensorDataModelsGet200Response,
  SensorDataModelsGetDefaultResponse,
  SensorDataModelsDelete204Response,
  SensorDataModelsDeleteDefaultResponse,
  SensorEventsList200Response,
  SensorEventsListDefaultResponse,
  SensorMappingsList200Response,
  SensorMappingsListDefaultResponse,
  SensorMappingsCreateOrUpdate200Response,
  SensorMappingsCreateOrUpdate201Response,
  SensorMappingsCreateOrUpdateDefaultResponse,
  SensorMappingsGet200Response,
  SensorMappingsGetDefaultResponse,
  SensorMappingsDelete204Response,
  SensorMappingsDeleteDefaultResponse,
  SensorPartnerIntegrationsList200Response,
  SensorPartnerIntegrationsListDefaultResponse,
  SensorPartnerIntegrationsCreateOrUpdate200Response,
  SensorPartnerIntegrationsCreateOrUpdate201Response,
  SensorPartnerIntegrationsCreateOrUpdateDefaultResponse,
  SensorPartnerIntegrationsGet200Response,
  SensorPartnerIntegrationsGetDefaultResponse,
  SensorPartnerIntegrationsDelete204Response,
  SensorPartnerIntegrationsDeleteDefaultResponse,
  SensorPartnerIntegrationsCheckConsent200Response,
  SensorPartnerIntegrationsCheckConsentDefaultResponse,
  SensorPartnerIntegrationsGenerateConsentLink200Response,
  SensorPartnerIntegrationsGenerateConsentLinkDefaultResponse,
  SensorsList200Response,
  SensorsListDefaultResponse,
  SensorsCreateOrUpdate200Response,
  SensorsCreateOrUpdate201Response,
  SensorsCreateOrUpdateDefaultResponse,
  SensorsGet200Response,
  SensorsGetDefaultResponse,
  SensorsDelete204Response,
  SensorsDeleteDefaultResponse,
  SensorsGetConnectionString200Response,
  SensorsGetConnectionStringDefaultResponse,
  SensorsRenewConnectionString200Response,
  SensorsRenewConnectionStringDefaultResponse,
  SolutionInferenceCancel200Response,
  SolutionInferenceCancelDefaultResponse,
  SolutionInferenceCreateOrUpdate202Response,
  SolutionInferenceCreateOrUpdateDefaultResponse,
  SolutionInferenceFetch200Response,
  SolutionInferenceFetchDefaultResponse,
  TillageDataListByPartyId200Response,
  TillageDataListByPartyIdDefaultResponse,
  TillageDataGet200Response,
  TillageDataGetDefaultResponse,
  TillageDataCreateOrUpdate200Response,
  TillageDataCreateOrUpdate201Response,
  TillageDataCreateOrUpdateDefaultResponse,
  TillageDataDelete204Response,
  TillageDataDeleteDefaultResponse,
  TillageDataList200Response,
  TillageDataListDefaultResponse,
  TillageDataCreateCascadeDeleteJob202Response,
  TillageDataCreateCascadeDeleteJobDefaultResponse,
  TillageDataGetCascadeDeleteJobDetails200Response,
  TillageDataGetCascadeDeleteJobDetailsDefaultResponse,
  WeatherList200Response,
  WeatherListDefaultResponse,
  WeatherGetDataDeleteJobDetails200Response,
  WeatherGetDataDeleteJobDetailsDefaultResponse,
  WeatherCreateDataDeleteJob202Response,
  WeatherCreateDataDeleteJobDefaultResponse,
  WeatherGetDataIngestionJobDetails200Response,
  WeatherGetDataIngestionJobDetailsDefaultResponse,
  WeatherCreateDataIngestionJob202Response,
  WeatherCreateDataIngestionJobDefaultResponse,
  WeatherDataGet200Response,
  WeatherDataGetDefaultResponse,
  ZonesListByPartyId200Response,
  ZonesListByPartyIdDefaultResponse,
  ZonesGet200Response,
  ZonesGetDefaultResponse,
  ZonesCreateOrUpdate200Response,
  ZonesCreateOrUpdate201Response,
  ZonesCreateOrUpdateDefaultResponse,
  ZonesDelete204Response,
  ZonesDeleteDefaultResponse,
  ZonesList200Response,
  ZonesListDefaultResponse,
  ZonesGetCascadeDeleteJobDetails200Response,
  ZonesGetCascadeDeleteJobDetailsDefaultResponse,
  ZonesCreateCascadeDeleteJob202Response,
  ZonesCreateCascadeDeleteJobDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ApplicationDataList {
  /** Returns a paginated list of application data resources across all parties. */
  get(
    options?: ApplicationDataListParameters,
  ): StreamableMethod<ApplicationDataList200Response | ApplicationDataListDefaultResponse>;
}

export interface ApplicationDataCreateCascadeDeleteJob {
  /** Create cascade delete job for application data resource. */
  put(
    options: ApplicationDataCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | ApplicationDataCreateCascadeDeleteJob202Response
    | ApplicationDataCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get cascade delete job for application data resource. */
  get(
    options?: ApplicationDataGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | ApplicationDataGetCascadeDeleteJobDetails200Response
    | ApplicationDataGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface ApplicationDataListByPartyId {
  /** Returns a paginated list of application data resources under a particular party. */
  get(
    options?: ApplicationDataListByPartyIdParameters,
  ): StreamableMethod<
    ApplicationDataListByPartyId200Response | ApplicationDataListByPartyIdDefaultResponse
  >;
}

export interface ApplicationDataGet {
  /** Get a specified application data resource under a particular party. */
  get(
    options?: ApplicationDataGetParameters,
  ): StreamableMethod<ApplicationDataGet200Response | ApplicationDataGetDefaultResponse>;
  /** Creates or updates an application data resource under a particular party. */
  patch(
    options: ApplicationDataCreateOrUpdateParameters,
  ): StreamableMethod<
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified application data resource under a particular party. */
  delete(
    options?: ApplicationDataDeleteParameters,
  ): StreamableMethod<ApplicationDataDelete204Response | ApplicationDataDeleteDefaultResponse>;
}

export interface AttachmentsListByPartyId {
  /** Returns a paginated list of attachment resources under a particular party. */
  get(
    options?: AttachmentsListByPartyIdParameters,
  ): StreamableMethod<
    AttachmentsListByPartyId200Response | AttachmentsListByPartyIdDefaultResponse
  >;
}

export interface AttachmentsGet {
  /** Gets a specified attachment resource under a particular party. */
  get(
    options?: AttachmentsGetParameters,
  ): StreamableMethod<AttachmentsGet200Response | AttachmentsGetDefaultResponse>;
  /** Creates or updates an attachment resource under a particular party. */
  patch(
    options?: AttachmentsCreateOrUpdateParameters,
  ): StreamableMethod<
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified attachment resource under a particular party. */
  delete(
    options?: AttachmentsDeleteParameters,
  ): StreamableMethod<AttachmentsDelete204Response | AttachmentsDeleteDefaultResponse>;
}

export interface AttachmentsDownload {
  /** Downloads and returns attachment as response for the given input filePath. */
  get(
    options?: AttachmentsDownloadParameters,
  ): StreamableMethod<AttachmentsDownload200Response | AttachmentsDownloadDefaultResponse>;
}

export interface BoundariesList {
  /** Returns a paginated list of boundary resources across all parties. */
  get(
    options?: BoundariesListParameters,
  ): StreamableMethod<BoundariesList200Response | BoundariesListDefaultResponse>;
  /** Search for boundaries across all parties by fields and intersecting geometry. */
  post(
    options: BoundariesSearchParameters,
  ): StreamableMethod<BoundariesSearch200Response | BoundariesSearchDefaultResponse>;
}

export interface BoundariesCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified boundary. */
  put(
    options: BoundariesCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    BoundariesCreateCascadeDeleteJob202Response | BoundariesCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get cascade delete job for specified boundary. */
  get(
    options?: BoundariesGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface BoundariesListByPartyId {
  /** Returns a paginated list of boundary resources under a particular party. */
  get(
    options?: BoundariesListByPartyIdParameters,
  ): StreamableMethod<BoundariesListByPartyId200Response | BoundariesListByPartyIdDefaultResponse>;
  /** Search for boundaries by fields and intersecting geometry. */
  post(
    options: BoundariesSearchByPartyIdParameters,
  ): StreamableMethod<
    BoundariesSearchByPartyId200Response | BoundariesSearchByPartyIdDefaultResponse
  >;
}

export interface BoundariesCreateOrUpdate {
  /** Creates or updates a boundary resource. */
  patch(
    options: BoundariesCreateOrUpdateParameters,
  ): StreamableMethod<
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdateDefaultResponse
  >;
  /** Gets a specified boundary resource under a particular party. */
  get(
    options?: BoundariesGetParameters,
  ): StreamableMethod<BoundariesGet200Response | BoundariesGetDefaultResponse>;
  /** Deletes a specified boundary resource under a particular party. */
  delete(
    options?: BoundariesDeleteParameters,
  ): StreamableMethod<BoundariesDelete204Response | BoundariesDeleteDefaultResponse>;
}

export interface BoundariesGetOverlap {
  /** Returns overlapping area between two boundary Ids. */
  get(
    options: BoundariesGetOverlapParameters,
  ): StreamableMethod<BoundariesGetOverlap200Response | BoundariesGetOverlapDefaultResponse>;
}

export interface CropProductsList {
  /** Returns a paginated list of crop product resources. */
  get(
    options?: CropProductsListParameters,
  ): StreamableMethod<CropProductsList200Response | CropProductsListDefaultResponse>;
}

export interface CropProductsGet {
  /** Gets a specified crop Product resource. */
  get(
    options?: CropProductsGetParameters,
  ): StreamableMethod<CropProductsGet200Response | CropProductsGetDefaultResponse>;
  /** Creates or updates a crop Product resource. */
  patch(
    options: CropProductsCreateOrUpdateParameters,
  ): StreamableMethod<
    | CropProductsCreateOrUpdate200Response
    | CropProductsCreateOrUpdate201Response
    | CropProductsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified crop Product resource. */
  delete(
    options?: CropProductsDeleteParameters,
  ): StreamableMethod<CropProductsDelete204Response | CropProductsDeleteDefaultResponse>;
}

export interface CropsList {
  /** Returns a paginated list of crop resources. */
  get(
    options?: CropsListParameters,
  ): StreamableMethod<CropsList200Response | CropsListDefaultResponse>;
}

export interface CropsGet {
  /** Gets a specified crop resource. */
  get(
    options?: CropsGetParameters,
  ): StreamableMethod<CropsGet200Response | CropsGetDefaultResponse>;
  /** Creates or updates a crop resource. */
  patch(
    options: CropsCreateOrUpdateParameters,
  ): StreamableMethod<
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdateDefaultResponse
  >;
  /** Deletes Crop for given crop id. */
  delete(
    options?: CropsDeleteParameters,
  ): StreamableMethod<CropsDelete204Response | CropsDeleteDefaultResponse>;
}

export interface DeviceDataModelsList {
  /** Returns a paginated list of device data model resources. */
  get(
    options?: DeviceDataModelsListParameters,
  ): StreamableMethod<DeviceDataModelsList200Response | DeviceDataModelsListDefaultResponse>;
}

export interface DeviceDataModelsCreateOrUpdate {
  /** Create a device data model entity. */
  patch(
    options: DeviceDataModelsCreateOrUpdateParameters,
  ): StreamableMethod<
    | DeviceDataModelsCreateOrUpdate200Response
    | DeviceDataModelsCreateOrUpdate201Response
    | DeviceDataModelsCreateOrUpdateDefaultResponse
  >;
  /** Gets a device data model entity. */
  get(
    options?: DeviceDataModelsGetParameters,
  ): StreamableMethod<DeviceDataModelsGet200Response | DeviceDataModelsGetDefaultResponse>;
  /** Deletes a device data model entity. */
  delete(
    options?: DeviceDataModelsDeleteParameters,
  ): StreamableMethod<DeviceDataModelsDelete204Response | DeviceDataModelsDeleteDefaultResponse>;
}

export interface DevicesList {
  /** Returns a paginated list of device resources. */
  get(
    options?: DevicesListParameters,
  ): StreamableMethod<DevicesList200Response | DevicesListDefaultResponse>;
}

export interface DevicesCreateOrUpdate {
  /** Create a device entity. */
  patch(
    options: DevicesCreateOrUpdateParameters,
  ): StreamableMethod<
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdateDefaultResponse
  >;
  /** Gets a device entity. */
  get(
    options?: DevicesGetParameters,
  ): StreamableMethod<DevicesGet200Response | DevicesGetDefaultResponse>;
  /** Deletes a device entity. */
  delete(
    options?: DevicesDeleteParameters,
  ): StreamableMethod<DevicesDelete204Response | DevicesDeleteDefaultResponse>;
}

export interface FarmOperationsCreateDataIngestionJob {
  /** Create a farm operation data ingestion job. */
  put(
    options: FarmOperationsCreateDataIngestionJobParameters,
  ): StreamableMethod<
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobDefaultResponse
  >;
  /** Get a farm operation data ingestion job. */
  get(
    options?: FarmOperationsGetDataIngestionJobDetailsParameters,
  ): StreamableMethod<
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsDefaultResponse
  >;
}

export interface FarmsList {
  /** Returns a paginated list of farm resources across all parties. */
  get(
    options?: FarmsListParameters,
  ): StreamableMethod<FarmsList200Response | FarmsListDefaultResponse>;
}

export interface FarmsCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified farm. */
  put(
    options: FarmsCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    FarmsCreateCascadeDeleteJob202Response | FarmsCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get a cascade delete job for specified farm. */
  get(
    options?: FarmsGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    FarmsGetCascadeDeleteJobDetails200Response | FarmsGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface FarmsListByPartyId {
  /** Returns a paginated list of farm resources under a particular party. */
  get(
    options?: FarmsListByPartyIdParameters,
  ): StreamableMethod<FarmsListByPartyId200Response | FarmsListByPartyIdDefaultResponse>;
}

export interface FarmsGet {
  /** Gets a specified farm resource under a particular party. */
  get(
    options?: FarmsGetParameters,
  ): StreamableMethod<FarmsGet200Response | FarmsGetDefaultResponse>;
  /** Creates or updates a farm resource under a particular party. */
  patch(
    options: FarmsCreateOrUpdateParameters,
  ): StreamableMethod<
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified farm resource under a particular party. */
  delete(
    options?: FarmsDeleteParameters,
  ): StreamableMethod<FarmsDelete204Response | FarmsDeleteDefaultResponse>;
}

export interface FieldsList {
  /** Returns a paginated list of field resources across all parties. */
  get(
    options?: FieldsListParameters,
  ): StreamableMethod<FieldsList200Response | FieldsListDefaultResponse>;
}

export interface FieldsGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified field. */
  get(
    options?: FieldsGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    FieldsGetCascadeDeleteJobDetails200Response | FieldsGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create a cascade delete job for specified field. */
  put(
    options: FieldsCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    FieldsCreateCascadeDeleteJob202Response | FieldsCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface FieldsListByPartyId {
  /** Returns a paginated list of field resources under a particular party. */
  get(
    options?: FieldsListByPartyIdParameters,
  ): StreamableMethod<FieldsListByPartyId200Response | FieldsListByPartyIdDefaultResponse>;
}

export interface FieldsGet {
  /** Gets a specified field resource under a particular party. */
  get(
    options?: FieldsGetParameters,
  ): StreamableMethod<FieldsGet200Response | FieldsGetDefaultResponse>;
  /** Creates or Updates a field resource under a particular party. */
  patch(
    options: FieldsCreateOrUpdateParameters,
  ): StreamableMethod<
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified field resource under a particular party. */
  delete(
    options?: FieldsDeleteParameters,
  ): StreamableMethod<FieldsDelete204Response | FieldsDeleteDefaultResponse>;
}

export interface HarvestDataList {
  /** Returns a paginated list of harvest data resources across all parties. */
  get(
    options?: HarvestDataListParameters,
  ): StreamableMethod<HarvestDataList200Response | HarvestDataListDefaultResponse>;
}

export interface HarvestDataCreateCascadeDeleteJob {
  /** Create cascade delete job for harvest data resource. */
  put(
    options: HarvestDataCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    HarvestDataCreateCascadeDeleteJob202Response | HarvestDataCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get cascade delete job for harvest data resource. */
  get(
    options?: HarvestDataGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | HarvestDataGetCascadeDeleteJobDetails200Response
    | HarvestDataGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface HarvestDataListByPartyId {
  /** Returns a paginated list of harvest data resources under a particular farm. */
  get(
    options?: HarvestDataListByPartyIdParameters,
  ): StreamableMethod<
    HarvestDataListByPartyId200Response | HarvestDataListByPartyIdDefaultResponse
  >;
}

export interface HarvestDataGet {
  /** Get a specified harvest data resource under a particular party. */
  get(
    options?: HarvestDataGetParameters,
  ): StreamableMethod<HarvestDataGet200Response | HarvestDataGetDefaultResponse>;
  /** Creates or updates harvest data resource under a particular party. */
  patch(
    options: HarvestDataCreateOrUpdateParameters,
  ): StreamableMethod<
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified harvest data resource under a particular party. */
  delete(
    options?: HarvestDataDeleteParameters,
  ): StreamableMethod<HarvestDataDelete204Response | HarvestDataDeleteDefaultResponse>;
}

export interface ImageProcessingCreateRasterizeJob {
  /** Create a ImageProcessing Rasterize job. */
  put(
    options: ImageProcessingCreateRasterizeJobParameters,
  ): StreamableMethod<
    ImageProcessingCreateRasterizeJob202Response | ImageProcessingCreateRasterizeJobDefaultResponse
  >;
  /** Get ImageProcessing Rasterize job's details. */
  get(
    options?: ImageProcessingGetRasterizeJobParameters,
  ): StreamableMethod<
    ImageProcessingGetRasterizeJob200Response | ImageProcessingGetRasterizeJobDefaultResponse
  >;
}

export interface InsightAttachmentsListByPartyIdModelIdAndResource {
  /** Returns a paginated list of insight resources. */
  get(
    options?: InsightAttachmentsListByPartyIdModelIdAndResourceParameters,
  ): StreamableMethod<
    | InsightAttachmentsListByPartyIdModelIdAndResource200Response
    | InsightAttachmentsListByPartyIdModelIdAndResourceDefaultResponse
  >;
}

export interface InsightAttachmentsCreateOrUpdate {
  /** Creates or updates insight entity. */
  patch(
    options: InsightAttachmentsCreateOrUpdateParameters,
  ): StreamableMethod<
    | InsightAttachmentsCreateOrUpdate200Response
    | InsightAttachmentsCreateOrUpdate201Response
    | InsightAttachmentsCreateOrUpdateDefaultResponse
  >;
  /** Gets a specified insight resource under a particular party. */
  get(
    options?: InsightAttachmentsGetParameters,
  ): StreamableMethod<InsightAttachmentsGet200Response | InsightAttachmentsGetDefaultResponse>;
  /** Deletes a specified insight resource. */
  delete(
    options?: InsightAttachmentsDeleteParameters,
  ): StreamableMethod<
    InsightAttachmentsDelete204Response | InsightAttachmentsDeleteDefaultResponse
  >;
}

export interface InsightAttachmentsDownload {
  /** Downloads and returns insight-attachment as response for the given input filePath. */
  get(
    options?: InsightAttachmentsDownloadParameters,
  ): StreamableMethod<
    InsightAttachmentsDownload200Response | InsightAttachmentsDownloadDefaultResponse
  >;
}

export interface InsightsCreateCascadeDeleteJob {
  /** Create a cascade delete job for insights specified partyId/modelId/resourceType/resourceId. */
  put(
    options: InsightsCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    InsightsCreateCascadeDeleteJob202Response | InsightsCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get a cascade delete job for specified insight. */
  get(
    options?: InsightsGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | InsightsGetCascadeDeleteJobDetails200Response
    | InsightsGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface InsightsListByPartyIdModelIdAndResource {
  /** Returns a paginated list of insight resources. */
  get(
    options?: InsightsListByPartyIdModelIdAndResourceParameters,
  ): StreamableMethod<
    | InsightsListByPartyIdModelIdAndResource200Response
    | InsightsListByPartyIdModelIdAndResourceDefaultResponse
  >;
}

export interface InsightsCreateOrUpdate {
  /** Creates or updates insight entity. */
  patch(
    options: InsightsCreateOrUpdateParameters,
  ): StreamableMethod<
    | InsightsCreateOrUpdate200Response
    | InsightsCreateOrUpdate201Response
    | InsightsCreateOrUpdateDefaultResponse
  >;
  /** Gets a specified insight resource under a particular party. */
  get(
    options?: InsightsGetParameters,
  ): StreamableMethod<InsightsGet200Response | InsightsGetDefaultResponse>;
  /** Deletes a specified insight resource. */
  delete(
    options?: InsightsDeleteParameters,
  ): StreamableMethod<InsightsDelete204Response | InsightsDeleteDefaultResponse>;
}

export interface ManagementZonesList {
  /** Returns a paginated list of management zone resources across all parties. */
  get(
    options?: ManagementZonesListParameters,
  ): StreamableMethod<ManagementZonesList200Response | ManagementZonesListDefaultResponse>;
}

export interface ManagementZonesGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified job id. */
  get(
    options?: ManagementZonesGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | ManagementZonesGetCascadeDeleteJobDetails200Response
    | ManagementZonesGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create a cascade delete job for specified management zone. */
  put(
    options: ManagementZonesCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | ManagementZonesCreateCascadeDeleteJob202Response
    | ManagementZonesCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface ManagementZonesListByPartyId {
  /** Returns a paginated list of management zone resources under a particular party. */
  get(
    options?: ManagementZonesListByPartyIdParameters,
  ): StreamableMethod<
    ManagementZonesListByPartyId200Response | ManagementZonesListByPartyIdDefaultResponse
  >;
}

export interface ManagementZonesGet {
  /** Gets a specified management zone resource under a particular party. */
  get(
    options?: ManagementZonesGetParameters,
  ): StreamableMethod<ManagementZonesGet200Response | ManagementZonesGetDefaultResponse>;
  /** Creates or updates a management zone resource. */
  patch(
    options: ManagementZonesCreateOrUpdateParameters,
  ): StreamableMethod<
    | ManagementZonesCreateOrUpdate200Response
    | ManagementZonesCreateOrUpdate201Response
    | ManagementZonesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified management zone resource under a particular party. */
  delete(
    options?: ManagementZonesDeleteParameters,
  ): StreamableMethod<ManagementZonesDelete204Response | ManagementZonesDeleteDefaultResponse>;
}

export interface ModelInferenceCreateBiomassModelJob {
  /** Create a Biomass Model job. */
  put(
    options: ModelInferenceCreateBiomassModelJobParameters,
  ): StreamableMethod<
    | ModelInferenceCreateBiomassModelJob202Response
    | ModelInferenceCreateBiomassModelJobDefaultResponse
  >;
  /** Get Biomass Model job's details. */
  get(
    options?: ModelInferenceGetBiomassModelJobParameters,
  ): StreamableMethod<
    ModelInferenceGetBiomassModelJob200Response | ModelInferenceGetBiomassModelJobDefaultResponse
  >;
}

export interface ModelInferenceCreateSensorPlacementModelJob {
  /** Create a Sensor Placement Model job. */
  put(
    options: ModelInferenceCreateSensorPlacementModelJobParameters,
  ): StreamableMethod<
    | ModelInferenceCreateSensorPlacementModelJob202Response
    | ModelInferenceCreateSensorPlacementModelJobDefaultResponse
  >;
  /** Get Sensor Placement Model job's details. */
  get(
    options?: ModelInferenceGetSensorPlacementModelJobParameters,
  ): StreamableMethod<
    | ModelInferenceGetSensorPlacementModelJob200Response
    | ModelInferenceGetSensorPlacementModelJobDefaultResponse
  >;
}

export interface ModelInferenceCreateSoilMoistureModelJob {
  /** Create a SoilMoisture Model job. */
  put(
    options: ModelInferenceCreateSoilMoistureModelJobParameters,
  ): StreamableMethod<
    | ModelInferenceCreateSoilMoistureModelJob202Response
    | ModelInferenceCreateSoilMoistureModelJobDefaultResponse
  >;
  /** Get SoilMoisture Model job's details. */
  get(
    options?: ModelInferenceGetSoilMoistureModelJobParameters,
  ): StreamableMethod<
    | ModelInferenceGetSoilMoistureModelJob200Response
    | ModelInferenceGetSoilMoistureModelJobDefaultResponse
  >;
}

export interface NutrientAnalysesList {
  /** Returns a paginated list of nutrient analysis resources across all parties. */
  get(
    options?: NutrientAnalysesListParameters,
  ): StreamableMethod<NutrientAnalysesList200Response | NutrientAnalysesListDefaultResponse>;
}

export interface NutrientAnalysesListByPartyId {
  /** Returns a paginated list of nutrient analysis resources under a particular party. */
  get(
    options?: NutrientAnalysesListByPartyIdParameters,
  ): StreamableMethod<
    NutrientAnalysesListByPartyId200Response | NutrientAnalysesListByPartyIdDefaultResponse
  >;
}

export interface NutrientAnalysesGet {
  /** Gets a specified nutrient analysis resource under a particular party. */
  get(
    options?: NutrientAnalysesGetParameters,
  ): StreamableMethod<NutrientAnalysesGet200Response | NutrientAnalysesGetDefaultResponse>;
  /** Creates or updates a nutrient analysis resource. */
  patch(
    options: NutrientAnalysesCreateOrUpdateParameters,
  ): StreamableMethod<
    | NutrientAnalysesCreateOrUpdate200Response
    | NutrientAnalysesCreateOrUpdate201Response
    | NutrientAnalysesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified nutrient analysis resource under a particular party. */
  delete(
    options?: NutrientAnalysesDeleteParameters,
  ): StreamableMethod<NutrientAnalysesDelete204Response | NutrientAnalysesDeleteDefaultResponse>;
}

export interface OAuthProvidersList {
  /** Returns a paginated list of oauthProvider resources. */
  get(
    options?: OAuthProvidersListParameters,
  ): StreamableMethod<OAuthProvidersList200Response | OAuthProvidersListDefaultResponse>;
}

export interface OAuthProvidersGet {
  /** Get a specified oauthProvider resource. */
  get(
    options?: OAuthProvidersGetParameters,
  ): StreamableMethod<OAuthProvidersGet200Response | OAuthProvidersGetDefaultResponse>;
  /** Creates or updates an oauthProvider resource. */
  patch(
    options: OAuthProvidersCreateOrUpdateParameters,
  ): StreamableMethod<
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdateDefaultResponse
  >;
  /** Deletes an specified oauthProvider resource. */
  delete(
    options?: OAuthProvidersDeleteParameters,
  ): StreamableMethod<OAuthProvidersDelete204Response | OAuthProvidersDeleteDefaultResponse>;
}

export interface OAuthProvidersGetCascadeDeleteJobDetails {
  /** Get cascade delete job for oauthProvider resource. */
  get(
    options?: OAuthProvidersGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | OAuthProvidersGetCascadeDeleteJobDetails200Response
    | OAuthProvidersGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create cascade delete job for oauthProvider resource. */
  put(
    options: OAuthProvidersCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | OAuthProvidersCreateCascadeDeleteJob202Response
    | OAuthProvidersCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface OAuthTokensList {
  /** Returns a list of OAuthToken documents. */
  get(
    options?: OAuthTokensListParameters,
  ): StreamableMethod<OAuthTokensList200Response | OAuthTokensListDefaultResponse>;
}

export interface OAuthTokensGetOAuthConnectionLink {
  /** Returns Connection link needed in the OAuth flow. */
  post(
    options: OAuthTokensGetOAuthConnectionLinkParameters,
  ): StreamableMethod<
    OAuthTokensGetOAuthConnectionLink200Response | OAuthTokensGetOAuthConnectionLinkDefaultResponse
  >;
}

export interface OAuthTokensGetCascadeDeleteJobDetails {
  /** Get remove job for OAuth token. */
  get(
    options?: OAuthTokensGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create remove job for OAuth token. */
  put(
    options: OAuthTokensCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    OAuthTokensCreateCascadeDeleteJob202Response | OAuthTokensCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface PartiesList {
  /** Returns a paginated list of party resources. */
  get(
    options?: PartiesListParameters,
  ): StreamableMethod<PartiesList200Response | PartiesListDefaultResponse>;
}

export interface PartiesGet {
  /** Gets a specified party resource. */
  get(
    options?: PartiesGetParameters,
  ): StreamableMethod<PartiesGet200Response | PartiesGetDefaultResponse>;
  /** Creates or updates a party resource. */
  patch(
    options: PartiesCreateOrUpdateParameters,
  ): StreamableMethod<
    | PartiesCreateOrUpdate200Response
    | PartiesCreateOrUpdate201Response
    | PartiesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified party resource. */
  delete(
    options?: PartiesDeleteParameters,
  ): StreamableMethod<PartiesDelete204Response | PartiesDeleteDefaultResponse>;
}

export interface PartiesGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified party. */
  get(
    options?: PartiesGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    PartiesGetCascadeDeleteJobDetails200Response | PartiesGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create a cascade delete job for specified party. */
  put(
    options: PartiesCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    PartiesCreateCascadeDeleteJob202Response | PartiesCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface PlantingDataListByPartyId {
  /** Returns a paginated list of planting data resources under a particular party. */
  get(
    options?: PlantingDataListByPartyIdParameters,
  ): StreamableMethod<
    PlantingDataListByPartyId200Response | PlantingDataListByPartyIdDefaultResponse
  >;
}

export interface PlantingDataGet {
  /** Get a specified planting data resource under a particular party. */
  get(
    options?: PlantingDataGetParameters,
  ): StreamableMethod<PlantingDataGet200Response | PlantingDataGetDefaultResponse>;
  /** Creates or updates an planting data resource under a particular party. */
  patch(
    options: PlantingDataCreateOrUpdateParameters,
  ): StreamableMethod<
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified planting data resource under a particular party. */
  delete(
    options?: PlantingDataDeleteParameters,
  ): StreamableMethod<PlantingDataDelete204Response | PlantingDataDeleteDefaultResponse>;
}

export interface PlantingDataList {
  /** Returns a paginated list of planting data resources across all parties. */
  get(
    options?: PlantingDataListParameters,
  ): StreamableMethod<PlantingDataList200Response | PlantingDataListDefaultResponse>;
}

export interface PlantingDataCreateCascadeDeleteJob {
  /** Create cascade delete job for planting data resource. */
  put(
    options: PlantingDataCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | PlantingDataCreateCascadeDeleteJob202Response
    | PlantingDataCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get cascade delete job for planting data resource. */
  get(
    options?: PlantingDataGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | PlantingDataGetCascadeDeleteJobDetails200Response
    | PlantingDataGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface PlantTissueAnalysesListByPartyId {
  /** Returns a paginated list of plant tissue analysis resources under a particular party. */
  get(
    options?: PlantTissueAnalysesListByPartyIdParameters,
  ): StreamableMethod<
    PlantTissueAnalysesListByPartyId200Response | PlantTissueAnalysesListByPartyIdDefaultResponse
  >;
}

export interface PlantTissueAnalysesGet {
  /** Gets a specified plant tissue analysis resource under a particular party. */
  get(
    options?: PlantTissueAnalysesGetParameters,
  ): StreamableMethod<PlantTissueAnalysesGet200Response | PlantTissueAnalysesGetDefaultResponse>;
  /** Creates or updates a plant tissue analysis resource. */
  patch(
    options: PlantTissueAnalysesCreateOrUpdateParameters,
  ): StreamableMethod<
    | PlantTissueAnalysesCreateOrUpdate200Response
    | PlantTissueAnalysesCreateOrUpdate201Response
    | PlantTissueAnalysesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified plant tissue analysis resource under a particular party. */
  delete(
    options?: PlantTissueAnalysesDeleteParameters,
  ): StreamableMethod<
    PlantTissueAnalysesDelete204Response | PlantTissueAnalysesDeleteDefaultResponse
  >;
}

export interface PlantTissueAnalysesList {
  /** Returns a paginated list of plant tissue analysis resources across all parties. */
  get(
    options?: PlantTissueAnalysesListParameters,
  ): StreamableMethod<PlantTissueAnalysesList200Response | PlantTissueAnalysesListDefaultResponse>;
}

export interface PlantTissueAnalysesCreateCascadeDeleteJob {
  /** Create a cascade delete job for specified plant tissue analysis. */
  put(
    options: PlantTissueAnalysesCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | PlantTissueAnalysesCreateCascadeDeleteJob202Response
    | PlantTissueAnalysesCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get a cascade delete job for specified plant tissue analysis. */
  get(
    options?: PlantTissueAnalysesGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | PlantTissueAnalysesGetCascadeDeleteJobDetails200Response
    | PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface PrescriptionMapsListByPartyId {
  /** Returns a paginated list of prescription map resources under a particular party. */
  get(
    options?: PrescriptionMapsListByPartyIdParameters,
  ): StreamableMethod<
    PrescriptionMapsListByPartyId200Response | PrescriptionMapsListByPartyIdDefaultResponse
  >;
}

export interface PrescriptionMapsGet {
  /** Gets a specified prescription map resource under a particular party. */
  get(
    options?: PrescriptionMapsGetParameters,
  ): StreamableMethod<PrescriptionMapsGet200Response | PrescriptionMapsGetDefaultResponse>;
  /** Creates or Updates a prescription map resource under a particular party. */
  patch(
    options: PrescriptionMapsCreateOrUpdateParameters,
  ): StreamableMethod<
    | PrescriptionMapsCreateOrUpdate200Response
    | PrescriptionMapsCreateOrUpdate201Response
    | PrescriptionMapsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified prescription map resource under a particular party. */
  delete(
    options?: PrescriptionMapsDeleteParameters,
  ): StreamableMethod<PrescriptionMapsDelete204Response | PrescriptionMapsDeleteDefaultResponse>;
}

export interface PrescriptionMapsList {
  /** Returns a paginated list of prescription map resources across all parties. */
  get(
    options?: PrescriptionMapsListParameters,
  ): StreamableMethod<PrescriptionMapsList200Response | PrescriptionMapsListDefaultResponse>;
}

export interface PrescriptionMapsGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified prescription map. */
  get(
    options?: PrescriptionMapsGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | PrescriptionMapsGetCascadeDeleteJobDetails200Response
    | PrescriptionMapsGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create a cascade delete job for specified prescription map. */
  put(
    options: PrescriptionMapsCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | PrescriptionMapsCreateCascadeDeleteJob202Response
    | PrescriptionMapsCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface PrescriptionsListByPartyId {
  /** Returns a paginated list of prescription resources under a particular party. */
  get(
    options?: PrescriptionsListByPartyIdParameters,
  ): StreamableMethod<
    PrescriptionsListByPartyId200Response | PrescriptionsListByPartyIdDefaultResponse
  >;
}

export interface PrescriptionsGet {
  /** Gets a specified prescription resource under a particular party. */
  get(
    options?: PrescriptionsGetParameters,
  ): StreamableMethod<PrescriptionsGet200Response | PrescriptionsGetDefaultResponse>;
  /** Creates or Updates a prescription resource under a particular party. */
  patch(
    options: PrescriptionsCreateOrUpdateParameters,
  ): StreamableMethod<
    | PrescriptionsCreateOrUpdate200Response
    | PrescriptionsCreateOrUpdate201Response
    | PrescriptionsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified prescription resource under a particular party. */
  delete(
    options?: PrescriptionsDeleteParameters,
  ): StreamableMethod<PrescriptionsDelete204Response | PrescriptionsDeleteDefaultResponse>;
}

export interface PrescriptionsList {
  /** Returns a paginated list of prescription resources across all parties. */
  get(
    options?: PrescriptionsListParameters,
  ): StreamableMethod<PrescriptionsList200Response | PrescriptionsListDefaultResponse>;
}

export interface PrescriptionsGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified prescription. */
  get(
    options?: PrescriptionsGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | PrescriptionsGetCascadeDeleteJobDetails200Response
    | PrescriptionsGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create a cascade delete job for specified prescription. */
  put(
    options: PrescriptionsCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | PrescriptionsCreateCascadeDeleteJob202Response
    | PrescriptionsCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface ScenesList {
  /** Returns a paginated list of scene resources. */
  get(
    options: ScenesListParameters,
  ): StreamableMethod<ScenesList200Response | ScenesListDefaultResponse>;
}

export interface ScenesDownload {
  /** Downloads and returns file Stream as response for the given input filePath. */
  get(
    options: ScenesDownloadParameters,
  ): StreamableMethod<ScenesDownload200Response | ScenesDownloadDefaultResponse>;
}

export interface ScenesCreateSatelliteDataIngestionJob {
  /** Create a satellite data ingestion job. */
  put(
    options: ScenesCreateSatelliteDataIngestionJobParameters,
  ): StreamableMethod<
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobDefaultResponse
  >;
  /** Get a satellite data ingestion job. */
  get(
    options?: ScenesGetSatelliteDataIngestionJobDetailsParameters,
  ): StreamableMethod<
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsDefaultResponse
  >;
}

export interface ScenesSearchFeatures {
  /** Search for STAC features by collection id, bbox, intersecting geometry, start and end datetime. */
  post(
    options: ScenesSearchFeaturesParameters,
  ): StreamableMethod<ScenesSearchFeatures200Response | ScenesSearchFeaturesDefaultResponse>;
}

export interface ScenesGetStacFeature {
  /** Get a feature(SpatioTemporal Asset Catalog (STAC) Item) for given collection and feature id. */
  get(
    options?: ScenesGetStacFeatureParameters,
  ): StreamableMethod<ScenesGetStacFeature200Response | ScenesGetStacFeatureDefaultResponse>;
}

export interface SeasonalFieldsListByPartyId {
  /** Returns a paginated list of seasonal field resources under a particular party. */
  get(
    options?: SeasonalFieldsListByPartyIdParameters,
  ): StreamableMethod<
    SeasonalFieldsListByPartyId200Response | SeasonalFieldsListByPartyIdDefaultResponse
  >;
}

export interface SeasonalFieldsGet {
  /** Gets a specified seasonal field resource under a particular party. */
  get(
    options?: SeasonalFieldsGetParameters,
  ): StreamableMethod<SeasonalFieldsGet200Response | SeasonalFieldsGetDefaultResponse>;
  /** Creates or Updates a seasonal field resource under a particular party. */
  patch(
    options: SeasonalFieldsCreateOrUpdateParameters,
  ): StreamableMethod<
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified seasonal-field resource under a particular party. */
  delete(
    options?: SeasonalFieldsDeleteParameters,
  ): StreamableMethod<SeasonalFieldsDelete204Response | SeasonalFieldsDeleteDefaultResponse>;
}

export interface SeasonalFieldsList {
  /** Returns a paginated list of seasonal field resources across all parties. */
  get(
    options?: SeasonalFieldsListParameters,
  ): StreamableMethod<SeasonalFieldsList200Response | SeasonalFieldsListDefaultResponse>;
}

export interface SeasonalFieldsGetCascadeDeleteJobDetails {
  /** Get cascade delete job for specified seasonal field. */
  get(
    options?: SeasonalFieldsGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create a cascade delete job for specified seasonal field. */
  put(
    options: SeasonalFieldsCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface SeasonsList {
  /** Returns a paginated list of season resources. */
  get(
    options?: SeasonsListParameters,
  ): StreamableMethod<SeasonsList200Response | SeasonsListDefaultResponse>;
}

export interface SeasonsGet {
  /** Gets a specified season resource. */
  get(
    options?: SeasonsGetParameters,
  ): StreamableMethod<SeasonsGet200Response | SeasonsGetDefaultResponse>;
  /** Creates or updates a season resource. */
  patch(
    options: SeasonsCreateOrUpdateParameters,
  ): StreamableMethod<
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified season resource. */
  delete(
    options?: SeasonsDeleteParameters,
  ): StreamableMethod<SeasonsDelete204Response | SeasonsDeleteDefaultResponse>;
}

export interface SensorDataModelsList {
  /** Returns a paginated list of sensor data model resources. */
  get(
    options?: SensorDataModelsListParameters,
  ): StreamableMethod<SensorDataModelsList200Response | SensorDataModelsListDefaultResponse>;
}

export interface SensorDataModelsCreateOrUpdate {
  /** Create a sensor data model entity. */
  patch(
    options: SensorDataModelsCreateOrUpdateParameters,
  ): StreamableMethod<
    | SensorDataModelsCreateOrUpdate200Response
    | SensorDataModelsCreateOrUpdate201Response
    | SensorDataModelsCreateOrUpdateDefaultResponse
  >;
  /** Gets a sensor data model entity. */
  get(
    options?: SensorDataModelsGetParameters,
  ): StreamableMethod<SensorDataModelsGet200Response | SensorDataModelsGetDefaultResponse>;
  /** Deletes a sensor data model entity. */
  delete(
    options?: SensorDataModelsDeleteParameters,
  ): StreamableMethod<SensorDataModelsDelete204Response | SensorDataModelsDeleteDefaultResponse>;
}

export interface SensorEventsList {
  /**
   * Returns a list of sensor events data. Time span for query is limited to 90 days at a time.
   * Returns last 90 days events when startDateTime and endDateTime are not provided.
   */
  get(
    options: SensorEventsListParameters,
  ): StreamableMethod<SensorEventsList200Response | SensorEventsListDefaultResponse>;
}

export interface SensorMappingsList {
  /** Returns a paginated list of sensor mapping resources. */
  get(
    options?: SensorMappingsListParameters,
  ): StreamableMethod<SensorMappingsList200Response | SensorMappingsListDefaultResponse>;
}

export interface SensorMappingsCreateOrUpdate {
  /** Create a sensor mapping entity. */
  patch(
    options: SensorMappingsCreateOrUpdateParameters,
  ): StreamableMethod<
    | SensorMappingsCreateOrUpdate200Response
    | SensorMappingsCreateOrUpdate201Response
    | SensorMappingsCreateOrUpdateDefaultResponse
  >;
  /** Gets a sensor mapping entity. */
  get(
    options?: SensorMappingsGetParameters,
  ): StreamableMethod<SensorMappingsGet200Response | SensorMappingsGetDefaultResponse>;
  /** Deletes a sensor mapping entity. */
  delete(
    options?: SensorMappingsDeleteParameters,
  ): StreamableMethod<SensorMappingsDelete204Response | SensorMappingsDeleteDefaultResponse>;
}

export interface SensorPartnerIntegrationsList {
  /** Gets partner integration models. */
  get(
    options?: SensorPartnerIntegrationsListParameters,
  ): StreamableMethod<
    SensorPartnerIntegrationsList200Response | SensorPartnerIntegrationsListDefaultResponse
  >;
}

export interface SensorPartnerIntegrationsCreateOrUpdate {
  /** Create or update an integration with a sensor partner. */
  patch(
    options: SensorPartnerIntegrationsCreateOrUpdateParameters,
  ): StreamableMethod<
    | SensorPartnerIntegrationsCreateOrUpdate200Response
    | SensorPartnerIntegrationsCreateOrUpdate201Response
    | SensorPartnerIntegrationsCreateOrUpdateDefaultResponse
  >;
  /** Gets a partner integration model entity. */
  get(
    options?: SensorPartnerIntegrationsGetParameters,
  ): StreamableMethod<
    SensorPartnerIntegrationsGet200Response | SensorPartnerIntegrationsGetDefaultResponse
  >;
  /** Deletes a partner integration model entity. */
  delete(
    options?: SensorPartnerIntegrationsDeleteParameters,
  ): StreamableMethod<
    SensorPartnerIntegrationsDelete204Response | SensorPartnerIntegrationsDeleteDefaultResponse
  >;
}

export interface SensorPartnerIntegrationsCheckConsent {
  /** Checks consent for partner integration. */
  post(
    options: SensorPartnerIntegrationsCheckConsentParameters,
  ): StreamableMethod<
    | SensorPartnerIntegrationsCheckConsent200Response
    | SensorPartnerIntegrationsCheckConsentDefaultResponse
  >;
}

export interface SensorPartnerIntegrationsGenerateConsentLink {
  /** Generates partner integration consent link. */
  post(
    options?: SensorPartnerIntegrationsGenerateConsentLinkParameters,
  ): StreamableMethod<
    | SensorPartnerIntegrationsGenerateConsentLink200Response
    | SensorPartnerIntegrationsGenerateConsentLinkDefaultResponse
  >;
}

export interface SensorsList {
  /** Returns a paginated list of sensor resources. */
  get(
    options?: SensorsListParameters,
  ): StreamableMethod<SensorsList200Response | SensorsListDefaultResponse>;
}

export interface SensorsCreateOrUpdate {
  /** Create a sensor entity. */
  patch(
    options: SensorsCreateOrUpdateParameters,
  ): StreamableMethod<
    | SensorsCreateOrUpdate200Response
    | SensorsCreateOrUpdate201Response
    | SensorsCreateOrUpdateDefaultResponse
  >;
  /** Gets a sensor entity. */
  get(
    options?: SensorsGetParameters,
  ): StreamableMethod<SensorsGet200Response | SensorsGetDefaultResponse>;
  /** Deletes a sensor entity. */
  delete(
    options?: SensorsDeleteParameters,
  ): StreamableMethod<SensorsDelete204Response | SensorsDeleteDefaultResponse>;
}

export interface SensorsGetConnectionString {
  /** Gets a sensor connection string. */
  get(
    options?: SensorsGetConnectionStringParameters,
  ): StreamableMethod<
    SensorsGetConnectionString200Response | SensorsGetConnectionStringDefaultResponse
  >;
}

export interface SensorsRenewConnectionString {
  /** Renews a sensor connection string. */
  post(
    options: SensorsRenewConnectionStringParameters,
  ): StreamableMethod<
    SensorsRenewConnectionString200Response | SensorsRenewConnectionStringDefaultResponse
  >;
}

export interface SolutionInferenceCancel {
  /** Cancels a job for given solution id. */
  post(
    options: SolutionInferenceCancelParameters,
  ): StreamableMethod<SolutionInferenceCancel200Response | SolutionInferenceCancelDefaultResponse>;
}

export interface SolutionInferenceCreateOrUpdate {
  /** Creates a job trigger for a solution. */
  post(
    options: SolutionInferenceCreateOrUpdateParameters,
  ): StreamableMethod<
    SolutionInferenceCreateOrUpdate202Response | SolutionInferenceCreateOrUpdateDefaultResponse
  >;
}

export interface SolutionInferenceFetch {
  /** Fetches details of triggered job for a solution. */
  post(
    options: SolutionInferenceFetchParameters,
  ): StreamableMethod<SolutionInferenceFetch200Response | SolutionInferenceFetchDefaultResponse>;
}

export interface TillageDataListByPartyId {
  /** Returns a paginated list of tillage data resources under a particular farm. */
  get(
    options?: TillageDataListByPartyIdParameters,
  ): StreamableMethod<
    TillageDataListByPartyId200Response | TillageDataListByPartyIdDefaultResponse
  >;
}

export interface TillageDataGet {
  /** Get a specified tillage data resource under a particular party. */
  get(
    options?: TillageDataGetParameters,
  ): StreamableMethod<TillageDataGet200Response | TillageDataGetDefaultResponse>;
  /** Creates or updates an tillage data resource under a particular party. */
  patch(
    options: TillageDataCreateOrUpdateParameters,
  ): StreamableMethod<
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified tillage data resource under a particular party. */
  delete(
    options?: TillageDataDeleteParameters,
  ): StreamableMethod<TillageDataDelete204Response | TillageDataDeleteDefaultResponse>;
}

export interface TillageDataList {
  /** Returns a paginated list of tillage data resources across all parties. */
  get(
    options?: TillageDataListParameters,
  ): StreamableMethod<TillageDataList200Response | TillageDataListDefaultResponse>;
}

export interface TillageDataCreateCascadeDeleteJob {
  /** Create cascade delete job for tillage data resource. */
  put(
    options: TillageDataCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    TillageDataCreateCascadeDeleteJob202Response | TillageDataCreateCascadeDeleteJobDefaultResponse
  >;
  /** Get cascade delete job for tillage data resource. */
  get(
    options?: TillageDataGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    | TillageDataGetCascadeDeleteJobDetails200Response
    | TillageDataGetCascadeDeleteJobDetailsDefaultResponse
  >;
}

export interface WeatherList {
  /** Returns a paginated list of weather data. */
  get(
    options: WeatherListParameters,
  ): StreamableMethod<WeatherList200Response | WeatherListDefaultResponse>;
}

export interface WeatherGetDataDeleteJobDetails {
  /** Get weather data delete job. */
  get(
    options?: WeatherGetDataDeleteJobDetailsParameters,
  ): StreamableMethod<
    WeatherGetDataDeleteJobDetails200Response | WeatherGetDataDeleteJobDetailsDefaultResponse
  >;
  /** Create a weather data delete job. */
  put(
    options: WeatherCreateDataDeleteJobParameters,
  ): StreamableMethod<
    WeatherCreateDataDeleteJob202Response | WeatherCreateDataDeleteJobDefaultResponse
  >;
}

export interface WeatherGetDataIngestionJobDetails {
  /** Get weather ingestion job. */
  get(
    options?: WeatherGetDataIngestionJobDetailsParameters,
  ): StreamableMethod<
    WeatherGetDataIngestionJobDetails200Response | WeatherGetDataIngestionJobDetailsDefaultResponse
  >;
  /** Create a weather data ingestion job. */
  put(
    options: WeatherCreateDataIngestionJobParameters,
  ): StreamableMethod<
    WeatherCreateDataIngestionJob202Response | WeatherCreateDataIngestionJobDefaultResponse
  >;
}

export interface WeatherDataGet {
  /** Returns a list of WeatherData. */
  post(
    options: WeatherDataGetParameters,
  ): StreamableMethod<WeatherDataGet200Response | WeatherDataGetDefaultResponse>;
}

export interface ZonesListByPartyId {
  /** Returns a paginated list of zone resources under a particular party. */
  get(
    options?: ZonesListByPartyIdParameters,
  ): StreamableMethod<ZonesListByPartyId200Response | ZonesListByPartyIdDefaultResponse>;
}

export interface ZonesGet {
  /** Gets a specified zone resource under a particular party. */
  get(
    options?: ZonesGetParameters,
  ): StreamableMethod<ZonesGet200Response | ZonesGetDefaultResponse>;
  /** Creates or updates a Zone resource. */
  patch(
    options: ZonesCreateOrUpdateParameters,
  ): StreamableMethod<
    | ZonesCreateOrUpdate200Response
    | ZonesCreateOrUpdate201Response
    | ZonesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a specified zone resource under a particular party. */
  delete(
    options?: ZonesDeleteParameters,
  ): StreamableMethod<ZonesDelete204Response | ZonesDeleteDefaultResponse>;
}

export interface ZonesList {
  /** Returns a paginated list of zone resources across all parties. */
  get(
    options?: ZonesListParameters,
  ): StreamableMethod<ZonesList200Response | ZonesListDefaultResponse>;
}

export interface ZonesGetCascadeDeleteJobDetails {
  /** Get a cascade delete job for specified job id. */
  get(
    options?: ZonesGetCascadeDeleteJobDetailsParameters,
  ): StreamableMethod<
    ZonesGetCascadeDeleteJobDetails200Response | ZonesGetCascadeDeleteJobDetailsDefaultResponse
  >;
  /** Create a cascade delete job for specified zone. */
  put(
    options: ZonesCreateCascadeDeleteJobParameters,
  ): StreamableMethod<
    ZonesCreateCascadeDeleteJob202Response | ZonesCreateCascadeDeleteJobDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/application-data' has methods for the following verbs: get */
  (path: "/application-data"): ApplicationDataList;
  /** Resource for '/application-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/application-data/cascade-delete/{jobId}",
    jobId: string,
  ): ApplicationDataCreateCascadeDeleteJob;
  /** Resource for '/parties/\{partyId\}/application-data' has methods for the following verbs: get */
  (path: "/parties/{partyId}/application-data", partyId: string): ApplicationDataListByPartyId;
  /** Resource for '/parties/\{partyId\}/application-data/\{applicationDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/application-data/{applicationDataId}",
    partyId: string,
    applicationDataId: string,
  ): ApplicationDataGet;
  /** Resource for '/parties/\{partyId\}/attachments' has methods for the following verbs: get */
  (path: "/parties/{partyId}/attachments", partyId: string): AttachmentsListByPartyId;
  /** Resource for '/parties/\{partyId\}/attachments/\{attachmentId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/attachments/{attachmentId}",
    partyId: string,
    attachmentId: string,
  ): AttachmentsGet;
  /** Resource for '/parties/\{partyId\}/attachments/\{attachmentId\}/file' has methods for the following verbs: get */
  (
    path: "/parties/{partyId}/attachments/{attachmentId}/file",
    partyId: string,
    attachmentId: string,
  ): AttachmentsDownload;
  /** Resource for '/boundaries' has methods for the following verbs: get, post */
  (path: "/boundaries"): BoundariesList;
  /** Resource for '/boundaries/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/boundaries/cascade-delete/{jobId}", jobId: string): BoundariesCreateCascadeDeleteJob;
  /** Resource for '/parties/\{partyId\}/boundaries' has methods for the following verbs: get, post */
  (path: "/parties/{partyId}/boundaries", partyId: string): BoundariesListByPartyId;
  /** Resource for '/parties/\{partyId\}/boundaries/\{boundaryId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/parties/{partyId}/boundaries/{boundaryId}",
    partyId: string,
    boundaryId: string,
  ): BoundariesCreateOrUpdate;
  /** Resource for '/parties/\{partyId\}/boundaries/\{boundaryId\}/overlap' has methods for the following verbs: get */
  (
    path: "/parties/{partyId}/boundaries/{boundaryId}/overlap",
    partyId: string,
    boundaryId: string,
  ): BoundariesGetOverlap;
  /** Resource for '/crop-products' has methods for the following verbs: get */
  (path: "/crop-products"): CropProductsList;
  /** Resource for '/crop-products/\{cropProductId\}' has methods for the following verbs: get, patch, delete */
  (path: "/crop-products/{cropProductId}", cropProductId: string): CropProductsGet;
  /** Resource for '/crops' has methods for the following verbs: get */
  (path: "/crops"): CropsList;
  /** Resource for '/crops/\{cropId\}' has methods for the following verbs: get, patch, delete */
  (path: "/crops/{cropId}", cropId: string): CropsGet;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/device-data-models' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/device-data-models",
    sensorPartnerId: string,
  ): DeviceDataModelsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/device-data-models/\{deviceDataModelId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}",
    sensorPartnerId: string,
    deviceDataModelId: string,
  ): DeviceDataModelsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/devices' has methods for the following verbs: get */
  (path: "/sensor-partners/{sensorPartnerId}/devices", sensorPartnerId: string): DevicesList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/devices/\{deviceId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/devices/{deviceId}",
    sensorPartnerId: string,
    deviceId: string,
  ): DevicesCreateOrUpdate;
  /** Resource for '/farm-operations/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/farm-operations/ingest-data/{jobId}",
    jobId: string,
  ): FarmOperationsCreateDataIngestionJob;
  /** Resource for '/farms' has methods for the following verbs: get */
  (path: "/farms"): FarmsList;
  /** Resource for '/farms/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/farms/cascade-delete/{jobId}", jobId: string): FarmsCreateCascadeDeleteJob;
  /** Resource for '/parties/\{partyId\}/farms' has methods for the following verbs: get */
  (path: "/parties/{partyId}/farms", partyId: string): FarmsListByPartyId;
  /** Resource for '/parties/\{partyId\}/farms/\{farmId\}' has methods for the following verbs: get, patch, delete */
  (path: "/parties/{partyId}/farms/{farmId}", partyId: string, farmId: string): FarmsGet;
  /** Resource for '/fields' has methods for the following verbs: get */
  (path: "/fields"): FieldsList;
  /** Resource for '/fields/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/fields/cascade-delete/{jobId}", jobId: string): FieldsGetCascadeDeleteJobDetails;
  /** Resource for '/parties/\{partyId\}/fields' has methods for the following verbs: get */
  (path: "/parties/{partyId}/fields", partyId: string): FieldsListByPartyId;
  /** Resource for '/parties/\{partyId\}/fields/\{fieldId\}' has methods for the following verbs: get, patch, delete */
  (path: "/parties/{partyId}/fields/{fieldId}", partyId: string, fieldId: string): FieldsGet;
  /** Resource for '/harvest-data' has methods for the following verbs: get */
  (path: "/harvest-data"): HarvestDataList;
  /** Resource for '/harvest-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/harvest-data/cascade-delete/{jobId}", jobId: string): HarvestDataCreateCascadeDeleteJob;
  /** Resource for '/parties/\{partyId\}/harvest-data' has methods for the following verbs: get */
  (path: "/parties/{partyId}/harvest-data", partyId: string): HarvestDataListByPartyId;
  /** Resource for '/parties/\{partyId\}/harvest-data/\{harvestDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/harvest-data/{harvestDataId}",
    partyId: string,
    harvestDataId: string,
  ): HarvestDataGet;
  /** Resource for '/image-processing/rasterize/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/image-processing/rasterize/{jobId}", jobId: string): ImageProcessingCreateRasterizeJob;
  /** Resource for '/parties/\{partyId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insight-attachments' has methods for the following verbs: get */
  (
    path: "/parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments",
    partyId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
  ): InsightAttachmentsListByPartyIdModelIdAndResource;
  /** Resource for '/parties/\{partyId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insight-attachments/\{insightAttachmentId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}",
    partyId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
    insightAttachmentId: string,
  ): InsightAttachmentsCreateOrUpdate;
  /** Resource for '/parties/\{partyId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insight-attachments/\{insightAttachmentId\}/file' has methods for the following verbs: get */
  (
    path: "/parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}/file",
    partyId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
    insightAttachmentId: string,
  ): InsightAttachmentsDownload;
  /** Resource for '/insights/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/insights/cascade-delete/{jobId}", jobId: string): InsightsCreateCascadeDeleteJob;
  /** Resource for '/parties/\{partyId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insights' has methods for the following verbs: get */
  (
    path: "/parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights",
    partyId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
  ): InsightsListByPartyIdModelIdAndResource;
  /** Resource for '/parties/\{partyId\}/models/\{modelId\}/resource-types/\{resourceType\}/resources/\{resourceId\}/insights/\{insightId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}",
    partyId: string,
    modelId: string,
    resourceType: string,
    resourceId: string,
    insightId: string,
  ): InsightsCreateOrUpdate;
  /** Resource for '/management-zones' has methods for the following verbs: get */
  (path: "/management-zones"): ManagementZonesList;
  /** Resource for '/management-zones/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/management-zones/cascade-delete/{jobId}",
    jobId: string,
  ): ManagementZonesGetCascadeDeleteJobDetails;
  /** Resource for '/parties/\{partyId\}/management-zones' has methods for the following verbs: get */
  (path: "/parties/{partyId}/management-zones", partyId: string): ManagementZonesListByPartyId;
  /** Resource for '/parties/\{partyId\}/management-zones/\{managementZoneId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/management-zones/{managementZoneId}",
    partyId: string,
    managementZoneId: string,
  ): ManagementZonesGet;
  /** Resource for '/model-inference/models/microsoft-biomass/infer-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/model-inference/models/microsoft-biomass/infer-data/{jobId}",
    jobId: string,
  ): ModelInferenceCreateBiomassModelJob;
  /** Resource for '/model-inference/models/microsoft-sensor-placement/infer-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/model-inference/models/microsoft-sensor-placement/infer-data/{jobId}",
    jobId: string,
  ): ModelInferenceCreateSensorPlacementModelJob;
  /** Resource for '/model-inference/models/microsoft-soil-moisture/infer-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/model-inference/models/microsoft-soil-moisture/infer-data/{jobId}",
    jobId: string,
  ): ModelInferenceCreateSoilMoistureModelJob;
  /** Resource for '/nutrient-analyses' has methods for the following verbs: get */
  (path: "/nutrient-analyses"): NutrientAnalysesList;
  /** Resource for '/parties/\{partyId\}/nutrient-analyses' has methods for the following verbs: get */
  (path: "/parties/{partyId}/nutrient-analyses", partyId: string): NutrientAnalysesListByPartyId;
  /** Resource for '/parties/\{partyId\}/nutrient-analyses/\{nutrientAnalysisId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/nutrient-analyses/{nutrientAnalysisId}",
    partyId: string,
    nutrientAnalysisId: string,
  ): NutrientAnalysesGet;
  /** Resource for '/oauth/providers' has methods for the following verbs: get */
  (path: "/oauth/providers"): OAuthProvidersList;
  /** Resource for '/oauth/providers/\{oauthProviderId\}' has methods for the following verbs: get, patch, delete */
  (path: "/oauth/providers/{oauthProviderId}", oauthProviderId: string): OAuthProvidersGet;
  /** Resource for '/oauth/providers/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/oauth/providers/cascade-delete/{jobId}",
    jobId: string,
  ): OAuthProvidersGetCascadeDeleteJobDetails;
  /** Resource for '/oauth/tokens' has methods for the following verbs: get */
  (path: "/oauth/tokens"): OAuthTokensList;
  /** Resource for '/oauth/tokens/:connect' has methods for the following verbs: post */
  (path: "/oauth/tokens/:connect"): OAuthTokensGetOAuthConnectionLink;
  /** Resource for '/oauth/tokens/remove/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/oauth/tokens/remove/{jobId}", jobId: string): OAuthTokensGetCascadeDeleteJobDetails;
  /** Resource for '/parties' has methods for the following verbs: get */
  (path: "/parties"): PartiesList;
  /** Resource for '/parties/\{partyId\}' has methods for the following verbs: get, patch, delete */
  (path: "/parties/{partyId}", partyId: string): PartiesGet;
  /** Resource for '/parties/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/parties/cascade-delete/{jobId}", jobId: string): PartiesGetCascadeDeleteJobDetails;
  /** Resource for '/parties/\{partyId\}/planting-data' has methods for the following verbs: get */
  (path: "/parties/{partyId}/planting-data", partyId: string): PlantingDataListByPartyId;
  /** Resource for '/parties/\{partyId\}/planting-data/\{plantingDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/planting-data/{plantingDataId}",
    partyId: string,
    plantingDataId: string,
  ): PlantingDataGet;
  /** Resource for '/planting-data' has methods for the following verbs: get */
  (path: "/planting-data"): PlantingDataList;
  /** Resource for '/planting-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/planting-data/cascade-delete/{jobId}",
    jobId: string,
  ): PlantingDataCreateCascadeDeleteJob;
  /** Resource for '/parties/\{partyId\}/plant-tissue-analyses' has methods for the following verbs: get */
  (
    path: "/parties/{partyId}/plant-tissue-analyses",
    partyId: string,
  ): PlantTissueAnalysesListByPartyId;
  /** Resource for '/parties/\{partyId\}/plant-tissue-analyses/\{plantTissueAnalysisId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/plant-tissue-analyses/{plantTissueAnalysisId}",
    partyId: string,
    plantTissueAnalysisId: string,
  ): PlantTissueAnalysesGet;
  /** Resource for '/plant-tissue-analyses' has methods for the following verbs: get */
  (path: "/plant-tissue-analyses"): PlantTissueAnalysesList;
  /** Resource for '/plant-tissue-analyses/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/plant-tissue-analyses/cascade-delete/{jobId}",
    jobId: string,
  ): PlantTissueAnalysesCreateCascadeDeleteJob;
  /** Resource for '/parties/\{partyId\}/prescription-maps' has methods for the following verbs: get */
  (path: "/parties/{partyId}/prescription-maps", partyId: string): PrescriptionMapsListByPartyId;
  /** Resource for '/parties/\{partyId\}/prescription-maps/\{prescriptionMapId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/prescription-maps/{prescriptionMapId}",
    partyId: string,
    prescriptionMapId: string,
  ): PrescriptionMapsGet;
  /** Resource for '/prescription-maps' has methods for the following verbs: get */
  (path: "/prescription-maps"): PrescriptionMapsList;
  /** Resource for '/prescription-maps/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/prescription-maps/cascade-delete/{jobId}",
    jobId: string,
  ): PrescriptionMapsGetCascadeDeleteJobDetails;
  /** Resource for '/parties/\{partyId\}/prescriptions' has methods for the following verbs: get */
  (path: "/parties/{partyId}/prescriptions", partyId: string): PrescriptionsListByPartyId;
  /** Resource for '/parties/\{partyId\}/prescriptions/\{prescriptionId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/prescriptions/{prescriptionId}",
    partyId: string,
    prescriptionId: string,
  ): PrescriptionsGet;
  /** Resource for '/prescriptions' has methods for the following verbs: get */
  (path: "/prescriptions"): PrescriptionsList;
  /** Resource for '/prescriptions/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/prescriptions/cascade-delete/{jobId}",
    jobId: string,
  ): PrescriptionsGetCascadeDeleteJobDetails;
  /** Resource for '/scenes' has methods for the following verbs: get */
  (path: "/scenes"): ScenesList;
  /** Resource for '/scenes/downloadFiles' has methods for the following verbs: get */
  (path: "/scenes/downloadFiles"): ScenesDownload;
  /** Resource for '/scenes/satellite/ingest-data/\{jobId\}' has methods for the following verbs: put, get */
  (
    path: "/scenes/satellite/ingest-data/{jobId}",
    jobId: string,
  ): ScenesCreateSatelliteDataIngestionJob;
  /** Resource for '/scenes/stac-collections/\{collectionId\}:search' has methods for the following verbs: post */
  (
    path: "/scenes/stac-collections/{collectionId}:search",
    collectionId: "Sentinel_2_L2A" | "Sentinel_2_L1C",
  ): ScenesSearchFeatures;
  /** Resource for '/scenes/stac-collections/\{collectionId\}/features/\{featureId\}' has methods for the following verbs: get */
  (
    path: "/scenes/stac-collections/{collectionId}/features/{featureId}",
    collectionId: "Sentinel_2_L2A" | "Sentinel_2_L1C",
    featureId: string,
  ): ScenesGetStacFeature;
  /** Resource for '/parties/\{partyId\}/seasonal-fields' has methods for the following verbs: get */
  (path: "/parties/{partyId}/seasonal-fields", partyId: string): SeasonalFieldsListByPartyId;
  /** Resource for '/parties/\{partyId\}/seasonal-fields/\{seasonalFieldId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/seasonal-fields/{seasonalFieldId}",
    partyId: string,
    seasonalFieldId: string,
  ): SeasonalFieldsGet;
  /** Resource for '/seasonal-fields' has methods for the following verbs: get */
  (path: "/seasonal-fields"): SeasonalFieldsList;
  /** Resource for '/seasonal-fields/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (
    path: "/seasonal-fields/cascade-delete/{jobId}",
    jobId: string,
  ): SeasonalFieldsGetCascadeDeleteJobDetails;
  /** Resource for '/seasons' has methods for the following verbs: get */
  (path: "/seasons"): SeasonsList;
  /** Resource for '/seasons/\{seasonId\}' has methods for the following verbs: get, patch, delete */
  (path: "/seasons/{seasonId}", seasonId: string): SeasonsGet;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensor-data-models' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensor-data-models",
    sensorPartnerId: string,
  ): SensorDataModelsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensor-data-models/\{sensorDataModelId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}",
    sensorPartnerId: string,
    sensorDataModelId: string,
  ): SensorDataModelsCreateOrUpdate;
  /** Resource for '/sensor-events' has methods for the following verbs: get */
  (path: "/sensor-events"): SensorEventsList;
  /** Resource for '/sensor-mappings' has methods for the following verbs: get */
  (path: "/sensor-mappings"): SensorMappingsList;
  /** Resource for '/sensor-mappings/\{sensorMappingId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-mappings/{sensorMappingId}",
    sensorMappingId: string,
  ): SensorMappingsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations",
    sensorPartnerId: string,
  ): SensorPartnerIntegrationsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations/\{integrationId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations/{integrationId}",
    sensorPartnerId: string,
    integrationId: string,
  ): SensorPartnerIntegrationsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations/\{integrationId\}/:check-consent' has methods for the following verbs: post */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:check-consent",
    sensorPartnerId: string,
    integrationId: string,
  ): SensorPartnerIntegrationsCheckConsent;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/integrations/\{integrationId\}/:generate-consent-link' has methods for the following verbs: post */
  (
    path: "/sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:generate-consent-link",
    sensorPartnerId: string,
    integrationId: string,
  ): SensorPartnerIntegrationsGenerateConsentLink;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors' has methods for the following verbs: get */
  (path: "/sensor-partners/{sensorPartnerId}/sensors", sensorPartnerId: string): SensorsList;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors/\{sensorId\}' has methods for the following verbs: patch, get, delete */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensors/{sensorId}",
    sensorPartnerId: string,
    sensorId: string,
  ): SensorsCreateOrUpdate;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors/\{sensorId\}/connection-strings' has methods for the following verbs: get */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings",
    sensorPartnerId: string,
    sensorId: string,
  ): SensorsGetConnectionString;
  /** Resource for '/sensor-partners/\{sensorPartnerId\}/sensors/\{sensorId\}/connection-strings/:renew' has methods for the following verbs: post */
  (
    path: "/sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings/:renew",
    sensorPartnerId: string,
    sensorId: string,
  ): SensorsRenewConnectionString;
  /** Resource for '/solutions/\{solutionId\}:cancel' has methods for the following verbs: post */
  (path: "/solutions/{solutionId}:cancel", solutionId: string): SolutionInferenceCancel;
  /** Resource for '/solutions/\{solutionId\}:create' has methods for the following verbs: post */
  (path: "/solutions/{solutionId}:create", solutionId: string): SolutionInferenceCreateOrUpdate;
  /** Resource for '/solutions/\{solutionId\}:fetch' has methods for the following verbs: post */
  (path: "/solutions/{solutionId}:fetch", solutionId: string): SolutionInferenceFetch;
  /** Resource for '/parties/\{partyId\}/tillage-data' has methods for the following verbs: get */
  (path: "/parties/{partyId}/tillage-data", partyId: string): TillageDataListByPartyId;
  /** Resource for '/parties/\{partyId\}/tillage-data/\{tillageDataId\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/parties/{partyId}/tillage-data/{tillageDataId}",
    partyId: string,
    tillageDataId: string,
  ): TillageDataGet;
  /** Resource for '/tillage-data' has methods for the following verbs: get */
  (path: "/tillage-data"): TillageDataList;
  /** Resource for '/tillage-data/cascade-delete/\{jobId\}' has methods for the following verbs: put, get */
  (path: "/tillage-data/cascade-delete/{jobId}", jobId: string): TillageDataCreateCascadeDeleteJob;
  /** Resource for '/weather' has methods for the following verbs: get */
  (path: "/weather"): WeatherList;
  /** Resource for '/weather/delete-data/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/weather/delete-data/{jobId}", jobId: string): WeatherGetDataDeleteJobDetails;
  /** Resource for '/weather/ingest-data/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/weather/ingest-data/{jobId}", jobId: string): WeatherGetDataIngestionJobDetails;
  /** Resource for '/weather-data/:fetch' has methods for the following verbs: post */
  (path: "/weather-data/:fetch"): WeatherDataGet;
  /** Resource for '/parties/\{partyId\}/zones' has methods for the following verbs: get */
  (path: "/parties/{partyId}/zones", partyId: string): ZonesListByPartyId;
  /** Resource for '/parties/\{partyId\}/zones/\{zoneId\}' has methods for the following verbs: get, patch, delete */
  (path: "/parties/{partyId}/zones/{zoneId}", partyId: string, zoneId: string): ZonesGet;
  /** Resource for '/zones' has methods for the following verbs: get */
  (path: "/zones"): ZonesList;
  /** Resource for '/zones/cascade-delete/\{jobId\}' has methods for the following verbs: get, put */
  (path: "/zones/cascade-delete/{jobId}", jobId: string): ZonesGetCascadeDeleteJobDetails;
}

export type FarmBeatsClient = Client & {
  path: Routes;
};
