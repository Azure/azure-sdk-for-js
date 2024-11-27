// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Schema of application data resource. */
export interface ApplicationData {
  /** Application product details. */
  applicationProductDetails?: Array<ApplicationProductDetail>;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date | string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date | string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date | string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of product used during application. */
export interface ApplicationProductDetail {
  /** Name of the product applied. */
  productName?: string;
  /** A flag indicating whether product is a carrier for a tank mix. */
  isCarrier?: boolean;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
}

/** Schema for storing measurement reading and unit. */
export interface Measure {
  /** Data unit. */
  unit?: string;
  /** Data value. */
  value?: number;
}

/** SearchAllBoundaries and SearchBoundaries parameters. */
export interface SearchBoundaryQuery {
  /** Ids of the resource. */
  ids?: Array<string>;
  /** Names of the resource. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within the Properties object.
   * e.g. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** Statuses of the resource. */
  statuses?: Array<string>;
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date | string;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date | string;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date | string;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date | string;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
  /** Type of the parent it belongs to. */
  parentType?:
    | "Field"
    | "SeasonalField"
    | "Zone"
    | "Prescription"
    | "PlantTissueAnalysis"
    | "ApplicationData"
    | "PlantingData"
    | "TillageData"
    | "HarvestData";
  /** Type it belongs to. */
  type?: string;
  /** Parent Ids of the resource. */
  parentIds?: Array<string>;
  /** Minimum acreage of the boundary (inclusive). */
  minArea?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxArea?: number;
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  intersectsWithGeometry?: GeoJsonObject;
}

/** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
export interface GeoJsonObjectParent {
  type: "GeoJsonObject" | "MultiPolygon" | "Point" | "Polygon";
}

/** Schema of boundary resource. */
export interface Boundary {
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  geometry?: GeoJsonObject;
  /** Indicates the type of boundary belonging to a parent. */
  type?: string;
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  centroid?: GeoJsonObject;
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  bbox?: GeoJsonObject;
  /** Id of the parent it belongs to. */
  parentId?: string;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /**
   * Type of the parent it belongs to.
   * i.e. Field, SeasonalField, Zone, Prescription, PlantTissueAnalysis, ApplicationData, HarvestData, TillageData, PlantingData.
   */
  parentType?:
    | "Field"
    | "SeasonalField"
    | "Zone"
    | "Prescription"
    | "PlantTissueAnalysis"
    | "ApplicationData"
    | "PlantingData"
    | "TillageData"
    | "HarvestData";
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of crop product resource. */
export interface CropProduct {
  /**
   * Ids of the crops it belongs to.
   * Note: A maximum of 25 crops can be associated with a cropProduct.
   */
  cropIds?: Array<string>;
  /** CropProduct Brand. */
  brand?: string;
  /** CropProduct product. */
  product?: string;
  /** CropProduct trait. */
  trait?: string;
  /** Schema for storing measurement reading and unit. */
  relativeMaturity?: Measure;
  /** CropProduct treatments. */
  treatments?: Array<string>;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of crop resource. */
export interface Crop {
  /** Crop phenotype. */
  phenotype?: string;
  /** Breeding Method. */
  breedingMethod?: "VARIETY" | "HYBRID" | "UNKNOWN";
  /** Measurements. */
  measurements?: Record<string, Measure>;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** DeviceDataModel API model. */
export interface DeviceDataModel {
  /** Type of device. */
  type?: string;
  /** Device manufacturer. */
  manufacturer?: string;
  /** Device productCode. */
  productCode?: string;
  /** List of device ports supported. */
  ports?: Array<Port>;
  /** Status of the resource. */
  status?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema for storing port values. */
export interface Port {
  /** Name of the port. */
  name?: string;
  /** Type of port digital/analog. */
  type?: string;
}

/** Device API model. */
export interface Device {
  /** Id of the associated device data model. */
  deviceDataModelId?: string;
  /** Integration id for the device. */
  integrationId?: string;
  /** Type of device. */
  type?: string;
  /** Device hardwareId. */
  hardwareId?: string;
  /** Interval at which the device sends data in seconds. */
  reportingIntervalInSeconds?: number;
  /** Parent device Id for this device. */
  parentDeviceId?: string;
  /** Location model class. */
  location?: Location;
  /** Status of the resource. */
  status?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Location model class. */
export interface Location {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
}

/** Schema of farm operation data ingestion job. */
export interface FarmOperationDataIngestionJob {
  /** Party Id. */
  partyId: string;
  /** Authentication provider Id. */
  authProviderId: string;
  /** List of operation types for which data needs to be downloaded. Available values: AllOperations, Application, Planting, Harvest, Tillage. */
  operations?: Array<string>;
  /** Start Year (Minimum = 2000, Maximum = CurrentYear). */
  startYear: number;
  /** Use this to pull only the incremental changes from the last run. */
  isIncremental?: boolean;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of farm resource. */
export interface Farm {
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of field resource. */
export interface Field {
  /** Id of the associated Farm. */
  farmId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of harvest data resource. */
export interface HarvestData {
  /** Schema for storing measurement reading and unit. */
  totalYield?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgYield?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalWetMass?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgWetMass?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgMoisture?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgSpeed?: Measure;
  /** Harvest product details. */
  harvestProductDetails?: Array<HarvestProductDetail>;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date | string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date | string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date | string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of product used during harvesting. */
export interface HarvestProductDetail {
  /** Name of the product. */
  productName?: string;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalYield?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgYield?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgMoisture?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalWetMass?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgWetMass?: Measure;
}

/** Image Processing Rasterize Job to convert shapefile into tiff file. */
export interface ImageProcessingRasterizeJob {
  /** Party Id. */
  partyId: string;
  /** Shapefile attachment Id. */
  shapefileAttachmentId: string;
  /** List of shapefile column names to create raster attachments. */
  shapefileColumnNames: Array<string>;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of insight resource. */
export interface Insight {
  /** Version of the associated model. */
  modelVersion?: string;
  /** Start date to which the insight is related. */
  insightStartDateTime?: Date | string;
  /** End date to which the insight is related. */
  insightEndDateTime?: Date | string;
  /** Measures to capture insights results. */
  measurements?: Record<string, Measure>;
  /** Status of the resource. */
  status?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Api Model for ManagementZone object. */
export interface ManagementZone {
  /** Type of the ManagementZone. */
  type?: string;
  /** Season Id associated with the ManagementZone. */
  seasonId?: string;
  /** Crop Id associated with the ManagementZone. */
  cropId?: string;
  /** Field Id associated with the ManagementZone. */
  fieldId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of biomass model job. */
export interface BiomassModelJob {
  /** Party Id. */
  partyId: string;
  /** The id of the boundary object for which biomass is being calculated. */
  boundaryId: string;
  /** The version of the biomass model to be run. Available Value: 1.0 . */
  modelVersion: string;
  /** Crop name for biomass model. Available Value: Corn. */
  cropName: "Corn";
  /** Planting datetime for biomass calculations. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  plantingStartDateTime: Date | string;
  /** End datetime till which biomass will be calculated. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  inferenceEndDateTime: Date | string;
  /** ExtensionId of weather data. Available values: DTN.ClearAg, DTN.ContentServices. */
  weatherExtensionId: string;
  /** Provider of satellite data. Available Value: Microsoft. */
  satelliteProvider: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  satelliteSource: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** ImageResolution in meters. Available values: 10, 20, 60. */
  imageResolution: number;
  /** ImageFormat. Available value: TIF. */
  imageFormat: "TIF";
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of sensor placement model job. */
export interface SensorPlacementModelJob {
  /** Party Id. */
  partyId: string;
  /** The id of the boundary object for which sensor placement is being calculated. */
  boundaryId: string;
  /** The version of the sensor placement model to be run. */
  modelVersion: string;
  /** Start datetime for satellite data to be pulled. */
  inferenceStartDateTime: Date | string;
  /** End datetime for satellite data to be pulled. */
  inferenceEndDateTime: Date | string;
  /** Provider of satellite data. Available Value: Microsoft. */
  satelliteProvider: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  satelliteSource: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** SensorType. The sensor placement map generated for sensor type (e.g., soil moisture, soil temperature, npk). Available Value: SoilMoisture. */
  sensorType: string;
  /** IsRanked, if True the sensor placements will be ranked. */
  isRanked: boolean;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of soil moisture model job. */
export interface SoilMoistureModelJob {
  /** Party Id. */
  partyId: string;
  /** The id of the boundary object for which soil moisture is being calculated. */
  boundaryId: string;
  /** Sensor data model Id. */
  sensorDataModelId: string;
  /** Sensor partner Id. */
  sensorPartnerId: string;
  /** Inference start date time for soil moisture calculations. */
  inferenceStartDateTime: Date | string;
  /** Inference end date time for soil moisture calculations. */
  inferenceEndDateTime: Date | string;
  /** Provider of satellite data. Available Value: Microsoft. */
  satelliteProvider: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  satelliteSource: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** ImageResolution in meters. Available values: 10, 20, 60. */
  imageResolution: number;
  /** ImageFormat. Available value: TIF. */
  imageFormat: "TIF";
  /** The version of the soil moisture model to be run. */
  modelVersion: string;
  /** Schema for storing sensor definition keywords. */
  sensorDefinition: SoilMoistureModelSensorDefinition;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema for storing sensor definition keywords. */
export interface SoilMoistureModelSensorDefinition {
  /** The measurement name for sensor measure in sensorDataModel. */
  sensorMeasurement: string;
  /** The measurement name for minimum measurement value. */
  minProperty: string;
  /** The measurement name for maximum measurement value. */
  maxProperty: string;
}

/** Api Model for nutrient analysis object. */
export interface NutrientAnalysis {
  /** Parent id for this nutrient analysis. */
  parentId?: string;
  /**
   * Parent type for this nutrient analysis.
   * i.e. PlantTissueAnalysis.
   */
  parentType?: "PlantTissueAnalysis";
  /** Unit for this nutrient analysis. */
  unit?: string;
  /** Value for this nutrient analysis. */
  value?: number;
  /** Reference value low for this nutrient analysis. */
  referenceValueLow?: number;
  /** Reference value high for this nutrient analysis. */
  referenceValueHigh?: number;
  /** Classification for this nutrient analysis. */
  classification?: string;
  /** Recommendation for this nutrient analysis. */
  recommendation?: string;
  /** Products for this nutrient analysis. */
  products?: Array<ProductDetails>;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Model for representing ProductDetails object. */
export interface ProductDetails {
  /** Rate of the product. */
  rate?: string;
  /** Instruction of the resource. */
  instruction?: string;
  /** Product of the resource. */
  product?: string;
}

/** Schema of OAuth provider resource. */
export interface OAuthProvider {
  /** OAuth App Id for given OAuth Provider. */
  appId?: string;
  /**
   * OAuth App secret for given Provider.
   * Note: Won't be sent in response.
   */
  appSecret?: string;
  /**
   * OAuth Api key for given Provider.
   * Note: currently Applicable to Climate provider. Won't be sent in response.
   */
  apiKey?: string;
  /**
   * An optional flag to determine if the App is ready to be used for Production scenarios in the provider side or not. (Default value: false)
   * Note: Currently applicable for JohnDeere.
   */
  isProductionApp?: boolean;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Get OAuth config query parameters. */
export interface OAuthConnectRequest {
  /** Id of the party. */
  partyId: string;
  /** Id of the OAuthProvider. */
  oAuthProviderId: string;
  /** Link to redirect the user to, at the end of the oauth flow. */
  userRedirectLink: string;
  /** State to provide back when redirecting the user, at the end of the oauth flow. */
  userRedirectState?: string;
}

/** Schema of party resource. */
export interface Party {
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of planting data resource. */
export interface PlantingData {
  /** Schema for storing measurement reading and unit. */
  avgPlantingRate?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
  /** Planting product details. */
  plantingProductDetails?: Array<PlantingProductDetail>;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date | string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date | string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date | string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema for Planting product detail. */
export interface PlantingProductDetail {
  /** Name of the product. */
  productName?: string;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
}

/** Api Model for plant tissue analysis object. */
export interface PlantTissueAnalysis {
  /** Id of the associated Field. */
  fieldId?: string;
  /** Id of the associated Crop. */
  cropId?: string;
  /** Id of the associated Crop product. */
  cropProductId?: string;
  /** Id of the associated Season. */
  seasonId?: string;
  /** Planting datetime for this plant tissue analysis. */
  plantingDateTime?: Date | string;
  /** Growth stage for this plant tissue analysis. */
  growthStage?: string;
  /** Plant part for this plant tissue analysis. */
  plantPart?: string;
  /** Plant position for this plant tissue analysis. */
  plantPosition?: string;
  /** Plant appearance for this plant tissue analysis. */
  plantAppearance?: string;
  /** Sample collection condition for this plant tissue analysis. */
  sampleCollectionCondition?: string;
  /** Sample collection dateTime for this plant tissue analysis. */
  sampleCollectionDateTime?: Date | string;
  /** Sample received dateTime. */
  sampleReceivedDateTime?: Date | string;
  /** Sample test result dateTime for this plant tissue analysis. */
  sampleTestResultDateTime?: Date | string;
  /** Model for representing LabDetails object. */
  labDetails?: LabDetails;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Model for representing LabDetails object. */
export interface LabDetails {
  /** Code of the resource. */
  code?: string;
  /** Name of the resource. */
  name?: string;
  /** Description of the resource. */
  description?: string;
  /** Address of the resource. */
  address?: string;
}

/** Api Model for Prescription Map object. */
export interface PrescriptionMap {
  /** Prescription map type. */
  type?: string;
  /** Season Id. */
  seasonId?: string;
  /** Crop Id. */
  cropId?: string;
  /** Field Id. */
  fieldId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Api Model for Prescription object. */
export interface Prescription {
  /** Prescription map Id. */
  prescriptionMapId?: string;
  /** Product Code. */
  productCode?: string;
  /** Product name. */
  productName?: string;
  /** Prescription type. */
  type?: string;
  /** Measures. */
  measurements?: Record<string, Measure>;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of satellite data ingestion job. */
export interface SatelliteDataIngestionJob {
  /** Party Id. */
  partyId: string;
  /** The id of the boundary object for which satellite data is being fetched. */
  boundaryId: string;
  /** Start Date. */
  startDateTime: Date | string;
  /** End Date. */
  endDateTime: Date | string;
  /** Provider of satellite data. Available Value: Microsoft. */
  provider?: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  source: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** Data Model for SatelliteIngestionJobRequest. */
  data?: SatelliteData;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Data Model for SatelliteIngestionJobRequest. */
export interface SatelliteData {
  /** List of ImageNames. */
  imageNames?: Array<string>;
  /** List of ImageFormats. Available value: TIF. */
  imageFormats?: Array<string>;
  /** List of ImageResolutions in meters. Available values: 10, 20, 60. */
  imageResolutions?: Array<number>;
}

/** Search stac Features parameters. */
export interface SearchFeaturesQuery {
  /** Start datetime of the time interval in which to search for Features. */
  startDateTime: Date | string;
  /** End datetime of the time interval in which to search for Features. */
  endDateTime: Date | string;
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  intersects?: GeoJsonObject;
  /**
   * Only features that have a geometry that intersects the bounding box are selected.
   * The bounding box is provided as four numbers. The coordinate reference system of the values is WGS84 longitude/latitude.
   */
  bbox?: Array<number>;
  /** Array of feature ids to return. */
  featureIds?: Array<string>;
}

/** Schema of seasonal field resource. */
export interface SeasonalField {
  /** Id of the associated Farm. */
  farmId?: string;
  /** Id of the associated Field. */
  fieldId?: string;
  /** Id of the season it belongs to. */
  seasonId?: string;
  /** CropProduct ids. */
  cropProductIds?: Array<string>;
  /** Id of the crop it belongs to. */
  cropId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of season resource. */
export interface Season {
  /** Season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startDateTime?: Date | string;
  /** Season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: Date | string;
  /** Season year. */
  year?: number;
  /** Geographic Identifier. */
  geographicIdentifier?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** SensorModel API model. */
export interface SensorDataModel {
  /** Type of sensor. */
  type?: string;
  /** Sensor manufacturer. */
  manufacturer?: string;
  /** Sensor productCode. */
  productCode?: string;
  /** Map of sensor type to sensor measures. */
  measures: Record<string, SensorDataModelMeasure>;
  /** Status of the resource. */
  status?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Sensor model measure details. */
export interface SensorDataModelMeasure {
  /** Description of sensor measure. */
  description?: string;
  /** Sensor measure data type. */
  dataType: "Bool" | "Double" | "DateTime" | "Long" | "String";
  /** Measurement type of sensor data. */
  type?: string;
  /** Unit of sensor measure. */
  unit?: string;
  /**
   * A collection of key value pairs for sensor data model.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a model and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** SensorMapping API model. */
export interface SensorMapping {
  /** Id of the associated sensor. */
  sensorId?: string;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the associated party. */
  partyId?: string;
  /** Id of the associated boundary. */
  boundaryId?: string;
  /** Status of the resource. */
  status?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Sensor partner integration model. */
export interface SensorPartnerIntegrationModel {
  /** Id of the party. */
  partyId?: string;
  /** Status of the resource. */
  status?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Sensor API model. */
export interface Sensor {
  /** Id of the associated sensor data model. */
  sensorDataModelId?: string;
  /** Integration id for the device. */
  integrationId?: string;
  /** Id of the associated hardware. */
  hardwareId?: string;
  /** Id of the associated device. */
  deviceId?: string;
  /** Type of sensor. */
  type?: string;
  /** Location model class. */
  location?: Location;
  /** Schema for storing port values. */
  port?: Port;
  /**
   * Depth of each sensor measure in meters.
   * Like sensor moisture at 2m, 4m, 6m.
   */
  depthInMeters?: Array<number>;
  /** Status of the resource. */
  status?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Model for renewing sensor's connection string. */
export interface SensorRenewConnectionStringModel {
  /** Specifies the type of connection string key to be renewed valid values - Primary/Secondary/Both. */
  connectionStringType: "Primary" | "Secondary" | "Both";
}

/** SolutionInference request model. */
export interface SolutionInference {
  /**
   * RequestPath containing the api-version, query parameters and path route to be called for partner request.
   * Expected format is "/{api-version}/{resourceExposedByPartner}/{customerDefinedJobId}?query1=value1".
   * Not following this format may result into validation errors.
   */
  requestPath: string;
  /** Api input parameters required by partner to trigger/cancel job request. */
  partnerRequestBody?: Record<string, any>;
}

/** Schema of tillage data resource. */
export interface TillageData {
  /** Schema for storing measurement reading and unit. */
  tillageDepth?: Measure;
  /** Schema for storing measurement reading and unit. */
  tillagePressure?: Measure;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date | string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date | string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date | string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of weather data delete job. */
export interface WeatherDataDeleteJob {
  /** Id of the extension to be used for the providerInput. eg. DTN.ClearAg. */
  extensionId: string;
  /** The id of the party for which weather data is being fetched. */
  partyId: string;
  /** The id of the boundary object for which weather data is being fetched. */
  boundaryId: string;
  /** Type of weather data. Possible values include: 'forecast' , 'historical'. */
  weatherDataType?: string;
  /** Granularity of weather data. Possible values include: 'daily' , 'hourly'. */
  granularity?: string;
  /** Weather data start UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startDateTime?: Date | string;
  /** Weather data end UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: Date | string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of weather ingestion job. */
export interface WeatherDataIngestionJob {
  /** The id of the boundary object for which weather data is being fetched. */
  boundaryId: string;
  /** The id of the party for which weather data is being fetched. */
  partyId: string;
  /** Id of the extension to be used for the providerInput. eg. DTN.ClearAg. */
  extensionId: string;
  /** Extension api name to which request is to be made. */
  extensionApiName: string;
  /** Extension api input dictionary which would be used to feed request query/body/parameter information. */
  extensionApiInput: Record<string, any>;
  /** App id of the weather data provider. */
  extensionDataProviderAppId?: string;
  /** Api key of the weather data provider. */
  extensionDataProviderApiKey?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of weather data provider request. */
export interface WeatherDataProviderRequest {
  /** List of locations for which weather data need to be fetched from the provider. */
  locations?: Array<WeatherLocation>;
  /** App id of the weather data provider. */
  providerAppId?: string;
  /** Api key of the weather data provider. */
  providerApiKey: string;
  /** Id of the extension to be used for the providerInput. eg. DTN.ClearAg. */
  extensionId: string;
  /** Extension api name to which request is to be made. */
  extensionApiName: string;
  /** Language (IETF BCP 47 language tag) in which search results should be returned by the data provider. Examples: 'en-US', 'es', 'es-MX', 'fr-FR'. */
  language?: string;
  /** Start of time range. Hour 0 represents the current hour. (Only applicable for DTN.ClearAg extension.) */
  startTimeHours?: number;
  /** End of time range. Supported ranges are from 0 to 240. (Only applicable for DTN.ClearAg extension.) */
  endTimeHours?: number;
  /** Specifies for how many days the daily forecast responses are returned. Available values are 1, 5, 10, 25 and 45. (Only applicable for Azure Weather Maps extension.) */
  duration?: number;
  /** Units for which request to data provider is to be sent. Supported values are 'e' for English units, 'm' for Metric units, 'h' for Hybrid units (UK) and 's' for Metric SI units. */
  units: string;
  /** Schema of additional parameters for weather data provider request. */
  additionalParams?: AdditionalProviderParameters;
}

/** Schema of Location data. */
export interface WeatherLocation {
  /** Location Type eg. LatLong/IataCode/IcaoCode/Placeid/PostalKey. */
  type: "LatLong" | "IataCode" | "IcaoCode" | "PlaceId" | "PostalKey";
  /** Location Value eg. "10,-25" for LocationType Type "LatLong". */
  value: string;
}

/** Schema of additional parameters for weather data provider request. */
export interface AdditionalProviderParameters {
  /** Icon Resolution (Only applicable for AzureWeatherMaps). */
  iconResolution?: string;
  /** Details (Only applicable for AzureWeatherMaps). */
  details?: boolean;
}

/** Api Model for Zone object. */
export interface Zone {
  /** Type of the Zone. */
  type?: string;
  /** Management Zone Id associated with the Zone. */
  managementZoneId?: string;
  /** Status of the resource. */
  status?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** MultiPolygon geometry. */
export interface MultiPolygon extends GeoJsonObjectParent {
  /**
   * Gets or sets Coordinates of GeoJSON Object.
   * It must be an array of polygons, each polygon contains list of linear rings.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: Array<Array<Array<Array<number>>>>;
  type: "MultiPolygon";
}

/** Point geometry. */
export interface Point extends GeoJsonObjectParent {
  /**
   * Gets or sets the coordinate of this point.
   * It must be an array of 2 or 3 elements for a 2D or 3D system.
   */
  coordinates: Array<number>;
  type: "Point";
}

/** Polygon geometry. */
export interface Polygon extends GeoJsonObjectParent {
  /**
   * Gets or sets type of the GeoJSON Object.
   * It must be an array of linear ring coordinate arrays.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: Array<Array<Array<number>>>;
  type: "Polygon";
}

/** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
export type GeoJsonObject = MultiPolygon | Point | Polygon;
