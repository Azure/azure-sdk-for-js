// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Latitude/Longitude Pair
 */
export interface LatLon {
  latitude: number;
  longitude: number;
}

/**
 * Bounding Box
 */
export interface BoundingBox {
  /** Top left corner of the bounding box */
  topLeft: LatLon;
  /** Bottom right corner of the bounding box */
  bottomRight: LatLon;
}
