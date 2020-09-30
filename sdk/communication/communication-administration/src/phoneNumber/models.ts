// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { WithResponse } from "../common/models";
import {
  LocationOptionsDetails,
  NumberUpdateCapabilities,
  LocationOptionsQuery,
  UpdateNumberCapabilitiesResponse,
  UpdatePhoneNumberCapabilitiesResponse,
  ReleaseResponse,
  PhoneNumberRelease,
  CreateSearchResponse,
  AreaCodes,
  NumberConfigurationResponse,
  LocationOptionsResponse,
  PhoneNumberSearch
} from "./generated/src/models";

/**
 * Request to create a search.
 */
export interface CreateSearchRequest {
  /**
   * Display name of the search.
   */
  name: string;
  /**
   * Description of the search.
   */
  description: string;
  /**
   * List of subTypeIds associated with the search.
   */
  phonePlanIds: string[];
  /**
   * Areacode to search for.
   */
  areaCode: string;
}

/**
 * Options for creating a search.
 */
export interface CreateSearchOptions extends OperationOptions {
  /**
   * The quantity of phone numbers to request.
   */
  quantity?: number;
  /**
   * The location options of the search.
   */
  locationOptions?: LocationOptionsDetails[];
}

/**
 * A request for configuring a phone number.
 */
export interface ConfigurePhoneNumberRequest {
  /**
   * The E.164 representation representation of the phone number.
   */
  phoneNumber: string;
  /**
   * Associates the phone number with a given callback URL.
   */
  callbackUrl: string;
}

/**
 * Options for configuring a phone number.
 */
export interface ConfigurePhoneNumberOptions extends OperationOptions {
  /**
   * Associates the phone number with a given applicationId.
   */
  applicationId?: string;
  /**
   * Routable TargetId for the ACS Number
   */
  azurePstnTargetId?: string;
}

/**
 * Base options to pass a locale that is used for localizing strings in the responses.
 */
export interface LocalizationOptions extends OperationOptions {
  /**
   * Set locale to localize strings in responses.
   */
  locale?: string;
}

/**
 * Base options to pass pagination parameters.
 */
export interface PageableOptions extends OperationOptions {
  /**
   * An optional parameter for how many entries to skip, for pagination purposes. Default value: 0.
   */
  skip?: number;
  /**
   * An optional parameter for how many entries to return, for pagination purposes. Default value:
   * 100.
   */
  take?: number;
}

/**
 * Base options to pass a locale and pagination parameters in the same request.
 */
export interface PageableLocalizationOptions extends PageableOptions, LocalizationOptions {}

/**
 * Options for querying supported countries.
 */
export type ListSupportedCountriesOptions = PageableLocalizationOptions;

/**
 * Options for listing acquired phone numbers.
 */
export type ListPhoneNumbersOptions = PageableLocalizationOptions;

/**
 * Options for querying plan groups by country.
 */
export interface ListPhonePlanGroupsOptions extends PageableLocalizationOptions {
  includeRateInformation?: boolean;
}

/**
 * Request to get available area codes.
 */
export interface GetAreaCodesRequest {
  /**
   * The type of location information required by the plan.
   */
  locationType: string;
  /**
   * The ISO 3166-2 country code to find national destination codes for.
   */
  countryCode: string;
  /**
   * The phone plan's id.
   */
  phonePlanId: string;
}

/**
 * Options for querying available area codes.
 */
export interface GetAreaCodesOptions extends OperationOptions {
  /**
   * The location query to find national destination codes for.
   */
  locationOptions?: LocationOptionsQuery[];
}

/**
 * Additional request options for unconfiguring a phone number.
 */
export type UnconfigurePhoneNumberOptions = OperationOptions;

/**
 * Additional request options for getting the update capabilities request.
 */
export type GetCapabilitiesUpdateOptions = OperationOptions;

/**
 * Additional request options for requesting the release of a list of phone numbers.
 */
export type ReleasePhoneNumberOptions = OperationOptions;

/**
 * Additional request options for getting a release.
 */
export type GetReleaseOptions = OperationOptions;

/**
 * Additional request options for getting the configuration of a phone number.
 */
export type GetPhoneNumberConfigurationOptions = OperationOptions;

/**
 * Additional request option for search operations
 */
export type SearchOptions = OperationOptions;

/**
 * The capabilities update for each of a set of phone numbers.
 */
export type PhoneNumberCapabilitiesUpdates = { [propertyName: string]: NumberUpdateCapabilities };

/**
 * Additional options for updating phone numbers capabilities.
 */
export interface UpdateCapabilitiesOptions extends OperationOptions {
  phoneNumbers?: PhoneNumberCapabilitiesUpdates;
}

export interface ListPhonePlansRequest {
  /**
   * The ISO 3166-2 country code to find national destination codes for.
   */
  countryCode: string;
  /**
   * The id of the phone plan group to get plans from.
   */
  phonePlanGroupId: string;
}

/**
 * Options for listing phone plans.
 */
export type ListPhonePlansOptions = PageableLocalizationOptions;

export interface GetPhonePlanLocationOptionsRequest extends PageableLocalizationOptions {
  /**
   * The ISO 3166-2 country code to find national destination codes for.
   */
  countryCode: string;
  /**
   * The id of the phone plan group.
   */
  phonePlanGroupId: string;
  /**
   * The id of the phone plan.
   */
  phonePlanId: string;
}

/**
 * Options for getting a plan location options
 */
export type GetPhonePlanLocationOptionsOptions = PageableLocalizationOptions;

/**
 * Represents the response from updating the capabilities for a list of phone numbers
 */
export type UpdateNumbersCapabilitiesResponse = WithResponse<UpdateNumberCapabilitiesResponse>;

/**
 * Represents the response from getting the update capabilities request associated with a given id.
 */
export type GetCapabilitiesUpdateResponse = WithResponse<UpdatePhoneNumberCapabilitiesResponse>;

/**
 * Represents the response from requesting the release of a list of acquired phone numbers
 */
export type ReleasePhoneNumbersResponse = WithResponse<ReleaseResponse>;

/**
 * Represents the response from getting the release associated with a given id.
 */
export type GetReleaseResponse = WithResponse<PhoneNumberRelease>;

/**
 * Represents the response from starting a search for phone numbers
 */
export type CreatePhoneNumberSearchResponse = WithResponse<CreateSearchResponse>;

/**
 * Represents the response from getting a list of the supported area codes
 */
export type GetAreaCodesResponse = WithResponse<AreaCodes>;

/**
 * Represents the response from getting the configuration for a given number
 */
export type GetPhoneNumberConfigurationResponse = WithResponse<NumberConfigurationResponse>;

/**
 * Represents the response from getting the location options for a given phone plan
 */
export type GetPhonePlanLocationOptionsResponse = WithResponse<LocationOptionsResponse>;

/**
 * Represents the response from getting the search associated with a given id
 */
export type GetSearchResponse = WithResponse<PhoneNumberSearch>;
