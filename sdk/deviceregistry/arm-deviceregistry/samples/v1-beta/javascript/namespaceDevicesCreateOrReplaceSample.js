// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_NamespaceDevice.json
 */
async function createOrReplaceNamespaceDevices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDevices.createOrReplace(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    "dev-namespace-gbk0925-n01",
    {
      location: "West Europe",
      properties: {
        endpoints: {
          outbound: {
            assigned: {
              iothubEndpoint: {
                endpointType: "Microsoft.Devices/IotHubs",
                address: "https://iothub-for-dps.azure-devices.net",
              },
            },
          },
        },
        enabled: true,
        attributes: { deviceType: "sensor", deviceOwner: "IT", deviceCategory: 16 },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_NamespaceDevice_Edge_Anonymous.json
 */
async function createEdgeEnabledDeviceWithAnonymousHostAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDevices.createOrReplace(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    "namespace-device-on-edge",
    {
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      location: "West Europe",
      properties: {
        endpoints: {
          inbound: {
            theOnlyOPCUABroker: {
              address: "opc.tcp://192.168.86.23:51211/UA/SampleServer",
              endpointType: "microsoft.opcua:v1",
              version: "2",
              authentication: { method: "Anonymous" },
            },
          },
        },
        externalDeviceId: "unique-edge-device-identifier",
        enabled: true,
        attributes: { deviceType: "dough-maker", deviceOwner: "OT", deviceCategory: 16 },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_NamespaceDevice_Edge_UsernamePass.json
 */
async function createEdgeEnabledDeviceWithUsernamesPasswordInboundAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDevices.createOrReplace(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    "namespace-device-on-edge",
    {
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      location: "West Europe",
      properties: {
        endpoints: {
          inbound: {
            theOnlyOPCUABroker: {
              address: "opc.tcp://192.168.86.23:51211/UA/SampleServer",
              endpointType: "microsoft.opcua:v1",
              version: "2",
              authentication: {
                method: "UsernamePassword",
                usernamePasswordCredentials: {
                  usernameSecretName: "user-ref",
                  passwordSecretName: "pwd-ref",
                },
              },
            },
          },
        },
        externalDeviceId: "unique-edge-device-identifier",
        enabled: true,
        attributes: { deviceType: "sensor", deviceOwner: "IT", deviceCategory: 16 },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_NamespaceDevice_Edge_x509.json
 */
async function createEdgeEnabledDeviceWithX509InboundAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDevices.createOrReplace(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    "namespace-device-on-edge",
    {
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      location: "West Europe",
      properties: {
        endpoints: {
          inbound: {
            theV1OPCUAEndpoint: {
              address: "opc.tcp://192.168.86.23:51211/UA/SampleServer",
              endpointType: "microsoft.opcua",
              version: "2",
              authentication: {
                method: "Certificate",
                x509Credentials: { certificateSecretName: "cert-secret" },
              },
            },
            theV2OPCUAEndpoint: {
              address: "opc.tcp://192.168.86.23:51211/UA/SampleServer",
              endpointType: "microsoft.opcua",
              version: "2",
              authentication: {
                method: "Certificate",
                x509Credentials: { certificateSecretName: "cert-secret" },
              },
              trustSettings: { trustList: "trust-secret-reference" },
            },
          },
        },
        externalDeviceId: "unique-edge-device-identifier",
        enabled: true,
        attributes: { deviceType: "OPCUAServers", deviceOwner: "OT", deviceCategory: 16 },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceNamespaceDevices();
  await createEdgeEnabledDeviceWithAnonymousHostAuthentication();
  await createEdgeEnabledDeviceWithUsernamesPasswordInboundAuthentication();
  await createEdgeEnabledDeviceWithX509InboundAuthentication();
}

main().catch(console.error);
