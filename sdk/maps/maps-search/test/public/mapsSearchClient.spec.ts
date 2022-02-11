// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, createRecorder } from "./utils/createClient";
import { Context, Suite } from "mocha";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { MapsSearchClient } from "src/mapsSearchClient";
import { assert, use as chaiUse } from "chai";
import { matrix } from "@azure/test-utils";
import chaiPromises from "chai-as-promised";
import {
  GeoJsonLineString,
  KnownSearchAddressResultType,
  SearchAddressResultItem,
  GeoJsonPolygon,
  GeoJsonPolygonCollection,
  GeoJsonCircleOrPolygonFeatureCollection
} from "../../src";
chaiUse(chaiPromises);

matrix([["SubscriptionKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] MapsSearchClient`, function(this: Suite) {
    let recorder: Recorder;
    let client: MapsSearchClient;
    const CLITimeout = this.timeout();
    const fastTimeout = 10000;

    beforeEach(function(this: Context) {
      recorder = createRecorder(this);
      client = createClient(authMethod);
    });

    afterEach(async function() {
      await recorder.stop();
    });

    describe("fast tests", function() {
      before(function(this: Context) {
        this.timeout(fastTimeout);
      });

      describe("#getGeometries", function() {
        it("should accept string[] and return geometries with equal length", async function() {
          const geometryId: string[] = [
            "8bceafe8-3d98-4445-b29b-fd81d3e9adf5",
            "00005858-5800-1200-0000-0000773670cd"
          ];
          const geometries = await client.getGeometries(geometryId);
          assert.equal(geometries.length, geometryId.length);
          geometries.forEach((g) => assert.ok(g.geometryData));
        });

        it("should throw error on empty geometryIds array", async function() {
          return assert.isRejected(
            client.getGeometries([]),
            /geometryIds must be a non-empty array/
          );
        });

        it("should return undefined geometryData if the geometry id is not valid", async function() {
          const geometryIds: string[] = ["invalid-geometry-id"];
          const geometries = await client.getGeometries(geometryIds);
          assert.isUndefined(geometries[0].geometryData);
        });
      });

      describe("#getPointOfInterestCategories", function() {
        it("return a list of POI categories", async function() {
          const poiCategories = await client.getPointOfInterestCategories();
          assert.isAtLeast(poiCategories.length, 1);
          poiCategories.forEach((poiCategory) => {
            assert.isFinite(poiCategory.id);
            assert.isString(poiCategory.name);
          });
        });
      });

      describe("Geocoding", function() {
        const expectedTypes = [
          KnownSearchAddressResultType.Street,
          KnownSearchAddressResultType.Geography,
          KnownSearchAddressResultType.PointAddress,
          KnownSearchAddressResultType.AddressRange,
          KnownSearchAddressResultType.CrossStreet
        ];
        const nonExpectedTypes = [KnownSearchAddressResultType.POI];

        function assertGeocodingResults(results?: SearchAddressResultItem[]) {
          assert.isNotEmpty(results);
          results?.forEach((r) => {
            // Could be any types except POI
            assert.oneOf(r.type, expectedTypes);
            assert.notInclude(nonExpectedTypes, r.type);
            // Has valid score
            assert.isFinite(r.score);
          });
        }

        describe("#searchAddress", function() {
          it("should throw error if query is empty", async function() {
            // "query is missing or empty"
            return assert.isRejected(client.searchAddress(""));
          });

          it("should return non-empty results", async function() {
            const searchResult = await client.searchAddress("pizza");
            assertGeocodingResults(searchResult.results);
          });
        });

        describe("#searchStructuredAddress", function() {
          it("should throw error the the query contains invalid countryCode", async function() {
            const structuredAddress = {
              countryCode: ""
            };
            // "Missing or invalid countryCode parameter"
            assert.isRejected(client.searchStructuredAddress(structuredAddress));
          });

          it("should return non-empty results", async function() {
            const structuredAddress = {
              countryCode: "US",
              streetNumber: "15127",
              streetName: "NE 24th Street",
              municipality: "Redmond",
              countrySubdivision: "WA",
              postalCode: "98052"
            };
            const searchResult = await client.searchStructuredAddress(structuredAddress);
            assertGeocodingResults(searchResult.results);
          });
        });
      });

      describe("Reverse geocoding", function() {
        describe("#reverseSearchAddress", function() {
          it("should throw error is query is invalid", async function() {
            // "The provided coordinates in query are invalid, out of range, or not in the expected format"
            assert.isRejected(client.reverseSearchAddress({ latitude: -100, longitude: 121 }));
            assert.isRejected(client.reverseSearchAddress({ latitude: 25, longitude: 250 }));
          });

          it("should return non-empty results", async function() {
            const searchResult = await client.reverseSearchAddress({
              latitude: 25,
              longitude: 121
            });
            assert.isNotEmpty(searchResult.results);
            searchResult.results?.forEach((r) => {
              assert.isString(r.address?.streetName);
            });
          });
        });

        describe("#reverseSearchCrossStreetAddress", function() {
          it("should throw error is query is invalid", async function() {
            // "The provided coordinates in query are invalid, out of range, or not in the expected format"
            assert.isRejected(
              client.reverseSearchCrossStreetAddress({ latitude: -100, longitude: 121 })
            );
            assert.isRejected(
              client.reverseSearchCrossStreetAddress({ latitude: 25, longitude: 250 })
            );
          });

          it("should return non-empty results", async function() {
            const searchResult = await client.reverseSearchCrossStreetAddress({
              latitude: 25,
              longitude: 121
            });
            assert.isNotEmpty(searchResult.results);
            searchResult.results?.forEach((r) => {
              assert.isString(r.address?.crossStreet);
            });
          });
        });
      });

      describe("POI search", function() {
        const expectedType = KnownSearchAddressResultType.POI;
        function assertPOISearchResults(results?: SearchAddressResultItem[]) {
          assert.isNotEmpty(results);
          results?.forEach((r) => {
            // Could be any types except POI
            assert.equal(r.type, expectedType);
            // Has valid score
            assert.isFinite(r.score);
          });
        }

        describe("#searchPointOfInterest", function() {
          it("should throw errors if the options is not valid", async function() {
            // "query is missing or empty"
            assert.isRejected(
              client.searchPointOfInterest({
                query: "",
                coordinates: {
                  latitude: 25,
                  longitude: 121
                }
              })
            );
            // "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
            assert.isRejected(
              client.searchPointOfInterest({
                query: "juice bars",
                coordinates: {
                  latitude: -200,
                  longitude: 121
                }
              })
            );
          });

          it("should return non-empty results", async function() {
            const searchResult = await client.searchPointOfInterest({
              query: "juice bars",
              coordinates: {
                latitude: 47.606038,
                longitude: -122.333345
              }
            });
            assertPOISearchResults(searchResult.results);
          });
        });

        describe("#searchNearbyPointOfInterest", function() {
          it("should throw errors if LatLon is not valid", async function() {
            assert.isRejected(
              client.searchNearbyPointOfInterest({
                latitude: -200,
                longitude: 121
              })
            );
          });

          it("should return non-empty results", async function() {
            const searchResult = await client.searchNearbyPointOfInterest({
              latitude: 47.606038,
              longitude: -122.333345
            });
            assertPOISearchResults(searchResult.results);
          });
        });

        describe("#searchPointOfInterestCategory", function() {
          it("should throw errors if the options is not valid", async function() {
            // "query is missing or empty"
            assert.isRejected(
              client.searchPointOfInterestCategory({
                query: "",
                coordinates: {
                  latitude: 25,
                  longitude: 121
                }
              })
            );
            // "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
            assert.isRejected(
              client.searchPointOfInterestCategory({
                query: "Restaurant",
                coordinates: {
                  latitude: -200,
                  longitude: 121
                }
              })
            );
          });

          it("should return non-empty results", async function() {
            const searchResult = await client.searchPointOfInterestCategory({
              query: "Restaurant",
              coordinates: {
                latitude: 47.606038,
                longitude: -122.333345
              }
            });
            assertPOISearchResults(searchResult.results);
          });
        });

        describe("#searchAlongRoute", function() {
          it("should throw error on empty query", async function() {
            const route: GeoJsonLineString = {
              type: "LineString",
              coordinates: [
                [-122.143035, 47.653536],
                [-122.187164, 47.617556],
                [-122.114981, 47.570599],
                [-122.132756, 47.654009]
              ]
            };
            // "query is missing or empty"
            assert.isRejected(client.searchAlongRoute("", 1000, route));
          });

          it("should throw error if the maxDetourTime is out of the range [0,3600]", async function() {
            const route: GeoJsonLineString = {
              type: "LineString",
              coordinates: [
                [-122.143035, 47.653536],
                [-122.187164, 47.617556],
                [-122.114981, 47.570599],
                [-122.132756, 47.654009]
              ]
            };
            // "maxDetourTime value should be between 0 and 3600 inclusive"
            assert.isRejected(client.searchAlongRoute("burger", 3601, route));
          });

          it("should return non-empty results", async function() {
            const route: GeoJsonLineString = {
              type: "LineString",
              coordinates: [
                [-122.143035, 47.653536],
                [-122.187164, 47.617556],
                [-122.114981, 47.570599],
                [-122.132756, 47.654009]
              ]
            };
            const searchResult = await client.searchAlongRoute("burger", 1000, route);
            assertPOISearchResults(searchResult.results);
          });
        });
      });

      describe("General search", function() {
        const expectedTypes = [
          KnownSearchAddressResultType.Street,
          KnownSearchAddressResultType.Geography,
          KnownSearchAddressResultType.PointAddress,
          KnownSearchAddressResultType.AddressRange,
          KnownSearchAddressResultType.CrossStreet,
          KnownSearchAddressResultType.POI
        ];

        function assertSearchResults(results?: SearchAddressResultItem[]) {
          assert.isNotEmpty(results);
          results?.forEach((r) => {
            // Could be any types except POI
            assert.oneOf(r.type, expectedTypes);
            // Has valid score
            assert.isFinite(r.score);
          });
        }

        describe("#fuzzySearch", function() {
          it("should throw errors if the options is not valid", async function() {
            // "query is missing or empty"
            assert.isRejected(
              client.fuzzySearch({
                query: "",
                coordinates: {
                  latitude: 25,
                  longitude: 121
                }
              })
            );
            assert.isRejected(
              client.fuzzySearch({
                query: "Restaurant",
                coordinates: {
                  latitude: -200,
                  longitude: 121
                }
              })
            );
          });

          it("should return non-empty results", async function() {
            const searchResult = await client.fuzzySearch({
              query: "Restaurant",
              coordinates: {
                latitude: 47.606038,
                longitude: -122.333345
              }
            });
            assertSearchResults(searchResult.results);
          });
        });

        describe("#searchInsideGeometry", function() {
          it("should throw error is query is invalid", async function() {
            const polygon: GeoJsonPolygon = {
              type: "Polygon",
              coordinates: [
                [
                  [-122.43576049804686, 37.7524152343544],
                  [-122.43301391601562, 37.70660472542312],
                  [-122.36434936523438, 37.712059855877314],
                  [-122.43576049804686, 37.7524152343544]
                ]
              ]
            };
            // "query is missing or empty"
            assert.isRejected(client.searchInsideGeometry("", polygon));
          });
          it("should accept GeoJSON polygon and return non-empty results", async function() {
            const polygon: GeoJsonPolygon = {
              type: "Polygon",
              coordinates: [
                [
                  [-122.43576049804686, 37.7524152343544],
                  [-122.43301391601562, 37.70660472542312],
                  [-122.36434936523438, 37.712059855877314],
                  [-122.43576049804686, 37.7524152343544]
                ]
              ]
            };
            const searchResult = await client.searchInsideGeometry("pizza", polygon);
            assertSearchResults(searchResult.results);
          });
          it("should accept GeoJSON geometry collection (all polygons) and return non-empty results", async function() {
            const polygonCollection: GeoJsonPolygonCollection = {
              type: "GeometryCollection",
              geometries: [
                {
                  type: "Polygon",
                  coordinates: [
                    [
                      [-122.43576049804686, 37.7524152343544],
                      [-122.43301391601562, 37.70660472542312],
                      [-122.36434936523438, 37.712059855877314],
                      [-122.43576049804686, 37.7524152343544]
                    ]
                  ]
                },
                {
                  type: "Polygon",
                  coordinates: [
                    [
                      [-121.43576049804686, 38.7524152343544],
                      [-121.43301391601562, 38.70660472542312],
                      [-121.36434936523438, 38.712059855877314],
                      [-121.43576049804686, 38.7524152343544]
                    ]
                  ]
                }
              ]
            };
            const searchResult = await client.searchInsideGeometry("pizza", polygonCollection);
            assertSearchResults(searchResult.results);
          });
          it("should accept GeoJSON feature collection (circle or polygons) and return non-empty results", async function() {
            const polygonsOrCircles: GeoJsonCircleOrPolygonFeatureCollection = {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [
                        [-121.43576049804686, 38.7524152343544],
                        [-121.43301391601562, 38.70660472542312],
                        [-121.36434936523438, 38.712059855877314],
                        [-121.43576049804686, 38.7524152343544]
                      ]
                    ]
                  },
                  properties: {}
                },
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-121.43576049804686, 38.7524152343544]
                  },
                  properties: {
                    subType: "Circle",
                    radius: 5000
                  }
                }
              ]
            };
            const searchResult = await client.searchInsideGeometry("pizza", polygonsOrCircles);
            assertSearchResults(searchResult.results);
          });
        });
      });

      describe("LROs", function() {
        // const pollingInterval = isPlaybackMode() ? 0 : 2000;
        before(function(this: Context) {
          this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
        });
        // describe("#beginFuzzySearchBatch", function() {});
        // describe("#beginSearchAddressBatch", function() {});
        // describe("#beginReverseSearchAddressBatch", function() {});
      });
    });
  });
});
