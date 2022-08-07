"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
exports.__esModule = true;
/**
 * This sample demonstrates how to use either an Azure Active Directory (RBAC)
 * or an API Key to authenticate a ConversationAnalysisClient.
 *
 * @summary authenticates a service client using both Azure Active Directory and an API key
 */
var index_1 = require("@azure/ai-language-conversations");
// To use an API Key, import `AzureKeyCredential`
var core_auth_1 = require("@azure/core-auth");
// To use Azure AD, import `DefaultAzureCredential`
var identity_1 = require("@azure/identity");
var dotenv = require("dotenv");
dotenv.config();
function sample_authentication_api_key() {
    // [START create_dt_client_with_key]
    // You will need to set these environment variables or edit the following values
    var endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
    var key = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";
    var clu_client = new index_1.ConversationAnalysisClient(endpoint, new core_auth_1.AzureKeyCredential(key));
    // [END create_clu_client_with_key]
}
function sample_authentication_with_azure_active_directory() {
    //DefaultAzureCredential will use the values from these environment
    //variables: AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET
    console.log("\n.. authentication_with_azure_active_directory");
    var endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
    var credential = new identity_1.DefaultAzureCredential();
    var clu_client = new index_1.ConversationAnalysisClient(endpoint, credential = credential);
    onsole.log("\n.. authentication_with_azure_active_directory succeeded");
}
sample_authentication_api_key();
sample_authentication_with_azure_active_directory();
