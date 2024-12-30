// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a BrokerResource
 *
 * @summary create a BrokerResource
 * x-ms-original-file: 2024-11-01/Broker_CreateOrUpdate_Complex.json
 */
async function brokerCreateOrUpdateComplex() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.broker.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        cardinality: {
          backendChain: { partitions: 2, redundancyFactor: 2, workers: 2 },
          frontend: { replicas: 2, workers: 2 },
        },
        diskBackedMessageBuffer: { maxSize: "50M" },
        generateResourceLimits: { cpu: "Enabled" },
        memoryProfile: "Medium",
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a BrokerResource
 *
 * @summary create a BrokerResource
 * x-ms-original-file: 2024-11-01/Broker_CreateOrUpdate_MaximumSet_Gen.json
 */
async function brokerCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.broker.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        advanced: {
          clients: {
            maxSessionExpirySeconds: 3859,
            maxMessageExpirySeconds: 3263,
            maxPacketSizeBytes: 3029,
            subscriberQueueLimit: { length: 6, strategy: "None" },
            maxReceiveMaximum: 2365,
            maxKeepAliveSeconds: 3744,
          },
          encryptInternalTraffic: "Enabled",
          internalCerts: {
            duration: "bchrc",
            renewBefore: "xkafmpgjfifkwwrhkswtopdnne",
            privateKey: { algorithm: "Ec256", rotationPolicy: "Always" },
          },
        },
        cardinality: {
          backendChain: { partitions: 11, redundancyFactor: 5, workers: 15 },
          frontend: { replicas: 2, workers: 6 },
        },
        diagnostics: {
          logs: { level: "rnmwokumdmebpmfxxxzvvjfdywotav" },
          metrics: { prometheusPort: 7581 },
          selfCheck: {
            mode: "Enabled",
            intervalSeconds: 158,
            timeoutSeconds: 14,
          },
          traces: {
            mode: "Enabled",
            cacheSizeMegabytes: 28,
            selfTracing: { mode: "Enabled", intervalSeconds: 22 },
            spanChannelCapacity: 1000,
          },
        },
        diskBackedMessageBuffer: {
          maxSize: "500M",
          ephemeralVolumeClaimSpec: {
            volumeName: "c",
            volumeMode: "rxvpksjuuugqnqzeiprocknbn",
            storageClassName: "sseyhrjptkhrqvpdpjmornkqvon",
            accessModes: ["nuluhigrbb"],
            dataSource: {
              apiGroup: "npqapyksvvpkohujx",
              kind: "wazgyb",
              name: "cwhsgxxcxsyppoefm",
            },
            dataSourceRef: {
              apiGroup: "mnfnykznjjsoqpfsgdqioupt",
              kind: "odynqzekfzsnawrctaxg",
              name: "envszivbbmixbyddzg",
              namespace: "etcfzvxqd",
            },
            resources: {
              limits: { key2719: "hmphcrgctu" },
              requests: { key2909: "txocprnyrsgvhfrg" },
            },
            selector: {
              matchExpressions: [
                {
                  key: "e",
                  operator: "In",
                  values: ["slmpajlywqvuyknipgztsonqyybt"],
                },
              ],
              matchLabels: { key6673: "wlngfalznwxnurzpgxomcxhbqefpr" },
            },
          },
          persistentVolumeClaimSpec: {
            volumeName: "c",
            volumeMode: "rxvpksjuuugqnqzeiprocknbn",
            storageClassName: "sseyhrjptkhrqvpdpjmornkqvon",
            accessModes: ["nuluhigrbb"],
            dataSource: {
              apiGroup: "npqapyksvvpkohujx",
              kind: "wazgyb",
              name: "cwhsgxxcxsyppoefm",
            },
            dataSourceRef: {
              apiGroup: "mnfnykznjjsoqpfsgdqioupt",
              kind: "odynqzekfzsnawrctaxg",
              name: "envszivbbmixbyddzg",
              namespace: "etcfzvxqd",
            },
            resources: {
              limits: { key2719: "hmphcrgctu" },
              requests: { key2909: "txocprnyrsgvhfrg" },
            },
            selector: {
              matchExpressions: [
                {
                  key: "e",
                  operator: "In",
                  values: ["slmpajlywqvuyknipgztsonqyybt"],
                },
              ],
              matchLabels: { key6673: "wlngfalznwxnurzpgxomcxhbqefpr" },
            },
          },
        },
        generateResourceLimits: { cpu: "Enabled" },
        memoryProfile: "Tiny",
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a BrokerResource
 *
 * @summary create a BrokerResource
 * x-ms-original-file: 2024-11-01/Broker_CreateOrUpdate_Minimal.json
 */
async function brokerCreateOrUpdateMinimal() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.broker.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: { memoryProfile: "Tiny" },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a BrokerResource
 *
 * @summary create a BrokerResource
 * x-ms-original-file: 2024-11-01/Broker_CreateOrUpdate_Simple.json
 */
async function brokerCreateOrUpdateSimple() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.broker.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        cardinality: {
          backendChain: { partitions: 2, redundancyFactor: 2, workers: 2 },
          frontend: { replicas: 2, workers: 2 },
        },
        generateResourceLimits: { cpu: "Enabled" },
        memoryProfile: "Low",
      },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

async function main() {
  brokerCreateOrUpdateComplex();
  brokerCreateOrUpdate();
  brokerCreateOrUpdateMinimal();
  brokerCreateOrUpdateSimple();
}

main().catch(console.error);
