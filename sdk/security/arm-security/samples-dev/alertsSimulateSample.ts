// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Simulate security alerts
 *
 * @summary Simulate security alerts
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2022-01-01/examples/Alerts/SimulateAlerts_example.json
 */

import type { AlertSimulatorRequestBody } from "@azure/arm-security";
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function simulateSecurityAlertsOnASubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const ascLocation = "centralus";
  const alertSimulatorRequestBody: AlertSimulatorRequestBody = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.alerts.beginSimulateAndWait(ascLocation, alertSimulatorRequestBody);
  console.log(result);
}

async function main(): Promise<void> {
  await simulateSecurityAlertsOnASubscription();
}

main().catch(console.error);
