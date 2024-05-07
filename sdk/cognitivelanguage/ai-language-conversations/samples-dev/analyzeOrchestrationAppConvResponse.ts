// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze user query using an orchestration project.
 * In this sample, orchestration project's top intent will map to a conversation project.
 *
 * @summary Orchestration project with conversational response
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
      text: "Send an email to Carol about the tomorrow's demo",
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
  console.log("top intent: ", topIntent);

  const prediction = result.prediction;
  if (prediction.projectKind == "Orchestration") {
    const topIntentObject = prediction.intents[topIntent];
    console.log("confidence score: ", topIntentObject.confidence);
    console.log("project kind: ", topIntentObject.targetProjectKind);

    if (topIntentObject.targetProjectKind == "Conversation") {
      console.log("\nview conversation result:");

      if (topIntentObject.result && topIntentObject.result.prediction) {
        console.log("\ntop intent: ", topIntentObject.result.prediction.topIntent);

        const intent = topIntentObject.result.prediction.intents[0];
        console.log("category: ", intent.category);
        console.log("confidence score: ", intent.confidence);

        console.log("\nview entities:");
        topIntentObject.result.prediction.entities.forEach((entity) => {
          console.log("\ncategory: ", entity.category);
          console.log("text: ", entity.text);
          console.log("confidence score: %f", entity.confidence);

          if (entity.resolutions) {
            console.log("resolutions:");
            entity.resolutions.forEach((resolution) => {
              console.log("kind: ", resolution.resolutionKind);
              if ("value" in resolution) console.log("value: ", resolution.value);
            });
          }

          if (entity.extraInformation) {
            console.log("extra info:");
            for (const data of entity.extraInformation) {
              console.log("kind: ", data.extraInformationKind);
              if (data.extraInformationKind == "ListKey") console.log("key: ", data.key);
              if (data.extraInformationKind == "EntitySubtype") console.log("value: ", data.value);
            }
          }
        });
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
