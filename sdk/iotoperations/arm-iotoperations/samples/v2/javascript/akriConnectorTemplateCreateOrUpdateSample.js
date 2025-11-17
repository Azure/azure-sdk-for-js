// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AkriConnectorTemplateResource
 *
 * @summary create a AkriConnectorTemplateResource
 * x-ms-original-file: 2025-10-01/AkriConnectorTemplate_CreateOrUpdate_MaximumSet_Gen.json
 */
async function akriConnectorTemplateCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.akriConnectorTemplate.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        aioMetadata: { aioMinVersion: "1.2.0", aioMaxVersion: "1.4.0" },
        runtimeConfiguration: {
          runtimeConfigurationType: "ManagedConfiguration",
          managedConfigurationSettings: {
            managedConfigurationType: "ImageConfiguration",
            imageConfigurationSettings: {
              registrySettings: {
                registrySettingsType: "ContainerRegistry",
                containerRegistrySettings: {
                  registry: "akribuilds.azurecr.io",
                },
              },
              imageName: "akri-connectors/rest",
              tagDigestSettings: {
                tagDigestType: "Tag",
                tag: "0.5.0-20250825.4",
              },
            },
          },
        },
        diagnostics: { logs: { level: "info" } },
        deviceInboundEndpointTypes: [{ endpointType: "Microsoft.Rest", version: "0.0.1" }],
        mqttConnectionConfiguration: {
          authentication: {
            method: "ServiceAccountToken",
            serviceAccountTokenSettings: { audience: "MQ-SAT" },
          },
          host: "aio-broker:18883",
          protocol: "Mqtt",
          keepAliveSeconds: 10,
          maxInflightMessages: 10,
          sessionExpirySeconds: 60,
          tls: {
            mode: "Enabled",
            trustedCaCertificateConfigMapRef: "azure-iot-operations-aio-ca-trust-bundle",
          },
        },
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
  await akriConnectorTemplateCreateOrUpdateMaximumSet();
}

main().catch(console.error);
