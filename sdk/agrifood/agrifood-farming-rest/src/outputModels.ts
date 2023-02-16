// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface ApplicationDataListResponseOutput {
  /** List of requested objects. */
  value: Array<ApplicationDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of application data resource. */
export interface ApplicationDataOutput {
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
  readonly attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Party ID which belongs to the operation data. */
  readonly partyId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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

/** Schema for storing measurement reading and unit. */
export interface MeasureOutput {
  /** Data unit. */
  unit?: string;
  /** Data value. */
  value?: number;
}

/** An error response from the Azure AgPlatform service. See https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses for ErrorResponse reference document. */
export interface ErrorResponseOutput {
  /** An error from the Azure AgPlatform service. */
  error?: ErrorModelOutput;
  /** Unique trace Id. */
  traceId?: string;
}

/** An error from the Azure AgPlatform service. */
export interface ErrorModelOutput {
  /** Server-defined set of error codes. */
  code: string;
  /** Human-readable representation of the error. */
  message: string;
  /** Target of the error. */
  target?: string;
  /** Array of details about specific errors that led to this reported error. */
  details?: Array<ErrorModelOutput>;
  /** Inner error containing list of errors.See https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#innererror--object for InnerError reference document. */
  innererror?: InnerErrorOutput;
}

/** Inner error containing list of errors.See https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#innererror--object for InnerError reference document. */
export interface InnerErrorOutput {
  /** Specific error code than was provided by the containing error. */
  code?: string;
  /** Inner error containing list of errors.See https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#innererror--object for InnerError reference document. */
  innererror?: InnerErrorOutput;
}

/** Schema of cascade delete job. */
export interface CascadeDeleteJobOutput {
  /** Party Id. */
  partyId: string;
  /** The id of the resource. */
  resourceId: string;
  /** The type of the resource. */
  resourceType: string;
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?:
    | "Waiting"
    | "Running"
    | "Succeeded"
    | "Failed"
    | "Cancelled";
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface AttachmentListResponseOutput {
  /** List of requested objects. */
  value: Array<AttachmentOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of attachment resource. */
export interface AttachmentOutput {
  /** Associated Resource id for this attachment. */
  resourceId?: string;
  /** Associated Resource type for this attachment. */
  resourceType?:
    | "Party"
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
  readonly originalFileName?: string;
  /** PartyId id for this attachment. */
  readonly partyId?: string;
  /** Unique id. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  readonly createdDateTime?: string;
  /** Date when resource was last modified. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface BoundaryMetadataListResponseOutput {
  /** List of requested objects. */
  value: Array<BoundaryMetadataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of boundary resource metadata. */
export interface BoundaryMetadataOutput {
  /** Party Id. */
  readonly partyId?: string;
  /** Id of the parent it belongs to. */
  parentId?: string;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /** Type of the parent it belongs to. */
  readonly parentType?:
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
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
export interface GeoJsonObjectOutputParent {
  type: "GeoJsonObject" | "MultiPolygon" | "Point" | "Polygon";
}

/** Schema of boundary resource. */
export interface BoundaryOutput {
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  geometry?: GeoJsonObjectOutput;
  /** Indicates the type of boundary belonging to a parent. */
  type?: string;
  /** Coordinate  Reference System. */
  readonly crs?: string;
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  centroid?: GeoJsonObjectOutput;
  /** GeoJSON (For more details: https://geojson.org/). Note: Coordinates are expected in [Longitude, Latitude] format. */
  bbox?: GeoJsonObjectOutput;
  /** Party Id. */
  readonly partyId?: string;
  /** Id of the parent it belongs to. */
  parentId?: string;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
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
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of boundary overlap response. */
export interface BoundaryOverlapResponseOutput {
  /** Acreage of Main boundary. */
  boundaryArea?: number;
  /** Acreage of other boundary. */
  otherBoundaryArea?: number;
  /** Acreage of intersecting boundary. */
  intersectingArea?: number;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface CropProductListResponseOutput {
  /** List of requested objects. */
  value: Array<CropProductOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of crop product resource. */
export interface CropProductOutput {
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
  relativeMaturity?: MeasureOutput;
  /** CropProduct treatments. */
  treatments?: Array<string>;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface CropListResponseOutput {
  /** List of requested objects. */
  value: Array<CropOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of crop resource. */
export interface CropOutput {
  /** Crop phenotype. */
  phenotype?: string;
  /** Breeding Method. */
  breedingMethod?: "VARIETY" | "HYBRID" | "UNKNOWN";
  /** Measurements. */
  measurements?: Record<string, MeasureOutput>;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface DeviceDataModelListResponseOutput {
  /** List of requested objects. */
  value: Array<DeviceDataModelOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** DeviceDataModel API model. */
export interface DeviceDataModelOutput {
  /** Type of device. */
  type?: string;
  /** Device manufacturer. */
  manufacturer?: string;
  /** Device productCode. */
  productCode?: string;
  /** List of device ports supported. */
  ports?: Array<PortOutput>;
  /** Id of the associated sensor partner. */
  readonly sensorPartnerId?: string;
  /** Id of the resource. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface PortOutput {
  /** Name of the port. */
  name?: string;
  /** Type of port digital/analog. */
  type?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface DeviceListResponseOutput {
  /** List of requested objects. */
  value: Array<DeviceOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Device API model. */
export interface DeviceOutput {
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
  readonly sensorPartnerId?: string;
  /** Id of the resource. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface LocationOutput {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
}

/** Schema of farm operation data ingestion job. */
export interface FarmOperationDataIngestionJobOutput {
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
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface FarmListResponseOutput {
  /** List of requested objects. */
  value: Array<FarmOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of farm resource. */
export interface FarmOutput {
  /** Party Id. */
  readonly partyId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface FieldListResponseOutput {
  /** List of requested objects. */
  value: Array<FieldOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of field resource. */
export interface FieldOutput {
  /** Id of the associated Farm. */
  farmId?: string;
  /** Party Id. */
  readonly partyId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface HarvestDataListResponseOutput {
  /** List of requested objects. */
  value: Array<HarvestDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of harvest data resource. */
export interface HarvestDataOutput {
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
  readonly attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Party ID which belongs to the operation data. */
  readonly partyId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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

/** Image Processing Rasterize Job to convert shapefile into tiff file. */
export interface ImageProcessingRasterizeJobOutput {
  /** Party Id. */
  partyId: string;
  /** Shapefile attachment Id. */
  shapefileAttachmentId: string;
  /** List of shapefile column names to create raster attachments. */
  shapefileColumnNames: Array<string>;
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface InsightAttachmentListResponseOutput {
  /** List of requested objects. */
  value: Array<InsightAttachmentOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of insight attachment resource. */
export interface InsightAttachmentOutput {
  /** InsightID for this InsightAttachment. */
  insightId: string;
  /** ModelID for this InsightAttachment. */
  readonly modelId?: string;
  /** Associated Resource type for this attachment. */
  readonly resourceType?:
    | "Party"
    | "Farm"
    | "Field"
    | "SeasonalField"
    | "Boundary";
  /** Associated Resource id for this attachment. */
  readonly resourceId?: string;
  /** Original File Name for this attachment. */
  readonly originalFileName?: string;
  /** PartyId id for this attachment. */
  readonly partyId?: string;
  /** Unique id. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  readonly createdDateTime?: string;
  /** Date when resource was last modified. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface InsightListResponseOutput {
  /** List of requested objects. */
  value: Array<InsightOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of insight resource. */
export interface InsightOutput {
  /** Id of the associated party. */
  readonly partyId?: string;
  /** Id of the associated model. */
  readonly modelId?: string;
  /** Resource type associated with the record. */
  readonly resourceType?:
    | "Party"
    | "Farm"
    | "Field"
    | "SeasonalField"
    | "Boundary";
  /** Id of the associated resource. */
  readonly resourceId?: string;
  /** Version of the associated model. */
  modelVersion?: string;
  /** Gets link for attachments. */
  readonly attachmentsLink?: string;
  /** Start date to which the insight is related. */
  insightStartDateTime?: string;
  /** End date to which the insight is related. */
  insightEndDateTime?: string;
  /** Measures to capture insights results. */
  measurements?: Record<string, MeasureOutput>;
  /** Id of the resource. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface ManagementZoneListResponseOutput {
  /** List of requested objects. */
  value: Array<ManagementZoneOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Api Model for ManagementZone object. */
export interface ManagementZoneOutput {
  /** Party Id associated with the ManagementZone. */
  readonly partyId?: string;
  /** Type of the ManagementZone. */
  type?: string;
  /** Season Id associated with the ManagementZone. */
  seasonId?: string;
  /** Crop Id associated with the ManagementZone. */
  cropId?: string;
  /** Field Id associated with the ManagementZone. */
  fieldId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface BiomassModelJobOutput {
  /** Party Id. */
  partyId: string;
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
  satelliteSource: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** ImageResolution in meters. Available values: 10, 20, 60. */
  imageResolution: number;
  /** ImageFormat. Available value: TIF. */
  imageFormat: "TIF";
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface SensorPlacementModelJobOutput {
  /** Party Id. */
  partyId: string;
  /** The id of the boundary object for which sensor placement is being calculated. */
  boundaryId: string;
  /** The version of the sensor placement model to be run. */
  modelVersion: string;
  /** Start datetime for satellite data to be pulled. */
  inferenceStartDateTime: string;
  /** End datetime for satellite data to be pulled. */
  inferenceEndDateTime: string;
  /** Provider of satellite data. Available Value: Microsoft. */
  satelliteProvider: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  satelliteSource: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** SensorType. The sensor placement map generated for sensor type (e.g., soil moisture, soil temperature, npk). Available Value: SoilMoisture. */
  sensorType: string;
  /** IsRanked, if True the sensor placements will be ranked. */
  isRanked: boolean;
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface SoilMoistureModelJobOutput {
  /** Party Id. */
  partyId: string;
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
  satelliteSource: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** ImageResolution in meters. Available values: 10, 20, 60. */
  imageResolution: number;
  /** ImageFormat. Available value: TIF. */
  imageFormat: "TIF";
  /** The version of the soil moisture model to be run. */
  modelVersion: string;
  /** Schema for storing sensor definition keywords. */
  sensorDefinition: SoilMoistureModelSensorDefinitionOutput;
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface SoilMoistureModelSensorDefinitionOutput {
  /** The measurement name for sensor measure in sensorDataModel. */
  sensorMeasurement: string;
  /** The measurement name for minimum measurement value. */
  minProperty: string;
  /** The measurement name for maximum measurement value. */
  maxProperty: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface NutrientAnalysisListResponseOutput {
  /** List of requested objects. */
  value: Array<NutrientAnalysisOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Api Model for nutrient analysis object. */
export interface NutrientAnalysisOutput {
  /** Party id for this nutrient analysis. */
  readonly partyId?: string;
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
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface ProductDetailsOutput {
  /** Rate of the product. */
  rate?: string;
  /** Instruction of the resource. */
  instruction?: string;
  /** Product of the resource. */
  product?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface OAuthProviderListResponseOutput {
  /** List of requested objects. */
  value: Array<OAuthProviderOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of OAuth provider resource. */
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
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of oauth provider cascade delete job. */
export interface OAuthProviderCascadeDeleteJobOutput {
  /** The id of the oauth provider. */
  oauthProviderId: string;
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface OAuthTokenListResponseOutput {
  /** List of requested objects. */
  value: Array<OAuthTokenOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of OAuth token resource. */
export interface OAuthTokenOutput {
  /** Party ID for this OAuth config. */
  partyId: string;
  /** ID of the OAuth provider resource containing app information. */
  authProviderId: string;
  /** An optional flag indicating whether the token is a valid or expired (Default value: true). */
  isValid?: boolean;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface PartyListResponseOutput {
  /** List of requested objects. */
  value: Array<PartyOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of party resource. */
export interface PartyOutput {
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface PlantingDataListResponseOutput {
  /** List of requested objects. */
  value: Array<PlantingDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of planting data resource. */
export interface PlantingDataOutput {
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
  readonly attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Party ID which belongs to the operation data. */
  readonly partyId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface PlantTissueAnalysisListResponseOutput {
  /** List of requested objects. */
  value: Array<PlantTissueAnalysisOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Api Model for plant tissue analysis object. */
export interface PlantTissueAnalysisOutput {
  /** Id of the associated Party. */
  readonly partyId?: string;
  /** Id of the associated Field. */
  fieldId?: string;
  /** Id of the associated Crop. */
  cropId?: string;
  /** Id of the associated Crop product. */
  cropProductId?: string;
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
  readonly attachmentsLink?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface PrescriptionMapListResponseOutput {
  /** List of requested objects. */
  value: Array<PrescriptionMapOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Api Model for Prescription Map object. */
export interface PrescriptionMapOutput {
  /** Party Id. */
  readonly partyId?: string;
  /** Prescription map type. */
  type?: string;
  /** Season Id. */
  seasonId?: string;
  /** Crop Id. */
  cropId?: string;
  /** Field Id. */
  fieldId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface PrescriptionListResponseOutput {
  /** List of requested objects. */
  value: Array<PrescriptionOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Api Model for Prescription object. */
export interface PrescriptionOutput {
  /** Party Id. */
  readonly partyId?: string;
  /** Prescription map Id. */
  prescriptionMapId?: string;
  /** Product Code. */
  productCode?: string;
  /** Product name. */
  productName?: string;
  /** Prescription type. */
  type?: string;
  /** Measures. */
  measurements?: Record<string, MeasureOutput>;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SceneListResponseOutput {
  /** List of requested objects. */
  value: Array<SceneOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of scene resource. */
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
  /** Party ID which belongs to the scene. */
  partyId?: string;
  /** Unique scene resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
}

/** Schema of image file resource. */
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

/** Schema of satellite data ingestion job. */
export interface SatelliteDataIngestionJobOutput {
  /** Party Id. */
  partyId: string;
  /** The id of the boundary object for which satellite data is being fetched. */
  boundaryId: string;
  /** Start Date. */
  startDateTime: string;
  /** End Date. */
  endDateTime: string;
  /** Provider of satellite data. Available Value: Microsoft. */
  provider?: "Microsoft";
  /** Source of satellite data. Available Value: Sentinel_2_L2A. */
  source: "Sentinel_2_L2A" | "Sentinel_2_L1C";
  /** Data Model for SatelliteIngestionJobRequest. */
  data?: SatelliteDataOutput;
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface SatelliteDataOutput {
  /** List of ImageNames. */
  imageNames?: Array<string>;
  /** List of ImageFormats. Available value: TIF. */
  imageFormats?: Array<string>;
  /** List of ImageResolutions in meters. Available values: 10, 20, 60. */
  imageResolutions?: Array<number>;
}

/** Paged response contains list of features and next property to get the next set of results. */
export interface SearchFeaturesResponseOutput {
  /** List of features. */
  features: Array<StacFeatureOutput>;
  /**
   * URL to do the POST request with same filters,
   * to get next set of features.
   */
  readonly nextLink?: string;
}

/**
 * Schema of STAC Feature(Item).
 * Refer for spec: https://github.com/radiantearth/stac-spec/blob/v1.0.0-beta.2/item-spec/item-spec.md#item-fields.
 */
export interface StacFeatureOutput {
  /** The STAC version the Feature implements. */
  stacVersion: string;
  /** A list of extensions the Feature implements. */
  stacExtensions?: Array<string>;
  /** Provider identifier. Globally unique ID by Data provider. */
  id: string;
  /** Type of the GeoJSON Object. It's value is always Feature. */
  type: string;
  /**
   * Defines the full footprint of the asset represented by this item.
   * Its a GeoJSON geometry.
   */
  geometry?: any;
  /** Bounding box of the feature. */
  bbox?: Array<number>;
  /** A dictionary of additional metadata for the item. */
  properties: any;
  /** List of link objects to resources and related URLs. */
  links: Array<StacFeatureLinkOutput>;
  /** Dictionary of asset objects, each with a unique key. */
  assets: Record<string, StacFeatureAssetOutput>;
  /** The id of the STAC Collection this Feature references. */
  collection?: string;
}

/**
 * The Link object describes a relationship of this Feature with another entity.
 * Refer for spec: https://github.com/radiantearth/stac-spec/blob/v1.0.0-beta.2/item-spec/item-spec.md#link-object.
 */
export interface StacFeatureLinkOutput {
  /** The actual link in the format of an URL. */
  href: string;
  /** Relationship between the current document and the linked document. */
  rel: string;
  /** Media type of the referenced entity. */
  type?: string;
  /** A human readable title to be used in rendered displays of the link. */
  title?: string;
}

/**
 * Schema of STAC Feature's Asset.
 * Refer for spec: https://github.com/radiantearth/stac-spec/blob/v1.0.0-beta.2/item-spec/item-spec.md#asset-object.
 */
export interface StacFeatureAssetOutput {
  /** Link to the asset object. */
  href: string;
  /** The displayed title for clients and users. */
  title?: string;
  /** A description of the Asset providing additional details, such as how it was processed or created. */
  description?: string;
  /** Media type of the asset. */
  type?: string;
  /** The semantic roles of the asset, similar to the use of rel in links. */
  roles?: Array<string>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SeasonalFieldListResponseOutput {
  /** List of requested objects. */
  value: Array<SeasonalFieldOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of seasonal field resource. */
export interface SeasonalFieldOutput {
  /** Party Id. */
  readonly partyId?: string;
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
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SeasonListResponseOutput {
  /** List of requested objects. */
  value: Array<SeasonOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of season resource. */
export interface SeasonOutput {
  /** Season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startDateTime?: string;
  /** Season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: string;
  /** Season year. */
  year?: number;
  /** Geographic Identifier. */
  geographicIdentifier?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SensorDataModelListResponseOutput {
  /** List of requested objects. */
  value: Array<SensorDataModelOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** SensorModel API model. */
export interface SensorDataModelOutput {
  /** Type of sensor. */
  type?: string;
  /** Sensor manufacturer. */
  manufacturer?: string;
  /** Sensor productCode. */
  productCode?: string;
  /** Map of sensor type to sensor measures. */
  measures: Record<string, SensorDataModelMeasureOutput>;
  /** Id of the associated sensor partner. */
  readonly sensorPartnerId?: string;
  /** Id of the resource. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SensorEventListResponseOutput {
  /** List of requested objects. */
  value: Array<SensorEventOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Sensor event response model. */
export interface SensorEventOutput {
  /** Id of the sensor. */
  sensorId?: string;
  /** Id of the sensor partner. */
  sensorPartnerId?: string;
  /** Id of the associated party. */
  partyId?: string;
  /** Id of the associated boundary. */
  boundaryId?: string;
  /** DateTime of sensor event observation. */
  eventDateTime?: string;
  /** DateTime of sensor event ingestion to data store. */
  ingestionDateTime?: string;
  /** Sensor measures. */
  measures?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SensorMappingListResponseOutput {
  /** List of requested objects. */
  value: Array<SensorMappingOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** SensorMapping API model. */
export interface SensorMappingOutput {
  /** Id of the associated sensor. */
  sensorId?: string;
  /** Id of the associated sensor partner. */
  sensorPartnerId?: string;
  /** Id of the associated party. */
  partyId?: string;
  /** Id of the associated boundary. */
  boundaryId?: string;
  /** Id of the resource. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SensorPartnerIntegrationModelListResponseOutput {
  /** List of requested objects. */
  value: Array<SensorPartnerIntegrationModelOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Sensor partner integration model. */
export interface SensorPartnerIntegrationModelOutput {
  /** Id of the integration. */
  readonly integrationId?: string;
  /** Id of the party. */
  partyId?: string;
  /** Id of the associated sensor partner. */
  readonly sensorPartnerId?: string;
  /** Id of the resource. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Sensor partner integration check consent response. */
export interface SensorPartnerIntegrationCheckConsentResponseOutput {
  /** Flag to determine the status of partner integration consent. */
  consented?: boolean;
  /** Id of the associated sensor partner. */
  readonly sensorPartnerId?: string;
  /** Id of the integration. */
  readonly integrationId?: string;
}

/** Sensor partner integration generate consent link response. */
export interface SensorPartnerIntegrationGenerateConsentLinkResponseOutput {
  /** Consent link. */
  readonly consentLink?: string;
  /** Consent expiry date time, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  consentExpiryDateTime?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface SensorListResponseOutput {
  /** List of requested objects. */
  value: Array<SensorOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Sensor API model. */
export interface SensorOutput {
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
  readonly sensorPartnerId?: string;
  /** Id of the resource. */
  readonly id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and
   * only string, numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Authentication via connection string to IoTHub devices. */
export interface IoTHubDeviceAuthenticationOutput {
  /** Primary connection string of the ioTHub device. */
  readonly primaryDeviceConnectionString?: string;
  /** Secondary connection string of the ioTHub device. */
  readonly secondaryDeviceConnectionString?: string;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface TillageDataListResponseOutput {
  /** List of requested objects. */
  value: Array<TillageDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of tillage data resource. */
export interface TillageDataOutput {
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
  readonly attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Party ID which belongs to the operation data. */
  readonly partyId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface WeatherDataListResponseOutput {
  /** List of requested objects. */
  value: Array<WeatherDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Schema of weather data. */
export interface WeatherDataOutput {
  /** Party ID. */
  partyId: string;
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
  readonly eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 250 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of weather data delete job. */
export interface WeatherDataDeleteJobOutput {
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
  startDateTime?: string;
  /** Weather data end UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: string;
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface WeatherDataIngestionJobOutput {
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
  /** Unique job id. */
  readonly id?: string;
  /**
   * Status of the job.
   * Possible values: 'Waiting', 'Running', 'Succeeded', 'Failed', 'Cancelled'.
   */
  readonly status?: string;
  /** Duration of the job in seconds. */
  readonly durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  readonly message?: string;
  /** Error Code when job failed. */
  readonly errorCode?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly lastActionDateTime?: string;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly startTime?: string;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly endTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string,
   * numeral and datetime (yyyy-MM-ddTHH:mm:ssZ) values are supported.
   */
  properties?: Record<string, any>;
}

/** Schema of Location data. */
export interface WeatherLocationOutput {
  /** Location Type eg. LatLong/IataCode/IcaoCode/Placeid/PostalKey. */
  type: "LatLong" | "IataCode" | "IcaoCode" | "PlaceId" | "PostalKey";
  /** Location Value eg. "10,-25" for LocationType Type "LatLong". */
  value: string;
}

/** Schema of additional parameters for weather data provider request. */
export interface AdditionalProviderParametersOutput {
  /** Icon Resolution (Only applicable for AzureWeatherMaps). */
  iconResolution?: string;
  /** Details (Only applicable for AzureWeatherMaps). */
  details?: boolean;
}

/** Schema of Weather Data Provider Response. */
export interface WeatherDataProviderResponseOutput {
  /** Schema of Weather Metadata. */
  weatherMetadata: WeatherMetadataOutput;
  /** Indicates a Succeeded, Failed, or PartiallySucceeded response. */
  status?: "Succeeded" | "Failed" | "PartiallySucceeded";
  /** List of weather data for all the weather locations. */
  locations?: Array<WeatherLocationDataOutput>;
  /** Model for errors encountered for all failed locations. */
  errors?: WeatherDataErrorsOutput;
}

/** Schema of Weather Metadata. */
export interface WeatherMetadataOutput {
  /** Version of the weather data extension. */
  extensionVersion: string;
  /** Type of weather data (forecast/historical). */
  weatherDataType: string;
  /** Id of the extension to be used for the providerInput. eg. DTN.ClearAg. */
  extensionId: string;
  /** Extension api name to which request is to be made. */
  extensionApiName: string;
  /** Language (IETF BCP 47 language tag) in which search results should be returned by the data provider. Examples: 'en-US', 'es', 'es-MX', 'fr-FR'. */
  language?: string;
  /** Start of time range. Hour 0 represents the current hour. (Only applicable for DTN.ClearAg extension.) */
  startTimeHours?: number;
  /** End of time range. (Only applicable for DTN.ClearAg extension.) */
  endTimeHours?: number;
  /** Specifies for how many days the daily forecast responses are returned. Available values are 1, 5, 10, 25 and 45. (Only applicable for Azure Weather Maps extension.) */
  duration?: number;
  /** Units for which request to data provider is to be sent. Supported values are 'e' for English units, 'm' for Metric units, 'h' for Hybrid units (UK) and 's' for Metric SI units. */
  units: string;
  /** Schema of additional parameters for weather data provider request. */
  additionalParams?: AdditionalProviderParametersOutput;
}

/** Schema of WeatherLocationData data. */
export interface WeatherLocationDataOutput {
  /** Schema of Location data. */
  location?: WeatherLocationOutput;
  /** Request Completion Time in Utc of the location. */
  requestCompletionTime?: string;
  /** Date-time when resource was last requested, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastRefreshedDateTime?: string;
  /** Schema of weather data. */
  data?: WeatherDataForPassthroughOutput;
}

/** Schema of weather data. */
export interface WeatherDataForPassthroughOutput {
  /** Schema for storing measurement readings and unit. */
  wetBulbTemperature?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  cloudCover?: MeasuresOutput;
  /** Day of week. */
  dayOfWeek?: Array<string>;
  /** This data field indicates whether it is daytime or nighttime based on the Local Apparent Time of the location. */
  dayOrNight?: Array<string>;
  /** Expiration time in Utc format. */
  expirationTime?: Array<string>;
  /** This number is the key to the weather icon lookup. The data field shows the icon number that is matched to represent the observed weather conditions. */
  iconCode?: Array<string>;
  /** Code representing full set sensible weather. */
  iconCodeExtend?: Array<string>;
  /** Indicates whether there is precipitation or not. */
  hasPrecipitation?: Array<boolean>;
  /** Schema for storing measurement readings and unit. */
  pressureMeanSeaLevel?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  relativeHumidity?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  temperature?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  temperatureDewPoint?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  temperatureFeelsLike?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  temperatureHeatIndex?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  temperatureWindChill?: MeasuresOutput;
  /** The UV Index Description which complements the UV Index value by providing an associated level of risk of skin damage due to exposure (-2 = Not Available, -1 = No Report, 0 to 2 = Low, 3 to 5 = Moderate, 6 to 7 = High, 8 to 10 = Very High, 11 to 16 = Extreme). */
  uvDescription?: Array<string>;
  /** Hourly maximum UV index. */
  uvIndex?: Array<string>;
  /** Time forecast is valid in local apparent time. */
  validTimeLocal?: Array<string>;
  /** Time forecast is valid in Utc format. */
  validTime?: Array<string>;
  /** Schema for storing measurement readings and unit. */
  visibility?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  windDirection?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  windGust?: MeasuresOutput;
  /** Schema for storing measurement readings and unit. */
  windSpeed?: MeasuresOutput;
  /** Hourly sensible weather phrase containing longer description. */
  wxPhraseLong?: Array<string>;
  /** Hourly sensible weather phrase containing short description. */
  wxPhraseShort?: Array<string>;
  /** A collection of key value pairs that belongs to the resource. Each pair must not have a key greater than 50 characters and must not have a value greater than 250 characters. Note: A maximum of 100 key value pairs can be provided for a resource and only string and numeral values are supported. */
  additionalAttributes?: Record<string, any>;
}

/** Schema for storing measurement readings and unit. */
export interface MeasuresOutput {
  /** Data unit. */
  unit?: string;
  /** Data values. */
  values?: Array<number>;
}

/** Model for errors encountered for all failed locations. */
export interface WeatherDataErrorsOutput {
  /** List of errors encountered for all failed locations. */
  locations?: Array<ErrorForLocationOutput>;
}

/** Model for error information for a failed location. */
export interface ErrorForLocationOutput {
  /** Schema of Location data. */
  location?: WeatherLocationOutput;
  /** Status code returned by data provider. */
  code?: number;
  /** Description of the error. */
  description?: string;
  /** Flag suggesting if retry attempt with same request body should be made to fetch required data. */
  retryable?: boolean;
}

/** Paged response contains list of requested objects and a URL link to get the next set of results. */
export interface ZoneListResponseOutput {
  /** List of requested objects. */
  value: Array<ZoneOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

/** Api Model for Zone object. */
export interface ZoneOutput {
  /** Party Id associated with the Zone. */
  readonly partyId?: string;
  /** Type of the Zone. */
  type?: string;
  /** Management Zone Id associated with the Zone. */
  managementZoneId?: string;
  /** Unique resource ID. */
  readonly id?: string;
  /** The ETag value to implement optimistic concurrency. */
  readonly eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly createdDateTime?: string;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  readonly modifiedDateTime?: string;
  /** Source of the resource. */
  source?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /** Created by user/tenant id. */
  readonly createdBy?: string;
  /** Modified by user/tenant id. */
  readonly modifiedBy?: string;
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
export interface MultiPolygonOutput extends GeoJsonObjectOutputParent {
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
export interface PointOutput extends GeoJsonObjectOutputParent {
  /**
   * Gets or sets the coordinate of this point.
   * It must be an array of 2 or 3 elements for a 2D or 3D system.
   */
  coordinates: Array<number>;
  type: "Point";
}

/** Polygon geometry. */
export interface PolygonOutput extends GeoJsonObjectOutputParent {
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
export type GeoJsonObjectOutput =
  | MultiPolygonOutput
  | PointOutput
  | PolygonOutput;
