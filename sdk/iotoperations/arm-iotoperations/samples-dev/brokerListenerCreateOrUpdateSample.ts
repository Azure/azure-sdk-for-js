// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a BrokerListenerResource
 *
 * @summary create a BrokerListenerResource
 * x-ms-original-file: 2024-11-01/BrokerListener_CreateOrUpdate_Complex.json
 */
async function brokerListenerCreateOrUpdateComplex() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerListener.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        serviceType: "LoadBalancer",
        ports: [
          {
            port: 8080,
            authenticationRef: "example-authentication",
            protocol: "WebSockets",
          },
          {
            port: 8443,
            authenticationRef: "example-authentication",
            protocol: "WebSockets",
            tls: {
              mode: "Automatic",
              certManagerCertificateSpec: {
                issuerRef: {
                  group: "jtmuladdkpasfpoyvewekmiy",
                  name: "example-issuer",
                  kind: "Issuer",
                },
              },
            },
          },
          { port: 1883, authenticationRef: "example-authentication" },
          {
            port: 8883,
            authenticationRef: "example-authentication",
            tls: { mode: "Manual", manual: { secretRef: "example-secret" } },
          },
        ],
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
 * This sample demonstrates how to create a BrokerListenerResource
 *
 * @summary create a BrokerListenerResource
 * x-ms-original-file: 2024-11-01/BrokerListener_CreateOrUpdate_MaximumSet_Gen.json
 */
async function brokerListenerCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerListener.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        serviceName: "tpfiszlapdpxktx",
        ports: [
          {
            authenticationRef: "tjvdroaqqy",
            authorizationRef: "inxhvxnwswyrvt",
            nodePort: 7281,
            port: 1268,
            protocol: "Mqtt",
            tls: {
              mode: "Automatic",
              certManagerCertificateSpec: {
                duration: "qmpeffoksron",
                secretName: "oagi",
                renewBefore: "hutno",
                issuerRef: {
                  group: "jtmuladdkpasfpoyvewekmiy",
                  kind: "Issuer",
                  name: "ocwoqpgucvjrsuudtjhb",
                },
                privateKey: { algorithm: "Ec256", rotationPolicy: "Always" },
                san: {
                  dns: ["xhvmhrrhgfsapocjeebqtnzarlj"],
                  ip: ["zbgugfzcgsmegevzktsnibyuyp"],
                },
              },
              manual: { secretRef: "secret-name" },
            },
          },
        ],
        serviceType: "ClusterIp",
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
 * This sample demonstrates how to create a BrokerListenerResource
 *
 * @summary create a BrokerListenerResource
 * x-ms-original-file: 2024-11-01/BrokerListener_CreateOrUpdate_Simple.json
 */
async function brokerListenerCreateOrUpdateSimple() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerListener.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: { ports: [{ port: 1883 }] },
      extendedLocation: {
        name: "qmbrfwcpwwhggszhrdjv",
        type: "CustomLocation",
      },
    },
  );
  console.log(result);
}

async function main() {
  brokerListenerCreateOrUpdateComplex();
  brokerListenerCreateOrUpdate();
  brokerListenerCreateOrUpdateSimple();
}

main().catch(console.error);
