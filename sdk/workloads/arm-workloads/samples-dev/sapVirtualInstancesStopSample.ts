// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StopRequest, SAPVirtualInstancesStopOptionalParams } from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Stops the SAP Application, that is the Application server instances and Central Services instance.
 *
 * @summary Stops the SAP Application, that is the Application server instances and Central Services instance.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Stop.json
 */
async function sapVirtualInstancesStop(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: StopRequest = { softStopTimeoutSeconds: 0 };
  const options: SAPVirtualInstancesStopOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.beginStopAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sapVirtualInstancesStop();
}

main().catch(console.error);
