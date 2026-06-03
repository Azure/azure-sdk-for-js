// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific security standard for the requested scope
 *
 * @summary get a specific security standard for the requested scope
 * x-ms-original-file: 2021-08-01-preview/Standards/GetStandard_example.json
 */
async function getASpecificSecurityStandardByScopeAndStandardId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.standards.get(
    "myResourceGroup",
    "21300918-b2e3-0346-785f-c77ff57d243b",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getASpecificSecurityStandardByScopeAndStandardId();
}

main().catch(console.error);
