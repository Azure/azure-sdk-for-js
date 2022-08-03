// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze user query using an orchestration project.
 * In this sample, orchestration project's top intent will map to a conversation project.
 *
 * @summary Orchestration project with conversational response
 */

import { ConversationAnalysisClient, ConversationalTask } from "@azure/ai-language-conversations"
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to change these environment variables for the sample to work
var clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
var clu_key = process.env.AZURE_CONVERSATIONS_KEY;
var project_name = process.env.AZURE_CONVERSATIONS_PROJECT_NAME;
var deployment_name = process.env.AZURE_CONVERSATIONS_DEPLOYMENT_NAME;

var service: ConversationAnalysisClient = new ConversationAnalysisClient(clu_endpoint, new AzureKeyCredential(clu_key));

var body: ConversationalTask = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": "Send an email to Carol about the tomorrow's demo"
        },
    },
    "parameters": {
        "projectName": project_name,
        "deploymentName": deployment_name,
        "verbose": true,
        "isLoggingEnabled": false
    }
}

//Analyze query
service.analyzeConversation(body).then(
    (message) => {
        console.log("query: %s", message.result.query);
        console.log("project kind: %s", message.result.prediction.projectKind);
        var top_intent = message.result.prediction.topIntent;
        console.log("top intent: %s", top_intent);
        var top_intent_object = message.result.prediction.intents[top_intent];
        console.log("confidence score: %s", top_intent_object.confidence);
        console.log("project kind: %s", top_intent_object.targetProjectKind);

        if(top_intent_object.targetProjectKind == "Conversation"){
            console.log("\nview conversation result:");

            console.log("\ntop intent: %s", top_intent_object.result.prediction.top_intent);
            console.log("category: %s", top_intent_object.result.prediction.intents[0].category);
            console.log("confidence score: %s\n", top_intent_object.result.prediction.intents[0].confidence);

            console.log("\nview entities:");
            message.result.prediction.entities.forEach(entity => {
                console.log("\ncategory: %s", entity.category);
                console.log("text: %s", entity.text);
                console.log("confidence score: %f", entity.confidence);

                if(entity.resolutions){
                    console.log("resolutions:");
                    entity.resolutions.forEach((resolution) => {
                        console.log("kind: %s", resolution.resolutionKind);
                        console.log("value: %s", resolution.value);
                    })
                }

                if(entity.extraInformation){
                    console.log("extra info:")
                    entity.extraInformation.forEach((data) => {
                        console.log("kind: %s", data.extraInformationKind);
                        if(data.extraInformationKind == "ListKey")
                            console.log("key: %s", data.key);
                        if(data.extraInformationKind == "EntitySubtype")
                            console.log("value: %s", data.value);
                    });
                }
            })
        }
    }
);