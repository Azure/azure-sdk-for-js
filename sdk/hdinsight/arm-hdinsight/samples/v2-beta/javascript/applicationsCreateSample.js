// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates applications for the HDInsight cluster.
 *
 * @summary creates applications for the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/CreateApplication.json
 */
async function createApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.applications.create("rg1", "cluster1", "hue", {
    properties: {
      applicationType: "CustomApplication",
      computeProfile: {
        roles: [
          {
            name: "edgenode",
            hardwareProfile: { vmSize: "Standard_D12_v2" },
            targetInstanceCount: 1,
          },
        ],
      },
      errors: [],
      httpsEndpoints: [
        { accessModes: ["WebPage"], destinationPort: 20000, subDomainSuffix: "dss" },
      ],
      installScriptActions: [
        {
          name: "app-install-app1",
          parameters: "-version latest -port 20000",
          roles: ["edgenode"],
          uri: "https://.../install.sh",
        },
      ],
      uninstallScriptActions: [],
    },
  });
  console.log(result);
}

async function main() {
  await createApplication();
}

main().catch(console.error);
