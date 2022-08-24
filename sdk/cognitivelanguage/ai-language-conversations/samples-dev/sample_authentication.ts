// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use either an Azure Active Directory (RBAC)
 * or an API Key to authenticate a ConversationAnalysisClient.
 *
 * @summary authenticates a service client using both Azure Active Directory
 * and an API key
 * @azsdk-weight 40
 */

import { ConversationAnalysisClient } from "@azure/ai-language-conversations"
// To use an API Key, import `AzureKeyCredential`
import { AzureKeyCredential } from "@azure/core-auth";
// To use Azure AD, import `DefaultAzureCredential`
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

function sample_authentication_api_key(){
    console.log("\n.. authentication_with_api_key")
    // You will need to set these environment variables or edit the following values
    const endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
    const key = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";

    const clu_client = new ConversationAnalysisClient(endpoint, new AzureKeyCredential(key));
    console.log(`A CLU client is created for the endpoint ${clu_client.endpoint}, using API Key`);
}

function sample_authentication_with_azure_active_directory(){
    //DefaultAzureCredential will use the values from these environment
    //variables: AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

    console.log("\n.. authentication_with_azure_active_directory");

    const endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
    const credential = new DefaultAzureCredential();

    const clu_client = new ConversationAnalysisClient(endpoint, credential);
    console.log(`A CLU client is created for the endpoint ${clu_client.endpoint}, using AAD`);
}

function main(){
    sample_authentication_api_key();
    sample_authentication_with_azure_active_directory();
}

main();