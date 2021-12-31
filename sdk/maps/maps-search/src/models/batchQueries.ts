// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FuzzySearchBaseOptions,
  ReverseSearchAddressOptions,
  SearchAddressOptions
} from "./options";
import { LatLon } from "./models";
import { OperationOptions } from "@azure/core-client";
import { FuzzySearchRequest } from "./options";

export type FuzzySearchQueryOptions = Omit<FuzzySearchBaseOptions, keyof OperationOptions>;
export type SearchAddressQueryOptions = Omit<SearchAddressOptions, keyof OperationOptions>;
export type ReverseSearchAddressQueryOptions = Omit<
  ReverseSearchAddressOptions,
  keyof OperationOptions
>;

/**
 * Request object containing parameters for making fuzzy search call
 */
export type FuzzySearchQuery = FuzzySearchRequest & {
  options?: FuzzySearchQueryOptions;
};

/**
 * Request object containing parameters for making search address call
 */
export interface SearchAddressQuery {
  query: string;
  options?: SearchAddressQueryOptions;
}

/**
 * Request object containing parameters for making reverse search address call
 */
export interface ReverseSearchAddressQuery {
  coordinates: LatLon;
  options?: ReverseSearchAddressQueryOptions;
}
