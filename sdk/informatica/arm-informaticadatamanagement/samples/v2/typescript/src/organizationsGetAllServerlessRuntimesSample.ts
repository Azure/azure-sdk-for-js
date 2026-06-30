// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all serverless runtime resources in a given informatica organization resource.
 *
 * @summary gets all serverless runtime resources in a given informatica organization resource.
 * x-ms-original-file: 2025-11-27/Organizations_GetAllServerlessRuntimes_MaximumSet_Gen.json
 */
async function organizationsGetAllServerlessRuntimes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.getAllServerlessRuntimes(
    "rg-example",
    "myOrganization",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets all serverless runtime resources in a given informatica organization resource.
 *
 * @summary gets all serverless runtime resources in a given informatica organization resource.
 * x-ms-original-file: 2025-11-27/Organizations_GetAllServerlessRuntimes_MinimumSet_Gen.json
 */
async function organizationsGetAllServerlessRuntimesMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.getAllServerlessRuntimes(
    "rg-example",
    "myOrganization",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetAllServerlessRuntimes();
  await organizationsGetAllServerlessRuntimesMin();
}

main().catch(console.error);
