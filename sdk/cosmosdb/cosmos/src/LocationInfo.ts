// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * Used to store the location info in Location Cache
 * @private
 * @hidden
 */
export class LocationInfo {
  public preferredLocations: ReadonlyArray<string>;
  public availableReadEndpointByLocation: ReadonlyMap<string, string>;
  public availableWriteEndpointByLocation: ReadonlyMap<string, string>;
  public orderedWriteLocations: ReadonlyArray<string>;
  public orderedReadLocations: ReadonlyArray<string>;
  public writeEndpoints: ReadonlyArray<string>;
  public readEndpoints: ReadonlyArray<string>;

  public constructor(other: LocationInfo);
  public constructor(preferredLocations: ReadonlyArray<string>, defaultEndpoint: string);
  public constructor(
    preferredLocationsOrOtherLocationInfo: ReadonlyArray<string> | LocationInfo,
    defaultEndpoint?: string
  ) {
    let preferredLocations: ReadonlyArray<string> = null;
    let other: LocationInfo = null;
    if (Array.isArray(preferredLocationsOrOtherLocationInfo)) {
      preferredLocations = preferredLocationsOrOtherLocationInfo;
    } else if (preferredLocationsOrOtherLocationInfo instanceof LocationInfo) {
      other = preferredLocationsOrOtherLocationInfo;
    } else {
      throw new Error("Invalid type passed to LocationInfo");
    }

    if (preferredLocations && defaultEndpoint) {
      this.preferredLocations = preferredLocations;
      this.availableWriteEndpointByLocation = new Map<string, string>();
      this.availableReadEndpointByLocation = new Map<string, string>();
      this.orderedWriteLocations = [];
      this.orderedReadLocations = [];
      this.writeEndpoints = [defaultEndpoint];
      this.readEndpoints = [defaultEndpoint];
    } else if (other) {
      this.preferredLocations = other.preferredLocations;
      this.availableReadEndpointByLocation = other.availableReadEndpointByLocation;
      this.availableWriteEndpointByLocation = other.availableWriteEndpointByLocation;
      this.orderedReadLocations = other.orderedReadLocations;
      this.orderedWriteLocations = other.orderedWriteLocations;
      this.writeEndpoints = other.writeEndpoints;
      this.readEndpoints = other.readEndpoints;
    } else {
      // This should never be called
      throw new Error("Invalid arguments passed to LocationInfo");
    }
  }
}
