// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new delivery rule within the specified rule set.
 *
 * @summary creates a new delivery rule within the specified rule set.
 * x-ms-original-file: 2026-10-01/Rules_Create.json
 */
async function rulesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.rules.create("RG", "profile1", "ruleSet1", "rule1", {
    actions: [
      {
        name: "ModifyResponseHeader",
        parameters: {
          headerAction: "Overwrite",
          headerName: "X-CDN",
          typeName: "DeliveryRuleHeaderActionParameters",
          value: "MSFT",
        },
      },
    ],
    conditions: [
      {
        name: "RequestMethod",
        parameters: {
          matchValues: ["GET"],
          negateCondition: false,
          operator: "Equal",
          typeName: "DeliveryRuleRequestMethodConditionParameters",
        },
      },
    ],
    order: 1,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new delivery rule within the specified rule set.
 *
 * @summary creates a new delivery rule within the specified rule set.
 * x-ms-original-file: 2026-10-01/Rules_Create_EdgeAction.json
 */
async function rulesCreateEdgeAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.rules.create("RG", "profile1", "ruleSet1", "rule1", {
    actions: [
      {
        name: "EdgeAction",
        parameters: {
          edgeActionReference: {
            id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Cdn/edgeActions/edgeAction1",
          },
          invocationPoint: "ClientResponse",
          typeName: "DeliveryRuleEdgeActionParameters",
        },
      },
    ],
    conditions: [
      {
        name: "RequestMethod",
        parameters: {
          matchValues: ["GET"],
          negateCondition: false,
          operator: "Equal",
          typeName: "DeliveryRuleRequestMethodConditionParameters",
        },
      },
    ],
    order: 1,
  });
  console.log(result);
}

async function main() {
  await rulesCreate();
  await rulesCreateEdgeAction();
}

main().catch(console.error);
