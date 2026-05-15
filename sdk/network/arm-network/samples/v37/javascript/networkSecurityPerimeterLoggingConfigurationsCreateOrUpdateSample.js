// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates NSP logging configuration.
 *
 * @summary creates or updates NSP logging configuration.
 * x-ms-original-file: 2025-05-01/NspLoggingConfigurationPut.json
 */
async function nspLoggingConfigurationPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLoggingConfigurations.createOrUpdate(
    "rg1",
    "nsp1",
    "instance",
    {
      enabledLogCategories: [
        "NspPublicInboundPerimeterRulesDenied",
        "NspPublicOutboundPerimeterRulesDenied",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await nspLoggingConfigurationPut();
}

main().catch(console.error);
