// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ApplicationDataListResponse {
  /** List of requested objects. */
  value?: ApplicationData[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface ApplicationData {
  /** Application product details. */
  applicationProductDetails?: ApplicationProductDetail[];
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Source of the operation data. */
  source?: string;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date;
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Optional boundary ID of the actual area for which operation was applied inside the specified field. */
  operationBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: ApplicationDataPropertiesDictionary;
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

export interface ErrorResponse {
  /** An error from the Azure AgPlatform service. */
  error?: Error;
  /** Unique trace ID. */
  traceId?: string;
}

export interface Error {
  /** Server-defined set of error codes. */
  code?: string;
  /** Human-readable representation of the error. */
  message?: string;
  /** Target of the error. */
  target?: string;
  /** Array of details about specific errors that led to this reported error. */
  details?: Error[];
  /**
   * Inner error containing list of errors.
   * <see href="https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#innererror--object">InnerError reference document</see>.
   */
  innererror?: InnerError;
}

export type InnerError = InnerErrorBase & InnerErrorDictionary;

export interface InnerErrorBase {
  /**
   * Specific error code than was provided by the
   * containing error.
   */
  code?: string;
  /**
   * Inner error containing list of errors.
   * <see href="https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#innererror--object">InnerError reference document</see>.
   */
  innererror?: InnerError;
}

export interface AttachmentListResponse {
  /** List of requested objects. */
  value?: Attachment[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Attachment {
  /** Farmer id for this attachment. */
  farmerId?: string;
  /** Associated Resource id for this attachment. */
  resourceId?: string;
  /**
   * Associated Resource type for this attachment
   * i.e. Farmer, Farm, Field, SeasonalField, Boundary, FarmOperationApplicationData, HarvestData, TillageData, PlantingData.
   */
  resourceType?: string;
  /** Original File Name for this attachment. */
  originalFileName?: string;
  /** Unique id. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  createdDateTime?: Date;
  /** Date when resource was last modified. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
}

export interface BoundaryListResponse {
  /** List of requested objects. */
  value?: Boundary[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Boundary {
  /** Farmer ID. */
  farmerId?: string;
  /** ID of the parent(field or seasonalField) it belongs to. */
  parentId?: string;
  /** GeoJSON abstract class. */
  geometry?: GeoJsonObject;
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Boundary area in acres. */
  acreage?: number;
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: BoundaryPropertiesDictionary;
}

export interface GeoJsonObject {
  /** GeoJSON object type. */
  type: GeoJsonObjectType;
}

export interface SearchBoundaryQuery {
  /** Ids of the resource. */
  ids?: string[];
  /** Names of the resource. */
  names?: string[];
  /**
   * Filters on key-value pairs within the Properties object.
   * eg. "{testKey} eq {testValue}".
   */
  propertyFilters?: string[];
  /** Statuses of the resource. */
  statuses?: string[];
  /** Minimum creation date of resource (inclusive). */
  minCreatedDateTime?: Date;
  /** Maximum creation date of resource (inclusive). */
  maxCreatedDateTime?: Date;
  /** Minimum last modified date of resource (inclusive). */
  minLastModifiedDateTime?: Date;
  /** Maximum last modified date of resource (inclusive). */
  maxLastModifiedDateTime?: Date;
  /**
   * Maximum number of items needed (inclusive).
   * Minimum = 10, Maximum = 1000, Default value = 50.
   */
  maxPageSize?: number;
  /** Skip token for getting next set of results. */
  skipToken?: string;
  /** Is the boundary primary. */
  isPrimary?: boolean;
  /** Type of the parent it belongs to. */
  parentType?: string;
  /** Parent Ids of the resource. */
  parentIds?: string[];
  /** Minimum acreage of the boundary (inclusive). */
  minAcreage?: number;
  /** Maximum acreage of the boundary (inclusive). */
  maxAcreage?: number;
  /** GeoJSON abstract class. */
  intersectsWithGeometry?: GeoJsonObject;
}

export interface CascadeDeleteJob {
  /** Farmer ID. */
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
  status?: string;
  /** Duration of the job in seconds. */
  durationInSeconds?: number;
  /** Status message to capture more details of the job. */
  message?: string;
  /** Job created at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: CascadeDeleteJobPropertiesDictionary;
}

export interface BoundaryOverlapResponse {
  /** Acreage of Main boundary. */
  boundaryAcreage?: number;
  /** Acreage of other boundary. */
  otherBoundaryAcreage?: number;
  /** Acreage of intersecting boundary. */
  intersectingAcreage?: number;
}

export interface CropListResponse {
  /** List of requested objects. */
  value?: Crop[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Crop {
  /** Crop phenotype. */
  phenotype?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: CropPropertiesDictionary;
}

export interface CropVarietyListResponse {
  /** List of requested objects. */
  value?: CropVariety[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface CropVariety {
  /** ID of the crop it belongs to. */
  cropId?: string;
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
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: CropVarietyPropertiesDictionary;
}

export interface FarmerListResponse {
  /** List of requested objects. */
  value?: Farmer[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Farmer {
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: FarmerPropertiesDictionary;
}

export interface FarmOperationDataIngestionJob {
  /** Farmer ID. */
  farmerId: string;
  /** Authentication provider ID. */
  authProviderId: string;
  /** List of operation types for which data needs to be downloaded. Available values: AllOperations, Application, Planting, Harvest, Tillage. */
  operations?: string[];
  /** Start Year (Minimum = 2000, Maximum = CurrentYear). */
  startYear: number;
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
  createdDateTime?: Date;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: FarmOperationDataIngestionJobPropertiesDictionary;
}

export interface FarmListResponse {
  /** List of requested objects. */
  value?: Farm[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Farm {
  /** Farmer ID. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: FarmPropertiesDictionary;
}

export interface FieldListResponse {
  /** List of requested objects. */
  value?: Field[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Field {
  /** ID of the associated Farm. */
  farmId?: string;
  /** Farmer ID. */
  farmerId?: string;
  /** Primary boundary id. */
  primaryBoundaryId?: string;
  /** Boundary Ids. */
  boundaryIds?: string[];
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: FieldPropertiesDictionary;
}

export interface HarvestDataListResponse {
  /** List of requested objects. */
  value?: HarvestData[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
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
  /** Harvest product details. */
  harvestProductDetails?: HarvestProductDetail[];
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Source of the operation data. */
  source?: string;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date;
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Optional boundary ID of the actual area for which operation was applied inside the specified field. */
  operationBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: HarvestDataPropertiesDictionary;
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

export interface ImageProcessingRasterizeJob {
  /** Farmer ID. */
  farmerId: string;
  /** Shapefile attachment ID. */
  shapefileAttachmentId: string;
  /** List of shapefile column names to create raster attachments. */
  shapefileColumnNames: string[];
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
  createdDateTime?: Date;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: ImageProcessingRasterizeJobPropertiesDictionary;
}

export interface OAuthProviderListResponse {
  /** List of requested objects. */
  value?: OAuthProvider[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface OAuthProvider {
  /** OAuth App ID for given OAuth Provider. */
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
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: OAuthProviderPropertiesDictionary;
}

export interface OAuthTokenListResponse {
  /** List of requested objects. */
  value?: OAuthToken[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface OAuthToken {
  /** Farmer ID for this OAuth config. */
  farmerId: string;
  /** ID of the OAuth provider resource containing app information. */
  authProviderId: string;
  /** An optional flag indicating whether the token is a valid or expired (Default value: true). */
  isValid?: boolean;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
}

export interface OAuthConnectRequest {
  /** ID of the farmer. */
  farmerId: string;
  /** ID of the OAuthProvider. */
  oAuthProviderId: string;
  /** Link to redirect the user to, at the end of the oauth flow. */
  userRedirectLink: string;
  /** State to provide back when redirecting the user, at the end of the oauth flow. */
  userRedirectState?: string;
}

export interface PlantingDataListResponse {
  /** List of requested objects. */
  value?: PlantingData[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface PlantingData {
  /** Schema for storing measurement reading and unit. */
  avgPlantingRate?: Measure;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: Measure;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: Measure;
  /** Planting product details. */
  plantingProductDetails?: PlantingProductDetail[];
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Source of the operation data. */
  source?: string;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date;
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Optional boundary ID of the actual area for which operation was applied inside the specified field. */
  operationBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: PlantingDataPropertiesDictionary;
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

export interface SceneListResponse {
  /** List of requested objects. */
  value?: Scene[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Scene {
  /** Date-time of the scene, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  sceneDateTime?: Date;
  /** Data provider of the scene. */
  provider?: string;
  /** Data source of the scene. */
  source?: string;
  /** Collection of image files. */
  imageFiles?: ImageFile[];
  /** Supported image formats for scene resource. */
  imageFormat?: ImageFormat;
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

export interface ImageFile {
  /** Link of the image file. */
  fileLink?: string;
  /** Name of the image file. */
  name: string;
  /** Supported image formats for scene resource. */
  imageFormat?: ImageFormat;
  /** Resolution of image file in meters. */
  resolution?: number;
}

export interface SatelliteDataIngestionJob {
  /** Farmer ID. */
  farmerId: string;
  /** The id of the boundary object for which satellite data is being fetched. */
  boundaryId: string;
  /** Start Date. */
  startDateTime: Date;
  /** End Date. */
  endDateTime: Date;
  /** Provider of satellite data. */
  provider?: DataProvider;
  /** Source of satellite data. */
  source?: Source;
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
  createdDateTime?: Date;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: SatelliteDataIngestionJobPropertiesDictionary;
}

export interface SatelliteData {
  /** List of ImageNames. */
  imageNames?: string[];
  /** List of ImageFormats. Available value: TIF. */
  imageFormats?: string[];
  /** List of ImageResolutions in meters. Available values: 10, 20, 60. */
  imageResolutions?: number[];
}

export interface SeasonalFieldListResponse {
  /** List of requested objects. */
  value?: SeasonalField[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface SeasonalField {
  /** Farmer ID. */
  farmerId?: string;
  /** Primary boundary id. */
  primaryBoundaryId?: string;
  /** Boundary Ids. */
  boundaryIds?: string[];
  /** ID of the associated Farm. */
  farmId?: string;
  /** ID of the associated Field. */
  fieldId?: string;
  /** ID of the season it belongs to. */
  seasonId?: string;
  /** CropVariety ids. */
  cropVarietyIds?: string[];
  /** ID of the crop it belongs to. */
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
  plantingDateTime?: Date;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: SeasonalFieldPropertiesDictionary;
}

export interface SeasonListResponse {
  /** List of requested objects. */
  value?: Season[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Season {
  /** Season start datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startDateTime?: Date;
  /** Season end datetime, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: Date;
  /** Season year. */
  year?: number;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: SeasonPropertiesDictionary;
}

export interface TillageDataListResponse {
  /** List of requested objects. */
  value?: TillageData[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface TillageData {
  /** Schema for storing measurement reading and unit. */
  tillageDepth?: Measure;
  /** Schema for storing measurement reading and unit. */
  tillagePressure?: Measure;
  /** Schema for storing measurement reading and unit. */
  area?: Measure;
  /** Source of the operation data. */
  source?: string;
  /**
   * Modified date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ.
   * Note: this will be specified by the source provider itself.
   */
  operationModifiedDateTime?: Date;
  /** Start date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationStartDateTime?: Date;
  /** End date-time of the operation data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  operationEndDateTime?: Date;
  /** Link for attachments. */
  attachmentsLink?: string;
  /** Optional boundary ID of the field for which operation was applied. */
  associatedBoundaryId?: string;
  /** Optional boundary ID of the actual area for which operation was applied inside the specified field. */
  operationBoundaryId?: string;
  /** Farmer ID which belongs to the operation data. */
  farmerId?: string;
  /** Unique resource ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Status of the resource. */
  status?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: TillageDataPropertiesDictionary;
}

export interface WeatherDataListResponse {
  /** List of requested objects. */
  value?: WeatherData[];
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface WeatherData {
  /** Farmer ID. */
  farmerId: string;
  /** Boundary ID. */
  boundaryId: string;
  /** ID of the weather extension. */
  extensionId: string;
  /** Location model class. */
  location: Location;
  /** Date-time of the weather data, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  dateTime: Date;
  /** Unit System like US/SI etc. */
  unitSystemCode?: string;
  /** Version of the weather data extension. */
  extensionVersion: string;
  /** Type of weather data (forecast/historical). */
  weatherDataType: string;
  /** Granularity of weather data (daily/hourly). */
  granularity: string;
  /** Schema for storing measurement reading and unit. */
  cloudCover?: Measure;
  /** Schema for storing measurement reading and unit. */
  dewPoint?: Measure;
  /** Schema for storing measurement reading and unit. */
  growingDegreeDay?: Measure;
  /** Schema for storing measurement reading and unit. */
  precipitation?: Measure;
  /** Schema for storing measurement reading and unit. */
  pressure?: Measure;
  /** Schema for storing measurement reading and unit. */
  relativeHumidity?: Measure;
  /** Schema for storing measurement reading and unit. */
  soilMoisture?: Measure;
  /** Schema for storing measurement reading and unit. */
  soilTemperature?: Measure;
  /** Schema for storing measurement reading and unit. */
  temperature?: Measure;
  /** Schema for storing measurement reading and unit. */
  visibility?: Measure;
  /** Schema for storing measurement reading and unit. */
  wetBulbTemperature?: Measure;
  /** Schema for storing measurement reading and unit. */
  windChill?: Measure;
  /** Schema for storing measurement reading and unit. */
  windDirection?: Measure;
  /** Schema for storing measurement reading and unit. */
  windGust?: Measure;
  /** Schema for storing measurement reading and unit. */
  windSpeed?: Measure;
  /** Weather data ID. */
  id?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
  /** Date-time when resource was created, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  createdDateTime?: Date;
  /** Date-time when resource was last modified, sample format: yyyy-MM-ddTHH:mm:ssZ. */
  modifiedDateTime?: Date;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: WeatherDataPropertiesDictionary;
}

export interface Location {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
}

export interface WeatherDataIngestionJob {
  /** The id of the boundary object for which weather data is being fetched. */
  boundaryId: string;
  /** The id of the farmer object for which weather data is being fetched. */
  farmerId: string;
  /** ID of the extension to be used for the providerInput. eg. DTN.ClearAg. */
  extensionId: string;
  /** Extension api name to which request is to be made. */
  extensionApiName: string;
  /** Extension api input dictionary which would be used to feed request query/body/parameter information. */
  extensionApiInput: WeatherDataIngestionJobExtensionApiInputDictionary;
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
  createdDateTime?: Date;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: WeatherDataIngestionJobPropertiesDictionary;
}

export interface WeatherDataDeleteJob {
  /** ID of the extension to be used for the providerInput. eg. DTN.ClearAg. */
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
  startDateTime?: Date;
  /** Weather data end UTC date-time (inclusive), sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endDateTime?: Date;
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
  createdDateTime?: Date;
  /** Job was last acted upon at dateTime. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  lastActionDateTime?: Date;
  /** Job start time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  startTime?: Date;
  /** Job end time when available. Sample format: yyyy-MM-ddTHH:mm:ssZ. */
  endTime?: Date;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of the resource. */
  description?: string;
  /**
   * A collection of key value pairs that belongs to the resource.
   * Each pair must not have a key greater than 50 characters
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: WeatherDataDeleteJobPropertiesDictionary;
}

export type MultiPolygon = MultiPolygonBase & GeoJsonObject & MultiPolygonCoordinates;

export interface MultiPolygonBase {}

export interface MultiPolygonCoordinates {
  /**
   * Gets or sets Coordinates of GeoJSON Object.
   * It must be an array of polygons, each polygon contains list of linear rings.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: number[][][][];
}

export type Point = PointBase & GeoJsonObject & PointCoordinates;

export interface PointBase {}

export interface PointCoordinates {
  /**
   * Gets or sets the coordinate of this point.
   * It must be an array of 2 or 3 elements for a 2D or 3D system.
   */
  coordinates: number[];
}

export type Polygon = PolygonBase & GeoJsonObject & PolygonCoordinates;

export interface PolygonBase {}

export interface PolygonCoordinates {
  /**
   * Gets or sets type of the GeoJSON Object.
   * It must be an array of linear ring coordinate arrays.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: number[][][];
}

export interface Paths1LxjoxzFarmersFarmeridAttachmentsAttachmentidPatchRequestbodyContentMultipartFormDataSchema {
  /** File to be uploaded. */
  file?: string;
  /** Farmer id for this attachment. */
  farmerId?: string;
  /** Associated Resource id for this attachment. */
  resourceId?: string;
  /**
   * Associated Resource type for this attachment
   * i.e. Farmer, Farm, Field, SeasonalField, Boundary, FarmOperationApplicationData, HarvestData, TillageData, PlantingData.
   */
  resourceType?: string;
  /** Original File Name for this attachment. */
  originalFileName?: string;
  /** Unique id. */
  id?: string;
  /** Status of the resource. */
  status?: string;
  /** Date when resource was created. */
  createdDateTime?: string;
  /** Date when resource was last modified. */
  modifiedDateTime?: string;
  /** Name to identify resource. */
  name?: string;
  /** Textual description of resource. */
  description?: string;
  /** The ETag value to implement optimistic concurrency. */
  eTag?: string;
}

export type GeoJsonObjectType = "Point" | "Polygon" | "MultiPolygon";
export type ImageFormat = "TIF";
export type DataProvider = "Microsoft";
export type Source = "Sentinel_2_L2A";
export type ApplicationDataPropertiesDictionary = Record<string, any>;
export type InnerErrorDictionary = Record<string, any>;
export type BoundaryPropertiesDictionary = Record<string, any>;
export type CascadeDeleteJobPropertiesDictionary = Record<string, any>;
export type CropPropertiesDictionary = Record<string, any>;
export type CropVarietyPropertiesDictionary = Record<string, any>;
export type FarmerPropertiesDictionary = Record<string, any>;
export type FarmOperationDataIngestionJobPropertiesDictionary = Record<string, any>;
export type FarmPropertiesDictionary = Record<string, any>;
export type FieldPropertiesDictionary = Record<string, any>;
export type HarvestDataPropertiesDictionary = Record<string, any>;
export type ImageProcessingRasterizeJobPropertiesDictionary = Record<string, any>;
export type OAuthProviderPropertiesDictionary = Record<string, any>;
export type PlantingDataPropertiesDictionary = Record<string, any>;
export type SatelliteDataIngestionJobPropertiesDictionary = Record<string, any>;
export type SeasonalFieldPropertiesDictionary = Record<string, any>;
export type SeasonPropertiesDictionary = Record<string, any>;
export type TillageDataPropertiesDictionary = Record<string, any>;
export type WeatherDataPropertiesDictionary = Record<string, any>;
export type WeatherDataIngestionJobExtensionApiInputDictionary = Record<string, any>;
export type WeatherDataIngestionJobPropertiesDictionary = Record<string, any>;
export type WeatherDataDeleteJobPropertiesDictionary = Record<string, any>;
