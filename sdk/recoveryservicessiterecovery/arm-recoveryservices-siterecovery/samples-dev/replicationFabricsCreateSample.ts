// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create an Azure Site Recovery fabric (for e.g. Hyper-V site).
 *
 * @summary The operation to create an Azure Site Recovery fabric (for e.g. Hyper-V site).
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationFabrics_Create.json
 */

import {
  FabricCreationInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createsAnAzureSiteRecoveryFabric(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const input: FabricCreationInput = {
    properties: {
      customDetails: { instanceType: "Azure" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationFabrics.beginCreateAndWait(
    resourceGroupName,
    resourceName,
    fabricName,
    input,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAnAzureSiteRecoveryFabric();
}

main().catch(console.error);
