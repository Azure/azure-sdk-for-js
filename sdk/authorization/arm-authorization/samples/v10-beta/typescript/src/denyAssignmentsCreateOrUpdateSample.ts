// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a deny assignment by scope and name.
 *
 * @summary create or update a deny assignment by scope and name.
 * x-ms-original-file: 2024-07-01-preview/DenyAssignments_CreateForSubscription.json
 */
async function createDenyAssignmentForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.denyAssignments.createOrUpdate(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2",
    "64b75d79-7a26-4341-944e-4f1a19f0e6ca",
    {
      description: "Prevent all users from deleting critical resources in the subscription.",
      denyAssignmentEffect: "enforced",
      denyAssignmentName: "Deny delete on critical resources",
      doNotApplyToChildScopes: false,
      excludePrincipals: [{ type: "ServicePrincipal", id: "ce2ce14e-85d7-4629-bdbc-454d0519d987" }],
      permissions: [{ actions: ["*/delete"], dataActions: [], notActions: [], notDataActions: [] }],
      principals: [{ type: "SystemDefined", id: "00000000-0000-0000-0000-000000000000" }],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDenyAssignmentForSubscription();
}

main().catch(console.error);
