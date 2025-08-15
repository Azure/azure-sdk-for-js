// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />

/* eslint-disable @azure/azure-sdk/ts-naming-options */
import {
  createCommunicationAuthPolicy,
  isKeyCredential,
  parseClientArguments,
} from "@azure/communication-common";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { InternalPipelineOptions } from "@azure/core-rest-pipeline";
import type { PollOperationState, PollerLike } from "@azure/core-lro";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PhoneNumbersClient as PhoneNumbersGeneratedClient } from "./generated/src/index.js";
import type {
  AvailablePhoneNumber,
  OperatorInformationResult,
  PhoneNumberAreaCode,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberCountry,
  PhoneNumberLocality,
  PhoneNumberOffering,
  PhoneNumbersBrowseResult,
  PhoneNumberSearchResult,
  PhoneNumbersReservation,
  PurchasedPhoneNumber,
} from "./generated/src/models/index.js";
import type {
  BrowseAvailableNumbersRequest,
  DeleteReservationOptions,
  GetPurchasedPhoneNumberOptions,
  GetReservationOptions,
  ListAvailableCountriesOptions,
  ListGeographicAreaCodesOptions,
  ListMobileAreaCodesOptions,
  ListLocalitiesOptions,
  ListOfferingsOptions,
  ListPurchasedPhoneNumbersOptions,
  ListReservationOptions,
  ListTollFreeAreaCodesOptions,
  PurchasePhoneNumbersResult,
  ReleasePhoneNumberResult,
  SearchAvailablePhoneNumbersRequest,
  SearchOperatorInformationOptions,
  CreateOrUpdateReservationOptions,
  BrowseAvailableNumbersOptions,
  CreateOrUpdateReservationRequest,
} from "./models.js";
import type {
  BeginPurchasePhoneNumbersOptions,
  BeginReleasePhoneNumberOptions,
  BeginReservationPurchaseOptions,
  BeginSearchAvailablePhoneNumbersOptions,
  BeginUpdatePhoneNumberCapabilitiesOptions,
} from "./lroModels.js";
import { createPhoneNumbersPagingPolicy } from "./utils/customPipelinePolicies.js";
import type { CommonClientOptions } from "@azure/core-client";
import { logger } from "./utils/index.js";
import { tracingClient } from "./generated/src/tracing.js";

/**
 * Client options used to configure the PhoneNumbersClient API requests.
 */
export interface PhoneNumbersClientOptions extends CommonClientOptions {
  /**
   * The accept language parameter to be used in the request header's "accept-language" property.
   */
  acceptLanguage?: string;
}

const isPhoneNumbersClientOptions = (options: any): options is PhoneNumbersClientOptions =>
  options && !isKeyCredential(options) && !isTokenCredential(options);

/**
 * Client class for interacting with Azure Communication Services Phone Number Administration.
 */
export class PhoneNumbersClient {
  /**
   * A reference to the auto-generated PhoneNumber HTTP client.
   */
  private readonly client: PhoneNumbersGeneratedClient;

  /**
   * The accept language parameter to be used in the request header's "accept-language" property.
   */
  private acceptLanguage: string | undefined;

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
    maybeOptions: PhoneNumbersClientOptions = {},
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isPhoneNumbersClientOptions(credentialOrOptions)
      ? credentialOrOptions
      : maybeOptions;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new PhoneNumbersGeneratedClient(url, {
      endpoint: url,
      ...internalPipelineOptions,
    });
    const authPolicy = createCommunicationAuthPolicy(credential);
    this.client.pipeline.addPolicy(authPolicy);

    // This policy is temporary workarounds to address compatibility issues with Azure Core V2.
    const phoneNumbersPagingPolicy = createPhoneNumbersPagingPolicy(url);
    this.client.pipeline.addPolicy(phoneNumbersPagingPolicy);
    this.acceptLanguage = maybeOptions.acceptLanguage;
  }

  /**
   * Deletes a reservation by its ID..
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientDeleteReservation
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const reservationId = "<reservation-id>";
   * await client.deleteReservation(reservationId);
   *
   * console.log(`Reservation with ID ${reservationId} has been deleted.`);
   * ```
   * Delete a reservation.
   * @param reservationId - The id of the reservation.
   * @param options - Additional request options.
   */
  public deleteReservation(
    reservationId: string,
    options: DeleteReservationOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "PhoneNumbersClient-deleteReservation",
      options,
      (updatedOptions) => {
        return this.client.phoneNumbers.deleteReservation(reservationId, {
          ...updatedOptions,
        });
      },
    );
  }

  /**
   * Gets the details of a purchased phone number. Includes phone number, cost, country code, etc.
   *
   * @param phoneNumber - The E.164 formatted phone number being fetched. The leading plus can be either + or encoded as %2B.
   * @param options - Additional request options.
   */
  public getPurchasedPhoneNumber(
    phoneNumber: string,
    options: GetPurchasedPhoneNumberOptions = {},
  ): Promise<PurchasedPhoneNumber> {
    return tracingClient.withSpan(
      "PhoneNumbersClient-getPurchasedPhoneNumber",
      options,
      (updatedOptions) => {
        return this.client.phoneNumbers.getByNumber(phoneNumber, {
          ...updatedOptions,
        });
      },
    );
  }

  /**
   * Retrieves the reservation with the given ID, including all of the phone numbers associated with it.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientGetReservation
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const reservationId = "<reservation-id>";
   * const reservationResponse = await client.getReservation(reservationId);
   *
   * console.log(`Phone numbers in reservation: ${reservationResponse.phoneNumbers}`);
   * ```
   * Get a reservation.
   * @param reservationId - The id of the reservation.
   * @param options - Additional request options.
   */
  public getReservation(
    reservationId: string,
    options: GetReservationOptions = {},
  ): Promise<PhoneNumbersReservation> {
    return tracingClient.withSpan(
      "PhoneNumbersClient-getReservation",
      options,
      (updatedOptions) => {
        return this.client.phoneNumbers.getReservation(reservationId, {
          ...updatedOptions,
        });
      },
    );
  }

  /**
   * Iterates the purchased phone numbers.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListPurchasedPhoneNumbers
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const phoneNumbers = client.listPurchasedPhoneNumbers();
   *
   * for await (const phoneNumber of phoneNumbers) {
   *   console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
   *   console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
   * }
   * ```
   * List all purchased phone numbers.
   * @param options - The optional parameters.
   */
  public listPurchasedPhoneNumbers(
    options: ListPurchasedPhoneNumbersOptions = {},
  ): PagedAsyncIterableIterator<PurchasedPhoneNumber> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listPurchasedPhoneNumbers",
      options,
    );

    try {
      return this.client.phoneNumbers.listPhoneNumbers({
        ...updatedOptions,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Browses for available phone numbers to purchase.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientBrowseAvailablePhoneNumbers
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   PhoneNumbersClient,
   *   BrowseAvailableNumbersRequest,
   * } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
   *   countryCode: "US",
   *   phoneNumberType: "tollFree",
   * };
   * const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
   *   browseAvailableNumberRequest,
   *   {
   *     capabilities: {
   *       calling: "outbound",
   *     },
   *     assignmentType: "application",
   *   },
   * );
   * for (const phoneNumber of browseAvailableNumbers.phoneNumbers) {
   *   console.log("Found phone number: ", phoneNumber.phoneNumber);
   * }
   * ```
   * Browse available phone numbers
   * @param request - The request parameters for browsing available phone numbers.
   * @param options - Additional request options.
   */
  public browseAvailablePhoneNumbers(
    request: BrowseAvailableNumbersRequest,
    options?: BrowseAvailableNumbersOptions,
  ): Promise<PhoneNumbersBrowseResult> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-browseAvailableNumbers",
      options,
    );

    try {
      const { countryCode, phoneNumberType, ...rest } = request;
      return this.client.phoneNumbers.browseAvailableNumbers(countryCode, phoneNumberType, {
        ...updatedOptions,
        ...rest,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Starts the release of a purchased phone number.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientReleasePhoneNumber
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const phoneNumberToRelease = "<phone-number-to-release>";
   *
   * const releasePoller = await client.beginReleasePhoneNumber(phoneNumberToRelease);
   *
   * // Release is underway.
   * await releasePoller.pollUntilDone();
   * console.log("Successfully release phone number.");
   * ```
   * @param phoneNumber - The E.164 formatted phone number being released. The leading plus can be either + or encoded as %2B.
   * @param options - Additional request options.
   */
  public beginReleasePhoneNumber(
    phoneNumber: string,
    options: BeginReleasePhoneNumberOptions = {},
  ): Promise<PollerLike<PollOperationState<ReleasePhoneNumberResult>, ReleasePhoneNumberResult>> {
    return tracingClient.withSpan(
      "PhoneNumbersClient-beginReleasePhoneNumber",
      options,
      (updatedOptions) => {
        return this.client.phoneNumbers.beginReleasePhoneNumber(phoneNumber, updatedOptions);
      },
    );
  }

  /**
   * Starts a search for phone numbers given some constraints such as name or area code.
   * The phone numbers that are found are reserved until you cancel, purchase or the reservation expires.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientSearchAvailablePhoneNumbers
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   PhoneNumbersClient,
   *   SearchAvailablePhoneNumbersRequest,
   * } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const searchRequest: SearchAvailablePhoneNumbersRequest = {
   *   countryCode: "US",
   *   phoneNumberType: "tollFree",
   *   assignmentType: "application",
   *   capabilities: {
   *     sms: "outbound",
   *     calling: "none",
   *   },
   *   quantity: 1,
   * };
   *
   * const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);
   *
   * // The search is underway. Wait to receive searchId.
   * const searchResults = await searchPoller.pollUntilDone();
   * console.log(`Found phone number: ${searchResults.phoneNumbers[0]}`);
   * console.log(`searchId: ${searchResults.searchId}`);
   * ```
   *
   * @param search - Request properties to constraint the search scope.
   * @param options - Additional request options.
   */
  public beginSearchAvailablePhoneNumbers(
    search: SearchAvailablePhoneNumbersRequest,
    options: BeginSearchAvailablePhoneNumbersOptions = {},
  ): Promise<PollerLike<PollOperationState<PhoneNumberSearchResult>, PhoneNumberSearchResult>> {
    return tracingClient.withSpan(
      "PhoneNumbersClient-beginSearchAvailablePhoneNumbers",
      options,
      (updatedOptions) => {
        const { countryCode, phoneNumberType, assignmentType, capabilities, ...rest } = search;
        return this.client.phoneNumbers.beginSearchAvailablePhoneNumbers(
          countryCode,
          phoneNumberType,
          assignmentType,
          capabilities,
          {
            ...updatedOptions,
            ...rest,
          },
        );
      },
    );
  }

  /**
   * Starts the purchase of the phone number(s) in the search associated with a given id.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientPurchasePhoneNumbers
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   PhoneNumbersClient,
   *   SearchAvailablePhoneNumbersRequest,
   * } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const searchRequest: SearchAvailablePhoneNumbersRequest = {
   *   countryCode: "US",
   *   phoneNumberType: "tollFree",
   *   assignmentType: "application",
   *   capabilities: {
   *     sms: "outbound",
   *     calling: "none",
   *   },
   *   quantity: 1,
   * };
   *
   * const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);
   *
   * // The search is underway. Wait to receive searchId.
   * const { searchId, phoneNumbers } = await searchPoller.pollUntilDone();
   *
   * const purchasePoller = await client.beginPurchasePhoneNumbers(searchId);
   *
   * // Purchase is underway.
   * await purchasePoller.pollUntilDone();
   * console.log(`Successfully purchased ${phoneNumbers[0]}`);
   * ```
   *
   * @param searchId - The id of the search to purchase. Returned from `beginSearchAvailablePhoneNumbers`
   * @param options - Additional request options.
   */
  public beginPurchasePhoneNumbers(
    searchId: string,
    options: BeginPurchasePhoneNumbersOptions = {},
  ): Promise<
    PollerLike<PollOperationState<PurchasePhoneNumbersResult>, PurchasePhoneNumbersResult>
  > {
    return tracingClient.withSpan(
      "PhoneNumbersClient-beginPurchasePhoneNumbers",
      options,
      (updatedOptions) => {
        return this.client.phoneNumbers.beginPurchasePhoneNumbers({
          ...updatedOptions,
          searchId,
        });
      },
    );
  }

  /**
   * Starts the purchase of the phone number(s) in the search associated with a given id.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientBeginReservationPurchase
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const reservationId = "<reservation-id>";
   *
   * const purchasePoller = await client.beginReservationPurchase(reservationId);
   *
   * // Purchase is underway.
   * const purchaseResult = await purchasePoller.pollUntilDone();
   * console.log(`Successfully purchased phone numbers in reservation: ${reservationId}`);
   * ```
   * Begins the purchase of the phone numbers in the reservation with the given ID.
   * @param reservationId - The id of the reservation.
   * @param options - Additional request options.
   */
  public beginReservationPurchase(
    reservationId: string,
    options: BeginReservationPurchaseOptions = {},
  ): Promise<
    PollerLike<PollOperationState<PurchasePhoneNumbersResult>, PurchasePhoneNumbersResult>
  > {
    return tracingClient.withSpan(
      "PhoneNumbersClient-beginReservationPurchase",
      options,
      (updatedOptions) => {
        return this.client.phoneNumbers.beginPurchaseReservation(reservationId, {
          ...updatedOptions,
        });
      },
    );
  }

  /**
   * Starts the update of a purchased phone number's capabilities.
   *
   * This function returns a Long Running Operation poller that allows you to wait indefinitely until the operation is complete.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientUpdatePhoneNumberCapabilities
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   PhoneNumbersClient,
   *   PhoneNumberCapabilitiesRequest,
   * } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const phoneNumberToUpdate = "<phone-number-to-update>";
   *
   * // This will update phone number to send and receive sms, but only send calls.
   * const updateRequest: PhoneNumberCapabilitiesRequest = {
   *   sms: "inbound+outbound",
   *   calling: "outbound",
   * };
   *
   * const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
   *   phoneNumberToUpdate,
   *   updateRequest,
   * );
   *
   * // Update is underway.
   * const { capabilities } = await updatePoller.pollUntilDone();
   * console.log(`These are the update capabilities: ${capabilities}`);
   * ```
   *
   * @param phoneNumber - The E.164 formatted phone number being updated. The leading plus can be either + or encoded as %2B.
   * @param request - The updated properties which will be applied to the phone number.
   * @param options - Additional request options.
   */
  public beginUpdatePhoneNumberCapabilities(
    phoneNumber: string,
    request: PhoneNumberCapabilitiesRequest,
    options: BeginUpdatePhoneNumberCapabilitiesOptions = {},
  ): Promise<PollerLike<PollOperationState<PurchasedPhoneNumber>, PurchasedPhoneNumber>> {
    if (!phoneNumber) {
      throw Error("phone number can't be empty");
    }
    return tracingClient.withSpan(
      "PhoneNumbersClient-beginUpdatePhoneNumberCapabilities",
      options,
      (updatedOptions) => {
        return this.client.phoneNumbers.beginUpdateCapabilities(phoneNumber, {
          ...updatedOptions,
          ...request,
        });
      },
    );
  }

  /**
   * Adds and removes phone numbers from the reservation with the given ID. The response will be the
   * updated state of the reservation. Phone numbers can be reserved by including them in the payload. If
   * a number is already in the reservation, it will be ignored. To remove a phone number, set it
   * explicitly to null in the request payload. This operation is idempotent. If a reservation with the
   * same ID already exists, it will be updated, otherwise a new one is created. Only reservations with
   * 'active' status can be updated. Updating a reservation will extend the expiration time of the
   * reservation to 15 minutes after the last change, up to a maximum of 2 hours from creation time.
   * Partial success is possible, in which case the response will have a 207 status code.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientBrowseAndReserveAvailablePhoneNumbers
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   PhoneNumbersClient,
   *   BrowseAvailableNumbersRequest,
   *   AvailablePhoneNumber,
   * } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
   *   countryCode: "US",
   *   phoneNumberType: "tollFree",
   * };
   *
   * const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
   *   browseAvailableNumberRequest,
   *   {
   *     capabilities: {
   *       calling: "outbound",
   *     },
   *     assignmentType: "application",
   *   },
   * );
   * const phoneNumbers = browseAvailableNumbers.phoneNumbers;
   * const phoneNumbersList = [phoneNumbers[0], phoneNumbers[1]];
   * const reservationResponse = await client.createOrUpdateReservation(
   *   {
   *     reservationId: "reservationId",
   *   },
   *   {
   *     add: phoneNumbersList,
   *   },
   * );
   * const numbersWithError: AvailablePhoneNumber[] = [];
   * for (const number of Object.values(reservationResponse.phoneNumbers || {})) {
   *   if (number != null && number.status === "error") {
   *     numbersWithError.push(number);
   *   }
   * }
   * if (numbersWithError.length > 0) {
   *   console.log("Errors occurred during reservation");
   * } else {
   *   console.log("Reservation operation completed without errors.");
   * }
   * ```
   *
   * Create or update a reservation.
   * @param request - The request parameters for creating or updating a reservation.
   * @param options - The options parameters.
   */
  public async createOrUpdateReservation(
    request: CreateOrUpdateReservationRequest,
    options?: CreateOrUpdateReservationOptions,
  ): Promise<PhoneNumbersReservation> {
    const phoneNumbersReservation: { [propertyName: string]: AvailablePhoneNumber | null } = {};

    if (options?.add) {
      this.addPhoneNumbersToReservation(phoneNumbersReservation, options.add);
    }

    if (options?.remove) {
      this.removePhoneNumbersFromReservation(phoneNumbersReservation, options.remove);
    }

    const reservationOptionalParams = {
      ...options,
      phoneNumbers: phoneNumbersReservation,
    };
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-createOrUpdateReservation",
      reservationOptionalParams,
    );

    try {
      return this.client.phoneNumbers.createOrUpdateReservation(
        request.reservationId,
        updatedOptions,
      );
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates the available countries.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListAvailableCountries
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * for await (const country of client.listAvailableCountries()) {
   *   console.log("country: ", country.localizedName);
   * }
   * ```
   * List all available countries.
   * @param options - The optional parameters.
   */
  public listAvailableCountries(
    options: ListAvailableCountriesOptions = {},
  ): PagedAsyncIterableIterator<PhoneNumberCountry> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listAvailableCountries",
      options,
    );

    try {
      return this.client.phoneNumbers.listAvailableCountries({
        ...updatedOptions,
        acceptLanguage: this.acceptLanguage,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates the available Toll-Free area codes.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListTollFreeAreaCodes
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * for await (const areaCodeItem of client.listAvailableTollFreeAreaCodes("US")) {
   *   console.log("area code: ", areaCodeItem.areaCode);
   * }
   * ```
   * List all available Toll-Free area codes.
   * @param countryCode - The ISO 3166-2 country code.
   * @param options - The optional parameters.
   */
  public listAvailableTollFreeAreaCodes(
    countryCode: string,
    options: ListTollFreeAreaCodesOptions = {},
  ): PagedAsyncIterableIterator<PhoneNumberAreaCode> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listAvailableTollFreeAreaCodes",
      options,
    );

    try {
      return this.client.phoneNumbers.listAreaCodes(countryCode, "tollFree", {
        ...updatedOptions,
        assignmentType: "application",
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates the available Geographic area codes.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListGeographicAreaCodes
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * for await (const areaCodeItem of client.listAvailableGeographicAreaCodes("US")) {
   *   console.log("area code: ", areaCodeItem.areaCode);
   * }
   * ```
   * List all available Geographic area codes.
   * @param countryCode - The ISO 3166-2 country code.
   * @param options - The optional parameters.
   */
  public listAvailableGeographicAreaCodes(
    countryCode: string,
    options: ListGeographicAreaCodesOptions = {},
  ): PagedAsyncIterableIterator<PhoneNumberAreaCode> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listAvailableGeographicFreeAreaCodes",
      options,
    );

    try {
      return this.client.phoneNumbers.listAreaCodes(countryCode, "geographic", {
        ...updatedOptions,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates the available Mobile area codes.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListMobileAreaCodes
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * for await (const areaCodeItem of client.listAvailableMobileAreaCodes("IE")) {
   *   console.log("area code: ", areaCodeItem.areaCode);
   * }
   * ```
   * List all available mobile area codes.
   * @param countryCode - The ISO 3166-2 country code.
   * @param options - The optional parameters.
   */
  public listAvailableMobileAreaCodes(
    countryCode: string,
    options: ListMobileAreaCodesOptions = {},
  ): PagedAsyncIterableIterator<PhoneNumberAreaCode> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listAvailableMobileAreaCodes",
      options,
    );

    try {
      return this.client.phoneNumbers.listAreaCodes(countryCode, "mobile", {
        ...updatedOptions,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates the available localities.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListAvailableLocalities
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * for await (const locality of client.listAvailableLocalities("US")) {
   *   console.log("locality: ", locality.localizedName);
   * }
   * ```
   * List all available localities.
   * @param countryCode - The ISO 3166-2 country code.
   * @param options - The optional parameters.
   */
  public listAvailableLocalities(
    countryCode: string,
    options: ListLocalitiesOptions = {},
  ): PagedAsyncIterableIterator<PhoneNumberLocality> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listAvailableLocalities",
      options,
    );

    try {
      return this.client.phoneNumbers.listAvailableLocalities(countryCode, {
        ...updatedOptions,
        acceptLanguage: this.acceptLanguage,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates the available offerings.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListAvailableOfferings
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * for await (const offering of client.listAvailableOfferings("US")) {
   *   console.log("phone number type: ", offering.phoneNumberType);
   *   console.log("cost: ", offering.cost.amount);
   * }
   * ```
   * List all available offerings.
   * @param countryCode - The ISO 3166-2 country code.
   * @param options - The optional parameters.
   */
  public listAvailableOfferings(
    countryCode: string,
    options: ListOfferingsOptions = {},
  ): PagedAsyncIterableIterator<PhoneNumberOffering> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listOfferings",
      options,
    );

    try {
      return this.client.phoneNumbers.listOfferings(countryCode, {
        ...updatedOptions,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Iterates all phone number reservations.
   *
   * Example usage:
   * ```ts snippet:PhoneNumbersClientListReservations
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { PhoneNumbersClient } from "@azure/communication-phone-numbers";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
   *
   * for await (const reservation of client.listReservations()) {
   *   console.log(`Reservation id: ${reservation.id}`);
   * }
   * ```
   * List all phone number reservations. Note that the reservations will not be populated with the phone numbers associated with them.
   * @param options - The optional parameters.
   */
  public listReservations(
    options: ListReservationOptions = {},
  ): PagedAsyncIterableIterator<PhoneNumbersReservation> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-listReservations",
      options,
    );

    try {
      return this.client.phoneNumbers.listReservations({
        ...updatedOptions,
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Search for operator information about specified phone numbers.
   *
   * @param phoneNumbers - The phone numbers to search.
   * @param options - Additional request options.
   */
  public searchOperatorInformation(
    phoneNumbers: string[],
    options: SearchOperatorInformationOptions = { includeAdditionalOperatorDetails: false },
  ): Promise<OperatorInformationResult> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "PhoneNumbersClient-searchOperatorInformation",
      options,
    );

    try {
      return this.client.phoneNumbers.operatorInformationSearch(phoneNumbers, {
        ...updatedOptions,
        options: { includeAdditionalOperatorDetails: options.includeAdditionalOperatorDetails },
      });
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e,
      });

      throw e;
    } finally {
      span.end();
    }
  }

  private addPhoneNumbersToReservation(
    currentReservation: { [propertyName: string]: AvailablePhoneNumber | null },
    phoneNumbers: AvailablePhoneNumber[],
  ): { [propertyName: string]: AvailablePhoneNumber | null } {
    const phoneNumbersReservation: { [propertyName: string]: AvailablePhoneNumber | null } =
      currentReservation;
    for (const phoneNumber of phoneNumbers) {
      if (phoneNumber.id) {
        phoneNumbersReservation[phoneNumber.id] = phoneNumber;
      }
    }
    return phoneNumbersReservation;
  }

  private removePhoneNumbersFromReservation(
    currentReservation: { [propertyName: string]: AvailablePhoneNumber | null },
    phoneNumbers: string[],
  ): { [propertyName: string]: AvailablePhoneNumber | null } {
    const phoneNumbersReservation: { [propertyName: string]: AvailablePhoneNumber | null } =
      currentReservation;
    for (const phoneNumber of phoneNumbers) {
      if (phoneNumber) {
        phoneNumbersReservation[phoneNumber] = null;
      }
    }
    return phoneNumbersReservation;
  }
}
