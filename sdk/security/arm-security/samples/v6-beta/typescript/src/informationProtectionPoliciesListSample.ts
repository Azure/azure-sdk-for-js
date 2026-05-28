// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to information protection policies of a specific management group.
 *
 * @summary information protection policies of a specific management group.
 * x-ms-original-file: 2017-08-01-preview/InformationProtectionPolicies/ListInformationProtectionPolicies_example.json
 */
async function getInformationProtectionPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.informationProtectionPolicies.list(
    "providers/Microsoft.Management/managementGroups/148059f7-faf3-49a6-ba35-85122112291e",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getInformationProtectionPolicies();
}

main().catch(console.error);
