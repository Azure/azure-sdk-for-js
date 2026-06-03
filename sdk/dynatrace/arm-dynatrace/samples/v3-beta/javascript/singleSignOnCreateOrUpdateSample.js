// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DynatraceSingleSignOnResource
 *
 * @summary create a DynatraceSingleSignOnResource
 * x-ms-original-file: 2024-04-24/SingleSignOn_CreateOrUpdate_MaximumSet_Gen.json
 */
async function singleSignOnCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
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
async function singleSignOnCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
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

async function main() {
  await singleSignOnCreateOrUpdateMaximumSetGen();
  await singleSignOnCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
