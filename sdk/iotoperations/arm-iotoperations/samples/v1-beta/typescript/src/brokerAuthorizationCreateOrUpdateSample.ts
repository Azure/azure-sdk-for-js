// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a BrokerAuthorizationResource
 *
 * @summary create a BrokerAuthorizationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthorization_CreateOrUpdate_Complex.json
 */
async function brokerAuthorizationCreateOrUpdateComplex() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerAuthorization.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        authorizationPolicies: {
          cache: "Enabled",
          rules: [
            {
              principals: {
                usernames: ["temperature-sensor", "humidity-sensor"],
                attributes: [{ building: "17", organization: "contoso" }],
              },
              brokerResources: [
                {
                  method: "Connect",
                  clientIds: ["{principal.attributes.building}*"],
                },
                {
                  method: "Publish",
                  topics: [
                    "sensors/{principal.attributes.building}/{principal.clientId}/telemetry/*",
                  ],
                },
                {
                  method: "Subscribe",
                  topics: ["commands/{principal.attributes.organization}"],
                },
              ],
              stateStoreResources: [
                {
                  method: "Read",
                  keyType: "Pattern",
                  keys: [
                    "myreadkey",
                    "myotherkey?",
                    "mynumerickeysuffix[0-9]",
                    "clients:{principal.clientId}:*",
                  ],
                },
                {
                  method: "ReadWrite",
                  keyType: "Binary",
                  keys: ["MTE2IDEwMSAxMTUgMTE2"],
                },
              ],
            },
          ],
        },
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
 * This sample demonstrates how to create a BrokerAuthorizationResource
 *
 * @summary create a BrokerAuthorizationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthorization_CreateOrUpdate_MaximumSet_Gen.json
 */
async function brokerAuthorizationCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerAuthorization.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        authorizationPolicies: {
          cache: "Enabled",
          rules: [
            {
              brokerResources: [
                { method: "Connect", clientIds: ["nlc"], topics: ["wvuca"] },
              ],
              principals: {
                attributes: [{ key5526: "nydhzdhbldygqcn" }],
                clientIds: ["smopeaeddsygz"],
                usernames: ["iozngyqndrteikszkbasinzdjtm"],
              },
              stateStoreResources: [
                {
                  keyType: "Pattern",
                  keys: ["tkounsqtwvzyaklxjqoerpu"],
                  method: "Read",
                },
              ],
            },
          ],
        },
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
 * This sample demonstrates how to create a BrokerAuthorizationResource
 *
 * @summary create a BrokerAuthorizationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthorization_CreateOrUpdate_Simple.json
 */
async function brokerAuthorizationCreateOrUpdateSimple() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerAuthorization.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        authorizationPolicies: {
          cache: "Enabled",
          rules: [
            {
              principals: {
                clientIds: ["my-client-id"],
                attributes: [{ floor: "floor1", site: "site1" }],
              },
              brokerResources: [
                { method: "Connect" },
                {
                  method: "Subscribe",
                  topics: ["topic", "topic/with/wildcard/#"],
                },
              ],
              stateStoreResources: [
                { method: "ReadWrite", keyType: "Pattern", keys: ["*"] },
              ],
            },
          ],
        },
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
  brokerAuthorizationCreateOrUpdateComplex();
  brokerAuthorizationCreateOrUpdate();
  brokerAuthorizationCreateOrUpdateSimple();
}

main().catch(console.error);
