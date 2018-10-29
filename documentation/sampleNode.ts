import * as msRestAzure from "ms-rest-azure";
import { StorageManagementClient as StorageManagementClientNode, StorageManagementModels } from "azure-arm-storage";

const subscriptionId: string = "4cf32f9e-069a-4492-967c-d9fdd3cc3e07";

console.log("Node.js SDK Example:");
msRestAzure.interactiveLogin().then((credentials: msRestAzure.DeviceTokenCredentials) => {
  const client = new StorageManagementClientNode(credentials, subscriptionId);
  return client.storageAccounts.list().then((storageAccounts: StorageManagementModels.StorageAccountListResult) => {
    console.log(`Found ${storageAccounts.length} storage accounts:`);
    for (const storageAccount of storageAccounts) {
      console.log(`  ${storageAccount.id}`);
    }
  });
});