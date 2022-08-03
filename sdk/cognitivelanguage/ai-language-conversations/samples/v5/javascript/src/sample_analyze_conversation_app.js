"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
exports.__esModule = true;
/**
 * This sample demonstrates how to analyze user query for intents and entities using
 * a conversation project with a language parameter.
 *
 * @summary Conversational query analysis for intents and entities extraction
 */
var ai_language_conversations_1 = require("@azure/ai-language-conversations");
var core_auth_1 = require("@azure/core-auth");
//Get secrets
//You will have to change these environment variables for the sample to work
var clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
var clu_key = process.env.AZURE_CONVERSATIONS_KEY;
var project_name = process.env.AZURE_CONVERSATIONS_PROJECT_NAME;
var deployment_name = process.env.AZURE_CONVERSATIONS_DEPLOYMENT_NAME;
var service = new ai_language_conversations_1.ConversationAnalysisClient(clu_endpoint, new core_auth_1.AzureKeyCredential(clu_key));
var body = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "id": "id__7863",
            "participantId": "id__7863",
            "text": "Send an email to Carol about the tomorrow's demo"
        }
    },
    "parameters": {
        "projectName": project_name,
        "deploymentName": deployment_name
    }
};
//Analyze query
service.analyzeConversation(body).then(function (message) {
    console.log("query: %s", message.result.query);
    console.log("project kind: %s", message.result.prediction.projectKind);
    console.log("top intent: %s", message.result.prediction.topIntent);
    console.log("category: %s", message.result.prediction.intents[0].category);
    console.log("confidence score: %f", message.result.prediction.intents[0].confidence);
    console.log("entities:");
    message.result.prediction.entities.forEach(function (entity) {
        console.log("\ncategory: %s", entity.category);
        console.log("text: %s", entity.text);
        console.log("confidence score: %f", entity.confidence);
        if (entity.resolutions) {
            console.log("resolutions:");
            entity.resolutions.forEach(function (resolution) {
                console.log("kind: %s", resolution.resolutionKind);
                console.log("value: %s", resolution.value);
            });
        }
        if (entity.extraInformation) {
            console.log("extra info:");
            entity.extraInformation.forEach(function (data) {
                console.log("kind: %s", data.extraInformationKind);
                if (data.extraInformationKind == "ListKey")
                    console.log("key: %s", data.key);
                if (data.extraInformationKind == "EntitySubtype")
                    console.log("value: %s", data.value);
            });
        }
    });
});
