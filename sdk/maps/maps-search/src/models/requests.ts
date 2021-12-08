// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FuzzySearchOptions, ReverseSearchAddressOptions, SearchAddressOptions } from "./options";
import { LatLon } from "./models";
import { OperationOptions } from "@azure/core-client";

/**
 * Request object containing parameters for making fuzzy search call
 */
export interface FuzzySearchRequest {
  query: string;
  coordinates?: LatLon;
  countryFilter?: string[];
  options?: FuzzySearchRequestOptions;
}

/**
 * Request object containing parameters for making search address call
 */
export interface SearchAddressRequest {
  query: string;
  options?: SearchAddressRequestOptions;
}

/**
 * Request object containing parameters for making reverse search address call
 */
export interface ReverseSearchAddressRequest {
  coordinates: LatLon;
  options?: ReverseSearchAddressRequestOptions;
}

export type FuzzySearchRequestOptions = Omit<FuzzySearchOptions, keyof OperationOptions>;
export type SearchAddressRequestOptions = Omit<SearchAddressOptions, keyof OperationOptions>;
export type ReverseSearchAddressRequestOptions = Omit<
  ReverseSearchAddressOptions,
  keyof OperationOptions
>;
