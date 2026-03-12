// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Puts the SAP Application Server Instance resource. <br><br>This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @summary Puts the SAP Application Server Instance resource. <br><br>This will be used by service only. PUT by end user will return a Bad Request error.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPApplicationServerInstances_Create_HA_AvSet.json
 */

import type {
  SAPApplicationServerInstance,
  SAPApplicationServerInstancesCreateOptionalParams,
} from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createSapApplicationServerInstancesForHaSystemWithAvailabilitySet(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const applicationInstanceName = "app01";
  const body: SAPApplicationServerInstance = {
    location: "westcentralus",
    tags: {},
  };
  const options: SAPApplicationServerInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Puts the SAP Application Server Instance resource. <br><br>This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @summary Puts the SAP Application Server Instance resource. <br><br>This will be used by service only. PUT by end user will return a Bad Request error.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPApplicationServerInstances_Create.json
 */
async function sapApplicationServerInstancesCreate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "6d875e77-e412-4d7d-9af4-8895278b4443";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const applicationInstanceName = "app01";
  const body: SAPApplicationServerInstance = {
    location: "westcentralus",
    tags: {},
  };
  const options: SAPApplicationServerInstancesCreateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPApplicationServerInstances.beginCreateAndWait(
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createSapApplicationServerInstancesForHaSystemWithAvailabilitySet();
  await sapApplicationServerInstancesCreate();
}

main().catch(console.error);
