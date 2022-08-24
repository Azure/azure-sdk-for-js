// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze user query using an orchestration project.
 * In this sample, orchestration project's top intent will map to a conversation project.
 *
 * @summary Orchestration project with conversational response
 * @azsdk-weight 50
 */

import { ConversationAnalysisClient, ConversationalTask } from "@azure/ai-language-conversations"
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to set these environment variables for the sample to work
const clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
const clu_key = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";
const project_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_PROJECT_NAME || "<project-name>";
const deployment_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_DEPLOYMENT_NAME || "<deployment-name>";

const service: ConversationAnalysisClient = new ConversationAnalysisClient(clu_endpoint, new AzureKeyCredential(clu_key));

const body: ConversationalTask = {
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

export async function main() {
//Analyze query
    const { result } = await service.analyzeConversation(body) as any;
    console.log("query: ", result.query);
    console.log("project kind: ", result.prediction.projectKind);
    const top_intent = result.prediction.topIntent;
    console.log("top intent: ", top_intent);
    const top_intent_object = result.prediction.intents[top_intent];
    console.log("confidence score: ", top_intent_object.confidence);
    console.log("project kind: ", top_intent_object.targetProjectKind);

    if(top_intent_object.targetProjectKind == "Conversation"){
        console.log("\nview conversation result:");

        console.log("\ntop intent: ", top_intent_object.result.prediction.topIntent);
        console.log("category: ", top_intent_object.result.prediction.intents[0].category);
        console.log("confidence score: ", top_intent_object.result.prediction.intents[0].confidence);

        console.log("\nview entities:");
        top_intent_object.result.prediction.entities.forEach((entity: any) => {
            console.log("\ncategory: ", entity.category);
            console.log("text: ", entity.text);
            console.log("confidence score: %f", entity.confidence);

            if(entity.resolutions){
                console.log("resolutions:");
                entity.resolutions.forEach((resolution: any) => {
                    console.log("kind: ", resolution.resolutionKind);
                    console.log("value: ", resolution.value);
                })
            }

            if(entity.extraInformation){
                console.log("extra info:")
                entity.extraInformation.forEach((data: any) => {
                    console.log("kind: ", data.extraInformationKind);
                    if(data.extraInformationKind == "ListKey")
                        console.log("key: ", data.key);
                    if(data.extraInformationKind == "EntitySubtype")
                        console.log("value: ", data.value);
                });
            }
        })
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});