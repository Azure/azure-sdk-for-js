// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an IoT Connector.
 *
 * @summary Deletes an IoT Connector.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/iotconnectors/iotconnector_Delete.json
 */

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnIoTConnector(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const iotConnectorName = "blue";
  const workspaceName = "workspace1";
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectors.beginDeleteAndWait(
    resourceGroupName,
    iotConnectorName,
    workspaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnIoTConnector();
}

main().catch(console.error);
