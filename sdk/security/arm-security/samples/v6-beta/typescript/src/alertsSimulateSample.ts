// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to simulate security alerts
 *
 * @summary simulate security alerts
 * x-ms-original-file: 2022-01-01/Alerts/SimulateAlerts_example.json
 */
async function simulateSecurityAlertsOnASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.alerts.simulate("centralus", {
    properties: {
      bundles: [
        "AppServices",
        "DNS",
        "KeyVaults",
        "KubernetesService",
        "ResourceManager",
        "SqlServers",
        "StorageAccounts",
        "VirtualMachines",
        "CosmosDbs",
      ],
      kind: "Bundles",
    },
  });
}

async function main(): Promise<void> {
  await simulateSecurityAlertsOnASubscription();
}

main().catch(console.error);
