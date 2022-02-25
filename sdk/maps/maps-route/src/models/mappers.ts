// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LatLon } from "./models";

/**
 * @internal
 */
export function toLatLon(lat: number, lon: number): LatLon {
  return {
    latitude: lat,
    longitude: lon,
  };
}

/**
 * @internal
 */
export function toNumericArray(coordinates: LatLon): number[] {
  return [coordinates.latitude, coordinates.longitude];
}

/**
 * @internal
 */
export function toLatLonString(coordinates: LatLon): string {
  return `${coordinates.latitude},${coordinates.longitude}`;
}

/**
 * @internal
 */
export function toColonDelimitedLatLonString(coordinates: LatLon[]): string {
  return coordinates.map((c) => toLatLonString(c)).join(":");
}
