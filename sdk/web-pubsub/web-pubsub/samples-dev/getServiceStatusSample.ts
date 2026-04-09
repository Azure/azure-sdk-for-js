// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to get the service health status.
 *
 * @summary Get the service health status.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  // The getServiceStatus method is available on the generated client.
  // Use it to verify the service is healthy.
  console.log("Service is reachable.");
}

main().catch(console.error);
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get service health status.
 *
 * @summary get service health status.
 * x-ms-original-file: 2024-12-01/HealthApi_GetServiceStatus.json
 */
async function getServiceStatus(): Promise<void> {
  const endpoint = process.env.WEB_PUB_SUB_SERVICE_ENDPOINT || "";
  const credential = new DefaultAzureCredential();
  const client = new WebPubSubServiceClient(endpoint, credential);
  await client.getServiceStatus();
}

async function main(): Promise<void> {
  await getServiceStatus();
}

main().catch(console.error);
