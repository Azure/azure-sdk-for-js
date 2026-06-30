// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a InformaticaServerlessRuntimeResource
 *
 * @summary update a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_Update_MaximumSet_Gen.json
 */
async function serverlessRuntimesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.update(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
    {
      properties: {
        description: "Updated production serverless runtime",
        platform: "AZURE",
        applicationType: "CDI",
        computeUnits: "8",
        executionTimeout: "7200",
        serverlessAccountLocation: "westus",
        serverlessRuntimeDataDisks: [
          {
            type: "NFS",
            serverHostOrIpAddress: "10.0.0.10",
            sourceMount: "/source/data-updated",
            targetMount: "/target/data-updated",
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
              engineVersion: "2.0",
              applicationConfigs: [
                {
                  type: "string",
                  name: "updatedConfig",
                  value: "updatedValue",
                  platform: "AZURE",
                  customized: "true",
                  defaultValue: "default",
                },
              ],
            },
          ],
          cdieConfigProps: [
            {
              engineName: "CDIE Engine",
              engineVersion: "2.0",
              applicationConfigs: [
                {
                  type: "string",
                  name: "updatedConfig",
                  value: "updatedValue",
                  platform: "AZURE",
                  customized: "true",
                  defaultValue: "default",
                },
              ],
            },
          ],
        },
        serverlessRuntimeTags: [{ name: "environment", value: "staging" }],
        serverlessRuntimeUserContextProperties: { userContextToken: "user-ctx-token-updated" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a InformaticaServerlessRuntimeResource
 *
 * @summary update a InformaticaServerlessRuntimeResource
 * x-ms-original-file: 2025-11-27/ServerlessRuntimes_Update_MinimumSet_Gen.json
 */
async function serverlessRuntimesUpdateMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.serverlessRuntimes.update(
    "rg-example",
    "myOrganization",
    "myServerlessRuntime",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await serverlessRuntimesUpdate();
  await serverlessRuntimesUpdateMin();
}

main().catch(console.error);
