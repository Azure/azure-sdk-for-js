// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze a conversation for issue resolution
 *
 * @summary Conversation Summarization
 * @azsdk-weight 50
 */

import { AzureKeyCredential } from "@azure/core-auth";
import { ConversationAnalysisClient } from "@azure/ai-language-conversations";
import * as dotenv from "dotenv";
dotenv.config();

//Get secrets
//You will have to set these environment variables for the sample to work
const cluEndpoint =
  process.env.AZURE_CONVERSATIONS_ENDPOINT || "https://dummyendpoint.cognitiveservices.azure.com";
const cluKey = process.env.AZURE_CONVERSATIONS_KEY || "<api-key>";

const service: ConversationAnalysisClient = new ConversationAnalysisClient(
  cluEndpoint,
  new AzureKeyCredential(cluKey),
);

export async function main() {
  //Analyze query
  const poller = await service.beginConversationAnalysis({
    displayName: "Analyze conversations from xxx",
    analysisInput: {
      conversations: [
        {
          conversationItems: [
            {
              text: "Hello, how can I help you?",
              modality: "text",
              id: "1",
              participantId: "Agent",
            },
            {
              text: "How to upgrade Office? I am getting error messages the whole day.",
              modality: "text",
              id: "2",
              participantId: "Customer",
            },
            {
              text: "Press the upgrade button please. Then sign in and follow the instructions.",
              modality: "text",
              id: "3",
              participantId: "Agent",
            },
          ],
          modality: "text",
          id: "conversation1",
          language: "en",
        },
      ],
    },
    tasks: [
      {
        taskName: "analyze 1",
        kind: "ConversationalSummarizationTask",
        parameters: {
          summaryAspects: ["Issue, Resolution"],
        },
      },
    ],
  });

  const actionResult = await poller.pollUntilDone();
  if (actionResult.tasks.items === undefined) return;

  const taskResult = actionResult.tasks.items[0];
  if (taskResult.kind == "conversationalSummarizationResults") {
    console.log("... view task status ...");
    console.log("status: %s", taskResult.status);
    const resolutionResult = taskResult.results;
    if (resolutionResult.errors && resolutionResult.errors.length != 0) {
      console.log("... errors occured ...");
      for (const error of resolutionResult.errors) {
        console.log(error);
      }
    } else {
      const conversationResult = resolutionResult.conversations[0];
      if (conversationResult.warnings && conversationResult.warnings.length != 0) {
        console.log("... view warnings ...");
        for (const warning of conversationResult.warnings) {
          console.log(warning);
        }
      } else {
        const summaries = conversationResult.summaries;
        console.log("... view task result ...");
        console.log("issue: %s", summaries[0].text);
        console.log("resolution: %s", summaries[1].text);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
