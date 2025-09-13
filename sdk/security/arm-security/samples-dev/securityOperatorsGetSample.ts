// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a specific security operator for the requested scope.
 *
 * @summary Get a specific security operator for the requested scope.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-01-01-preview/examples/SecurityOperators/GetSecurityOperatorByName_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getASpecificSecurityOperatorByScopeAndSecurityOperatorName(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const pricingName = "CloudPosture";
  const securityOperatorName = "DefenderCSPMSecurityOperator";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityOperators.get(pricingName, securityOperatorName);
  console.log(result);
}

async function main(): Promise<void> {
  await getASpecificSecurityOperatorByScopeAndSecurityOperatorName();
}

main().catch(console.error);
