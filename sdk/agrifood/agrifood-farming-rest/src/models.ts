// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ApplicationData {
  /** Application product details. */
  applicationProductDetails?: Array<ApplicationProductDetail>;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Represents the source from which the application data was obtained. */
  source?: string;
  /** UTC date-time at which the operation data was modified at the source (format: yyyy-MM-ddTHH:mm:ssZ). This will be specified by the source. */
  operationModifiedDateTime?: Date | string;
  /** UTC date-time at which the operation started (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationStartDateTime?: Date | string;
  /** UTC date-time at which the operation ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationEndDateTime?: Date | string;
  /** Link to 'Attachments API' that can be used to find shapefiles, raster files or any other attachments associated with this operation. */
  attachmentsLink?: string;
  /** Id of the boundary of the field/seasonal field on which the application operation was done. */
  associatedBoundaryId?: string;
  /** Id of the boundary that is created using the geographical area on which the application operation was carried out. */
  operationBoundaryId?: string;
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Unique Id of the operation (application). This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the application operation. */
  name?: string;
  /** Brief description of the application operation. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface ApplicationProductDetail {
  /** Name of a product applied. */
  productName?: string;
  /** Indicates if the product is a carrier for a tank mix. */
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

export interface Boundary {
  /** Id of the associated farmer. */
  farmerId?: string;
  /** If the boundary is associated with a field or a seasonal field then the  parent id refers to the id of the field/seasonal field. */
  parentId?: string;
  /** GeoJSON abstract class. */
  geometry?: GeoJsonObject;
  /** Indicates if the boundary is a primary boundary for the associated parent (if any). */
  isPrimary?: boolean;
  /** Area of the boundary in acres. */
  acreage?: number;
  /** Indicates if the parent is a field or a seasonal field. Permissible values are 'Field' and 'SeasonalField'. */
  parentType?: string;
  /** Unique Id of the boundary. This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the boundary. */
  name?: string;
  /** Brief description of the boundary. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface GeoJsonObjectBase {
  type: "MultiPolygon" | "Point" | "Polygon";
}

export interface SearchBoundaryQuery {
  /** List of boundary Ids to be searched. */
  ids?: Array<string>;
  /** List of names of boundaries to be searched. */
  names?: Array<string>;
  /**
   * Filters on key-value pairs within 'Properties'.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: Array<string>;
  /** List of statuses of boundaries to be searched. */
  statuses?: Array<string>;
  /** Resources created at or after the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minCreatedDateTime?: Date | string;
  /** Resources created at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxCreatedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  minLastModifiedDateTime?: Date | string;
  /** Resources last modified at or before the given UTC date-time are returned (format: yyyy-MM-ddTHH:mm:ssZ). */
  maxLastModifiedDateTime?: Date | string;
  /** Maximum number of items to be returned in a single page. */
  $maxPageSize?: number;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** If set, search result will contain only primary boundaries. */
  isPrimary?: boolean;
  /** Used to search based on the parent type (Field/ SeasonalField). */
  parentType?: string;
  /** List of parent Ids whose boundaries are to be retrieved. */
  parentIds?: Array<string>;
  /** Minimum acreage of the boundary (inclusive). */
  minAcreage?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxAcreage?: number;
  /** GeoJSON abstract class. */
  intersectsWithGeometry?: GeoJsonObject;
}

export interface Crop {
  /** Phenotype of the crop. */
  phenotype?: string;
  /** Unique Id of the crop. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the crop. */
  name?: string;
  /** Brief description of the crop. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface CropVariety {
  /** Id of the associated crop. */
  cropId?: string;
  /** Brand of the crop variety. */
  brand?: string;
  /** Commercial name of the crop variety. */
  product?: string;
  /** Unique Id of the crop variety. This Id is unique for a given crop. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the crop variety. */
  name?: string;
  /** Brief description of the crop variety. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface Farmer {
  /** Unique Id of the farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the farmer. */
  name?: string;
  /** Brief description of the farmer. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, any>;
}

export interface FarmOperationDataIngestionJob {
  /** Id of the farmer whose farm operations are to be fetched. */
  farmerId: string;
  /** Id of the farm operations data provider. Use 'JOHNDEERE' to fetch data from John Deere. */
  authProviderId: string;
  /** List of types of farm operations for which data needs to be fetched. Valid values are AllOperations, Application, Planting, Harvest and Tillage. */
  operations?: Array<string>;
  /** The beginning year from when the farm operations data needs to be fetched (minimum = 2000, maximum = current year). */
  startYear: number;
  /** Unique Id of the farm operations data ingestion job. This Id must be unique for a given tenant. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Processing duration of the job. Can be calculated as min(current time, job succeeded/failed/cancelled time) - job execution start time. This does not include the time spent waiting in the queue for the job to be picked up for processing. */
  durationInSeconds?: number;
  /** Brief description of the result of the job. */
  message?: string;
  /** UTC Date-time at which the job was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the job was last acted upon (format: yyyy-MM-ddTHH:mm:ssZ). */
  lastActionDateTime?: Date | string;
  /** UTC Date-time at which the processing of the job started (format: yyyy-MM-ddTHH:mm:ssZ). */
  startTime?: Date | string;
  /** UTC Date-time at which the processing of the job ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  endTime?: Date | string;
  /** Name of the farm operations data ingestion job. */
  name?: string;
  /** Brief description of the farm operations data ingestion job. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface Farm {
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Unique Id of the farm. This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the farm. */
  name?: string;
  /** Brief description of the farm. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface Field {
  /** Id of the associated farm. */
  farmId?: string;
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Id of the primary boundary associated with the field. At any point in time, a field can contain a maximum of one primary boundary. */
  primaryBoundaryId?: string;
  /** List of Ids of boundaries associated with the field. */
  boundaryIds?: Array<string>;
  /** Unique Id of the field. This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the field. */
  name?: string;
  /** Brief description of the field. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

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
  /** Details of harvested products. */
  harvestProductDetails?: Array<HarvestProductDetail>;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Represents the source from which the harvest data was obtained. */
  source?: string;
  /** UTC date-time at which the harvest data was modified at the source (format: yyyy-MM-ddTHH:mm:ssZ). This will be specified by the source. */
  operationModifiedDateTime?: Date | string;
  /** UTC date-time at which the harvest operation started (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationStartDateTime?: Date | string;
  /** UTC date-time at which the harvest operation ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationEndDateTime?: Date | string;
  /** Link to 'Attachments API' that can be used to find shapefiles, raster files or any other attachments associated with this operation. */
  attachmentsLink?: string;
  /** Id of the boundary of the field/seasonal field on which the harvest operation was done. */
  associatedBoundaryId?: string;
  /** Id of the boundary that is created using the geographical area on which the harvest operation was carried out. */
  operationBoundaryId?: string;
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Unique Id of the operation (harvest). This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the harvest operation. */
  name?: string;
  /** Brief description of the harvest operation. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface HarvestProductDetail {
  /** Name of a harvested product. */
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

export interface ImageProcessingRasterizeJob {
  /** Id of the associated farmer. */
  farmerId: string;
  /** Attachment id of the input shapefile which must be rasterized. */
  shapefileAttachmentId: string;
  /** List of shapefile column names that must be rasterized. */
  shapefileColumnNames: Array<string>;
  /** Unique Id of the image processing (rasterize) job. This Id must be unique for a given tenant. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Processing duration of the job. Can be calculated as min(current time, job succeeded/failed/cancelled time) - job execution start time. This does not include the time spent waiting in the queue for the job to be picked up for processing. */
  durationInSeconds?: number;
  /** Brief description of the result of the job. */
  message?: string;
  /** UTC Date-time at which the job was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the job was last acted upon (format: yyyy-MM-ddTHH:mm:ssZ). */
  lastActionDateTime?: Date | string;
  /** UTC Date-time at which the processing of the job started (format: yyyy-MM-ddTHH:mm:ssZ). */
  startTime?: Date | string;
  /** UTC Date-time at which the processing of the job ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  endTime?: Date | string;
  /** Name of the image processing (rasterize) job. */
  name?: string;
  /** Brief description of the image processing (rasterize) job. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface OAuthProvider {
  /** OAuth App Id for a given OAuth Provider. */
  appId?: string;
  /**
   * OAuth App secret for a given OAuth Provider.
   * Note: The app secret will not be part of the response.
   */
  appSecret?: string;
  /**
   * OAuth Api key for a given Provider.
   * Note: The Api key will not be part of the response. This is applicable only for authenticating to Climate Corp.
   */
  apiKey?: string;
  /**
   * An optional flag to determine if the OAuth App is ready to be used for production scenarios.
   * Note: This is applicable only for John Deere.
   */
  isProductionApp?: boolean;
  /** FarmBeats recognized unique Id for the OAuth provider. Valid value: 'JOHNDEERE. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the OAuth provider. */
  name?: string;
  /** Brief description of the OAuth provider. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface OAuthConnectRequest {
  /** Id of the farmer for whom the OAuth flow is being configured. */
  farmerId: string;
  /** Id of the OAuth provider. */
  oAuthProviderId: string;
  /** Link to redirect the user to, at the end of the OAuth flow. */
  userRedirectLink: string;
  /** State to be returned when redirecting the user at the end of the oauth flow. */
  userRedirectState?: string;
}

export interface PlantingData {
  /** Schema for storing measurement reading and unit. */
  avgPlantingRate?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
  /** Details of products planted. */
  plantingProductDetails?: Array<PlantingProductDetail>;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Represents the source from which the planting data was obtained. */
  source?: string;
  /** UTC date-time at which the operation data was modified at the source (format: yyyy-MM-ddTHH:mm:ssZ). This will be specified by the source. */
  operationModifiedDateTime?: Date | string;
  /** UTC date-time at which the operation started (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationStartDateTime?: Date | string;
  /** UTC date-time at which the operation ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationEndDateTime?: Date | string;
  /** Link to 'Attachments API' that can be used to find shapefiles, raster files or any other attachments associated with this operation. */
  attachmentsLink?: string;
  /** Id of the boundary of the field/seasonal field on which the planting operation was done. */
  associatedBoundaryId?: string;
  /** Id of the boundary that is created using the geographical area on which the planting operation was carried out. */
  operationBoundaryId?: string;
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Unique Id of the operation (planting). This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the planting operation. */
  name?: string;
  /** Brief description of the planting operation. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface PlantingProductDetail {
  /** Name of the planted product. */
  productName?: string;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
}

export interface SatelliteDataIngestionJob {
  /** Id of the associated farmer. */
  farmerId: string;
  /** The id of the boundary for which satellite data is being fetched. */
  boundaryId: string;
  /** UTC Date-time from when the satellite data has to be fetched (format: yyyy-MM-ddTHH:mm:ssZ). */
  startDateTime: Date | string;
  /** UTC Date-time till when the satellite data has to be fetched (format: yyyy-MM-ddTHH:mm:ssZ). */
  endDateTime: Date | string;
  /** Provider of satellite data. */
  provider?: "Microsoft";
  /** Source of satellite data. */
  source?: "Sentinel_2_L2A";
  /** Data Model for SatelliteIngestionJobRequest. */
  data?: SatelliteData;
  /** Unique Id of the satellite data ingestion job. This Id must be unique for a given tenant. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** DProcessing duration of the job. Can be calculated as min(current time, job succeeded/failed/cancelled time) - job execution start time. This does not include the time spent waiting in the queue for the job to be picked up for processing. */
  durationInSeconds?: number;
  /** Brief description of the result of the job. */
  message?: string;
  /** UTC Date-time at which the job was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the job was last acted upon (format: yyyy-MM-ddTHH:mm:ssZ). */
  lastActionDateTime?: Date | string;
  /** UTC Date-time at which the processing of the job started (format: yyyy-MM-ddTHH:mm:ssZ). */
  startTime?: Date | string;
  /** UTC Date-time at which the processing of the job ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  endTime?: Date | string;
  /** Name of the satellite data ingestion job. */
  name?: string;
  /** Brief description of the satellite data ingestion job. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface SatelliteData {
  /**
   * List of names of images to be fetched.
   * For Sentinel-2, allowed values are: 'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B8A', 'B09', 'B11', 'B12', 'AOT', 'SCL', 'SNW', 'CLD', 'NDVI', 'NDWI', 'EVI', 'LAI', 'LAIMask', 'CLP', 'CLM', and 'dataMask'.
   */
  imageNames?: Array<string>;
  /** List of formats in which images can be fetched. Available value: TIF. */
  imageFormats?: Array<string>;
  /** List of image resolutions in meters. For Sentinel-2, available values are: 10, 20, 60. */
  imageResolutions?: Array<number>;
}

export interface SeasonalField {
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Id of the primary boundary associated with the seasonal field. At any point in time, a seasonal field can contain a maximum of one primary boundary. */
  primaryBoundaryId?: string;
  /** List of Ids of boundaries associated with the seasonal field. */
  boundaryIds?: Array<string>;
  /** Id of the associated farm. */
  farmId?: string;
  /** Id of the associated field. */
  fieldId?: string;
  /** Id of the season associated with the seasonal field. */
  seasonId?: string;
  /** List of Ids of crop varieties associated with the seasonal field. All the crop varieties must belong to the same crop. */
  cropVarietyIds?: Array<string>;
  /** Id of the crop associated with the seasonal field. Seasonal fields are mono crop entities. */
  cropId?: string;
  /** Average yield generated from the seasonal field. */
  avgYieldValue?: number;
  /** Unit to measure average yield. */
  avgYieldUnit?: string;
  /** Average seed population planted in the seasonal field. */
  avgSeedPopulationValue?: number;
  /** Unit to measure average seed population. */
  avgSeedPopulationUnit?: string;
  /** UTC Date-time at which crops were planted (format: yyyy-MM-ddTHH:mm:ssZ). */
  plantingDateTime?: Date | string;
  /** Unique Id of the seasonal field. This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the seasonal field. */
  name?: string;
  /** Brief description of the seasonal field. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface Season {
  /** UTC date-time signifying the start of the season (format: yyyy-MM-ddTHH:mm:ssZ). */
  startDateTime?: Date | string;
  /** UTC date-time signifying the end of the season (format: yyyy-MM-ddTHH:mm:ssZ). */
  endDateTime?: Date | string;
  /** Year associated with the harvest i.e. year of season end date-time. */
  year?: number;
  /** Unique Id of the season. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the season. */
  name?: string;
  /** Brief description of the season. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface TillageData {
  /** Schema for storing measurement reading and unit. */
  tillageDepth?: Measure;
  /** Schema for storing measurement reading and unit. */
  tillagePressure?: Measure;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Represents the source from which the tillage data was obtained. */
  source?: string;
  /** UTC date-time at which the operation data was modified at the source (format: yyyy-MM-ddTHH:mm:ssZ). This will be specified by the source. */
  operationModifiedDateTime?: Date | string;
  /** UTC date-time at which the operation started (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationStartDateTime?: Date | string;
  /** UTC date-time at which the operation ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  operationEndDateTime?: Date | string;
  /** Link to 'Attachments API' that can be used to find shapefiles, raster files or any other attachments associated with this operation. */
  attachmentsLink?: string;
  /** Id of the boundary of the field/seasonal field on which the tillage operation was done. */
  associatedBoundaryId?: string;
  /** Id of the boundary that is created using the geographical area on which the tillage operation was carried out. */
  operationBoundaryId?: string;
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Unique Id of the operation (tillage). This Id is unique for a given farmer. */
  id?: string;
  /** ETag value can be used to implement optimistic concurrency. */
  eTag?: string;
  /** User determined status of the resource. */
  status?: string;
  /** UTC Date-time at which the resource was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the resource was last modified (format: yyyy-MM-ddTHH:mm:ssZ). */
  modifiedDateTime?: Date | string;
  /** Name of the tillage operation. */
  name?: string;
  /** Brief description of the tillage operation. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface WeatherDataIngestionJob {
  /** Id of the associated boundary. */
  boundaryId: string;
  /** Id of the associated farmer. */
  farmerId: string;
  /** Id of the weather extension. This signifies the source from where the weather data is fetched (eg. DTN.ClearAg). */
  extensionId: string;
  /** Extension api name to which the request is to be made. */
  extensionApiName: string;
  /** Dictionary of inputs for extension api. This would be passed as part fo request to weather data provider. */
  extensionApiInput: Record<string, Record<string, unknown>>;
  /** App id of the weather data provider. */
  extensionDataProviderAppId?: string;
  /** Api key of the weather data provider. */
  extensionDataProviderApiKey?: string;
  /** Unique Id of the weather data ingestion job. This Id must be unique for a given tenant. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Processing duration of the job. Can be calculated as min(current time, job succeeded/failed/cancelled time) - job execution start time. This does not include the time spent waiting in the queue for the job to be picked up for processing. */
  durationInSeconds?: number;
  /** Brief description of the result of the job. */
  message?: string;
  /** UTC Date-time at which the job was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the job was last acted upon (format: yyyy-MM-ddTHH:mm:ssZ). */
  lastActionDateTime?: Date | string;
  /** UTC Date-time at which the processing of the job started (format: yyyy-MM-ddTHH:mm:ssZ). */
  startTime?: Date | string;
  /** UTC Date-time at which the processing of the job ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  endTime?: Date | string;
  /** Name to weather data ingestion job. */
  name?: string;
  /** Brief description of the weather data ingestion job. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface WeatherDataDeleteJob {
  /** Id of the weather extension. This signifies the source from where the weather data was fetched (eg. DTN.ClearAg). */
  extensionId: string;
  /** The Id of the associated farmer. */
  farmerId: string;
  /** The id of the associated boundary. */
  boundaryId: string;
  /** Type of weather data (forecast/historical). */
  weatherDataType?: string;
  /** Granularity of weather data (daily/hourly). */
  granularity?: string;
  /** UTC Date-time from when the weather data has to be deleted (format: yyyy-MM-ddTHH:mm:ssZ). */
  startDateTime?: Date | string;
  /** UTC Date-time till when the weather data has to be deleted (format: yyyy-MM-ddTHH:mm:ssZ). */
  endDateTime?: Date | string;
  /** Unique Id of the weather data delete job. This Id must be unique for a given tenant. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: string;
  /** Processing duration of the job. Can be calculated as min(current time, job succeeded/failed/cancelled time) - job execution start time. This does not include the time spent waiting in the queue for the job to be picked up for processing. */
  durationInSeconds?: number;
  /** Brief description of the result of the job. */
  message?: string;
  /** UTC Date-time at which the job was created (format: yyyy-MM-ddTHH:mm:ssZ). */
  createdDateTime?: Date | string;
  /** UTC Date-time at which the job was last acted upon (format: yyyy-MM-ddTHH:mm:ssZ). */
  lastActionDateTime?: Date | string;
  /** UTC Date-time at which the processing of the job started (format: yyyy-MM-ddTHH:mm:ssZ). */
  startTime?: Date | string;
  /** UTC Date-time at which the processing of the job ended (format: yyyy-MM-ddTHH:mm:ssZ). */
  endTime?: Date | string;
  /** Name of the weather data deletion job. */
  name?: string;
  /** Brief description of the weather data deletion job. */
  description?: string;
  /** A collection of key value pairs associated with the resource. A key is a string and a value can be a numeric or a string. A maximum of 25 key value pairs can be associated with a resource. */
  properties?: Record<string, Record<string, unknown>>;
}

export interface MultiPolygon extends GeoJsonObjectBase, MultiPolygonCoordinates {
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
