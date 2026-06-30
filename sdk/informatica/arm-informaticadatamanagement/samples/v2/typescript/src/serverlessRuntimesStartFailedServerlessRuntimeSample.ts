// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a failed runtime resource
 *
 * @summary starts a failed runtime resource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_StartFailedServerlessRuntime_MaximumSet_Gen.json
 */
async function serverlessRuntimesStartFailedServerlessRuntime(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  await client.serverlessRuntimes.startFailedServerlessRuntime(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
  );
}

/**
 * This sample demonstrates how to starts a failed runtime resource
 *
 * @summary starts a failed runtime resource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_StartFailedServerlessRuntime_MinimumSet_Gen.json
 */
async function serverlessRuntimesStartFailedServerlessRuntimeMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  await client.serverlessRuntimes.startFailedServerlessRuntime(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
  );
}

async function main(): Promise<void> {
  await serverlessRuntimesStartFailedServerlessRuntime();
  await serverlessRuntimesStartFailedServerlessRuntimeMin();
}

main().catch(console.error);
