// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

const responseMap: Record<string, string[]> = {
  "GET /application-data": ["200"],
  "PUT /application-data/cascade-delete/{jobId}": ["202"],
  "GET /application-data/cascade-delete/{jobId}": ["200"],
  "GET /farmers/{farmerId}/application-data": ["200"],
  "GET /farmers/{farmerId}/application-data/{applicationDataId}": ["200"],
  "PATCH /farmers/{farmerId}/application-data/{applicationDataId}": [
    "200",
    "201"
  ],
  "DELETE /farmers/{farmerId}/application-data/{applicationDataId}": ["204"],
  "GET /farmers/{farmerId}/attachments": ["200"],
  "GET /farmers/{farmerId}/attachments/{attachmentId}": ["200"],
  "PATCH /farmers/{farmerId}/attachments/{attachmentId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/attachments/{attachmentId}": ["204"],
  "GET /farmers/{farmerId}/attachments/{attachmentId}/file": ["200"],
  "GET /boundaries": ["200"],
  "POST /boundaries": ["200"],
  "PUT /boundaries/cascade-delete/{jobId}": ["202"],
  "GET /boundaries/cascade-delete/{jobId}": ["200"],
  "GET /farmers/{farmerId}/boundaries": ["200"],
  "POST /farmers/{farmerId}/boundaries": ["200"],
  "PATCH /farmers/{farmerId}/boundaries/{boundaryId}": ["200", "201"],
  "GET /farmers/{farmerId}/boundaries/{boundaryId}": ["200"],
  "DELETE /farmers/{farmerId}/boundaries/{boundaryId}": ["204"],
  "GET /farmers/{farmerId}/boundaries/{boundaryId}/overlap": ["200"],
  "GET /crops": ["200"],
  "GET /crops/{cropId}": ["200"],
  "PATCH /crops/{cropId}": ["200", "201"],
  "DELETE /crops/{cropId}": ["204"],
  "GET /crop-varieties": ["200"],
  "GET /crop-varieties/{cropVarietyId}": ["200"],
  "PATCH /crop-varieties/{cropVarietyId}": ["200", "201"],
  "DELETE /crop-varieties/{cropVarietyId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/device-data-models": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}": [
    "200",
    "201"
  ],
  "GET /sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}": [
    "200"
  ],
  "DELETE /sensor-partners/{sensorPartnerId}/device-data-models/{deviceDataModelId}": [
    "204"
  ],
  "GET /sensor-partners/{sensorPartnerId}/devices": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/devices/{deviceId}": ["200", "201"],
  "GET /sensor-partners/{sensorPartnerId}/devices/{deviceId}": ["200"],
  "DELETE /sensor-partners/{sensorPartnerId}/devices/{deviceId}": ["204"],
  "GET /farmers": ["200"],
  "GET /farmers/{farmerId}": ["200"],
  "PATCH /farmers/{farmerId}": ["200", "201"],
  "DELETE /farmers/{farmerId}": ["204"],
  "PUT /farmers/cascade-delete/{jobId}": ["202"],
  "GET /farmers/cascade-delete/{jobId}": ["200"],
  "PUT /farm-operations/ingest-data/{jobId}": ["202"],
  "GET /farm-operations/ingest-data/{jobId}": ["200"],
  "GET /farmers/{farmerId}/farms": ["200"],
  "GET /farmers/{farmerId}/farms/{farmId}": ["200"],
  "PATCH /farmers/{farmerId}/farms/{farmId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/farms/{farmId}": ["204"],
  "GET /farms": ["200"],
  "PUT /farms/cascade-delete/{jobId}": ["202"],
  "GET /farms/cascade-delete/{jobId}": ["200"],
  "GET /farmers/{farmerId}/fields": ["200"],
  "GET /farmers/{farmerId}/fields/{fieldId}": ["200"],
  "PATCH /farmers/{farmerId}/fields/{fieldId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/fields/{fieldId}": ["204"],
  "GET /fields": ["200"],
  "PUT /fields/cascade-delete/{jobId}": ["202"],
  "GET /fields/cascade-delete/{jobId}": ["200"],
  "GET /farmers/{farmerId}/harvest-data": ["200"],
  "GET /farmers/{farmerId}/harvest-data/{harvestDataId}": ["200"],
  "PATCH /farmers/{farmerId}/harvest-data/{harvestDataId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/harvest-data/{harvestDataId}": ["204"],
  "GET /harvest-data": ["200"],
  "PUT /harvest-data/cascade-delete/{jobId}": ["202"],
  "GET /harvest-data/cascade-delete/{jobId}": ["200"],
  "PUT /image-processing/rasterize/{jobId}": ["202"],
  "GET /image-processing/rasterize/{jobId}": ["200"],
  "GET /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments": [
    "200"
  ],
  "PATCH /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}": [
    "200",
    "201"
  ],
  "GET /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}": [
    "200"
  ],
  "DELETE /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}": [
    "204"
  ],
  "GET /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insight-attachments/{insightAttachmentId}/file": [
    "200"
  ],
  "GET /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights": [
    "200"
  ],
  "PATCH /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}": [
    "200",
    "201"
  ],
  "GET /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}": [
    "200"
  ],
  "DELETE /farmers/{farmerId}/models/{modelId}/resource-types/{resourceType}/resources/{resourceId}/insights/{insightId}": [
    "204"
  ],
  "PUT /insights/cascade-delete/{jobId}": ["202"],
  "GET /insights/cascade-delete/{jobId}": ["200"],
  "GET /farmers/{farmerId}/management-zones": ["200"],
  "GET /farmers/{farmerId}/management-zones/{managementZoneId}": ["200"],
  "PATCH /farmers/{farmerId}/management-zones/{managementZoneId}": [
    "200",
    "201"
  ],
  "DELETE /farmers/{farmerId}/management-zones/{managementZoneId}": ["204"],
  "GET /management-zones": ["200"],
  "GET /management-zones/cascade-delete/{jobId}": ["200"],
  "PUT /management-zones/cascade-delete/{jobId}": ["202"],
  "PUT /model-inference/models/microsoft-biomass/infer-data/{jobId}": ["202"],
  "GET /model-inference/models/microsoft-biomass/infer-data/{jobId}": ["200"],
  "PUT /model-inference/models/microsoft-soil-moisture/infer-data/{jobId}": [
    "202"
  ],
  "GET /model-inference/models/microsoft-soil-moisture/infer-data/{jobId}": [
    "200"
  ],
  "GET /farmers/{farmerId}/nutrient-analyses": ["200"],
  "GET /farmers/{farmerId}/nutrient-analyses/{nutrientAnalysisId}": ["200"],
  "PATCH /farmers/{farmerId}/nutrient-analyses/{nutrientAnalysisId}": [
    "200",
    "201"
  ],
  "DELETE /farmers/{farmerId}/nutrient-analyses/{nutrientAnalysisId}": ["204"],
  "GET /nutrient-analyses": ["200"],
  "GET /oauth/providers": ["200"],
  "GET /oauth/providers/{oauthProviderId}": ["200"],
  "PATCH /oauth/providers/{oauthProviderId}": ["200", "201"],
  "DELETE /oauth/providers/{oauthProviderId}": ["204"],
  "GET /oauth/providers/cascade-delete/{jobId}": ["200"],
  "PUT /oauth/providers/cascade-delete/{jobId}": ["202"],
  "GET /oauth/tokens": ["200"],
  "POST /oauth/tokens/:connect": ["200"],
  "PUT /oauth/tokens/remove/{jobId}": ["202"],
  "GET /oauth/tokens/remove/{jobId}": ["200"],
  "GET /farmers/{farmerId}/planting-data": ["200"],
  "GET /farmers/{farmerId}/planting-data/{plantingDataId}": ["200"],
  "PATCH /farmers/{farmerId}/planting-data/{plantingDataId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/planting-data/{plantingDataId}": ["204"],
  "GET /planting-data": ["200"],
  "PUT /planting-data/cascade-delete/{jobId}": ["202"],
  "GET /planting-data/cascade-delete/{jobId}": ["200"],
  "GET /farmers/{farmerId}/plant-tissue-analyses": ["200"],
  "GET /farmers/{farmerId}/plant-tissue-analyses/{plantTissueAnalysisId}": [
    "200"
  ],
  "PATCH /farmers/{farmerId}/plant-tissue-analyses/{plantTissueAnalysisId}": [
    "200",
    "201"
  ],
  "DELETE /farmers/{farmerId}/plant-tissue-analyses/{plantTissueAnalysisId}": [
    "204"
  ],
  "GET /plant-tissue-analyses": ["200"],
  "PUT /plant-tissue-analyses/cascade-delete/{jobId}": ["202"],
  "GET /plant-tissue-analyses/cascade-delete/{jobId}": ["200"],
  "GET /farmers/{farmerId}/prescription-maps": ["200"],
  "GET /farmers/{farmerId}/prescription-maps/{prescriptionMapId}": ["200"],
  "PATCH /farmers/{farmerId}/prescription-maps/{prescriptionMapId}": [
    "200",
    "201"
  ],
  "DELETE /farmers/{farmerId}/prescription-maps/{prescriptionMapId}": ["204"],
  "GET /prescription-maps": ["200"],
  "GET /prescription-maps/cascade-delete/{jobId}": ["200"],
  "PUT /prescription-maps/cascade-delete/{jobId}": ["202"],
  "GET /farmers/{farmerId}/prescriptions": ["200"],
  "GET /farmers/{farmerId}/prescriptions/{prescriptionId}": ["200"],
  "PATCH /farmers/{farmerId}/prescriptions/{prescriptionId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/prescriptions/{prescriptionId}": ["204"],
  "GET /prescriptions": ["200"],
  "GET /prescriptions/cascade-delete/{jobId}": ["200"],
  "PUT /prescriptions/cascade-delete/{jobId}": ["202"],
  "GET /scenes": ["200"],
  "GET /scenes/downloadFiles": ["200"],
  "PUT /scenes/satellite/ingest-data/{jobId}": ["202"],
  "GET /scenes/satellite/ingest-data/{jobId}": ["200"],
  "GET /farmers/{farmerId}/seasonal-fields": ["200"],
  "GET /farmers/{farmerId}/seasonal-fields/{seasonalFieldId}": ["200"],
  "PATCH /farmers/{farmerId}/seasonal-fields/{seasonalFieldId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/seasonal-fields/{seasonalFieldId}": ["204"],
  "GET /seasonal-fields": ["200"],
  "PUT /seasonal-fields/cascade-delete/{jobId}": ["202"],
  "GET /seasonal-fields/cascade-delete/{jobId}": ["200"],
  "GET /seasons": ["200"],
  "GET /seasons/{seasonId}": ["200"],
  "PATCH /seasons/{seasonId}": ["200", "201"],
  "DELETE /seasons/{seasonId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/sensor-data-models": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}": [
    "200",
    "201"
  ],
  "GET /sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}": [
    "200"
  ],
  "DELETE /sensor-partners/{sensorPartnerId}/sensor-data-models/{sensorDataModelId}": [
    "204"
  ],
  "GET /sensor-events": ["200"],
  "GET /sensor-mappings": ["200"],
  "PATCH /sensor-mappings/{sensorMappingId}": ["200", "201"],
  "GET /sensor-mappings/{sensorMappingId}": ["200"],
  "DELETE /sensor-mappings/{sensorMappingId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/integrations": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/integrations/{integrationId}": [
    "200",
    "201"
  ],
  "GET /sensor-partners/{sensorPartnerId}/integrations/{integrationId}": [
    "200"
  ],
  "DELETE /sensor-partners/{sensorPartnerId}/integrations/{integrationId}": [
    "204"
  ],
  "POST /sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:check-consent": [
    "200"
  ],
  "POST /sensor-partners/{sensorPartnerId}/integrations/{integrationId}/:generate-consent-link": [
    "200"
  ],
  "GET /sensor-partners/{sensorPartnerId}/sensors": ["200"],
  "PATCH /sensor-partners/{sensorPartnerId}/sensors/{sensorId}": ["200", "201"],
  "GET /sensor-partners/{sensorPartnerId}/sensors/{sensorId}": ["200"],
  "DELETE /sensor-partners/{sensorPartnerId}/sensors/{sensorId}": ["204"],
  "GET /sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings": [
    "200"
  ],
  "POST /sensor-partners/{sensorPartnerId}/sensors/{sensorId}/connection-strings/:renew": [
    "200"
  ],
  "POST /solutions/{solutionId}:cancel": ["200"],
  "POST /solutions/{solutionId}:create": ["202"],
  "GET /solutions/{solutionId}:create": ["202"],
  "POST /solutions/{solutionId}:fetch": ["200"],
  "GET /farmers/{farmerId}/tillage-data": ["200"],
  "GET /farmers/{farmerId}/tillage-data/{tillageDataId}": ["200"],
  "PATCH /farmers/{farmerId}/tillage-data/{tillageDataId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/tillage-data/{tillageDataId}": ["204"],
  "GET /tillage-data": ["200"],
  "PUT /tillage-data/cascade-delete/{jobId}": ["202"],
  "GET /tillage-data/cascade-delete/{jobId}": ["200"],
  "GET /weather": ["200"],
  "GET /weather/delete-data/{jobId}": ["200"],
  "PUT /weather/delete-data/{jobId}": ["202"],
  "GET /weather/ingest-data/{jobId}": ["200"],
  "PUT /weather/ingest-data/{jobId}": ["202"],
  "GET /farmers/{farmerId}/zones": ["200"],
  "GET /farmers/{farmerId}/zones/{zoneId}": ["200"],
  "PATCH /farmers/{farmerId}/zones/{zoneId}": ["200", "201"],
  "DELETE /farmers/{farmerId}/zones/{zoneId}": ["204"],
  "GET /zones": ["200"],
  "GET /zones/cascade-delete/{jobId}": ["200"],
  "PUT /zones/cascade-delete/{jobId}": ["202"]
};

export function isUnexpected(
  response: ApplicationDataList200Response | ApplicationDataListdefaultResponse
): response is ApplicationDataListdefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataCreateCascadeDeleteJob202Response
    | ApplicationDataCreateCascadeDeleteJobdefaultResponse
): response is ApplicationDataCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataGetCascadeDeleteJobDetails200Response
    | ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse
): response is ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataListByFarmerId200Response
    | ApplicationDataListByFarmerIddefaultResponse
): response is ApplicationDataListByFarmerIddefaultResponse;
export function isUnexpected(
  response: ApplicationDataGet200Response | ApplicationDataGetdefaultResponse
): response is ApplicationDataGetdefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdatedefaultResponse
): response is ApplicationDataCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataDelete204Response
    | ApplicationDataDeletedefaultResponse
): response is ApplicationDataDeletedefaultResponse;
export function isUnexpected(
  response:
    | AttachmentsListByFarmerId200Response
    | AttachmentsListByFarmerIddefaultResponse
): response is AttachmentsListByFarmerIddefaultResponse;
export function isUnexpected(
  response: AttachmentsGet200Response | AttachmentsGetdefaultResponse
): response is AttachmentsGetdefaultResponse;
export function isUnexpected(
  response:
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdatedefaultResponse
): response is AttachmentsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: AttachmentsDelete204Response | AttachmentsDeletedefaultResponse
): response is AttachmentsDeletedefaultResponse;
export function isUnexpected(
  response: AttachmentsDownload200Response | AttachmentsDownloaddefaultResponse
): response is AttachmentsDownloaddefaultResponse;
export function isUnexpected(
  response: BoundariesList200Response | BoundariesListdefaultResponse
): response is BoundariesListdefaultResponse;
export function isUnexpected(
  response: BoundariesSearch200Response | BoundariesSearchdefaultResponse
): response is BoundariesSearchdefaultResponse;
export function isUnexpected(
  response:
    | BoundariesCreateCascadeDeleteJob202Response
    | BoundariesCreateCascadeDeleteJobdefaultResponse
): response is BoundariesCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsdefaultResponse
): response is BoundariesGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | BoundariesListByFarmerId200Response
    | BoundariesListByFarmerIddefaultResponse
): response is BoundariesListByFarmerIddefaultResponse;
export function isUnexpected(
  response:
    | BoundariesSearchByFarmerId200Response
    | BoundariesSearchByFarmerIddefaultResponse
): response is BoundariesSearchByFarmerIddefaultResponse;
export function isUnexpected(
  response:
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdatedefaultResponse
): response is BoundariesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: BoundariesGet200Response | BoundariesGetdefaultResponse
): response is BoundariesGetdefaultResponse;
export function isUnexpected(
  response: BoundariesDelete204Response | BoundariesDeletedefaultResponse
): response is BoundariesDeletedefaultResponse;
export function isUnexpected(
  response:
    | BoundariesGetOverlap200Response
    | BoundariesGetOverlapdefaultResponse
): response is BoundariesGetOverlapdefaultResponse;
export function isUnexpected(
  response: CropsList200Response | CropsListdefaultResponse
): response is CropsListdefaultResponse;
export function isUnexpected(
  response: CropsGet200Response | CropsGetdefaultResponse
): response is CropsGetdefaultResponse;
export function isUnexpected(
  response:
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdatedefaultResponse
): response is CropsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: CropsDelete204Response | CropsDeletedefaultResponse
): response is CropsDeletedefaultResponse;
export function isUnexpected(
  response: CropVarietiesList200Response | CropVarietiesListdefaultResponse
): response is CropVarietiesListdefaultResponse;
export function isUnexpected(
  response: CropVarietiesGet200Response | CropVarietiesGetdefaultResponse
): response is CropVarietiesGetdefaultResponse;
export function isUnexpected(
  response:
    | CropVarietiesCreateOrUpdate200Response
    | CropVarietiesCreateOrUpdate201Response
    | CropVarietiesCreateOrUpdatedefaultResponse
): response is CropVarietiesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: CropVarietiesDelete204Response | CropVarietiesDeletedefaultResponse
): response is CropVarietiesDeletedefaultResponse;
export function isUnexpected(
  response:
    | DeviceDataModelsList200Response
    | DeviceDataModelsListdefaultResponse
): response is DeviceDataModelsListdefaultResponse;
export function isUnexpected(
  response:
    | DeviceDataModelsCreateOrUpdate200Response
    | DeviceDataModelsCreateOrUpdate201Response
    | DeviceDataModelsCreateOrUpdatedefaultResponse
): response is DeviceDataModelsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: DeviceDataModelsGet200Response | DeviceDataModelsGetdefaultResponse
): response is DeviceDataModelsGetdefaultResponse;
export function isUnexpected(
  response:
    | DeviceDataModelsDelete204Response
    | DeviceDataModelsDeletedefaultResponse
): response is DeviceDataModelsDeletedefaultResponse;
export function isUnexpected(
  response: DevicesList200Response | DevicesListdefaultResponse
): response is DevicesListdefaultResponse;
export function isUnexpected(
  response:
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdatedefaultResponse
): response is DevicesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: DevicesGet200Response | DevicesGetdefaultResponse
): response is DevicesGetdefaultResponse;
export function isUnexpected(
  response: DevicesDelete204Response | DevicesDeletedefaultResponse
): response is DevicesDeletedefaultResponse;
export function isUnexpected(
  response: FarmersList200Response | FarmersListdefaultResponse
): response is FarmersListdefaultResponse;
export function isUnexpected(
  response: FarmersGet200Response | FarmersGetdefaultResponse
): response is FarmersGetdefaultResponse;
export function isUnexpected(
  response:
    | FarmersCreateOrUpdate200Response
    | FarmersCreateOrUpdate201Response
    | FarmersCreateOrUpdatedefaultResponse
): response is FarmersCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: FarmersDelete204Response | FarmersDeletedefaultResponse
): response is FarmersDeletedefaultResponse;
export function isUnexpected(
  response:
    | FarmersCreateCascadeDeleteJob202Response
    | FarmersCreateCascadeDeleteJobdefaultResponse
): response is FarmersCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | FarmersGetCascadeDeleteJobDetails200Response
    | FarmersGetCascadeDeleteJobDetailsdefaultResponse
): response is FarmersGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobdefaultResponse
): response is FarmOperationsCreateDataIngestionJobdefaultResponse;
export function isUnexpected(
  response:
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsdefaultResponse
): response is FarmOperationsGetDataIngestionJobDetailsdefaultResponse;
export function isUnexpected(
  response: FarmsListByFarmerId200Response | FarmsListByFarmerIddefaultResponse
): response is FarmsListByFarmerIddefaultResponse;
export function isUnexpected(
  response: FarmsGet200Response | FarmsGetdefaultResponse
): response is FarmsGetdefaultResponse;
export function isUnexpected(
  response:
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdatedefaultResponse
): response is FarmsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: FarmsDelete204Response | FarmsDeletedefaultResponse
): response is FarmsDeletedefaultResponse;
export function isUnexpected(
  response: FarmsList200Response | FarmsListdefaultResponse
): response is FarmsListdefaultResponse;
export function isUnexpected(
  response:
    | FarmsCreateCascadeDeleteJob202Response
    | FarmsCreateCascadeDeleteJobdefaultResponse
): response is FarmsCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | FarmsGetCascadeDeleteJobDetails200Response
    | FarmsGetCascadeDeleteJobDetailsdefaultResponse
): response is FarmsGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | FieldsListByFarmerId200Response
    | FieldsListByFarmerIddefaultResponse
): response is FieldsListByFarmerIddefaultResponse;
export function isUnexpected(
  response: FieldsGet200Response | FieldsGetdefaultResponse
): response is FieldsGetdefaultResponse;
export function isUnexpected(
  response:
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdatedefaultResponse
): response is FieldsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: FieldsDelete204Response | FieldsDeletedefaultResponse
): response is FieldsDeletedefaultResponse;
export function isUnexpected(
  response: FieldsList200Response | FieldsListdefaultResponse
): response is FieldsListdefaultResponse;
export function isUnexpected(
  response:
    | FieldsCreateCascadeDeleteJob202Response
    | FieldsCreateCascadeDeleteJobdefaultResponse
): response is FieldsCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | FieldsGetCascadeDeleteJobDetails200Response
    | FieldsGetCascadeDeleteJobDetailsdefaultResponse
): response is FieldsGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | HarvestDataListByFarmerId200Response
    | HarvestDataListByFarmerIddefaultResponse
): response is HarvestDataListByFarmerIddefaultResponse;
export function isUnexpected(
  response: HarvestDataGet200Response | HarvestDataGetdefaultResponse
): response is HarvestDataGetdefaultResponse;
export function isUnexpected(
  response:
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdatedefaultResponse
): response is HarvestDataCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: HarvestDataDelete204Response | HarvestDataDeletedefaultResponse
): response is HarvestDataDeletedefaultResponse;
export function isUnexpected(
  response: HarvestDataList200Response | HarvestDataListdefaultResponse
): response is HarvestDataListdefaultResponse;
export function isUnexpected(
  response:
    | HarvestDataCreateCascadeDeleteJob202Response
    | HarvestDataCreateCascadeDeleteJobdefaultResponse
): response is HarvestDataCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | HarvestDataGetCascadeDeleteJobDetails200Response
    | HarvestDataGetCascadeDeleteJobDetailsdefaultResponse
): response is HarvestDataGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | ImageProcessingCreateRasterizeJob202Response
    | ImageProcessingCreateRasterizeJobdefaultResponse
): response is ImageProcessingCreateRasterizeJobdefaultResponse;
export function isUnexpected(
  response:
    | InsightAttachmentsListByFarmerIdModelIdAndResource200Response
    | InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultResponse
): response is InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultResponse;
export function isUnexpected(
  response:
    | InsightAttachmentsCreateOrUpdate200Response
    | InsightAttachmentsCreateOrUpdate201Response
    | InsightAttachmentsCreateOrUpdatedefaultResponse
): response is InsightAttachmentsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | InsightAttachmentsGet200Response
    | InsightAttachmentsGetdefaultResponse
): response is InsightAttachmentsGetdefaultResponse;
export function isUnexpected(
  response:
    | InsightAttachmentsDelete204Response
    | InsightAttachmentsDeletedefaultResponse
): response is InsightAttachmentsDeletedefaultResponse;
export function isUnexpected(
  response:
    | InsightAttachmentsDownload200Response
    | InsightAttachmentsDownloaddefaultResponse
): response is InsightAttachmentsDownloaddefaultResponse;
export function isUnexpected(
  response:
    | InsightsListByFarmerIdModelIdAndResource200Response
    | InsightsListByFarmerIdModelIdAndResourcedefaultResponse
): response is InsightsListByFarmerIdModelIdAndResourcedefaultResponse;
export function isUnexpected(
  response:
    | InsightsCreateOrUpdate200Response
    | InsightsCreateOrUpdate201Response
    | InsightsCreateOrUpdatedefaultResponse
): response is InsightsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: InsightsGet200Response | InsightsGetdefaultResponse
): response is InsightsGetdefaultResponse;
export function isUnexpected(
  response: InsightsDelete204Response | InsightsDeletedefaultResponse
): response is InsightsDeletedefaultResponse;
export function isUnexpected(
  response:
    | InsightsCreateCascadeDeleteJob202Response
    | InsightsCreateCascadeDeleteJobdefaultResponse
): response is InsightsCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | InsightsGetCascadeDeleteJobDetails200Response
    | InsightsGetCascadeDeleteJobDetailsdefaultResponse
): response is InsightsGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesListByFarmerId200Response
    | ManagementZonesListByFarmerIddefaultResponse
): response is ManagementZonesListByFarmerIddefaultResponse;
export function isUnexpected(
  response: ManagementZonesGet200Response | ManagementZonesGetdefaultResponse
): response is ManagementZonesGetdefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesCreateOrUpdate200Response
    | ManagementZonesCreateOrUpdate201Response
    | ManagementZonesCreateOrUpdatedefaultResponse
): response is ManagementZonesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesDelete204Response
    | ManagementZonesDeletedefaultResponse
): response is ManagementZonesDeletedefaultResponse;
export function isUnexpected(
  response: ManagementZonesList200Response | ManagementZonesListdefaultResponse
): response is ManagementZonesListdefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesGetCascadeDeleteJobDetails200Response
    | ManagementZonesGetCascadeDeleteJobDetailsdefaultResponse
): response is ManagementZonesGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | ManagementZonesCreateCascadeDeleteJob202Response
    | ManagementZonesCreateCascadeDeleteJobdefaultResponse
): response is ManagementZonesCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceCreateBiomassModelJob202Response
    | ModelInferenceCreateBiomassModelJobdefaultResponse
): response is ModelInferenceCreateBiomassModelJobdefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceGetBiomassModelJob200Response
    | ModelInferenceGetBiomassModelJobdefaultResponse
): response is ModelInferenceGetBiomassModelJobdefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceCreateSoilMoistureModelJob202Response
    | ModelInferenceCreateSoilMoistureModelJobdefaultResponse
): response is ModelInferenceCreateSoilMoistureModelJobdefaultResponse;
export function isUnexpected(
  response:
    | ModelInferenceGetSoilMoistureModelJob200Response
    | ModelInferenceGetSoilMoistureModelJobdefaultResponse
): response is ModelInferenceGetSoilMoistureModelJobdefaultResponse;
export function isUnexpected(
  response:
    | NutrientAnalysesListByFarmerId200Response
    | NutrientAnalysesListByFarmerIddefaultResponse
): response is NutrientAnalysesListByFarmerIddefaultResponse;
export function isUnexpected(
  response: NutrientAnalysesGet200Response | NutrientAnalysesGetdefaultResponse
): response is NutrientAnalysesGetdefaultResponse;
export function isUnexpected(
  response:
    | NutrientAnalysesCreateOrUpdate200Response
    | NutrientAnalysesCreateOrUpdate201Response
    | NutrientAnalysesCreateOrUpdatedefaultResponse
): response is NutrientAnalysesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | NutrientAnalysesDelete204Response
    | NutrientAnalysesDeletedefaultResponse
): response is NutrientAnalysesDeletedefaultResponse;
export function isUnexpected(
  response:
    | NutrientAnalysesList200Response
    | NutrientAnalysesListdefaultResponse
): response is NutrientAnalysesListdefaultResponse;
export function isUnexpected(
  response: OAuthProvidersList200Response | OAuthProvidersListdefaultResponse
): response is OAuthProvidersListdefaultResponse;
export function isUnexpected(
  response: OAuthProvidersGet200Response | OAuthProvidersGetdefaultResponse
): response is OAuthProvidersGetdefaultResponse;
export function isUnexpected(
  response:
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdatedefaultResponse
): response is OAuthProvidersCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | OAuthProvidersDelete204Response
    | OAuthProvidersDeletedefaultResponse
): response is OAuthProvidersDeletedefaultResponse;
export function isUnexpected(
  response:
    | OAuthProvidersGetCascadeDeleteJobDetails200Response
    | OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse
): response is OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | OAuthProvidersCreateCascadeDeleteJob202Response
    | OAuthProvidersCreateCascadeDeleteJobdefaultResponse
): response is OAuthProvidersCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response: OAuthTokensList200Response | OAuthTokensListdefaultResponse
): response is OAuthTokensListdefaultResponse;
export function isUnexpected(
  response:
    | OAuthTokensGetOAuthConnectionLink200Response
    | OAuthTokensGetOAuthConnectionLinkdefaultResponse
): response is OAuthTokensGetOAuthConnectionLinkdefaultResponse;
export function isUnexpected(
  response:
    | OAuthTokensCreateCascadeDeleteJob202Response
    | OAuthTokensCreateCascadeDeleteJobdefaultResponse
): response is OAuthTokensCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
): response is OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | PlantingDataListByFarmerId200Response
    | PlantingDataListByFarmerIddefaultResponse
): response is PlantingDataListByFarmerIddefaultResponse;
export function isUnexpected(
  response: PlantingDataGet200Response | PlantingDataGetdefaultResponse
): response is PlantingDataGetdefaultResponse;
export function isUnexpected(
  response:
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdatedefaultResponse
): response is PlantingDataCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: PlantingDataDelete204Response | PlantingDataDeletedefaultResponse
): response is PlantingDataDeletedefaultResponse;
export function isUnexpected(
  response: PlantingDataList200Response | PlantingDataListdefaultResponse
): response is PlantingDataListdefaultResponse;
export function isUnexpected(
  response:
    | PlantingDataCreateCascadeDeleteJob202Response
    | PlantingDataCreateCascadeDeleteJobdefaultResponse
): response is PlantingDataCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | PlantingDataGetCascadeDeleteJobDetails200Response
    | PlantingDataGetCascadeDeleteJobDetailsdefaultResponse
): response is PlantingDataGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesListByFarmerId200Response
    | PlantTissueAnalysesListByFarmerIddefaultResponse
): response is PlantTissueAnalysesListByFarmerIddefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesGet200Response
    | PlantTissueAnalysesGetdefaultResponse
): response is PlantTissueAnalysesGetdefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesCreateOrUpdate200Response
    | PlantTissueAnalysesCreateOrUpdate201Response
    | PlantTissueAnalysesCreateOrUpdatedefaultResponse
): response is PlantTissueAnalysesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesDelete204Response
    | PlantTissueAnalysesDeletedefaultResponse
): response is PlantTissueAnalysesDeletedefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesList200Response
    | PlantTissueAnalysesListdefaultResponse
): response is PlantTissueAnalysesListdefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesCreateCascadeDeleteJob202Response
    | PlantTissueAnalysesCreateCascadeDeleteJobdefaultResponse
): response is PlantTissueAnalysesCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | PlantTissueAnalysesGetCascadeDeleteJobDetails200Response
    | PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultResponse
): response is PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsListByFarmerId200Response
    | PrescriptionMapsListByFarmerIddefaultResponse
): response is PrescriptionMapsListByFarmerIddefaultResponse;
export function isUnexpected(
  response: PrescriptionMapsGet200Response | PrescriptionMapsGetdefaultResponse
): response is PrescriptionMapsGetdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsCreateOrUpdate200Response
    | PrescriptionMapsCreateOrUpdate201Response
    | PrescriptionMapsCreateOrUpdatedefaultResponse
): response is PrescriptionMapsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsDelete204Response
    | PrescriptionMapsDeletedefaultResponse
): response is PrescriptionMapsDeletedefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsList200Response
    | PrescriptionMapsListdefaultResponse
): response is PrescriptionMapsListdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsGetCascadeDeleteJobDetails200Response
    | PrescriptionMapsGetCascadeDeleteJobDetailsdefaultResponse
): response is PrescriptionMapsGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionMapsCreateCascadeDeleteJob202Response
    | PrescriptionMapsCreateCascadeDeleteJobdefaultResponse
): response is PrescriptionMapsCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionsListByFarmerId200Response
    | PrescriptionsListByFarmerIddefaultResponse
): response is PrescriptionsListByFarmerIddefaultResponse;
export function isUnexpected(
  response: PrescriptionsGet200Response | PrescriptionsGetdefaultResponse
): response is PrescriptionsGetdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionsCreateOrUpdate200Response
    | PrescriptionsCreateOrUpdate201Response
    | PrescriptionsCreateOrUpdatedefaultResponse
): response is PrescriptionsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: PrescriptionsDelete204Response | PrescriptionsDeletedefaultResponse
): response is PrescriptionsDeletedefaultResponse;
export function isUnexpected(
  response: PrescriptionsList200Response | PrescriptionsListdefaultResponse
): response is PrescriptionsListdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionsGetCascadeDeleteJobDetails200Response
    | PrescriptionsGetCascadeDeleteJobDetailsdefaultResponse
): response is PrescriptionsGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | PrescriptionsCreateCascadeDeleteJob202Response
    | PrescriptionsCreateCascadeDeleteJobdefaultResponse
): response is PrescriptionsCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response: ScenesList200Response | ScenesListdefaultResponse
): response is ScenesListdefaultResponse;
export function isUnexpected(
  response: ScenesDownload200Response | ScenesDownloaddefaultResponse
): response is ScenesDownloaddefaultResponse;
export function isUnexpected(
  response:
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobdefaultResponse
): response is ScenesCreateSatelliteDataIngestionJobdefaultResponse;
export function isUnexpected(
  response:
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
): response is ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsListByFarmerId200Response
    | SeasonalFieldsListByFarmerIddefaultResponse
): response is SeasonalFieldsListByFarmerIddefaultResponse;
export function isUnexpected(
  response: SeasonalFieldsGet200Response | SeasonalFieldsGetdefaultResponse
): response is SeasonalFieldsGetdefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdatedefaultResponse
): response is SeasonalFieldsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsDelete204Response
    | SeasonalFieldsDeletedefaultResponse
): response is SeasonalFieldsDeletedefaultResponse;
export function isUnexpected(
  response: SeasonalFieldsList200Response | SeasonalFieldsListdefaultResponse
): response is SeasonalFieldsListdefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
): response is SeasonalFieldsCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
): response is SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response: SeasonsList200Response | SeasonsListdefaultResponse
): response is SeasonsListdefaultResponse;
export function isUnexpected(
  response: SeasonsGet200Response | SeasonsGetdefaultResponse
): response is SeasonsGetdefaultResponse;
export function isUnexpected(
  response:
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdatedefaultResponse
): response is SeasonsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: SeasonsDelete204Response | SeasonsDeletedefaultResponse
): response is SeasonsDeletedefaultResponse;
export function isUnexpected(
  response:
    | SensorDataModelsList200Response
    | SensorDataModelsListdefaultResponse
): response is SensorDataModelsListdefaultResponse;
export function isUnexpected(
  response:
    | SensorDataModelsCreateOrUpdate200Response
    | SensorDataModelsCreateOrUpdate201Response
    | SensorDataModelsCreateOrUpdatedefaultResponse
): response is SensorDataModelsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: SensorDataModelsGet200Response | SensorDataModelsGetdefaultResponse
): response is SensorDataModelsGetdefaultResponse;
export function isUnexpected(
  response:
    | SensorDataModelsDelete204Response
    | SensorDataModelsDeletedefaultResponse
): response is SensorDataModelsDeletedefaultResponse;
export function isUnexpected(
  response: SensorEventsList200Response | SensorEventsListdefaultResponse
): response is SensorEventsListdefaultResponse;
export function isUnexpected(
  response: SensorMappingsList200Response | SensorMappingsListdefaultResponse
): response is SensorMappingsListdefaultResponse;
export function isUnexpected(
  response:
    | SensorMappingsCreateOrUpdate200Response
    | SensorMappingsCreateOrUpdate201Response
    | SensorMappingsCreateOrUpdatedefaultResponse
): response is SensorMappingsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: SensorMappingsGet200Response | SensorMappingsGetdefaultResponse
): response is SensorMappingsGetdefaultResponse;
export function isUnexpected(
  response:
    | SensorMappingsDelete204Response
    | SensorMappingsDeletedefaultResponse
): response is SensorMappingsDeletedefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsList200Response
    | SensorPartnerIntegrationsListdefaultResponse
): response is SensorPartnerIntegrationsListdefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsCreateOrUpdate200Response
    | SensorPartnerIntegrationsCreateOrUpdate201Response
    | SensorPartnerIntegrationsCreateOrUpdatedefaultResponse
): response is SensorPartnerIntegrationsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsGet200Response
    | SensorPartnerIntegrationsGetdefaultResponse
): response is SensorPartnerIntegrationsGetdefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsDelete204Response
    | SensorPartnerIntegrationsDeletedefaultResponse
): response is SensorPartnerIntegrationsDeletedefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsCheckConsent200Response
    | SensorPartnerIntegrationsCheckConsentdefaultResponse
): response is SensorPartnerIntegrationsCheckConsentdefaultResponse;
export function isUnexpected(
  response:
    | SensorPartnerIntegrationsGenerateConsentLink200Response
    | SensorPartnerIntegrationsGenerateConsentLinkdefaultResponse
): response is SensorPartnerIntegrationsGenerateConsentLinkdefaultResponse;
export function isUnexpected(
  response: SensorsList200Response | SensorsListdefaultResponse
): response is SensorsListdefaultResponse;
export function isUnexpected(
  response:
    | SensorsCreateOrUpdate200Response
    | SensorsCreateOrUpdate201Response
    | SensorsCreateOrUpdatedefaultResponse
): response is SensorsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: SensorsGet200Response | SensorsGetdefaultResponse
): response is SensorsGetdefaultResponse;
export function isUnexpected(
  response: SensorsDelete204Response | SensorsDeletedefaultResponse
): response is SensorsDeletedefaultResponse;
export function isUnexpected(
  response:
    | SensorsGetConnectionString200Response
    | SensorsGetConnectionStringdefaultResponse
): response is SensorsGetConnectionStringdefaultResponse;
export function isUnexpected(
  response:
    | SensorsRenewConnectionString200Response
    | SensorsRenewConnectionStringdefaultResponse
): response is SensorsRenewConnectionStringdefaultResponse;
export function isUnexpected(
  response:
    | SolutionInferenceCancel200Response
    | SolutionInferenceCanceldefaultResponse
): response is SolutionInferenceCanceldefaultResponse;
export function isUnexpected(
  response:
    | SolutionInferenceCreateOrUpdate202Response
    | SolutionInferenceCreateOrUpdatedefaultResponse
): response is SolutionInferenceCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | SolutionInferenceFetch200Response
    | SolutionInferenceFetchdefaultResponse
): response is SolutionInferenceFetchdefaultResponse;
export function isUnexpected(
  response:
    | TillageDataListByFarmerId200Response
    | TillageDataListByFarmerIddefaultResponse
): response is TillageDataListByFarmerIddefaultResponse;
export function isUnexpected(
  response: TillageDataGet200Response | TillageDataGetdefaultResponse
): response is TillageDataGetdefaultResponse;
export function isUnexpected(
  response:
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdatedefaultResponse
): response is TillageDataCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: TillageDataDelete204Response | TillageDataDeletedefaultResponse
): response is TillageDataDeletedefaultResponse;
export function isUnexpected(
  response: TillageDataList200Response | TillageDataListdefaultResponse
): response is TillageDataListdefaultResponse;
export function isUnexpected(
  response:
    | TillageDataCreateCascadeDeleteJob202Response
    | TillageDataCreateCascadeDeleteJobdefaultResponse
): response is TillageDataCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | TillageDataGetCascadeDeleteJobDetails200Response
    | TillageDataGetCascadeDeleteJobDetailsdefaultResponse
): response is TillageDataGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response: WeatherList200Response | WeatherListdefaultResponse
): response is WeatherListdefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDataDeleteJobDetails200Response
    | WeatherGetDataDeleteJobDetailsdefaultResponse
): response is WeatherGetDataDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | WeatherCreateDataDeleteJob202Response
    | WeatherCreateDataDeleteJobdefaultResponse
): response is WeatherCreateDataDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | WeatherGetDataIngestionJobDetails200Response
    | WeatherGetDataIngestionJobDetailsdefaultResponse
): response is WeatherGetDataIngestionJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | WeatherCreateDataIngestionJob202Response
    | WeatherCreateDataIngestionJobdefaultResponse
): response is WeatherCreateDataIngestionJobdefaultResponse;
export function isUnexpected(
  response: ZonesListByFarmerId200Response | ZonesListByFarmerIddefaultResponse
): response is ZonesListByFarmerIddefaultResponse;
export function isUnexpected(
  response: ZonesGet200Response | ZonesGetdefaultResponse
): response is ZonesGetdefaultResponse;
export function isUnexpected(
  response:
    | ZonesCreateOrUpdate200Response
    | ZonesCreateOrUpdate201Response
    | ZonesCreateOrUpdatedefaultResponse
): response is ZonesCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: ZonesDelete204Response | ZonesDeletedefaultResponse
): response is ZonesDeletedefaultResponse;
export function isUnexpected(
  response: ZonesList200Response | ZonesListdefaultResponse
): response is ZonesListdefaultResponse;
export function isUnexpected(
  response:
    | ZonesGetCascadeDeleteJobDetails200Response
    | ZonesGetCascadeDeleteJobDetailsdefaultResponse
): response is ZonesGetCascadeDeleteJobDetailsdefaultResponse;
export function isUnexpected(
  response:
    | ZonesCreateCascadeDeleteJob202Response
    | ZonesCreateCascadeDeleteJobdefaultResponse
): response is ZonesCreateCascadeDeleteJobdefaultResponse;
export function isUnexpected(
  response:
    | ApplicationDataList200Response
    | ApplicationDataListdefaultResponse
    | ApplicationDataCreateCascadeDeleteJob202Response
    | ApplicationDataCreateCascadeDeleteJobdefaultResponse
    | ApplicationDataGetCascadeDeleteJobDetails200Response
    | ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse
    | ApplicationDataListByFarmerId200Response
    | ApplicationDataListByFarmerIddefaultResponse
    | ApplicationDataGet200Response
    | ApplicationDataGetdefaultResponse
    | ApplicationDataCreateOrUpdate200Response
    | ApplicationDataCreateOrUpdate201Response
    | ApplicationDataCreateOrUpdatedefaultResponse
    | ApplicationDataDelete204Response
    | ApplicationDataDeletedefaultResponse
    | AttachmentsListByFarmerId200Response
    | AttachmentsListByFarmerIddefaultResponse
    | AttachmentsGet200Response
    | AttachmentsGetdefaultResponse
    | AttachmentsCreateOrUpdate200Response
    | AttachmentsCreateOrUpdate201Response
    | AttachmentsCreateOrUpdatedefaultResponse
    | AttachmentsDelete204Response
    | AttachmentsDeletedefaultResponse
    | AttachmentsDownload200Response
    | AttachmentsDownloaddefaultResponse
    | BoundariesList200Response
    | BoundariesListdefaultResponse
    | BoundariesSearch200Response
    | BoundariesSearchdefaultResponse
    | BoundariesCreateCascadeDeleteJob202Response
    | BoundariesCreateCascadeDeleteJobdefaultResponse
    | BoundariesGetCascadeDeleteJobDetails200Response
    | BoundariesGetCascadeDeleteJobDetailsdefaultResponse
    | BoundariesListByFarmerId200Response
    | BoundariesListByFarmerIddefaultResponse
    | BoundariesSearchByFarmerId200Response
    | BoundariesSearchByFarmerIddefaultResponse
    | BoundariesCreateOrUpdate200Response
    | BoundariesCreateOrUpdate201Response
    | BoundariesCreateOrUpdatedefaultResponse
    | BoundariesGet200Response
    | BoundariesGetdefaultResponse
    | BoundariesDelete204Response
    | BoundariesDeletedefaultResponse
    | BoundariesGetOverlap200Response
    | BoundariesGetOverlapdefaultResponse
    | CropsList200Response
    | CropsListdefaultResponse
    | CropsGet200Response
    | CropsGetdefaultResponse
    | CropsCreateOrUpdate200Response
    | CropsCreateOrUpdate201Response
    | CropsCreateOrUpdatedefaultResponse
    | CropsDelete204Response
    | CropsDeletedefaultResponse
    | CropVarietiesList200Response
    | CropVarietiesListdefaultResponse
    | CropVarietiesGet200Response
    | CropVarietiesGetdefaultResponse
    | CropVarietiesCreateOrUpdate200Response
    | CropVarietiesCreateOrUpdate201Response
    | CropVarietiesCreateOrUpdatedefaultResponse
    | CropVarietiesDelete204Response
    | CropVarietiesDeletedefaultResponse
    | DeviceDataModelsList200Response
    | DeviceDataModelsListdefaultResponse
    | DeviceDataModelsCreateOrUpdate200Response
    | DeviceDataModelsCreateOrUpdate201Response
    | DeviceDataModelsCreateOrUpdatedefaultResponse
    | DeviceDataModelsGet200Response
    | DeviceDataModelsGetdefaultResponse
    | DeviceDataModelsDelete204Response
    | DeviceDataModelsDeletedefaultResponse
    | DevicesList200Response
    | DevicesListdefaultResponse
    | DevicesCreateOrUpdate200Response
    | DevicesCreateOrUpdate201Response
    | DevicesCreateOrUpdatedefaultResponse
    | DevicesGet200Response
    | DevicesGetdefaultResponse
    | DevicesDelete204Response
    | DevicesDeletedefaultResponse
    | FarmersList200Response
    | FarmersListdefaultResponse
    | FarmersGet200Response
    | FarmersGetdefaultResponse
    | FarmersCreateOrUpdate200Response
    | FarmersCreateOrUpdate201Response
    | FarmersCreateOrUpdatedefaultResponse
    | FarmersDelete204Response
    | FarmersDeletedefaultResponse
    | FarmersCreateCascadeDeleteJob202Response
    | FarmersCreateCascadeDeleteJobdefaultResponse
    | FarmersGetCascadeDeleteJobDetails200Response
    | FarmersGetCascadeDeleteJobDetailsdefaultResponse
    | FarmOperationsCreateDataIngestionJob202Response
    | FarmOperationsCreateDataIngestionJobdefaultResponse
    | FarmOperationsGetDataIngestionJobDetails200Response
    | FarmOperationsGetDataIngestionJobDetailsdefaultResponse
    | FarmsListByFarmerId200Response
    | FarmsListByFarmerIddefaultResponse
    | FarmsGet200Response
    | FarmsGetdefaultResponse
    | FarmsCreateOrUpdate200Response
    | FarmsCreateOrUpdate201Response
    | FarmsCreateOrUpdatedefaultResponse
    | FarmsDelete204Response
    | FarmsDeletedefaultResponse
    | FarmsList200Response
    | FarmsListdefaultResponse
    | FarmsCreateCascadeDeleteJob202Response
    | FarmsCreateCascadeDeleteJobdefaultResponse
    | FarmsGetCascadeDeleteJobDetails200Response
    | FarmsGetCascadeDeleteJobDetailsdefaultResponse
    | FieldsListByFarmerId200Response
    | FieldsListByFarmerIddefaultResponse
    | FieldsGet200Response
    | FieldsGetdefaultResponse
    | FieldsCreateOrUpdate200Response
    | FieldsCreateOrUpdate201Response
    | FieldsCreateOrUpdatedefaultResponse
    | FieldsDelete204Response
    | FieldsDeletedefaultResponse
    | FieldsList200Response
    | FieldsListdefaultResponse
    | FieldsCreateCascadeDeleteJob202Response
    | FieldsCreateCascadeDeleteJobdefaultResponse
    | FieldsGetCascadeDeleteJobDetails200Response
    | FieldsGetCascadeDeleteJobDetailsdefaultResponse
    | HarvestDataListByFarmerId200Response
    | HarvestDataListByFarmerIddefaultResponse
    | HarvestDataGet200Response
    | HarvestDataGetdefaultResponse
    | HarvestDataCreateOrUpdate200Response
    | HarvestDataCreateOrUpdate201Response
    | HarvestDataCreateOrUpdatedefaultResponse
    | HarvestDataDelete204Response
    | HarvestDataDeletedefaultResponse
    | HarvestDataList200Response
    | HarvestDataListdefaultResponse
    | HarvestDataCreateCascadeDeleteJob202Response
    | HarvestDataCreateCascadeDeleteJobdefaultResponse
    | HarvestDataGetCascadeDeleteJobDetails200Response
    | HarvestDataGetCascadeDeleteJobDetailsdefaultResponse
    | ImageProcessingCreateRasterizeJob202Response
    | ImageProcessingCreateRasterizeJobdefaultResponse
    | InsightAttachmentsListByFarmerIdModelIdAndResource200Response
    | InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultResponse
    | InsightAttachmentsCreateOrUpdate200Response
    | InsightAttachmentsCreateOrUpdate201Response
    | InsightAttachmentsCreateOrUpdatedefaultResponse
    | InsightAttachmentsGet200Response
    | InsightAttachmentsGetdefaultResponse
    | InsightAttachmentsDelete204Response
    | InsightAttachmentsDeletedefaultResponse
    | InsightAttachmentsDownload200Response
    | InsightAttachmentsDownloaddefaultResponse
    | InsightsListByFarmerIdModelIdAndResource200Response
    | InsightsListByFarmerIdModelIdAndResourcedefaultResponse
    | InsightsCreateOrUpdate200Response
    | InsightsCreateOrUpdate201Response
    | InsightsCreateOrUpdatedefaultResponse
    | InsightsGet200Response
    | InsightsGetdefaultResponse
    | InsightsDelete204Response
    | InsightsDeletedefaultResponse
    | InsightsCreateCascadeDeleteJob202Response
    | InsightsCreateCascadeDeleteJobdefaultResponse
    | InsightsGetCascadeDeleteJobDetails200Response
    | InsightsGetCascadeDeleteJobDetailsdefaultResponse
    | ManagementZonesListByFarmerId200Response
    | ManagementZonesListByFarmerIddefaultResponse
    | ManagementZonesGet200Response
    | ManagementZonesGetdefaultResponse
    | ManagementZonesCreateOrUpdate200Response
    | ManagementZonesCreateOrUpdate201Response
    | ManagementZonesCreateOrUpdatedefaultResponse
    | ManagementZonesDelete204Response
    | ManagementZonesDeletedefaultResponse
    | ManagementZonesList200Response
    | ManagementZonesListdefaultResponse
    | ManagementZonesGetCascadeDeleteJobDetails200Response
    | ManagementZonesGetCascadeDeleteJobDetailsdefaultResponse
    | ManagementZonesCreateCascadeDeleteJob202Response
    | ManagementZonesCreateCascadeDeleteJobdefaultResponse
    | ModelInferenceCreateBiomassModelJob202Response
    | ModelInferenceCreateBiomassModelJobdefaultResponse
    | ModelInferenceGetBiomassModelJob200Response
    | ModelInferenceGetBiomassModelJobdefaultResponse
    | ModelInferenceCreateSoilMoistureModelJob202Response
    | ModelInferenceCreateSoilMoistureModelJobdefaultResponse
    | ModelInferenceGetSoilMoistureModelJob200Response
    | ModelInferenceGetSoilMoistureModelJobdefaultResponse
    | NutrientAnalysesListByFarmerId200Response
    | NutrientAnalysesListByFarmerIddefaultResponse
    | NutrientAnalysesGet200Response
    | NutrientAnalysesGetdefaultResponse
    | NutrientAnalysesCreateOrUpdate200Response
    | NutrientAnalysesCreateOrUpdate201Response
    | NutrientAnalysesCreateOrUpdatedefaultResponse
    | NutrientAnalysesDelete204Response
    | NutrientAnalysesDeletedefaultResponse
    | NutrientAnalysesList200Response
    | NutrientAnalysesListdefaultResponse
    | OAuthProvidersList200Response
    | OAuthProvidersListdefaultResponse
    | OAuthProvidersGet200Response
    | OAuthProvidersGetdefaultResponse
    | OAuthProvidersCreateOrUpdate200Response
    | OAuthProvidersCreateOrUpdate201Response
    | OAuthProvidersCreateOrUpdatedefaultResponse
    | OAuthProvidersDelete204Response
    | OAuthProvidersDeletedefaultResponse
    | OAuthProvidersGetCascadeDeleteJobDetails200Response
    | OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse
    | OAuthProvidersCreateCascadeDeleteJob202Response
    | OAuthProvidersCreateCascadeDeleteJobdefaultResponse
    | OAuthTokensList200Response
    | OAuthTokensListdefaultResponse
    | OAuthTokensGetOAuthConnectionLink200Response
    | OAuthTokensGetOAuthConnectionLinkdefaultResponse
    | OAuthTokensCreateCascadeDeleteJob202Response
    | OAuthTokensCreateCascadeDeleteJobdefaultResponse
    | OAuthTokensGetCascadeDeleteJobDetails200Response
    | OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
    | PlantingDataListByFarmerId200Response
    | PlantingDataListByFarmerIddefaultResponse
    | PlantingDataGet200Response
    | PlantingDataGetdefaultResponse
    | PlantingDataCreateOrUpdate200Response
    | PlantingDataCreateOrUpdate201Response
    | PlantingDataCreateOrUpdatedefaultResponse
    | PlantingDataDelete204Response
    | PlantingDataDeletedefaultResponse
    | PlantingDataList200Response
    | PlantingDataListdefaultResponse
    | PlantingDataCreateCascadeDeleteJob202Response
    | PlantingDataCreateCascadeDeleteJobdefaultResponse
    | PlantingDataGetCascadeDeleteJobDetails200Response
    | PlantingDataGetCascadeDeleteJobDetailsdefaultResponse
    | PlantTissueAnalysesListByFarmerId200Response
    | PlantTissueAnalysesListByFarmerIddefaultResponse
    | PlantTissueAnalysesGet200Response
    | PlantTissueAnalysesGetdefaultResponse
    | PlantTissueAnalysesCreateOrUpdate200Response
    | PlantTissueAnalysesCreateOrUpdate201Response
    | PlantTissueAnalysesCreateOrUpdatedefaultResponse
    | PlantTissueAnalysesDelete204Response
    | PlantTissueAnalysesDeletedefaultResponse
    | PlantTissueAnalysesList200Response
    | PlantTissueAnalysesListdefaultResponse
    | PlantTissueAnalysesCreateCascadeDeleteJob202Response
    | PlantTissueAnalysesCreateCascadeDeleteJobdefaultResponse
    | PlantTissueAnalysesGetCascadeDeleteJobDetails200Response
    | PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultResponse
    | PrescriptionMapsListByFarmerId200Response
    | PrescriptionMapsListByFarmerIddefaultResponse
    | PrescriptionMapsGet200Response
    | PrescriptionMapsGetdefaultResponse
    | PrescriptionMapsCreateOrUpdate200Response
    | PrescriptionMapsCreateOrUpdate201Response
    | PrescriptionMapsCreateOrUpdatedefaultResponse
    | PrescriptionMapsDelete204Response
    | PrescriptionMapsDeletedefaultResponse
    | PrescriptionMapsList200Response
    | PrescriptionMapsListdefaultResponse
    | PrescriptionMapsGetCascadeDeleteJobDetails200Response
    | PrescriptionMapsGetCascadeDeleteJobDetailsdefaultResponse
    | PrescriptionMapsCreateCascadeDeleteJob202Response
    | PrescriptionMapsCreateCascadeDeleteJobdefaultResponse
    | PrescriptionsListByFarmerId200Response
    | PrescriptionsListByFarmerIddefaultResponse
    | PrescriptionsGet200Response
    | PrescriptionsGetdefaultResponse
    | PrescriptionsCreateOrUpdate200Response
    | PrescriptionsCreateOrUpdate201Response
    | PrescriptionsCreateOrUpdatedefaultResponse
    | PrescriptionsDelete204Response
    | PrescriptionsDeletedefaultResponse
    | PrescriptionsList200Response
    | PrescriptionsListdefaultResponse
    | PrescriptionsGetCascadeDeleteJobDetails200Response
    | PrescriptionsGetCascadeDeleteJobDetailsdefaultResponse
    | PrescriptionsCreateCascadeDeleteJob202Response
    | PrescriptionsCreateCascadeDeleteJobdefaultResponse
    | ScenesList200Response
    | ScenesListdefaultResponse
    | ScenesDownload200Response
    | ScenesDownloaddefaultResponse
    | ScenesCreateSatelliteDataIngestionJob202Response
    | ScenesCreateSatelliteDataIngestionJobdefaultResponse
    | ScenesGetSatelliteDataIngestionJobDetails200Response
    | ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
    | SeasonalFieldsListByFarmerId200Response
    | SeasonalFieldsListByFarmerIddefaultResponse
    | SeasonalFieldsGet200Response
    | SeasonalFieldsGetdefaultResponse
    | SeasonalFieldsCreateOrUpdate200Response
    | SeasonalFieldsCreateOrUpdate201Response
    | SeasonalFieldsCreateOrUpdatedefaultResponse
    | SeasonalFieldsDelete204Response
    | SeasonalFieldsDeletedefaultResponse
    | SeasonalFieldsList200Response
    | SeasonalFieldsListdefaultResponse
    | SeasonalFieldsCreateCascadeDeleteJob202Response
    | SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
    | SeasonalFieldsGetCascadeDeleteJobDetails200Response
    | SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
    | SeasonsList200Response
    | SeasonsListdefaultResponse
    | SeasonsGet200Response
    | SeasonsGetdefaultResponse
    | SeasonsCreateOrUpdate200Response
    | SeasonsCreateOrUpdate201Response
    | SeasonsCreateOrUpdatedefaultResponse
    | SeasonsDelete204Response
    | SeasonsDeletedefaultResponse
    | SensorDataModelsList200Response
    | SensorDataModelsListdefaultResponse
    | SensorDataModelsCreateOrUpdate200Response
    | SensorDataModelsCreateOrUpdate201Response
    | SensorDataModelsCreateOrUpdatedefaultResponse
    | SensorDataModelsGet200Response
    | SensorDataModelsGetdefaultResponse
    | SensorDataModelsDelete204Response
    | SensorDataModelsDeletedefaultResponse
    | SensorEventsList200Response
    | SensorEventsListdefaultResponse
    | SensorMappingsList200Response
    | SensorMappingsListdefaultResponse
    | SensorMappingsCreateOrUpdate200Response
    | SensorMappingsCreateOrUpdate201Response
    | SensorMappingsCreateOrUpdatedefaultResponse
    | SensorMappingsGet200Response
    | SensorMappingsGetdefaultResponse
    | SensorMappingsDelete204Response
    | SensorMappingsDeletedefaultResponse
    | SensorPartnerIntegrationsList200Response
    | SensorPartnerIntegrationsListdefaultResponse
    | SensorPartnerIntegrationsCreateOrUpdate200Response
    | SensorPartnerIntegrationsCreateOrUpdate201Response
    | SensorPartnerIntegrationsCreateOrUpdatedefaultResponse
    | SensorPartnerIntegrationsGet200Response
    | SensorPartnerIntegrationsGetdefaultResponse
    | SensorPartnerIntegrationsDelete204Response
    | SensorPartnerIntegrationsDeletedefaultResponse
    | SensorPartnerIntegrationsCheckConsent200Response
    | SensorPartnerIntegrationsCheckConsentdefaultResponse
    | SensorPartnerIntegrationsGenerateConsentLink200Response
    | SensorPartnerIntegrationsGenerateConsentLinkdefaultResponse
    | SensorsList200Response
    | SensorsListdefaultResponse
    | SensorsCreateOrUpdate200Response
    | SensorsCreateOrUpdate201Response
    | SensorsCreateOrUpdatedefaultResponse
    | SensorsGet200Response
    | SensorsGetdefaultResponse
    | SensorsDelete204Response
    | SensorsDeletedefaultResponse
    | SensorsGetConnectionString200Response
    | SensorsGetConnectionStringdefaultResponse
    | SensorsRenewConnectionString200Response
    | SensorsRenewConnectionStringdefaultResponse
    | SolutionInferenceCancel200Response
    | SolutionInferenceCanceldefaultResponse
    | SolutionInferenceCreateOrUpdate202Response
    | SolutionInferenceCreateOrUpdatedefaultResponse
    | SolutionInferenceFetch200Response
    | SolutionInferenceFetchdefaultResponse
    | TillageDataListByFarmerId200Response
    | TillageDataListByFarmerIddefaultResponse
    | TillageDataGet200Response
    | TillageDataGetdefaultResponse
    | TillageDataCreateOrUpdate200Response
    | TillageDataCreateOrUpdate201Response
    | TillageDataCreateOrUpdatedefaultResponse
    | TillageDataDelete204Response
    | TillageDataDeletedefaultResponse
    | TillageDataList200Response
    | TillageDataListdefaultResponse
    | TillageDataCreateCascadeDeleteJob202Response
    | TillageDataCreateCascadeDeleteJobdefaultResponse
    | TillageDataGetCascadeDeleteJobDetails200Response
    | TillageDataGetCascadeDeleteJobDetailsdefaultResponse
    | WeatherList200Response
    | WeatherListdefaultResponse
    | WeatherGetDataDeleteJobDetails200Response
    | WeatherGetDataDeleteJobDetailsdefaultResponse
    | WeatherCreateDataDeleteJob202Response
    | WeatherCreateDataDeleteJobdefaultResponse
    | WeatherGetDataIngestionJobDetails200Response
    | WeatherGetDataIngestionJobDetailsdefaultResponse
    | WeatherCreateDataIngestionJob202Response
    | WeatherCreateDataIngestionJobdefaultResponse
    | ZonesListByFarmerId200Response
    | ZonesListByFarmerIddefaultResponse
    | ZonesGet200Response
    | ZonesGetdefaultResponse
    | ZonesCreateOrUpdate200Response
    | ZonesCreateOrUpdate201Response
    | ZonesCreateOrUpdatedefaultResponse
    | ZonesDelete204Response
    | ZonesDeletedefaultResponse
    | ZonesList200Response
    | ZonesListdefaultResponse
    | ZonesGetCascadeDeleteJobDetails200Response
    | ZonesGetCascadeDeleteJobDetailsdefaultResponse
    | ZonesCreateCascadeDeleteJob202Response
    | ZonesCreateCascadeDeleteJobdefaultResponse
): response is
  | ApplicationDataListdefaultResponse
  | ApplicationDataCreateCascadeDeleteJobdefaultResponse
  | ApplicationDataGetCascadeDeleteJobDetailsdefaultResponse
  | ApplicationDataListByFarmerIddefaultResponse
  | ApplicationDataGetdefaultResponse
  | ApplicationDataCreateOrUpdatedefaultResponse
  | ApplicationDataDeletedefaultResponse
  | AttachmentsListByFarmerIddefaultResponse
  | AttachmentsGetdefaultResponse
  | AttachmentsCreateOrUpdatedefaultResponse
  | AttachmentsDeletedefaultResponse
  | AttachmentsDownloaddefaultResponse
  | BoundariesListdefaultResponse
  | BoundariesSearchdefaultResponse
  | BoundariesCreateCascadeDeleteJobdefaultResponse
  | BoundariesGetCascadeDeleteJobDetailsdefaultResponse
  | BoundariesListByFarmerIddefaultResponse
  | BoundariesSearchByFarmerIddefaultResponse
  | BoundariesCreateOrUpdatedefaultResponse
  | BoundariesGetdefaultResponse
  | BoundariesDeletedefaultResponse
  | BoundariesGetOverlapdefaultResponse
  | CropsListdefaultResponse
  | CropsGetdefaultResponse
  | CropsCreateOrUpdatedefaultResponse
  | CropsDeletedefaultResponse
  | CropVarietiesListdefaultResponse
  | CropVarietiesGetdefaultResponse
  | CropVarietiesCreateOrUpdatedefaultResponse
  | CropVarietiesDeletedefaultResponse
  | DeviceDataModelsListdefaultResponse
  | DeviceDataModelsCreateOrUpdatedefaultResponse
  | DeviceDataModelsGetdefaultResponse
  | DeviceDataModelsDeletedefaultResponse
  | DevicesListdefaultResponse
  | DevicesCreateOrUpdatedefaultResponse
  | DevicesGetdefaultResponse
  | DevicesDeletedefaultResponse
  | FarmersListdefaultResponse
  | FarmersGetdefaultResponse
  | FarmersCreateOrUpdatedefaultResponse
  | FarmersDeletedefaultResponse
  | FarmersCreateCascadeDeleteJobdefaultResponse
  | FarmersGetCascadeDeleteJobDetailsdefaultResponse
  | FarmOperationsCreateDataIngestionJobdefaultResponse
  | FarmOperationsGetDataIngestionJobDetailsdefaultResponse
  | FarmsListByFarmerIddefaultResponse
  | FarmsGetdefaultResponse
  | FarmsCreateOrUpdatedefaultResponse
  | FarmsDeletedefaultResponse
  | FarmsListdefaultResponse
  | FarmsCreateCascadeDeleteJobdefaultResponse
  | FarmsGetCascadeDeleteJobDetailsdefaultResponse
  | FieldsListByFarmerIddefaultResponse
  | FieldsGetdefaultResponse
  | FieldsCreateOrUpdatedefaultResponse
  | FieldsDeletedefaultResponse
  | FieldsListdefaultResponse
  | FieldsCreateCascadeDeleteJobdefaultResponse
  | FieldsGetCascadeDeleteJobDetailsdefaultResponse
  | HarvestDataListByFarmerIddefaultResponse
  | HarvestDataGetdefaultResponse
  | HarvestDataCreateOrUpdatedefaultResponse
  | HarvestDataDeletedefaultResponse
  | HarvestDataListdefaultResponse
  | HarvestDataCreateCascadeDeleteJobdefaultResponse
  | HarvestDataGetCascadeDeleteJobDetailsdefaultResponse
  | ImageProcessingCreateRasterizeJobdefaultResponse
  | InsightAttachmentsListByFarmerIdModelIdAndResourcedefaultResponse
  | InsightAttachmentsCreateOrUpdatedefaultResponse
  | InsightAttachmentsGetdefaultResponse
  | InsightAttachmentsDeletedefaultResponse
  | InsightAttachmentsDownloaddefaultResponse
  | InsightsListByFarmerIdModelIdAndResourcedefaultResponse
  | InsightsCreateOrUpdatedefaultResponse
  | InsightsGetdefaultResponse
  | InsightsDeletedefaultResponse
  | InsightsCreateCascadeDeleteJobdefaultResponse
  | InsightsGetCascadeDeleteJobDetailsdefaultResponse
  | ManagementZonesListByFarmerIddefaultResponse
  | ManagementZonesGetdefaultResponse
  | ManagementZonesCreateOrUpdatedefaultResponse
  | ManagementZonesDeletedefaultResponse
  | ManagementZonesListdefaultResponse
  | ManagementZonesGetCascadeDeleteJobDetailsdefaultResponse
  | ManagementZonesCreateCascadeDeleteJobdefaultResponse
  | ModelInferenceCreateBiomassModelJobdefaultResponse
  | ModelInferenceGetBiomassModelJobdefaultResponse
  | ModelInferenceCreateSoilMoistureModelJobdefaultResponse
  | ModelInferenceGetSoilMoistureModelJobdefaultResponse
  | NutrientAnalysesListByFarmerIddefaultResponse
  | NutrientAnalysesGetdefaultResponse
  | NutrientAnalysesCreateOrUpdatedefaultResponse
  | NutrientAnalysesDeletedefaultResponse
  | NutrientAnalysesListdefaultResponse
  | OAuthProvidersListdefaultResponse
  | OAuthProvidersGetdefaultResponse
  | OAuthProvidersCreateOrUpdatedefaultResponse
  | OAuthProvidersDeletedefaultResponse
  | OAuthProvidersGetCascadeDeleteJobDetailsdefaultResponse
  | OAuthProvidersCreateCascadeDeleteJobdefaultResponse
  | OAuthTokensListdefaultResponse
  | OAuthTokensGetOAuthConnectionLinkdefaultResponse
  | OAuthTokensCreateCascadeDeleteJobdefaultResponse
  | OAuthTokensGetCascadeDeleteJobDetailsdefaultResponse
  | PlantingDataListByFarmerIddefaultResponse
  | PlantingDataGetdefaultResponse
  | PlantingDataCreateOrUpdatedefaultResponse
  | PlantingDataDeletedefaultResponse
  | PlantingDataListdefaultResponse
  | PlantingDataCreateCascadeDeleteJobdefaultResponse
  | PlantingDataGetCascadeDeleteJobDetailsdefaultResponse
  | PlantTissueAnalysesListByFarmerIddefaultResponse
  | PlantTissueAnalysesGetdefaultResponse
  | PlantTissueAnalysesCreateOrUpdatedefaultResponse
  | PlantTissueAnalysesDeletedefaultResponse
  | PlantTissueAnalysesListdefaultResponse
  | PlantTissueAnalysesCreateCascadeDeleteJobdefaultResponse
  | PlantTissueAnalysesGetCascadeDeleteJobDetailsdefaultResponse
  | PrescriptionMapsListByFarmerIddefaultResponse
  | PrescriptionMapsGetdefaultResponse
  | PrescriptionMapsCreateOrUpdatedefaultResponse
  | PrescriptionMapsDeletedefaultResponse
  | PrescriptionMapsListdefaultResponse
  | PrescriptionMapsGetCascadeDeleteJobDetailsdefaultResponse
  | PrescriptionMapsCreateCascadeDeleteJobdefaultResponse
  | PrescriptionsListByFarmerIddefaultResponse
  | PrescriptionsGetdefaultResponse
  | PrescriptionsCreateOrUpdatedefaultResponse
  | PrescriptionsDeletedefaultResponse
  | PrescriptionsListdefaultResponse
  | PrescriptionsGetCascadeDeleteJobDetailsdefaultResponse
  | PrescriptionsCreateCascadeDeleteJobdefaultResponse
  | ScenesListdefaultResponse
  | ScenesDownloaddefaultResponse
  | ScenesCreateSatelliteDataIngestionJobdefaultResponse
  | ScenesGetSatelliteDataIngestionJobDetailsdefaultResponse
  | SeasonalFieldsListByFarmerIddefaultResponse
  | SeasonalFieldsGetdefaultResponse
  | SeasonalFieldsCreateOrUpdatedefaultResponse
  | SeasonalFieldsDeletedefaultResponse
  | SeasonalFieldsListdefaultResponse
  | SeasonalFieldsCreateCascadeDeleteJobdefaultResponse
  | SeasonalFieldsGetCascadeDeleteJobDetailsdefaultResponse
  | SeasonsListdefaultResponse
  | SeasonsGetdefaultResponse
  | SeasonsCreateOrUpdatedefaultResponse
  | SeasonsDeletedefaultResponse
  | SensorDataModelsListdefaultResponse
  | SensorDataModelsCreateOrUpdatedefaultResponse
  | SensorDataModelsGetdefaultResponse
  | SensorDataModelsDeletedefaultResponse
  | SensorEventsListdefaultResponse
  | SensorMappingsListdefaultResponse
  | SensorMappingsCreateOrUpdatedefaultResponse
  | SensorMappingsGetdefaultResponse
  | SensorMappingsDeletedefaultResponse
  | SensorPartnerIntegrationsListdefaultResponse
  | SensorPartnerIntegrationsCreateOrUpdatedefaultResponse
  | SensorPartnerIntegrationsGetdefaultResponse
  | SensorPartnerIntegrationsDeletedefaultResponse
  | SensorPartnerIntegrationsCheckConsentdefaultResponse
  | SensorPartnerIntegrationsGenerateConsentLinkdefaultResponse
  | SensorsListdefaultResponse
  | SensorsCreateOrUpdatedefaultResponse
  | SensorsGetdefaultResponse
  | SensorsDeletedefaultResponse
  | SensorsGetConnectionStringdefaultResponse
  | SensorsRenewConnectionStringdefaultResponse
  | SolutionInferenceCanceldefaultResponse
  | SolutionInferenceCreateOrUpdatedefaultResponse
  | SolutionInferenceFetchdefaultResponse
  | TillageDataListByFarmerIddefaultResponse
  | TillageDataGetdefaultResponse
  | TillageDataCreateOrUpdatedefaultResponse
  | TillageDataDeletedefaultResponse
  | TillageDataListdefaultResponse
  | TillageDataCreateCascadeDeleteJobdefaultResponse
  | TillageDataGetCascadeDeleteJobDetailsdefaultResponse
  | WeatherListdefaultResponse
  | WeatherGetDataDeleteJobDetailsdefaultResponse
  | WeatherCreateDataDeleteJobdefaultResponse
  | WeatherGetDataIngestionJobDetailsdefaultResponse
  | WeatherCreateDataIngestionJobdefaultResponse
  | ZonesListByFarmerIddefaultResponse
  | ZonesGetdefaultResponse
  | ZonesCreateOrUpdatedefaultResponse
  | ZonesDeletedefaultResponse
  | ZonesListdefaultResponse
  | ZonesGetCascadeDeleteJobDetailsdefaultResponse
  | ZonesCreateCascadeDeleteJobdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i].startsWith("{") &&
          candidateParts[i].endsWith("}")
        ) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
