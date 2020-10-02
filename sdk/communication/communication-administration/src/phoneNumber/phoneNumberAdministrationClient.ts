// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  createCommunicationAccessKeyCredentialPolicy,
  parseClientArguments,
  isKeyCredential
} from "@azure/communication-common";
import { KeyCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { CanonicalCode } from "@opentelemetry/api";
import { logger } from "../common/logger";
import { createSpan } from "../common/tracing";
import {
  PhoneNumberRestClient,
  PhoneNumberAdministration
} from "./generated/src/phoneNumberRestClient";
import {
  AcquiredPhoneNumber,
  PhoneNumberCountry,
  PhonePlanGroup,
  PhonePlan,
  PhoneNumberEntity,
  UpdatePhoneNumberCapabilitiesResponse,
  ReleaseResponse,
  UpdateNumberCapabilitiesResponse,
  PhoneNumberRelease,
  CreateSearchResponse,
  AreaCodes,
  NumberConfigurationResponse,
  LocationOptionsResponse,
  PhoneNumberSearch,
  LocationOptionsQueries
} from "./generated/src/models";
import { SDK_VERSION } from "./constants";
import {
  CreateSearchOptions,
  CreateSearchRequest,
  GetAreaCodesOptions,
  ConfigurePhoneNumberOptions,
  ListSupportedCountriesOptions,
  ListPhoneNumbersOptions,
  ListPhonePlanGroupsOptions,
  UpdateCapabilitiesOptions,
  GetAreaCodesRequest,
  PageableOptions,
  ListPhonePlansRequest,
  ListPhonePlansOptions,
  GetPhonePlanLocationOptionsRequest,
  GetPhonePlanLocationOptionsOptions,
  ConfigurePhoneNumberRequest,
  UpdateNumbersCapabilitiesResponse,
  PhoneNumberCapabilitiesUpdates,
  GetCapabilitiesUpdateResponse,
  ReleasePhoneNumbersResponse,
  GetReleaseResponse,
  CreatePhoneNumberSearchResponse,
  GetAreaCodesResponse,
  GetPhoneNumberConfigurationResponse,
  GetPhonePlanLocationOptionsResponse,
  GetSearchResponse,
  GetCapabilitiesUpdateOptions,
  GetPhoneNumberConfigurationOptions,
  GetReleaseOptions,
  ReleasePhoneNumberOptions,
  UnconfigurePhoneNumberOptions,
  CancelSearchOptions,
  GetSearchOptions,
  PurchaseSearchOptions
} from "./models";
import { VoidResponse } from "../common/models";
import { attachHttpResponse } from "../common/mappers";

/**
 * Client options used to configure the UserTokenClient API requests.
 */
export interface PhoneNumberAdministrationClientOptions extends PipelineOptions {}

const isPhoneNumberAdministrationClientOptions = (
  options: any
): options is PhoneNumberAdministrationClientOptions => options && !isKeyCredential(options);

/**
 * Client class for interacting with Azure Communication Services PhoneNumber Administration.
 */
export class PhoneNumberAdministrationClient {
  /**
   * A reference to the auto-generated PhoneNumber HTTP client.
   */
  private readonly client: PhoneNumberAdministration;

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class.
   * @param connectionString Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: PhoneNumberAdministrationClientOptions);

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using an Azure KeyCredential.
   * @param url The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    url: string,
    credential: KeyCredential,
    options?: PhoneNumberAdministrationClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | PhoneNumberAdministrationClientOptions,
    maybeOptions: PhoneNumberAdministrationClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isPhoneNumberAdministrationClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;
    const libInfo = `azsdk-js-communication-administration/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAccessKeyCredentialPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new PhoneNumberRestClient(SDK_VERSION, url, pipeline).phoneNumberAdministration;
  }

  /**
   * Configures a phone number, for example to assign a callbackUrl.
   * @param config The configuration details
   * @param options Additional request options.
   */
  public async configurePhoneNumber(
    config: ConfigurePhoneNumberRequest,
    options: ConfigurePhoneNumberOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-configurePhoneNumber",
      options
    );
    const { phoneNumber, callbackUrl } = config;
    try {
      const { _response } = await this.client.configureNumber(
        {
          callbackUrl: callbackUrl,
          applicationId: updatedOptions.applicationId
        },
        phoneNumber,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Unconfigure a phone number, resetting its' configuration.
   * @param phoneNumber Phone Number to unconfigure.
   * @param options Additional request options.
   */
  public async unconfigurePhoneNumber(
    phoneNumber: string,
    options: UnconfigurePhoneNumberOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-unconfigurePhoneNumber",
      options
    );
    try {
      const { _response } = await this.client.unconfigureNumber(
        phoneNumber,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates the capabilities for a list of phone numbers.
   * The response includes the id of the created update capabilities request,
   * remember that id for subsequent calls to getCapabilitiesUpdate.
   * @param phoneNumberCapabilitiesUpdates Dictionary containing a list of phone numbers and their capabilities updates.
   * @param options Additional request options.
   */
  public async updatePhoneNumbersCapabilities(
    phoneNumberCapabilitiesUpdates: PhoneNumberCapabilitiesUpdates,
    options: UpdateCapabilitiesOptions = {}
  ): Promise<UpdateNumbersCapabilitiesResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-updatePhoneNumbersCapabilities",
      options
    );
    try {
      const { capabilitiesUpdateId, _response } = await this.client.updateCapabilities(
        phoneNumberCapabilitiesUpdates,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<UpdateNumberCapabilitiesResponse>(
        { capabilitiesUpdateId },
        _response
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get the update capabilities request associated with a given id.
   * @param capabilitiesUpdateId  The id associated with the request.
   * @param options Additional request options.
   */
  public async getCapabilitiesUpdate(
    capabilitiesUpdateId: string,
    options: GetCapabilitiesUpdateOptions = {}
  ): Promise<GetCapabilitiesUpdateResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getCapabilitiesUpdate",
      options
    );
    try {
      const { _response, ...rest } = await this.client.getCapabilitiesUpdate(
        capabilitiesUpdateId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<UpdatePhoneNumberCapabilitiesResponse>(rest, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Request the release of a list of acquired phone numbers.
   * The response includes the id of the created release,
   * remember that id for subsequent calls to getRelease.
   * @param phoneNumbers The phone numbers to be released.
   * @param options Additional request options.
   */
  public async releasePhoneNumbers(
    phoneNumbers: string[],
    options: ReleasePhoneNumberOptions = {}
  ): Promise<ReleasePhoneNumbersResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-releasePhoneNumbers",
      options
    );
    try {
      const { releaseId, _response } = await this.client.releasePhoneNumbers(
        phoneNumbers,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<ReleaseResponse>({ releaseId }, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the release associated with a given id.
   * Use this function to query the status of releases.
   * @param releaseId The id of the release returned by releasePhoneNumbers.
   * @param options Additional request options.
   */
  public async getRelease(
    releaseId: string,
    options: GetReleaseOptions = {}
  ): Promise<GetReleaseResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getRelease",
      options
    );
    try {
      const { _response, ...rest } = await this.client.getReleaseById(
        releaseId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<PhoneNumberRelease>(rest, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Starts a search for phone numbers given some constraints such as name or area code.
   * @param searchRequest Request properties to constraint the search scope.
   * @param options Additional request options.
   */
  public async createSearch(
    searchRequest: CreateSearchRequest,
    options: CreateSearchOptions = {}
  ): Promise<CreatePhoneNumberSearchResponse> {
    const { name, description, phonePlanIds, areaCode, quantity } = searchRequest;
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-createSearch",
      Object.assign(options, { quantity })
    );
    try {
      const { searchId, _response } = await this.client.createSearch(
        name,
        description,
        phonePlanIds,
        areaCode,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<CreateSearchResponse>({ searchId }, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a list of the supported area codes based on location.
   * @param request Request properties to constraint the search scope.
   * @param options Additional request options.
   */
  public async getAreaCodes(
    request: GetAreaCodesRequest,
    locationOptions: LocationOptionsQueries,
    options: GetAreaCodesOptions = {}
  ): Promise<GetAreaCodesResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getAllAreaCodes",
      Object.assign(options, { locationOptions })
    );
    const { countryCode: country, locationType, phonePlanId } = request;
    try {
      const { _response, ...rest } = await this.client.getAllAreaCodes(
        locationType,
        country,
        phonePlanId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<AreaCodes>(rest, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of listSearches.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {PageableOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listSearchesPage(
    continuationState: PageSettings,
    options: PageableOptions = {}
  ): AsyncIterableIterator<PhoneNumberEntity[]> {
    if (!continuationState.continuationToken) {
      const currentResponse = await this.client.getAllSearches(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.entities) {
        yield currentResponse.entities;
      }
    }

    while (continuationState.continuationToken) {
      const currentResponse = await this.client.getAllSearches(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.entities) {
        yield currentResponse.entities;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of listSearches.
   * @param {PageableOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listSearchesAll(
    options: PageableOptions = {}
  ): AsyncIterableIterator<PhoneNumberEntity> {
    for await (const entities of this.listSearchesPage({}, options)) {
      yield* entities;
    }
  }

  /**
   * Iterates the searches created by the Azure resource.
   *
   * Example usage:
   * ```ts
   * let client = new PhoneNumberAdministrationClient(credentials);
   * for await (const entity of client.listReleases()) {
   *   console.log("id: ", entity.id);
   * }
   * ```
   * Gets all searches created by the Azure resource.
   * @param {PageableOptions} [options] Optional parameters for the underlying HTTP request.
   */
  public listSearches(
    options: PageableOptions = {}
  ): PagedAsyncIterableIterator<PhoneNumberEntity> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-listSearches",
      options
    );
    const iter = this.listSearchesAll(options);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listSearchesPage(settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of listReleases.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {PageableOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listReleasesPage(
    continuationState: PageSettings,
    options: PageableOptions = {}
  ): AsyncIterableIterator<PhoneNumberEntity[]> {
    if (continuationState.continuationToken == null) {
      const currentResponse = await this.client.getAllReleases(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.entities) {
        yield currentResponse.entities;
      }
    }

    while (continuationState.continuationToken) {
      const currentResponse = await this.client.getAllReleases(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.entities) {
        yield currentResponse.entities;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of listReleases.
   * @param {PageableOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listReleasesAll(
    options: PageableOptions = {}
  ): AsyncIterableIterator<PhoneNumberEntity> {
    for await (const entities of this.listReleasesPage({}, options)) {
      yield* entities;
    }
  }

  /**
   * Iterates the releases created by the Azure resource.
   *
   * Example usage:
   * ```ts
   * let client = new PhoneNumberAdministrationClient(credentials);
   * for await (const entity of client.listReleases()) {
   *   console.log("id: ", entity.id);
   * }
   * ```
   * Gets all releases created by the Azure resource.
   * @param {PageableOptions} [options] Optional parameters for the underlying HTTP request.
   */
  public listReleases(
    options: PageableOptions = {}
  ): PagedAsyncIterableIterator<PhoneNumberEntity> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-listReleases",
      options
    );
    const iter = this.listReleasesAll(options);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listReleasesPage(settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of listSupportedCountries.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListSupportedCountriesOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listSupportedCountriesPage(
    continuationState: PageSettings,
    options: ListSupportedCountriesOptions = {}
  ): AsyncIterableIterator<PhoneNumberCountry[]> {
    if (continuationState.continuationToken == null) {
      const currentResponse = await this.client.getAllSupportedCountries(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.countries) {
        yield currentResponse.countries;
      }
    }

    while (continuationState.continuationToken) {
      const currentResponse = await this.client.getAllSupportedCountries(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.countries) {
        yield currentResponse.countries;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of listSupportedCountries.
   * @param {ListSupportedCountriesOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listSupportedCountriesAll(
    options: ListSupportedCountriesOptions = {}
  ): AsyncIterableIterator<PhoneNumberCountry> {
    for await (const countries of this.listSupportedCountriesPage({}, options)) {
      yield* countries;
    }
  }

  /**
   * Iterates the supported countries.
   *
   * Example usage:
   * ```ts
   * let client = new PhoneNumberAdministrationClient(credentials);
   * for await (const country of client.listSupportedCountries()) {
   *   console.log("country name: ", country.localizedName);
   * }
   * ```
   * @summary List all supported countries.
   * @param {ListSupportedCountriesOptions} [options] The optional parameters.
   */
  public listSupportedCountries(
    options: ListSupportedCountriesOptions = {}
  ): PagedAsyncIterableIterator<PhoneNumberCountry> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-listAllSupportedCountries",
      options
    );
    const iter = this.listSupportedCountriesAll(options);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listSupportedCountriesPage(settings, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of listPhoneNumbers.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListPhoneNumbersOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPhoneNumbersPage(
    continuationState: PageSettings,
    options: ListPhoneNumbersOptions = {}
  ): AsyncIterableIterator<AcquiredPhoneNumber[]> {
    if (continuationState.continuationToken == null) {
      const currentResponse = await this.client.getAllPhoneNumbers(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phoneNumbers) {
        yield currentResponse.phoneNumbers;
      }
    }

    while (continuationState.continuationToken) {
      const currentResponse = await this.client.getAllPhoneNumbers(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phoneNumbers) {
        yield currentResponse.phoneNumbers;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of listPhoneNumbers.
   * @param {ListPhoneNumbersOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPhoneNumbersAll(
    options: ListPhoneNumbersOptions = {}
  ): AsyncIterableIterator<AcquiredPhoneNumber> {
    for await (const phoneNumbers of this.listPhoneNumbersPage({}, options)) {
      yield* phoneNumbers;
    }
  }

  /**
   * Iterates the acquired phone numbers.
   *
   * Example usage:
   * ```ts
   * let client = new PhoneNumberAdministrationClient(credentials);
   * for await (const acquired of client.listPhoneNumbers()) {
   *   console.log("phone number: ", acquired.phoneNumber);
   * }
   * ```
   * @summary List all acquired phone numbers.
   * @param {ListPhoneNumbersOptions} [options] The optional parameters.
   */
  public listPhoneNumbers(
    options: ListPhoneNumbersOptions = {}
  ): PagedAsyncIterableIterator<AcquiredPhoneNumber> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-listAllPhoneNumbers",
      options
    );
    const iter = this.listPhoneNumbersAll(options);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => this.listPhoneNumbersPage(settings, updatedOptions)
    };
  }

  /**
   * Gets the configuration for a given phone number.
   * @param phoneNumber The E.164 representation of the phone number whose configuration is requested.
   * @param options Additional request options.
   */
  public async getPhoneNumberConfiguration(
    phoneNumber: string,
    options: GetPhoneNumberConfigurationOptions = {}
  ): Promise<GetPhoneNumberConfigurationResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getPhoneNumberConfiguration",
      options
    );
    try {
      const { pstnConfiguration, _response } = await this.client.getNumberConfiguration(
        phoneNumber,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<NumberConfigurationResponse>({ pstnConfiguration }, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of listPhonePlanGroups.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param countryCode The ISO 3166-2 country code, for example "FR" or "CN".
   * @param {ListPhonePlanGroupsOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPhonePlanGroupsPage(
    continuationState: PageSettings,
    countryCode: string,
    options: ListPhonePlanGroupsOptions = {}
  ): AsyncIterableIterator<PhonePlanGroup[]> {
    if (continuationState.continuationToken == null) {
      const currentResponse = await this.client.getPhonePlanGroups(countryCode, options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phonePlanGroups) {
        yield currentResponse.phonePlanGroups;
      }
    }

    while (continuationState.continuationToken) {
      const currentResponse = await this.client.getPhonePlanGroups(countryCode, options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phonePlanGroups) {
        yield currentResponse.phonePlanGroups;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of listPhonePlanGroups.
   * @param countryCode The ISO 3166-2 country code, for example "FR" or "CN".
   * @param {ListPlansForCountryOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPhonePlanGroupsAll(
    countryCode: string,
    options: ListPhonePlanGroupsOptions = {}
  ): AsyncIterableIterator<PhonePlanGroup> {
    for await (const phonePlanGroups of this.listPhonePlanGroupsPage({}, countryCode, options)) {
      yield* phonePlanGroups;
    }
  }

  /**
   * Iterates the available phone plan groups for a country.
   *
   * Example usage:
   * ```ts
   * let client = new PhoneNumberAdministrationClient(credentials);
   * for await (const phonePlanGroup of client.listPhonePlanGroups("CA")) {
   *   console.log("plan group id: ", phonePlanGroup.phonePlanGroupId);
   * }
   * ```
   * @summary List all available phone plan groups for a country.
   * @param {ListPhonePlanGroupsOptions} [options] The optional parameters.
   */
  public listPhonePlanGroups(
    countryCode: string,
    options: ListPhonePlanGroupsOptions = {}
  ): PagedAsyncIterableIterator<PhonePlanGroup> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-listPhonePlanGroups",
      options
    );
    const iter = this.listPhonePlanGroupsAll(countryCode, options);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPhonePlanGroupsPage(settings, countryCode, updatedOptions)
    };
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of listPhonePlans.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param planGroupInfo Information need to search for plans.
   * @param {GetPhonePlansOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPhonePlansPage(
    continuationState: PageSettings,
    planGroupInfo: ListPhonePlansRequest,
    options: ListPhonePlansOptions = {}
  ): AsyncIterableIterator<PhonePlan[]> {
    if (continuationState.continuationToken == null) {
      const currentResponse = await this.client.getPhonePlans(
        planGroupInfo.countryCode,
        planGroupInfo.phonePlanGroupId,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phonePlans) {
        yield currentResponse.phonePlans;
      }
    }

    while (continuationState.continuationToken) {
      const currentResponse = await this.client.getPhonePlans(
        planGroupInfo.countryCode,
        planGroupInfo.phonePlanGroupId,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phonePlans) {
        yield currentResponse.phonePlans;
      }
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of listPhonePlans.
   * @param planGroupInfo Information need to search for plans.
   * @param {ListPhonePlansOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPhonePlansAll(
    planGroupInfo: ListPhonePlansRequest,
    options: ListPhonePlansOptions = {}
  ): AsyncIterableIterator<PhonePlan> {
    for await (const phonePlans of this.listPhonePlansPage({}, planGroupInfo, options)) {
      yield* phonePlans;
    }
  }

  /**
   * Iterates the available phone plan for a plan group.
   *
   * Example usage:
   * ```ts
   * let client = new PhoneNumberAdministrationClient(credentials);
   * for await (const phonePlan of client.listPhonePlanGroups(PLAN_GROUP_INFO)) {
   *   console.log("plan id: ", phonePlan.phonePlanId);
   * }
   *
   * Gets all available phone plans for a given plan group.
   * @param planGroupInfo Information need to search for plans.
   * @param options Additional request options.
   */
  public listPhonePlans(
    planGroupInfo: ListPhonePlansRequest,
    options: ListPhonePlansOptions = {}
  ): PagedAsyncIterableIterator<PhonePlan> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-listPhonePlans",
      options
    );
    const iter = this.listPhonePlansAll(planGroupInfo, options);

    span.end();
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) =>
        this.listPhonePlansPage(settings, planGroupInfo, updatedOptions)
    };
  }

  /**
   * Gets the location options for a given phone plan.
   * @param request Request properties to constraint the search scope.
   * @param options Additional request options.
   */
  public async getPhonePlanLocationOptions(
    request: GetPhonePlanLocationOptionsRequest,
    options: GetPhonePlanLocationOptionsOptions = {}
  ): Promise<GetPhonePlanLocationOptionsResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getPhonePlanLocationOptions",
      options
    );
    const { countryCode, phonePlanGroupId, phonePlanId } = request;
    try {
      const { locationOptions, _response } = await this.client.getPhonePlanLocationOptions(
        countryCode,
        phonePlanGroupId,
        phonePlanId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<LocationOptionsResponse>({ locationOptions }, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the search associated with a given id.
   * Use this function to query the status of a search.
   * @param searchId The id of the search returned by createSearch.
   * @param options Additional request options.
   */
  public async getSearch(
    searchId: string,
    options: GetSearchOptions = {}
  ): Promise<GetSearchResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getSearch",
      options
    );
    try {
      const { _response, ...rest } = await this.client.getSearchById(
        searchId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<PhoneNumberSearch>(rest, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancels the search associated with a given id.
   * @param searchId The id of the search returned by createSearch.
   * @param options Additional request options.
   */
  public async cancelSearch(
    searchId: string,
    options: CancelSearchOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-cancelSearch",
      options
    );
    try {
      const { _response } = await this.client.cancelSearch(
        searchId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Purchases the search associated with a given id.
   * @param searchId The id of the search returned by createSearch.
   * @param options Additional request options.
   */
  public async purchaseSearch(
    searchId: string,
    options: PurchaseSearchOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-purchaseSearch",
      options
    );
    try {
      const { _response } = await this.client.purchaseSearch(
        searchId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

export {
  AreaCodes,
  CarrierDetails,
  LocationOptions,
  LocationOptionsDetails,
  NumberConfiguration,
  PhoneNumberAdministrationGetAllAreaCodesResponse,
  PhoneNumberAdministrationReleasePhoneNumbersResponse,
  PhoneNumberAdministrationGetReleaseByIdResponse,
  PhoneNumberAdministrationGetCapabilitiesUpdateResponse,
  PhoneNumberAdministrationGetSearchByIdResponse,
  PhoneNumberAdministrationGetNumberConfigurationResponse,
  PhoneNumberAdministrationCreateSearchResponse,
  PhoneNumberAdministrationGetPhonePlanLocationOptionsResponse,
  PstnConfiguration,
  ReleaseResponse,
  NumberUpdateCapabilities,
  UpdateNumberCapabilitiesResponse,
  Capability,
  PhoneNumberCountry,
  PhoneNumberCountries,
  LocationOptionsQuery,
  AcquiredPhoneNumber,
  AcquiredPhoneNumbers,
  UpdatePhoneNumberCapabilitiesResponse,
  PhonePlanGroups,
  PhonePlanGroup,
  PhonePlansResponse,
  PhonePlan,
  PhoneNumberRelease,
  PhoneNumberEntities,
  PhoneNumberSearch,
  AssignmentStatus,
  ActivationState,
  CapabilitiesUpdateStatus,
  PhoneNumberType,
  RateInformation,
  LocationType,
  ReleaseStatus,
  PhoneNumberReleaseDetails,
  PhoneNumberEntity,
  CurrencyType,
  PhoneNumberReleaseStatus,
  SearchStatus,
  LocationOptionsResponse,
  CreateSearchResponse,
  NumberConfigurationResponse,
  LocationOptionsQueries
} from "./generated/src/models";
