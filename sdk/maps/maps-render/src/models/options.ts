// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { BoundingBox, LatLon } from "./models";
import {
  IncludeText,
  LocalizedMapView,
  MapImageStyle,
  MapTileSize,
  StaticMapLayer,
} from "../generated/models";

/**
 * Client options used to configure the Maps Render Client
 */
export type MapsRenderClientOptions = CommonClientOptions;

/**
 * Options for get map tile
 */
export interface GetMapTileOptions extends OperationOptions {
  /**
   * The desired date and time of the requested tile. This parameter must be specified in the standard date-time format (e.g. 2019-11-14T16:03:00-08:00), as defined by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). This parameter is only supported when tilesetId parameter is set to one of the values below.
   *
   * * microsoft.weather.infrared.main: We provide tiles up to 3 hours in the past. Tiles are available in 10-minute intervals. We round the timeStamp value to the nearest 10-minute time frame.
   * * microsoft.weather.radar.main: We provide tiles up to 1.5 hours in the past and up to 2 hours in the future. Tiles are available in 5-minute intervals. We round the timeStamp value to the nearest 5-minute time frame.
   */
  timeStamp?: Date;
  /** The size of the returned map tile in pixels. */
  tileSize?: MapTileSize;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries have different views of such regions, and the View parameter allows your application to comply with the view required by the country your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  localizedMapView?: LocalizedMapView;
}

/**
 * Options for get map tileset
 */
export interface GetMapTilesetOptions extends OperationOptions {}

/**
 * Options for get attribution
 */
export interface GetAttributionOptions extends OperationOptions {}

/**
 * Options for get state tile
 */
export interface GetMapStateTileOptions extends OperationOptions {}

/**
 * Options for get copyright caption
 */
export interface GetCopyrightCaptionOptions extends OperationOptions {}

/**
 * Options for get static image
 */
export interface GetMapStaticImageOptions extends OperationOptions {
  /**
   * Language in which search results should be returned.
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions.
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  localizedMapView?: LocalizedMapView;
  /** Map layer requested. If layer is set to labels or hybrid, the format should be png. */
  layer?: StaticMapLayer;
  /** Map style to be returned. Possible values are main and dark. */
  style?: MapImageStyle;
  /** Desired zoom level of the map. Zoom value must be in the range: 0-20 (inclusive). Default value is 12. */
  zoom?: number;
  /**
   * Coordinates of the center point.
   * Note: Either center or boundingBox are required parameters. They are
   * mutually exclusive.
   */
  center?: LatLon;
  /**
   * Bounding box
   *
   * Note: Either boundingBox or center are required
   * parameters. They are mutually exclusive. It shouldn’t be used with
   * height or width.
   */
  boundingBox?: BoundingBox;
  /**
   * Height of the resulting image in pixels. Range is 1 to 8192. Default is 512. It shouldn’t be used with boundingBox.
   */
  height?: number;
  /** Width of the resulting image in pixels. Range is 1 to 8192. Default is 512. It shouldn’t be used with boundingBox. */
  width?: number;
  /**
   * Pushpin style and instances. Use this parameter to optionally add pushpins to the image.
   * Please refer to [Render V2 - Get Map Static Image](https://docs.microsoft.com/rest/api/maps/render-v2/get-map-static-image) for details.
   */
  pins?: string[];
  /**
   * Path style and locations. Use this parameter to optionally add lines, polygons or circles to the image.
   * Please refer to [Render V2 - Get Map Static Image](https://docs.microsoft.com/rest/api/maps/render-v2/get-map-static-image) for details.
   */
  path?: string[];
}

/**
 * Options for get copyright
 */
export interface GetCopyrightOptions extends OperationOptions {
  /** Yes/no value to exclude textual data from response. Only images and country names will be in response. */
  includeText?: IncludeText;
}
