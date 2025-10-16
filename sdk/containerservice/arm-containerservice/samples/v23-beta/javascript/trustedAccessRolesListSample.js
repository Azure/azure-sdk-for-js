// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List supported trusted access roles.
 *
 * @summary List supported trusted access roles.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/TrustedAccessRoles_List.json
 */
async function listTrustedAccessRoles() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "westus2";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trustedAccessRoles.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listTrustedAccessRoles();
}

main().catch(console.error);
