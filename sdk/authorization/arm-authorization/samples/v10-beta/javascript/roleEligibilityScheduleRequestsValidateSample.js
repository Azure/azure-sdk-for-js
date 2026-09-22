// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates a new role eligibility schedule request.
 *
 * @summary validates a new role eligibility schedule request.
 * x-ms-original-file: 2024-09-01-preview/ValidateRoleEligibilityScheduleRequestByName.json
 */
async function validateRoleEligibilityScheduleRequestByName() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleEligibilityScheduleRequests.validate(
    "subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "64caffb6-55c0-4deb-a585-68e948ea1ad6",
    {
      condition:
        "@Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container'",
      conditionVersion: "1.0",
      principalId: "a3bb8764-cb92-4276-9d2a-ca1e895e55ea",
      requestType: "AdminAssign",
      roleDefinitionId:
        "/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f/providers/Microsoft.Authorization/roleDefinitions/c8d4ff99-41c3-41a8-9f60-21dfdad59608",
      scheduleInfo: {
        expiration: { type: "AfterDuration", duration: "P365D" },
        startDateTime: new Date("2020-09-09T21:31:27.91Z"),
      },
    },
  );
  console.log(result);
}

async function main() {
  await validateRoleEligibilityScheduleRequestByName();
}

main().catch(console.error);
