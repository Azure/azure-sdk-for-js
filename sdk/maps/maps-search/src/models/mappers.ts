// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Address,
  BatchResult,
  ReverseSearchAddressResult,
  ReverseSearchAddressResultItem,
  ReverseSearchCrossStreetAddressResult,
  ReverseSearchCrossStreetAddressResultItem,
  SearchAddressResult,
  SearchAddressResultItem
} from "./results";
import {
  Address as AddressInternal,
  BatchRequest,
  BoundingBoxCompassNotation,
  BoundingBox as BoundingBoxInternal,
  ErrorResponse,
  SearchFuzzySearchOptionalParams as FuzzySearchOptionalParams,
  LatLongPairAbbreviated,
  ReverseSearchAddressBatchProcessResult,
  ReverseSearchAddressResult as ReverseSearchAddressResultInternal,
  ReverseSearchCrossStreetAddressResult as ReverseSearchCrossStreetAddressResultInternal,
  SearchAddressBatchResult,
  SearchSearchAddressOptionalParams as SearchAddressOptionalParams,
  SearchAddressResult as SearchAddressResultInternal,
  SearchSearchPointOfInterestOptionalParams as SearchPointOfInterestOptionalParams
} from "../generated/models";
import { BoundingBox, LatLon } from "./models";
import {
  FuzzySearchOptions,
  SearchAddressOptions,
  SearchBaseOptions,
  SearchExtraFilterOptions,
  SearchPointOfInterestOptions
} from "./options";
import {
  FuzzySearchRequest,
  FuzzySearchRequestOptions,
  ReverseSearchAddressRequest,
  SearchAddressRequest,
  SearchAddressRequestOptions
} from "./requests";
import { OperationOptions } from "@azure/core-client";

/* LatLon / BoundingBox mappers */

/**
 * @internal
 */
export function toLatLon(lat: number, lon: number): LatLon {
  return {
    latitude: lat,
    longitude: lon
  };
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
export function mapLatLongPairAbbreviatedToLatLon(
  latLongAbbr?: LatLongPairAbbreviated
): LatLon | undefined {
  if (latLongAbbr && latLongAbbr.lat && latLongAbbr.lon) {
    return toLatLon(latLongAbbr.lat, latLongAbbr.lon);
  } else {
    return undefined;
  }
}

/**
 * @internal
 */
export function mapStringToLatLon(LatLonStr?: string): LatLon | undefined {
  if (LatLonStr && typeof LatLonStr === "string") {
    const LatLonArray = LatLonStr.split(",");
    if (LatLonArray.length === 2) {
      const lat = Number(LatLonArray[0]);
      const lon = Number(LatLonArray[1]);
      if (!isNaN(lat) && !isNaN(lon)) {
        return toLatLon(lat, lon);
      }
    }
  }
  return undefined;
}

/**
 * @internal
 */
export function toBoundingBox(topLeft: LatLon, bottomRight: LatLon): BoundingBox {
  return {
    topLeft: topLeft,
    bottomRight: bottomRight
  };
}

/**
 * @internal
 */
export function mapBoundingBox(bbox?: BoundingBoxInternal): BoundingBox | undefined {
  if (bbox && bbox.topLeft && bbox.bottomRight) {
    const topLeft = mapLatLongPairAbbreviatedToLatLon(bbox.topLeft);
    const bottomRight = mapLatLongPairAbbreviatedToLatLon(bbox.bottomRight);
    if (topLeft && bottomRight) {
      return toBoundingBox(topLeft, bottomRight);
    }
  }
  return undefined;
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
    if (northAndEast.length == 2 || southAndWest.length == 2) {
      const top = northAndEast[0];
      const left = southAndWest[1];
      const bottom = southAndWest[0];
      const right = northAndEast[1];
      return toBoundingBox(toLatLon(top, left), toLatLon(bottom, right));
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
    onResponse: options.onResponse
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
    ...extractOperationOptions(options)
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
    electricVehicleConnectorFilter: options.electricVehicleConnectorFilter
  };
}

/**
 * @internal
 */
export function mapSearchAddressOptions(
  options: SearchAddressOptions
): SearchAddressOptionalParams {
  return {
    isTypeAhead: options.isTypeAhead,
    countryFilter: options.countryFilter,
    lat: options.coordinates?.latitude,
    lon: options.coordinates?.longitude,
    radiusInMeters: options.radiusInMeters,
    topLeft: options.boundingBox ? toLatLonString(options.boundingBox.topLeft) : undefined,
    btmRight: options.boundingBox ? toLatLonString(options.boundingBox.bottomRight) : undefined,
    ...mapSearchBaseOptions(options)
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
    ...mapSearchBaseOptions(options)
  };
}

/**
 * @internal
 */
export function mapFuzzySearchOptions(options: FuzzySearchOptions): FuzzySearchOptionalParams {
  return {
    entityType: options.entityType,
    minFuzzyLevel: options.minFuzzyLevel,
    maxFuzzyLevel: options.maxFuzzyLevel,
    indexFilter: options.indexFilter,
    ...mapSearchPointOfInterestOptions(options)
  };
}

/* Result mappers */

/**
 * @internal
 */
export function mapAddress(address?: AddressInternal): Address | undefined {
  if (address) {
    const mappedAddress = {
      buildingNumber: address.buildingNumber,
      street: address.street,
      crossStreet: address.crossStreet,
      streetNumber: address.streetNumber,
      routeNumbers: address.routeNumbers,
      streetName: address.streetName,
      streetNameAndNumber: address.streetNameAndNumber,
      municipality: address.municipality,
      municipalitySubdivision: address.municipalitySubdivision,
      countryTertiarySubdivision: address.countryTertiarySubdivision,
      countrySecondarySubdivision: address.countrySecondarySubdivision,
      countrySubdivision: address.countrySubdivision,
      postalCode: address.postalCode,
      extendedPostalCode: address.extendedPostalCode,
      countryCode: address.countryCode,
      country: address.country,
      countryCodeISO3: address.countryCodeISO3,
      freeformAddress: address.freeformAddress,
      countrySubdivisionName: address.countrySecondarySubdivision,
      localName: address.localName,
      boundingBox: mapBoundingBoxFromCompassNotation(address.boundingBox)
    };
    return removeUndefinedProperties(mappedAddress);
  }
  return undefined;
}

/**
 * @internal
 */
export function mapSearchAddressResult(
  internalResult: SearchAddressResultInternal
): SearchAddressResult {
  const resultWithUndefinedProps = {
    query: internalResult.summary?.query,
    queryType: internalResult.summary?.queryType,
    queryTime: internalResult.summary?.queryTime,
    numResults: internalResult.summary?.numResults,
    top: internalResult.summary?.top,
    skip: internalResult.summary?.skip,
    totalResults: internalResult.summary?.totalResults,
    fuzzyLevel: internalResult.summary?.fuzzyLevel,
    geoBias: mapLatLongPairAbbreviatedToLatLon(internalResult.summary?.geoBias),
    results: internalResult.results?.map((ir) => {
      const mappedResult: SearchAddressResultItem = {
        type: ir.type,
        id: ir.id,
        score: ir.score,
        distanceInMeters: ir.distanceInMeters,
        info: ir.info,
        entityType: ir.entityType,
        pointOfInterest: ir.pointOfInterest,
        address: mapAddress(ir.address),
        position:
          ir.position && ir.position.lat && ir.position.lon
            ? toLatLon(ir.position.lat, ir.position.lon)
            : undefined,
        viewport: mapBoundingBox(ir.viewport),
        entryPoints: ir.entryPoints?.map((p) => {
          return { type: p.type, position: mapLatLongPairAbbreviatedToLatLon(p.position) };
        }),
        addressRanges: ir.addressRanges
          ? {
              rangeLeft: ir.addressRanges.rangeLeft,
              rangeRight: ir.addressRanges.rangeRight,
              from: mapLatLongPairAbbreviatedToLatLon(ir.addressRanges.from),
              to: mapLatLongPairAbbreviatedToLatLon(ir.addressRanges.to)
            }
          : undefined,
        dataSources: ir.dataSources,
        matchType: ir.matchType,
        detourTime: ir.detourTime
      };
      return removeUndefinedProperties(mappedResult);
    })
  };

  const result: SearchAddressResult = removeUndefinedProperties(resultWithUndefinedProps);
  return result;
}

/**
 * @internal
 */
export function removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
}

/**
 * @internal
 */
export function mapReverseSearchAddressResult(
  internalResult: ReverseSearchAddressResultInternal
): ReverseSearchAddressResult {
  const resultWithUndefinedProps = {
    queryTime: internalResult.summary?.queryTime,
    numResults: internalResult.summary?.numResults,
    results: internalResult.addresses?.map((ad) => {
      const mappedResult: ReverseSearchAddressResultItem = {
        address: mapAddress(ad.address),
        position: mapStringToLatLon(ad.position),
        roadUse: ad.roadUse,
        matchType: ad.matchType
      };
      return removeUndefinedProperties(mappedResult);
    })
  };
  const result: ReverseSearchAddressResult = removeUndefinedProperties(resultWithUndefinedProps);
  return result;
}

/**
 * @internal
 */
export function mapReverseSearchCrossStreetAddressResult(
  internalResult: ReverseSearchCrossStreetAddressResultInternal
): ReverseSearchCrossStreetAddressResult {
  const resultWithUndefinedProps = {
    queryTime: internalResult.summary?.queryTime,
    numResults: internalResult.summary?.numResults,
    results: internalResult.addresses?.map((ad) => {
      const mappedResult: ReverseSearchCrossStreetAddressResultItem = {
        address: mapAddress(ad.address),
        position: mapStringToLatLon(ad.position)
      };
      return removeUndefinedProperties(mappedResult);
    })
  };

  const result: ReverseSearchCrossStreetAddressResult = removeUndefinedProperties(
    resultWithUndefinedProps
  );
  return result;
}

/**
 * @Internal
 */
export function mapSearchAddressBatchResult(
  internalResult: SearchAddressBatchResult
): BatchResult<SearchAddressResult> {
  const result: BatchResult<SearchAddressResult> = {
    totalRequests: internalResult.batchSummary?.totalRequests,
    successfulRequests: internalResult.batchSummary?.successfulRequests,
    batchItems: internalResult.batchItems?.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: mapSearchAddressResult(item.response as SearchAddressResultInternal)
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    })
  };
  return result;
}

/**
 * @Internal
 */
export function mapReverseSearchAddressBatchResult(
  internalResult: ReverseSearchAddressBatchProcessResult
): BatchResult<ReverseSearchAddressResult> {
  const result: BatchResult<SearchAddressResult> = {
    totalRequests: internalResult.batchSummary?.totalRequests,
    successfulRequests: internalResult.batchSummary?.successfulRequests,
    batchItems: internalResult.batchItems?.map((item) => {
      if (item.statusCode === 200) {
        return {
          statusCode: item.statusCode,
          response: mapReverseSearchAddressResult(
            item.response as ReverseSearchAddressResultInternal
          )
        };
      } else {
        return { statusCode: item.statusCode, response: item.response as ErrorResponse };
      }
    })
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
  includeMatchType: "returnMatchType"
};

/**
 * @internal
 */
const clientToServiceNamesArray: Readonly<Record<string, string>> = {
  indexFilter: "idxSet",
  categoryFilter: "categorySet",
  brandFilter: "brandSet",
  countryFilter: "countrySet",
  electricVehicleConnectorFilter: "connectorSet",
  roadUse: "roadUse"
};

/**
 * @internal
 */
function createPartialQueryStringFromOptions(
  options: FuzzySearchRequestOptions | SearchAddressRequestOptions
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
      partialQuery += `&lat=${v.latitude}&lon=${v.longitude}`;
    } else if (k === "boundingBox") {
      partialQuery += `&topLeft=${v.topLeft.latitude},${v.topLeft.longitude}&btmRight=${v.bottomRight.latitude},${v.bottomRight.longitude}`;
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
      // Add top level query parameters
      let query = `?query=${r.query}`;
      if (r.coordinates) {
        query += `&lat=${r.coordinates.latitude}&lon=${r.coordinates.longitude}`;
      }
      if (r.countryFilter && r.countryFilter.length > 0) {
        query += `&countrySet=${r.countryFilter.join(",")}`;
      }

      // Add optional query parameters
      if (r.options) {
        query += createPartialQueryStringFromOptions(r.options);
      }

      return { query };
    })
  };
}

/**
 * @internal
 */
export function createSearchAddressBatchRequest(requests: SearchAddressRequest[]): BatchRequest {
  return {
    batchItems: requests.map((r) => {
      // Add top level query parameters
      let query = `?query=${r.query}`;

      // Add optional query parameters
      if (r.options) {
        query += createPartialQueryStringFromOptions(r.options);
      }
      return { query };
    })
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
      let query = `?query=${r.coordinates.latitude},${r.coordinates.longitude}`;

      // Add optional query parameters
      if (r.options) {
        query += createPartialQueryStringFromOptions(r.options);
      }
      return { query };
    })
  };
}
