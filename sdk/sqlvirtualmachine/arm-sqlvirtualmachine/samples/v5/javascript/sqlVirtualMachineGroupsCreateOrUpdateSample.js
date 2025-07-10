// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a SQL virtual machine group.
 *
 * @summary creates or updates a SQL virtual machine group.
 * x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineGroup.json
 */
async function createsOrUpdatesASQLVirtualMachineGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachineGroups.createOrUpdate("testrg", "testvmgroup", {
    location: "northeurope",
    properties: {
      sqlImageOffer: "SQL2016-WS2016",
      sqlImageSku: "Enterprise",
      wsfcDomainProfile: {
        clusterBootstrapAccount: "testrpadmin",
        clusterOperatorAccount: "testrp@testdomain.com",
        clusterSubnetType: "MultiSubnet",
        domainFqdn: "testdomain.com",
        isSqlServiceAccountGmsa: false,
        ouPath: "OU=WSCluster,DC=testdomain,DC=com",
        sqlServiceAccount: "sqlservice@testdomain.com",
        storageAccountPrimaryKey: "<primary storage access key>",
        storageAccountUrl: "https://storgact.blob.core.windows.net/",
      },
    },
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await createsOrUpdatesASQLVirtualMachineGroup();
}

main().catch(console.error);
