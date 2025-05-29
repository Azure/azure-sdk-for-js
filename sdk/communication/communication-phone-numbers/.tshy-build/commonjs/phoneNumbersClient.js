"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumbersClient = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @azure/azure-sdk/ts-naming-options */
const communication_common_1 = require("@azure/communication-common");
const core_auth_1 = require("@azure/core-auth");
const index_js_1 = require("./generated/src/index.js");
const customPipelinePolicies_js_1 = require("./utils/customPipelinePolicies.js");
const index_js_2 = require("./utils/index.js");
const tracing_js_1 = require("./generated/src/tracing.js");
const isPhoneNumbersClientOptions = (options) => options && !(0, communication_common_1.isKeyCredential)(options) && !(0, core_auth_1.isTokenCredential)(options);
/**
 * Client class for interacting with Azure Communication Services Phone Number Administration.
 */
class PhoneNumbersClient {
    constructor(connectionStringOrUrl, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = (0, communication_common_1.parseClientArguments)(connectionStringOrUrl, credentialOrOptions);
        const options = isPhoneNumbersClientOptions(credentialOrOptions)
            ? credentialOrOptions
            : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: index_js_2.logger.info,
            },
        });
        this.client = new index_js_1.PhoneNumbersClient(url, Object.assign({ endpoint: url }, internalPipelineOptions));
        const authPolicy = (0, communication_common_1.createCommunicationAuthPolicy)(credential);
        this.client.pipeline.addPolicy(authPolicy);
        // This policy is temporary workarounds to address compatibility issues with Azure Core V2.
        const phoneNumbersPagingPolicy = (0, customPipelinePolicies_js_1.createPhoneNumbersPagingPolicy)(url);
        this.client.pipeline.addPolicy(phoneNumbersPagingPolicy);
        this.acceptLanguage = maybeOptions.acceptLanguage;
    }
    /**
     * Gets the details of a purchased phone number. Includes phone number, cost, country code, etc.
     *
     * @param phoneNumber - The E.164 formatted phone number being fetched. The leading plus can be either + or encoded as %2B.
     * @param options - Additional request options.
     */
    getPurchasedPhoneNumber(phoneNumber, options = {}) {
        return tracing_js_1.tracingClient.withSpan("PhoneNumbersClient-getPurchasedPhoneNumber", options, (updatedOptions) => {
            return this.client.phoneNumbers.getByNumber(phoneNumber, Object.assign({}, updatedOptions));
        });
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
    listPurchasedPhoneNumbers(options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("PhoneNumbersClient-listPurchasedPhoneNumbers", options);
        try {
            return this.client.phoneNumbers.listPhoneNumbers(Object.assign({}, updatedOptions));
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
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
    beginReleasePhoneNumber(phoneNumber, options = {}) {
        return tracing_js_1.tracingClient.withSpan("PhoneNumbersClient-beginReleasePhoneNumber", options, (updatedOptions) => {
            return this.client.phoneNumbers.beginReleasePhoneNumber(phoneNumber, updatedOptions);
        });
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
    beginSearchAvailablePhoneNumbers(search, options = {}) {
        return tracing_js_1.tracingClient.withSpan("PhoneNumbersClient-beginSearchAvailablePhoneNumbers", options, (updatedOptions) => {
            const { countryCode, phoneNumberType, assignmentType, capabilities } = search, rest = tslib_1.__rest(search, ["countryCode", "phoneNumberType", "assignmentType", "capabilities"]);
            return this.client.phoneNumbers.beginSearchAvailablePhoneNumbers(countryCode, phoneNumberType, assignmentType, capabilities, Object.assign(Object.assign({}, updatedOptions), rest));
        });
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
    beginPurchasePhoneNumbers(searchId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("PhoneNumbersClient-beginPurchasePhoneNumbers", options, (updatedOptions) => {
            return this.client.phoneNumbers.beginPurchasePhoneNumbers(Object.assign(Object.assign({}, updatedOptions), { searchId }));
        });
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
    beginUpdatePhoneNumberCapabilities(phoneNumber, request, options = {}) {
        if (!phoneNumber) {
            throw Error("phone number can't be empty");
        }
        return tracing_js_1.tracingClient.withSpan("PhoneNumbersClient-beginUpdatePhoneNumberCapabilities", options, (updatedOptions) => {
            return this.client.phoneNumbers.beginUpdateCapabilities(phoneNumber, Object.assign(Object.assign({}, updatedOptions), request));
        });
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
    listAvailableCountries(options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("PhoneNumbersClient-listAvailableCountries", options);
        try {
            return this.client.phoneNumbers.listAvailableCountries(Object.assign(Object.assign({}, updatedOptions), { acceptLanguage: this.acceptLanguage }));
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
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
    listAvailableTollFreeAreaCodes(countryCode, options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("PhoneNumbersClient-listAvailableTollFreeAreaCodes", options);
        try {
            return this.client.phoneNumbers.listAreaCodes(countryCode, "tollFree", Object.assign(Object.assign({}, updatedOptions), { assignmentType: "application" }));
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
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
    listAvailableGeographicAreaCodes(countryCode, options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("PhoneNumbersClient-listAvailableGeographicFreeAreaCodes", options);
        try {
            return this.client.phoneNumbers.listAreaCodes(countryCode, "geographic", Object.assign({}, updatedOptions));
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
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
    listAvailableLocalities(countryCode, options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("PhoneNumbersClient-listAvailableLocalities", options);
        try {
            return this.client.phoneNumbers.listAvailableLocalities(countryCode, Object.assign(Object.assign({}, updatedOptions), { acceptLanguage: this.acceptLanguage }));
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
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
    listAvailableOfferings(countryCode, options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("PhoneNumbersClient-listOfferings", options);
        try {
            return this.client.phoneNumbers.listOfferings(countryCode, Object.assign({}, updatedOptions));
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    /**
     * Search for operator information about specified phone numbers.
     *
     * @param phoneNumbers - The phone numbers to search.
     * @param options - Additional request options.
     */
    searchOperatorInformation(phoneNumbers, options = { includeAdditionalOperatorDetails: false }) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("PhoneNumbersClient-searchOperatorInformation", options);
        try {
            return this.client.phoneNumbers.operatorInformationSearch(phoneNumbers, Object.assign(Object.assign({}, updatedOptions), { options: { includeAdditionalOperatorDetails: options.includeAdditionalOperatorDetails } }));
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
}
exports.PhoneNumbersClient = PhoneNumbersClient;
//# sourceMappingURL=phoneNumbersClient.js.map