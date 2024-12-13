// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a BrokerAuthenticationResource
 *
 * @summary create a BrokerAuthenticationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthentication_CreateOrUpdate_Complex.json
 */
async function brokerAuthenticationCreateOrUpdateComplex() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerAuthentication.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        authenticationMethods: [
          {
            method: "ServiceAccountToken",
            serviceAccountTokenSettings: { audiences: ["aio-internal"] },
          },
          {
            method: "X509",
            x509Settings: {
              trustedClientCaCert: "my-ca",
              authorizationAttributes: {
                root: {
                  subject:
                    "CN = Contoso Root CA Cert, OU = Engineering, C = US",
                  attributes: { organization: "contoso" },
                },
                intermediate: {
                  subject: "CN = Contoso Intermediate CA",
                  attributes: { city: "seattle", foo: "bar" },
                },
                "smart-fan": {
                  subject: "CN = smart-fan",
                  attributes: { building: "17" },
                },
              },
            },
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
 * This sample demonstrates how to create a BrokerAuthenticationResource
 *
 * @summary create a BrokerAuthenticationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthentication_CreateOrUpdate_MaximumSet_Gen.json
 */
async function brokerAuthenticationCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerAuthentication.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
    {
      properties: {
        authenticationMethods: [
          {
            method: "Custom",
            customSettings: {
              auth: { x509: { secretRef: "secret-name" } },
              caCertConfigMap: "pdecudefqyolvncbus",
              endpoint: "https://www.example.com",
              headers: { key8518: "bwityjy" },
            },
            serviceAccountTokenSettings: { audiences: ["jqyhyqatuydg"] },
            x509Settings: {
              authorizationAttributes: {
                key3384: {
                  attributes: { key186: "ucpajramsz" },
                  subject: "jpgwctfeixitptfgfnqhua",
                },
              },
              trustedClientCaCert: "vlctsqddl",
            },
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

async function main() {
  brokerAuthenticationCreateOrUpdateComplex();
  brokerAuthenticationCreateOrUpdate();
}

main().catch(console.error);
