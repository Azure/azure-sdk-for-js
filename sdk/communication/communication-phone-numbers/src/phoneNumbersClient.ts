// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy,
} from "@azure/communication-common";
import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
} from "@azure/core-http";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SpanStatusCode } from "@azure/core-tracing";
import { logger, createSpan, SDK_VERSION } from "./utils";
import { PhoneNumbersClient as PhoneNumbersGeneratedClient } from "./generated/src";
import { PhoneNumbers as GeneratedClient } from "./generated/src/operations";
import {
  PurchasedPhoneNumber,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberSearchResult,
} from "./generated/src/models/";
import {
  GetPurchasedPhoneNumberOptions,
  ListPurchasedPhoneNumbersOptions,
  SearchAvailablePhoneNumbersRequest,
  PurchasePhoneNumbersResult,
  ReleasePhoneNumberResult
} from "./models";
import {
  BeginPurchasePhoneNumbersOptions,
  BeginReleasePhoneNumberOptions,
  BeginSearchAvailablePhoneNumbersOptions,
  BeginUpdatePhoneNumberCapabilitiesOptions
} from "./lroModels";

/**
 * Client options used to configure the PhoneNumbersClient API requests.
 */
export interface PhoneNumbersClientOptions extends PipelineOptions {}

const isPhoneNumbersClientOptions = (options: any): options is PhoneNumbersClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

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
   * @param connectionString - Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(connectionString: string, options?: PhoneNumbersClientOptions);

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using an Azure KeyCredential.
   *
   * @param url - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(url: string, credential: KeyCredential, options?: PhoneNumbersClientOptions);

  /**
   * Initializes a new instance of the PhoneNumberAdministrationClient class using a TokenCredential.
   * @param url - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
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
          logger: logger.info,
        },
      },
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new PhoneNumbersGeneratedClient(url, pipeline).phoneNumbers;
  }

  /**
   * Gets the details of a purchased phone number. Includes phone number, cost, country code, etc.
   *
   * @param phoneNumber - The E.164 formatted phone number being fetched. The leading plus can be either + or encoded as %2B.
   * @param options - Additional request options.
   */
  public async getPurchasedPhoneNumber(
    phoneNumber: string,
    options: GetPurchasedPhoneNumberOptions = {}
  ): Promise<PurchasedPhoneNumber> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumbersClient-getPurchasedPhoneNumber",
      options
    );
    try {
      const { _response, ...results } = await this.client.getByNumber(phoneNumber, updatedOptions);
      return results;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates the purchased phone numbers.
   *
   * Example usage:
   * ```ts
   * let client = new PhoneNumbersClient(credentials);
   * for await (const purchased of client.listPhoneNumbers()) {
   *   console.log("phone number: ", purchased.phoneNumber);
   * }
   * ```
   * List all purchased phone numbers.
   * @param options - The optional parameters.
   */
  public listPurchasedPhoneNumbers(
    options: ListPurchasedPhoneNumbersOptions = {}
  ): PagedAsyncIterableIterator<PurchasedPhoneNumber> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumbersClient-listPurchasedPhoneNumbers",
      options
    );
    const iter = this.client.listPhoneNumbers(updatedOptions);
    span.end();
    return iter;
  }

  /**
   * Starts the release of a purchased phone number.
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
   * @param phoneNumber - The E.164 formatted phone number being released. The leading plus can be either + or encoded as %2B.
   * @param options - Additional request options.
   */
  public async beginReleasePhoneNumber(
    phoneNumber: string,
    options: BeginReleasePhoneNumberOptions = {}
  ): Promise<PollerLike<PollOperationState<ReleasePhoneNumberResult>, ReleasePhoneNumberResult>> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumbersClient-beginReleasePhoneNumber",
      options
    );

    try {
      return await this.client.releasePhoneNumber(phoneNumber, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
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
   * const searchPoller = await client.beginSearchAvailablePhoneNumbers(SEARCH_REQUEST);
   *
   * // Serializing the poller
   * const serialized = searchPoller.toString();
   *
   * // Waiting until it's done
   * const results = await searchPoller.pollUntilDone();
   * console.log(results);
   * ```
   *
   * @param search - Request properties to constraint the search scope.
   * @param options - Additional request options.
   */
  public async beginSearchAvailablePhoneNumbers(
    search: SearchAvailablePhoneNumbersRequest,
    options: BeginSearchAvailablePhoneNumbersOptions = {}
  ): Promise<PollerLike<PollOperationState<PhoneNumberSearchResult>, PhoneNumberSearchResult>> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumbersClient-beginSearchAvailablePhoneNumbers",
      options
    );

    try {
      const { countryCode, phoneNumberType, assignmentType, capabilities, ...rest } = search;
      return this.client.searchAvailablePhoneNumbers(
        countryCode,
        phoneNumberType,
        assignmentType,
        capabilities,
        {
          ...updatedOptions,
          ...rest,
        }
      );
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @param searchId - The id of the search to purchase. Returned from `beginSearchAvailablePhoneNumbers`
   * @param options - Additional request options.
   */
  public async beginPurchasePhoneNumbers(
    searchId: string,
    options: BeginPurchasePhoneNumbersOptions = {}
  ): Promise<
    PollerLike<PollOperationState<PurchasePhoneNumbersResult>, PurchasePhoneNumbersResult>
  > {
    const { span, updatedOptions } = createSpan(
      "PhoneNumbersClient-beginPurchasePhoneNumbers",
      options
    );

    try {
      return this.client.purchasePhoneNumbers({ ...updatedOptions, searchId });
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Starts the update of a purchased phone number's capabilities.
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
   * @param phoneNumber - The E.164 formatted phone number being updated. The leading plus can be either + or encoded as %2B.
   * @param request - The updated properties which will be applied to the phone number.
   * @param options - Additional request options.
   */
  public async beginUpdatePhoneNumberCapabilities(
    phoneNumber: string,
    request: PhoneNumberCapabilitiesRequest,
    options: BeginUpdatePhoneNumberCapabilitiesOptions = {}
  ): Promise<PollerLike<PollOperationState<PurchasedPhoneNumber>, PurchasedPhoneNumber>> {
    const { span, updatedOptions } = createSpan(
      "PhoneNumbersClient-beginUpdatePhoneNumberCapabilities",
      options
    );

    try {
      return this.client.updateCapabilities(phoneNumber, {
        ...updatedOptions,
        ...request,
      });
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
