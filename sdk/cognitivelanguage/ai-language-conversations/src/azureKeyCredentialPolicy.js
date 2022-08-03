"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
exports.__esModule = true;
exports.conversationAnalysisAzureKeyCredentialPolicy = void 0;
var API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
/**
 * The programmatic identifier of the conversationAnalysisAzureKeyCredentialPolicy.
 */
var conversationAnalysisAzureKeyCredentialPolicyName = "conversationAnalysisAzureKeyCredentialPolicy";
/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Conversation Analysis
 * @internal
 */
function conversationAnalysisAzureKeyCredentialPolicy(credential) {
    return {
        name: conversationAnalysisAzureKeyCredentialPolicyName,
        sendRequest: function (request, next) {
            request.headers.set(API_KEY_HEADER_NAME, credential.key);
            return next(request);
        }
    };
}
exports.conversationAnalysisAzureKeyCredentialPolicy = conversationAnalysisAzureKeyCredentialPolicy;
