// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a cloud account connector from a subscription
 *
 * @summary Delete a cloud account connector from a subscription
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2020-01-01-preview/examples/Connectors/DeleteConnectorSubscription_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteACloudAccountConnectorFromASubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const connectorName = "aws_dev1";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.connectors.delete(connectorName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteACloudAccountConnectorFromASubscription();
}

main().catch(console.error);
