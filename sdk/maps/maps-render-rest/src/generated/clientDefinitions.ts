// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RenderGetMapTileParameters,
  RenderGetMapTilesetParameters,
  RenderGetMapAttributionParameters,
  RenderGetMapStateTileParameters,
  RenderGetCopyrightCaptionParameters,
  RenderGetMapStaticImageParameters,
  RenderGetCopyrightFromBoundingBoxParameters,
  RenderGetCopyrightForTileParameters,
  RenderGetCopyrightForWorldParameters
} from "./parameters";
import {
  RenderGetMapTile200Response,
  RenderGetMapTileDefaultResponse,
  RenderGetMapTileset200Response,
  RenderGetMapTilesetDefaultResponse,
  RenderGetMapAttribution200Response,
  RenderGetMapAttributionDefaultResponse,
  RenderGetMapStateTile200Response,
  RenderGetMapStateTileDefaultResponse,
  RenderGetCopyrightCaption200Response,
  RenderGetCopyrightCaptionDefaultResponse,
  RenderGetMapStaticImage200Response,
  RenderGetMapStaticImageDefaultResponse,
  RenderGetCopyrightFromBoundingBox200Response,
  RenderGetCopyrightFromBoundingBoxDefaultResponse,
  RenderGetCopyrightForTile200Response,
  RenderGetCopyrightForTileDefaultResponse,
  RenderGetCopyrightForWorld200Response,
  RenderGetCopyrightForWorldDefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetMapTile {
  /**
   *
   * The `Get Map Tiles` API in an HTTP GET request that allows users to request map tiles in vector or raster formats typically to be integrated  into a map control or SDK. Some example tiles that can be requested are Azure Maps road tiles, real-time  Weather Radar tiles or the map tiles created using [Azure Maps Creator](https://aka.ms/amcreator). By default,  Azure Maps uses vector tiles for its web map control ([Web SDK](/azure/azure-maps/about-azure-maps#web-sdk)) and [Android SDK](/azure/azure-maps/about-azure-maps#android-sdk).
   */
  get(
    options: RenderGetMapTileParameters
  ): StreamableMethod<
    RenderGetMapTile200Response | RenderGetMapTileDefaultResponse
  >;
}

export interface GetMapTileset {
  /**
   *
   * The Get Map Tileset API allows users to request metadata for a tileset.
   */
  get(
    options: RenderGetMapTilesetParameters
  ): StreamableMethod<
    RenderGetMapTileset200Response | RenderGetMapTilesetDefaultResponse
  >;
}

export interface GetMapAttribution {
  /**
   *
   * The `Get Map Attribution` API allows users to request map copyright attribution information for a section of a tileset.
   */
  get(
    options: RenderGetMapAttributionParameters
  ): StreamableMethod<
    RenderGetMapAttribution200Response | RenderGetMapAttributionDefaultResponse
  >;
}

export interface GetMapStateTile {
  /**
   *
   * Fetches state tiles in vector format typically to be integrated into indoor maps module of map control or SDK. The map control will call this API after user turns on dynamic styling. For more information, see [Zoom Levels and Tile Grid](/azure/location-based-services/zoom-levels-and-tile-grid).
   */
  get(
    options: RenderGetMapStateTileParameters
  ): StreamableMethod<
    RenderGetMapStateTile200Response | RenderGetMapStateTileDefaultResponse
  >;
}

export interface GetCopyrightCaption {
  /**
   *
   * The `Get Copyright Caption` API is an HTTP GET request designed to serve copyright information to be used with tiles requested from the Render service. In addition to a basic copyright for the whole map, it can serve specific groups of copyrights for some countries/regions.
   *
   * As an alternative to copyrights for map request, it can also return captions for displaying provider information on the map.
   */
  get(
    options?: RenderGetCopyrightCaptionParameters
  ): StreamableMethod<
    | RenderGetCopyrightCaption200Response
    | RenderGetCopyrightCaptionDefaultResponse
  >;
}

export interface GetMapStaticImage {
  /**
   * This rendering API produces static, rasterized map views of a user-defined area. It's suitable for lightweight web applications, when the desired user experience doesn't require interactive map controls, or when bandwidth is limited. This API is also useful for embedding maps in applications outside of the browser, in backend services, report generation, or desktop applications.
   *
   *  This API includes parameters for basic data visualization:
   *
   * - Labeled pushpins in multiple styles.
   * - Render circle, path, and polygon geometry types.
   *
   * For more information and detailed examples, see [Render custom data on a raster map](/azure/azure-maps/how-to-render-custom-data).
   * <br><br>
   * The dimensions of the bbox parameter are constrained, depending on the zoom level. This ensures the resulting image has an appropriate level of detail.
   * <br><br>
   *
   *   |Zoom Level | Min Lon Range   | Max Lon Range   | Min Lat Range| Max Lat Range|
   *   |:----------|:----------------|:----------------|:----------------|:-------------|
   *   |0          | 56.25     | 360.0       | 30.1105585173    | 180.0        |
   *   |1          | 28.125         | 360.0       | 14.87468995    | 180.0        |
   *   |2         | 14.063       | 351.5625      |  7.4130741851    | 137.9576312246       |
   *   |3     | 7.03125     | 175.78125    |  3.7034501005    |   73.6354071932     |
   *   |4     | 3.515625    | 87.890625  | 1.8513375155  | 35.4776115315  |
   *   |5          | 1.7578125  | 43.9453125  | 0.925620264 | 17.4589959239  |
   *   |6       | 0.87890625 | 21.97265625 | 0.4628040687  | 8.6907788223  |
   *   |7      | 0.439453125 |  10.986328125 | 0.2314012764  | 4.3404320789 |
   *   |8       | 0.2197265625 | 5.4931640625 | 0.1157005434  | 2.1695927024  |
   *   |9      | 0.1098632812 | 2.7465820312  |  0.0578502599  | 1.0847183194  |
   *   |10    | 0.0549316406  | 1.3732910156 | 0.0289251285  | 0.5423494021  |
   *   |11     | 0.0274658203 | 0.6866455078 | 0.014462564 | 0.2711734813 |
   *   |12      |  0.0137329102  | 0.3433227539 | 0.007231282 | 0.1355865882  |
   *   |13    | 0.0068664551 | 0.171661377 | 0.003615641 | 0.067793275 |
   *   |14     |  0.0034332275  | 0.0858306885 | 0.0018078205 | 0.0338966351 |
   *   |15     |  0.0017166138 | 0.0429153442 | 0.0009039102 | 0.0169483173 |
   *   |16   |  0.0008583069  | 0.0214576721  |  0.0004519551  | 0.0084741586 |
   *   |17  | 0.0004291534 |  0.0107288361  |  0.0002259776 | 0.0042370793 |
   *   |18    | 0.0002145767 | 0.005364418 | 0.0001129888 | 0.0021185396 |
   *   |19    | 0.0001072884  |  0.002682209  | 5.64944E-05 | 0.0010592698 |
   *   |20    |  5.36442E-05  | 0.0013411045 | 2.82472E-05  | 0.0005296349 |
   *
   * _Note_ : Either **center** or **bbox** parameter must be supplied to the API.
   */
  get(
    options?: RenderGetMapStaticImageParameters
  ): StreamableMethod<
    RenderGetMapStaticImage200Response | RenderGetMapStaticImageDefaultResponse
  >;
}

export interface GetCopyrightFromBoundingBox {
  /**
   *
   * Returns copyright information for a given bounding box. Bounding-box requests should specify the minimum and maximum longitude and latitude (EPSG-3857) coordinates
   */
  get(
    options: RenderGetCopyrightFromBoundingBoxParameters
  ): StreamableMethod<
    | RenderGetCopyrightFromBoundingBox200Response
    | RenderGetCopyrightFromBoundingBoxDefaultResponse
  >;
}

export interface GetCopyrightForTile {
  /**
   *
   * To obtain the copyright information for a particular tile, the request should specify the tile's zoom level and x and y coordinates. For more information, see [Zoom Levels and Tile Grid](/azure/azure-maps/zoom-levels-and-tile-grid).
   *
   * Copyrights API is designed to serve copyright information for Render service. In addition to basic copyright for the whole map, API is serving specific groups of copyrights for some countries/regions.
   */
  get(
    options: RenderGetCopyrightForTileParameters
  ): StreamableMethod<
    | RenderGetCopyrightForTile200Response
    | RenderGetCopyrightForTileDefaultResponse
  >;
}

export interface GetCopyrightForWorld {
  /**
   *
   * Returns the copyright information for the world. To obtain the default copyright information for the whole world, don't specify a tile or bounding box.
   *
   * Copyrights API is designed to serve copyright information for Render service. In addition to basic copyright for the whole map, API is serving specific groups of copyrights for some countries/regions.
   */
  get(
    options?: RenderGetCopyrightForWorldParameters
  ): StreamableMethod<
    | RenderGetCopyrightForWorld200Response
    | RenderGetCopyrightForWorldDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/map/tile' has methods for the following verbs: get */
  (path: "/map/tile"): GetMapTile;
  /** Resource for '/map/tileset' has methods for the following verbs: get */
  (path: "/map/tileset"): GetMapTileset;
  /** Resource for '/map/attribution' has methods for the following verbs: get */
  (path: "/map/attribution"): GetMapAttribution;
  /** Resource for '/map/statetile' has methods for the following verbs: get */
  (path: "/map/statetile"): GetMapStateTile;
  /** Resource for '/map/copyright/caption/\{format\}' has methods for the following verbs: get */
  (
    path: "/map/copyright/caption/{format}",
    format: "json" | "xml"
  ): GetCopyrightCaption;
  /** Resource for '/map/static' has methods for the following verbs: get */
  (path: "/map/static"): GetMapStaticImage;
  /** Resource for '/map/copyright/bounding/\{format\}' has methods for the following verbs: get */
  (
    path: "/map/copyright/bounding/{format}",
    format: "json" | "xml"
  ): GetCopyrightFromBoundingBox;
  /** Resource for '/map/copyright/tile/\{format\}' has methods for the following verbs: get */
  (
    path: "/map/copyright/tile/{format}",
    format: "json" | "xml"
  ): GetCopyrightForTile;
  /** Resource for '/map/copyright/world/\{format\}' has methods for the following verbs: get */
  (
    path: "/map/copyright/world/{format}",
    format: "json" | "xml"
  ): GetCopyrightForWorld;
}

export type MapsRenderClient = Client & {
  path: Routes;
};
