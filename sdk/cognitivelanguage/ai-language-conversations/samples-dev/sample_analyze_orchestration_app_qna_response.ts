// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  This sample demonstrates how to analyze user query using an orchestration project.
 *  In this sample, orchestration project's top intent will map to a Qna project.
 *
 * @summary Orchestration project with QnA response
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
            "text": "How are you?"
        },
    },
    "parameters": {
        "projectName": project_name,
        "deploymentName": deployment_name,
        "verbose": true,
        "isLoggingEnabled": false
    }
}

export async function main(){
    //Analyze query
    const { result } = await service.analyzeConversation(body) as any;
    console.log("query: ", result.query);
    console.log("project kind: ", result.prediction.projectKind);

    const top_intent = result.prediction.topIntent;
    console.log("\ntop intent: ", top_intent);
    const top_intent_object = result.prediction.intents[top_intent];
    console.log("confidence score: ", top_intent_object.confidence);
    console.log("project kind: ", top_intent_object.targetProjectKind);

    if(top_intent_object.targetProjectKind == "QuestionAnswering"){
        console.log("\nqna response:");
        const qna_response = top_intent_object.result;
        qna_response.answers.forEach((answer: any) => {
            console.log("\nanswer: ", answer.answer);
            console.log("confidence score: ", answer.confidence);
        })
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});