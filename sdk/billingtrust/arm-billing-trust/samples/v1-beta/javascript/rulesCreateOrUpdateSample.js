// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingTrustClient } = require("@azure/arm-billing-trust");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Rule. **This operation is required for RPaaS tracked-resource
 * cache population and MUST remain in the public spec.** Rules are created by the
 * service when the parent assessment is created; they are not directly creatable
 * by end users. All customer PUT calls are rejected at runtime with
 * `OperationNotAllowed` via the RPaaS ResourceCreationValidate extension.
 * Use PATCH to modify rule fields that the customer is authorized to change.
 * Peer RPs with the same topology (extension singleton parent + proxy child)
 * declare an identical public PUT for the same RPaaS cache-population reason:
 * Microsoft.ScVmm/virtualMachineInstances/guestAgents,
 * Microsoft.ConnectedVMwarevSphere/virtualMachineInstances/guestAgents.
 *
 * @summary create or update a Rule. **This operation is required for RPaaS tracked-resource
 * cache population and MUST remain in the public spec.** Rules are created by the
 * service when the parent assessment is created; they are not directly creatable
 * by end users. All customer PUT calls are rejected at runtime with
 * `OperationNotAllowed` via the RPaaS ResourceCreationValidate extension.
 * Use PATCH to modify rule fields that the customer is authorized to change.
 * Peer RPs with the same topology (extension singleton parent + proxy child)
 * declare an identical public PUT for the same RPaaS cache-population reason:
 * Microsoft.ScVmm/virtualMachineInstances/guestAgents,
 * Microsoft.ConnectedVMwarevSphere/virtualMachineInstances/guestAgents.
 * x-ms-original-file: 2026-03-17-preview/Rules_CreateOrUpdate.json
 */
async function createOrUpdateAnEduQualificationRule() {
  const credential = new DefaultAzureCredential();
  const client = new BillingTrustClient(credential);
  const result = await client.rules.createOrUpdate(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/billing-edu-rg/providers/Microsoft.Program/educationEnrollments/default",
    "Qualify_Edu",
    {
      properties: {
        kind: "eduQualification",
        domains: [
          {
            domainNames: ["students.contoso.edu", "faculty.contoso.edu"],
            tenantId: "11111111-1111-1111-1111-111111111111",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAnEduQualificationRule();
}

main().catch(console.error);
