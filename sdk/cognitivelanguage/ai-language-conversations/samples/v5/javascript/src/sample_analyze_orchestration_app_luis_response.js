"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
exports.__esModule = true;
/**
 * This sample demonstrates how to analyze user query using an orchestration project.
 * In this sample, orchestration project's top intent will map to a LUIS project
 *
 * @summary Orchestration project with LUIS response
 */
var ai_language_conversations_1 = require("@azure/ai-language-conversations");
var core_auth_1 = require("@azure/core-auth");
var dotenv = require("dotenv");
dotenv.config();
//Get secrets
//You will have to change these environment variables for the sample to work
var clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
var clu_key = process.env.AZURE_CONVERSATIONS_KEY;
var project_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_PROJECT_NAME;
var deployment_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_DEPLOYMENT_NAME;
var service = new ai_language_conversations_1.ConversationAnalysisClient(clu_endpoint, new core_auth_1.AzureKeyCredential(clu_key));
var body = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": "Reserve a table for 2 at the Italian restaurant"
        }
    },
    "parameters": {
        "projectName": project_name,
        "deploymentName": deployment_name,
        "verbose": true,
        "isLoggingEnabled": false
    }
};
//Analyze query
service.analyzeConversation(body).then(function (message) {
    console.log("query: %s", message.result.query);
    console.log("project kind: %s", message.result.prediction.projectKind);
    var top_intent = message.result.prediction.topIntent;
    console.log("top intent: %s", top_intent);
    var top_intent_object = message.result.prediction.intents[top_intent];
    console.log("confidence score: %s", top_intent_object.confidence);
    console.log("project kind: %s", top_intent_object.targetProjectKind);
    if (top_intent_object.targetProjectKind == "Luis") {
        console.log("\nluis response:");
        var luis_response = top_intent_object.result.prediction;
        console.log("top intent: %s", luis_response.topIntent);
        console.log("\nentities:");
        luis_response.entities.forEach(function (entity) {
            console.log("\n%s", entity);
        });
    }
});
