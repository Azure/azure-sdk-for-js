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
import { PollerLike, PollOperationState } from "@azure/core-lro";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { CanonicalCode } from "@opentelemetry/api";
import { logger, createSpan, attachHttpResponse, SDK_VERSION } from "./utils";
import {
  PhoneNumbers as GeneratedClient,
  PhoneNumbersClient as PhoneNumbersGeneratedClient
} from "./generated/src/phoneNumbersClient";
import {
  AcquiredPhoneNumber,
  AcquiredPhoneNumberUpdate,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberSearchRequest,
  PhoneNumberSearchResult
} from "./generated/src/models/";
import {
  GetPhoneNumberOptions,
  GetPhoneNumberResponse,
  ListPhoneNumbersOptions,
  UpdatePhoneNumberOptions,
  UpdatePhoneNumberResponse,
  VoidResponse
} from "./models";
import {
  BeginPurchasePhoneNumbersOptions,
  BeginReleasePhoneNumberOptions,
  BeginSearchAvailablePhoneNumbersOptions,
  BeginUpdatePhoneNumberOptions
} from "./lroModels";

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

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using a TokenCredential.
   * @param url The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential TokenCredential that is used to authenticate requests to the service.
   * @param options Optional. Options to configure the HTTP pipeline.
   */
  public constructor(url: string, credential: TokenCredential, options?: PhoneNumbersClientOptions);

  public constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | PhoneNumbersClientOptions,
    maybeOptions: PhoneNumbersClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isPhoneNumbersClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;
    const libInfo = `azsdk-js-communication-phone-numbers/${SDK_VERSION}`;

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
   * Starts the release of an acquired phone number.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new PhoneNumbersClient(CONNECTION_STRING);
   * const releasePoller = await client.beginReleasePhoneNumber("+14125550100");
   *
   * // Serializing the poller
   * const serialized = releasePoller.toString();
   *
   * // Waiting until it's done
   * const results = await releasePoller.pollUntilDone();
   * console.log(results);
   * ```
   * @param {string} phoneNumber The E.164 formatted phone number being released. The leading plus can be either + or encoded as %2B.
   * @param {BeginReleasePhoneNumberOptions} options Additional request options.
   */
  public async beginReleasePhoneNumber(
    phoneNumber: string,
    options: BeginReleasePhoneNumberOptions = {}
  ): Promise<PollerLike<PollOperationState<VoidResponse>, VoidResponse>> {
    const poller = await this.client.releasePhoneNumber(phoneNumber, options);
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
   * const serialized = searchPoller.toString();
   *
   * // Waiting until it's done
   * const results = await searchPoller.pollUntilDone();
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
  ): Promise<PollerLike<PollOperationState<PhoneNumberSearchResult>, PhoneNumberSearchResult>> {
    const poller = await this.client.searchAvailablePhoneNumbers(countryCode, search, options);
    return poller as any;
  }

  /**
   * Starts the purchase of the phone number(s) in the search associated with a given id.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new PhoneNumbersClient(CONNECTION_STRING);
   * const purchasePoller = await client.beginPurchasePhoneNumbers(SEARCH_ID);
   *
   * // Serializing the poller
   * const serialized = purchasePoller.toString();
   *
   * // Waiting until it's done
   * const results = await purchasePoller.pollUntilDone();
   * console.log(results);
   * ```
   *
   * @param {string} searchId The id of the search to purchase. Returned from `beginSearchAvailablePhoneNumbers`
   * @param {BeginPurchasePhoneNumbersOptions} options Additional request options.
   */
  public async beginPurchasePhoneNumbers(
    searchId: string,
    options: BeginPurchasePhoneNumbersOptions = {}
  ): Promise<PollerLike<PollOperationState<VoidResponse>, VoidResponse>> {
    const poller = this.client.purchasePhoneNumbers({ searchId }, options);
    return poller;
  }

  /**
   * Starts the update of an acquired phone number's capabilities.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts
   * const client = new PhoneNumbersClient(CONNECTION_STRING);
   * const updatePoller = await client.beginUpdatePhoneNumberCapabilities("+14125550100", UPDATE_REQUEST);
   *
   * // Serializing the poller
   * const serialized = updatePoller.toString();
   *
   * // Waiting until it's done
   * const results = await updatePoller.pollUntilDone();
   * console.log(results);
   * ```
   *
   * @param {string} phoneNumber The E.164 formatted phone number being updated. The leading plus can be either + or encoded as %2B.
   * @param {PhoneNumberCapabilitiesRequest} request The updated properties which will be applied to the phone number.
   * @param {BeginUpdatePhoneNumberOptions} options Additional request options.
   */
  public async beginUpdatePhoneNumberCapabilities(
    phoneNumber: string,
    request: PhoneNumberCapabilitiesRequest,
    options: BeginUpdatePhoneNumberOptions = {}
  ): Promise<PollerLike<PollOperationState<AcquiredPhoneNumber>, AcquiredPhoneNumber>> {
    const poller = this.client.updatePhoneNumberCapabilities(phoneNumber, request, options);
    return poller;
  }
}

export {} from "./generated/src/models";
