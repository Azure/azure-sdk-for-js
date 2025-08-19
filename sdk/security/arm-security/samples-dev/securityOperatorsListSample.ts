// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists Microsoft Defender for Cloud securityOperators in the subscription.
 *
 * @summary Lists Microsoft Defender for Cloud securityOperators in the subscription.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-01-01-preview/examples/SecurityOperators/ListSecurityOperators_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listSecurityOperators(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "CloudPosture";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityOperators.list(pricingName);
  console.log(result);
}

async function main(): Promise<void> {
  await listSecurityOperators();
}

main().catch(console.error);
