// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDevice.json
 */
async function createOrReplaceNamespaceDevices(): Promise<void> {
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
              eventGridEndpoint: {
                endpointType: "Microsoft.Devices/IoTHubs",
                address: "https://myeventgridtopic.westeurope-1.eventgrid.azure.net/api/events",
              },
            },
          },
        },
        externalDeviceId: "adr-smart-device3-7a848b15-af47-40a7-8c06-a3f43314d44f",
        enabled: true,
        attributes: {
          deviceType: "sensor",
          deviceOwner: "IT",
          deviceCategory: 16,
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDevice_Edge_Anonymous.json
 */
async function createEdgeEnabledDeviceWithAnonymousHostAuthentication(): Promise<void> {
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
              endpointType: "microsoft.opcua",
              version: "2",
              authentication: { method: "Anonymous" },
            },
          },
        },
        externalDeviceId: "unique-edge-device-identifier",
        enabled: true,
        attributes: {
          deviceType: "dough-maker",
          deviceOwner: "OT",
          deviceCategory: 16,
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDevice_Edge_UsernamePass.json
 */
async function createEdgeEnabledDeviceWithUsernamesPasswordInboundAuthentication(): Promise<void> {
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
              endpointType: "microsoft.opcua",
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
        attributes: {
          deviceType: "sensor",
          deviceOwner: "IT",
          deviceCategory: 16,
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a NamespaceDevice
 *
 * @summary create a NamespaceDevice
 * x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDevice_Edge_x509.json
 */
async function createEdgeEnabledDeviceWithX509InboundAuthentication(): Promise<void> {
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
                x509Credentials: {
                  certificateSecretName: "cert-secret",
                  keySecretName: "key-secret",
                  intermediateCertificatesSecretName: "intermediate-certs-secret",
                },
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
        attributes: {
          deviceType: "OPCUAServers",
          deviceOwner: "OT",
          deviceCategory: 16,
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceNamespaceDevices();
  await createEdgeEnabledDeviceWithAnonymousHostAuthentication();
  await createEdgeEnabledDeviceWithUsernamesPasswordInboundAuthentication();
  await createEdgeEnabledDeviceWithX509InboundAuthentication();
}

main().catch(console.error);
