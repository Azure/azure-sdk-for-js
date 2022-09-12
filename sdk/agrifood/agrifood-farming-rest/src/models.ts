// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ApplicationData extends Record<string, unknown> {
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
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface Measure {
  /** Data unit. */
  unit?: string;
  /** Data value. */
  value?: number;
}

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
  $maxPageSize?: number;
  /** Skip token for getting next set of results. */
  $skipToken?: string;
  /** Is the boundary primary. */
  isPrimary?: boolean;
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
  /** Parent Ids of the resource. */
  parentIds?: Array<string>;
  /** Minimum acreage of the boundary (inclusive). */
  minAcreage?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxAcreage?: number;
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  intersectsWithGeometry?: GeoJsonObject;
}

export interface GeoJsonObjectBase {
  type: "GeoJsonObject" | "MultiPolygon" | "Point" | "Polygon";
}

export interface Boundary extends Record<string, unknown> {
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  geometry?: GeoJsonObject;
  /** Farmer Id. */
  farmerId?: string;
  /** Id of the parent it belongs to. */
  parentId?: string;
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Boundary area in acres. */
  acreage?: number;
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
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface Crop extends Record<string, unknown> {
  /** Crop phenotype. */
  phenotype?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface CropVariety extends Record<string, unknown> {
  /**
   * Ids of the crops it belongs to.
   * Note: A maximum of 25 crops can be associated with a cropVariety.
   */
  cropIds?: Array<string>;
  /** CropVariety Brand. */
  brand?: string;
  /** CropVariety product. */
  product?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface DeviceDataModel extends Record<string, unknown> {
  /** Type of device. */
  type?: string;
  /** Device manufacturer. */
  manufacturer?: string;
  /** Device productCode. */
  productCode?: string;
  /** List of device ports supported. */
  ports?: Array<Port>;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
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

export interface Port {
  /** Name of the port. */
  name?: string;
  /** Type of port digital/analog. */
  type?: string;
}

export interface Device extends Record<string, unknown> {
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
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
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

export interface Location {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
}

export interface Farmer extends Record<string, unknown> {
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface FarmOperationDataIngestionJob extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
  /** Authentication provider Id. */
  authProviderId: string;
  /** List of operation types for which data needs to be downloaded. Available values: AllOperations, Application, Planting, Harvest, Tillage. */
  operations?: Array<string>;
  /** Start Year (Minimum = 2000, Maximum = CurrentYear). */
  startYear: number;
  /** Use this to pull only the incremental changes from the last run. */
  isIncremental?: boolean;
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date | string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date | string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date | string;
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

export interface Farm extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface Field extends Record<string, unknown> {
  /** Id of the associated Farm. */
  farmId?: string;
  /** Farmer Id. */
  farmerId?: string;
  /** Primary boundary id. */
  primaryBoundaryId?: string;
  /** Boundary Ids. */
  boundaryIds?: Array<string>;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface HarvestData extends Record<string, unknown> {
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
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface ImageProcessingRasterizeJob extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
  /** Shapefile attachment Id. */
  shapefileAttachmentId: string;
  /** List of shapefile column names to create raster attachments. */
  shapefileColumnNames: Array<string>;
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date | string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date | string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date | string;
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

export interface Insight extends Record<string, unknown> {
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Id of the associated model. */
  modelId?: string;
  /** Resource type associated with the record. */
  resourceType?: "Farmer" | "Farm" | "Field" | "SeasonalField" | "Boundary";
  /** Id of the associated resource. */
  resourceId?: string;
  /** Version of the associated model. */
  modelVersion?: string;
  /** Gets link for attachments. */
  attachmentsLink?: string;
  /** Start date to which the insight is related. */
  insightStartDateTime?: Date | string;
  /** End date to which the insight is related. */
  insightEndDateTime?: Date | string;
  /** Measures to capture insights results. */
  measures?: Record<string, Measure>;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
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

export interface ManagementZone extends Record<string, unknown> {
  /** Farmer Id associated with the ManagementZone. */
  farmerId?: string;
  /** Type of the ManagementZone. */
  type?: string;
  /** Season Id associated with the ManagementZone. */
  seasonId?: string;
  /** Crop Id associated with the ManagementZone. */
  cropId?: string;
  /** Field Id associated with the ManagementZone. */
  fieldId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface BiomassModelJob extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
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
  satelliteSource: "Sentinel_2_L2A";
  /** ImageResolution in meters. Available values: 10, 20, 60. */
  imageResolution: number;
  /** ImageFormat. Available value: TIF. */
  imageFormat: "TIF";
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date | string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date | string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date | string;
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

export interface SoilMoistureModelJob extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
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
  satelliteSource: "Sentinel_2_L2A";
  /** ImageResolution in meters. Available values: 10, 20, 60. */
  imageResolution: number;
  /** ImageFormat. Available value: TIF. */
  imageFormat: "TIF";
  /** The version of the soil moisture model to be run. */
  modelVersion: string;
  /** Schema for storing sensor definition keywords. */
  sensorDefinition: SoilMoistureModelSensorDefinition;
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date | string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date | string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date | string;
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

export interface SoilMoistureModelSensorDefinition {
  /** The measurement name for sensor measure in sensorDataModel. */
  sensorMeasurement: string;
  /** The measurement name for minimum measurement value. */
  minProperty: string;
  /** The measurement name for maximum measurement value. */
  maxProperty: string;
}

export interface NutrientAnalysis extends Record<string, unknown> {
  /** Farmer id for this nutrient analysis. */
  farmerId?: string;
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
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface ProductDetails {
  /** Rate of the product. */
  rate?: string;
  /** Instruction of the resource. */
  instruction?: string;
  /** Product of the resource. */
  product?: string;
}

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
  /** Unique OAuth provider ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface OAuthConnectRequest {
  /** Id of the farmer. */
  farmerId: string;
  /** Id of the OAuthProvider. */
  oAuthProviderId: string;
  /** Link to redirect the user to, at the end of the oauth flow. */
  userRedirectLink: string;
  /** State to provide back when redirecting the user, at the end of the oauth flow. */
  userRedirectState?: string;
}

export interface PlantingData extends Record<string, unknown> {
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
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface PlantTissueAnalysis extends Record<string, unknown> {
  /** Id of the associated Farmer. */
  farmerId?: string;
  /** Id of the associated Field. */
  fieldId?: string;
  /** Id of the associated Crop. */
  cropId?: string;
  /** Id of the associated Crop variety. */
  cropVarietyId?: string;
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
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface PrescriptionMap extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId?: string;
  /** Prescription map type. */
  type?: string;
  /** Season Id. */
  seasonId?: string;
  /** Crop Id. */
  cropId?: string;
  /** Field Id. */
  fieldId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface Prescription extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId?: string;
  /** Prescription map Id. */
  prescriptionMapId?: string;
  /** Product Code. */
  productCode?: string;
  /** Product name. */
  productName?: string;
  /** Prescription type. */
  type?: string;
  /** Measures. */
  measures?: Record<string, Measure>;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface SatelliteDataIngestionJob extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
  /** The id of the boundary object for which satellite data is being fetched. */
  boundaryId: string;
  /** Start Date. */
  startDateTime: Date | string;
  /** End Date. */
  endDateTime: Date | string;
  /** Provider of satellite data. Available Value: Microsoft. */
  provider?: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  source?: "Sentinel_2_L2A";
  /** Data Model for SatelliteIngestionJobRequest. */
  data?: SatelliteData;
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date | string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date | string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date | string;
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

export interface SatelliteData {
  /** List of ImageNames. */
  imageNames?: Array<string>;
  /** List of ImageFormats. Available value: TIF. */
  imageFormats?: Array<string>;
  /** List of ImageResolutions in meters. Available values: 10, 20, 60. */
  imageResolutions?: Array<number>;
}

export interface SeasonalField extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId?: string;
  /** Primary boundary id. */
  primaryBoundaryId?: string;
  /** Boundary Ids. */
  boundaryIds?: Array<string>;
  /** Id of the associated Farm. */
  farmId?: string;
  /** Id of the associated Field. */
  fieldId?: string;
  /** Id of the season it belongs to. */
  seasonId?: string;
  /** CropVariety ids. */
  cropVarietyIds?: Array<string>;
  /** Id of the crop it belongs to. */
  cropId?: string;
  /** Average yield value of the seasonal field. */
  avgYieldValue?: number;
  /** Unit of the average yield value attribute. */
  avgYieldUnit?: string;
  /** Average seed population value of the seasonal field. */
  avgSeedPopulationValue?: number;
  /** Unit of average seed population value attribute. */
  avgSeedPopulationUnit?: string;
  /** Planting datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  plantingDateTime?: Date | string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface Season extends Record<string, unknown> {
  /** Season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startDateTime?: Date | string;
  /** Season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: Date | string;
  /** Season year. */
  year?: number;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface SensorDataModel extends Record<string, unknown> {
  /** Type of sensor. */
  type?: string;
  /** Sensor manufacturer. */
  manufacturer?: string;
  /** Sensor productCode. */
  productCode?: string;
  /** Map of sensor type to sensor measures. */
  measures: Record<string, SensorDataModelMeasure>;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
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

export interface SensorMapping extends Record<string, unknown> {
  /** Id of the associated sensor. */
  sensorId?: string;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Id of the associated boundary. */
  boundaryId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
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

export interface SensorPartnerIntegrationModel extends Record<string, unknown> {
  /** Id of the integration. */
  integrationId?: string;
  /** Id of the farmer. */
  farmerId?: string;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
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

export interface Sensor extends Record<string, unknown> {
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
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
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

export interface SensorRenewConnectionStringModel {
  /** Specifies the type of connection string key to be renewed valid values - Primary/Secondary/Both. */
  connectionStringType: "Primary" | "Secondary" | "Both";
}

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

export interface TillageData extends Record<string, unknown> {
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
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface WeatherDataDeleteJob extends Record<string, unknown> {
  /** Id of the extension to be used for the providerInput. eg. DTN.ClearAg. */
  extensionId: string;
  /** The id of the farmer object for which weather data is being fetched. */
  farmerId: string;
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
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date | string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date | string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date | string;
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

export interface WeatherDataIngestionJob extends Record<string, unknown> {
  /** The id of the boundary object for which weather data is being fetched. */
  boundaryId: string;
  /** The id of the farmer object for which weather data is being fetched. */
  farmerId: string;
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
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date | string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date | string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date | string;
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

export interface Zone extends Record<string, unknown> {
  /** Farmer Id associated with the Zone. */
  farmerId?: string;
  /** Type of the Zone. */
  type?: string;
  /** Management Zone Id associated with the Zone. */
  managementZoneId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date | string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date | string;
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

export interface MultiPolygon
  extends GeoJsonObjectBase,
    MultiPolygonCoordinates {
  type: "MultiPolygon";
}

export interface MultiPolygonCoordinates {
  /**
   * Gets or sets coordinates of GeoJSON Object.
   * It must be an array of polygons, each polygon contains list of linear rings.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: Array<Array<Array<Array<number>>>>;
}

export interface Point extends GeoJsonObjectBase, PointCoordinates {
  type: "Point";
}

export interface PointCoordinates {
  /**
   * Gets or sets the coordinate of this point.
   * It must be an array of 2 or 3 elements for a 2D or 3D system respectively.
   */
  coordinates: Array<number>;
}

export interface Polygon extends GeoJsonObjectBase, PolygonCoordinates {
  type: "Polygon";
}

export interface PolygonCoordinates {
  /**
   * Gets or sets type of the GeoJSON Object.
   * It must be an array of linear ring coordinate arrays.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: Array<Array<Array<number>>>;
}

export type GeoJsonObject = MultiPolygon | Point | Polygon;
