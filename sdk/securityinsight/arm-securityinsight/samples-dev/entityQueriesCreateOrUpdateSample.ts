// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the entity query.
 *
 * @summary creates or updates the entity query.
 * x-ms-original-file: 2025-07-01-preview/entityQueries/CreateEntityQueryActivity.json
 */
async function createsOrUpdatesAnActivityEntityQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.entityQueries.createOrUpdate(
    "myRg",
    "myWorkspace",
    "07da3cc8-c8ad-4710-a44e-334cdcb7882b",
    {
      etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
      kind: "Activity",
      description: "Account deleted on host",
      content: "On '{{Computer}}' the account '{{TargetAccount}}' was deleted by '{{AddedBy}}'",
      enabled: true,
      entitiesFilter: { Host_OsFamily: ["Windows"] },
      inputEntityType: "Host",
      queryDefinitions: {
        query:
          "let GetAccountActions = (v_Host_Name:string, v_Host_NTDomain:string, v_Host_DnsDomain:string, v_Host_AzureID:string, v_Host_OMSAgentID:string){\nSecurityEvent\n| where EventID in (4725, 4726, 4767, 4720, 4722, 4723, 4724)\n// parsing for Host to handle variety of conventions coming from data\n| extend Host_HostName = case(\nComputer has '@', tostring(split(Computer, '@')[0]),\nComputer has '\\\\', tostring(split(Computer, '\\\\')[1]),\nComputer has '.', tostring(split(Computer, '.')[0]),\nComputer\n)\n| extend Host_NTDomain = case(\nComputer has '\\\\', tostring(split(Computer, '\\\\')[0]), \nComputer has '.', tostring(split(Computer, '.')[-2]), \nComputer\n)\n| extend Host_DnsDomain = case(\nComputer has '\\\\', tostring(split(Computer, '\\\\')[0]), \nComputer has '.', strcat_array(array_slice(split(Computer,'.'),-2,-1),'.'), \nComputer\n)\n| where (Host_HostName =~ v_Host_Name and Host_NTDomain =~ v_Host_NTDomain) \nor (Host_HostName =~ v_Host_Name and Host_DnsDomain =~ v_Host_DnsDomain) \nor v_Host_AzureID =~ _ResourceId \nor v_Host_OMSAgentID == SourceComputerId\n| project TimeGenerated, EventID, Activity, Computer, TargetAccount, TargetUserName, TargetDomainName, TargetSid, SubjectUserName, SubjectUserSid, _ResourceId, SourceComputerId\n| extend AddedBy = SubjectUserName\n// Future support for Activities\n| extend timestamp = TimeGenerated, HostCustomEntity = Computer, AccountCustomEntity = TargetAccount\n};\nGetAccountActions('{{Host_HostName}}', '{{Host_NTDomain}}', '{{Host_DnsDomain}}', '{{Host_AzureID}}', '{{Host_OMSAgentID}}')\n \n| where EventID == 4726 ",
      },
      requiredInputFieldsSets: [
        ["Host_HostName", "Host_NTDomain"],
        ["Host_HostName", "Host_DnsDomain"],
        ["Host_AzureID"],
        ["Host_OMSAgentID"],
      ],
      title: "An account was deleted on this host",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAnActivityEntityQuery();
}

main().catch(console.error);
