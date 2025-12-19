// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ScriptExecution
 *
 * @summary create a ScriptExecution
 * x-ms-original-file: 2025-09-01/ScriptExecutions_CreateOrUpdate.json
 */
async function scriptExecutionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.scriptExecutions.createOrUpdate("group1", "cloud1", "addSsoServer", {
    properties: {
      scriptCmdletId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group1/providers/Microsoft.AVS/privateClouds/cloud1/scriptPackages/AVS.PowerCommands@1.0.0/scriptCmdlets/New-SsoExternalIdentitySource",
      timeout: "P0Y0M0DT0H60M60S",
      retention: "P0Y0M60DT0H60M60S",
      parameters: [
        { name: "DomainName", type: "Value", value: "placeholderDomain.local" },
        { name: "BaseUserDN", type: "Value", value: "DC=placeholder, DC=placeholder" },
      ],
      hiddenParameters: [
        { name: "Password", type: "SecureValue", secureValue: "PlaceholderPassword" },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await scriptExecutionsCreateOrUpdate();
}

main().catch(console.error);
