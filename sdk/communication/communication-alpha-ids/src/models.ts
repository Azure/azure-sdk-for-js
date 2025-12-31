// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type {
  AlphaIdsGetAlphaIdsOptionalParams,
  AlphaIdsGetDynamicAlphaIdCountriesOptionalParams,
  AlphaIdsGetPreRegisteredAlphaIdCountriesOptionalParams,
} from "./index.js";
/**
 * Additional options for the Get Alpha ID Configuration request.
 */
export interface GetConfigurationOptions extends OperationOptions {}

/**
 * Additional options for the ListAlphaIds request.
 */
export interface ListAlphaIdsOptions extends AlphaIdsGetAlphaIdsOptionalParams {}

/**
 * Additional options for the GetDynamicAlphaIdCountries request.
 */
export interface GetDynamicAlphaIdCountriesOptions extends AlphaIdsGetDynamicAlphaIdCountriesOptionalParams {}

/**
 * Additional options for the GetPreRegisteredAlphaIdCountries request.
 */
export interface GetPreRegisteredAlphaIdCountriesOptions extends AlphaIdsGetPreRegisteredAlphaIdCountriesOptionalParams {}

/**
 * Additional options for the Upsert Alpha ID Configuration request.
 */
export interface UpsertConfigurationOptions extends OperationOptions {}

export {
  DynamicAlphaIdConfiguration,
  AlphaId,
  AlphaIdsGetAlphaIdsOptionalParams,
  AlphaIdsGetDynamicAlphaIdCountriesOptionalParams,
  AlphaIdsGetPreRegisteredAlphaIdCountriesOptionalParams,
  SupportedCountries,
} from "./generated/src/models/index.js";
