import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { PollOperationState, PollerLike } from "@azure/core-lro";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { OperatorInformationResult, PhoneNumberAreaCode, PhoneNumberCapabilitiesRequest, PhoneNumberCountry, PhoneNumberLocality, PhoneNumberOffering, PhoneNumberSearchResult, PurchasedPhoneNumber } from "./generated/src/models/index.js";
import type { GetPurchasedPhoneNumberOptions, ListAvailableCountriesOptions, ListGeographicAreaCodesOptions, ListLocalitiesOptions, ListOfferingsOptions, ListPurchasedPhoneNumbersOptions, ListTollFreeAreaCodesOptions, PurchasePhoneNumbersResult, ReleasePhoneNumberResult, SearchAvailablePhoneNumbersRequest, SearchOperatorInformationOptions } from "./models.js";
import type { BeginPurchasePhoneNumbersOptions, BeginReleasePhoneNumberOptions, BeginSearchAvailablePhoneNumbersOptions, BeginUpdatePhoneNumberCapabilitiesOptions } from "./lroModels.js";
import type { CommonClientOptions } from "@azure/core-client";
/**
 * Client options used to configure the PhoneNumbersClient API requests.
 */
export interface PhoneNumbersClientOptions extends CommonClientOptions {
    /**
     * The accept language parameter to be used in the request header's "accept-language" property.
     */
    acceptLanguage?: string;
}
/**
 * Client class for interacting with Azure Communication Services Phone Number Administration.
 */
export declare class PhoneNumbersClient {
    /**
     * A reference to the auto-generated PhoneNumber HTTP client.
     */
    private readonly client;
    /**
     * The accept language parameter to be used in the request header's "accept-language" property.
     */
    private acceptLanguage;
    /**
     * Initializes a new instance of the PhoneNumberAdministrationClient class using a connection string.
     *
     * @param connectionString - Connection string to connect to an Azure Communication Service resource. (eg: endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret)
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, options?: PhoneNumbersClientOptions);
    /**
     * Initializes a new instance of the PhoneNumberAdministrationClient class using an Azure KeyCredential.
     *
     * @param url - The endpoint of the service (eg: https://contoso.eastus.communications.azure.net)
     * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(url: string, credential: KeyCredential, options?: PhoneNumbersClientOptions);
    /**
     * Initializes a new instance of the PhoneNumberAdministrationClient class using a TokenCredential.
     * @param url - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
     * @param credential - TokenCredential that is used to authenticate requests to the service.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(url: string, credential: TokenCredential, options?: PhoneNumbersClientOptions);
    /**
     * Gets the details of a purchased phone number. Includes phone number, cost, country code, etc.
     *
     * @param phoneNumber - The E.164 formatted phone number being fetched. The leading plus can be either + or encoded as %2B.
     * @param options - Additional request options.
     */
    getPurchasedPhoneNumber(phoneNumber: string, options?: GetPurchasedPhoneNumberOptions): Promise<PurchasedPhoneNumber>;
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
    listPurchasedPhoneNumbers(options?: ListPurchasedPhoneNumbersOptions): PagedAsyncIterableIterator<PurchasedPhoneNumber>;
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
    beginReleasePhoneNumber(phoneNumber: string, options?: BeginReleasePhoneNumberOptions): Promise<PollerLike<PollOperationState<ReleasePhoneNumberResult>, ReleasePhoneNumberResult>>;
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
    beginSearchAvailablePhoneNumbers(search: SearchAvailablePhoneNumbersRequest, options?: BeginSearchAvailablePhoneNumbersOptions): Promise<PollerLike<PollOperationState<PhoneNumberSearchResult>, PhoneNumberSearchResult>>;
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
    beginPurchasePhoneNumbers(searchId: string, options?: BeginPurchasePhoneNumbersOptions): Promise<PollerLike<PollOperationState<PurchasePhoneNumbersResult>, PurchasePhoneNumbersResult>>;
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
    beginUpdatePhoneNumberCapabilities(phoneNumber: string, request: PhoneNumberCapabilitiesRequest, options?: BeginUpdatePhoneNumberCapabilitiesOptions): Promise<PollerLike<PollOperationState<PurchasedPhoneNumber>, PurchasedPhoneNumber>>;
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
    listAvailableCountries(options?: ListAvailableCountriesOptions): PagedAsyncIterableIterator<PhoneNumberCountry>;
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
    listAvailableTollFreeAreaCodes(countryCode: string, options?: ListTollFreeAreaCodesOptions): PagedAsyncIterableIterator<PhoneNumberAreaCode>;
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
    listAvailableGeographicAreaCodes(countryCode: string, options?: ListGeographicAreaCodesOptions): PagedAsyncIterableIterator<PhoneNumberAreaCode>;
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
    listAvailableLocalities(countryCode: string, options?: ListLocalitiesOptions): PagedAsyncIterableIterator<PhoneNumberLocality>;
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
    listAvailableOfferings(countryCode: string, options?: ListOfferingsOptions): PagedAsyncIterableIterator<PhoneNumberOffering>;
    /**
     * Search for operator information about specified phone numbers.
     *
     * @param phoneNumbers - The phone numbers to search.
     * @param options - Additional request options.
     */
    searchOperatorInformation(phoneNumbers: string[], options?: SearchOperatorInformationOptions): Promise<OperatorInformationResult>;
}
//# sourceMappingURL=phoneNumbersClient.d.ts.map