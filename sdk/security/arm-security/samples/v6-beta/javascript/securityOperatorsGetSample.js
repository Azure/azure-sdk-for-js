// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific security operator for the requested scope.
 *
 * @summary get a specific security operator for the requested scope.
 * x-ms-original-file: 2023-01-01-preview/SecurityOperators/GetSecurityOperatorByName_example.json
 */
async function getASpecificSecurityOperatorByScopeAndSecurityOperatorName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityOperators.get("CloudPosture", "DefenderCSPMSecurityOperator");
  console.log(result);
}

async function main() {
  await getASpecificSecurityOperatorByScopeAndSecurityOperatorName();
}

main().catch(console.error);
