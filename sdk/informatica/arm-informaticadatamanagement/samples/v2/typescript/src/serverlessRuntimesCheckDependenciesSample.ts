// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks all dependencies for a serverless runtime resource
 *
 * @summary checks all dependencies for a serverless runtime resource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_CheckDependencies_MaximumSet_Gen.json
 */
async function serverlessRuntimesCheckDependencies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.checkDependencies(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to checks all dependencies for a serverless runtime resource
 *
 * @summary checks all dependencies for a serverless runtime resource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_CheckDependencies_MinimumSet_Gen.json
 */
async function serverlessRuntimesCheckDependenciesMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.checkDependencies(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverlessRuntimesCheckDependencies();
  await serverlessRuntimesCheckDependenciesMin();
}

main().catch(console.error);
