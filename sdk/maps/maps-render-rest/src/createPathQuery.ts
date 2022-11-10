// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LatLon } from "@azure/maps-common";

/**
 * The options that modify the style of a circular path.
 */
export interface CircularPathOptions {
  /** The line color of the path. Range from 000000 to FFFFFF. */
  lineColor?: string;
  /** The line opacity of the path. Range from 0 to 1. */
  lineOpacity?: number;
  /** The line width of the line. Should be greater than 0. */
  lineWidthInPixels?: number;
}

/**
 * The options that modify the style of a polygonal path.
 */
export interface PolygonalPathOptions extends CircularPathOptions {
  /** The fill color of the path. This only works if the path is a closed shape like polygon or circle. Range from 000000 to FFFFFF.*/
  fillColor?: string;
  /** The fill color of the path. This only works if the path is a closed shape like polygon or circle. Range from 0 to 1.*/
  fillOpacity?: number;
}

interface PathOptionsForRequest extends PolygonalPathOptions {
  radius?: number;
}

const optionKeyMap: Record<keyof PathOptionsForRequest, string> = {
  lineColor: "lc",
  lineOpacity: "la",
  fillColor: "fc",
  fillOpacity: "fa",
  lineWidthInPixels: "lw",
  radius: "ra",
};

function isOptionKey(key: any): key is keyof PathOptionsForRequest {
  return key in optionKeyMap;
}

/**
 * Create a circular path query string for _get map static image_ request.
 *
 * @example
 * ```ts
 * const response = await client.path("/map/static/{format}", "png").get({
 *  queryParameters: {
 *    bbox: [13.228,52.4559,13.5794,52.629],
 *    path: [createPathQuery([52.4559, 13.228], 10000, { lineColor: "000000", lineOpacity: 0.9, lineWidthInPixels: 2 })]
 *  }
 * })
 * ```
 *
 * @param center - The center of the circular path.
 * @param radiusInMeters - The radius of the circular path in meters.
 * @param options - The options for the border style of the circle. See the possible options in {@link CircularPathOptions}.
 */
export function createPathQuery(
  center: LatLon,
  radiusInMeters: number,
  options?: CircularPathOptions
): string;
/**
 * Create a linear/polygonal path query string for _get map static image_ request.
 *
 * @example
 * ```ts
 * // Create a linear path.
 * const path = createPathQuery(
 *    [
 *      [52.577, 13.35],
 *      [52.6, 13.2988],
 *      [52.32, 13.2988],
 *    ],
 *    {
 *      lineColor: "000000",
 *      lineOpacity: 0.9,
 *      lineWidthInPixels: 2,
 *    }
 *  );
 * // Create a polygonal path.
 * const path = createPathQuery(
 *    [
 *      [52.577, 13.35],
 *      [52.6, 13.2988],
 *      [52.32, 13.2988],
 *      [52.577, 13.35],
 *    ],
 *    {
 *      lineColor: "000000",
 *      lineOpacity: 0.9,
 *      lineWidthInPixels: 2,
 *      fillColor: "FFFFFF",
 *      fillOpacity: 0.8
 *    }
 *  );
 * // Send the request
 * const response = await client.path("/map/static/{format}", "png").get({
 *  queryParameters: {
 *    bbox: [13.228,52.4559,13.5794,52.629],
 *    path: [path]
 *  }
 * });
 * ```
 *
 * @param coordinates - An array of {@link LatLon} specifies the path. Note that to create a closed polygon, the first and the last coordinate should be the same.
 * @param options - The options for the style of the path. See the possible options in {@link PolygonalPathOptions}.
 */
export function createPathQuery(coordinates: LatLon[], options?: PolygonalPathOptions): string;
export function createPathQuery(
  centerOrCoordinates: LatLon | LatLon[],
  radiusOrOptions?: number | PolygonalPathOptions,
  maybeOptions?: CircularPathOptions
): string {
  const coordinates = Array.isArray(centerOrCoordinates[0])
    ? (centerOrCoordinates as LatLon[])
    : [centerOrCoordinates as LatLon];
  const options =
    typeof radiusOrOptions === "number"
      ? { ...maybeOptions, radius: radiusOrOptions }
      : radiusOrOptions || {};
  // compose the coordinates query string
  const coordinatesQueryStr = coordinates.map(([lat, lon]) => `${lon} ${lat}`).join("|");
  // compose the options query string
  const optionsQueryStr = Object.entries(options).reduce<string>((queryStr, [key, val]) => {
    if (!isOptionKey(key)) throw Error(`Unknown key ${key}`);
    queryStr += `${Boolean(queryStr) ? "|" : ""}${optionKeyMap[key]}${val}`;
    return queryStr;
  }, "");
  return optionsQueryStr + "||" + coordinatesQueryStr;
}
