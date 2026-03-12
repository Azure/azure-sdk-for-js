// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a Label.
 *
 * @summary Delete a Label.
 * x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_Delete.json
 */

import { EasmMgmtClient } from "@azure/arm-defendereasm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function labels(): Promise<void> {
  const subscriptionId =
    process.env["DEFENDEREASM_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEFENDEREASM_RESOURCE_GROUP"] || "dummyrg";
  const workspaceName = "ThisisaWorkspace";
  const labelName = "ThisisaLabel";
  const credential = new DefaultAzureCredential();
  const client = new EasmMgmtClient(credential, subscriptionId);
  const result = await client.labels.beginDeleteAndWait(
    resourceGroupName,
    workspaceName,
    labelName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await labels();
}

main().catch(console.error);
