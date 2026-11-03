// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new delivery rule within the specified rule set.
 *
 * @summary creates a new delivery rule within the specified rule set.
 * x-ms-original-file: 2026-09-01-preview/Rules_Create.json
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
 * x-ms-original-file: 2026-09-01-preview/Rules_Create_AfdUrlSigningAction.json
 */
async function rulesCreateAfdUrlSigningAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.rules.create("RG", "profile1", "ruleSet1", "rule1", {
    actions: [
      {
        name: "AfdUrlSigning",
        parameters: {
          algorithm: "SHA256",
          keyGroupReference: {
            id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Cdn/profiles/profile1/keygroups/kg1",
          },
          parameterNameOverride: [
            { paramIndicator: "Expires", paramName: "Expiration-Date" },
            { paramIndicator: "Signature", paramName: "Sig-Hash" },
          ],
          typeName: "DeliveryRuleAfdUrlSigningActionParameters",
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
 * x-ms-original-file: 2026-09-01-preview/Rules_Create_EdgeAction.json
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
            id: "/subscriptions/subid/resourceGroups/RG/providers/Microsoft.Cdn/edgeActions/edgeAction1",
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
  await rulesCreateAfdUrlSigningAction();
  await rulesCreateEdgeAction();
}

main().catch(console.error);
