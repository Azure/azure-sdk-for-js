// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LatLon } from "@azure/maps-common";
import { createMultiCollection } from "./createMultiCollection";

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

/**
 * Specify a circular path.
 */
export interface CircularPath {
  /** The center of the circular path. */
  center: LatLon;
  /** The radius of the circular path. */
  radiusInMeters: number;
  /** The options that modify the style of the circular path. */
  options?: CircularPathOptions;
}

function isCircularPath(path: PolygonalPath | CircularPath): path is CircularPath {
  return "center" in path;
}
/**
 * Specify a polygonal path.
 */
export interface PolygonalPath {
  /** The coordinates of the polygonal path. The identical coordinate in the first & last position construct a closed polygon.*/
  coordinates: LatLon[];
  /** The options that modify the style of the polygonal path. */
  options?: PolygonalPathOptions;
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

function comosePathVal(coordinates: LatLon[], options: PathOptionsForRequest): string {
  // compose the coordinates query string
  const coordinatesQueryStr = coordinates.map(([lat, lon]) => `${lon} ${lat}`).join("|");
  // compose the options query string
  const optionsQueryStr = Object.entries(options).reduce<string>((queryStr, [key, val]) => {
    if (!isOptionKey(key)) throw Error(`Unknown key ${key}`);
    queryStr += `${queryStr ? "|" : ""}${optionKeyMap[key]}${val}`;
    return queryStr;
  }, "");
  return optionsQueryStr + "||" + coordinatesQueryStr;
}

/**
 * Create a path query string for _get map static image_ request.
 *
 * @example
 * ```ts
 * const circularPath = {
 *   center: [52.4559, 13.228],
 *   radiusInMeters: 10000,
 *   options: {
 *     lineColor: "000000",
 *     lineOpacity: 0.9,
 *     lineWidthInPixels: 2,
 *   },
 * };
 *
 * const linearPath = {
 *   coordinates: [
 *     [52.577, 13.35],
 *     [52.6, 13.2988],
 *     [52.32, 13.2988],
 *   ],
 *   options: {
 *     lineColor: "000000",
 *     lineOpacity: 0.9,
 *     lineWidthInPixels: 2,
 *   },
 * };
 *
 * const polygonPath = {
 *  coordinates: [
 *    [52.577, 13.35],
 *    [52.6, 13.2988],
 *    [52.32, 13.2988],
 *    [52.577, 13.35],
 *  ],
 *  options: {
 *    lineColor: "000000",
 *    lineOpacity: 0.9,
 *    lineWidthInPixels: 2,
 *    fillColor: "FFFFFF",
 *    fillOpacity: 0.8,
 *  },
 * };
 *
 * const path = createPathQuery([circularPath, linearPath, polygonPath]);
 * // Send the request
 * const response = await client.path("/map/static/{format}", "png").get({
 *  queryParameters: {
 *    bbox: [13.228,52.4559,13.5794,52.629],
 *    path: path
 *  }
 * });
 * ```
 *
 * @param paths - A collection of {@link PolygonalPath} and {@link CircularPath} that you want to draw on the image.
 * @param options - The options for the style of the path. See the possible options in {@link PolygonalPathOptions} and {@link CircularPathOptions}.
 */
export function createPathQuery(paths: Array<PolygonalPath | CircularPath>): string {
  const pathQueries = paths.map((path) => {
    if (isCircularPath(path)) {
      const { center, radiusInMeters, options } = path;
      return comosePathVal([center], { ...options, radius: radiusInMeters });
    }
    return comosePathVal(path.coordinates, path.options || {});
  });
  return createMultiCollection("path", pathQueries);
}
