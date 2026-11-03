// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or update a security application on the given subscription.
 *
 * @summary creates or update a security application on the given subscription.
 * x-ms-original-file: 2022-07-01-preview/Applications/PutApplication_example.json
 */
async function createApplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.application.createOrUpdate("ad9a8e26-29d9-4829-bb30-e597a58cdbb8", {
    description: "An application on critical recommendations",
    conditionSets: [{ conditions: [{ operator: "contains", property: "$.Id", value: "-bil-" }] }],
    displayName: "Admin's application",
    sourceResourceType: "Assessments",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createApplication();
}

main().catch(console.error);
