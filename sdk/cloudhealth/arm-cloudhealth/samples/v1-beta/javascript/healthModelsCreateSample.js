// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a HealthModel
 *
 * @summary create a HealthModel
 * x-ms-original-file: 2025-05-01-preview/HealthModels_Create.json
 */
async function healthModelsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.healthModels.create("rgopenapi", "model1", {
    properties: {
      discovery: {
        scope: "/providers/Microsoft.Management/serviceGroups/myServiceGroup",
        identity: "SystemAssigned",
        addRecommendedSignals: "Enabled",
      },
    },
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/4980D7D5-4E07-47AD-AD34-E76C6BC9F061/resourceGroups/rgopenapi/providers/Microsoft.ManagedIdentity/userAssignedIdentities/ua1":
          {},
      },
    },
    tags: { key2961: "hbljozzkqrpcthsjtfkyozpwyx" },
    location: "eastus2",
  });
  console.log(result);
}

async function main() {
  await healthModelsCreate();
}

main().catch(console.error);
