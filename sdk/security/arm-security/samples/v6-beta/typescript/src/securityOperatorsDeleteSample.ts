// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Microsoft Defender for Cloud securityOperator in the subscription.
 *
 * @summary delete Microsoft Defender for Cloud securityOperator in the subscription.
 * x-ms-original-file: 2023-01-01-preview/SecurityOperators/DeleteSecurityOperatorByName_example.json
 */
async function deleteSecurityOperatorOnSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.securityOperators.delete("CloudPosture", "DefenderCSPMSecurityOperator");
}

async function main(): Promise<void> {
  await deleteSecurityOperatorOnSubscription();
}

main().catch(console.error);
