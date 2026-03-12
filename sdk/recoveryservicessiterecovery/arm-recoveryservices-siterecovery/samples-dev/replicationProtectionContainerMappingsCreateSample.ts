// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create a protection container mapping.
 *
 * @summary The operation to create a protection container mapping.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionContainerMappings_Create.json
 */

import {
  CreateProtectionContainerMappingInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createProtectionContainerMapping(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const protectionContainerName = "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179";
  const mappingName = "cloud1protectionprofile1";
  const creationInput: CreateProtectionContainerMappingInput = {
    properties: {
      policyId:
        "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/protectionprofile1",
      providerSpecificInput: {
        instanceType: "A2A",
      },
      targetProtectionContainerId: "Microsoft Azure",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectionContainerMappings.beginCreateAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      mappingName,
      creationInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createProtectionContainerMapping();
}

main().catch(console.error);
