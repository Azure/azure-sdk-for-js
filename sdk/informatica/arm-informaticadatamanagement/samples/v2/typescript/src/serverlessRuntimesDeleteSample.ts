// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a InformaticaServerlessRuntimeResource
 *
 * @summary delete a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_Delete_MaximumSet_Gen.json
 */
async function serverlessRuntimesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  await client.serverlessRuntimes.delete("rg-example", "myOrganization", "myServerlessRuntime");
}

async function main(): Promise<void> {
  await serverlessRuntimesDelete();
}

main().catch(console.error);
