// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze user query for intents and entities using
 * a conversation project with a language parameter.
 *
 * @summary Conversational query analysis for intents and entities extraction
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
const projectName = process.env.AZURE_CONVERSATIONS_PROJECT_NAME || "<project-name>";
const deploymentName = process.env.AZURE_CONVERSATIONS_DEPLOYMENT_NAME || "<deployment-name>";

const service: ConversationAnalysisClient = new ConversationAnalysisClient(
  cluEndpoint,
  new AzureKeyCredential(cluKey),
);

const body: ConversationalTask = {
  kind: "Conversation",
  analysisInput: {
    conversationItem: {
      id: "id__7863",
      participantId: "id__7863",
      text: "Send an email to Carol about the tomorrow's demo",
    },
  },
  parameters: {
    projectName: projectName,
    deploymentName: deploymentName,
  },
};

export async function main() {
  //Analyze query
  const { result } = await service.analyzeConversation(body);
  console.log("query: ", result.query);
  console.log("project kind: ", result.prediction.projectKind);
  console.log("top intent: ", result.prediction.topIntent);

  const prediction = result.prediction;
  if (prediction.projectKind == "Conversation") {
    console.log("category: ", prediction.intents[0].category);
    console.log("confidence score: ", prediction.intents[0].confidence);
    console.log("entities:");

    for (const entity of prediction.entities) {
      console.log("\ncategory: ", entity.category);
      console.log("text: ", entity.text);
      console.log("confidence score: ", entity.confidence);

      if (entity.resolutions) {
        console.log("resolutions:");
        for (const resolution of entity.resolutions) {
          console.log("kind: ", resolution.resolutionKind);
          if ("value" in resolution) console.log("value: ", resolution.value);
        }
      }

      if (entity.extraInformation) {
        console.log("extra info:");
        for (const data of entity.extraInformation) {
          console.log("kind: ", data.extraInformationKind);
          if (data.extraInformationKind == "ListKey") console.log("key: ", data.key);
          if (data.extraInformationKind == "EntitySubtype") console.log("value: ", data.value);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
