// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to puts the SAP Application Server Instance resource.
 *
 * @summary puts the SAP Application Server Instance resource.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_Update.json
 */
async function sAPApplicationServerInstancesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.update(
    "test-rg",
    "X00",
    "app01",
    { tags: { tag1: "value1" } },
  );
  console.log(result);
}

async function main() {
  sAPApplicationServerInstancesUpdate();
}

main().catch(console.error);
