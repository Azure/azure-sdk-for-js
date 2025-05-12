// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates the fabric agent.
 *
 * @summary creates the fabric agent.
 * x-ms-original-file: 2024-09-01/FabricAgent_Create.json
 */
async function putsTheFabricAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabricAgent.create("rgswagger_2024-09-01", "wPR", "M", {
    properties: {
      machineId: "envzcoijbqhtrpncbjbhk",
      machineName: "y",
      authenticationIdentity: {
        tenantId: "joclkkdovixwapephhxaqtefubhhmq",
        applicationId: "cwktzrwajuvfyyymfstpey",
        objectId: "khsiaqfbpuhp",
        audience: "dkjobanyqgzenivyxhvavottpc",
        aadAuthority: "bubwwbowfhdmujrt",
      },
      resourceAccessIdentity: {
        tenantId: "joclkkdovixwapephhxaqtefubhhmq",
        applicationId: "cwktzrwajuvfyyymfstpey",
        objectId: "khsiaqfbpuhp",
        audience: "dkjobanyqgzenivyxhvavottpc",
        aadAuthority: "bubwwbowfhdmujrt",
      },
      customProperties: {
        instanceType: "FabricAgentModelCustomProperties",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putsTheFabricAgent();
}

main().catch(console.error);
