// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StopRequest,
  SAPApplicationServerInstancesStopInstanceOptionalParams,
} from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Stops the SAP Application Server Instance.
 *
 * @summary Stops the SAP Application Server Instance.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPApplicationServerInstances_StopInstance.json
 */
async function stopTheSapApplicationServerInstance(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const applicationInstanceName = "app01";
  const body: StopRequest = { softStopTimeoutSeconds: 0 };
  const options: SAPApplicationServerInstancesStopInstanceOptionalParams = {
    body,
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.beginStopInstanceAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopTheSapApplicationServerInstance();
}

main().catch(console.error);
