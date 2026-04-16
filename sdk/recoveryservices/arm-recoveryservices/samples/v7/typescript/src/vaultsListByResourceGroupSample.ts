// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesClient } from "@azure/arm-recoveryservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of Vaults.
 *
 * @summary retrieve a list of Vaults.
 * x-ms-original-file: 2025-08-01/ListResources.json
 */
async function listOfRecoveryServicesResourcesInResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vaults.listByResourceGroup(
    "Default-RecoveryServices-ResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOfRecoveryServicesResourcesInResourceGroup();
}

main().catch(console.error);
