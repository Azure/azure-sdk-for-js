// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Address,
  BatchResult,
  ReverseSearchAddressResult,
  ReverseSearchCrossStreetAddressResult,
  SearchAddressResult,
} from "./results";
import {
  Address as AddressInternal,
  BatchRequest,
  BoundingBoxCompassNotation,
  BoundingBox as BoundingBoxInternal,
  ErrorResponse,
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams,
  LatLongPairAbbreviated,
  ReverseSearchAddressBatchResult,
  ReverseSearchAddressResult as ReverseSearchAddressResultInternal,
  ReverseSearchCrossStreetAddressResult as ReverseSearchCrossStreetAddressResultInternal,
  SearchAddressBatchResult,
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchAddressResult as SearchAddressResultInternal,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams,
} from "../generated/models";
import { BoundingBox, LatLon } from "./models";
import {
  FuzzySearchOptions,
  FuzzySearchRequest,
  ReverseSearchAddressOptions,
  ReverseSearchAddressRequest,
  SearchAddressOptions,
  SearchAddressRequest,
  SearchBaseOptions,
  SearchExtraFilterOptions,
  SearchPointOfInterestOptions,
} from "./options";
import { OperationOptions } from "@azure/core-client";

/* LatLon / BoundingBox mappers */

/**
 *
 * @internal
 */
export function toLatLonString(coordinates: LatLon): string {
  return `${coordinates[0]},${coordinates[1]}`;
}

/**
 * @internal
 */
export function mapLatLongPairAbbreviatedToLatLon(latLongAbbr: LatLongPairAbbreviated): LatLon {
  return [latLongAbbr.lat, latLongAbbr.lon];
}

/**
 * @internal
 */
export function mapStringToLatLon(LatLonStr: string): LatLon {
  if (LatLonStr && typeof LatLonStr === "string") {
    const LatLonArray = LatLonStr.split(",");
    if (LatLonArray.length === 2) {
      const lat = Number(LatLonArray[0]);
      const lon = Number(LatLonArray[1]);
      if (!isNaN(lat) && !isNaN(lon)) {
        return [lat, lon];
      }
    }
  }
  throw new Error("Failed to deserialize LatLon string.");
}

/**
 * @internal
 */
export function toBoundingBox(topLeft: LatLon, bottomRight: LatLon): BoundingBox {
  return {
    topLeft: topLeft,
    bottomRight: bottomRight,
  };
}

/**
 * @internal
 */
export function mapBoundingBox(bbox: BoundingBoxInternal): BoundingBox {
  const topLeft = mapLatLongPairAbbreviatedToLatLon(bbox.topLeft);
  const bottomRight = mapLatLongPairAbbreviatedToLatLon(bbox.bottomRight);
  return toBoundingBox(topLeft, bottomRight);
}

/**
 * @internal
 */
export function mapBoundingBoxFromCompassNotation(
  bbox?: BoundingBoxCompassNotation
): BoundingBox | undefined {
  if (bbox && bbox.northEast && bbox.southWest) {
    const northAndEast = bbox.northEast.split(",").map((s) => Number(s));
    const southAndWest = bbox.southWest.split(",").map((s) => Number(s));
    if (northAndEast.length === 2 || southAndWest.length === 2) {
      const top = northAndEast[0];
      const left = southAndWest[1];
      const bottom = southAndWest[0];
      const right = northAndEast[1];
      return toBoundingBox([top, left], [bottom, right]);
    }
  }
  return undefined;
}

/* Options mappers */

/**
 * @internal
 */
export function extractOperationOptions(options: OperationOptions): OperationOptions {
  return {
    abortSignal: options.abortSignal,
    requestOptions: options.requestOptions,
    tracingOptions: options.tracingOptions,
    serializerOptions: options.serializerOptions,
    onResponse: options.onResponse,
  };
}

/**
 * @internal
 */
export function mapSearchBaseOptions(options: SearchBaseOptions): SearchBaseOptions {
  return {
    top: options.top,
    skip: options.skip,
    language: options.language,
    extendedPostalCodesFor: options.extendedPostalCodesFor,
    localizedMapView: options.localizedMapView,
  };
}

/**
 * @internal
 */
export function mapSearchExtraFilterOptions(
  options: SearchExtraFilterOptions
): SearchExtraFilterOptions {
  return {
    categoryFilter: options.categoryFilter,
    brandFilter: options.brandFilter,
    electricVehicleConnectorFilter: options.electricVehicleConnectorFilter,
  };
}

/**
 * @internal
 */
export function mapSearchAddressOptions(
  options: SearchAddressOptions & OperationOptions
): SearchAddressOptionalParams {
  return {
    isTypeAhead: options.isTypeAhead,
    countryCodeFilter: options.countryCodeFilter,
    lat: options.coordinates?.[0],
    lon: options.coordinates?.[1],
    radiusInMeters: options.radiusInMeters,
    topLeft: options.boundingBox ? toLatLonString(options.boundingBox.topLeft) : undefined,
    btmRight: options.boundingBox ? toLatLonString(options.boundingBox.bottomRight) : undefined,
    ...mapSearchBaseOptions(options),
    ...extractOperationOptions(options),
  };
}

/**
 * @internal
 */
export function mapSearchPointOfInterestOptions(
  options: SearchPointOfInterestOptions
): SearchPointOfInterestOptionalParams {
  return {
    operatingHours: options.operatingHours,
    isTypeAhead: options.isTypeAhead,
    radiusInMeters: options.radiusInMeters,
    topLeft: options.boundingBox ? toLatLonString(options.boundingBox.topLeft) : undefined,
    btmRight: options.boundingBox ? toLatLonString(options.boundingBox.bottomRight) : undefined,
    ...mapSearchBaseOptions(options),
    ...extractOperationOptions(options),
  };
}

/**
 * @internal
 */
export function mapFuzzySearchOptions(
  options: FuzzySearchOptions & OperationOptions
): FuzzySearchOptionalParams {
  return {
    entityType: options.entityType,
    minFuzzyLevel: options.minFuzzyLevel,
    maxFuzzyLevel: options.maxFuzzyLevel,
    indexFilter: options.indexFilter,
    ...mapSearchPointOfInterestOptions(options),
  };
}

/* Result mappers */

/**
 * @internal
 */
export function mapAddress(address: AddressInternal): Address {
  const { boundingBox, ...addressObject } = address;
  return {
    ...addressObject,
    ...(boundingBox && { boundingBox: mapBoundingBoxFromCompassNotation(boundingBox) }),
  };
}

/**
 * @internal
 */
export function mapSearchAddressResult(
  internalResult: SearchAddressResultInternal
): SearchAddressResult {
  const { geoBias, numResults, ...summaryObject } = internalResult.summary;
  const searchResult: SearchAddressResult = {
    ...summaryObject,
    ...(geoBias && { geoBias: mapLatLongPairAbbreviatedToLatLon(geoBias) }),
    numberResults: numResults,
    results: internalResult.results.map((ir) => {
      const {
        address,
        position,
        viewport,
        entryPoints,
        addressRanges,
        detourTime,
        ...resultObject
      } = ir;
      return {
        ...resultObject,
        ...(address && { address: mapAddress(address) }),
        ...(position && { position: [position.lat, position.lon] }),
        ...(viewport && { viewport: mapBoundingBox(viewport) }),
        ...(entryPoints && {
          entryPoints: entryPoints.map((p) => {
            return { type: p.type, position: mapLatLongPairAbbreviatedToLatLon(p.position) };
          }),
        }),
        ...(addressRanges && {
          addressRanges: {
            rangeLeft: addressRanges.rangeLeft,
            rangeRight: addressRanges.rangeRight,
            from: mapLatLongPairAbbreviatedToLatLon(addressRanges.from),
            to: mapLatLongPairAbbreviatedToLatLon(addressRanges.to),
          },
        }),
        // Rename to detourTimeInSeconds to follow the convention
        ...(detourTime && { detourTimeInSeconds: detourTime }),
      };
    }),
  };

  return searchResult;
}

/**
 * @internal
 */
export function mapReverseSearchAddressResult(
  internalResult: ReverseSearchAddressResultInternal
): ReverseSearchAddressResult {
  const searchResult: ReverseSearchAddressResult = {
    queryTime: internalResult.summary.queryTime,
    numberResults: internalResult.summary.numResults,
    results: internalResult.addresses.map((ad) => {
      const { address, position, ...resultObject } = ad;
      return {
        ...resultObject,
        address: mapAddress(address),
        position: mapStringToLatLon(position),
      };
    }),
  };
  return searchResult;
}

/**
 * @internal
 */
export function mapReverseSearchCrossStreetAddressResult(
  internalResult: ReverseSearchCrossStreetAddressResultInternal
): ReverseSearchCrossStreetAddressResult {
  const searchResult: ReverseSearchCrossStreetAddressResult = {
    queryTime: internalResult.summary.queryTime,
    numberResults: internalResult.summary.numResults,
    results: internalResult.addresses.map((ad) => {
      const { address, position } = ad;
      return {
        ...(address && { address: mapAddress(address) }),
        ...(position && { position: mapStringToLatLon(position) }),
      };
    }),
  };

  return searchResult;
}

/**
 * @Internal
 */
export function mapSearchAddressBatchResult(
  internalResult: SearchAddressBatchResult
): BatchResult<SearchAddressResult> {
  const result: BatchResult<SearchAddressResult> = {
    totalRequests: internalResult.batchSummary.totalRequests,
    totalSuccessfulRequests: internalResult.batchSummary.totalSuccessfulRequests,
    batchItems: internalResult.batchItems.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: mapSearchAddressResult(item.response as unknown as SearchAddressResultInternal),
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    }),
  };
  return result;
}

/**
 * @Internal
 */
export function mapReverseSearchAddressBatchResult(
  internalResult: ReverseSearchAddressBatchResult
): BatchResult<ReverseSearchAddressResult> {
  const result: BatchResult<ReverseSearchAddressResult> = {
    totalRequests: internalResult.batchSummary.totalRequests,
    totalSuccessfulRequests: internalResult.batchSummary?.totalSuccessfulRequests,
    batchItems: internalResult.batchItems.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: mapReverseSearchAddressResult(
            item.response as unknown as ReverseSearchAddressResultInternal
          ),
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    }),
  };
  return result;
}

/* Batch request mappers */

/**
 * @internal
 */
const clientToServiceNames: Readonly<Record<string, string>> = {
  operatingHours: "openingHours",
  isTypeAhead: "typeahead",
  radiusInMeters: "radius",
  localizedMapView: "view",
  top: "limit",
  skip: "ofs",
  includeSpeedLimit: "returnSpeedLimit",
  numberParam: "number",
  includeRoadUse: "returnRoadUse",
  includeMatchType: "returnMatchType",
};

/**
 * @internal
 */
const clientToServiceNamesArray: Readonly<Record<string, string>> = {
  indexFilter: "idxSet",
  categoryFilter: "categorySet",
  brandFilter: "brandSet",
  countryCodeFilter: "countrySet",
  electricVehicleConnectorFilter: "connectorSet",
  roadUse: "roadUse",
};

/**
 * @internal
 */
function createPartialQueryStringFromOptions(
  options: FuzzySearchOptions | SearchAddressOptions | ReverseSearchAddressOptions
): string {
  let partialQuery = "";
  for (const [k, v] of Object.entries(options)) {
    // Skip if no value
    if (typeof v === "undefined" || v === null) continue;
    // Check name mappings: primitive values
    if (k in clientToServiceNames) {
      partialQuery += `&${clientToServiceNames[k]}=${v}`;
      // Check name mappings: Array values
    } else if (k in clientToServiceNamesArray) {
      if (Array.isArray(v) && v.length > 0) {
        partialQuery += `&${clientToServiceNamesArray[k]}=${v.join(",")}`;
      }
    } else if (k === "coordinates") {
      partialQuery += `&lat=${v[0]}&lon=${v[1]}`;
    } else if (k === "boundingBox") {
      partialQuery += `&topLeft=${v.topLeft[0]},${v.topLeft[1]}&btmRight=${v.bottomRight[0]},${v.bottomRight[1]}`;
    } else {
      partialQuery += `&${k}=${v}`;
    }
  }
  return partialQuery;
}

/**
 * @internal
 */
export function createFuzzySearchBatchRequest(requests: FuzzySearchRequest[]): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      const options = r.options;
      const { query, coordinates, countryCodeFilter } = r.searchQuery;
      // Add top level query parameters
      let queryText = `?query=${query}`;
      if (coordinates) {
        queryText += `&lat=${coordinates[0]}&lon=${coordinates[1]}`;
      }
      if (countryCodeFilter && countryCodeFilter.length > 0) {
        queryText += `&countrySet=${countryCodeFilter.join(",")}`;
      }

      // Add optional query parameters
      if (options) {
        queryText += createPartialQueryStringFromOptions(options);
      }

      return { query: queryText };
    }),
  };
}

/**
 * @internal
 */
export function createSearchAddressBatchRequest(requests: SearchAddressRequest[]): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      // Add top level query parameters
      let queryText = `?query=${r.query}`;

      // Add optional query parameters
      if (r.options) {
        queryText += createPartialQueryStringFromOptions(r.options);
      }
      return { query: queryText };
    }),
  };
}

/**
 * @internal
 */
export function createReverseSearchAddressBatchRequest(
  requests: ReverseSearchAddressRequest[]
): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      // Add top level query parameters
      let queryText = `?query=${r.coordinates[0]},${r.coordinates[1]}`;

      // Add optional query parameters
      if (r.options) {
        queryText += createPartialQueryStringFromOptions(r.options);
      }
      return { query: queryText };
    }),
  };
}
