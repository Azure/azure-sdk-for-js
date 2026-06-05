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
  const hub = "hub1";
  const client = new WebPubSubServiceClient(endpoint, credential, hub);
  // getServiceStatus is available on the generated client but not on the handwritten client.
  console.log("Service endpoint:", client.endpoint);
}

async function main(): Promise<void> {
  await getServiceStatus();
}

main().catch(console.error);
