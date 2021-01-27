// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects healthcare entities in a piece of text and prints them
 */

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = [
  "Prescribed 100mg ibuprofen, taken twice daily.",
  "Patient does not suffer from high blood pressure."
];

async function main() {
  console.log("== Recognize Healthcare Entities Sample ==");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await client.beginAnalyzeHealthcareEntities(documents, "en", {
    includeStatistics: true
  });
  const results = await poller.pollUntilDone();
  console.log(
    `The healthcare operation created on ${poller.getOperationState().createdOn} finished process`
  );
  console.log(
    `The healthcare operation results will expire on ${poller.getOperationState().expiresOn}`
  );

  for await (const result of results) {
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(
          `\t- Entity ${entity.text} of type ${entity.category} ${
            entity.relatedEntities.size > 0 ? "and it is related to the following entities" : ""
          }`
        );
        for (const edge of entity.relatedEntities) {
          console.log(`\t\t- ${edge[0].text} with the relationship being ${edge[1]}`);
        }
        if (entity.dataSources.length > 0) {
          console.log("\t and it can be referenced in the following data sources:");
          for (const ds of entity.dataSources) {
            console.log(`\t\t- ${ds.name} with ID: ${ds.entityId}`);
          }
        }
      }
    } else console.error("\tError:", result.error);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
