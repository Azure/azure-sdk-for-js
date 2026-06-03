// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DynatraceSingleSignOnResource
 *
 * @summary create a DynatraceSingleSignOnResource
 * x-ms-original-file: 2024-04-24/SingleSignOn_CreateOrUpdate_MaximumSet_Gen.json
 */
async function singleSignOnCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.singleSignOn.createOrUpdate(
    "myResourceGroup",
    "myMonitor",
    "default",
    {
      aadDomains: ["mpliftrdt20210811outlook.onmicrosoft.com"],
      enterpriseAppId: "00000000-0000-0000-0000-000000000000",
      singleSignOnState: "Enable",
      singleSignOnUrl: "https://www.dynatrace.io",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DynatraceSingleSignOnResource
 *
 * @summary create a DynatraceSingleSignOnResource
 * x-ms-original-file: 2024-04-24/SingleSignOn_CreateOrUpdate_MinimumSet_Gen.json
 */
async function singleSignOnCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.singleSignOn.createOrUpdate(
    "myResourceGroup",
    "myMonitor",
    "default",
    {
      aadDomains: ["mpliftrdt20210811outlook.onmicrosoft.com"],
      singleSignOnUrl: "https://www.dynatrace.io",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await singleSignOnCreateOrUpdateMaximumSetGen();
  await singleSignOnCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
