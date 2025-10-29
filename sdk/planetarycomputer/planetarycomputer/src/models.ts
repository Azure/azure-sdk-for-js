// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Microsoft Planetary Computer Pro geo-catalog ingestion creation model */
export interface IngestionDefinition {
  /**
   * Ingestion type
   *
   * Possible values: "StaticCatalog"
   */
  importType: IngestionType;
  /** Ingestion name */
  displayName?: string;
  /** Source catalog URL. Required for StaticCatalog ingestion type */
  sourceCatalogUrl?: string;
  /** Skip processing existing items in the catalog */
  skipExistingItems?: boolean;
  /** Keep original source assets */
  keepOriginalAssets?: boolean;
}

/** Ingestion Source */
export interface IngestionSourceParent {
  /** Ingestion source id */
  id: string;
  kind: IngestionSourceType;
}

/** SAS Token ingestion source */
export interface SharedAccessSignatureTokenIngestionSource
  extends IngestionSourceParent {
  kind: "SasToken";
  /** SAS token connection information */
  connectionInfo: SharedAccessSignatureTokenConnection;
}

/** SAS Token connection information */
export interface SharedAccessSignatureTokenConnection {
  /** Azure Blob Storage container URL */
  containerUrl: string;
  /** SAS token */
  sasToken?: string;
}

/** Managed Identity ingestion source */
export interface ManagedIdentityIngestionSource extends IngestionSourceParent {
  kind: "BlobManagedIdentity";
  /** Managed identity connection information */
  connectionInfo: ManagedIdentityConnection;
}

/** Managed Identity connection information */
export interface ManagedIdentityConnection {
  /** Azure Blob Storage container URL */
  containerUrl: string;
  /** Azure Managed Identity configured in the Geo-Catalog with access to the container */
  objectId: string;
}

export interface StacAssetDataDataPartDescriptor {
  name: "data";
  body: AssetMetadata;
}

export interface StacAssetDataFilePartDescriptor {
  name: "file";
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream
    | File;
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
export interface StacCollection extends Record<string, unknown> {
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
  links: Array<StacLink>;
  /** Human-readable title for the collection. */
  title?: string;
  /** Type */
  type?: string;
  /** Assets */
  assets?: Record<string, StacAsset>;
  /**
   * Item Assets
   *
   * See the [Item Assets Definition Extension Specification](https://github.com/stac-extensions/item-assets)
   */
  item_assets?: Record<string, StacItemAsset>;
  /** License identifier for the collection data. */
  license: string;
  /** Spatial and temporal extent of the collection. */
  extent: StacExtensionExtent;
  /** Keywords describing the collection. */
  keywords?: string[];
  /** Organizations or individuals who provide the collection data. */
  providers?: Array<StacProvider>;
  /**
   * Summaries
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  summaries?: Record<string, unknown>;
}

/**
 * Link model.
 *
 * Ref:
 * http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/link.yaml
 *
 * Represents a link.
 */
export interface StacLink {
  /** The relationship type of the link. */
  rel?: string;
  /** The title of the link. */
  title?: string;
  /**
   * The MIME type of the linked resource.
   *
   * Possible values: "image/tiff; application=geotiff", "image/jp2", "image/png", "image/jpeg", "image/jpg", "image/webp", "application/x-binary", "application/xml", "application/json", "application/geo+json", "text/html", "text/plain", "application/x-protobuf"
   */
  type?: StacLinkType;
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
  body?: Record<string, unknown>;
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
export interface StacAsset extends Record<string, unknown> {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: Array<StacProvider>;
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
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#provider-object
 *
 * Represents information about a data provider for STAC collections and items.
 */
export interface StacProvider {
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
 * https://github.com/stac-extensions/item-assets
 *
 * Represents a STAC item asset, which describes the assets available under any item in the collection.
 */
export interface StacItemAsset extends Record<string, unknown> {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: Array<StacProvider>;
  /** Ground sample distance in meters. */
  gsd?: number;
  /** Creation timestamp of the data. */
  created?: Date | string;
  /** Last update timestamp of the data. */
  updated?: Date | string;
  /** Human-readable title for the asset. */
  title: string;
  /** Detailed description of the asset. */
  description?: string;
  /** URL to the asset file. */
  href?: string;
  /** Media type of the asset. */
  type: string;
  /** Roles of the asset within the item. */
  roles?: string[];
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#extent-object
 *
 * Represents the spatial and temporal extent of a STAC collection.
 */
export interface StacExtensionExtent {
  /**
   * Spatial extent defined by bounding boxes.
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  spatial: StacExtensionSpatialExtent;
  /**
   * Temporal extent defined by time intervals.
   *
   * See the [STAC Collection Spec](https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object).
   */
  temporal: StacCollectionTemporalExtent;
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#spatial-extent-object
 *
 * Represents the spatial extent of a STAC collection with bounding boxes.
 */
export interface StacExtensionSpatialExtent {
  /** Array of bounding boxes defining the spatial extent, in format [[west, south, east, north]]. */
  bbox?: number[][];
}

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/collection-spec/collection-spec.md#temporal-extent-object
 *
 * Represents the temporal extent of a STAC collection with time intervals.
 */
export interface StacCollectionTemporalExtent {
  /** Array of time intervals in format [[start_datetime, end_datetime]]. */
  interval: (Date[] | string[] | null)[][];
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
export interface StacMosaic {
  /** Unique identifier for the mosaic. */
  id: string;
  /** Short descriptive name for the mosaic. */
  name: string;
  /** Detailed description of the mosaic. */
  description?: string;
  /** A list of valid CQL2-JSON expressions used to filter the collection to moasic. */
  cql: Record<string, unknown>[];
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
   * `raster-tile` types.
   *
   * See [Query Parameters](https://developmentseed.org/titiler/endpoints/cog/#description).
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

/**
 * https://github.com/radiantearth/stac-spec/blob/v1.0.0/item-spec/itemcollection-spec.md
 *
 * Represents a collection of STAC Items as a GeoJSON FeatureCollection.
 */
export interface StacItemCollection extends StacItemOrStacItemCollectionParent {
  /** GeoJSON FeatureCollection type. */
  type: "FeatureCollection";
  /** Array of STAC Items in the collection. */
  features: Array<StacItem>;
  /** Bounding box of all items in format [west, south, east, north]. */
  bbox?: number[];
  /** Context information for the search response. */
  context?: StacContextExtension;
}

/** Represents a STAC Item, which is a GeoJSON Feature with additional metadata. */
export interface StacItem extends StacItemOrStacItemCollectionParent {
  /** Geometry object defining the feature's shape */
  geometry: Geometry;
  /** Unique identifier for the feature */
  id: string;
  /** GeoJSON type identifier for Feature */
  type: "Feature";
  /** ID of the STAC collection this item belongs to. */
  collection?: string;
  /** Bounding box coordinates for the feature */
  bbox: number[];
  /** Attributes associated with the feature */
  properties: StacItemProperties;
  /** Assets */
  assets: Record<string, StacAsset>;
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
export interface GeometryParent {
  /** Optional bounding box of the geometry. */
  bbox?: number[];
  type: string;
}

/** Represents a GeoJSON Point geometry. */
export interface Point extends GeometryParent {
  /** The geometry type, always "Point" for Point geometries. */
  type: "Point";
  /** The coordinates of the point as [longitude, latitude]. */
  coordinates: string;
}

/** Represents a Polygon. */
export interface Polygon extends GeometryParent {
  /** The coordinates of the polygon. */
  coordinates: number[][][];
  /** The type of the polygon. */
  type: "Polygon";
}

/** Represents a MultiPolygon. */
export interface MultiPolygon extends GeometryParent {
  /** The coordinates of the multipolygon. */
  coordinates: number[][][];
  /** The type of the multipolygon. */
  type: "MultiPolygon";
}

/** Represents a MultiLineString. */
export interface MultiLineString extends GeometryParent {
  /** The type of the multilinestring. */
  type: "MultiLineString";
  /** The coordinates of the multilinestring. */
  coordinates: number[][];
}

/** Represents a LineString. */
export interface LineString extends GeometryParent {
  /** The type of the linestring. */
  type: "LineString";
  /** The coordinates of the linestring. */
  coordinates: number[];
}

/** Represents a MultiPoint. */
export interface MultiPoint extends GeometryParent {
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
export interface StacItemProperties extends Record<string, unknown> {
  /** Platform that acquired the data. */
  platform?: string;
  /** Instruments that acquired the data. */
  instruments?: string[];
  /** Constellation of satellites that acquired the data. */
  constellation?: string;
  /** Mission associated with the data. */
  mission?: string;
  /** Organizations or individuals who provide the data. */
  providers?: Array<StacProvider>;
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

/** Base type for STAC items and collections with discriminator. */
export interface StacItemOrStacItemCollectionParent {
  /** Stac Version */
  stac_version?: string;
  /** Links to related resources and endpoints. */
  links?: Array<StacLink>;
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
export interface StacContextExtension {
  /** Number of items returned in the response. */
  returned: number;
  /** Maximum number of items requested. */
  limit?: number;
  /** Total number of items matching the query. */
  matched?: number;
}

/** Definition of a queryable field for STAC API filtering. */
export interface StacQueryable {
  /** Name of the queryable field. */
  name: string;
  /** Metadata for the queryable field. */
  definition: Record<string, unknown>;
  /** Whether to create a database index for this field. */
  create_index?: boolean;
  /**
   * Data type of the queryable field.
   *
   * Possible values: "string", "number", "boolean", "timestamp", "date"
   */
  data_type?: StacQueryableDefinitionDataType;
}

/**
 * Search model.
 * *
 * Defines parameters for a STAC search POST request.
 */
export interface StacSearchParameters {
  /** List of collection IDs to search within. */
  collections?: string[];
  /** List of specific item IDs to return. */
  ids?: string[];
  /** Bounding box for spatial filtering in format [west, south, east, north]. */
  bbox?: number[];
  /** GeoJSON geometry for spatial filtering. */
  intersects?: Geometry;
  /** Temporal filter in RFC 3339 format, can be a single time or range. */
  datetime?: string;
  /** Maximum number of results to return. */
  limit?: number;
  /**
   * Conf
   *
   * Overrides datetime validation from the base request model.
   */
  conf?: Record<string, unknown>;
  /**
   * Whether to sign asset URLs in the response.
   *
   * Possible values: "true", "false"
   */
  sign?: StacAssetUrlSigningMode;
  /** URL signature duration in minutes. */
  duration?: number;
  /**
   * STAC Query
   *
   * See the [STAC Query Extension](https://github.com/stac-api-extensions/query).
   */
  query?: Record<string, unknown>;
  /**
   * Sort criteria for the search results.
   *
   * See the [STAC Sort Extension](https://github.com/stac-api-extensions/sort).
   */
  sortby?: Array<StacSortExtension>;
  /**
   * Specifies which fields to include or exclude in the STAC search results.
   *
   * See the [STAC Fields Extension](https://github.com/stac-api-extensions/fields).
   */
  fields?: Array<SearchOptionsFields>;
  /**
   * CQL2 Filter
   *
   * See the [STAC Filter Extension](https://github.com/stac-api-extensions/filter).
   */
  filter?: Record<string, unknown>;
  /** Coordinate reference system for the filter. */
  "filter-crs"?: string;
  /**
   * Filter language to use for the filter expression.
   *
   * Possible values: "cql-json", "cql2-json", "cql2-text"
   */
  "filter-lang"?: FilterLanguage;
  /** Pagination token for fetching the next set of results. */
  token?: string;
}

/**
 * https://github.com/radiantearth/stac-api-spec/tree/master/extensions/sort#sort-api-extension
 *
 * Represents a sort specification for STAC API queries.
 */
export interface StacSortExtension {
  /** The field name to sort by. */
  field: string;
  /**
   * The sort direction (ascending or descending).
   *
   * Possible values: "asc", "desc"
   */
  direction: StacSearchSortingDirection;
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
export interface SearchOptionsFields {
  /** Array of field names to include in the response. */
  include?: string[];
  /** Array of field names to exclude from the response. */
  exclude?: string[];
}

/** GeoJSON Feature object representing a geographic entity */
export interface Feature {
  /** Geometry object defining the feature's shape */
  geometry: Geometry;
  /**
   * GeoJSON type identifier for Feature
   *
   * Possible values: "Feature"
   */
  type: FeatureType;
  /** Feature properties */
  properties?: Record<string, unknown>;
}

/** Parameters for requesting a rendered image from a collection */
export interface ImageParameters {
  /** Cql */
  cql: Record<string, unknown>;
  /** Zoom */
  zoom?: number;
  /** Geometry */
  geometry?: Geometry;
  /** JSON-encoded visualization parameters */
  render_params: string;
  /** Width of the output image in pixels */
  cols: number;
  /** Height of the output image in pixels */
  rows: number;
  /** Whether to include branding on the output image */
  showBranding?: boolean;
  /** Image size */
  imageSize?: string;
}

/** Metadata information for mosaic or search results */
export interface MosaicMetadata {
  /**
   * Type of metadata resource
   *
   * Possible values: "mosaic", "search"
   */
  type?: MosaicMetadataType;
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

/** Input parameters for registering a new mosaic of STAC items */
export interface RegisterMosaic {
  /** List of STAC collection IDs to include in the mosaic */
  collections?: string[];
  /** List of specific STAC item IDs to include in the mosaic */
  ids?: string[];
  /** Geographic bounding box to filter items [west, south, east, north] */
  bbox?: number;
  /** GeoJSON geometry to spatially filter items by intersection */
  intersects?: Geometry;
  /** Query */
  query?: Record<string, unknown>;
  /** Filter */
  filter?: Record<string, unknown>;
  /** Temporal filter in RFC 3339 format or interval */
  datetime?: string;
  /** Criteria for ordering items in the mosaic */
  sortby?: Array<StacSortExtension>;
  /**
   * Query language format used in the filter parameter
   *
   * Possible values: "cql-json", "cql2-json", "cql2-text"
   */
  "filter-lang"?: FilterLanguage;
  /** Additional metadata to associate with the mosaic */
  metadata?: MosaicMetadata;
}

/** Ingestion Source */
export type IngestionSource =
  | IngestionSourceParent
  | SharedAccessSignatureTokenIngestionSource
  | ManagedIdentityIngestionSource;
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
export type Geometry =
  | GeometryParent
  | Point
  | Polygon
  | MultiPolygon
  | MultiLineString
  | LineString
  | MultiPoint;
/** Base type for STAC items and collections with discriminator. */
export type StacItemOrStacItemCollection =
  | StacItemOrStacItemCollectionParent
  | StacItemCollection
  | StacItem;
/** Alias for OperationStatus */
export type OperationStatus = string;
/** Alias for IngestionType */
export type IngestionType = string;
/** Alias for IngestionStatus */
export type IngestionStatus = string;
/** Alias for IngestionSourceType */
export type IngestionSourceType = string;
/** FormContent model for file upload. */
export type StacAssetData =
  | FormData
  | Array<StacAssetDataDataPartDescriptor | StacAssetDataFilePartDescriptor>;
/** Alias for StacLinkType */
export type StacLinkType = string;
/** Alias for RenderOptionType */
export type RenderOptionType = string;
/** Alias for LegendConfigType */
export type LegendConfigType = string;
/** Alias for StacAssetUrlSigningMode */
export type StacAssetUrlSigningMode = string;
/** Alias for PartitionTypeScheme */
export type PartitionTypeScheme = string;
/** Alias for StacQueryableDefinitionDataType */
export type StacQueryableDefinitionDataType = string;
/** Alias for StacSearchSortingDirection */
export type StacSearchSortingDirection = string;
/** Alias for FilterLanguage */
export type FilterLanguage = string;
/** Alias for Resampling */
export type Resampling = string;
/** Alias for TerrainAlgorithm */
export type TerrainAlgorithm = string;
/** Alias for ColorMapNames */
export type ColorMapNames = string;
/** Alias for FeatureType */
export type FeatureType = string;
/** Alias for TilerImageFormat */
export type TilerImageFormat = string;
/** Alias for MosaicMetadataType */
export type MosaicMetadataType = string;
/** Alias for PixelSelection */
export type PixelSelection = string;
/** Alias for TileMatrixSetId */
export type TileMatrixSetId = string;
