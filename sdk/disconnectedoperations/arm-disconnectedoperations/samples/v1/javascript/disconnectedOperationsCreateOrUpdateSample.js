// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsMgmtClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DisconnectedOperationCreateOrUpdate
 *
 * @summary create a DisconnectedOperationCreateOrUpdate
 * x-ms-original-file: 2026-03-15/DisconnectedOperations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function disconnectedOperationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51DB5DE7-A66C-4789-BFFF-9F75C95A0201";
  const client = new DisconnectedOperationsMgmtClient(credential, subscriptionId);
  const result = await client.disconnectedOperations.createOrUpdate(
    "rgdisconnectedOperations",
    "demo-resource",
    {
      properties: {
        connectionIntent: "Disconnected",
        billingConfiguration: {
          autoRenew: "Enabled",
          current: { cores: 12, pricingModel: "Trial" },
        },
        benefitPlans: { azureHybridWindowsServerBenefit: "Enabled", windowsServerVmCount: 5 },
      },
      tags: { key1: "value1" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await disconnectedOperationsCreateOrUpdate();
}

main().catch(console.error);
