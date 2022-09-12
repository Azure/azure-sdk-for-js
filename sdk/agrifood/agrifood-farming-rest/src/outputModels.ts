// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ApplicationDataListResponseOutput {
  /** List of requested objects. */
  value?: Array<ApplicationDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface ApplicationDataOutput extends Record<string, unknown> {
  /** Application product details. */
  applicationProductDetails?: Array<ApplicationProductDetailOutput>;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: string;
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface ApplicationProductDetailOutput {
  /** Name of the product applied. */
  productName?: string;
  /** A flag indicating whether product is a carrier for a tank mix. */
  isCarrier?: boolean;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: MeasureOutput;
}

export interface MeasureOutput {
  /** Data unit. */
  unit?: string;
  /** Data value. */
  value?: number;
}

export interface ErrorResponseOutput {
  /** An error from the Azure AgPlatform service. */
  error?: ErrorModelOutput;
  /** Unique trace Id. */
  traceId?: string;
}

export interface ErrorModelOutput {
  /** Server-defined set of error codes. */
  code?: string;
  /** Human-readable representation of the error. */
  message?: string;
  /** Target of the error. */
  target?: string;
  /** Array of details about specific errors that led to this reported error. */
  details?: Array<ErrorModelOutput>;
  /**
   * Inner error containing list of errors.
   * <see href="https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#innererror--object">InnerError reference document</see>.
   */
  innererror?: InnerErrorOutput;
}

export interface InnerErrorOutput extends Record<string, unknown> {
  /**
   * Specific error code than was provided by the
   * containing error.
   */
  code?: string;
  /**
   * Inner error containing list of errors.
   * <see href="https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#innererror--object">InnerError reference document</see>.
   */
  innererror?: InnerErrorOutput;
}

export interface CascadeDeleteJobOutput {
  /** Farmer Id. */
  farmerId: string;
  /** The id of the resource. */
  resourceId: string;
  /** The type of the resource. */
  resourceType: string;
  /** Unique job id. */
  id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  status?: "Waiting" | "Running" | "Succeeded" | "Failed" | "Cancelled";
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
}

export interface AttachmentListResponseOutput {
  /** List of requested objects. */
  value?: Array<AttachmentOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface AttachmentOutput {
  /** Associated Resource id for this attachment. */
  resourceId?: string;
  /** Associated Resource type for this attachment. */
  resourceType?:
    | "Farmer"
    | "Farm"
    | "Field"
    | "SeasonalField"
    | "Boundary"
    | "ApplicationData"
    | "HarvestData"
    | "TillageData"
    | "PlantingData"
    | "PlantTissueAnalysis";
  /** Original File Name for this attachment. */
  originalFileName?: string;
  /** Farmer id for this attachment. */
  farmerId?: string;
  /** Unique id. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  createdDateTime?: string;
  /** Date when resource was last modified. */
  modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
}

export interface BoundaryMetadataListResponseOutput {
  /** List of requested objects. */
  value?: Array<BoundaryMetadataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface BoundaryMetadataOutput extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId?: string;
  /** Id of the parent it belongs to. */
  parentId?: string;
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Boundary area in acres. */
  acreage?: number;
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
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface GeoJsonObjectOutputBase {
  type: "GeoJsonObject" | "MultiPolygon" | "Point" | "Polygon";
}

export interface BoundaryOutput extends Record<string, unknown> {
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  geometry?: GeoJsonObjectOutput;
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface BoundaryOverlapResponseOutput {
  /** Acreage of Main boundary. */
  boundaryAcreage?: number;
  /** Acreage of other boundary. */
  otherBoundaryAcreage?: number;
  /** Acreage of intersecting boundary. */
  intersectingAcreage?: number;
}

export interface CropListResponseOutput {
  /** List of requested objects. */
  value?: Array<CropOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface CropOutput extends Record<string, unknown> {
  /** Crop phenotype. */
  phenotype?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface CropVarietyListResponseOutput {
  /** List of requested objects. */
  value?: Array<CropVarietyOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface CropVarietyOutput extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface DeviceDataModelListResponseOutput {
  /** List of requested objects. */
  value?: Array<DeviceDataModelOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface DeviceDataModelOutput extends Record<string, unknown> {
  /** Type of device. */
  type?: string;
  /** Device manufacturer. */
  manufacturer?: string;
  /** Device productCode. */
  productCode?: string;
  /** List of device ports supported. */
  ports?: Array<PortOutput>;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface PortOutput {
  /** Name of the port. */
  name?: string;
  /** Type of port digital/analog. */
  type?: string;
}

export interface DeviceListResponseOutput {
  /** List of requested objects. */
  value?: Array<DeviceOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface DeviceOutput extends Record<string, unknown> {
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
  location?: LocationOutput;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface LocationOutput {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
}

export interface FarmerListResponseOutput {
  /** List of requested objects. */
  value?: Array<FarmerOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface FarmerOutput extends Record<string, unknown> {
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface FarmOperationDataIngestionJobOutput
  extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface FarmListResponseOutput {
  /** List of requested objects. */
  value?: Array<FarmOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface FarmOutput extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface FieldListResponseOutput {
  /** List of requested objects. */
  value?: Array<FieldOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface FieldOutput extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface HarvestDataListResponseOutput {
  /** List of requested objects. */
  value?: Array<HarvestDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface HarvestDataOutput extends Record<string, unknown> {
  /** Schema for storing measurement reading and unit. */
  totalYield?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgYield?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalWetMass?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgWetMass?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgMoisture?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgSpeed?: MeasureOutput;
  /** Harvest product details. */
  harvestProductDetails?: Array<HarvestProductDetailOutput>;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: string;
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface HarvestProductDetailOutput {
  /** Name of the product. */
  productName?: string;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalYield?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgYield?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgMoisture?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalWetMass?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgWetMass?: MeasureOutput;
}

export interface ImageProcessingRasterizeJobOutput
  extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface InsightAttachmentListResponseOutput {
  /** List of requested objects. */
  value?: Array<InsightAttachmentOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface InsightAttachmentOutput {
  /** InsightID for this InsightAttachment. */
  insightId: string;
  /** ModelID for this InsightAttachment. */
  modelId?: string;
  /** Associated Resource type for this attachment. */
  resourceType?: "Farmer" | "Farm" | "Field" | "SeasonalField" | "Boundary";
  /** Associated Resource id for this attachment. */
  resourceId?: string;
  /** Original File Name for this attachment. */
  originalFileName?: string;
  /** Farmer id for this attachment. */
  farmerId?: string;
  /** Unique id. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  createdDateTime?: string;
  /** Date when resource was last modified. */
  modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
}

export interface InsightListResponseOutput {
  /** List of requested objects. */
  value?: Array<InsightOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface InsightOutput extends Record<string, unknown> {
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
  insightStartDateTime?: string;
  /** End date to which the insight is related. */
  insightEndDateTime?: string;
  /** Measures to capture insights results. */
  measures?: Record<string, MeasureOutput>;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface ManagementZoneListResponseOutput {
  /** List of requested objects. */
  value?: Array<ManagementZoneOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface ManagementZoneOutput extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface BiomassModelJobOutput extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
  /** The id of the boundary object for which biomass is being calculated. */
  boundaryId: string;
  /** The version of the biomass model to be run. Available Value: 1.0 . */
  modelVersion: string;
  /** Crop name for biomass model. Available Value: Corn. */
  cropName: "Corn";
  /** Planting datetime for biomass calculations. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  plantingStartDateTime: string;
  /** End datetime till which biomass will be calculated. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  inferenceEndDateTime: string;
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface SoilMoistureModelJobOutput extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
  /** The id of the boundary object for which soil moisture is being calculated. */
  boundaryId: string;
  /** Sensor data model Id. */
  sensorDataModelId: string;
  /** Sensor partner Id. */
  sensorPartnerId: string;
  /** Inference start date time for soil moisture calculations. */
  inferenceStartDateTime: string;
  /** Inference end date time for soil moisture calculations. */
  inferenceEndDateTime: string;
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
  sensorDefinition: SoilMoistureModelSensorDefinitionOutput;
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface SoilMoistureModelSensorDefinitionOutput {
  /** The measurement name for sensor measure in sensorDataModel. */
  sensorMeasurement: string;
  /** The measurement name for minimum measurement value. */
  minProperty: string;
  /** The measurement name for maximum measurement value. */
  maxProperty: string;
}

export interface NutrientAnalysisListResponseOutput {
  /** List of requested objects. */
  value?: Array<NutrientAnalysisOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface NutrientAnalysisOutput extends Record<string, unknown> {
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
  products?: Array<ProductDetailsOutput>;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface ProductDetailsOutput {
  /** Rate of the product. */
  rate?: string;
  /** Instruction of the resource. */
  instruction?: string;
  /** Product of the resource. */
  product?: string;
}

export interface OAuthProviderListResponseOutput {
  /** List of requested objects. */
  value?: Array<OAuthProviderOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface OAuthProviderOutput {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface OAuthProviderCascadeDeleteJobOutput
  extends Record<string, unknown> {
  /** The id of the oauth provider. */
  oauthProviderId: string;
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface OAuthTokenListResponseOutput {
  /** List of requested objects. */
  value?: Array<OAuthTokenOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface OAuthTokenOutput {
  /** Farmer ID for this OAuth config. */
  farmerId: string;
  /** ID of the OAuth provider resource containing app information. */
  authProviderId: string;
  /** An optional flag indicating whether the token is a valid or expired (Default value: true). */
  isValid?: boolean;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
}

export interface PlantingDataListResponseOutput {
  /** List of requested objects. */
  value?: Array<PlantingDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface PlantingDataOutput extends Record<string, unknown> {
  /** Schema for storing measurement reading and unit. */
  avgPlantingRate?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: MeasureOutput;
  /** Planting product details. */
  plantingProductDetails?: Array<PlantingProductDetailOutput>;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: string;
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface PlantingProductDetailOutput {
  /** Name of the product. */
  productName?: string;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: MeasureOutput;
}

export interface PlantTissueAnalysisListResponseOutput {
  /** List of requested objects. */
  value?: Array<PlantTissueAnalysisOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface PlantTissueAnalysisOutput extends Record<string, unknown> {
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
  plantingDateTime?: string;
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
  sampleCollectionDateTime?: string;
  /** Sample received dateTime. */
  sampleReceivedDateTime?: string;
  /** Sample test result dateTime for this plant tissue analysis. */
  sampleTestResultDateTime?: string;
  /** Model for representing LabDetails object. */
  labDetails?: LabDetailsOutput;
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface LabDetailsOutput {
  /** Code of the resource. */
  code?: string;
  /** Name of the resource. */
  name?: string;
  /** Description of the resource. */
  description?: string;
  /** Address of the resource. */
  address?: string;
}

export interface PrescriptionMapListResponseOutput {
  /** List of requested objects. */
  value?: Array<PrescriptionMapOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface PrescriptionMapOutput extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface PrescriptionListResponseOutput {
  /** List of requested objects. */
  value?: Array<PrescriptionOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface PrescriptionOutput extends Record<string, unknown> {
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
  measures?: Record<string, MeasureOutput>;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface SceneListResponseOutput {
  /** List of requested objects. */
  value?: Array<SceneOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SceneOutput {
  /** Date-time of the scene, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  sceneDateTime?: string;
  /** Data provider of the scene. */
  provider?: string;
  /** Data source of the scene. */
  source?: string;
  /** Collection of image files. */
  imageFiles?: Array<ImageFileOutput>;
  /** ImageFormat. Available value: TIF. */
  imageFormat?: "TIF";
  /** Cloud cover percentage of the scene. */
  cloudCoverPercentage?: number;
  /** Dark pixel percentage of the scene. */
  darkPixelPercentage?: number;
  /** Median of NDVI of the scene. */
  ndviMedianValue?: number;
  /** Boundary ID which belongs to the scene. */
  boundaryId?: string;
  /** Farmer ID which belongs to the scene. */
  farmerId?: string;
  /** Unique scene resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
}

export interface ImageFileOutput {
  /** Link of the image file. */
  fileLink?: string;
  /** Name of the image file. */
  name: string;
  /** ImageFormat. Available value: TIF. */
  imageFormat?: "TIF";
  /** Resolution of image file in meters. */
  resolution?: number;
}

export interface SatelliteDataIngestionJobOutput
  extends Record<string, unknown> {
  /** Farmer Id. */
  farmerId: string;
  /** The id of the boundary object for which satellite data is being fetched. */
  boundaryId: string;
  /** Start Date. */
  startDateTime: string;
  /** End Date. */
  endDateTime: string;
  /** Provider of satellite data. Available Value: Microsoft. */
  provider?: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  source?: "Sentinel_2_L2A";
  /** Data Model for SatelliteIngestionJobRequest. */
  data?: SatelliteDataOutput;
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface SatelliteDataOutput {
  /** List of ImageNames. */
  imageNames?: Array<string>;
  /** List of ImageFormats. Available value: TIF. */
  imageFormats?: Array<string>;
  /** List of ImageResolutions in meters. Available values: 10, 20, 60. */
  imageResolutions?: Array<number>;
}

export interface SeasonalFieldListResponseOutput {
  /** List of requested objects. */
  value?: Array<SeasonalFieldOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SeasonalFieldOutput extends Record<string, unknown> {
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
  plantingDateTime?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface SeasonListResponseOutput {
  /** List of requested objects. */
  value?: Array<SeasonOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SeasonOutput extends Record<string, unknown> {
  /** Season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startDateTime?: string;
  /** Season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: string;
  /** Season year. */
  year?: number;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface SensorDataModelListResponseOutput {
  /** List of requested objects. */
  value?: Array<SensorDataModelOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SensorDataModelOutput extends Record<string, unknown> {
  /** Type of sensor. */
  type?: string;
  /** Sensor manufacturer. */
  manufacturer?: string;
  /** Sensor productCode. */
  productCode?: string;
  /** Map of sensor type to sensor measures. */
  measures: Record<string, SensorDataModelMeasureOutput>;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the resource. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface SensorDataModelMeasureOutput {
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

export interface SensorEventListResponseOutput {
  /** List of requested objects. */
  value?: Array<SensorEventOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SensorEventOutput {
  /** Id of the sensor. */
  sensorId?: string;
  /** Id of the sensor partner. */
  sensorPartnerId?: string;
  /** Id of the associated farmer. */
  farmerId?: string;
  /** Id of the associated boundary. */
  boundaryId?: string;
  /** DateTime of sensor event observation. */
  eventDateTime?: string;
  /** DateTime of sensor event ingestion to data store. */
  ingestionDateTime?: string;
  /** Sensor measures. */
  measures?: Record<string, any>;
}

export interface SensorMappingListResponseOutput {
  /** List of requested objects. */
  value?: Array<SensorMappingOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SensorMappingOutput extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface SensorPartnerIntegrationModelListResponseOutput {
  /** List of requested objects. */
  value?: Array<SensorPartnerIntegrationModelOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SensorPartnerIntegrationModelOutput
  extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface SensorPartnerIntegrationCheckConsentResponseOutput {
  /** Flag to determine the status of partner integration consent. */
  consented?: boolean;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the integration. */
  integrationId?: string;
}

export interface SensorPartnerIntegrationGenerateConsentLinkResponseOutput {
  /** Consent link. */
  consentLink?: string;
  /** Consent expiry date time, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  consentExpiryDateTime?: string;
}

export interface SensorListResponseOutput {
  /** List of requested objects. */
  value?: Array<SensorOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SensorOutput extends Record<string, unknown> {
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
  location?: LocationOutput;
  /** Schema for storing port values. */
  port?: PortOutput;
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface IoTHubDeviceAuthenticationOutput {
  /** Primary connection string of the ioTHub device. */
  primaryDeviceConnectionString?: string;
  /** Secondary connection string of the ioTHub device. */
  secondaryDeviceConnectionString?: string;
}

export interface TillageDataListResponseOutput {
  /** List of requested objects. */
  value?: Array<TillageDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface TillageDataOutput extends Record<string, unknown> {
  /** Schema for storing measurement reading and unit. */
  tillageDepth?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  tillagePressure?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: string;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: string;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: string;
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface WeatherDataListResponseOutput {
  /** List of requested objects. */
  value?: Array<WeatherDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface WeatherDataOutput {
  /** Farmer ID. */
  farmerId: string;
  /** Boundary ID. */
  boundaryId: string;
  /** ID of the weather extension. */
  extensionId: string;
  /** Location model class. */
  location: LocationOutput;
  /** Date-time of the weather data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  dateTime: string;
  /** Unit System like US/SI etc. */
  unitSystemCode?: string;
  /** Version of the weather data extension. */
  extensionVersion: string;
  /** Type of weather data (forecast/historical). */
  weatherDataType: string;
  /** Granularity of weather data (daily/hourly). */
  granularity: string;
  /** Schema for storing measurement reading and unit. */
  cloudCover?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  dewPoint?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  growingDegreeDay?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  precipitation?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  pressure?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  relativeHumidity?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  soilMoisture?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  soilTemperature?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  temperature?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  visibility?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  wetBulbTemperature?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  windChill?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  windDirection?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  windGust?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  windSpeed?: MeasureOutput;
  /** Weather data ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 250 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
}

export interface WeatherDataDeleteJobOutput extends Record<string, unknown> {
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
  startDateTime?: string;
  /** Weather data end UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: string;
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface WeatherDataIngestionJobOutput extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: string;
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

export interface ZoneListResponseOutput {
  /** List of requested objects. */
  value?: Array<ZoneOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface ZoneOutput extends Record<string, unknown> {
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
  createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: string;
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

export interface MultiPolygonOutput
  extends GeoJsonObjectOutputBase,
    MultiPolygonCoordinatesOutput {
  type: "MultiPolygon";
}

export interface MultiPolygonCoordinatesOutput {
  /**
   * Gets or sets coordinates of GeoJSON Object.
   * It must be an array of polygons, each polygon contains list of linear rings.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: Array<Array<Array<Array<number>>>>;
}

export interface PointOutput
  extends GeoJsonObjectOutputBase,
    PointCoordinatesOutput {
  type: "Point";
}

export interface PointCoordinatesOutput {
  /**
   * Gets or sets the coordinate of this point.
   * It must be an array of 2 or 3 elements for a 2D or 3D system respectively.
   */
  coordinates: Array<number>;
}

export interface PolygonOutput
  extends GeoJsonObjectOutputBase,
    PolygonCoordinatesOutput {
  type: "Polygon";
}

export interface PolygonCoordinatesOutput {
  /**
   * Gets or sets type of the GeoJSON Object.
   * It must be an array of linear ring coordinate arrays.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: Array<Array<Array<number>>>;
}

export type GeoJsonObjectOutput =
  | MultiPolygonOutput
  | PointOutput
  | PolygonOutput;
