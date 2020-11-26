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
  createPipelineFromOptions
} from "@azure/core-http";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { logger } from "../common/logger";
import { createSpan } from "../common/tracing";
import {
  PhoneNumberRestClient,
  PhoneNumberAdministration
} from "./generated/src/phoneNumberRestClient";
import { SDK_VERSION } from "./constants";
import { VoidResponse } from "../common/models";
import {
  BeginPurchasePhoneNumbersOptions,
  BeginReleasePhoneNumberOptions,
  BeginSearchAvailablePhoneNumbersOptions,
  BeginUpdatePhoneNumberOptions
} from "./lroModels";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  AcquiredPhoneNumber,
  AcquiredPhoneNumberUpdate,
  SearchRequest,
  SearchResult
} from "./generated/src/models";
import { GetPhoneNumberOptions, GetSearchResultOptions, ListPhoneNumbersOptions } from "./models";

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
    this.client = new PhoneNumberRestClient(url, pipeline).phoneNumberAdministration;
  }

  /**
   * Search for available phone numbers to purchase.
   * @param countryCode The ISO 3166-2 country code.
   * @param search The search request.
   * @param options The options parameters.
   */
  public async beginSearchAvailablePhoneNumbers(
    countryCode: string,
    search: SearchRequest,
    options?: BeginSearchAvailablePhoneNumbersOptions
  ): Promise<PollerLike<PollOperationState<SearchResult>, SearchResult>> {
    return this.client.searchAvailablePhoneNumbers(countryCode, search, options) as any;
  }

  /**
   * Get a search result by its id.
   * @param searchId The search Id.
   * @param options The options parameters.
   */
  public async getSearchResult(
    searchId: string,
    options?: GetSearchResultOptions
  ): Promise<SearchResult> {
    return this.getSearchResult(searchId, options);
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
   * Starts the release of of an acquired phone number.
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
   * @param {BeginReleasePhoneNumberOptions} options Additional request options.
   */
  public async beginReleasePhoneNumber(
    phoneNumber: string,
    options: BeginReleasePhoneNumberOptions = {}
  ): Promise<PollerLike<PollOperationState<VoidResponse>, VoidResponse>> {
    return await this.client.releasePhoneNumber(phoneNumber, options);
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
   * @param {BeginPurchasePhoneNumbersOptions} options Additional request options.
   */
  public async beginPurchasePhoneNumbers(
    searchId: string,
    options: BeginPurchasePhoneNumbersOptions = {}
  ): Promise<PollerLike<PollOperationState<VoidResponse>, VoidResponse>> {
    return await this.client.purchasePhoneNumbers({ searchId }, options);
  }

  /**
   * Gets information about an acquired phone number.
   * @param phoneNumber The phone number id in E.164 format. The leading plus can be either + or encoded
   *                    as %2B.
   * @param options The options parameters.
   */
  public async getPhoneNumber(
    phoneNumber: string,
    options?: GetPhoneNumberOptions
  ): Promise<AcquiredPhoneNumber> {
    return this.getPhoneNumber(phoneNumber, options);
  }

  /**
   * Update an acquired phone number.
   * @param phoneNumber The phone number id in E.164 format. The leading plus can be either + or encoded
   *                    as %2B.
   * @param update Update to an acquired phone number.
   * @param options The options parameters.
   */
  public async beginUpdatePhoneNumber(
    phoneNumber: string,
    update: AcquiredPhoneNumberUpdate,
    options?: BeginUpdatePhoneNumberOptions
  ): Promise<PollerLike<PollOperationState<AcquiredPhoneNumber>, AcquiredPhoneNumber>> {
    return this.client.updatePhoneNumber(phoneNumber, update, options) as any;
  }
}

export {
  AcquiredPhoneNumber,
  AcquiredPhoneNumbers,
  PhoneNumberType,
  AssignmentType,
  Capabilities,
  MonthlyRate,
  SearchRequest,
  SearchResult,
  AcquiredPhoneNumberUpdate,
  SearchCapabilities,
  CapabilityValue
} from "./generated/src/models";
