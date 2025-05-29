// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { tracingClient } from "./generated/src/tracing.js";
import { generateOptOutRequest } from "./utils/smsUtils.js";
import { extractOperationOptions } from "./extractOperationOptions.js";
/**
 * A OptOutsClient represents a Client to the Azure Communication Sms service allowing you
 * to call Opt Out Management Api methods.
 */
export class OptOutsClient {
    constructor(api) {
        this.api = api;
    }
    /**
     * Removes phone numbers from the optouts list.
     *
     * @param from - The sender's phone number
     * @param to - The recipient's phone numbers
     * @param options - Additional request options
     */
    async remove(from, to, options = {}) {
        const { operationOptions } = extractOperationOptions(options);
        return tracingClient.withSpan("OptOuts-Remove", operationOptions, async (updatedOptions) => {
            const response = await this.api.optOuts.remove(generateOptOutRequest(from, to), updatedOptions);
            return response.value.map((optOutResponseItem) => {
                var _a;
                return {
                    to: optOutResponseItem.to,
                    httpStatusCode: optOutResponseItem.httpStatusCode,
                    errorMessage: (_a = optOutResponseItem.errorMessage) !== null && _a !== void 0 ? _a : "",
                };
            });
        });
    }
    /**
     * Adds phone numbers to the optouts list.
     *
     * @param from - The sender's phone number
     * @param to - The recipient's phone numbers
     * @param options - Additional request options
     */
    async add(from, to, options = {}) {
        const { operationOptions } = extractOperationOptions(options);
        return tracingClient.withSpan("OptOuts-Add", operationOptions, async (updatedOptions) => {
            const response = await this.api.optOuts.add(generateOptOutRequest(from, to), updatedOptions);
            return response.value.map((optOutResponseItem) => {
                var _a;
                return {
                    to: optOutResponseItem.to,
                    httpStatusCode: optOutResponseItem.httpStatusCode,
                    errorMessage: (_a = optOutResponseItem.errorMessage) !== null && _a !== void 0 ? _a : "",
                };
            });
        });
    }
    /**
     * Checks if phone numbers are in the optouts list.
     *
     * @param from - The sender's phone number
     * @param to - The recipient's phone numbers
     * @param options - Additional request options
     */
    async check(from, to, options = {}) {
        const { operationOptions } = extractOperationOptions(options);
        return tracingClient.withSpan("OptOuts-Check", operationOptions, async (updatedOptions) => {
            const response = await this.api.optOuts.check(generateOptOutRequest(from, to), updatedOptions);
            return response.value.map((optOutResponseItem) => {
                var _a, _b;
                return {
                    to: optOutResponseItem.to,
                    isOptedOut: (_a = optOutResponseItem.isOptedOut) !== null && _a !== void 0 ? _a : false,
                    httpStatusCode: optOutResponseItem.httpStatusCode,
                    errorMessage: (_b = optOutResponseItem.errorMessage) !== null && _b !== void 0 ? _b : "",
                };
            });
        });
    }
}
//# sourceMappingURL=optOutsClient.js.map