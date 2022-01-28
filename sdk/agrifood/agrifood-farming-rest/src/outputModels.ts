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

export interface ApplicationDataOutput {
  /** Application product details. */
  applicationProductDetails?: Array<ApplicationProductDetailOutput>;
  /** Schema for storing measurement reading and unit. */
  avgMaterial?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  totalMaterial?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /** Source of the operation data. */
  source?: string;
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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
  /** Unique trace ID. */
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

export interface AttachmentListResponseOutput {
  /** List of requested objects. */
  value?: Array<AttachmentOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface AttachmentOutput {
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

export interface BoundaryListResponseOutput {
  /** List of requested objects. */
  value?: Array<BoundaryOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface BoundaryOutput {
  /** Farmer ID. */
  farmerId?: string;
  /** ID of the parent(field or seasonalField) it belongs to. */
  parentId?: string;
  /** GeoJSON abstract class. */
  geometry?: GeoJsonObjectOutput;
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
}

export interface GeoJsonObjectOutputBase {
  type: "MultiPolygon" | "Point" | "Polygon";
}

export interface CascadeDeleteJobOutput {
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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

export interface CropOutput {
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

export interface CropVarietyOutput {
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
}

export interface FarmerListResponseOutput {
  /** List of requested objects. */
  value?: Array<FarmerOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface FarmerOutput {
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
  properties?: Record<string, any>;
}

export interface FarmOperationDataIngestionJobOutput {
  /** Farmer ID. */
  farmerId: string;
  /** Authentication provider ID. */
  authProviderId: string;
  /** List of operation types for which data needs to be downloaded. Available values: AllOperations, Application, Planting, Harvest, Tillage. */
  operations?: Array<string>;
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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

export interface FarmOutput {
  /** Farmer ID. */
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

export interface FieldOutput {
  /** ID of the associated Farm. */
  farmId?: string;
  /** Farmer ID. */
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
  /** Source of the operation data. */
  source?: string;
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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

export interface ImageProcessingRasterizeJobOutput {
  /** Farmer ID. */
  farmerId: string;
  /** Shapefile attachment ID. */
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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
  /** Source of the operation data. */
  source?: string;
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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
  /** Supported image formats for scene resource. */
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
  /** Supported image formats for scene resource. */
  imageFormat?: "TIF";
  /** Resolution of image file in meters. */
  resolution?: number;
}

export interface SatelliteDataIngestionJobOutput {
  /** Farmer ID. */
  farmerId: string;
  /** The id of the boundary object for which satellite data is being fetched. */
  boundaryId: string;
  /** Start Date. */
  startDateTime: string;
  /** End Date. */
  endDateTime: string;
  /** Provider of satellite data. */
  provider?: "Microsoft";
  /** Source of satellite data. */
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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

export interface SeasonalFieldOutput {
  /** Farmer ID. */
  farmerId?: string;
  /** Primary boundary id. */
  primaryBoundaryId?: string;
  /** Boundary Ids. */
  boundaryIds?: Array<string>;
  /** ID of the associated Farm. */
  farmId?: string;
  /** ID of the associated Field. */
  fieldId?: string;
  /** ID of the season it belongs to. */
  seasonId?: string;
  /** CropVariety ids. */
  cropVarietyIds?: Array<string>;
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

export interface SeasonOutput {
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
  properties?: Record<string, any>;
}

export interface TillageDataListResponseOutput {
  /** List of requested objects. */
  value?: Array<TillageDataOutput>;
  /** Token used in retrieving the next page. If null, there are no additional pages. */
  $skipToken?: string;
  /** Continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface TillageDataOutput {
  /** Schema for storing measurement reading and unit. */
  tillageDepth?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  tillagePressure?: MeasureOutput;
  /** Schema for storing measurement reading and unit. */
  area?: MeasureOutput;
  /** Source of the operation data. */
  source?: string;
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
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
   * and must not have a value greater than 150 characters.
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
}

export interface LocationOutput {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
}

export interface WeatherDataIngestionJobOutput {
  /** The id of the boundary object for which weather data is being fetched. */
  boundaryId: string;
  /** The id of the farmer object for which weather data is being fetched. */
  farmerId: string;
  /** ID of the extension to be used for the providerInput. eg. DTN.ClearAg. */
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
}

export interface WeatherDataDeleteJobOutput {
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
   * Note: A maximum of 25 key value pairs can be provided for a resource and only string and numeral values are supported.
   */
  properties?: Record<string, any>;
}

export interface MultiPolygonOutput extends GeoJsonObjectOutputBase, MultiPolygonCoordinatesOutput {
  type: "MultiPolygon";
}

export interface MultiPolygonCoordinatesOutput {
  /**
   * Gets or sets Coordinates of GeoJSON Object.
   * It must be an array of polygons, each polygon contains list of linear rings.
   * For Polygons with more than one of these rings, the first MUST be the exterior ring,
   * and any others MUST be interior rings.
   */
  coordinates: Array<Array<Array<Array<number>>>>;
}

export interface PointOutput extends GeoJsonObjectOutputBase, PointCoordinatesOutput {
  type: "Point";
}

export interface PointCoordinatesOutput {
  /**
   * Gets or sets the coordinate of this point.
   * It must be an array of 2 or 3 elements for a 2D or 3D system.
   */
  coordinates: Array<number>;
}

export interface PolygonOutput extends GeoJsonObjectOutputBase, PolygonCoordinatesOutput {
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

export type GeoJsonObjectOutput = MultiPolygonOutput | PointOutput | PolygonOutput;
