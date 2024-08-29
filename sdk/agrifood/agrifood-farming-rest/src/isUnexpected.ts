// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

const responseMap: Record<string, string[]> = {
  "GET /application-data": ["200"],
  "PUT /application-data/cascade-delete/{jobId}": ["202"],
  "GET /application-data/cascade-delete/{jobId}": ["200"],
  "GET /parties/{partyId}/application-data": ["200"],
  "GET /parties/{partyId}/application-data/{applicationDataId}": ["200"],
  "PATCH /parties/{partyId}/application-data/{applicationDataId}": ["200", "201"],
  "DELETE /parties/{partyId}/application-data/{applicationDataId}": ["204"],
  "GET /parties/{partyId}/attachments": ["200"],
  "GET /parties/{partyId}/attachments/{attachmentId}": ["200"],
  "PATCH /parties/{partyId}/attachments/{attachmentId}": ["200", "201"],
  "DELETE /parties/{partyId}/attachments/{attachmentId}": ["204"],
  "GET /parties/{partyId}/attachments/{attachmentId}/file": ["200"],
  "GET /boundaries": ["200"],
  "POST /boundaries": ["200"],
  "PUT /boundaries/cascade-delete/{jobId}": ["202"],
  "GET /boundaries/cascade-delete/{jobId}": ["200"],
  "GET /parties/{partyId}/boundaries": ["200"],
  "POST /parties/{partyId}/boundaries": ["200"],
  "PATCH /parties/{partyId}/boundaries/{boundaryId}": ["200", "201"],
  "GET /parties/{partyId}/boundaries/{boundaryId}": ["200"],
  "DELETE /parties/{partyId}/boundaries/{boundaryId}": ["204"],
  "GET /parties/{partyId}/boundaries/{boundaryId}/overlap": ["200"],
  "GET /crop-products": ["200"],
  "GET /crop-products/{cropProductId}": ["200"],
  "PATCH /crop-products/{cropProductId}": ["200", "201"],
  "DELETE /crop-products/{cropProductId}": ["204"],
  "GET /crops": ["200"],
  "GET /crops/{cropId}": ["200"],
  "PATCH /crops/{cropId}": ["200", "201"],
  "DELETE /crops/{cropId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/device-data-models": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}": ["200", "201"],
  "GET /sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}": ["200"],
  "DELETE /sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/devices": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/devices/{deviceId}": ["200", "201"],
  "GET /sensor-partners/{sensorPartnerId}/devices/{deviceId}": ["200"],
  "DELETE /sensor-partners/{sensorPartnerId}/devices/{deviceId}": ["204"],
  "PUT /farm-operations/ingest-data/{jobId}": ["202"],
  "GET /farm-operations/ingest-data/{jobId}": ["200"],
  "GET /farms": ["200"],
  "PUT /farms/cascade-delete/{jobId}": ["202"],
  "GET /farms/cascade-delete/{jobId}": ["200"],
  "GET /parties/{partyId}/farms": ["200"],
  "GET /parties/{partyId}/farms/{farmId}": ["200"],
  "PATCH /parties/{partyId}/farms/{farmId}": ["200", "201"],
  "DELETE /parties/{partyId}/farms/{farmId}": ["204"],
  "GET /fields": ["200"],
  "GET /fields/cascade-delete/{jobId}": ["200"],
  "PUT /fields/cascade-delete/{jobId}": ["202"],
  "GET /parties/{partyId}/fields": ["200"],
  "GET /parties/{partyId}/fields/{fieldId}": ["200"],
  "PATCH /parties/{partyId}/fields/{fieldId}": ["200", "201"],
  "DELETE /parties/{partyId}/fields/{fieldId}": ["204"],
  "GET /harvest-data": ["200"],
  "PUT /harvest-data/cascade-delete/{jobId}": ["202"],
  "GET /harvest-data/cascade-delete/{jobId}": ["200"],
  "GET /parties/{partyId}/harvest-data": ["200"],
  "GET /parties/{partyId}/harvest-data/{harvestDataId}": ["200"],
  "PATCH /parties/{partyId}/harvest-data/{harvestDataId}": ["200", "201"],
  "DELETE /parties/{partyId}/harvest-data/{harvestDataId}": ["204"],
  "PUT /image-processing/rasterize/{jobId}": ["202"],
  "GET /image-processing/rasterize/{jobId}": ["200"],
  "GET /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments":
    ["200"],
  "PATCH /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}":
    ["200", "201"],
  "GET /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}":
    ["200"],
  "DELETE /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}":
    ["204"],
  "GET /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}/file":
    ["200"],
  "PUT /insights/cascade-delete/{jobId}": ["202"],
  "GET /insights/cascade-delete/{jobId}": ["200"],
  "GET /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights":
    ["200"],
  "PATCH /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}":
    ["200", "201"],
  "GET /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}":
    ["200"],
  "DELETE /parties/{partyId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}":
    ["204"],
  "GET /management-zones": ["200"],
  "GET /management-zones/cascade-delete/{jobId}": ["200"],
  "PUT /management-zones/cascade-delete/{jobId}": ["202"],
  "GET /parties/{partyId}/management-zones": ["200"],
  "GET /parties/{partyId}/management-zones/{managementZoneId}": ["200"],
  "PATCH /parties/{partyId}/management-zones/{managementZoneId}": ["200", "201"],
  "DELETE /parties/{partyId}/management-zones/{managementZoneId}": ["204"],
  "PUT /model-inference/models/microsoft-biomass/infer-data/{jobId}": ["202"],
  "GET /model-inference/models/microsoft-biomass/infer-data/{jobId}": ["200"],
  "PUT /model-inference/models/microsoft-sensor-placement/infer-data/{jobId}": ["202"],
  "GET /model-inference/models/microsoft-sensor-placement/infer-data/{jobId}": ["200"],
  "PUT /model-inference/models/microsoft-soil-moisture/infer-data/{jobId}": ["202"],
  "GET /model-inference/models/microsoft-soil-moisture/infer-data/{jobId}": ["200"],
  "GET /nutrient-analyses": ["200"],
  "GET /parties/{partyId}/nutrient-analyses": ["200"],
  "GET /parties/{partyId}/nutrient-analyses/{nutrientAnalysisId}": ["200"],
  "PATCH /parties/{partyId}/nutrient-analyses/{nutrientAnalysisId}": ["200", "201"],
  "DELETE /parties/{partyId}/nutrient-analyses/{nutrientAnalysisId}": ["204"],
  "GET /oauth/providers": ["200"],
  "GET /oauth/providers/{oauthProviderId}": ["200"],
  "PATCH /oauth/providers/{oauthProviderId}": ["200", "201"],
  "DELETE /oauth/providers/{oauthProviderId}": ["204"],
  "GET /oauth/providers/cascade-delete/{jobId}": ["200"],
  "PUT /oauth/providers/cascade-delete/{jobId}": ["202"],
  "GET /oauth/tokens": ["200"],
  "POST /oauth/tokens/:connect": ["200"],
  "GET /oauth/tokens/remove/{jobId}": ["200"],
  "PUT /oauth/tokens/remove/{jobId}": ["202"],
  "GET /parties": ["200"],
  "GET /parties/{partyId}": ["200"],
  "PATCH /parties/{partyId}": ["200", "201"],
  "DELETE /parties/{partyId}": ["204"],
  "GET /parties/cascade-delete/{jobId}": ["200"],
  "PUT /parties/cascade-delete/{jobId}": ["202"],
  "GET /parties/{partyId}/planting-data": ["200"],
  "GET /parties/{partyId}/planting-data/{plantingDataId}": ["200"],
  "PATCH /parties/{partyId}/planting-data/{plantingDataId}": ["200", "201"],
  "DELETE /parties/{partyId}/planting-data/{plantingDataId}": ["204"],
  "GET /planting-data": ["200"],
  "PUT /planting-data/cascade-delete/{jobId}": ["202"],
  "GET /planting-data/cascade-delete/{jobId}": ["200"],
  "GET /parties/{partyId}/plant-tissue-analyses": ["200"],
  "GET /parties/{partyId}/plant-tissue-analyses/{plantTissueAnalysisId}": ["200"],
  "PATCH /parties/{partyId}/plant-tissue-analyses/{plantTissueAnalysisId}": ["200", "201"],
  "DELETE /parties/{partyId}/plant-tissue-analyses/{plantTissueAnalysisId}": ["204"],
  "GET /plant-tissue-analyses": ["200"],
  "PUT /plant-tissue-analyses/cascade-delete/{jobId}": ["202"],
  "GET /plant-tissue-analyses/cascade-delete/{jobId}": ["200"],
  "GET /parties/{partyId}/prescription-maps": ["200"],
  "GET /parties/{partyId}/prescription-maps/{prescriptionMapId}": ["200"],
  "PATCH /parties/{partyId}/prescription-maps/{prescriptionMapId}": ["200", "201"],
  "DELETE /parties/{partyId}/prescription-maps/{prescriptionMapId}": ["204"],
  "GET /prescription-maps": ["200"],
  "GET /prescription-maps/cascade-delete/{jobId}": ["200"],
  "PUT /prescription-maps/cascade-delete/{jobId}": ["202"],
  "GET /parties/{partyId}/prescriptions": ["200"],
  "GET /parties/{partyId}/prescriptions/{prescriptionId}": ["200"],
  "PATCH /parties/{partyId}/prescriptions/{prescriptionId}": ["200", "201"],
  "DELETE /parties/{partyId}/prescriptions/{prescriptionId}": ["204"],
  "GET /prescriptions": ["200"],
  "GET /prescriptions/cascade-delete/{jobId}": ["200"],
  "PUT /prescriptions/cascade-delete/{jobId}": ["202"],
  "GET /scenes": ["200"],
  "GET /scenes/downloadFiles": ["200"],
  "PUT /scenes/satellite/ingest-data/{jobId}": ["202"],
  "GET /scenes/satellite/ingest-data/{jobId}": ["200"],
  "POST /scenes/stac-collections/{collectionId}:search": ["200"],
  "GET /scenes/stac-collections/{collectionId}/features/{featureId}": ["200"],
  "GET /parties/{partyId}/seasonal-fields": ["200"],
  "GET /parties/{partyId}/seasonal-fields/{seasonalFieldId}": ["200"],
  "PATCH /parties/{partyId}/seasonal-fields/{seasonalFieldId}": ["200", "201"],
  "DELETE /parties/{partyId}/seasonal-fields/{seasonalFieldId}": ["204"],
  "GET /seasonal-fields": ["200"],
  "GET /seasonal-fields/cascade-delete/{jobId}": ["200"],
  "PUT /seasonal-fields/cascade-delete/{jobId}": ["202"],
  "GET /seasons": ["200"],
  "GET /seasons/{seasonId}": ["200"],
  "PATCH /seasons/{seasonId}": ["200", "201"],
  "DELETE /seasons/{seasonId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/sensor-data-models": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}": ["200", "201"],
  "GET /sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}": ["200"],
  "DELETE /sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}": ["204"],
  "GET /sensor-events": ["200"],
  "GET /sensor-mappings": ["200"],
  "PATCH /sensor-mappings/{sensorMappingId}": ["200", "201"],
  "GET /sensor-mappings/{sensorMappingId}": ["200"],
  "DELETE /sensor-mappings/{sensorMappingId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/integrations": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/integrations/{integrationId}": ["200", "201"],
  "GET /sensor-partners/{sensorPartnerId}/integrations/{integrationId}": ["200"],
  "DELETE /sensor-partners/{sensorPartnerId}/integrations/{integrationId}": ["204"],
  "POST /sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:check-consent": ["200"],
  "POST /sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:generate-consent-link": [
    "200",
  ],
  "GET /sensor-partners/{sensorPartnerId}/sensors": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/sensors/{sensorId}": ["200", "201"],
  "GET /sensor-partners/{sensorPartnerId}/sensors/{sensorId}": ["200"],
  "DELETE /sensor-partners/{sensorPartnerId}/sensors/{sensorId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings": ["200"],
  "POST /sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings/:renew": ["200"],
  "POST /solutions/{solutionId}:cancel": ["200"],
  "POST /solutions/{solutionId}:create": ["202"],
  "GET /solutions/{solutionId}:create": ["202"],
  "POST /solutions/{solutionId}:fetch": ["200"],
  "GET /parties/{partyId}/tillage-data": ["200"],
  "GET /parties/{partyId}/tillage-data/{tillageDataId}": ["200"],
  "PATCH /parties/{partyId}/tillage-data/{tillageDataId}": ["200", "201"],
  "DELETE /parties/{partyId}/tillage-data/{tillageDataId}": ["204"],
  "GET /tillage-data": ["200"],
  "PUT /tillage-data/cascade-delete/{jobId}": ["202"],
  "GET /tillage-data/cascade-delete/{jobId}": ["200"],
  "GET /weather": ["200"],
  "GET /weather/delete-data/{jobId}": ["200"],
  "PUT /weather/delete-data/{jobId}": ["202"],
  "GET /weather/ingest-data/{jobId}": ["200"],
  "PUT /weather/ingest-data/{jobId}": ["202"],
  "POST /weather-data/:fetch": ["200"],
  "GET /parties/{partyId}/zones": ["200"],
  "GET /parties/{partyId}/zones/{zoneId}": ["200"],
  "PATCH /parties/{partyId}/zones/{zoneId}": ["200", "201"],
  "DELETE /parties/{partyId}/zones/{zoneId}": ["204"],
  "GET /zones": ["200"],
  "GET /zones/cascade-delete/{jobId}": ["200"],
  "PUT /zones/cascade-delete/{jobId}": ["202"],
};

export function isUnexpected(
  response: ApplicationDataList200Response | ApplicationDataListDefaultResponse,
): response is ApplicationDataListDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataCreateCascadeDeleteJob202Response
    | ApplicationDataCreateCascadeDeleteJobDefaultResponse,
): response is ApplicationDataCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataGetCascadeDeleteJobDetails200Response
    | ApplicationDataGetCascadeDeleteJobDetailsDefaultResponse,
): response is ApplicationDataGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: ApplicationDataListByPartyId200Response | ApplicationDataListByPartyIdDefaultResponse,
): response is ApplicationDataListByPartyIdDefaultResponse;
export function isUnexpected(
  response: ApplicationDataGet200Response | ApplicationDataGetDefaultResponse,
): response is ApplicationDataGetDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdateDefaultResponse,
): response is ApplicationDataCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ApplicationDataDelete204Response | ApplicationDataDeleteDefaultResponse,
): response is ApplicationDataDeleteDefaultResponse;
export function isUnexpected(
  response: AttachmentsListByPartyId200Response | AttachmentsListByPartyIdDefaultResponse,
): response is AttachmentsListByPartyIdDefaultResponse;
export function isUnexpected(
  response: AttachmentsGet200Response | AttachmentsGetDefaultResponse,
): response is AttachmentsGetDefaultResponse;
export function isUnexpected(
  response:
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdateDefaultResponse,
): response is AttachmentsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: AttachmentsDelete204Response | AttachmentsDeleteDefaultResponse,
): response is AttachmentsDeleteDefaultResponse;
export function isUnexpected(
  response: AttachmentsDownload200Response | AttachmentsDownloadDefaultResponse,
): response is AttachmentsDownloadDefaultResponse;
export function isUnexpected(
  response: BoundariesList200Response | BoundariesListDefaultResponse,
): response is BoundariesListDefaultResponse;
export function isUnexpected(
  response: BoundariesSearch200Response | BoundariesSearchDefaultResponse,
): response is BoundariesSearchDefaultResponse;
export function isUnexpected(
  response:
    | BoundariesCreateCascadeDeleteJob202Response
    | BoundariesCreateCascadeDeleteJobDefaultResponse,
): response is BoundariesCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsDefaultResponse,
): response is BoundariesGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: BoundariesListByPartyId200Response | BoundariesListByPartyIdDefaultResponse,
): response is BoundariesListByPartyIdDefaultResponse;
export function isUnexpected(
  response: BoundariesSearchByPartyId200Response | BoundariesSearchByPartyIdDefaultResponse,
): response is BoundariesSearchByPartyIdDefaultResponse;
export function isUnexpected(
  response:
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdateDefaultResponse,
): response is BoundariesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: BoundariesGet200Response | BoundariesGetDefaultResponse,
): response is BoundariesGetDefaultResponse;
export function isUnexpected(
  response: BoundariesDelete204Response | BoundariesDeleteDefaultResponse,
): response is BoundariesDeleteDefaultResponse;
export function isUnexpected(
  response: BoundariesGetOverlap200Response | BoundariesGetOverlapDefaultResponse,
): response is BoundariesGetOverlapDefaultResponse;
export function isUnexpected(
  response: CropProductsList200Response | CropProductsListDefaultResponse,
): response is CropProductsListDefaultResponse;
export function isUnexpected(
  response: CropProductsGet200Response | CropProductsGetDefaultResponse,
): response is CropProductsGetDefaultResponse;
export function isUnexpected(
  response:
    | CropProductsCreateOrUpdate200Response
    | CropProductsCreateOrUpdate201Response
    | CropProductsCreateOrUpdateDefaultResponse,
): response is CropProductsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: CropProductsDelete204Response | CropProductsDeleteDefaultResponse,
): response is CropProductsDeleteDefaultResponse;
export function isUnexpected(
  response: CropsList200Response | CropsListDefaultResponse,
): response is CropsListDefaultResponse;
export function isUnexpected(
  response: CropsGet200Response | CropsGetDefaultResponse,
): response is CropsGetDefaultResponse;
export function isUnexpected(
  response:
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdateDefaultResponse,
): response is CropsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: CropsDelete204Response | CropsDeleteDefaultResponse,
): response is CropsDeleteDefaultResponse;
export function isUnexpected(
  response: DeviceDataModelsList200Response | DeviceDataModelsListDefaultResponse,
): response is DeviceDataModelsListDefaultResponse;
export function isUnexpected(
  response:
    | DeviceDataModelsCreateOrUpdate200Response
    | DeviceDataModelsCreateOrUpdate201Response
    | DeviceDataModelsCreateOrUpdateDefaultResponse,
): response is DeviceDataModelsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: DeviceDataModelsGet200Response | DeviceDataModelsGetDefaultResponse,
): response is DeviceDataModelsGetDefaultResponse;
export function isUnexpected(
  response: DeviceDataModelsDelete204Response | DeviceDataModelsDeleteDefaultResponse,
): response is DeviceDataModelsDeleteDefaultResponse;
export function isUnexpected(
  response: DevicesList200Response | DevicesListDefaultResponse,
): response is DevicesListDefaultResponse;
export function isUnexpected(
  response:
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdateDefaultResponse,
): response is DevicesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: DevicesGet200Response | DevicesGetDefaultResponse,
): response is DevicesGetDefaultResponse;
export function isUnexpected(
  response: DevicesDelete204Response | DevicesDeleteDefaultResponse,
): response is DevicesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobDefaultResponse,
): response is FarmOperationsCreateDataIngestionJobDefaultResponse;
export function isUnexpected(
  response:
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsDefaultResponse,
): response is FarmOperationsGetDataIngestionJobDetailsDefaultResponse;
export function isUnexpected(
  response: FarmsList200Response | FarmsListDefaultResponse,
): response is FarmsListDefaultResponse;
export function isUnexpected(
  response: FarmsCreateCascadeDeleteJob202Response | FarmsCreateCascadeDeleteJobDefaultResponse,
): response is FarmsCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | FarmsGetCascadeDeleteJobDetails200Response
    | FarmsGetCascadeDeleteJobDetailsDefaultResponse,
): response is FarmsGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: FarmsListByPartyId200Response | FarmsListByPartyIdDefaultResponse,
): response is FarmsListByPartyIdDefaultResponse;
export function isUnexpected(
  response: FarmsGet200Response | FarmsGetDefaultResponse,
): response is FarmsGetDefaultResponse;
export function isUnexpected(
  response:
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdateDefaultResponse,
): response is FarmsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: FarmsDelete204Response | FarmsDeleteDefaultResponse,
): response is FarmsDeleteDefaultResponse;
export function isUnexpected(
  response: FieldsList200Response | FieldsListDefaultResponse,
): response is FieldsListDefaultResponse;
export function isUnexpected(
  response:
    | FieldsGetCascadeDeleteJobDetails200Response
    | FieldsGetCascadeDeleteJobDetailsDefaultResponse,
): response is FieldsGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: FieldsCreateCascadeDeleteJob202Response | FieldsCreateCascadeDeleteJobDefaultResponse,
): response is FieldsCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: FieldsListByPartyId200Response | FieldsListByPartyIdDefaultResponse,
): response is FieldsListByPartyIdDefaultResponse;
export function isUnexpected(
  response: FieldsGet200Response | FieldsGetDefaultResponse,
): response is FieldsGetDefaultResponse;
export function isUnexpected(
  response:
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdateDefaultResponse,
): response is FieldsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: FieldsDelete204Response | FieldsDeleteDefaultResponse,
): response is FieldsDeleteDefaultResponse;
export function isUnexpected(
  response: HarvestDataList200Response | HarvestDataListDefaultResponse,
): response is HarvestDataListDefaultResponse;
export function isUnexpected(
  response:
    | HarvestDataCreateCascadeDeleteJob202Response
    | HarvestDataCreateCascadeDeleteJobDefaultResponse,
): response is HarvestDataCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | HarvestDataGetCascadeDeleteJobDetails200Response
    | HarvestDataGetCascadeDeleteJobDetailsDefaultResponse,
): response is HarvestDataGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: HarvestDataListByPartyId200Response | HarvestDataListByPartyIdDefaultResponse,
): response is HarvestDataListByPartyIdDefaultResponse;
export function isUnexpected(
  response: HarvestDataGet200Response | HarvestDataGetDefaultResponse,
): response is HarvestDataGetDefaultResponse;
export function isUnexpected(
  response:
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdateDefaultResponse,
): response is HarvestDataCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: HarvestDataDelete204Response | HarvestDataDeleteDefaultResponse,
): response is HarvestDataDeleteDefaultResponse;
export function isUnexpected(
  response:
    | ImageProcessingCreateRasterizeJob202Response
    | ImageProcessingCreateRasterizeJobDefaultResponse,
): response is ImageProcessingCreateRasterizeJobDefaultResponse;
export function isUnexpected(
  response:
    | ImageProcessingGetRasterizeJob200Response
    | ImageProcessingGetRasterizeJobDefaultResponse,
): response is ImageProcessingGetRasterizeJobDefaultResponse;
export function isUnexpected(
  response:
    | InsightAttachmentsListByPartyIdModelIdAndResource200Response
    | InsightAttachmentsListByPartyIdModelIdAndResourceDefaultResponse,
): response is InsightAttachmentsListByPartyIdModelIdAndResourceDefaultResponse;
export function isUnexpected(
  response:
    | InsightAttachmentsCreateOrUpdate200Response
    | InsightAttachmentsCreateOrUpdate201Response
    | InsightAttachmentsCreateOrUpdateDefaultResponse,
): response is InsightAttachmentsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: InsightAttachmentsGet200Response | InsightAttachmentsGetDefaultResponse,
): response is InsightAttachmentsGetDefaultResponse;
export function isUnexpected(
  response: InsightAttachmentsDelete204Response | InsightAttachmentsDeleteDefaultResponse,
): response is InsightAttachmentsDeleteDefaultResponse;
export function isUnexpected(
  response: InsightAttachmentsDownload200Response | InsightAttachmentsDownloadDefaultResponse,
): response is InsightAttachmentsDownloadDefaultResponse;
export function isUnexpected(
  response:
    | InsightsCreateCascadeDeleteJob202Response
    | InsightsCreateCascadeDeleteJobDefaultResponse,
): response is InsightsCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | InsightsGetCascadeDeleteJobDetails200Response
    | InsightsGetCascadeDeleteJobDetailsDefaultResponse,
): response is InsightsGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | InsightsListByPartyIdModelIdAndResource200Response
    | InsightsListByPartyIdModelIdAndResourceDefaultResponse,
): response is InsightsListByPartyIdModelIdAndResourceDefaultResponse;
export function isUnexpected(
  response:
    | InsightsCreateOrUpdate200Response
    | InsightsCreateOrUpdate201Response
    | InsightsCreateOrUpdateDefaultResponse,
): response is InsightsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: InsightsGet200Response | InsightsGetDefaultResponse,
): response is InsightsGetDefaultResponse;
export function isUnexpected(
  response: InsightsDelete204Response | InsightsDeleteDefaultResponse,
): response is InsightsDeleteDefaultResponse;
export function isUnexpected(
  response: ManagementZonesList200Response | ManagementZonesListDefaultResponse,
): response is ManagementZonesListDefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesGetCascadeDeleteJobDetails200Response
    | ManagementZonesGetCascadeDeleteJobDetailsDefaultResponse,
): response is ManagementZonesGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesCreateCascadeDeleteJob202Response
    | ManagementZonesCreateCascadeDeleteJobDefaultResponse,
): response is ManagementZonesCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: ManagementZonesListByPartyId200Response | ManagementZonesListByPartyIdDefaultResponse,
): response is ManagementZonesListByPartyIdDefaultResponse;
export function isUnexpected(
  response: ManagementZonesGet200Response | ManagementZonesGetDefaultResponse,
): response is ManagementZonesGetDefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesCreateOrUpdate200Response
    | ManagementZonesCreateOrUpdate201Response
    | ManagementZonesCreateOrUpdateDefaultResponse,
): response is ManagementZonesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ManagementZonesDelete204Response | ManagementZonesDeleteDefaultResponse,
): response is ManagementZonesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceCreateBiomassModelJob202Response
    | ModelInferenceCreateBiomassModelJobDefaultResponse,
): response is ModelInferenceCreateBiomassModelJobDefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceGetBiomassModelJob200Response
    | ModelInferenceGetBiomassModelJobDefaultResponse,
): response is ModelInferenceGetBiomassModelJobDefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceCreateSensorPlacementModelJob202Response
    | ModelInferenceCreateSensorPlacementModelJobDefaultResponse,
): response is ModelInferenceCreateSensorPlacementModelJobDefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceGetSensorPlacementModelJob200Response
    | ModelInferenceGetSensorPlacementModelJobDefaultResponse,
): response is ModelInferenceGetSensorPlacementModelJobDefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceCreateSoilMoistureModelJob202Response
    | ModelInferenceCreateSoilMoistureModelJobDefaultResponse,
): response is ModelInferenceCreateSoilMoistureModelJobDefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceGetSoilMoistureModelJob200Response
    | ModelInferenceGetSoilMoistureModelJobDefaultResponse,
): response is ModelInferenceGetSoilMoistureModelJobDefaultResponse;
export function isUnexpected(
  response: NutrientAnalysesList200Response | NutrientAnalysesListDefaultResponse,
): response is NutrientAnalysesListDefaultResponse;
export function isUnexpected(
  response: NutrientAnalysesListByPartyId200Response | NutrientAnalysesListByPartyIdDefaultResponse,
): response is NutrientAnalysesListByPartyIdDefaultResponse;
export function isUnexpected(
  response: NutrientAnalysesGet200Response | NutrientAnalysesGetDefaultResponse,
): response is NutrientAnalysesGetDefaultResponse;
export function isUnexpected(
  response:
    | NutrientAnalysesCreateOrUpdate200Response
    | NutrientAnalysesCreateOrUpdate201Response
    | NutrientAnalysesCreateOrUpdateDefaultResponse,
): response is NutrientAnalysesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: NutrientAnalysesDelete204Response | NutrientAnalysesDeleteDefaultResponse,
): response is NutrientAnalysesDeleteDefaultResponse;
export function isUnexpected(
  response: OAuthProvidersList200Response | OAuthProvidersListDefaultResponse,
): response is OAuthProvidersListDefaultResponse;
export function isUnexpected(
  response: OAuthProvidersGet200Response | OAuthProvidersGetDefaultResponse,
): response is OAuthProvidersGetDefaultResponse;
export function isUnexpected(
  response:
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdateDefaultResponse,
): response is OAuthProvidersCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: OAuthProvidersDelete204Response | OAuthProvidersDeleteDefaultResponse,
): response is OAuthProvidersDeleteDefaultResponse;
export function isUnexpected(
  response:
    | OAuthProvidersGetCascadeDeleteJobDetails200Response
    | OAuthProvidersGetCascadeDeleteJobDetailsDefaultResponse,
): response is OAuthProvidersGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | OAuthProvidersCreateCascadeDeleteJob202Response
    | OAuthProvidersCreateCascadeDeleteJobDefaultResponse,
): response is OAuthProvidersCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: OAuthTokensList200Response | OAuthTokensListDefaultResponse,
): response is OAuthTokensListDefaultResponse;
export function isUnexpected(
  response:
    | OAuthTokensGetOAuthConnectionLink200Response
    | OAuthTokensGetOAuthConnectionLinkDefaultResponse,
): response is OAuthTokensGetOAuthConnectionLinkDefaultResponse;
export function isUnexpected(
  response:
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsDefaultResponse,
): response is OAuthTokensGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | OAuthTokensCreateCascadeDeleteJob202Response
    | OAuthTokensCreateCascadeDeleteJobDefaultResponse,
): response is OAuthTokensCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: PartiesList200Response | PartiesListDefaultResponse,
): response is PartiesListDefaultResponse;
export function isUnexpected(
  response: PartiesGet200Response | PartiesGetDefaultResponse,
): response is PartiesGetDefaultResponse;
export function isUnexpected(
  response:
    | PartiesCreateOrUpdate200Response
    | PartiesCreateOrUpdate201Response
    | PartiesCreateOrUpdateDefaultResponse,
): response is PartiesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: PartiesDelete204Response | PartiesDeleteDefaultResponse,
): response is PartiesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | PartiesGetCascadeDeleteJobDetails200Response
    | PartiesGetCascadeDeleteJobDetailsDefaultResponse,
): response is PartiesGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: PartiesCreateCascadeDeleteJob202Response | PartiesCreateCascadeDeleteJobDefaultResponse,
): response is PartiesCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: PlantingDataListByPartyId200Response | PlantingDataListByPartyIdDefaultResponse,
): response is PlantingDataListByPartyIdDefaultResponse;
export function isUnexpected(
  response: PlantingDataGet200Response | PlantingDataGetDefaultResponse,
): response is PlantingDataGetDefaultResponse;
export function isUnexpected(
  response:
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdateDefaultResponse,
): response is PlantingDataCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: PlantingDataDelete204Response | PlantingDataDeleteDefaultResponse,
): response is PlantingDataDeleteDefaultResponse;
export function isUnexpected(
  response: PlantingDataList200Response | PlantingDataListDefaultResponse,
): response is PlantingDataListDefaultResponse;
export function isUnexpected(
  response:
    | PlantingDataCreateCascadeDeleteJob202Response
    | PlantingDataCreateCascadeDeleteJobDefaultResponse,
): response is PlantingDataCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | PlantingDataGetCascadeDeleteJobDetails200Response
    | PlantingDataGetCascadeDeleteJobDetailsDefaultResponse,
): response is PlantingDataGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesListByPartyId200Response
    | PlantTissueAnalysesListByPartyIdDefaultResponse,
): response is PlantTissueAnalysesListByPartyIdDefaultResponse;
export function isUnexpected(
  response: PlantTissueAnalysesGet200Response | PlantTissueAnalysesGetDefaultResponse,
): response is PlantTissueAnalysesGetDefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesCreateOrUpdate200Response
    | PlantTissueAnalysesCreateOrUpdate201Response
    | PlantTissueAnalysesCreateOrUpdateDefaultResponse,
): response is PlantTissueAnalysesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: PlantTissueAnalysesDelete204Response | PlantTissueAnalysesDeleteDefaultResponse,
): response is PlantTissueAnalysesDeleteDefaultResponse;
export function isUnexpected(
  response: PlantTissueAnalysesList200Response | PlantTissueAnalysesListDefaultResponse,
): response is PlantTissueAnalysesListDefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesCreateCascadeDeleteJob202Response
    | PlantTissueAnalysesCreateCascadeDeleteJobDefaultResponse,
): response is PlantTissueAnalysesCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesGetCascadeDeleteJobDetails200Response
    | PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultResponse,
): response is PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: PrescriptionMapsListByPartyId200Response | PrescriptionMapsListByPartyIdDefaultResponse,
): response is PrescriptionMapsListByPartyIdDefaultResponse;
export function isUnexpected(
  response: PrescriptionMapsGet200Response | PrescriptionMapsGetDefaultResponse,
): response is PrescriptionMapsGetDefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsCreateOrUpdate200Response
    | PrescriptionMapsCreateOrUpdate201Response
    | PrescriptionMapsCreateOrUpdateDefaultResponse,
): response is PrescriptionMapsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: PrescriptionMapsDelete204Response | PrescriptionMapsDeleteDefaultResponse,
): response is PrescriptionMapsDeleteDefaultResponse;
export function isUnexpected(
  response: PrescriptionMapsList200Response | PrescriptionMapsListDefaultResponse,
): response is PrescriptionMapsListDefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsGetCascadeDeleteJobDetails200Response
    | PrescriptionMapsGetCascadeDeleteJobDetailsDefaultResponse,
): response is PrescriptionMapsGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsCreateCascadeDeleteJob202Response
    | PrescriptionMapsCreateCascadeDeleteJobDefaultResponse,
): response is PrescriptionMapsCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: PrescriptionsListByPartyId200Response | PrescriptionsListByPartyIdDefaultResponse,
): response is PrescriptionsListByPartyIdDefaultResponse;
export function isUnexpected(
  response: PrescriptionsGet200Response | PrescriptionsGetDefaultResponse,
): response is PrescriptionsGetDefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionsCreateOrUpdate200Response
    | PrescriptionsCreateOrUpdate201Response
    | PrescriptionsCreateOrUpdateDefaultResponse,
): response is PrescriptionsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: PrescriptionsDelete204Response | PrescriptionsDeleteDefaultResponse,
): response is PrescriptionsDeleteDefaultResponse;
export function isUnexpected(
  response: PrescriptionsList200Response | PrescriptionsListDefaultResponse,
): response is PrescriptionsListDefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionsGetCascadeDeleteJobDetails200Response
    | PrescriptionsGetCascadeDeleteJobDetailsDefaultResponse,
): response is PrescriptionsGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionsCreateCascadeDeleteJob202Response
    | PrescriptionsCreateCascadeDeleteJobDefaultResponse,
): response is PrescriptionsCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: ScenesList200Response | ScenesListDefaultResponse,
): response is ScenesListDefaultResponse;
export function isUnexpected(
  response: ScenesDownload200Response | ScenesDownloadDefaultResponse,
): response is ScenesDownloadDefaultResponse;
export function isUnexpected(
  response:
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobDefaultResponse,
): response is ScenesCreateSatelliteDataIngestionJobDefaultResponse;
export function isUnexpected(
  response:
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsDefaultResponse,
): response is ScenesGetSatelliteDataIngestionJobDetailsDefaultResponse;
export function isUnexpected(
  response: ScenesSearchFeatures200Response | ScenesSearchFeaturesDefaultResponse,
): response is ScenesSearchFeaturesDefaultResponse;
export function isUnexpected(
  response: ScenesGetStacFeature200Response | ScenesGetStacFeatureDefaultResponse,
): response is ScenesGetStacFeatureDefaultResponse;
export function isUnexpected(
  response: SeasonalFieldsListByPartyId200Response | SeasonalFieldsListByPartyIdDefaultResponse,
): response is SeasonalFieldsListByPartyIdDefaultResponse;
export function isUnexpected(
  response: SeasonalFieldsGet200Response | SeasonalFieldsGetDefaultResponse,
): response is SeasonalFieldsGetDefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdateDefaultResponse,
): response is SeasonalFieldsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SeasonalFieldsDelete204Response | SeasonalFieldsDeleteDefaultResponse,
): response is SeasonalFieldsDeleteDefaultResponse;
export function isUnexpected(
  response: SeasonalFieldsList200Response | SeasonalFieldsListDefaultResponse,
): response is SeasonalFieldsListDefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsDefaultResponse,
): response is SeasonalFieldsGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobDefaultResponse,
): response is SeasonalFieldsCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response: SeasonsList200Response | SeasonsListDefaultResponse,
): response is SeasonsListDefaultResponse;
export function isUnexpected(
  response: SeasonsGet200Response | SeasonsGetDefaultResponse,
): response is SeasonsGetDefaultResponse;
export function isUnexpected(
  response:
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdateDefaultResponse,
): response is SeasonsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SeasonsDelete204Response | SeasonsDeleteDefaultResponse,
): response is SeasonsDeleteDefaultResponse;
export function isUnexpected(
  response: SensorDataModelsList200Response | SensorDataModelsListDefaultResponse,
): response is SensorDataModelsListDefaultResponse;
export function isUnexpected(
  response:
    | SensorDataModelsCreateOrUpdate200Response
    | SensorDataModelsCreateOrUpdate201Response
    | SensorDataModelsCreateOrUpdateDefaultResponse,
): response is SensorDataModelsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SensorDataModelsGet200Response | SensorDataModelsGetDefaultResponse,
): response is SensorDataModelsGetDefaultResponse;
export function isUnexpected(
  response: SensorDataModelsDelete204Response | SensorDataModelsDeleteDefaultResponse,
): response is SensorDataModelsDeleteDefaultResponse;
export function isUnexpected(
  response: SensorEventsList200Response | SensorEventsListDefaultResponse,
): response is SensorEventsListDefaultResponse;
export function isUnexpected(
  response: SensorMappingsList200Response | SensorMappingsListDefaultResponse,
): response is SensorMappingsListDefaultResponse;
export function isUnexpected(
  response:
    | SensorMappingsCreateOrUpdate200Response
    | SensorMappingsCreateOrUpdate201Response
    | SensorMappingsCreateOrUpdateDefaultResponse,
): response is SensorMappingsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SensorMappingsGet200Response | SensorMappingsGetDefaultResponse,
): response is SensorMappingsGetDefaultResponse;
export function isUnexpected(
  response: SensorMappingsDelete204Response | SensorMappingsDeleteDefaultResponse,
): response is SensorMappingsDeleteDefaultResponse;
export function isUnexpected(
  response: SensorPartnerIntegrationsList200Response | SensorPartnerIntegrationsListDefaultResponse,
): response is SensorPartnerIntegrationsListDefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsCreateOrUpdate200Response
    | SensorPartnerIntegrationsCreateOrUpdate201Response
    | SensorPartnerIntegrationsCreateOrUpdateDefaultResponse,
): response is SensorPartnerIntegrationsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SensorPartnerIntegrationsGet200Response | SensorPartnerIntegrationsGetDefaultResponse,
): response is SensorPartnerIntegrationsGetDefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsDelete204Response
    | SensorPartnerIntegrationsDeleteDefaultResponse,
): response is SensorPartnerIntegrationsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsCheckConsent200Response
    | SensorPartnerIntegrationsCheckConsentDefaultResponse,
): response is SensorPartnerIntegrationsCheckConsentDefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsGenerateConsentLink200Response
    | SensorPartnerIntegrationsGenerateConsentLinkDefaultResponse,
): response is SensorPartnerIntegrationsGenerateConsentLinkDefaultResponse;
export function isUnexpected(
  response: SensorsList200Response | SensorsListDefaultResponse,
): response is SensorsListDefaultResponse;
export function isUnexpected(
  response:
    | SensorsCreateOrUpdate200Response
    | SensorsCreateOrUpdate201Response
    | SensorsCreateOrUpdateDefaultResponse,
): response is SensorsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SensorsGet200Response | SensorsGetDefaultResponse,
): response is SensorsGetDefaultResponse;
export function isUnexpected(
  response: SensorsDelete204Response | SensorsDeleteDefaultResponse,
): response is SensorsDeleteDefaultResponse;
export function isUnexpected(
  response: SensorsGetConnectionString200Response | SensorsGetConnectionStringDefaultResponse,
): response is SensorsGetConnectionStringDefaultResponse;
export function isUnexpected(
  response: SensorsRenewConnectionString200Response | SensorsRenewConnectionStringDefaultResponse,
): response is SensorsRenewConnectionStringDefaultResponse;
export function isUnexpected(
  response: SolutionInferenceCancel200Response | SolutionInferenceCancelDefaultResponse,
): response is SolutionInferenceCancelDefaultResponse;
export function isUnexpected(
  response:
    | SolutionInferenceCreateOrUpdate202Response
    | SolutionInferenceCreateOrUpdateDefaultResponse,
): response is SolutionInferenceCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SolutionInferenceFetch200Response | SolutionInferenceFetchDefaultResponse,
): response is SolutionInferenceFetchDefaultResponse;
export function isUnexpected(
  response: TillageDataListByPartyId200Response | TillageDataListByPartyIdDefaultResponse,
): response is TillageDataListByPartyIdDefaultResponse;
export function isUnexpected(
  response: TillageDataGet200Response | TillageDataGetDefaultResponse,
): response is TillageDataGetDefaultResponse;
export function isUnexpected(
  response:
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdateDefaultResponse,
): response is TillageDataCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: TillageDataDelete204Response | TillageDataDeleteDefaultResponse,
): response is TillageDataDeleteDefaultResponse;
export function isUnexpected(
  response: TillageDataList200Response | TillageDataListDefaultResponse,
): response is TillageDataListDefaultResponse;
export function isUnexpected(
  response:
    | TillageDataCreateCascadeDeleteJob202Response
    | TillageDataCreateCascadeDeleteJobDefaultResponse,
): response is TillageDataCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | TillageDataGetCascadeDeleteJobDetails200Response
    | TillageDataGetCascadeDeleteJobDetailsDefaultResponse,
): response is TillageDataGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: WeatherList200Response | WeatherListDefaultResponse,
): response is WeatherListDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDataDeleteJobDetails200Response
    | WeatherGetDataDeleteJobDetailsDefaultResponse,
): response is WeatherGetDataDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: WeatherCreateDataDeleteJob202Response | WeatherCreateDataDeleteJobDefaultResponse,
): response is WeatherCreateDataDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDataIngestionJobDetails200Response
    | WeatherGetDataIngestionJobDetailsDefaultResponse,
): response is WeatherGetDataIngestionJobDetailsDefaultResponse;
export function isUnexpected(
  response: WeatherCreateDataIngestionJob202Response | WeatherCreateDataIngestionJobDefaultResponse,
): response is WeatherCreateDataIngestionJobDefaultResponse;
export function isUnexpected(
  response: WeatherDataGet200Response | WeatherDataGetDefaultResponse,
): response is WeatherDataGetDefaultResponse;
export function isUnexpected(
  response: ZonesListByPartyId200Response | ZonesListByPartyIdDefaultResponse,
): response is ZonesListByPartyIdDefaultResponse;
export function isUnexpected(
  response: ZonesGet200Response | ZonesGetDefaultResponse,
): response is ZonesGetDefaultResponse;
export function isUnexpected(
  response:
    | ZonesCreateOrUpdate200Response
    | ZonesCreateOrUpdate201Response
    | ZonesCreateOrUpdateDefaultResponse,
): response is ZonesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ZonesDelete204Response | ZonesDeleteDefaultResponse,
): response is ZonesDeleteDefaultResponse;
export function isUnexpected(
  response: ZonesList200Response | ZonesListDefaultResponse,
): response is ZonesListDefaultResponse;
export function isUnexpected(
  response:
    | ZonesGetCascadeDeleteJobDetails200Response
    | ZonesGetCascadeDeleteJobDetailsDefaultResponse,
): response is ZonesGetCascadeDeleteJobDetailsDefaultResponse;
export function isUnexpected(
  response: ZonesCreateCascadeDeleteJob202Response | ZonesCreateCascadeDeleteJobDefaultResponse,
): response is ZonesCreateCascadeDeleteJobDefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataList200Response
    | ApplicationDataListDefaultResponse
    | ApplicationDataCreateCascadeDeleteJob202Response
    | ApplicationDataCreateCascadeDeleteJobDefaultResponse
    | ApplicationDataGetCascadeDeleteJobDetails200Response
    | ApplicationDataGetCascadeDeleteJobDetailsDefaultResponse
    | ApplicationDataListByPartyId200Response
    | ApplicationDataListByPartyIdDefaultResponse
    | ApplicationDataGet200Response
    | ApplicationDataGetDefaultResponse
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdateDefaultResponse
    | ApplicationDataDelete204Response
    | ApplicationDataDeleteDefaultResponse
    | AttachmentsListByPartyId200Response
    | AttachmentsListByPartyIdDefaultResponse
    | AttachmentsGet200Response
    | AttachmentsGetDefaultResponse
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdateDefaultResponse
    | AttachmentsDelete204Response
    | AttachmentsDeleteDefaultResponse
    | AttachmentsDownload200Response
    | AttachmentsDownloadDefaultResponse
    | BoundariesList200Response
    | BoundariesListDefaultResponse
    | BoundariesSearch200Response
    | BoundariesSearchDefaultResponse
    | BoundariesCreateCascadeDeleteJob202Response
    | BoundariesCreateCascadeDeleteJobDefaultResponse
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsDefaultResponse
    | BoundariesListByPartyId200Response
    | BoundariesListByPartyIdDefaultResponse
    | BoundariesSearchByPartyId200Response
    | BoundariesSearchByPartyIdDefaultResponse
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdateDefaultResponse
    | BoundariesGet200Response
    | BoundariesGetDefaultResponse
    | BoundariesDelete204Response
    | BoundariesDeleteDefaultResponse
    | BoundariesGetOverlap200Response
    | BoundariesGetOverlapDefaultResponse
    | CropProductsList200Response
    | CropProductsListDefaultResponse
    | CropProductsGet200Response
    | CropProductsGetDefaultResponse
    | CropProductsCreateOrUpdate200Response
    | CropProductsCreateOrUpdate201Response
    | CropProductsCreateOrUpdateDefaultResponse
    | CropProductsDelete204Response
    | CropProductsDeleteDefaultResponse
    | CropsList200Response
    | CropsListDefaultResponse
    | CropsGet200Response
    | CropsGetDefaultResponse
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdateDefaultResponse
    | CropsDelete204Response
    | CropsDeleteDefaultResponse
    | DeviceDataModelsList200Response
    | DeviceDataModelsListDefaultResponse
    | DeviceDataModelsCreateOrUpdate200Response
    | DeviceDataModelsCreateOrUpdate201Response
    | DeviceDataModelsCreateOrUpdateDefaultResponse
    | DeviceDataModelsGet200Response
    | DeviceDataModelsGetDefaultResponse
    | DeviceDataModelsDelete204Response
    | DeviceDataModelsDeleteDefaultResponse
    | DevicesList200Response
    | DevicesListDefaultResponse
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdateDefaultResponse
    | DevicesGet200Response
    | DevicesGetDefaultResponse
    | DevicesDelete204Response
    | DevicesDeleteDefaultResponse
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobDefaultResponse
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsDefaultResponse
    | FarmsList200Response
    | FarmsListDefaultResponse
    | FarmsCreateCascadeDeleteJob202Response
    | FarmsCreateCascadeDeleteJobDefaultResponse
    | FarmsGetCascadeDeleteJobDetails200Response
    | FarmsGetCascadeDeleteJobDetailsDefaultResponse
    | FarmsListByPartyId200Response
    | FarmsListByPartyIdDefaultResponse
    | FarmsGet200Response
    | FarmsGetDefaultResponse
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdateDefaultResponse
    | FarmsDelete204Response
    | FarmsDeleteDefaultResponse
    | FieldsList200Response
    | FieldsListDefaultResponse
    | FieldsGetCascadeDeleteJobDetails200Response
    | FieldsGetCascadeDeleteJobDetailsDefaultResponse
    | FieldsCreateCascadeDeleteJob202Response
    | FieldsCreateCascadeDeleteJobDefaultResponse
    | FieldsListByPartyId200Response
    | FieldsListByPartyIdDefaultResponse
    | FieldsGet200Response
    | FieldsGetDefaultResponse
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdateDefaultResponse
    | FieldsDelete204Response
    | FieldsDeleteDefaultResponse
    | HarvestDataList200Response
    | HarvestDataListDefaultResponse
    | HarvestDataCreateCascadeDeleteJob202Response
    | HarvestDataCreateCascadeDeleteJobDefaultResponse
    | HarvestDataGetCascadeDeleteJobDetails200Response
    | HarvestDataGetCascadeDeleteJobDetailsDefaultResponse
    | HarvestDataListByPartyId200Response
    | HarvestDataListByPartyIdDefaultResponse
    | HarvestDataGet200Response
    | HarvestDataGetDefaultResponse
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdateDefaultResponse
    | HarvestDataDelete204Response
    | HarvestDataDeleteDefaultResponse
    | ImageProcessingCreateRasterizeJob202Response
    | ImageProcessingCreateRasterizeJobDefaultResponse
    | ImageProcessingGetRasterizeJob200Response
    | ImageProcessingGetRasterizeJobDefaultResponse
    | InsightAttachmentsListByPartyIdModelIdAndResource200Response
    | InsightAttachmentsListByPartyIdModelIdAndResourceDefaultResponse
    | InsightAttachmentsCreateOrUpdate200Response
    | InsightAttachmentsCreateOrUpdate201Response
    | InsightAttachmentsCreateOrUpdateDefaultResponse
    | InsightAttachmentsGet200Response
    | InsightAttachmentsGetDefaultResponse
    | InsightAttachmentsDelete204Response
    | InsightAttachmentsDeleteDefaultResponse
    | InsightAttachmentsDownload200Response
    | InsightAttachmentsDownloadDefaultResponse
    | InsightsCreateCascadeDeleteJob202Response
    | InsightsCreateCascadeDeleteJobDefaultResponse
    | InsightsGetCascadeDeleteJobDetails200Response
    | InsightsGetCascadeDeleteJobDetailsDefaultResponse
    | InsightsListByPartyIdModelIdAndResource200Response
    | InsightsListByPartyIdModelIdAndResourceDefaultResponse
    | InsightsCreateOrUpdate200Response
    | InsightsCreateOrUpdate201Response
    | InsightsCreateOrUpdateDefaultResponse
    | InsightsGet200Response
    | InsightsGetDefaultResponse
    | InsightsDelete204Response
    | InsightsDeleteDefaultResponse
    | ManagementZonesList200Response
    | ManagementZonesListDefaultResponse
    | ManagementZonesGetCascadeDeleteJobDetails200Response
    | ManagementZonesGetCascadeDeleteJobDetailsDefaultResponse
    | ManagementZonesCreateCascadeDeleteJob202Response
    | ManagementZonesCreateCascadeDeleteJobDefaultResponse
    | ManagementZonesListByPartyId200Response
    | ManagementZonesListByPartyIdDefaultResponse
    | ManagementZonesGet200Response
    | ManagementZonesGetDefaultResponse
    | ManagementZonesCreateOrUpdate200Response
    | ManagementZonesCreateOrUpdate201Response
    | ManagementZonesCreateOrUpdateDefaultResponse
    | ManagementZonesDelete204Response
    | ManagementZonesDeleteDefaultResponse
    | ModelInferenceCreateBiomassModelJob202Response
    | ModelInferenceCreateBiomassModelJobDefaultResponse
    | ModelInferenceGetBiomassModelJob200Response
    | ModelInferenceGetBiomassModelJobDefaultResponse
    | ModelInferenceCreateSensorPlacementModelJob202Response
    | ModelInferenceCreateSensorPlacementModelJobDefaultResponse
    | ModelInferenceGetSensorPlacementModelJob200Response
    | ModelInferenceGetSensorPlacementModelJobDefaultResponse
    | ModelInferenceCreateSoilMoistureModelJob202Response
    | ModelInferenceCreateSoilMoistureModelJobDefaultResponse
    | ModelInferenceGetSoilMoistureModelJob200Response
    | ModelInferenceGetSoilMoistureModelJobDefaultResponse
    | NutrientAnalysesList200Response
    | NutrientAnalysesListDefaultResponse
    | NutrientAnalysesListByPartyId200Response
    | NutrientAnalysesListByPartyIdDefaultResponse
    | NutrientAnalysesGet200Response
    | NutrientAnalysesGetDefaultResponse
    | NutrientAnalysesCreateOrUpdate200Response
    | NutrientAnalysesCreateOrUpdate201Response
    | NutrientAnalysesCreateOrUpdateDefaultResponse
    | NutrientAnalysesDelete204Response
    | NutrientAnalysesDeleteDefaultResponse
    | OAuthProvidersList200Response
    | OAuthProvidersListDefaultResponse
    | OAuthProvidersGet200Response
    | OAuthProvidersGetDefaultResponse
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdateDefaultResponse
    | OAuthProvidersDelete204Response
    | OAuthProvidersDeleteDefaultResponse
    | OAuthProvidersGetCascadeDeleteJobDetails200Response
    | OAuthProvidersGetCascadeDeleteJobDetailsDefaultResponse
    | OAuthProvidersCreateCascadeDeleteJob202Response
    | OAuthProvidersCreateCascadeDeleteJobDefaultResponse
    | OAuthTokensList200Response
    | OAuthTokensListDefaultResponse
    | OAuthTokensGetOAuthConnectionLink200Response
    | OAuthTokensGetOAuthConnectionLinkDefaultResponse
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsDefaultResponse
    | OAuthTokensCreateCascadeDeleteJob202Response
    | OAuthTokensCreateCascadeDeleteJobDefaultResponse
    | PartiesList200Response
    | PartiesListDefaultResponse
    | PartiesGet200Response
    | PartiesGetDefaultResponse
    | PartiesCreateOrUpdate200Response
    | PartiesCreateOrUpdate201Response
    | PartiesCreateOrUpdateDefaultResponse
    | PartiesDelete204Response
    | PartiesDeleteDefaultResponse
    | PartiesGetCascadeDeleteJobDetails200Response
    | PartiesGetCascadeDeleteJobDetailsDefaultResponse
    | PartiesCreateCascadeDeleteJob202Response
    | PartiesCreateCascadeDeleteJobDefaultResponse
    | PlantingDataListByPartyId200Response
    | PlantingDataListByPartyIdDefaultResponse
    | PlantingDataGet200Response
    | PlantingDataGetDefaultResponse
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdateDefaultResponse
    | PlantingDataDelete204Response
    | PlantingDataDeleteDefaultResponse
    | PlantingDataList200Response
    | PlantingDataListDefaultResponse
    | PlantingDataCreateCascadeDeleteJob202Response
    | PlantingDataCreateCascadeDeleteJobDefaultResponse
    | PlantingDataGetCascadeDeleteJobDetails200Response
    | PlantingDataGetCascadeDeleteJobDetailsDefaultResponse
    | PlantTissueAnalysesListByPartyId200Response
    | PlantTissueAnalysesListByPartyIdDefaultResponse
    | PlantTissueAnalysesGet200Response
    | PlantTissueAnalysesGetDefaultResponse
    | PlantTissueAnalysesCreateOrUpdate200Response
    | PlantTissueAnalysesCreateOrUpdate201Response
    | PlantTissueAnalysesCreateOrUpdateDefaultResponse
    | PlantTissueAnalysesDelete204Response
    | PlantTissueAnalysesDeleteDefaultResponse
    | PlantTissueAnalysesList200Response
    | PlantTissueAnalysesListDefaultResponse
    | PlantTissueAnalysesCreateCascadeDeleteJob202Response
    | PlantTissueAnalysesCreateCascadeDeleteJobDefaultResponse
    | PlantTissueAnalysesGetCascadeDeleteJobDetails200Response
    | PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultResponse
    | PrescriptionMapsListByPartyId200Response
    | PrescriptionMapsListByPartyIdDefaultResponse
    | PrescriptionMapsGet200Response
    | PrescriptionMapsGetDefaultResponse
    | PrescriptionMapsCreateOrUpdate200Response
    | PrescriptionMapsCreateOrUpdate201Response
    | PrescriptionMapsCreateOrUpdateDefaultResponse
    | PrescriptionMapsDelete204Response
    | PrescriptionMapsDeleteDefaultResponse
    | PrescriptionMapsList200Response
    | PrescriptionMapsListDefaultResponse
    | PrescriptionMapsGetCascadeDeleteJobDetails200Response
    | PrescriptionMapsGetCascadeDeleteJobDetailsDefaultResponse
    | PrescriptionMapsCreateCascadeDeleteJob202Response
    | PrescriptionMapsCreateCascadeDeleteJobDefaultResponse
    | PrescriptionsListByPartyId200Response
    | PrescriptionsListByPartyIdDefaultResponse
    | PrescriptionsGet200Response
    | PrescriptionsGetDefaultResponse
    | PrescriptionsCreateOrUpdate200Response
    | PrescriptionsCreateOrUpdate201Response
    | PrescriptionsCreateOrUpdateDefaultResponse
    | PrescriptionsDelete204Response
    | PrescriptionsDeleteDefaultResponse
    | PrescriptionsList200Response
    | PrescriptionsListDefaultResponse
    | PrescriptionsGetCascadeDeleteJobDetails200Response
    | PrescriptionsGetCascadeDeleteJobDetailsDefaultResponse
    | PrescriptionsCreateCascadeDeleteJob202Response
    | PrescriptionsCreateCascadeDeleteJobDefaultResponse
    | ScenesList200Response
    | ScenesListDefaultResponse
    | ScenesDownload200Response
    | ScenesDownloadDefaultResponse
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobDefaultResponse
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsDefaultResponse
    | ScenesSearchFeatures200Response
    | ScenesSearchFeaturesDefaultResponse
    | ScenesGetStacFeature200Response
    | ScenesGetStacFeatureDefaultResponse
    | SeasonalFieldsListByPartyId200Response
    | SeasonalFieldsListByPartyIdDefaultResponse
    | SeasonalFieldsGet200Response
    | SeasonalFieldsGetDefaultResponse
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdateDefaultResponse
    | SeasonalFieldsDelete204Response
    | SeasonalFieldsDeleteDefaultResponse
    | SeasonalFieldsList200Response
    | SeasonalFieldsListDefaultResponse
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsDefaultResponse
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobDefaultResponse
    | SeasonsList200Response
    | SeasonsListDefaultResponse
    | SeasonsGet200Response
    | SeasonsGetDefaultResponse
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdateDefaultResponse
    | SeasonsDelete204Response
    | SeasonsDeleteDefaultResponse
    | SensorDataModelsList200Response
    | SensorDataModelsListDefaultResponse
    | SensorDataModelsCreateOrUpdate200Response
    | SensorDataModelsCreateOrUpdate201Response
    | SensorDataModelsCreateOrUpdateDefaultResponse
    | SensorDataModelsGet200Response
    | SensorDataModelsGetDefaultResponse
    | SensorDataModelsDelete204Response
    | SensorDataModelsDeleteDefaultResponse
    | SensorEventsList200Response
    | SensorEventsListDefaultResponse
    | SensorMappingsList200Response
    | SensorMappingsListDefaultResponse
    | SensorMappingsCreateOrUpdate200Response
    | SensorMappingsCreateOrUpdate201Response
    | SensorMappingsCreateOrUpdateDefaultResponse
    | SensorMappingsGet200Response
    | SensorMappingsGetDefaultResponse
    | SensorMappingsDelete204Response
    | SensorMappingsDeleteDefaultResponse
    | SensorPartnerIntegrationsList200Response
    | SensorPartnerIntegrationsListDefaultResponse
    | SensorPartnerIntegrationsCreateOrUpdate200Response
    | SensorPartnerIntegrationsCreateOrUpdate201Response
    | SensorPartnerIntegrationsCreateOrUpdateDefaultResponse
    | SensorPartnerIntegrationsGet200Response
    | SensorPartnerIntegrationsGetDefaultResponse
    | SensorPartnerIntegrationsDelete204Response
    | SensorPartnerIntegrationsDeleteDefaultResponse
    | SensorPartnerIntegrationsCheckConsent200Response
    | SensorPartnerIntegrationsCheckConsentDefaultResponse
    | SensorPartnerIntegrationsGenerateConsentLink200Response
    | SensorPartnerIntegrationsGenerateConsentLinkDefaultResponse
    | SensorsList200Response
    | SensorsListDefaultResponse
    | SensorsCreateOrUpdate200Response
    | SensorsCreateOrUpdate201Response
    | SensorsCreateOrUpdateDefaultResponse
    | SensorsGet200Response
    | SensorsGetDefaultResponse
    | SensorsDelete204Response
    | SensorsDeleteDefaultResponse
    | SensorsGetConnectionString200Response
    | SensorsGetConnectionStringDefaultResponse
    | SensorsRenewConnectionString200Response
    | SensorsRenewConnectionStringDefaultResponse
    | SolutionInferenceCancel200Response
    | SolutionInferenceCancelDefaultResponse
    | SolutionInferenceCreateOrUpdate202Response
    | SolutionInferenceCreateOrUpdateDefaultResponse
    | SolutionInferenceFetch200Response
    | SolutionInferenceFetchDefaultResponse
    | TillageDataListByPartyId200Response
    | TillageDataListByPartyIdDefaultResponse
    | TillageDataGet200Response
    | TillageDataGetDefaultResponse
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdateDefaultResponse
    | TillageDataDelete204Response
    | TillageDataDeleteDefaultResponse
    | TillageDataList200Response
    | TillageDataListDefaultResponse
    | TillageDataCreateCascadeDeleteJob202Response
    | TillageDataCreateCascadeDeleteJobDefaultResponse
    | TillageDataGetCascadeDeleteJobDetails200Response
    | TillageDataGetCascadeDeleteJobDetailsDefaultResponse
    | WeatherList200Response
    | WeatherListDefaultResponse
    | WeatherGetDataDeleteJobDetails200Response
    | WeatherGetDataDeleteJobDetailsDefaultResponse
    | WeatherCreateDataDeleteJob202Response
    | WeatherCreateDataDeleteJobDefaultResponse
    | WeatherGetDataIngestionJobDetails200Response
    | WeatherGetDataIngestionJobDetailsDefaultResponse
    | WeatherCreateDataIngestionJob202Response
    | WeatherCreateDataIngestionJobDefaultResponse
    | WeatherDataGet200Response
    | WeatherDataGetDefaultResponse
    | ZonesListByPartyId200Response
    | ZonesListByPartyIdDefaultResponse
    | ZonesGet200Response
    | ZonesGetDefaultResponse
    | ZonesCreateOrUpdate200Response
    | ZonesCreateOrUpdate201Response
    | ZonesCreateOrUpdateDefaultResponse
    | ZonesDelete204Response
    | ZonesDeleteDefaultResponse
    | ZonesList200Response
    | ZonesListDefaultResponse
    | ZonesGetCascadeDeleteJobDetails200Response
    | ZonesGetCascadeDeleteJobDetailsDefaultResponse
    | ZonesCreateCascadeDeleteJob202Response
    | ZonesCreateCascadeDeleteJobDefaultResponse,
): response is
  | ApplicationDataListDefaultResponse
  | ApplicationDataCreateCascadeDeleteJobDefaultResponse
  | ApplicationDataGetCascadeDeleteJobDetailsDefaultResponse
  | ApplicationDataListByPartyIdDefaultResponse
  | ApplicationDataGetDefaultResponse
  | ApplicationDataCreateOrUpdateDefaultResponse
  | ApplicationDataDeleteDefaultResponse
  | AttachmentsListByPartyIdDefaultResponse
  | AttachmentsGetDefaultResponse
  | AttachmentsCreateOrUpdateDefaultResponse
  | AttachmentsDeleteDefaultResponse
  | AttachmentsDownloadDefaultResponse
  | BoundariesListDefaultResponse
  | BoundariesSearchDefaultResponse
  | BoundariesCreateCascadeDeleteJobDefaultResponse
  | BoundariesGetCascadeDeleteJobDetailsDefaultResponse
  | BoundariesListByPartyIdDefaultResponse
  | BoundariesSearchByPartyIdDefaultResponse
  | BoundariesCreateOrUpdateDefaultResponse
  | BoundariesGetDefaultResponse
  | BoundariesDeleteDefaultResponse
  | BoundariesGetOverlapDefaultResponse
  | CropProductsListDefaultResponse
  | CropProductsGetDefaultResponse
  | CropProductsCreateOrUpdateDefaultResponse
  | CropProductsDeleteDefaultResponse
  | CropsListDefaultResponse
  | CropsGetDefaultResponse
  | CropsCreateOrUpdateDefaultResponse
  | CropsDeleteDefaultResponse
  | DeviceDataModelsListDefaultResponse
  | DeviceDataModelsCreateOrUpdateDefaultResponse
  | DeviceDataModelsGetDefaultResponse
  | DeviceDataModelsDeleteDefaultResponse
  | DevicesListDefaultResponse
  | DevicesCreateOrUpdateDefaultResponse
  | DevicesGetDefaultResponse
  | DevicesDeleteDefaultResponse
  | FarmOperationsCreateDataIngestionJobDefaultResponse
  | FarmOperationsGetDataIngestionJobDetailsDefaultResponse
  | FarmsListDefaultResponse
  | FarmsCreateCascadeDeleteJobDefaultResponse
  | FarmsGetCascadeDeleteJobDetailsDefaultResponse
  | FarmsListByPartyIdDefaultResponse
  | FarmsGetDefaultResponse
  | FarmsCreateOrUpdateDefaultResponse
  | FarmsDeleteDefaultResponse
  | FieldsListDefaultResponse
  | FieldsGetCascadeDeleteJobDetailsDefaultResponse
  | FieldsCreateCascadeDeleteJobDefaultResponse
  | FieldsListByPartyIdDefaultResponse
  | FieldsGetDefaultResponse
  | FieldsCreateOrUpdateDefaultResponse
  | FieldsDeleteDefaultResponse
  | HarvestDataListDefaultResponse
  | HarvestDataCreateCascadeDeleteJobDefaultResponse
  | HarvestDataGetCascadeDeleteJobDetailsDefaultResponse
  | HarvestDataListByPartyIdDefaultResponse
  | HarvestDataGetDefaultResponse
  | HarvestDataCreateOrUpdateDefaultResponse
  | HarvestDataDeleteDefaultResponse
  | ImageProcessingCreateRasterizeJobDefaultResponse
  | ImageProcessingGetRasterizeJobDefaultResponse
  | InsightAttachmentsListByPartyIdModelIdAndResourceDefaultResponse
  | InsightAttachmentsCreateOrUpdateDefaultResponse
  | InsightAttachmentsGetDefaultResponse
  | InsightAttachmentsDeleteDefaultResponse
  | InsightAttachmentsDownloadDefaultResponse
  | InsightsCreateCascadeDeleteJobDefaultResponse
  | InsightsGetCascadeDeleteJobDetailsDefaultResponse
  | InsightsListByPartyIdModelIdAndResourceDefaultResponse
  | InsightsCreateOrUpdateDefaultResponse
  | InsightsGetDefaultResponse
  | InsightsDeleteDefaultResponse
  | ManagementZonesListDefaultResponse
  | ManagementZonesGetCascadeDeleteJobDetailsDefaultResponse
  | ManagementZonesCreateCascadeDeleteJobDefaultResponse
  | ManagementZonesListByPartyIdDefaultResponse
  | ManagementZonesGetDefaultResponse
  | ManagementZonesCreateOrUpdateDefaultResponse
  | ManagementZonesDeleteDefaultResponse
  | ModelInferenceCreateBiomassModelJobDefaultResponse
  | ModelInferenceGetBiomassModelJobDefaultResponse
  | ModelInferenceCreateSensorPlacementModelJobDefaultResponse
  | ModelInferenceGetSensorPlacementModelJobDefaultResponse
  | ModelInferenceCreateSoilMoistureModelJobDefaultResponse
  | ModelInferenceGetSoilMoistureModelJobDefaultResponse
  | NutrientAnalysesListDefaultResponse
  | NutrientAnalysesListByPartyIdDefaultResponse
  | NutrientAnalysesGetDefaultResponse
  | NutrientAnalysesCreateOrUpdateDefaultResponse
  | NutrientAnalysesDeleteDefaultResponse
  | OAuthProvidersListDefaultResponse
  | OAuthProvidersGetDefaultResponse
  | OAuthProvidersCreateOrUpdateDefaultResponse
  | OAuthProvidersDeleteDefaultResponse
  | OAuthProvidersGetCascadeDeleteJobDetailsDefaultResponse
  | OAuthProvidersCreateCascadeDeleteJobDefaultResponse
  | OAuthTokensListDefaultResponse
  | OAuthTokensGetOAuthConnectionLinkDefaultResponse
  | OAuthTokensGetCascadeDeleteJobDetailsDefaultResponse
  | OAuthTokensCreateCascadeDeleteJobDefaultResponse
  | PartiesListDefaultResponse
  | PartiesGetDefaultResponse
  | PartiesCreateOrUpdateDefaultResponse
  | PartiesDeleteDefaultResponse
  | PartiesGetCascadeDeleteJobDetailsDefaultResponse
  | PartiesCreateCascadeDeleteJobDefaultResponse
  | PlantingDataListByPartyIdDefaultResponse
  | PlantingDataGetDefaultResponse
  | PlantingDataCreateOrUpdateDefaultResponse
  | PlantingDataDeleteDefaultResponse
  | PlantingDataListDefaultResponse
  | PlantingDataCreateCascadeDeleteJobDefaultResponse
  | PlantingDataGetCascadeDeleteJobDetailsDefaultResponse
  | PlantTissueAnalysesListByPartyIdDefaultResponse
  | PlantTissueAnalysesGetDefaultResponse
  | PlantTissueAnalysesCreateOrUpdateDefaultResponse
  | PlantTissueAnalysesDeleteDefaultResponse
  | PlantTissueAnalysesListDefaultResponse
  | PlantTissueAnalysesCreateCascadeDeleteJobDefaultResponse
  | PlantTissueAnalysesGetCascadeDeleteJobDetailsDefaultResponse
  | PrescriptionMapsListByPartyIdDefaultResponse
  | PrescriptionMapsGetDefaultResponse
  | PrescriptionMapsCreateOrUpdateDefaultResponse
  | PrescriptionMapsDeleteDefaultResponse
  | PrescriptionMapsListDefaultResponse
  | PrescriptionMapsGetCascadeDeleteJobDetailsDefaultResponse
  | PrescriptionMapsCreateCascadeDeleteJobDefaultResponse
  | PrescriptionsListByPartyIdDefaultResponse
  | PrescriptionsGetDefaultResponse
  | PrescriptionsCreateOrUpdateDefaultResponse
  | PrescriptionsDeleteDefaultResponse
  | PrescriptionsListDefaultResponse
  | PrescriptionsGetCascadeDeleteJobDetailsDefaultResponse
  | PrescriptionsCreateCascadeDeleteJobDefaultResponse
  | ScenesListDefaultResponse
  | ScenesDownloadDefaultResponse
  | ScenesCreateSatelliteDataIngestionJobDefaultResponse
  | ScenesGetSatelliteDataIngestionJobDetailsDefaultResponse
  | ScenesSearchFeaturesDefaultResponse
  | ScenesGetStacFeatureDefaultResponse
  | SeasonalFieldsListByPartyIdDefaultResponse
  | SeasonalFieldsGetDefaultResponse
  | SeasonalFieldsCreateOrUpdateDefaultResponse
  | SeasonalFieldsDeleteDefaultResponse
  | SeasonalFieldsListDefaultResponse
  | SeasonalFieldsGetCascadeDeleteJobDetailsDefaultResponse
  | SeasonalFieldsCreateCascadeDeleteJobDefaultResponse
  | SeasonsListDefaultResponse
  | SeasonsGetDefaultResponse
  | SeasonsCreateOrUpdateDefaultResponse
  | SeasonsDeleteDefaultResponse
  | SensorDataModelsListDefaultResponse
  | SensorDataModelsCreateOrUpdateDefaultResponse
  | SensorDataModelsGetDefaultResponse
  | SensorDataModelsDeleteDefaultResponse
  | SensorEventsListDefaultResponse
  | SensorMappingsListDefaultResponse
  | SensorMappingsCreateOrUpdateDefaultResponse
  | SensorMappingsGetDefaultResponse
  | SensorMappingsDeleteDefaultResponse
  | SensorPartnerIntegrationsListDefaultResponse
  | SensorPartnerIntegrationsCreateOrUpdateDefaultResponse
  | SensorPartnerIntegrationsGetDefaultResponse
  | SensorPartnerIntegrationsDeleteDefaultResponse
  | SensorPartnerIntegrationsCheckConsentDefaultResponse
  | SensorPartnerIntegrationsGenerateConsentLinkDefaultResponse
  | SensorsListDefaultResponse
  | SensorsCreateOrUpdateDefaultResponse
  | SensorsGetDefaultResponse
  | SensorsDeleteDefaultResponse
  | SensorsGetConnectionStringDefaultResponse
  | SensorsRenewConnectionStringDefaultResponse
  | SolutionInferenceCancelDefaultResponse
  | SolutionInferenceCreateOrUpdateDefaultResponse
  | SolutionInferenceFetchDefaultResponse
  | TillageDataListByPartyIdDefaultResponse
  | TillageDataGetDefaultResponse
  | TillageDataCreateOrUpdateDefaultResponse
  | TillageDataDeleteDefaultResponse
  | TillageDataListDefaultResponse
  | TillageDataCreateCascadeDeleteJobDefaultResponse
  | TillageDataGetCascadeDeleteJobDetailsDefaultResponse
  | WeatherListDefaultResponse
  | WeatherGetDataDeleteJobDetailsDefaultResponse
  | WeatherCreateDataDeleteJobDefaultResponse
  | WeatherGetDataIngestionJobDetailsDefaultResponse
  | WeatherCreateDataIngestionJobDefaultResponse
  | WeatherDataGetDefaultResponse
  | ZonesListByPartyIdDefaultResponse
  | ZonesGetDefaultResponse
  | ZonesCreateOrUpdateDefaultResponse
  | ZonesDeleteDefaultResponse
  | ZonesListDefaultResponse
  | ZonesGetCascadeDeleteJobDetailsDefaultResponse
  | ZonesCreateCascadeDeleteJobDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
