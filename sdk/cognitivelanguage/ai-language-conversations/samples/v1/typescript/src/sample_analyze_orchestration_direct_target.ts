// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze user query using an orchestration project.
 * In this sample, orchestration project's top intent will map to a Qna project.
 *
 * @summary Orchestration project with direct target
 */

import { ConversationAnalysisClient, ConversationalTask } from "@azure/ai-language-conversations"
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to change these environment variables for the sample to work
var clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
var clu_key = process.env.AZURE_CONVERSATIONS_KEY;
var project_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_PROJECT_NAME;
var deployment_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_DEPLOYMENT_NAME;

var service: ConversationAnalysisClient = new ConversationAnalysisClient(clu_endpoint, new AzureKeyCredential(clu_key));

var query = "How are you?"
var qna_app = "ChitChat-QnA"

var body: ConversationalTask = {
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
        "projectName": project_name,
        "deploymentName": deployment_name,
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

//Analyze query
service.analyzeConversation(body).then((message) => {
    console.log("query: %s", message.result.query);
    console.log("project kind: %s\n", message.result.prediction.projectKind);

    var top_intent = message.result.prediction.topIntent;
    console.log("top intent: %s", top_intent);
    var top_intent_object = message.result.prediction.intents[top_intent];
    console.log("confidence score: %s", top_intent_object.confidence);
    console.log("project kind: %s", top_intent_object.targetProjectKind);

    if(top_intent_object.targetProjectKind == "QuestionAnswering"){
        console.log("\nqna response:");
        var qna_response = top_intent_object.result;
        qna_response.answers.forEach((answer) => {
            console.log("\nanswer: %s", answer.answer);
            console.log("confidence score: %s", answer.confidence);
        })
    }
});