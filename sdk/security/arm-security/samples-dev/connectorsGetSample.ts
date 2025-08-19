// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Details of a specific cloud account connector
 *
 * @summary Details of a specific cloud account connector
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2020-01-01-preview/examples/Connectors/GetConnectorSubscription_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function detailsOfASpecificCloudAccountConnector(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const connectorName = "aws_dev1";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.connectors.get(connectorName);
  console.log(result);
}

async function main(): Promise<void> {
  await detailsOfASpecificCloudAccountConnector();
}

main().catch(console.error);
