// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AlertProcessingRulesManagementClient } = require("@azure/arm-alertprocessingrules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an alert processing rule.
 *
 * @summary create or update an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Create_or_update_add_action_group_all_alerts_in_subscription.json
 */
async function createOrUpdateARuleThatAddsAnActionGroupToAllAlertsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.createOrUpdate(
    "alertscorrelationrg",
    "AddActionGroupToSubscription",
    {
      location: "Global",
      properties: {
        description: "Add ActionGroup1 to all alerts in the subscription",
        actions: [
          {
            actionGroupIds: [
              "/subscriptions/subId1/resourcegroups/RGId1/providers/microsoft.insights/actiongroups/ActionGroup1",
            ],
            actionType: "AddActionGroups",
          },
        ],
        enabled: true,
        scopes: ["/subscriptions/subId1"],
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an alert processing rule.
 *
 * @summary create or update an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Create_or_update_add_two_action_groups_all_Sev0_Sev1_two_resource_groups.json
 */
async function createOrUpdateARuleThatAddsTwoActionGroupsToAllSev0AndSev1AlertsInTwoResourceGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.createOrUpdate(
    "alertscorrelationrg",
    "AddActionGroupsBySeverity",
    {
      location: "Global",
      properties: {
        description: "Add AGId1 and AGId2 to all Sev0 and Sev1 alerts in these resourceGroups",
        actions: [
          {
            actionGroupIds: [
              "/subscriptions/subId1/resourcegroups/RGId1/providers/microsoft.insights/actiongroups/AGId1",
              "/subscriptions/subId1/resourcegroups/RGId1/providers/microsoft.insights/actiongroups/AGId2",
            ],
            actionType: "AddActionGroups",
          },
        ],
        conditions: [{ field: "Severity", operator: "Equals", values: ["sev0", "sev1"] }],
        enabled: true,
        scopes: [
          "/subscriptions/subId1/resourceGroups/RGId1",
          "/subscriptions/subId1/resourceGroups/RGId2",
        ],
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an alert processing rule.
 *
 * @summary create or update an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Create_or_update_remove_all_action_groups_from_specific_alert_rule.json
 */
async function createOrUpdateARuleThatRemovesAllActionGroupsFromAllAlertsInASubscriptionComingFromASpecificAlertRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.createOrUpdate(
    "alertscorrelationrg",
    "RemoveActionGroupsSpecificAlertRule",
    {
      location: "Global",
      properties: {
        description: "Removes all ActionGroups from all Alerts that fire on above AlertRule",
        actions: [{ actionType: "RemoveAllActionGroups" }],
        conditions: [
          {
            field: "AlertRuleId",
            operator: "Equals",
            values: [
              "/subscriptions/suubId1/resourceGroups/Rgid2/providers/microsoft.insights/activityLogAlerts/RuleName",
            ],
          },
        ],
        enabled: true,
        scopes: ["/subscriptions/subId1"],
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an alert processing rule.
 *
 * @summary create or update an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Create_or_update_remove_all_action_groups_outside_business_hours.json
 */
async function createOrUpdateARuleThatRemovesAllActionGroupsOutsideBusinessHoursMonFri09001700EasternStandardTime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.createOrUpdate(
    "alertscorrelationrg",
    "RemoveActionGroupsOutsideBusinessHours",
    {
      location: "Global",
      properties: {
        description: "Remove all ActionGroups outside business hours",
        actions: [{ actionType: "RemoveAllActionGroups" }],
        enabled: true,
        schedule: {
          recurrences: [
            { endTime: "09:00:00", recurrenceType: "Daily", startTime: "17:00:00" },
            { daysOfWeek: ["Saturday", "Sunday"], recurrenceType: "Weekly" },
          ],
          timeZone: "Eastern Standard Time",
        },
        scopes: ["/subscriptions/subId1"],
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an alert processing rule.
 *
 * @summary create or update an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Create_or_update_remove_all_action_groups_recurring_maintenance_window.json
 */
async function createOrUpdateARuleThatRemovesAllActionGroupsFromAllAlertsOnAnyVMInTwoResourceGroupsDuringARecurringMaintenanceWindow22000400EverySatAndSunIndiaStandardTime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.createOrUpdate(
    "alertscorrelationrg",
    "RemoveActionGroupsRecurringMaintenance",
    {
      location: "Global",
      properties: {
        description:
          "Remove all ActionGroups from all Vitual machine Alerts during the recurring maintenance",
        actions: [{ actionType: "RemoveAllActionGroups" }],
        conditions: [
          {
            field: "TargetResourceType",
            operator: "Equals",
            values: ["microsoft.compute/virtualmachines"],
          },
        ],
        enabled: true,
        schedule: {
          recurrences: [
            {
              daysOfWeek: ["Saturday", "Sunday"],
              endTime: "04:00:00",
              recurrenceType: "Weekly",
              startTime: "22:00:00",
            },
          ],
          timeZone: "India Standard Time",
        },
        scopes: [
          "/subscriptions/subId1/resourceGroups/RGId1",
          "/subscriptions/subId1/resourceGroups/RGId2",
        ],
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an alert processing rule.
 *
 * @summary create or update an alert processing rule.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_Create_or_update_remove_all_action_groups_specific_VM_one-off_maintenance_window.json
 */
async function createOrUpdateARuleThatRemovesAllActionGroupsFromAlertsOnASpecificVMDuringAOneOffMaintenanceWindow18002000AtASpecificDatePacificStandardTime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new AlertProcessingRulesManagementClient(credential, subscriptionId);
  const result = await client.alertProcessingRules.createOrUpdate(
    "alertscorrelationrg",
    "RemoveActionGroupsMaintenanceWindow",
    {
      location: "Global",
      properties: {
        description:
          "Removes all ActionGroups from all Alerts on VMName during the maintenance window",
        actions: [{ actionType: "RemoveAllActionGroups" }],
        enabled: true,
        schedule: {
          effectiveFrom: "2021-04-15T18:00:00",
          effectiveUntil: "2021-04-15T20:00:00",
          timeZone: "Pacific Standard Time",
        },
        scopes: [
          "/subscriptions/subId1/resourceGroups/RGId1/providers/Microsoft.Compute/virtualMachines/VMName",
        ],
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateARuleThatAddsAnActionGroupToAllAlertsInASubscription();
  await createOrUpdateARuleThatAddsTwoActionGroupsToAllSev0AndSev1AlertsInTwoResourceGroups();
  await createOrUpdateARuleThatRemovesAllActionGroupsFromAllAlertsInASubscriptionComingFromASpecificAlertRule();
  await createOrUpdateARuleThatRemovesAllActionGroupsOutsideBusinessHoursMonFri09001700EasternStandardTime();
  await createOrUpdateARuleThatRemovesAllActionGroupsFromAllAlertsOnAnyVMInTwoResourceGroupsDuringARecurringMaintenanceWindow22000400EverySatAndSunIndiaStandardTime();
  await createOrUpdateARuleThatRemovesAllActionGroupsFromAlertsOnASpecificVMDuringAOneOffMaintenanceWindow18002000AtASpecificDatePacificStandardTime();
}

main().catch(console.error);
