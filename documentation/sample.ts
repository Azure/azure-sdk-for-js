import * as msRestAzure from "ms-rest-azure";
import * as msRestJs from "ms-rest-js";
import * as msRestNodeAuth from "ms-rest-nodeauth";
import { StorageManagementClient as StorageManagementClientNode, StorageManagementModels as StorageManagementModelsNode } from "azure-arm-storage";
import { StorageManagementClient as StorageManagementClientJS, StorageManagementModels as StorageManagementModelsJS } from "../packages/@azure/arm-storage";

const subscriptionId: string = "4cf32f9e-069a-4492-967c-d9fdd3cc3e07";

console.log("Node.js SDK:");
msRestAzure.interactiveLogin()
  .then((credentials: msRestAzure.DeviceTokenCredentials) => {
    const clientNode = new StorageManagementClientNode()
  })
  .then(() => {
    msRestNodeAuth.interactiveLogin().then((credentials: msRestJs.ServiceClientCredentials) => {
      console.log("TypeScript SDK:");
      const clientJS = new StorageManagementClientJS(credentials, subscriptionId);
      clientJS.storageAccounts.list().then((storageAccounts: StorageManagementModelsJS.StorageAccountListResult) => {
        console.log(`Found ${storageAccounts.length} storage account${(storageAccounts.length === 1 ? "" : "s")}${(storageAccounts.length === 0 ? "." : ":")}`);
        for (const storageAccount of storageAccounts) {
          console.log(`  ${storageAccount.id}`);
        }
      });
    });
  });


