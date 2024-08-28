// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LatLon } from "@azure/maps-common";

function clip(n: number, minValue: number, maxValue: number): number {
  return Math.min(Math.max(n, minValue), maxValue);
}

const MIN_LATITUDE = -85.05112878;
const MAX_LATITUDE = 85.05112878;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;
/**
 * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
 * Reference: https://learn.microsoft.com/en-us/azure/azure-maps/zoom-levels-and-tile-grid?tabs=typescript#tile-math-source-code
 *
 * @example
 * ```ts
 * const zoom = 6;
 * const { x, y } = positionToTileXY([47.61559, -122.33817], 6, "256");
 * const response = await client
 *   .path("/map/tile")
 *   .get({
 *     queryParameters: { tilesetId: "microsoft.base.road", zoom, x, y },
 *   })
 * ```
 *
 * @param position - Position coordinate in the format [latitude, longitude].
 * @param zoom - Zoom level.
 * @param tileSize - The size of the tiles in the tile pyramid.
 * @returns Tile XY coordinates.
 */
export function positionToTileXY(
  position: LatLon,
  zoom: number,
  tileSize: "512" | "256",
): { x: number; y: number } {
  const latitude = clip(position[0], MIN_LATITUDE, MAX_LATITUDE);
  const longitude = clip(position[1], MIN_LONGITUDE, MAX_LONGITUDE);

  const x = (longitude + 180) / 360;
  const sinLatitude = Math.sin((latitude * Math.PI) / 180);
  const y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);

  const tileSizeInNum = parseInt(tileSize);
  // tileSize needed in calculations as in rare cases the multiplying/rounding/dividing can make the difference of a pixel which can result in a completely different tile.
  const mapSize = Math.ceil(tileSizeInNum * Math.pow(2, zoom));

  return {
    x: Math.floor(clip(x * mapSize + 0.5, 0, mapSize - 1) / tileSizeInNum),
    y: Math.floor(clip(y * mapSize + 0.5, 0, mapSize - 1) / tileSizeInNum),
  };
}
