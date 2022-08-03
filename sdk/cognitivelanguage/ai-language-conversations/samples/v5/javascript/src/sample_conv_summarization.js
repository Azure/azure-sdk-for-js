"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
exports.__esModule = true;
/**
 * This sample demonstrates how to analyze a conversation for issue resolution
 *
 * @summary Conversation Summarization
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
    "displayName": "Analyze conversations from xxx",
    "analysisInput": {
        "conversations": [
            {
                "conversationItems": [
                    {
                        "text": "Hello, how can I help you?",
                        "modality": "text",
                        "id": "1",
                        "participantId": "Agent"
                    },
                    {
                        "text": "How to upgrade Office? I am getting error messages the whole day.",
                        "modality": "text",
                        "id": "2",
                        "participantId": "Customer"
                    },
                    {
                        "text": "Press the upgrade button please. Then sign in and follow the instructions.",
                        "modality": "text",
                        "id": "3",
                        "participantId": "Agent"
                    }
                ],
                "modality": "text",
                "id": "conversation1",
                "language": "en"
            },
        ]
    },
    "tasks": [
        {
            "taskName": "analyze 1",
            "kind": "ConversationalSummarizationTask",
            "parameters": {
                "summaryAspects": ["Issue, Resolution"]
            }
        }
    ]
}).then(function (poller) {
    return poller.pollUntilDone();
}).then(function (response) {
    var task_result = response.tasks.items[0];
    console.log("... view task status ...");
    console.log("status: %s", task_result.status);
    var resolution_result = task_result.results;
    if (resolution_result.errors && resolution_result.errors.length != 0) {
        console.log("... errors occured ...");
        resolution_result.errors.forEach(function (error) {
            console.log(error);
        });
    }
    else {
        var conversation_result = resolution_result.conversations[0];
        if (conversation_result.warnings && conversation_result.warnings.length != 0) {
            console.log("... view warnings ...");
            conversation_result.warning.forEach(function (warning) {
                console.log(warning);
            });
        }
        else {
            var summaries = conversation_result.summaries;
            console.log("... view task result ...");
            console.log("issue: %s", summaries[0].text);
            console.log("resolution: %s", summaries[1].text);
        }
    }
});
