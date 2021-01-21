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
  PhoneNumbers as GeneratedClient,
  PhoneNumbersClient as PhoneNumbersGeneratedClient
} from "./generated/src/phoneNumbersClient";
import {
  AcquiredPhoneNumber,
  AcquiredPhoneNumberUpdate,
  PhoneNumberSearchRequest
} from "./generated/src/models";
import { SDK_VERSION } from "../common/constants";
import {
  GetPhoneNumberOptions,
  GetPhoneNumberResponse,
  ListPhoneNumbersOptions,
  UpdatePhoneNumberOptions,
  UpdatePhoneNumberResponse
} from "./models";
import { VoidResponse } from "../common/models";
import { attachHttpResponse } from "../common/mappers";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  BeginReleasePhoneNumbersOptions,
  PhoneNumberRelease,
  BeginReservePhoneNumbersOptions,
  PhoneNumberReservation,
  BeginPurchaseReservationOptions
} from "..";
import { BeginSearchAvailablePhoneNumbersOptions } from "./lroModels";

/**
 * Client options used to configure the PhoneNumbersClient API requests.
 */
export interface PhoneNumbersClientOptions extends PipelineOptions {}

const isPhoneNumbersClientOptions = (options: any): options is PhoneNumbersClientOptions =>
  options && !isKeyCredential(options);

/**
 * Client class for interacting with Azure Communication Services Phone Number Administration.
 */
export class PhoneNumbersClient {
  /**
   * A reference to the auto-generated PhoneNumber HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using a connection string.
   *
   * @param connectionString Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: PhoneNumbersClientOptions);

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using an Azure KeyCredential.
   *
   * @param url The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
   * @param credential An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  public constructor(url: string, credential: KeyCredential, options?: PhoneNumbersClientOptions);

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | PhoneNumbersClientOptions,
    maybeOptions: PhoneNumbersClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isPhoneNumbersClientOptions(credentialOrOptions)
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

    const authPolicy = createCommunicationAccessKeyCredentialPolicy(credential as KeyCredential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new PhoneNumbersGeneratedClient(url, pipeline).phoneNumbers;
  }

  /**
   * Updates an acquired phone number.
   *
   * @param {string} phoneNumber The E.164 formatted phone number to be updated. The leading plus can be either + or encoded as %2B.
   * @param {AcquiredPhoneNumberUpdate} update The updated properties which will be applied to the phone number.
   * @param {UpdatePhoneNumberOptions} options Additional request options.
   */
  public async updatePhoneNumber(
    phoneNumber: string,
    update: AcquiredPhoneNumberUpdate,
    options: UpdatePhoneNumberOptions = {}
  ): Promise<UpdatePhoneNumberResponse> {
    const { span, updatedOptions } = createSpan("PhoneNumbersClient-updatePhoneNumber", options);
    try {
      const { _response, ...acquiredPhoneNumber } = await this.client.updatePhoneNumber(
        phoneNumber,
        update,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return attachHttpResponse<AcquiredPhoneNumber>(acquiredPhoneNumber, _response);
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
   * Gets an acquired phone number.
   *
   * @param {string} phoneNumber The E.164 formatted phone number being fetched. The leading plus can be either + or encoded as %2B.
   * @param {GetPhoneNumberOptions} options Additional request options.
   */
  public async getPhoneNumber(
    phoneNumber: string,
    options: GetPhoneNumberOptions = {}
  ): Promise<GetPhoneNumberResponse> {
    const { span, updatedOptions } = createSpan("PhoneNumbersClient-getPhoneNumber", options);
    try {
      const { _response, ...acquiredPhoneNumber } = await this.client.getPhoneNumber(
        phoneNumber,
        updatedOptions
      );
      return attachHttpResponse<AcquiredPhoneNumber>(acquiredPhoneNumber, _response);
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
   * Deals with the pagination of listPhoneNumbers.
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {ListPhoneNumbersOptions} [options] Optional parameters for the underlying HTTP request.
   */
  private async *listPhoneNumbersPage(
    continuationState: PageSettings,
    options: ListPhoneNumbersOptions = {}
  ): AsyncIterableIterator<AcquiredPhoneNumber[]> {
    if (continuationState.continuationToken == null) {
      const currentResponse = await this.client.listPhoneNumbers(options);
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.value) {
        yield currentResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentResponse = await this.client.listPhoneNumbersNext(
        continuationState.continuationToken,
        options
      );
      continuationState.continuationToken = currentResponse.nextLink;

      if (currentResponse.value) {
        yield currentResponse.value;
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
   * let client = new PhoneNumbersClient(credentials);
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
   * @param {string[]} phoneNumbers The phone numbers to be released.
   * @param {BeginReleasePhoneNumbersOptions} options Additional request options.
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
   * @param {string} countryCode The ISO 3166-2 country code .
   * @param {PhoneNumberSearchRequest} search Request properties to constraint the search scope.
   * @param {BeginReservePhoneNumbersOptions} options Additional request options.
   */
  public async beginSearchAvailablePhoneNumbers(
    countryCode: string,
    search: PhoneNumberSearchRequest,
    options: BeginSearchAvailablePhoneNumbersOptions = {}
  ): Promise<PollerLike<PollOperationState<PhoneNumberReservation>, PhoneNumberReservation>> {
    const poller = await this.client.searchAvailablePhoneNumbers(countryCode, search, options);
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
   * @param {string} reservationId The id of the reservation to purchase.
   * @param {BeginPurchaseReservationOptions} options Additional request options.
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
