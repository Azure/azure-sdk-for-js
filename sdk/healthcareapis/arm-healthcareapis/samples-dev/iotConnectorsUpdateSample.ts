// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotConnectorPatchResource } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patch an IoT Connector.
 *
 * @summary Patch an IoT Connector.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/iotconnectors/iotconnector_Patch.json
 */
async function patchAnIoTConnector(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const iotConnectorName = "blue";
  const workspaceName = "workspace1";
  const iotConnectorPatchResource: IotConnectorPatchResource = {
    identity: { type: "SystemAssigned" },
    tags: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.iotConnectors.beginUpdateAndWait(
    resourceGroupName,
    iotConnectorName,
    workspaceName,
    iotConnectorPatchResource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchAnIoTConnector();
}

main().catch(console.error);
