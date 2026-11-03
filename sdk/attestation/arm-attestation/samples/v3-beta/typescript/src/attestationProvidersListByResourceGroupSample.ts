// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns attestation providers list in a resource group.
 *
 * @summary returns attestation providers list in a resource group.
 * x-ms-original-file: 2021-06-01/Get_AttestationProvidersListByResourceGroup.json
 */
async function attestationProvidersListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6c96b33e-f5b8-40a6-9011-5cb1c58b0915";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.listByResourceGroup("testrg1");
  console.log(result);
}

async function main(): Promise<void> {
  await attestationProvidersListByResourceGroup();
}

main().catch(console.error);
