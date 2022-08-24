// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze user query for intents and entities using
 * a conversation project with a language parameter.
 *
 * @summary Conversational query analysis for intents and entities extraction
 * @azsdk-weight 50
 */

import { ConversationAnalysisClient, ConversationalTask, ConversationPrediction } from "@azure/ai-language-conversations"
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to set these environment variables for the sample to work
const clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
const clu_key = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";
const project_name = process.env.AZURE_CONVERSATIONS_PROJECT_NAME || "<project-name>";
const deployment_name = process.env.AZURE_CONVERSATIONS_DEPLOYMENT_NAME || "<deployment-name>";

const service: ConversationAnalysisClient = new ConversationAnalysisClient(clu_endpoint, new AzureKeyCredential(clu_key));

const body: ConversationalTask = {
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
}

export async function main() {
    //Analyze query
    const { result } = await service.analyzeConversation(body) as any;
    console.log("query: ", result.query);
    console.log("project kind: ", result.prediction.projectKind);
    console.log("top intent: ", result.prediction.topIntent);

    const prediction: ConversationPrediction = result.prediction as ConversationPrediction;
    console.log("category: ", prediction.intents[0].category);
    console.log("confidence score: ", prediction.intents[0].confidence);
    console.log("entities:");

    prediction.entities.forEach(entity => {
        console.log("\ncategory: ", entity.category);
        console.log("text: ", entity.text);
        console.log("confidence score: ", entity.confidence);

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
    });
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});