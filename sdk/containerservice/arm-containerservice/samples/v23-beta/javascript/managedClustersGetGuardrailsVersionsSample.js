// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Contains Guardrails version along with its support info and whether it is a default version.
 *
 * @summary Contains Guardrails version along with its support info and whether it is a default version.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/GetGuardrailsVersions.json
 */
async function getGuardrailsAvailableVersions() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "location1";
  const version = "v1.0.0";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.getGuardrailsVersions(location, version);
  console.log(result);
}

async function main() {
  await getGuardrailsAvailableVersions();
}

main().catch(console.error);
