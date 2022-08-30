// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze user query using an orchestration project.
 * In this sample, orchestration project's top intent will map to a Qna project.
 *
 * @summary Orchestration project with direct target
 * @azsdk-weight 50
 */

import { ConversationAnalysisClient, ConversationalTask, ConversationalTaskResult, KnowledgeBaseAnswer, OrchestrationPrediction, QuestionAnsweringTargetIntentResult } from "@azure/ai-language-conversations"
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to set these environment variables for the sample to work
const cluEndpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
const cluKey = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";
const projectName = process.env.AZURE_CONVERSATIONS_WORKFLOW_PROJECT_NAME || "<project-name>";
const deploymentName = process.env.AZURE_CONVERSATIONS_WORKFLOW_DEPLOYMENT_NAME || "<deployment-name>";

const service: ConversationAnalysisClient = new ConversationAnalysisClient(cluEndpoint, new AzureKeyCredential(cluKey));

const query = "How are you?"
const qna_app = "ChitChat-QnA"

const body: ConversationalTask = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": query
        },
    },
    "parameters": {
        "projectName": projectName,
        "deploymentName": deploymentName,
        "isLoggingEnabled": false,
        "directTarget": qna_app,
        "targetProjectParameters": {
            "ChitChat-QnA": {
                "targetProjectKind": "QuestionAnswering",
                "callingOptions": {
                    "question": query
                }
            }
        }
    }
}

export async function main(){
//Analyze query
    const { result } = await service.analyzeConversation(body) as ConversationalTaskResult;
    console.log("query: ", result.query);
    console.log("project kind: ", result.prediction.projectKind);

    const top_intent = result.prediction.topIntent || "None";
    console.log("\ntop intent: ", top_intent);

    const prediction = result.prediction as OrchestrationPrediction;
    const top_intent_object = prediction.intents[top_intent] as QuestionAnsweringTargetIntentResult;
    console.log("confidence score: ", top_intent_object.confidence);
    console.log("project kind: ", top_intent_object.targetProjectKind);

    if(top_intent_object.targetProjectKind == "QuestionAnswering"){
        console.log("\nqna response:");

        const qna_response = top_intent_object.result;
        if(qna_response?.answers){
            qna_response.answers.forEach((answer: KnowledgeBaseAnswer) => {
                console.log("\nanswer: ", answer.answer);
                console.log("confidence score: ", answer.confidence);
            })
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});