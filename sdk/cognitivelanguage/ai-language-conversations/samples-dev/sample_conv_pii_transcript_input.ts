// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze a conversation for PII (personally identifiable information).
 *
 * @summary PII conversational analysis
 * @azsdk-weight 50
 */

import { ConversationAnalysisClient } from "@azure/ai-language-conversations"
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to set these environment variables for the sample to work
const clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
const clu_key = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";

const service: ConversationAnalysisClient = new ConversationAnalysisClient(clu_endpoint, new AzureKeyCredential(clu_key));

export async function main(){
//Analyze query
    const poller = await service.beginConversationAnalysis({
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
                                "maskedItn": "yes 633278199 is my phone",
                            },
                            {
                                "id": "3",
                                "participantId": "1",
                                "modality": "transcript",
                                "text": "j.doe@yahoo.com is my email",
                                "lexical": "j dot doe at yahoo dot com is my email",
                                "maskedItn": "j.doe@yahoo.com is my email",
                                "itn": "j.doe@yahoo.com is my email",
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
        }
    )
    const actionResult = await poller.pollUntilDone() as any;
    const task_result = actionResult.tasks.items[0];
    console.log("... view task status ...");
    console.log("status: ", task_result.status);
    const conv_pii_result = task_result.results;
    if(conv_pii_result.errors && conv_pii_result.errors.length != 0){
        console.log("... errors occured ...");
        conv_pii_result.errors.forEach((error: any) => {
            console.log(error);
        });
    }else{
        const conversation_result = conv_pii_result.conversations[0];
        if(conversation_result.warnings && conversation_result.warnings.length != 0){
            console.log("... view warnings ...");
            conversation_result.warning.forEach((warning: any) => {
                console.log(warning);
            });
        }else{
            console.log("... view task result ...");
            conversation_result.conversationItems.forEach((conversation: any) => {
                console.log("conversation id: ", conversation.id);
                console.log("... entities ...");
                conversation.entities.forEach((entity: any) => {
                    console.log("text: ", entity.text);
                    console.log("category: ", entity.category);
                    console.log("confidence: " ,entity.confidenceScore);
                    console.log("offset: ", entity.offset);
                    console.log("length: ", entity.length);
                });
            })
        }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});