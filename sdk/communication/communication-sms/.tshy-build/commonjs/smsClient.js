"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="esnext.asynciterable" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsClient = void 0;
const communication_common_1 = require("@azure/communication-common");
const core_auth_1 = require("@azure/core-auth");
const smsApiClient_js_1 = require("./generated/src/smsApiClient.js");
const extractOperationOptions_js_1 = require("./extractOperationOptions.js");
const smsUtils_js_1 = require("./utils/smsUtils.js");
const logger_js_1 = require("./logger.js");
const tracing_js_1 = require("./generated/src/tracing.js");
const optOutsClient_js_1 = require("./optOutsClient.js");
/**
 * Checks whether the type of a value is SmsClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSmsClientOptions = (options) => !!options && !(0, core_auth_1.isTokenCredential)(options) && !(0, communication_common_1.isKeyCredential)(options);
/**
 * A SmsClient represents a Client to the Azure Communication Sms service allowing you
 * to send SMS messages.
 */
class SmsClient {
    constructor(connectionStringOrUrl, credentialOrOptions, maybeOptions = {}) {
        const { url, credential } = (0, communication_common_1.parseClientArguments)(connectionStringOrUrl, credentialOrOptions);
        const options = isSmsClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger_js_1.logger.info,
            },
        });
        const authPolicy = (0, communication_common_1.createCommunicationAuthPolicy)(credential);
        this.api = new smsApiClient_js_1.SmsApiClient(url, internalPipelineOptions);
        this.api.pipeline.addPolicy(authPolicy);
        this.optOuts = new optOutsClient_js_1.OptOutsClient(this.api);
    }
    /**
     * Sends an SMS from a phone number that is acquired by the authenticated account, to another phone number.
     *
     * @param sendRequest - Provides the sender's and recipient's phone numbers, and the contents of the message
     * @param options - Additional request options
     */
    async send(sendRequest, options = { enableDeliveryReport: false }) {
        const { operationOptions, restOptions } = (0, extractOperationOptions_js_1.extractOperationOptions)(options);
        return tracing_js_1.tracingClient.withSpan("SmsClient-Send", operationOptions, async (updatedOptions) => {
            const response = await this.api.sms.send((0, smsUtils_js_1.generateSendMessageRequest)(sendRequest, restOptions), updatedOptions);
            return response.value;
        });
    }
}
exports.SmsClient = SmsClient;
//# sourceMappingURL=smsClient.js.map