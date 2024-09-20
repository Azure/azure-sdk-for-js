// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
        departAt: new Date("2022-10-26T05:00:13.827Z"),
        arriveAt: new Date("2022-10-26T05:10:13.827Z"),
      },
    ];
    const expected: BatchRequest = {
      batchItems: [
        {
          query:
            "?query=-122.123,47.123:-122.123,47.123&departAt=2022-10-26T05:00:13.827Z&arriveAt=2022-10-26T05:10:13.827Z",
        },
      ],
    };
    const actual = createRouteDirectionsBatchRequest(input);

    assert.deepEqual(actual, expected);
  });
});
