// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validate a Connector.
 *
 * @summary Validate a Connector.
 * x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/preview/2024-07-01-preview/examples/ValidateConnectorSuccess.json
 */

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validateConnectorSuccess(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SERVICELINKER_RESOURCE_GROUP"] || "test-rg";
  const location = "westus";
  const connectorName = "connectorName";
  const credential = new DefaultAzureCredential();
  const client = new ServiceLinkerManagementClient(credential);
  const result = await client.connector.beginValidateAndWait(
    subscriptionId,
    resourceGroupName,
    location,
    connectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateConnectorSuccess();
}

main().catch(console.error);
