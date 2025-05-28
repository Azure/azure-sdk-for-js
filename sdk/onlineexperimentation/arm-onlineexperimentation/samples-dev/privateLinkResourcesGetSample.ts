// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource for an online experimentation workspace resource.
 *
 * @summary gets a private link resource for an online experimentation workspace resource.
 * x-ms-original-file: 2025-08-01-preview/PrivateLinkResource_Get.json
 */
async function getPrivateLinkResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "res9871",
    "expworkspace3",
    "link1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateLinkResource();
}

main().catch(console.error);
