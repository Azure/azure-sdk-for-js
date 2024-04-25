// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  This sample demonstrates how to analyze user query using an orchestration project.
 *  In this sample, orchestration project's top intent will map to a Qna project.
 *
 * @summary Orchestration project with QnA response
 * @azsdk-weight 50
 */

import { ConversationAnalysisClient, ConversationalTask } from "@azure/ai-language-conversations";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to set these environment variables for the sample to work
const cluEndpoint =
  process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
const cluKey = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";
const projectName = process.env.AZURE_CONVERSATIONS_WORKFLOW_PROJECT_NAME || "<project-name>";
const deploymentName =
  process.env.AZURE_CONVERSATIONS_WORKFLOW_DEPLOYMENT_NAME || "<deployment-name>";

const service: ConversationAnalysisClient = new ConversationAnalysisClient(
  cluEndpoint,
  new AzureKeyCredential(cluKey),
);

const body: ConversationalTask = {
  kind: "Conversation",
  analysisInput: {
    conversationItem: {
      participantId: "1",
      id: "1",
      modality: "text",
      language: "en",
      text: "How are you?",
    },
  },
  parameters: {
    projectName: projectName,
    deploymentName: deploymentName,
    verbose: true,
    isLoggingEnabled: false,
  },
};

export async function main() {
  //Analyze query
  const { result } = await service.analyzeConversation(body);
  console.log("query: ", result.query);
  console.log("project kind: ", result.prediction.projectKind);

  const topIntent = result.prediction.topIntent || "None";
  console.log("\ntop intent: ", topIntent);

  const prediction = result.prediction;
  if (prediction.projectKind == "Orchestration") {
    const topIntentObject = prediction.intents[topIntent];
    console.log("confidence score: ", topIntentObject.confidence);
    console.log("project kind: ", topIntentObject.targetProjectKind);

    if (topIntentObject.targetProjectKind == "QuestionAnswering") {
      console.log("\nqna response:");
      const qnaResponse = topIntentObject.result;
      if (qnaResponse && qnaResponse.answers) {
        for (const answer of qnaResponse.answers) {
          console.log("\nanswer: ", answer.answer);
          console.log("confidence score: ", answer.confidence);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
