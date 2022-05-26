// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample program uses the Text Analytics for Healthcare API to detect
 * healthcare-related entities in some documents and prints them to the
 * console.
 *
 * @summary detects healthcare entities in a piece of text and creates an FHIR representation
 */

const {
  AzureKeyCredential,
  KnownFhirVersion,
  TextAnalysisClient,
} = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "The patient is a 54-year-old gentleman with a history of progressive angina over the past several months.",
  "Prescribed 100mg ibuprofen, taken twice daily.",
  "Patient does not suffer from high blood pressure.",
];

async function main() {
  console.log("== Healthcare Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const actions = [
    {
      kind: "Healthcare",
      fhirVersion: KnownFhirVersion["4.0.1"],
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");

  poller.onProgress(() => {
    console.log(
      `Last time the operation was updated was on: ${poller.getOperationState().lastModifiedOn}`
    );
  });
  console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
  console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "Healthcare") {
      throw new Error(`Expected a healthcare results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);
        if (entity.dataSources.length > 0) {
          console.log("\t and it can be referenced in the following data sources:");
          for (const ds of entity.dataSources) {
            console.log(`\t\t- ${ds.name} with Entity ID: ${ds.entityId}`);
          }
        }
      }
      if (result.entityRelations.length > 0) {
        console.log(`\tRecognized relations between entities:`);
        for (const relation of result.entityRelations) {
          console.log(
            `\t\t- Relation of type ${relation.relationType} found between the following entities:`
          );
          for (const role of relation.roles) {
            console.log(`\t\t\t- "${role.entity.text}" with the role ${role.name}`);
          }
        }
      }
      if (result.fhirBundle) {
        console.log(`FHIR object: ${JSON.stringify(result.fhirBundle, undefined, 2)}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
