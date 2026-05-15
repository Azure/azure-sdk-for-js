// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
 *
 * @summary creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one.
 * x-ms-original-file: 2025-05-01/ConfigurationPolicyGroupPut.json
 */
async function configurationPolicyGroupPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.configurationPolicyGroups.createOrUpdate(
    "rg1",
    "vpnServerConfiguration1",
    "policyGroup1",
    {
      isDefault: true,
      policyMembers: [
        { name: "policy1", attributeType: "RadiusAzureGroupId", attributeValue: "6ad1bd08" },
        { name: "policy2", attributeType: "CertificateGroupId", attributeValue: "red.com" },
      ],
      priority: 0,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationPolicyGroupPut();
}

main().catch(console.error);
