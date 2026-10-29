// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SovereignClient } = require("@azure/arm-sovereign");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets compliance details for the Sovereign View resource.
 *
 * @summary gets compliance details for the Sovereign View resource.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceDetails.json
 */
async function sovereignViewOperationsComplianceDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.complianceDetails(
    "ExampleResourceGroup",
    "ExampleSV",
    {
      top: 50,
      skip: 25,
      complianceDimensions: [
        { dimension: "EncryptionAtRest", states: ["Compliant"] },
        { dimension: "BusinessContinuity", states: ["Constrained"] },
      ],
      filters: [
        { field: "Region", operator: "In", value: ["northeurope"] },
        { field: "ParentResourceName", operator: "In", value: ["example-parent-vm"] },
        { field: "BusinessContinuity", operator: "In", value: ["Constrained"] },
      ],
      sort: [
        {
          field: "ResourceId",
          direction: "asc",
          sortingOrder: ["Compliant", "NonCompliant", "Constrained"],
        },
      ],
      search: { field: "ResourceId", value: "example-vm" },
    },
  );
  console.log(result);
}

async function main() {
  await sovereignViewOperationsComplianceDetails();
}

main().catch(console.error);
