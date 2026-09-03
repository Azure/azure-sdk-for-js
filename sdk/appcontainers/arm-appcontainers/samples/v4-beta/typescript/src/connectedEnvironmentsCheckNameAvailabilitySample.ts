// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if resource connectedEnvironmentName is available.
 *
 * @summary checks if resource connectedEnvironmentName is available.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsCertificates_CheckNameAvailability.json
 */
async function certificatesCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironments.checkNameAvailability(
    "examplerg",
    "testcontainerenv",
    { name: "testcertificatename", type: "Microsoft.App/connectedEnvironments/certificates" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificatesCheckNameAvailability();
}

main().catch(console.error);
