// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates operations related to ingestion status.
 * @azsdk-weight 70
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
} from "@azure/ai-metrics-advisor";

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const existingDataFeedId = process.env["METRICS_ADVISOR_DATAFEED_ID"] || "<datafeed id>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const startTime = new Date(Date.UTC(2020, 7, 22));
  const endTime = new Date(Date.UTC(2020, 7, 24));
  await listIngestionStatus(adminClient, existingDataFeedId, startTime, endTime);

  await getIngestionProgress(adminClient, existingDataFeedId);

  // re-run the ingestion for the specified time range
  await refreshIngestion(adminClient, existingDataFeedId, startTime, endTime);
  await listIngestionStatus(adminClient, existingDataFeedId, startTime, endTime);
}

async function listIngestionStatus(
  adminClient: MetricsAdvisorAdministrationClient,
  dataFeedId: string,
  startTime: Date,
  endTime: Date
) {
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
    for (const item of result.value) {
      console.log(`      timestamp: ${item.timestamp}`);
      console.log(`      status: ${item.status}`);
      console.log(`      status: ${item.message}`);
    }

    const nextPage = await iterator.next();
    if (!nextPage.done) {
      console.log("  -- Page --");
      for (const item of result.value) {
        console.log(`      timestamp: ${item.timestamp}`);
        console.log(`      status: ${item.status}`);
        console.log(`      status: ${item.message}`);
      }
    }
  }
}

async function getIngestionProgress(
  adminClient: MetricsAdvisorAdministrationClient,
  dataFeedId: string
) {
  console.log("Getting ingestion progress...");
  const result = await adminClient.getDataFeedIngestionProgress(dataFeedId);
  console.log(result);
}

async function refreshIngestion(
  adminClient: MetricsAdvisorAdministrationClient,
  dataFeedId: string,
  startTime: Date,
  endTime: Date
) {
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
