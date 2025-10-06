// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  OperationStatus,
  Ingestion,
  IngestionSource,
  FormContent,
  StacMosaic,
  StacAssetUrlSigningMode,
  StacCollection,
  PartitionType,
  RenderOption,
  TileSettings,
  StacItemOrStacItemCollection,
  StacItem,
  StacQueryable,
  StacSearchParameters,
  Resampling,
  TerrainAlgorithm,
  ColorMapNames,
  StacItemCollection,
  TilerImageFormat,
  ImageRequest,
  RegisterMosaic,
  PixelSelection,
  TileMatrixSetId,
} from "./models.js";

export interface IngestionOperationsListQueryParamProperties {
  /** The number of items to return */
  $top?: number;
  /** The number of items to skip */
  $skip?: number;
  /** Operation id used to filter the results */
  collectionId?: string;
  /**
   * Operation status used to filter the results
   *
   * Possible values: "Pending", "Running", "Succeeded", "Canceled", "Canceling", "Failed"
   */
  status?: OperationStatus;
}

export interface IngestionOperationsListQueryParam {
  queryParameters?: IngestionOperationsListQueryParamProperties;
}

export type IngestionOperationsListParameters = IngestionOperationsListQueryParam &
  RequestParameters;
export type IngestionOperationsGetParameters = RequestParameters;
export type IngestionOperationsDeleteParameters = RequestParameters;
export type IngestionOperationsDeleteAllParameters = RequestParameters;

export interface IngestionRunsListQueryParamProperties {
  /** The number of items to return */
  $top?: number;
  /** The number of items to skip */
  $skip?: number;
}

export interface IngestionRunsListQueryParam {
  queryParameters?: IngestionRunsListQueryParamProperties;
}

export type IngestionRunsListParameters = IngestionRunsListQueryParam & RequestParameters;
export type IngestionRunsGetParameters = RequestParameters;
export type IngestionRunsCreateParameters = RequestParameters;

export interface IngestionsListQueryParamProperties {
  /** The number of items to return */
  $top?: number;
  /** The number of items to skip */
  $skip?: number;
}

export interface IngestionsListQueryParam {
  queryParameters?: IngestionsListQueryParamProperties;
}

export type IngestionsListParameters = IngestionsListQueryParam & RequestParameters;
export type IngestionsGetParameters = RequestParameters;

export interface IngestionsCreateBodyParam {
  /** Definition of the ingestion */
  body: Ingestion;
}

export type IngestionsCreateParameters = IngestionsCreateBodyParam & RequestParameters;
/** Ingestion properties to update */
export type IngestionResourceMergeAndPatch = Partial<Ingestion>;

export interface IngestionsUpdateBodyParam {
  /** Ingestion properties to update */
  body: IngestionResourceMergeAndPatch;
}

export interface IngestionsUpdateMediaTypesParam {
  /** Content type for PATCH request */
  contentType: "application/merge-patch+json";
}

export type IngestionsUpdateParameters = IngestionsUpdateMediaTypesParam &
  IngestionsUpdateBodyParam &
  RequestParameters;
export type IngestionsDeleteParameters = RequestParameters;

export interface IngestionSourcesListQueryParamProperties {
  /** The number of items to return */
  $top?: number;
  /** The number of items to skip */
  $skip?: number;
}

export interface IngestionSourcesListQueryParam {
  queryParameters?: IngestionSourcesListQueryParamProperties;
}

export type IngestionSourcesListParameters = IngestionSourcesListQueryParam & RequestParameters;
export type IngestionSourcesGetParameters = RequestParameters;

export interface IngestionSourcesCreateBodyParam {
  /** Definition of the ingestion source */
  body: IngestionSource;
}

export type IngestionSourcesCreateParameters = IngestionSourcesCreateBodyParam & RequestParameters;

export interface IngestionSourcesCreateOrReplaceBodyParam {
  /** Definition of the ingestion source */
  body: IngestionSource;
}

export type IngestionSourcesCreateOrReplaceParameters = IngestionSourcesCreateOrReplaceBodyParam &
  RequestParameters;
export type IngestionSourcesDeleteParameters = RequestParameters;
export type IngestionSourcesListManagedIdentitiesParameters = RequestParameters;

export interface StacCollectionAssetsCreateBodyParam {
  /** Multi-part form data */
  body: FormContent;
}

export interface StacCollectionAssetsCreateMediaTypesParam {
  /** Content type of the multipart form data request. */
  contentType: "multipart/form-data";
}

export type StacCollectionAssetsCreateParameters = StacCollectionAssetsCreateMediaTypesParam &
  StacCollectionAssetsCreateBodyParam &
  RequestParameters;

export interface StacCollectionAssetsCreateOrReplaceBodyParam {
  /** Multi-part form data */
  body: FormContent;
}

export interface StacCollectionAssetsCreateOrReplaceMediaTypesParam {
  /** Content type of the multipart form data request. */
  contentType: "multipart/form-data";
}

export type StacCollectionAssetsCreateOrReplaceParameters =
  StacCollectionAssetsCreateOrReplaceMediaTypesParam &
    StacCollectionAssetsCreateOrReplaceBodyParam &
    RequestParameters;
export type StacCollectionAssetsDeleteParameters = RequestParameters;
export type StacCollectionConfigGetParameters = RequestParameters;
export type StacCollectionMosaicsGetAllParameters = RequestParameters;

export interface StacCollectionMosaicsAddBodyParam {
  /** Mosaic definition to be created or updated. */
  body: StacMosaic;
}

export type StacCollectionMosaicsAddParameters = StacCollectionMosaicsAddBodyParam &
  RequestParameters;
export type StacCollectionMosaicsGetParameters = RequestParameters;

export interface StacCollectionMosaicsCreateOrReplaceBodyParam {
  /** Mosaic definition to be created or updated. */
  body: StacMosaic;
}

export type StacCollectionMosaicsCreateOrReplaceParameters =
  StacCollectionMosaicsCreateOrReplaceBodyParam & RequestParameters;
export type StacCollectionMosaicsDeleteParameters = RequestParameters;

export interface StacCollectionsGetAllQueryParamProperties {
  /**
   * Whether to sign asset URLs in the response.
   *
   * Possible values: "true", "false"
   */
  sign?: StacAssetUrlSigningMode;
  /** URL signature duration in minutes. */
  duration?: number;
}

export interface StacCollectionsGetAllQueryParam {
  queryParameters?: StacCollectionsGetAllQueryParamProperties;
}

export type StacCollectionsGetAllParameters = StacCollectionsGetAllQueryParam & RequestParameters;

export interface StacCollectionsCreateBodyParam {
  /** Request collection body */
  body: StacCollection;
}

export type StacCollectionsCreateParameters = StacCollectionsCreateBodyParam & RequestParameters;

export interface StacCollectionsGetQueryParamProperties {
  /**
   * Whether to sign asset URLs in the response.
   *
   * Possible values: "true", "false"
   */
  sign?: StacAssetUrlSigningMode;
  /** URL signature duration in minutes. */
  duration?: number;
}

export interface StacCollectionsGetQueryParam {
  queryParameters?: StacCollectionsGetQueryParamProperties;
}

export type StacCollectionsGetParameters = StacCollectionsGetQueryParam & RequestParameters;

export interface StacCollectionsCreateOrReplaceBodyParam {
  /** Request collection body */
  body: StacCollection;
}

export type StacCollectionsCreateOrReplaceParameters = StacCollectionsCreateOrReplaceBodyParam &
  RequestParameters;
export type StacCollectionsDeleteParameters = RequestParameters;
export type StacCollectionPartitionTypesGetParameters = RequestParameters;

export interface StacCollectionPartitionTypesReplaceBodyParam {
  /** Partition type configuration determining how items are partitioned in storage. */
  body: PartitionType;
}

export type StacCollectionPartitionTypesReplaceParameters =
  StacCollectionPartitionTypesReplaceBodyParam & RequestParameters;
export type StacCollectionRenderOptionsGetAllParameters = RequestParameters;

export interface StacCollectionRenderOptionsCreateBodyParam {
  /** Render option configuration to be created or updated. */
  body: RenderOption;
}

export type StacCollectionRenderOptionsCreateParameters =
  StacCollectionRenderOptionsCreateBodyParam & RequestParameters;
export type StacCollectionRenderOptionsGetParameters = RequestParameters;

export interface StacCollectionRenderOptionsCreateOrReplaceBodyParam {
  /** Render option configuration to be created or updated. */
  body: RenderOption;
}

export type StacCollectionRenderOptionsCreateOrReplaceParameters =
  StacCollectionRenderOptionsCreateOrReplaceBodyParam & RequestParameters;
export type StacCollectionRenderOptionsDeleteParameters = RequestParameters;
export type StacCollectionThumbnailsGetParameters = RequestParameters;
export type StacCollectionTileSettingsGetParameters = RequestParameters;

export interface StacCollectionTileSettingsReplaceBodyParam {
  /** Tile settings configuration to be updated. */
  body: TileSettings;
}

export type StacCollectionTileSettingsReplaceParameters =
  StacCollectionTileSettingsReplaceBodyParam & RequestParameters;
export type StacConformanceClassGetParameters = RequestParameters;

/** This is the wrapper object for the parameter `bbox` with explode set to false and style set to form. */
export interface StacItemsGetFeaturesBboxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface StacItemsGetFeaturesQueryParamProperties {
  /**
   * The optional limit parameter recommends the number of items that should be present in the response document.
   *
   * If the limit parameter value is greater than advertised limit maximum, the server must return the
   * maximum possible number of items, rather than responding with an error.
   *
   * Only items are counted that are on the first level of the collection in the response document.
   * Nested objects contained within the explicitly requested items must not be counted.
   *
   * Minimum = 1. Maximum = 10000. Default = 10.
   */
  limit?: number;
  /**
   * Only features that have a geometry that intersects the bounding box are selected.
   * The bounding box is provided as four or six numbers, depending on whether the
   * coordinate reference system includes a vertical axis (height or depth):
   *
   * - Lower left corner, coordinate axis 1
   * - Lower left corner, coordinate axis 2
   * - Minimum value, coordinate axis 3 (optional)
   * - Upper right corner, coordinate axis 1
   * - Upper right corner, coordinate axis 2
   * - Maximum value, coordinate axis 3 (optional)
   *
   * The coordinate reference system of the values is WGS 84 longitude/latitude
   * (http://www.opengis.net/def/crs/OGC/1.3/CRS84).
   *
   * For WGS 84 longitude/latitude the values are in most cases the sequence of
   * minimum longitude, minimum latitude, maximum longitude and maximum latitude.
   * However, in cases where the box spans the antimeridian the first value
   * (west-most box edge) is larger than the third value (east-most box edge).
   *
   * If the vertical axis is included, the third and the sixth number are
   * the bottom and the top of the 3-dimensional bounding box.
   *
   * If a feature has multiple spatial geometry properties, it is the decision of the
   * server whether only a single spatial geometry property is used to determine
   * the extent or all relevant geometries.
   */
  bbox?: string[] | StacItemsGetFeaturesBboxQueryParam;
  /**
   * Either a date-time or an interval, open or closed. Date and time expressions
   * adhere to RFC 3339. Open intervals are expressed using double-dots.
   *
   * Examples:
   *
   * - A date-time: "2018-02-12T23:20:50Z"
   * - A closed interval: "2018-02-12T00:00:00Z/2018-03-18T12:31:12Z"
   * - Open intervals: "2018-02-12T00:00:00Z/.." or "../2018-03-18T12:31:12Z"
   *
   * Only features that have a temporal property that intersects the value of
   * `datetime` are selected.
   *
   * If a feature has multiple temporal properties, it is the decision of the
   * server whether only a single temporal property is used to determine
   * the extent or all relevant temporal properties.
   */
  datetime?: string;
}

export interface StacItemsGetFeaturesQueryParam {
  queryParameters?: StacItemsGetFeaturesQueryParamProperties;
}

export type StacItemsGetFeaturesParameters = StacItemsGetFeaturesQueryParam & RequestParameters;
export type StacItemsGetParameters = RequestParameters;

export interface StacItemsCreateBodyParam {
  /**
   * STAC Item or StacItemCollection
   *
   * Represents a STAC Item or StacItemCollection as defined by the STAC 1.0.0 standard.
   *
   * **Item**: A GeoJSON Feature that represents a single spatiotemporal asset.
   * It includes metadata such as geometry, datetime, and links to related assets.
   * Example: A satellite image with its metadata.
   *
   * **StacItemCollection**: A GeoJSON FeatureCollection that contains multiple Items.
   * It is used to group multiple related Items together, such as a collection of satellite images.
   *
   * This union allows the request body to accept either a single Item or a collection of Items.
   */
  body: StacItemOrStacItemCollection;
}

export type StacItemsCreateParameters = StacItemsCreateBodyParam & RequestParameters;

export interface StacItemsCreateOrReplaceBodyParam {
  /** STAC Item */
  body: StacItem;
}

export type StacItemsCreateOrReplaceParameters = StacItemsCreateOrReplaceBodyParam &
  RequestParameters;
/** STAC Item */
export type StacItemResourceMergeAndPatch = Partial<StacItem>;

export interface StacItemsUpdateBodyParam {
  /** STAC Item */
  body: StacItemResourceMergeAndPatch;
}

export interface StacItemsUpdateMediaTypesParam {
  /** Content type for PATCH request */
  contentType: "application/merge-patch+json";
}

export type StacItemsUpdateParameters = StacItemsUpdateMediaTypesParam &
  StacItemsUpdateBodyParam &
  RequestParameters;
export type StacItemsDeleteParameters = RequestParameters;
export type StacLandingPagesGetParameters = RequestParameters;
export type StacQueryablesGetAllParameters = RequestParameters;
export type StacQueryablesDeleteParameters = RequestParameters;
export type StacQueryablesGetAllByCollectionParameters = RequestParameters;

export interface StacQueryablesCreateBodyParam {
  /** Request queryable definition body */
  body: Array<StacQueryable>;
}

export type StacQueryablesCreateParameters = StacQueryablesCreateBodyParam & RequestParameters;

export interface StacQueryablesCreateOrReplaceBodyParam {
  /** Request queryable definition body */
  body: StacQueryable;
}

export type StacQueryablesCreateOrReplaceParameters = StacQueryablesCreateOrReplaceBodyParam &
  RequestParameters;

/** This is the wrapper object for the parameter `collections` with explode set to false and style set to form. */
export interface StacSearchGetCollectionsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `ids` with explode set to false and style set to form. */
export interface StacSearchGetIdsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `bbox` with explode set to false and style set to form. */
export interface StacSearchGetBboxQueryParam {
  /** Value of the parameter */
  value: number[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface StacSearchGetQueryParamProperties {
  /** List of Collection IDs to include in the search. Only items in these collections will be searched. */
  collections?: string[] | StacSearchGetCollectionsQueryParam;
  /** Array of Item IDs to return specific items. */
  ids?: string[] | StacSearchGetIdsQueryParam;
  /** Bounding box for spatial filtering in format [west, south, east, north]. */
  bbox?: number[] | StacSearchGetBboxQueryParam;
  /** GeoJSON geometry for spatial filtering. */
  intersects?: string;
  /** Temporal filter in RFC 3339 format, can be a single time or range. */
  datetime?: string;
  /** Maximum number of results to return. */
  limit?: number;
  /**
   * Whether to sign asset URLs in the response.
   *
   * Possible values: "true", "false"
   */
  sign?: StacAssetUrlSigningMode;
  /** URL signature duration in minutes. */
  duration?: number;
  /** Property-based filtering expressed as a JSON object. */
  query?: string;
  /** Sort order for items. Format is property name prefixed with "+" for ascending or "-" for descending. */
  sortby?: string;
  /** Determines which fields to include in the response. Format is comma-separated field names with "-" prefix to exclude fields. */
  fields?: string;
  /** CQL filter expression for advanced filtering of items. */
  filter?: string;
  /** Pagination token for fetching the next set of results. */
  token?: string;
}

export interface StacSearchGetQueryParam {
  queryParameters?: StacSearchGetQueryParamProperties;
}

export type StacSearchGetParameters = StacSearchGetQueryParam & RequestParameters;

export interface StacSearchCreateBodyParam {
  /** Request body */
  body: StacSearchParameters;
}

export type StacSearchCreateParameters = StacSearchCreateBodyParam & RequestParameters;
export type TileMatrixDefinitionsGetParameters = RequestParameters;
export type TileMatrixListGetParameters = RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerAssetStatisticsGetAllAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `c` with explode set to false and style set to form. */
export interface TilerAssetStatisticsGetAllCQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `p` with explode set to false and style set to form. */
export interface TilerAssetStatisticsGetAllPQueryParam {
  /** Value of the parameter */
  value: number[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerAssetStatisticsGetAllAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerAssetStatisticsGetAllQueryParamProperties {
  /** Asset's names. */
  assets?: TilerAssetStatisticsGetAllAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerAssetStatisticsGetAllAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  max_size?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  c?: string[] | TilerAssetStatisticsGetAllCQueryParam;
  /** List of percentile values (default to [2, 98]). */
  p?: number[] | TilerAssetStatisticsGetAllPQueryParam;
  /**
   * Defines the number of equal-width bins in the given range (10, by default).
   *
   * If bins is a sequence (comma `,` delimited values), it defines a monotonically
   * increasing array of bin edges, including the rightmost edge, allowing for
   * non-uniform bin widths.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogram_bins?: string;
  /**
   * Comma `,` delimited range of the bins.
   *
   * The lower and upper range of the bins. If not provided, range is simply
   * (a.min(), a.max()).
   *
   * Values outside the range are ignored. The first element of the range must be
   * less than or equal to the second.
   * range affects the automatic bin computation as well.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogram_range?: string;
}

export interface TilerAssetStatisticsGetAllQueryParam {
  queryParameters?: TilerAssetStatisticsGetAllQueryParamProperties;
}

export type TilerAssetStatisticsGetAllParameters = TilerAssetStatisticsGetAllQueryParam &
  RequestParameters;
export type TilerAvailableAssetsGetAllParameters = RequestParameters;
export type TilerBoundGetAllParameters = RequestParameters;

export interface TilerGeoJsonsCropWidthByHeightFormatBodyParam {
  /** Request GeoJson body. */
  body: StacItem;
}

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerGeoJsonsCropWidthByHeightFormatAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerGeoJsonsCropWidthByHeightFormatAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerGeoJsonsCropWidthByHeightFormatRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerGeoJsonsCropWidthByHeightFormatQueryParamProperties {
  /** Asset's names. */
  assets?: TilerGeoJsonsCropWidthByHeightFormatAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerGeoJsonsCropWidthByHeightFormatAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  "coord-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  max_size?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerGeoJsonsCropWidthByHeightFormatRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerGeoJsonsCropWidthByHeightFormatQueryParam {
  queryParameters?: TilerGeoJsonsCropWidthByHeightFormatQueryParamProperties;
}

export type TilerGeoJsonsCropWidthByHeightFormatParameters =
  TilerGeoJsonsCropWidthByHeightFormatQueryParam &
    TilerGeoJsonsCropWidthByHeightFormatBodyParam &
    RequestParameters;

export interface TilerGeoJsonsCropFormatBodyParam {
  /** Request GeoJson body. */
  body: StacItem;
}

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerGeoJsonsCropFormatAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerGeoJsonsCropFormatAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerGeoJsonsCropFormatRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerGeoJsonsCropFormatQueryParamProperties {
  /** Asset's names. */
  assets?: TilerGeoJsonsCropFormatAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerGeoJsonsCropFormatAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  "coord-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  max_size?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerGeoJsonsCropFormatRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerGeoJsonsCropFormatQueryParam {
  queryParameters?: TilerGeoJsonsCropFormatQueryParamProperties;
}

export type TilerGeoJsonsCropFormatParameters = TilerGeoJsonsCropFormatQueryParam &
  TilerGeoJsonsCropFormatBodyParam &
  RequestParameters;

export interface TilerGeoJsonStatisticsGetAllBodyParam {
  /** Request GeoJson body */
  body: StacItemCollection;
}

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerGeoJsonStatisticsGetAllAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `c` with explode set to false and style set to form. */
export interface TilerGeoJsonStatisticsGetAllCQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `p` with explode set to false and style set to form. */
export interface TilerGeoJsonStatisticsGetAllPQueryParam {
  /** Value of the parameter */
  value: number[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerGeoJsonStatisticsGetAllAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerGeoJsonStatisticsGetAllQueryParamProperties {
  /** Asset's names. */
  assets?: TilerGeoJsonStatisticsGetAllAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerGeoJsonStatisticsGetAllAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  "coord-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  max_size?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  c?: string[] | TilerGeoJsonStatisticsGetAllCQueryParam;
  /** List of percentile values (default to [2, 98]). */
  p?: number[] | TilerGeoJsonStatisticsGetAllPQueryParam;
  /**
   * Defines the number of equal-width bins in the given range (10, by default).
   *
   * If bins is a sequence (comma `,` delimited values), it defines a monotonically
   * increasing array of bin edges, including the rightmost edge, allowing for
   * non-uniform bin widths.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogram_bins?: string;
  /**
   * Comma `,` delimited range of the bins.
   *
   * The lower and upper range of the bins. If not provided, range is simply
   * (a.min(), a.max()).
   *
   * Values outside the range are ignored. The first element of the range must be
   * less than or equal to the second.
   * range affects the automatic bin computation as well.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogram_range?: string;
}

export interface TilerGeoJsonStatisticsGetAllQueryParam {
  queryParameters?: TilerGeoJsonStatisticsGetAllQueryParamProperties;
}

export type TilerGeoJsonStatisticsGetAllParameters = TilerGeoJsonStatisticsGetAllQueryParam &
  TilerGeoJsonStatisticsGetAllBodyParam &
  RequestParameters;

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerInfoGeoJsonOperationsGetAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerInfoGeoJsonOperationsGetQueryParamProperties {
  /** Asset's names. */
  assets?: TilerInfoGeoJsonOperationsGetAssetsQueryParam;
}

export interface TilerInfoGeoJsonOperationsGetQueryParam {
  queryParameters?: TilerInfoGeoJsonOperationsGetQueryParamProperties;
}

export type TilerInfoGeoJsonOperationsGetParameters = TilerInfoGeoJsonOperationsGetQueryParam &
  RequestParameters;

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerInfoOperationsGetAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerInfoOperationsGetQueryParamProperties {
  /** Asset's names. */
  assets?: TilerInfoOperationsGetAssetsQueryParam;
}

export interface TilerInfoOperationsGetQueryParam {
  queryParameters?: TilerInfoOperationsGetQueryParamProperties;
}

export type TilerInfoOperationsGetParameters = TilerInfoOperationsGetQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerPartsGetCroppedToBoundingBoxWidthByHeightAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerPartsGetCroppedToBoundingBoxWidthByHeightAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerPartsGetCroppedToBoundingBoxWidthByHeightRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerPartsGetCroppedToBoundingBoxWidthByHeightQueryParamProperties {
  /** Asset's names. */
  assets?: TilerPartsGetCroppedToBoundingBoxWidthByHeightAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerPartsGetCroppedToBoundingBoxWidthByHeightAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** Output Coordinate Reference System. */
  "dst-crs"?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  "coord-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  max_size?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerPartsGetCroppedToBoundingBoxWidthByHeightRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerPartsGetCroppedToBoundingBoxWidthByHeightQueryParam {
  queryParameters?: TilerPartsGetCroppedToBoundingBoxWidthByHeightQueryParamProperties;
}

export type TilerPartsGetCroppedToBoundingBoxWidthByHeightParameters =
  TilerPartsGetCroppedToBoundingBoxWidthByHeightQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerPartsGetCroppedToBoundingBoxAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerPartsGetCroppedToBoundingBoxAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerPartsGetCroppedToBoundingBoxRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerPartsGetCroppedToBoundingBoxQueryParamProperties {
  /** Asset's names. */
  assets?: TilerPartsGetCroppedToBoundingBoxAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerPartsGetCroppedToBoundingBoxAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** Output Coordinate Reference System. */
  "dst-crs"?: string;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  "coord-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  max_size?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerPartsGetCroppedToBoundingBoxRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerPartsGetCroppedToBoundingBoxQueryParam {
  queryParameters?: TilerPartsGetCroppedToBoundingBoxQueryParamProperties;
}

export type TilerPartsGetCroppedToBoundingBoxParameters =
  TilerPartsGetCroppedToBoundingBoxQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerPointsGetPointAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerPointsGetPointAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerPointsGetPointQueryParamProperties {
  /** Asset's names. */
  assets?: TilerPointsGetPointAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerPointsGetPointAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  "coord-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
}

export interface TilerPointsGetPointQueryParam {
  queryParameters?: TilerPointsGetPointQueryParamProperties;
}

export type TilerPointsGetPointParameters = TilerPointsGetPointQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerPreviewsGetFormatAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerPreviewsGetFormatAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerPreviewsGetFormatRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerPreviewsGetFormatQueryParamProperties {
  /** Asset's names. */
  assets?: TilerPreviewsGetFormatAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerPreviewsGetFormatAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** Output Coordinate Reference System. */
  "dst-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  max_size?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerPreviewsGetFormatRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerPreviewsGetFormatQueryParam {
  queryParameters?: TilerPreviewsGetFormatQueryParamProperties;
}

export type TilerPreviewsGetFormatParameters = TilerPreviewsGetFormatQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerPreviewsGetAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerPreviewsGetAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerPreviewsGetRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerPreviewsGetQueryParamProperties {
  /** Asset's names. */
  assets?: TilerPreviewsGetAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerPreviewsGetAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Output format for the tile or image (e.g., png, jpeg, webp).
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  format?: TilerImageFormat;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** Output Coordinate Reference System. */
  "dst-crs"?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Image output size limit if width and height limits are not set. */
  max_size?: number;
  /** Height in pixels for the output image */
  height?: number;
  /** Width in pixels for the output image */
  width?: number;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerPreviewsGetRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerPreviewsGetQueryParam {
  queryParameters?: TilerPreviewsGetQueryParamProperties;
}

export type TilerPreviewsGetParameters = TilerPreviewsGetQueryParam & RequestParameters;

export interface TilerStaticImagesCreateBodyParam {
  /** Image request body */
  body: ImageRequest;
}

export type TilerStaticImagesCreateParameters = TilerStaticImagesCreateBodyParam &
  RequestParameters;
export type TilerStaticImagesGetParameters = RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerStatisticsGetAllAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `c` with explode set to false and style set to form. */
export interface TilerStatisticsGetAllCQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `p` with explode set to false and style set to form. */
export interface TilerStatisticsGetAllPQueryParam {
  /** Value of the parameter */
  value: number[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerStatisticsGetAllAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerStatisticsGetAllQueryParamProperties {
  /** Asset's names. */
  assets?: TilerStatisticsGetAllAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerStatisticsGetAllAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** Maximum dimension in pixels for the source data used to calculate statistics */
  max_size?: number;
  /** Return statistics for categorical dataset. */
  categorical?: boolean;
  /** List of pixel categorical values for which to report counts. */
  c?: string[] | TilerStatisticsGetAllCQueryParam;
  /** List of percentile values (default to [2, 98]). */
  p?: number[] | TilerStatisticsGetAllPQueryParam;
  /**
   * Defines the number of equal-width bins in the given range (10, by default).
   *
   * If bins is a sequence (comma `,` delimited values), it defines a monotonically
   * increasing array of bin edges, including the rightmost edge, allowing for
   * non-uniform bin widths.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogram_bins?: string;
  /**
   * Comma `,` delimited range of the bins.
   *
   * The lower and upper range of the bins. If not provided, range is simply
   * (a.min(), a.max()).
   *
   * Values outside the range are ignored. The first element of the range must be
   * less than or equal to the second.
   * range affects the automatic bin computation as well.
   *
   * link: https://numpy.org/doc/stable/reference/generated/numpy.histogram.html
   */
  histogram_range?: string;
}

export interface TilerStatisticsGetAllQueryParam {
  queryParameters?: TilerStatisticsGetAllQueryParamProperties;
}

export type TilerStatisticsGetAllParameters = TilerStatisticsGetAllQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerTileJsonTileMatrixSetsGetAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerTileJsonTileMatrixSetsGetAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerTileJsonTileMatrixSetsGetRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerTileJsonTileMatrixSetsGetQueryParamProperties {
  /** Asset's names. */
  assets?: TilerTileJsonTileMatrixSetsGetAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerTileJsonTileMatrixSetsGetAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerTileJsonTileMatrixSetsGetRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerTileJsonTileMatrixSetsGetQueryParam {
  queryParameters?: TilerTileJsonTileMatrixSetsGetQueryParamProperties;
}

export type TilerTileJsonTileMatrixSetsGetParameters = TilerTileJsonTileMatrixSetsGetQueryParam &
  RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerTileMatrixSetsGetZxyScaleByFormatAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `subdataset_bands` with explode set to false and style set to form. */
export interface TilerTileMatrixSetsGetZxyScaleByFormatSubdatasetBandsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerTileMatrixSetsGetZxyScaleByFormatAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerTileMatrixSetsGetZxyScaleByFormatRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerTileMatrixSetsGetZxyScaleByFormatQueryParamProperties {
  /** Asset's names. */
  assets?: TilerTileMatrixSetsGetZxyScaleByFormatAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerTileMatrixSetsGetZxyScaleByFormatAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerTileMatrixSetsGetZxyScaleByFormatRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
  /** The name of a subdataset within the asset. */
  subdataset_name?: string;
  /** The index of a subdataset band within the asset. */
  subdataset_bands?: string[] | TilerTileMatrixSetsGetZxyScaleByFormatSubdatasetBandsQueryParam;
}

export interface TilerTileMatrixSetsGetZxyScaleByFormatQueryParam {
  queryParameters?: TilerTileMatrixSetsGetZxyScaleByFormatQueryParamProperties;
}

export type TilerTileMatrixSetsGetZxyScaleByFormatParameters =
  TilerTileMatrixSetsGetZxyScaleByFormatQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerWmtsTileMatrixSetsGetCapabilitiesXmlAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerWmtsTileMatrixSetsGetCapabilitiesXmlAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerWmtsTileMatrixSetsGetCapabilitiesXmlRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerWmtsTileMatrixSetsGetCapabilitiesXmlQueryParamProperties {
  /** Asset's names. */
  assets?: TilerWmtsTileMatrixSetsGetCapabilitiesXmlAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerWmtsTileMatrixSetsGetCapabilitiesXmlAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Output image type. Default is png.
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerWmtsTileMatrixSetsGetCapabilitiesXmlRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerWmtsTileMatrixSetsGetCapabilitiesXmlQueryParam {
  queryParameters?: TilerWmtsTileMatrixSetsGetCapabilitiesXmlQueryParamProperties;
}

export type TilerWmtsTileMatrixSetsGetCapabilitiesXmlParameters =
  TilerWmtsTileMatrixSetsGetCapabilitiesXmlQueryParam & RequestParameters;

export interface MapsClassMapLegendsGetQueryParamProperties {
  /** Number of items to trim from the start of the cmap */
  trim_start?: number;
  /** Number of items to trim from the end of the cmap */
  trim_end?: number;
}

export interface MapsClassMapLegendsGetQueryParam {
  queryParameters?: MapsClassMapLegendsGetQueryParamProperties;
}

export type MapsClassMapLegendsGetParameters = MapsClassMapLegendsGetQueryParam & RequestParameters;

export interface MapsIntervalLegendsGetByClassMapNameQueryParamProperties {
  /** Number of items to trim from the start of the cmap */
  trim_start?: number;
  /** Number of items to trim from the end of the cmap */
  trim_end?: number;
}

export interface MapsIntervalLegendsGetByClassMapNameQueryParam {
  queryParameters?: MapsIntervalLegendsGetByClassMapNameQueryParamProperties;
}

export type MapsIntervalLegendsGetByClassMapNameParameters =
  MapsIntervalLegendsGetByClassMapNameQueryParam & RequestParameters;

export interface MapsLegendsGetQueryParamProperties {
  /** The output height of the legend image */
  height?: number;
  /** The output width of the legend image */
  width?: number;
  /** Number of items to trim from the start of the cmap */
  trim_start?: number;
  /** Number of items to trim from the end of the cmap */
  trim_end?: number;
}

export interface MapsLegendsGetQueryParam {
  queryParameters?: MapsLegendsGetQueryParamProperties;
}

export type MapsLegendsGetParameters = MapsLegendsGetQueryParam & RequestParameters;

export interface MosaicsAssetsForPointsGetPointAssetsQueryParamProperties {
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scan_limit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  items_limit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  time_limit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitwhenfull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipcovered?: boolean;
  /** Coordinate Reference System of the input coords. Default to `epsg:4326`. */
  "coord-crs"?: string;
}

export interface MosaicsAssetsForPointsGetPointAssetsQueryParam {
  queryParameters?: MosaicsAssetsForPointsGetPointAssetsQueryParamProperties;
}

export type MosaicsAssetsForPointsGetPointAssetsParameters =
  MosaicsAssetsForPointsGetPointAssetsQueryParam & RequestParameters;

export interface MosaicsAssetsForTileMatrixSetsGetZxyAssetsQueryParamProperties {
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scan_limit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  items_limit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  time_limit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitwhenfull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipcovered?: boolean;
}

export interface MosaicsAssetsForTileMatrixSetsGetZxyAssetsQueryParam {
  queryParameters?: MosaicsAssetsForTileMatrixSetsGetZxyAssetsQueryParamProperties;
}

export type MosaicsAssetsForTileMatrixSetsGetZxyAssetsParameters =
  MosaicsAssetsForTileMatrixSetsGetZxyAssetsQueryParam & RequestParameters;
export type MosaicsInfoSearchGetParameters = RequestParameters;

export interface MosaicsRegisterSearchRegisterBodyParam {
  body: RegisterMosaic;
}

export type MosaicsRegisterSearchRegisterParameters = MosaicsRegisterSearchRegisterBodyParam &
  RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface MosaicsTileMatrixSetsTileJsonGetAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface MosaicsTileMatrixSetsTileJsonGetAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface MosaicsTileMatrixSetsTileJsonGetRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface MosaicsTileMatrixSetsTileJsonGetQueryParamProperties {
  /** Asset's names. */
  assets?: MosaicsTileMatrixSetsTileJsonGetAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | MosaicsTileMatrixSetsTileJsonGetAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scan_limit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  items_limit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  time_limit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitwhenfull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipcovered?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** STAC Collection ID */
  collection?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /**
   * Pixel selection method.
   *
   * Possible values: "first", "highest", "lowest", "mean", "median", "stdev", "lastbandlow", "lastbandhight"
   */
  pixel_selection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: MosaicsTileMatrixSetsTileJsonGetRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface MosaicsTileMatrixSetsTileJsonGetQueryParam {
  queryParameters?: MosaicsTileMatrixSetsTileJsonGetQueryParamProperties;
}

export type MosaicsTileMatrixSetsTileJsonGetParameters =
  MosaicsTileMatrixSetsTileJsonGetQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface MosaicsTileMatrixSetsGetZxyScaleByFormatAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface MosaicsTileMatrixSetsGetZxyScaleByFormatAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface MosaicsTileMatrixSetsGetZxyScaleByFormatRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface MosaicsTileMatrixSetsGetZxyScaleByFormatQueryParamProperties {
  /** Asset's names. */
  assets?: MosaicsTileMatrixSetsGetZxyScaleByFormatAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | MosaicsTileMatrixSetsGetZxyScaleByFormatAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scan_limit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  items_limit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  time_limit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitwhenfull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipcovered?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** STAC Collection ID */
  collection?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /**
   * Pixel selection method.
   *
   * Possible values: "first", "highest", "lowest", "mean", "median", "stdev", "lastbandlow", "lastbandhight"
   */
  pixel_selection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: MosaicsTileMatrixSetsGetZxyScaleByFormatRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface MosaicsTileMatrixSetsGetZxyScaleByFormatQueryParam {
  queryParameters?: MosaicsTileMatrixSetsGetZxyScaleByFormatQueryParamProperties;
}

export type MosaicsTileMatrixSetsGetZxyScaleByFormatParameters =
  MosaicsTileMatrixSetsGetZxyScaleByFormatQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlQueryParamProperties {
  /** Asset's names. */
  assets?: MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Output image type. Default is png.
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlQueryParam {
  queryParameters?: MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlQueryParamProperties;
}

export type MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlParameters =
  MosaicsWmtsMosaicsTileMatrixSetsGetCapabilitiesXmlQueryParam & RequestParameters;

export interface SasGetTokenQueryParamProperties {
  /** The duration, in minutes, that the SAS token will be valid. Only valid for approved users. */
  duration?: number;
}

export interface SasGetTokenQueryParam {
  queryParameters?: SasGetTokenQueryParamProperties;
}

export type SasGetTokenParameters = SasGetTokenQueryParam & RequestParameters;

export interface SasRevokeTokenQueryParamProperties {
  /** The duration, in minutes, that the SAS token will be valid. Only valid for approved users. */
  duration?: number;
}

export interface SasRevokeTokenQueryParam {
  queryParameters?: SasRevokeTokenQueryParamProperties;
}

export type SasRevokeTokenParameters = SasRevokeTokenQueryParam & RequestParameters;

export interface SasGetSignQueryParamProperties {
  /** HREF (URL) to sign */
  href: string;
  /** The duration, in minutes, that the SAS token will be valid. Only valid for approved users. */
  duration?: number;
}

export interface SasGetSignQueryParam {
  queryParameters: SasGetSignQueryParamProperties;
}

export type SasGetSignParameters = SasGetSignQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerTilesGetZxyScaleByFormatAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `subdataset_bands` with explode set to false and style set to form. */
export interface TilerTilesGetZxyScaleByFormatSubdatasetBandsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerTilesGetZxyScaleByFormatAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerTilesGetZxyScaleByFormatRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerTilesGetZxyScaleByFormatQueryParamProperties {
  /** Asset's names. */
  assets?: TilerTilesGetZxyScaleByFormatAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerTilesGetZxyScaleByFormatAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   *
   * Possible values: "CanadianNAD83_LCC", "EuropeanETRS89_LAEAQuad", "LINZAntarticaMapTilegrid", "NZTM2000Quad", "UPSAntarcticWGS84Quad", "UPSArcticWGS84Quad", "UTM31WGS84Quad", "WGS1984Quad", "WebMercatorQuad", "WorldCRS84Quad", "WorldMercatorWGS84Quad"
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerTilesGetZxyScaleByFormatRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
  /** The name of a subdataset within the asset. */
  subdataset_name?: string;
  /** The index of a subdataset band within the asset. */
  subdataset_bands?: string[] | TilerTilesGetZxyScaleByFormatSubdatasetBandsQueryParam;
}

export interface TilerTilesGetZxyScaleByFormatQueryParam {
  queryParameters?: TilerTilesGetZxyScaleByFormatQueryParamProperties;
}

export type TilerTilesGetZxyScaleByFormatParameters = TilerTilesGetZxyScaleByFormatQueryParam &
  RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerTileJsonOperationsGetAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerTileJsonOperationsGetAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerTileJsonOperationsGetRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerTileJsonOperationsGetQueryParamProperties {
  /** Asset's names. */
  assets?: TilerTileJsonOperationsGetAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerTileJsonOperationsGetAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   *
   * Possible values: "CanadianNAD83_LCC", "EuropeanETRS89_LAEAQuad", "LINZAntarticaMapTilegrid", "NZTM2000Quad", "UPSAntarcticWGS84Quad", "UPSArcticWGS84Quad", "UTM31WGS84Quad", "WGS1984Quad", "WebMercatorQuad", "WorldCRS84Quad", "WorldMercatorWGS84Quad"
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerTileJsonOperationsGetRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerTileJsonOperationsGetQueryParam {
  queryParameters?: TilerTileJsonOperationsGetQueryParamProperties;
}

export type TilerTileJsonOperationsGetParameters = TilerTileJsonOperationsGetQueryParam &
  RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface TilerWmtsGetCapabilitiesXmlAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface TilerWmtsGetCapabilitiesXmlAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface TilerWmtsGetCapabilitiesXmlRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface TilerWmtsGetCapabilitiesXmlQueryParamProperties {
  /** Asset's names. */
  assets?: TilerWmtsGetCapabilitiesXmlAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | TilerWmtsGetCapabilitiesXmlAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   *
   * Possible values: "CanadianNAD83_LCC", "EuropeanETRS89_LAEAQuad", "LINZAntarticaMapTilegrid", "NZTM2000Quad", "UPSAntarcticWGS84Quad", "UPSArcticWGS84Quad", "UTM31WGS84Quad", "WGS1984Quad", "WebMercatorQuad", "WorldCRS84Quad", "WorldMercatorWGS84Quad"
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Output image type. Default is png.
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: TilerWmtsGetCapabilitiesXmlRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface TilerWmtsGetCapabilitiesXmlQueryParam {
  queryParameters?: TilerWmtsGetCapabilitiesXmlQueryParamProperties;
}

export type TilerWmtsGetCapabilitiesXmlParameters = TilerWmtsGetCapabilitiesXmlQueryParam &
  RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface MosaicsTilesGetZxyScaleByFormatAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface MosaicsTilesGetZxyScaleByFormatAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface MosaicsTilesGetZxyScaleByFormatRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface MosaicsTilesGetZxyScaleByFormatQueryParamProperties {
  /** Asset's names. */
  assets?: MosaicsTilesGetZxyScaleByFormatAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | MosaicsTilesGetZxyScaleByFormatAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scan_limit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  items_limit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  time_limit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitwhenfull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipcovered?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   *
   * Possible values: "CanadianNAD83_LCC", "EuropeanETRS89_LAEAQuad", "LINZAntarticaMapTilegrid", "NZTM2000Quad", "UPSAntarcticWGS84Quad", "UPSArcticWGS84Quad", "UTM31WGS84Quad", "WGS1984Quad", "WebMercatorQuad", "WorldCRS84Quad", "WorldMercatorWGS84Quad"
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** STAC Collection ID */
  collection?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /**
   * Pixel selection method.
   *
   * Possible values: "first", "highest", "lowest", "mean", "median", "stdev", "lastbandlow", "lastbandhight"
   */
  pixel_selection?: PixelSelection;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: MosaicsTilesGetZxyScaleByFormatRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface MosaicsTilesGetZxyScaleByFormatQueryParam {
  queryParameters?: MosaicsTilesGetZxyScaleByFormatQueryParamProperties;
}

export type MosaicsTilesGetZxyScaleByFormatParameters = MosaicsTilesGetZxyScaleByFormatQueryParam &
  RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface MosaicsTileJsonOperationsGetAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface MosaicsTileJsonOperationsGetAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface MosaicsTileJsonOperationsGetRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface MosaicsTileJsonOperationsGetQueryParamProperties {
  /** Asset's names. */
  assets?: MosaicsTileJsonOperationsGetAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | MosaicsTileJsonOperationsGetAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scan_limit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  items_limit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  time_limit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitwhenfull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipcovered?: boolean;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default: 'WebMercatorQuad').
   *
   * Possible values: "CanadianNAD83_LCC", "EuropeanETRS89_LAEAQuad", "LINZAntarticaMapTilegrid", "NZTM2000Quad", "UPSAntarcticWGS84Quad", "UPSArcticWGS84Quad", "UTM31WGS84Quad", "WGS1984Quad", "WebMercatorQuad", "WorldCRS84Quad", "WorldMercatorWGS84Quad"
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Default will be automatically defined if the output image needs a mask (png) or
   * not (jpeg).
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: number;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /** STAC Collection ID */
  collection?: string;
  /**
   * Resampling method
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /**
   * Pixel selection method.
   *
   * Possible values: "first", "highest", "lowest", "mean", "median", "stdev", "lastbandlow", "lastbandhight"
   */
  pixel_selection?: PixelSelection;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: MosaicsTileJsonOperationsGetRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface MosaicsTileJsonOperationsGetQueryParam {
  queryParameters?: MosaicsTileJsonOperationsGetQueryParamProperties;
}

export type MosaicsTileJsonOperationsGetParameters = MosaicsTileJsonOperationsGetQueryParam &
  RequestParameters;

/** This is the wrapper object for the parameter `asset_bidx` with explode set to false and style set to form. */
export interface MosaicsWmtsMosaicsGetCapabilitiesXmlAssetBidxQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `assets` with explode set to true and style set to form. */
export interface MosaicsWmtsMosaicsGetCapabilitiesXmlAssetsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `rescale` with explode set to true and style set to form. */
export interface MosaicsWmtsMosaicsGetCapabilitiesXmlRescaleQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: true;
  /** Style of the value */
  style: "form";
}

export interface MosaicsWmtsMosaicsGetCapabilitiesXmlQueryParamProperties {
  /** Asset's names. */
  assets?: MosaicsWmtsMosaicsGetCapabilitiesXmlAssetsQueryParam;
  /** Band math expression between assets */
  expression?: string;
  /** Per asset band indexes (coma separated indexes) */
  asset_bidx?: string[] | MosaicsWmtsMosaicsGetCapabilitiesXmlAssetBidxQueryParam;
  /** Asset as Band */
  asset_as_band?: boolean;
  /** Overwrite internal Nodata value */
  nodata?: number;
  /** Apply internal Scale or Offset */
  unscale?: boolean;
  /**
   * Terrain algorithm name
   *
   * Possible values: "hillshade", "contours", "normalizedIndex", "terrarium", "terrainrgb"
   */
  algorithm?: TerrainAlgorithm;
  /** Terrain algorithm parameters */
  algorithm_params?: string;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   *
   * Possible values: "CanadianNAD83_LCC", "EuropeanETRS89_LAEAQuad", "LINZAntarticaMapTilegrid", "NZTM2000Quad", "UPSAntarcticWGS84Quad", "UPSArcticWGS84Quad", "UTM31WGS84Quad", "WGS1984Quad", "WebMercatorQuad", "WorldCRS84Quad", "WorldMercatorWGS84Quad"
   */
  tileMatrixSetId?: TileMatrixSetId;
  /**
   * Output image type. Default is png.
   *
   * Possible values: "png", "npy", "tif", "jpeg", "jpg", "jp2", "webp", "pngraw"
   */
  tile_format?: TilerImageFormat;
  /** Tile scale factor affecting output size. Values > 1 produce larger tiles (e.g., 1=256x256, 2=512x512). */
  tile_scale?: number;
  /** Overwrite default minzoom. */
  minzoom?: number;
  /** Overwrite default maxzoom. */
  maxzoom?: number;
  /**
   * Buffer on each side of the given tile. It must be a multiple of `0.5`. Output
   * **tilesize** will be expanded to `tilesize + 2 * buffer` (e.g 0.5 = 257x257,
   * 1.0 = 258x258).
   */
  buffer?: string;
  /** rio-color formula (info: https://github.com/mapbox/rio-color) */
  color_formula?: string;
  /**
   * Resampling method.
   *
   * Possible values: "nearest", "bilinear", "cubic", "cubic_spline", "lanczos", "average", "mode", "gauss", "rms"
   */
  resampling?: Resampling;
  /** comma (',') delimited Min,Max range. Can set multiple time for multiple bands. */
  rescale?: MosaicsWmtsMosaicsGetCapabilitiesXmlRescaleQueryParam;
  /**
   * Colormap name
   *
   * Possible values: "accent", "accent_r", "afmhot", "afmhot_r", "ai4g-lulc", "alos-fnf", "alos-palsar-mask", "autumn", "autumn_r", "binary", "binary_r", "blues", "blues_r", "bone", "bone_r", "brbg", "brbg_r", "brg", "brg_r", "bugn", "bugn_r", "bupu", "bupu_r", "bwr", "bwr_r", "c-cap", "cfastie", "chesapeake-lc-13", "chesapeake-lc-7", "chesapeake-lu", "chloris-biomass", "cividis", "cividis_r", "cmrmap", "cmrmap_r", "cool", "cool_r", "coolwarm", "coolwarm_r", "copper", "copper_r", "cubehelix", "cubehelix_r", "dark2", "dark2_r", "drcog-lulc", "esa-cci-lc", "esa-worldcover", "flag", "flag_r", "gap-lulc", "gist_earth", "gist_earth_r", "gist_gray", "gist_gray_r", "gist_heat", "gist_heat_r", "gist_ncar", "gist_ncar_r", "gist_rainbow", "gist_rainbow_r", "gist_stern", "gist_stern_r", "gist_yarg", "gist_yarg_r", "gnbu", "gnbu_r", "gnuplot", "gnuplot2", "gnuplot2_r", "gnuplot_r", "gray", "gray_r", "greens", "greens_r", "greys", "greys_r", "hot", "hot_r", "hsv", "hsv_r", "inferno", "inferno_r", "io-bii", "io-lulc", "io-lulc-9-class", "jet", "jet_r", "jrc-change", "jrc-extent", "jrc-occurrence", "jrc-recurrence", "jrc-seasonality", "jrc-transitions", "lidar-classification", "lidar-hag", "lidar-hag-alternative", "lidar-intensity", "lidar-returns", "magma", "magma_r", "modis-10A1", "modis-10A2", "modis-13A1|Q1", "modis-14A1|A2", "modis-15A2H|A3H", "modis-16A3GF-ET", "modis-16A3GF-PET", "modis-17A2H|A2HGF", "modis-17A3HGF", "modis-64A1", "mtbs-severity", "nipy_spectral", "nipy_spectral_r", "nrcan-lulc", "ocean", "ocean_r", "oranges", "oranges_r", "orrd", "orrd_r", "paired", "paired_r", "pastel1", "pastel1_r", "pastel2", "pastel2_r", "pink", "pink_r", "piyg", "piyg_r", "plasma", "plasma_r", "prgn", "prgn_r", "prism", "prism_r", "pubu", "pubu_r", "pubugn", "pubugn_r", "puor", "puor_r", "purd", "purd_r", "purples", "purples_r", "qpe", "rainbow", "rainbow_r", "rdbu", "rdbu_r", "rdgy", "rdgy_r", "rdpu", "rdpu_r", "rdylbu", "rdylbu_r", "rdylgn", "rdylgn_r", "reds", "reds_r", "rplumbo", "schwarzwald", "seismic", "seismic_r", "set1", "set1_r", "set2", "set2_r", "set3", "set3_r", "spectral", "spectral_r", "spring", "spring_r", "summer", "summer_r", "tab10", "tab10_r", "tab20", "tab20_r", "tab20b", "tab20b_r", "tab20c", "tab20c_r", "terrain", "terrain_r", "twilight", "twilight_r", "twilight_shifted", "twilight_shifted_r", "usda-cdl", "usda-cdl-corn", "usda-cdl-cotton", "usda-cdl-soybeans", "usda-cdl-wheat", "usgs-lcmap", "viirs-10a1", "viirs-13a1", "viirs-14a1", "viirs-15a2H", "viridis", "viridis_r", "winter", "winter_r", "wistia", "wistia_r", "ylgn", "ylgn_r", "ylgnbu", "ylgnbu_r", "ylorbr", "ylorbr_r", "ylorrd", "ylorrd_r"
   */
  colormap_name?: ColorMapNames;
  /** JSON encoded custom Colormap */
  colormap?: string;
  /** Add mask to the output data. */
  return_mask?: boolean;
}

export interface MosaicsWmtsMosaicsGetCapabilitiesXmlQueryParam {
  queryParameters?: MosaicsWmtsMosaicsGetCapabilitiesXmlQueryParamProperties;
}

export type MosaicsWmtsMosaicsGetCapabilitiesXmlParameters =
  MosaicsWmtsMosaicsGetCapabilitiesXmlQueryParam & RequestParameters;

export interface MosaicsAssetsForTilesGetZxyAssetsQueryParamProperties {
  /** Return as soon as we scan N items (defaults to 10000 in PgSTAC). */
  scan_limit?: number;
  /** Return as soon as we have N items per geometry (defaults to 100 in PgSTAC). */
  items_limit?: number;
  /** Return after N seconds to avoid long requests (defaults to 5 in PgSTAC). */
  time_limit?: number;
  /** Return as soon as the geometry is fully covered (defaults to True in PgSTAC). */
  exitwhenfull?: boolean;
  /**
   * Skip any items that would show up completely under the previous items (defaults
   * to True in PgSTAC).
   */
  skipcovered?: boolean;
  /**
   * Identifier selecting one of the TileMatrixSetId supported (default:
   * 'WebMercatorQuad')
   *
   * Possible values: "CanadianNAD83_LCC", "EuropeanETRS89_LAEAQuad", "LINZAntarticaMapTilegrid", "NZTM2000Quad", "UPSAntarcticWGS84Quad", "UPSArcticWGS84Quad", "UTM31WGS84Quad", "WGS1984Quad", "WebMercatorQuad", "WorldCRS84Quad", "WorldMercatorWGS84Quad"
   */
  tileMatrixSetId?: TileMatrixSetId;
}

export interface MosaicsAssetsForTilesGetZxyAssetsQueryParam {
  queryParameters?: MosaicsAssetsForTilesGetZxyAssetsQueryParamProperties;
}

export type MosaicsAssetsForTilesGetZxyAssetsParameters =
  MosaicsAssetsForTilesGetZxyAssetsQueryParam & RequestParameters;
