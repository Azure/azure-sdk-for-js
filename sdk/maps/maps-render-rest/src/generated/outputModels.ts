// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, unknown>;
}

/** Metadata for a tileset in the TileJSON format. */
export interface MapTilesetOutput {
  /** Describes the version of the TileJSON spec that is implemented by this JSON object. */
  tilejson: string;
  /** A name describing the tileset. The name can contain any legal character. Implementations SHOULD NOT interpret the name as HTML. */
  name?: string;
  /** Text description of the tileset. The description can contain any legal character. Implementations SHOULD NOT interpret the description as HTML. */
  description?: string;
  /** A semver.org style version number for the tiles contained within the tileset. When changes across tiles are introduced, the minor version MUST change. */
  version?: string;
  /** Copyright attribution to be displayed on the map. Implementations MAY decide to treat this as HTML or literal text. For security reasons, make absolutely sure that this field can't be abused as a vector for XSS or beacon tracking. */
  attribution?: string;
  /** A mustache template to be used to format data from grids for interaction. */
  template?: string;
  /** A legend to be displayed with the map. Implementations MAY decide to treat this as HTML or literal text. For security reasons, make absolutely sure that this field can't be abused as a vector for XSS or beacon tracking. */
  legend?: string;
  /** Default: "xyz". Either "xyz" or "tms". Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed. */
  scheme?: string;
  /** An array of tile endpoints. If multiple endpoints are specified, clients may use any combination of endpoints. All endpoints MUST return the same content for the same URL. The array MUST contain at least one endpoint. */
  tiles: Array<string>;
  /** An array of interactivity endpoints. */
  grids?: Array<string>;
  /** An array of data files in GeoJSON format. */
  data?: Array<string>;
  /** The minimum zoom level. */
  minzoom?: number;
  /** The maximum zoom level. */
  maxzoom?: number;
  /** The maximum extent of available map tiles. Bounds MUST define an area covered by all zoom levels. The bounds are represented in WGS:84 latitude and longitude values, in the order left, bottom, right, top. Values may be integers or floating point numbers. */
  bounds?: Array<number>;
  /** The default location of the tileset in the form [longitude, latitude, zoom]. The zoom level MUST be between minzoom and maxzoom. Implementations can use this value to set the default location. */
  center?: Array<number>;
}

/** Copyright attribution for the requested section of a tileset. */
export interface MapAttributionOutput {
  /** A list of copyright strings. */
  copyrights: Array<string>;
}

/** This object is returned from a successful copyright call */
export interface CopyrightCaptionOutput {
  /** Format Version property */
  formatVersion?: string;
  /** Copyrights Caption property */
  copyrightsCaption: string;
}

/** This object is returned from a successful copyright request */
export interface CopyrightOutput {
  /** Format Version property */
  formatVersion?: string;
  /** General Copyrights array */
  generalCopyrights?: Array<string>;
  /** Regions array */
  regions?: Array<RegionCopyrightsOutput>;
}

export interface RegionCopyrightsOutput {
  /** Copyrights array */
  copyrights: Array<string>;
  /** Country property */
  country: RegionCopyrightsCountryOutput;
}

/** Country property */
export interface RegionCopyrightsCountryOutput {
  /** ISO3 property */
  ISO3: string;
  /** Label property */
  label: string;
}
