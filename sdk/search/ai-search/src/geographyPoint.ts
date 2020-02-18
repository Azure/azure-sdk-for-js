// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const WorldGeodeticSystem1984 = "EPSG:4326"; // See https://epsg.io/4326

export default class GeographyPoint {
  public latitude: number;
  public longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public toJSON() {
    return {
      type: "Point",
      coordinates: [this.latitude, this.longitude],
      crs: { type: "name", properties: { name: WorldGeodeticSystem1984 } }
    };
  }
}
