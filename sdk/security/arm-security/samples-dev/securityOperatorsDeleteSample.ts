// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete Microsoft Defender for Cloud securityOperator in the subscription.
 *
 * @summary Delete Microsoft Defender for Cloud securityOperator in the subscription.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-01-01-preview/examples/SecurityOperators/DeleteSecurityOperatorByName_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteSecurityOperatorOnSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "CloudPosture";
  const securityOperatorName = "DefenderCSPMSecurityOperator";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityOperators.delete(pricingName, securityOperatorName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSecurityOperatorOnSubscription();
}

main().catch(console.error);
