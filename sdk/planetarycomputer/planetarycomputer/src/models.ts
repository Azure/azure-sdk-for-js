// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Spatio geo-catalog ingestion creation model */
export interface IngestionDefinitionCreation {
  /**
   * Ingestion type
   *
   * Possible values: "StaticCatalog"
   */
  importType: IngestionType;
  /** Ingestion name */
  displayName?: string;
  /** Source catalog URL. *Required for StaticCatalog ingestion type */
  sourceCatalogUrl?: string;
  /** Skip processing existing items in the catalog */
  skipExistingItems?: boolean;
  /** Keep original source assets */
  keepOriginalAssets?: boolean;
}

/** Patch request model */
export interface PatchRequest {
  /** Ingestion name */
  displayName?: string;
  /** Source catalog URL */
  sourceCatalogUrl?: string;
  /** Skip processing existing items in the catalog */
  skipExistingItems?: boolean;
  /** Keep original source assets */
  keepOriginalAssets?: boolean;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/itemcollection-spec.md
 *
 * Represents a collection of STAC Items as a GeoJSON FeatureCollection.
 */
export interface ItemCollection {
  /** MSFT Created */
  "msft:_created"?: string;
  /** MSFT Updated */
  "msft:_updated"?: string;
  /** MSFT Short Description */
  "msft:short_description"?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stac_extensions?: string[];
  /**
   * GeoJSON FeatureCollection type.
   *
   * Possible values: "FeatureCollection"
   */
  type: ItemCollectionType;
  /** Array of STAC Items in the collection. */
  features: Array<StacItem>;
  /** Bounding box of all items in format [west, south, east, north]. */
  bbox?: number[];
  /** Stac Version */
  stac_version?: string;
  /** Links to related resources and endpoints. */
  links?: Array<Link>;
  /** Context information for the search response. */
  context?: ContextExtension;
}

/** Represents a STAC Item, which is a GeoJSON Feature with additional metadata. */
export interface StacItem {
  /**
   * GeoJSON type identifier for Feature
   *
   * Possible values: "Feature"
   */
  type: FeatureType;
  /** Geometry object defining the feature's shape */
  geometry: GeoJson;
  /** Bounding box coordinates for the feature */
  bbox: number[];
  /** MSFT Created */
  "msft:_created"?: string;
  /** MSFT Updated */
  "msft:_updated"?: string;
  /** MSFT Short Description */
  "msft:short_description"?: string;
  /** URLs to STAC extensions implemented by this STAC resource. */
  stac_extensions?: string[];
  /** Unique identifier for the feature */
  id: string;
  /** Stac Version */
  stac_version?: string;
  /** ID of the STAC collection this item belongs to. */
  collection?: string;
  /** Attributes associated with the feature */
  properties: ItemProperties;
  /** Links to related resources and endpoints. */
  links: Array<Link>;
  /** Assets */
  assets: Record<string, Asset>;
  /** MSFT Timestamp */
  "_msft:ts"?: string;
  /** MSFT ETag */
  "_msft:etag"?: string;
}

/** Represents a GeoJSON Point geometry. */
export interface Point {
  /**
   * The geometry type, always "Point" for Point geometries.
   *
   * Possible values: "Point"
   */
  type: PointType;
  /** The coordinates of the point as [longitude, latitude]. */
  coordinates: string;
  /** Optional bounding box of the geometry. */
  bbox?: number;
}

/** Represents a LineString. */
export interface LineString {
  /**
   * The type of the linestring.
   *
   * Possible values: "LineString"
   */
  type: LineStringType;
  /** The coordinates of the linestring. */
  coordinates: number[];
  /** The bounding box of the linestring. */
  bbox?: number;
}

/** Represents a Polygon. */
export interface Polygon {
  /** The coordinates of the polygon. */
  coordinates: number[][][];
  /**
   * The type of the polygon.
   *
   * Possible values: "Polygon"
   */
  type: PolygonType;
  /** The bounding box of the polygon. */
  bbox?: number;
}

/** Represents a MultiPoint. */
export interface MultiPoint {
  /**
   * The type of the multipoint.
   *
   * Possible values: "MultiPoint"
   */
  type: MultiPointType;
  /** The coordinates of the multipoint. */
  coordinates: number[];
  /** The bounding box of the multipoint. */
  bbox?: number;
}

/** Represents a MultiLineString. */
export interface MultiLineString {
  /**
   * The type of the multilinestring.
   *
   * Possible values: "MultiLineString"
   */
  type: MultiLineStringType;
  /** The coordinates of the multilinestring. */
  coordinates: number[][];
  /** The bounding box of the multilinestring. */
  bbox?: number;
}

/** Represents a MultiPolygon. */
export interface MultiPolygon {
  /** The coordinates of the multipolygon. */
  coordinates: number[][][];
  /**
   * The type of the multipolygon.
   *
   * Possible values: "MultiPolygon"
   */
  type: MultiPolygonType;
  /** The bounding box of the multipolygon. */
  bbox?: number;
}

/**
 * Properties of a STAC Item containing metadata about the asset.
 *
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/item-spec.md#properties-object
 */
export interface ItemProperties extends Record<string, unknown> {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: Array<Provider>;
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: Date | string;
  /** Last update timestamp of the data. */
  updated?: Date | string;
  /** Human-readable title for the item. */
  title?: string;
  /** Detailed description of the item. */
  description?: string;
  /** Datetime the asset represents in RFC 3339 format. */
  datetime: string;
  /** Start time of the item observation period. */
  start_datetime?: Date | string;
  /** End time of the item observation period. */
  end_datetime?: Date | string;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#provider-object
 *
 * Represents information about a data provider for STAC collections and items.
 */
export interface Provider {
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
 * Link model.
 *
 * Ref:
 * http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/link.yaml
 *
 * Represents a link.
 */
export interface Link {
  /** The relationship type of the link. */
  rel?: string;
  /** The title of the link. */
  title?: string;
  /**
   * The MIME type of the linked resource.
   *
   * Possible values: "image/tiff; application=geotiff", "image/jp2", "image/png", "image/jpeg", "image/jpg", "image/webp", "application/x-binary", "application/xml", "application/json", "application/geo+json", "text/html", "text/plain", "application/x-protobuf"
   */
  type?: LinkType;
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
  body?: Record<string, string>;
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
export interface Asset extends Record<string, unknown> {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: Array<Provider>;
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: Date | string;
  /** Last update timestamp of the data. */
  updated?: Date | string;
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
 * https://github.com/radiantearth/stac-api-spec/tree/master/extensions/context#context-extension-specification
 *
 * Context information for a search response including pagination details.
 */
export interface ContextExtension {
  /** Number of items returned in the response. */
  returned: number;
  /** Maximum number of items requested. */
  limit?: number;
  /** Total number of items matching the query. */
  matched?: number;
}

/** Managed Identity connection information */
export interface ManagedIdentityConnection {
  /** Azure Blob Storage container URL */
  containerUrl: string;
  /** Azure Managed Identity configured in the Geo-Catalog with access to the container */
  objectId: string;
}

/** Ingestion Source */
export interface IngestionSourceCreateParent {
  /** Ingestion source id */
  id: string;
  kind: IngestionSourceType;
}

/** SAS Token ingestion source */
export interface SasTokenIngestionSourceCreate extends IngestionSourceCreateParent {
  kind: "SasToken";
  /** SAS token connection information */
  connectionInfo: SasTokenConnectionCreate;
}

/** SAS Token connection information */
export interface SasTokenConnectionCreate {
  /** Azure Blob Storage container URL */
  containerUrl: string;
  /** SAS token */
  sasToken: string;
}

/** Managed Identity ingestion source */
export interface ManagedIdentityIngestionSourceCreate extends IngestionSourceCreateParent {
  kind: "BlobManagedIdentity";
  /** Managed identity connection information */
  connectionInfo: ManagedIdentityConnection;
}

/**
 * Search model.
 *
 * Overrides the validation for datetime from the base request model.
 *
 * Defines parameters for a STAC search POST request.
 */
export interface SearchPostRequest {
  /** List of collection IDs to search within. */
  collections?: string[];
  /** List of specific item IDs to return. */
  ids?: string[];
  /** Bounding box for spatial filtering in format [west, south, east, north]. */
  bbox?: number[];
  /** GeoJSON geometry for spatial filtering. */
  intersects?: GeoJson;
  /** Temporal filter in RFC 3339 format, can be a single time or range. */
  datetime?: string;
  /** Maximum number of results to return. */
  limit?: number;
  /** Conf */
  conf?: Record<string, string>;
  /**
   * Whether to sign asset URLs in the response.
   *
   * Possible values: "true", "false"
   */
  sign?: SignType;
  /** URL signature duration in seconds. */
  duration?: number;
  /**
   * https://github.com/stac-api-extensions/query
   *
   * Query
   */
  query?: Record<string, StringRecord>;
  /**
   * https://github.com/stac-api-extensions/sort
   *
   * Sort criteria for the search results.
   */
  sortby?: Array<SortExtension>;
  /**
   * https://github.com/stac-api-extensions/fields
   *
   * Specifies which fields to include or exclude in the response.
   */
  fields?: Array<SearchPostRequestFields>;
  /**
   * https://github.com/stac-api-extensions/filter
   *
   * Filter
   */
  filter?: Record<string, string>;
  /** Coordinate reference system for the filter. */
  "filter-crs"?: string;
  /**
   * Filter language to use for the filter expression.
   *
   * Possible values: "cql-json", "cql2-json", "cql2-text"
   */
  "filter-lang"?: FilterLang;
  /** Pagination token for fetching the next set of results. */
  token?: string;
}

/** String record. */
export interface StringRecord extends Record<string, string> {}

/**
 * https://github.com/radiantearth/stac-api-spec/tree/master/extensions/sort#sort-api-extension
 *
 * Represents a sort specification for STAC API queries.
 */
export interface SortExtension {
  /** The field name to sort by. */
  field: string;
  /**
   * The sort direction (ascending or descending).
   *
   * Possible values: "asc", "desc"
   */
  direction: SortDirections;
}

/**
 * FieldsExtension.
 *
 * Attributes:
 * include: set of fields to include.
 * exclude: set of fields to exclude.
 *
 * Controls which fields to include or exclude from the response.
 */
export interface SearchPostRequestFields {
  /** Array of field names to include in the response. */
  include?: string[];
  /** Array of field names to exclude from the response. */
  exclude?: string[];
}

/** Definition of a queryable field for STAC API filtering. */
export interface QueryableDefinition {
  /** Name of the queryable field. */
  name: string;
  /** Metadata for the queryable field. */
  definition: QueryableDefinitionType;
  /** Whether to create a database index for this field. */
  create_index?: boolean;
  /**
   * Data type of the queryable field.
   *
   * Possible values: "string", "number", "boolean", "timestamp", "date"
   */
  data_type?: QueryableDefinitionDataType;
}

/** QueryableDefinitionType */
export interface QueryableDefinitionType {
  /** Whether to create a database index for this property. */
  create_index?: boolean;
  /**
   * Data type of the queryable property.
   *
   * Possible values: "string", "number", "boolean", "timestamp", "date"
   */
  data_type?: QueryableDefinitionDataType;
  /** Description */
  description?: string;
}

export interface FormDataDataPartDescriptor {
  name: "data";
  body: AssetMetadata;
}

export interface FormDataFilePartDescriptor {
  name: "file";
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream | File;
  filename?: string;
  contentType?: string;
}

/** Asset metadata model. */
export interface AssetMetadata {
  /** The key of the asset. */
  key: string;
  /** The type of the asset. */
  type: string;
  /** The roles of the asset. */
  roles: string[];
  /** The title of the asset. */
  title: string;
  /** The description of the asset. */
  description: string;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md
 *
 * Represents a STAC collection.
 */
export interface StacCollection {
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
  links: Array<Link>;
  /** Human-readable title for the collection. */
  title?: string;
  /** Type */
  type?: string;
  /** Assets */
  assets?: Record<string, Asset>;
  /** License identifier for the collection data. */
  license: string;
  /** Spatial and temporal extent of the collection. */
  extent: Extent;
  /** Keywords describing the collection. */
  keywords?: string[];
  /** Organizations or individuals who provide the collection data. */
  providers?: Array<Provider>;
  /**
   * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#summaries
   *
   * Summaries
   */
  summaries?: Record<string, string>;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#extent-object
 *
 * Represents the spatial and temporal extent of a STAC collection.
 */
export interface Extent {
  /**
   * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object
   *
   * Spatial extent defined by bounding boxes.
   */
  spatial: SpatialExtent;
  /**
   * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#temporal-extent-object
   *
   * Temporal extent defined by time intervals.
   */
  temporal: TimeInterval;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object
 *
 * Represents the spatial extent of a STAC collection with bounding boxes.
 */
export interface SpatialExtent {
  /** Array of bounding boxes defining the spatial extent, in format [[west, south, east, north]]. */
  bbox?: number[][];
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#temporal-extent-object
 *
 * Represents the temporal extent of a STAC collection with time intervals.
 */
export interface TimeInterval {
  /** Array of time intervals in format [[start_datetime, end_datetime]]. */
  interval: string[][];
}

/** Configuration for map tile visualization. */
export interface TileSettings {
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
  defaultLocation?: DefaultLocation;
}

/** Defines a default geographic location for map visualization. */
export interface DefaultLocation {
  /** Default zoom level for the map. */
  zoom: number;
  /** Default center coordinates [latitude, longitude] for the map. */
  coordinates: number[];
}

/** Defines a named mosaic with filtering criteria. */
export interface Mosaic {
  /** Unique identifier for the mosaic. */
  id: string;
  /** Short descriptive name for the mosaic. */
  name: string;
  /** Detailed description of the mosaic. */
  description?: string;
  /** A list of valid CQL2-JSON expressions used to filter the collection to moasic. */
  cql: Array<Cql>;
}

/** CQL model */
export interface Cql {
  /** Filter language */
  "filter-lang": string;
  /** Filter */
  filter: CqlFilter;
  /** Sort by */
  sortby?: Array<SortBy>;
}

/** CQL Filter model */
export interface CqlFilter {
  /** Logical operator */
  op: string;
  /** Arguments for the logical operator */
  args: Array<CqlArgument>;
}

/** Model for CQL property */
export interface CqlProperty {
  /** Property name */
  property: string;
}

/** SortBy model */
export interface SortBy {
  /** Field to sort by */
  field: string;
  /** Sort direction */
  direction: string;
}

/** Defines visualization parameters for rendering data on a map. */
export interface RenderOption {
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
  type?: RenderOptionType;
  /**
   * A URL query-string encoded string of TiTiler rendering options. Valid only for
   * `raster-tile` types.  See 'Query Parameters':
   * https://developmentseed.org/titiler/endpoints/cog/#description
   */
  options?: string;
  /**
   * Options for rendering vector tiles. Valid only for `vt-polygon`  and `vt-line`
   * types.
   */
  vectorOptions?: RenderOptionVectorOptions;
  /** Minimum zoom level at which to display this layer. */
  minZoom?: number;
  /** Legend configuration for this render option. */
  legend?: RenderOptionLegend;
  /**
   * A list of property/value conditions that must be in the active mosaic CQL for
   * this render option to be enabled
   */
  conditions?: Array<RenderOptionCondition>;
}

/** Defines parameters for vector tile rendering. */
export interface RenderOptionVectorOptions {
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
export interface RenderOptionLegend {
  /**
   * Legend type to make,
   * one of: `continuous`,
   * `classmap`,
   * `interval` or `none`
   * (note, `none` is a string literal).
   *
   * Possible values: "continuous", "classmap", "interval", "none"
   */
  type?: LegendConfigType;
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
export interface RenderOptionCondition {
  /** Property name to check in the active CQL filter. */
  property: string;
  /** Value that the property must equal. */
  value?: string;
}

/** Defines how data is partitioned for efficient storage and retrieval. */
export interface PartitionType {
  /**
   * Partitioning scheme to use for data organization.
   *
   * Possible values: "year", "month", "none"
   */
  scheme?: PartitionTypeScheme;
}

/** Parameters for requesting a rendered image from a collection */
export interface ImageRequest {
  /** Cql */
  cql: Cql;
  /** Geometry */
  geometry?: GeoJson;
  /** JSON-encoded visualization parameters */
  render_params: string;
  /** Width of the output image in pixels */
  cols: number;
  /** Height of the output image in pixels */
  rows: number;
  /**
   * Output format for the generated image
   *
   * Possible values: "png", "cog"
   */
  format?: ImageRequestFormat;
  /** Whether to include branding on the output image */
  showBranding?: boolean;
  /** Whether to apply masking to invalid or no-data areas */
  mask?: boolean;
}

/** Input parameters for registering a new mosaic of STAC items */
export interface RegisterMosaic {
  /** List of STAC collection IDs to include in the mosaic */
  collections?: string[];
  /** List of specific STAC item IDs to include in the mosaic */
  ids?: string[];
  /** Geographic bounding box to filter items [west, south, east, north] */
  bbox?: number;
  /** GeoJSON geometry to spatially filter items by intersection */
  intersects?: GeoJson;
  /** Query */
  query?: Record<string, StringRecord>;
  /** Filter */
  filter?: CqlFilter;
  /** Temporal filter in RFC 3339 format or interval */
  datetime?: string;
  /** Criteria for ordering items in the mosaic */
  sortby?: Array<SortExtension>;
  /**
   * Query language format used in the filter parameter
   *
   * Possible values: "cql-json", "cql2-json", "cql2-text"
   */
  "filter-lang"?: FilterLang;
  /** Additional metadata to associate with the mosaic */
  metadata?: Metadata;
}

/** Metadata information for mosaic or search results */
export interface Metadata {
  /**
   * Type of metadata resource
   *
   * Possible values: "mosaic", "search"
   */
  type?: MetadataType;
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

/** Ingestion Source */
export type IngestionSourceCreate =
  | IngestionSourceCreateParent
  | SasTokenIngestionSourceCreate
  | ManagedIdentityIngestionSourceCreate;
/** Alias for IngestionType */
export type IngestionType = string;
/** Alias for OperationStatus */
export type OperationStatus = string;
/** Alias for ItemCollectionType */
export type ItemCollectionType = string;
/** Alias for FeatureType */
export type FeatureType = string;
/** Alias for PointType */
export type PointType = string;
/** Alias for LineStringType */
export type LineStringType = string;
/** Alias for PolygonType */
export type PolygonType = string;
/** Alias for MultiPointType */
export type MultiPointType = string;
/** Alias for MultiLineStringType */
export type MultiLineStringType = string;
/** Alias for MultiPolygonType */
export type MultiPolygonType = string;
/** Alias for GeoJson */
export type GeoJson = Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon;
/** Alias for LinkType */
export type LinkType = string;
/** Alias for IngestionSourceType */
export type IngestionSourceType = string;
/** Alias for SignType */
export type SignType = string;
/** Alias for SortDirections */
export type SortDirections = string;
/** Alias for FilterLang */
export type FilterLang = string;
/** Alias for QueryableDefinitionDataType */
export type QueryableDefinitionDataType = string;
/** FormData model for file upload. */
export type FormData =
  | globalThis.FormData
  | Array<FormDataDataPartDescriptor | FormDataFilePartDescriptor>;
/** Alias for CqlValue */
export type CqlValue =
  | string
  | number
  | number
  | boolean
  | string[]
  | number[]
  | number[]
  | boolean[];
/** Alias for CqlArgument */
export type CqlArgument = CqlProperty | CqlValue | CqlFilter;
/** Alias for RenderOptionType */
export type RenderOptionType = string;
/** Alias for LegendConfigType */
export type LegendConfigType = string;
/** Alias for PartitionTypeScheme */
export type PartitionTypeScheme = string;
/** Alias for ImageRequestFormat */
export type ImageRequestFormat = string;
/** Alias for Resampling */
export type Resampling = string;
/** Alias for Algorithm */
export type Algorithm = string;
/** Alias for Tilematrixsetid */
export type Tilematrixsetid = string;
/** Alias for ColorMapNames */
export type ColorMapNames = string;
/** Alias for ImageType */
export type ImageType = string;
/** Alias for PixelSelection */
export type PixelSelection = string;
/** Alias for MetadataType */
export type MetadataType = string;
