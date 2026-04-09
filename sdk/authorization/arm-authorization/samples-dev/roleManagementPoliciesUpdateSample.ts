// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a role management policy
 *
 * @summary update a role management policy
 * x-ms-original-file: 2024-09-01-preview/PatchPartialRoleManagementPolicy.json
 */
async function patchPartialRoleManagementPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleManagementPolicies.update(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
    "570c3619-7688-4b34-b290-2b8bb3ccab2a",
    {
      rules: [
        {
          id: "Expiration_Admin_Eligibility",
          isExpirationRequired: false,
          maximumDuration: "P180D",
          ruleType: "RoleManagementPolicyExpirationRule",
          target: { caller: "Admin", level: "Eligibility", operations: ["All"] },
        },
        {
          id: "Notification_Admin_Admin_Eligibility",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["admin_admin_eligible@test.com"],
          notificationType: "Email",
          recipientType: "Admin",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "Admin", level: "Eligibility", operations: ["All"] },
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a role management policy
 *
 * @summary update a role management policy
 * x-ms-original-file: 2024-09-01-preview/PatchRoleManagementPolicy.json
 */
async function patchRoleManagementPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleManagementPolicies.update(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
    "570c3619-7688-4b34-b290-2b8bb3ccab2a",
    {
      rules: [
        {
          id: "Expiration_Admin_Eligibility",
          isExpirationRequired: false,
          maximumDuration: "P180D",
          ruleType: "RoleManagementPolicyExpirationRule",
          target: { caller: "Admin", level: "Eligibility", operations: ["All"] },
        },
        {
          id: "Notification_Admin_Admin_Eligibility",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["admin_admin_eligible@test.com"],
          notificationType: "Email",
          recipientType: "Admin",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "Admin", level: "Eligibility", operations: ["All"] },
        },
        {
          id: "Notification_Requestor_Admin_Eligibility",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["requestor_admin_eligible@test.com"],
          notificationType: "Email",
          recipientType: "Requestor",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "Admin", level: "Eligibility", operations: ["All"] },
        },
        {
          id: "Notification_Approver_Admin_Eligibility",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["approver_admin_eligible@test.com"],
          notificationType: "Email",
          recipientType: "Approver",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "Admin", level: "Eligibility", operations: ["All"] },
        },
        {
          enabledRules: [],
          id: "Enablement_Admin_Eligibility",
          ruleType: "RoleManagementPolicyEnablementRule",
          target: { caller: "Admin", level: "Eligibility", operations: ["All"] },
        },
        {
          id: "Expiration_Admin_Assignment",
          isExpirationRequired: false,
          maximumDuration: "P90D",
          ruleType: "RoleManagementPolicyExpirationRule",
          target: { caller: "Admin", level: "Assignment", operations: ["All"] },
        },
        {
          enabledRules: ["Justification", "MultiFactorAuthentication"],
          id: "Enablement_Admin_Assignment",
          ruleType: "RoleManagementPolicyEnablementRule",
          target: { caller: "Admin", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Notification_Admin_Admin_Assignment",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["admin_admin_member@test.com"],
          notificationType: "Email",
          recipientType: "Admin",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "Admin", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Notification_Requestor_Admin_Assignment",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["requestor_admin_member@test.com"],
          notificationType: "Email",
          recipientType: "Requestor",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "Admin", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Notification_Approver_Admin_Assignment",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["approver_admin_member@test.com"],
          notificationType: "Email",
          recipientType: "Approver",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "Admin", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Expiration_EndUser_Assignment",
          isExpirationRequired: true,
          maximumDuration: "PT7H",
          ruleType: "RoleManagementPolicyExpirationRule",
          target: { caller: "EndUser", level: "Assignment", operations: ["All"] },
        },
        {
          enabledRules: ["Justification", "MultiFactorAuthentication", "Ticketing"],
          id: "Enablement_EndUser_Assignment",
          ruleType: "RoleManagementPolicyEnablementRule",
          target: { caller: "EndUser", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Approval_EndUser_Assignment",
          ruleType: "RoleManagementPolicyApprovalRule",
          setting: {
            approvalMode: "SingleStage",
            approvalStages: [
              {
                approvalStageTimeOutInDays: 1,
                escalationTimeInMinutes: 0,
                isApproverJustificationRequired: true,
                isEscalationEnabled: false,
                primaryApprovers: [
                  {
                    description: "amansw_new_group",
                    id: "2385b0f3-5fa9-43cf-8ca4-b01dc97298cd",
                    isBackup: false,
                    userType: "Group",
                  },
                  {
                    description: "amansw_group",
                    id: "2f4913c9-d15b-406a-9946-1d66a28f2690",
                    isBackup: false,
                    userType: "Group",
                  },
                ],
              },
            ],
            isApprovalRequired: true,
            isApprovalRequiredForExtension: false,
            isRequestorJustificationRequired: true,
          },
          target: { caller: "EndUser", level: "Assignment", operations: ["All"] },
        },
        {
          claimValue: "",
          id: "AuthenticationContext_EndUser_Assignment",
          isEnabled: false,
          ruleType: "RoleManagementPolicyAuthenticationContextRule",
          target: { caller: "EndUser", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Notification_Admin_EndUser_Assignment",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["admin_enduser_member@test.com"],
          notificationType: "Email",
          recipientType: "Admin",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "EndUser", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Notification_Requestor_EndUser_Assignment",
          isDefaultRecipientsEnabled: false,
          notificationLevel: "Critical",
          notificationRecipients: ["requestor_enduser_member@test.com"],
          notificationType: "Email",
          recipientType: "Requestor",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "EndUser", level: "Assignment", operations: ["All"] },
        },
        {
          id: "Notification_Approver_EndUser_Assignment",
          isDefaultRecipientsEnabled: true,
          notificationLevel: "Critical",
          notificationType: "Email",
          recipientType: "Approver",
          ruleType: "RoleManagementPolicyNotificationRule",
          target: { caller: "EndUser", level: "Assignment", operations: ["All"] },
        },
        {
          id: "PIMOnlyMode_Admin_Assignment",
          pimOnlyModeSettings: {
            excludedAssignmentTypes: ["ServicePrincipalsAsTarget"],
            excludes: [
              { type: "User", id: "ec42a424-a0c0-4418-8788-d19bdeb03704" },
              { type: "Group", id: "00029dfb-0218-4e7a-9a85-c15dc0c880bc" },
              { type: "ServicePrincipal", id: "0000103d-1fc2-4ac8-81de-71517765655c" },
            ],
            mode: "Enabled",
          },
          ruleType: "RoleManagementPolicyPimOnlyModeRule",
          target: {
            caller: "Admin",
            enforcedSettings: ["all"],
            inheritableSettings: ["all"],
            level: "Assignment",
            targetObjects: [],
            operations: ["all"],
          },
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a role management policy
 *
 * @summary update a role management policy
 * x-ms-original-file: 2024-09-01-preview/PatchRoleManagementPolicyToEnablePIMOnlyMode.json
 */
async function patchRoleManagementPolicyToEnablePIMOnlyMode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleManagementPolicies.update(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
    "570c3619-7688-4b34-b290-2b8bb3ccab2a",
    {
      rules: [
        {
          id: "PIMOnlyMode_Admin_Assignment",
          pimOnlyModeSettings: {
            excludedAssignmentTypes: ["ServicePrincipalsAsTarget"],
            excludes: [
              { type: "User", id: "ec42a424-a0c0-4418-8788-d19bdeb03704" },
              { type: "Group", id: "00029dfb-0218-4e7a-9a85-c15dc0c880bc" },
              { type: "ServicePrincipal", id: "0000103d-1fc2-4ac8-81de-71517765655c" },
            ],
            mode: "Enabled",
          },
          ruleType: "RoleManagementPolicyPimOnlyModeRule",
          target: {
            caller: "Admin",
            enforcedSettings: ["all"],
            inheritableSettings: ["all"],
            level: "Assignment",
            targetObjects: [],
            operations: ["all"],
          },
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchPartialRoleManagementPolicy();
  await patchRoleManagementPolicy();
  await patchRoleManagementPolicyToEnablePIMOnlyMode();
}

main().catch(console.error);
