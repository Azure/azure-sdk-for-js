// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates operations related to ingestion status.
 */
// Load the .env file if it exists
require("dotenv").config();

const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const existingDataFeedId = process.env["METRICS_ADVISOR_DATAFEED_ID"] || "<datafeed id>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const startTime = new Date(Date.UTC(2020, 7, 22));
  const endTime = new Date(Date.UTC(2020, 7, 26));
  await listIngestionStatus(adminClient, existingDataFeedId, startTime, endTime);

  await getIngestionProgress(adminClient, existingDataFeedId);

  // re-run the ingestion for the specified time range
  await refreshIngestion(adminClient, existingDataFeedId, startTime, endTime);
  await listIngestionStatus(adminClient, existingDataFeedId, startTime, endTime);
}

async function listIngestionStatus(adminClient, dataFeedId, startTime, endTime) {
  console.log("Listing ingestion status...");
  // iterate through all ingestions using for-await-of
  const listIterator = adminClient.listDataFeedIngestionStatus(dataFeedId, startTime, endTime);
  for await (const ingestion of listIterator) {
    console.log(`  ${ingestion.timestamp} ${ingestion.status}  ${ingestion.message}`);
  }
  // listing by pages
  const iterator = adminClient
    .listDataFeedIngestionStatus(dataFeedId, startTime, endTime)
    .byPage({ maxPageSize: 2 });
  const result = await iterator.next();

  if (!result.done) {
    console.log("  -- Page --");
    console.table(result.value, ["timestamp", "status", "message"]);
    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("  -- Page --");
      console.table(result.value, ["timestamp", "status", "message"]);
    }
  }
}

async function getIngestionProgress(adminClient, dataFeedId) {
  console.log("Getting ingestion progress...");
  const result = await adminClient.getDataFeedIngestionProgress(dataFeedId);
  console.log(result);
}

async function refreshIngestion(adminClient, dataFeedId, startTime, endTime) {
  console.log("Resetting ingestion status...");
  await adminClient.refreshDataFeedIngestion(dataFeedId, startTime, endTime);
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });
