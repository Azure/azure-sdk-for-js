// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorslis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all SLI resources under a parent resource.
 *
 * @summary lists all SLI resources under a parent resource.
 * x-ms-original-file: 2025-03-01-preview/Slis_ListByParent.json
 */
async function slisListByParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.slis.listByParent("testSG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await slisListByParent();
}

main().catch(console.error);
