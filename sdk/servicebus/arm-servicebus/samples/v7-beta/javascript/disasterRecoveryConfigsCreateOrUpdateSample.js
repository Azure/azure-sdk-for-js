// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a new Alias(Disaster Recovery configuration)
 *
 * @summary creates or updates a new Alias(Disaster Recovery configuration)
 * x-ms-original-file: 2025-05-01-preview/disasterRecoveryConfigs/SBAliasCreate.json
 */
async function sbAliasCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.createOrUpdate(
    "ardsouzatestRG",
    "sdk-Namespace-8860",
    "sdk-Namespace-8860",
    {
      properties: {
        alternateName: "alternameforAlias-Namespace-8860",
        partnerNamespace: "sdk-Namespace-37",
      },
    },
  );
  console.log(result);
}

async function main() {
  await sbAliasCreate();
}

main().catch(console.error);
