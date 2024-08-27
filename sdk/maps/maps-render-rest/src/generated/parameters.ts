// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";

export interface RenderGetMapTileQueryParamProperties {
  /** A tileset is a collection of raster or vector data broken up into a uniform grid of square tiles at preset  zoom levels. Every tileset has a **tilesetId** to use when making requests. The **tilesetId** for tilesets created using [Azure Maps Creator](https://aka.ms/amcreator) are generated through the  [Tileset Create API](https://docs.microsoft.com/rest/api/maps-creator/tileset). The ready-to-use tilesets supplied  by Azure Maps are listed below. For example, microsoft.base. */
  tilesetId:
    | "microsoft.base"
    | "microsoft.base.labels"
    | "microsoft.base.hybrid"
    | "microsoft.terra.main"
    | "microsoft.base.road"
    | "microsoft.base.darkgrey"
    | "microsoft.base.labels.road"
    | "microsoft.base.labels.darkgrey"
    | "microsoft.base.hybrid.road"
    | "microsoft.base.hybrid.darkgrey"
    | "microsoft.imagery"
    | "microsoft.weather.radar.main"
    | "microsoft.weather.infrared.main"
    | "microsoft.traffic.absolute"
    | "microsoft.traffic.absolute.main"
    | "microsoft.traffic.relative"
    | "microsoft.traffic.relative.main"
    | "microsoft.traffic.relative.dark"
    | "microsoft.traffic.delay"
    | "microsoft.traffic.delay.main"
    | "microsoft.traffic.reduced.main"
    | "microsoft.traffic.incident";
  /**
   * Zoom level for the desired tile.
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  zoom: number;
  /**
   * X coordinate of the tile on zoom grid. Value must be in the range [0, 2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  x: number;
  /**
   * Y coordinate of the tile on zoom grid. Value must be in the range [0, 2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  y: number;
  /**
   * The desired date and time of the requested tile. This parameter must be specified in the standard date-time format (e.g. 2019-11-14T16:03:00-08:00), as defined by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). This parameter is only supported when tilesetId parameter is set to one of the values below.
   *
   * * microsoft.weather.infrared.main: We provide tiles up to 3 hours in the past. Tiles are available in 10-minute intervals. We round the timeStamp value to the nearest 10-minute time frame.
   * * microsoft.weather.radar.main: We provide tiles up to 1.5 hours in the past and up to 2 hours in the future. Tiles are available in 5-minute intervals. We round the timeStamp value to the nearest 5-minute time frame.
   */
  timeStamp?: Date | string;
  /** The size of the returned map tile in pixels. */
  tileSize?: "256" | "512";
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
}

export interface RenderGetMapTileQueryParam {
  queryParameters: RenderGetMapTileQueryParamProperties;
}

export type RenderGetMapTileParameters = RenderGetMapTileQueryParam &
  RequestParameters;

export interface RenderGetMapTilesetQueryParamProperties {
  /** A tileset is a collection of raster or vector data broken up into a uniform grid of square tiles at preset  zoom levels. Every tileset has a **tilesetId** to use when making requests. The **tilesetId** for tilesets created using [Azure Maps Creator](https://aka.ms/amcreator) are generated through the  [Tileset Create API](https://docs.microsoft.com/rest/api/maps-creator/tileset). The ready-to-use tilesets supplied  by Azure Maps are listed below. For example, microsoft.base. */
  tilesetId:
    | "microsoft.base"
    | "microsoft.base.labels"
    | "microsoft.base.hybrid"
    | "microsoft.terra.main"
    | "microsoft.base.road"
    | "microsoft.base.darkgrey"
    | "microsoft.base.labels.road"
    | "microsoft.base.labels.darkgrey"
    | "microsoft.base.hybrid.road"
    | "microsoft.base.hybrid.darkgrey"
    | "microsoft.imagery"
    | "microsoft.weather.radar.main"
    | "microsoft.weather.infrared.main"
    | "microsoft.traffic.absolute"
    | "microsoft.traffic.absolute.main"
    | "microsoft.traffic.relative"
    | "microsoft.traffic.relative.main"
    | "microsoft.traffic.relative.dark"
    | "microsoft.traffic.delay"
    | "microsoft.traffic.delay.main"
    | "microsoft.traffic.reduced.main"
    | "microsoft.traffic.incident";
}

export interface RenderGetMapTilesetQueryParam {
  queryParameters: RenderGetMapTilesetQueryParamProperties;
}

export type RenderGetMapTilesetParameters = RenderGetMapTilesetQueryParam &
  RequestParameters;

export interface RenderGetMapAttributionQueryParamProperties {
  /** A tileset is a collection of raster or vector data broken up into a uniform grid of square tiles at preset  zoom levels. Every tileset has a **tilesetId** to use when making requests. The **tilesetId** for tilesets created using [Azure Maps Creator](https://aka.ms/amcreator) are generated through the  [Tileset Create API](https://docs.microsoft.com/rest/api/maps-creator/tileset). The ready-to-use tilesets supplied  by Azure Maps are listed below. For example, microsoft.base. */
  tilesetId:
    | "microsoft.base"
    | "microsoft.base.labels"
    | "microsoft.base.hybrid"
    | "microsoft.terra.main"
    | "microsoft.base.road"
    | "microsoft.base.darkgrey"
    | "microsoft.base.labels.road"
    | "microsoft.base.labels.darkgrey"
    | "microsoft.base.hybrid.road"
    | "microsoft.base.hybrid.darkgrey"
    | "microsoft.imagery"
    | "microsoft.weather.radar.main"
    | "microsoft.weather.infrared.main"
    | "microsoft.traffic.absolute"
    | "microsoft.traffic.absolute.main"
    | "microsoft.traffic.relative"
    | "microsoft.traffic.relative.main"
    | "microsoft.traffic.relative.dark"
    | "microsoft.traffic.delay"
    | "microsoft.traffic.delay.main"
    | "microsoft.traffic.reduced.main"
    | "microsoft.traffic.incident";
  /** Zoom level for the desired map attribution. */
  zoom: number;
  /** The string that represents the rectangular area of a bounding box. The bounds parameter is defined by the 4 bounding box coordinates, with WGS84 longitude and latitude of the southwest corner followed by  WGS84 longitude and latitude of the northeast corner. The string is presented in the following  format: `[SouthwestCorner_Longitude, SouthwestCorner_Latitude, NortheastCorner_Longitude,  NortheastCorner_Latitude]`. */
  bounds: Array<number>;
}

export interface RenderGetMapAttributionQueryParam {
  queryParameters: RenderGetMapAttributionQueryParamProperties;
}

export type RenderGetMapAttributionParameters = RenderGetMapAttributionQueryParam &
  RequestParameters;

export interface RenderGetMapStateTileQueryParamProperties {
  /**
   * Zoom level for the desired tile.
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  zoom: number;
  /**
   * X coordinate of the tile on zoom grid. Value must be in the range [0, 2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  x: number;
  /**
   * Y coordinate of the tile on zoom grid. Value must be in the range [0, 2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  y: number;
  /** The stateset id. */
  statesetId: string;
}

export interface RenderGetMapStateTileQueryParam {
  queryParameters: RenderGetMapStateTileQueryParamProperties;
}

export type RenderGetMapStateTileParameters = RenderGetMapStateTileQueryParam &
  RequestParameters;
export type RenderGetCopyrightCaptionParameters = RequestParameters;

export interface RenderGetMapStaticImageQueryParamProperties {
  /** Map style to be returned. Possible values are microsoft.base.road, microsoft.base.darkgrey, and microsoft.imagery.  Default value is set to be microsoft.base.road. For more information, see [Render TilesetId](https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tileset?view=rest-maps-2023-06-01&tabs=HTTP#tilesetid). */
  tilesetId?:
    | "microsoft.base"
    | "microsoft.base.labels"
    | "microsoft.base.hybrid"
    | "microsoft.terra.main"
    | "microsoft.base.road"
    | "microsoft.base.darkgrey"
    | "microsoft.base.labels.road"
    | "microsoft.base.labels.darkgrey"
    | "microsoft.base.hybrid.road"
    | "microsoft.base.hybrid.darkgrey"
    | "microsoft.imagery"
    | "microsoft.weather.radar.main"
    | "microsoft.weather.infrared.main"
    | "microsoft.traffic.absolute"
    | "microsoft.traffic.absolute.main"
    | "microsoft.traffic.relative"
    | "microsoft.traffic.relative.main"
    | "microsoft.traffic.relative.dark"
    | "microsoft.traffic.delay"
    | "microsoft.traffic.delay.main"
    | "microsoft.traffic.reduced.main"
    | "microsoft.traffic.incident";
  /** Optional Value, indicating no traffic flow overlaid on the image result. Possible values are microsoft.traffic.relative.main and none. Default value is none, indicating no traffic flow returned. If traffic related tilesetId is provided, will return map image with corresponding traffic layer. For more information, see [Render TilesetId](https://learn.microsoft.com/en-us/rest/api/maps/render/get-map-tileset?view=rest-maps-2023-06-01&tabs=HTTP#tilesetid). */
  trafficLayer?: "microsoft.traffic.relative.main" | "none";
  /** Desired zoom level of the map. Support zoom value range from 0-20 (inclusive) for tilesetId being microsoft.base.road or microsoft.base.darkgrey. Support zoom value range from 0-19 (inclusive) for tilesetId being microsoft.imagery. Default value is 12.<br><br>For more information, see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid). */
  zoom?: number;
  /**
   * Coordinates of the center point in double. Format: 'lon,lat'. Longitude range: -180 to 180. Latitude range: -90 to 90.
   *
   * Note: Either center or bbox are required parameters. They are
   * mutually exclusive.
   */
  center?: Array<number>;
  /**
   * A bounding box is defined by two latitudes and two longitudes that represent the four sides of a rectangular area on the Earth. Format : 'minLon, minLat,
   * maxLon, maxLat' (in double).
   *
   * Note: Either bbox or center are required
   * parameters. They are mutually exclusive. bbox shouldn’t be used with
   * height or width.
   *
   * The maximum and minimum allowed ranges for Lat and Lon are defined for each zoom level
   * in the table at the top of this page.
   */
  bbox?: Array<number>;
  /**
   * Height of the resulting image in pixels. Range from 80 to 1500. Default
   * is 512. It shouldn’t be used with bbox.
   */
  height?: number;
  /** Width of the resulting image in pixels. Range from 80 to 2000. Default is 512. It should not be used with bbox. */
  width?: number;
  /**
   * Language in which search results should be returned. Should be one of supported IETF language tags, case insensitive. When data in specified language is not available for a specific field, default language is used.
   *
   * Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details.
   */
  language?: string;
  /**
   * The View parameter (also called the "user region" parameter) allows you to show the correct maps for a certain country/region for geopolitically disputed regions. Different countries/regions have different views of such regions, and the View parameter allows your application to comply with the view required by the country/region your application will be serving. By default, the View parameter is set to “Unified” even if you haven’t defined it in  the request. It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. Alternatively, you have the option to set ‘View=Auto’, which will return the map data based on the IP  address of the request. The View parameter in Azure Maps must be used in compliance with applicable laws, including those  regarding mapping, of the country/region where maps, images and other data and third party content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
   *
   * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and to see the available Views.
   */
  view?:
    | "AE"
    | "AR"
    | "BH"
    | "IN"
    | "IQ"
    | "JO"
    | "KW"
    | "LB"
    | "MA"
    | "OM"
    | "PK"
    | "PS"
    | "QA"
    | "SA"
    | "SY"
    | "YE"
    | "Auto"
    | "Unified";
  /**
   * Pushpin style and instances. Use this parameter to optionally add pushpins to the image.
   * The pushpin style describes the appearance of the pushpins, and the instances specify
   * the coordinates of the pushpins (in double) and optional labels for each pin. (Be sure to properly URL-encode values of this
   * parameter since it will contain reserved characters such as pipes and punctuation.)
   *
   * The Azure Maps account S0 SKU only supports a single instance of the pins parameter and the number of locations is limited to 5 per pin. Other SKUs
   * allow up to 25 instances of the pins parameter to specify multiple pin styles, and the number of locations is limited to 50 per pin.
   *
   * To render a pushpin at latitude 45°N and longitude 122°W using the default built-in pushpin style, add the
   * querystring parameter
   *
   * `pins=default||-122 45`
   *
   * Note that the longitude comes before the latitude.
   * After URL encoding this will look like
   *
   * `pins=default%7C%7C-122+45`
   *
   * All of the examples here show the pins
   * parameter without URL encoding, for clarity.
   *
   * To render a pin at multiple locations, separate each location with a pipe character. For example, use
   *
   * `pins=default||-122 45|-119.5 43.2|-121.67 47.12`
   *
   * The S0 Azure Maps account SKU only allows five pushpins. Other account SKUs do not have this limitation.
   *
   * ### Style Modifiers
   *
   * You can modify the appearance of the pins by adding style modifiers. These are added after the style but before
   * the locations and labels. Style modifiers each have a two-letter name. These abbreviated names are used to help
   * reduce the length of the URL.
   *
   * To change the color of the pushpin, use the 'co' style modifier and specify the color using the HTML/CSS RGB color
   * format which is a six-digit hexadecimal number (the three-digit form is not supported). For example, to use
   * a deep pink color which you would specify as #FF1493 in CSS, use
   *
   * `pins=default|coFF1493||-122 45`
   *
   * ### Pushpin Labels
   *
   * To add a label to the pins, put the label in single quotes just before the coordinates. Avoid using special character such as `|` or `||` in label. For example, to label
   * three pins with the values '1', '2', and '3', use
   *
   * `pins=default||'1'-122 45|'2'-119.5 43.2|'3'-121.67 47.12`
   *
   * There is a built-in pushpin style called 'none' that does not display a pushpin image. You can use this if
   * you want to display labels without any pin image. For example,
   *
   * `pins=none||'A'-122 45|'B'-119.5 43.2`
   *
   * To change the color of the pushpin labels, use the 'lc' label color style modifier. For example, to use pink
   * pushpins with black labels, use
   *
   * `pins=default|coFF1493|lc000000||-122 45`
   *
   * To change the size of the labels, use the 'ls' label size style modifier. The label size represents the approximate
   * height of the label text in pixels. For example, to increase the label size to 12, use
   *
   * `pins=default|ls12||'A'-122 45|'B'-119 43`
   *
   * The labels are centered at the pushpin 'label anchor.' The anchor location is predefined for built-in pushpins and
   * is at the top center of custom pushpins (see below). To override the label anchor, using the 'la' style modifier
   * and provide X and Y pixel coordinates for the anchor. These coordinates are relative to the top left corner of the
   * pushpin image. Positive X values move the anchor to the right, and positive Y values move the anchor down. For example,
   * to position the label anchor 10 pixels right and 4 pixels above the top left corner of the pushpin image,
   * use
   *
   * `pins=default|la10 -4||'A'-122 45|'B'-119 43`
   *
   * ### Custom Pushpins
   *
   * To use a custom pushpin image, use the word 'custom' as the pin style name, and then specify a URL after the
   * location and label information. The maximum allowed size for a customized label image is 65,536 pixels. Use two pipe characters to indicate that you're done specifying locations and are
   * starting the URL. For example,
   *
   * `pins=custom||-122 45||http://contoso.com/pushpins/red.png`
   *
   * After URL encoding, this would look like
   *
   * `pins=custom%7C%7C-122+45%7C%7Chttp%3A%2F%2Fcontoso.com%2Fpushpins%2Fred.png`
   *
   * By default, custom pushpin images are drawn centered at the pin coordinates. This usually isn't ideal as it obscures
   * the location that you're trying to highlight. To override the anchor location of the pin image, use the 'an'
   * style modifier. This uses the same format as the 'la' label anchor style modifier. For example, if your custom
   * pin image has the tip of the pin at the top left corner of the image, you can set the anchor to that spot by
   * using
   *
   * `pins=custom|an0 0||-122 45||http://contoso.com/pushpins/red.png`
   *
   * Note: If you use the 'co' color modifier with a custom pushpin image, the specified color will replace the RGB
   * channels of the pixels in the image but will leave the alpha (opacity) channel unchanged. This would usually
   * only be done with a solid-color custom image.
   *
   * ### Scale, Rotation, and Opacity
   *
   * You can make pushpins and their labels larger or smaller by using the 'sc' scale style modifier. This is a
   * value greater than zero. A value of 1 is the standard scale. Values larger than 1 will make the pins larger, and
   * values smaller than 1 will make them smaller. For example, to draw the pushpins 50% larger than normal, use
   *
   * `pins=default|sc1.5||-122 45`
   *
   * You can rotate pushpins and their labels by using the 'ro' rotation style modifier. This is a number of degrees
   * of clockwise rotation. Use a negative number to rotate counter-clockwise. For example, to rotate the pushpins
   * 90 degrees clockwise and double their size, use
   *
   * `pins=default|ro90|sc2||-122 45`
   *
   * You can make pushpins and their labels partially transparent by specifying the 'al' alpha style modifier.
   * This is a number between 0 and 1 indicating the opacity of the pushpins. Zero makes them completely transparent
   * (and not visible) and 1 makes them completely opaque (which is the default). For example, to make pushpins
   * and their labels only 67% opaque, use
   *
   * `pins=default|al.67||-122 45`
   *
   * ### Style Modifier Summary
   *
   * Modifier  | Description    | Type    | Range
   * :--------:|---------------|--------|----------
   * al        | Alpha (opacity) |  float | 0 to 1
   * an        | Pin anchor    | <int32, int32>  | *
   * co        | Pin color      | string | 000000 to FFFFFF
   * la        | Label anchor   | <int32, int32> | *
   * lc        | Label color   | string  | 000000 to FFFFFF
   * ls        | Label size      | float | Greater than 0
   * ro        | Rotation    | float    | -360 to 360
   * sc        | Scale         | float  | Greater than 0
   *
   * * X and Y coordinates can be anywhere within pin image or a margin around it.
   * The margin size is the minimum of the pin width and height.
   */
  pins?: string;
  /**
   * Path style and locations (in double). Use this parameter to optionally add lines, polygons or circles to the image.
   * The path style describes the appearance of the line and fill. (Be sure to properly URL-encode values of this
   * parameter since it will contain reserved characters such as pipes and punctuation.)
   *
   * Path parameter is supported in Azure Maps account SKU starting with S1. Multiple instances of the path parameter
   * allow to specify multiple geometries with their styles. Number of parameters per request is limited to 10 and
   * number of locations is limited to 100 per path.
   *
   * To render a circle with radius 100 meters and center point at latitude 45°N and longitude 122°W using the default style, add the
   * querystring parameter
   *
   * `path=ra100||-122 45`
   *
   * Note that the longitude comes before the latitude.
   * After URL encoding this will look like
   *
   * `path=ra100%7C%7C-122+45`
   *
   * All of the examples here show the path parameter without URL encoding, for clarity.
   *
   * To render a line, separate each location with a pipe character. For example, use
   *
   * `path=||-122 45|-119.5 43.2|-121.67 47.12`
   *
   * A polygon is specified with a closed path, where the first and last points are equal. For example, use
   *
   * `path=||-122 45|-119.5 43.2|-121.67 47.12|-122 45`
   *
   * Longitude value for locations of lines and polygons can be in the range from -360 to 360 to allow for rendering of geometries crossing the anti-meridian.
   *
   * ### Style Modifiers
   *
   * You can modify the appearance of the path by adding style modifiers. These are added before the locations.
   * Style modifiers each have a two-letter name. These abbreviated names are used to help reduce the length
   * of the URL.
   *
   * To change the color of the outline, use the 'lc' style modifier and specify the color using the HTML/CSS RGB color
   * format which is a six-digit hexadecimal number (the three-digit form is not supported). For example, to use
   * a deep pink color which you would specify as #FF1493 in CSS, use
   *
   * `path=lcFF1493||-122 45|-119.5 43.2`
   *
   * Multiple style modifiers may be combined to create a more complex visual style.
   *
   * `lc0000FF|lw3|la0.60|fa0.50||-122.2 47.6|-122.2 47.7|-122.3 47.7|-122.3 47.6|-122.2 47.6`
   *
   * ### Style Modifier Summary
   *
   * Modifier  | Description       | Type     | Range
   * :--------:|---------------|--------|----------
   * lc        | Line color      | string       | 000000 to FFFFFF
   * fc        | Fill color        | string       | 000000 to FFFFFF
   * la    | Line alpha (opacity)     |  float     | 0 to 1
   * fa  | Fill alpha (opacity)   |     float       | 0 to 1
   * lw   | Line width     |int32        | (0, 50]
   * ra        | Circle radius (meters) |   float  | Greater than 0
   */
  path?: string;
}

export interface RenderGetMapStaticImageQueryParam {
  queryParameters?: RenderGetMapStaticImageQueryParamProperties;
}

export type RenderGetMapStaticImageParameters = RenderGetMapStaticImageQueryParam &
  RequestParameters;

export interface RenderGetCopyrightFromBoundingBoxQueryParamProperties {
  /** Minimum coordinates (south-west point) of bounding box in latitude longitude coordinate system. E.g. 52.41064,4.84228 */
  mincoordinates: Array<number>;
  /** Maximum coordinates (north-east point) of bounding box in latitude longitude coordinate system. E.g. 52.41064,4.84228 */
  maxcoordinates: Array<number>;
  /** Yes/no value to exclude textual data from response. Only images and country/region names will be in response. */
  text?: "yes" | "no";
}

export interface RenderGetCopyrightFromBoundingBoxQueryParam {
  queryParameters: RenderGetCopyrightFromBoundingBoxQueryParamProperties;
}

export type RenderGetCopyrightFromBoundingBoxParameters = RenderGetCopyrightFromBoundingBoxQueryParam &
  RequestParameters;

export interface RenderGetCopyrightForTileQueryParamProperties {
  /**
   * Zoom level for the desired tile.
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  zoom: number;
  /**
   * X coordinate of the tile on zoom grid. Value must be in the range [0, 2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  x: number;
  /**
   * Y coordinate of the tile on zoom grid. Value must be in the range [0, 2<sup>`zoom`</sup> -1].
   *
   * Please see [Zoom Levels and Tile Grid](https://docs.microsoft.com/azure/location-based-services/zoom-levels-and-tile-grid) for details.
   */
  y: number;
  /** Yes/no value to exclude textual data from response. Only images and country/region names will be in response. */
  text?: "yes" | "no";
}

export interface RenderGetCopyrightForTileQueryParam {
  queryParameters: RenderGetCopyrightForTileQueryParamProperties;
}

export type RenderGetCopyrightForTileParameters = RenderGetCopyrightForTileQueryParam &
  RequestParameters;

export interface RenderGetCopyrightForWorldQueryParamProperties {
  /** Yes/no value to exclude textual data from response. Only images and country/region names will be in response. */
  text?: "yes" | "no";
}

export interface RenderGetCopyrightForWorldQueryParam {
  queryParameters?: RenderGetCopyrightForWorldQueryParamProperties;
}

export type RenderGetCopyrightForWorldParameters = RenderGetCopyrightForWorldQueryParam &
  RequestParameters;
