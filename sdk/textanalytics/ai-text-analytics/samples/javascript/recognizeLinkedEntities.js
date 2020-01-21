// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects entities that have links to more information on the web
 */

const { TextAnalyticsClient, CognitiveServicesCredential } = require("@azure/ai-text-analytics");

export async function main() {
  console.log(`Running extractLinkEntities sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICES_ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.recognizeLinkedEntities(["I love living in Seattle."]);

  if (!result.error) {
    for (const entity of result.entities) {
      console.log(
        `Found entity ${entity.name}; link ${entity.url}; datasource: ${entity.dataSource}`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

