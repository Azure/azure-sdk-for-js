// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks if resource name is available.
 *
 * @summary checks if resource name is available.
 * x-ms-original-file: 2025-10-02-preview/Certificates_CheckNameAvailability.json
 */
async function certificatesCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability("examplerg", "testcontainerenv", {
    name: "testcertificatename",
    type: "Microsoft.App/managedEnvironments/certificates",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to checks if resource name is available.
 *
 * @summary checks if resource name is available.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_CheckNameAvailability.json
 */
async function containerAppsCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.namespaces.checkNameAvailability("examplerg", "testcontainerenv", {
    name: "testcappname",
    type: "Microsoft.App/containerApps",
  });
  console.log(result);
}

async function main() {
  await certificatesCheckNameAvailability();
  await containerAppsCheckNameAvailability();
}

main().catch(console.error);
