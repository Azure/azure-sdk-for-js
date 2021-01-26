// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const WorldGeodeticSystem1984 = "EPSG:4326"; // See https://epsg.io/4326

/**
 * Represents a geographic point in global coordinates.
 */
export default class GeographyPoint {
  /**
   * The latitude in decimal.
   */
  public latitude: number;
  /**
   * The longitude in decimal.
   */
  public longitude: number;

  /**
   * Constructs a new instance of GeographyPoint given
   * the specified coordinates.
   * @param latitude - latitude value in decimal
   * @param longitude - longitude value in decimal
   */
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Used to serialize to a GeoJSON Point.
   */
  public toJSON(): Record<string, unknown> {
    return {
      type: "Point",
      coordinates: [this.latitude, this.longitude],
      crs: { type: "name", properties: { name: WorldGeodeticSystem1984 } }
    };
  }
}
