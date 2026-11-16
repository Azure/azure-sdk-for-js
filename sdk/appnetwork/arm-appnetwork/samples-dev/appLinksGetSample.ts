// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-appnetwork";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details of an Azure Kubernetes Application Network.
 *
 * @summary get the details of an Azure Kubernetes Application Network.
 * x-ms-original-file: 2026-08-01-preview/AppLinks_Get.json
 */
async function appLinksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinks.get("test_rg", "applink-test-01");
  console.log(result);
}

async function main(): Promise<void> {
  await appLinksGet();
}

main().catch(console.error);
