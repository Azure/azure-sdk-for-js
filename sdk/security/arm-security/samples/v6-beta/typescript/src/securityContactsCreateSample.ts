// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create security contact configurations for the subscription
 *
 * @summary create security contact configurations for the subscription
 * x-ms-original-file: 2023-12-01-preview/SecurityContacts/CreateSecurityContact_example.json
 */
async function createSecurityContactData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityContacts.create("default", {
    emails: "john@contoso.com;jane@contoso.com",
    isEnabled: true,
    notificationsByRole: { roles: ["Owner"], state: "On" },
    notificationsSources: [
      { minimalRiskLevel: "Critical", sourceType: "AttackPath" },
      { minimalSeverity: "Medium", sourceType: "Alert" },
    ],
    phone: "(214)275-4038",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createSecurityContactData();
}

main().catch(console.error);
