import * as msRestNodeAuth from "ms-rest-nodeauth";
import * as msRestJs from "ms-rest-js";
import { StorageManagementClient, StorageManagementModels } from "../packages/@azure/arm-storage";

const subscriptionId: string = "4cf32f9e-069a-4492-967c-d9fdd3cc3e07";

console.log("TypeScript SDK:");
msRestNodeAuth.interactiveLogin().then((credentials: msRestJs.ServiceClientCredentials) => {
  const client = new StorageManagementClient(credentials, subscriptionId);
  return client.storageAccounts.list().then((storageAccounts: StorageManagementModels.StorageAccountListResult) => {
    console.log(`Found ${storageAccounts.length} storage accounts:`);
    for (const storageAccount of storageAccounts) {
      console.log(`  ${storageAccount.id}`);
    }
  });
});