// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ExternalAuth resources by HcpOpenShiftCluster
 *
 * @summary list ExternalAuth resources by HcpOpenShiftCluster
 * x-ms-original-file: 2026-06-30-preview/ExternalAuths_ListByParent_MaximumSet_Gen.json
 */
async function externalAuthsListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalAuths.listByParent("rgopenapi", "hcpCluster-name")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await externalAuthsListByParentMaximumSet();
}

main().catch(console.error);
