// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an project policy.
 *
 * @summary creates or updates an project policy.
 * x-ms-original-file: 2026-01-01-preview/ProjectPolicies_Put.json
 */
async function projectPoliciesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58ffff1";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectPolicies.createOrUpdate("rg1", "Contoso", "DevOnlyResources", {
    properties: {
      resourcePolicies: [
        {
          resources:
            "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff1/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso/attachednetworks/network-westus3",
        },
        { resourceType: "Images", action: "Deny" },
        { resourceType: "Skus", action: "Allow" },
      ],
      scopes: [
        "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff1/resourceGroups/rg1/providers/Microsoft.DevCenter/projects/DevProject",
      ],
      configurationPolicies: {
        azureAiServicesFeatureStatus: {
          statusModifiable: "Modifiable",
          defaultStatus: "AutoDeploy",
        },
        devBoxScheduleDeleteFeatureStatus: {
          statusModifiable: "NotModifiable",
          valuesModifiable: "Modifiable",
          defaultStatus: "Enabled",
          defaultValues: [
            { name: "inactiveThreshold", value: "P30D" },
            { name: "gracePeriod", value: "P3D" },
            { name: "cancelOnConnectEnableStatus", value: "false" },
          ],
        },
        devBoxLimitsFeatureStatus: {
          statusModifiable: "Modifiable",
          valuesModifiable: "Modifiable",
          defaultStatus: "Enabled",
          defaultValues: [{ name: "maxDevBoxesPerUser", value: "10" }],
        },
        displayNameFeatureStatus: { statusModifiable: "NotModifiable", defaultStatus: "Disabled" },
        devBoxTunnelFeatureStatus: { statusModifiable: "Modifiable", defaultStatus: "Disabled" },
        projectCatalogFeatureStatus: {
          valuesModifiable: "Modifiable",
          defaultValues: [
            { name: "environmentDefinitionCatalogItemSync", value: "Enabled" },
            { name: "imageDefinitionCatalogItemSync", value: "Enabled" },
          ],
        },
        serverlessGpuSessionsFeatureStatus: {
          statusModifiable: "Modifiable",
          valuesModifiable: "NotModifiable",
          defaultStatus: "AutoDeploy",
          defaultValues: [{ name: "maxConcurrentSessionsPerProject", value: "3" }],
        },
        userCustomizationsFeatureStatus: {
          statusModifiable: "Modifiable",
          defaultStatus: "Enabled",
        },
        workspaceStorageFeatureStatus: {
          statusModifiable: "NotModifiable",
          defaultStatus: "AutoDeploy",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await projectPoliciesCreateOrUpdate();
}

main().catch(console.error);
