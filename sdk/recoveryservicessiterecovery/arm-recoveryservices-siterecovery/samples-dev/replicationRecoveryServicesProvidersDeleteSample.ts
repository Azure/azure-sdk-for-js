// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to removes/delete(unregister) a recovery services provider from the vault.
 *
 * @summary The operation to removes/delete(unregister) a recovery services provider from the vault.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationRecoveryServicesProviders_Delete.json
 */
async function deletesProviderFromFabricNoteDeletingProviderForAnyFabricOtherThanSingleHostIsUnsupportedToMaintainBackwardCompatibilityForReleasedClientsTheObjectDeleteRspInputIsUsedIfTheObjectIsEmptyWeAssumeThatItIsOldClientAndContinueTheOldBehavior(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const providerName = "241641e6-ee7b-4ee4-8141-821fadda43fa";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationRecoveryServicesProviders.beginDeleteAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      providerName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesProviderFromFabricNoteDeletingProviderForAnyFabricOtherThanSingleHostIsUnsupportedToMaintainBackwardCompatibilityForReleasedClientsTheObjectDeleteRspInputIsUsedIfTheObjectIsEmptyWeAssumeThatItIsOldClientAndContinueTheOldBehavior();
}

main().catch(console.error);
