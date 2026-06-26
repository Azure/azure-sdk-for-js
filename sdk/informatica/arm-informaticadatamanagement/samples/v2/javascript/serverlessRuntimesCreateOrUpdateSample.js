// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a InformaticaServerlessRuntimeResource
 *
 * @summary create a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_CreateOrUpdate_MaximumSet_Gen.json
 */
async function serverlessRuntimesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.createOrUpdate(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
    {
      properties: {
        description: "Production serverless runtime",
        platform: "AZURE",
        applicationType: "CDI",
        computeUnits: "4",
        executionTimeout: "3600",
        serverlessAccountLocation: "westus",
        serverlessRuntimeDataDisks: [
          {
            type: "NFS",
            serverHostOrIpAddress: "10.0.0.5",
            sourceMount: "/source/data",
            targetMount: "/target/data",
            mountOptions: "rw,sync",
          },
        ],
        serverlessRuntimeNetworkProfile: {
          networkInterfaceConfiguration: {
            vnetId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-example/providers/Microsoft.Network/virtualNetworks/myVnet",
            subnetId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-example/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/default",
            vnetResourceGuid: "vnet-guid-001",
          },
        },
        advancedCustomProperties: [],
        supplementaryFileLocation: "/files/supplementary",
        serverlessRuntimeConfig: {
          cdiConfigProps: [
            {
              engineName: "CDI Engine",
              engineVersion: "1.0",
              applicationConfigs: [
                {
                  type: "string",
                  name: "configName",
                  value: "configValue",
                  platform: "AZURE",
                  customized: "false",
                  defaultValue: "default",
                },
              ],
            },
          ],
          cdieConfigProps: [
            {
              engineName: "CDIE Engine",
              engineVersion: "1.0",
              applicationConfigs: [
                {
                  type: "string",
                  name: "configName",
                  value: "configValue",
                  platform: "AZURE",
                  customized: "false",
                  defaultValue: "default",
                },
              ],
            },
          ],
        },
        serverlessRuntimeTags: [{ name: "environment", value: "production" }],
        serverlessRuntimeUserContextProperties: { userContextToken: "user-ctx-token-001" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a InformaticaServerlessRuntimeResource
 *
 * @summary create a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_CreateOrUpdate_MinimumSet_Gen.json
 */
async function serverlessRuntimesCreateOrUpdateMin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.createOrUpdate(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
    { properties: { serverlessAccountLocation: "westus" } },
  );
  console.log(result);
}

async function main() {
  await serverlessRuntimesCreateOrUpdate();
  await serverlessRuntimesCreateOrUpdateMin();
}

main().catch(console.error);
