// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** Generic paged response model */
export interface PageOperationOutput {
  /** The items on the page */
  value: Array<OperationOutput>;
  /** Link to the next page of results */
  nextLink?: string;
}

/** Microsoft Planetary Computer Pro geo-catalog operation */
export interface OperationOutput {
  /** Operation id */
  id: string;
  /**
   * Operation status
   *
   * Possible values: "Pending", "Running", "Succeeded", "Canceled", "Canceling", "Failed"
   */
  status: OperationStatusOutput;
  /** Operation type */
  type: string;
  /** The UTC time at which the operation was created */
  creationTime: string;
  /** Collection ID */
  collectionId?: string;
  /** The history of the operation status in time */
  statusHistory: Array<OperationStatusHistoryItemOutput>;
  /** The UTC time at which the operation was started */
  startTime?: string;
  /** The UTC time at which the operation finished its execution */
  finishTime?: string;
  /** Additional information elements about the particular operation type */
  additionalInformation?: Record<string, string>;
  /** Error information */
  error?: ErrorModel;
}

/** Operation status history item */
export interface OperationStatusHistoryItemOutput {
  /** The UTC time at which the status was set */
  timestamp: string;
  /**
   * The status of the operation
   *
   * Possible values: "Pending", "Running", "Succeeded", "Canceled", "Canceling", "Failed"
   */
  status: OperationStatusOutput;
  /** If the status is failed, the error code */
  errorCode?: string;
  /** If the status is failed, the error message */
  errorMessage?: string;
}

/** Generic paged response model */
export interface PageIngestionRunOutput {
  /** The items on the page */
  value: Array<IngestionRunOutput>;
  /** Link to the next page of results */
  nextLink?: string;
}

/** Microsoft Planetary Computer Pro geo-catalog ingestion run */
export interface IngestionRunOutput {
  /** Run id */
  id: string;
  /** Run id which this run is associated to because it has been retried or rerun */
  parentRunId?: string;
  /** Operation */
  operation: IngestionRunOperationOutput;
  /** Creation time */
  creationTime: string;
  /** URL of the source catalog */
  sourceCatalogUrl?: string;
  /** Skip any item that already exist in the GeoCatalog */
  skipExistingItems?: boolean;
  /** Keep original source assets */
  keepOriginalAssets?: boolean;
}

/** Microsoft Planetary Computer Pro geo-catalog ingestion run operation */
export interface IngestionRunOperationOutput {
  /** Operation id */
  id: string;
  /**
   * Operation status
   *
   * Possible values: "Pending", "Running", "Succeeded", "Canceled", "Canceling", "Failed"
   */
  status: OperationStatusOutput;
  /** The UTC time at which the operation was created */
  creationTime: string;
  /** The history of the operation status in time */
  statusHistory: Array<OperationStatusHistoryItemOutput>;
  /** The UTC time at which the operation was started */
  startTime?: string;
  /** The UTC time at which the operation finished its execution */
  finishTime?: string;
  /** The number of total items to be processed */
  totalItems: number;
  /** The number of items pending to be processed */
  totalPendingItems: number;
  /** The number of items successfully processed */
  totalSuccessfulItems: number;
  /** The number of items that have failed to be processed */
  totalFailedItems: number;
}

/** Generic paged response model */
export interface PageIngestionOutput {
  /** The items on the page */
  value: Array<IngestionOutput>;
  /** Link to the next page of results */
  nextLink?: string;
}

/** Microsoft Planetary Computer Pro geo-catalog ingestion creation model */
export interface IngestionOutput {
  /** Ingestion id */
  readonly id: string;
  /**
   * Ingestion type
   *
   * Possible values: "StaticCatalog"
   */
  importType: IngestionTypeOutput;
  /** Ingestion name */
  displayName?: string;
  /** Source catalog URL. Required for StaticCatalog ingestion type */
  sourceCatalogUrl?: string;
  /** Skip processing existing items in the catalog */
  skipExistingItems?: boolean;
  /** Keep original source assets */
  keepOriginalAssets?: boolean;
  /** Ingestion creation time */
  readonly creationTime: string;
  /**
   * Ingestion status
   *
   * Possible values: "Ready", "Deleting"
   */
  readonly status: IngestionStatusOutput;
}

/** Generic paged response model */
export interface PageIngestionSourceSummaryOutput {
  /** The items on the page */
  value: Array<IngestionSourceSummaryOutput>;
  /** Link to the next page of results */
  nextLink?: string;
}

/** Ingestion source summary */
export interface IngestionSourceSummaryOutput {
  /** Ingestion source id */
  id: string;
  /**
   * Ingestion source type
   *
   * Possible values: "SasToken", "BlobManagedIdentity"
   */
  kind: IngestionSourceTypeOutput;
  /** Created time in UTC format */
  created: string;
}

/** Ingestion Source */
export interface IngestionSourceOutputParent {
  /** Ingestion source id */
  id: string;
  /** Created time in UTC format */
  readonly created: string;
  kind: IngestionSourceTypeOutput;
}

/** SAS Token ingestion source */
export interface SharedAccessSignatureTokenIngestionSourceOutput
  extends IngestionSourceOutputParent {
  kind: "SasToken";
  /** SAS token connection information */
  connectionInfo: SharedAccessSignatureTokenConnectionOutput;
}

/** SAS Token connection information */
export interface SharedAccessSignatureTokenConnectionOutput {
  /** Azure Blob Storage container URL */
  containerUrl: string;
  /** SAS token */
  sasToken?: string;
  /** Azure Blob Storage SAS token expiration in UTC format */
  readonly expiration?: string;
}

/** Managed Identity ingestion source */
export interface ManagedIdentityIngestionSourceOutput
  extends IngestionSourceOutputParent {
  kind: "BlobManagedIdentity";
  /** Managed identity connection information */
  connectionInfo: ManagedIdentityConnectionOutput;
}

/** Managed Identity connection information */
export interface ManagedIdentityConnectionOutput {
  /** Azure Blob Storage container URL */
  containerUrl: string;
  /** Azure Managed Identity configured in the Geo-Catalog with access to the container */
  objectId: string;
}

/** Generic paged response model */
export interface PageManagedIdentityMetadataOutput {
  /** The items on the page */
  value: Array<ManagedIdentityMetadataOutput>;
  /** Link to the next page of results */
  nextLink?: string;
}

/** Managed Identity metadata */
export interface ManagedIdentityMetadataOutput {
  /** Object id of the managed identity */
  objectId: string;
  /** ARM path or resource id of the managed identity */
  resourceId: string;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md
 *
 * Represents a STAC collection.
 */
export interface StacCollectionOutput {
  /** MSFT Created */
  "msft:_created"?: string;
  /** MSFT Updated */
  "msft:_updated"?: string;
  /** MSFT Short Description */
  "msft:short_description"?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stac_extensions?: string[];
  /** Unique identifier for the collection. */
  id: string;
  /** Detailed description of the collection. */
  description: string;
  /** Stac Version */
  stac_version?: string;
  /** Links to related resources and endpoints. */
  links: Array<StacLinkOutput>;
  /** Human-readable title for the collection. */
  title?: string;
  /** Type */
  type?: string;
  /** Assets */
  assets?: Record<string, StacAssetOutput>;
  /** License identifier for the collection data. */
  license: string;
  /** Spatial and temporal extent of the collection. */
  extent: StacExtensionExtentOutput;
  /** Keywords describing the collection. */
  keywords?: string[];
  /** Organizations or individuals who provide the collection data. */
  providers?: Array<StacProviderOutput>;
  /**
   * Summaries
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  summaries?: Record<string, any>;
}

/**
 * Link model.
 *
 * Ref:
 * http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/link.yaml
 *
 * Represents a link.
 */
export interface StacLinkOutput {
  /** The relationship type of the link. */
  rel?: string;
  /** The title of the link. */
  title?: string;
  /**
   * The MIME type of the linked resource.
   *
   * Possible values: "image/tiff; application=geotiff", "image/jp2", "image/png", "image/jpeg", "image/jpg", "image/webp", "application/x-binary", "application/xml", "application/json", "application/geo+json", "text/html", "text/plain", "application/x-protobuf"
   */
  type?: StacLinkTypeOutput;
  /** The URL of the link. */
  href: string;
  /** The language of the linked resource. */
  hreflang?: string;
  /** The length of the linked resource. */
  length?: number;
  /**
   * Specifies the HTTP method that the resource expects.
   * Default: GET.
   */
  method?: string;
  /**
   * Object key-value pairs that map to headers.
   * Example: { "Accept": "application/json" }.
   */
  headers?: Record<string, string>;
  /** For POST requests, the resource can specify the HTTP body as a JSON object. */
  body?: Record<string, any>;
  /**
   * Indicates whether the client is expected to merge the body value into the current request body before following the link.
   * This is only valid when the server is responding to a POST request.
   * Default: false.
   */
  merge?: boolean;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#asset-object
 *
 * Represents a STAC asset, which is a file or resource associated with a STAC item.
 */
export interface StacAssetOutput extends Record<string, any> {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: Array<StacProviderOutput>;
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: string;
  /** Last update timestamp of the data. */
  updated?: string;
  /** Human-readable title for the asset. */
  title?: string;
  /** Detailed description of the asset. */
  description?: string;
  /** URL to the asset file. */
  href: string;
  /** Media type of the asset. */
  type?: string;
  /** Roles of the asset within the item. */
  roles?: string[];
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#provider-object
 *
 * Represents information about a data provider for STAC collections and items.
 */
export interface StacProviderOutput {
  /** Name of the provider organization or individual. */
  name: string;
  /** Description of the provider. */
  description?: string;
  /** Roles played by the provider (e.g., producer, processor, host). */
  roles?: string[];
  /** URL to the provider's website. */
  url?: string;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#extent-object
 *
 * Represents the spatial and temporal extent of a STAC collection.
 */
export interface StacExtensionExtentOutput {
  /**
   * Spatial extent defined by bounding boxes.
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  spatial: StacExtensionSpatialExtentOutput;
  /**
   * Temporal extent defined by time intervals.
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  temporal: StacCollectionTemporalExtentOutput;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object
 *
 * Represents the spatial extent of a STAC collection with bounding boxes.
 */
export interface StacExtensionSpatialExtentOutput {
  /** Array of bounding boxes defining the spatial extent, in format [[west, south, east, north]]. */
  bbox?: number[][];
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#temporal-extent-object
 *
 * Represents the temporal extent of a STAC collection with time intervals.
 */
export interface StacCollectionTemporalExtentOutput {
  /** Array of time intervals in format [[start_datetime, end_datetime]]. */
  interval: string[][];
}

/** User-specific collection settings for visualization. */
export interface UserCollectionSettingsOutput {
  /** Settings for map tile visualization. */
  tileSettings: TileSettingsOutput;
  /** Settings for data mosaic visualization. */
  mosaicInfo: StacMosaicConfigurationOutput;
}

/** Configuration for map tile visualization. */
export interface TileSettingsOutput {
  /**
   * The minimum zoom level that can be requested for this collection. Provides a
   * hard limit for the tile servers to ensure they don't get requests for low zoom
   * levels, which would cause many files to be fetched and the tile servers to
   * hang.
   */
  minZoom: number;
  /** Maximum number of items to include in a single tile. */
  maxItemsPerTile: number;
  /** Default map location when displaying this collection. */
  defaultLocation?: DefaultLocationOutput;
}

/** Defines a default geographic location for map visualization. */
export interface DefaultLocationOutput {
  /** Default zoom level for the map. */
  zoom: number;
  /** Default center coordinates [latitude, longitude] for the map. */
  coordinates: number[];
}

/** Configuration for data mosaic visualization. */
export interface StacMosaicConfigurationOutput {
  /** Predefined data mosaics available for this collection. */
  mosaics: Array<StacMosaicOutput>;
  /** Available render options for visualizing the data. */
  renderOptions: Array<RenderOptionOutput>;
  /** Default map location when displaying this collection. */
  defaultLocation?: DefaultLocationOutput;
  /** A list of CQL-JSON expressions to use as the default for  this collection. */
  defaultCustomQuery?: Record<string, any>;
}

/** Defines a named mosaic with filtering criteria. */
export interface StacMosaicOutput {
  /** Unique identifier for the mosaic. */
  id: string;
  /** Short descriptive name for the mosaic. */
  name: string;
  /** Detailed description of the mosaic. */
  description?: string;
  /** A list of valid CQL2-JSON expressions used to filter the collection to moasic. */
  cql: Record<string, any>[];
}

/** Defines visualization parameters for rendering data on a map. */
export interface RenderOptionOutput {
  /** Unique identifier for the render option. */
  id: string;
  /** Short descriptive name for the render option. */
  name: string;
  /**
   * A longer description of the render option that can be used to explain its
   * content.
   */
  description?: string;
  /**
   * The type of rendering to apply (raster or vector).
   *
   * Possible values: "raster-tile", "vt-polygon", "vt-line"
   */
  type?: RenderOptionTypeOutput;
  /**
   * A URL query-string encoded string of TiTiler rendering options. Valid only for
   * `raster-tile` types.
   *
   * See [Query Parameters](https://developmentseed.org/titiler/endpoints/cog/#description).
   */
  options?: string;
  /**
   * Options for rendering vector tiles. Valid only for `vt-polygon`  and `vt-line`
   * types.
   */
  vectorOptions?: RenderOptionVectorOptionsOutput;
  /** Minimum zoom level at which to display this layer. */
  minZoom?: number;
  /** Legend configuration for this render option. */
  legend?: RenderOptionLegendOutput;
  /**
   * A list of property/value conditions that must be in the active mosaic CQL for
   * this render option to be enabled
   */
  conditions?: Array<RenderOptionConditionOutput>;
}

/** Defines parameters for vector tile rendering. */
export interface RenderOptionVectorOptionsOutput {
  /** Asset key containing the TileJSON URL. */
  tilejsonKey: string;
  /** Name of the source layer in the vector tiles. */
  sourceLayer: string;
  /** Fill color for polygon features. */
  fillColor?: string;
  /** Stroke color for line features. */
  strokeColor?: string;
  /** Width of line strokes in pixels. */
  strokeWidth?: number;
  /** MapBox GL filter expression to filter features. */
  filter?: string[];
}

/** Configuration for generating a data legend. */
export interface RenderOptionLegendOutput {
  /**
   * Legend type to make,
   * one of: `continuous`,
   * `classmap`,
   * `interval` or `none`
   * (note, `none` is a string literal).
   *
   * Possible values: "continuous", "classmap", "interval", "none"
   */
  type?: LegendConfigTypeOutput;
  /** Text labels to display on the legend. */
  labels?: string[];
  /**
   * The number of items to trim from the start of the legend definition. Used if
   * there are values important for rendering (e.g. nodata) that aren't desirable in
   * the legend.
   */
  trimStart?: number;
  /** Number of items to trim from the end of the legend. */
  trimEnd?: number;
  /**
   * A factor to multiply interval legend labels by. Useful for scaled rasters whose
   * colormap definitions map to unscaled values, effectively showing legend labels
   * as scaled values.
   */
  scaleFactor?: number;
}

/** Defines a condition for enabling a render option. */
export interface RenderOptionConditionOutput {
  /** Property name to check in the active CQL filter. */
  property: string;
  /** Value that the property must equal. */
  value?: string;
}

/**
 * http://docs.opengeospatial.org/is/17-069r3/17-069r3.html#_feature_collections_rootcollections
 *
 * Represents a collection of STAC collections with links.
 */
export interface StacCatalogCollectionsOutput {
  /** Links to related resources and endpoints. */
  links: Array<StacLinkOutput>;
  /** Array of STAC collections available in the catalog. */
  collections: Array<StacCollectionOutput>;
}

/** Defines how data is partitioned for efficient storage and retrieval. */
export interface PartitionTypeOutput {
  /**
   * Partitioning scheme to use for data organization.
   *
   * Possible values: "year", "month", "none"
   */
  scheme?: PartitionTypeSchemeOutput;
}

/**
 * https://github.com/radiantearth/stac-api-spec/blob/master/api-spec.md#ogc-api---features-endpoints
 *
 * Represents the OGC API conformance declaration.
 */
export interface StacConformanceClassesOutput {
  /** List of OGC API conformance classes implemented by this API. */
  conformsTo: string[];
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/itemcollection-spec.md
 *
 * Represents a collection of STAC Items as a GeoJSON FeatureCollection.
 */
export interface StacItemCollectionOutput
  extends StacItemOrStacItemCollectionOutputParent {
  /** GeoJSON FeatureCollection type. */
  type: "FeatureCollection";
  /** Array of STAC Items in the collection. */
  features: Array<StacItemOutput>;
  /** Bounding box of all items in format [west, south, east, north]. */
  bbox?: number[];
  /** Context information for the search response. */
  context?: StacContextExtensionOutput;
}

/** Represents a STAC Item, which is a GeoJSON Feature with additional metadata. */
export interface StacItemOutput
  extends StacItemOrStacItemCollectionOutputParent {
  /** Geometry object defining the feature's shape */
  geometry: GeometryOutput;
  /** Unique identifier for the feature */
  id: string;
  /** GeoJSON type identifier for Feature */
  type: "Feature";
  /** ID of the STAC collection this item belongs to. */
  collection?: string;
  /** Bounding box coordinates for the feature */
  bbox: number[];
  /** Attributes associated with the feature */
  properties: StacItemPropertiesOutput;
  /** Assets */
  assets: Record<string, StacAssetOutput>;
  /** MSFT Timestamp */
  "_msft:ts"?: string;
  /** MSFT ETag */
  "_msft:etag"?: string;
}

/**
 * Represents a GeoJSON geometry object as defined by RFC 7946.
 *
 * Supported geometry types include:
 * - **Point**: A single geographic coordinate.
 * - **LineString**: A sequence of geographic coordinates forming a line.
 * - **Polygon**: A closed shape defined by linear rings.
 * - **MultiPoint**: A collection of Points.
 * - **MultiLineString**: A collection of LineStrings.
 * - **MultiPolygon**: A collection of Polygons.
 *
 * Used for spatial filtering in STAC.
 */
export interface GeometryOutputParent {
  /** Optional bounding box of the geometry. */
  bbox?: number[];
  type: string;
}

/** Represents a GeoJSON Point geometry. */
export interface PointOutput extends GeometryOutputParent {
  /** The geometry type, always "Point" for Point geometries. */
  type: "Point";
  /** The coordinates of the point as [longitude, latitude]. */
  coordinates: string;
}

/** Represents a Polygon. */
export interface PolygonOutput extends GeometryOutputParent {
  /** The coordinates of the polygon. */
  coordinates: number[][][];
  /** The type of the polygon. */
  type: "Polygon";
}

/** Represents a MultiPolygon. */
export interface MultiPolygonOutput extends GeometryOutputParent {
  /** The coordinates of the multipolygon. */
  coordinates: number[][][];
  /** The type of the multipolygon. */
  type: "MultiPolygon";
}

/** Represents a MultiLineString. */
export interface MultiLineStringOutput extends GeometryOutputParent {
  /** The type of the multilinestring. */
  type: "MultiLineString";
  /** The coordinates of the multilinestring. */
  coordinates: number[][];
}

/** Represents a LineString. */
export interface LineStringOutput extends GeometryOutputParent {
  /** The type of the linestring. */
  type: "LineString";
  /** The coordinates of the linestring. */
  coordinates: number[];
}

/** Represents a MultiPoint. */
export interface MultiPointOutput extends GeometryOutputParent {
  /** The type of the multipoint. */
  type: "MultiPoint";
  /** The coordinates of the multipoint. */
  coordinates: number[];
}

/**
 * Properties of a STAC Item containing metadata about the asset.
 *
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object
 */
export interface StacItemPropertiesOutput extends Record<string, any> {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: Array<StacProviderOutput>;
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: string;
  /** Last update timestamp of the data. */
  updated?: string;
  /** Human-readable title for the item. */
  title?: string;
  /** Detailed description of the item. */
  description?: string;
  /** Datetime the asset represents in RFC 3339 format. */
  datetime: string;
  /** Start time of the item observation period. */
  start_datetime?: string;
  /** End time of the item observation period. */
  end_datetime?: string;
}

/** Base type for STAC items and collections with discriminator. */
export interface StacItemOrStacItemCollectionOutputParent {
  /** Stac Version */
  stac_version?: string;
  /** Links to related resources and endpoints. */
  links?: Array<StacLinkOutput>;
  /** MSFT Created */
  "msft:_created"?: string;
  /** MSFT Updated */
  "msft:_updated"?: string;
  /** MSFT Short Description */
  "msft:short_description"?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stac_extensions?: string[];
  type: string;
}

/**
 * https://github.com/radiantearth/stac-api-spec/tree/master/extensions/context#context-extension-specification
 *
 * Context information for a search response including pagination details.
 */
export interface StacContextExtensionOutput {
  /** Number of items returned in the response. */
  returned: number;
  /** Maximum number of items requested. */
  limit?: number;
  /** Total number of items matching the query. */
  matched?: number;
}

/**
 * https://github.com/radiantearth/stac-api-spec/blob/master/api-spec.md#ogc-api---features-endpoints
 *
 * Represents the STAC API landing page with links to available resources.
 */
export interface StacLandingPageOutput {
  /** MSFT Created */
  "msft:_created"?: string;
  /** MSFT Updated */
  "msft:_updated"?: string;
  /** MSFT Short Description */
  "msft:short_description"?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stac_extensions?: string[];
  /** Unique identifier for the STAC catalog. */
  id: string;
  /** Detailed description of the STAC catalog. */
  description: string;
  /** Human-readable title for the STAC catalog. */
  title?: string;
  /** Stac Version */
  stac_version?: string;
  /** List of OGC API conformance classes implemented by this API. */
  conformsTo: string[];
  /** Links to related resources and endpoints. */
  links: Array<StacLinkOutput>;
  /** Type */
  type?: string;
}

/** Definition of a queryable field for STAC API filtering. */
export interface StacQueryableOutput {
  /** Name of the queryable field. */
  name: string;
  /** Metadata for the queryable field. */
  definition: Record<string, any>;
  /** Whether to create a database index for this field. */
  create_index?: boolean;
  /**
   * Data type of the queryable field.
   *
   * Possible values: "string", "number", "boolean", "timestamp", "date"
   */
  data_type?: StacQueryableDefinitionDataTypeOutput;
}

/**
 * https://github.com/opengeospatial/2D-Tile-Matrix-Set/blob/master/schemas/tms/2.0/json/tileMatrixSet.json
 *
 * A definition of a tile matrix set following the Tile Matrix Set standard.
 * For tileset metadata, such a description (in `tileMatrixSet` property) is only
 * required for offline use,
 * as an alternative to a link with a
 * `http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme` relation type.
 */
export interface TileMatrixSetOutput {
  /** Human-readable title of the tile matrix set */
  title?: string;
  /**
   * Brief narrative description of this tile matrix set, normally available for
   * display to a human
   */
  description?: string;
  /**
   * Unordered list of one or more commonly used or formalized word(s) or phrase(s)
   * used to describe this tile matrix set
   */
  keywords?: string[];
  /** Unique identifier for the tile matrix set */
  id?: string;
  /** URI reference to the official definition */
  uri?: string;
  /** Names of the coordinate axes in order */
  orderedAxes?: string[];
  /** Coordinate reference system identifier */
  crs: string;
  /** URL reference to a standardized scale set */
  wellKnownScaleSet?: string;
  /** Geographic extent of the tile matrix set */
  boundingBox?: TileMatrixSetBoundingBoxOutput;
  /** Array of tile matrices at different zoom levels */
  tileMatrices: Array<TileMatrixOutput>;
}

/** Geographic extent of the tile matrix set expressed in the specified coordinate reference system */
export interface TileMatrixSetBoundingBoxOutput {
  /** Lower-left corner coordinates [x, y] of bounding box */
  lowerLeft: string[];
  /** Upper-right corner coordinates [x, y] of bounding box */
  upperRight: string[];
  /** Coordinate reference system identifier */
  crs?: string;
  /** Explicit axis order for the CRS coordinates (e.g., ['x', 'y']) */
  orderedAxes?: string[];
}

/**
 * Tile Matrix Definition
 *
 * A tile matrix, usually corresponding to a particular zoom level of a
 * TileMatrixSet.
 *
 * ref:
 * https://github.com/opengeospatial/2D-Tile-Matrix-Set/blob/master/schemas/tms/2.0/json/tileMatrix.json
 *
 * Definition of a tile matrix at a specific zoom level within a tile matrix set
 */
export interface TileMatrixOutput {
  /** Human-readable title of the tile matrix level */
  title?: string;
  /** Human-readable description of this tile matrix level */
  description?: string;
  /**
   * Unordered list of one or more commonly used or formalized word(s) or phrase(s)
   * used to describe this dataset
   */
  keywords?: string[];
  /** Unique identifier for this tile matrix level, often the zoom level */
  id: string;
  /** Scale denominator representing the scale of this tile matrix level */
  scaleDenominator: number;
  /** Size of a pixel in map units at this tile matrix level */
  cellSize: number;
  /**
   * The corner of the tile matrix (_topLeft_ or _bottomLeft_) used as the origin
   * for numbering tile rows and columns. This corner is also a corner of the (0, 0)
   * tile.
   *
   * Possible values: "topLeft", "bottomLeft"
   */
  cornerOfOrigin?: TileMatrixCornerOfOriginOutput;
  /**
   * Precise position in CRS coordinates of the corner of origin (e.g. the top-left
   * corner) for this tile matrix. This position is also a corner of the (0, 0)
   * tile. In previous version, this was 'topLeftCorner' and 'cornerOfOrigin' did
   * not exist.
   */
  pointOfOrigin: number[];
  /** Pixel width of each tile at this level */
  tileWidth: number;
  /** Pixel height of each tile at this level */
  tileHeight: number;
  /** Number of tiles horizontally at this matrix level */
  matrixWidth: number;
  /** Number of tiles vertically at this matrix level */
  matrixHeight: number;
  /**
   * Describes the rows that has variable matrix width
   *
   * ref: https://github.com/opengeospatial/2D-Tile-Matrix-Set/blob/master/schemas/tms/2.0/json/variableMatrixWidth.json
   */
  variableMatrixWidths?: Array<VariableMatrixWidthOutput>;
}

/** Model for variableMatrixWidth */
export interface VariableMatrixWidthOutput {
  /** Number of tiles in width that coalesce in a single tile for these rows */
  coalesce: number;
  /** First tile row where the coalescence factor applies for this tilematrix */
  minTileRow: number;
  /** Last tile row where the coalescence factor applies for this tilematrix */
  maxTileRow: number;
}

/** Return dataset's statistics. */
export interface StacAssetStatisticsOutput {
  /** Response Asset Statistics Api Collections  Collection Id  Items  Item Id  Asset Statistics Get */
  data: Record<string, BandStatisticsOutput>;
}

/** Statistical information about a data band. */
export interface BandStatisticsOutput {
  /** Minimum value in the band. */
  min: number;
  /** Maximum value in the band. */
  max: number;
  /** Mean value of the band. */
  mean: number;
  /** Count of pixels in the band. */
  count: number;
  /** Sum of all pixel values in the band. */
  sum: number;
  /** Standard deviation of pixel values in the band. */
  std: number;
  /** Median value of the band. */
  median: number;
  /** Most common value in the band. */
  majority: number;
  /** Least common value in the band. */
  minority: number;
  /** Count of unique values in the band. */
  unique: number;
  /** Histogram of pixel values in the band. */
  histogram: number[][];
  /** Percentage of valid (non-masked) pixels. */
  valid_percent: number;
  /** Count of masked pixels in the band. */
  masked_pixels: number;
  /** Count of valid (non-masked) pixels in the band. */
  valid_pixels: number;
  /**
   * Percentile 2
   * The 2nd percentile value.
   */
  percentile_2: number;
  /**
   * Percentile 98
   * The 98th percentile value.
   */
  percentile_98: number;
}

/** Geographic extent of a dataset expressed as a bounding box */
export interface StacItemBoundsOutput {
  /** Array of coordinates defining the bounding box [west, south, east, north] */
  bounds: number[];
}

/** STAC Item representing a spatiotemporal asset with statistical information */
export interface StacItemStatisticsGeoJsonOutput {
  /** Geometry object defining the feature's shape */
  geometry: GeometryOutput;
  /**
   * GeoJSON type identifier for Feature
   *
   * Possible values: "Feature"
   */
  type: FeatureTypeOutput;
  /** Feature properties */
  properties?: Record<string, any>;
  /** MSFT Created */
  "msft:_created"?: string;
  /** MSFT Updated */
  "msft:_updated"?: string;
  /** MSFT Short Description */
  "msft:short_description"?: string;
  /** Unique identifier for the feature */
  id: string;
  /** Bounding box coordinates for the feature */
  bbox: number[];
  /** Stac Version */
  stac_version?: string;
  /** ID of the STAC collection this item belongs to */
  collection?: string;
  /** MSFT Timestamp */
  "_msft:ts"?: string;
  /** MSFT ETag */
  "_msft:etag"?: string;
  /** List of STAC extension URLs used by this item */
  stac_extensions?: string[];
}

/** GeoJSON Feature object containing rio-tiler model information */
export interface TilerInfoGeoJsonFeatureOutput {
  /**
   * GeoJSON type identifier
   *
   * Possible values: "Feature"
   */
  type: FeatureTypeOutput;
  /** Geometry object defining the feature's shape */
  geometry: GeometryOutput;
  /** Properties */
  properties: Record<string, TilerInfoOutput>;
  /** Unique identifier for the feature */
  id?: string;
  /** Bounding box coordinates for the feature */
  bbox?: number;
}

/** Dataset Info. */
export interface TilerInfoOutput {
  /** Bounds */
  bounds: number[];
  /** Band Metadata */
  band_metadata?: Array<BandMetadataElementOutput>[];
  /** Band Descriptions */
  band_descriptions?: string[][];
  /** Data type */
  dtype: string;
  /**
   * NoData Type
   *
   * Possible values: "Alpha", "Mask", "Internal", "Nodata", "None"
   */
  nodata_type?: NoDataTypeOutput;
  /** Color interpretation */
  colorinterp?: string[];
  /** Driver */
  driver?: string;
  /** Count */
  count?: number;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Overviews */
  overviews?: string[];
  /** Scales */
  scales?: number[];
  /** Offsets */
  offsets?: number[];
  /** Colormap */
  colormap?: Record<string, string[]>;
  /** Minzoom */
  minzoom?: number;
  /** Maxzoom */
  maxzoom?: number;
}

/** Return dataset's basic info or the list of available assets. */
export interface InfoOperationResponseOutput {
  /** body for info operation response */
  data: TilerInfoOutput;
}

/**
 * Point model.
 *
 * response model for `/point` endpointsResponse model for point query operations providing values at a specific location
 */
export interface TilerCoreModelsResponsesPointOutput {
  /** Geographic coordinates [longitude, latitude] of the queried point */
  coordinates: number[];
  /** Array of pixel values at the queried point for each band */
  values: number[];
  /** Names of each band in the raster data */
  band_names: string[];
}

/** Response model for image exports */
export interface ImageResponseOutput {
  /** URL of the exported image */
  url: string;
}

/** Return dataset's statistics. */
export interface StatisticsResponseOutput
  extends Record<string, BandStatisticsOutput> {}

/**
 * TileJSON model.
 *
 * Based on https://github.com/mapbox/tilejson-spec/tree/master/2.2.0TileJSON metadata describing a tile set according to the TileJSON specification
 */
export interface TileJsonMetaDataOutput {
  /** TileJson */
  tilejson?: string;
  /** Human-readable name of the tile set */
  name?: string;
  /** Human-readable description of the tile set */
  description?: string;
  /** Version */
  version?: string;
  /** Attribution text for the data sources */
  attribution?: string;
  /** URL template for feature info queries */
  template?: string;
  /** URL to legend content for the tile set */
  legend?: string;
  /**
   * Tile addressing scheme (xyz or tms)
   *
   * Possible values: "xyz", "tms"
   */
  scheme?: TileAddressingSchemeOutput;
  /** Array of tile URL templates */
  tiles: string[];
  /** Array of UTFGrid URL templates */
  grids?: string[];
  /** Array of data file URL templates */
  data?: string[];
  /** Minimum zoom level available in the tile set */
  minzoom?: number;
  /** Maximum zoom level available in the tile set */
  maxzoom?: number;
  /** Bounds */
  bounds?: number[];
  /** Default center point [longitude, latitude, zoom] for the tile set */
  center?: number[];
}

/** Information about a registered STAC search query */
export interface TilerStacSearchRegistrationOutput {
  /**
   * Details of the saved search query
   *
   * See the [PgSTAC Search table definition](https://github.com/stac-utils/pgstac/blob/3499daa2bfa700ae7bb07503795c169bf2ebafc7/sql/004_search.sql#L907-L915).
   */
  search: TilerStacSearchDefinitionOutput;
  /** Related links for the search query */
  links?: Array<StacLinkOutput>;
}

/**
 * PgSTAC Search entry.
 *
 * ref:
 * https://github.com/stac-utils/pgstac/blob/3499daa2bfa700ae7bb07503795c169bf2ebafc7/sql/004_search.sql#L907-L915Stored search query in the PgSTAC database
 */
export interface TilerStacSearchDefinitionOutput {
  /** Unique hash identifier for the search query */
  hash: string;
  /** Search */
  search: Record<string, any>;
  /** SQL WHERE clause representing the search filters */
  _where: string;
  /** SQL ORDER BY clause for sorting results */
  orderby: string;
  /** Timestamp when the search was last accessed */
  lastused: string;
  /** Number of times the search has been accessed */
  usecount: number;
  /** Additional metadata associated with the search */
  metadata: MosaicMetadataOutput;
}

/** Metadata information for mosaic or search results */
export interface MosaicMetadataOutput {
  /**
   * Type of metadata resource
   *
   * Possible values: "mosaic", "search"
   */
  type?: MosaicMetadataTypeOutput;
  /** Geographic bounding box in [west, south, east, north] format */
  bounds?: string;
  /** Minimum zoom level supported */
  minzoom?: number;
  /** Maximum zoom level supported */
  maxzoom?: number;
  /** Human-readable name for the resource */
  name?: string;
  /** List of asset identifiers included in the resource */
  assets?: string[];
  /** Defaults */
  defaults?: Record<string, string>;
}

/** Response from a successful mosaic registration with search ID and related links */
export interface TilerMosaicSearchRegistrationResponseOutput {
  /** Unique identifier for the registered search */
  searchid: string;
  /** Related links for the registered mosaic */
  links?: Array<StacLinkOutput>;
}

/** Represents a Shared Access Signature (SAS) token response for accessing Azure Blob Storage. */
export interface SharedAccessSignatureTokenOutput {
  /** The expiration date and time of the SAS token in UTC. */
  "msft:expiry": string;
  /** The SAS token string used for authentication. */
  token: string;
}

/**
 * Represents a link that has not been signed with a SAS token.
 * The expiry field will be null for unsigned links.
 */
export interface SharedAccessSignatureSignedLinkOutput {
  /** The expiry date of the signed link. This indicates when the link will no longer be valid. */
  "msft:expiry"?: string;
  /** The URL of the unsigned link. */
  href: string;
}

/** Ingestion Source */
export type IngestionSourceOutput =
  | IngestionSourceOutputParent
  | SharedAccessSignatureTokenIngestionSourceOutput
  | ManagedIdentityIngestionSourceOutput;
/**
 * Represents a GeoJSON geometry object as defined by RFC 7946.
 *
 * Supported geometry types include:
 * - **Point**: A single geographic coordinate.
 * - **LineString**: A sequence of geographic coordinates forming a line.
 * - **Polygon**: A closed shape defined by linear rings.
 * - **MultiPoint**: A collection of Points.
 * - **MultiLineString**: A collection of LineStrings.
 * - **MultiPolygon**: A collection of Polygons.
 *
 * Used for spatial filtering in STAC.
 */
export type GeometryOutput =
  | GeometryOutputParent
  | PointOutput
  | PolygonOutput
  | MultiPolygonOutput
  | MultiLineStringOutput
  | LineStringOutput
  | MultiPointOutput;
/** Base type for STAC items and collections with discriminator. */
export type StacItemOrStacItemCollectionOutput =
  | StacItemOrStacItemCollectionOutputParent
  | StacItemCollectionOutput
  | StacItemOutput;
/** Alias for OperationStatusOutput */
export type OperationStatusOutput = string;
/** Alias for IngestionTypeOutput */
export type IngestionTypeOutput = string;
/** Alias for IngestionStatusOutput */
export type IngestionStatusOutput = string;
/** Alias for IngestionSourceTypeOutput */
export type IngestionSourceTypeOutput = string;
/** Alias for StacLinkTypeOutput */
export type StacLinkTypeOutput = string;
/** Alias for RenderOptionTypeOutput */
export type RenderOptionTypeOutput = string;
/** Alias for LegendConfigTypeOutput */
export type LegendConfigTypeOutput = string;
/** Alias for PartitionTypeSchemeOutput */
export type PartitionTypeSchemeOutput = string;
/** Alias for StacQueryableDefinitionDataTypeOutput */
export type StacQueryableDefinitionDataTypeOutput = string;
/** Alias for TileMatrixCornerOfOriginOutput */
export type TileMatrixCornerOfOriginOutput = string;
/** Alias for FeatureTypeOutput */
export type FeatureTypeOutput = string;
/** Alias for BandMetadataElementOutput */
export type BandMetadataElementOutput = string | Record<string, string>;
/** Alias for NoDataTypeOutput */
export type NoDataTypeOutput = string;
/** Alias for TileAddressingSchemeOutput */
export type TileAddressingSchemeOutput = string;
/** Alias for IntervalLegendsElementOutput */
export type IntervalLegendsElementOutput = number[] | Record<string, string>;
/** Alias for MosaicMetadataTypeOutput */
export type MosaicMetadataTypeOutput = string;
