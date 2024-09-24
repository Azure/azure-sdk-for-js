// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ErrorResponseOutput,
  MapTilesetOutput,
  MapAttributionOutput,
  CopyrightCaptionOutput,
  CopyrightOutput,
} from "./outputModels";

export interface RenderGetMapTile200Headers {
  /** The content-type for the response. */
  "content-type"?: string;
}

/**
 * **
 *
 * The `Get Map Tiles` API is an HTTP `GET` request that allows users to request map tiles in vector or raster formats, typically to be integrated into a map control or SDK. Some example tiles that can be requested are Azure Maps road tiles, real-time  Weather Radar tiles or the map tiles created using [Azure Maps Creator](https://aka.ms/amcreator). By default, Azure Maps uses vector tiles for its web map control ([Web SDK](/azure/azure-maps/about-azure-maps#web-sdk)) and [Android SDK](/azure/azure-maps/about-azure-maps#android-sdk).
 */
export interface RenderGetMapTile200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & RenderGetMapTile200Headers;
}

/**
 * **
 *
 * The `Get Map Tiles` API is an HTTP `GET` request that allows users to request map tiles in vector or raster formats, typically to be integrated into a map control or SDK. Some example tiles that can be requested are Azure Maps road tiles, real-time  Weather Radar tiles or the map tiles created using [Azure Maps Creator](https://aka.ms/amcreator). By default, Azure Maps uses vector tiles for its web map control ([Web SDK](/azure/azure-maps/about-azure-maps#web-sdk)) and [Android SDK](/azure/azure-maps/about-azure-maps#android-sdk).
 */
export interface RenderGetMapTileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **
 *
 * The `Get Map Tileset` API is an HTTP `GET` request allows users to request [metadata](#maptileset) for a tileset.
 */
export interface RenderGetMapTileset200Response extends HttpResponse {
  status: "200";
  body: MapTilesetOutput;
}

/**
 * **
 *
 * The `Get Map Tileset` API is an HTTP `GET` request allows users to request [metadata](#maptileset) for a tileset.
 */
export interface RenderGetMapTilesetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Map Attribution` API is an HTTP `GET` request that returns map copyright attribution information for a section of a tileset as defined by the four bounding box coordinates and zoom level.
 */
export interface RenderGetMapAttribution200Response extends HttpResponse {
  status: "200";
  body: MapAttributionOutput;
}

/**
 *
 * The `Get Map Attribution` API is an HTTP `GET` request that returns map copyright attribution information for a section of a tileset as defined by the four bounding box coordinates and zoom level.
 */
export interface RenderGetMapAttributionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface RenderGetMapStateTile200Headers {
  /** The content-type for the response. */
  "content-type"?: string;
}

/**
 *
 * The `Get Map State Tile` API is an HTTP `GET` request that fetches state tiles in vector format, typically to be integrated into the indoor maps module of a map control or SDK. The map control calls this API after dynamic styling is turned on. For more information, see [Zoom Levels and Tile Grid](/azure/azure-maps/zoom-levels-and-tile-grid).
 */
export interface RenderGetMapStateTile200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & RenderGetMapStateTile200Headers;
}

/**
 *
 * The `Get Map State Tile` API is an HTTP `GET` request that fetches state tiles in vector format, typically to be integrated into the indoor maps module of a map control or SDK. The map control calls this API after dynamic styling is turned on. For more information, see [Zoom Levels and Tile Grid](/azure/azure-maps/zoom-levels-and-tile-grid).
 */
export interface RenderGetMapStateTileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Copyright Caption` API is an HTTP `GET` request designed to serve copyright information to be use in conjunction with tiles requested from the Render service. In addition to a basic copyright for the whole map, it can serve specific groups of copyrights for some countries/regions.
 *
 * As an alternative to copyrights for map request, one can receive captions for displaying the map provider information on the map.
 */
export interface RenderGetCopyrightCaption200Response extends HttpResponse {
  status: "200";
  body: CopyrightCaptionOutput;
}

/**
 *
 * The `Get Copyright Caption` API is an HTTP `GET` request designed to serve copyright information to be use in conjunction with tiles requested from the Render service. In addition to a basic copyright for the whole map, it can serve specific groups of copyrights for some countries/regions.
 *
 * As an alternative to copyrights for map request, one can receive captions for displaying the map provider information on the map.
 */
export interface RenderGetCopyrightCaptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface RenderGetMapStaticImage200Headers {
  /** The content-type for the response. */
  "content-type"?: string;
}

/**
 *
 * The supported resolution range for the map image is from 1x1 to 8192x8192. If you are deciding when to use the static image service over the map tile service, you may want to consider how you would like to interact with the rendered map. If the map contents will be relatively unchanging, a static map is a good choice. If you want to support a lot of zooming, panning and changing of the map content, the map tile service would be a better choice.
 *
 * Service also provides Image Composition functionality to get a static image back with additional data like; pushpins and geometry overlays with following capabilities.
 *
 * - Specify multiple pushpin styles
 * - Render circle, polyline and polygon geometry types.
 *
 * Please see [How-to-Guide](https://aka.ms/AzureMapsHowToGuideImageCompositor) for detailed examples.
 *
 * _Note_ : Either **center** or **bbox** parameter must be supplied to the
 * API.
 * <br><br>
 * The supported Lat and Lon ranges when using the **bbox** parameter, are as follows:
 * <br><br>
 *
 *   |Zoom Level | Max Lon Range   | Max Lat Range|
 *   |:----------|:----------------|:-------------|
 *   |0          | 360.0           | 170.0        |
 *   |1          | 360.0           | 170.0        |
 *   |2          | 360.0           | 170.0        |
 *   |3          | 360.0           | 170.0        |
 *   |4          | 360.0           | 170.0        |
 *   |5          | 180.0           | 85.0         |
 *   |6          | 90.0            | 42.5         |
 *   |7          | 45.0            | 21.25        |
 *   |8          | 22.5            | 10.625       |
 *   |9          | 11.25           | 5.3125       |
 *   |10         | 5.625           | 2.62625      |
 *   |11         | 2.8125          | 1.328125     |
 *   |12         | 1.40625         | 0.6640625    |
 *   |13         | 0.703125        | 0.33203125   |
 *   |14         | 0.3515625       | 0.166015625  |
 *   |15         | 0.17578125      | 0.0830078125 |
 *   |16         | 0.087890625     | 0.0415039063 |
 *   |17         | 0.0439453125    | 0.0207519531 |
 *   |18         | 0.0219726563    | 0.0103759766 |
 *   |19         | 0.0109863281    | 0.0051879883 |
 *   |20         | 0.0054931641    | 0.0025939941 |
 */
export interface RenderGetMapStaticImage200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & RenderGetMapStaticImage200Headers;
}

/**
 *
 * The supported resolution range for the map image is from 1x1 to 8192x8192. If you are deciding when to use the static image service over the map tile service, you may want to consider how you would like to interact with the rendered map. If the map contents will be relatively unchanging, a static map is a good choice. If you want to support a lot of zooming, panning and changing of the map content, the map tile service would be a better choice.
 *
 * Service also provides Image Composition functionality to get a static image back with additional data like; pushpins and geometry overlays with following capabilities.
 *
 * - Specify multiple pushpin styles
 * - Render circle, polyline and polygon geometry types.
 *
 * Please see [How-to-Guide](https://aka.ms/AzureMapsHowToGuideImageCompositor) for detailed examples.
 *
 * _Note_ : Either **center** or **bbox** parameter must be supplied to the
 * API.
 * <br><br>
 * The supported Lat and Lon ranges when using the **bbox** parameter, are as follows:
 * <br><br>
 *
 *   |Zoom Level | Max Lon Range   | Max Lat Range|
 *   |:----------|:----------------|:-------------|
 *   |0          | 360.0           | 170.0        |
 *   |1          | 360.0           | 170.0        |
 *   |2          | 360.0           | 170.0        |
 *   |3          | 360.0           | 170.0        |
 *   |4          | 360.0           | 170.0        |
 *   |5          | 180.0           | 85.0         |
 *   |6          | 90.0            | 42.5         |
 *   |7          | 45.0            | 21.25        |
 *   |8          | 22.5            | 10.625       |
 *   |9          | 11.25           | 5.3125       |
 *   |10         | 5.625           | 2.62625      |
 *   |11         | 2.8125          | 1.328125     |
 *   |12         | 1.40625         | 0.6640625    |
 *   |13         | 0.703125        | 0.33203125   |
 *   |14         | 0.3515625       | 0.166015625  |
 *   |15         | 0.17578125      | 0.0830078125 |
 *   |16         | 0.087890625     | 0.0415039063 |
 *   |17         | 0.0439453125    | 0.0207519531 |
 *   |18         | 0.0219726563    | 0.0103759766 |
 *   |19         | 0.0109863281    | 0.0051879883 |
 *   |20         | 0.0054931641    | 0.0025939941 |
 */
export interface RenderGetMapStaticImageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * Bounding-box requests should specify the minimum and maximum longitude and latitude (EPSG-3857) coordinates
 */
export interface RenderGetCopyrightFromBoundingBox200Response
  extends HttpResponse {
  status: "200";
  body: CopyrightOutput;
}

/**
 *
 * Bounding-box requests should specify the minimum and maximum longitude and latitude (EPSG-3857) coordinates
 */
export interface RenderGetCopyrightFromBoundingBoxDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * In addition to basic copyright for the whole map, API is serving  specific groups of copyrights for some countries/regions.
 * Returns the copyright information for a given tile. To obtain the copyright information for a particular tile, the request should specify the tile's zoom level and x and y coordinates (see: Zoom Levels and Tile Grid).
 */
export interface RenderGetCopyrightForTile200Response extends HttpResponse {
  status: "200";
  body: CopyrightOutput;
}

/**
 *
 * In addition to basic copyright for the whole map, API is serving  specific groups of copyrights for some countries/regions.
 * Returns the copyright information for a given tile. To obtain the copyright information for a particular tile, the request should specify the tile's zoom level and x and y coordinates (see: Zoom Levels and Tile Grid).
 */
export interface RenderGetCopyrightForTileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * In addition to basic copyright for the whole map, API is serving specific groups of copyrights for some countries/regions.
 * To obtain the default copyright information for the whole world, do not specify a tile or bounding box.
 */
export interface RenderGetCopyrightForWorld200Response extends HttpResponse {
  status: "200";
  body: CopyrightOutput;
}

/**
 *
 * In addition to basic copyright for the whole map, API is serving specific groups of copyrights for some countries/regions.
 * To obtain the default copyright information for the whole world, do not specify a tile or bounding box.
 */
export interface RenderGetCopyrightForWorldDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
