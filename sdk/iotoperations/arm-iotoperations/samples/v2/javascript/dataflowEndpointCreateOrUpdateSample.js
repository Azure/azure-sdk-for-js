// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_ADLSv2.json
 */
async function dataflowEndpointCreateOrUpdateADLSv2() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "adlsv2-endpoint",
    {
      properties: {
        endpointType: "DataLakeStorage",
        dataLakeStorageSettings: {
          host: "example.blob.core.windows.net",
          authentication: {
            method: "AccessToken",
            accessTokenSettings: { secretRef: "my-secret" },
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_ADX.json
 */
async function dataflowEndpointCreateOrUpdateADX() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "adx-endpoint",
    {
      properties: {
        endpointType: "DataExplorer",
        dataExplorerSettings: {
          host: "example.westeurope.kusto.windows.net",
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {},
          },
          database: "example-database",
          batching: { latencySeconds: 9312, maxMessages: 9028 },
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_AIO.json
 */
async function dataflowEndpointCreateOrUpdateAIO() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "aio-builtin-broker-endpoint",
    {
      properties: {
        endpointType: "Mqtt",
        mqttSettings: {
          host: "aio-broker:18883",
          authentication: {
            method: "Kubernetes",
            serviceAccountTokenSettings: { audience: "aio-internal" },
          },
          tls: {
            mode: "Enabled",
            trustedCaCertificateConfigMapRef: "aio-ca-trust-bundle-test-only",
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_EventGrid.json
 */
async function dataflowEndpointCreateOrUpdateEventGrid() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "event-grid-endpoint",
    {
      properties: {
        endpointType: "Mqtt",
        mqttSettings: {
          host: "example.westeurope-1.ts.eventgrid.azure.net:8883",
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {},
          },
          tls: { mode: "Enabled" },
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_EventHub.json
 */
async function dataflowEndpointCreateOrUpdateEventHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "event-hub-endpoint",
    {
      properties: {
        endpointType: "Kafka",
        kafkaSettings: {
          host: "example.servicebus.windows.net:9093",
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {},
          },
          tls: { mode: "Enabled" },
          consumerGroupId: "aiodataflows",
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_Fabric.json
 */
async function dataflowEndpointCreateOrUpdateFabric() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "fabric-endpoint",
    {
      properties: {
        endpointType: "FabricOneLake",
        fabricOneLakeSettings: {
          host: "onelake.dfs.fabric.microsoft.com",
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {},
          },
          names: {
            workspaceName: "example-workspace",
            lakehouseName: "example-lakehouse",
          },
          oneLakePathType: "Tables",
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_Kafka.json
 */
async function dataflowEndpointCreateOrUpdateKafka() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "generic-kafka-endpoint",
    {
      properties: {
        endpointType: "Kafka",
        kafkaSettings: {
          host: "example.kafka.local:9093",
          authentication: {
            method: "Sasl",
            saslSettings: { saslType: "Plain", secretRef: "my-secret" },
          },
          tls: {
            mode: "Enabled",
            trustedCaCertificateConfigMapRef: "ca-certificates",
          },
          consumerGroupId: "dataflows",
          compression: "Gzip",
          batching: {
            mode: "Enabled",
            latencyMs: 5,
            maxBytes: 1000000,
            maxMessages: 100000,
          },
          partitionStrategy: "Default",
          kafkaAcks: "All",
          copyMqttProperties: "Enabled",
          cloudEventAttributes: "Propagate",
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_LocalStorage.json
 */
async function dataflowEndpointCreateOrUpdateLocalStorage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "local-storage-endpoint",
    {
      properties: {
        endpointType: "LocalStorage",
        localStorageSettings: { persistentVolumeClaimRef: "example-pvc" },
      },
      extendedLocation: {
        name: "/subscriptions/F8C729F9-DF9C-4743-848F-96EE433D8E53/resourceGroups/rgiotoperations/providers/Microsoft.ExtendedLocation/customLocations/resource-123",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_MQTT.json
 */
async function dataflowEndpointCreateOrUpdateMqtt() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "generic-mqtt-broker-endpoint",
    {
      properties: {
        endpointType: "Mqtt",
        mqttSettings: {
          host: "example.broker.local:1883",
          authentication: {
            method: "X509Certificate",
            x509CertificateSettings: { secretRef: "example-secret" },
          },
          tls: { mode: "Disabled" },
          clientIdPrefix: "factory-gateway",
          retain: "Keep",
          sessionExpirySeconds: 3600,
          qos: 1,
          protocol: "WebSockets",
          maxInflightMessages: 100,
          keepAliveSeconds: 60,
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

/**
 * This sample demonstrates how to create a DataflowEndpointResource
 *
 * @summary create a DataflowEndpointResource
 * x-ms-original-file: 2025-10-01/DataflowEndpoint_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dataflowEndpointCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.dataflowEndpoint.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        endpointType: "DataExplorer",
        dataExplorerSettings: {
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {
              audience: "psxomrfbhoflycm",
            },
            userAssignedManagedIdentitySettings: {
              clientId: "fb90f267-8872-431a-a76a-a1cec5d3c4d2",
              scope: "zop",
              tenantId: "ed060aa2-71ff-4d3f-99c4-a9138356fdec",
            },
          },
          database: "yqcdpjsifm",
          host: "<cluster>.<region>.kusto.windows.net",
          batching: { latencySeconds: 9312, maxMessages: 9028 },
        },
        dataLakeStorageSettings: {
          authentication: {
            method: "SystemAssignedManagedIdentity",
            accessTokenSettings: { secretRef: "sevriyphcvnlrnfudqzejecwa" },
            systemAssignedManagedIdentitySettings: {
              audience: "psxomrfbhoflycm",
            },
            userAssignedManagedIdentitySettings: {
              clientId: "fb90f267-8872-431a-a76a-a1cec5d3c4d2",
              scope: "zop",
              tenantId: "ed060aa2-71ff-4d3f-99c4-a9138356fdec",
            },
          },
          host: "<account>.blob.core.windows.net",
          batching: { latencySeconds: 9312, maxMessages: 9028 },
        },
        fabricOneLakeSettings: {
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {
              audience: "psxomrfbhoflycm",
            },
            userAssignedManagedIdentitySettings: {
              clientId: "fb90f267-8872-431a-a76a-a1cec5d3c4d2",
              scope: "zop",
              tenantId: "ed060aa2-71ff-4d3f-99c4-a9138356fdec",
            },
          },
          names: { lakehouseName: "wpeathi", workspaceName: "nwgmitkbljztgms" },
          oneLakePathType: "Files",
          host: "https://<host>.fabric.microsoft.com",
          batching: { latencySeconds: 9312, maxMessages: 9028 },
        },
        kafkaSettings: {
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {
              audience: "psxomrfbhoflycm",
            },
            userAssignedManagedIdentitySettings: {
              clientId: "fb90f267-8872-431a-a76a-a1cec5d3c4d2",
              scope: "zop",
              tenantId: "ed060aa2-71ff-4d3f-99c4-a9138356fdec",
            },
            saslSettings: {
              saslType: "Plain",
              secretRef: "visyxoztqnylvbyokhtmpdkwes",
            },
            x509CertificateSettings: { secretRef: "afwizrystfslkfqd" },
          },
          consumerGroupId: "ukkzcjiyenhxokat",
          host: "pwcqfiqclcgneolpewnyavoulbip",
          batching: {
            mode: "Enabled",
            latencyMs: 3679,
            maxBytes: 8887,
            maxMessages: 2174,
          },
          copyMqttProperties: "Enabled",
          compression: "None",
          kafkaAcks: "Zero",
          partitionStrategy: "Default",
          tls: {
            mode: "Enabled",
            trustedCaCertificateConfigMapRef: "tectjjvukvelsreihwadh",
          },
          cloudEventAttributes: "PassThrough",
        },
        localStorageSettings: { persistentVolumeClaimRef: "jjwqwvd" },
        mqttSettings: {
          authentication: {
            method: "SystemAssignedManagedIdentity",
            systemAssignedManagedIdentitySettings: {
              audience: "psxomrfbhoflycm",
            },
            userAssignedManagedIdentitySettings: {
              clientId: "fb90f267-8872-431a-a76a-a1cec5d3c4d2",
              scope: "zop",
              tenantId: "ed060aa2-71ff-4d3f-99c4-a9138356fdec",
            },
            serviceAccountTokenSettings: { audience: "ejbklrbxgjaqleoycgpje" },
            x509CertificateSettings: { secretRef: "afwizrystfslkfqd" },
          },
          clientIdPrefix: "kkljsdxdirfhwxtkavldekeqhv",
          host: "nyhnxqnbspstctl",
          protocol: "Mqtt",
          keepAliveSeconds: 0,
          retain: "Keep",
          maxInflightMessages: 0,
          qos: 1,
          sessionExpirySeconds: 0,
          tls: {
            mode: "Enabled",
            trustedCaCertificateConfigMapRef: "tectjjvukvelsreihwadh",
          },
          cloudEventAttributes: "PassThrough",
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
  await dataflowEndpointCreateOrUpdateADLSv2();
  await dataflowEndpointCreateOrUpdateADX();
  await dataflowEndpointCreateOrUpdateAIO();
  await dataflowEndpointCreateOrUpdateEventGrid();
  await dataflowEndpointCreateOrUpdateEventHub();
  await dataflowEndpointCreateOrUpdateFabric();
  await dataflowEndpointCreateOrUpdateKafka();
  await dataflowEndpointCreateOrUpdateLocalStorage();
  await dataflowEndpointCreateOrUpdateMqtt();
  await dataflowEndpointCreateOrUpdate();
}

main().catch(console.error);
