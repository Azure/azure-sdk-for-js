"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
exports.__esModule = true;
/**
 * This sample demonstrates how to analyze a conversation for PII (personally identifiable information).
 *
 * @summary PII conversational analysis
 */
var ai_language_conversations_1 = require("@azure/ai-language-conversations");
var core_auth_1 = require("@azure/core-auth");
var dotenv = require("dotenv");
dotenv.config();
//Get secrets
//You will have to change these environment variables for the sample to work
var clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
var clu_key = process.env.AZURE_CONVERSATIONS_KEY;
var service = new ai_language_conversations_1.ConversationAnalysisClient(clu_endpoint, new core_auth_1.AzureKeyCredential(clu_key));
//Analyze query
service.beginConversationAnalysis({
    "displayName": "Analyze PII in conversation",
    "analysisInput": {
        "conversations": [
            {
                "conversationItems": [
                    {
                        "id": "1",
                        "participantId": "0",
                        "modality": "transcript",
                        "text": "It is john doe.",
                        "lexical": "It is john doe",
                        "itn": "It is john doe",
                        "maskedItn": "It is john doe"
                    },
                    {
                        "id": "2",
                        "participantId": "1",
                        "modality": "transcript",
                        "text": "Yes, 633-27-8199 is my phone",
                        "lexical": "yes six three three two seven eight one nine nine is my phone",
                        "itn": "yes 633278199 is my phone",
                        "maskedItn": "yes 633278199 is my phone"
                    },
                    {
                        "id": "3",
                        "participantId": "1",
                        "modality": "transcript",
                        "text": "j.doe@yahoo.com is my email",
                        "lexical": "j dot doe at yahoo dot com is my email",
                        "maskedItn": "j.doe@yahoo.com is my email",
                        "itn": "j.doe@yahoo.com is my email"
                    }
                ],
                "modality": "transcript",
                "id": "1",
                "language": "en"
            }
        ]
    },
    "tasks": [
        {
            "kind": "ConversationalPIITask",
            "parameters": {
                "redactionSource": "lexical",
                "piiCategories": [
                    "all"
                ]
            }
        }
    ]
}).then(function (poller) {
    return poller.pollUntilDone();
}).then(function (response) {
    var task_result = response.tasks.items[0];
    console.log("... view task status ...");
    console.log("status: %s", task_result.status);
    var conv_pii_result = task_result.results;
    if (conv_pii_result.errors && conv_pii_result.errors.length != 0) {
        console.log("... errors occured ...");
        conv_pii_result.errors.forEach(function (error) {
            console.log(error);
        });
    }
    else {
        var conversation_result = conv_pii_result.conversations[0];
        if (conversation_result.warnings && conversation_result.warnings.length != 0) {
            console.log("... view warnings ...");
            conversation_result.warning.forEach(function (warning) {
                console.log(warning);
            });
        }
        else {
            console.log("... view task result ...");
            conversation_result.conversationItems.forEach(function (conversation) {
                console.log("conversation id: %s", conversation.id);
                console.log("... entities ...");
                conversation.entities.forEach(function (entity) {
                    console.log("text: %s", entity.text);
                    console.log("category: %s", entity.category);
                    console.log("confidence: %s", entity.confidenceScore);
                    console.log("offset: %s", entity.offset);
                    console.log("length: %s", entity.length);
                });
            });
        }
    }
});
