// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Information protection policies of a specific management group.
 *
 * @summary Information protection policies of a specific management group.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2017-08-01-preview/examples/InformationProtectionPolicies/ListInformationProtectionPolicies_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getInformationProtectionPolicies(): Promise<void> {
  const scope =
    "providers/Microsoft.Management/managementGroups/148059f7-faf3-49a6-ba35-85122112291e";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.informationProtectionPolicies.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getInformationProtectionPolicies();
}

main().catch(console.error);
