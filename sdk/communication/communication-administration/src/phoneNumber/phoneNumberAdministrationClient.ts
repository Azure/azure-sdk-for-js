// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { SpanStatusCode } from "@azure/core-tracing";
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
  UpdateNumberCapabilitiesResponse,
  PhoneNumberRelease,
  AreaCodes,
  NumberConfigurationResponse,
  LocationOptionsResponse,
  PhoneNumberReservation
} from "./generated/src/models";
import { SDK_VERSION } from "./constants";
import {
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
  GetAreaCodesResponse,
  GetPhoneNumberConfigurationResponse,
  GetPhonePlanLocationOptionsResponse,
  GetCapabilitiesUpdateOptions,
  GetPhoneNumberConfigurationOptions,
  UnconfigurePhoneNumberOptions,
  CreateReservationRequest,
  GetReservationOptions,
  GetReservationResponse,
  CancelReservationOptions
} from "./models";
import { VoidResponse } from "../common/models";
import { attachHttpResponse } from "../common/mappers";
import {
  BeginPurchaseReservationOptions,
  BeginReleasePhoneNumbersOptions,
  BeginReservePhoneNumbersOptions
} from "./lroModels";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { ReleasePhoneNumbersPoller } from "./lro/release/poller";
import { ReservePhoneNumbersPoller } from "./lro/reserve/poller";
import { PurchaseReservationPoller } from "./lro/purchase/poller";

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
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: PhoneNumberAdministrationClientOptions);

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: PhoneNumberAdministrationClientOptions
  );

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: PhoneNumberAdministrationClientOptions
  );

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | PhoneNumberAdministrationClientOptions,
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

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new PhoneNumberRestClient(url, pipeline).phoneNumberAdministration;
  }

  /**
   * Configures a phone number, for example to assign a callbackUrl.
   * @param config - The configuration details
   * @param options - Additional request options.
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
          phoneNumber,
          pstnConfiguration: {
            callbackUrl: callbackUrl,
            applicationId: updatedOptions.applicationId
          }
        },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Unconfigure a phone number, resetting its' configuration.
   * @param phoneNumber - Phone Number to unconfigure.
   * @param options - Additional request options.
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
        { phoneNumber },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param phoneNumberCapabilitiesUpdates - Dictionary containing a list of phone numbers and their capabilities updates.
   * @param options - Additional request options.
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
        {
          phoneNumberCapabilitiesUpdate: phoneNumberCapabilitiesUpdates
        },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<UpdateNumberCapabilitiesResponse>(
        { capabilitiesUpdateId },
        _response
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get the update capabilities request associated with a given id.
   * @param capabilitiesUpdateId -  The id associated with the request.
   * @param options - Additional request options.
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a list of the supported area codes based on location.
   * @param request - Request properties to constraint the search scope.
   * @param options - Additional request options.
   */
  public async getAreaCodes(
    request: GetAreaCodesRequest,
    options: GetAreaCodesOptions = {}
  ): Promise<GetAreaCodesResponse> {
    const { countryCode: country, locationType, phonePlanId, locationOptionsQueries } = request;
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getAllAreaCodes",
      options
    );
    try {
      const { _response, ...rest } = await this.client.getAllAreaCodes(
        locationType,
        country,
        phonePlanId,
        locationOptionsQueries,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<AreaCodes>(rest, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the configuration for a given phone number.
   * @param phoneNumber - The E.164 representation of the phone number whose configuration is requested.
   * @param options - Additional request options.
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
        { phoneNumber },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<NumberConfigurationResponse>({ pstnConfiguration }, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the location options for a given phone plan.
   * @param request - Request properties to constraint the search scope.
   * @param options - Additional request options.
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
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the reservation associated with a given id.
   * Use this function to query the status of a phone number reservation.
   * @param reservationId - The id of the reservation returned by createReservation.
   * @param options - Additional request options.
   */
  public async getReservation(
    reservationId: string,
    options: GetReservationOptions = {}
  ): Promise<GetReservationResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-getReservation",
      options
    );
    try {
      const { _response, ...rest } = await this.client.getSearchById(
        reservationId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<PhoneNumberReservation>(rest, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancels the reservation associated with a given id.
   * @param reservationId - The id of the reservation returned by createReservation.
   * @param options - Additional request options.
   */
  public async cancelReservation(
    reservationId: string,
    options: CancelReservationOptions = {}
  ): Promise<VoidResponse> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumberAdministrationClient-cancelReservation",
      options
    );
    try {
      const { _response } = await this.client.cancelSearch(
        reservationId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse({}, _response);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   *
   * Deals with the pagination of listSearches.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Optional parameters for the underlying HTTP request.
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
      const currentResponse = await this.client.getAllSearchesNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.entities) {
        yield currentResponse.entities;
      }
    }
  }

  /**
   * @internal
   *
   * Deals with the iteration of all the available results of listSearches.
   * @param options - Optional parameters for the underlying HTTP request.
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
   * for await (const entity of client.listSearches()) {
   *   console.log("id: ", entity.id);
   * }
   * ```
   * Gets all searches created by the Azure resource.
   * @param options - Optional parameters for the underlying HTTP request.
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
   *
   * Deals with the pagination of listReleases.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Optional parameters for the underlying HTTP request.
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
      const currentResponse = await this.client.getAllReleasesNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.entities) {
        yield currentResponse.entities;
      }
    }
  }

  /**
   * @internal
   *
   * Deals with the iteration of all the available results of listReleases.
   * @param options - Optional parameters for the underlying HTTP request.
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
   * @param options - Optional parameters for the underlying HTTP request.
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
   *
   * Deals with the pagination of listSupportedCountries.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Optional parameters for the underlying HTTP request.
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
      const currentResponse = await this.client.getAllSupportedCountriesNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.countries) {
        yield currentResponse.countries;
      }
    }
  }

  /**
   * @internal
   *
   * Deals with the iteration of all the available results of listSupportedCountries.
   * @param options - Optional parameters for the underlying HTTP request.
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
   * @param options - The optional parameters.
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
   *
   * Deals with the pagination of listPhoneNumbers.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param options - Optional parameters for the underlying HTTP request.
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
      const currentResponse = await this.client.getAllPhoneNumbersNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phoneNumbers) {
        yield currentResponse.phoneNumbers;
      }
    }
  }

  /**
   * @internal
   *
   * Deals with the iteration of all the available results of listPhoneNumbers.
   * @param options - Optional parameters for the underlying HTTP request.
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
   * @param options - The optional parameters.
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
   * @internal
   *
   * Deals with the pagination of listPhonePlanGroups.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param countryCode - The ISO 3166-2 country code, for example "FR" or "CN".
   * @param options - Optional parameters for the underlying HTTP request.
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
      const currentResponse = await this.client.getPhonePlanGroupsNext(
        countryCode,
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.phonePlanGroups) {
        yield currentResponse.phonePlanGroups;
      }
    }
  }

  /**
   * @internal
   *
   * Deals with the iteration of all the available results of listPhonePlanGroups.
   * @param countryCode - The ISO 3166-2 country code, for example "FR" or "CN".
   * @param options - Optional parameters for the underlying HTTP request.
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
   * @param options - The optional parameters.
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
   *
   * Deals with the pagination of listPhonePlans.
   * @param continuationState - An object that indicates the position of the paginated request.
   * @param planGroupInfo - Information need to search for plans.
   * @param options - Optional parameters for the underlying HTTP request.
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
      const currentResponse = await this.client.getPhonePlansNext(
        planGroupInfo.countryCode,
        planGroupInfo.phonePlanGroupId,
        continuationState.continuationToken,
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
   *
   * Deals with the iteration of all the available results of listPhonePlans.
   * @param planGroupInfo - Information need to search for plans.
   * @param options - Optional parameters for the underlying HTTP request.
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
   * ```
   * Gets all available phone plans for a given plan group.
   * @param planGroupInfo - Information need to search for plans.
   * @param options - Additional request options.
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
   * Starts the release of a list of acquired phone numbers.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new PhoneNumberAdministrationClient(CONNECTION_STRING);
   * const releasePoller = await client.beginReleasePhoneNumbers(PHONE_NUMBERS);
   *
   * // Serializing the poller
   * const serialized = releasePoller.toString();
   *
   * // Waiting until it's done
   * const results = await releasePoller.pollUntilDone();
   * console.log(results);
   * ```
   * @param phoneNumbers - The phone numbers to be released.
   * @param options - Additional request options.
   */
  public async beginReleasePhoneNumbers(
    phoneNumbers: string[],
    options: BeginReleasePhoneNumbersOptions = {}
  ): Promise<PollerLike<PollOperationState<PhoneNumberRelease>, PhoneNumberRelease>> {
    const { pollInterval, resumeFrom, ...requestOptions } = options;
    const poller = new ReleasePhoneNumbersPoller({
      phoneNumbers,
      client: this.client,
      pollInterval,
      resumeFrom,
      requestOptions
    });

    await poller.poll();
    return poller;
  }

  /**
   * Starts a search for phone numbers given some constraints such as name or area code.
   * The phone numbers that are found are reserved until you cancel, purchase or the reservation expires.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new PhoneNumberAdministrationClient(CONNECTION_STRING);
   * const reservePoller = await client.beginReservePhoneNumbers(RESERVATION_REQUEST);
   *
   * // Serializing the poller
   * const serialized = reservePoller.toString();
   *
   * // Waiting until it's done
   * const results = await reservePoller.pollUntilDone();
   * console.log(results);
   * ```
   *
   * @param reservationRequest - Request properties to constraint the search scope.
   * @param options - Additional request options.
   */
  public async beginReservePhoneNumbers(
    reservationRequest: CreateReservationRequest,
    options: BeginReservePhoneNumbersOptions = {}
  ): Promise<PollerLike<PollOperationState<PhoneNumberReservation>, PhoneNumberReservation>> {
    const { pollInterval, resumeFrom, ...requestOptions } = options;
    const poller = new ReservePhoneNumbersPoller({
      reservationRequest,
      client: this.client,
      pollInterval,
      resumeFrom,
      requestOptions
    });

    await poller.poll();
    return poller;
  }

  /**
   * Starts the purchase of the phone number(s) in the reservation associated with a given id.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new PhoneNumberAdministrationClient(CONNECTION_STRING);
   * const purchasePoller = await client.beginPurchaseReservation(RESERVATION_ID);
   *
   * // Serializing the poller
   * const serialized = purchasePoller.toString();
   *
   * // Waiting until it's done
   * const results = await purchasePoller.pollUntilDone();
   * console.log(results);
   * ```
   *
   * @param reservationId - The id of the reservation to purchase.
   * @param options - Additional request options.
   */
  public async beginPurchaseReservation(
    reservationId: string,
    options: BeginPurchaseReservationOptions = {}
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const { pollInterval, resumeFrom, ...requestOptions } = options;
    const poller = new PurchaseReservationPoller({
      reservationId,
      client: this.client,
      pollInterval,
      resumeFrom,
      requestOptions
    });

    await poller.poll();
    return poller;
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
  PhoneNumberAdministrationGetNumberConfigurationResponse,
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
  PhoneNumberReservation,
  AssignmentStatus,
  ActivationState,
  CapabilitiesUpdateStatus,
  PhoneNumberType,
  RateInformation,
  LocationType,
  ReleaseStatus,
  PhoneNumberReleaseDetails,
  PhoneNumberEntity,
  PhoneNumberReleaseStatus,
  SearchStatus,
  LocationOptionsResponse,
  NumberConfigurationResponse,
  LocationOptionsQueries
} from "./generated/src/models";
