// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BatchRequest,
  RouteGetRouteDirectionsQueryParamProperties,
  createRouteDirectionsBatchRequest,
  toColonDelimitedLatLonString,
} from "../../src";
import { assert } from "chai";
import { LatLon } from "@azure/maps-common";

describe("toColonDelimitedLatLonString", function () {
  it("should compose the string correctly", function () {
    const input: LatLon[] = [
      [-122.123, 47.123],
      [-122.123, 47.123],
    ];
    const expected = "-122.123,47.123:-122.123,47.123";
    const actual = toColonDelimitedLatLonString(input);

    assert.equal(actual, expected);
  });

  it("should return empty string if input is empty", function () {
    const input: LatLon[] = [];
    const expected = "";
    const actual = toColonDelimitedLatLonString(input);

    assert.equal(actual, expected);
  });
});

describe("createRouteDirectionsBatchRequest", function () {
  it("should compose the request correctly", function () {
    const input: RouteGetRouteDirectionsQueryParamProperties[] = [
      {
        query: "-122.123,47.123:-122.123,47.123",
        routeType: undefined,
        inclineLevel: "high",
        useTrafficData: true,
        isCommercialVehicle: false,
        constantSpeedConsumptionInLitersPerHundredKm: "50,6.3:130,11.5",
        fuelEnergyDensityInMegajoulesPerLiter: 34.2,
        constantSpeedConsumptionInKwHPerHundredKm: "50,8.2:130,21.3",
        currentChargeInKwH: 43,
        maxChargeInKwH: 85,
        auxiliaryPowerInKw: 10,
        computeTravelTime: "all",
        filterSectionType: "carTrain",
        computeBestWaypointOrder: true,
        routeRepresentationForBestOrder: "summaryOnly",
      },
    ];
    const expected: BatchRequest = {
      batchItems: [
        {
          query:
            "?query=-122.123,47.123:-122.123,47.123&hilliness=high&traffic=true&vehicleCommercial=false&constantSpeedConsumptionInLitersPerHundredkm=50,6.3:130,11.5&fuelEnergyDensityInMJoulesPerLiter=34.2&constantSpeedConsumptionInkWhPerHundredkm=50,8.2:130,21.3&currentChargeInkWh=43&maxChargeInkWh=85&auxiliaryPowerInkW=10&computeTravelTimeFor=all&sectionType=carTrain&computeBestOrder=true&routeRepresentation=summaryOnly",
        },
      ],
    };
    const actual = createRouteDirectionsBatchRequest(input);

    assert.deepEqual(actual, expected);
  });
});
