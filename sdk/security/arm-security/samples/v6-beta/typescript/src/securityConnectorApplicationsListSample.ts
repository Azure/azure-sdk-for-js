// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all relevant applications over a security connector level scope
 *
 * @summary get a list of all relevant applications over a security connector level scope
 * x-ms-original-file: 2022-07-01-preview/Applications/ListBySecurityConnectorApplications_example.json
 */
async function listSecurityApplicationsBySecurityConnectorLevelScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityConnectorApplications.list(
    "gcpResourceGroup",
    "gcpconnector",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityApplicationsBySecurityConnectorLevelScope();
}

main().catch(console.error);
