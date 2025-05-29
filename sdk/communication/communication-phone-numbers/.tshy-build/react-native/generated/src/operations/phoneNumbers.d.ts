import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PhoneNumbers } from "../operationsInterfaces/index.js";
import { PhoneNumbersClient } from "../phoneNumbersClient.js";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { PhoneNumberAreaCode, PhoneNumberType, PhoneNumbersListAreaCodesOptionalParams, PhoneNumberCountry, PhoneNumbersListAvailableCountriesOptionalParams, PhoneNumberLocality, PhoneNumbersListAvailableLocalitiesOptionalParams, PhoneNumberOffering, PhoneNumbersListOfferingsOptionalParams, PurchasedPhoneNumber, PhoneNumbersListPhoneNumbersOptionalParams, PhoneNumberAssignmentType, PhoneNumberCapabilities, PhoneNumbersSearchAvailablePhoneNumbersOptionalParams, PhoneNumbersSearchAvailablePhoneNumbersResponse, PhoneNumbersGetSearchResultOptionalParams, PhoneNumbersGetSearchResultResponse, PhoneNumbersPurchasePhoneNumbersOptionalParams, PhoneNumbersPurchasePhoneNumbersResponse, PhoneNumbersGetOperationOptionalParams, PhoneNumbersGetOperationResponse, PhoneNumbersCancelOperationOptionalParams, PhoneNumbersUpdateCapabilitiesOptionalParams, PhoneNumbersUpdateCapabilitiesResponse, PhoneNumbersGetByNumberOptionalParams, PhoneNumbersGetByNumberResponse, PhoneNumbersReleasePhoneNumberOptionalParams, PhoneNumbersReleasePhoneNumberResponse, PhoneNumbersOperatorInformationSearchOptionalParams, PhoneNumbersOperatorInformationSearchResponse } from "../models/index.js";
/** Class containing PhoneNumbers operations. */
export declare class PhoneNumbersImpl implements PhoneNumbers {
    private readonly client;
    /**
     * Initialize a new instance of the class PhoneNumbers class.
     * @param client Reference to the service client
     */
    constructor(client: PhoneNumbersClient);
    /**
     * Gets the list of available area codes.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param phoneNumberType Filter by numberType, e.g. Geographic, TollFree.
     * @param options The options parameters.
     */
    listAreaCodes(countryCode: string, phoneNumberType: PhoneNumberType, options?: PhoneNumbersListAreaCodesOptionalParams): PagedAsyncIterableIterator<PhoneNumberAreaCode>;
    private listAreaCodesPagingPage;
    private listAreaCodesPagingAll;
    /**
     * Gets the list of supported countries.
     * @param options The options parameters.
     */
    listAvailableCountries(options?: PhoneNumbersListAvailableCountriesOptionalParams): PagedAsyncIterableIterator<PhoneNumberCountry>;
    private listAvailableCountriesPagingPage;
    private listAvailableCountriesPagingAll;
    /**
     * Gets the list of cities or towns with available phone numbers.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param options The options parameters.
     */
    listAvailableLocalities(countryCode: string, options?: PhoneNumbersListAvailableLocalitiesOptionalParams): PagedAsyncIterableIterator<PhoneNumberLocality>;
    private listAvailableLocalitiesPagingPage;
    private listAvailableLocalitiesPagingAll;
    /**
     * List available offerings of capabilities with rates for the given country.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param options The options parameters.
     */
    listOfferings(countryCode: string, options?: PhoneNumbersListOfferingsOptionalParams): PagedAsyncIterableIterator<PhoneNumberOffering>;
    private listOfferingsPagingPage;
    private listOfferingsPagingAll;
    /**
     * Gets the list of all purchased phone numbers.
     * @param options The options parameters.
     */
    listPhoneNumbers(options?: PhoneNumbersListPhoneNumbersOptionalParams): PagedAsyncIterableIterator<PurchasedPhoneNumber>;
    private listPhoneNumbersPagingPage;
    private listPhoneNumbersPagingAll;
    /**
     * Gets the list of available area codes.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param phoneNumberType Filter by numberType, e.g. Geographic, TollFree.
     * @param options The options parameters.
     */
    private _listAreaCodes;
    /**
     * Gets the list of supported countries.
     * @param options The options parameters.
     */
    private _listAvailableCountries;
    /**
     * Gets the list of cities or towns with available phone numbers.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param options The options parameters.
     */
    private _listAvailableLocalities;
    /**
     * List available offerings of capabilities with rates for the given country.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param options The options parameters.
     */
    private _listOfferings;
    /**
     * Search for available phone numbers to purchase.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param phoneNumberType The type of phone numbers to search for, e.g. geographic, or tollFree.
     * @param assignmentType The assignment type of the phone numbers to search for. A phone number can be
     *                       assigned to a person, or to an application.
     * @param capabilities Capabilities of a phone number.
     * @param options The options parameters.
     */
    beginSearchAvailablePhoneNumbers(countryCode: string, phoneNumberType: PhoneNumberType, assignmentType: PhoneNumberAssignmentType, capabilities: PhoneNumberCapabilities, options?: PhoneNumbersSearchAvailablePhoneNumbersOptionalParams): Promise<PollerLike<PollOperationState<PhoneNumbersSearchAvailablePhoneNumbersResponse>, PhoneNumbersSearchAvailablePhoneNumbersResponse>>;
    /**
     * Search for available phone numbers to purchase.
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param phoneNumberType The type of phone numbers to search for, e.g. geographic, or tollFree.
     * @param assignmentType The assignment type of the phone numbers to search for. A phone number can be
     *                       assigned to a person, or to an application.
     * @param capabilities Capabilities of a phone number.
     * @param options The options parameters.
     */
    beginSearchAvailablePhoneNumbersAndWait(countryCode: string, phoneNumberType: PhoneNumberType, assignmentType: PhoneNumberAssignmentType, capabilities: PhoneNumberCapabilities, options?: PhoneNumbersSearchAvailablePhoneNumbersOptionalParams): Promise<PhoneNumbersSearchAvailablePhoneNumbersResponse>;
    /**
     * Gets a phone number search result by search id.
     * @param searchId The search Id.
     * @param options The options parameters.
     */
    getSearchResult(searchId: string, options?: PhoneNumbersGetSearchResultOptionalParams): Promise<PhoneNumbersGetSearchResultResponse>;
    /**
     * Purchases phone numbers.
     * @param options The options parameters.
     */
    beginPurchasePhoneNumbers(options?: PhoneNumbersPurchasePhoneNumbersOptionalParams): Promise<PollerLike<PollOperationState<PhoneNumbersPurchasePhoneNumbersResponse>, PhoneNumbersPurchasePhoneNumbersResponse>>;
    /**
     * Purchases phone numbers.
     * @param options The options parameters.
     */
    beginPurchasePhoneNumbersAndWait(options?: PhoneNumbersPurchasePhoneNumbersOptionalParams): Promise<PhoneNumbersPurchasePhoneNumbersResponse>;
    /**
     * Gets an operation by its id.
     * @param operationId The id of the operation
     * @param options The options parameters.
     */
    getOperation(operationId: string, options?: PhoneNumbersGetOperationOptionalParams): Promise<PhoneNumbersGetOperationResponse>;
    /**
     * Cancels an operation by its id.
     * @param operationId The id of the operation
     * @param options The options parameters.
     */
    cancelOperation(operationId: string, options?: PhoneNumbersCancelOperationOptionalParams): Promise<void>;
    /**
     * Updates the capabilities of a phone number.
     * @param phoneNumber The phone number id in E.164 format. The leading plus can be either + or encoded
     *                    as %2B, e.g. +11234567890.
     * @param options The options parameters.
     */
    beginUpdateCapabilities(phoneNumber: string, options?: PhoneNumbersUpdateCapabilitiesOptionalParams): Promise<PollerLike<PollOperationState<PhoneNumbersUpdateCapabilitiesResponse>, PhoneNumbersUpdateCapabilitiesResponse>>;
    /**
     * Updates the capabilities of a phone number.
     * @param phoneNumber The phone number id in E.164 format. The leading plus can be either + or encoded
     *                    as %2B, e.g. +11234567890.
     * @param options The options parameters.
     */
    beginUpdateCapabilitiesAndWait(phoneNumber: string, options?: PhoneNumbersUpdateCapabilitiesOptionalParams): Promise<PhoneNumbersUpdateCapabilitiesResponse>;
    /**
     * Gets the details of the given purchased phone number.
     * @param phoneNumber The purchased phone number whose details are to be fetched in E.164 format, e.g.
     *                    +11234567890.
     * @param options The options parameters.
     */
    getByNumber(phoneNumber: string, options?: PhoneNumbersGetByNumberOptionalParams): Promise<PhoneNumbersGetByNumberResponse>;
    /**
     * Releases a purchased phone number.
     * @param phoneNumber Phone number to be released, e.g. +11234567890.
     * @param options The options parameters.
     */
    beginReleasePhoneNumber(phoneNumber: string, options?: PhoneNumbersReleasePhoneNumberOptionalParams): Promise<PollerLike<PollOperationState<PhoneNumbersReleasePhoneNumberResponse>, PhoneNumbersReleasePhoneNumberResponse>>;
    /**
     * Releases a purchased phone number.
     * @param phoneNumber Phone number to be released, e.g. +11234567890.
     * @param options The options parameters.
     */
    beginReleasePhoneNumberAndWait(phoneNumber: string, options?: PhoneNumbersReleasePhoneNumberOptionalParams): Promise<PhoneNumbersReleasePhoneNumberResponse>;
    /**
     * Gets the list of all purchased phone numbers.
     * @param options The options parameters.
     */
    private _listPhoneNumbers;
    /**
     * Searches for number format and operator information for a given list of phone numbers.
     * @param phoneNumbers Phone number(s) whose operator information is being requested
     * @param options The options parameters.
     */
    operatorInformationSearch(phoneNumbers: string[], options?: PhoneNumbersOperatorInformationSearchOptionalParams): Promise<PhoneNumbersOperatorInformationSearchResponse>;
    /**
     * ListAreaCodesNext
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param nextLink The nextLink from the previous successful call to the ListAreaCodes method.
     * @param options The options parameters.
     */
    private _listAreaCodesNext;
    /**
     * ListAvailableCountriesNext
     * @param nextLink The nextLink from the previous successful call to the ListAvailableCountries method.
     * @param options The options parameters.
     */
    private _listAvailableCountriesNext;
    /**
     * ListAvailableLocalitiesNext
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param nextLink The nextLink from the previous successful call to the ListAvailableLocalities
     *                 method.
     * @param options The options parameters.
     */
    private _listAvailableLocalitiesNext;
    /**
     * ListOfferingsNext
     * @param countryCode The ISO 3166-2 country code, e.g. US.
     * @param nextLink The nextLink from the previous successful call to the ListOfferings method.
     * @param options The options parameters.
     */
    private _listOfferingsNext;
    /**
     * ListPhoneNumbersNext
     * @param nextLink The nextLink from the previous successful call to the ListPhoneNumbers method.
     * @param options The options parameters.
     */
    private _listPhoneNumbersNext;
}
//# sourceMappingURL=phoneNumbers.d.ts.map