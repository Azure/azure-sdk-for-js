// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated.
 *
 * @summary creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated.
 * x-ms-original-file: 2023-12-01-preview/Automations/PutAutomationAllAssessments_example.json
 */
async function createOrUpdateASecurityAutomationForAllAssessmentsIncludingAllSeverities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.automations.createOrUpdate(
    "exampleResourceGroup",
    "exampleAutomation",
    {
      etag: "etag value (must be supplied for update)",
      location: "Central US",
      description:
        "An example of a security automation that triggers one LogicApp resource (myTest1) on any security assessment",
      actions: [
        {
          actionType: "LogicApp",
          logicAppResourceId:
            "/subscriptions/e54a4a18-5b94-4f90-9471-bd3decad8a2e/resourceGroups/sample/providers/Microsoft.Logic/workflows/MyTest1",
          uri: "https://exampleTriggerUri1.com",
        },
      ],
      isEnabled: true,
      scopes: [
        {
          description:
            "A description that helps to identify this scope - for example: security assessments that relate to the resource group myResourceGroup within the subscription a5caac9c-5c04-49af-b3d0-e204f40345d5",
          scopePath:
            "/subscriptions/a5caac9c-5c04-49af-b3d0-e204f40345d5/resourceGroups/myResourceGroup",
        },
      ],
      sources: [{ eventSource: "Assessments" }],
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated.
 *
 * @summary creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated.
 * x-ms-original-file: 2023-12-01-preview/Automations/PutAutomationHighSeverityAssessments_example.json
 */
async function createOrUpdateASecurityAutomationForAllHighSeverityAssessments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.automations.createOrUpdate(
    "exampleResourceGroup",
    "exampleAutomation",
    {
      etag: "etag value (must be supplied for update)",
      location: "Central US",
      description:
        "An example of a security automation that triggers one LogicApp resource (myTest1) on any high severity security assessment",
      actions: [
        {
          actionType: "LogicApp",
          logicAppResourceId:
            "/subscriptions/e54a4a18-5b94-4f90-9471-bd3decad8a2e/resourceGroups/sample/providers/Microsoft.Logic/workflows/MyTest1",
          uri: "https://exampleTriggerUri1.com",
        },
      ],
      isEnabled: true,
      scopes: [
        {
          description:
            "A description that helps to identify this scope - for example: security assessments that relate to the resource group myResourceGroup within the subscription a5caac9c-5c04-49af-b3d0-e204f40345d5",
          scopePath:
            "/subscriptions/a5caac9c-5c04-49af-b3d0-e204f40345d5/resourceGroups/myResourceGroup",
        },
      ],
      sources: [
        {
          eventSource: "Assessments",
          ruleSets: [
            {
              rules: [
                {
                  expectedValue: "High",
                  operator: "Equals",
                  propertyJPath: "properties.metadata.severity",
                  propertyType: "String",
                },
              ],
            },
          ],
        },
      ],
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated.
 *
 * @summary creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated.
 * x-ms-original-file: 2023-12-01-preview/Automations/PutDisableAutomation_example.json
 */
async function disableOrEnableASecurityAutomation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.automations.createOrUpdate(
    "exampleResourceGroup",
    "exampleAutomation",
    {
      etag: "etag value (must be supplied for update)",
      location: "Central US",
      description:
        "An example of a security automation that triggers one LogicApp resource (myTest1) on any security assessment of type customAssessment",
      actions: [
        {
          actionType: "LogicApp",
          logicAppResourceId:
            "/subscriptions/e54a4a18-5b94-4f90-9471-bd3decad8a2e/resourceGroups/sample/providers/Microsoft.Logic/workflows/MyTest1",
          uri: "https://exampleTriggerUri1.com",
        },
      ],
      isEnabled: false,
      scopes: [
        {
          description:
            "A description that helps to identify this scope - for example: security assessments that relate to the resource group myResourceGroup within the subscription a5caac9c-5c04-49af-b3d0-e204f40345d5",
          scopePath:
            "/subscriptions/a5caac9c-5c04-49af-b3d0-e204f40345d5/resourceGroups/myResourceGroup",
        },
      ],
      sources: [
        {
          eventSource: "Assessments",
          ruleSets: [
            {
              rules: [
                {
                  expectedValue: "customAssessment",
                  operator: "Equals",
                  propertyJPath: "$.Entity.AssessmentType",
                  propertyType: "String",
                },
              ],
            },
          ],
        },
      ],
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateASecurityAutomationForAllAssessmentsIncludingAllSeverities();
  await createOrUpdateASecurityAutomationForAllHighSeverityAssessments();
  await disableOrEnableASecurityAutomation();
}

main().catch(console.error);
