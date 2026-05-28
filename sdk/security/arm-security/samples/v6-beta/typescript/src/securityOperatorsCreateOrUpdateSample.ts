// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates Microsoft Defender for Cloud security operator on the given scope.
 *
 * @summary creates Microsoft Defender for Cloud security operator on the given scope.
 * x-ms-original-file: 2023-01-01-preview/SecurityOperators/PutSecurityOperatorByName_example.json
 */
async function createASecurityOperatorOnTheGivenScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityOperators.createOrUpdate(
    "CloudPosture",
    "DefenderCSPMSecurityOperator",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createASecurityOperatorOnTheGivenScope();
}

main().catch(console.error);
