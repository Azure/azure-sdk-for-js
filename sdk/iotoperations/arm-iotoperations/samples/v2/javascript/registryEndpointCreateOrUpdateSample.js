// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a RegistryEndpointResource
 *
 * @summary create a RegistryEndpointResource
 * x-ms-original-file: 2025-10-01/RegistryEndpoint_CreateOrUpdate_MaximumSet_Gen.json
 */
async function registryEndpointCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.registryEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-123",
    "resource-123",
    {
      properties: {
        host: "contoso.azurecr.io",
        authentication: { method: "Anonymous", anonymousSettings: {} },
        codeSigningCas: [
          { type: "Secret", secretRef: "my-secret" },
          { type: "ConfigMap", configMapRef: "my-configmap" },
        ],
      },
      extendedLocation: {
        name: "/subscriptions/F8C729F9-DF9C-4743-848F-96EE433D8E53/resourceGroups/rgiotoperations/providers/Microsoft.ExtendedLocation/customLocations/resource-123",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

async function main() {
  await registryEndpointCreateOrUpdateMaximumSet();
}

main().catch(console.error);
