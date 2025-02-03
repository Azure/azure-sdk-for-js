// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureTerraformClient } = require("@azure/arm-terraform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to exports the Terraform configuration of the specified resource(s).
 *
 * @summary exports the Terraform configuration of the specified resource(s).
 * x-ms-original-file: 2023-07-01-preview/ExportTerraform.json
 */
async function exportTerraform() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureTerraformClient(credential, subscriptionId);
  const result = await client.terraform.exportTerraform({
    type: "ExportResourceGroup",
    resourceGroupName: "rg1",
  });
  console.log(result);
}

async function main() {
  exportTerraform();
}

main().catch(console.error);
