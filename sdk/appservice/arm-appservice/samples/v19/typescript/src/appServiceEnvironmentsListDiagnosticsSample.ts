// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get diagnostic information for an App Service Environment.
 *
 * @summary description for Get diagnostic information for an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ListDiagnostics.json
 */
async function getDiagnosticInformationForAnAppServiceEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.listDiagnostics("test-rg", "test-ase");
  console.log(result);
}

async function main(): Promise<void> {
  await getDiagnosticInformationForAnAppServiceEnvironment();
}

main().catch(console.error);
