// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />
import { createCommunicationAuthPolicy, isKeyCredential, parseClientArguments, } from "@azure/communication-common";
import { isTokenCredential } from "@azure/core-auth";
import { SmsApiClient } from "./generated/src/smsApiClient.js";
import { extractOperationOptions } from "./extractOperationOptions.js";
import { generateSendMessageRequest } from "./utils/smsUtils.js";
import { logger } from "./logger.js";
import { tracingClient } from "./generated/src/tracing.js";
import { OptOutsClient as OptOutsClientImpl } from "./optOutsClient.js";
/**
 * Checks whether the type of a value is SmsClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSmsClientOptions = (options) => !!options && !isTokenCredential(options) && !isKeyCredential(options);
/**
 * A SmsClient represents a Client to the Azure Communication Sms service allowing you
 * to send SMS messages.
 */
export class SmsClient {
    constructor(connectionStringOrUrl, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
        const options = isSmsClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger.info,
            },
        });
        const authPolicy = createCommunicationAuthPolicy(credential);
        this.api = new SmsApiClient(url, internalPipelineOptions);
        this.api.pipeline.addPolicy(authPolicy);
        this.optOuts = new OptOutsClientImpl(this.api);
    }
    /**
     * Sends an SMS from a phone number that is acquired by the authenticated account, to another phone number.
     *
     * @param sendRequest - Provides the sender's and recipient's phone numbers, and the contents of the message
     * @param options - Additional request options
     */
    async send(sendRequest, options = { enableDeliveryReport: false }) {
        const { operationOptions, restOptions } = extractOperationOptions(options);
        return tracingClient.withSpan("SmsClient-Send", operationOptions, async (updatedOptions) => {
            const response = await this.api.sms.send(generateSendMessageRequest(sendRequest, restOptions), updatedOptions);
            return response.value;
        });
    }
}
//# sourceMappingURL=smsClient.js.map